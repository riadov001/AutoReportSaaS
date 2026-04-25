# AutoReport — Documentation Technique Complète

## Table des matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Architecture](#2-architecture)
3. [Structure des fichiers](#3-structure-des-fichiers)
4. [Base de données](#4-base-de-données)
5. [Authentification & Rôles](#5-authentification--rôles)
6. [API Routes](#6-api-routes)
7. [Composants Frontend](#7-composants-frontend)
8. [Pages](#8-pages)
9. [Services Serveur](#9-services-serveur)
10. [Intégrations Tierces](#10-intégrations-tierces)
11. [Branding & Design](#11-branding--design)
12. [Variables d'environnement](#12-variables-denvironnement)
13. [Déploiement](#13-déploiement)
14. [Accès](#14-accès)

---

## 1. Vue d'ensemble

**AutoReport** est une plateforme SaaS multi-tenant de gestion pour ateliers automobiles.

### Fonctionnalités principales

| Module | Description |
|---|---|
| **Devis** | Création, envoi, validation, suivi des devis clients |
| **Factures** | Facturation, paiements Stripe, export PDF, conformité Factur-X |
| **Réservations** | Calendrier, planning, assignation d'employés |
| **Clients** | CRM complet, clients particuliers et professionnels |
| **Atelier** | Suivi des tâches, checklists de workflow, ordres de réparation |
| **Comptabilité** | Charges, avoirs, écritures comptables, export FEC |
| **OCR Scanner** | Scan de documents via Mindee (factures, carte grise, CNI) |
| **Rapports IA** | Génération de rapports diagnostiques via Gemini |
| **Chat interne** | Messagerie temps réel entre employés |
| **Notifications** | SMS (Twilio), Email (Resend), notifications in-app |
| **Analytics** | Tableaux de bord avancés, prévisions, tendances |
| **Panel admin** | Interface rootadmin pour gérer les garages et feature flags |

---

## 2. Architecture

### Stack technique

| Couche | Technologie |
|---|---|
| **Frontend** | React 18 + TypeScript, Vite, Wouter, TanStack Query v5 |
| **UI** | Shadcn/ui (Radix UI), Tailwind CSS, Lucide Icons |
| **Backend** | Node.js + Express.js, TypeScript |
| **ORM** | Drizzle ORM |
| **Base de données** | PostgreSQL (Neon Serverless) |
| **Auth** | Replit OpenID Connect + sessions PostgreSQL |
| **Temps réel** | WebSockets (ws) |
| **Stockage médias** | Replit Object Storage (R2) > Cloudflare R2 > local |
| **PDF** | Génération côté serveur |
| **Police** | Exo 2 (Google Fonts) + JetBrains Mono |

### Multi-tenant

Chaque garage a son propre schéma PostgreSQL isolé :
- Schéma public : `users`, `garages`, `sessions` (partagés)
- Schéma garage : `garage_{slug}` → tables isolées (services, quotes, invoices, reservations…)

---

## 3. Structure des fichiers

```
autoreport/
├── client/                          # Frontend React
│   ├── public/
│   │   ├── icon-192.png             # PWA icon
│   │   ├── icon-512.png             # PWA icon
│   │   └── static/
│   │       ├── logo.png             # Logo statique
│   │       └── logo-email.png       # Logo pour emails
│   └── src/
│       ├── App.tsx                  # Router principal
│       ├── main.tsx                 # Point d'entrée React
│       ├── index.css                # Variables CSS / thème
│       ├── components/
│       │   ├── ui/                  # Composants Shadcn/ui
│       │   ├── app-sidebar.tsx      # Sidebar navigation admin
│       │   ├── autoreport-logo.tsx  # Composant logo
│       │   ├── create-client-dialog.tsx
│       │   ├── image-zoom-dialog.tsx
│       │   ├── labels-preview.tsx
│       │   ├── new-client-form.tsx
│       │   ├── notification-bell.tsx
│       │   ├── ObjectUploader.tsx
│       │   ├── report-display.tsx
│       │   ├── send-email-dialog.tsx
│       │   ├── status-badge.tsx
│       │   ├── theme-provider.tsx
│       │   └── theme-toggle.tsx
│       ├── hooks/
│       │   ├── useAuth.ts           # Hook d'authentification
│       │   ├── use-toast.ts
│       │   └── use-mobile.ts
│       ├── lib/
│       │   ├── queryClient.ts       # TanStack Query config
│       │   └── utils.ts
│       └── pages/
│           ├── landing.tsx              # Page d'accueil publique
│           ├── admin-dashboard.tsx      # Dashboard admin
│           ├── admin-clients.tsx        # Gestion clients
│           ├── admin-services.tsx       # Gestion services
│           ├── admin-garages.tsx        # Gestion garages
│           ├── admin-users.tsx          # Gestion utilisateurs
│           ├── admin-team.tsx           # Gestion équipe
│           ├── admin-reservations.tsx   # Calendrier/réservations
│           ├── admin-quote-edit.tsx     # Édition devis
│           ├── admin-invoice-edit.tsx   # Édition factures
│           ├── admin-delivery-notes.tsx # Bons de livraison
│           ├── admin-credit-notes.tsx   # Avoirs
│           ├── admin-payments.tsx       # Suivi paiements
│           ├── admin-accounting.tsx     # Comptabilité
│           ├── admin-expenses.tsx       # Charges/dépenses
│           ├── admin-reviews.tsx        # Avis clients
│           ├── admin-gallery.tsx        # Galerie médias
│           ├── admin-scanner.tsx        # OCR scanner
│           ├── admin-csv-import.tsx     # Import CSV
│           ├── admin-imports.tsx        # Imports données
│           ├── admin-engagements.tsx    # Engagements clients
│           ├── admin-engagements-gallery.tsx
│           ├── admin-service-workflows.tsx  # Workflows services
│           ├── admin-advanced-analytics.tsx # Analytics avancés
│           ├── admin-notification-settings.tsx
│           ├── admin-audit-logs.tsx     # Logs d'audit
│           ├── admin-app-logs.tsx       # Logs applicatifs
│           ├── admin-sms-logs.tsx       # Logs SMS
│           ├── admin-bank-connection.tsx # Connexion bancaire Plaid
│           ├── admin-rapports.tsx       # Rapports IA admin
│           ├── workshop-management.tsx  # Gestion atelier
│           ├── internal-chat.tsx        # Chat interne
│           ├── client-dashboard.tsx     # Dashboard client
│           ├── client-quotes.tsx        # Devis client
│           ├── client-invoices.tsx      # Factures client
│           ├── client-chat.tsx          # Chat client-garage
│           ├── services.tsx             # Catalogue services public
│           ├── employee-services.tsx    # Vue employé
│           ├── rapports.tsx             # Rapports IA client
│           ├── privacy-policy.tsx       # Politique de confidentialité
│           ├── legal.tsx                # Mentions légales
│           ├── forgot-password.tsx      # Mot de passe oublié
│           ├── reset-password.tsx       # Réinitialisation MDP
│           ├── payment-success.tsx      # Page succès paiement
│           ├── payment-cancel.tsx       # Page annulation paiement
│           └── not-found.tsx            # Page 404
│
├── server/                          # Backend Express
│   ├── index.ts                     # Point d'entrée serveur
│   ├── routes.ts                    # Toutes les routes API (~12k lignes)
│   ├── db.ts                        # Connexion Drizzle/Neon
│   ├── storage.ts                   # Interface IStorage + MemStorage
│   ├── vite.ts                      # Intégration Vite (dev)
│   ├── auth.ts                      # Authentification Replit OIDC
│   ├── cryptoConfig.ts              # Chiffrement AES-256-GCM
│   ├── aiAssistant.ts               # Service Gemini AI
│   ├── aiService.ts                 # Service rapports IA
│   ├── emailService.ts              # Envoi emails (Resend)
│   ├── smsService.ts                # SMS (Twilio)
│   ├── stripeService.ts             # Paiements Stripe
│   ├── objectStorage.ts             # Gestion médias (Object Storage)
│   ├── objectAcl.ts                 # Contrôle accès objets
│   ├── imageOptimizer.ts            # Optimisation images
│   ├── mediaBulkService.ts          # Migration médias en masse
│   ├── ocrVisionService.ts          # OCR via Mindee
│   ├── notificationScheduler.ts     # Scheduler notifications
│   ├── backupService.ts             # Sauvegarde automatique
│   ├── urlHelper.ts                 # Détection URL dynamique
│   ├── wsClients.ts                 # Gestion clients WebSocket
│   ├── swagger.ts                   # Documentation API Swagger
│   ├── googleDriveStorage.ts        # Stockage Google Drive (fallback)
│   ├── cloudflareR2Service.ts       # Cloudflare R2 (fallback)
│   ├── tenantContext.ts             # Création schéma tenant
│   ├── tenantMiddleware.ts          # Résolution tenant par requête
│   ├── tenantStorage.ts             # Requêtes dans schéma tenant
│   └── replit_integrations/
│       └── object_storage/
│           ├── index.ts             # Service Object Storage Replit
│           ├── objectAcl.ts         # ACL Object Storage
│           └── routes.ts            # Routes Object Storage
│
├── shared/
│   └── schema.ts                    # Schéma BDD Drizzle + types Zod
│
├── client/src/panel/                # Panel admin autonome
│   ├── PanelApp.tsx                 # Router panel
│   ├── PanelDashboard.tsx           # Dashboard panel
│   ├── PanelGarages.tsx             # Gestion garages
│   ├── PanelUsers.tsx               # Gestion utilisateurs panel
│   ├── PanelLanding.tsx             # Config landing page
│   ├── PanelFeatureFlags.tsx        # Feature flags
│   └── PanelLogin.tsx               # Login panel
│
├── index.html                       # HTML principal
├── vite.config.ts                   # Config Vite
├── tailwind.config.ts               # Config Tailwind
├── tsconfig.json                    # Config TypeScript
├── drizzle.config.ts                # Config Drizzle ORM
├── components.json                  # Config Shadcn
├── .env.example                     # Variables d'environnement (exemple)
├── BRANDING.md                      # Guide branding
├── DOCUMENTATION.md                 # Ce fichier
└── replit.md                        # Contexte projet (Replit)
```

---

## 4. Base de données

### Tables principales

#### `garages` — Multi-tenant
| Colonne | Type | Description |
|---|---|---|
| id | varchar UUID | Identifiant unique |
| name | varchar(255) | Nom du garage |
| slug | varchar(100) | Identifiant URL unique |
| logo | text | Logo (base64 ou URL) |
| primaryColor | varchar(20) | Couleur principale |
| secondaryColor | varchar(20) | Couleur secondaire |
| address/city/phone/email | varchar | Coordonnées |
| siren/siret/tvaNumber | varchar | Infos légales |
| iban/swift/bankName | varchar | Infos bancaires |
| defaultTaxRate | decimal | TVA par défaut (20%) |
| isActive | boolean | Garage actif |

#### `users` — Utilisateurs
| Colonne | Type | Description |
|---|---|---|
| id | varchar UUID | Identifiant unique |
| email | varchar | Email unique |
| password | varchar(255) | Mot de passe hashé (bcrypt) |
| role | enum | client / client_professionnel / employe / admin / superadmin / rootadmin |
| garageId | varchar | Garage associé |
| companyName/siret/tvaNumber | varchar | Infos pro (client_professionnel) |
| smsConsent | boolean | Consentement SMS |

#### `quotes` — Devis
| Colonne | Type | Description |
|---|---|---|
| reference | varchar(50) | Format DEV-MM-00001 |
| clientId | varchar | Client |
| serviceId | varchar | Service concerné |
| status | enum | pending / approved / accepted / rejected / completed |
| quoteAmount | decimal | Montant TTC |
| priceExcludingTax | decimal | Montant HT |
| taxRate | decimal | Taux TVA |
| requestDetails | jsonb | Données formulaire client |
| vehicleRegistration/Make/Model | varchar | Infos véhicule |
| viewToken | varchar(64) | Token accès public |

#### `invoices` — Factures
| Colonne | Type | Description |
|---|---|---|
| invoiceNumber | varchar(50) | Numéro unique |
| quoteId | varchar | Devis source (optionnel) |
| clientId | varchar | Client |
| amount | decimal | Montant TTC |
| status | enum | pending / paid / overdue / cancelled |
| paymentMethod | enum | cash / wire_transfer / card / stripe / sepa / klarna / alma |
| stripeSessionId | varchar | Session Stripe |
| dueDate | timestamp | Échéance |
| viewToken | varchar(64) | Token accès public |

#### `reservations` — Réservations
| Colonne | Type | Description |
|---|---|---|
| reference | varchar(50) | Format RES-MM-00001 |
| quoteId | varchar | Devis associé (optionnel) |
| clientId | varchar | Client |
| serviceId | varchar | Service |
| assignedEmployeeId | varchar | Employé assigné |
| scheduledDate | timestamp | Date/heure RDV |
| estimatedEndDate | timestamp | Fin estimée |
| status | enum | pending / confirmed / completed / cancelled |

#### `services` — Services
| Colonne | Type | Description |
|---|---|---|
| name | varchar(255) | Nom du service |
| description | text | Description |
| basePrice | decimal | Prix de base |
| category | varchar(100) | Catégorie |
| estimatedDuration | integer | Durée en minutes |
| isVisibleToClients | boolean | Visible sur portail client |
| customFormFields | jsonb | Champs formulaire personnalisés |

#### `expenses` — Charges
| Colonne | Type | Description |
|---|---|---|
| expenseNumber | varchar(50) | Numéro unique |
| vendor | varchar(255) | Fournisseur |
| amountHT | decimal | Montant HT |
| taxRate | decimal | Taux TVA |
| amountTTC | decimal | Montant TTC |
| status | enum | pending / paid / cancelled |
| attachmentPath | varchar | Justificatif |

#### `feature_flags` — Feature Flags
| Colonne | Type | Description |
|---|---|---|
| key | varchar(100) | Clé unique du flag |
| enabled | boolean | Activé/désactivé |
| description | text | Description |
| updatedBy | varchar | Modifié par |

#### `panel_users` — Administrateurs panel
| Colonne | Type | Description |
|---|---|---|
| email | varchar(255) | Email unique |
| passwordHash | text | Mot de passe bcrypt |
| role | varchar(20) | Rôle admin panel |

---

## 5. Authentification & Rôles

### Flux d'authentification principal
1. Replit OpenID Connect → sessions PostgreSQL
2. Cookies HTTP-only sécurisés
3. Refresh automatique de session

### Authentification panel (`/panel`)
- Email + mot de passe (bcrypt)
- JWT session indépendante
- Accès : `admin@autoreport.com` / `AutoReport2024!`

### Hiérarchie des rôles

| Rôle | Accès |
|---|---|
| `client` | Portail client (ses devis, factures, réservations) |
| `client_professionnel` | Comme client + informations entreprise |
| `employe` | Vues atelier, gestion des tâches |
| `admin` | Dashboard complet d'un garage |
| `superadmin` | Accès tous garages, peut changer de contexte |
| `rootadmin` | Accès total + panel admin système |

### Maintenance Mode
Définir `MAINTENANCE_MODE=true` dans les variables d'environnement pour bloquer toutes les routes non-panel avec une réponse 503.

---

## 6. API Routes

### Authentification
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/auth/user` | Utilisateur connecté |
| POST | `/api/auth/login` | Connexion email/password |
| POST | `/api/auth/logout` | Déconnexion |
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/forgot-password` | Demande reset MDP |
| POST | `/api/auth/reset-password` | Reset MDP |

### Devis
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/admin/quotes` | Liste des devis |
| POST | `/api/admin/quotes` | Créer un devis |
| GET | `/api/admin/quotes/:id` | Détail devis |
| PATCH | `/api/admin/quotes/:id` | Modifier devis |
| DELETE | `/api/admin/quotes/:id` | Supprimer devis |
| POST | `/api/admin/quotes/:id/send-email` | Envoyer devis par email |
| GET | `/api/quotes/view/:token` | Voir devis (lien public) |

### Factures
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/admin/invoices` | Liste des factures |
| POST | `/api/admin/invoices` | Créer une facture |
| PATCH | `/api/admin/invoices/:id` | Modifier facture |
| DELETE | `/api/admin/invoices/:id` | Supprimer facture |
| POST | `/api/admin/invoices/:id/send-email` | Envoyer facture |
| POST | `/api/admin/invoices/:id/create-payment` | Créer lien paiement Stripe |
| GET | `/api/invoices/view/:token` | Voir facture (lien public) |

### Réservations
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/admin/reservations` | Liste réservations |
| POST | `/api/admin/reservations` | Créer réservation |
| PATCH | `/api/admin/reservations/:id` | Modifier réservation |
| DELETE | `/api/admin/reservations/:id` | Supprimer réservation |

### Clients
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/admin/clients` | Liste clients |
| POST | `/api/admin/clients` | Créer client |
| PATCH | `/api/admin/clients/:id` | Modifier client |
| DELETE | `/api/admin/clients/:id` | Supprimer client |

### Services
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/services` | Services publics |
| GET | `/api/admin/services` | Services admin |
| POST | `/api/admin/services` | Créer service |
| PATCH | `/api/admin/services/:id` | Modifier service |

### Comptabilité
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/admin/expenses` | Charges |
| POST | `/api/admin/expenses` | Créer charge |
| GET | `/api/admin/credit-notes` | Avoirs |
| POST | `/api/admin/credit-notes` | Créer avoir |
| GET | `/api/admin/accounting/entries` | Écritures comptables |
| GET | `/api/admin/accounting/fec-export` | Export FEC |

### Panel Admin
| Méthode | Route | Description |
|---|---|---|
| POST | `/api/panel/auth/login` | Login panel |
| GET | `/api/panel/auth/me` | Infos admin panel |
| GET | `/api/panel/garages` | Liste garages |
| POST | `/api/panel/garages` | Créer garage |
| GET | `/api/panel/stats` | Statistiques globales |
| GET | `/api/panel/feature-flags` | Feature flags |
| POST | `/api/panel/feature-flags` | Créer feature flag |
| PATCH | `/api/panel/feature-flags/:id` | Modifier feature flag |
| DELETE | `/api/panel/feature-flags/:id` | Supprimer feature flag |

### IA & OCR
| Méthode | Route | Description |
|---|---|---|
| POST | `/api/ai/generate-report` | Générer rapport IA |
| POST | `/api/admin/ocr/scan` | Scanner document OCR |
| POST | `/api/admin/ai/analyze-image` | Analyser image IA |

### Stripe
| Méthode | Route | Description |
|---|---|---|
| POST | `/api/stripe/create-session` | Créer session paiement |
| POST | `/api/stripe/webhook` | Webhook Stripe |
| GET | `/api/stripe/session/:id` | Statut session |

---

## 7. Composants Frontend

### Composants UI (Shadcn/ui)
Situés dans `client/src/components/ui/` — tous les composants Radix UI :
`accordion`, `alert`, `avatar`, `badge`, `button`, `calendar`, `card`, `checkbox`, `dialog`, `dropdown-menu`, `form`, `input`, `label`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `switch`, `table`, `tabs`, `textarea`, `toast`, `toaster`, `toggle`, `tooltip`

### Composants personnalisés

#### `AutoReportLogo`
Logo AutoReport avec deux variantes :
- `variant="icon"` : icône seule (36x36px)
- `variant="full"` : icône + texte "Auto**Report**" + sous-titre "Diagnostics IA"

#### `AppSidebar`
Sidebar de navigation admin avec :
- Logo + nom garage
- Menu par rôle (admin, superadmin, rootadmin, employé)
- Sélecteur de garage (superadmin)
- Menu utilisateur avec déconnexion

#### `NotificationBell`
Cloche de notification en temps réel avec compteur non-lus.

#### `StatusBadge`
Badge coloré pour les statuts (pending, approved, paid, cancelled…).

#### `ObjectUploader`
Upload de fichiers vers l'Object Storage avec prévisualisation.

#### `LabelsPreview`
Prévisualisation des étiquettes QR codes pour documents.

#### `SendEmailDialog`
Dialog d'envoi email avec prévisualisation.

#### `CreateClientDialog` / `NewClientForm`
Formulaire de création client (particulier ou professionnel).

#### `ImageZoomDialog`
Dialog de zoom sur images avec navigation.

#### `ThemeProvider` / `ThemeToggle`
Gestion dark/light mode avec persistance localStorage.

#### `ReportDisplay`
Affichage formaté des rapports diagnostiques IA.

---

## 8. Pages

### Pages publiques
| Page | Route | Description |
|---|---|---|
| Landing | `/` | Page d'accueil avec hero, features, démo IA, tarifs |
| Services | `/services` | Catalogue services du garage |
| Voir devis | `/quotes/view/:token` | Lien public devis |
| Voir facture | `/invoices/view/:token` | Lien public facture |
| Paiement OK | `/payment/success` | Confirmation paiement |
| Paiement annulé | `/payment/cancel` | Annulation paiement |
| Politique | `/privacy-policy` | RGPD |
| Mentions légales | `/legal` | Mentions légales |

### Portail client
| Page | Route | Description |
|---|---|---|
| Dashboard | `/client` | Vue d'ensemble client |
| Devis | `/client/quotes` | Mes devis |
| Factures | `/client/invoices` | Mes factures |
| Chat | `/client/chat` | Chat avec le garage |
| Rapports | `/rapports` | Rapports IA |

### Dashboard admin
| Page | Route | Description |
|---|---|---|
| Dashboard | `/admin` | KPIs, stats, activité récente |
| Clients | `/admin/clients` | CRM clients |
| Services | `/admin/services` | Catalogue services |
| Devis | via dashboard | Création/édition devis |
| Factures | via dashboard | Création/édition factures |
| Réservations | `/admin/reservations` | Calendrier |
| Atelier | `/workshop` | Gestion atelier |
| Chat interne | `/internal-chat` | Messagerie équipe |
| Comptabilité | `/admin/accounting` | Module comptable |
| Charges | `/admin/expenses` | Dépenses |
| Avoirs | `/admin/credit-notes` | Notes de crédit |
| Bons livraison | `/admin/delivery-notes` | BLV |
| Analytics | `/admin/advanced-analytics` | Analytics avancés |
| Scanner OCR | `/admin/scanner` | Scan documents |
| Avis clients | `/admin/reviews` | Gestion avis |
| Galerie | `/admin/gallery` | Médias |
| SMS logs | `/admin/sms-logs` | Logs SMS |
| Audit logs | `/admin/audit-logs` | Traçabilité |
| Garages | `/admin/garages` | Gestion garages (superadmin) |
| Équipe | `/admin/team` | Gestion employés |
| Utilisateurs | `/admin/users` | Gestion comptes |
| Paramètres notif. | `/admin/notification-settings` | Règles notifications |

### Panel rootadmin
| Page | Route | Description |
|---|---|---|
| Login | `/panel` | Authentification panel |
| Dashboard | `/panel/dashboard` | Stats globales plateforme |
| Garages | `/panel/garages` | Tous les garages |
| Landing | `/panel/landing` | Config page d'accueil |
| Feature Flags | `/panel/feature-flags` | Activation/désactivation features |

---

## 9. Services Serveur

### `emailService.ts`
Envoi d'emails via **Resend API** :
- Devis (avec PDF en pièce jointe)
- Factures (avec PDF en pièce jointe)
- Demande d'avis
- Reset mot de passe
- Sauvegarde quotidienne

### `smsService.ts`
SMS via **Twilio** :
- Devis envoyé
- Facture envoyée
- Paiement confirmé
- Demande d'avis
- Rappel réservation

### `stripeService.ts`
Paiements en ligne :
- Payment Element (carte, SEPA, Klarna, Alma)
- Payment Intents
- Webhooks (confirmation paiement)
- Mise à jour automatique statut facture

### `aiAssistant.ts`
Service Gemini AI :
- Analyse d'images véhicules
- Génération de rapports diagnostiques
- Réponses contextuelles

### `ocrVisionService.ts`
OCR via **Mindee SDK v4** :
- Factures → création directe devis/facture
- Carte grise → extraction infos véhicule
- CNI / Passeport → identification client

### `notificationScheduler.ts`
Scheduler toutes les 5 minutes :
- Rappels réservations
- Factures en retard
- Devis expirant
- Emails de revue post-prestation

### `backupService.ts`
Sauvegarde automatique quotidienne (21h00 Europe/Paris) :
- Export BDD JSON
- ZIP médias
- Envoi email avec pièces jointes

### `cryptoConfig.ts`
Chiffrement AES-256-GCM :
- `encrypt(text)` → chiffre avec `CONFIG_ENCRYPTION_KEY`
- `decrypt(encrypted)` → déchiffre
- Utilisation : stockage sécurisé de configurations sensibles

### `urlHelper.ts`
Détection dynamique de l'URL de base :
- Ordre de priorité : `PUBLIC_BASE_URL` > `REPLIT_DOMAINS` > `x-forwarded-host` > `Host`

### `tenantMiddleware.ts`
Résolution du tenant par requête :
- Lit `garageId` depuis la session
- Définit `req.tenantSchema`, `req.tenantGarageId`, `req.tenantGarageSlug`

---

## 10. Intégrations Tierces

| Service | Usage | Variable d'env |
|---|---|---|
| **Neon PostgreSQL** | Base de données principale | `DATABASE_URL` |
| **Replit Auth** | OpenID Connect | `REPLIT_DOMAINS`, `ISSUER_URL` |
| **Replit Object Storage** | Stockage médias (primaire) | `DEFAULT_OBJECT_STORAGE_BUCKET_ID` |
| **Cloudflare R2** | Stockage médias (fallback) | `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME` |
| **Stripe** | Paiements en ligne | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `VITE_STRIPE_PUBLISHABLE_KEY` |
| **Twilio** | SMS | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` |
| **Resend** | Emails transactionnels | `RESEND_API_KEY` |
| **Mindee** | OCR documents | `MINDEE_API_KEY` |
| **Google Gemini** | IA générative | `GEMINI_API_KEY` |
| **Plaid** | Agrégation bancaire | `PLAID_CLIENT_ID`, `PLAID_SECRET`, `PLAID_ENV` |
| **Google Drive** | Stockage médias (fallback) | `GOOGLE_DRIVE_CLIENT_EMAIL`, `GOOGLE_DRIVE_PRIVATE_KEY`, `GOOGLE_DRIVE_FOLDER_ID` |

---

## 11. Branding & Design

### Couleurs

| Rôle | Hex | HSL |
|---|---|---|
| **Primary** (rouge AutoReport) | `#CE1126` | `0 85% 46%` |
| **Secondary** (or/ambre) | `#F5A623` | `43 96% 56%` |
| **Background light** | — | `30 15% 97%` |
| **Background dark** | — | `0 0% 4%` |
| **Sidebar** | — | `0 0% 5%` (toujours sombre) |

### Typographie
- **Corps :** `Exo 2` (Google Fonts) — sportive et moderne
- **Mono :** `JetBrains Mono`

### Logo
- Fichier source : `attached_assets/grok_image_zby8i9_1774235232732.jpg`
- Texte : `Auto` (blanc) + `Report` (#CE1126)
- Sous-titre : `Diagnostics IA`

### Thème
Inspiré Ferrari — "Ferrari Luxury" (clair) / "Ferrari Night" (sombre)

---

## 12. Variables d'environnement

Voir `.env.example` pour la liste complète. Variables essentielles :

```env
# Base de données
DATABASE_URL=postgresql://...

# Sécurité sessions
SESSION_SECRET=votre_secret_session

# Chiffrement config
CONFIG_ENCRYPTION_KEY=votre_cle_32_chars

# Replit Auth
REPLIT_DOMAINS=votre-app.replit.app
ISSUER_URL=https://replit.com/oidc

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Email (Resend)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@autoreport.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+33...

# IA (Gemini)
GEMINI_API_KEY=...

# OCR (Mindee)
MINDEE_API_KEY=...

# Maintenance
MAINTENANCE_MODE=false
```

---

## 13. Déploiement

### Développement
```bash
npm run dev
# Démarre Express (port 5000) + Vite HMR via tunnel
```

### Production (Replit)
- Cliquer "Deploy" dans l'interface Replit
- Variables d'environnement à configurer dans Secrets
- Base de données : Neon PostgreSQL (auto-provisionné)
- Stockage : Replit Object Storage (auto-provisionné)

### Migrations base de données
```bash
npm run db:push
# ou
npm run db:push --force
```

### Variables PWA
Le manifest est à `client/public/manifest.json` pour installation mobile.

---

## 14. Accès

### Panel d'administration système
| Champ | Valeur |
|---|---|
| **URL** | `/panel` |
| **Email** | `admin@autoreport.com` |
| **Mot de passe** | `AutoReport2024!` |
| **Rôle** | superadmin |

### API Documentation
- Swagger UI disponible pour les rootadmin via route protégée
- Documentation auto-générée depuis `server/swagger.ts`

---

*Documentation générée le 26 mars 2026 — AutoReport v1.0*
