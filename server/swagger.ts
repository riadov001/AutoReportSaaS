import type { Express } from "express";
import { isAuthenticated, isRootAdmin } from "./localAuth";
import { getBaseUrl } from "./urlHelper";

export function registerSwaggerRoutes(app: Express) {

  app.get("/api/swagger/spec", isAuthenticated, isRootAdmin, (req: any, res) => {
    const baseUrl = getBaseUrl(req);
    const spec = buildOpenApiSpec(baseUrl);
    res.json(spec);
  });

  app.get("/api/swagger", isAuthenticated, isRootAdmin, (req: any, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>AutoReport API Documentation</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.17.14/swagger-ui.css">
  <style>
    body { margin: 0; background: #1a1a2e; }
    .swagger-ui .topbar { display: none; }
    #swagger-ui { max-width: 1400px; margin: 0 auto; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.17.14/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: '/api/swagger/spec',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
      layout: "BaseLayout",
      defaultModelsExpandDepth: -1,
      docExpansion: "none",
      filter: true,
      withCredentials: true,
    });
  </script>
</body>
</html>`);
  });
}

function buildOpenApiSpec(baseUrl: string) {
  return {
    openapi: "3.0.3",
    info: {
      title: "AutoReport API",
      version: "2.0.0",
      description: "API complète de gestion AutoReport — Devis, Factures, Réservations, Clients, Comptabilité, etc.\n\nAuthentification: Session cookie (web) ou Bearer JWT (mobile).",
      contact: { email: "contact@autoreport.com" },
    },
    servers: [{ url: baseUrl, description: "Serveur principal" }],
    tags: [
      { name: "Auth", description: "Authentification (web + mobile)" },
      { name: "Auth Mobile", description: "Authentification JWT mobile" },
      { name: "Utilisateurs", description: "Gestion des utilisateurs" },
      { name: "Clients", description: "Gestion des clients" },
      { name: "Services", description: "Services proposés" },
      { name: "Devis", description: "Gestion des devis" },
      { name: "Devis - Lignes", description: "Lignes de devis" },
      { name: "Devis - Médias", description: "Photos/docs associés aux devis" },
      { name: "Factures", description: "Gestion des factures" },
      { name: "Factures - Lignes", description: "Lignes de factures" },
      { name: "Factures - Médias", description: "Photos/docs associés aux factures" },
      { name: "Réservations", description: "Réservations / planning" },
      { name: "Ordres de Réparation", description: "Ordres de réparation atelier" },
      { name: "Workflows", description: "Workflows et étapes" },
      { name: "Engagements", description: "Engagements / prestations client" },
      { name: "Bons de Livraison", description: "Bons de livraison" },
      { name: "Avis", description: "Avis clients" },
      { name: "Dépenses", description: "Gestion des dépenses" },
      { name: "Catégories Dépenses", description: "Catégories de dépenses" },
      { name: "Avoirs", description: "Notes de crédit / avoirs" },
      { name: "Comptabilité", description: "Module comptable" },
      { name: "Paiements", description: "Paiements Stripe" },
      { name: "Notifications", description: "Notifications utilisateur" },
      { name: "Règles Notifications", description: "Règles de notifications auto" },
      { name: "Sauvegardes", description: "Sauvegardes et restauration" },
      { name: "Exports", description: "Export de données" },
      { name: "Imports", description: "Import de données (Root Admin)" },
      { name: "OCR", description: "Scan de documents (Mindee)" },
      { name: "Analytics", description: "Tableaux de bord et statistiques" },
      { name: "Audit", description: "Journal d'audit" },
      { name: "SMS", description: "Envoi de SMS (Twilio)" },
      { name: "Stockage", description: "Gestion du stockage cloud" },
      { name: "Chat", description: "Messagerie interne" },
      { name: "IA", description: "Assistant IA" },
      { name: "Paramètres", description: "Configuration de l'application" },
      { name: "Mobile", description: "Routes spécifiques mobile" },
      { name: "Mobile Admin", description: "Proxy admin via mobile (même routes que /api/admin/*)" },
      { name: "Public", description: "Routes publiques (sans auth)" },
    ],
    components: {
      securitySchemes: {
        sessionCookie: { type: "apiKey", in: "cookie", name: "autoreport.sid", description: "Session cookie (web)" },
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT", description: "JWT Token (mobile)" },
      },
      schemas: {
        Error: { type: "object", properties: { message: { type: "string" } } },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            email: { type: "string", format: "email" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            phone: { type: "string" },
            role: { type: "string", enum: ["client", "client_professionnel", "employe", "admin", "superadmin", "rootadmin"] },
            profileImageUrl: { type: "string" },
            garageId: { type: "string", format: "uuid" },
          },
        },
        Quote: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            reference: { type: "string" },
            clientId: { type: "string" },
            status: { type: "string", enum: ["draft", "sent", "approved", "rejected", "expired", "converted"] },
            totalHT: { type: "string" },
            totalTTC: { type: "string" },
            tvaRate: { type: "string" },
            validUntil: { type: "string", format: "date" },
            vehicleBrand: { type: "string" },
            vehicleModel: { type: "string" },
            licensePlate: { type: "string" },
          },
        },
        Invoice: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            invoiceNumber: { type: "string" },
            clientId: { type: "string" },
            quoteId: { type: "string" },
            status: { type: "string", enum: ["draft", "sent", "paid", "overdue", "cancelled", "partial"] },
            totalHT: { type: "string" },
            totalTTC: { type: "string" },
            tvaRate: { type: "string" },
            dueDate: { type: "string", format: "date" },
            paymentMethod: { type: "string" },
          },
        },
        Reservation: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            clientId: { type: "string" },
            serviceId: { type: "string" },
            date: { type: "string", format: "date" },
            timeSlot: { type: "string" },
            status: { type: "string", enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"] },
            vehicleBrand: { type: "string" },
            vehicleModel: { type: "string" },
          },
        },
        Service: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            description: { type: "string" },
            basePrice: { type: "string" },
            duration: { type: "integer" },
            category: { type: "string" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
            tokenType: { type: "string", example: "Bearer" },
            user: { $ref: "#/components/schemas/User" },
          },
        },
      },
    },
    security: [{ sessionCookie: [] }, { bearerAuth: [] }],
    paths: {
      ...authPaths(),
      ...mobileAuthPaths(),
      ...userPaths(),
      ...clientPaths(),
      ...servicePaths(),
      ...quotePaths(),
      ...quoteItemPaths(),
      ...quoteMediaPaths(),
      ...invoicePaths(),
      ...invoiceItemPaths(),
      ...invoiceMediaPaths(),
      ...reservationPaths(),
      ...repairOrderPaths(),
      ...workflowPaths(),
      ...engagementPaths(),
      ...deliveryNotePaths(),
      ...reviewPaths(),
      ...expensePaths(),
      ...expenseCategoryPaths(),
      ...creditNotePaths(),
      ...accountingPaths(),
      ...paymentPaths(),
      ...notificationPaths(),
      ...notificationRulePaths(),
      ...backupPaths(),
      ...exportPaths(),
      ...importPaths(),
      ...ocrPaths(),
      ...analyticsPaths(),
      ...auditPaths(),
      ...smsPaths(),
      ...storagePaths(),
      ...chatPaths(),
      ...aiPaths(),
      ...settingsPaths(),
      ...publicPaths(),
      ...mobileSpecificPaths(),
      ...mobileAdminProxyInfo(),
    },
  };
}

function ok(desc: string, schema?: any) {
  const r: any = { description: desc };
  if (schema) r.content = { "application/json": { schema } };
  return r;
}
function ref(s: string) { return { $ref: `#/components/schemas/${s}` }; }
function arr(s: string) { return { type: "array", items: ref(s) }; }
function err(code: string, desc: string) { return { description: `${code} - ${desc}`, content: { "application/json": { schema: ref("Error") } } }; }
function body(schema: any) { return { required: true, content: { "application/json": { schema } } }; }
function idParam(name = "id") { return { name, in: "path" as const, required: true, schema: { type: "string" as const, format: "uuid" } }; }
function qp(name: string, desc: string, type = "string") { return { name, in: "query" as const, schema: { type }, description: desc }; }

function authPaths() {
  return {
    "/api/login": {
      post: {
        tags: ["Auth"], summary: "Connexion (web session)",
        requestBody: body({ type: "object", required: ["email", "password"], properties: { email: { type: "string" }, password: { type: "string" } } }),
        responses: { "200": ok("Connexion réussie", ref("User")), "401": err("401", "Identifiants incorrects") },
      },
    },
    "/api/logout": { post: { tags: ["Auth"], summary: "Déconnexion", responses: { "200": ok("Déconnexion réussie") } } },
    "/api/register": {
      post: {
        tags: ["Auth"], summary: "Inscription (client)",
        requestBody: body({ type: "object", required: ["email", "password"], properties: { email: { type: "string" }, password: { type: "string" }, firstName: { type: "string" }, lastName: { type: "string" }, role: { type: "string", enum: ["client", "client_professionnel"] }, companyName: { type: "string" }, siret: { type: "string" } } }),
        responses: { "200": ok("Utilisateur créé", ref("User")), "400": err("400", "Email déjà utilisé") },
      },
    },
    "/api/auth/user": { get: { tags: ["Auth"], summary: "Utilisateur connecté", responses: { "200": ok("Utilisateur courant", ref("User")), "401": err("401", "Non authentifié") } } },
    "/api/auth/reset-password": {
      post: { tags: ["Auth"], summary: "Demande de réinitialisation mot de passe",
        requestBody: body({ type: "object", required: ["email"], properties: { email: { type: "string" } } }),
        responses: { "200": ok("Email envoyé") },
      },
    },
  };
}

function mobileAuthPaths() {
  return {
    "/api/mobile/auth/login": {
      post: {
        tags: ["Auth Mobile"], summary: "Connexion mobile (JWT)",
        requestBody: body({ type: "object", required: ["email", "password"], properties: { email: { type: "string" }, password: { type: "string" } } }),
        responses: { "200": ok("Tokens JWT", ref("LoginResponse")), "401": err("401", "Identifiants incorrects") },
      },
    },
    "/api/mobile/auth/me": { get: { tags: ["Auth Mobile"], summary: "Profil utilisateur mobile", security: [{ bearerAuth: [] }], responses: { "200": ok("Utilisateur", ref("User")) } } },
    "/api/mobile/refresh-token": {
      post: {
        tags: ["Auth Mobile"], summary: "Renouveler le token JWT",
        requestBody: body({ type: "object", required: ["refreshToken"], properties: { refreshToken: { type: "string" } } }),
        responses: { "200": ok("Nouveaux tokens", ref("LoginResponse")), "401": err("401", "Token invalide") },
      },
    },
  };
}

function crudPaths(basePath: string, tag: string, schemaName: string, extra?: Record<string, any>) {
  const paths: any = {};
  paths[basePath] = {
    get: { tags: [tag], summary: `Lister les ${tag.toLowerCase()}`, responses: { "200": ok(`Liste des ${tag.toLowerCase()}`, arr(schemaName)) } },
    post: { tags: [tag], summary: `Créer un(e) ${tag.toLowerCase()}`, requestBody: body(ref(schemaName)), responses: { "201": ok("Créé", ref(schemaName)) } },
  };
  paths[`${basePath}/{id}`] = {
    get: { tags: [tag], summary: `Détail ${tag.toLowerCase()}`, parameters: [idParam()], responses: { "200": ok("Détail", ref(schemaName)), "404": err("404", "Non trouvé") } },
    patch: { tags: [tag], summary: `Modifier ${tag.toLowerCase()}`, parameters: [idParam()], requestBody: body(ref(schemaName)), responses: { "200": ok("Modifié", ref(schemaName)) } },
    delete: { tags: [tag], summary: `Supprimer ${tag.toLowerCase()}`, parameters: [idParam()], responses: { "200": ok("Supprimé") } },
  };
  if (extra) Object.assign(paths, extra);
  return paths;
}

function userPaths() { return crudPaths("/api/admin/users", "Utilisateurs", "User", {
  "/api/admin/users/{id}/password": { patch: { tags: ["Utilisateurs"], summary: "Changer mot de passe", parameters: [idParam()], requestBody: body({ type: "object", properties: { password: { type: "string" } } }), responses: { "200": ok("Modifié") } } },
}); }

function clientPaths() { return { "/api/admin/clients": { post: { tags: ["Clients"], summary: "Créer un client", requestBody: body(ref("User")), responses: { "201": ok("Client créé", ref("User")) } } } }; }

function servicePaths() { return crudPaths("/api/admin/services", "Services", "Service"); }

function quotePaths() {
  return crudPaths("/api/admin/quotes", "Devis", "Quote", {
    "/api/admin/quotes/{id}/send-email": { post: { tags: ["Devis"], summary: "Envoyer le devis par email", parameters: [idParam()], responses: { "200": ok("Email envoyé") } } },
  });
}

function quoteItemPaths() {
  return {
    "/api/admin/quotes/{id}/items": {
      get: { tags: ["Devis - Lignes"], summary: "Lister les lignes du devis", parameters: [idParam()], responses: { "200": ok("Lignes") } },
      post: { tags: ["Devis - Lignes"], summary: "Ajouter une ligne", parameters: [idParam()], requestBody: body({ type: "object", properties: { description: { type: "string" }, quantity: { type: "number" }, unitPrice: { type: "string" }, tvaRate: { type: "string" } } }), responses: { "201": ok("Ligne ajoutée") } },
    },
    "/api/admin/quote-items/{id}": {
      patch: { tags: ["Devis - Lignes"], summary: "Modifier une ligne", parameters: [idParam()], responses: { "200": ok("Modifiée") } },
      delete: { tags: ["Devis - Lignes"], summary: "Supprimer une ligne", parameters: [idParam()], responses: { "200": ok("Supprimée") } },
    },
  };
}

function quoteMediaPaths() {
  return {
    "/api/admin/quotes/{id}/media": {
      get: { tags: ["Devis - Médias"], summary: "Lister les médias du devis", parameters: [idParam()], responses: { "200": ok("Médias") } },
      post: { tags: ["Devis - Médias"], summary: "Ajouter un média", parameters: [idParam()], requestBody: { content: { "multipart/form-data": { schema: { type: "object", properties: { media: { type: "string", format: "binary" } } } } } }, responses: { "200": ok("Média ajouté") } },
    },
    "/api/admin/quote-media/{mediaId}": { delete: { tags: ["Devis - Médias"], summary: "Supprimer un média", parameters: [{ name: "mediaId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Supprimé") } } },
    "/api/admin/quotes/{id}/media/download-zip": { get: { tags: ["Devis - Médias"], summary: "Télécharger les médias en ZIP", parameters: [idParam()], responses: { "200": { description: "Fichier ZIP", content: { "application/zip": {} } } } } },
  };
}

function invoicePaths() {
  return crudPaths("/api/admin/invoices", "Factures", "Invoice", {
    "/api/admin/invoices/direct": { post: { tags: ["Factures"], summary: "Créer une facture directe (sans devis)", requestBody: body(ref("Invoice")), responses: { "201": ok("Facture créée") } } },
    "/api/admin/invoices/{id}/send-email": { post: { tags: ["Factures"], summary: "Envoyer la facture par email", parameters: [idParam()], responses: { "200": ok("Email envoyé") } } },
    "/api/admin/clients/{clientId}/invoices": { get: { tags: ["Factures"], summary: "Factures d'un client", parameters: [{ name: "clientId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Factures") } } },
  });
}

function invoiceItemPaths() {
  return {
    "/api/admin/invoices/{id}/items": {
      get: { tags: ["Factures - Lignes"], summary: "Lister les lignes", parameters: [idParam()], responses: { "200": ok("Lignes") } },
      post: { tags: ["Factures - Lignes"], summary: "Ajouter une ligne", parameters: [idParam()], responses: { "201": ok("Ajoutée") } },
    },
    "/api/admin/invoice-items/{id}": {
      patch: { tags: ["Factures - Lignes"], summary: "Modifier une ligne", parameters: [idParam()], responses: { "200": ok("Modifiée") } },
      delete: { tags: ["Factures - Lignes"], summary: "Supprimer une ligne", parameters: [idParam()], responses: { "200": ok("Supprimée") } },
    },
  };
}

function invoiceMediaPaths() {
  return {
    "/api/admin/invoices/{id}/media": {
      get: { tags: ["Factures - Médias"], summary: "Lister les médias", parameters: [idParam()], responses: { "200": ok("Médias") } },
      post: { tags: ["Factures - Médias"], summary: "Ajouter un média", parameters: [idParam()], responses: { "200": ok("Ajouté") } },
    },
    "/api/admin/invoice-media/{mediaId}": { delete: { tags: ["Factures - Médias"], summary: "Supprimer un média", parameters: [{ name: "mediaId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Supprimé") } } },
    "/api/admin/invoices/{id}/media/download-zip": { get: { tags: ["Factures - Médias"], summary: "Télécharger en ZIP", parameters: [idParam()], responses: { "200": { description: "ZIP", content: { "application/zip": {} } } } } },
  };
}

function reservationPaths() {
  return crudPaths("/api/admin/reservations", "Réservations", "Reservation", {
    "/api/admin/reservations/{id}/services": { get: { tags: ["Réservations"], summary: "Services associés", parameters: [idParam()], responses: { "200": ok("Services") } } },
  });
}

function repairOrderPaths() {
  return crudPaths("/api/admin/repair-orders", "Ordres de Réparation", "Error", {
    "/api/admin/repair-orders/reservation/{reservationId}": { get: { tags: ["Ordres de Réparation"], summary: "OR par réservation", parameters: [{ name: "reservationId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Ordres") } } },
  });
}

function workflowPaths() {
  return {
    ...crudPaths("/api/admin/workflows", "Workflows", "Error"),
    "/api/admin/workflows/{workflowId}/steps": { get: { tags: ["Workflows"], summary: "Étapes du workflow", parameters: [{ name: "workflowId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Étapes") } } },
    "/api/admin/workflow-steps": { post: { tags: ["Workflows"], summary: "Créer une étape", responses: { "201": ok("Étape créée") } } },
    "/api/admin/workflow-steps/{stepId}": {
      patch: { tags: ["Workflows"], summary: "Modifier une étape", parameters: [{ name: "stepId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Modifiée") } },
      delete: { tags: ["Workflows"], summary: "Supprimer une étape", parameters: [{ name: "stepId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Supprimée") } },
    },
    "/api/admin/services/{serviceId}/workflows": {
      get: { tags: ["Workflows"], summary: "Workflows d'un service", parameters: [{ name: "serviceId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Workflows") } },
      post: { tags: ["Workflows"], summary: "Lier un workflow à un service", parameters: [{ name: "serviceId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Lié") } },
    },
    "/api/admin/init-all-default-workflows": { post: { tags: ["Workflows"], summary: "Initialiser les workflows par défaut pour tous les services", responses: { "200": ok("Initialisés") } } },
  };
}

function engagementPaths() {
  return crudPaths("/api/admin/engagements", "Engagements", "Error", {
    "/api/admin/engagements/summary/{clientId}": { get: { tags: ["Engagements"], summary: "Résumé engagements client", parameters: [{ name: "clientId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Résumé") } } },
    "/api/admin/engagements/clients-summary": { get: { tags: ["Engagements"], summary: "Résumé tous clients", responses: { "200": ok("Résumé global") } } },
  });
}

function deliveryNotePaths() { return crudPaths("/api/admin/delivery-notes", "Bons de Livraison", "Error"); }

function reviewPaths() {
  return {
    "/api/admin/reviews": { get: { tags: ["Avis"], summary: "Lister les avis", responses: { "200": ok("Avis") } } },
    "/api/admin/reviews/{id}/approve": { patch: { tags: ["Avis"], summary: "Approuver/publier un avis", parameters: [idParam()], responses: { "200": ok("Approuvé") } } },
    "/api/admin/reviews/{id}": { delete: { tags: ["Avis"], summary: "Supprimer un avis", parameters: [idParam()], responses: { "200": ok("Supprimé") } } },
  };
}

function expensePaths() { return crudPaths("/api/admin/expenses", "Dépenses", "Error"); }
function expenseCategoryPaths() { return crudPaths("/api/admin/expense-categories", "Catégories Dépenses", "Error"); }

function creditNotePaths() {
  return {
    "/api/admin/credit-notes": {
      get: { tags: ["Avoirs"], summary: "Lister les avoirs", responses: { "200": ok("Avoirs") } },
      post: { tags: ["Avoirs"], summary: "Créer un avoir", responses: { "201": ok("Créé") } },
    },
    "/api/admin/credit-notes/{id}": {
      get: { tags: ["Avoirs"], summary: "Détail avoir", parameters: [idParam()], responses: { "200": ok("Avoir") } },
      patch: { tags: ["Avoirs"], summary: "Modifier un avoir", parameters: [idParam()], responses: { "200": ok("Modifié") } },
    },
  };
}

function accountingPaths() {
  return {
    "/api/admin/accounting/entries": {
      get: { tags: ["Comptabilité"], summary: "Écritures comptables", parameters: [qp("startDate", "Date début"), qp("endDate", "Date fin")], responses: { "200": ok("Écritures") } },
      post: { tags: ["Comptabilité"], summary: "Créer une écriture", responses: { "201": ok("Créée") } },
    },
    "/api/admin/accounting/entries/{id}": { get: { tags: ["Comptabilité"], summary: "Détail écriture", parameters: [idParam()], responses: { "200": ok("Écriture") } } },
    "/api/admin/accounting/entries/{id}/validate": { patch: { tags: ["Comptabilité"], summary: "Valider une écriture", parameters: [idParam()], responses: { "200": ok("Validée") } } },
    "/api/admin/accounting/backfill-invoices": { post: { tags: ["Comptabilité"], summary: "Rattrapage écritures depuis factures", responses: { "200": ok("Rattrapage effectué") } } },
    "/api/admin/accounting/tva-report": { get: { tags: ["Comptabilité"], summary: "Rapport TVA", parameters: [qp("startDate", "Début"), qp("endDate", "Fin")], responses: { "200": ok("Rapport TVA") } } },
    "/api/admin/accounting/profit-loss": { get: { tags: ["Comptabilité"], summary: "Compte de résultat", responses: { "200": ok("P&L") } } },
    "/api/admin/accounting/cash-flow": { get: { tags: ["Comptabilité"], summary: "Flux de trésorerie", responses: { "200": ok("Cash flow") } } },
    "/api/admin/accounting/fec-export": { post: { tags: ["Comptabilité"], summary: "Export FEC", responses: { "200": ok("FEC généré") } } },
    "/api/admin/accounting/fec-exports": { get: { tags: ["Comptabilité"], summary: "Liste exports FEC", responses: { "200": ok("Exports") } } },
    "/api/admin/accounting/dossier-validation": { get: { tags: ["Comptabilité"], summary: "Validation dossier comptable", responses: { "200": ok("Validation") } } },
    "/api/admin/accounting/dossier-export": { post: { tags: ["Comptabilité"], summary: "Export dossier comptable", responses: { "200": ok("Dossier") } } },
    "/api/admin/accounting/e-invoicing/compliance": { get: { tags: ["Comptabilité"], summary: "Conformité e-invoicing", responses: { "200": ok("Statut") } } },
  };
}

function paymentPaths() {
  return {
    "/api/admin/payment/generate-link": { post: { tags: ["Paiements"], summary: "Générer un lien de paiement", requestBody: body({ type: "object", properties: { invoiceId: { type: "string" } } }), responses: { "200": ok("Lien généré") } } },
    "/api/admin/payments": { get: { tags: ["Paiements"], summary: "Lister les paiements", responses: { "200": ok("Paiements") } } },
  };
}

function notificationPaths() {
  return {
    "/api/notifications": { get: { tags: ["Notifications"], summary: "Mes notifications", responses: { "200": ok("Notifications") } } },
    "/api/notifications/unread-count": { get: { tags: ["Notifications"], summary: "Nombre non lues", responses: { "200": ok("Compteur") } } },
    "/api/notifications/{id}/read": { patch: { tags: ["Notifications"], summary: "Marquer comme lue", parameters: [idParam()], responses: { "200": ok("Lu") } } },
    "/api/notifications/mark-all-read": { post: { tags: ["Notifications"], summary: "Tout marquer comme lu", responses: { "200": ok("OK") } } },
  };
}

function notificationRulePaths() { return crudPaths("/api/admin/notification-rules", "Règles Notifications", "Error"); }

function backupPaths() {
  return {
    "/api/admin/backups": {
      get: { tags: ["Sauvegardes"], summary: "Lister les sauvegardes", responses: { "200": ok("Sauvegardes") } },
      post: { tags: ["Sauvegardes"], summary: "Créer une sauvegarde médias", responses: { "200": ok("Sauvegarde créée") } },
    },
    "/api/admin/backups/stats": { get: { tags: ["Sauvegardes"], summary: "Statistiques de stockage", responses: { "200": ok("Stats") } } },
    "/api/admin/backups/{name}/download": { get: { tags: ["Sauvegardes"], summary: "Télécharger une sauvegarde", parameters: [{ name: "name", in: "path", required: true, schema: { type: "string" } }], responses: { "200": { description: "Fichier", content: { "application/octet-stream": {} } } } } },
    "/api/admin/backups/{name}": { delete: { tags: ["Sauvegardes"], summary: "Supprimer une sauvegarde (Super Admin)", parameters: [{ name: "name", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Supprimée") } } },
    "/api/admin/backup-scheduler": {
      get: { tags: ["Sauvegardes"], summary: "Config planificateur", responses: { "200": ok("Config") } },
      post: { tags: ["Sauvegardes"], summary: "Configurer planificateur", responses: { "200": ok("OK") } },
    },
    "/api/admin/backup-now": { post: { tags: ["Sauvegardes"], summary: "Sauvegarde immédiate", responses: { "200": ok("Lancée") } } },
    "/api/admin/restore": { post: { tags: ["Sauvegardes"], summary: "Restaurer depuis JSON", responses: { "200": ok("Restauré") } } },
  };
}

function exportPaths() {
  return {
    "/api/admin/export-data": { get: { tags: ["Exports"], summary: "Export JSON complet (Super Admin)", responses: { "200": { description: "JSON", content: { "application/json": {} } } } } },
    "/api/admin/export-database": { get: { tags: ["Exports"], summary: "Export base de données SQL", responses: { "200": { description: "SQL", content: { "application/sql": {} } } } } },
    "/api/admin/export/quotes": { get: { tags: ["Exports"], summary: "Export devis CSV/Excel", parameters: [qp("format", "csv ou xlsx")], responses: { "200": { description: "Fichier" } } } },
    "/api/admin/export/invoices": { get: { tags: ["Exports"], summary: "Export factures CSV/Excel", parameters: [qp("format", "csv ou xlsx")], responses: { "200": { description: "Fichier" } } } },
  };
}

function importPaths() {
  return {
    "/api/admin/import/csv": { post: { tags: ["Imports"], summary: "Import CSV en masse (Root Admin)", requestBody: { content: { "multipart/form-data": { schema: { type: "object", properties: { file: { type: "string", format: "binary" }, type: { type: "string" } } } } } }, responses: { "200": ok("Importé") } } },
    "/api/admin/import-data": { post: { tags: ["Imports"], summary: "Import JSON (Root Admin)", responses: { "200": ok("Importé") } } },
    "/api/admin/import-sql": { post: { tags: ["Imports"], summary: "Import SQL (Root Admin)", responses: { "200": ok("Importé") } } },
    "/api/admin/import-media": { post: { tags: ["Imports"], summary: "Import médias (Root Admin)", responses: { "200": ok("Importé") } } },
  };
}

function ocrPaths() {
  return {
    "/api/admin/ocr/history": { get: { tags: ["OCR"], summary: "Historique des scans", responses: { "200": ok("Scans") } } },
    "/api/admin/ocr/history/{id}": {
      get: { tags: ["OCR"], summary: "Détail scan", parameters: [idParam()], responses: { "200": ok("Scan") } },
      delete: { tags: ["OCR"], summary: "Supprimer scan", parameters: [idParam()], responses: { "200": ok("Supprimé") } },
    },
    "/api/admin/ocr/create-quote": { post: { tags: ["OCR"], summary: "Créer devis depuis OCR", responses: { "201": ok("Devis créé") } } },
    "/api/admin/ocr/create-invoice": { post: { tags: ["OCR"], summary: "Créer facture depuis OCR", responses: { "201": ok("Facture créée") } } },
    "/api/admin/ocr/create-credit-note": { post: { tags: ["OCR"], summary: "Créer avoir depuis OCR", responses: { "201": ok("Avoir créé") } } },
    "/api/admin/ocr/create-expense": { post: { tags: ["OCR"], summary: "Créer dépense depuis OCR", responses: { "201": ok("Dépense créée") } } },
  };
}

function analyticsPaths() {
  return {
    "/api/admin/analytics": { get: { tags: ["Analytics"], summary: "Dashboard principal", responses: { "200": ok("Analytics") } } },
    "/api/admin/advanced-analytics": { get: { tags: ["Analytics"], summary: "Analytics avancées", parameters: [qp("startDate", "Début"), qp("endDate", "Fin")], responses: { "200": ok("Analytics avancées") } } },
  };
}

function auditPaths() {
  return {
    "/api/admin/audit-logs": { get: { tags: ["Audit"], summary: "Journal d'audit", parameters: [qp("page", "Page", "integer"), qp("limit", "Par page", "integer")], responses: { "200": ok("Logs") } } },
    "/api/admin/audit-logs/{id}": { get: { tags: ["Audit"], summary: "Détail entrée audit", parameters: [idParam()], responses: { "200": ok("Entrée") } } },
    "/api/admin/entity-history/{entityType}/{entityId}": { get: { tags: ["Audit"], summary: "Historique d'une entité", parameters: [{ name: "entityType", in: "path", required: true, schema: { type: "string" } }, { name: "entityId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Historique") } } },
  };
}

function smsPaths() {
  return {
    "/api/admin/sms/logs": { get: { tags: ["SMS"], summary: "Historique SMS", responses: { "200": ok("Logs SMS") } } },
    "/api/admin/sms/stats": { get: { tags: ["SMS"], summary: "Statistiques SMS", responses: { "200": ok("Stats") } } },
    "/api/admin/sms/test": { post: { tags: ["SMS"], summary: "Envoyer SMS test", requestBody: body({ type: "object", properties: { to: { type: "string" }, message: { type: "string" } } }), responses: { "200": ok("Envoyé") } } },
  };
}

function storagePaths() {
  return {
    "/api/admin/storage/status": { get: { tags: ["Stockage"], summary: "Statut du stockage", responses: { "200": ok("Statut") } } },
    "/api/admin/r2/files": { get: { tags: ["Stockage"], summary: "Fichiers R2", responses: { "200": ok("Fichiers") } } },
    "/api/admin/r2/migrate-local": { post: { tags: ["Stockage"], summary: "Migrer fichiers locaux vers cloud", responses: { "200": ok("Migration lancée") } } },
  };
}

function chatPaths() {
  return {
    "/api/mobile/chat/conversations": {
      get: { tags: ["Chat"], summary: "Mes conversations", security: [{ bearerAuth: [] }], responses: { "200": ok("Conversations") } },
      post: { tags: ["Chat"], summary: "Créer conversation", security: [{ bearerAuth: [] }], requestBody: body({ type: "object", properties: { title: { type: "string" }, participantIds: { type: "array", items: { type: "string" } }, type: { type: "string" } } }), responses: { "200": ok("Conversation") } },
    },
    "/api/mobile/chat/conversations/{id}/messages": {
      get: { tags: ["Chat"], summary: "Messages d'une conversation", security: [{ bearerAuth: [] }], parameters: [idParam()], responses: { "200": ok("Messages") } },
      post: { tags: ["Chat"], summary: "Envoyer un message", security: [{ bearerAuth: [] }], parameters: [idParam()], requestBody: body({ type: "object", required: ["content"], properties: { content: { type: "string" } } }), responses: { "200": ok("Message envoyé") } },
    },
  };
}

function aiPaths() {
  return {
    "/api/mobile/ai/assistant": { post: { tags: ["IA"], summary: "Assistant IA", security: [{ bearerAuth: [] }], requestBody: body({ type: "object", required: ["messages"], properties: { messages: { type: "array", items: { type: "object", properties: { role: { type: "string" }, content: { type: "string" } } } } } }), responses: { "200": ok("Réponse IA") } } },
  };
}

function settingsPaths() {
  return {
    "/api/admin/settings": {
      get: { tags: ["Paramètres"], summary: "Paramètres de l'application", responses: { "200": ok("Paramètres") } },
      patch: { tags: ["Paramètres"], summary: "Modifier les paramètres", responses: { "200": ok("Modifiés") } },
    },
    "/api/admin/garage-legal": {
      get: { tags: ["Paramètres"], summary: "Informations légales du garage", responses: { "200": ok("Info légales") } },
      patch: { tags: ["Paramètres"], summary: "Modifier les infos légales", responses: { "200": ok("Modifiées") } },
    },
    "/api/admin/daily-report/test": { post: { tags: ["Paramètres"], summary: "Envoyer rapport test", responses: { "200": ok("Envoyé") } } },
    "/api/admin/cache/clear": { post: { tags: ["Paramètres"], summary: "Vider le cache", responses: { "200": ok("Cache vidé") } } },
    "/api/admin/search-entity": { get: { tags: ["Paramètres"], summary: "Rechercher devis/facture par référence", parameters: [qp("q", "Référence")], responses: { "200": ok("Résultats") } } },
  };
}

function publicPaths() {
  return {
    "/api/public/quotes/{token}": { get: { tags: ["Public"], summary: "Consulter un devis (lien public)", parameters: [{ name: "token", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Devis"), "404": err("404", "Non trouvé") }, security: [] } },
    "/api/public/invoices/{token}": { get: { tags: ["Public"], summary: "Consulter une facture (lien public)", parameters: [{ name: "token", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Facture") }, security: [] } },
    "/api/public/reviews/{token}": { get: { tags: ["Public"], summary: "Consulter/laisser un avis (lien public)", parameters: [{ name: "token", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Avis") }, security: [] } },
    "/api/quotes/{id}/pdf": { get: { tags: ["Public"], summary: "Données PDF devis", parameters: [idParam()], responses: { "200": ok("Données PDF") }, security: [] } },
    "/api/invoices/{id}/pdf": { get: { tags: ["Public"], summary: "Données PDF facture", parameters: [idParam()], responses: { "200": ok("Données PDF") }, security: [] } },
  };
}

function mobileSpecificPaths() {
  return {
    "/api/mobile/profile": {
      get: { tags: ["Mobile"], summary: "Mon profil", security: [{ bearerAuth: [] }], responses: { "200": ok("Profil", ref("User")) } },
      patch: { tags: ["Mobile"], summary: "Modifier mon profil", security: [{ bearerAuth: [] }], responses: { "200": ok("Modifié") } },
    },
    "/api/mobile/profile/avatar": { post: { tags: ["Mobile"], summary: "Changer mon avatar", security: [{ bearerAuth: [] }], requestBody: { content: { "multipart/form-data": { schema: { type: "object", properties: { avatar: { type: "string", format: "binary" } } } } } }, responses: { "200": ok("Avatar mis à jour") } } },
    "/api/mobile/quotes": {
      get: { tags: ["Mobile"], summary: "Mes devis (selon rôle)", security: [{ bearerAuth: [] }], responses: { "200": ok("Devis", arr("Quote")) } },
      post: { tags: ["Mobile"], summary: "Créer un devis avec photos", security: [{ bearerAuth: [] }], responses: { "201": ok("Devis créé") } },
    },
    "/api/mobile/quotes/{id}": { get: { tags: ["Mobile"], summary: "Détail devis", security: [{ bearerAuth: [] }], parameters: [idParam()], responses: { "200": ok("Devis", ref("Quote")) } } },
    "/api/mobile/invoices": { get: { tags: ["Mobile"], summary: "Mes factures (selon rôle)", security: [{ bearerAuth: [] }], responses: { "200": ok("Factures", arr("Invoice")) } } },
    "/api/mobile/invoices/{id}": { get: { tags: ["Mobile"], summary: "Détail facture", security: [{ bearerAuth: [] }], parameters: [idParam()], responses: { "200": ok("Facture", ref("Invoice")) } } },
    "/api/mobile/reservations": { get: { tags: ["Mobile"], summary: "Mes réservations", security: [{ bearerAuth: [] }], responses: { "200": ok("Réservations", arr("Reservation")) } } },
    "/api/mobile/services": { get: { tags: ["Mobile"], summary: "Services disponibles", security: [{ bearerAuth: [] }], responses: { "200": ok("Services", arr("Service")) } } },
    "/api/mobile/notifications": { get: { tags: ["Mobile"], summary: "Mes notifications", security: [{ bearerAuth: [] }], responses: { "200": ok("Notifications") } } },
    "/api/mobile/notifications/unread-count": { get: { tags: ["Mobile"], summary: "Notifications non lues", security: [{ bearerAuth: [] }], responses: { "200": ok("Compteur") } } },
    "/api/mobile/upload": { post: { tags: ["Mobile"], summary: "Upload image", security: [{ bearerAuth: [] }], requestBody: { content: { "multipart/form-data": { schema: { type: "object", properties: { image: { type: "string", format: "binary" }, folder: { type: "string" } } } } } }, responses: { "200": ok("URL du fichier") } } },
    "/api/mobile/upload/multiple": { post: { tags: ["Mobile"], summary: "Upload multiple images (max 10)", security: [{ bearerAuth: [] }], responses: { "200": ok("URLs") } } },
    "/api/mobile/routes": { get: { tags: ["Mobile"], summary: "Catalogue des routes API", security: [{ bearerAuth: [] }], responses: { "200": ok("Routes disponibles") } } },
  };
}

function mobileAdminProxyInfo() {
  return {
    "/api/mobile/admin/{path}": {
      get: {
        tags: ["Mobile Admin"],
        summary: "Proxy Admin (GET) - Toutes les routes /api/admin/* sont accessibles via /api/mobile/admin/*",
        description: "Ce proxy redirige automatiquement les requêtes `/api/mobile/admin/*` vers `/api/admin/*`.\nAuthentification par Bearer JWT requise.\nToutes les fonctionnalités admin (170+ routes) sont ainsi disponibles sur mobile.",
        parameters: [{ name: "path", in: "path", required: true, schema: { type: "string" }, description: "Sous-chemin admin (ex: quotes, invoices, users...)" }],
        security: [{ bearerAuth: [] }],
        responses: { "200": ok("Réponse admin"), "401": err("401", "Non authentifié"), "403": err("403", "Accès refusé") },
      },
      post: { tags: ["Mobile Admin"], summary: "Proxy Admin (POST)", parameters: [{ name: "path", in: "path", required: true, schema: { type: "string" } }], security: [{ bearerAuth: [] }], responses: { "200": ok("Réponse admin") } },
      patch: { tags: ["Mobile Admin"], summary: "Proxy Admin (PATCH)", parameters: [{ name: "path", in: "path", required: true, schema: { type: "string" } }], security: [{ bearerAuth: [] }], responses: { "200": ok("Réponse admin") } },
      delete: { tags: ["Mobile Admin"], summary: "Proxy Admin (DELETE)", parameters: [{ name: "path", in: "path", required: true, schema: { type: "string" } }], security: [{ bearerAuth: [] }], responses: { "200": ok("Réponse admin") } },
    },
  };
}
