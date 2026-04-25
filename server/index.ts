import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initBackupScheduler, updateBackupSchedule } from "./backupScheduler";
import { initDailyReportScheduler } from "./dailyReportScheduler";
import { initNotificationScheduler } from "./notificationScheduler";

const app = express();
app.set("trust proxy", 1);

app.use("/api/webhooks/stripe", express.raw({ type: "application/json" }));

app.use((req, res, next) => {
  const multerPaths = [
    '/api/ocr/', 
    '/api/mobile/upload', 
    '/api/mobile/quotes', 
    '/api/mobile/invoices',
    '/api/mobile/admin/',
    '/api/gallery/bulk-upload',
    '/api/gallery/import'
  ];
  if (multerPaths.some(p => req.path.startsWith(p))) {
    return next();
  }
  fileUpload({
    limits: { fileSize: 500 * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })(req, res, next);
});

app.use((req, res, next) => {
  if (req.path === "/api/webhooks/stripe") return next();
  express.json({ limit: '15mb' })(req, res, next);
});
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', async (req, res, next) => {
  const localPath = path.join(process.cwd(), 'uploads', req.path);
  if (fs.existsSync(localPath) && fs.statSync(localPath).isFile()) {
    return express.static('./uploads')(req, res, next);
  }
  try {
    const { ObjectStorageService } = await import("./replit_integrations/object_storage");
    const objStore = new ObjectStorageService();
    const filename = req.path.startsWith('/') ? req.path.slice(1) : req.path;
    const basename = path.basename(filename);
    const pathsToTry = [`uploads/${filename}`, filename, `uploads/${basename}`, basename];
    for (const storagePath of pathsToTry) {
      try {
        const file = await objStore.getObjectEntityFile(storagePath);
        await objStore.downloadObject(file, res);
        return;
      } catch (e) {}
    }
    next();
  } catch (err) {
    console.error(`[MediaFallback] Error:`, err.message);
    next();
  }
});

// Maintenance mode — set MAINTENANCE_MODE=true in env to activate
// Panel routes (/panel, /api/panel/*) are always accessible
app.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.MAINTENANCE_MODE !== "true") return next();
  const isPanelRoute = req.path.startsWith("/panel") || req.path.startsWith("/api/panel");
  const isHealthCheck = req.path === "/api/health" || req.path === "/health";
  if (isPanelRoute || isHealthCheck) return next();
  if (req.path.startsWith("/api/")) {
    return res.status(503).json({ message: "Service temporairement indisponible pour maintenance. Réessayez dans quelques instants." });
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 120) logLine = logLine.slice(0, 119) + "…";
      log(logLine);
    }
  });
  next();
});

(async () => {
  const server = createServer(app);
  await registerRoutes(app, server);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    res.status(status).json({ message: err.message || "Internal Server Error" });
  });

  const port = parseInt(process.env.PORT || '5000', 10);

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);

    initBackupScheduler();
    updateBackupSchedule({ enabled: true, time: '21:00', emailEnabled: false, emailRecipient: '' });
    initDailyReportScheduler();
    initNotificationScheduler();
  });
})();
