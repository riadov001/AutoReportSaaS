// Local authentication with email/password
import express, { type Express, type Request } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { z } from "zod";
import { eq, sql, count, desc } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin, isSuperAdmin, isRootAdmin } from "./localAuth";
import { 
  insertServiceSchema, insertQuoteSchema, insertInvoiceSchema, insertReservationSchema, insertGarageSchema,
  type User, type InsertAuditLog,
  users, services, quotes, quoteItems, quoteMedia, invoices, invoiceItems, invoiceMedia,
  reservations, reservationServices, notifications, engagements, workflows, workflowSteps,
  serviceWorkflows, workshopTasks, applicationSettings, invoiceCounters,
  auditLogs, auditLogChanges, chatConversations, chatParticipants, chatMessages, chatAttachments, garages,
  reviews, repairOrders, ocrScans
} from "@shared/schema";
import { db } from "./db";
import { sendEmail, getEmailHeader, getEmailFooter } from "./emailService";
import { sendEventSms, sendSms, isFrenchMobile, getSmsLogs, getSmsStats, type SmsEventType } from "./smsService";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { ObjectStorageService } from "./objectStorage";
import { registerObjectStorageRoutes, ObjectStorageService as NewObjectStorageService } from "./replit_integrations/object_storage";
import { uploadMedia, downloadMedia, deleteMedia, migrateLocalToObjectStorage } from "./mediaService";
import { setWsClient, removeWsClient, getWsClient, getWsClients, sendWsNotification } from "./wsClients";
import { tenantMiddleware } from "./tenantMiddleware";
import { createTenantStorage } from "./tenantStorage";
import { pool } from "./db";

import { buildUrl, getBaseUrl } from "./urlHelper";

function getIndexHtmlPath(): string {
  const prodPath = path.resolve(import.meta.dirname, "public", "index.html");
  if (fs.existsSync(prodPath)) return prodPath;
  const devPath = path.join(process.cwd(), "client", "dist", "index.html");
  if (fs.existsSync(devPath)) return devPath;
  return path.join(process.cwd(), "dist", "public", "index.html");
}

let objectStorageService: ObjectStorageService | null = null;
try {
  objectStorageService = new ObjectStorageService();
} catch (e) {
  console.warn("Object storage not available:", (e as Error).message);
}

const downloadFileFromPath = downloadMedia;
const deleteFileAtPath = deleteMedia;
const uploadToStorage = uploadMedia;

async function tenantQuery(req: any, queryText: string, params?: any[]): Promise<any> {
  if (req.tenantSchema) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(`SET LOCAL search_path TO "${req.tenantSchema}", public`);
      const result = await client.query(queryText, params);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
  return pool.query(queryText, params);
}

async function processMediaAfterCreation(
  mediaEntries: Array<{ id: string; filePath: string; fileType: string; fileName: string }>,
  reference: string,
  folder: string,
  updateFn: (mediaId: string, newPath: string, newFileName: string) => Promise<void>
): Promise<void> {
  const { addWatermarkToImage } = await import("./imageWatermark");
  
  for (let i = 0; i < mediaEntries.length; i++) {
    const entry = mediaEntries[i];
    const ext = path.extname(entry.fileName || entry.filePath) || '.jpg';
    // Clean reference for filename: keep dashes (standard in refs like DEV-02-00041), replace others
    const cleanRef = reference.replace(/[^a-zA-Z0-9\-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
    const tsPrefix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const newFileName = `${tsPrefix}_${cleanRef}_${i + 1}${ext}`;
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(entry.fileName || entry.filePath);
    
    try {
      let fileData = await downloadFileFromPath(entry.filePath);
      if (!fileData) {
        console.warn(`[PostProcess] Could not download ${entry.filePath}, skipping`);
        continue;
      }
      
      if (isImage) {
        try {
          const mimeType = ext.toLowerCase().includes('png') ? 'image/png' : 
                           ext.toLowerCase().includes('webp') ? 'image/webp' : 'image/jpeg';
          fileData = await addWatermarkToImage(fileData, reference, mimeType);
          console.log(`[PostProcess] Watermark applied for ${reference} photo ${i + 1}`);
        } catch (wmErr) {
          console.error(`[PostProcess] Watermark failed for ${entry.id}:`, wmErr);
        }
      }
      
      const newPath = await uploadToStorage(fileData, newFileName, folder);
      
      const oldPath = entry.filePath;
      await updateFn(entry.id, newPath, newFileName);
      
      if (oldPath !== newPath) {
        await deleteFileAtPath(oldPath);
      }
      
      console.log(`[PostProcess] ${entry.filePath} -> ${newPath} (${newFileName})`);
    } catch (err) {
      console.error(`[PostProcess] Error processing media ${entry.id}:`, err);
    }
  }
}

const BACKUP_EMAIL_RECIPIENT = "mytoolslast@gmail.com";

const fetchMediaFileBuffer = downloadMedia;

async function sendMediaZipByEmail(
  type: "quote" | "invoice",
  entityId: string,
  reference: string
): Promise<void> {
  try {
    const mediaList = type === "quote"
      ? await storage.getQuoteMedia(entityId)
      : await storage.getInvoiceMedia(entityId);

    const imageMedia = mediaList.filter(m => m.fileType === "image");
    if (imageMedia.length === 0) {
      console.log(`[ZipEmail] No images for ${type} ${reference}, skipping`);
      return;
    }

    const archiver = (await import("archiver")).default;
    const { PassThrough } = await import("stream");

    const buffers: Buffer[] = [];
    const passThrough = new PassThrough();
    passThrough.on("data", (chunk: Buffer) => buffers.push(chunk));

    const archive = archiver("zip", { zlib: { level: 5 } });

    archive.on("warning", (err: Error) => console.warn("[ZipEmail] Archive warning:", err));
    archive.on("error", (err: Error) => { throw err; });

    archive.pipe(passThrough);

    for (let i = 0; i < imageMedia.length; i++) {
      const m = imageMedia[i];
      try {
        const buffer = await fetchMediaFileBuffer(m.filePath);
        if (buffer) {
          const ext = path.extname(m.fileName || ".jpg");
          const cleanRef = reference.replace(/[^a-zA-Z0-9]/g, '_');
          const cleanName = `${cleanRef}_${i + 1}${ext}`;
          archive.append(buffer, { name: cleanName });
        }
      } catch (fileErr) {
        console.error(`[ZipEmail] Error reading file ${m.filePath}:`, fileErr);
      }
    }

    await archive.finalize();
    await new Promise<void>((resolve, reject) => {
      passThrough.on("end", resolve);
      passThrough.on("error", reject);
    });

    const zipBuffer = Buffer.concat(buffers);
    const label = type === "quote" ? "Devis" : "Facture";
    const zipFileName = `photos_${reference}.zip`;

    const emailResult = await sendEmail({
      to: BACKUP_EMAIL_RECIPIENT,
      subject: `${label} ${reference} - Photos`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #dc2626;">${label} ${reference}</h2>
          <p>Veuillez trouver ci-joint les ${imageMedia.length} photo(s) du ${label.toLowerCase()} <strong>${reference}</strong>.</p>
          <p style="color: #666; font-size: 12px;">Envoi automatique - AUTOREPORT</p>
        </div>
      `,
      attachments: [{ filename: zipFileName, content: zipBuffer }],
    });

    if (emailResult.success) {
      console.log(`[ZipEmail] ZIP sent for ${type} ${reference} to ${BACKUP_EMAIL_RECIPIENT}`);
    } else {
      console.error(`[ZipEmail] Failed to send for ${type} ${reference}:`, emailResult.error);
    }
  } catch (err) {
    console.error(`[ZipEmail] Error creating/sending ZIP for ${type} ${reference}:`, err);
  }
}

// WebSocket clients map (shared via wsClients module)
const wsClients = getWsClients();

// Utility function to sanitize user objects (remove password)
function sanitizeUser<T extends User>(user: T): Omit<T, 'password'> {
  const { password, ...sanitized } = user;
  return sanitized;
}

function sanitizeUsers<T extends User>(users: T[]): Omit<T, 'password'>[] {
  return users.map(sanitizeUser);
}

// Multi-tenant garage scoping helper
function getGarageScope(user: User | undefined): string | undefined {
  if (!user) return undefined;
  // Superadmin can access all garages
  if (user.role === "superadmin") return undefined;
  // Other users are scoped to their garage
  return user.garageId || undefined;
}

// Check if user has access to a specific garage's resource
function hasGarageAccess(user: User | undefined, resourceGarageId: string | null | undefined): boolean {
  if (!user) return false;
  // Superadmin and rootadmin can access all resources
  if (user.role === "superadmin" || user.role === "rootadmin") return true;
  // If resource has no garageId, only users without a specific garage (e.g. admins) can access
  if (!resourceGarageId) return !user.garageId;
  // User must belong to the same garage as the resource
  return user.garageId === resourceGarageId;
}

// Audit logging helper
type EntityType = "quote" | "invoice" | "reservation" | "service" | "workflow" | "workflow_step" | "user" | "workshop_task";
type ActionType = "created" | "updated" | "deleted" | "validated" | "rejected" | "completed" | "cancelled" | "paid" | "confirmed";

interface AuditContext {
  req: Request & { user?: User };
  entityType: EntityType;
  entityId: string;
  action: ActionType;
  summary: string;
  previousData?: Record<string, any>;
  newData?: Record<string, any>;
  metadata?: Record<string, any>;
}

async function logAuditEvent(ctx: AuditContext): Promise<void> {
  try {
    const user = ctx.req.user;
    
    // Compute field-level changes
    const changes: { field: string; previousValue: any; newValue: any }[] = [];
    if (ctx.previousData && ctx.newData) {
      const allKeys = Array.from(new Set([...Object.keys(ctx.previousData), ...Object.keys(ctx.newData)]));
      for (const key of allKeys) {
        const prev = ctx.previousData[key];
        const curr = ctx.newData[key];
        if (JSON.stringify(prev) !== JSON.stringify(curr)) {
          changes.push({ field: key, previousValue: prev, newValue: curr });
        }
      }
    }
    
    const logData: InsertAuditLog = {
      entityType: ctx.entityType,
      entityId: ctx.entityId,
      action: ctx.action,
      actorId: user?.id ?? null,
      actorRole: user?.role as any ?? null,
      actorName: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email : null,
      summary: ctx.summary,
      metadata: ctx.metadata ?? null,
      ipAddress: ctx.req.ip ?? ctx.req.socket?.remoteAddress ?? null,
      userAgent: ctx.req.headers['user-agent'] ?? null,
    };
    
    await storage.createAuditLog(logData, changes);
  } catch (error) {
    console.error("Error logging audit event:", error);
  }
}

// Helper to get action labels in French
const actionLabels: Record<ActionType, string> = {
  created: "créé",
  updated: "modifié",
  deleted: "supprimé",
  validated: "validé",
  rejected: "refusé",
  completed: "terminé",
  cancelled: "annulé",
  paid: "payé",
  confirmed: "confirmé",
};

const entityLabels: Record<EntityType, string> = {
  quote: "Devis",
  invoice: "Facture",
  reservation: "Réservation",
  service: "Service",
  workflow: "Workflow",
  workflow_step: "Étape de workflow",
  user: "Utilisateur",
  workshop_task: "Tâche atelier",
};

import { parse } from "url";

export async function registerRoutes(app: Express, server: Server): Promise<Server> {
  // Migrate landing_settings table
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS landing_settings (
        id integer PRIMARY KEY,
        app_name varchar(100) DEFAULT 'AutoReport',
        app_tagline text DEFAULT 'Rapports automobiles intelligents propulsés par l''IA.',
        hero_title text DEFAULT 'Diagnostics automobiles nouvelle génération',
        hero_subtitle text DEFAULT 'Analysez votre véhicule en quelques secondes grâce à notre moteur d''intelligence artificielle.',
        hero_cta text DEFAULT 'Analyser mon véhicule',
        contact_email text DEFAULT 'support@autoreport.com',
        contact_phone text DEFAULT '+33 (0)1 21 40 80 80',
        contact_address text DEFAULT '75, Rue de la République, 75011 Paris',
        footer_copyright text DEFAULT 'AutoReport. Tous droits réservés.',
        primary_color varchar(20) DEFAULT '#CE1126',
        font_family varchar(100) DEFAULT 'Exo 2',
        updated_at timestamp DEFAULT now()
      )
    `);
  } catch (e) {
    console.warn("[Migration] landing_settings:", (e as Error).message);
  }

  // Migrate panel_users table
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS panel_users (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        email varchar(255) NOT NULL UNIQUE,
        password_hash text NOT NULL,
        role varchar(20) NOT NULL DEFAULT 'admin',
        first_name varchar(100),
        last_name varchar(100),
        created_at timestamp DEFAULT now()
      )
    `);
    // Seed default superadmin if none exists
    const count = await storage.countPanelUsers();
    if (count === 0) {
      const bcrypt = await import("bcrypt");
      const defaultEmail = process.env.PANEL_ADMIN_EMAIL || "admin@autoreport.com";
      const defaultPassword = process.env.PANEL_ADMIN_PASSWORD || "AutoReport2024!";
      const hash = await bcrypt.default.hash(defaultPassword, 10);
      await storage.createPanelUser({
        email: defaultEmail,
        passwordHash: hash,
        role: "superadmin",
        firstName: "Super",
        lastName: "Admin",
      });
      console.log(`[Panel] Superadmin créé: ${defaultEmail} / ${defaultPassword}`);
    }
  } catch (e) {
    console.warn("[Migration] panel_users:", (e as Error).message);
  }

  // Migrate repair_sheets table
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS repair_sheets (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        report_id varchar,
        report_snapshot jsonb,
        status varchar(20) NOT NULL DEFAULT 'draft',
        client_name varchar(255),
        client_email varchar(255),
        client_phone varchar(50),
        client_address text,
        vehicle_make varchar(100),
        vehicle_model varchar(100),
        vehicle_year varchar(10),
        vehicle_mileage varchar(20),
        vehicle_plate varchar(20),
        diagnostic_summary text,
        repair_items jsonb DEFAULT '[]',
        quote_subtotal decimal(10,2) DEFAULT 0,
        quote_tax decimal(10,2) DEFAULT 0,
        quote_discount decimal(10,2) DEFAULT 0,
        quote_total decimal(10,2) DEFAULT 0,
        notes text,
        technician_name varchar(255),
        scheduled_at timestamp,
        completed_at timestamp,
        created_at timestamp DEFAULT now(),
        updated_at timestamp DEFAULT now()
      )
    `);
    // Add ai_prompt column to landing_settings if missing
    await db.execute(sql`ALTER TABLE landing_settings ADD COLUMN IF NOT EXISTS ai_prompt text`);
  } catch (e) {
    console.warn("[Migration] repair_sheets:", (e as Error).message);
  }

  const wss = new WebSocketServer({ noServer: true });
  
  server.on('upgrade', (request, socket, head) => {
    const { pathname } = parse(request.url || '', true);
    if (pathname === '/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  });

  // CORS for mobile app (React Native) and web
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || "").split(",").filter(Boolean);
    const replitDomains = process.env.REPLIT_DOMAINS || process.env.REPLIT_DEV_DOMAIN || "";

    let allowed = false;
    const isMobileApi = req.path.startsWith("/api/mobile/");
    if (isMobileApi) {
      allowed = true;
    } else if (origin) {
      if (allowedOrigins.length > 0 && allowedOrigins.includes(origin)) {
        allowed = true;
      } else if (replitDomains && origin.includes(".replit.")) {
        allowed = true;
      } else if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        allowed = true;
      } else if (origin.includes("autoreport")) {
        allowed = true;
      }
    }

    if (!origin) {
      res.setHeader("Access-Control-Allow-Origin", "*");
    } else if (allowed) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, x-garage-id");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "86400");
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });

  // Servir les fichiers statiques du dossier uploads
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
  app.use('/backups', express.static(path.join(process.cwd(), 'backups')));

  app.get("/uploads/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), "uploads", filename);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "Fichier non trouvé localement" });
    }
  });

  // Cloudflare R2 proxy route
  app.get("/r2/*", async (req, res) => {
    try {
      const key = req.params[0];
      if (!key) return res.status(400).json({ message: "Clé R2 manquante" });

      const { isCloudflareR2Configured, downloadFromR2 } = await import("./cloudflareR2Service");
      if (!isCloudflareR2Configured()) {
        return res.status(503).json({ message: "Cloudflare R2 non configuré" });
      }

      const { data, contentType } = await downloadFromR2(key);
      res.set("Content-Type", contentType);
      res.set("Cache-Control", "public, max-age=31536000, immutable");
      res.send(data);
    } catch (err: any) {
      console.error(`[R2Proxy] Error serving ${req.params[0]}:`, err.message);
      res.status(404).json({ message: "Fichier R2 non trouvé" });
    }
  });

  // Auth middleware
  await setupAuth(app);

  // Tenant middleware - resolves garage schema after auth
  app.use(tenantMiddleware());

  // Register object storage routes for persistent file uploads
  registerObjectStorageRoutes(app);

  // Register Swagger API documentation (Root Admin only)
  const { registerSwaggerRoutes } = await import("./swagger");
  registerSwaggerRoutes(app);

  // ========== PLAID BANK CONNECTION ROUTES ==========
  app.post("/api/plaid/create-link-token", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { createLinkToken } = await import("./plaidService");
      const userId = req.user.id;
      const linkToken = await createLinkToken(userId);
      res.json({ link_token: linkToken });
    } catch (error: any) {
      console.error("Plaid create link token error:", error);
      res.status(500).json({ message: "Erreur lors de la création du lien Plaid", error: error.message });
    }
  });

  app.post("/api/plaid/exchange-token", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { exchangePublicToken } = await import("./plaidService");
      const { public_token } = req.body;
      if (!public_token) {
        return res.status(400).json({ message: "public_token est requis" });
      }
      const result = await exchangePublicToken(public_token);
      res.json(result);
    } catch (error: any) {
      console.error("Plaid exchange token error:", error);
      res.status(500).json({ message: "Erreur lors de l'échange du token", error: error.message });
    }
  });

  app.get("/api/plaid/accounts", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { getAccounts } = await import("./plaidService");
      const accounts = await getAccounts();
      res.json({ accounts });
    } catch (error: any) {
      console.error("Plaid get accounts error:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des comptes", error: error.message });
    }
  });

  app.get("/api/plaid/balances", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { getBalances } = await import("./plaidService");
      const accounts = await getBalances();
      res.json({ accounts });
    } catch (error: any) {
      console.error("Plaid get balances error:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des soldes", error: error.message });
    }
  });

  // Keep existing routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Sanitize user object - remove password before sending to client
      res.json(sanitizeUser(user));
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public: list active subscription plans
  app.get('/api/plans', async (req, res) => {
    try {
      const plans = await storage.getSubscriptionPlans(true);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des plans" });
    }
  });

  // Public report generation - limited to 1 free per IP/email/user
  app.post('/api/reports/generate', async (req, res) => {
    try {
      const { make, model, year, mileage, issue, guestEmail } = req.body;
      
      if (!make || !model || !year || !issue) {
        return res.status(400).json({ message: "Marque, modèle, année et description requises" });
      }

      const userId = req.user?.id ?? null;
      const userRole = req.user?.role;
      const isAdminUser = !!userRole && ["admin", "superadmin", "rootadmin", "employe"].includes(userRole);
      const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';

      // Check free report limit (admins are exempt from all quotas)
      if (userId && !isAdminUser) {
        // Authenticated user: check if they have a free report already, or an active subscription
        const freeCount = await storage.countFreeReportsByUser(userId);
        const activeSub = await storage.getActiveSubscription(userId);
        if (freeCount >= 1 && !activeSub) {
          return res.status(429).json({
            message: "Vous avez déjà utilisé votre rapport gratuit. Souscrivez à un plan pour générer plus de rapports.",
            code: "FREE_LIMIT_REACHED",
          });
        }
        if (activeSub) {
          // Check quota in subscription
          if (activeSub.reportsUsed >= activeSub.reportsIncluded) {
            return res.status(429).json({
              message: "Quota de rapports atteint pour votre abonnement.",
              code: "SUBSCRIPTION_QUOTA_REACHED",
            });
          }
          // Increment usage
          await storage.updateUserSubscription(activeSub.id, { reportsUsed: activeSub.reportsUsed + 1 });
        }
      }

      const { generateAiReport } = await import('./aiReportService');
      let customPrompt: string | undefined;
      try {
        const settings = await storage.getLandingSettings();
        customPrompt = settings.aiPrompt || undefined;
      } catch {}
      const report = await generateAiReport({ make, model, year, mileage, issue }, customPrompt);

      const garageId = (req as any).tenantGarageId || null;
      const isSubscribed = userId && !isAdminUser ? !!(await storage.getActiveSubscription(userId)) : false;

      try {
        const contentStr = typeof report === 'object' ? JSON.stringify(report) : String(report);
        await storage.createAiReport({
          userId,
          garageId,
          make,
          model,
          year,
          mileage: mileage || null,
          issue,
          content: contentStr,
          status: "generated",
          metadata: {
            urgencyLevel: report.urgencyLevel,
            estimatedCost: report.estimatedCost,
            ...(isAdminUser ? { generatedByAdmin: true, adminRole: userRole } : {}),
          },
          guestEmail: guestEmail ? guestEmail.toLowerCase() : null,
          ipAddress: ip,
          // Admin-generated reports are NOT counted as "free" so they don't pollute quota counters
          isFree: isAdminUser ? false : !isSubscribed,
        });
      } catch (dbErr) {
        console.error("[AIReport] Failed to persist report:", dbErr);
      }

      res.json(report);
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({ message: "Erreur lors de la génération du rapport" });
    }
  });

  // PDF download - requires authentication
  app.post('/api/reports/download-pdf', async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Vous devez être connecté pour télécharger un rapport.",
          code: "AUTH_REQUIRED",
        });
      }

      const reportData = req.body;
      
      if (!reportData || !reportData.vehicleInfo) {
        return res.status(400).json({ message: "Données du rapport requises" });
      }

      const { generateReportHtml } = await import('./aiReportService');
      const html = generateReportHtml(reportData);

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="rapport-${reportData.vehicleInfo.make}-${Date.now()}.html"`);
      res.send(html);
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Erreur lors de la génération du PDF" });
    }
  });

  // Subscription checkout via Stripe
  app.post('/api/subscriptions/checkout', async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Connexion requise pour souscrire." });
      }
      const { planId } = req.body;
      if (!planId) return res.status(400).json({ message: "planId requis" });

      const plan = await storage.getSubscriptionPlan(planId);
      if (!plan || !plan.isActive) return res.status(404).json({ message: "Plan introuvable" });

      const { getStripe } = await import('./stripeService');
      const stripe = getStripe();
      if (!stripe) return res.status(503).json({ message: "Stripe non configuré" });

      const baseUrl = req.headers['x-forwarded-proto']
        ? `${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host'] || req.headers.host}`
        : `http://${req.headers.host}`;

      const isRecurring = plan.period === 'monthly' || plan.period === 'yearly';
      let session;

      if (isRecurring && plan.stripePriceId) {
        session = await stripe.checkout.sessions.create({
          mode: 'subscription',
          line_items: [{ price: plan.stripePriceId, quantity: 1 }],
          success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=subscription`,
          cancel_url: `${baseUrl}/payment-cancel`,
          customer_email: req.user.email || undefined,
          metadata: { planId, userId: req.user.id },
        });
      } else {
        session = await stripe.checkout.sessions.create({
          mode: 'payment',
          line_items: [{
            price_data: {
              currency: plan.currency || 'eur',
              product_data: { name: plan.name, description: plan.description || undefined },
              unit_amount: Math.round(Number(plan.price) * 100),
            },
            quantity: 1,
          }],
          success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=plan`,
          cancel_url: `${baseUrl}/payment-cancel`,
          customer_email: req.user.email || undefined,
          metadata: { planId, userId: req.user.id },
        });
      }

      // Create pending subscription record
      const periodEnd = plan.period === 'monthly'
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : plan.period === 'yearly'
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        : null;

      await storage.createUserSubscription({
        userId: req.user.id,
        planId,
        status: 'pending',
        reportsUsed: 0,
        reportsIncluded: plan.reportsIncluded,
        stripeSessionId: session.id,
        currentPeriodEnd: periodEnd,
      });

      res.json({ url: session.url, sessionId: session.id });
    } catch (error) {
      console.error("Subscription checkout error:", error);
      res.status(500).json({ message: "Erreur lors de la création du paiement" });
    }
  });

  // Confirm subscription after payment
  app.post('/api/subscriptions/confirm', async (req, res) => {
    try {
      const { sessionId } = req.body;
      if (!sessionId) return res.status(400).json({ message: "sessionId requis" });

      const sub = await storage.getSubscriptionBySessionId(sessionId);
      if (!sub) return res.status(404).json({ message: "Abonnement introuvable" });

      const { getStripe } = await import('./stripeService');
      const stripe = getStripe();
      if (stripe) {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid' || session.status === 'complete') {
          await storage.updateUserSubscription(sub.id, {
            status: 'active',
            stripeSubscriptionId: session.subscription as string || undefined,
          });
          return res.json({ success: true });
        }
      }
      res.json({ success: false, status: sub.status });
    } catch (error) {
      res.status(500).json({ message: "Erreur de confirmation" });
    }
  });

  // Panel: CRUD plans
  app.get('/api/panel/plans', requirePanelAuth(), async (req: any, res) => {
    try {
      const plans = await storage.getSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Erreur" });
    }
  });

  app.post('/api/panel/plans', requirePanelAuth("admin"), async (req: any, res) => {
    try {
      const { name, description, price, currency, period, reportsIncluded, stripePriceId, stripeProductId, isActive, sortOrder } = req.body;
      if (!name || !price || !period) return res.status(400).json({ message: "name, price, period requis" });
      const plan = await storage.createSubscriptionPlan({
        name, description, price: String(price), currency: currency || 'eur',
        period, reportsIncluded: reportsIncluded || 5, stripePriceId, stripeProductId,
        isActive: isActive ?? true, sortOrder: sortOrder ?? 0,
      });
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Erreur création plan" });
    }
  });

  app.put('/api/panel/plans/:id', requirePanelAuth("admin"), async (req: any, res) => {
    try {
      const plan = await storage.updateSubscriptionPlan(req.params.id, req.body);
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Erreur mise à jour plan" });
    }
  });

  app.delete('/api/panel/plans/:id', requirePanelAuth("admin"), async (req: any, res) => {
    try {
      await storage.deleteSubscriptionPlan(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erreur suppression plan" });
    }
  });

  app.get('/api/panel/subscriptions', requirePanelAuth(), async (req: any, res) => {
    try {
      const subs = await storage.getAllSubscriptions();
      res.json(subs);
    } catch (error) {
      res.status(500).json({ message: "Erreur" });
    }
  });

  // Get user's AI reports (authenticated)
  app.get('/api/reports', async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Non autorisé" });
      }
      const reports = await storage.getAiReports(req.user.id);
      res.json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des rapports" });
    }
  });

  // Get single report (authenticated)
  app.get('/api/reports/:id', async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Non autorisé" });
      }
      const report = await storage.getAiReport(req.params.id);
      if (!report) {
        return res.status(404).json({ message: "Rapport non trouvé" });
      }
      if (report.userId && report.userId !== req.user.id && !["admin", "superadmin", "rootadmin"].includes(req.user.role || "")) {
        return res.status(403).json({ message: "Accès refusé" });
      }
      res.json(report);
    } catch (error) {
      console.error("Error fetching report:", error);
      res.status(500).json({ message: "Erreur lors de la récupération du rapport" });
    }
  });

  // Admin: Get all AI reports
  app.get('/api/admin/ai-reports', async (req, res) => {
    try {
      if (!req.user || !["admin", "superadmin", "rootadmin"].includes(req.user.role || "")) {
        return res.status(403).json({ message: "Accès refusé" });
      }
      const garageId = (req as any).tenantGarageId || undefined;
      const reports = garageId ? await storage.getAiReports(undefined, garageId) : await storage.getAllAiReports();
      res.json(reports);
    } catch (error) {
      console.error("Error fetching admin reports:", error);
      res.status(500).json({ message: "Erreur" });
    }
  });

  // Admin: Delete AI report
  app.delete('/api/admin/ai-reports/:id', async (req, res) => {
    try {
      if (!req.user || !["admin", "superadmin", "rootadmin"].includes(req.user.role || "")) {
        return res.status(403).json({ message: "Accès refusé" });
      }
      await storage.deleteAiReport(req.params.id);
      res.json({ message: "Rapport supprimé" });
    } catch (error) {
      console.error("Error deleting report:", error);
      res.status(500).json({ message: "Erreur" });
    }
  });

  // ========== PANEL AUTH (JWT-based, completely separate from SaaS) ==========

  const PANEL_JWT_SECRET = process.env.PANEL_JWT_SECRET || "panel-secret-autoreport-2024";

  async function verifyPanelToken(req: any): Promise<any | null> {
    try {
      const auth = req.headers.authorization;
      if (!auth?.startsWith("Bearer ")) return null;
      const token = auth.slice(7);
      const jwt = await import("jsonwebtoken");
      const decoded = jwt.default.verify(token, PANEL_JWT_SECRET) as any;
      const user = await storage.getPanelUserById(decoded.id);
      return user || null;
    } catch {
      return null;
    }
  }

  // Role hierarchy: superadmin > admin > manager
  const ROLE_LEVELS: Record<string, number> = { manager: 1, admin: 2, superadmin: 3 };

  function requirePanelAuth(minRole?: string) {
    return async (req: any, res: any, next: any) => {
      const user = await verifyPanelToken(req);
      if (!user) return res.status(401).json({ message: "Non authentifié" });
      if (minRole) {
        const userLevel = ROLE_LEVELS[user.role] ?? 0;
        const required = ROLE_LEVELS[minRole] ?? 99;
        if (userLevel < required) return res.status(403).json({ message: "Accès refusé — niveau insuffisant" });
      }
      req.panelUser = user;
      next();
    };
  }

  // Panel login
  app.post('/api/panel/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ message: "Email et mot de passe requis" });
      const user = await storage.getPanelUserByEmail(email);
      if (!user) return res.status(401).json({ message: "Identifiants invalides" });
      const bcrypt = await import("bcrypt");
      const valid = await bcrypt.default.compare(password, user.passwordHash);
      if (!valid) return res.status(401).json({ message: "Identifiants invalides" });
      const jwt = await import("jsonwebtoken");
      const token = jwt.default.sign({ id: user.id, email: user.email, role: user.role }, PANEL_JWT_SECRET, { expiresIn: "7d" });
      const { passwordHash: _, ...safeUser } = user;
      res.json({ token, user: safeUser });
    } catch (error) {
      console.error("Panel login error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Panel me
  app.get('/api/panel/auth/me', requirePanelAuth(), async (req: any, res) => {
    const { passwordHash: _, ...safeUser } = req.panelUser;
    res.json(safeUser);
  });

  // Panel: list users (admin+)
  app.get('/api/panel/users', requirePanelAuth("admin"), async (req: any, res) => {
    try {
      const users = await storage.getAllPanelUsers();
      res.json(users.map(({ passwordHash: _, ...u }) => u));
    } catch { res.status(500).json({ message: "Erreur" }); }
  });

  // Panel: create user (admin+) — cannot create a role higher than own
  app.post('/api/panel/users', requirePanelAuth("admin"), async (req: any, res) => {
    try {
      const { email, password, role, firstName, lastName } = req.body;
      if (!email || !password) return res.status(400).json({ message: "Email et mot de passe requis" });
      const allowedRole = role || "manager";
      const callerLevel = ROLE_LEVELS[req.panelUser.role] ?? 0;
      const targetLevel = ROLE_LEVELS[allowedRole] ?? 0;
      if (targetLevel >= callerLevel) return res.status(403).json({ message: "Vous ne pouvez pas créer un rôle supérieur ou égal au vôtre" });
      const bcrypt = await import("bcrypt");
      const hash = await bcrypt.default.hash(password, 10);
      const user = await storage.createPanelUser({ email, passwordHash: hash, role: allowedRole, firstName, lastName });
      const { passwordHash: _, ...safe } = user;
      res.json(safe);
    } catch (error: any) {
      if (error.code === "23505") return res.status(409).json({ message: "Email déjà utilisé" });
      res.status(500).json({ message: "Erreur" });
    }
  });

  // Panel: update user (admin+) — cannot promote above own level
  app.put('/api/panel/users/:id', requirePanelAuth("admin"), async (req: any, res) => {
    try {
      const { email, password, role, firstName, lastName } = req.body;
      const callerLevel = ROLE_LEVELS[req.panelUser.role] ?? 0;
      if (role) {
        const targetLevel = ROLE_LEVELS[role] ?? 0;
        if (targetLevel >= callerLevel) return res.status(403).json({ message: "Vous ne pouvez pas assigner un rôle supérieur ou égal au vôtre" });
      }
      const updates: any = { firstName, lastName };
      if (email) updates.email = email;
      if (role) updates.role = role;
      if (password) {
        const bcrypt = await import("bcrypt");
        updates.passwordHash = await bcrypt.default.hash(password, 10);
      }
      const user = await storage.updatePanelUser(req.params.id, updates);
      const { passwordHash: _, ...safe } = user;
      res.json(safe);
    } catch (error: any) {
      if (error.code === "23505") return res.status(409).json({ message: "Email déjà utilisé" });
      res.status(500).json({ message: "Erreur" });
    }
  });

  // Panel: delete user (admin+) — cannot delete self
  app.delete('/api/panel/users/:id', requirePanelAuth("admin"), async (req: any, res) => {
    try {
      if (req.panelUser.id === req.params.id) return res.status(400).json({ message: "Vous ne pouvez pas vous supprimer" });
      await storage.deletePanelUser(req.params.id);
      res.json({ message: "Utilisateur supprimé" });
    } catch { res.status(500).json({ message: "Erreur" }); }
  });

  // Panel: manager resets own password only
  app.put('/api/panel/auth/change-password', requirePanelAuth(), async (req: any, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) return res.status(400).json({ message: "Mot de passe actuel et nouveau requis" });
      if (newPassword.length < 8) return res.status(400).json({ message: "Le nouveau mot de passe doit contenir au moins 8 caractères" });
      const bcrypt = await import("bcrypt");
      const valid = await bcrypt.default.compare(currentPassword, req.panelUser.passwordHash);
      if (!valid) return res.status(401).json({ message: "Mot de passe actuel incorrect" });
      const hash = await bcrypt.default.hash(newPassword, 10);
      await storage.updatePanelUser(req.panelUser.id, { passwordHash: hash });
      res.json({ message: "Mot de passe mis à jour" });
    } catch { res.status(500).json({ message: "Erreur" }); }
  });

  // ========== PANEL ROUTES ==========

  // Public: Get landing settings (used by landing page)
  app.get('/api/landing/settings', async (req, res) => {
    try {
      const settings = await storage.getLandingSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching landing settings:", error);
      res.json({
        appName: "AutoReport", appTagline: "Rapports automobiles intelligents propulsés par l'IA.",
        heroTitle: "Diagnostics automobiles nouvelle génération",
        heroSubtitle: "Analysez votre véhicule en quelques secondes grâce à notre moteur d'intelligence artificielle.",
        heroCta: "Analyser mon véhicule", contactEmail: "support@autoreport.com",
        contactPhone: "+33 (0)1 21 40 80 80", contactAddress: "75, Rue de la République, 75011 Paris",
        footerCopyright: "AutoReport. Tous droits réservés.", primaryColor: "#CE1126", fontFamily: "Exo 2",
      });
    }
  });

  // Admin: Get landing settings
  app.get('/api/panel/settings', requirePanelAuth(), async (req: any, res) => {
    try {
      const settings = await storage.getLandingSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Erreur" });
    }
  });

  // Admin: Update landing settings
  app.put('/api/panel/settings', requirePanelAuth(), async (req: any, res) => {
    try {
      const updated = await storage.updateLandingSettings(req.body);
      res.json(updated);
    } catch (error) {
      console.error("Error updating landing settings:", error);
      res.status(500).json({ message: "Erreur" });
    }
  });

  // Admin: Get all reports for panel
  app.get('/api/panel/reports', requirePanelAuth(), async (req: any, res) => {
    try {
      const reports = await storage.getAllAiReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Erreur" });
    }
  });

  // Admin: Delete report
  app.delete('/api/panel/reports/:id', requirePanelAuth(), async (req: any, res) => {
    try {
      await storage.deleteAiReport(req.params.id);
      res.json({ message: "Rapport supprimé" });
    } catch { res.status(500).json({ message: "Erreur" }); }
  });

  // Admin: Get report stats
  app.get('/api/panel/stats', requirePanelAuth(), async (req: any, res) => {
    try {
      const reports = await storage.getAllAiReports();
      const total = reports.length;
      const byUrgency = { low: 0, medium: 0, high: 0, critical: 0 };
      const byMake: Record<string, number> = {};
      const byDay: Record<string, number> = {};
      for (const r of reports) {
        const urgency = (r.metadata as any)?.urgencyLevel || "medium";
        byUrgency[urgency as keyof typeof byUrgency] = (byUrgency[urgency as keyof typeof byUrgency] || 0) + 1;
        const make = r.make.toLowerCase();
        byMake[make] = (byMake[make] || 0) + 1;
        if (r.createdAt) {
          const day = new Date(r.createdAt).toISOString().split('T')[0];
          byDay[day] = (byDay[day] || 0) + 1;
        }
      }
      const topMakes = Object.entries(byMake).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, count]) => ({ name, count }));
      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(); d.setDate(d.getDate() - (29 - i));
        const key = d.toISOString().split('T')[0];
        return { date: key, count: byDay[key] || 0 };
      });
      res.json({ total, byUrgency, topMakes, last30Days });
    } catch (error) {
      res.status(500).json({ message: "Erreur" });
    }
  });

  // Panel: Export reports as CSV
  app.get('/api/panel/reports/export', requirePanelAuth(), async (req: any, res) => {
    try {
      const reports = await storage.getAllAiReports();
      const header = ['ID','Marque','Modèle','Année','Kilométrage','Problème','Urgence','Coût estimé','Statut','Date'];
      const rows = reports.map(r => {
        const meta = r.metadata as any || {};
        return [
          r.id, r.make, r.model, r.year, r.mileage || '', `"${(r.issue || '').replace(/"/g,'""')}"`,
          meta.urgencyLevel || '', meta.estimatedCost || '', r.status,
          r.createdAt ? new Date(r.createdAt).toLocaleDateString('fr-FR') : ''
        ].join(',');
      });
      const csv = [header.join(','), ...rows].join('\n');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="rapports-${Date.now()}.csv"`);
      res.send('\uFEFF' + csv);
    } catch { res.status(500).json({ message: "Erreur export" }); }
  });

  // Panel: Get AI prompt
  app.get('/api/panel/prompt', requirePanelAuth(), async (req: any, res) => {
    try {
      const settings = await storage.getLandingSettings();
      res.json({ prompt: settings.aiPrompt || null });
    } catch { res.status(500).json({ message: "Erreur" }); }
  });

  // Panel: Update AI prompt (admin+)
  app.put('/api/panel/prompt', requirePanelAuth("admin"), async (req: any, res) => {
    try {
      const { prompt } = req.body;
      await storage.updateLandingSettings({ aiPrompt: prompt || null });
      res.json({ message: "Prompt mis à jour", prompt });
    } catch { res.status(500).json({ message: "Erreur" }); }
  });

  // =====================================================================
  // Panel: Feature Flags
  // =====================================================================

  app.get('/api/panel/feature-flags', requirePanelAuth(), async (req: any, res) => {
    try {
      const { featureFlags } = await import("@shared/schema");
      const flags = await db.select().from(featureFlags).orderBy(featureFlags.key);
      res.json(flags);
    } catch { res.status(500).json({ message: "Erreur récupération feature flags" }); }
  });

  app.post('/api/panel/feature-flags', requirePanelAuth("admin"), async (req: any, res) => {
    try {
      const { featureFlags } = await import("@shared/schema");
      const { key, enabled, description } = req.body;
      if (!key || typeof key !== "string" || !/^[a-z0-9_]+$/.test(key)) {
        return res.status(400).json({ message: "Clé invalide (minuscules, chiffres, underscores uniquement)" });
      }
      const [existing] = await db.select().from(featureFlags).where(eq(featureFlags.key, key));
      if (existing) return res.status(409).json({ message: "Ce flag existe déjà" });
      const [created] = await db.insert(featureFlags).values({
        key: key.toLowerCase(),
        enabled: !!enabled,
        description: description || null,
        updatedBy: (req as any).panelUser?.email || "panel",
      }).returning();
      res.status(201).json(created);
    } catch { res.status(500).json({ message: "Erreur création feature flag" }); }
  });

  app.patch('/api/panel/feature-flags/:key', requirePanelAuth("admin"), async (req: any, res) => {
    try {
      const { featureFlags } = await import("@shared/schema");
      const { key } = req.params;
      const { enabled, description } = req.body;
      const updates: Record<string, unknown> = { updatedAt: new Date(), updatedBy: (req as any).panelUser?.email || "panel" };
      if (typeof enabled === "boolean") updates.enabled = enabled;
      if (typeof description === "string") updates.description = description;
      const [updated] = await db.update(featureFlags).set(updates).where(eq(featureFlags.key, key)).returning();
      if (!updated) return res.status(404).json({ message: "Flag introuvable" });
      res.json(updated);
    } catch { res.status(500).json({ message: "Erreur mise à jour feature flag" }); }
  });

  app.delete('/api/panel/feature-flags/:key', requirePanelAuth("admin"), async (req: any, res) => {
    try {
      const { featureFlags } = await import("@shared/schema");
      const { key } = req.params;
      await db.delete(featureFlags).where(eq(featureFlags.key, key));
      res.json({ message: "Flag supprimé" });
    } catch { res.status(500).json({ message: "Erreur suppression feature flag" }); }
  });

  // Public: check one flag (read-only, no sensitive data)
  app.get('/api/feature-flags/:key', async (req: any, res) => {
    try {
      const { featureFlags } = await import("@shared/schema");
      const [flag] = await db.select({ enabled: featureFlags.enabled }).from(featureFlags).where(eq(featureFlags.key, req.params.key));
      res.json({ enabled: flag?.enabled ?? false });
    } catch { res.json({ enabled: false }); }
  });

  // =====================================================================
  // Panel: Maintenance Mode (lecture seule — contrôlé par env MAINTENANCE_MODE)
  // =====================================================================

  app.get('/api/panel/maintenance-status', requirePanelAuth(), async (req: any, res) => {
    res.json({ maintenance: process.env.MAINTENANCE_MODE === "true" });
  });

  // Panel: Repair Sheets — list all
  app.get('/api/panel/repair-sheets', requirePanelAuth(), async (req: any, res) => {
    try {
      const sheets = await storage.getAllRepairSheets();
      res.json(sheets);
    } catch { res.status(500).json({ message: "Erreur" }); }
  });

  // Panel: Repair Sheets — get one
  app.get('/api/panel/repair-sheets/:id', requirePanelAuth(), async (req: any, res) => {
    try {
      const sheet = await storage.getRepairSheet(req.params.id);
      if (!sheet) return res.status(404).json({ message: "Fiche non trouvée" });
      res.json(sheet);
    } catch { res.status(500).json({ message: "Erreur" }); }
  });

  // Panel: Repair Sheets — create (from report or scratch)
  app.post('/api/panel/repair-sheets', requirePanelAuth(), async (req: any, res) => {
    try {
      const data = req.body;
      const sheet = await storage.createRepairSheet({
        reportId: data.reportId || null,
        reportSnapshot: data.reportSnapshot || null,
        status: data.status || 'draft',
        clientName: data.clientName || null,
        clientEmail: data.clientEmail || null,
        clientPhone: data.clientPhone || null,
        clientAddress: data.clientAddress || null,
        vehicleMake: data.vehicleMake || null,
        vehicleModel: data.vehicleModel || null,
        vehicleYear: data.vehicleYear || null,
        vehicleMileage: data.vehicleMileage || null,
        vehiclePlate: data.vehiclePlate || null,
        diagnosticSummary: data.diagnosticSummary || null,
        repairItems: data.repairItems || [],
        quoteSubtotal: data.quoteSubtotal || '0',
        quoteTax: data.quoteTax || '0',
        quoteDiscount: data.quoteDiscount || '0',
        quoteTotal: data.quoteTotal || '0',
        notes: data.notes || null,
        technicianName: data.technicianName || null,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
      });
      res.json(sheet);
    } catch (e) { console.error(e); res.status(500).json({ message: "Erreur création fiche" }); }
  });

  // Panel: Repair Sheets — update
  app.put('/api/panel/repair-sheets/:id', requirePanelAuth(), async (req: any, res) => {
    try {
      const data = req.body;
      const updates: any = { ...data };
      if (data.scheduledAt) updates.scheduledAt = new Date(data.scheduledAt);
      if (data.status === 'completed' && !data.completedAt) updates.completedAt = new Date();
      const sheet = await storage.updateRepairSheet(req.params.id, updates);
      res.json(sheet);
    } catch { res.status(500).json({ message: "Erreur mise à jour" }); }
  });

  // Panel: Repair Sheets — delete
  app.delete('/api/panel/repair-sheets/:id', requirePanelAuth(), async (req: any, res) => {
    try {
      await storage.deleteRepairSheet(req.params.id);
      res.json({ message: "Fiche supprimée" });
    } catch { res.status(500).json({ message: "Erreur" }); }
  });

  // Forgot password - Request password reset
  app.post('/api/auth/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "L'email est requis" });
      }
      
      const user = await storage.getUserByEmail(email);
      
      // Always return success message to prevent email enumeration
      if (!user) {
        return res.json({ 
          message: "Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation." 
        });
      }
      
      // Generate a secure token
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      
      // Save the token
      await storage.createPasswordResetToken({
        userId: user.id,
        token,
        expiresAt,
      });
      
      const resetUrl = buildUrl(req, `/reset-password/${token}`);
      
      // Send email
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Réinitialisation de mot de passe</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${getEmailHeader('AUTOREPORT')}
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #dc2626; margin-top: 0;">Réinitialisation de mot de passe</h2>
            
            <p>Bonjour ${user.firstName || user.email},</p>
            
            <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Réinitialiser mon mot de passe
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">Ce lien est valable pendant 1 heure.</p>
            
            <p style="color: #666; font-size: 14px;">Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
            
            <p>Cordialement,<br><strong>L'équipe AUTOREPORT</strong></p>
          </div>
          
          ${getEmailFooter('AUTOREPORT')}
        </body>
        </html>
      `;
      
      const emailResult = await sendEmail({
        to: user.email,
        subject: "Réinitialisation de votre mot de passe - AUTOREPORT",
        html: emailHtml,
        text: `Bonjour, cliquez sur ce lien pour réinitialiser votre mot de passe: ${resetUrl}. Ce lien est valable 1 heure.`,
      });
      
      if (!emailResult.success) {
        console.error("Failed to send password reset email:", emailResult.error);
      }
      
      res.json({ 
        message: "Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation." 
      });
    } catch (error) {
      console.error("Error in forgot-password:", error);
      res.status(500).json({ message: "Une erreur est survenue. Veuillez réessayer." });
    }
  });

  // Verify reset token
  app.get('/api/auth/reset-password/:token', async (req, res) => {
    try {
      const { token } = req.params;
      
      const resetToken = await storage.getPasswordResetToken(token);
      
      if (!resetToken) {
        return res.status(400).json({ valid: false, message: "Lien invalide ou expiré" });
      }
      
      if (resetToken.used) {
        return res.status(400).json({ valid: false, message: "Ce lien a déjà été utilisé" });
      }
      
      if (new Date() > new Date(resetToken.expiresAt)) {
        return res.status(400).json({ valid: false, message: "Ce lien a expiré" });
      }
      
      res.json({ valid: true });
    } catch (error) {
      console.error("Error verifying reset token:", error);
      res.status(500).json({ valid: false, message: "Une erreur est survenue" });
    }
  });

  // Reset password with token
  app.post('/api/auth/reset-password', async (req, res) => {
    try {
      const { token, password } = req.body;
      
      if (!token || !password) {
        return res.status(400).json({ message: "Token et mot de passe requis" });
      }
      
      if (password.length < 6) {
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères" });
      }
      
      const resetToken = await storage.getPasswordResetToken(token);
      
      if (!resetToken) {
        return res.status(400).json({ message: "Lien invalide ou expiré" });
      }
      
      if (resetToken.used) {
        return res.status(400).json({ message: "Ce lien a déjà été utilisé" });
      }
      
      if (new Date() > new Date(resetToken.expiresAt)) {
        return res.status(400).json({ message: "Ce lien a expiré" });
      }
      
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Update user's password
      await storage.updateUser(resetToken.userId, { password: hashedPassword });
      
      // Mark token as used
      await storage.markPasswordResetTokenUsed(token);
      
      res.json({ message: "Mot de passe réinitialisé avec succès" });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Une erreur est survenue. Veuillez réessayer." });
    }
  });

  // ========== CSV IMPORT ROUTES (Root Admin only) ==========
  app.post("/api/admin/import/csv", isAuthenticated, isRootAdmin, async (req: any, res) => {
    try {
      const { table, data, garageId: bodyGarageId } = req.body;
      const validTables = ["users", "quotes", "invoices", "reservations"];
      
      if (!validTables.includes(table)) {
        return res.status(400).json({ message: "Table non supportée pour l'import" });
      }

      if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ message: "Données invalides" });
      }

      const garageId = bodyGarageId || null;
      let successCount = 0;
      let errorCount = 0;

      for (const item of data) {
        try {
          // Add garageId context if not present and table supports it
          if (table !== "users" || item.role !== "superadmin") {
            item.garageId = item.garageId || garageId;
          }

          if (table === "users") {
            if (item.password) {
              item.password = await bcrypt.hash(item.password, 10);
            }
            await storage.createUser(item);
          } else if (table === "quotes") {
            await storage.createQuote(item);
          } else if (table === "invoices") {
            await storage.createInvoice(item);
          } else if (table === "reservations") {
            await storage.createReservation(item);
          }
          successCount++;
        } catch (err: any) {
          console.error(`[Import] Error importing into ${table}:`, err.message);
          errorCount++;
        }
      }

      res.json({ 
        message: "Import terminé", 
        successCount, 
        errorCount,
        total: data.length
      });
    } catch (error: any) {
      console.error("[Import] Global error:", error);
      res.status(500).json({ message: "Erreur lors de l'import CSV", error: error.message });
    }
  });

  // ========== ANALYTICS ROUTES ==========
  app.get("/api/admin/analytics", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      let garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      if (req.user?.role === "superadmin" && req.query.garageId) {
        garageId = req.query.garageId as string;
      }
      const { startDate, endDate, paymentMethod, serviceId } = req.query;
      
      const allInvoices = await storage.getInvoices(undefined, garageId);
      const allQuotes = await storage.getQuotes(undefined, garageId);
      const allServices = await storage.getServices();
      const allReservations = await storage.getReservations(undefined, garageId);

      // Apply date filters if provided
      const dateStart = startDate ? new Date(startDate as string) : null;
      const dateEnd = endDate ? new Date(endDate as string) : null;
      
      let filteredInvoices = allInvoices;
      let filteredQuotes = allQuotes;
      
      if (dateStart) {
        filteredInvoices = filteredInvoices.filter(i => new Date(i.createdAt!) >= dateStart);
        filteredQuotes = filteredQuotes.filter(q => new Date(q.createdAt!) >= dateStart);
      }
      if (dateEnd) {
        const endOfDay = new Date(dateEnd);
        endOfDay.setHours(23, 59, 59, 999);
        filteredInvoices = filteredInvoices.filter(i => new Date(i.createdAt!) <= endOfDay);
        filteredQuotes = filteredQuotes.filter(q => new Date(q.createdAt!) <= endOfDay);
      }
      if (paymentMethod && paymentMethod !== 'all') {
        filteredInvoices = filteredInvoices.filter(i => i.paymentMethod === paymentMethod);
      }
      if (serviceId && serviceId !== 'all') {
        filteredQuotes = filteredQuotes.filter(q => q.serviceId === serviceId);
        const quoteIds = new Set(filteredQuotes.map(q => q.id));
        filteredInvoices = filteredInvoices.filter(i => i.quoteId && quoteIds.has(i.quoteId));
      }

      // Monthly revenue calculation (last 12 months) - uses filtered data
      const monthlyRevenue: Record<string, number> = {};
      const now = new Date();
      for (let i = 0; i < 12; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = d.toLocaleString('fr-FR', { month: 'short', year: 'numeric' });
        monthlyRevenue[monthKey] = 0;
      }

      filteredInvoices.filter(inv => inv.status === "paid").forEach(inv => {
        const paymentDate = new Date(inv.paidAt || inv.createdAt!);
        const monthKey = paymentDate.toLocaleString('fr-FR', { month: 'short', year: 'numeric' });
        if (monthlyRevenue.hasOwnProperty(monthKey)) {
          monthlyRevenue[monthKey] += parseFloat(inv.amount || "0");
        }
      });

      // Revenue by payment method - uses filtered data
      const revenueByPaymentMethod: Record<string, number> = {
        card: 0,
        wire_transfer: 0,
        cash: 0,
        check: 0
      };
      filteredInvoices.filter(i => i.status === "paid").forEach(inv => {
        const method = inv.paymentMethod || 'other';
        if (revenueByPaymentMethod.hasOwnProperty(method)) {
          revenueByPaymentMethod[method] += parseFloat(inv.amount || "0");
        }
      });

      // Revenue by service - uses filtered data
      const revenueByService: Record<string, { name: string; revenue: number; count: number }> = {};
      allServices.forEach(s => {
        revenueByService[s.id] = { name: s.name, revenue: 0, count: 0 };
      });
      
      filteredQuotes.forEach(q => {
        if (q.serviceId && revenueByService[q.serviceId]) {
          revenueByService[q.serviceId].count += 1;
        }
      });
      
      filteredInvoices.filter(i => i.status === "paid").forEach(inv => {
        const quote = filteredQuotes.find(q => q.id === inv.quoteId);
        if (quote?.serviceId && revenueByService[quote.serviceId]) {
          revenueByService[quote.serviceId].revenue += parseFloat(inv.amount || "0");
        }
      });

      // Weekly distribution (for last 4 weeks) - uses filtered data
      const weeklyRevenue: { week: string; revenue: number; invoices: number }[] = [];
      for (let i = 0; i < 4; i++) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - (7 * (i + 1)));
        const weekEnd = new Date(now);
        weekEnd.setDate(weekEnd.getDate() - (7 * i));
        
        const weekInvoices = filteredInvoices.filter(inv => {
          const date = new Date(inv.paidAt || inv.createdAt!);
          return inv.status === "paid" && date >= weekStart && date < weekEnd;
        });
        
        weeklyRevenue.unshift({
          week: `S-${i}`,
          revenue: weekInvoices.reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0),
          invoices: weekInvoices.length
        });
      }

      // Invoice status breakdown
      const invoiceStatusStats = {
        paid: filteredInvoices.filter(i => i.status === "paid").length,
        pending: filteredInvoices.filter(i => i.status === "pending").length,
        overdue: filteredInvoices.filter(i => i.status === "overdue").length,
        cancelled: filteredInvoices.filter(i => i.status === "cancelled").length,
      };

      // Quote status breakdown
      const quoteStatusStats = {
        pending: filteredQuotes.filter(q => q.status === "pending").length,
        approved: filteredQuotes.filter(q => q.status === "approved").length,
        accepted: filteredQuotes.filter(q => q.status === "accepted").length,
        rejected: filteredQuotes.filter(q => q.status === "rejected").length,
        completed: filteredQuotes.filter(q => q.status === "completed").length,
      };

      // Quote conversion rate
      const conversionRate = filteredQuotes.length > 0 
        ? ((filteredQuotes.filter(q => q.status === "approved" || q.status === "accepted" || q.status === "completed").length / filteredQuotes.length) * 100).toFixed(1)
        : "0";

      // Average invoice amount
      const paidInvoices = filteredInvoices.filter(i => i.status === "paid");
      const avgInvoiceAmount = paidInvoices.length > 0
        ? paidInvoices.reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0) / paidInvoices.length
        : 0;

      const globalRevenue = filteredInvoices
        .filter(i => i.status === "paid")
        .reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);

      // Pending revenue (unpaid invoices)
      const pendingRevenue = filteredInvoices
        .filter(i => i.status === "pending" || i.status === "overdue")
        .reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);

      // Current month metrics (always based on current month, not filters)
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      
      const currentMonthInvoices = allInvoices.filter(i => {
        const date = new Date(i.paidAt || i.createdAt!);
        return date >= currentMonthStart && date <= currentMonthEnd;
      });
      const currentMonthQuotes = allQuotes.filter(q => {
        const date = new Date(q.createdAt!);
        return date >= currentMonthStart && date <= currentMonthEnd;
      });
      
      const currentMonthRevenue = currentMonthInvoices
        .filter(i => i.status === "paid")
        .reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      
      const currentMonthPending = currentMonthInvoices
        .filter(i => i.status === "pending" || i.status === "overdue")
        .reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      
      const currentMonthInvoiceCount = currentMonthInvoices.length;
      const currentMonthQuoteCount = currentMonthQuotes.length;
      const currentMonthPaidCount = currentMonthInvoices.filter(i => i.status === "paid").length;
      
      // Last month comparison
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      const lastMonthRevenue = allInvoices
        .filter(i => {
          const date = new Date(i.paidAt || i.createdAt!);
          return i.status === "paid" && date >= lastMonthStart && date <= lastMonthEnd;
        })
        .reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      
      const revenueGrowth = lastMonthRevenue > 0 
        ? (((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1)
        : currentMonthRevenue > 0 ? "100" : "0";

      // Get all unique clients for filter
      const allUsers = garageId ? await storage.getUsersByGarage(garageId) : await storage.getAllUsers();
      const clients = allUsers
        .filter(u => u.role === 'client')
        .map(u => ({ id: u.id, name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email || 'Client' }));

      // Daily revenue for last 30 days
      const dailyRevenue: { date: string; revenue: number; invoices: number }[] = [];
      const dailyViews: { date: string; quotes: number; invoices: number }[] = [];

      for (let i = 29; i >= 0; i--) {
        const dayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        const dateStr = dayDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
        const dayEnd = new Date(dayDate);
        dayEnd.setHours(23, 59, 59, 999);
        const dayStart = new Date(dayDate);
        dayStart.setHours(0, 0, 0, 0);
        
        const dayInvoices = filteredInvoices.filter(inv => {
          const date = new Date(inv.createdAt!);
          return date >= dayStart && date <= dayEnd;
        });

        dailyRevenue.push({
          date: dateStr,
          revenue: dayInvoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + parseFloat(inv.amount || "0"), 0),
          invoices: dayInvoices.length,
        });

        const dayQuoteViews = filteredQuotes.filter(q => {
          if (!q.viewedAt) return false;
          const vDate = new Date(q.viewedAt);
          return vDate >= dayStart && vDate <= dayEnd;
        }).length;

        const dayInvoiceViews = filteredInvoices.filter(inv => {
          if (!inv.viewedAt) return false;
          const vDate = new Date(inv.viewedAt);
          return vDate >= dayStart && vDate <= dayEnd;
        }).length;

        dailyViews.push({
          date: dateStr,
          quotes: dayQuoteViews,
          invoices: dayInvoiceViews,
        });
      }

      // Get settings for daily objective
      const appSettings = await storage.getApplicationSettings();
      const dailyObjective = parseFloat((appSettings as any)?.dailyRevenueObjective || "0");

      res.json({
        monthlyRevenue: Object.entries(monthlyRevenue).reverse().map(([name, total]) => ({ name, total })),
        weeklyRevenue,
        dailyRevenue,
        dailyObjective,
        dailyViews,
        revenueByPaymentMethod: Object.entries(revenueByPaymentMethod).map(([method, amount]) => ({
          method: method === 'card' ? 'Carte' : method === 'wire_transfer' ? 'Virement' : method === 'cash' ? 'Espèces' : 'Chèque',
          amount
        })),
        revenueByService: Object.values(revenueByService).filter(s => s.count > 0 || s.revenue > 0),
        invoiceStatusStats,
        quoteStatusStats,
        globalRevenue,
        pendingRevenue,
        avgInvoiceAmount,
        conversionRate,
        totalInvoices: filteredInvoices.length,
        totalQuotes: filteredQuotes.length,
        totalReservations: allReservations.length,
        tracking: {
          quotesSent: allQuotes.filter(q => q.emailSentAt).length,
          quotesViewed: allQuotes.filter(q => q.viewedAt).length,
          quotesNotSent: allQuotes.filter(q => !q.emailSentAt).length,
          invoicesSent: allInvoices.filter(i => i.emailSentAt).length,
          invoicesViewed: allInvoices.filter(i => i.viewedAt).length,
          invoicesNotSent: allInvoices.filter(i => !i.emailSentAt).length,
        },
        services: allServices.map(s => ({ id: s.id, name: s.name })),
        clients,
        filterApplied: !!(startDate || endDate || (paymentMethod && paymentMethod !== 'all') || (serviceId && serviceId !== 'all')),
        filteredInvoiceIds: filteredInvoices.map(i => i.id),
        filteredQuoteIds: filteredQuotes.map(q => q.id),
        currentMonth: {
          revenue: currentMonthRevenue,
          pending: currentMonthPending,
          invoiceCount: currentMonthInvoiceCount,
          quoteCount: currentMonthQuoteCount,
          paidCount: currentMonthPaidCount,
          growth: revenueGrowth,
          monthName: now.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })
        }
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // ========== ADVANCED ANALYTICS ==========
  app.get("/api/admin/advanced-analytics", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const allInvoices = await storage.getInvoices(undefined, garageId);
      const allQuotes = await storage.getQuotes(undefined, garageId);
      const allServices = await storage.getServices();
      const allReservations = await storage.getReservations(undefined, garageId);
      const allUsers = garageId ? await storage.getUsersByGarage(garageId) : await storage.getAllUsers();
      const clients = allUsers.filter(u => u.role === 'client');

      const now = new Date();
      const paidInvoices = allInvoices.filter(i => i.status === "paid");

      // ---- 1. SERVICE TRENDS (12 months) ----
      const serviceMonthlyData: Record<string, Record<string, { revenue: number; count: number }>> = {};
      allServices.forEach(s => { serviceMonthlyData[s.id] = {}; });

      for (let m = 0; m < 12; m++) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0, 23, 59, 59, 999);
        const monthKey = monthStart.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });

        allServices.forEach(s => {
          const sQuotes = allQuotes.filter(q => q.serviceId === s.id);
          const sQuoteIds = new Set(sQuotes.map(q => q.id));
          const monthInvoices = paidInvoices.filter(inv => {
            const d = new Date(inv.createdAt!);
            return d >= monthStart && d <= monthEnd && inv.quoteId && sQuoteIds.has(inv.quoteId);
          });
          const monthQuotes = sQuotes.filter(q => {
            const d = new Date(q.createdAt!);
            return d >= monthStart && d <= monthEnd;
          });
          serviceMonthlyData[s.id][monthKey] = {
            revenue: monthInvoices.reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0),
            count: monthQuotes.length
          };
        });
      }

      const serviceTrends = allServices.map(s => {
        const months = Object.entries(serviceMonthlyData[s.id]).reverse();
        const totalRevenue = months.reduce((sum, [, d]) => sum + d.revenue, 0);
        const totalCount = months.reduce((sum, [, d]) => sum + d.count, 0);
        const recentHalf = months.slice(Math.floor(months.length / 2));
        const olderHalf = months.slice(0, Math.floor(months.length / 2));
        const recentRevenue = recentHalf.reduce((sum, [, d]) => sum + d.revenue, 0);
        const olderRevenue = olderHalf.reduce((sum, [, d]) => sum + d.revenue, 0);
        const trend = olderRevenue > 0 ? ((recentRevenue - olderRevenue) / olderRevenue * 100) : (recentRevenue > 0 ? 100 : 0);
        return {
          id: s.id,
          name: s.name,
          totalRevenue,
          totalCount,
          trend: parseFloat(trend.toFixed(1)),
          monthly: months.map(([month, d]) => ({ month, revenue: d.revenue, count: d.count })),
        };
      }).filter(s => s.totalRevenue > 0 || s.totalCount > 0).sort((a, b) => b.totalRevenue - a.totalRevenue);

      // Top & declining services
      const topServices = [...serviceTrends].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);
      const decliningServices = [...serviceTrends].filter(s => s.trend < 0).sort((a, b) => a.trend - b.trend).slice(0, 5);
      const growingServices = [...serviceTrends].filter(s => s.trend > 0).sort((a, b) => b.trend - a.trend).slice(0, 5);

      // ---- 2. FINANCIAL PERFORMANCE ----
      // Monthly cash flow (12 months)
      const cashFlow: { month: string; income: number; expenses: number; net: number }[] = [];
      for (let m = 11; m >= 0; m--) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0, 23, 59, 59, 999);
        const monthKey = monthStart.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });
        const income = paidInvoices.filter(inv => {
          const d = new Date(inv.createdAt!);
          return d >= monthStart && d <= monthEnd;
        }).reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
        cashFlow.push({ month: monthKey, income, expenses: 0, net: income });
      }

      // Revenue forecasting (next 3 months based on trailing 3m average)
      const last3Months = cashFlow.slice(-3);
      const avg3m = last3Months.reduce((sum, m) => sum + m.income, 0) / 3;
      const forecast: { month: string; projected: number; optimistic: number; pessimistic: number }[] = [];
      for (let m = 1; m <= 3; m++) {
        const futureMonth = new Date(now.getFullYear(), now.getMonth() + m, 1);
        const monthKey = futureMonth.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });
        forecast.push({
          month: monthKey,
          projected: Math.round(avg3m),
          optimistic: Math.round(avg3m * 1.2),
          pessimistic: Math.round(avg3m * 0.8),
        });
      }

      // Payment timing analysis
      const paymentDelays: number[] = [];
      paidInvoices.forEach(inv => {
        if (inv.createdAt && inv.paidAt) {
          const created = new Date(inv.createdAt);
          const paid = new Date(inv.paidAt);
          const days = Math.max(0, Math.floor((paid.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)));
          paymentDelays.push(days);
        }
      });
      const avgPaymentDelay = paymentDelays.length > 0 ? paymentDelays.reduce((s, d) => s + d, 0) / paymentDelays.length : 0;
      const medianPaymentDelay = paymentDelays.length > 0 ? paymentDelays.sort((a, b) => a - b)[Math.floor(paymentDelays.length / 2)] : 0;

      // Revenue by quarter
      const quarterlyRevenue: { quarter: string; revenue: number; invoiceCount: number }[] = [];
      for (let q = 3; q >= 0; q--) {
        const qStart = new Date(now.getFullYear(), now.getMonth() - (q * 3 + 2), 1);
        const qEnd = new Date(now.getFullYear(), now.getMonth() - (q * 3) + 1, 0, 23, 59, 59, 999);
        const qLabel = `T${Math.floor(qStart.getMonth() / 3) + 1} ${qStart.getFullYear()}`;
        const qInvoices = paidInvoices.filter(inv => {
          const d = new Date(inv.createdAt!);
          return d >= qStart && d <= qEnd;
        });
        quarterlyRevenue.push({
          quarter: qLabel,
          revenue: qInvoices.reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0),
          invoiceCount: qInvoices.length,
        });
      }

      // Invoice amount distribution
      const amountRanges = [
        { label: '0-100€', min: 0, max: 100 },
        { label: '100-300€', min: 100, max: 300 },
        { label: '300-500€', min: 300, max: 500 },
        { label: '500-1000€', min: 500, max: 1000 },
        { label: '1000-2000€', min: 1000, max: 2000 },
        { label: '2000€+', min: 2000, max: Infinity },
      ];
      const amountDistribution = amountRanges.map(r => ({
        range: r.label,
        count: paidInvoices.filter(i => {
          const amt = parseFloat(i.amount || "0");
          return amt >= r.min && amt < r.max;
        }).length,
      }));

      // ---- 3. CLIENT ANALYTICS ----
      const clientRevenue: Record<string, { name: string; email: string; revenue: number; invoiceCount: number; quoteCount: number; firstDate: Date | null; lastDate: Date | null }> = {};
      clients.forEach(c => {
        clientRevenue[c.id] = {
          name: `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.email || 'Client',
          email: c.email || '',
          revenue: 0,
          invoiceCount: 0,
          quoteCount: 0,
          firstDate: null,
          lastDate: null,
        };
      });

      paidInvoices.forEach(inv => {
        if (inv.userId && clientRevenue[inv.userId]) {
          const cr = clientRevenue[inv.userId];
          const amt = parseFloat(inv.amount || "0");
          cr.revenue += amt;
          cr.invoiceCount += 1;
          const d = new Date(inv.createdAt!);
          if (!cr.firstDate || d < cr.firstDate) cr.firstDate = d;
          if (!cr.lastDate || d > cr.lastDate) cr.lastDate = d;
        }
      });

      allQuotes.forEach(q => {
        if (q.userId && clientRevenue[q.userId]) {
          clientRevenue[q.userId].quoteCount += 1;
        }
      });

      const topClients = Object.values(clientRevenue)
        .filter(c => c.revenue > 0)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10)
        .map(c => ({
          name: c.name,
          email: c.email,
          revenue: c.revenue,
          invoiceCount: c.invoiceCount,
          quoteCount: c.quoteCount,
          avgInvoice: c.invoiceCount > 0 ? Math.round(c.revenue / c.invoiceCount) : 0,
        }));

      // Client acquisition by month (first activity = first quote or invoice date)
      const clientFirstActivity: Record<string, Date> = {};
      allQuotes.forEach(q => {
        if (q.userId) {
          const d = new Date(q.createdAt!);
          if (!clientFirstActivity[q.userId] || d < clientFirstActivity[q.userId]) {
            clientFirstActivity[q.userId] = d;
          }
        }
      });
      allInvoices.forEach(inv => {
        if (inv.userId) {
          const d = new Date(inv.createdAt!);
          if (!clientFirstActivity[inv.userId] || d < clientFirstActivity[inv.userId]) {
            clientFirstActivity[inv.userId] = d;
          }
        }
      });

      const clientAcquisition: { month: string; newClients: number }[] = [];
      for (let m = 11; m >= 0; m--) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0, 23, 59, 59, 999);
        const monthKey = monthStart.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });
        const newClients = Object.values(clientFirstActivity).filter(d => d >= monthStart && d <= monthEnd).length;
        clientAcquisition.push({ month: monthKey, newClients });
      }

      // Retention: clients with >1 invoice
      const returningClients = Object.values(clientRevenue).filter(c => c.invoiceCount > 1).length;
      const totalActiveClients = Object.values(clientRevenue).filter(c => c.invoiceCount > 0).length;
      const retentionRate = totalActiveClients > 0 ? ((returningClients / totalActiveClients) * 100).toFixed(1) : "0";

      // ---- 4. CONVERSION FUNNEL ----
      const totalQuotes = allQuotes.length;
      const approvedQuotes = allQuotes.filter(q => ["approved", "accepted", "completed"].includes(q.status || "")).length;
      const invoicedQuotes = allQuotes.filter(q => allInvoices.some(i => i.quoteId === q.id)).length;
      const paidQuotes = allQuotes.filter(q => paidInvoices.some(i => i.quoteId === q.id)).length;

      const conversionFunnel = [
        { stage: 'Devis créés', count: totalQuotes, percentage: 100 },
        { stage: 'Devis approuvés', count: approvedQuotes, percentage: totalQuotes > 0 ? parseFloat(((approvedQuotes / totalQuotes) * 100).toFixed(1)) : 0 },
        { stage: 'Facturés', count: invoicedQuotes, percentage: totalQuotes > 0 ? parseFloat(((invoicedQuotes / totalQuotes) * 100).toFixed(1)) : 0 },
        { stage: 'Payés', count: paidQuotes, percentage: totalQuotes > 0 ? parseFloat(((paidQuotes / totalQuotes) * 100).toFixed(1)) : 0 },
      ];

      // ---- 5. SEASONAL PATTERNS (day of week) ----
      const dayOfWeekRevenue: Record<string, { revenue: number; count: number }> = {
        'Lun': { revenue: 0, count: 0 }, 'Mar': { revenue: 0, count: 0 },
        'Mer': { revenue: 0, count: 0 }, 'Jeu': { revenue: 0, count: 0 },
        'Ven': { revenue: 0, count: 0 }, 'Sam': { revenue: 0, count: 0 },
        'Dim': { revenue: 0, count: 0 },
      };
      const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      paidInvoices.forEach(inv => {
        const d = new Date(inv.createdAt!);
        const dayName = dayNames[d.getDay()];
        dayOfWeekRevenue[dayName].revenue += parseFloat(inv.amount || "0");
        dayOfWeekRevenue[dayName].count += 1;
      });
      const weekdayDistribution = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => ({
        day,
        revenue: Math.round(dayOfWeekRevenue[day].revenue),
        count: dayOfWeekRevenue[day].count,
      }));

      // ---- 6. SUMMARY KPIs ----
      const totalRevenue = paidInvoices.reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      const paidAmount = totalRevenue;
      const pendingAmount = allInvoices.filter(i => i.status === "pending" || i.status === "overdue").reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      const forecastAmount = allQuotes.filter(q => q.status === "pending" || q.status === "approved").reduce((sum, i) => sum + parseFloat(i.quote_amount || "0"), 0);
      const avgTicket = paidInvoices.length > 0 ? totalRevenue / paidInvoices.length : 0;
      const overdueCount = allInvoices.filter(i => i.status === "overdue").length;

      res.json({
        serviceTrends,
        topServices,
        decliningServices,
        growingServices,
        cashFlow,
        forecast,
        quarterlyRevenue,
        amountDistribution,
        avgPaymentDelay: parseFloat(avgPaymentDelay.toFixed(1)),
        medianPaymentDelay,
        topClients,
        clientAcquisition,
        returningClients,
        totalActiveClients,
        retentionRate: parseFloat(retentionRate),
        conversionFunnel,
        weekdayDistribution,
        summary: {
          totalRevenue: Math.round(totalRevenue),
          paidAmount: Math.round(paidAmount),
          pendingAmount: Math.round(pendingAmount),
          forecastAmount: Math.round(forecastAmount),
          avgTicket: Math.round(avgTicket),
          overdueCount,
          totalClients: allUsers.length,
          totalActiveClients,
          totalServices: allServices.length,
          totalQuotes,
          totalInvoices: allInvoices.length,
          paidInvoices: paidInvoices.length,
        }
      });
    } catch (error) {
      console.error("Error fetching advanced analytics:", error);
      res.status(500).json({ message: "Failed to fetch advanced analytics" });
    }
  });

  // ========== GARAGE ROUTES (Multi-tenant - Super Admin only) ==========
  
  // Get all garages (superadmin only)
  app.get("/api/superadmin/garages", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const allGarages = await storage.getGarages();
      res.json(allGarages);
    } catch (error) {
      console.error("Error fetching garages:", error);
      res.status(500).json({ message: "Failed to fetch garages" });
    }
  });

  // Get single garage
  app.get("/api/superadmin/garages/:id", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const garage = await storage.getGarage(req.params.id);
      if (!garage) {
        return res.status(404).json({ message: "Garage not found" });
      }
      res.json(garage);
    } catch (error) {
      console.error("Error fetching garage:", error);
      res.status(500).json({ message: "Failed to fetch garage" });
    }
  });

  // Create garage (superadmin only)
  app.post("/api/superadmin/garages", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const validatedData = insertGarageSchema.parse(req.body);
      const garage = await storage.createGarage(validatedData);
      res.status(201).json(garage);
    } catch (error) {
      console.error("Error creating garage:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create garage" });
    }
  });

  // Update garage (superadmin only)
  app.patch("/api/superadmin/garages/:id", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const garage = await storage.updateGarage(req.params.id, req.body);
      res.json(garage);
    } catch (error) {
      console.error("Error updating garage:", error);
      res.status(500).json({ message: "Failed to update garage" });
    }
  });

  app.get("/api/garages/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garage = await storage.getGarage(req.params.id);
      if (!garage) return res.status(404).json({ message: "Garage non trouvé" });
      if (!hasGarageAccess(req.user, garage.id)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      res.json(garage);
    } catch (error) {
      console.error("Error fetching garage:", error);
      res.status(500).json({ message: "Failed to fetch garage" });
    }
  });

  app.patch("/api/garages/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garage = await storage.getGarage(req.params.id);
      if (!garage) return res.status(404).json({ message: "Garage non trouvé" });
      if (!hasGarageAccess(req.user, garage.id)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      const updated = await storage.updateGarage(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Error updating garage:", error);
      res.status(500).json({ message: "Failed to update garage" });
    }
  });

  // Delete garage (superadmin only)
  app.delete("/api/superadmin/garages/:id", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      await storage.deleteGarage(req.params.id);
      res.json({ message: "Garage deleted successfully" });
    } catch (error) {
      console.error("Error deleting garage:", error);
      res.status(500).json({ message: "Failed to delete garage" });
    }
  });

  // Get users by garage (superadmin only)
  app.get("/api/superadmin/garages/:id/users", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const garageUsers = await storage.getUsersByGarage(req.params.id);
      res.json(garageUsers);
    } catch (error) {
      console.error("Error fetching garage users:", error);
      res.status(500).json({ message: "Failed to fetch garage users" });
    }
  });

  // Assign user to garage (superadmin only)
  app.post("/api/superadmin/garages/:garageId/users/:userId", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const user = await storage.updateUser(req.params.userId, { garageId: req.params.garageId });
      res.json(user);
    } catch (error) {
      console.error("Error assigning user to garage:", error);
      res.status(500).json({ message: "Failed to assign user to garage" });
    }
  });

  // Remove user from garage (superadmin only)
  app.delete("/api/superadmin/garages/:garageId/users/:userId", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const user = await storage.updateUser(req.params.userId, { garageId: null });
      res.json(user);
    } catch (error) {
      console.error("Error removing user from garage:", error);
      res.status(500).json({ message: "Failed to remove user from garage" });
    }
  });

  app.get("/api/superadmin/garage-stats", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const allGarages = await storage.getGarages();
      const allUsers = await storage.getAllUsers();

      const garageStats = await Promise.all(allGarages.map(async (garage) => {
        const schemaName = `garage_${garage.slug.replace(/-/g, "_")}`;
        const client = await pool.connect();
        try {
          const schemaExists = await client.query(
            `SELECT 1 FROM information_schema.schemata WHERE schema_name = $1`, [schemaName]
          );

          let invoiceCount = 0, paidInvoices = 0, quoteCount = 0, reservationCount = 0;
          let revenue = 0, pendingRevenue = 0, monthRevenue = 0;

          if (schemaExists.rows.length > 0) {
            await client.query('BEGIN');
            await client.query(`SET LOCAL search_path TO "${schemaName}", public`);

            const invResult = await client.query(`SELECT status, amount, created_at FROM invoices`);
            const invRows = invResult.rows;
            invoiceCount = invRows.length;
            const now = new Date();
            const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

            for (const inv of invRows) {
              const amt = parseFloat(inv.amount || "0");
              if (inv.status === "paid") {
                revenue += amt;
                paidInvoices++;
                if (new Date(inv.created_at) >= currentMonthStart) monthRevenue += amt;
              }
              if (inv.status === "pending" || inv.status === "overdue") {
                pendingRevenue += amt;
              }
            }

            const qResult = await client.query(`SELECT COUNT(*) as cnt FROM quotes`);
            quoteCount = parseInt(qResult.rows[0].cnt);

            const rResult = await client.query(`SELECT COUNT(*) as cnt FROM reservations`);
            reservationCount = parseInt(rResult.rows[0].cnt);

            await client.query('COMMIT');
          }

          const gClients = allUsers.filter(u => u.garageId === garage.id && u.role === "client");

          return {
            garageId: garage.id,
            garageName: garage.name,
            garageSlug: garage.slug,
            isActive: garage.isActive,
            schemaReady: schemaExists.rows.length > 0,
            totalRevenue: revenue,
            pendingRevenue,
            monthRevenue,
            totalInvoices: invoiceCount,
            paidInvoices,
            totalQuotes: quoteCount,
            totalReservations: reservationCount,
            totalClients: gClients.length,
          };
        } finally {
          client.release();
        }
      }));

      const totalRevenue = garageStats.reduce((s, g) => s + g.totalRevenue, 0);
      const totalMonthRevenue = garageStats.reduce((s, g) => s + g.monthRevenue, 0);

      res.json({
        totalGarages: allGarages.length,
        activeGarages: allGarages.filter(g => g.isActive).length,
        totalRevenue,
        totalMonthRevenue,
        garages: garageStats,
      });
    } catch (error: any) {
      console.error("Error fetching garage stats:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ========== ROOT ADMIN ROUTES ==========

  // App logs endpoint (rootadmin only)
  app.get("/api/rootadmin/app-logs", isAuthenticated, isRootAdmin, async (req: any, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 200;
      const offset = parseInt(req.query.offset as string) || 0;
      const garageId = req.query.garageId as string | undefined;
      const entityType = req.query.entityType as string | undefined;
      const action = req.query.action as string | undefined;

      let query = db.select({
        id: auditLogs.id,
        entityType: auditLogs.entityType,
        entityId: auditLogs.entityId,
        action: auditLogs.action,
        actorId: auditLogs.actorId,
        actorRole: auditLogs.actorRole,
        actorName: auditLogs.actorName,
        summary: auditLogs.summary,
        metadata: auditLogs.metadata,
        ipAddress: auditLogs.ipAddress,
        createdAt: auditLogs.createdAt,
      }).from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(limit).offset(offset);

      const logs = await query;
      const total = await db.select({ count: count() }).from(auditLogs);

      res.json({ logs, total: total[0]?.count || 0 });
    } catch (error: any) {
      console.error("[AppLogs] Error:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des logs", error: error.message });
    }
  });

  // Role assignment: rootadmin can set a user's role to superadmin
  app.patch("/api/rootadmin/users/:userId/role", isAuthenticated, isRootAdmin, async (req: any, res) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      const allowedRoles = ["client", "client_professionnel", "employe", "admin", "superadmin"];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Rôle invalide. Les rôles assignables sont: " + allowedRoles.join(", ") });
      }

      const targetUser = await storage.getUser(userId);
      if (!targetUser) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      if (targetUser.role === "rootadmin") {
        return res.status(403).json({ message: "Impossible de modifier le rôle d'un Root Admin" });
      }

      await storage.updateUser(userId, { role: role as any });

      await logAuditEvent({
        req,
        entityType: "user" as EntityType,
        entityId: userId,
        action: "updated" as ActionType,
        summary: `Root Admin a changé le rôle de ${targetUser.email} de '${targetUser.role}' vers '${role}'`,
        previousData: { role: targetUser.role },
        newData: { role },
      });

      res.json({ message: `Rôle de ${targetUser.email} mis à jour vers '${role}'`, userId, role });
    } catch (error: any) {
      console.error("[RoleAssignment] Error:", error);
      res.status(500).json({ message: "Erreur lors de la mise à jour du rôle", error: error.message });
    }
  });

  // List all users (rootadmin: see all, filterable by garage)
  app.get("/api/rootadmin/users", isAuthenticated, isRootAdmin, async (req: any, res) => {
    try {
      const { garageId } = req.query;
      const allUsers = await storage.getAllUsers();
      const filtered = garageId ? allUsers.filter((u: any) => u.garageId === garageId) : allUsers;
      const sanitized = filtered.map(({ password: _, ...u }: any) => u);
      res.json(sanitized);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  });

  // Superadmin: switch active garage (stores in session)
  app.post("/api/superadmin/select-garage", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const { garageId } = req.body;
      if (garageId) {
        const garage = await storage.getGarage(garageId);
        if (!garage) return res.status(404).json({ message: "Garage non trouvé" });
        req.session.selectedGarageId = garageId;
        req.session.selectedGarageSlug = garage.slug;
        res.json({ success: true, garage: { id: garage.id, name: garage.name, slug: garage.slug } });
      } else {
        req.session.selectedGarageId = null;
        req.session.selectedGarageSlug = null;
        res.json({ success: true, garage: null });
      }
    } catch (error: any) {
      console.error("Error selecting garage:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/superadmin/selected-garage", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const garageId = req.session?.selectedGarageId;
      if (garageId) {
        const garage = await storage.getGarage(garageId);
        res.json({ garage: garage ? { id: garage.id, name: garage.name, slug: garage.slug } : null });
      } else {
        res.json({ garage: null });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Tenant schema management
  app.post("/api/superadmin/tenant/setup", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const { createTenantSchema, migrateDataToTenantSchema } = await import("./tenantContext");
      const allGarages = await storage.getGarages();
      const results: any[] = [];

      for (const garage of allGarages) {
        console.log(`[Tenant] Setting up schema for garage: ${garage.name} (${garage.slug})`);
        await createTenantSchema(garage.slug);
        const migrationResults = await migrateDataToTenantSchema(garage.id, garage.slug);
        results.push({
          garage: garage.name,
          slug: garage.slug,
          schema: `garage_${garage.slug.replace(/-/g, "_")}`,
          tables: migrationResults,
        });
      }

      res.json({ success: true, results });
    } catch (error: any) {
      console.error("[Tenant] Setup error:", error);
      res.status(500).json({ message: "Erreur lors de la configuration des schémas: " + error.message });
    }
  });

  app.get("/api/superadmin/tenant/status", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const { pool } = await import("./db");
      const { getSchemaName } = await import("./tenantContext");
      const allGarages = await storage.getGarages();
      const statuses: any[] = [];

      for (const garage of allGarages) {
        const schemaName = getSchemaName(garage.slug);
        const schemaExists = await pool.query(
          `SELECT 1 FROM information_schema.schemata WHERE schema_name = $1`,
          [schemaName]
        );
        
        let tableCount = 0;
        let dataStats: Record<string, number> = {};
        if (schemaExists.rows.length > 0) {
          const tables = await pool.query(
            `SELECT table_name FROM information_schema.tables WHERE table_schema = $1`,
            [schemaName]
          );
          tableCount = tables.rows.length;

          for (const t of ["services", "quotes", "invoices", "reservations", "reviews"]) {
            try {
              const cnt = await pool.query(`SELECT COUNT(*) as cnt FROM "${schemaName}"."${t}"`);
              dataStats[t] = parseInt(cnt.rows[0].cnt);
            } catch { dataStats[t] = 0; }
          }
        }

        statuses.push({
          garageId: garage.id,
          garageName: garage.name,
          slug: garage.slug,
          schemaName,
          schemaExists: schemaExists.rows.length > 0,
          tableCount,
          dataStats,
        });
      }

      res.json({ tenants: statuses });
    } catch (error: any) {
      console.error("[Tenant] Status error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Service routes (public read, admin write)
  app.get("/api/services", isAuthenticated, async (req: any, res) => {
    try {
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        return res.json(await ts.getServices());
      }
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/admin/services", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        return res.json(await ts.getAllServices());
      }
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.post("/api/admin/services", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      
      // Automatically create a workflow for the service with default steps
      const workflow = await storage.createWorkflow({
        name: `Workflow - ${service.name}`,
        description: `Workflow pour le service ${service.name}`,
        serviceId: service.id,
      });
      
      const defaultSteps = [
        { stepNumber: 1, title: "Réception du véhicule", description: "Accueil client et prise en charge du véhicule" },
        { stepNumber: 2, title: "Ordre de réparation", description: "État des lieux du véhicule avant intervention" },
        { stepNumber: 3, title: "Diagnostic", description: "Inspection technique et diagnostic" },
        { stepNumber: 4, title: "Préparation", description: "Préparation des pièces et outils" },
        { stepNumber: 5, title: "Intervention", description: "Réalisation des travaux" },
        { stepNumber: 6, title: "Contrôle qualité", description: "Vérification de la qualité" },
        { stepNumber: 7, title: "Nettoyage", description: "Nettoyage du véhicule" },
        { stepNumber: 8, title: "Restitution", description: "Remise du véhicule au client" },
      ];
      for (const step of defaultSteps) {
        await storage.createWorkflowStep({ workflowId: workflow.id, ...step });
      }
      
      // Log audit event
      await logAuditEvent({
        req,
        entityType: "service",
        entityId: service.id,
        action: "created",
        summary: `${entityLabels.service} "${service.name}" ${actionLabels.created} avec workflow associé (${defaultSteps.length} étapes)`,
        newData: service,
        metadata: { workflowId: workflow.id },
      });
      
      res.json(service);
    } catch (error: any) {
      console.error("Error creating service:", error);
      res.status(400).json({ message: error.message || "Failed to create service" });
    }
  });

  app.patch("/api/admin/services/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const previousService = await storage.getService(id);
      const service = await storage.updateService(id, req.body);
      
      // Log audit event
      await logAuditEvent({
        req,
        entityType: "service",
        entityId: service.id,
        action: "updated",
        summary: `${entityLabels.service} "${service.name}" ${actionLabels.updated}`,
        previousData: previousService,
        newData: service,
      });
      
      res.json(service);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  app.delete("/api/admin/services/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const previousService = await storage.getService(id);
      await storage.deleteService(id);
      
      // Log audit event
      await logAuditEvent({
        req,
        entityType: "service",
        entityId: id,
        action: "deleted",
        summary: `${entityLabels.service} "${previousService?.name || id}" ${actionLabels.deleted}`,
        previousData: previousService,
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Quote routes
  app.get("/api/quotes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const quotes = await storage.getQuotes(userId);
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });

  app.post("/api/quotes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { mediaFiles, ...quoteData } = req.body;
      
      // Validate minimum 3 images requirement
      if (!mediaFiles || !Array.isArray(mediaFiles)) {
        return res.status(400).json({ message: "Les photos sont requises" });
      }
      
      const imageCount = mediaFiles.filter((f: any) => f.type && f.type.startsWith('image/')).length;
      if (imageCount < 3) {
        return res.status(400).json({ 
          message: `Au moins 3 photos sont requises (${imageCount}/3 fournis)` 
        });
      }
      
      // Generate reference: DEV-MM-00001
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const allQuotes = await storage.getQuotes();
      const count = allQuotes.filter(q => {
        if (!q.createdAt) return false;
        const qDate = new Date(q.createdAt);
        return !isNaN(qDate.getTime()) && qDate >= startOfMonth;
      }).length + 1;
      const reference = `DEV-${mm}-${String(count).padStart(5, '0')}`;
      
      const validatedData = insertQuoteSchema.parse({
        ...quoteData,
        reference,
        clientId: userId,
        status: "pending",
      });
      const quote = await storage.createQuote(validatedData);
      
      // Create media entries
      for (const file of mediaFiles) {
        await storage.createQuoteMedia({
          quoteId: quote.id,
          filePath: file.key,
          fileType: file.type.startsWith('image/') ? 'image' : 'video',
          fileName: file.name,
        });
      }
      
      // Log audit event
      await logAuditEvent({
        req,
        entityType: "quote",
        entityId: quote.id,
        action: "created",
        summary: `${entityLabels.quote} ${actionLabels.created} par le client`,
        newData: quote,
      });
      
      res.json(quote);
    } catch (error: any) {
      console.error("Error creating quote:", error);
      res.status(400).json({ message: error.message || "Failed to create quote" });
    }
  });

  app.get("/api/admin/quotes", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        const quotes = await ts.getQuotes();
        return res.json(quotes);
      }
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const quotes = await storage.getQuotes(undefined, garageId);
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });

  app.get("/api/admin/quotes/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouvé" });
      }
      // Check garage access
      if (!hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé à ce devis" });
      }
      res.json(quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  });

  app.post("/api/admin/quotes", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { mediaFiles, wheelCount, wheelPositions, diameter, priceExcludingTax, taxRate, taxAmount, productDetails, quoteAmount, services, ...quoteData } = req.body;
      
      // Validate minimum 6 images requirement
      if (!mediaFiles || !Array.isArray(mediaFiles)) {
        return res.status(400).json({ message: "Media files are required" });
      }
      
      const imageCount = mediaFiles.filter((f: any) => f.type && f.type.startsWith('image/')).length;
      if (imageCount < 3) {
        return res.status(400).json({ 
          message: `Au moins 3 images sont requises (${imageCount}/3 fournis)` 
        });
      }

      const parsedWheelCount = wheelCount ? parseInt(wheelCount) : null;
      if (parsedWheelCount && Array.isArray(wheelPositions) && wheelPositions.length !== parsedWheelCount) {
        return res.status(400).json({
          message: `Le nombre de positions (${wheelPositions.length}) doit correspondre au nombre de jantes (${parsedWheelCount})`
        });
      }

      // Generate reference: DEV-MM-00001
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const allQuotes = await storage.getQuotes();
      const count = allQuotes.filter(q => {
        if (!q.createdAt) return false;
        const qDate = new Date(q.createdAt);
        return !isNaN(qDate.getTime()) && qDate >= startOfMonth;
      }).length + 1;
      const reference = `DEV-${mm}-${String(count).padStart(5, '0')}`;
      
      const validatedData = insertQuoteSchema.parse({
        ...quoteData,
        reference,
        wheelCount: wheelCount ? parseInt(wheelCount) : null,
        wheelPositions: Array.isArray(wheelPositions) ? wheelPositions : null,
        diameter,
        priceExcludingTax,
        taxRate,
        taxAmount,
        productDetails,
        quoteAmount,
        status: "approved", // Auto-approved when created by admin
      });
      const quote = await storage.createQuote(validatedData);
      
      // Create media entries
      const createdMediaEntries: Array<{ id: string; filePath: string; fileType: string; fileName: string }> = [];
      for (const file of mediaFiles) {
        let fileName = file.name;
        if (!fileName.includes('.')) {
          const ext = file.type.split('/')[1] || 'jpg';
          fileName = `${fileName}.${ext}`;
        }

        const media = await storage.createQuoteMedia({
          quoteId: quote.id,
          filePath: file.key,
          fileType: file.type.startsWith('image/') ? 'image' : 'video',
          fileName: fileName,
        });
        createdMediaEntries.push({ id: (media as any).id, filePath: file.key, fileType: (media as any).fileType || 'image', fileName: fileName });
      }
      
      // Post-process: apply watermark, rename with reference, upload to Google Drive
      processMediaAfterCreation(
        createdMediaEntries,
        reference,
        "quotes",
        async (mediaId, newPath, newFileName) => {
          await db.update(quoteMedia).set({ filePath: newPath, fileName: newFileName }).where(eq(quoteMedia.id, mediaId));
        }
      ).catch(err => console.error("[PostProcess] Quote media processing error:", err));
      
      // Create quote items if services array is provided
      if (services && Array.isArray(services) && services.length > 0) {
        for (const service of services) {
          const quantity = parseFloat(service.quantity || 1);
          const unitPrice = parseFloat(service.unitPrice || 0);
          const totalHT = quantity * unitPrice;
          const taxRateDecimal = parseFloat(taxRate || 0);
          const taxAmountItem = (totalHT * taxRateDecimal) / 100;
          const totalTTC = totalHT + taxAmountItem;
          
          await storage.createQuoteItem({
            quoteId: quote.id,
            description: service.serviceName,
            quantity: quantity.toString(),
            unitPriceExcludingTax: unitPrice.toString(),
            totalExcludingTax: totalHT.toString(),
            taxRate: taxRateDecimal.toString(),
            taxAmount: taxAmountItem.toString(),
            totalIncludingTax: totalTTC.toString(),
          });
        }
      }
      
      // Log audit event
      await logAuditEvent({
        req,
        entityType: "quote",
        entityId: quote.id,
        action: "created",
        summary: `${entityLabels.quote} ${actionLabels.created} et approuvé par l'administrateur`,
        newData: quote,
        metadata: { clientId: quote.clientId, servicesCount: services?.length || 0, autoApproved: true },
      });
      
      // Create notification for client
      await storage.createNotification({
        userId: quote.clientId,
        type: "quote",
        title: "Nouveau devis",
        message: `Un devis a été créé pour vous`,
        relatedId: quote.id,
      });

      // Send WebSocket notification
      const client = wsClients.get(quote.clientId);
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: "quote_updated",
          quoteId: quote.id,
          status: quote.status,
        }));
      }
      
      res.json(quote);
    } catch (error: any) {
      console.error("Error creating quote:", error);
      res.status(400).json({ message: error.message || "Failed to create quote" });
    }
  });

  app.patch("/api/admin/quotes/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const previousQuote = await storage.getQuote(id);
      // Check garage access
      if (!hasGarageAccess(req.user, previousQuote?.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé à ce devis" });
      }
      const quote = await storage.updateQuote(id, req.body);
      
      // Determine the action based on status change
      let action: ActionType = "updated";
      if (req.body.status) {
        if (req.body.status === "approved") action = "validated";
        else if (req.body.status === "rejected") action = "rejected";
        else if (req.body.status === "completed") action = "completed";
        else if (req.body.status === "cancelled") action = "cancelled";
      }
      
      // Log audit event
      await logAuditEvent({
        req,
        entityType: "quote",
        entityId: quote.id,
        action,
        summary: `${entityLabels.quote} ${actionLabels[action]}`,
        previousData: previousQuote,
        newData: quote,
      });
      
      // Create notification for client
      await storage.createNotification({
        userId: quote.clientId,
        type: "quote",
        title: "Devis mis à jour",
        message: `Votre devis a été ${actionLabels[action]}`,
        relatedId: quote.id,
      });

      // Send WebSocket notification
      const wsClient = wsClients.get(quote.clientId);
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({
          type: "quote_updated",
          quoteId: quote.id,
          status: quote.status,
        }));
      }
      
      // Automatic email disabled - use manual sending via "Envoyer par email" button
      // if (req.body.status === "approved" && previousQuote?.status !== "approved") { ... }
      
      res.json(quote);
    } catch (error) {
      console.error("Error updating quote:", error);
      res.status(500).json({ message: "Failed to update quote" });
    }
  });

  // Delete quote (superadmin only)
  app.delete("/api/admin/quotes/:id", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouvé" });
      }

      // Delete related items and media first
      const items = await storage.getQuoteItems(id);
      for (const item of items) {
        await storage.deleteQuoteItem(item.id);
      }
      
      const media = await storage.getQuoteMedia(id);
      const fs = await import("fs");
      for (const m of media) {
        if (m.filePath) {
          if (m.filePath.startsWith("/gdrive/")) {
            try {
              const { extractFileId, deleteFromGoogleDrive } = await import("./googleDriveStorage");
              const fileId = extractFileId(m.filePath);
              if (fileId) await deleteFromGoogleDrive(fileId);
            } catch (err) { console.error("[Delete] Google Drive cascade delete failed:", err); }
          } else {
            const localPath = m.filePath.startsWith('/') ? `.${m.filePath}` : m.filePath;
            if (fs.existsSync(localPath)) {
              fs.unlinkSync(localPath);
            }
          }
        }
        await storage.deleteQuoteMedia(m.id);
      }

      // Delete quote
      await storage.deleteQuote(id);
      
      // Log audit event
      await logAuditEvent({
        req,
        entityType: "quote",
        entityId: id,
        action: "deleted",
        summary: `${entityLabels.quote} supprimé définitivement`,
        previousData: quote,
        newData: undefined,
      });
      
      res.json({ success: true, message: "Devis supprimé avec succès" });
    } catch (error) {
      console.error("Error deleting quote:", error);
      res.status(500).json({ message: "Erreur lors de la suppression du devis" });
    }
  });

  // Send quote by email
  app.post("/api/admin/quotes/:id/send-email", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { 
        customRecipient, 
        customSubject, 
        customMessage, 
        additionalRecipients = [], 
        sendCopy = false 
      } = req.body;
      
      const quote = await storage.getQuote(id);
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouvé" });
      }

      const client = await storage.getUser(quote.clientId);
      if (!client || !client.email) {
        return res.status(400).json({ message: "Email du client non disponible" });
      }

      const items = await storage.getQuoteItems(id);
      const settings = await storage.getApplicationSettings();
      const adminUser = req.user;

      const { sendEmail, generateQuoteEmailHtml, generateQuotePDF } = await import("./emailService");
      
      const formatPrice = (value: string | number | null | undefined): string => {
        if (value === null || value === undefined || value === "") return "0,00 €";
        const num = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(num)) return "0,00 €";
        return num.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
      };

      async function downloadMediaBuffer(filePath: string): Promise<Buffer | null> {
        try {
          if (filePath.startsWith("/objects/")) {
            const { ObjectStorageService } = await import("./replit_integrations/object_storage");
            const objStore = new ObjectStorageService();
            return await objStore.downloadFileBuffer(filePath);
          } else if (filePath.startsWith("/r2/")) {
            try {
              const { downloadFromR2, extractR2Key } = await import("./cloudflareR2Service");
              const key = extractR2Key(filePath);
              if (key) {
                const { data } = await downloadFromR2(key);
                return data;
              }
            } catch (e) { console.error("[Download] R2 download failed:", e); }
          } else if (filePath.startsWith("/gdrive/")) {
            try {
              const { downloadFromGoogleDrive, extractFileId } = await import("./googleDriveStorage");
              const fileId = extractFileId(filePath);
              if (fileId) {
                const result = await downloadFromGoogleDrive(fileId);
                return result;
              }
            } catch (e) { console.error("[Download] GDrive download failed:", e); }
          } else if (filePath.startsWith("http")) {
            const resp = await fetch(filePath);
            if (resp.ok) return Buffer.from(await resp.arrayBuffer());
          } else if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath);
          }
          return null;
        } catch (error) {
          console.error(`[Download] Error downloading ${filePath}:`, error);
          return null;
        }
      }

      // Generate or reuse viewToken for public access
      let viewToken = quote.viewToken;
      if (!viewToken) {
        viewToken = crypto.randomBytes(32).toString('hex');
        await storage.updateQuote(id, { viewToken } as any);
      }
      
      // Build the public quote URL
      const quoteViewUrl = buildUrl(req, `/devis/${viewToken}`);

      // Use proper reference number
      const quoteRef = quote.reference || quote.id.slice(0, 8).toUpperCase();
      const clientName = `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email;
      const companyName = settings?.companyName || "AutoReport";
      
      const quoteTTC = parseFloat(quote.quoteAmount || "0");
      const quoteTax = parseFloat(quote.taxAmount || "0");
      const quoteHT = quoteTax > 0 ? (quoteTTC - quoteTax) : (quoteTTC / 1.2);

      const pdfBuffer = generateQuotePDF({
        quoteNumber: quoteRef,
        quoteDate: quote.createdAt ? new Date(quote.createdAt).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR'),
        clientName: clientName,
        status: quote.status,
        items: items.map(i => ({
          description: i.description || '',
          quantity: Number(i.quantity) || 1,
          unitPrice: parseFloat(i.unitPriceExcludingTax || "0").toFixed(2),
          total: parseFloat(i.totalExcludingTax || "0").toFixed(2),
        })),
        amount: formatPrice(quote.quoteAmount),
        totalHT: quoteHT.toFixed(2),
        totalTTC: quoteTTC.toFixed(2),
        companyName: companyName,
      });

      const pdfFilename = `Devis-${quoteRef}.pdf`;
      const attachments = [{ filename: pdfFilename, content: pdfBuffer }];

      // Fetch additional media attachments
      try {
        const media = await storage.getQuoteMedia(id);
        for (const item of media) {
          try {
            const data = await downloadMediaBuffer(item.filePath);
            if (data) {
              attachments.push({ filename: item.fileName || path.basename(item.filePath), content: data });
            }
          } catch (err) { console.warn(`[Email] Failed to attach file: ${item.filePath}`, err); }
        }
      } catch (err) { console.error("Error fetching media for email:", err); }

      const actionLinksHtml = `
        <div style="margin: 30px 0; text-align: center;">
          <a href="${quoteViewUrl}" style="display: inline-block; background: #dc2626; color: white; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; letter-spacing: 0.5px;">
            Voir le devis
          </a>
        </div>
      `;
      
      let html;
      if (customMessage) {
        html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            ${getEmailHeader(companyName)}
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
              <div style="white-space: pre-line; margin-bottom: 20px;">${customMessage}</div>
              ${actionLinksHtml}
            </div>
            ${getEmailFooter(companyName)}
          </div>
        `;
      } else {
        html = generateQuoteEmailHtml({
          clientName,
          quoteNumber: quoteRef,
          quoteAmount: formatPrice(quote.quoteAmount),
          quoteUrl: quoteViewUrl,
          companyName: companyName
        });
      }

      const to = customRecipient || client.email;
      const finalAdditional = [...additionalRecipients];
      if (sendCopy && adminUser.email) finalAdditional.push(adminUser.email);

      await sendEmail({
        to,
        cc: finalAdditional.join(','),
        subject: customSubject || `Votre Devis ${quoteRef} - ${companyName}`,
        html,
        attachments
      });

      // Send SMS to client if consent is given
      if (client.phone && client.smsConsent) {
        await sendEventSms({
          userPhone: client.phone,
          userSmsConsent: client.smsConsent,
          userName: `${client.firstName || ''} ${client.lastName || ''}`.trim(),
          userEmail: client.email,
          eventType: 'quote_sent',
          eventTitle: quoteRef,
          eventDetails: formatPrice(quote.quoteAmount),
          eventUrl: quoteViewUrl,
        });
      }

      // Notify admins and employees with phone numbers
      try {
        const staffMembers = await storage.getUsersByRoles(['admin', 'employee']);
        for (const staff of staffMembers) {
          if (staff.phone && isFrenchMobile(staff.phone)) {
            await sendSms({
              to: staff.phone,
              eventType: 'quote_sent',
              eventTitle: `Nouveau devis : ${quoteRef}`,
              eventDetails: `Client : ${client.firstName || ''} ${client.lastName || ''} - ${formatPrice(quote.quoteAmount)}`,
              recipientName: `${staff.firstName || ''} ${staff.lastName || ''}`.trim()
            });
          }
        }
      } catch (err) {
        console.error("[SMS:Staff] Failed to notify staff for quote:", err);
      }

      res.json({ success: true, message: "Email envoyé avec succès" });
    } catch (error: any) {
      console.error("Error sending quote email:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'envoi de l'email" });
    }
  });

  // Quote Items routes
  app.get("/api/admin/quotes/:id/items", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      // Check garage access for parent quote
      const quote = await storage.getQuote(id);
      if (quote && !hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      const items = await storage.getQuoteItems(id);
      res.json(items);
    } catch (error) {
      console.error("Error fetching quote items:", error);
      res.status(500).json({ message: "Failed to fetch quote items" });
    }
  });

  app.post("/api/admin/quotes/:id/items", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      // Check garage access for parent quote
      const quote = await storage.getQuote(id);
      if (quote && !hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      const { insertQuoteItemSchema } = await import("@shared/schema");
      const validatedData = insertQuoteItemSchema.parse({ ...req.body, quoteId: id });
      const item = await storage.createQuoteItem(validatedData);
      // Recalculate quote totals after creating item
      await storage.recalculateQuoteTotals(id);
      res.json(item);
    } catch (error: any) {
      console.error("Error creating quote item:", error);
      res.status(400).json({ message: error.message || "Failed to create quote item" });
    }
  });

  app.patch("/api/admin/quote-items/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const item = await storage.updateQuoteItem(id, req.body);
      // Recalculate quote totals after updating item
      await storage.recalculateQuoteTotals(item.quoteId);
      res.json(item);
    } catch (error: any) {
      console.error("Error updating quote item:", error);
      res.status(400).json({ message: error.message || "Failed to update quote item" });
    }
  });

  app.delete("/api/admin/quote-items/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      // Get item first to know its quoteId for recalculation
      const itemToDelete = await storage.getQuoteItem(id);
      if (!itemToDelete) {
        return res.status(404).json({ message: "Item not found" });
      }
      
      await storage.deleteQuoteItem(id);
      // Recalculate quote totals after deleting item
      await storage.recalculateQuoteTotals(itemToDelete.quoteId);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting quote item:", error);
      res.status(400).json({ message: error.message || "Failed to delete quote item" });
    }
  });

  // Quote Media routes
  app.get("/api/admin/quotes/:id/media", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      // Check garage access for parent quote
      const quote = await storage.getQuote(id);
      if (quote && !hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      const media = await storage.getQuoteMedia(id);
      res.json(media);
    } catch (error) {
      console.error("Error fetching quote media:", error);
      res.status(500).json({ message: "Failed to fetch quote media" });
    }
  });

  app.post("/api/admin/quotes/:id/media", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const files = req.files;
      
      if (!files || !files.file) {
        return res.status(400).json({ message: "Fichier requis" });
      }

      const file = files.file;
      const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
      
      const quote = await storage.getQuote(id);
      const reference = quote?.reference || `DEVIS-${id.slice(0, 8).toUpperCase()}`;
      
      // Get existing media count for incremental naming
      const existingMedia = await storage.getQuoteMedia(id);
      const nextIndex = (existingMedia?.length || 0) + 1;
      const ext = path.extname(file.name) || '.jpg';
      const newFileName = `${reference}_${nextIndex}${ext}`;
      
      let fileData: Buffer;
      if (file.tempFilePath) {
        fileData = fs.readFileSync(file.tempFilePath);
      } else if (file.data) {
        fileData = file.data;
      } else {
        return res.status(400).json({ message: "Impossible de lire le fichier" });
      }

      if (isImage) {
        try {
          const { addWatermarkToImage } = await import("./imageWatermark");
          fileData = await addWatermarkToImage(fileData, reference, file.mimetype);
          console.log(`[Watermark] Applied to image for reference: ${reference}`);
        } catch (watermarkError) {
          console.error("[Watermark] Failed to apply to image:", watermarkError);
        }
      }
    
      const filePath = await uploadToStorage(fileData, newFileName, "quotes");
      console.log(`[Upload] Quote media uploaded: ${filePath}`);
      
      const media = await storage.createQuoteMedia({
        quoteId: id,
        fileName: newFileName,
        filePath,
        fileType: isImage ? "image" : "document",
        fileSize: fileData.length,
      });
      
      if (file.tempFilePath) {
        try { fs.unlinkSync(file.tempFilePath); } catch (_) {}
      }
      
      sendMediaZipByEmail("quote", id, reference).catch(err =>
        console.error("[ZipEmail] Background quote ZIP failed:", err)
      );
      
      res.json(media);
    } catch (error: any) {
      console.error("Error uploading quote media:", error);
      res.status(500).json({ message: error.message || "Failed to upload media" });
    }
  });

  app.post("/api/admin/quotes/:id/media-zip", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const files = req.files;
      if (!files || !files.file) {
        return res.status(400).json({ message: "Fichier ZIP requis" });
      }
      const file = files.file;
      if (!file.name.toLowerCase().endsWith(".zip")) {
        return res.status(400).json({ message: "Seuls les fichiers ZIP sont acceptés" });
      }

      let zipData: Buffer;
      if (file.tempFilePath) {
        zipData = fs.readFileSync(file.tempFilePath);
      } else if (file.data) {
        zipData = file.data;
      } else {
        return res.status(400).json({ message: "Impossible de lire le fichier" });
      }

      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(zipData);

      const quote = await storage.getQuote(id);
      const reference = quote?.reference || `DEVIS-${id.slice(0, 8).toUpperCase()}`;
      const existingMedia = await storage.getQuoteMedia(id);
      let nextIndex = (existingMedia?.length || 0) + 1;

      const imageExts = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      const results: any[] = [];

      for (const [fileName, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir) continue;
        const ext = path.extname(fileName).toLowerCase();
        if (!imageExts.includes(ext)) continue;

        const baseName = path.basename(fileName);
        if (baseName.startsWith(".") || baseName.startsWith("__MACOSX")) continue;

        let fileData = Buffer.from(await zipEntry.async("arraybuffer"));
        const newFileName = `${reference}_${nextIndex}${ext}`;
        nextIndex++;

        try {
          const { addWatermarkToImage } = await import("./imageWatermark");
          const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
          fileData = await addWatermarkToImage(fileData, reference, mimeType);
        } catch (_) {}

        const filePath = await uploadToStorage(fileData, newFileName, "quotes");
        const media = await storage.createQuoteMedia({
          quoteId: id,
          fileName: newFileName,
          filePath,
          fileType: "image",
          fileSize: fileData.length,
        });
        results.push(media);
        console.log(`[ZIP] Extracted and uploaded: ${baseName} -> ${newFileName}`);
      }

      if (file.tempFilePath) {
        try { fs.unlinkSync(file.tempFilePath); } catch (_) {}
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "Aucune image trouvée dans le fichier ZIP" });
      }

      sendMediaZipByEmail("quote", id, reference).catch(err =>
        console.error("[ZipEmail] Background quote ZIP failed:", err)
      );

      res.json({ success: true, count: results.length, media: results });
    } catch (error: any) {
      console.error("Error uploading quote ZIP:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'extraction du ZIP" });
    }
  });

  app.delete("/api/admin/quote-media/:mediaId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { mediaId } = req.params;
      
      const media = await storage.getQuoteMediaById(mediaId);
      if (!media) {
        return res.status(404).json({ message: "Media not found" });
      }
      
      if (media.filePath) {
        if (media.filePath.startsWith("/gdrive/")) {
          try {
            const { extractFileId, deleteFromGoogleDrive } = await import("./googleDriveStorage");
            const fileId = extractFileId(media.filePath);
            if (fileId) await deleteFromGoogleDrive(fileId);
          } catch (err) { console.error("[Delete] Google Drive delete failed:", err); }
        } else if (media.filePath.startsWith("/objects/")) {
          try {
            const { ObjectStorageService } = await import("./replit_integrations/object_storage");
            const objStore = new ObjectStorageService();
            await objStore.deleteFile(media.filePath);
          } catch (err) { console.error("[Delete] Object Storage delete failed:", err); }
        } else if (media.filePath.startsWith("https://storage.googleapis.com/")) {
          try {
            const { deleteFromFirebaseStorage } = await import("./firebase");
            await deleteFromFirebaseStorage(media.filePath);
          } catch (err) { console.error("[Delete] Firebase delete failed:", err); }
        } else {
          const fs = await import("fs");
          const localPath = media.filePath.startsWith('/') ? `.${media.filePath}` : media.filePath;
          if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
        }
      }
      
      await storage.deleteQuoteMedia(mediaId);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting quote media:", error);
      res.status(500).json({ message: error.message || "Failed to delete media" });
    }
  });

  async function downloadMediaBuffer(filePath: string): Promise<Buffer | null> {
    try {
      if (filePath.startsWith("/objects/")) {
        const { ObjectStorageService } = await import("./replit_integrations/object_storage");
        const objStore = new ObjectStorageService();
        return await objStore.downloadFileBuffer(filePath);
      } else if (filePath.startsWith("/r2/")) {
        try {
          const { downloadFromR2, extractR2Key } = await import("./cloudflareR2Service");
          const key = extractR2Key(filePath);
          if (key) {
            const { data } = await downloadFromR2(key);
            return data;
          }
        } catch (e) { console.error("[Download] R2 download failed:", e); }
      } else if (filePath.startsWith("/gdrive/")) {
        try {
          const { downloadFromGoogleDrive, extractFileId } = await import("./googleDriveStorage");
          const fileId = extractFileId(filePath);
          if (fileId) {
            const result = await downloadFromGoogleDrive(fileId);
            return result.data;
          }
        } catch (e) { console.error("[Download] Google Drive download failed:", e); }
      } else if (filePath.startsWith("https://")) {
        try {
          const response = await fetch(filePath);
          if (response.ok) {
            return Buffer.from(await response.arrayBuffer());
          }
        } catch (e) { console.error("[Download] URL download failed:", e); }
      } else if (filePath.startsWith("/uploads/")) {
        const localPath = path.join(process.cwd(), filePath);
        if (fs.existsSync(localPath)) return fs.readFileSync(localPath);
      } else {
        const localPath = filePath.startsWith("/") ? `.${filePath}` : filePath;
        if (fs.existsSync(localPath)) return fs.readFileSync(localPath);
      }
    } catch (err) {
      console.error(`[Download] Error downloading ${filePath}:`, err);
    }
    return null;
  }

  app.get("/api/admin/quotes/:id/media/download-zip", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (quote && !hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      const mediaList = await storage.getQuoteMedia(id);
      if (!mediaList || mediaList.length === 0) {
        return res.status(404).json({ message: "Aucune photo à télécharger" });
      }

      const reference = quote?.reference || `DEVIS-${id.slice(0, 8).toUpperCase()}`;
      const archiver = (await import("archiver")).default;
      const archive = archiver("zip", { zlib: { level: 5 } });

      res.set({
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="photos_${reference}.zip"`,
      });
      archive.pipe(res);

      for (let i = 0; i < mediaList.length; i++) {
        const m = mediaList[i];
        try {
          const buffer = await downloadMediaBuffer(m.filePath);
          if (buffer) {
            const ext = path.extname(m.fileName || ".jpg");
            const cleanName = `devis_${reference}_${i + 1}${ext}`;
            archive.append(buffer, { name: cleanName });
          }
        } catch (fileErr) {
          console.error(`[ZIP] Error reading file ${m.filePath}:`, fileErr);
        }
      }

      await archive.finalize();
    } catch (error: any) {
      console.error("Error creating quote media ZIP:", error);
      if (!res.headersSent) {
        res.status(500).json({ message: error.message || "Erreur lors de la création du ZIP" });
      }
    }
  });


  // Invoice routes
  app.get("/api/invoices", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const invoices = await storage.getInvoices(userId);
      res.json(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  app.get("/api/admin/invoices", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        const invoiceList = await ts.getInvoices();
        return res.json(invoiceList);
      }
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const invoiceList = await storage.getInvoices(undefined, garageId);
      res.json(invoiceList);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  app.post("/api/admin/invoices", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { mediaFiles, ...invoiceData } = req.body;
      
      let quote = null;
      if (invoiceData.quoteId) {
        quote = await storage.getQuote(invoiceData.quoteId);
        if (!quote) return res.status(404).json({ message: "Quote not found" });
        invoiceData.clientId = invoiceData.clientId || quote.clientId;
        invoiceData.amount = invoiceData.amount || quote.quoteAmount || "0";
        invoiceData.paymentMethod = invoiceData.paymentMethod || "wire_transfer";
        invoiceData.garageId = invoiceData.garageId || quote.garageId || req.user?.garageId;
      }
      if (!invoiceData.garageId && req.user?.garageId) {
        invoiceData.garageId = req.user.garageId;
      }
      
      const validatedData = insertInvoiceSchema.parse(invoiceData);
      
      const nowInvoiceNew = new Date();
      const ddInvoiceNew = String(nowInvoiceNew.getDate()).padStart(2, '0');
      const mmInvoiceNew = String(nowInvoiceNew.getMonth() + 1).padStart(2, '0');
      const allInvoicesInvoiceNew = await storage.getInvoices();
      
      const startOfDayInvoiceNew = new Date(nowInvoiceNew.getFullYear(), nowInvoiceNew.getMonth(), nowInvoiceNew.getDate());
      const countInvoiceNew = allInvoicesInvoiceNew.filter(i => {
        const iDate = new Date(i.createdAt || '');
        return iDate >= startOfDayInvoiceNew;
      }).length + 1;
      let invoiceNumberVal = `FACT-${ddInvoiceNew}-${mmInvoiceNew}-${String(countInvoiceNew).padStart(3, '0')}`;
      
      if (validatedData.paymentMethod === "klarna" || validatedData.paymentMethod === "alma") {
        const count = allInvoicesInvoiceNew.filter(i => (i.invoiceNumber || "").startsWith("PPF")).length + 1;
        invoiceNumberVal = `PPF-${mmInvoiceNew}-${String(count).padStart(4, '0')}`;
      }
      
      let wheelCount = validatedData.wheelCount || null;
      let diameter = validatedData.diameter || null;
      let priceExcludingTax = validatedData.priceExcludingTax || "0";
      let taxRate = validatedData.taxRate || 20;
      let taxAmount = validatedData.taxAmount || "0";
      let productDetails = validatedData.productDetails || null;
      
      if (quote) {
        wheelCount = quote.wheelCount;
        diameter = quote.diameter;
        priceExcludingTax = quote.priceExcludingTax ?? "0";
        taxRate = quote.taxRate ?? 20;
        taxAmount = quote.taxAmount ?? "0";
        productDetails = quote.productDetails;
      }
      
      const invoice = await storage.createInvoice({
        ...validatedData,
        invoiceNumber: invoiceNumberVal,
        wheelCount,
        diameter,
        priceExcludingTax,
        taxRate,
        taxAmount,
        productDetails,
      } as any);
      
      if (validatedData.quoteId && quote) {
        const quoteItems = await storage.getQuoteItems(validatedData.quoteId);
        for (const quoteItem of quoteItems) {
          await storage.createInvoiceItem({
            invoiceId: invoice.id,
            description: quoteItem.description,
            quantity: quoteItem.quantity,
            unitPriceExcludingTax: quoteItem.unitPriceExcludingTax,
            taxRate: quoteItem.taxRate,
            taxAmount: quoteItem.taxAmount,
            totalExcludingTax: quoteItem.totalExcludingTax,
            totalIncludingTax: quoteItem.totalIncludingTax,
          });
        }
      }
      
      if (mediaFiles && Array.isArray(mediaFiles)) {
        for (const fileEntry of mediaFiles) {
          const fp = typeof fileEntry === 'string' ? fileEntry : (fileEntry.filePath || fileEntry.path || fileEntry.key || '');
          const fn = typeof fileEntry === 'string' ? path.basename(fileEntry) : (fileEntry.fileName || fileEntry.name || path.basename(fp));
          if (fp) {
            await storage.createInvoiceMedia({
              invoiceId: invoice.id,
              fileType: "image",
              filePath: fp,
              fileName: fn,
            });
          }
        }
      }

      // Post-process: apply watermark, rename with reference, upload to Google Drive
      // processMediaAfterCreation(
      //   createdInvMediaFromQuote,
      //   invoiceNumberVal,
      //   "invoices",
      //   async (mediaId, newPath, newFileName) => {
      //     await db.update(invoiceMedia).set({ filePath: newPath, fileName: newFileName }).where(eq(invoiceMedia.id, mediaId));
      //   }
      // ).catch(err => console.error("[PostProcess] Invoice media processing error:", err));

      // Create notification for client
      await storage.createNotification({
        userId: invoice.clientId,
        type: "invoice",
        title: "New Invoice",
        message: `A new invoice has been generated`,
        relatedId: invoice.id,
      });

      // Send WebSocket notification
      const wsClient = wsClients.get(invoice.clientId);
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({
          type: "invoice_created",
          invoiceId: invoice.id,
        }));
      }
      
      // Automatic email disabled - use manual send button instead
      console.log(`Invoice created: ${invoice.invoiceNumber} - auto-email disabled`);
      
      res.json(invoice);
    } catch (error: any) {
      console.error("Error creating invoice:", error);
      res.status(400).json({ message: error.message || "Failed to create invoice" });
    }
  });

  // Create invoice directly (without quote)
  app.post("/api/admin/invoices/direct", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { mediaFiles, ...invoiceData } = req.body;
      if (!invoiceData.garageId && req.user?.garageId) {
        invoiceData.garageId = req.user.garageId;
      }
      
      const validatedData = insertInvoiceSchema.parse(invoiceData);
      
      // Generate invoice number: FACT-DD-MM-XXX
      const nowInvoiceDirect = new Date();
      const ddInvoiceDirect = String(nowInvoiceDirect.getDate()).padStart(2, '0');
      const mmInvoiceDirect = String(nowInvoiceDirect.getMonth() + 1).padStart(2, '0');
      const startOfDayInvoiceDirect = new Date(nowInvoiceDirect.getFullYear(), nowInvoiceDirect.getMonth(), nowInvoiceDirect.getDate());
      const allInvoicesInvoiceDirect = await storage.getInvoices();
      const countInvoiceDirect = allInvoicesInvoiceDirect.filter(i => {
        const iDate = new Date(i.createdAt || '');
        return iDate >= startOfDayInvoiceDirect;
      }).length + 1;
      const invoiceNumberGenerated = `FACT-${ddInvoiceDirect}-${mmInvoiceDirect}-${String(countInvoiceDirect).padStart(3, '0')}`;
      
      const invoice = await storage.createInvoice({
        ...validatedData,
        invoiceNumber: invoiceNumberGenerated,
      } as any);
      
      if (mediaFiles && Array.isArray(mediaFiles)) {
        for (const fileEntry of mediaFiles) {
          const fp = typeof fileEntry === 'string' ? fileEntry : (fileEntry.filePath || fileEntry.path || fileEntry.key || '');
          const fn = typeof fileEntry === 'string' ? path.basename(fileEntry) : (fileEntry.fileName || fileEntry.name || path.basename(fp));
          if (fp) {
            await storage.createInvoiceMedia({
              invoiceId: invoice.id,
              fileType: "image",
              filePath: fp,
              fileName: fn,
            });
          }
        }
      }

      // Post-process: apply watermark, rename with reference, upload to Google Drive
      // processMediaAfterCreation(
      //   createdDirectInvMedia,
      //   invoiceNumberGenerated,
      //   "invoices",
      //   async (mediaId, newPath, newFileName) => {
      //     await db.update(invoiceMedia).set({ filePath: newPath, fileName: newFileName }).where(eq(invoiceMedia.id, mediaId));
      //   }
      // ).catch(err => console.error("[PostProcess] Direct invoice media processing error:", err));

      // Create notification for client
      await storage.createNotification({
        userId: invoice.clientId,
        type: "invoice",
        title: "New Invoice",
        message: `A new invoice has been generated`,
        relatedId: invoice.id,
      });

      // Send WebSocket notification
      const wsClient = wsClients.get(invoice.clientId);
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({
          type: "invoice_created",
          invoiceId: invoice.id,
        }));
      }
      
      // Automatic email disabled - use manual send button instead
      console.log(`Direct invoice created: ${invoice.invoiceNumber} - auto-email disabled`);
      
      res.json(invoice);
    } catch (error: any) {
      console.error("Error creating direct invoice:", error);
      res.status(400).json({ message: error.message || "Failed to create direct invoice" });
    }
  });

  // Get single invoice by ID
  app.get("/api/admin/invoices/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      // Check garage access
      if (!hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé à cette facture" });
      }
      res.json(invoice);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      res.status(500).json({ message: "Failed to fetch invoice" });
    }
  });

  // Update invoice
  app.patch("/api/admin/invoices/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      console.log("Update invoice request body:", JSON.stringify(req.body, null, 2));
      
      // Get the previous state for audit logging
      const previousInvoice = await storage.getInvoice(id);
      // Check garage access
      if (!hasGarageAccess(req.user, previousInvoice?.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé à cette facture" });
      }
      const updateData = { ...req.body };
      
      // Convert date strings to Date objects for all timestamp fields
      Object.keys(updateData).forEach(key => {
        const value = updateData[key];
        if (value && typeof value === 'string') {
          // Check if it looks like an ISO date string
          const dateRegex = /^\d{4}-\d{2}-\d{2}/;
          if (dateRegex.test(value)) {
            const parsedDate = new Date(value);
            if (!isNaN(parsedDate.getTime())) {
              updateData[key] = parsedDate;
            }
          }
        }
      });
      
      console.log("Update invoice processed data:", JSON.stringify(updateData, null, 2));
      const invoice = await storage.updateInvoice(id, updateData);
      
      // Determine action type based on status change
      let action: ActionType = "updated";
      let summary = "Facture mise à jour";
      if (updateData.status === "paid" && previousInvoice?.status !== "paid") {
        action = "paid";
        summary = "Facture marquée comme payée";
      } else if (updateData.status === "cancelled" && previousInvoice?.status !== "cancelled") {
        action = "cancelled";
        summary = "Facture annulée";
      }
      
      // Log audit event
      await logAuditEvent({
        req,
        entityType: "invoice",
        entityId: id,
        action,
        summary,
        previousData: previousInvoice,
        newData: invoice,
      });

      // Auto-generate accounting entry when invoice is paid
      if (updateData.status === "paid" && previousInvoice?.status !== "paid") {
        try {
          const year = new Date().getFullYear();
          const entryNumber = await storage.getNextEntryNumber(year);
          const ht = parseFloat(invoice.priceExcludingTax || invoice.amount || "0");
          const tva = parseFloat(invoice.taxAmount || "0");
          const ttc = parseFloat(invoice.amount || "0");
          const paymentMethod = invoice.paymentMethod || "wire_transfer";
          const bankAccount = paymentMethod === "cash" ? "530000" : "512000";
          const bankLabel = paymentMethod === "cash" ? "Caisse" : "Banque";

          const entry = await storage.createAccountingEntry({
            garageId: invoice.garageId || null,
            entryNumber,
            date: new Date(),
            journal: "sales",
            sourceType: "invoice",
            sourceId: invoice.id,
            description: `Facture ${invoice.invoiceNumber} payée`,
            totalDebit: String(ttc),
            totalCredit: String(ttc),
          });

          await storage.createAccountingLine({
            entryId: entry.id,
            accountCode: bankAccount,
            accountLabel: bankLabel,
            description: `Encaissement facture ${invoice.invoiceNumber}`,
            debit: String(ttc),
            credit: "0",
          });

          await storage.createAccountingLine({
            entryId: entry.id,
            accountCode: "706000",
            accountLabel: "Prestations de services",
            description: `Vente ${invoice.invoiceNumber}`,
            debit: "0",
            credit: String(ht),
          });

          if (tva > 0) {
            await storage.createAccountingLine({
              entryId: entry.id,
              accountCode: "445710",
              accountLabel: "TVA collectée",
              description: `TVA facture ${invoice.invoiceNumber}`,
              debit: "0",
              credit: String(tva),
            });
          }
        } catch (accError) {
          console.error("Error creating accounting entry for invoice payment:", accError);
        }
      }
      
      // Automatic email for paid status
      if (updateData.status === "paid" && previousInvoice?.status !== "paid") {
        try {
          const client = await storage.getUser(invoice.clientId);
          const quote = invoice.quoteId ? await storage.getQuote(invoice.quoteId) : null;
          const garage = await storage.getGarage(invoice.garageId || "");
          
          if (client && client.email) {
            let reviewUrl = "";
            const crypto = await import("crypto");
            const reviewToken = crypto.randomBytes(32).toString('hex');
            const clientName = `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email;
            
            const existingReviewsForInvoice = await db.select().from(reviews).where(eq(reviews.invoiceId, invoice.id));
            if (existingReviewsForInvoice.length === 0) {
              await db.insert(reviews).values({
                garageId: invoice.garageId,
                invoiceId: invoice.id,
                clientId: invoice.clientId,
                clientName: clientName,
                rating: 0,
                reviewToken: reviewToken,
              });
              reviewUrl = buildUrl(req, `/avis/${reviewToken}`);
            } else if (existingReviewsForInvoice[0].reviewToken) {
              reviewUrl = buildUrl(req, `/avis/${existingReviewsForInvoice[0].reviewToken}`);
            }

            const { generateInvoicePaidEmailHtml, sendEmail } = await import("./emailService");
            const emailHtml = generateInvoicePaidEmailHtml({
              clientName: clientName,
              invoiceNumber: invoice.invoiceNumber,
              amount: invoice.amount || "0",
              paymentDate: new Date().toLocaleDateString("fr-FR"),
              companyName: garage?.name || "AUTOREPORT",
              reviewUrl: reviewUrl || undefined
            });

            await sendEmail({
              to: client.email,
              subject: `Confirmation de paiement - Facture ${invoice.invoiceNumber}`,
              html: emailHtml
            });
            console.log(`[Email] Automatic paid confirmation sent to ${client.email} for invoice ${invoice.invoiceNumber}`);

            // Send SMS to client if consent is given
            if (client.phone && client.smsConsent) {
              await sendEventSms({
                userPhone: client.phone,
                userSmsConsent: client.smsConsent,
                userName: `${client.firstName || ''} ${client.lastName || ''}`.trim(),
                userEmail: client.email,
                eventType: 'invoice_paid',
                eventTitle: invoice.invoiceNumber,
                eventDetails: invoice.amount || '0',
                eventUrl: reviewUrl || undefined,
              });
            }

            // Notify staff
            try {
              const staffMembers = await storage.getUsersByRoles(['admin', 'employee']);
              for (const staff of staffMembers) {
                if (staff.phone && isFrenchMobile(staff.phone)) {
                  await sendSms({
                    to: staff.phone,
                    eventType: 'invoice_paid',
                    eventTitle: `Paiement reçu : ${invoice.invoiceNumber}`,
                    eventDetails: `Client : ${clientName} - ${invoice.amount || '0'} €`,
                    recipientName: `${staff.firstName || ''} ${staff.lastName || ''}`.trim()
                  });
                }
              }
            } catch (err) {
              console.error("[SMS:Staff] Failed to notify staff for payment:", err);
            }
          }
        } catch (emailErr) {
          console.error("[Email] Failed to send automatic paid confirmation:", emailErr);
        }
      }
      
      res.json(invoice);
    } catch (error: any) {
      console.error("Error updating invoice:", error);
      res.status(400).json({ message: error.message || "Failed to update invoice" });
    }
  });

  // Delete invoice (superadmin only)
  app.delete("/api/admin/invoices/:id", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      
      if (!invoice) {
        return res.status(404).json({ message: "Facture non trouvée" });
      }

      // Delete related items and media first
      const items = await storage.getInvoiceItems(id);
      for (const item of items) {
        await storage.deleteInvoiceItem(item.id);
      }
      
      const media = await storage.getInvoiceMedia(id);
      const fs = await import("fs");
      for (const m of media) {
        if (m.filePath) {
          if (m.filePath.startsWith("/gdrive/")) {
            try {
              const { extractFileId, deleteFromGoogleDrive } = await import("./googleDriveStorage");
              const fileId = extractFileId(m.filePath);
              if (fileId) await deleteFromGoogleDrive(fileId);
            } catch (err) { console.error("[Delete] Google Drive cascade delete failed:", err); }
          } else {
            const localPath = m.filePath.startsWith('/') ? `.${m.filePath}` : m.filePath;
            if (fs.existsSync(localPath)) {
              fs.unlinkSync(localPath);
            }
          }
        }
        await storage.deleteInvoiceMedia(m.id);
      }

      // Delete invoice
      await storage.deleteInvoice(id);
      
      // Log audit event
      await logAuditEvent({
        req,
        entityType: "invoice",
        entityId: id,
        action: "deleted",
        summary: `${entityLabels.invoice} supprimée définitivement`,
        previousData: invoice,
        newData: undefined,
      });
      
      res.json({ success: true, message: "Facture supprimée avec succès" });
    } catch (error) {
      console.error("Error deleting invoice:", error);
      res.status(500).json({ message: "Erreur lors de la suppression de la facture" });
    }
  });

  // Send invoice by email
  app.post("/api/admin/invoices/:id/send-email", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { 
        customRecipient, 
        customSubject, 
        customMessage, 
        additionalRecipients = [], 
        sendCopy = false 
      } = req.body;
      const adminUser = req.user;

      const invoice = await storage.getInvoice(id);
      if (!invoice) {
        return res.status(404).json({ message: "Facture non trouvée" });
      }

      const client = await storage.getUser(invoice.clientId);
      if (!client || !client.email) {
        return res.status(400).json({ message: "Email du client non disponible" });
      }

      const items = await storage.getInvoiceItems(id);
      const settings = await storage.getApplicationSettings();
      const companyName = settings?.companyName || "AutoReport";

      const { sendEmail, generateInvoiceEmailHtml } = await import("./emailService");
      
      const formatPrice = (value: string | number | null | undefined): string => {
        if (value === null || value === undefined || value === "") return "0,00 €";
        const num = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(num)) return "0,00 €";
        return num.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
      };

      const invoiceCreatedAt = invoice.createdAt ? new Date(invoice.createdAt) : new Date();
      const dueDate = invoice.dueDate 
        ? new Date(invoice.dueDate).toLocaleDateString("fr-FR")
        : new Date(invoiceCreatedAt.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR");

      const html = generateInvoiceEmailHtml({
        clientName: `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email,
        invoiceNumber: invoice.invoiceNumber || invoice.id.slice(0, 8).toUpperCase(),
        invoiceDate: invoiceCreatedAt.toLocaleDateString("fr-FR"),
        dueDate,
        amount: invoice.amount || "0",
        totalHT: invoice.priceExcludingTax || "0",
        taxAmount: invoice.taxAmount || "0",
        companyName: settings?.companyName || "AutoReport",
        items: items.map(item => ({
          description: item.description,
          quantity: parseFloat(item.quantity || "1"),
          unitPrice: item.unitPriceExcludingTax || "0",
          total: item.totalIncludingTax || "0",
        })),
        paymentLink: buildUrl(req, `/payment/checkout?invoice_id=${invoice.id}`)
      });

      const { generateInvoicePDF: genInvoicePdf } = await import("./emailService");
      const invClientDetails: string[] = [];
      if (client.siret) invClientDetails.push(`SIRET: ${client.siret}`);
      if (client.tvaNumber) invClientDetails.push(`TVA: ${client.tvaNumber}`);
      if (client.email) invClientDetails.push(client.email);
      if (client.phone) invClientDetails.push(`Tél: ${client.phone}`);
      const invClientAddr = client.companyAddress || client.address;
      if (invClientAddr) invClientDetails.push(invClientAddr as string);
      const invClientLoc = [client.postalCode, client.city].filter(Boolean).join(' ');
      if (invClientLoc) invClientDetails.push(invClientLoc);

      const sendPdfBuffer = genInvoicePdf({
        invoiceNumber: invoice.invoiceNumber || invoice.id.slice(0, 8).toUpperCase(),
        invoiceDate: invoiceCreatedAt.toLocaleDateString("fr-FR"),
        dueDate,
        clientName: client.companyName || `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email,
        clientDetails: invClientDetails,
        items: items.map(item => ({
          description: item.description,
          quantity: parseFloat(item.quantity || "1"),
          unitPrice: parseFloat(item.unitPriceExcludingTax || "0").toFixed(2),
          total: parseFloat(item.totalExcludingTax || "0").toFixed(2),
          taxRate: item.taxRate || "20",
        })),
        amount: formatPrice(invoice.amount),
        companyName: settings?.companyName || "AutoReport",
      });

      const invoiceRef = invoice.invoiceNumber || invoice.id.slice(0, 8).toUpperCase();
      const attachments = [{ filename: `Facture-${invoiceRef}.pdf`, content: sendPdfBuffer }];

      console.log(`[Email] Sending invoice ${invoice.invoiceNumber} to ${client.email}`);
      const media = await storage.getInvoiceMedia(id);
      const photoAttachments: { filename: string; content: Buffer }[] = [];
      const fs = await import('fs');
      // Get invoice photos
      for (const item of media) {
        if (item.fileType === 'image') {
          try {
            console.log(`[Email] Attempting to attach: ${item.filePath}`);
            const data = await downloadMediaBuffer(item.filePath);
            if (data) {
              photoAttachments.push({ filename: item.fileName || path.basename(item.filePath), content: data });
              console.log(`[Email] Successfully attached: ${item.fileName}`);
            }
          } catch (err) { console.warn(`[Email] Photo attachment failed: ${item.filePath}`, err); }
        }
      }

      const finalAttachments = [...attachments, ...photoAttachments];

      const to = customRecipient || client.email;
      const cc = [...additionalRecipients];
      if (sendCopy && adminUser.email) cc.push(adminUser.email);

      await sendEmail({
        to,
        cc: cc.join(','),
        subject: customSubject || `Votre Facture ${invoiceRef} - ${companyName}`,
        html,
        attachments: finalAttachments
      });

      // Send SMS to client if consent is given
      if (client.phone && client.smsConsent) {
        await sendEventSms({
          userPhone: client.phone,
          userSmsConsent: client.smsConsent,
          userName: `${client.firstName || ''} ${client.lastName || ''}`.trim(),
          userEmail: client.email,
          eventType: 'invoice_sent',
          eventTitle: invoiceRef,
          eventDetails: formatPrice(invoice.amount),
          eventUrl: buildUrl(req, `/payment/checkout?invoice_id=${invoice.id}`),
        });
      }

      // Notify staff
      try {
        const staffMembers = await storage.getUsersByRoles(['admin', 'employee']);
        for (const staff of staffMembers) {
          if (staff.phone && isFrenchMobile(staff.phone)) {
            await sendSms({
              to: staff.phone,
              eventType: 'invoice_sent',
              eventTitle: `Facture envoyée : ${invoiceRef}`,
              eventDetails: `Client : ${client.firstName || ''} ${client.lastName || ''} - ${formatPrice(invoice.amount)}`,
              recipientName: `${staff.firstName || ''} ${staff.lastName || ''}`.trim()
            });
          }
        }
      } catch (err) {
        console.error("[SMS:Staff] Failed to notify staff for invoice:", err);
      }

      res.json({ success: true, message: "Email envoyé avec succès" });
    } catch (error: any) {
      console.error("Error sending invoice email:", error);
      res.status(500).json({ message: error.message || "Échec de l'envoi de l'email" });
    }
  });

  // Delete quote (permanent)
  app.delete("/api/admin/quotes/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (!quote) return res.status(404).json({ message: "Devis non trouvé" });
      if (!hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }

      const client = await storage.getUser(quote.clientId);
      const settings = await storage.getApplicationSettings();
      const companyName = settings?.companyName || "AutoReport";

      await storage.deleteQuote(id);
      await logAuditEvent({
        req,
        entityType: "quote",
        entityId: id,
        action: "deleted",
        summary: `Devis ${quote.reference} supprimé définitivement`,
      });

      // Notify by email (skip if superadmin)
      if (req.user.role !== "superadmin") {
        const { sendEmail } = await import("./emailService");
        await sendEmail({
          to: ["contact@autoreport.com", "rbelmahi90@gmail.com"],
          subject: `[ALERTE] Suppression définitive du Devis ${quote.reference}`,
          html: `
            <h3>Alerte Suppression Définitive</h3>
            <p>Le devis suivant a été supprimé du système par <strong>${req.user.firstName} ${req.user.lastName}</strong> (${req.user.email}).</p>
            <ul>
              <li><strong>Référence :</strong> ${quote.reference}</li>
              <li><strong>Client :</strong> ${client?.firstName || ""} ${client?.lastName || ""} (${client?.email || "N/A"})</li>
              <li><strong>Montant :</strong> ${parseFloat(quote.quoteAmount || "0").toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</li>
              <li><strong>Garage :</strong> ${companyName}</li>
              <li><strong>Date de suppression :</strong> ${new Date().toLocaleString("fr-FR")}</li>
            </ul>
          `
        }).catch(err => console.error("[Delete Notification] Failed to send quote delete email:", err));
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting quote:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la suppression" });
    }
  });

  // Delete invoice (permanent)
  app.delete("/api/admin/invoices/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) return res.status(404).json({ message: "Facture non trouvée" });
      if (!hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }

      const client = await storage.getUser(invoice.clientId);
      const settings = await storage.getApplicationSettings();
      const companyName = settings?.companyName || "AutoReport";

      await storage.deleteInvoice(id);
      await logAuditEvent({
        req,
        entityType: "invoice",
        entityId: id,
        action: "deleted",
        summary: `Facture ${invoice.invoiceNumber} supprimée définitivement`,
      });

      // Notify by email (skip if superadmin)
      if (req.user.role !== "superadmin") {
        const { sendEmail } = await import("./emailService");
        await sendEmail({
          to: ["contact@autoreport.com", "rbelmahi90@gmail.com"],
          subject: `[ALERTE] Suppression définitive de la Facture ${invoice.invoiceNumber}`,
          html: `
            <h3>Alerte Suppression Définitive</h3>
            <p>La facture suivante a été supprimée du système par <strong>${req.user.firstName} ${req.user.lastName}</strong> (${req.user.email}).</p>
            <ul>
              <li><strong>N° Facture :</strong> ${invoice.invoiceNumber}</li>
              <li><strong>Client :</strong> ${client?.firstName || ""} ${client?.lastName || ""} (${client?.email || "N/A"})</li>
              <li><strong>Montant :</strong> ${parseFloat(invoice.amount || "0").toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</li>
              <li><strong>Garage :</strong> ${companyName}</li>
              <li><strong>Date de suppression :</strong> ${new Date().toLocaleString("fr-FR")}</li>
            </ul>
          `
        }).catch(err => console.error("[Delete Notification] Failed to send invoice delete email:", err));
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting invoice:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la suppression" });
    }
  });

  // Delete reservation (permanent)
  app.delete("/api/admin/reservations/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const reservation = await storage.getReservation(id);
      if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });
      if (!hasGarageAccess(req.user, reservation.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }

      const client = await storage.getUser(reservation.clientId);
      const service = await storage.getService(reservation.serviceId);
      const settings = await storage.getApplicationSettings();
      const companyName = settings?.companyName || "AutoReport";

      await storage.deleteReservation(id);
      await logAuditEvent({
        req,
        entityType: "reservation",
        entityId: id,
        action: "deleted",
        summary: `Réservation supprimée définitivement`,
      });

      // Notify by email (skip if superadmin)
      if (req.user.role !== "superadmin") {
        const { sendEmail } = await import("./emailService");
        await sendEmail({
          to: ["contact@autoreport.com", "rbelmahi90@gmail.com"],
          subject: `[ALERTE] Suppression définitive d'une Réservation`,
          html: `
            <h3>Alerte Suppression Définitive</h3>
            <p>La réservation suivante a été supprimée du système par <strong>${req.user.firstName} ${req.user.lastName}</strong> (${req.user.email}).</p>
            <ul>
              <li><strong>Client :</strong> ${client?.firstName || ""} ${client?.lastName || ""} (${client?.email || "N/A"})</li>
              <li><strong>Prestation :</strong> ${service?.name || "N/A"}</li>
              <li><strong>Date prévue :</strong> ${reservation.scheduledDate ? new Date(reservation.scheduledDate).toLocaleString("fr-FR") : "N/A"}</li>
              <li><strong>Garage :</strong> ${companyName}</li>
              <li><strong>Date de suppression :</strong> ${new Date().toLocaleString("fr-FR")}</li>
            </ul>
          `
        }).catch(err => console.error("[Delete Notification] Failed to send reservation delete email:", err));
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting reservation:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la suppression" });
    }
  });
  app.get("/api/admin/invoices/:id/items", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      // Check garage access for parent invoice
      const invoice = await storage.getInvoice(id);
      if (invoice && !hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      const items = await storage.getInvoiceItems(id);
      res.json(items);
    } catch (error) {
      console.error("Error fetching invoice items:", error);
      res.status(500).json({ message: "Failed to fetch invoice items" });
    }
  });

  app.post("/api/admin/invoices/:id/items", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      // Check garage access for parent invoice
      const invoice = await storage.getInvoice(id);
      if (invoice && !hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      const { insertInvoiceItemSchema } = await import("@shared/schema");
      const validatedData = insertInvoiceItemSchema.parse({ ...req.body, invoiceId: id });
      const item = await storage.createInvoiceItem(validatedData);
      // Recalculate invoice totals after creating item
      await storage.recalculateInvoiceTotals(id);
      res.json(item);
    } catch (error: any) {
      console.error("Error creating invoice item:", error);
      res.status(400).json({ message: error.message || "Failed to create invoice item" });
    }
  });

  app.patch("/api/admin/invoice-items/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const item = await storage.updateInvoiceItem(id, req.body);
      // Recalculate invoice totals after updating item
      await storage.recalculateInvoiceTotals(item.invoiceId);
      res.json(item);
    } catch (error: any) {
      console.error("Error updating invoice item:", error);
      res.status(400).json({ message: error.message || "Failed to update invoice item" });
    }
  });

  app.delete("/api/admin/invoice-items/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      // Get item first to know its invoiceId for recalculation
      const itemToDelete = await storage.getInvoiceItem(id);
      if (!itemToDelete) {
        return res.status(404).json({ message: "Item not found" });
      }
      
      await storage.deleteInvoiceItem(id);
      // Recalculate invoice totals after deleting item
      await storage.recalculateInvoiceTotals(itemToDelete.invoiceId);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting invoice item:", error);
      res.status(400).json({ message: error.message || "Failed to delete invoice item" });
    }
  });

  // Invoice Media routes
  app.get("/api/admin/invoices/:id/media", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      // Check garage access for parent invoice
      const invoice = await storage.getInvoice(id);
      if (invoice && !hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      const media = await storage.getInvoiceMedia(id);
      res.json(media);
    } catch (error) {
      console.error("Error fetching invoice media:", error);
      res.status(500).json({ message: "Failed to fetch invoice media" });
    }
  });

  app.post("/api/admin/invoices/:id/media", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const files = req.files;
      
      if (!files || !files.file) {
        return res.status(400).json({ message: "Fichier requis" });
      }

      const file = files.file;
      const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
      
      const invoice = await storage.getInvoice(id);
      const reference = invoice?.invoiceNumber || `FACTURE-${id.slice(0, 8).toUpperCase()}`;
      
      // Get existing media count for incremental naming
      const existingInvMedia = await storage.getInvoiceMedia(id);
      const nextInvIndex = (existingInvMedia?.length || 0) + 1;
      const ext = path.extname(file.name) || '.jpg';
      const newInvFileName = `${reference}_${nextInvIndex}${ext}`;
      
      let fileData: Buffer;
      if (file.tempFilePath) {
        fileData = fs.readFileSync(file.tempFilePath);
      } else if (file.data) {
        fileData = file.data;
      } else {
        return res.status(400).json({ message: "Impossible de lire le fichier" });
      }

      if (isImage) {
        try {
          const { addWatermarkToImage } = await import("./imageWatermark");
          fileData = await addWatermarkToImage(fileData, reference, file.mimetype);
          console.log(`[Watermark] Applied to image for reference: ${reference}`);
        } catch (watermarkError) {
          console.error("[Watermark] Failed to apply to image:", watermarkError);
        }
      }
    
      const filePath = await uploadToStorage(fileData, newInvFileName, "invoices");
      console.log(`[Upload] Invoice media uploaded: ${filePath}`);
      
      const media = await storage.createInvoiceMedia({
        invoiceId: id,
        fileName: newInvFileName,
        filePath,
        fileType: isImage ? "image" : "document",
        fileSize: fileData.length,
      });
      
      if (file.tempFilePath) {
        try { fs.unlinkSync(file.tempFilePath); } catch (_) {}
      }
      
      sendMediaZipByEmail("invoice", id, reference).catch(err =>
        console.error("[ZipEmail] Background invoice ZIP failed:", err)
      );
      
      res.json(media);
    } catch (error: any) {
      console.error("Error uploading invoice media:", error);
      res.status(500).json({ message: error.message || "Failed to upload media" });
    }
  });

  app.post("/api/admin/invoices/:id/media-zip", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const files = req.files;
      if (!files || !files.file) {
        return res.status(400).json({ message: "Fichier ZIP requis" });
      }
      const file = files.file;
      if (!file.name.toLowerCase().endsWith(".zip")) {
        return res.status(400).json({ message: "Seuls les fichiers ZIP sont acceptés" });
      }

      let zipData: Buffer;
      if (file.tempFilePath) {
        zipData = fs.readFileSync(file.tempFilePath);
      } else if (file.data) {
        zipData = file.data;
      } else {
        return res.status(400).json({ message: "Impossible de lire le fichier" });
      }

      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(zipData);

      const invoice = await storage.getInvoice(id);
      const reference = invoice?.invoiceNumber || `FACTURE-${id.slice(0, 8).toUpperCase()}`;
      const existingInvMedia = await storage.getInvoiceMedia(id);
      let nextIndex = (existingInvMedia?.length || 0) + 1;

      const imageExts = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      const results: any[] = [];

      for (const [fileName, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir) continue;
        const ext = path.extname(fileName).toLowerCase();
        if (!imageExts.includes(ext)) continue;

        const baseName = path.basename(fileName);
        if (baseName.startsWith(".") || baseName.startsWith("__MACOSX")) continue;

        let fileData = Buffer.from(await zipEntry.async("arraybuffer"));
        const newFileName = `${reference}_${nextIndex}${ext}`;
        nextIndex++;

        try {
          const { addWatermarkToImage } = await import("./imageWatermark");
          const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
          fileData = await addWatermarkToImage(fileData, reference, mimeType);
        } catch (_) {}

        const filePath = await uploadToStorage(fileData, newFileName, "invoices");
        const media = await storage.createInvoiceMedia({
          invoiceId: id,
          fileName: newFileName,
          filePath,
          fileType: "image",
          fileSize: fileData.length,
        });
        results.push(media);
        console.log(`[ZIP] Invoice extracted and uploaded: ${baseName} -> ${newFileName}`);
      }

      if (file.tempFilePath) {
        try { fs.unlinkSync(file.tempFilePath); } catch (_) {}
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "Aucune image trouvée dans le fichier ZIP" });
      }

      sendMediaZipByEmail("invoice", id, reference).catch(err =>
        console.error("[ZipEmail] Background invoice ZIP failed:", err)
      );

      res.json({ success: true, count: results.length, media: results });
    } catch (error: any) {
      console.error("Error uploading invoice ZIP:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'extraction du ZIP" });
    }
  });

  app.delete("/api/admin/invoice-media/:mediaId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { mediaId } = req.params;
      
      const media = await storage.getInvoiceMediaById(mediaId);
      if (!media) {
        return res.status(404).json({ message: "Media not found" });
      }
      
      if (media.filePath) {
        if (media.filePath.startsWith("/gdrive/")) {
          try {
            const { extractFileId, deleteFromGoogleDrive } = await import("./googleDriveStorage");
            const fileId = extractFileId(media.filePath);
            if (fileId) await deleteFromGoogleDrive(fileId);
          } catch (err) { console.error("[Delete] Google Drive delete failed:", err); }
        } else if (media.filePath.startsWith("/objects/")) {
          try {
            const { ObjectStorageService } = await import("./replit_integrations/object_storage");
            const objStore = new ObjectStorageService();
            await objStore.deleteFile(media.filePath);
          } catch (err) { console.error("[Delete] Object Storage delete failed:", err); }
        } else if (media.filePath.startsWith("https://storage.googleapis.com/")) {
          try {
            const { deleteFromFirebaseStorage } = await import("./firebase");
            await deleteFromFirebaseStorage(media.filePath);
          } catch (err) { console.error("[Delete] Firebase delete failed:", err); }
        } else {
          const fs = await import("fs");
          const localPath = media.filePath.startsWith('/') ? `.${media.filePath}` : media.filePath;
          if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
        }
      }
      
      await storage.deleteInvoiceMedia(mediaId);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting invoice media:", error);
      res.status(500).json({ message: error.message || "Failed to delete media" });
    }
  });

  app.get("/api/admin/invoices/:id/media/download-zip", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (invoice && !hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      const mediaList = await storage.getInvoiceMedia(id);
      if (!mediaList || mediaList.length === 0) {
        return res.status(404).json({ message: "Aucune photo à télécharger" });
      }

      const reference = invoice?.invoiceNumber || `FACTURE-${id.slice(0, 8).toUpperCase()}`;
      const archiver = (await import("archiver")).default;
      const archive = archiver("zip", { zlib: { level: 5 } });

      res.set({
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="photos_${reference}.zip"`,
      });
      archive.pipe(res);

      for (let i = 0; i < mediaList.length; i++) {
        const m = mediaList[i];
        try {
          const buffer = await downloadMediaBuffer(m.filePath);
          if (buffer) {
            const ext = path.extname(m.fileName || ".jpg");
            const cleanName = `facture_${reference}_${i + 1}${ext}`;
            archive.append(buffer, { name: cleanName });
          }
        } catch (fileErr) {
          console.error(`[ZIP] Error reading file ${m.filePath}:`, fileErr);
        }
      }

      await archive.finalize();
    } catch (error: any) {
      console.error("Error creating invoice media ZIP:", error);
      if (!res.headersSent) {
        res.status(500).json({ message: error.message || "Erreur lors de la création du ZIP" });
      }
    }
  });

  // Bulk ZIP import: auto-match media to quotes/invoices by reference in filename
  app.post("/api/admin/bulk-media-zip", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const files = req.files;
      if (!files || !files.file) {
        return res.status(400).json({ message: "Fichier ZIP requis" });
      }
      const file = files.file;
      if (!file.name.toLowerCase().endsWith(".zip")) {
        return res.status(400).json({ message: "Seuls les fichiers ZIP sont acceptés" });
      }

      let zipData: Buffer;
      if (file.tempFilePath) {
        zipData = fs.readFileSync(file.tempFilePath);
      } else if (file.data) {
        zipData = file.data;
      } else {
        return res.status(400).json({ message: "Impossible de lire le fichier" });
      }

      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(zipData);
      const imageExts = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

      const allQuotes = await db.select({ id: quotes.id, reference: quotes.reference }).from(quotes);
      const allInvoices = await db.select({ id: invoices.id, invoiceNumber: invoices.invoiceNumber }).from(invoices);

      const quoteMap = new Map<string, string>();
      for (const q of allQuotes) {
        if (q.reference) quoteMap.set(q.reference.toUpperCase(), q.id);
      }
      const invoiceMap = new Map<string, string>();
      for (const inv of allInvoices) {
        if (inv.invoiceNumber) invoiceMap.set(inv.invoiceNumber.toUpperCase(), inv.id);
      }

      const results: Array<{ fileName: string; matched: boolean; type?: string; reference?: string; error?: string }> = [];
      const matchCounters: Record<string, number> = {};

      for (const [fileName, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir) continue;
        const ext = path.extname(fileName).toLowerCase();
        if (!imageExts.includes(ext)) continue;

        const baseName = path.basename(fileName);
        if (baseName.startsWith(".") || baseName.startsWith("__MACOSX")) continue;

        const upperName = baseName.toUpperCase();

        let matchedType: "quote" | "invoice" | null = null;
        let matchedId: string | null = null;
        let matchedRef: string | null = null;

        let bestMatchLen = 0;
        for (const [ref, id] of quoteMap.entries()) {
          if (ref.length >= 3 && upperName.includes(ref) && ref.length > bestMatchLen) {
            const idx = upperName.indexOf(ref);
            const before = idx > 0 ? upperName[idx - 1] : "_";
            const after = idx + ref.length < upperName.length ? upperName[idx + ref.length] : "_";
            if (/[^A-Z0-9]/.test(before) && /[^A-Z0-9]/.test(after)) {
              matchedType = "quote";
              matchedId = id;
              matchedRef = ref;
              bestMatchLen = ref.length;
            }
          }
        }

        if (!matchedType) {
          bestMatchLen = 0;
          for (const [ref, id] of invoiceMap.entries()) {
            if (ref.length >= 3 && upperName.includes(ref) && ref.length > bestMatchLen) {
              const idx = upperName.indexOf(ref);
              const before = idx > 0 ? upperName[idx - 1] : "_";
              const after = idx + ref.length < upperName.length ? upperName[idx + ref.length] : "_";
              if (/[^A-Z0-9]/.test(before) && /[^A-Z0-9]/.test(after)) {
                matchedType = "invoice";
                matchedId = id;
                matchedRef = ref;
                bestMatchLen = ref.length;
              }
            }
          }
        }

        if (!matchedType || !matchedId || !matchedRef) {
          results.push({ fileName: baseName, matched: false, error: "Aucune référence trouvée dans le nom du fichier" });
          continue;
        }

        try {
          let fileData = Buffer.from(await zipEntry.async("arraybuffer"));

          const counterKey = `${matchedType}_${matchedId}`;
          if (!matchCounters[counterKey]) {
            const existing = matchedType === "quote" 
              ? await storage.getQuoteMedia(matchedId)
              : await storage.getInvoiceMedia(matchedId);
            matchCounters[counterKey] = (existing?.length || 0) + 1;
          }
          const idx = matchCounters[counterKey]++;
          const newFileName = `${matchedRef}_${idx}${ext}`;

          try {
            const { addWatermarkToImage } = await import("./imageWatermark");
            const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
            fileData = await addWatermarkToImage(fileData, matchedRef, mimeType);
          } catch (_) {}

          const folder = matchedType === "quote" ? "quotes" : "invoices";
          const filePath = await uploadToStorage(fileData, newFileName, folder);

          if (matchedType === "quote") {
            await storage.createQuoteMedia({
              quoteId: matchedId,
              fileName: newFileName,
              filePath,
              fileType: "image",
              fileSize: fileData.length,
            });
          } else {
            await storage.createInvoiceMedia({
              invoiceId: matchedId,
              fileName: newFileName,
              filePath,
              fileType: "image",
              fileSize: fileData.length,
            });
          }

          results.push({ fileName: baseName, matched: true, type: matchedType, reference: matchedRef });
          console.log(`[BulkZIP] ${baseName} -> ${matchedType} ${matchedRef} (${newFileName})`);
        } catch (err: any) {
          results.push({ fileName: baseName, matched: false, error: err.message });
        }
      }

      if (file.tempFilePath) {
        try { fs.unlinkSync(file.tempFilePath); } catch (_) {}
      }

      const matched = results.filter(r => r.matched).length;
      const unmatched = results.filter(r => !r.matched).length;
      res.json({ success: true, total: results.length, matched, unmatched, details: results });
    } catch (error: any) {
      console.error("Error processing bulk ZIP:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'import ZIP" });
    }
  });

  // Manual media backup trigger
  app.post("/api/admin/media-backup-now", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { performMediaBackup } = await import("./backupScheduler");
      const result = await performMediaBackup();
      res.json(result);
    } catch (error: any) {
      console.error("Error triggering media backup:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Reservation routes
  app.get("/api/reservations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const reservations = await storage.getReservations(userId);
      res.json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });

  // ==================== DELIVERY NOTES (Bons de Livraison) ====================
  
  app.get("/api/admin/delivery-notes", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = getGarageScope(req.user);
      const notes = await storage.getDeliveryNotes(undefined, garageId);
      const notesWithClient = await Promise.all(notes.map(async (note) => {
        const client = await storage.getUser(note.clientId);
        const dnInvoices = await storage.getDeliveryNoteInvoices(note.id);
        return { ...note, client, invoices: dnInvoices.map(dni => dni.invoice) };
      }));
      res.json(notesWithClient);
    } catch (error) {
      console.error("Error fetching delivery notes:", error);
      res.status(500).json({ message: "Failed to fetch delivery notes" });
    }
  });

  app.get("/api/admin/delivery-notes/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const note = await storage.getDeliveryNote(req.params.id);
      if (!note) {
        return res.status(404).json({ message: "Delivery note not found" });
      }
      if (!hasGarageAccess(req.user, note.garageId)) {
        return res.status(403).json({ message: "Access denied" });
      }
      const client = await storage.getUser(note.clientId);
      const dnInvoices = await storage.getDeliveryNoteInvoices(note.id);
      const invoicesWithDetails = await Promise.all(dnInvoices.map(async (dni) => {
        const items = await storage.getInvoiceItems(dni.invoice.id);
        const media = await storage.getInvoiceMedia(dni.invoice.id);
        return { ...dni.invoice, items, media };
      }));
      res.json({ ...note, client, invoices: invoicesWithDetails });
    } catch (error) {
      console.error("Error fetching delivery note:", error);
      res.status(500).json({ message: "Failed to fetch delivery note" });
    }
  });

  app.post("/api/admin/delivery-notes", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { clientId, invoiceIds, notes } = req.body;
      
      if (!clientId || typeof clientId !== 'string') {
        return res.status(400).json({ message: "Client ID is required" });
      }
      if (!invoiceIds || !Array.isArray(invoiceIds) || invoiceIds.length === 0) {
        return res.status(400).json({ message: "At least one invoice is required" });
      }

      const garageId = req.user?.garageId || null;

      for (const invoiceId of invoiceIds) {
        const invoice = await storage.getInvoice(invoiceId);
        if (!invoice) {
          return res.status(400).json({ message: `Invoice ${invoiceId} not found` });
        }
        if (!hasGarageAccess(req.user, invoice.garageId)) {
          return res.status(403).json({ message: `Access denied for invoice ${invoiceId}` });
        }
        if (invoice.clientId !== clientId) {
          return res.status(400).json({ message: `Invoice ${invoice.invoiceNumber} does not belong to the selected client` });
        }
      }

      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const mm = String(month).padStart(2, '0');

      const counter = await storage.incrementDeliveryNoteCounter(month, year);
      const deliveryNoteNumber = `BLV-${mm}-${String(counter.currentNumber).padStart(4, '0')}`;

      let totalHT = 0;
      let totalTVA = 0;
      let totalAmount = 0;

      for (const invoiceId of invoiceIds) {
        const invoice = await storage.getInvoice(invoiceId);
        if (invoice) {
          const items = await storage.getInvoiceItems(invoiceId);
          if (items.length > 0) {
            totalHT += items.reduce((sum, item) => sum + parseFloat(item.totalExcludingTax || '0'), 0);
            totalTVA += items.reduce((sum, item) => sum + parseFloat(item.taxAmount || '0'), 0);
            totalAmount += items.reduce((sum, item) => sum + parseFloat(item.totalIncludingTax || '0'), 0);
          } else {
            totalHT += parseFloat(invoice.priceExcludingTax || '0');
            totalTVA += parseFloat(invoice.taxAmount || '0');
            totalAmount += parseFloat(invoice.amount || '0');
          }
        }
      }

      const note = await storage.createDeliveryNote({
        clientId,
        garageId,
        month,
        year,
        deliveryNoteNumber,
        totalAmount: String(totalAmount.toFixed(2)),
        totalHT: String(totalHT.toFixed(2)),
        totalTVA: String(totalTVA.toFixed(2)),
        status: "draft",
        notes: notes || null,
      } as any);

      await storage.setDeliveryNoteInvoices(note.id, invoiceIds);

      res.json(note);
    } catch (error) {
      console.error("Error creating delivery note:", error);
      res.status(500).json({ message: "Failed to create delivery note" });
    }
  });

  app.patch("/api/admin/delivery-notes/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const existingNote = await storage.getDeliveryNote(req.params.id);
      if (!existingNote) {
        return res.status(404).json({ message: "Delivery note not found" });
      }
      if (!hasGarageAccess(req.user, existingNote.garageId)) {
        return res.status(403).json({ message: "Access denied" });
      }
      const { status, showPrices } = req.body;
      const validStatuses = ["draft", "finalized", "paid"];
      if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const updateData: any = {};
      if (status) updateData.status = status;
      if (showPrices !== undefined) updateData.showPrices = showPrices;
      if (req.body.notes !== undefined) updateData.notes = req.body.notes;

      const updated = await storage.updateDeliveryNote(req.params.id, updateData);
      res.json(updated);
    } catch (error) {
      console.error("Error updating delivery note:", error);
      res.status(500).json({ message: "Failed to update delivery note" });
    }
  });

  app.delete("/api/admin/delivery-notes/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const existingNote = await storage.getDeliveryNote(req.params.id);
      if (!existingNote) {
        return res.status(404).json({ message: "Delivery note not found" });
      }
      if (!hasGarageAccess(req.user, existingNote.garageId)) {
        return res.status(403).json({ message: "Access denied" });
      }
      if (existingNote.status !== "draft") {
        return res.status(400).json({ message: "Only draft delivery notes can be deleted" });
      }
      await storage.deleteDeliveryNote(req.params.id);
      res.json({ message: "Delivery note deleted" });
    } catch (error) {
      console.error("Error deleting delivery note:", error);
      res.status(500).json({ message: "Failed to delete delivery note" });
    }
  });

  app.get("/api/admin/clients/:clientId/invoices", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = getGarageScope(req.user);
      const invoiceList = await storage.getInvoices(req.params.clientId, garageId);
      res.json(invoiceList);
    } catch (error) {
      console.error("Error fetching client invoices:", error);
      res.status(500).json({ message: "Failed to fetch client invoices" });
    }
  });

  app.get("/api/admin/reservations", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        const reservationList = await ts.getReservations();
        return res.json(reservationList);
      }
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const reservationList = await storage.getReservations(undefined, garageId);
      res.json(reservationList);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });

  // Get additional services for a specific reservation
  app.get("/api/admin/reservations/:id/services", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const services = await storage.getReservationServices(id);
      res.json(services);
    } catch (error) {
      console.error("Error fetching reservation services:", error);
      res.status(500).json({ message: "Failed to fetch reservation services" });
    }
  });

  app.post("/api/admin/reservations", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { additionalServiceIds, ...reservationData } = req.body;
      const validatedData = insertReservationSchema.parse(reservationData);

      const scheduledDate = new Date(validatedData.scheduledDate);
      const mm = String(scheduledDate.getMonth() + 1).padStart(2, '0');
      const jj = String(scheduledDate.getDate()).padStart(2, '0');
      const prefix = `RES-${mm}-${jj}-`;

      let reservation: any = null;
      for (let attempt = 0; attempt < 5; attempt++) {
        try {
          const existing = await db.execute(sql`SELECT reference FROM reservations WHERE reference LIKE ${prefix + '%'} ORDER BY reference DESC LIMIT 1`);
          let seq = 1;
          if (existing.rows && existing.rows.length > 0) {
            const lastRef = (existing.rows[0] as any).reference as string;
            const lastSeq = parseInt(lastRef.split('-').pop() || '0', 10);
            seq = lastSeq + 1;
          }
          (validatedData as any).reference = `${prefix}${String(seq).padStart(2, '0')}`;
          reservation = await storage.createReservation(validatedData);
          break;
        } catch (err: any) {
          if (err.message?.includes('unique') && attempt < 4) {
            continue;
          }
          throw err;
        }
      }

      // Add additional services if provided
      if (additionalServiceIds && Array.isArray(additionalServiceIds) && additionalServiceIds.length > 0) {
        await storage.setReservationServices(reservation.id, additionalServiceIds);
      }

      // Initialize workflow tasks for this reservation if service has workflows
      try {
        const serviceWorkflows = await storage.getServiceWorkflows(reservation.serviceId);
        for (const workflow of serviceWorkflows) {
          const workflowSteps = await storage.getWorkflowSteps(workflow.id);
          await storage.initializeReservationWorkflow(reservation.id, workflowSteps);
        }
      } catch (error) {
        console.log("No workflows for this service or error initializing tasks:", error);
      }

      // Send SMS notification to client
      if (reservation.clientId) {
        try {
          const clientUser = await storage.getUser(reservation.clientId);
          if (clientUser?.phone && clientUser.smsConsent) {
            await sendEventSms({
              userPhone: clientUser.phone,
              userSmsConsent: clientUser.smsConsent,
              userName: `${clientUser.firstName || ''} ${clientUser.lastName || ''}`.trim(),
              eventType: "reservation_confirmed",
              eventTitle: (reservation as any).reference || 'votre rendez-vous',
              eventDetails: reservation.date ? new Date(reservation.date).toLocaleString('fr-FR') : undefined
            });
          }

          // Notify staff
          const staffMembers = await storage.getUsersByRoles(['admin', 'employee']);
          for (const staff of staffMembers) {
            if (staff.phone && isFrenchMobile(staff.phone)) {
              await sendSms({
                to: staff.phone,
                eventType: 'reservation_confirmed',
                eventTitle: `Nouveau RDV : ${(reservation as any).reference || ''}`,
                eventDetails: `Client : ${clientUser ? (clientUser.firstName + ' ' + clientUser.lastName) : 'Client'} - ${reservation.date ? new Date(reservation.date).toLocaleString('fr-FR') : ''}`,
                recipientName: `${staff.firstName || ''} ${staff.lastName || ''}`.trim()
              });
            }
          }
        } catch (smsErr) {
          console.error("[SMS] Failed to send reservation confirmation SMS:", smsErr);
        }
      }

      // Send WebSocket notification
      const client = wsClients.get(reservation.clientId);
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: "reservation_confirmed",
          reservationId: reservation.id,
        }));
      }
      
      // Return reservation with additional services
      const additionalServices = await storage.getReservationServices(reservation.id);
      res.json({ ...reservation, additionalServices });
    } catch (error: any) {
      console.error("Error creating reservation:", error);
      res.status(400).json({ message: error.message || "Failed to create reservation" });
    }
  });
  
  // Get additional services for a reservation
  app.get("/api/admin/reservations/:id/services", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const services = await storage.getReservationServices(id);
      res.json(services);
    } catch (error) {
      console.error("Error fetching reservation services:", error);
      res.status(500).json({ message: "Failed to fetch reservation services" });
    }
  });

  // Notification routes
  app.get("/api/notifications", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        const notifications = await ts.getNotifications(userId);
        return res.json(notifications);
      }
      const notifications = await storage.getNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.patch("/api/notifications/:id/read", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.markNotificationAsRead(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  app.get("/api/invoices/:id/pdf", async (req: any, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) return res.status(404).json({ message: "Facture non trouvée" });
      
      const items = await storage.getInvoiceItems(id);
      const client = await storage.getUser(invoice.clientId);
      const settings = await storage.getApplicationSettings();
      
      // Also fetch quote and service if linked
      let quote = null;
      let service = null;
      if (invoice.quoteId) {
        quote = await storage.getQuote(invoice.quoteId);
        if (quote) {
          service = await storage.getService(quote.serviceId);
        }
      }
      
      res.json({ invoice, items, client, settings, quote, service });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/quotes/:id/pdf", async (req: any, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (!quote) return res.status(404).json({ message: "Devis non trouvé" });
      
      const items = await storage.getQuoteItems(id);
      const client = await storage.getUser(quote.clientId);
      const settings = await storage.getApplicationSettings();
      const service = await storage.getService(quote.serviceId);
      
      res.json({ quote, items, client, settings, service });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/invoices/:id/facturx", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const isUserAdmin = req.user.role === "admin" || req.user.role === "superadmin";

      const invoice = await storage.getInvoice(id);
      if (!invoice) {
        return res.status(404).json({ message: "Facture introuvable" });
      }

      if (!isUserAdmin && invoice.clientId !== userId) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }

      const client = await storage.getUser(invoice.clientId);
      const items = await storage.getInvoiceItems(invoice.id);
      const settings = await storage.getApplicationSettings();
      const garageId = invoice.garageId || req.user?.garageId;
      const garage = garageId ? await storage.getGarage(garageId) : null;

      const sellerName = garage?.name || settings?.companyName || "AutoReport";
      const sellerAddress = garage?.address || settings?.companyAddress || "";
      const sellerPostalCode = garage?.postalCode || "";
      const sellerCity = garage?.city || settings?.companyCity || "";
      const sellerSiren = (garage as any)?.siren || "";
      const sellerSiret = garage?.siret || settings?.companySiret || "";
      const sellerTva = garage?.tvaNumber || settings?.companyTvaNumber || "";
      const sellerEmail = garage?.email || settings?.companyEmail || "";
      const sellerPhone = garage?.phone || settings?.companyPhone || "";
      const sellerIban = garage?.iban || settings?.companyIban || "";
      const sellerSwift = garage?.swift || settings?.companySwift || "";
      const sellerCountry = (garage as any)?.country || "FR";
      const sellerLegalForm = (garage as any)?.legalForm || "";
      const sellerCapitalSocial = (garage as any)?.capitalSocial || "";
      const sellerNafCode = (garage as any)?.nafCode || "";
      const sellerRcsCity = (garage as any)?.rcsCity || "";
      const sellerBankName = garage?.bankName || "";

      const buyerName = client?.companyName || `${client?.firstName || ""} ${client?.lastName || ""}`.trim() || client?.email || "Client";
      const buyerSiret = client?.siret || "";
      const buyerTva = client?.tvaNumber || "";
      const buyerAddress = client?.companyAddress || client?.address || "";
      const buyerPostalCode = (client as any)?.companyPostalCode || client?.postalCode || "";
      const buyerCity = (client as any)?.companyCity || client?.city || "";
      const buyerCountry = (client as any)?.companyCountry || "FR";
      const buyerEmail = client?.email || "";
      const isBuyerPro = !!(buyerSiret || buyerTva);

      const invoiceDate = invoice.createdAt ? new Date(invoice.createdAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
      const dueDate = invoice.dueDate ? new Date(invoice.dueDate).toISOString().slice(0, 10) : invoiceDate;

      const ht = parseFloat(invoice.priceExcludingTax || "0");
      const tva = parseFloat(invoice.taxAmount || "0");
      const ttc = parseFloat(invoice.amount || "0");
      const taxRate = parseFloat(invoice.taxRate || "20");

      const itemLines = items.length > 0 ? items.map((item: any, idx: number) => `
        <ram:IncludedSupplyChainTradeLineItem>
          <ram:AssociatedDocumentLineDocument>
            <ram:LineID>${idx + 1}</ram:LineID>
          </ram:AssociatedDocumentLineDocument>
          <ram:SpecifiedTradeProduct>
            <ram:Name>${escapeXml(item.description || "Prestation")}</ram:Name>
          </ram:SpecifiedTradeProduct>
          <ram:SpecifiedLineTradeAgreement>
            <ram:NetPriceProductTradePrice>
              <ram:ChargeAmount>${parseFloat(item.unitPrice || item.unitPriceExcludingTax || "0").toFixed(2)}</ram:ChargeAmount>
            </ram:NetPriceProductTradePrice>
          </ram:SpecifiedLineTradeAgreement>
          <ram:SpecifiedLineTradeDelivery>
            <ram:BilledQuantity unitCode="C62">${item.quantity || 1}</ram:BilledQuantity>
          </ram:SpecifiedLineTradeDelivery>
          <ram:SpecifiedLineTradeSettlement>
            <ram:ApplicableTradeTax>
              <ram:TypeCode>VAT</ram:TypeCode>
              <ram:CategoryCode>S</ram:CategoryCode>
              <ram:RateApplicablePercent>${parseFloat(item.taxRate || String(taxRate)).toFixed(2)}</ram:RateApplicablePercent>
            </ram:ApplicableTradeTax>
            <ram:SpecifiedTradeSettlementLineMonetarySummation>
              <ram:LineTotalAmount>${(parseFloat(item.unitPriceExcludingTax || item.unitPrice || "0") * (item.quantity || 1)).toFixed(2)}</ram:LineTotalAmount>
            </ram:SpecifiedTradeSettlementLineMonetarySummation>
          </ram:SpecifiedLineTradeSettlement>
        </ram:IncludedSupplyChainTradeLineItem>`).join("") : `
        <ram:IncludedSupplyChainTradeLineItem>
          <ram:AssociatedDocumentLineDocument>
            <ram:LineID>1</ram:LineID>
          </ram:AssociatedDocumentLineDocument>
          <ram:SpecifiedTradeProduct>
            <ram:Name>${escapeXml(invoice.productDetails || "Prestation de service")}</ram:Name>
          </ram:SpecifiedTradeProduct>
          <ram:SpecifiedLineTradeAgreement>
            <ram:NetPriceProductTradePrice>
              <ram:ChargeAmount>${ht.toFixed(2)}</ram:ChargeAmount>
            </ram:NetPriceProductTradePrice>
          </ram:SpecifiedLineTradeAgreement>
          <ram:SpecifiedLineTradeDelivery>
            <ram:BilledQuantity unitCode="C62">1</ram:BilledQuantity>
          </ram:SpecifiedLineTradeDelivery>
          <ram:SpecifiedLineTradeSettlement>
            <ram:ApplicableTradeTax>
              <ram:TypeCode>VAT</ram:TypeCode>
              <ram:CategoryCode>S</ram:CategoryCode>
              <ram:RateApplicablePercent>${taxRate.toFixed(2)}</ram:RateApplicablePercent>
            </ram:ApplicableTradeTax>
            <ram:SpecifiedTradeSettlementLineMonetarySummation>
              <ram:LineTotalAmount>${ht.toFixed(2)}</ram:LineTotalAmount>
            </ram:SpecifiedTradeSettlementLineMonetarySummation>
          </ram:SpecifiedLineTradeSettlement>
        </ram:IncludedSupplyChainTradeLineItem>`;

      const paymentMethodCode = invoice.paymentMethod === "card" ? "48" : invoice.paymentMethod === "sepa" ? "59" : invoice.paymentMethod === "bank_transfer" ? "30" : invoice.paymentMethod === "cash" ? "10" : "30";
      const invoiceTypeCode = invoice.type === "credit_note" ? "381" : "380";

      const sellerDescription = [
        sellerLegalForm,
        sellerCapitalSocial ? `Capital ${sellerCapitalSocial} EUR` : "",
        sellerRcsCity ? `RCS ${sellerRcsCity}` : "",
        sellerNafCode ? `NAF ${sellerNafCode}` : "",
      ].filter(Boolean).join(" - ");

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
  xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100"
  xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:BusinessProcessSpecifiedDocumentContextParameter>
      <ram:ID>A1</ram:ID>
    </ram:BusinessProcessSpecifiedDocumentContextParameter>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:factur-x.eu:1p0:extended</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>${escapeXml(invoice.invoiceNumber)}</ram:ID>
    <ram:TypeCode>${invoiceTypeCode}</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">${invoiceDate.replace(/-/g, "")}</udt:DateTimeString>
    </ram:IssueDateTime>
    <ram:IncludedNote>
      <ram:Content>${escapeXml(sellerDescription)}</ram:Content>
      <ram:SubjectCode>REG</ram:SubjectCode>
    </ram:IncludedNote>
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>${escapeXml(sellerName)}</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">${escapeXml(sellerSiret)}</ram:ID>
          <ram:TradingBusinessName>${escapeXml(sellerName)}</ram:TradingBusinessName>
        </ram:SpecifiedLegalOrganization>
        <ram:DefinedTradeContact>
          <ram:PersonName>${escapeXml(sellerName)}</ram:PersonName>${sellerPhone ? `
          <ram:TelephoneUniversalCommunication>
            <ram:CompleteNumber>${escapeXml(sellerPhone)}</ram:CompleteNumber>
          </ram:TelephoneUniversalCommunication>` : ""}${sellerEmail ? `
          <ram:EmailURIUniversalCommunication>
            <ram:URIID>${escapeXml(sellerEmail)}</ram:URIID>
          </ram:EmailURIUniversalCommunication>` : ""}
        </ram:DefinedTradeContact>
        <ram:PostalTradeAddress>
          <ram:LineOne>${escapeXml(sellerAddress)}</ram:LineOne>
          <ram:PostcodeCode>${escapeXml(sellerPostalCode)}</ram:PostcodeCode>
          <ram:CityName>${escapeXml(sellerCity)}</ram:CityName>
          <ram:CountryID>${escapeXml(sellerCountry)}</ram:CountryID>
        </ram:PostalTradeAddress>
        <ram:URIUniversalCommunication>
          <ram:URIID schemeID="EM">${escapeXml(sellerEmail)}</ram:URIID>
        </ram:URIUniversalCommunication>
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">${escapeXml(sellerTva)}</ram:ID>
        </ram:SpecifiedTaxRegistration>
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>${escapeXml(buyerName)}</ram:Name>${isBuyerPro && buyerSiret ? `
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">${escapeXml(buyerSiret)}</ram:ID>
        </ram:SpecifiedLegalOrganization>` : ""}
        <ram:PostalTradeAddress>
          <ram:LineOne>${escapeXml(buyerAddress)}</ram:LineOne>
          <ram:PostcodeCode>${escapeXml(buyerPostalCode)}</ram:PostcodeCode>
          <ram:CityName>${escapeXml(buyerCity)}</ram:CityName>
          <ram:CountryID>${escapeXml(buyerCountry)}</ram:CountryID>
        </ram:PostalTradeAddress>${buyerEmail ? `
        <ram:URIUniversalCommunication>
          <ram:URIID schemeID="EM">${escapeXml(buyerEmail)}</ram:URIID>
        </ram:URIUniversalCommunication>` : ""}${buyerTva ? `
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">${escapeXml(buyerTva)}</ram:ID>
        </ram:SpecifiedTaxRegistration>` : ""}
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeDelivery>
      <ram:ActualDeliverySupplyChainEvent>
        <ram:OccurrenceDateTime>
          <udt:DateTimeString format="102">${invoiceDate.replace(/-/g, "")}</udt:DateTimeString>
        </ram:OccurrenceDateTime>
      </ram:ActualDeliverySupplyChainEvent>
    </ram:ApplicableHeaderTradeDelivery>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
      <ram:SpecifiedTradeSettlementPaymentMeans>
        <ram:TypeCode>${paymentMethodCode}</ram:TypeCode>${sellerIban ? `
        <ram:PayeePartyCreditorFinancialAccount>
          <ram:IBANID>${escapeXml(sellerIban)}</ram:IBANID>${sellerBankName ? `
          <ram:AccountName>${escapeXml(sellerBankName)}</ram:AccountName>` : ""}
        </ram:PayeePartyCreditorFinancialAccount>` : ""}${sellerSwift ? `
        <ram:PayeeSpecifiedCreditorFinancialInstitution>
          <ram:BICID>${escapeXml(sellerSwift)}</ram:BICID>
        </ram:PayeeSpecifiedCreditorFinancialInstitution>` : ""}
      </ram:SpecifiedTradeSettlementPaymentMeans>
      <ram:ApplicableTradeTax>
        <ram:CalculatedAmount>${tva.toFixed(2)}</ram:CalculatedAmount>
        <ram:TypeCode>VAT</ram:TypeCode>
        <ram:BasisAmount>${ht.toFixed(2)}</ram:BasisAmount>
        <ram:CategoryCode>S</ram:CategoryCode>
        <ram:RateApplicablePercent>${taxRate.toFixed(2)}</ram:RateApplicablePercent>
      </ram:ApplicableTradeTax>
      <ram:SpecifiedTradePaymentTerms>
        <ram:DueDateDateTime>
          <udt:DateTimeString format="102">${dueDate.replace(/-/g, "")}</udt:DateTimeString>
        </ram:DueDateDateTime>
      </ram:SpecifiedTradePaymentTerms>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>${ht.toFixed(2)}</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>${ht.toFixed(2)}</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">${tva.toFixed(2)}</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>${ttc.toFixed(2)}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${ttc.toFixed(2)}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>${itemLines}
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;

      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="facturx-${invoice.invoiceNumber}.xml"`);
      res.send(xml);
    } catch (error: any) {
      console.error("Error generating client Factur-X XML:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Reservation CRUD routes for admin
  app.patch("/api/admin/reservations/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { additionalServiceIds, ...bodyData } = req.body;
      
      // Get previous state for audit logging
      const previousReservation = await storage.getReservation(id);
      
      const validatedData = insertReservationSchema.partial().parse(bodyData);
      const reservation = await storage.updateReservation(id, validatedData);
      
      // Update additional services if provided
      if (additionalServiceIds !== undefined && Array.isArray(additionalServiceIds)) {
        await storage.setReservationServices(id, additionalServiceIds);
      }

      // Determine action type based on status change
      let action: ActionType = "updated";
      let summary = "Réservation mise à jour";
      if (validatedData.status === "confirmed" && previousReservation?.status !== "confirmed") {
        action = "confirmed";
        summary = "Réservation confirmée";
      } else if (validatedData.status === "cancelled" && previousReservation?.status !== "cancelled") {
        action = "cancelled";
        summary = "Réservation annulée";
      } else if (validatedData.status === "completed" && previousReservation?.status !== "completed") {
        action = "completed";
        summary = "Réservation terminée";
      }

      // Log audit event
      await logAuditEvent({
        req,
        entityType: "reservation",
        entityId: id,
        action,
        summary,
        previousData: previousReservation,
        newData: reservation,
      });

      // Create notification for client if status changed
      if (validatedData.status) {
        await storage.createNotification({
          userId: reservation.clientId,
          type: "reservation",
          title: "Réservation mise à jour",
          message: `Votre réservation a été mise à jour - Statut: ${validatedData.status}`,
          relatedId: reservation.id,
        });

        // Send WebSocket notification
        const wsClient = wsClients.get(reservation.clientId);
        if (wsClient && wsClient.readyState === WebSocket.OPEN) {
          wsClient.send(JSON.stringify({
            type: "reservation_updated",
            reservationId: reservation.id,
            status: validatedData.status,
          }));
        }
      }
      
      // Automatic email disabled - use manual sending if needed
      // if (validatedData.status === "confirmed" && previousReservation?.status !== "confirmed") { ... }

      // Return reservation with additional services
      const additionalServices = await storage.getReservationServices(id);
      res.json({ ...reservation, additionalServices });
    } catch (error: any) {
      console.error("Error updating reservation:", error);
      res.status(400).json({ message: error.message || "Failed to update reservation" });
    }
  });

  app.delete("/api/admin/reservations/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      // Get reservation first to notify client
      const reservation = await storage.getReservation(id);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }

      // Note: We'll need to add deleteReservation to storage interface
      // For now, we can update status to cancelled
      await storage.updateReservation(id, { status: "cancelled" });

      // Create notification for client
      await storage.createNotification({
        userId: reservation.clientId,
        type: "reservation",
        title: "Réservation annulée",
        message: "Votre réservation a été annulée",
        relatedId: reservation.id,
      });

      // Send WebSocket notification
      const client = wsClients.get(reservation.clientId);
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: "reservation_cancelled",
          reservationId: reservation.id,
        }));
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting reservation:", error);
      res.status(400).json({ message: error.message || "Failed to delete reservation" });
    }
  });

  // Admin users route
  app.get("/api/admin/users", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      // Superadmin sees all users, other admins see only their garage's users
      const garageId = getGarageScope(req.user);
      let userList;
      if (garageId) {
        userList = await storage.getUsersByGarage(garageId);
      } else {
        userList = await storage.getAllUsers();
      }
      // Sanitize all users - remove passwords
      res.json(sanitizeUsers(userList));
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Get single user by ID
  app.get("/api/admin/users/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(id);
      // Check garage access
      if (user && !hasGarageAccess(req.user, user.garageId)) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      // Sanitize - remove password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
    }
  });

  app.patch("/api/admin/users/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const currentUser = req.user;
      
      // Get target user to check their current role
      const targetUser = await storage.getUser(id);
      if (!targetUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      
      const allowedRoles = currentUser.role === "rootadmin"
        ? (["client", "client_professionnel", "employe", "admin", "superadmin"] as const)
        : (["client", "client_professionnel", "employe", "admin"] as const);

      const updateSchema = z.object({
        role: z.enum(allowedRoles).optional(),
        email: z.string().email().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phone: z.string().optional().nullable(),
        address: z.string().optional().nullable(),
        postalCode: z.string().optional().nullable(),
        city: z.string().optional().nullable(),
        companyName: z.string().optional().nullable(),
        siret: z.string().optional().nullable(),
        tvaNumber: z.string().optional().nullable(),
        companyAddress: z.string().optional().nullable(),
        smsConsent: z.boolean().optional(),
      });
      const validatedData = updateSchema.parse(req.body);

      // Prevent anyone from setting rootadmin role via this route
      if ((validatedData as any).role === "rootadmin") {
        return res.status(403).json({ message: "Le rôle rootadmin ne peut pas être assigné via cette interface" });
      }
      
      // Employees cannot demote admin users
      if (currentUser.role === "employe" && targetUser.role === "admin") {
        if (validatedData.role && validatedData.role !== "admin") {
          return res.status(403).json({ 
            message: "Vous n'avez pas la permission de modifier le rôle d'un administrateur" 
          });
        }
      }
      
      // Employees cannot promote non-admins to admin
      if (currentUser.role === "employe" && validatedData.role === "admin" && targetUser.role !== "admin") {
        return res.status(403).json({ 
          message: "Vous n'avez pas la permission de promouvoir un utilisateur au rôle administrateur" 
        });
      }
      
      const user = await storage.updateUser(id, validatedData);
      res.json(sanitizeUser(user));
    } catch (error: any) {
      console.error("Error updating user:", error);
      res.status(400).json({ message: error.message || "Failed to update user" });
    }
  });

  // Self-profile update route
  app.patch("/api/user/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      
      const updateSchema = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phone: z.string().optional().nullable(),
        address: z.string().optional().nullable(),
        postalCode: z.string().optional().nullable(),
        city: z.string().optional().nullable(),
        companyName: z.string().optional().nullable(),
        siret: z.string().optional().nullable(),
        tvaNumber: z.string().optional().nullable(),
        companyAddress: z.string().optional().nullable(),
        smsConsent: z.boolean().optional(),
      });

      const validatedData = updateSchema.parse(req.body);
      
      const user = await storage.updateUser(userId, validatedData);
      res.json(sanitizeUser(user));
    } catch (error: any) {
      console.error("Error updating profile:", error);
      res.status(400).json({ message: error.message || "Erreur lors de la mise à jour du profil" });
    }
  });

  // Admin route to change user password
  app.patch("/api/admin/users/:id/password", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const currentUser = req.user;
      const passwordSchema = z.object({
        newPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
      });
      const { newPassword } = passwordSchema.parse(req.body);
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      
      // Employees cannot change admin passwords
      if (currentUser.role === "employe" && user.role === "admin") {
        return res.status(403).json({ 
          message: "Vous n'avez pas la permission de modifier le mot de passe d'un administrateur" 
        });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUser(id, { password: hashedPassword });
      
      res.json({ message: "Mot de passe modifié avec succès" });
    } catch (error: any) {
      console.error("Error changing user password:", error);
      res.status(400).json({ message: error.message || "Échec de la modification du mot de passe" });
    }
  });

  // User route to change own password
  app.patch("/api/user/password", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const passwordSchema = z.object({
        currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
        newPassword: z.string().min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères"),
      });
      const { currentPassword, newPassword } = passwordSchema.parse(req.body);
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      
      // Verify current password
      if (!user.password) {
        return res.status(400).json({ message: "Ce compte utilise une authentification externe" });
      }
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Mot de passe actuel incorrect" });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUser(userId, { password: hashedPassword });
      
      res.json({ message: "Mot de passe modifié avec succès" });
    } catch (error: any) {
      console.error("Error changing password:", error);
      res.status(400).json({ message: error.message || "Échec de la modification du mot de passe" });
    }
  });

  // ========== USER DASHBOARD API ==========

  app.get("/api/user/dashboard-stats", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const reports = await storage.getAiReports({ userId });
      const subs = await storage.getUserSubscriptions(userId);
      const active = subs.find(s => s.status === "active");
      let planName: string | undefined;
      if (active?.planId) {
        const plan = await storage.getSubscriptionPlan(active.planId);
        planName = plan?.name;
      }
      res.json({
        totalReports: reports.length,
        recentReports: reports.slice(0, 5).map(r => ({
          id: r.id,
          make: r.make,
          model: r.model,
          year: r.year,
          createdAt: r.createdAt,
          severity: (r.metadata as any)?.report?.urgencyLevel,
        })),
        subscription: active ? {
          status: active.status,
          planName,
          reportsUsed: active.reportsUsed,
          reportsIncluded: active.reportsIncluded,
          periodEnd: active.currentPeriodEnd,
        } : null,
      });
    } catch (error: any) {
      console.error("[user/dashboard-stats]", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/user/reports", isAuthenticated, async (req: any, res) => {
    try {
      const reports = await storage.getAiReports({ userId: req.user.id });
      res.json(reports.map(r => ({
        id: r.id,
        make: r.make,
        model: r.model,
        year: r.year,
        mileage: r.mileage,
        issue: r.issue,
        content: r.content,
        createdAt: r.createdAt,
        severity: (r.metadata as any)?.report?.urgencyLevel,
        metadata: r.metadata,
      })));
    } catch (error: any) {
      console.error("[user/reports]", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/user/reports/:id/excel", isAuthenticated, async (req: any, res) => {
    try {
      const report = await storage.getAiReport(req.params.id);
      if (!report || report.userId !== req.user.id) {
        return res.status(404).json({ message: "Rapport introuvable" });
      }
      const XLSX = await import("xlsx");
      const wb = XLSX.utils.book_new();
      const data: any = (report.metadata as any)?.report || {};
      const summary = [
        ["Marque", report.make],
        ["Modèle", report.model],
        ["Année", report.year],
        ["Kilométrage", report.mileage || ""],
        ["Problème", report.issue],
        ["Urgence", data.urgencyLevel || ""],
        ["Coût estimé", data.estimatedCost || ""],
        ["Résumé", data.summary || ""],
        ["Date", new Date(report.createdAt!).toLocaleString("fr-FR")],
      ];
      const wsSummary = XLSX.utils.aoa_to_sheet(summary);
      XLSX.utils.book_append_sheet(wb, wsSummary, "Résumé");
      if (Array.isArray(data.sections) && data.sections.length) {
        const sectionsRows = [["Titre", "Sévérité", "Contenu"], ...data.sections.map((s: any) => [s.title, s.severity || "", s.content])];
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sectionsRows), "Points de vigilance");
      }
      if (Array.isArray(data.recommendations) && data.recommendations.length) {
        const recRows = [["#", "Action"], ...data.recommendations.map((r: string, i: number) => [i + 1, r])];
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(recRows), "Checklist");
      }
      const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="diagnostic-${report.make}-${Date.now()}.xlsx"`);
      res.send(buf);
    } catch (error: any) {
      console.error("[user/reports/excel]", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/user/payments", isAuthenticated, async (req: any, res) => {
    try {
      const subs = await storage.getUserSubscriptions(req.user.id);
      const planIds = [...new Set(subs.map(s => s.planId).filter(Boolean))] as string[];
      const planMap = new Map<string, string>();
      for (const id of planIds) {
        const plan = await storage.getSubscriptionPlan(id);
        if (plan) planMap.set(id, plan.name);
      }
      res.json(subs.map(s => ({
        id: s.id,
        planId: s.planId,
        planName: s.planId ? planMap.get(s.planId) : undefined,
        status: s.status,
        reportsUsed: s.reportsUsed,
        reportsIncluded: s.reportsIncluded,
        currentPeriodEnd: s.currentPeriodEnd,
        createdAt: s.createdAt,
      })));
    } catch (error: any) {
      console.error("[user/payments]", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/user/invoices", isAuthenticated, async (req: any, res) => {
    try {
      const subs = await storage.getUserSubscriptions(req.user.id);
      const paid = subs.filter(s => s.status === "active" || s.status === "completed");
      const planIds = [...new Set(paid.map(s => s.planId).filter(Boolean))] as string[];
      const planMap = new Map<string, any>();
      for (const id of planIds) {
        const plan = await storage.getSubscriptionPlan(id);
        if (plan) planMap.set(id, plan);
      }
      res.json(paid.map(s => {
        const plan = s.planId ? planMap.get(s.planId) : null;
        return {
          id: s.id,
          number: `INV-${s.id.slice(0, 8).toUpperCase()}`,
          amount: plan?.price || "0",
          currency: plan?.currency || "eur",
          status: "paid",
          createdAt: s.createdAt,
          description: plan?.name || "Pack rapports",
        };
      }));
    } catch (error: any) {
      console.error("[user/invoices]", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/user/invoices/:id/pdf", isAuthenticated, async (req: any, res) => {
    try {
      const subs = await storage.getUserSubscriptions(req.user.id);
      const sub = subs.find(s => s.id === req.params.id);
      if (!sub) return res.status(404).json({ message: "Facture introuvable" });
      const plan = sub.planId ? await storage.getSubscriptionPlan(sub.planId) : null;
      const user = await storage.getUser(req.user.id);
      const settings = await storage.getApplicationSettings();
      const number = `INV-${sub.id.slice(0, 8).toUpperCase()}`;
      const date = sub.createdAt ? new Date(sub.createdAt).toLocaleDateString("fr-FR") : "";
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${number}</title>
<style>body{font-family:Arial,sans-serif;padding:40px;color:#333}h1{color:#CE1126}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #ddd;padding:10px;text-align:left}.total{font-size:1.2em;font-weight:bold;text-align:right;margin-top:20px}</style>
</head><body>
<h1>${settings?.companyName || "AutoReport"}</h1>
<p>${settings?.companyEmail || ""}</p>
<hr/>
<h2>Facture ${number}</h2>
<p><strong>Date :</strong> ${date}</p>
<p><strong>Client :</strong> ${user?.firstName || ""} ${user?.lastName || ""} (${user?.email || ""})</p>
<table><thead><tr><th>Description</th><th>Quantité</th><th>Prix</th></tr></thead>
<tbody><tr><td>${plan?.name || "Pack rapports"}</td><td>${plan?.reportsIncluded || 1} rapports</td><td>${Number(plan?.price || 0).toFixed(2)} €</td></tr></tbody></table>
<p class="total">Total TTC : ${Number(plan?.price || 0).toFixed(2)} €</p>
<p style="margin-top:40px;font-size:0.9em;color:#666">Statut : Payée · Merci pour votre confiance.</p>
</body></html>`;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Content-Disposition", `inline; filename="${number}.html"`);
      res.send(html);
    } catch (error: any) {
      console.error("[user/invoice/pdf]", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/user/support", isAuthenticated, async (req: any, res) => {
    try {
      const tickets = await storage.getSupportTicketsByUser(req.user.id);
      res.json(tickets);
    } catch (error: any) {
      console.error("[user/support GET]", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/user/support", isAuthenticated, async (req: any, res) => {
    try {
      const { subject, message } = req.body;
      if (!subject || !message) {
        return res.status(400).json({ message: "Sujet et message requis" });
      }
      const user = await storage.getUser(req.user.id);
      const ticket = await storage.createSupportTicket({
        userId: req.user.id,
        email: user?.email || "",
        subject: String(subject).slice(0, 255),
        message: String(message),
        status: "open",
      });
      try {
        const { sendEmail } = await import("./emailService");
        const settings = await storage.getApplicationSettings();
        const to = settings?.companyEmail || "support@autoreport.com";
        const clientName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.email || req.user.id;
        await sendEmail({
          to,
          subject: `[Support #${ticket.id.slice(0, 8)}] ${subject}`,
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
<h2 style="color:#CE1126">Nouvelle demande de support</h2>
<p><strong>Client :</strong> ${clientName}</p>
<p><strong>Email :</strong> ${user?.email || ""}</p>
<p><strong>Sujet :</strong> ${subject}</p>
<hr/>
<div style="background:#f5f5f5;padding:15px;border-radius:6px;white-space:pre-wrap">${String(message).replace(/</g, "&lt;")}</div>
<p style="color:#888;font-size:0.85em;margin-top:20px">Ticket ID : ${ticket.id}</p>
</div>`,
          replyTo: user?.email || undefined,
        } as any);
      } catch (e) {
        console.error("[support email]", e);
      }
      res.json(ticket);
    } catch (error: any) {
      console.error("[user/support POST]", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/user/delete-request", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      const { reason } = req.body;
      const { sendEmail } = await import("./emailService");
      const settings = await storage.getApplicationSettings();
      const clientName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || userId;
      const adminEmail = settings?.companyEmail || "contact@autoreport.com";

      await sendEmail({
        to: adminEmail,
        subject: `[RGPD] Demande de suppression de compte - ${clientName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #dc2626;">Demande de suppression de compte</h2>
            <p><strong>Client :</strong> ${clientName}</p>
            <p><strong>Email :</strong> ${user.email || "N/A"}</p>
            <p><strong>ID :</strong> ${userId}</p>
            <p><strong>Date :</strong> ${new Date().toLocaleString("fr-FR")}</p>
            ${reason ? `<p><strong>Motif :</strong> ${reason}</p>` : ""}
            <hr />
            <p style="color: #6b7280; font-size: 14px;">
              Conformément au RGPD, cette demande doit être traitée dans un délai de 72 heures.
              Veuillez supprimer manuellement le compte et toutes les données associées depuis l'interface d'administration.
            </p>
          </div>
        `,
      });

      res.json({ message: "Demande de suppression envoyée avec succès" });
    } catch (error: any) {
      console.error("Error sending delete request:", error);
      res.status(500).json({ message: "Impossible d'envoyer la demande de suppression" });
    }
  });

  // Admin route to create a new client (professionnel or particulier) without password
  app.post("/api/admin/clients", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const createClientSchema = z.object({
        email: z.string().email(),
        firstName: z.string().min(1, "Le prénom est requis"),
        lastName: z.string().min(1, "Le nom est requis"),
        phone: z.string().optional(),
        address: z.string().optional(),
        postalCode: z.string().optional(),
        city: z.string().optional(),
        role: z.enum(["client", "client_professionnel"]),
        companyName: z.string().optional(),
        siret: z.string().optional(),
        tvaNumber: z.string().optional(),
        companyAddress: z.string().optional(),
      });

      const validatedData = createClientSchema.parse(req.body);

      // Check if email already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Cet email est déjà utilisé" });
      }

      // Generate a default password that can be changed later
      const { hashPassword } = await import("./localAuth");
      const defaultPassword = await hashPassword("123user");

      const userData: any = {
        email: validatedData.email,
        password: defaultPassword,
        firstName: validatedData.firstName || null,
        lastName: validatedData.lastName || null,
        phone: validatedData.phone || null,
        address: validatedData.address || null,
        postalCode: validatedData.postalCode || null,
        city: validatedData.city || null,
        role: validatedData.role,
      };

      // Add company fields if professional client
      if (validatedData.role === "client_professionnel") {
        userData.companyName = validatedData.companyName || null;
        userData.siret = validatedData.siret || null;
        userData.tvaNumber = validatedData.tvaNumber || null;
        userData.companyAddress = validatedData.companyAddress || null;
      }

      const newClient = await storage.createUser(userData);

      res.json(sanitizeUser(newClient));
    } catch (error: any) {
      console.error("Error creating client:", error);
      res.status(400).json({ message: error.message || "Échec de la création du client" });
    }
  });

  app.post("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const createSchema = z.object({
        email: z.string().email(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        postalCode: z.string().optional(),
        city: z.string().optional(),
        role: z.enum(["client", "client_professionnel", "employe", "admin"]).optional(),
        companyName: z.string().optional(),
        siret: z.string().optional(),
        tvaNumber: z.string().optional(),
        companyAddress: z.string().optional(),
      });
      const validatedData = createSchema.parse(req.body);
      
      // Generate a default password
      const { hashPassword } = await import("./localAuth");
      const defaultPassword = await hashPassword("123user");
      
      const user = await storage.createUser({
        ...validatedData,
        password: defaultPassword,
      });
      res.json(sanitizeUser(user));
    } catch (error: any) {
      console.error("Error creating user:", error);
      res.status(400).json({ message: error.message || "Failed to create user" });
    }
  });

  app.delete("/api/admin/users/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const currentUser = req.user;
      
      // Check if target user is an admin
      const targetUser = await storage.getUser(id);
      if (!targetUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      
      // Employees cannot delete admin users
      if (currentUser.role === "employe" && targetUser.role === "admin") {
        return res.status(403).json({ 
          message: "Vous n'avez pas la permission de supprimer un administrateur" 
        });
      }
      
      await storage.deleteUser(id);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting user:", error);
      res.status(400).json({ message: error.message || "Failed to delete user" });
    }
  });

  // Application Settings routes
  app.get("/api/admin/settings", isAuthenticated, isAdmin, async (req, res) => {
    try {
      let settings = await storage.getApplicationSettings();
      
      // If no settings exist, create default settings
      if (!settings) {
        settings = await storage.createOrUpdateApplicationSettings({});
      }
      
      res.json(settings);
    } catch (error) {
      console.error("Error fetching application settings:", error);
      res.status(500).json({ message: "Failed to fetch application settings" });
    }
  });

  app.patch("/api/admin/settings", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const settings = await storage.createOrUpdateApplicationSettings(req.body);
      
      const { updateDailyReportSchedule } = await import('./dailyReportScheduler');
      updateDailyReportSchedule({
        enabled: (settings as any).dailyReportEnabled ?? false,
        time: (settings as any).dailyReportTime || '21:00',
        recipients: (settings as any).dailyReportRecipients || 'contact@autoreport.com',
      });
      
      res.json(settings);
    } catch (error: any) {
      console.error("Error updating application settings:", error);
      res.status(400).json({ message: error.message || "Failed to update application settings" });
    }
  });

  app.post("/api/admin/daily-report/test", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { triggerDailyReport } = await import('./dailyReportScheduler');
      await triggerDailyReport();
      res.json({ success: true, message: "Rapport test envoyé" });
    } catch (error: any) {
      console.error("Error sending test daily report:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'envoi du rapport test" });
    }
  });

  app.get("/api/admin/garage-legal", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.garageId;
      if (!garageId) {
        return res.status(404).json({ message: "Aucun garage associé" });
      }
      const garage = await storage.getGarage(garageId);
      if (!garage) {
        return res.status(404).json({ message: "Garage introuvable" });
      }
      res.json({
        id: garage.id,
        name: garage.name,
        address: garage.address,
        city: garage.city,
        postalCode: garage.postalCode,
        phone: garage.phone,
        email: garage.email,
        website: garage.website,
        siren: (garage as any).siren || "",
        siret: garage.siret || "",
        tvaNumber: garage.tvaNumber || "",
        iban: garage.iban || "",
        swift: garage.swift || "",
        bankName: garage.bankName || "",
        legalForm: (garage as any).legalForm || "",
        capitalSocial: (garage as any).capitalSocial || "",
        nafCode: (garage as any).nafCode || "",
        rcsCity: (garage as any).rcsCity || "",
        country: (garage as any).country || "FR",
      });
    } catch (error: any) {
      console.error("Error fetching garage legal info:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/admin/garage-legal", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.garageId;
      if (!garageId) {
        return res.status(404).json({ message: "Aucun garage associé" });
      }
      const allowedFields = [
        "name", "address", "city", "postalCode", "phone", "email", "website",
        "siren", "siret", "tvaNumber", "iban", "swift", "bankName",
        "legalForm", "capitalSocial", "nafCode", "rcsCity", "country"
      ];
      const updateData: Record<string, any> = {};
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      }
      updateData.updatedAt = new Date();
      const garage = await storage.updateGarage(garageId, updateData);
      res.json(garage);
    } catch (error: any) {
      console.error("Error updating garage legal info:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Engagement (Prestation) routes
  app.get("/api/admin/engagements", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { clientId } = req.query;
      const garageId = req.user.role !== 'superadmin' ? req.user.garageId : null;
      
      const engagementsList = await storage.getEngagements(clientId as string | undefined);
      
      // Filter by garage access if not superadmin
      const filteredEngagements = garageId 
        ? engagementsList.filter(e => {
            // Since engagements table doesn't have garageId, we should check related quotes/invoices
            // or we might need to add garageId to engagements table.
            // For now, if engagements table is empty, we show empty.
            return true; 
          })
        : engagementsList;

      res.json(filteredEngagements);
    } catch (error: any) {
      console.error("Error fetching engagements:", error);
      res.status(500).json({ message: "Failed to fetch engagements" });
    }
  });

  app.get("/api/admin/engagements/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const engagement = await storage.getEngagement(req.params.id);
      if (!engagement) {
        return res.status(404).json({ message: "Engagement not found" });
      }
      res.json(engagement);
    } catch (error: any) {
      console.error("Error fetching engagement:", error);
      res.status(500).json({ message: "Failed to fetch engagement" });
    }
  });

  app.post("/api/admin/engagements", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const engagement = await storage.createEngagement({
        clientId: req.body.clientId,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || "active",
      });
      res.json(engagement);
    } catch (error: any) {
      console.error("Error creating engagement:", error);
      res.status(400).json({ message: error.message || "Failed to create engagement" });
    }
  });

  app.patch("/api/admin/engagements/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const engagement = await storage.updateEngagement(req.params.id, req.body);
      res.json(engagement);
    } catch (error: any) {
      console.error("Error updating engagement:", error);
      res.status(400).json({ message: error.message || "Failed to update engagement" });
    }
  });

  app.delete("/api/admin/engagements/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.updateEngagement(req.params.id, { status: "cancelled" });
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting engagement:", error);
      res.status(400).json({ message: error.message || "Failed to delete engagement" });
    }
  });

  app.get("/api/admin/engagements/summary/:clientId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const summary = await storage.getEngagementSummary(req.params.clientId);
      res.json(summary);
    } catch (error: any) {
      console.error("Error fetching engagement summary:", error);
      res.status(500).json({ message: "Failed to fetch engagement summary" });
    }
  });

  app.get("/api/admin/engagements/clients-summary", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user.role !== 'superadmin' ? req.user.garageId : null;
      const allUsers = await storage.getAllUsers();
      const clients = allUsers.filter(u => u.role === 'client' || u.role === 'client_professionnel');
      
      const allQuotes = await storage.getQuotes();
      const allInvoices = await storage.getInvoices();
      const allReservations = await storage.getReservations();

      const filteredQuotes = garageId ? allQuotes.filter(q => q.garageId === garageId) : allQuotes;
      const filteredInvoices = garageId ? allInvoices.filter(i => i.garageId === garageId) : allInvoices;
      const filteredReservations = garageId ? allReservations.filter(r => r.garageId === garageId) : allReservations;

      const clientSummaries = clients
        .map(client => {
          const clientQuotes = filteredQuotes.filter(q => q.clientId === client.id);
          const clientInvoices = filteredInvoices.filter(i => i.clientId === client.id);
          const clientReservations = filteredReservations.filter(r => r.clientId === client.id);
          
          if (clientQuotes.length === 0 && clientInvoices.length === 0 && clientReservations.length === 0) {
            return null;
          }

          const totalCA = clientInvoices
            .filter(i => i.status === 'paid')
            .reduce((sum, i) => sum + parseFloat(i.amount || '0'), 0);

          const lastActivity = [...clientQuotes, ...clientInvoices, ...clientReservations]
            .map(item => item.createdAt ? new Date(item.createdAt).getTime() : 0)
            .sort((a, b) => b - a)[0] || 0;

          return {
            clientId: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            phone: client.phone,
            quotesCount: clientQuotes.length,
            invoicesCount: clientInvoices.length,
            reservationsCount: clientReservations.length,
            totalCA,
            lastActivity: lastActivity ? new Date(lastActivity).toISOString() : null,
          };
        })
        .filter(Boolean)
        .sort((a: any, b: any) => {
          const dateA = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
          const dateB = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
          return dateB - dateA;
        });

      res.json(clientSummaries);
    } catch (error: any) {
      console.error("Error fetching clients summary:", error);
      res.status(500).json({ message: "Failed to fetch clients summary" });
    }
  });

  // Workflow routes
  app.get("/api/admin/workflows", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const workflows = await storage.getWorkflows();
      res.json(workflows);
    } catch (error: any) {
      console.error("Error fetching workflows:", error);
      res.status(500).json({ message: "Failed to fetch workflows" });
    }
  });

  app.get("/api/admin/workflows/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const workflow = await storage.getWorkflow(req.params.id);
      if (!workflow) {
        return res.status(404).json({ message: "Workflow not found" });
      }
      res.json(workflow);
    } catch (error: any) {
      console.error("Error fetching workflow:", error);
      res.status(500).json({ message: "Failed to fetch workflow" });
    }
  });

  // Get workflow by service ID (for employee view)
  app.get("/api/services/:serviceId/workflow", isAuthenticated, async (req, res) => {
    try {
      const workflow = await storage.getWorkflowByServiceId(req.params.serviceId);
      if (!workflow) {
        return res.status(404).json({ message: "No workflow found for this service" });
      }
      const steps = await storage.getWorkflowSteps(workflow.id);
      res.json({ ...workflow, steps });
    } catch (error: any) {
      console.error("Error fetching service workflow:", error);
      res.status(500).json({ message: "Failed to fetch service workflow" });
    }
  });

  // Get all services with their workflows (for employee/admin)
  app.get("/api/services-with-workflows", isAuthenticated, async (req, res) => {
    try {
      const allServices = await storage.getServices();
      const servicesWithWorkflows = await Promise.all(
        allServices.map(async (service) => {
          const workflow = await storage.getWorkflowByServiceId(service.id);
          let steps: any[] = [];
          if (workflow) {
            steps = await storage.getWorkflowSteps(workflow.id);
          }
          return { ...service, workflow: workflow ? { ...workflow, steps } : null };
        })
      );
      res.json(servicesWithWorkflows);
    } catch (error: any) {
      console.error("Error fetching services with workflows:", error);
      res.status(500).json({ message: "Failed to fetch services with workflows" });
    }
  });

  app.post("/api/admin/workflows", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const workflow = await storage.createWorkflow({
        name: req.body.name,
        description: req.body.description,
      });
      res.json(workflow);
    } catch (error: any) {
      console.error("Error creating workflow:", error);
      res.status(400).json({ message: error.message || "Failed to create workflow" });
    }
  });

  app.post("/api/admin/workflow-steps", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const step = await storage.createWorkflowStep({
        workflowId: req.body.workflowId,
        stepNumber: req.body.stepNumber,
        title: req.body.title,
        description: req.body.description,
      });
      res.json(step);
    } catch (error: any) {
      console.error("Error creating workflow step:", error);
      res.status(400).json({ message: error.message || "Failed to create workflow step" });
    }
  });

  app.get("/api/admin/workflows/:workflowId/steps", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const steps = await storage.getWorkflowSteps(req.params.workflowId);
      res.json(steps);
    } catch (error: any) {
      console.error("Error fetching workflow steps:", error);
      res.status(500).json({ message: "Failed to fetch workflow steps" });
    }
  });

  app.post("/api/admin/services/:serviceId/workflows", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const serviceWorkflow = await storage.assignWorkflowToService({
        serviceId: req.params.serviceId,
        workflowId: req.body.workflowId,
      });
      res.json(serviceWorkflow);
    } catch (error: any) {
      console.error("Error assigning workflow to service:", error);
      res.status(400).json({ message: error.message || "Failed to assign workflow" });
    }
  });

  app.get("/api/admin/services/:serviceId/workflows", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const workflows = await storage.getServiceWorkflows(req.params.serviceId);
      res.json(workflows);
    } catch (error: any) {
      console.error("Error fetching service workflows:", error);
      res.status(500).json({ message: "Failed to fetch service workflows" });
    }
  });

  app.delete("/api/admin/workflows/:workflowId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteWorkflow(req.params.workflowId);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting workflow:", error);
      res.status(400).json({ message: error.message || "Failed to delete workflow" });
    }
  });

  app.patch("/api/admin/workflows/:workflowId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const workflow = await storage.updateWorkflow(req.params.workflowId, {
        name: req.body.name,
        description: req.body.description,
      });
      res.json(workflow);
    } catch (error: any) {
      console.error("Error updating workflow:", error);
      res.status(400).json({ message: error.message || "Failed to update workflow" });
    }
  });

  app.delete("/api/admin/workflow-steps/:stepId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteWorkflowStep(req.params.stepId);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting workflow step:", error);
      res.status(400).json({ message: error.message || "Failed to delete workflow step" });
    }
  });

  app.patch("/api/admin/workflow-steps/:stepId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const step = await storage.updateWorkflowStep(req.params.stepId, {
        title: req.body.title,
        description: req.body.description,
        stepNumber: req.body.stepNumber,
      });
      res.json(step);
    } catch (error: any) {
      console.error("Error updating workflow step:", error);
      res.status(400).json({ message: error.message || "Failed to update workflow step" });
    }
  });

  app.delete("/api/admin/services/:serviceId/workflows/:workflowId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteServiceWorkflow(req.params.serviceId, req.params.workflowId);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error unassigning workflow:", error);
      res.status(400).json({ message: error.message || "Failed to unassign workflow" });
    }
  });

  // Workshop task routes
  app.get("/api/workshop/reservations/:reservationId/tasks", isAuthenticated, async (req, res) => {
    try {
      const tasks = await storage.getReservationTasks(req.params.reservationId);
      res.json(tasks);
    } catch (error: any) {
      console.error("Error fetching workshop tasks:", error);
      res.status(500).json({ message: "Failed to fetch workshop tasks" });
    }
  });

  app.patch("/api/workshop/tasks/:taskId", isAuthenticated, async (req: any, res) => {
    try {
      const task = await storage.updateWorkshopTask(req.params.taskId, {
        isCompleted: req.body.isCompleted,
        comment: req.body.comment,
        completedByUserId: req.body.isCompleted ? req.user.id : undefined,
        completedAt: req.body.isCompleted ? new Date() : undefined,
      });
      
      // Log audit event for workshop task update
      await logAuditEvent({
        req,
        entityType: "workshop_task",
        entityId: task.id,
        action: req.body.isCompleted ? "completed" : "updated",
        summary: `Étape ${req.body.isCompleted ? "validée" : "mise à jour"}`,
        newData: task,
      });
      
      res.json(task);
    } catch (error: any) {
      console.error("Error updating workshop task:", error);
      res.status(400).json({ message: error.message || "Failed to update workshop task" });
    }
  });

  // ========== REPAIR ORDER ROUTES ==========
  app.get("/api/admin/repair-orders", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const orders = await storage.getRepairOrders();
      res.json(orders);
    } catch (error: any) {
      console.error("Error fetching repair orders:", error);
      res.status(500).json({ message: "Failed to fetch repair orders" });
    }
  });

  app.get("/api/admin/repair-orders/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const order = await storage.getRepairOrder(req.params.id);
      if (!order) return res.status(404).json({ message: "Repair order not found" });
      res.json(order);
    } catch (error: any) {
      console.error("Error fetching repair order:", error);
      res.status(500).json({ message: "Failed to fetch repair order" });
    }
  });

  app.get("/api/admin/repair-orders/reservation/:reservationId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const order = await storage.getRepairOrderByReservation(req.params.reservationId);
      res.json(order || null);
    } catch (error: any) {
      console.error("Error fetching repair order by reservation:", error);
      res.status(500).json({ message: "Failed to fetch repair order" });
    }
  });

  app.post("/api/admin/repair-orders", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const prefix = `OR-${mm}-${dd}-`;
      let order: any;
      for (let attempt = 0; attempt < 5; attempt++) {
        try {
          let seq = 1;
          const existing = await db.select().from(repairOrders)
            .where(sql`reference LIKE ${prefix + '%'}`)
            .orderBy(desc(repairOrders.reference));
          if (existing.length > 0) {
            const lastRef = existing[0].reference || '';
            const lastSeq = parseInt(lastRef.split('-').pop() || '0', 10);
            seq = lastSeq + 1;
          }
          const reference = `${prefix}${String(seq).padStart(2, '0')}`;
          order = await storage.createRepairOrder({
            ...req.body,
            reference,
            createdById: req.user.id,
          });
          break;
        } catch (err: any) {
          if (err.message?.includes('unique') && attempt < 4) continue;
          throw err;
        }
      }
      res.json(order);
    } catch (error: any) {
      console.error("Error creating repair order:", error);
      res.status(400).json({ message: error.message || "Failed to create repair order" });
    }
  });

  app.patch("/api/admin/repair-orders/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const order = await storage.updateRepairOrder(req.params.id, req.body);
      res.json(order);
    } catch (error: any) {
      console.error("Error updating repair order:", error);
      res.status(400).json({ message: error.message || "Failed to update repair order" });
    }
  });

  app.delete("/api/admin/repair-orders/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteRepairOrder(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting repair order:", error);
      res.status(500).json({ message: "Failed to delete repair order" });
    }
  });

  // ========== WORKSHOP DASHBOARD ROUTES ==========
  app.get("/api/workshop/active-reservations", isAuthenticated, async (req, res) => {
    try {
      const allReservations = await storage.getReservations();
      const active = allReservations.filter(r => 
        r.status === "confirmed" || r.status === "pending" || r.status === "in_progress"
      );
      const result = await Promise.all(active.map(async (reservation) => {
        const tasks = await storage.getReservationTasks(reservation.id);
        const repairOrder = await storage.getRepairOrderByReservation(reservation.id);
        const completedTasks = tasks.filter(t => t.isCompleted).length;
        const totalTasks = tasks.length;
        return {
          ...reservation,
          tasks,
          repairOrder,
          progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
          completedTasks,
          totalTasks,
        };
      }));
      res.json(result);
    } catch (error: any) {
      console.error("Error fetching active reservations:", error);
      res.status(500).json({ message: "Failed to fetch active reservations" });
    }
  });

  // Initialize default workflow steps for a service
  app.post("/api/admin/services/:serviceId/init-default-workflow", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { serviceId } = req.params;
      const service = await storage.getService(serviceId);
      if (!service) return res.status(404).json({ message: "Service not found" });
      
      let workflow = await storage.getWorkflowByServiceId(serviceId);
      if (!workflow) {
        workflow = await storage.createWorkflow({
          name: `Workflow - ${service.name}`,
          description: `Workflow pour le service ${service.name}`,
          serviceId,
        });
      }
      
      const existingSteps = await storage.getWorkflowSteps(workflow.id);
      if (existingSteps.length > 0) {
        return res.json({ workflow, steps: existingSteps, message: "Workflow already has steps" });
      }
      
      const defaultSteps = [
        { stepNumber: 1, title: "Réception du véhicule", description: "Accueil client, vérification du rendez-vous, prise en charge du véhicule" },
        { stepNumber: 2, title: "Ordre de réparation", description: "État des lieux complet du véhicule avant intervention (extérieur, intérieur, kilométrage, carburant)" },
        { stepNumber: 3, title: "Diagnostic", description: "Inspection technique et diagnostic des travaux à réaliser" },
        { stepNumber: 4, title: "Préparation pièces", description: "Vérification et préparation des pièces et outils nécessaires" },
        { stepNumber: 5, title: "Intervention", description: "Réalisation des travaux selon le devis validé" },
        { stepNumber: 6, title: "Contrôle qualité", description: "Vérification de la qualité des travaux réalisés" },
        { stepNumber: 7, title: "Nettoyage", description: "Nettoyage du véhicule et de la zone de travail" },
        { stepNumber: 8, title: "Restitution", description: "Remise du véhicule au client avec explications des travaux effectués" },
      ];
      
      const steps = [];
      for (const step of defaultSteps) {
        const created = await storage.createWorkflowStep({
          workflowId: workflow.id,
          ...step,
        });
        steps.push(created);
      }
      
      res.json({ workflow, steps });
    } catch (error: any) {
      console.error("Error initializing default workflow:", error);
      res.status(400).json({ message: error.message || "Failed to initialize workflow" });
    }
  });

  // Bulk init default workflows for all services without steps
  app.post("/api/admin/init-all-default-workflows", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const allServices = await storage.getServices();
      const results = [];
      
      for (const service of allServices) {
        let workflow = await storage.getWorkflowByServiceId(service.id);
        if (!workflow) {
          workflow = await storage.createWorkflow({
            name: `Workflow - ${service.name}`,
            description: `Workflow pour le service ${service.name}`,
            serviceId: service.id,
          });
        }
        
        const existingSteps = await storage.getWorkflowSteps(workflow.id);
        if (existingSteps.length > 0) {
          results.push({ service: service.name, status: "already_configured", stepsCount: existingSteps.length });
          continue;
        }
        
        const defaultSteps = [
          { stepNumber: 1, title: "Réception du véhicule", description: "Accueil client et prise en charge du véhicule" },
          { stepNumber: 2, title: "Ordre de réparation", description: "État des lieux du véhicule avant intervention" },
          { stepNumber: 3, title: "Diagnostic", description: "Inspection technique et diagnostic" },
          { stepNumber: 4, title: "Préparation", description: "Préparation des pièces et outils" },
          { stepNumber: 5, title: "Intervention", description: "Réalisation des travaux" },
          { stepNumber: 6, title: "Contrôle qualité", description: "Vérification de la qualité" },
          { stepNumber: 7, title: "Nettoyage", description: "Nettoyage du véhicule" },
          { stepNumber: 8, title: "Restitution", description: "Remise du véhicule au client" },
        ];
        
        for (const step of defaultSteps) {
          await storage.createWorkflowStep({ workflowId: workflow.id, ...step });
        }
        
        results.push({ service: service.name, status: "initialized", stepsCount: defaultSteps.length });
      }
      
      res.json({ results });
    } catch (error: any) {
      console.error("Error initializing all default workflows:", error);
      res.status(400).json({ message: error.message || "Failed to initialize workflows" });
    }
  });

  // Audit Log routes
  app.get("/api/admin/audit-logs", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const filters: any = {};
      
      if (req.query.entityType) filters.entityType = req.query.entityType as string;
      if (req.query.entityId) filters.entityId = req.query.entityId as string;
      if (req.query.actorId) filters.actorId = req.query.actorId as string;
      if (req.query.action) filters.action = req.query.action as string;
      if (req.query.startDate) filters.startDate = new Date(req.query.startDate as string);
      if (req.query.endDate) filters.endDate = new Date(req.query.endDate as string);
      if (req.query.limit) filters.limit = parseInt(req.query.limit as string);
      if (req.query.offset) filters.offset = parseInt(req.query.offset as string);
      
      const result = await storage.getAuditLogs(filters);
      res.json(result);
    } catch (error: any) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });

  app.get("/api/admin/audit-logs/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const log = await storage.getAuditLog(req.params.id);
      if (!log) {
        return res.status(404).json({ message: "Audit log not found" });
      }
      res.json(log);
    } catch (error: any) {
      console.error("Error fetching audit log:", error);
      res.status(500).json({ message: "Failed to fetch audit log" });
    }
  });

  app.get("/api/admin/entity-history/:entityType/:entityId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const history = await storage.getEntityAuditHistory(req.params.entityType, req.params.entityId);
      res.json(history);
    } catch (error: any) {
      console.error("Error fetching entity history:", error);
      res.status(500).json({ message: "Failed to fetch entity history" });
    }
  });

  // Cache clearing route
  app.post("/api/admin/cache/clear", isAuthenticated, isAdmin, async (req, res) => {
    try {
      // Clear any server-side caches here
      // For now, we'll just return success
      // In the future, you could add Redis cache clearing, etc.
      
      res.json({ success: true, message: "Cache cleared successfully" });
    } catch (error: any) {
      console.error("Error clearing cache:", error);
      res.status(500).json({ message: error.message || "Failed to clear cache" });
    }
  });

  // Object Storage routes are registered via registerObjectStorageRoutes() above

  // Google Drive proxy route - serves files stored on Google Drive
  app.get("/gdrive/:fileId/:filename", isAuthenticated, async (req: any, res) => {
    try {
      const { downloadFromGoogleDrive } = await import("./googleDriveStorage");
      const { fileId } = req.params;
      const { data, mimeType } = await downloadFromGoogleDrive(fileId);
      
      res.set({
        "Content-Type": mimeType,
        "Content-Length": data.length,
        "Cache-Control": "private, max-age=86400",
      });
      res.send(data);
    } catch (error: any) {
      console.error("[GoogleDrive] Error serving file:", error.message);
      if (!res.headersSent) {
        res.status(404).json({ error: "File not found" });
      }
    }
  });

  app.get("/api/admin/gdrive/status", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { isGoogleDriveConfigured } = await import("./googleDriveStorage");
      const configured = isGoogleDriveConfigured();
      res.json({ configured, hasClientId: !!process.env.GOOGLE_CLIENT_ID, hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET, hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/gdrive/auth-url", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { getGoogleAuthUrl } = await import("./googleDriveStorage");
      const url = getGoogleAuthUrl();
      res.redirect(url);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/gdrive/callback", async (req: any, res) => {
    try {
      const { code } = req.query;
      if (!code) {
        return res.status(400).send("Code manquant");
      }
      const { exchangeCodeForTokens } = await import("./googleDriveStorage");
      const { refreshToken } = await exchangeCodeForTokens(code as string);
      
      res.send(`
        <!DOCTYPE html>
        <html><head><title>Google Drive - Connexion réussie</title>
        <style>body{font-family:sans-serif;max-width:600px;margin:40px auto;padding:20px;text-align:center;}
        .token{background:#f0f0f0;padding:15px;border-radius:8px;word-break:break-all;font-family:monospace;font-size:12px;margin:20px 0;}
        .success{color:#16a34a;font-size:24px;}</style></head>
        <body>
        <h1 class="success">Connexion Google Drive réussie !</h1>
        <p>Copiez le token ci-dessous et ajoutez-le comme secret <strong>GOOGLE_REFRESH_TOKEN</strong> dans Replit :</p>
        <div class="token" id="token">${refreshToken}</div>
        <button onclick="navigator.clipboard.writeText(document.getElementById('token').textContent).then(()=>alert('Copié !'))">Copier le token</button>
        <p style="margin-top:30px;color:#666;">Après avoir ajouté le secret, redémarrez l'application.</p>
        </body></html>
      `);
    } catch (error: any) {
      console.error("[GoogleDrive OAuth] Callback error:", error.message);
      res.status(500).send(`<h1>Erreur</h1><p>${error.message}</p><p><a href="javascript:history.back()">Retour</a></p>`);
    }
  });

  app.get("/api/admin/gdrive/test", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { isGoogleDriveConfigured, uploadToGoogleDrive } = await import("./googleDriveStorage");
      if (!isGoogleDriveConfigured()) {
        return res.status(400).json({ error: "Google Drive non configuré" });
      }
      const testBuffer = Buffer.from("Test upload AutoReport " + new Date().toISOString());
      const result = await uploadToGoogleDrive(testBuffer, "test_connexion.txt", "tests");
      const { deleteFromGoogleDrive, extractFileId } = await import("./googleDriveStorage");
      const fileId = extractFileId(result.filePath);
      if (fileId) await deleteFromGoogleDrive(fileId);
      res.json({ success: true, message: "Upload Google Drive fonctionne !" });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post("/api/upload", isAuthenticated, async (req: any, res) => {
    try {
      if (!req.files || !req.files.media) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      
      const file = req.files.media;
      const mimetype = file.mimetype || '';
      const reference = req.query.reference as string;
      const folder = (req.query.folder as string) || "uploads";
      
      // Validate file type
      if (!mimetype.startsWith('image/') && !mimetype.startsWith('video/') && !mimetype.startsWith('application/pdf')) {
        return res.status(400).json({ error: "Only images, videos and PDFs are allowed" });
      }
      
      let fileData: Buffer;
      if (file.tempFilePath) {
        const fsModule = await import('fs');
        fileData = fsModule.readFileSync(file.tempFilePath);
      } else if (file.data) {
        fileData = file.data;
      } else {
        return res.status(400).json({ error: "Cannot read file data" });
      }

      if (mimetype.startsWith('image/') && mimetype !== 'image/gif') {
        try {
          const { optimizeImageBuffer } = await import("./imageOptimizer");
          fileData = await optimizeImageBuffer(fileData, mimetype);
        } catch (optErr) {
          console.warn("[Upload] Image optimization skipped:", optErr);
        }
      }

      // Apply watermark if reference is provided and it's an image
      if (reference && mimetype.startsWith('image/')) {
        try {
          const { addWatermarkToImage } = await import("./imageWatermark");
          fileData = await addWatermarkToImage(fileData, reference, mimetype);
          console.log(`[Upload] Applied watermark for reference: ${reference}`);
        } catch (wmErr) {
          console.error("[Upload] Watermark failed:", wmErr);
        }
      }

      const objectPath = await uploadToStorage(fileData, file.name, folder);

      if (file.tempFilePath) {
        try { const fsModule = await import('fs'); fsModule.unlinkSync(file.tempFilePath); } catch (_) {}
      }
      
      res.json({ 
        success: true,
        message: "Upload OK",
        objectPath,
        filename: objectPath.split('/').pop() || file.name,
        originalName: file.name,
        size: file.size,
        mimetype: file.mimetype
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ 
        error: "Failed to upload file",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.post("/api/upload-base64", isAuthenticated, async (req: any, res) => {
    try {
      const { base64, mimeType, fileName } = req.body;
      if (!base64 || !mimeType) {
        return res.status(400).json({ error: "base64 and mimeType are required" });
      }

      if (!mimeType.startsWith("image/")) {
        return res.status(400).json({ error: "Only image files are allowed" });
      }

      let fileData = Buffer.from(base64, "base64");

      const maxSize = 15 * 1024 * 1024;
      if (fileData.length > maxSize) {
        return res.status(400).json({ error: "File too large (max 15MB)" });
      }
      const ext = mimeType.split("/")[1] || "jpg";
      const finalName = fileName || `simu-${Date.now()}.${ext}`;
      const folder = "simulator";

      if (mimeType.startsWith("image/") && mimeType !== "image/gif") {
        try {
          const { optimizeImageBuffer } = await import("./imageOptimizer");
          fileData = await optimizeImageBuffer(fileData, mimeType);
        } catch (_) {}
      }

      const objectPath = await uploadToStorage(fileData, finalName, folder);
      res.json({
        success: true,
        objectPath,
        filename: objectPath.split("/").pop() || finalName,
        originalName: finalName,
        size: fileData.length,
        mimetype: mimeType,
      });
    } catch (error) {
      console.error("Error uploading base64:", error);
      res.status(500).json({ error: "Failed to upload", details: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Serve uploaded files (static middleware added in index.ts)

  app.put("/api/quote-media", isAuthenticated, async (req, res) => {
    if (!req.body.mediaURL) {
      return res.status(400).json({ error: "mediaURL is required" });
    }

    const userId = (req as any).user.id;

    try {
      const objectStorageService = new ObjectStorageService();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        req.body.mediaURL,
        {
          owner: userId,
          visibility: "private",
        },
      );

      res.status(200).json({ objectPath });
    } catch (error) {
      console.error("Error setting media ACL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/invoice-media", isAuthenticated, async (req, res) => {
    if (!req.body.mediaURL) {
      return res.status(400).json({ error: "mediaURL is required" });
    }

    const userId = (req as any).user.id;

    try {
      const objectStorageService = new ObjectStorageService();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        req.body.mediaURL,
        {
          owner: userId,
          visibility: "private",
        },
      );

      res.status(200).json({ objectPath });
    } catch (error) {
      console.error("Error setting media ACL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  app.post("/api/voice-dictation/send-email", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { to, subject, body, documentType, documentNumber, documentId, clientName } = req.body;

      if (!to || !subject || !body) {
        return res.status(400).json({ message: "Destinataire, sujet et corps de l'email requis" });
      }

      const fs = await import('fs');
      const { generateQuotePDF, generateInvoicePDF } = await import("./emailService");
      const attachments: { filename: string; content: Buffer }[] = [];
      const attachmentNames: string[] = [];

      // Generate and attach PDF document
      if (documentId) {
        try {
          if (documentType === 'quote') {
            const quote = await storage.getQuote(documentId);
            if (quote) {
              const items = await storage.getQuoteItems(documentId);
              const settings = await storage.getApplicationSettings();
              const formatPrice = (val: any) => `${parseFloat(val || "0").toFixed(2)} €`;
              const vdQuoteTTC = parseFloat(quote.quoteAmount || "0");
              const vdQuoteTax = parseFloat(quote.taxAmount || "0");
              const vdQuoteHT = vdQuoteTax > 0 ? (vdQuoteTTC - vdQuoteTax) : (vdQuoteTTC / 1.2);
              const pdfBuffer = generateQuotePDF({
                quoteNumber: quote.reference || quote.id,
                quoteDate: quote.createdAt ? new Date(quote.createdAt).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR'),
                clientName: clientName || 'Client',
                status: quote.status,
                items: items.map(i => ({
                  description: i.description || '',
                  quantity: Number(i.quantity) || 1,
                  unitPrice: parseFloat(i.unitPriceExcludingTax || "0").toFixed(2),
                  total: parseFloat(i.totalExcludingTax || "0").toFixed(2),
                })),
                amount: formatPrice(quote.quoteAmount),
                totalHT: vdQuoteHT.toFixed(2),
                totalTTC: vdQuoteTTC.toFixed(2),
                companyName: settings?.companyName || 'AUTOREPORT',
              });
              const pdfFilename = `Devis-${quote.reference || quote.id}.pdf`;
              attachments.push({ filename: pdfFilename, content: pdfBuffer });
              attachmentNames.push(pdfFilename);
            }
          } else if (documentType === 'invoice') {
            const invoice = await storage.getInvoice(documentId);
            if (invoice) {
              const items = await storage.getInvoiceItems(documentId);
              const settings = await storage.getApplicationSettings();
              const formatPrice = (val: any) => `${parseFloat(val || "0").toFixed(2)} €`;
              const pdfBuffer = generateInvoicePDF({
                invoiceNumber: invoice.invoiceNumber || invoice.id,
                invoiceDate: invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR'),
                dueDate: invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('fr-FR') : '',
                clientName: clientName || 'Client',
                status: invoice.status,
                items: items.map(i => ({
                  description: i.description || '',
                  quantity: Number(i.quantity) || 1,
                  unitPrice: parseFloat(i.unitPriceExcludingTax || "0").toFixed(2),
                  total: parseFloat(i.totalExcludingTax || "0").toFixed(2),
                })),
                amount: formatPrice(invoice.amount),
                companyName: settings?.companyName || 'AUTOREPORT',
              });
              const pdfFilename = `Facture-${invoice.invoiceNumber || invoice.id}.pdf`;
              attachments.push({ filename: pdfFilename, content: pdfBuffer });
              attachmentNames.push(pdfFilename);
            }
          }
        } catch (err) {
          console.error("Error generating PDF:", err);
        }

        // Fetch media attachments (photos/videos) from quote or invoice
        try {
          let media: any[] = [];
          if (documentType === 'quote') {
            media = await storage.getQuoteMedia(documentId);
          } else if (documentType === 'invoice') {
            media = await storage.getInvoiceMedia(documentId);
          }

          for (const item of media) {
            try {
              let data: Buffer | null = null;
              if (item.filePath.startsWith("/gdrive/")) {
                try {
                  const { extractFileId, downloadFromGoogleDrive } = await import("./googleDriveStorage");
                  const fileId = extractFileId(item.filePath);
                  if (fileId) {
                    const result = await downloadFromGoogleDrive(fileId);
                    data = result.data;
                  }
                } catch (err) { console.warn(`[Email] Google Drive attachment not found: ${item.filePath}`); }
              } else if (item.filePath.startsWith("/objects/")) {
                try {
                  const { ObjectStorageService } = await import("./replit_integrations/object_storage");
                  const objStore = new ObjectStorageService();
                  data = await objStore.downloadFileBuffer(item.filePath);
                } catch (err) { console.warn(`[Email] Object Storage attachment not found: ${item.filePath}`); }
              } else if (item.filePath.startsWith("https://")) {
                try {
                  const resp = await fetch(item.filePath);
                  if (resp.ok) data = Buffer.from(await resp.arrayBuffer());
                } catch (err) { console.warn(`[Email] Remote attachment fetch failed: ${item.filePath}`); }
              } else {
                const localPath = item.filePath.startsWith('/') ? `.${item.filePath}` : item.filePath;
                if (fs.existsSync(localPath)) {
                  data = fs.readFileSync(localPath);
                } else {
                  try {
                    const result = await objectStorageService.getObject(item.filePath);
                    data = result.data;
                  } catch (storageErr) {
                    console.warn(`[Email] Attachment not found in storage: ${item.filePath}`);
                  }
                }
              }
              if (data) {
                const ext = item.fileType === 'image' ? 'jpg' : 'mp4';
                const filename = item.fileName || `${item.fileType}-${item.id.slice(0, 4)}.${ext}`;
                attachments.push({ filename, content: data });
                attachmentNames.push(filename);
              }
            } catch (err) {
              console.error("Error fetching attachment:", err);
            }
          }
        } catch (err) {
          console.error("Error fetching document media:", err);
        }
      }

      // Generate HTML email with professional template
      const htmlEmail = generateVoiceDictationEmailHtml({
        clientName: clientName || 'Client',
        documentNumber: documentNumber || '',
        documentType: documentType === 'quote' ? 'quote' : 'invoice',
        emailBody: body,
        companyName: 'AUTOREPORT',
        attachmentNames: attachmentNames.length > 0 ? attachmentNames : undefined,
      });

      const result = await sendEmail({
        to,
        subject,
        html: htmlEmail,
        text: body,
        attachments: attachments.length > 0 ? attachments : undefined,
      });

      if (result.success) {
        // Log audit event
        await logAuditEvent({
          req,
          entityType: documentType === 'quote' ? 'quote' : 'invoice',
          entityId: documentId || documentNumber,
          action: 'updated',
          summary: `Email envoyé via dictée vocale à ${to}`,
          metadata: { emailTo: to, emailSubject: subject, attachmentCount: attachments.length },
        });

        res.json({ success: true, message: "Email envoyé avec succès" });
      } else {
        res.status(500).json({ message: result.error || "Erreur lors de l'envoi de l'email" });
      }
    } catch (error: any) {
      console.error("Error sending voice dictation email:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'envoi de l'email" });
    }
  });

  // ==================== CHAT API ROUTES ====================
  
  const isStaffUser = (user: any): boolean => {
    return user.role === 'employe' || user.role === 'admin' || user.role === 'superadmin';
  };
  
  // Helper: Check if user is a participant in a conversation
  const isConversationParticipant = async (conversationId: string, userId: string): Promise<boolean> => {
    const participants = await storage.getChatParticipants(conversationId);
    return participants.some(p => p.userId === userId);
  };

  // Get all conversations for the current user
  app.get("/api/chat/conversations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const conversations = await storage.getChatConversations(userId);
      res.json(conversations);
    } catch (error: any) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Create a new conversation
  app.post("/api/chat/conversations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { title, participantIds, type } = req.body;
      
      if (!title) {
        return res.status(400).json({ message: "Le titre est requis" });
      }
      
      if (!participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
        return res.status(400).json({ message: "Au moins un participant est requis" });
      }
      
      const allUsers = await storage.getAllUsers();
      const validParticipantIds: string[] = [];
      const isClientAdminChat = type === "client_admin";
      
      if (isClientAdminChat) {
        // Allow both staff and clients to initiate client_admin conversations
      } else {
        if (!isStaffUser(req.user)) {
          return res.status(403).json({ message: "Accès réservé aux employés et administrateurs" });
        }
      }
      
      for (const participantId of participantIds) {
        const participant = allUsers.find(u => u.id === participantId);
        if (!participant) {
          return res.status(400).json({ message: `Participant ${participantId} introuvable` });
        }
        if (!isClientAdminChat && participant.role === 'client') {
          return res.status(400).json({ message: "Utilisez le type 'client_admin' pour les discussions avec des clients" });
        }
        if (participantId !== userId) {
          validParticipantIds.push(participantId);
        }
      }
      
      const conversation = await storage.createChatConversation({
        title,
        createdById: userId,
        type: isClientAdminChat ? "client_admin" : "internal",
      });
      
      await storage.addChatParticipant({ conversationId: conversation.id, userId });
      
      for (const participantId of validParticipantIds) {
        await storage.addChatParticipant({ conversationId: conversation.id, userId: participantId });
      }
      
      const fullConversation = await storage.getChatConversations(userId);
      const created = fullConversation.find(c => c.id === conversation.id);
      
      res.json(created || conversation);
    } catch (error: any) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Get messages for a conversation
  app.get("/api/chat/conversations/:conversationId/messages", isAuthenticated, async (req: any, res) => {
    try {
      const { conversationId } = req.params;
      const userId = req.user.id;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      
      if (!await isConversationParticipant(conversationId, userId)) {
        return res.status(403).json({ message: "Vous n'êtes pas membre de cette conversation" });
      }
      
      const messages = await storage.getChatMessages(conversationId, limit, offset);
      await storage.updateLastRead(conversationId, userId);
      
      res.json(messages);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Send a message
  app.post("/api/chat/conversations/:conversationId/messages", isAuthenticated, async (req: any, res) => {
    try {
      const { conversationId } = req.params;
      const { content } = req.body;
      const userId = req.user.id;
      
      if (!await isConversationParticipant(conversationId, userId)) {
        return res.status(403).json({ message: "Vous n'êtes pas membre de cette conversation" });
      }
      
      if (!content || content.trim().length === 0) {
        return res.status(400).json({ message: "Le message ne peut pas être vide" });
      }
      
      const message = await storage.createChatMessage({
        conversationId,
        senderId: userId,
        content: content.trim(),
      });
      
      const participants = await storage.getChatParticipants(conversationId);
      const senderName = `${req.user.firstName || ''} ${req.user.lastName || ''}`.trim() || req.user.email;
      
      for (const participant of participants) {
        if (participant.userId !== userId) {
          await storage.createNotification({
            userId: participant.userId,
            type: "chat",
            title: `Nouveau message de ${senderName}`,
            message: content.length > 50 ? content.substring(0, 50) + "..." : content,
            relatedId: conversationId,
          });
          
          const wsClient = wsClients.get(participant.userId);
          if (wsClient && wsClient.readyState === WebSocket.OPEN) {
            wsClient.send(JSON.stringify({
              type: 'chat_message',
              conversationId,
              message: {
                ...message,
                sender: {
                  id: req.user.id,
                  firstName: req.user.firstName,
                  lastName: req.user.lastName,
                  email: req.user.email,
                  profileImageUrl: req.user.profileImageUrl,
                },
                attachments: [],
              },
            }));
          }
        }
      }
      
      const sender = await storage.getUser(userId);
      res.json({ ...message, sender, attachments: [] });
    } catch (error: any) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Upload attachment for a message (removed - handled differently)

  // Get participants of a conversation
  app.get("/api/chat/conversations/:conversationId/participants", isAuthenticated, async (req: any, res) => {
    try {
      const { conversationId } = req.params;
      const userId = req.user.id;
      
      if (!await isConversationParticipant(conversationId, userId)) {
        return res.status(403).json({ message: "Vous n'êtes pas membre de cette conversation" });
      }
      
      const participants = await storage.getChatParticipants(conversationId);
      res.json(participants);
    } catch (error: any) {
      console.error("Error fetching participants:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Add participant to a conversation (admin only)
  app.post("/api/chat/conversations/:conversationId/participants", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { conversationId } = req.params;
      const { userId } = req.body;
      
      const userToAdd = await storage.getUser(userId);
      if (!userToAdd) {
        return res.status(400).json({ message: "Utilisateur introuvable" });
      }
      
      const participant = await storage.addChatParticipant({ conversationId, userId });
      res.json(participant);
    } catch (error: any) {
      console.error("Error adding participant:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Get eligible users for chat (employees and admins only)
  app.get("/api/chat/users", isAuthenticated, async (req: any, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      if (isStaffUser(req.user)) {
        res.json(sanitizeUsers(allUsers));
      } else {
        const staffUsers = allUsers.filter(u => u.role === 'employe' || u.role === 'admin' || u.role === 'superadmin');
        res.json(sanitizeUsers(staffUsers));
      }
    } catch (error: any) {
      console.error("Error fetching chat users:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Mark conversation as read
  app.post("/api/chat/conversations/:conversationId/read", isAuthenticated, async (req: any, res) => {
    try {
      const { conversationId } = req.params;
      const userId = req.user.id;
      
      if (!await isConversationParticipant(conversationId, userId)) {
        return res.status(403).json({ message: "Vous n'êtes pas membre de cette conversation" });
      }
      
      await storage.updateLastRead(conversationId, userId);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error marking conversation as read:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // ==================== EXPORT API ====================
  app.get("/api/admin/export/quotes", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { startDate, endDate, clientId, status } = req.query;
      const garageScope = getGarageScope(req.user);
      let allQuotes = await storage.getQuotes();
      
      if (garageScope) allQuotes = allQuotes.filter(q => q.garageId === garageScope);
      if (startDate) allQuotes = allQuotes.filter(q => q.createdAt && new Date(q.createdAt) >= new Date(startDate as string));
      if (endDate) allQuotes = allQuotes.filter(q => q.createdAt && new Date(q.createdAt) <= new Date(endDate as string));
      if (clientId) allQuotes = allQuotes.filter(q => q.clientId === clientId);
      if (status) allQuotes = allQuotes.filter(q => q.status === status);

      const allUsers = await storage.getAllUsers();
      const allServices = await storage.getServices();
      
      const csvRows = [
        ["Référence", "Client", "Email", "Service", "Montant TTC", "Montant HT", "TVA %", "Statut", "Date création", "Détails"].join(";")
      ];
      
      for (const q of allQuotes) {
        const client = allUsers.find(u => u.id === q.clientId);
        const service = allServices.find(s => s.id === q.serviceId);
        const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email : "";
        const clientEmail = client?.email || "";
        
        csvRows.push([
          q.reference || q.id.slice(0, 8),
          `"${clientName}"`,
          clientEmail,
          service ? `"${service.name}"` : "",
          q.quoteAmount || "0",
          q.priceExcludingTax || "",
          q.taxRate || "20",
          q.status,
          q.createdAt ? new Date(q.createdAt).toLocaleDateString("fr-FR") : "",
          `"${(q.productDetails || "").replace(/"/g, '""')}"`,
        ].join(";"));
      }
      
      const csv = "\uFEFF" + csvRows.join("\n");
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename=export_devis_${new Date().toISOString().slice(0, 10)}.csv`);
      res.send(csv);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/export/invoices", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { startDate, endDate, clientId, status } = req.query;
      const garageScope = getGarageScope(req.user);
      let allInvoices = await storage.getInvoices();
      
      if (garageScope) allInvoices = allInvoices.filter(i => i.garageId === garageScope);
      if (startDate) allInvoices = allInvoices.filter(i => i.createdAt && new Date(i.createdAt) >= new Date(startDate as string));
      if (endDate) allInvoices = allInvoices.filter(i => i.createdAt && new Date(i.createdAt) <= new Date(endDate as string));
      if (clientId) allInvoices = allInvoices.filter(i => i.clientId === clientId);
      if (status) allInvoices = allInvoices.filter(i => i.status === status);

      const allUsers = await storage.getAllUsers();
      
      const csvRows = [
        ["N° Facture", "Client", "Email", "Montant TTC", "Montant HT", "TVA %", "Statut", "Date création", "Date échéance", "Méthode paiement", "Notes"].join(";")
      ];
      
      for (const inv of allInvoices) {
        const client = allUsers.find(u => u.id === inv.clientId);
        const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email : "";
        const clientEmail = client?.email || "";
        
        csvRows.push([
          inv.invoiceNumber || inv.id.slice(0, 8),
          `"${clientName}"`,
          clientEmail,
          inv.amount || "0",
          inv.amountExcludingTax || "",
          inv.taxRate || "20",
          inv.status,
          inv.createdAt ? new Date(inv.createdAt).toLocaleDateString("fr-FR") : "",
          inv.dueDate ? new Date(inv.dueDate).toLocaleDateString("fr-FR") : "",
          inv.paymentMethod || "",
          `"${(inv.notes || "").replace(/"/g, '""')}"`,
        ].join(";"));
      }
      
      const csv = "\uFEFF" + csvRows.join("\n");
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename=export_factures_${new Date().toISOString().slice(0, 10)}.csv`);
      res.send(csv);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ==================== WHEEL CONFIGURATOR ====================
  const CONFIGURATOR_PRICES = {
    serviceBase: { renovation: 99, personnalisation: 160, "diamond-cut": 140, reparation: 120 } as Record<string, number>,
    colors: { "noir-mat": 0, "noir-brillant": 20, "gris-anthracite": 0, "gris-argent": 10, "blanc-nacre": 30, "blanc-brillant": 20, bronze: 30, "or-champagne": 40, "rouge-candy": 50, "bleu-nuit": 30, gunmetal: 15, cuivre: 35 } as Record<string, number>,
    finishes: { mat: 0, brillant: 20, satin: 10, metallique: 30, "diamond-cut": 60, hydrographie: 80 } as Record<string, number>,
    sizes: { "16": 0, "17": 0, "18": 10, "19": 20, "20": 35, "21": 50, "22": 70 } as Record<string, number>,
    accessories: { lisere: 15, "centre-logo": 25, "valve-alu": 8, "sticker-perso": 20 } as Record<string, number>,
  };

  function computeConfiguratorPrice(serviceType: string, color: string, finish: string, size: string, wheelCount: number, accessories: string[]) {
    const count = wheelCount || 4;
    const base = CONFIGURATOR_PRICES.serviceBase[serviceType] || 99;
    const perWheel = base + (CONFIGURATOR_PRICES.colors[color] || 0) + (CONFIGURATOR_PRICES.finishes[finish] || 0) + (CONFIGURATOR_PRICES.sizes[size] || 0);
    const accessoriesTotal = (accessories || []).reduce((s: number, a: string) => s + ((CONFIGURATOR_PRICES.accessories[a] || 0) * count), 0);
    const totalHT = (perWheel * count) + accessoriesTotal;
    const tva = Math.round(totalHT * 0.20 * 100) / 100;
    return { totalHT, tva, totalTTC: totalHT + tva, perWheel, count };
  }

  app.post("/api/configurator/quote-request", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { configuration } = req.body;
      if (!configuration) {
        return res.status(400).json({ message: "Configuration requise" });
      }

      const serverPrice = computeConfiguratorPrice(
        configuration.serviceType, configuration.color || "", configuration.finish || "",
        configuration.size || "18", configuration.wheelCount || 4, configuration.accessories || []
      );

      const services = await storage.getServices();
      let matchedService = services.find(s => 
        s.name.toLowerCase().includes("personnalisation") && s.isActive
      );
      if (!matchedService) {
        matchedService = services.find(s => s.isActive);
      }
      if (!matchedService) {
        return res.status(400).json({ message: "Aucun service disponible" });
      }

      const requestDetails = {
        source: "configurateur",
        serviceType: configuration.serviceType,
        color: configuration.colorName,
        finish: configuration.finishName,
        size: configuration.size,
        wheelCount: configuration.wheelCount,
        accessories: configuration.accessories,
        estimatedPriceHT: serverPrice.totalHT,
        estimatedTVA: serverPrice.tva,
        estimatedTotalTTC: serverPrice.totalTTC,
        configSummary: configuration.summary,
      };

      const quote = await storage.createQuote({
        clientId: userId,
        serviceId: matchedService.id,
        status: "pending",
        requestDetails,
        wheelCount: configuration.wheelCount || 4,
        priceExcludingTax: String(serverPrice.totalHT),
        taxRate: "20.00",
        taxAmount: String(serverPrice.tva),
        quoteAmount: String(serverPrice.totalTTC),
        notes: `[Configurateur] ${configuration.summary}`,
      });

      if (configuration.wheelImageUrl) {
        try {
          await storage.createQuoteMedia({
            quoteId: quote.id,
            filePath: configuration.wheelImageUrl,
            fileType: "image",
            fileName: "rendu-3d-configurateur.png",
          });
        } catch (mediaErr) {
          console.error("Error attaching 3D render to quote:", mediaErr);
        }
      }

      if (configuration.bgPhotoUrl) {
        try {
          await storage.createQuoteMedia({
            quoteId: quote.id,
            filePath: configuration.bgPhotoUrl,
            fileType: "image",
            fileName: "photo-client.jpg",
          });
        } catch (mediaErr) {
          console.error("Error attaching client photo to quote:", mediaErr);
        }
      }

      res.json({ success: true, quoteId: quote.id, message: "Demande de devis créée" });
    } catch (error: any) {
      console.error("Configurator quote error:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la création du devis" });
    }
  });

  app.post("/api/configurator/estimate", async (req: any, res) => {
    try {
      const { serviceType, color, finish, size, wheelCount, accessories } = req.body;
      const result = computeConfiguratorPrice(serviceType, color, finish, size, wheelCount, accessories);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ==================== AI ASSISTANT ====================
  app.post("/api/ai/assistant", isAuthenticated, async (req: any, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ message: "Messages requis" });
      }
      const { generateAssistantResponse } = await import("./aiAssistant");
      const response = await generateAssistantResponse(messages, req.user.role);
      res.json({ response });
    } catch (error: any) {
      console.error("AI Assistant error:", error.message, error.stack?.substring(0, 300));
      res.status(500).json({ message: "L'assistant est temporairement indisponible. Veuillez réessayer." });
    }
  });

  app.post("/api/ai/analyze-wheel", isAuthenticated, async (req: any, res) => {
    try {
      const { imageBase64, imageMimeType, prompt, conversationHistory } = req.body;
      if (!imageBase64 || !imageMimeType) {
        return res.status(400).json({ message: "Image requise" });
      }
      const maxSize = 10 * 1024 * 1024;
      const imageSize = Buffer.from(imageBase64, 'base64').length;
      if (imageSize > maxSize) {
        return res.status(400).json({ message: "Image trop volumineuse (max 10 MB)" });
      }
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(imageMimeType)) {
        return res.status(400).json({ message: "Format non supporté. Utilisez JPG, PNG ou WEBP." });
      }
      const { analyzeWheelImage } = await import("./aiAssistant");
      const response = await analyzeWheelImage(
        imageBase64,
        imageMimeType,
        prompt || "Analyse cette jante et propose des options de personnalisation.",
        conversationHistory || []
      );
      res.json({ response });
    } catch (error: any) {
      console.error("AI Wheel Analysis error:", error.message);
      res.status(500).json({ message: "L'analyse est temporairement indisponible. Veuillez réessayer." });
    }
  });

  app.post("/api/ai/analyze-wheel-params", isAuthenticated, async (req: any, res) => {
    try {
      const { imageBase64, imageMimeType } = req.body;
      if (!imageBase64 || !imageMimeType) {
        return res.status(400).json({ message: "Image requise" });
      }
      const { analyzeWheelImage } = await import("./aiAssistant");
      const structuredPrompt = `Analyse cette photo de jante automobile avec une grande précision pour permettre une reconstruction 3D fidèle. Examine attentivement la forme des branches, leur courbure, leur épaisseur, la profondeur du plat (dish/concavité), et le style global.

Réponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de texte autour, pas de \`\`\`json), avec exactement ces champs :
{
  "spokeCount": <nombre EXACT de branches principales visibles, entre 3 et 20>,
  "spokeWidth": <largeur relative des branches entre 0.03 et 0.20 (0.03=très fines, 0.15=larges)>,
  "spokePattern": <style géométrique parmi: "straight" (droites simples), "double" (paires parallèles), "ysplit" (branches en Y qui se divisent), "curved" (courbées dans un sens), "turbine" (fortement courbées type turbine), "mesh" (grillage/treillis avec nombreuses fines branches), "split5" (branches larges avec fente centrale), "fan" (éventail s'élargissant vers l'extérieur), "multipiece" (jante multi-pièces avec boulons visibles sur le bord), "classic" (branches organiques/étoile classique)>,
  "dishDepth": <profondeur du plat/concavité entre 0.0 (plat) et 0.35 (très concave). Regarde si les branches sont en retrait par rapport à la lèvre>,
  "spokeCurvature": <courbure des branches entre 0.0 (droites) et 0.8 (très courbées). Important pour "curved" et "turbine">,
  "spokeSplitRatio": <pour "ysplit" uniquement, point de division entre 0.3 et 0.7 (0.5=milieu)>,
  "lipStepCount": <nombre de niveaux sur la lèvre: 1 (simple) ou 2 (lèvre à marche)>,
  "color": <couleur hexadécimale principale ex "#c0c0c0">,
  "colorName": <nom de la couleur en français>,
  "finish": <type de finition parmi: "mat", "brillant", "chrome", "carbone", "forge", "satine">,
  "rimDepth": <profondeur du rebord/lèvre entre 0.15 et 0.40>,
  "hubRadius": <rayon du moyeu central entre 0.12 et 0.30>,
  "lipWidth": <largeur de la lèvre entre 0.03 et 0.10>,
  "description": <description courte de la jante en français, max 80 caractères, incluant le style identifié>
}
Sois TRÈS précis sur le spokePattern : c'est le paramètre le plus important pour la reconstruction. Analyse la forme exacte des branches.`;

      const response = await analyzeWheelImage(imageBase64, imageMimeType, structuredPrompt, []);

      let parsed: any = null;
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        }
      } catch (parseErr) {
        console.error("Failed to parse wheel params JSON:", parseErr);
      }

      if (!parsed) {
        return res.json({
          params: null,
          rawResponse: response,
          message: "Impossible d'extraire les paramètres automatiquement"
        });
      }

      const validPatterns = ["straight", "double", "ysplit", "curved", "turbine", "mesh", "split5", "fan", "multipiece", "classic"];
      const safeParams = {
        spokeCount: Math.min(20, Math.max(3, parseInt(parsed.spokeCount) || 5)),
        spokeWidth: Math.min(0.20, Math.max(0.03, parseFloat(parsed.spokeWidth) || 0.12)),
        spokePattern: validPatterns.includes(parsed.spokePattern) ? parsed.spokePattern : "straight",
        dishDepth: Math.min(0.35, Math.max(0.0, parseFloat(parsed.dishDepth) || 0.15)),
        spokeCurvature: Math.min(0.8, Math.max(0.0, parseFloat(parsed.spokeCurvature) || 0.0)),
        spokeSplitRatio: Math.min(0.7, Math.max(0.3, parseFloat(parsed.spokeSplitRatio) || 0.5)),
        lipStepCount: [1, 2].includes(parseInt(parsed.lipStepCount)) ? parseInt(parsed.lipStepCount) : 1,
        color: typeof parsed.color === "string" && /^#[0-9a-fA-F]{6}$/.test(parsed.color) ? parsed.color : "#c0c0c0",
        colorName: parsed.colorName || "Argent",
        finish: ["mat", "brillant", "chrome", "carbone", "forge", "satine"].includes(parsed.finish) ? parsed.finish : "brillant",
        rimDepth: Math.min(0.40, Math.max(0.15, parseFloat(parsed.rimDepth) || 0.25)),
        hubRadius: Math.min(0.30, Math.max(0.12, parseFloat(parsed.hubRadius) || 0.18)),
        lipWidth: Math.min(0.10, Math.max(0.03, parseFloat(parsed.lipWidth) || 0.06)),
        description: parsed.description || "Jante analysée",
      };

      res.json({ params: safeParams });
    } catch (error: any) {
      console.error("Wheel params analysis error:", error.message);
      res.status(500).json({ message: "L'analyse est temporairement indisponible." });
    }
  });

  const hdRenderLimits = new Map<string, { count: number; resetAt: number }>();
  app.post("/api/ai/render-hd", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const now = Date.now();
      const limit = hdRenderLimits.get(userId);
      if (limit && limit.resetAt > now && limit.count >= 5) {
        return res.status(429).json({ message: "Limite de rendus HD atteinte (5/heure). Réessayez plus tard." });
      }
      if (!limit || limit.resetAt <= now) {
        hdRenderLimits.set(userId, { count: 1, resetAt: now + 3600000 });
      } else {
        limit.count++;
      }

      const { imageBase64, params } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ message: "Image requise" });
      }

      const { analyzeWheelImage } = await import("./aiAssistant");
      const prompt = `Tu es un assistant de rendu 3D professionnel. Voici une capture d'un modèle 3D de jante avec ces paramètres : couleur ${params?.color || 'argent'}, finition ${params?.finish || 'standard'}, metalness ${params?.metalness || 0.8}, roughness ${params?.roughness || 0.2}${params?.lisereEnabled ? ', liseré ' + params.lisereColor : ''}${params?.gravureText ? ', gravure "' + params.gravureText + '"' : ''}. Décris cette jante en détail et suggère comment améliorer le rendu pour un résultat photoréaliste. Propose des améliorations de matériaux et d'éclairage.`;

      const callWithTimeout = (retryAttempt = 0): Promise<string> => {
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            if (retryAttempt === 0) {
              callWithTimeout(1).then(resolve).catch(reject);
            } else {
              reject(new Error("Timeout après 30 secondes"));
            }
          }, 30000);

          analyzeWheelImage(imageBase64, "image/png", prompt, [])
            .then((result: string) => {
              clearTimeout(timer);
              resolve(result);
            })
            .catch((err: any) => {
              clearTimeout(timer);
              if (retryAttempt === 0) {
                callWithTimeout(1).then(resolve).catch(reject);
              } else {
                reject(err);
              }
            });
        });
      };

      const response = await callWithTimeout();
      res.json({ message: response, imageBase64: null });
    } catch (error: any) {
      console.error("HD Render error:", error.message);
      res.status(500).json({ message: "Le rendu HD est temporairement indisponible. Réessayez." });
    }
  });

  app.post("/api/admin/migrate-media-to-cloud", isAuthenticated, isAdmin, async (req: any, res) => {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: "Superadmin uniquement" });
    }
    try {
      const { isGoogleDriveConfigured, uploadToGoogleDrive } = await import("./googleDriveStorage");
      const fsLocal = await import("fs");
      const pathLocal = await import("path");
      
      const useGDrive = isGoogleDriveConfigured();
      let objStore: any = null;
      if (!useGDrive) {
        const { ObjectStorageService } = await import("./replit_integrations/object_storage");
        objStore = new ObjectStorageService();
      }
      
      let migratedQuotes = 0, migratedInvoices = 0, skippedQuotes = 0, skippedInvoices = 0, errors = 0;
      const errorDetails: string[] = [];
      
      const allQuoteMedia = await db.select().from(quoteMedia);
      for (const item of allQuoteMedia) {
        if (item.filePath && !item.filePath.startsWith("/objects/") && !item.filePath.startsWith("https://") && !item.filePath.startsWith("/gdrive/")) {
          try {
            const localPath = item.filePath.startsWith('/') ? `.${item.filePath}` : item.filePath;
            if (fsLocal.existsSync(localPath)) {
              const fileData = fsLocal.readFileSync(localPath);
              const fileName = pathLocal.basename(localPath);
              let newPath: string;
              if (useGDrive) {
                const result = await uploadToGoogleDrive(fileData, fileName, "quotes");
                newPath = result.filePath;
              } else {
                newPath = await objStore.uploadFileBuffer(fileData, fileName, "quotes");
              }
              await db.update(quoteMedia).set({ filePath: newPath }).where(eq(quoteMedia.id, item.id));
              migratedQuotes++;
              console.log(`[Migration] Quote media ${item.id}: ${item.filePath} -> ${newPath}`);
            } else {
              skippedQuotes++;
            }
          } catch (err: any) { 
            errors++; 
            errorDetails.push(`Quote ${item.id}: ${err.message}`);
            console.error(`[Migration] Quote media error ${item.id}:`, err.message); 
          }
        }
      }
      
      const allInvoiceMedia = await db.select().from(invoiceMedia);
      for (const item of allInvoiceMedia) {
        if (item.filePath && !item.filePath.startsWith("/objects/") && !item.filePath.startsWith("https://") && !item.filePath.startsWith("/gdrive/")) {
          try {
            const localPath = item.filePath.startsWith('/') ? `.${item.filePath}` : item.filePath;
            if (fsLocal.existsSync(localPath)) {
              const fileData = fsLocal.readFileSync(localPath);
              const fileName = pathLocal.basename(localPath);
              let newPath: string;
              if (useGDrive) {
                const result = await uploadToGoogleDrive(fileData, fileName, "invoices");
                newPath = result.filePath;
              } else {
                newPath = await objStore.uploadFileBuffer(fileData, fileName, "invoices");
              }
              await db.update(invoiceMedia).set({ filePath: newPath }).where(eq(invoiceMedia.id, item.id));
              migratedInvoices++;
              console.log(`[Migration] Invoice media ${item.id}: ${item.filePath} -> ${newPath}`);
            } else {
              skippedInvoices++;
            }
          } catch (err: any) { 
            errors++; 
            errorDetails.push(`Invoice ${item.id}: ${err.message}`);
            console.error(`[Migration] Invoice media error ${item.id}:`, err.message); 
          }
        }
      }
      
      res.json({
        message: `Migration terminée`,
        destination: useGDrive ? "Google Drive" : "Object Storage",
        migratedQuotes,
        migratedInvoices,
        skippedQuotes,
        skippedInvoices,
        errors,
        errorDetails: errorDetails.slice(0, 10),
        total: migratedQuotes + migratedInvoices,
      });
    } catch (error: any) {
      console.error("Error migrating media:", error);
      res.status(500).json({ message: error.message || "Erreur de migration" });
    }
  });

  // JSON Backup endpoint (admin only) - exports all data in JSON format
  app.get("/api/admin/backup", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const backupData = {
        version: "1.1",
        exportedAt: new Date().toISOString(),
        data: {
          users: await storage.getAllUsers(),
          services: await storage.getServices(),
          quotes: await storage.getQuotes(),
          quoteItems: await db.select().from(quoteItems),
          quoteMedia: await db.select().from(quoteMedia),
          invoices: await storage.getInvoices(),
          invoiceItems: await db.select().from(invoiceItems),
          invoiceMedia: await db.select().from(invoiceMedia),
          reservations: await storage.getReservations(),
          reservationServices: await db.select().from(reservationServices),
          notifications: await db.select().from(notifications),
          engagements: await storage.getEngagements(),
          workflows: await storage.getWorkflows(),
          workflowSteps: await db.select().from(workflowSteps),
          serviceWorkflows: await db.select().from(serviceWorkflows),
          workshopTasks: await db.select().from(workshopTasks),
          applicationSettings: await db.select().from(applicationSettings),
          invoiceCounters: await db.select().from(invoiceCounters),
          auditLogs: await db.select().from(auditLogs),
          auditLogChanges: await db.select().from(auditLogChanges),
          chatConversations: await db.select().from(chatConversations),
          chatParticipants: await db.select().from(chatParticipants),
          chatMessages: await db.select().from(chatMessages),
          chatAttachments: await db.select().from(chatAttachments),
        }
      };
      
      const filename = `autoreport-backup-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.json`;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.json(backupData);
      
    } catch (error: any) {
      console.error("Backup error:", error);
      res.status(500).json({ message: "Erreur lors de la sauvegarde", error: error.message });
    }
  });

  // Restore endpoint (admin only) - imports data from JSON backup
  app.post("/api/admin/restore", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { data, options = {} } = req.body;
      
      if (!data || !data.version) {
        return res.status(400).json({ message: "Format de backup invalide" });
      }
      
      const { clearExisting = false } = options;
      const results: Record<string, { imported: number; errors: number; skipped?: number }> = {};
      
      // Table mapping for dynamic import
      const tableMap: Record<string, any> = {
        users, services, quotes, quoteItems, quoteMedia,
        invoices, invoiceItems, invoiceMedia, reservations,
        reservationServices, notifications, engagements,
        workflows, workflowSteps, serviceWorkflows, workshopTasks,
        applicationSettings, invoiceCounters, auditLogs, auditLogChanges,
        chatConversations, chatParticipants, chatMessages, chatAttachments
      };
      
      // Import order matters due to foreign keys
      const importOrder = [
        'users', 'services', 'quotes', 'quoteItems', 'quoteMedia',
        'invoices', 'invoiceItems', 'invoiceMedia', 'reservations',
        'reservationServices', 'notifications', 'engagements',
        'workflows', 'workflowSteps', 'serviceWorkflows', 'workshopTasks',
        'applicationSettings', 'invoiceCounters', 'auditLogs', 'auditLogChanges',
        'chatConversations', 'chatParticipants', 'chatMessages', 'chatAttachments'
      ];
      
      for (const tableName of importOrder) {
        const tableData = data.data?.[tableName];
        if (!tableData || !Array.isArray(tableData)) continue;
        
        results[tableName] = { imported: 0, errors: 0, skipped: 0 };
        const table = tableMap[tableName];
        if (!table) continue;
        
        for (const row of tableData) {
          try {
            // For users, check if exists first
            if (tableName === 'users') {
              const existingUser = await storage.getUser(row.id);
              if (existingUser) {
                results[tableName].skipped = (results[tableName].skipped || 0) + 1;
                continue;
              }
            }
            
            await db.insert(table).values(row).onConflictDoNothing();
            results[tableName].imported++;
          } catch (err: any) {
            console.error(`Error importing ${tableName}:`, err.message);
            results[tableName].errors++;
          }
        }
      }
      
      res.json({ 
        success: true, 
        message: "Restauration terminée",
        results 
      });
      
    } catch (error: any) {
      console.error("Restore error:", error);
      res.status(500).json({ message: "Erreur lors de la restauration", error: error.message });
    }
  });

  // Get backup info/stats (admin only)
  app.get("/api/admin/backup-stats", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const stats = {
        users: (await storage.getAllUsers()).length,
        services: (await storage.getServices()).length,
        quotes: (await storage.getQuotes()).length,
        invoices: (await storage.getInvoices()).length,
        reservations: (await storage.getReservations()).length,
        engagements: (await storage.getEngagements()).length,
        workflows: (await storage.getWorkflows()).length,
      };
      
      res.json(stats);
    } catch (error: any) {
      console.error("Backup stats error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Backup scheduler routes
  app.get("/api/admin/backup-scheduler", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { getBackupSettings, listBackups } = await import("./backupScheduler");
      const settings = getBackupSettings();
      const backups = await listBackups();
      res.json({ settings, backups });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/backup-scheduler", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { updateBackupSchedule, getBackupSettings } = await import("./backupScheduler");
      const { enabled, time, emailEnabled, emailRecipient } = req.body;
      updateBackupSchedule({ enabled, time, emailEnabled, emailRecipient });
      res.json({ success: true, settings: getBackupSettings() });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/backup-now", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { triggerManualBackup } = await import("./backupScheduler");
      const result = await triggerManualBackup();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Database export endpoint (admin only)
  app.get("/api/admin/export-database", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { pool } = await import("./db");
      
      const getTableNames = async (): Promise<string[]> => {
        const result = await pool.query(`
          SELECT tablename FROM pg_tables 
          WHERE schemaname = 'public'
          ORDER BY tablename
        `);
        return result.rows.map((row: any) => row.tablename);
      };

      const getTableSchema = async (tableName: string): Promise<string> => {
        const result = await pool.query(`
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = $1
          ORDER BY ordinal_position
        `, [tableName]);
        
        const columns = result.rows.map((col: any) => {
          let def = `  "${col.column_name}" ${col.data_type.toUpperCase()}`;
          if (col.column_default) def += ` DEFAULT ${col.column_default}`;
          if (col.is_nullable === 'NO') def += ' NOT NULL';
          return def;
        });
        
        return `CREATE TABLE IF NOT EXISTS "${tableName}" (\n${columns.join(',\n')}\n);`;
      };

      const getTableData = async (tableName: string): Promise<string> => {
        const result = await pool.query(`SELECT * FROM "${tableName}"`);
        
        if (result.rows.length === 0) {
          return `-- No data in table ${tableName}`;
        }
        
        const columns = Object.keys(result.rows[0]);
        const inserts: string[] = [];
        
        for (const row of result.rows) {
          const values = columns.map(col => {
            const val = row[col];
            if (val === null) return 'NULL';
            if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
            if (typeof val === 'number') return val.toString();
            if (val instanceof Date) return `'${val.toISOString()}'`;
            if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
            return `'${String(val).replace(/'/g, "''")}'`;
          });
          inserts.push(`INSERT INTO "${tableName}" ("${columns.join('", "')}") VALUES (${values.join(', ')});`);
        }
        
        return inserts.join('\n');
      };

      const tables = await getTableNames();
      let output = `-- Database Export\n-- Generated: ${new Date().toISOString()}\n-- Tables: ${tables.join(', ')}\n\n`;
      output += '-- Disable foreign key checks for import\nSET session_replication_role = replica;\n\n';
      
      for (const table of tables) {
        output += `-- ==========================================\n`;
        output += `-- Table: ${table}\n`;
        output += `-- ==========================================\n\n`;
        
        const schema = await getTableSchema(table);
        output += schema + '\n\n';
        
        const data = await getTableData(table);
        output += data + '\n\n';
      }
      
      output += '-- Re-enable foreign key checks\nSET session_replication_role = DEFAULT;\n';
      
      const filename = `autoreport-export-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.sql`;
      res.setHeader('Content-Type', 'application/sql');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(output);
      
    } catch (error: any) {
      console.error("Database export error:", error);
      res.status(500).json({ message: "Erreur lors de l'export de la base de données", error: error.message });
    }
  });

  app.get("/api/admin/export-data", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const { generateBackupData } = await import("./backupScheduler");
      const backupData = await generateBackupData();
      
      const garagesList = await db.select().from(garages);
      (backupData.data as any).garages = garagesList;
      
      const filename = `autoreport-data-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.json`;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(JSON.stringify(backupData, null, 2));
    } catch (error: any) {
      console.error("Data export error:", error);
      res.status(500).json({ message: "Erreur lors de l'export des données", error: error.message });
    }
  });

  app.post("/api/admin/import-data", isAuthenticated, isRootAdmin, async (req: any, res) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({ message: "Aucun fichier fourni" });
      }
      
      const file = req.files.file;
      let content: string;
      if (file.tempFilePath) {
        content = fs.readFileSync(file.tempFilePath, 'utf8');
      } else {
        content = file.data.toString('utf8');
      }
      let backupData;
      
      try {
        backupData = JSON.parse(content);
      } catch (e) {
        return res.status(400).json({ message: "Fichier JSON invalide" });
      }
      
      if (!backupData || !backupData.version || !backupData.data) {
        return res.status(400).json({ message: "Format de backup invalide. Le fichier doit contenir 'version' et 'data'." });
      }
      
      const tableMap: Record<string, any> = {
        garages,
        users, services, quotes, quoteItems, quoteMedia,
        invoices, invoiceItems, invoiceMedia, reservations,
        reservationServices, notifications, engagements,
        workflows, workflowSteps, serviceWorkflows, workshopTasks,
        applicationSettings, invoiceCounters, auditLogs, auditLogChanges,
        chatConversations, chatParticipants, chatMessages, chatAttachments
      };
      
      const importOrder = [
        'garages',
        'users', 'services', 'quotes', 'quoteItems', 'quoteMedia',
        'invoices', 'invoiceItems', 'invoiceMedia', 'reservations',
        'reservationServices', 'notifications', 'engagements',
        'workflows', 'workflowSteps', 'serviceWorkflows', 'workshopTasks',
        'applicationSettings', 'invoiceCounters', 'auditLogs', 'auditLogChanges',
        'chatConversations', 'chatParticipants', 'chatMessages', 'chatAttachments'
      ];
      
      const results: Record<string, { imported: number; errors: number; skipped: number }> = {};
      
      for (const tableName of importOrder) {
        const tableData = backupData.data?.[tableName];
        if (!tableData || !Array.isArray(tableData) || tableData.length === 0) continue;
        
        results[tableName] = { imported: 0, errors: 0, skipped: 0 };
        const table = tableMap[tableName];
        if (!table) continue;
        
        for (const row of tableData) {
          try {
            await db.insert(table).values(row).onConflictDoNothing();
            results[tableName].imported++;
          } catch (err: any) {
            console.error(`Error importing ${tableName}:`, err.message);
            results[tableName].errors++;
          }
        }
      }
      
      await logAuditEvent({
        req,
        entityType: "service" as EntityType,
        entityId: "import",
        action: "created" as ActionType,
        summary: `Import de données: ${JSON.stringify(results)}`
      });
      
      res.json({ 
        success: true, 
        message: "Import terminé",
        version: backupData.version,
        exportedAt: backupData.exportedAt,
        results 
      });
      
    } catch (error: any) {
      console.error("Data import error:", error);
      res.status(500).json({ message: "Erreur lors de l'import des données", error: error.message });
    }
  });

  app.post("/api/admin/import-sql", isAuthenticated, isRootAdmin, async (req: any, res) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({ message: "Aucun fichier SQL fourni" });
      }

      const replaceExisting = req.body?.replaceExisting === 'true' || req.body?.replaceExisting === true;

      const file = req.files.file;
      let content: string;
      if (file.tempFilePath) {
        content = fs.readFileSync(file.tempFilePath, 'utf8');
      } else {
        content = file.data.toString('utf8');
      }

      const { pool } = await import("./db");
      const results: Record<string, { imported: number; skipped: number; errors: number }> = {};

      await pool.query("SET session_replication_role = replica");

      const tablesInFile = new Set<string>();
      const insertRegex = /^INSERT\s+INTO\s+(?:public\.)?"?(\w+)"?/gim;
      let m;
      while ((m = insertRegex.exec(content)) !== null) {
        tablesInFile.add(m[1]);
      }

      if (replaceExisting && tablesInFile.size > 0) {
        const tablesToTruncate = Array.from(tablesInFile)
          .filter(t => t !== 'sessions')
          .map(t => `"${t}"`)
          .join(', ');
        if (tablesToTruncate) {
          try {
            await pool.query(`TRUNCATE TABLE ${tablesToTruncate} CASCADE`);
          } catch (truncErr: any) {
            console.error("[SQL Import] Truncate warning:", truncErr.message?.slice(0, 200));
          }
        }
      }

      const statements: string[] = [];
      let buffer = "";
      let inString = false;
      let escaped = false;
      let inCreateBlock = false;
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith('--')) continue;

        if (inCreateBlock) {
          if (trimmedLine.endsWith(');')) {
            inCreateBlock = false;
          }
          continue;
        }

        if (!buffer) {
          if (trimmedLine.startsWith('SET ')) continue;
          if (/^CREATE\s+(TABLE|INDEX|SEQUENCE|TYPE|EXTENSION)/i.test(trimmedLine)) {
            if (!trimmedLine.endsWith(');')) {
              inCreateBlock = true;
            }
            continue;
          }
          if (/^(ALTER|DROP|GRANT|REVOKE|COMMENT)\s/i.test(trimmedLine)) {
            if (!trimmedLine.endsWith(';')) {
              inCreateBlock = true;
            }
            continue;
          }
          if (!/^INSERT\s/i.test(trimmedLine)) continue;
        }

        buffer += (buffer ? ' ' : '') + trimmedLine;
        for (let ci = 0; ci < trimmedLine.length; ci++) {
          const ch = trimmedLine[ci];
          if (escaped) { escaped = false; continue; }
          if (ch === '\\' && inString) { escaped = true; continue; }
          if (ch === "'" ) {
            if (inString && ci + 1 < trimmedLine.length && trimmedLine[ci + 1] === "'") { ci++; continue; }
            inString = !inString;
            continue;
          }
          if (!inString && ch === ';') {
            statements.push(buffer.slice(0, buffer.length).replace(/;\s*$/, ''));
            buffer = "";
            break;
          }
        }
      }
      if (buffer.trim()) statements.push(buffer.trim().replace(/;\s*$/, ''));

      for (const trimmed of statements) {
        const headerMatch = trimmed.match(/^INSERT\s+INTO\s+(?:public\.)?"?(\w+)"?\s*\(([^)]+)\)\s*VALUES\s*/i);
        if (!headerMatch) continue;

        const tableName = headerMatch[1];
        if (tableName === 'sessions') continue;

        const columns = headerMatch[2].split(",").map(c => c.trim().replace(/"/g, ""));
        const validCol = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
        if (!columns.every(c => validCol.test(c))) continue;

        const valuesBlock = trimmed.slice(headerMatch[0].length).replace(/;\s*$/, '');
        const rowStrings: string[] = [];
        let depth = 0; let current = ""; let inStr = false; let esc = false;
        for (let i = 0; i < valuesBlock.length; i++) {
          const ch = valuesBlock[i];
          if (esc) { current += ch; esc = false; continue; }
          if (ch === "'" && !inStr) { inStr = true; current += ch; continue; }
          if (ch === "'" && inStr) {
            if (i + 1 < valuesBlock.length && valuesBlock[i + 1] === "'") { current += "''"; i++; continue; }
            inStr = false; current += ch; continue;
          }
          if (ch === '\\' && inStr) { esc = true; current += ch; continue; }
          if (!inStr) {
            if (ch === '(') { if (depth === 0) current = ""; depth++; continue; }
            if (ch === ')') { depth--; if (depth === 0) { rowStrings.push(current); current = ""; } continue; }
            if (ch === ',' && depth === 0) continue;
          }
          current += ch;
        }

        if (!results[tableName]) results[tableName] = { imported: 0, skipped: 0, errors: 0 };

        for (const rowStr of rowStrings) {
          const values: string[] = [];
          let cur = ""; let inS = false; let escd = false;
          for (let i = 0; i < rowStr.length; i++) {
            const ch = rowStr[i];
            if (escd) { cur += ch; escd = false; continue; }
            if (ch === "'" && !inS) { inS = true; cur += ch; continue; }
            if (ch === "'" && inS) {
              if (i + 1 < rowStr.length && rowStr[i + 1] === "'") { cur += "''"; i++; continue; }
              inS = false; cur += ch; continue;
            }
            if (ch === '\\' && inS) { escd = true; cur += ch; continue; }
            if (ch === ',' && !inS) { values.push(cur.trim()); cur = ""; continue; }
            cur += ch;
          }
          if (cur.trim()) values.push(cur.trim());

          if (values.length !== columns.length) {
            results[tableName].errors++;
            continue;
          }

          const parsedValues = values.map(v => {
            if (v === "NULL") return null;
            if (v === "TRUE" || v === "true") return true;
            if (v === "FALSE" || v === "false") return false;
            if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replace(/''/g, "'").replace(/\\'/g, "'");
            if (!isNaN(Number(v)) && v !== "") return Number(v);
            return v;
          });

          const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
          const colNames = columns.map(c => `"${c}"`).join(", ");
          const insertSQL = `INSERT INTO "${tableName}" (${colNames}) VALUES (${placeholders}) ON CONFLICT DO NOTHING`;

          try {
            const result = await pool.query(insertSQL, parsedValues);
            if (result.rowCount && result.rowCount > 0) {
              results[tableName].imported++;
            } else {
              results[tableName].skipped++;
            }
          } catch (err: any) {
            results[tableName].errors++;
            console.error(`[SQL Import] Error on ${tableName}:`, err.message?.slice(0, 200));
          }
        }
      }

      await pool.query("SET session_replication_role = DEFAULT");

      await logAuditEvent({
        req,
        entityType: "service" as EntityType,
        entityId: "sql-import",
        action: "created" as ActionType,
        summary: `Import SQL: ${JSON.stringify(results)}`
      });

      res.json({
        success: true,
        message: "Import SQL terminé",
        results
      });

    } catch (error: any) {
      console.error("SQL import error:", error);
      const { pool } = await import("./db");
      try { await pool.query("SET session_replication_role = DEFAULT"); } catch (_) {}
      res.status(500).json({ message: "Erreur lors de l'import SQL", error: error.message });
    }
  });

  app.post("/api/admin/import-media", isAuthenticated, isRootAdmin, async (req: any, res) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({ message: "Aucun fichier fourni" });
      }
      
      const file = req.files.file;
      const tmpDir = path.join("/tmp", `media-import-${Date.now()}`);
      fs.mkdirSync(tmpDir, { recursive: true });
      
      const archivePath = path.join(tmpDir, file.name);
      if (file.tempFilePath) {
        fs.copyFileSync(file.tempFilePath, archivePath);
      } else {
        await file.mv(archivePath);
      }
      
      if (file.name.endsWith('.tar.gz') || file.name.endsWith('.tgz')) {
        execSync(`tar -xzf "${archivePath}" -C "${tmpDir}"`);
      } else if (file.name.endsWith('.zip')) {
        execSync(`unzip -o "${archivePath}" -d "${tmpDir}"`);
      }
      
      let sourceDir = tmpDir;
      const entries = fs.readdirSync(tmpDir);
      for (const entry of entries) {
        const entryPath = path.join(tmpDir, entry);
        if (fs.statSync(entryPath).isDirectory() && entry.startsWith('media_backup_')) {
          sourceDir = entryPath;
          break;
        }
      }
      
      const uploadsDir = path.join(process.cwd(), "uploads");
      fs.mkdirSync(uploadsDir, { recursive: true });
      
      let copiedCount = 0;
      let skippedCount = 0;
      const copiedFiles: string[] = [];
      const sourceFiles = fs.readdirSync(sourceDir);
      
      for (const fileName of sourceFiles) {
        if (fileName === 'media_mapping.json' || fileName === 'restore-media.sh' || fileName === 'media_tables.sql') {
          continue;
        }
        if (fileName.endsWith('.tar.gz') || fileName.endsWith('.tgz') || fileName.endsWith('.zip')) {
          continue;
        }
        
        if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
          continue;
        }
        
        const srcPath = path.join(sourceDir, fileName);
        if (!fs.statSync(srcPath).isFile()) continue;
        
        const destPath = path.join(uploadsDir, path.basename(fileName));
        if (fs.existsSync(destPath)) {
          skippedCount++;
          continue;
        }
        
        fs.copyFileSync(srcPath, destPath);
        copiedCount++;
        copiedFiles.push(fileName);
      }
      
      let mapping = null;
      const mappingPath = path.join(sourceDir, "media_mapping.json");
      if (fs.existsSync(mappingPath)) {
        try {
          mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
        } catch (e) {}
      }
      
      fs.rmSync(tmpDir, { recursive: true, force: true });
      
      await logAuditEvent({
        req,
        entityType: "service" as EntityType,
        entityId: "import-media",
        action: "created" as ActionType,
        summary: `Import média: ${copiedCount} fichiers importés, ${skippedCount} ignorés`
      });
      
      res.json({
        success: true,
        message: `Import média terminé`,
        copiedCount,
        skippedCount,
        totalInArchive: sourceFiles.length,
        hasMappingFile: !!mapping,
        mappingEntries: Array.isArray(mapping) ? mapping.length : 0
      });
      
    } catch (error: any) {
      console.error("Media import error:", error);
      res.status(500).json({ message: "Erreur lors de l'import des médias", error: error.message });
    }
  });

  // WebSocket authentication tokens (short-lived, single-use)
  const wsAuthTokens = new Map<string, { userId: string; expiresAt: number }>();
  
  // Generate a WebSocket auth token for the current user
  app.post("/api/ws/auth-token", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + 30000; // 30 seconds validity
      
      wsAuthTokens.set(token, { userId, expiresAt });
      
      // Cleanup expired tokens
      Array.from(wsAuthTokens.entries()).forEach(([t, data]) => {
        if (data.expiresAt < Date.now()) {
          wsAuthTokens.delete(t);
        }
      });
      
      res.json({ token });
    } catch (error: any) {
      console.error("Error generating WS auth token:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Temporary endpoint for importing quote media from local files using GCS
  app.post("/api/admin/import-quote-media", isAuthenticated, isRootAdmin, async (req: any, res) => {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const { randomUUID } = await import("crypto");
      const { Storage } = await import("@google-cloud/storage");
      
      const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
      const gcsClient = new Storage({
        credentials: {
          audience: "replit",
          subject_token_type: "access_token",
          token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
          type: "external_account",
          credential_source: {
            url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
            format: { type: "json", subject_token_field_name: "access_token" },
          },
          universe_domain: "googleapis.com",
        },
        projectId: "",
      });
      
      const privateObjectDir = process.env.PRIVATE_OBJECT_DIR || "";
      if (!privateObjectDir) {
        return res.status(500).json({ error: "PRIVATE_OBJECT_DIR not set" });
      }
      
      const pathParts = privateObjectDir.split("/").filter(p => p);
      const bucketName = pathParts[0];
      const basePath = pathParts.slice(1).join("/");
      
      const mediaMappings = [
        {
          quoteRef: "0395C819",
          files: [
            { path: "/tmp/upDb/Devis-0395C819.pdf", type: "pdf" },
            { path: "/tmp/upDb/IMG_0103.jpeg", type: "image" },
            { path: "/tmp/upDb/IMG_0106.jpeg", type: "image" },
          ],
        },
        {
          quoteRef: "DEV-01-00068",
          files: [
            { path: "/tmp/upDb/Devis-DEV-01-00068.pdf", type: "pdf" },
            { path: "/tmp/upDb/IMG_0144.jpeg", type: "image" },
            { path: "/tmp/upDb/IMG_0143.jpeg", type: "image" },
          ],
        },
        {
          quoteRef: "3AFD6186",
          files: [{ path: "/tmp/upDb/Devis-3AFD6186.pdf", type: "pdf" }],
        },
        {
          quoteRef: "6DD863A5",
          files: [
            { path: "/tmp/upDb/Devis-6DD863A5.pdf", type: "pdf" },
            { path: "/tmp/upDb/0181C530-4C5A-4DA5-BB9B-9E83992402DC.jpeg", type: "image" },
          ],
        },
        {
          quoteRef: "C43335ED",
          files: [{ path: "/tmp/upDb/Devis-C43335ED.pdf", type: "pdf" }],
        },
        {
          quoteRef: "DEV-01-00076",
          files: [{ path: "/tmp/upDb/IMG_0219.png", type: "image" }],
        },
      ];
      
      const results: any[] = [];
      const bucket = gcsClient.bucket(bucketName);
      
      for (const mapping of mediaMappings) {
        const quote = await storage.getQuoteByReference(mapping.quoteRef);
        if (!quote) {
          results.push({ quoteRef: mapping.quoteRef, error: "Quote not found" });
          continue;
        }
        
        for (const file of mapping.files) {
          if (!fs.existsSync(file.path)) {
            results.push({ quoteRef: mapping.quoteRef, file: file.path, error: "File not found" });
            continue;
          }
          
          const fileName = path.basename(file.path);
          const buffer = fs.readFileSync(file.path);
          const stats = fs.statSync(file.path);
          
          const ext = path.extname(file.path).toLowerCase();
          let contentType = "application/octet-stream";
          if (ext === ".pdf") contentType = "application/pdf";
          else if (ext === ".jpeg" || ext === ".jpg") contentType = "image/jpeg";
          else if (ext === ".png") contentType = "image/png";
          
          try {
            const objectId = randomUUID();
            const objectName = `${basePath}/uploads/${objectId}`;
            
            const gcsFile = bucket.file(objectName);
            await gcsFile.save(buffer, {
              contentType,
              resumable: false,
            });
            
            const objectPath = `/objects/uploads/${objectId}`;
            
            await storage.createQuoteMedia({
              quoteId: quote.id,
              fileType: "image",
              filePath: objectPath,
              fileName: fileName,
              fileSize: stats.size,
            });
            
            results.push({ quoteRef: mapping.quoteRef, file: fileName, success: true, path: objectPath });
          } catch (error: any) {
            results.push({ quoteRef: mapping.quoteRef, file: fileName, error: error.message });
          }
        }
      }
      
      res.json({ message: "Import completed", results });
    } catch (error: any) {
      console.error("Error importing quote media:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // =====================
  // BACKUP MANAGEMENT API
  // =====================
  
  // DB Sync helper: dump source, restore to target
  async function syncDatabases(sourceUrl: string, targetUrl: string, direction: string): Promise<{ backup: string; tables: number; rows: number }> {
    const backupFileName = `backup-before-sync-${direction}-${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}.sql`;
    const backupsDir = path.join(process.cwd(), "backups");
    if (!fs.existsSync(backupsDir)) fs.mkdirSync(backupsDir, { recursive: true });
    const backupPath = path.join(backupsDir, backupFileName);

    execSync(`pg_dump "${targetUrl}" --no-owner --no-privileges --data-only > "${backupPath}"`, { timeout: 60000 });
    console.log(`[DBSync ${direction}] Backup created: ${backupFileName}`);

    const dumpOutput = execSync(`pg_dump "${sourceUrl}" --no-owner --no-privileges --data-only --inserts`, {
      timeout: 120000,
      maxBuffer: 100 * 1024 * 1024,
    }).toString();

    const { Pool } = await import("@neondatabase/serverless");
    const targetPool = new Pool({ connectionString: targetUrl });

    try {
      await targetPool.query("SET session_replication_role = replica");

      const tableNames = new Set<string>();
      const insertRegex = /^INSERT INTO (?:public\.)?"?(\w+)"?/gm;
      let m;
      while ((m = insertRegex.exec(dumpOutput)) !== null) {
        tableNames.add(m[1]);
      }

      const tablesToTruncate = Array.from(tableNames)
        .filter(t => t !== 'sessions')
        .map(t => `"${t}"`)
        .join(', ');
      if (tablesToTruncate) {
        await targetPool.query(`TRUNCATE TABLE ${tablesToTruncate} CASCADE`);
      }

      let totalRows = 0;
      const statements = dumpOutput.split('\n').filter(line => line.startsWith('INSERT INTO'));
      for (const stmt of statements) {
        try {
          await targetPool.query(stmt);
          totalRows++;
        } catch (err: any) {
          console.error(`[DBSync ${direction}] Insert error:`, err.message?.slice(0, 150));
        }
      }

      await targetPool.query("SET session_replication_role = DEFAULT");
      console.log(`[DBSync ${direction}] Synced ${totalRows} rows across ${tableNames.size} tables`);
      return { backup: backupFileName, tables: tableNames.size, rows: totalRows };
    } finally {
      await targetPool.end();
    }
  }

  // DB Sync route: Prod → Dev (Super Admin only)
  app.post("/api/admin/db/sync-prod", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const prodDbUrl = process.env.PRODUCTION_DB_URL;
      const devDbUrl = process.env.DEVELOPPEMENT_DB_URL || process.env.DATABASE_URL;

      if (!prodDbUrl) {
        return res.status(400).json({ message: "Secret PRODUCTION_DB_URL non configuré." });
      }
      if (!devDbUrl) {
        return res.status(500).json({ message: "URL de base de données de développement non trouvée." });
      }

      console.log("[DBSync] Starting Prod → Dev sync...");
      const result = await syncDatabases(prodDbUrl, devDbUrl, "prod-to-dev");

      await logAuditEvent({
        req: req as any,
        entityType: "user" as EntityType,
        entityId: (req.user as User).id,
        action: "updated" as ActionType,
        summary: `Sync Prod→Dev: ${result.rows} lignes, ${result.tables} tables`,
      });

      res.json({
        message: `Synchronisation Prod → Dev réussie ! ${result.rows} lignes synchronisées dans ${result.tables} tables. Sauvegarde de sécurité créée.`,
        backup: result.backup,
        tables: result.tables,
        rows: result.rows,
      });
    } catch (error: any) {
      console.error("[DBSync Prod→Dev] Error:", error);
      res.status(500).json({ message: `Erreur: ${error.message}` });
    }
  });

  // DB Sync route: Dev → Prod (Super Admin only)
  app.post("/api/admin/db/sync-dev-to-prod", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const devDbUrl = process.env.DEVELOPPEMENT_DB_URL || process.env.DATABASE_URL;
      const prodDbUrl = process.env.PRODUCTION_DB_URL;

      if (!prodDbUrl) {
        return res.status(400).json({ message: "Secret PRODUCTION_DB_URL non configuré." });
      }
      if (!devDbUrl) {
        return res.status(500).json({ message: "URL de base de données de développement non trouvée." });
      }

      console.log("[DBSync] Starting Dev → Prod sync...");
      const result = await syncDatabases(devDbUrl, prodDbUrl, "dev-to-prod");

      await logAuditEvent({
        req: req as any,
        entityType: "user" as EntityType,
        entityId: (req.user as User).id,
        action: "updated" as ActionType,
        summary: `Sync Dev→Prod: ${result.rows} lignes, ${result.tables} tables`,
      });

      res.json({
        message: `Synchronisation Dev → Prod réussie ! ${result.rows} lignes synchronisées dans ${result.tables} tables. Sauvegarde de sécurité créée.`,
        backup: result.backup,
        tables: result.tables,
        rows: result.rows,
      });
    } catch (error: any) {
      console.error("[DBSync Dev→Prod] Error:", error);
      res.status(500).json({ message: `Erreur: ${error.message}` });
    }
  });

  app.get("/api/admin/backups/stats", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const uploadsDir = path.join(process.cwd(), "uploads");
      let totalFiles = 0;
      let totalSize = 0;
      
      if (fs.existsSync(uploadsDir)) {
        const files = fs.readdirSync(uploadsDir);
        totalFiles = files.length;
        for (const file of files) {
          const stats = fs.statSync(path.join(uploadsDir, file));
          totalSize += stats.size;
        }
      }
      
      // Get media counts from database
      const quoteMediaCount = await db.select({ count: count() }).from(quoteMedia);
      const invoiceMediaCount = await db.select({ count: count() }).from(invoiceMedia);
      
      res.json({
        filesOnDisk: totalFiles,
        totalSize,
        totalSizeFormatted: formatFileSize(totalSize),
        quoteMediaCount: Number(quoteMediaCount[0]?.count || 0),
        invoiceMediaCount: Number(invoiceMediaCount[0]?.count || 0)
      });
    } catch (error: any) {
      console.error("Error getting backup stats:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get list of backups
  app.get("/api/admin/backups", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const backupsDir = path.join(process.cwd(), "backups");
      
      if (!fs.existsSync(backupsDir)) {
        return res.json({ backups: [] });
      }
      
      const files = fs.readdirSync(backupsDir);
      const backups = files
        .filter(f => f.startsWith("media_backup_") || f.startsWith("backup-"))
        .map(f => {
          const filePath = path.join(backupsDir, f);
          const stats = fs.statSync(filePath);
          const isArchive = f.endsWith(".tar.gz") || f.endsWith(".sql") || f.endsWith(".zip");
          
          // Extract date from filename if possible
          const dateMatch = f.match(/(\d{4}-\d{2}-\d{2})/);
          const date = dateMatch ? dateMatch[0] : null;

          return {
            name: f,
            isArchive,
            isDirectory: stats.isDirectory(),
            size: stats.size,
            sizeFormatted: formatFileSize(stats.size),
            createdAt: stats.mtime.toISOString(),
            date
          };
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      res.json({ backups });
    } catch (error: any) {
      console.error("Error listing backups:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Helper function to format file size
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'Ko', 'Mo', 'Go'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  // Create new backup
  app.post("/api/admin/backups", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const dateStr = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const backupDir = path.join(process.cwd(), "backups", `media_backup_${dateStr}`);
      const uploadsDir = path.join(process.cwd(), "uploads");
      
      // Create backups directory
      fs.mkdirSync(path.join(process.cwd(), "backups"), { recursive: true });
      fs.mkdirSync(backupDir, { recursive: true });
      
      // Copy uploads folder
      if (fs.existsSync(uploadsDir)) {
        const uploadFiles = fs.readdirSync(uploadsDir);
        for (const file of uploadFiles) {
          fs.copyFileSync(path.join(uploadsDir, file), path.join(backupDir, file));
        }
      }
      
      // Export media mapping as JSON using direct SQL
      const quoteMediaResults = await db.select({
        reference: quotes.reference,
        quoteId: quoteMedia.quoteId,
        mediaId: quoteMedia.id,
        filePath: quoteMedia.filePath,
        fileName: quoteMedia.fileName,
        fileType: quoteMedia.fileType
      }).from(quoteMedia).innerJoin(quotes, eq(quoteMedia.quoteId, quotes.id));
      
      const invoiceMediaResults = await db.select({
        reference: invoices.invoiceNumber,
        invoiceId: invoiceMedia.invoiceId,
        mediaId: invoiceMedia.id,
        filePath: invoiceMedia.filePath,
        fileName: invoiceMedia.fileName,
        fileType: invoiceMedia.fileType
      }).from(invoiceMedia).innerJoin(invoices, eq(invoiceMedia.invoiceId, invoices.id));
      
      const allMedia = [
        ...quoteMediaResults.map(m => ({ entityType: 'quote', ...m })),
        ...invoiceMediaResults.map(m => ({ entityType: 'invoice', ...m }))
      ];
      fs.writeFileSync(path.join(backupDir, "media_mapping.json"), JSON.stringify(allMedia, null, 2));
      
      // Create restore script
      const restoreScript = `#!/bin/bash
# Script de restauration des médias pour AutoReport
SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
echo "=== Restauration des médias AutoReport ==="
mkdir -p uploads
for file in "$SCRIPT_DIR"/*; do
  filename=$(basename "$file")
  if [[ "$filename" != "restore-media.sh" && "$filename" != "media_mapping.json" && "$filename" != "media_tables.sql" ]]; then
    cp "$file" uploads/
  fi
done
echo "Fichiers restaurés dans uploads/"
echo "=== Restauration terminée ==="`;
      fs.writeFileSync(path.join(backupDir, "restore-media.sh"), restoreScript);
      fs.chmodSync(path.join(backupDir, "restore-media.sh"), "755");
      
      // Create tar.gz archive
      const archiveName = `media_backup_${dateStr.slice(0, 10)}.tar.gz`;
      const archivePath = path.join(process.cwd(), "backups", archiveName);
      execSync(`cd "${path.join(process.cwd(), "backups")}" && tar -czf "${archiveName}" "media_backup_${dateStr}"`);
      
      // Get stats
      const files = fs.readdirSync(backupDir);
      const archiveStats = fs.statSync(archivePath);
      
      // Log audit
      await logAuditEvent({
        req,
        entityType: "service" as EntityType,
        entityId: "backup",
        action: "created" as ActionType,
        summary: `Sauvegarde créée: ${archiveName} (${files.length} fichiers, ${formatFileSize(archiveStats.size)})`
      });
      
      res.json({
        success: true,
        backup: {
          name: archiveName,
          fileCount: files.length,
          size: archiveStats.size,
          sizeFormatted: formatFileSize(archiveStats.size),
          createdAt: new Date().toISOString()
        }
      });
    } catch (error: any) {
      console.error("Error creating backup:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Download backup
  app.get("/api/admin/backups/:name/download", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { name } = req.params;
      const backupsDir = path.join(process.cwd(), "backups");
      const backupPath = path.join(backupsDir, name);

      console.log(`[BackupDownload] Request for: ${name}, path: ${backupPath}`);

      if (!fs.existsSync(backupPath)) {
        console.error(`[BackupDownload] File not found: ${backupPath}`);
        return res.status(404).json({ error: "Sauvegarde non trouvée" });
      }

      const stats = fs.statSync(backupPath);
      
      // Support for directory downloads (as zip) if not already archived
      if (stats.isDirectory()) {
        const archiver = (await import("archiver")).default;
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", `attachment; filename="${name}.zip"`);
        const archive = archiver("zip", { zlib: { level: 5 } });
        
        archive.on('error', (err) => {
          console.error(`[BackupDownload] Archive error:`, err);
          if (!res.headersSent) res.status(500).send({ error: err.message });
        });

        archive.pipe(res);
        archive.directory(backupPath, false);
        await archive.finalize();
        return;
      }

      const contentType = name.endsWith(".tar.gz") ? "application/gzip" : 
                          name.endsWith(".sql") ? "application/sql" : 
                          name.endsWith(".zip") ? "application/zip" : "application/octet-stream";

      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
      res.setHeader("Content-Length", stats.size);

      const stream = fs.createReadStream(backupPath);
      stream.on('error', (err) => {
        console.error(`[BackupDownload] Stream error:`, err);
        if (!res.headersSent) res.status(500).send({ error: err.message });
      });
      stream.pipe(res);
    } catch (error: any) {
      console.error("Error downloading backup:", error);
      if (!res.headersSent) res.status(500).json({ error: error.message });
    }
  });
  
  // Delete backup
  app.delete("/api/admin/backups/:name", isAuthenticated, isSuperAdmin, async (req: any, res) => {
    try {
      const { name } = req.params;
      const backupsDir = path.join(process.cwd(), "backups");
      
      // Delete archive
      const archivePath = path.join(backupsDir, name);
      if (fs.existsSync(archivePath)) {
        fs.unlinkSync(archivePath);
      }
      
      // Delete folder if exists
      const folderName = name.replace(".tar.gz", "");
      const folderPath = path.join(backupsDir, folderName);
      if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
        fs.rmSync(folderPath, { recursive: true });
      }
      
      // Log audit
      await logAuditEvent({
        req,
        entityType: "service" as EntityType,
        entityId: "backup",
        action: "deleted" as ActionType,
        summary: `Sauvegarde supprimée: ${name}`
      });
      
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting backup:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // No separate httpServer creation here
  // server is passed as an argument to registerRoutes

  // WebSocket server setup (Reference: javascript_websocket blueprint)
  // const wss = new WebSocketServer({ server: server, path: '/ws' }); // Already declared as wss at top of registerRoutes

  wss.on('connection', (ws: WebSocket, req: any) => {
    console.log('WebSocket client connected');
    let authenticatedUserId: string | null = null;

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Secure authentication with server-issued token
        if (data.type === 'authenticate' && data.token) {
          const tokenData = wsAuthTokens.get(data.token);
          
          if (tokenData && tokenData.expiresAt > Date.now()) {
            authenticatedUserId = tokenData.userId;
            wsClients.set(tokenData.userId, ws);
            wsAuthTokens.delete(data.token); // Single-use token
            console.log(`User ${tokenData.userId} authenticated via WebSocket`);
            ws.send(JSON.stringify({ type: 'authenticated', success: true }));
          } else {
            console.log('WebSocket authentication failed: invalid or expired token');
            ws.send(JSON.stringify({ type: 'authenticated', success: false, error: 'Invalid token' }));
          }
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      // Remove client from map
      for (const [userId, client] of Array.from(wsClients.entries())) {
        if (client === ws) {
          wsClients.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });

  // =====================
  // ADMIN REVIEWS ROUTES
  // =====================
  app.get("/api/admin/reviews", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageScope = getGarageScope(req.user);
      let query = db.select().from(reviews);
      if (garageScope) {
        query = query.where(eq(reviews.garageId, garageScope)) as any;
      }
      const allReviews = await (query as any).orderBy(desc(reviews.createdAt));
      res.json(allReviews);
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.patch("/api/admin/reviews/:id/approve", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
      
      if (!review) {
        return res.status(404).json({ message: "Avis non trouvé" });
      }

      const garageScope = getGarageScope(req.user);
      if (garageScope && review.garageId !== garageScope) {
        return res.status(403).json({ message: "Non autorisé" });
      }

      const [updatedReview] = await db.update(reviews)
        .set({ isApproved: true })
        .where(eq(reviews.id, id))
        .returning();

      // If approved and rating is high, we could potentially send a follow-up email
      if (updatedReview.rating >= 4 && updatedReview.clientId) {
        try {
          const user = await storage.getUser(updatedReview.clientId);
          if (user && user.email) {
            await sendEmail({
              to: user.email,
              subject: "Partagez votre expérience sur Google - AUTOREPORT",
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #dc2626;">Merci pour votre confiance !</h2>
                  <p>Bonjour ${user.firstName || 'cher client'},</p>
                  <p>Nous avons bien reçu votre avis positif concernant votre récente prestation chez AUTOREPORT. Nous sommes ravis que vous soyez satisfait !</p>
                  <p>Pourriez-vous prendre quelques secondes pour partager également votre expérience sur Google ? Cela nous aide énormément à faire connaître notre travail.</p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="https://share.google/O0VCgqh0z1Ab4qUF9" style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                      Laisser un avis sur Google
                    </a>
                  </div>
                  <p>À très bientôt dans notre atelier !</p>
                  <p>L'équipe AUTOREPORT</p>
                </div>
              `
            });

            sendEventSms({
              userPhone: user.phone,
              userSmsConsent: user.smsConsent,
              userName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
              userEmail: user.email,
              eventType: 'review_request',
              eventTitle: 'Merci pour votre confiance !',
              eventDetails: 'Partagez votre expérience sur Google pour nous aider.',
              eventUrl: 'https://share.google/O0VCgqh0z1Ab4qUF9',
            });
          }
        } catch (emailErr) {
          console.error("Error sending Google review request email:", emailErr);
        }
      }

      res.json(updatedReview);
    } catch (error) {
      console.error("Error approving review:", error);
      res.status(500).json({ message: "Erreur lors de l'approbation de l'avis" });
    }
  });

  app.delete("/api/admin/reviews/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
      if (!review) {
        return res.status(404).json({ message: "Avis non trouvé" });
      }
      if (!hasGarageAccess(req.user, review.garageId)) {
        return res.status(403).json({ message: "Accès refusé" });
      }
      await db.delete(reviews).where(eq(reviews.id, id));
      res.json({ message: "Avis supprimé" });
    } catch (error: any) {
      console.error("Error deleting review:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // =====================
  // DOCUMENT VIEW TRACKING (authenticated clients)
  // =====================

  // Track when a client views their quote
  app.post("/api/quotes/:id/track-view", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (!quote) return res.status(404).json({ message: "Devis non trouvé" });
      if (quote.clientId !== req.user.id && req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Accès refusé" });
      }
      // Only set viewedAt if client is viewing (not admin)
      if (req.user.role === "client" && !quote.viewedAt) {
        await storage.updateQuote(id, { viewedAt: new Date() } as any);
        console.log(`[Tracking] Quote ${id} marked as viewed by client ${req.user.id}`);
      }
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error tracking quote view:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Track when a client views their invoice
  app.post("/api/invoices/:id/track-view", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) return res.status(404).json({ message: "Facture non trouvée" });
      if (invoice.clientId !== req.user.id && req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Accès refusé" });
      }
      // Only set viewedAt if client is viewing (not admin)
      if (req.user.role === "client" && !invoice.viewedAt) {
        await storage.updateInvoice(id, { viewedAt: new Date() });
        console.log(`[Tracking] Invoice ${id} marked as viewed by client ${req.user.id}`);
      }
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error tracking invoice view:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // =====================
  // SUPPORT CONTACT ROUTE
  // =====================

  app.post("/api/support/contact", async (req, res) => {
    try {
      const { name, email, category, subject, message } = req.body;

      if (!email || !category || !subject || !message) {
        return res.status(400).json({ success: false, message: "Tous les champs obligatoires doivent être remplis." });
      }

      const escapeHtml = (str: string) => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      const safeName = escapeHtml(name || "");
      const safeEmail = escapeHtml(email);
      const safeSubject = escapeHtml(subject);
      const safeMessage = escapeHtml(message);

      const categoryLabels: Record<string, string> = {
        question: "Question générale",
        devis: "Devis / Facturation",
        reservation: "Réservation",
        technique: "Problème technique",
        reclamation: "Réclamation",
        autre: "Autre",
      };

      const { sendEmail, getEmailHeader, getEmailFooter } = await import("./emailService");

      const htmlContent = `
        ${getEmailHeader('AUTOREPORT')}
        <div style="padding: 20px;">
          <h2 style="color: #e53e3e; margin-bottom: 20px;">Nouvelle demande de support</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; background: #f7fafc; font-weight: bold; width: 140px;">Nom</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${safeName || "Non renseigné"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; background: #f7fafc; font-weight: bold;">Email</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; background: #f7fafc; font-weight: bold;">Catégorie</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${categoryLabels[category] || escapeHtml(category)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; background: #f7fafc; font-weight: bold;">Sujet</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${safeSubject}</td>
            </tr>
          </table>
          <div style="background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #4a5568;">Message :</h3>
            <p style="margin: 0; white-space: pre-wrap; color: #2d3748;">${safeMessage}</p>
          </div>
        </div>
      `;

      await sendEmail(
        "contact@autoreport.com",
        `[Support] ${categoryLabels[category] || category} - ${subject}`,
        htmlContent,
        undefined,
        email,
      );

      res.json({ success: true, message: "Message envoyé avec succès." });
    } catch (error: any) {
      console.error("[Support] Error:", error);
      res.status(500).json({ success: false, message: "Une erreur est survenue." });
    }
  });

  // =====================
  // PUBLIC QUOTE ROUTES (no auth required)
  // =====================

  app.get("/api/public/quotes/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const [quote] = await db.select().from(quotes).where(eq(quotes.viewToken, token));
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouvé" });
      }

      // Track view
      await db.update(quotes).set({ viewedAt: new Date() }).where(eq(quotes.id, quote.id));

      const client = await storage.getUser(quote.clientId);
      const items = await storage.getQuoteItems(quote.id);
      const garage = quote.garageId ? await storage.getGarage(quote.garageId) : null;
      res.json({
        quote: {
          id: quote.id,
          reference: quote.reference,
          status: quote.status,
          quoteAmount: quote.quoteAmount,
          priceExcludingTax: quote.priceExcludingTax,
          taxRate: quote.taxRate,
          taxAmount: quote.taxAmount,
          productDetails: quote.productDetails,
          notes: quote.notes,
          validUntil: quote.validUntil,
          createdAt: quote.createdAt,
          wheelCount: quote.wheelCount,
          diameter: quote.diameter,
        },
        client: client ? {
          name: `${client.firstName || ""} ${client.lastName || ""}`.trim() || "Client",
        } : null,
        items: items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unitPriceExcludingTax: item.unitPriceExcludingTax,
          totalExcludingTax: item.totalExcludingTax,
          totalIncludingTax: item.totalIncludingTax,
          taxRate: item.taxRate,
        })),
        garage: garage ? {
          name: garage.name,
          logo: garage.logo,
          primaryColor: garage.primaryColor,
          phone: garage.phone,
          email: garage.email,
          address: garage.address,
          city: garage.city,
          postalCode: garage.postalCode,
        } : null,
      });
    } catch (error: any) {
      console.error("Error fetching public quote:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/public/quotes/:token/accept", async (req, res) => {
    try {
      const { token } = req.params;
      const [quote] = await db.select().from(quotes).where(eq(quotes.viewToken, token));
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouvé" });
      }
      if (quote.status === "accepted") {
        return res.json({ message: "Ce devis a déjà été accepté", status: "accepted" });
      }
      if (quote.status === "rejected" || quote.status === "completed") {
        return res.status(400).json({ message: "Ce devis ne peut plus être modifié" });
      }
      await storage.updateQuote(quote.id, { status: "accepted" });
      
      await storage.createNotification({
        userId: quote.clientId,
        type: "quote",
        title: "Devis accepté par le client",
        message: `Le devis ${quote.reference || quote.id.slice(0, 8)} a été accepté par le client`,
      });
      sendWsNotification(quote.clientId, { type: "quote_updated", quoteId: quote.id, status: "accepted" });

      res.json({ message: "Devis accepté avec succès", status: "accepted" });
    } catch (error: any) {
      console.error("Error accepting public quote:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/public/quotes/:token/reject", async (req, res) => {
    try {
      const { token } = req.params;
      const [quote] = await db.select().from(quotes).where(eq(quotes.viewToken, token));
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouvé" });
      }
      if (quote.status === "rejected") {
        return res.json({ message: "Ce devis a déjà été refusé", status: "rejected" });
      }
      if (quote.status === "accepted" || quote.status === "completed") {
        return res.status(400).json({ message: "Ce devis ne peut plus être modifié" });
      }
      await storage.updateQuote(quote.id, { status: "rejected" });
      
      res.json({ message: "Devis refusé", status: "rejected" });
    } catch (error: any) {
      console.error("Error rejecting public quote:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Generate view link for quote (admin/client)
  app.post("/api/quotes/:id/view-link", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (!quote) return res.status(404).json({ message: "Devis non trouvé" });
      
      const user = req.user;
      if (user.role !== 'admin' && user.role !== 'superadmin' && quote.clientId !== user.id) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }

      let viewToken = quote.viewToken;
      if (!viewToken) {
        viewToken = crypto.randomBytes(32).toString('hex');
        await storage.updateQuote(id, { viewToken } as any);
      }

      const viewUrl = buildUrl(req, `/devis/${viewToken}`);
      res.json({ viewUrl, viewToken });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Generate view link for invoice (admin/client)
  app.post("/api/invoices/:id/view-link", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) return res.status(404).json({ message: "Facture non trouvée" });
      
      const user = req.user;
      if (user.role !== 'admin' && user.role !== 'superadmin' && invoice.clientId !== user.id) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }

      let viewToken = invoice.viewToken;
      if (!viewToken) {
        viewToken = crypto.randomBytes(32).toString('hex');
        await db.update(invoices).set({ viewToken }).where(eq(invoices.id, id));
      }

      const viewUrl = buildUrl(req, `/facture/${viewToken}`);
      res.json({ viewUrl, viewToken });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // PUBLIC INVOICE VIEW (tracks consultation via viewToken)
  app.get("/api/public/invoices/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const [invoice] = await db.select().from(invoices).where(eq(invoices.viewToken, token));
      if (!invoice) {
        return res.status(404).json({ message: "Facture non trouvée" });
      }

      // Track view
      if (!invoice.viewedAt) {
        await db.update(invoices).set({ viewedAt: new Date() }).where(eq(invoices.id, invoice.id));
        console.log(`[Tracking] Invoice ${invoice.id} marked as viewed via public link`);
      }

      const client = await storage.getUser(invoice.clientId);
      const items = await storage.getInvoiceItems(invoice.id);
      const garage = invoice.garageId ? await storage.getGarage(invoice.garageId) : null;
      res.json({
        invoice: {
          id: invoice.id,
          invoiceNumber: invoice.invoiceNumber,
          status: invoice.status,
          amount: invoice.amount,
          priceExcludingTax: invoice.priceExcludingTax,
          taxRate: invoice.taxRate,
          taxAmount: invoice.taxAmount,
          productDetails: invoice.productDetails,
          notes: invoice.notes,
          dueDate: invoice.dueDate,
          paidAt: invoice.paidAt,
          createdAt: invoice.createdAt,
          wheelCount: invoice.wheelCount,
          diameter: invoice.diameter,
          paymentMethod: invoice.paymentMethod,
          stripeSessionId: invoice.stripeSessionId,
          paymentLink: invoice.paymentLink,
        },
        client: client ? {
          name: `${client.firstName || ""} ${client.lastName || ""}`.trim() || "Client",
        } : null,
        items: items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unitPriceExcludingTax: item.unitPriceExcludingTax,
          totalExcludingTax: item.totalExcludingTax,
          totalIncludingTax: item.totalIncludingTax,
          taxRate: item.taxRate,
        })),
        garage: garage ? {
          name: garage.name,
          logo: garage.logo,
          primaryColor: garage.primaryColor,
          phone: garage.phone,
          email: garage.email,
          address: garage.address,
          city: garage.city,
          postalCode: garage.postalCode,
        } : null,
      });
    } catch (error: any) {
      console.error("Error fetching public invoice:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/public/reviews/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const [review] = await db.select().from(reviews).where(eq(reviews.reviewToken, token));
      
      if (!review) {
        return res.status(404).json({ message: "Lien d'avis invalide" });
      }

      const invoice = review.invoiceId ? await storage.getInvoice(review.invoiceId) : null;
      const client = review.clientId ? await storage.getUser(review.clientId) : null;
      const garage = review.garageId ? await storage.getGarage(review.garageId) : null;

      res.json({
        reviewToken: token,
        hasReview: review.rating > 0,
        rating: review.rating > 0 ? review.rating : null,
        invoiceNumber: invoice?.invoiceNumber || null,
        clientName: review.clientName || (client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() : null),
        garage: garage ? {
          name: garage.name,
          logo: garage.logo,
          primaryColor: garage.primaryColor,
          phone: garage.phone,
          email: garage.email,
          address: garage.address,
          city: garage.city,
          postalCode: garage.postalCode,
        } : null,
      });
    } catch (error: any) {
      console.error("Error fetching review:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/public/reviews/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const { rating, comment } = req.body;
      
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "La note doit être entre 1 et 5" });
      }
      
      const [review] = await db.select().from(reviews).where(eq(reviews.reviewToken, token));
      if (!review) {
        return res.status(404).json({ message: "Lien d'avis invalide" });
      }
      
      if (review.rating > 0) {
        return res.status(400).json({ message: "Un avis a déjà été laissé pour cette facture" });
      }
      
      await db.update(reviews)
        .set({
          rating: parseInt(rating),
          comment: comment || null,
        })
        .where(eq(reviews.reviewToken, token));
      
      res.json({ message: "Merci pour votre avis !" });
    } catch (error: any) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/public/logo.png", (req, res) => {
    const logoPath = path.join(process.cwd(), 'attached_assets', 'logoAutoReport.png');
    if (fs.existsSync(logoPath)) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.sendFile(logoPath);
    } else {
      res.status(404).send('Logo not found');
    }
  });

  app.get("/api/public/quotes/:token/pdf", async (req, res) => {
    try {
      const { token } = req.params;
      const [quote] = await db.select().from(quotes).where(eq(quotes.viewToken, token));
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouvé" });
      }
      const client = await storage.getUser(quote.clientId);
      const items = await storage.getQuoteItems(quote.id);
      const settings = await storage.getApplicationSettings();
      
      const formatPrice = (value: string | number | null | undefined): string => {
        if (value === null || value === undefined || value === "") return "0,00 €";
        const num = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(num)) return "0,00 €";
        return num.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
      };
      
      const { generateQuotePDF } = await import("./emailService");
      const pubQuoteTTC = parseFloat(quote.quoteAmount || "0");
      const pubQuoteTax = parseFloat(quote.taxAmount || "0");
      const pubQuoteHT = pubQuoteTax > 0 ? (pubQuoteTTC - pubQuoteTax) : (pubQuoteTTC / 1.2);

      const pdfBuffer = generateQuotePDF({
        quoteNumber: quote.reference || quote.id.slice(0, 8).toUpperCase(),
        quoteDate: quote.createdAt ? new Date(quote.createdAt).toLocaleDateString("fr-FR") : new Date().toLocaleDateString("fr-FR"),
        clientName: client ? (client.companyName || `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email) : "Client",
        status: quote.status,
        items: items.map(item => ({
          description: item.description,
          quantity: parseFloat(item.quantity || "1"),
          unitPrice: parseFloat(item.unitPriceExcludingTax || "0").toFixed(2),
          total: parseFloat(item.totalExcludingTax || "0").toFixed(2),
          taxRate: item.taxRate || "20",
        })),
        amount: formatPrice(quote.quoteAmount),
        totalHT: pubQuoteHT.toFixed(2),
        totalTTC: pubQuoteTTC.toFixed(2),
        companyName: settings?.companyName || "AutoReport",
      });
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="Devis-${quote.reference || quote.id.slice(0, 8)}.pdf"`);
      res.send(pdfBuffer);
    } catch (error: any) {
      console.error("Error generating public quote PDF:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ==================== STRIPE PAYMENT ROUTES ====================

  app.get("/api/payment/config", async (req, res) => {
    const { isStripeConfigured } = await import("./stripeService");
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY_PROD || process.env.STRIPE_PUBLISHABLE_KEY || null;
    res.json({
      stripeConfigured: isStripeConfigured(),
      publishableKey,
      isLiveMode: publishableKey?.startsWith("pk_live_") || false,
    });
  });

  app.post("/api/payment/create-intent", isAuthenticated, async (req: any, res) => {
    try {
      const { invoiceId } = req.body;
      if (!invoiceId || typeof invoiceId !== "string") {
        return res.status(400).json({ message: "invoiceId requis" });
      }

      const invoice = await storage.getInvoice(invoiceId);
      if (!invoice) {
        return res.status(404).json({ message: "Facture introuvable" });
      }

      if (invoice.clientId !== req.user.id && req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Accès non autorisé" });
      }

      if (invoice.status === "paid") {
        return res.status(400).json({ message: "Cette facture est déjà payée" });
      }

      const amount = parseFloat(invoice.amount);
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "Montant de facture invalide" });
      }

      const client = await storage.getUser(invoice.clientId);
      const clientEmail = client?.email || req.user.email || "client@autoreport.com";
      const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() : "Client";

      const { createInstallmentPaymentIntent } = await import("./stripeService");

      const paymentIntent = await createInstallmentPaymentIntent({
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        amount,
        clientEmail,
        clientName,
      });

      // Mark invoice as viewed when intent is created (checkout opened)
      try {
        await storage.updateInvoice(invoice.id, { viewedAt: new Date() });
        console.log(`[Tracking] Invoice ${invoice.id} marked as viewed (Intent)`);
      } catch (err) {
        console.error(`[Tracking] Failed to mark invoice ${invoice.id} as viewed:`, err);
      }

      await db.update(invoices)
        .set({
          stripePaymentIntentId: paymentIntent.id,
          updatedAt: new Date(),
        })
        .where(eq(invoices.id, invoice.id));

      // Mark invoice as viewed when intent is created (checkout opened)
      if (invoiceId) {
        try {
          await storage.updateInvoice(invoiceId, { viewedAt: new Date() });
          console.log(`[Tracking] Invoice ${invoiceId} marked as viewed`);
        } catch (err) {
          console.error(`[Tracking] Failed to mark invoice ${invoiceId} as viewed:`, err);
        }
      }

      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY_PROD || process.env.STRIPE_PUBLISHABLE_KEY || null,
        amount,
        invoiceNumber: invoice.invoiceNumber,
      });
    } catch (error: any) {
      console.error("[Stripe] PaymentIntent error:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la création du paiement" });
    }
  });

  app.post("/api/payment/create-checkout", isAuthenticated, async (req: any, res) => {
    try {
      const { invoiceId, paymentMethods } = req.body;
      if (!invoiceId) {
        return res.status(400).json({ message: "invoiceId requis" });
      }

      const invoice = await storage.getInvoice(invoiceId);
      if (!invoice) {
        return res.status(404).json({ message: "Facture introuvable" });
      }

      if (invoice.clientId !== req.user.id && req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Accès non autorisé" });
      }

      if (invoice.status === "paid") {
        return res.status(400).json({ message: "Cette facture est déjà payée" });
      }

      const amount = parseFloat(invoice.amount);
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "Montant de facture invalide" });
      }

      const client = await storage.getUser(invoice.clientId);
      const clientEmail = client?.email || req.user.email || "client@autoreport.com";
      const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() : "Client";

      const { createCheckoutSession } = await import("./stripeService");
      
      const session = await createCheckoutSession({
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        amount,
        clientEmail,
        clientName,
        description: invoice.productDetails || `Facture ${invoice.invoiceNumber}`,
        successUrl: buildUrl(req, `/payment/success?session_id={CHECKOUT_SESSION_ID}&invoice_id=${invoice.id}`),
        cancelUrl: buildUrl(req, `/payment/cancel?invoice_id=${invoice.id}`),
        paymentMethods: paymentMethods || ["card"],
      });

      // Mark invoice as viewed when checkout session is created
      try {
        await storage.updateInvoice(invoice.id, { viewedAt: new Date() });
        console.log(`[Tracking] Invoice ${invoice.id} marked as viewed (Checkout)`);
      } catch (err) {
        console.error(`[Tracking] Failed to mark invoice ${invoice.id} as viewed:`, err);
      }

      await db.update(invoices)
        .set({ 
          stripeSessionId: session.id,
          paymentLink: session.url,
          updatedAt: new Date(),
        })
        .where(eq(invoices.id, invoice.id));

      // Mark invoice as viewed when checkout session is created
      try {
        await storage.updateInvoice(invoice.id, { viewedAt: new Date() });
        console.log(`[Tracking] Invoice ${invoice.id} marked as viewed`);
      } catch (err) {
        console.error(`[Tracking] Failed to mark invoice ${invoice.id} as viewed:`, err);
      }

      res.json({ 
        sessionId: session.id, 
        url: session.url,
      });
    } catch (error: any) {
      console.error("[Stripe] Checkout error:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la création du paiement" });
    }
  });

  app.get("/api/payment/status/:invoiceId", isAuthenticated, async (req: any, res) => {
    try {
      const invoice = await storage.getInvoice(req.params.invoiceId);
      if (!invoice) {
        return res.status(404).json({ message: "Facture introuvable" });
      }

      if (invoice.clientId !== req.user.id && req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Accès non autorisé" });
      }

      let stripeStatus = null;
      if (invoice.stripeSessionId) {
        const { retrieveSession } = await import("./stripeService");
        const session = await retrieveSession(invoice.stripeSessionId);
        if (session) {
          stripeStatus = {
            paymentStatus: session.payment_status,
            status: session.status,
            amountTotal: session.amount_total ? session.amount_total / 100 : null,
          };
        }
      }

      res.json({
        invoiceId: invoice.id,
        invoiceStatus: invoice.status,
        paymentMethod: invoice.paymentMethod,
        stripeSessionId: invoice.stripeSessionId,
        paymentLink: invoice.paymentLink,
        stripeStatus,
        paidAt: invoice.paidAt,
      });
    } catch (error: any) {
      console.error("[Payment] Status error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/payment/verify/:sessionId", isAuthenticated, async (req: any, res) => {
    try {
      const { retrieveSession } = await import("./stripeService");
      const session = await retrieveSession(req.params.sessionId);
      
      if (!session) {
        return res.status(404).json({ message: "Session de paiement introuvable" });
      }

      const invoiceId = session.metadata?.invoiceId;
      if (!invoiceId) {
        return res.status(400).json({ message: "Aucune facture associée à cette session" });
      }

      if (session.payment_status === "paid") {
        await db.update(invoices)
          .set({
            status: "paid",
            paidAt: new Date(),
            stripePaymentIntentId: session.payment_intent as string,
            paymentMethod: "stripe",
            updatedAt: new Date(),
          })
          .where(eq(invoices.id, invoiceId));

        const invoice = await storage.getInvoice(invoiceId);
        if (invoice) {
          await storage.createNotification({
            userId: invoice.clientId,
            type: "invoice",
            title: "Paiement confirmé",
            message: `Le paiement de la facture ${invoice.invoiceNumber} a été confirmé.`,
            relatedId: invoice.id,
          });

          const wsClient = wsClients.get(invoice.clientId);
          if (wsClient && wsClient.readyState === WebSocket.OPEN) {
            wsClient.send(JSON.stringify({
              type: "payment_confirmed",
              invoiceId: invoice.id,
            }));
          }
        }
      }

      res.json({
        status: session.payment_status,
        invoiceId,
        paid: session.payment_status === "paid",
      });
    } catch (error: any) {
      console.error("[Payment] Verify error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/webhooks/stripe", async (req, res) => {
    try {
      const signature = req.headers["stripe-signature"] as string;
      if (!signature) {
        return res.status(400).json({ message: "Missing stripe-signature header" });
      }

      const { constructWebhookEvent } = await import("./stripeService");
      
      let event;
      try {
        event = constructWebhookEvent(req.body, signature);
      } catch (err: any) {
        console.error("[Stripe Webhook] Signature verification failed:", err.message);
        return res.status(400).json({ message: `Webhook Error: ${err.message}` });
      }

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as any;
          const invoiceId = session.metadata?.invoiceId;
          const planId = session.metadata?.planId;
          const subUserId = session.metadata?.userId;

          // Subscription / plan checkout (AutoReport AI report packs)
          if (planId && session.payment_status === "paid") {
            try {
              const sub = await storage.getSubscriptionBySessionId(session.id);
              if (sub) {
                await storage.updateUserSubscription(sub.id, {
                  status: "active",
                  stripeSubscriptionId: session.subscription || undefined,
                });
                console.log(`[Stripe Webhook] Subscription ${sub.id} activated (plan ${planId})`);
              }
            } catch (e) {
              console.error("[Stripe Webhook] subscription activation error:", e);
            }
          }

          if (invoiceId && session.payment_status === "paid") {
            await db.update(invoices)
              .set({
                status: "paid",
                paidAt: new Date(),
                stripePaymentIntentId: session.payment_intent,
                paymentMethod: "stripe",
                updatedAt: new Date(),
              })
              .where(eq(invoices.id, invoiceId));

            const invoice = await storage.getInvoice(invoiceId);
            if (invoice) {
              const client = await storage.getUser(invoice.clientId);
              const settings = await storage.getApplicationSettings();
              const { sendEmail, generateInvoicePaidEmailHtml } = await import("./emailService");
              const crypto = await import("crypto");
              
              const clientName = `${client?.firstName || ""} ${client?.lastName || ""}`.trim() || client?.email || "";
              let reviewUrl = "";
              
              const existingReviews = await db.select().from(reviews).where(eq(reviews.invoiceId, invoice.id));
              if (existingReviews.length === 0) {
                const reviewToken = crypto.randomBytes(32).toString('hex');
                await db.insert(reviews).values({
                  garageId: invoice.garageId,
                  invoiceId: invoice.id,
                  clientId: invoice.clientId,
                  clientName: clientName,
                  rating: 0,
                  reviewToken: reviewToken,
                });
                reviewUrl = buildUrl(req, `/avis/${reviewToken}`);
              } else if (existingReviews[0].reviewToken) {
                reviewUrl = buildUrl(req, `/avis/${existingReviews[0].reviewToken}`);
              }

              if (client?.email) {
                const paidHtml = generateInvoicePaidEmailHtml({
                  clientName: clientName,
                  invoiceNumber: invoice.invoiceNumber || invoice.id.slice(0, 8).toUpperCase(),
                  amount: invoice.amount || "0",
                  paymentDate: new Date().toLocaleDateString("fr-FR"),
                  companyName: settings?.companyName || "AutoReport",
                  reviewUrl: reviewUrl || undefined
                });

                await sendEmail({
                  to: client.email,
                  subject: `Paiement reçu - Facture ${invoice.invoiceNumber}`,
                  html: paidHtml,
                });

                sendEventSms({
                  userPhone: client.phone,
                  userSmsConsent: client.smsConsent,
                  userName: `${client.firstName || ''} ${client.lastName || ''}`.trim(),
                  userEmail: client.email,
                  eventType: 'invoice_paid',
                  eventTitle: `Paiement reçu - ${invoice.invoiceNumber}`,
                  eventDetails: `Montant : ${invoice.amount || '0'} €. Merci pour votre confiance !`,
                  eventUrl: reviewUrl || undefined,
                });
              }

              await storage.createNotification({
                userId: invoice.clientId,
                type: "invoice",
                title: "Paiement reçu",
                message: `Le paiement de la facture ${invoice.invoiceNumber} a été reçu. Merci !`,
                relatedId: invoice.id,
              });
              sendWsNotification(invoice.clientId, { type: "payment_confirmed", invoiceId: invoice.id });
            }

            console.log(`[Stripe Webhook] Invoice ${invoiceId} marked as paid`);
          }
          break;
        }

        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object as any;
          const invoiceId = paymentIntent.metadata?.invoiceId;
          
          if (invoiceId) {
            let paymentMethodType = "stripe";
            try {
              const { retrievePaymentIntentWithCharge, mapStripePaymentMethod } = await import("./stripeService");
              const fullPI = await retrievePaymentIntentWithCharge(paymentIntent.id);
              if (fullPI) {
                paymentMethodType = mapStripePaymentMethod(fullPI);
              }
            } catch (e) {
              console.error("[Stripe Webhook] Error mapping payment method:", e);
            }

            await db.update(invoices)
              .set({
                status: "paid",
                paidAt: new Date(),
                stripePaymentIntentId: paymentIntent.id,
                paymentMethod: paymentMethodType as any,
                updatedAt: new Date(),
              })
              .where(eq(invoices.id, invoiceId));

            const invoice = await storage.getInvoice(invoiceId);
            if (invoice) {
              const client = await storage.getUser(invoice.clientId);
              const settings = await storage.getApplicationSettings();
              const { sendEmail, generateInvoicePaidEmailHtml } = await import("./emailService");
              const crypto = await import("crypto");
              
              const clientName = `${client?.firstName || ""} ${client?.lastName || ""}`.trim() || client?.email || "";
              let reviewUrl = "";
              
              const existingReviews = await db.select().from(reviews).where(eq(reviews.invoiceId, invoice.id));
              if (existingReviews.length === 0) {
                const reviewToken = crypto.randomBytes(32).toString('hex');
                await db.insert(reviews).values({
                  garageId: invoice.garageId,
                  invoiceId: invoice.id,
                  clientId: invoice.clientId,
                  clientName: clientName,
                  rating: 0,
                  reviewToken: reviewToken,
                });
                reviewUrl = buildUrl(req, `/avis/${reviewToken}`);
              } else if (existingReviews[0].reviewToken) {
                reviewUrl = buildUrl(req, `/avis/${existingReviews[0].reviewToken}`);
              }

              if (client?.email) {
                const paidHtml = generateInvoicePaidEmailHtml({
                  clientName: clientName,
                  invoiceNumber: invoice.invoiceNumber || invoice.id.slice(0, 8).toUpperCase(),
                  amount: invoice.amount || "0",
                  paymentDate: new Date().toLocaleDateString("fr-FR"),
                  companyName: settings?.companyName || "AutoReport",
                  reviewUrl: reviewUrl || undefined
                });

                await sendEmail({
                  to: client.email,
                  subject: `Paiement reçu - Facture ${invoice.invoiceNumber}`,
                  html: paidHtml,
                });
              }

              await storage.createNotification({
                userId: invoice.clientId,
                type: "invoice",
                title: "Paiement reçu",
                message: `Le paiement de la facture ${invoice.invoiceNumber} a été confirmé via ${paymentMethodType === "klarna" ? "Klarna" : paymentMethodType === "alma" ? "Alma" : "Stripe"}.`,
                relatedId: invoice.id,
              });

              const wsClient = wsClients.get(invoice.clientId);
              if (wsClient && wsClient.readyState === WebSocket.OPEN) {
                wsClient.send(JSON.stringify({
                  type: "payment_confirmed",
                  invoiceId: invoice.id,
                  paymentMethod: paymentMethodType,
                }));
              }
            }

            console.log(`[Stripe Webhook] PaymentIntent ${paymentIntent.id} succeeded for invoice ${invoiceId} (method: ${paymentMethodType})`);
          }
          break;
        }

        case "payment_intent.canceled": {
          const paymentIntent = event.data.object as any;
          const invoiceId = paymentIntent.metadata?.invoiceId;
          console.log(`[Stripe Webhook] PaymentIntent ${paymentIntent.id} canceled for invoice ${invoiceId}`);
          break;
        }

        case "payment_intent.payment_failed": {
          const paymentIntent = event.data.object as any;
          const invoiceId = paymentIntent.metadata?.invoiceId;
          console.log(`[Stripe Webhook] Payment failed for invoice ${invoiceId}: ${paymentIntent.last_payment_error?.message}`);
          break;
        }

        default:
          console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error("[Stripe Webhook] Error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/payment/generate-link", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { invoiceId, paymentMethods } = req.body;
      if (!invoiceId) {
        return res.status(400).json({ message: "invoiceId requis" });
      }

      const invoice = await storage.getInvoice(invoiceId);
      if (!invoice) {
        return res.status(404).json({ message: "Facture introuvable" });
      }

      if (invoice.status === "paid") {
        return res.status(400).json({ message: "Facture déjà payée" });
      }

      const client = await storage.getUser(invoice.clientId);
      const clientEmail = client?.email || "client@autoreport.com";
      const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() : "Client";

      const { createCheckoutSession } = await import("./stripeService");
      
      const session = await createCheckoutSession({
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        amount: parseFloat(invoice.amount),
        clientEmail,
        clientName,
        description: invoice.productDetails || `Facture ${invoice.invoiceNumber}`,
        successUrl: buildUrl(req, `/payment/success?session_id={CHECKOUT_SESSION_ID}&invoice_id=${invoice.id}`),
        cancelUrl: buildUrl(req, `/payment/cancel?invoice_id=${invoice.id}`),
        paymentMethods: paymentMethods || ["card"],
      });

      await db.update(invoices)
        .set({ 
          stripeSessionId: session.id,
          paymentLink: session.url,
          updatedAt: new Date(),
        })
        .where(eq(invoices.id, invoice.id));

      res.json({ 
        sessionId: session.id,
        paymentLink: session.url,
        invoiceNumber: invoice.invoiceNumber,
      });
    } catch (error: any) {
      console.error("[Payment] Generate link error:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la génération du lien de paiement" });
    }
  });

  app.get("/api/admin/payments", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const allInvoices = await storage.getInvoices();
      const paidInvoices = allInvoices.filter(i => i.stripePaymentIntentId || i.paymentMethod === "stripe" || i.paymentMethod === "sepa" || i.paymentMethod === "klarna" || i.paymentMethod === "alma");
      
      const payments = [];
      for (const inv of paidInvoices) {
        const client = await storage.getUser(inv.clientId);
        payments.push({
          invoiceId: inv.id,
          invoiceNumber: inv.invoiceNumber,
          amount: inv.amount,
          status: inv.status,
          paymentMethod: inv.paymentMethod,
          stripePaymentIntentId: inv.stripePaymentIntentId,
          paidAt: inv.paidAt,
          clientName: client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() : "N/A",
          clientEmail: client?.email || "N/A",
          createdAt: inv.createdAt,
        });
      }

      res.json(payments);
    } catch (error: any) {
      console.error("[Payments] List error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // ========== ACCOUNTING MODULE ROUTES ==========

  // ===== EXPENSE CATEGORIES =====
  app.get("/api/admin/expense-categories", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const categories = await storage.getExpenseCategories(garageId);
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/expense-categories", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const data = { ...req.body, garageId: req.user?.garageId || null };
      const category = await storage.createExpenseCategory(data);
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/admin/expense-categories/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const category = await storage.updateExpenseCategory(req.params.id, req.body);
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/admin/expense-categories/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      await storage.deleteExpenseCategory(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // ===== EXPENSES =====
  app.get("/api/admin/expenses", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const allExpenses = await storage.getExpenses(garageId);
      res.json(allExpenses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/expenses/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const expense = await storage.getExpense(req.params.id);
      if (!expense) return res.status(404).json({ message: "Dépense non trouvée" });
      res.json(expense);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/expenses", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const year = new Date().getFullYear();
      const expenseNumber = await storage.getNextExpenseNumber(year);
      const data = {
        ...req.body,
        expenseNumber,
        garageId: req.user?.garageId || null,
      };
      const expense = await storage.createExpense(data);

      // Auto-generate accounting entry for the expense
      await createAccountingEntryForExpense(expense, req.user);

      res.json(expense);
    } catch (error: any) {
      console.error("Error creating expense:", error);
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/admin/expenses/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const expense = await storage.updateExpense(req.params.id, req.body);
      res.json(expense);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/admin/expenses/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      await storage.deleteExpense(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // ===== CREDIT NOTES (AVOIRS) =====
  app.get("/api/admin/credit-notes", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const notes = await storage.getCreditNotes(garageId);
      res.json(notes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/credit-notes/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const note = await storage.getCreditNote(req.params.id);
      if (!note) return res.status(404).json({ message: "Avoir non trouvé" });
      const items = await storage.getCreditNoteItems(req.params.id);
      res.json({ ...note, items });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/credit-notes", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { items, ...noteData } = req.body;
      const year = new Date().getFullYear();
      const creditNoteNumber = await storage.getNextCreditNoteNumber(year);

      const creditNote = await storage.createCreditNote({
        ...noteData,
        creditNoteNumber,
        garageId: req.user?.garageId || null,
      });

      if (items && Array.isArray(items)) {
        for (const item of items) {
          await storage.createCreditNoteItem({
            ...item,
            creditNoteId: creditNote.id,
          });
        }
      }

      // Auto-generate accounting entry for the credit note
      await createAccountingEntryForCreditNote(creditNote, req.user);

      res.json(creditNote);
    } catch (error: any) {
      console.error("Error creating credit note:", error);
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/admin/credit-notes/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const note = await storage.updateCreditNote(req.params.id, req.body);
      res.json(note);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // ===== ACCOUNTING ENTRIES =====
  app.get("/api/admin/accounting/entries", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const filters: any = {};
      if (req.query.journal) filters.journal = req.query.journal;
      if (req.query.startDate) filters.startDate = new Date(req.query.startDate as string);
      if (req.query.endDate) filters.endDate = new Date(req.query.endDate as string);
      const entries = await storage.getAccountingEntries(garageId, filters);
      res.json(entries);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/accounting/entries/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const entry = await storage.getAccountingEntry(req.params.id);
      if (!entry) return res.status(404).json({ message: "Écriture non trouvée" });
      const lines = await storage.getAccountingLines(req.params.id);
      res.json({ ...entry, lines });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/accounting/entries", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { lines, ...entryData } = req.body;
      const year = new Date(entryData.date).getFullYear();
      const entryNumber = await storage.getNextEntryNumber(year);

      let totalDebit = 0;
      let totalCredit = 0;
      if (lines && Array.isArray(lines)) {
        for (const line of lines) {
          totalDebit += parseFloat(line.debit || "0");
          totalCredit += parseFloat(line.credit || "0");
        }
      }

      const entry = await storage.createAccountingEntry({
        ...entryData,
        entryNumber,
        totalDebit: String(totalDebit),
        totalCredit: String(totalCredit),
        garageId: req.user?.garageId || null,
      });

      if (lines && Array.isArray(lines)) {
        for (const line of lines) {
          await storage.createAccountingLine({
            ...line,
            entryId: entry.id,
          });
        }
      }

      res.json(entry);
    } catch (error: any) {
      console.error("Error creating accounting entry:", error);
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/admin/accounting/entries/:id/validate", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const entry = await storage.updateAccountingEntry(req.params.id, {
        isValidated: true,
        validatedAt: new Date(),
        validatedBy: req.user.id,
      } as any);
      res.json(entry);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/admin/accounting/backfill-invoices", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const allInvoices = await storage.getInvoices(undefined, garageId);
      const paidInvoices = allInvoices.filter(inv => inv.status === "paid");
      
      const existingEntries = await storage.getAccountingEntries(garageId, { sourceType: "invoice" });
      const existingInvoiceIds = new Set(existingEntries.map(e => e.sourceId));
      
      const invoicesToBackfill = paidInvoices.filter(inv => !existingInvoiceIds.has(inv.id));
      
      let createdCount = 0;
      for (const invoice of invoicesToBackfill) {
        try {
          const year = new Date(invoice.paidAt || invoice.createdAt || new Date()).getFullYear();
          const entryNumber = await storage.getNextEntryNumber(year);
          const ht = parseFloat(invoice.priceExcludingTax || invoice.amount || "0");
          const tva = parseFloat(invoice.taxAmount || "0");
          const ttc = parseFloat(invoice.amount || "0");
          const paymentMethod = invoice.paymentMethod || "wire_transfer";
          const bankAccount = paymentMethod === "cash" ? "530000" : "512000";
          const bankLabel = paymentMethod === "cash" ? "Caisse" : "Banque";

          const entry = await storage.createAccountingEntry({
            garageId: invoice.garageId || null,
            entryNumber,
            date: invoice.paidAt || invoice.createdAt || new Date(),
            journal: "sales",
            sourceType: "invoice",
            sourceId: invoice.id,
            description: `Facture ${invoice.invoiceNumber} payée (backfill)`,
            totalDebit: String(ttc),
            totalCredit: String(ttc),
          });

          await storage.createAccountingLine({
            entryId: entry.id,
            accountCode: bankAccount,
            accountLabel: bankLabel,
            description: `Encaissement facture ${invoice.invoiceNumber}`,
            debit: String(ttc),
            credit: "0",
          });

          await storage.createAccountingLine({
            entryId: entry.id,
            accountCode: "706000",
            accountLabel: "Prestations de services",
            description: `Vente ${invoice.invoiceNumber}`,
            debit: "0",
            credit: String(ht),
          });

          if (tva > 0) {
            await storage.createAccountingLine({
              entryId: entry.id,
              accountCode: "445710",
              accountLabel: "TVA collectée",
              description: `TVA facture ${invoice.invoiceNumber}`,
              debit: "0",
              credit: String(tva),
            });
          }
          createdCount++;
        } catch (err) {
          console.error(`Error backfilling invoice ${invoice.id}:`, err);
        }
      }
      
      res.json({ message: `${createdCount} écritures comptables générées pour les factures existantes.`, count: createdCount });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // TVA Report
  app.get("/api/admin/accounting/tva-report", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date(new Date().getFullYear(), 0, 1);
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();

      const allInvoices = await storage.getInvoices(undefined, garageId);
      const allExpenses = await storage.getExpenses(garageId);
      const allCreditNotes = await storage.getCreditNotes(garageId);

      const filteredInvoices = allInvoices.filter(inv => {
        const d = new Date(inv.createdAt || 0);
        return d >= startDate && d <= endDate && inv.status === "paid";
      });

      const filteredExpenses = allExpenses.filter(exp => {
        const d = new Date(exp.date);
        return d >= startDate && d <= endDate && exp.status === "paid";
      });

      const filteredCreditNotes = allCreditNotes.filter(cn => {
        const d = new Date(cn.createdAt || 0);
        return d >= startDate && d <= endDate && (cn.status === "issued" || cn.status === "refunded");
      });

      // TVA collectée (from sales invoices)
      let tvaCollected = 0;
      let salesHT = 0;
      for (const inv of filteredInvoices) {
        tvaCollected += parseFloat(inv.taxAmount || "0");
        salesHT += parseFloat(inv.priceExcludingTax || inv.amount || "0");
      }

      // TVA déductible (from expenses)
      let tvaDeductible = 0;
      let purchasesHT = 0;
      for (const exp of filteredExpenses) {
        tvaDeductible += parseFloat(exp.taxAmount || "0");
        purchasesHT += parseFloat(exp.amountHT || "0");
      }

      // TVA avoirs
      let tvaCreditNotes = 0;
      for (const cn of filteredCreditNotes) {
        tvaCreditNotes += parseFloat(cn.taxAmount || "0");
      }

      const tvaNet = tvaCollected - tvaDeductible - tvaCreditNotes;

      // Breakdown by rate
      const tvaByRate: Record<string, { collected: number; deductible: number; net: number }> = {};
      for (const inv of filteredInvoices) {
        const rate = inv.taxRate || "20.00";
        if (!tvaByRate[rate]) tvaByRate[rate] = { collected: 0, deductible: 0, net: 0 };
        tvaByRate[rate].collected += parseFloat(inv.taxAmount || "0");
      }
      for (const exp of filteredExpenses) {
        const rate = exp.taxRate || "20.00";
        if (!tvaByRate[rate]) tvaByRate[rate] = { collected: 0, deductible: 0, net: 0 };
        tvaByRate[rate].deductible += parseFloat(exp.taxAmount || "0");
      }
      for (const rate of Object.keys(tvaByRate)) {
        tvaByRate[rate].net = tvaByRate[rate].collected - tvaByRate[rate].deductible;
      }

      res.json({
        period: { startDate, endDate },
        salesHT,
        purchasesHT,
        tvaCollected,
        tvaDeductible,
        tvaCreditNotes,
        tvaNet,
        tvaByRate,
        invoiceCount: filteredInvoices.length,
        expenseCount: filteredExpenses.length,
        creditNoteCount: filteredCreditNotes.length,
      });
    } catch (error: any) {
      console.error("Error generating TVA report:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Profit & Loss (Compte de résultat)
  app.get("/api/admin/accounting/profit-loss", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date(new Date().getFullYear(), 0, 1);
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();

      const allInvoices = await storage.getInvoices(undefined, garageId);
      const allExpenses = await storage.getExpenses(garageId);
      const allCreditNotes = await storage.getCreditNotes(garageId);
      const categories = await storage.getExpenseCategories(garageId);

      const filteredInvoices = allInvoices.filter(inv => {
        const d = new Date(inv.createdAt || 0);
        return d >= startDate && d <= endDate && inv.status === "paid";
      });

      const filteredExpenses = allExpenses.filter(exp => {
        const d = new Date(exp.date);
        return d >= startDate && d <= endDate && exp.status === "paid";
      });

      const filteredCreditNotes = allCreditNotes.filter(cn => {
        const d = new Date(cn.createdAt || 0);
        return d >= startDate && d <= endDate && (cn.status === "issued" || cn.status === "refunded");
      });

      // Revenue (Produits)
      let totalRevenue = 0;
      const revenueByMonth: Record<string, number> = {};
      for (const inv of filteredInvoices) {
        const ht = parseFloat(inv.priceExcludingTax || inv.amount || "0");
        totalRevenue += ht;
        const month = new Date(inv.createdAt || 0).toISOString().slice(0, 7);
        revenueByMonth[month] = (revenueByMonth[month] || 0) + ht;
      }

      // Credit note adjustments
      let totalCreditNotes = 0;
      for (const cn of filteredCreditNotes) {
        totalCreditNotes += parseFloat(cn.totalHT || "0");
      }

      // Expenses by category
      let totalExpenses = 0;
      const expensesByCategory: Record<string, { name: string; total: number; count: number }> = {};
      const expensesByMonth: Record<string, number> = {};
      for (const exp of filteredExpenses) {
        const ht = parseFloat(exp.amountHT || "0");
        totalExpenses += ht;
        const month = new Date(exp.date).toISOString().slice(0, 7);
        expensesByMonth[month] = (expensesByMonth[month] || 0) + ht;

        const catName = exp.categoryId
          ? categories.find(c => c.id === exp.categoryId)?.name || "Autre"
          : "Non catégorisé";
        if (!expensesByCategory[catName]) expensesByCategory[catName] = { name: catName, total: 0, count: 0 };
        expensesByCategory[catName].total += ht;
        expensesByCategory[catName].count++;
      }

      const netRevenue = totalRevenue - totalCreditNotes;
      const netProfit = netRevenue - totalExpenses;
      const margin = netRevenue > 0 ? (netProfit / netRevenue) * 100 : 0;

      res.json({
        period: { startDate, endDate },
        revenue: { total: totalRevenue, creditNotes: totalCreditNotes, net: netRevenue, byMonth: revenueByMonth },
        expenses: { total: totalExpenses, byCategory: Object.values(expensesByCategory), byMonth: expensesByMonth },
        netProfit,
        margin: Math.round(margin * 100) / 100,
        invoiceCount: filteredInvoices.length,
        expenseCount: filteredExpenses.length,
      });
    } catch (error: any) {
      console.error("Error generating P&L report:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Cash Flow
  app.get("/api/admin/accounting/cash-flow", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date(new Date().getFullYear(), 0, 1);
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();

      const allInvoices = await storage.getInvoices(undefined, garageId);
      const allExpenses = await storage.getExpenses(garageId);

      const paidInvoices = allInvoices.filter(inv => {
        const d = new Date(inv.paidAt || inv.createdAt || 0);
        return d >= startDate && d <= endDate && inv.status === "paid";
      });

      const paidExpenses = allExpenses.filter(exp => {
        const d = new Date(exp.date);
        return d >= startDate && d <= endDate && exp.status === "paid";
      });

      // Build monthly cash flow
      const cashFlowByMonth: Record<string, { month: string; inflows: number; outflows: number; net: number }> = {};

      for (const inv of paidInvoices) {
        const month = new Date(inv.paidAt || inv.createdAt || 0).toISOString().slice(0, 7);
        if (!cashFlowByMonth[month]) cashFlowByMonth[month] = { month, inflows: 0, outflows: 0, net: 0 };
        cashFlowByMonth[month].inflows += parseFloat(inv.amount || "0");
      }

      for (const exp of paidExpenses) {
        const month = new Date(exp.date).toISOString().slice(0, 7);
        if (!cashFlowByMonth[month]) cashFlowByMonth[month] = { month, inflows: 0, outflows: 0, net: 0 };
        cashFlowByMonth[month].outflows += parseFloat(exp.amountTTC || "0");
      }

      for (const key of Object.keys(cashFlowByMonth)) {
        cashFlowByMonth[key].net = cashFlowByMonth[key].inflows - cashFlowByMonth[key].outflows;
      }

      const sortedMonths = Object.values(cashFlowByMonth).sort((a, b) => a.month.localeCompare(b.month));

      const totalInflows = sortedMonths.reduce((s, m) => s + m.inflows, 0);
      const totalOutflows = sortedMonths.reduce((s, m) => s + m.outflows, 0);

      // By payment method
      const inflowsByMethod: Record<string, number> = {};
      for (const inv of paidInvoices) {
        const method = inv.paymentMethod || "other";
        inflowsByMethod[method] = (inflowsByMethod[method] || 0) + parseFloat(inv.amount || "0");
      }

      const outflowsByMethod: Record<string, number> = {};
      for (const exp of paidExpenses) {
        const method = exp.paymentMethod || "other";
        outflowsByMethod[method] = (outflowsByMethod[method] || 0) + parseFloat(exp.amountTTC || "0");
      }

      res.json({
        period: { startDate, endDate },
        totalInflows,
        totalOutflows,
        netCashFlow: totalInflows - totalOutflows,
        byMonth: sortedMonths,
        inflowsByMethod,
        outflowsByMethod,
      });
    } catch (error: any) {
      console.error("Error generating cash flow:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // FEC Export
  app.post("/api/admin/accounting/fec-export", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { startDate, endDate } = req.body;
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;

      const start = new Date(startDate);
      const end = new Date(endDate);

      const entries = await storage.getAccountingEntries(garageId, { startDate: start, endDate: end });

      // Build FEC format lines
      const fecLines: string[] = [];
      fecLines.push("JournalCode|JournalLib|EcritureNum|EcritureDate|CompteNum|CompteLib|CompAuxNum|CompAuxLib|PieceRef|PieceDate|EcritureLib|Debit|Credit|EcritureLet|DateLet|ValidDate|Montantdevise|Idevise");

      for (const entry of entries) {
        const lines = await storage.getAccountingLines(entry.id);
        for (const line of lines) {
          const dateStr = new Date(entry.date).toISOString().slice(0, 10).replace(/-/g, '');
          fecLines.push([
            entry.journal?.toUpperCase() || "VE",
            entry.journal === "sales" ? "Journal des ventes" : entry.journal === "purchases" ? "Journal des achats" : entry.journal === "bank" ? "Journal de banque" : entry.journal === "cash" ? "Journal de caisse" : "Journal divers",
            entry.entryNumber,
            dateStr,
            line.accountCode,
            line.accountLabel,
            "",
            "",
            entry.sourceId || "",
            dateStr,
            line.description || entry.description,
            parseFloat(line.debit || "0").toFixed(2).replace('.', ','),
            parseFloat(line.credit || "0").toFixed(2).replace('.', ','),
            "",
            "",
            entry.isValidated ? dateStr : "",
            "",
            "EUR",
          ].join("|"));
        }
      }

      const fecContent = fecLines.join("\n");
      const fileName = `FEC_${start.toISOString().slice(0, 10)}_${end.toISOString().slice(0, 10)}.txt`;

      // Store export record
      await storage.createFecExport({
        garageId: garageId || null,
        periodStart: start,
        periodEnd: end,
        entryCount: entries.length,
        totalDebit: String(entries.reduce((s, e) => s + parseFloat(e.totalDebit || "0"), 0)),
        totalCredit: String(entries.reduce((s, e) => s + parseFloat(e.totalCredit || "0"), 0)),
        fileName,
        generatedBy: req.user.id,
      });

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.send(fecContent);
    } catch (error: any) {
      console.error("Error generating FEC export:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/accounting/fec-exports", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const exports = await storage.getFecExports(garageId);
      res.json(exports);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ===== ACCOUNTING DOSSIER (Dossier Comptable Complet) =====

  app.get("/api/admin/accounting/dossier-validation", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const { startDate, endDate } = req.query;
      const start = startDate ? new Date(startDate as string) : new Date(new Date().getFullYear(), 0, 1);
      const end = endDate ? new Date(endDate as string) : new Date();

      const garage = garageId ? await storage.getGarage(garageId) : null;
      const invoices = await storage.getInvoices(garageId);
      const expenses = await storage.getExpenses(garageId);
      const creditNotes = await storage.getCreditNotes(garageId);
      const entries = await storage.getAccountingEntries(garageId, { startDate: start, endDate: end });

      const warnings: Array<{ severity: "error" | "warning" | "info"; category: string; message: string; count?: number }> = [];

      if (garage) {
        if (!garage.siret) warnings.push({ severity: "error", category: "garage", message: "SIRET du garage non renseigné" });
        if (!garage.tvaNumber) warnings.push({ severity: "error", category: "garage", message: "N° TVA intracommunautaire manquant" });
        if (!garage.address) warnings.push({ severity: "warning", category: "garage", message: "Adresse du garage manquante" });
        if (!garage.iban) warnings.push({ severity: "warning", category: "garage", message: "IBAN bancaire non renseigné" });
        if (!garage.legalForm) warnings.push({ severity: "info", category: "garage", message: "Forme juridique non renseignée" });
        if (!garage.capitalSocial) warnings.push({ severity: "info", category: "garage", message: "Capital social non renseigné" });
        if (!garage.nafCode) warnings.push({ severity: "info", category: "garage", message: "Code NAF non renseigné" });
        if (!garage.rcsCity) warnings.push({ severity: "info", category: "garage", message: "Ville RCS non renseignée" });
      }

      const invoicesWithoutClient = invoices.filter(i => !i.clientId);
      if (invoicesWithoutClient.length > 0) {
        warnings.push({ severity: "error", category: "invoices", message: "Factures sans client associé", count: invoicesWithoutClient.length });
      }

      const invoicesWithoutHT = invoices.filter(i => !i.priceExcludingTax || parseFloat(i.priceExcludingTax) === 0);
      if (invoicesWithoutHT.length > 0) {
        warnings.push({ severity: "warning", category: "invoices", message: "Factures sans montant HT", count: invoicesWithoutHT.length });
      }

      const invoicesWithoutDueDate = invoices.filter(i => !i.dueDate);
      if (invoicesWithoutDueDate.length > 0) {
        warnings.push({ severity: "warning", category: "invoices", message: "Factures sans date d'échéance", count: invoicesWithoutDueDate.length });
      }

      const invoicesWithoutPayment = invoices.filter(i => !i.paymentMethod);
      if (invoicesWithoutPayment.length > 0) {
        warnings.push({ severity: "info", category: "invoices", message: "Factures sans mode de paiement", count: invoicesWithoutPayment.length });
      }

      const expensesWithoutCategory = expenses.filter(e => !e.categoryId);
      if (expensesWithoutCategory.length > 0) {
        warnings.push({ severity: "warning", category: "expenses", message: "Dépenses sans catégorie", count: expensesWithoutCategory.length });
      }

      const expensesWithoutReceipt = expenses.filter(e => !e.receiptPath);
      if (expensesWithoutReceipt.length > 0) {
        warnings.push({ severity: "info", category: "expenses", message: "Dépenses sans justificatif", count: expensesWithoutReceipt.length });
      }

      const unvalidatedEntries = entries.filter(e => !e.isValidated);
      if (unvalidatedEntries.length > 0) {
        warnings.push({ severity: "warning", category: "entries", message: "Écritures comptables non validées", count: unvalidatedEntries.length });
      }

      const creditNotesWithoutInvoice = creditNotes.filter(cn => !cn.invoiceId);
      if (creditNotesWithoutInvoice.length > 0) {
        warnings.push({ severity: "warning", category: "creditNotes", message: "Avoirs sans facture associée", count: creditNotesWithoutInvoice.length });
      }

      const errorCount = warnings.filter(w => w.severity === "error").length;
      const warningCount = warnings.filter(w => w.severity === "warning").length;
      const infoCount = warnings.filter(w => w.severity === "info").length;

      const summary = {
        invoiceCount: invoices.length,
        expenseCount: expenses.length,
        creditNoteCount: creditNotes.length,
        entryCount: entries.length,
        validatedEntryCount: entries.filter(e => e.isValidated).length,
      };

      res.json({ warnings, errorCount, warningCount, infoCount, summary, isReady: errorCount === 0 });
    } catch (error: any) {
      console.error("Error validating dossier:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/accounting/dossier-export", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { startDate, endDate } = req.body;
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const garage = garageId ? await storage.getGarage(garageId) : null;

      const invoices = await storage.getInvoices(garageId);
      const expenses = await storage.getExpenses(garageId);
      const creditNotes = await storage.getCreditNotes(garageId);
      const entries = await storage.getAccountingEntries(garageId, { startDate: start, endDate: end });

      const periodInvoices = invoices.filter(i => {
        const d = i.createdAt ? new Date(i.createdAt) : null;
        return d && d >= start && d <= end;
      });
      const periodExpenses = expenses.filter(e => {
        const d = e.date ? new Date(e.date) : null;
        return d && d >= start && d <= end;
      });
      const periodCreditNotes = creditNotes.filter(cn => {
        const d = cn.createdAt ? new Date(cn.createdAt) : null;
        return d && d >= start && d <= end;
      });

      const totalRevenueHT = periodInvoices.reduce((s, i) => s + parseFloat(i.priceExcludingTax || "0"), 0);
      const totalRevenueTTC = periodInvoices.reduce((s, i) => s + parseFloat(i.amount || "0"), 0);
      const totalTVACollected = periodInvoices.reduce((s, i) => s + parseFloat(i.taxAmount || "0"), 0);
      const totalExpensesHT = periodExpenses.reduce((s, e) => s + parseFloat(e.amountHT || "0"), 0);
      const totalExpensesTTC = periodExpenses.reduce((s, e) => s + parseFloat(e.amountTTC || "0"), 0);
      const totalTVADeductible = periodExpenses.reduce((s, e) => s + parseFloat(e.taxAmount || "0"), 0);
      const totalCreditNotesHT = periodCreditNotes.reduce((s, cn) => s + parseFloat(cn.totalHT || "0"), 0);

      const dossierContent = [];
      dossierContent.push("═══════════════════════════════════════════════════════════════");
      dossierContent.push("              DOSSIER COMPTABLE COMPLET");
      dossierContent.push("═══════════════════════════════════════════════════════════════");
      dossierContent.push("");
      dossierContent.push(`Période : du ${start.toLocaleDateString("fr-FR")} au ${end.toLocaleDateString("fr-FR")}`);
      dossierContent.push(`Généré le : ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}`);
      dossierContent.push("");

      if (garage) {
        dossierContent.push("───────────────────────────────────────────────────────────────");
        dossierContent.push("1. IDENTIFICATION DE L'ENTREPRISE");
        dossierContent.push("───────────────────────────────────────────────────────────────");
        dossierContent.push(`Raison sociale    : ${garage.name || "Non renseigné"}`);
        dossierContent.push(`SIRET             : ${garage.siret || "Non renseigné"}`);
        dossierContent.push(`N° TVA            : ${garage.tvaNumber || "Non renseigné"}`);
        dossierContent.push(`Adresse           : ${garage.address || "Non renseigné"}`);
        dossierContent.push(`Téléphone         : ${garage.phone || "Non renseigné"}`);
        dossierContent.push(`Email             : ${garage.email || "Non renseigné"}`);
        dossierContent.push(`Forme juridique   : ${garage.legalForm || "Non renseigné"}`);
        dossierContent.push(`Capital social    : ${garage.capitalSocial || "Non renseigné"}`);
        dossierContent.push(`Code NAF          : ${garage.nafCode || "Non renseigné"}`);
        dossierContent.push(`RCS               : ${garage.rcsCity || "Non renseigné"}`);
        dossierContent.push(`IBAN              : ${garage.iban || "Non renseigné"}`);
        dossierContent.push(`BIC/SWIFT         : ${garage.swift || "Non renseigné"}`);
        dossierContent.push("");
      }

      dossierContent.push("───────────────────────────────────────────────────────────────");
      dossierContent.push("2. COMPTE DE RÉSULTAT SIMPLIFIÉ");
      dossierContent.push("───────────────────────────────────────────────────────────────");
      dossierContent.push(`Chiffre d'affaires HT        : ${totalRevenueHT.toFixed(2)} €`);
      dossierContent.push(`Avoirs émis                   : -${totalCreditNotesHT.toFixed(2)} €`);
      dossierContent.push(`CA net HT                     : ${(totalRevenueHT - totalCreditNotesHT).toFixed(2)} €`);
      dossierContent.push(`Charges HT                    : -${totalExpensesHT.toFixed(2)} €`);
      dossierContent.push(`Résultat net                  : ${(totalRevenueHT - totalCreditNotesHT - totalExpensesHT).toFixed(2)} €`);
      dossierContent.push(`Marge (%)                     : ${totalRevenueHT > 0 ? ((1 - totalExpensesHT / totalRevenueHT) * 100).toFixed(1) : "0.0"}%`);
      dossierContent.push("");

      dossierContent.push("───────────────────────────────────────────────────────────────");
      dossierContent.push("3. DÉCLARATION DE TVA");
      dossierContent.push("───────────────────────────────────────────────────────────────");
      dossierContent.push(`TVA collectée (ventes)        : ${totalTVACollected.toFixed(2)} €`);
      dossierContent.push(`TVA déductible (achats)       : ${totalTVADeductible.toFixed(2)} €`);
      dossierContent.push(`TVA nette à payer             : ${(totalTVACollected - totalTVADeductible).toFixed(2)} €`);
      dossierContent.push("");

      dossierContent.push("───────────────────────────────────────────────────────────────");
      dossierContent.push("4. SYNTHÈSE DES OPÉRATIONS");
      dossierContent.push("───────────────────────────────────────────────────────────────");
      dossierContent.push(`Factures émises               : ${periodInvoices.length}`);
      dossierContent.push(`  - Total HT                  : ${totalRevenueHT.toFixed(2)} €`);
      dossierContent.push(`  - Total TTC                 : ${totalRevenueTTC.toFixed(2)} €`);
      dossierContent.push(`Dépenses enregistrées         : ${periodExpenses.length}`);
      dossierContent.push(`  - Total HT                  : ${totalExpensesHT.toFixed(2)} €`);
      dossierContent.push(`  - Total TTC                 : ${totalExpensesTTC.toFixed(2)} €`);
      dossierContent.push(`Avoirs émis                   : ${periodCreditNotes.length}`);
      dossierContent.push(`  - Total HT                  : ${totalCreditNotesHT.toFixed(2)} €`);
      dossierContent.push(`Écritures comptables          : ${entries.length}`);
      dossierContent.push(`  - Validées                  : ${entries.filter(e => e.isValidated).length}`);
      dossierContent.push(`  - Brouillons                : ${entries.filter(e => !e.isValidated).length}`);
      dossierContent.push("");

      dossierContent.push("───────────────────────────────────────────────────────────────");
      dossierContent.push("5. DÉTAIL DES FACTURES");
      dossierContent.push("───────────────────────────────────────────────────────────────");
      for (const inv of periodInvoices.slice(0, 200)) {
        const client = inv.clientId ? await storage.getUser(inv.clientId) : null;
        const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email : "Inconnu";
        dossierContent.push(`${inv.invoiceNumber || "N/A"} | ${inv.createdAt ? new Date(inv.createdAt).toLocaleDateString("fr-FR") : "N/A"} | ${clientName} | HT: ${parseFloat(inv.priceExcludingTax || "0").toFixed(2)}€ | TTC: ${parseFloat(inv.amount || "0").toFixed(2)}€ | ${inv.status || "N/A"}`);
      }
      dossierContent.push("");

      dossierContent.push("───────────────────────────────────────────────────────────────");
      dossierContent.push("6. DÉTAIL DES DÉPENSES");
      dossierContent.push("───────────────────────────────────────────────────────────────");
      for (const exp of periodExpenses.slice(0, 200)) {
        dossierContent.push(`${exp.expenseNumber || "N/A"} | ${exp.date ? new Date(exp.date).toLocaleDateString("fr-FR") : "N/A"} | ${exp.supplier || "N/A"} | ${exp.description || "N/A"} | HT: ${parseFloat(exp.amountHT || "0").toFixed(2)}€ | TTC: ${parseFloat(exp.amountTTC || "0").toFixed(2)}€`);
      }
      dossierContent.push("");

      if (periodCreditNotes.length > 0) {
        dossierContent.push("───────────────────────────────────────────────────────────────");
        dossierContent.push("7. DÉTAIL DES AVOIRS");
        dossierContent.push("───────────────────────────────────────────────────────────────");
        for (const cn of periodCreditNotes.slice(0, 200)) {
          const client = cn.clientId ? await storage.getUser(cn.clientId) : null;
          const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email : "Inconnu";
          dossierContent.push(`${cn.creditNoteNumber || "N/A"} | ${cn.createdAt ? new Date(cn.createdAt).toLocaleDateString("fr-FR") : "N/A"} | ${clientName} | ${cn.reason || "N/A"} | HT: ${parseFloat(cn.totalHT || "0").toFixed(2)}€`);
        }
        dossierContent.push("");
      }

      dossierContent.push("═══════════════════════════════════════════════════════════════");
      dossierContent.push("Fin du dossier comptable");
      dossierContent.push("═══════════════════════════════════════════════════════════════");

      const content = dossierContent.join("\n");
      const fileName = `Dossier_Comptable_${start.toISOString().slice(0, 10)}_${end.toISOString().slice(0, 10)}.txt`;

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.send(content);
    } catch (error: any) {
      console.error("Error generating dossier export:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // ===== NOTIFICATION RULES (Rappels & Notifications paramétrables) =====

  app.get("/api/admin/notification-rules", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const rules = await storage.getNotificationRules(garageId);
      res.json(rules);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/notification-rules/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const rule = await storage.getNotificationRule(req.params.id);
      if (!rule) return res.status(404).json({ message: "Règle non trouvée" });
      res.json(rule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/notification-rules", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? req.body.garageId : req.user?.garageId;
      const rule = await storage.createNotificationRule({ ...req.body, garageId });
      res.json(rule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/admin/notification-rules/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const rule = await storage.updateNotificationRule(req.params.id, req.body);
      res.json(rule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/admin/notification-rules/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      await storage.deleteNotificationRule(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ===== E-INVOICING (Facturation Électronique) =====

  app.get("/api/admin/accounting/e-invoicing/compliance", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? undefined : req.user?.garageId;
      const invoices = await storage.getInvoices(garageId);
      const garage = garageId ? await storage.getGarage(garageId) : null;

      console.log(`[E-Invoicing] Checking compliance for garage: ${garageId || 'All'} - Found ${invoices.length} invoices`);
      const complianceResults = await Promise.all(invoices.map(async (invoice: any) => {
        const client = await storage.getUser(invoice.clientId);
        const items = await storage.getInvoiceItems(invoice.id);
        const issues: string[] = [];

        if (!invoice.invoiceNumber) issues.push("Numéro de facture manquant");
        if (!invoice.createdAt) issues.push("Date de facture manquante");
        if (!invoice.clientId) issues.push("Client non renseigné");
        if (!client?.firstName && !client?.lastName && !client?.email) issues.push("Identité client incomplète");
        if (!client?.address) issues.push("Adresse client manquante");
        if (!invoice.amount || parseFloat(invoice.amount) <= 0) issues.push("Montant TTC manquant ou nul");
        if (!invoice.priceExcludingTax) issues.push("Montant HT manquant");
        if (!invoice.taxRate) issues.push("Taux de TVA manquant");
        if (!invoice.taxAmount) issues.push("Montant TVA manquant");
        if (!invoice.paymentMethod) issues.push("Mode de paiement manquant");
        if (!invoice.dueDate) issues.push("Date d'échéance manquante");
        if (items.length === 0 && !invoice.productDetails) issues.push("Aucune ligne de détail");

        if (garage) {
          if (!garage.siret) issues.push("SIRET du garage manquant");
          if (!garage.tvaNumber) issues.push("N° TVA intracommunautaire du garage manquant");
          if (!garage.address) issues.push("Adresse du garage manquante");
        }

        return {
          id: invoice.id,
          invoiceNumber: invoice.invoiceNumber,
          clientName: client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email : "Inconnu",
          amount: invoice.amount,
          status: invoice.status,
          createdAt: invoice.createdAt,
          isCompliant: issues.length === 0,
          issues,
          issueCount: issues.length,
        };
      }));

      const totalInvoices = complianceResults.length;
      const compliantCount = complianceResults.filter(r => r.isCompliant).length;
      const nonCompliantCount = totalInvoices - compliantCount;
      const complianceRate = totalInvoices > 0 ? Math.round((compliantCount / totalInvoices) * 100) : 0;

      const commonIssues: Record<string, number> = {};
      complianceResults.forEach(r => {
        r.issues.forEach((issue: string) => {
          commonIssues[issue] = (commonIssues[issue] || 0) + 1;
        });
      });

      const garageCompliance = {
        hasSiret: !!garage?.siret,
        hasTvaNumber: !!garage?.tvaNumber,
        hasAddress: !!garage?.address,
        hasName: !!garage?.name,
        hasEmail: !!garage?.email,
        hasPhone: !!garage?.phone,
        hasIban: !!garage?.iban,
      };

      res.json({
        totalInvoices,
        compliantCount,
        nonCompliantCount,
        complianceRate,
        commonIssues: Object.entries(commonIssues).sort(([, a], [, b]) => b - a),
        invoices: complianceResults,
        garageCompliance,
      });
    } catch (error: any) {
      console.error("Error checking e-invoicing compliance:", error);
      res.status(500).json({ message: error.message });
    }
  });

  

  function escapeXml(str: string): string {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }

  // ===== ACCOUNTING AUTOMATION HELPERS =====

  async function createAccountingEntryForExpense(expense: any, user: any) {
    try {
      const year = new Date(expense.date).getFullYear();
      const entryNumber = await storage.getNextEntryNumber(year);

      const entry = await storage.createAccountingEntry({
        garageId: expense.garageId || null,
        entryNumber,
        date: new Date(expense.date),
        journal: "purchases",
        sourceType: "expense",
        sourceId: expense.id,
        description: `Dépense ${expense.expenseNumber} - ${expense.vendor}`,
        totalDebit: expense.amountTTC,
        totalCredit: expense.amountTTC,
      });

      // Debit: Expense account (6xxxxx)
      await storage.createAccountingLine({
        entryId: entry.id,
        accountCode: "606100",
        accountLabel: "Fournitures non stockables",
        description: expense.description || expense.vendor,
        debit: expense.amountHT,
        credit: "0",
        vatRate: expense.taxRate,
        vatAmount: expense.taxAmount,
      });

      // Debit: TVA déductible
      if (parseFloat(expense.taxAmount || "0") > 0) {
        await storage.createAccountingLine({
          entryId: entry.id,
          accountCode: "445660",
          accountLabel: "TVA déductible sur achats",
          description: `TVA ${expense.taxRate}%`,
          debit: expense.taxAmount,
          credit: "0",
        });
      }

      // Credit: Bank/Cash
      const bankAccount = expense.paymentMethod === "cash" ? "530000" : "512000";
      const bankLabel = expense.paymentMethod === "cash" ? "Caisse" : "Banque";
      await storage.createAccountingLine({
        entryId: entry.id,
        accountCode: bankAccount,
        accountLabel: bankLabel,
        description: `Règlement ${expense.expenseNumber}`,
        debit: "0",
        credit: expense.amountTTC,
      });
    } catch (error) {
      console.error("Error creating accounting entry for expense:", error);
    }
  }

  async function createAccountingEntryForCreditNote(creditNote: any, user: any) {
    try {
      const year = new Date().getFullYear();
      const entryNumber = await storage.getNextEntryNumber(year);

      const entry = await storage.createAccountingEntry({
        garageId: creditNote.garageId || null,
        entryNumber,
        date: new Date(),
        journal: "sales",
        sourceType: "credit_note",
        sourceId: creditNote.id,
        description: `Avoir ${creditNote.creditNoteNumber}`,
        totalDebit: creditNote.totalTTC,
        totalCredit: creditNote.totalTTC,
      });

      // Debit: Sales revenue (reverse)
      await storage.createAccountingLine({
        entryId: entry.id,
        accountCode: "706000",
        accountLabel: "Prestations de services",
        description: `Avoir ${creditNote.creditNoteNumber}`,
        debit: creditNote.totalHT,
        credit: "0",
      });

      if (parseFloat(creditNote.taxAmount || "0") > 0) {
        await storage.createAccountingLine({
          entryId: entry.id,
          accountCode: "445710",
          accountLabel: "TVA collectée",
          description: `TVA avoir ${creditNote.taxRate}%`,
          debit: creditNote.taxAmount,
          credit: "0",
        });
      }

      // Credit: Client account
      await storage.createAccountingLine({
        entryId: entry.id,
        accountCode: "411000",
        accountLabel: "Clients",
        description: `Avoir client ${creditNote.creditNoteNumber}`,
        debit: "0",
        credit: creditNote.totalTTC,
      });
    } catch (error) {
      console.error("Error creating accounting entry for credit note:", error);
    }
  }

  // ========== AR WHEEL DETECTION ==========
  const multerImport = await import("multer");
  const multerUpload = multerImport.default({ storage: multerImport.default.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

  app.post("/api/ar/detect-wheels", isAuthenticated, multerUpload.single("image"), async (req: any, res) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ message: "Aucune image fournie" });

      const base64 = file.buffer.toString("base64");
      const mimeType = file.mimetype || "image/jpeg";

      const GEMINI_BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "http://localhost:1106/modelfarm/gemini";
      const GEMINI_API_KEY = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "dummy-key";

      const prompt = `Analyse cette photo de voiture et identifie les positions des roues/jantes visibles.
Pour chaque roue visible, retourne ses coordonnées normalisées (entre 0 et 1) par rapport à l'image:
- x: position horizontale du centre de la roue (0 = gauche, 1 = droite)
- y: position verticale du centre de la roue (0 = haut, 1 = bas)
- radius: rayon approximatif de la roue en proportion de la largeur de l'image

Réponds UNIQUEMENT en JSON valide avec ce format exact:
{"positions": [{"x": 0.25, "y": 0.7, "radius": 0.08}, {"x": 0.75, "y": 0.7, "radius": 0.08}]}

Si ce n'est pas une photo de voiture ou si aucune roue n'est visible, réponds: {"positions": []}`;

      const response = await fetch(`${GEMINI_BASE_URL}/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [
              { inlineData: { mimeType, data: base64 } },
              { text: prompt },
            ],
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 500,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      const jsonMatch = text.match(/\{[\s\S]*"positions"[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        if (Array.isArray(result.positions)) {
          result.positions = result.positions
            .filter((p: any) => typeof p.x === "number" && typeof p.y === "number")
            .map((p: any) => ({
              x: Math.max(0, Math.min(1, p.x)),
              y: Math.max(0, Math.min(1, p.y)),
              radius: Math.max(0.03, Math.min(0.3, p.radius || 0.08)),
            }));
        }
        res.json(result);
      } else {
        res.json({ positions: [] });
      }
    } catch (error: any) {
      console.error("[AR] Wheel detection error:", error.message);
      res.json({ positions: [] });
    }
  });

  // ========== OCR DOCUMENT SCANNER (MINDEE) ==========

  app.post("/api/ocr/scan", isAuthenticated, isAdmin, multerUpload.single("file"), async (req: any, res) => {
    try {
      const file = req.file;
      const documentType = req.body.documentType || "invoice";

      if (!file) {
        return res.status(400).json({ message: "Aucun fichier fourni" });
      }

      const fsOcr = await import("fs");
      const pathOcr = await import("path");
      const uploadsDir = pathOcr.default.join(process.cwd(), "uploads", "ocr");
      if (!fsOcr.default.existsSync(uploadsDir)) {
        fsOcr.default.mkdirSync(uploadsDir, { recursive: true });
      }
      const ext = pathOcr.default.extname(file.originalname) || ".jpg";
      const localFileName = `ocr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
      const localFilePath = pathOcr.default.join(uploadsDir, localFileName);
      fsOcr.default.writeFileSync(localFilePath, file.buffer);
      console.log(`[OCR] Fichier sauvegardé localement: ${localFilePath}`);

      const apiKey = process.env.MINDEE_API_KEY_PROD || process.env.MINDEE_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ message: "Clé API Mindee non configurée" });
      }

      const mindee = await import("mindee");
      const mindeeClient = new mindee.Client({ apiKey });
      const inputSource = await mindeeClient.docFromPath(localFilePath);

      let result: any;

      switch (documentType) {
        case "invoice": {
          const response = await mindeeClient.parse(mindee.product.InvoiceV4, inputSource);
          const pred = response.document.inference.prediction;
          result = {
            type: "invoice",
            invoiceNumber: pred.invoiceNumber?.value || null,
            invoiceDate: pred.date?.value || null,
            dueDate: pred.dueDate?.value || null,
            totalAmount: pred.totalAmount?.value || null,
            totalNet: pred.totalNet?.value || null,
            totalTax: pred.totalTax?.value || null,
            supplierName: pred.supplierName?.value || null,
            supplierAddress: pred.supplierAddress?.value || null,
            customerName: pred.customerName?.value || null,
            customerAddress: pred.customerAddress?.value || null,
            lineItems: (pred.lineItems || []).map((item: any) => ({
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalAmount: item.totalAmount,
              taxRate: item.taxRate,
            })),
            raw: response.document.toString(),
          };
          break;
        }
        case "carte_grise": {
          const response = await mindeeClient.parse(mindee.product.fr.CarteGriseV1, inputSource);
          const pred = response.document.inference.prediction;
          result = {
            type: "carte_grise",
            registrationNumber: pred.a?.value || null,
            firstRegistrationDate: pred.b?.value || null,
            ownerFullName: pred.c1?.value || null,
            ownerAddress: pred.c3?.value || null,
            ownerFirstName: pred.ownerFirstName?.value || null,
            ownerSurname: pred.ownerSurname?.value || null,
            make: pred.d1?.value || null,
            model: pred.d3?.value || null,
            vin: pred.e?.value || null,
            formula: pred.formulaNumber?.value || null,
            category: pred.j?.value || null,
            fuelType: pred.p3?.value || null,
            fiscalPower: pred.p6?.value || null,
            raw: response.document.toString(),
          };
          break;
        }
        case "id_card": {
          const response = await mindeeClient.parse(mindee.product.fr.IdCardV2, inputSource);
          const pred = response.document.inference.prediction;
          result = {
            type: "id_card",
            documentNumber: pred.documentNumber?.value || null,
            givenNames: (pred.givenNames || []).map((n: any) => n.value),
            surname: pred.surname?.value || null,
            birthDate: pred.birthDate?.value || null,
            birthPlace: pred.birthPlace?.value || null,
            expiryDate: pred.expiryDate?.value || null,
            issueDate: pred.issueDate?.value || null,
            authority: pred.authority?.value || null,
            gender: pred.gender?.value || null,
            nationality: pred.nationality?.value || null,
            mrz1: pred.mrz1?.value || null,
            mrz2: pred.mrz2?.value || null,
            mrz3: pred.mrz3?.value || null,
            raw: response.document.toString(),
          };
          break;
        }
        case "passport": {
          const response = await mindeeClient.parse(mindee.product.PassportV1, inputSource);
          const pred = response.document.inference.prediction;
          result = {
            type: "passport",
            documentId: pred.idNumber?.value || null,
            givenNames: (pred.givenNames || []).map((n: any) => n.value),
            surname: pred.surname?.value || null,
            birthDate: pred.birthDate?.value || null,
            birthPlace: pred.birthPlace?.value || null,
            expiryDate: pred.expiryDate?.value || null,
            issuanceDate: pred.issuanceDate?.value || null,
            gender: pred.gender?.value || null,
            country: pred.country?.value || null,
            mrz1: pred.mrz1?.value || null,
            mrz2: pred.mrz2?.value || null,
            raw: response.document.toString(),
          };
          break;
        }
        default:
          return res.status(400).json({ message: `Type de document non supporté: ${documentType}` });
      }

      // Save OCR scan result to history
      let savedScan: any = null;
      try {
        const [scan] = await db.insert(ocrScans).values({
          garageId: req.user?.garageId || null,
          scannedBy: req.user.id,
          documentType,
          fileName: file.originalname,
          result,
        }).returning();
        savedScan = scan;
      } catch (saveErr) {
        console.error("[OCR] Erreur sauvegarde historique:", saveErr);
      }

      console.log(`[OCR] Document scanné avec succès: ${documentType} par ${req.user.email}`);
      res.status(200).json({ success: true, result, scanId: savedScan?.id });
    } catch (error: any) {
      console.error("[OCR] Erreur de scan:", error);
      if (!res.headersSent) {
        res.status(500).json({ 
          message: "Erreur lors du scan OCR", 
          error: error.message,
          stack: error.stack 
        });
      }
    }
  });

  // OCR Scan History endpoints
  app.get("/api/admin/ocr/history", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const garageScope = getGarageScope(req.user);
      let query = db.select().from(ocrScans);
      if (garageScope) {
        query = query.where(eq(ocrScans.garageId, garageScope)) as any;
      }
      const scans = await (query as any).orderBy(desc(ocrScans.createdAt)).limit(50);
      res.json(scans);
    } catch (error) {
      console.error("[OCR] Erreur récupération historique:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/admin/ocr/history/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const [scan] = await db.select().from(ocrScans).where(eq(ocrScans.id, id));
      if (!scan) {
        return res.status(404).json({ message: "Scan non trouvé" });
      }
      const garageScope = getGarageScope(req.user);
      if (garageScope && scan.garageId !== garageScope) {
        return res.status(403).json({ message: "Accès refusé" });
      }
      res.json(scan);
    } catch (error) {
      console.error("[OCR] Erreur récupération scan:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/ocr/history/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const [scan] = await db.select().from(ocrScans).where(eq(ocrScans.id, id));
      if (!scan) {
        return res.status(404).json({ message: "Scan non trouvé" });
      }
      const garageScope = getGarageScope(req.user);
      if (garageScope && scan.garageId !== garageScope) {
        return res.status(403).json({ message: "Accès refusé" });
      }
      await db.delete(ocrScans).where(eq(ocrScans.id, id));
      res.json({ success: true });
    } catch (error) {
      console.error("[OCR] Erreur suppression scan:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ========== OCR QUOTE/INVOICE CREATION (no media required) ==========
  app.post("/api/admin/ocr/create-quote", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { clientId, serviceId, wheelCount, diameter, taxRate, productDetails, notes, services: ocrServices } = req.body;
      const garageId = req.user?.garageId || null;

      if (!clientId) {
        return res.status(400).json({ message: "Client requis" });
      }
      if (!ocrServices || !Array.isArray(ocrServices) || ocrServices.length === 0) {
        return res.status(400).json({ message: "Au moins une ligne est requise" });
      }

      const resolvedServiceId = serviceId || (await storage.getServices())[0]?.id;
      if (!resolvedServiceId) {
        return res.status(400).json({ message: "Aucun service disponible" });
      }

      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const allQuotes = await storage.getQuotes();
      const count = allQuotes.filter(q => {
        if (!q.createdAt) return false;
        const qDate = new Date(q.createdAt);
        return !isNaN(qDate.getTime()) && qDate >= startOfMonth;
      }).length + 1;
      const reference = `DEV-${mm}-${String(count).padStart(5, '0')}`;

      const parsedTaxRate = parseFloat(taxRate || "20");
      const wMult = parseInt(wheelCount) || 1;
      let totalHT = 0;
      for (const s of ocrServices) {
        totalHT += (parseFloat(s.quantity) || 0) * (parseFloat(s.unitPrice) || 0) * wMult;
      }
      const taxAmount = (totalHT * parsedTaxRate) / 100;
      const totalTTC = totalHT + taxAmount;

      const quote = await storage.createQuote({
        clientId,
        serviceId: resolvedServiceId,
        garageId,
        reference,
        wheelCount: parseInt(wheelCount) || 4,
        diameter: diameter || null,
        priceExcludingTax: totalHT.toFixed(2),
        taxRate: parsedTaxRate.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        quoteAmount: totalTTC.toFixed(2),
        productDetails: productDetails || null,
        notes: notes || null,
        status: "approved",
      } as any);

      for (const service of ocrServices) {
        const qty = parseFloat(service.quantity) || 1;
        const unitPrice = parseFloat(service.unitPrice) || 0;
        const itemTotalHT = qty * unitPrice * wMult;
        const itemTaxAmount = (itemTotalHT * parsedTaxRate) / 100;
        const itemTotalTTC = itemTotalHT + itemTaxAmount;

        await storage.createQuoteItem({
          quoteId: quote.id,
          description: service.description || service.serviceName || "Ligne OCR",
          quantity: qty.toString(),
          unitPriceExcludingTax: unitPrice.toString(),
          totalExcludingTax: itemTotalHT.toString(),
          taxRate: parsedTaxRate.toString(),
          taxAmount: itemTaxAmount.toString(),
          totalIncludingTax: itemTotalTTC.toString(),
        });
      }

      await logAuditEvent({
        req,
        entityType: "quote",
        entityId: quote.id,
        action: "created",
        summary: `${entityLabels.quote} ${actionLabels.created} depuis scan OCR`,
        newData: quote,
        metadata: { clientId, source: "ocr_scan" },
      });

      await storage.createNotification({
        userId: clientId,
        type: "quote",
        title: "Nouveau devis",
        message: `Un devis a été créé pour vous`,
        relatedId: quote.id,
      });

      const wsClient = wsClients.get(clientId);
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({ type: "quote_updated", quoteId: quote.id, status: quote.status }));
      }

      // Link scan to created quote if scanId provided
      if (req.body.scanId) {
        try {
          await db.update(ocrScans).set({ createdQuoteId: quote.id }).where(eq(ocrScans.id, req.body.scanId));
        } catch (e) { /* ignore */ }
      }

      console.log(`[OCR] Devis créé depuis scan: ${reference} par ${req.user.email}`);
      res.json(quote);
    } catch (error: any) {
      console.error("[OCR] Erreur création devis:", error);
      res.status(400).json({ message: error.message || "Échec de la création du devis" });
    }
  });

  app.post("/api/admin/ocr/create-invoice", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { clientId, paymentMethod, wheelCount, diameter, taxRate, productDetails, notes, dueDate, invoiceItems } = req.body;
      const garageId = req.user?.garageId || null;

      if (!clientId) {
        return res.status(400).json({ message: "Client requis" });
      }
      if (!invoiceItems || !Array.isArray(invoiceItems) || invoiceItems.length === 0) {
        return res.status(400).json({ message: "Au moins une ligne est requise" });
      }

      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const allInvoices = await storage.getInvoices();
      const countToday = allInvoices.filter(i => {
        const iDate = new Date(i.createdAt || '');
        return iDate >= startOfDay;
      }).length + 1;
      const invoiceNumber = `FACT-${dd}-${mm}-${String(countToday).padStart(3, '0')}`;

      const parsedTaxRate = parseFloat(taxRate || "20");
      const wMult = parseInt(wheelCount) || 1;
      let totalHT = 0;
      for (const item of invoiceItems) {
        totalHT += (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPriceExcludingTax) || 0) * wMult;
      }
      const taxAmount = (totalHT * parsedTaxRate) / 100;
      const totalTTC = totalHT + taxAmount;

      const invoice = await storage.createInvoice({
        clientId,
        garageId,
        paymentMethod: paymentMethod || "wire_transfer",
        amount: totalTTC.toFixed(2),
        invoiceNumber,
        wheelCount: parseInt(wheelCount) || 4,
        diameter: diameter || null,
        priceExcludingTax: totalHT.toFixed(2),
        taxRate: parsedTaxRate.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        productDetails: productDetails || null,
        notes: notes || null,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status: "pending",
      } as any);

      for (const item of invoiceItems) {
        await storage.createInvoiceItem({
          invoiceId: invoice.id,
          description: item.description || "Ligne OCR",
          quantity: String(parseFloat(item.quantity) || 1),
          unitPriceExcludingTax: String(parseFloat(item.unitPriceExcludingTax) || 0),
          totalExcludingTax: String(item.totalExcludingTax || 0),
          taxRate: String(item.taxRate || parsedTaxRate),
          taxAmount: String(item.taxAmount || 0),
          totalIncludingTax: String(item.totalIncludingTax || 0),
        });
      }

      await storage.createNotification({
        userId: clientId,
        type: "invoice",
        title: "Nouvelle facture",
        message: `Une facture a été créée pour vous`,
        relatedId: invoice.id,
      });

      const wsClient = wsClients.get(clientId);
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({ type: "invoice_created", invoiceId: invoice.id }));
      }

      // Link scan to created invoice if scanId provided
      if (req.body.scanId) {
        try {
          await db.update(ocrScans).set({ createdInvoiceId: invoice.id }).where(eq(ocrScans.id, req.body.scanId));
        } catch (e) { /* ignore */ }
      }

      console.log(`[OCR] Facture créée depuis scan: ${invoiceNumber} par ${req.user.email}`);
      res.json(invoice);
    } catch (error: any) {
      console.error("[OCR] Erreur création facture:", error);
      res.status(400).json({ message: error.message || "Échec de la création de la facture" });
    }
  });

  app.post("/api/admin/ocr/create-credit-note", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { clientId, invoiceId, reason, taxRate, notes, lineItems, scanId } = req.body;
      const garageId = req.user?.garageId || null;

      if (!clientId) {
        return res.status(400).json({ message: "Client requis" });
      }
      if (!invoiceId) {
        return res.status(400).json({ message: "Facture liée requise" });
      }
      if (!reason) {
        return res.status(400).json({ message: "Motif requis" });
      }
      if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
        return res.status(400).json({ message: "Au moins une ligne est requise" });
      }

      const now = new Date();
      const creditNoteNumber = await storage.getNextCreditNoteNumber(now.getFullYear());

      const parsedTaxRate = parseFloat(taxRate || "20");
      let totalHT = 0;
      for (const item of lineItems) {
        totalHT += (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPriceHT) || 0);
      }
      const taxAmount = (totalHT * parsedTaxRate) / 100;
      const totalTTC = totalHT + taxAmount;

      const creditNote = await storage.createCreditNote({
        garageId,
        invoiceId,
        clientId,
        creditNoteNumber,
        reason,
        totalHT: totalHT.toFixed(2),
        taxRate: parsedTaxRate.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        totalTTC: totalTTC.toFixed(2),
        status: "draft",
        notes: notes || null,
      } as any);

      for (const item of lineItems) {
        const qty = parseFloat(item.quantity) || 1;
        const unitPrice = parseFloat(item.unitPriceHT) || 0;
        const itemTotalHT = qty * unitPrice;
        const itemTaxRate = parseFloat(item.taxRate || taxRate) || parsedTaxRate;
        const itemTaxAmount = (itemTotalHT * itemTaxRate) / 100;
        const itemTotalTTC = itemTotalHT + itemTaxAmount;

        await storage.createCreditNoteItem({
          creditNoteId: creditNote.id,
          description: item.description || "Ligne avoir OCR",
          quantity: qty.toString(),
          unitPriceHT: unitPrice.toString(),
          totalHT: itemTotalHT.toString(),
          taxRate: itemTaxRate.toString(),
          taxAmount: itemTaxAmount.toString(),
          totalTTC: itemTotalTTC.toString(),
        });
      }

      if (scanId) {
        try {
          await db.update(ocrScans).set({ createdQuoteId: creditNote.id }).where(eq(ocrScans.id, scanId));
        } catch (e) { /* ignore - ocrScans may not have createdCreditNoteId column */ }
      }

      console.log(`[OCR] Avoir créé depuis scan: ${creditNoteNumber} par ${req.user.email}`);
      res.json(creditNote);
    } catch (error: any) {
      console.error("[OCR] Erreur création avoir:", error);
      res.status(400).json({ message: error.message || "Échec de la création de l'avoir" });
    }
  });

  app.post("/api/admin/ocr/create-expense", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { categoryId, supplier, amountHT, taxRate, taxAmount: inputTaxAmount, amountTTC: inputTTC, date, description, notes, receiptRef, scanId } = req.body;
      const garageId = req.user?.garageId || null;

      if (!supplier) {
        return res.status(400).json({ message: "Fournisseur requis" });
      }

      const now = new Date();
      const expenseNumber = await storage.getNextExpenseNumber(now.getFullYear());

      const parsedAmountHT = parseFloat(amountHT) || 0;
      const parsedTaxRate = parseFloat(taxRate || "20");
      const computedTaxAmount = inputTaxAmount != null ? parseFloat(inputTaxAmount) : (parsedAmountHT * parsedTaxRate) / 100;
      const computedTTC = inputTTC != null ? parseFloat(inputTTC) : parsedAmountHT + computedTaxAmount;

      const expense = await storage.createExpense({
        garageId,
        categoryId: categoryId || null,
        expenseNumber,
        vendor: supplier,
        description: description || null,
        date: date ? new Date(date) : now,
        amountHT: parsedAmountHT.toFixed(2),
        taxRate: parsedTaxRate.toFixed(2),
        taxAmount: computedTaxAmount.toFixed(2),
        amountTTC: computedTTC.toFixed(2),
        paymentMethod: "wire_transfer",
        status: "paid",
        notes: notes || null,
        attachmentName: receiptRef || null,
      } as any);

      if (scanId) {
        try {
          await db.update(ocrScans).set({ createdInvoiceId: expense.id }).where(eq(ocrScans.id, scanId));
        } catch (e) { /* ignore - ocrScans may not have createdExpenseId column */ }
      }

      console.log(`[OCR] Dépense créée depuis scan: ${expenseNumber} par ${req.user.email}`);
      res.json(expense);
    } catch (error: any) {
      console.error("[OCR] Erreur création dépense:", error);
      res.status(400).json({ message: error.message || "Échec de la création de la dépense" });
    }
  });

  // ========== GEMINI VISION OCR API (Mobile + Web) ==========
  const multerOcrVision = (await import("multer")).default({
    storage: (await import("multer")).default.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
  });

  app.post("/api/ocr/scan-vision", isAuthenticated, multerOcrVision.single("file"), async (req: any, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, message: "Aucun fichier fourni" });
      }

      const documentType = req.body.documentType || "auto_detect";
      const { scanDocument } = await import("./ocrVisionService");

      console.log(`[OCR-Vision] Scan ${documentType} par ${req.user?.email}, fichier: ${file.originalname} (${file.size} bytes)`);

      const result = await scanDocument(file.buffer, documentType, file.mimetype);

      let savedScan: any = null;
      try {
        const [scan] = await db.insert(ocrScans).values({
          garageId: req.user?.garageId || null,
          scannedBy: req.user.id,
          documentType,
          fileName: file.originalname,
          result: result.data,
        }).returning();
        savedScan = scan;
      } catch (saveErr) {
        console.error("[OCR-Vision] Erreur sauvegarde historique:", saveErr);
      }

      console.log(`[OCR-Vision] Scan réussi: type=${result.type}, confidence=${result.confidence}`);
      res.json({ success: true, result, scanId: savedScan?.id });
    } catch (error: any) {
      console.error("[OCR-Vision] Erreur:", error);
      res.status(500).json({ success: false, message: "Erreur lors du scan OCR", error: error.message });
    }
  });

  app.post("/api/ocr/scan-carte-grise", isAuthenticated, multerOcrVision.single("file"), async (req: any, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, message: "Aucun fichier fourni" });
      }

      const { scanCarteGrise } = await import("./ocrVisionService");
      console.log(`[OCR-Vision] Scan carte grise par ${req.user?.email}`);

      const result = await scanCarteGrise(file.buffer, file.mimetype);

      let savedScan: any = null;
      try {
        const [scan] = await db.insert(ocrScans).values({
          garageId: req.user?.garageId || null,
          scannedBy: req.user.id,
          documentType: "carte_grise",
          fileName: file.originalname,
          result: result.data,
        }).returning();
        savedScan = scan;
      } catch (saveErr) {
        console.error("[OCR-Vision] Erreur sauvegarde historique:", saveErr);
      }

      res.json({
        success: true,
        scanId: savedScan?.id,
        vehicleInfo: {
          registrationNumber: result.data.registrationNumber || null,
          make: result.data.make || null,
          commercialName: result.data.commercialName || null,
          model: result.data.model || null,
          vin: result.data.vin || null,
          fuelType: result.data.fuelType || null,
          fiscalPower: result.data.fiscalPower || null,
          firstRegistrationDate: result.data.firstRegistrationDate || null,
          color: result.data.color || null,
          ownerFullName: result.data.ownerFullName || null,
          ownerAddress: result.data.ownerAddress || null,
          category: result.data.category || null,
          engineCapacity: result.data.engineCapacity || null,
        },
        confidence: result.confidence,
        rawText: result.rawText,
      });
    } catch (error: any) {
      console.error("[OCR-Vision] Erreur carte grise:", error);
      res.status(500).json({ success: false, message: "Erreur lors du scan de la carte grise", error: error.message });
    }
  });

  app.post("/api/ocr/scan-license-plate", isAuthenticated, multerOcrVision.single("file"), async (req: any, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, message: "Aucun fichier fourni" });
      }

      const { scanLicensePlate } = await import("./ocrVisionService");
      console.log(`[OCR-Vision] Scan plaque par ${req.user?.email}`);

      const result = await scanLicensePlate(file.buffer, file.mimetype);

      res.json({
        success: true,
        plateNumber: result.data.plateNumber || null,
        country: result.data.country || null,
        format: result.data.format || null,
        confidence: result.confidence,
      });
    } catch (error: any) {
      console.error("[OCR-Vision] Erreur plaque:", error);
      res.status(500).json({ success: false, message: "Erreur lors du scan de la plaque", error: error.message });
    }
  });

  // ========== CLOUDFLARE R2 ADMIN ROUTES ==========
  app.get("/api/admin/storage/status", isAuthenticated, isAdmin, async (_req: any, res) => {
    try {
      const { isCloudflareR2Configured, listR2Files } = await import("./cloudflareR2Service");
      const { isGoogleDriveConfigured } = await import("./googleDriveStorage");
      
      const r2Configured = isCloudflareR2Configured();
      let r2FileCount = 0;
      if (r2Configured) {
        try {
          const files = await listR2Files("", 1000);
          r2FileCount = files.length;
        } catch {}
      }

      const uploadsDir = path.join(process.cwd(), "uploads");
      let localFileCount = 0;
      if (fs.existsSync(uploadsDir)) {
        localFileCount = fs.readdirSync(uploadsDir).filter(f => !f.startsWith(".")).length;
      }

      res.json({
        cloudflareR2: { configured: r2Configured, fileCount: r2FileCount },
        googleDrive: { configured: isGoogleDriveConfigured() },
        localStorage: { available: true, fileCount: localFileCount },
        priority: r2Configured ? "cloudflare_r2" : isGoogleDriveConfigured() ? "google_drive" : "local",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/r2/files", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { isCloudflareR2Configured, listR2Files } = await import("./cloudflareR2Service");
      if (!isCloudflareR2Configured()) {
        return res.status(503).json({ message: "Cloudflare R2 non configuré" });
      }
      const prefix = (req.query.prefix as string) || "";
      const maxKeys = parseInt(req.query.limit as string) || 100;
      const files = await listR2Files(prefix, maxKeys);
      res.json({ files, count: files.length });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/r2/migrate-local", isAuthenticated, isAdmin, async (_req: any, res) => {
    try {
      const result = await migrateLocalToObjectStorage();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/sync-production", isAuthenticated, isAdmin, async (_req: any, res) => {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const syncDataPath = path.join(process.cwd(), 'server', 'sync_data.json');
      
      if (!fs.existsSync(syncDataPath)) {
        return res.status(404).json({ message: "Fichier de synchronisation non trouvé" });
      }
      
      const syncData = JSON.parse(fs.readFileSync(syncDataPath, 'utf8'));
      const results: Record<string, { upserted: number; errors: number }> = {};
      
      function formatVal(val: any): string {
        if (val === null || val === undefined) return 'NULL';
        if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
        if (typeof val === 'number') return String(val);
        if (Array.isArray(val)) return "'" + JSON.stringify(val).replace(/'/g, "''") + "'::jsonb";
        if (typeof val === 'object') return "'" + JSON.stringify(val).replace(/'/g, "''") + "'::jsonb";
        return "'" + String(val).replace(/'/g, "''") + "'";
      }
      
      const tableOrder = ['garages', 'users', 'services', 'quotes', 'invoices', 'reservations', 'notifications', 'quote_media', 'invoice_media', 'reviews', 'delivery_notes', 'repair_orders'];
      
      for (const table of tableOrder) {
        const rows = syncData[table];
        if (!rows || rows.length === 0) continue;
        
        results[table] = { upserted: 0, errors: 0 };
        const columns = Object.keys(rows[0]);
        const colNames = columns.map((c: string) => `"${c}"`).join(', ');
        
        for (const row of rows) {
          try {
            const valueParts = columns.map((c: string) => formatVal(row[c])).join(', ');
            const updateSet = columns.filter((c: string) => c !== 'id').map((c: string) => `"${c}" = ${formatVal(row[c])}`).join(', ');
            
            const query = `INSERT INTO ${table} (${colNames}) VALUES (${valueParts}) ON CONFLICT (id) DO UPDATE SET ${updateSet}`;
            await db.execute(sql.raw(query));
            results[table].upserted++;
          } catch (err: any) {
            results[table].errors++;
            if (results[table].errors <= 3) {
              console.error(`[Sync] Error ${table} id=${row.id}:`, err.message?.substring(0, 200));
            }
          }
        }
        
        console.log(`[Sync] ${table}: ${results[table].upserted} upserted, ${results[table].errors} errors`);
      }
      
      const totalCheck = await db.execute(sql.raw("SELECT SUM(CAST(amount AS DECIMAL)) as ca FROM invoices WHERE status = 'paid' AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)"));
      
      res.json({ 
        success: true, 
        results,
        verification: { ca_mois: totalCheck.rows[0]?.ca }
      });
    } catch (error: any) {
      console.error('[Sync] Error:', error);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/sms/logs", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const logs = await getSmsLogs(limit);
      res.json(logs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/sms/stats", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const stats = await getSmsStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/sms/test", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { phone, message } = req.body;
      if (!phone) return res.status(400).json({ message: "Numéro de téléphone requis" });
      const result = await sendSms({
        to: phone,
        eventType: 'general',
        eventTitle: 'Test SMS',
        eventDetails: message || 'Ceci est un test de notification SMS AutoReport.',
        recipientName: 'Test Admin',
      });
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });


  // ========== GALLERY ROUTES ==========
  // GET /api/gallery - list all media with filters
  app.get("/api/gallery", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const {
        type, reference, clientId, dateFrom, dateTo, fileType,
        sortBy = "date_desc", page = "1", limit = "50", engagementId
      } = req.query as Record<string, string>;

      const offset = (parseInt(page) - 1) * parseInt(limit);
      
      // Build filters
      let qConditions = ["1=1"];
      let qParams: any[] = [];
      let qIdx = 1;
      
      let iConditions = ["1=1"];
      let iParams: any[] = [];
      let iIdx = 1;

      if (engagementId) {
        // Subqueries for engagement links
        qConditions.push(`qm.quote_id IN (SELECT quote_id FROM engagement_quotes WHERE engagement_id = $${qIdx++})`);
        qParams.push(engagementId);
        
        iConditions.push(`im.invoice_id IN (SELECT invoice_id FROM engagement_invoices WHERE engagement_id = $${iIdx++})`);
        iParams.push(engagementId);
      }

      if (reference) { 
        qConditions.push(`q.reference ILIKE $${qIdx++}`); qParams.push(`%${reference}%`); 
        iConditions.push(`i.invoice_number ILIKE $${iIdx++}`); iParams.push(`%${reference}%`);
      }
      if (clientId) { 
        qConditions.push(`q.client_id = $${qIdx++}`); qParams.push(clientId); 
        iConditions.push(`i.client_id = $${iIdx++}`); iParams.push(clientId);
      }
      if (dateFrom) { 
        qConditions.push(`qm.created_at >= $${qIdx++}`); qParams.push(dateFrom); 
        iConditions.push(`im.created_at >= $${iIdx++}`); iParams.push(dateFrom);
      }
      if (dateTo) { 
        qConditions.push(`qm.created_at <= $${qIdx++}`); qParams.push(dateTo); 
        iConditions.push(`im.created_at <= $${iIdx++}`); iParams.push(dateTo);
      }
      if (fileType && fileType !== "all") { 
        qConditions.push(`qm.file_type = $${qIdx++}`); qParams.push(fileType); 
        iConditions.push(`im.file_type = $${iIdx++}`); iParams.push(fileType);
      }

      const sortMap: Record<string, string> = {
        date_desc: "created_at DESC",
        date_asc: "created_at ASC",
        ref_asc: "reference ASC",
        ref_desc: "reference DESC",
      };
      const sortOrder = sortMap[sortBy] || "created_at DESC";

      let allMedia: any[] = [];

      if (!type || type === "all" || type === "quote") {
        const qResult = await pool.query(`
          SELECT qm.id, qm.file_path, qm.file_name, qm.file_type, qm.file_size, qm.created_at,
                 q.reference, q.client_id, q.created_at as entity_date,
                 u.first_name || ' ' || u.last_name as client_name,
                 'quote' as entity_type
          FROM quote_media qm
          LEFT JOIN quotes q ON q.id = qm.quote_id
          LEFT JOIN users u ON u.id = q.client_id
          WHERE ${qConditions.join(" AND ")}
          ORDER BY ${sortOrder}
        `, qParams);
        allMedia = [...allMedia, ...qResult.rows];
      }

      if (!type || type === "all" || type === "invoice") {
        const iResult = await pool.query(`
          SELECT im.id, im.file_path, im.file_name, im.file_type, im.file_size, im.created_at,
                 i.invoice_number as reference, i.client_id, i.created_at as entity_date,
                 u.first_name || ' ' || u.last_name as client_name,
                 'invoice' as entity_type
          FROM invoice_media im
          LEFT JOIN invoices i ON i.id = im.invoice_id
          LEFT JOIN users u ON u.id = i.client_id
          WHERE ${iConditions.join(" AND ")}
          ORDER BY ${sortOrder}
        `, iParams);
        allMedia = [...allMedia, ...iResult.rows];
      }

      // Sort combined results
      allMedia.sort((a, b) => {
        if (sortBy === "date_asc") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        if (sortBy === "ref_asc") return (a.reference || "").localeCompare(b.reference || "");
        if (sortBy === "ref_desc") return (b.reference || "").localeCompare(a.reference || "");
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      const total = allMedia.length;
      const paginated = allMedia.slice(offset, offset + parseInt(limit));

      res.json({ media: paginated, total, page: parseInt(page), limit: parseInt(limit) });
    } catch (error: any) {
      console.error("[Gallery] Error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/gallery/bulk-delete", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { mediaIds } = req.body;
      const { bulkDeleteMedia } = await import("./mediaBulkService");
      const result = await bulkDeleteMedia(mediaIds);
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });

  app.post("/api/gallery/bulk-rename", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { mediaIds, newNames } = req.body;
      const { bulkRenameMedia } = await import("./mediaBulkService");
      const result = await bulkRenameMedia(mediaIds, newNames);
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });


  // GET /api/gallery/export - export filtered media as ZIP
  app.get("/api/gallery/export", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { type, reference, clientId, dateFrom, dateTo, fileType } = req.query as Record<string, string>;

      let allMedia: any[] = [];

      if (!type || type === "all" || type === "quote") {
        const qConditions = ["1=1"];
        const qParams: any[] = [];
        let qIdx = 1;
        if (reference) { qConditions.push(`q.reference ILIKE $${qIdx++}`); qParams.push(`%${reference}%`); }
        if (clientId) { qConditions.push(`q.client_id = $${qIdx++}`); qParams.push(clientId); }
        if (dateFrom) { qConditions.push(`qm.created_at >= $${qIdx++}`); qParams.push(dateFrom); }
        if (dateTo) { qConditions.push(`qm.created_at <= $${qIdx++}`); qParams.push(dateTo); }
        if (fileType && fileType !== "all") { qConditions.push(`qm.file_type = $${qIdx++}`); qParams.push(fileType); }
        const qResult = await pool.query(`
          SELECT qm.id, qm.file_path, qm.file_name, qm.file_type, q.reference, 'quote' as entity_type
          FROM quote_media qm LEFT JOIN quotes q ON q.id = qm.quote_id
          WHERE ${qConditions.join(" AND ")}
        `, qParams);
        allMedia = [...allMedia, ...qResult.rows];
      }

      if (!type || type === "all" || type === "invoice") {
        const iConditions = ["1=1"];
        const iParams: any[] = [];
        let iIdx = 1;
        if (reference) { iConditions.push(`i.invoice_number ILIKE $${iIdx++}`); iParams.push(`%${reference}%`); }
        if (clientId) { iConditions.push(`i.client_id = $${iIdx++}`); iParams.push(clientId); }
        if (dateFrom) { iConditions.push(`im.created_at >= $${iIdx++}`); iParams.push(dateFrom); }
        if (dateTo) { iConditions.push(`im.created_at <= $${iIdx++}`); iParams.push(dateTo); }
        if (fileType && fileType !== "all") { iConditions.push(`im.file_type = $${iIdx++}`); iParams.push(fileType); }
        const iResult = await pool.query(`
          SELECT im.id, im.file_path, im.file_name, im.file_type, i.invoice_number as reference, 'invoice' as entity_type
          FROM invoice_media im LEFT JOIN invoices i ON i.id = im.invoice_id
          WHERE ${iConditions.join(" AND ")}
        `, iParams);
        allMedia = [...allMedia, ...iResult.rows];
      }

      if (allMedia.length === 0) {
        return res.status(404).json({ message: "Aucun média à exporter" });
      }

      const archiver = (await import("archiver")).default;
      const { PassThrough } = await import("stream");
      const buffers: Buffer[] = [];
      const passThrough = new PassThrough();
      passThrough.on("data", (chunk: Buffer) => buffers.push(chunk));
      const archive = archiver("zip", { zlib: { level: 5 } });
      archive.on("error", (err: Error) => { throw err; });
      archive.pipe(passThrough);

      // Track filenames to avoid duplicates
      const usedNames = new Set<string>();
      for (const m of allMedia) {
        try {
          const buffer = await downloadMedia(m.file_path);
          if (!buffer) continue;
          const ext = path.extname(m.file_name || ".jpg");
          const base = `${m.entity_type === "quote" ? "DEV" : "FACT"}_${m.reference || "unknown"}_${m.id.slice(0, 6)}${ext}`;
          const safeName = base.replace(/[^a-zA-Z0-9._\-]/g, "_");
          let finalName = safeName;
          let counter = 1;
          while (usedNames.has(finalName)) { finalName = safeName.replace(ext, `_${counter}${ext}`); counter++; }
          usedNames.add(finalName);
          archive.append(buffer, { name: finalName });
        } catch (e) { /* skip failed files */ }
      }

      await archive.finalize();
      await new Promise<void>((resolve, reject) => {
        passThrough.on("end", resolve);
        passThrough.on("error", reject);
      });

      const zipBuffer = Buffer.concat(buffers);
      const label = reference ? `gallery_${reference}` : "gallery_export";
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="${label}_${Date.now()}.zip"`);
      res.send(zipBuffer);
    } catch (error: any) {
      console.error("[Gallery Export] Error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // POST /api/gallery/import - import ZIP, extract and link photos
  const galleryZipUpload = multerImport.default({ storage: multerImport.default.memoryStorage(), limits: { fileSize: 500 * 1024 * 1024 } });
  app.post("/api/gallery/import", isAuthenticated, isAdmin, galleryZipUpload.single("file"), async (req: any, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "Aucun fichier reçu" });

      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(req.file.buffer);

      // Extract reference regex patterns
      const quoteRefRe = /DEV-[\w\-]+/i;
      const invoiceRefRe = /(VIR|FACT|CB)-[\w\-]+/i;

      const results: any[] = [];
      const conflicts: any[] = [];
      const imageExts = /\.(jpg|jpeg|png|gif|webp)$/i;
      const videoExts = /\.(mp4|mov|avi|webm)$/i;

      for (const [filename, file] of Object.entries(zip.files)) {
        if (file.dir) continue;
        const basename = path.basename(filename);
        if (basename.startsWith(".") || basename.startsWith("__MACOSX")) continue;

        // Detect reference from filename
        const quoteMatch = basename.match(quoteRefRe);
        const invoiceMatch = basename.match(invoiceRefRe);
        const ref = quoteMatch?.[0] || invoiceMatch?.[0];
        const entityType = quoteMatch ? "quote" : invoiceMatch ? "invoice" : null;

        if (!ref || !entityType) {
          results.push({ filename: basename, status: "skipped", reason: "Aucune référence détectée" });
          continue;
        }

        // Check if ref exists in DB
        let entityId: string | null = null;
        if (entityType === "quote") {
          const qr = await pool.query("SELECT id FROM quotes WHERE reference = $1", [ref]);
          if (qr.rows.length > 0) entityId = qr.rows[0].id;
        } else {
          const ir = await pool.query("SELECT id FROM invoices WHERE invoice_number = $1", [ref]);
          if (ir.rows.length > 0) entityId = ir.rows[0].id;
        }

        if (!entityId) {
          results.push({ filename: basename, status: "skipped", reason: `Référence ${ref} introuvable en base` });
          continue;
        }

        // Check for existing media with same filename
        const existing = entityType === "quote"
          ? await pool.query("SELECT id FROM quote_media WHERE file_name = $1 AND quote_id = $2", [basename, entityId])
          : await pool.query("SELECT id FROM invoice_media WHERE file_name = $1 AND invoice_id = $2", [basename, entityId]);

        if (existing.rows.length > 0) {
          conflicts.push({ filename: basename, reference: ref, entityType, entityId, mediaId: existing.rows[0].id });
          continue;
        }

        // Save file to uploads
        const buffer = Buffer.from(await file.async("arraybuffer"));
        const ext = path.extname(basename);
        const safeRef = ref.replace(/[^a-zA-Z0-9\-]/g, '_');
        const newFileName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}_${safeRef}_import${ext}`;
        const newPath = await uploadMedia(buffer, newFileName, entityType === "quote" ? "quotes" : "invoices", undefined, ref);

        const ft = imageExts.test(basename) ? "image" : videoExts.test(basename) ? "video" : "document";
        const mediaId = crypto.randomUUID();
        if (entityType === "quote") {
          await pool.query(
            "INSERT INTO quote_media (id, quote_id, file_type, file_path, file_name, file_size) VALUES ($1,$2,$3,$4,$5,$6)",
            [mediaId, entityId, ft, newPath, newFileName, buffer.length]
          );
        } else {
          await pool.query(
            "INSERT INTO invoice_media (id, invoice_id, file_type, file_path, file_name, file_size) VALUES ($1,$2,$3,$4,$5,$6)",
            [mediaId, entityId, ft, newPath, newFileName, buffer.length]
          );
        }

        results.push({ filename: basename, status: "imported", reference: ref, entityType, newPath });
      }

      res.json({ results, conflicts, summary: { imported: results.filter(r => r.status === "imported").length, skipped: results.filter(r => r.status === "skipped").length, conflicts: conflicts.length } });
    } catch (error: any) {
      console.error("[Gallery Import] Error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // POST /api/gallery/bulk-upload - upload multiple local files (max 20)
  const galleryBulkUpload = multerImport.default({
    storage: multerImport.default.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 },
  });
  app.post("/api/gallery/bulk-upload", isAuthenticated, isAdmin, galleryBulkUpload.array("files", 20), async (req: any, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "Aucun fichier reçu" });
      }
      if (files.length > 20) {
        return res.status(400).json({ message: "Maximum 20 fichiers autorisés" });
      }

      const { entityId, entityType, reference } = req.body;

      const imageExts = /\.(jpg|jpeg|png|gif|webp|heic|heif)$/i;
      const videoExts = /\.(mp4|mov|avi|webm|mkv)$/i;
      const results: any[] = [];

      let fileIndex = 0;
      for (const file of files) {
        try {
          fileIndex++;
          const ext = path.extname(file.originalname);
          const safeRef = reference ? reference.replace(/[^a-zA-Z0-9\-]/g, '_') : 'upload';
          const ft = imageExts.test(file.originalname) ? "image" : videoExts.test(file.originalname) ? "video" : "document";
          const folder = entityType === "quote" ? "quotes" : entityType === "invoice" ? "invoices" : "uploads";

          let displayName: string;
          let nextNum = fileIndex;
          if (entityId && reference) {
            if (entityType === "quote") {
              const countRes = await pool.query("SELECT COUNT(*) FROM quote_media WHERE quote_id = $1", [entityId]);
              nextNum = parseInt(countRes.rows[0].count) + fileIndex;
            } else if (entityType === "invoice") {
              const countRes = await pool.query("SELECT COUNT(*) FROM invoice_media WHERE invoice_id = $1", [entityId]);
              nextNum = parseInt(countRes.rows[0].count) + fileIndex;
            }
            displayName = `${safeRef}_${nextNum}${ext}`;
          } else {
            displayName = file.originalname;
          }

          const storageFileName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}_${safeRef}_${nextNum}${ext}`;
          const newPath = await uploadMedia(file.buffer, storageFileName, folder, undefined, reference || undefined);

          const mediaId = crypto.randomUUID();
          if (entityType === "quote" && entityId) {
            await pool.query(
              "INSERT INTO quote_media (id, quote_id, file_type, file_path, file_name, file_size) VALUES ($1,$2,$3,$4,$5,$6)",
              [mediaId, entityId, ft, newPath, displayName, file.size]
            );
          } else if (entityType === "invoice" && entityId) {
            await pool.query(
              "INSERT INTO invoice_media (id, invoice_id, file_type, file_path, file_name, file_size) VALUES ($1,$2,$3,$4,$5,$6)",
              [mediaId, entityId, ft, newPath, displayName, file.size]
            );
          } else {
            const firstQuote = await pool.query("SELECT id, reference FROM quotes ORDER BY created_at DESC LIMIT 1");
            if (firstQuote.rows.length > 0) {
              await pool.query(
                "INSERT INTO quote_media (id, quote_id, file_type, file_path, file_name, file_size) VALUES ($1,$2,$3,$4,$5,$6)",
                [mediaId, firstQuote.rows[0].id, ft, newPath, displayName, file.size]
              );
            }
          }

          results.push({ filename: displayName, status: "uploaded", size: file.size, path: newPath });
        } catch (fileErr: any) {
          results.push({ filename: file.originalname, status: "error", reason: fileErr.message });
        }
      }

      const uploaded = results.filter(r => r.status === "uploaded").length;
      const errors = results.filter(r => r.status === "error").length;
      console.log(`[Gallery BulkUpload] ${uploaded} uploaded, ${errors} errors out of ${files.length} files`);
      res.json({ results, summary: { uploaded, errors, total: files.length } });
    } catch (error: any) {
      console.error("[Gallery BulkUpload] Error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // POST /api/gallery/assign - link existing media to quote or invoice
  app.post("/api/gallery/assign", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { mediaIds, entityId, entityType, reference } = req.body;
      if (!mediaIds || !entityId || !entityType) {
        return res.status(400).json({ message: "Paramètres manquants" });
      }

      for (const mediaId of mediaIds) {
        let mediaData: any;
        let table: string = "";
        const qmResult = await pool.query("SELECT * FROM quote_media WHERE id = $1", [mediaId]);
        if (qmResult.rows.length > 0) {
          mediaData = qmResult.rows[0];
          table = "quote_media";
        } else {
          const imResult = await pool.query("SELECT * FROM invoice_media WHERE id = $1", [mediaId]);
          if (imResult.rows.length > 0) {
            mediaData = imResult.rows[0];
            table = "invoice_media";
          }
        }

        if (!mediaData) continue;

        let nextNum = 1;
        if (entityType === "quote") {
          const countRes = await pool.query("SELECT COUNT(*) FROM quote_media WHERE quote_id = $1", [entityId]);
          nextNum = parseInt(countRes.rows[0].count) + 1;
        } else {
          const countRes = await pool.query("SELECT COUNT(*) FROM invoice_media WHERE invoice_id = $1", [entityId]);
          nextNum = parseInt(countRes.rows[0].count) + 1;
        }

        const ext = path.extname(mediaData.file_name);
        const safeRef = (reference || "").replace(/[^a-zA-Z0-9\-]/g, '_');
        const newFileName = `${safeRef}_${nextNum}${ext}`;

        const { renameMediaFile } = await import("./mediaService");
        let newPath: string;
        try {
          newPath = await renameMediaFile(mediaData.file_path, newFileName);
        } catch {
          newPath = mediaData.file_path;
        }

        if (table === "quote_media" && entityType === "quote") {
          await pool.query(
            "UPDATE quote_media SET quote_id = $1, file_name = $2, file_path = $3 WHERE id = $4",
            [entityId, newFileName, newPath, mediaId]
          );
        } else if (table === "invoice_media" && entityType === "invoice") {
          await pool.query(
            "UPDATE invoice_media SET invoice_id = $1, file_name = $2, file_path = $3 WHERE id = $4",
            [entityId, newFileName, newPath, mediaId]
          );
        } else if (table === "quote_media" && entityType === "invoice") {
          await pool.query("DELETE FROM quote_media WHERE id = $1", [mediaId]);
          await pool.query(
            "INSERT INTO invoice_media (id, invoice_id, file_type, file_path, file_name, file_size) VALUES ($1,$2,$3,$4,$5,$6)",
            [mediaId, entityId, mediaData.file_type, newPath, newFileName, mediaData.file_size]
          );
        } else if (table === "invoice_media" && entityType === "quote") {
          await pool.query("DELETE FROM invoice_media WHERE id = $1", [mediaId]);
          await pool.query(
            "INSERT INTO quote_media (id, quote_id, file_type, file_path, file_name, file_size) VALUES ($1,$2,$3,$4,$5,$6)",
            [mediaId, entityId, mediaData.file_type, newPath, newFileName, mediaData.file_size]
          );
        }
      }
      res.json({ message: "Association et renommage réussis" });
    } catch (e: any) {
      console.error("[Gallery Assign] Error:", e);
      res.status(500).json({ message: e.message });
    }
  });

  // GET /api/admin/search-entity - find quote or invoice by reference
  app.get("/api/admin/search-entity", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { q } = req.query;
      const quote = await pool.query("SELECT id, reference FROM quotes WHERE reference ILIKE $1 LIMIT 1", [`%${q}%`]);
      if (quote.rows.length > 0) {
        return res.json({ id: quote.rows[0].id, reference: quote.rows[0].reference, type: "quote" });
      }
      const invoice = await pool.query("SELECT id, invoice_number as reference FROM invoices WHERE invoice_number ILIKE $1 LIMIT 1", [`%${q}%`]);
      if (invoice.rows.length > 0) {
        return res.json({ id: invoice.rows[0].id, reference: invoice.rows[0].reference, type: "invoice" });
      }
      res.status(404).json({ message: "Non trouvé" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // POST /api/gallery/import/resolve - resolve import conflicts
  app.post("/api/gallery/import/resolve", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { conflicts, action } = req.body as { conflicts: any[]; action: "overwrite" | "rename" };
      if (!conflicts || !action) return res.status(400).json({ message: "conflicts et action requis" });

      const results: any[] = [];
      for (const c of conflicts) {
        try {
          if (!c.buffer || !c.filename || !c.entityType || !c.entityId) {
            results.push({ filename: c.filename, status: "error", reason: "Données manquantes" });
            continue;
          }
          const buffer = Buffer.from(c.buffer, "base64");
          const ext = path.extname(c.filename);
          const ref = c.reference || "unknown";
          const safeRef = ref.replace(/[^a-zA-Z0-9\-]/g, '_');
          const newFileName = action === "rename"
            ? `${Date.now()}-${Math.random().toString(36).slice(2, 7)}_${safeRef}_v2${ext}`
            : c.filename;
          const newPath = await uploadMedia(buffer, newFileName, c.entityType === "quote" ? "quotes" : "invoices", undefined, ref);
          const ft = /\.(jpg|jpeg|png|gif|webp)$/i.test(c.filename) ? "image" : /\.(mp4|mov|avi|webm)$/i.test(c.filename) ? "video" : "document";

          if (action === "overwrite" && c.mediaId) {
            if (c.entityType === "quote") {
              await pool.query("UPDATE quote_media SET file_path=$1, file_name=$2, file_size=$3 WHERE id=$4", [newPath, newFileName, buffer.length, c.mediaId]);
            } else {
              await pool.query("UPDATE invoice_media SET file_path=$1, file_name=$2, file_size=$3 WHERE id=$4", [newPath, newFileName, buffer.length, c.mediaId]);
            }
            results.push({ filename: c.filename, status: "overwritten", newPath });
          } else {
            const mediaId = crypto.randomUUID();
            if (c.entityType === "quote") {
              await pool.query("INSERT INTO quote_media (id, quote_id, file_type, file_path, file_name, file_size) VALUES ($1,$2,$3,$4,$5,$6)", [mediaId, c.entityId, ft, newPath, newFileName, buffer.length]);
            } else {
              await pool.query("INSERT INTO invoice_media (id, invoice_id, file_type, file_path, file_name, file_size) VALUES ($1,$2,$3,$4,$5,$6)", [mediaId, c.entityId, ft, newPath, newFileName, buffer.length]);
            }
            results.push({ filename: c.filename, status: "renamed", newPath, newFileName });
          }
        } catch (e: any) {
          results.push({ filename: c.filename, status: "error", reason: e.message });
        }
      }

      res.json({ results });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return server;
}
