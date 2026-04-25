# AutoReport - Plateforme SaaS de Gestion Automobile IA

## Overview

AutoReport est une plateforme SaaS multi-tenant pour les ateliers automobiles. Elle permet la gestion complète des devis, factures, réservations, clients, et la génération de rapports diagnostiques via IA. L'application supporte les mises à jour en temps réel via WebSockets et propose une interface responsive mobile-first. Fonctionnalités clés : gestion atelier, paiements en ligne (Stripe), scan OCR de documents, comptabilité intégrée, notifications SMS (Twilio), et rapports IA.

## User Preferences

Style de communication préféré : Langue simple et quotidienne.
Langue de l'interface : Français (100% traduit)
Thème de couleur : Ferrari-inspired (Rosso Corsa red primary: 0 85% 46%, Gold secondary: 43 96% 56%, deep black backgrounds)
Police : Exo 2 (Google Fonts) - sportive et moderne
État : Interface entièrement traduite en français, thème Ferrari appliqué avec dark/light mode
Sauvegarde automatique : Quotidienne à 21h00 (Europe/Paris), sans cumul (garde uniquement la dernière sauvegarde), email vers rbelmahi90@gmail.com avec BDD JSON + médias ZIP en pièces jointes

## System Architecture

### Frontend Architecture

**Technology Stack:** React with TypeScript (Vite), Wouter for routing, TanStack Query for data fetching, Shadcn/ui (Radix UI) for UI components, Tailwind CSS for styling, and React Hook Form with Zod for form management.
**Design System:** Ferrari-inspired premium automotive design, supports light/dark mode, fully responsive mobile-first, uses custom CSS variables with Exo 2 (headings/body) and JetBrains Mono (code) fonts.
**Key Frontend Patterns:** Implements role-based UI, real-time data synchronization via WebSockets, optimistic updates for a smooth user experience, and toast notifications.

### Backend Architecture

**Technology Stack:** Node.js with Express.js, Drizzle ORM for PostgreSQL (via Neon), OpenID Connect (Replit Auth with Passport.js), Express sessions (with PostgreSQL store), and a dedicated WebSocket server.
**API Design:** Follows RESTful principles, enforces role-based access control (RBAC) with specific routes for administrators (`/api/admin/*`), includes authentication middleware, secures WebSocket connections, and uses centralized error handling.
**Domain Portability:** No hardcoded domain URLs. `server/urlHelper.ts` uses dynamic detection via REPLIT_DOMAINS, REPLIT_DEV_DOMAIN, PUBLIC_BASE_URL, x-forwarded-host, or Host header. The app works after remix or domain change without code modifications.
**Data Access Layer:** Utilizes an IStorage abstraction for media management, supports database transactions, optimizes queries with Drizzle ORM, and manages schema versions.

### Database Schema

**Core Tables:** `users` (supporting client and admin roles), `services`, `quotes` (with an approval workflow), `invoices`, `reservations`, `notifications`, `sessions`, and `garages` for multi-tenancy.
**Accounting Tables:** `expenses`, `expense_categories`, `credit_notes`, `credit_note_items`, `accounting_entries`, `accounting_lines`, `fec_exports`.
**Support Tables:** `quote_items`, `invoice_items`, `quote_media`, `invoice_media`, `delivery_notes`, `delivery_note_invoices`, `repair_orders`, `repair_sheets`, `workflows`, `workflow_steps`, `workshop_tasks`, `engagements`, `reviews`, `ocr_scans`, `sms_logs`, `notification_rules`, `ai_reports`, `feature_flags`, `landing_settings`, `panel_users`.
**Relationships:** Entities are linked via foreign key constraints to users, services, quotes, and garages.
**Data Integrity:** Ensures data integrity through UUID primary keys, timestamps, and foreign key constraints.

### Authentication & Authorization

**Authentication Flow:** Uses OpenID Connect (Replit) with session-based authentication via secure HTTP-only cookies and automatic session refresh.
**Panel Authentication:** Separate admin panel at `/panel` with email/password login (bcrypt hashed, default: `admin@autoreport.com` / `AutoReport2024!`).
**Authorization Strategy:** Role-based access control (RBAC) with roles: `client`, `client_professionnel`, `employe`, `admin`, `superadmin`, `rootadmin`. Enforced by middleware guards, frontend route protection, and WebSocket authentication.

### Real-time Updates

**WebSocket Implementation:** A dedicated WebSocket server manages real-time communication, utilizing user-specific channels for various event types (e.g., `quote_updated`, `invoice_created`), with automatic frontend query invalidation and reconnection logic.
**Notification System:** Features a database-backed notification system with read/unread statuses, real-time delivery via WebSockets, persistent storage, and an unread badge counter.

### Multi-Tenant Architecture (Schema-per-Tenant)

**PostgreSQL Schema Isolation:** Each garage has its own PostgreSQL schema (e.g., `garage_mon_garage`) containing isolated copies of tenant tables (services, quotes, invoices, reservations, etc.). Shared tables (users, garages, sessions) remain in the `public` schema. Schema names derived from garage slug: `garage_{slug_with_underscores}`.
**Tenant Resolution:** `tenantMiddleware.ts` resolves the active tenant from the authenticated user's garageId (for admins) or session selectedGarageId (for superadmins).
**Tenant Storage:** `tenantStorage.ts` provides a `TenantStorage` class that queries the correct schema using `SET LOCAL search_path` within transactions.
**Tenant Context:** `tenantContext.ts` handles schema creation, data migration, and safe schema-scoped execution.
**Media Isolation:** `mediaService.ts` supports per-garage media prefixes via optional `garageSlug` parameter.
**Role Hierarchy:** `superadmin` (full system access, can switch garage context), `admin` (access limited to assigned garage), `employe` (workshop access), `client`/`client_professionnel` (access to their own data).

### Key Features

- **Workshop Management:** Dashboard for active reservations, workflow tab with step-by-step checklists, and repair orders tab.
- **Repair Orders:** Detailed vehicle information, mileage, fuel level, condition checklists, accessories, damages, and client/technician notes.
- **E-invoicing:** Compliance checker for invoices, Factur-X XML generation (CII format EN 16931).
- **Object Storage:** Unified media service centralizes upload/download/delete. Priority: Object Storage (R2 via Replit) > Cloudflare R2 API > local /uploads/ fallback.
- **OCR Document Scanner (Mindee):** Scanning invoices, carte grise, French ID cards, passports with structured data extraction and direct conversion to quotes or invoices.
- **Stripe Payments:** Payment Element and Payment Intents for card payments, SEPA, Klarna, and Alma installment options.
- **Plaid Bank Connection:** Bank account aggregation for secure connections and retrieval of account and balance data.
- **Advanced Analytics:** Service trends, financial performance, client analytics, and performance metrics.
- **Accounting Module:** Expenses, credit notes, accounting entries, FEC export for French tax compliance.
- **SMS Notifications (Twilio):** SMS for quote sent, invoice sent, payment confirmed, review request. Requires user consent and a valid French mobile number.
- **Feature Flags:** Admin panel for enabling/disabling features dynamically.
- **Maintenance Mode:** Blocks all non-panel routes with 503 when `MAINTENANCE_MODE=true`.
- **AES-256-GCM Encryption:** `server/cryptoConfig.ts` for encrypting sensitive configuration values.

## Replit Setup Notes

- Node.js 20 installed as the runtime
- `@neondatabase/serverless` added as dependency (was missing from package.json)
- `date-fns` downgraded to v2.30.0 for Vite 5 compatibility
- `vite.config.ts` updated: `host: "0.0.0.0"`, `port: 5000`, `allowedHosts: true` for Replit proxy
- Logo image replaced with inline SVG (original asset not included in export)
- Workflow: `npm run dev` on port 5000
- Deployment: autoscale with `npm run build` + `node dist/index.js`

## External Dependencies

### Third-party Services
- **Neon Database:** Serverless PostgreSQL database.
- **Replit Auth:** OpenID Connect authentication provider.
- **Cloudflare R2:** Primary cloud object storage service.
- **Stripe:** Payment gateway for online transactions.
- **Plaid:** Bank account aggregation service.
- **Mindee:** OCR document scanning API.
- **Twilio:** SMS notification service.
- **Resend:** Email delivery service.

### Key Libraries
- **@neondatabase/serverless:** PostgreSQL client for serverless environments.
- **drizzle-orm:** Type-safe ORM for database interactions.
- **mindee:** Node.js SDK for Mindee OCR.
- **@stripe/stripe-js:** Frontend JavaScript SDK for Stripe payments.
- **plaid:** Node.js SDK for Plaid API integration.
- **@tanstack/react-query:** Server state management in React.
- **@radix-ui/*:** Accessible UI component primitives.
- **passport:** Authentication middleware for Node.js.
- **ws:** WebSocket server implementation for Node.js.
- **zod:** TypeScript-first schema validation library.
- **date-fns:** Date utility library.

### Development Tools
- **TypeScript:** Static type-checking for JavaScript.
- **Vite:** Frontend tooling for fast development and builds.
- **Tailwind CSS:** Utility-first CSS framework.
- **ESBuild:** Fast JavaScript bundler.
- **Drizzle Kit:** Toolkit for managing Drizzle ORM migrations.

## SaaS Public Landing Features (AutoReport)

### Free Report Limiting
- `POST /api/reports/generate` — Public endpoint, **limited to 1 free AI report per person** (de-duplicated by IP address + optional guest email).
- Authenticated users: 1 free report then must subscribe (or have an active subscription with remaining quota).
- Guests: Limited by IP; optional email field (`guestEmail`) provides additional de-duplication layer.
- `isFree`, `ipAddress`, `guestEmail` columns added to `aiReports` table to track usage.

### PDF Download Gate
- `POST /api/reports/download-pdf` — Requires authentication (`req.user`). Returns HTTP 401 if not logged in.
- Frontend `report-display.tsx` intercepts the 401 and prompts the user to register.

### Subscription Plans (Admin-Configurable)
- Admin panel at `/panel/plans` — full CRUD for subscription plans.
- Plans support: one-time payment, monthly, or yearly period.
- Each plan has: name, description, price, currency, period, reports quota, Stripe Price ID, active/inactive toggle, sort order.
- `GET /api/plans` — public endpoint listing active plans.
- `POST /api/subscriptions/checkout` — Creates a Stripe Checkout session (subscription mode for recurring, payment mode for one-time) and a pending `userSubscriptions` row.
- `POST /api/subscriptions/confirm` — Verifies Stripe payment status and marks subscription active.

### Admin Credentials
- Panel URL: `/panel`
- Email: `admin@autoreport.com`
- Password: `AutoReport2024!`
