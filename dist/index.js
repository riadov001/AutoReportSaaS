var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  accountingEntries: () => accountingEntries,
  accountingEntriesRelations: () => accountingEntriesRelations,
  accountingLines: () => accountingLines,
  accountingLinesRelations: () => accountingLinesRelations,
  aiReports: () => aiReports,
  aiReportsRelations: () => aiReportsRelations,
  applicationSettings: () => applicationSettings,
  auditLogChanges: () => auditLogChanges,
  auditLogChangesRelations: () => auditLogChangesRelations,
  auditLogs: () => auditLogs,
  auditLogsRelations: () => auditLogsRelations,
  chatAttachments: () => chatAttachments,
  chatAttachmentsRelations: () => chatAttachmentsRelations,
  chatConversations: () => chatConversations,
  chatConversationsRelations: () => chatConversationsRelations,
  chatMessages: () => chatMessages,
  chatMessagesRelations: () => chatMessagesRelations,
  chatParticipants: () => chatParticipants,
  chatParticipantsRelations: () => chatParticipantsRelations,
  creditNoteCounters: () => creditNoteCounters,
  creditNoteItems: () => creditNoteItems,
  creditNoteItemsRelations: () => creditNoteItemsRelations,
  creditNotes: () => creditNotes,
  creditNotesRelations: () => creditNotesRelations,
  deliveryNoteCounters: () => deliveryNoteCounters,
  deliveryNoteInvoices: () => deliveryNoteInvoices,
  deliveryNoteInvoicesRelations: () => deliveryNoteInvoicesRelations,
  deliveryNotes: () => deliveryNotes,
  deliveryNotesRelations: () => deliveryNotesRelations,
  engagements: () => engagements,
  engagementsRelations: () => engagementsRelations,
  expenseCategories: () => expenseCategories,
  expenseCategoriesRelations: () => expenseCategoriesRelations,
  expenseCounters: () => expenseCounters,
  expenses: () => expenses,
  expensesRelations: () => expensesRelations,
  featureFlags: () => featureFlags,
  fecExports: () => fecExports,
  garages: () => garages,
  garagesRelations: () => garagesRelations,
  insertAccountingEntrySchema: () => insertAccountingEntrySchema,
  insertAccountingLineSchema: () => insertAccountingLineSchema,
  insertAiReportSchema: () => insertAiReportSchema,
  insertApplicationSettingsSchema: () => insertApplicationSettingsSchema,
  insertAuditLogChangeSchema: () => insertAuditLogChangeSchema,
  insertAuditLogSchema: () => insertAuditLogSchema,
  insertChatAttachmentSchema: () => insertChatAttachmentSchema,
  insertChatConversationSchema: () => insertChatConversationSchema,
  insertChatMessageSchema: () => insertChatMessageSchema,
  insertChatParticipantSchema: () => insertChatParticipantSchema,
  insertCreditNoteItemSchema: () => insertCreditNoteItemSchema,
  insertCreditNoteSchema: () => insertCreditNoteSchema,
  insertDeliveryNoteCounterSchema: () => insertDeliveryNoteCounterSchema,
  insertDeliveryNoteInvoiceSchema: () => insertDeliveryNoteInvoiceSchema,
  insertDeliveryNoteSchema: () => insertDeliveryNoteSchema,
  insertEngagementSchema: () => insertEngagementSchema,
  insertExpenseCategorySchema: () => insertExpenseCategorySchema,
  insertExpenseSchema: () => insertExpenseSchema,
  insertFeatureFlagSchema: () => insertFeatureFlagSchema,
  insertFecExportSchema: () => insertFecExportSchema,
  insertGarageSchema: () => insertGarageSchema,
  insertInvoiceCounterSchema: () => insertInvoiceCounterSchema,
  insertInvoiceItemSchema: () => insertInvoiceItemSchema,
  insertInvoiceMediaSchema: () => insertInvoiceMediaSchema,
  insertInvoiceSchema: () => insertInvoiceSchema,
  insertLandingSettingsSchema: () => insertLandingSettingsSchema,
  insertNotificationRuleSchema: () => insertNotificationRuleSchema,
  insertNotificationSchema: () => insertNotificationSchema,
  insertOcrScanSchema: () => insertOcrScanSchema,
  insertPanelUserSchema: () => insertPanelUserSchema,
  insertQuoteItemSchema: () => insertQuoteItemSchema,
  insertQuoteMediaSchema: () => insertQuoteMediaSchema,
  insertQuoteSchema: () => insertQuoteSchema,
  insertRepairOrderSchema: () => insertRepairOrderSchema,
  insertRepairSheetSchema: () => insertRepairSheetSchema,
  insertReservationSchema: () => insertReservationSchema,
  insertReservationServiceSchema: () => insertReservationServiceSchema,
  insertReviewSchema: () => insertReviewSchema,
  insertServiceSchema: () => insertServiceSchema,
  insertServiceWorkflowSchema: () => insertServiceWorkflowSchema,
  insertSmsLogSchema: () => insertSmsLogSchema,
  insertSubscriptionPlanSchema: () => insertSubscriptionPlanSchema,
  insertSupportTicketSchema: () => insertSupportTicketSchema,
  insertUserSchema: () => insertUserSchema,
  insertUserSubscriptionSchema: () => insertUserSubscriptionSchema,
  insertWorkflowSchema: () => insertWorkflowSchema,
  insertWorkflowStepSchema: () => insertWorkflowStepSchema,
  insertWorkshopTaskSchema: () => insertWorkshopTaskSchema,
  invoiceCounters: () => invoiceCounters,
  invoiceItems: () => invoiceItems,
  invoiceItemsRelations: () => invoiceItemsRelations,
  invoiceMedia: () => invoiceMedia,
  invoiceMediaRelations: () => invoiceMediaRelations,
  invoices: () => invoices,
  invoicesRelations: () => invoicesRelations,
  landingSettings: () => landingSettings,
  notificationRules: () => notificationRules,
  notificationRulesRelations: () => notificationRulesRelations,
  notifications: () => notifications,
  notificationsRelations: () => notificationsRelations,
  ocrScans: () => ocrScans,
  panelUsers: () => panelUsers,
  passwordResetTokens: () => passwordResetTokens,
  quoteItems: () => quoteItems,
  quoteItemsRelations: () => quoteItemsRelations,
  quoteMedia: () => quoteMedia,
  quoteMediaRelations: () => quoteMediaRelations,
  quotes: () => quotes,
  quotesRelations: () => quotesRelations,
  repairOrders: () => repairOrders,
  repairOrdersRelations: () => repairOrdersRelations,
  repairSheets: () => repairSheets,
  reservationServices: () => reservationServices,
  reservationServicesRelations: () => reservationServicesRelations,
  reservations: () => reservations,
  reservationsRelations: () => reservationsRelations,
  reviews: () => reviews,
  serviceWorkflows: () => serviceWorkflows,
  serviceWorkflowsRelations: () => serviceWorkflowsRelations,
  services: () => services,
  servicesRelations: () => servicesRelations,
  sessions: () => sessions,
  smsLogs: () => smsLogs,
  subscriptionPlans: () => subscriptionPlans,
  supportTickets: () => supportTickets,
  supportTicketsRelations: () => supportTicketsRelations,
  userSubscriptions: () => userSubscriptions,
  userSubscriptionsRelations: () => userSubscriptionsRelations,
  users: () => users,
  usersRelations: () => usersRelations,
  workflowSteps: () => workflowSteps,
  workflowStepsRelations: () => workflowStepsRelations,
  workflows: () => workflows,
  workflowsRelations: () => workflowsRelations,
  workshopTasks: () => workshopTasks,
  workshopTasksRelations: () => workshopTasksRelations
});
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  decimal,
  boolean,
  integer
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var sessions, garages, users, passwordResetTokens, services, quotes, reviews, quoteItems, invoices, invoiceItems, reservations, reservationServices, notifications, chatConversations, chatParticipants, chatMessages, chatAttachments, invoiceCounters, deliveryNotes, deliveryNoteInvoices, deliveryNoteCounters, quoteMedia, invoiceMedia, applicationSettings, engagements, workflows, workflowSteps, serviceWorkflows, workshopTasks, repairOrders, auditLogs, auditLogChanges, garagesRelations, usersRelations, servicesRelations, quotesRelations, quoteItemsRelations, invoicesRelations, invoiceItemsRelations, reservationsRelations, reservationServicesRelations, notificationsRelations, workflowsRelations, workflowStepsRelations, serviceWorkflowsRelations, workshopTasksRelations, repairOrdersRelations, engagementsRelations, quoteMediaRelations, invoiceMediaRelations, deliveryNotesRelations, deliveryNoteInvoicesRelations, auditLogsRelations, auditLogChangesRelations, chatConversationsRelations, chatParticipantsRelations, chatMessagesRelations, chatAttachmentsRelations, insertGarageSchema, insertUserSchema, insertServiceSchema, insertQuoteSchema, insertInvoiceSchema, insertReservationSchema, insertInvoiceItemSchema, insertQuoteItemSchema, insertReservationServiceSchema, insertNotificationSchema, insertInvoiceCounterSchema, insertDeliveryNoteSchema, insertDeliveryNoteInvoiceSchema, insertDeliveryNoteCounterSchema, insertQuoteMediaSchema, insertInvoiceMediaSchema, insertApplicationSettingsSchema, insertEngagementSchema, insertWorkflowSchema, insertWorkflowStepSchema, insertServiceWorkflowSchema, insertWorkshopTaskSchema, insertRepairOrderSchema, insertReviewSchema, insertAuditLogSchema, insertAuditLogChangeSchema, insertChatConversationSchema, insertChatParticipantSchema, insertChatMessageSchema, insertChatAttachmentSchema, expenseCategories, expenses, creditNotes, creditNoteItems, accountingEntries, accountingLines, fecExports, creditNoteCounters, expenseCounters, expenseCategoriesRelations, expensesRelations, creditNotesRelations, creditNoteItemsRelations, accountingEntriesRelations, accountingLinesRelations, insertExpenseCategorySchema, insertExpenseSchema, insertCreditNoteSchema, insertCreditNoteItemSchema, insertAccountingEntrySchema, insertAccountingLineSchema, insertFecExportSchema, ocrScans, insertOcrScanSchema, smsLogs, insertSmsLogSchema, notificationRules, notificationRulesRelations, insertNotificationRuleSchema, aiReports, aiReportsRelations, insertAiReportSchema, panelUsers, insertPanelUserSchema, landingSettings, repairSheets, insertRepairSheetSchema, insertLandingSettingsSchema, featureFlags, insertFeatureFlagSchema, subscriptionPlans, insertSubscriptionPlanSchema, userSubscriptions, userSubscriptionsRelations, insertUserSubscriptionSchema, supportTickets, supportTicketsRelations, insertSupportTicketSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    sessions = pgTable(
      "sessions",
      {
        sid: varchar("sid").primaryKey(),
        sess: jsonb("sess").notNull(),
        expire: timestamp("expire").notNull()
      },
      (table) => [index("IDX_session_expire").on(table.expire)]
    );
    garages = pgTable("garages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: varchar("name", { length: 255 }).notNull(),
      slug: varchar("slug", { length: 100 }).unique().notNull(),
      // URL-friendly identifier
      logo: text("logo"),
      // Base64 encoded logo or Object Storage URL
      primaryColor: varchar("primary_color", { length: 20 }).default("#dc2626"),
      // Primary theme color
      secondaryColor: varchar("secondary_color", { length: 20 }).default("#1f2937"),
      // Secondary theme color
      tagline: varchar("tagline", { length: 255 }),
      address: text("address"),
      city: varchar("city", { length: 255 }),
      postalCode: varchar("postal_code", { length: 20 }),
      phone: varchar("phone", { length: 50 }),
      email: varchar("email", { length: 255 }),
      website: varchar("website", { length: 255 }),
      siren: varchar("siren", { length: 15 }),
      siret: varchar("siret", { length: 20 }),
      tvaNumber: varchar("tva_number", { length: 30 }),
      iban: varchar("iban", { length: 50 }),
      swift: varchar("swift", { length: 20 }),
      bankName: varchar("bank_name", { length: 255 }),
      legalForm: varchar("legal_form", { length: 100 }),
      capitalSocial: varchar("capital_social", { length: 50 }),
      nafCode: varchar("naf_code", { length: 10 }),
      rcsCity: varchar("rcs_city", { length: 100 }),
      country: varchar("country", { length: 5 }).default("FR"),
      // Simulator and Configurator settings
      simulatorSettings: jsonb("simulator_settings").default({
        prices: {
          base: 50,
          peinture: 30,
          vernis: 20,
          polissage: 40,
          reparation: 60
        },
        colors: [
          { name: "Argent", hex: "#c0c0c0" },
          { name: "Noir Mat", hex: "#2a2a2a" },
          { name: "Noir Brillant", hex: "#1a1a1a" },
          { name: "Blanc", hex: "#f0f0f0" },
          { name: "Gunmetal", hex: "#4a4a50" },
          { name: "Bronze", hex: "#a87830" },
          { name: "Or", hex: "#d4a843" },
          { name: "Rouge", hex: "#b01020" },
          { name: "Bleu", hex: "#2040a0" },
          { name: "Anthracite", hex: "#383840" }
        ],
        maxPhotos: 5,
        enabledOptions: ["lisere", "gravure", "photoTexture"]
      }),
      // Default settings for this garage
      defaultWheelCount: integer("default_wheel_count").notNull().default(4),
      defaultDiameter: varchar("default_diameter", { length: 50 }).notNull().default("17"),
      defaultTaxRate: decimal("default_tax_rate", { precision: 5, scale: 2 }).notNull().default("20.00"),
      wheelCountOptions: varchar("wheel_count_options").notNull().default("1,2,3,4"),
      diameterOptions: text("diameter_options").notNull().default("14,15,16,17,18,19,20,21,22"),
      customFields: jsonb("custom_fields"),
      // Custom fields configuration for quotes/invoices
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    users = pgTable("users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      email: varchar("email").unique().notNull(),
      password: varchar("password", { length: 255 }),
      // Hashed password
      firstName: varchar("first_name"),
      lastName: varchar("last_name"),
      phone: varchar("phone"),
      address: text("address"),
      postalCode: varchar("postal_code"),
      city: varchar("city"),
      profileImageUrl: varchar("profile_image_url"),
      role: varchar("role", { enum: ["client", "client_professionnel", "employe", "admin", "superadmin", "rootadmin"] }).notNull().default("client"),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "set null" }),
      // Multi-tenant: user's garage
      // Champs pour clients professionnels
      companyName: varchar("company_name"),
      siret: varchar("siret", { length: 14 }),
      tvaNumber: varchar("tva_number", { length: 20 }),
      companyAddress: text("company_address"),
      companyPostalCode: varchar("company_postal_code", { length: 20 }),
      companyCity: varchar("company_city", { length: 255 }),
      companyCountry: varchar("company_country", { length: 5 }).default("FR"),
      smsConsent: boolean("sms_consent").notNull().default(false),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    passwordResetTokens = pgTable("password_reset_tokens", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      token: varchar("token", { length: 255 }).notNull().unique(),
      expiresAt: timestamp("expires_at").notNull(),
      used: boolean("used").notNull().default(false),
      createdAt: timestamp("created_at").defaultNow()
    });
    services = pgTable("services", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      // Multi-tenant
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      basePrice: decimal("base_price", { precision: 10, scale: 2 }),
      category: varchar("category", { length: 100 }),
      isActive: boolean("is_active").notNull().default(true),
      isVisibleToClients: boolean("is_visible_to_clients").notNull().default(false),
      // New field
      estimatedDuration: integer("estimated_duration"),
      // Duration in minutes
      imageUrl: varchar("image_url", { length: 500 }),
      customFormFields: jsonb("custom_form_fields"),
      // Array of field definitions
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    quotes = pgTable("quotes", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      // Multi-tenant
      reference: varchar("reference", { length: 50 }).unique(),
      // Format: DEV-MM-00001
      clientId: varchar("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      serviceId: varchar("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
      status: varchar("status", { enum: ["pending", "approved", "accepted", "rejected", "completed"] }).notNull().default("pending"),
      paymentMethod: varchar("payment_method", { enum: ["cash", "wire_transfer", "card", "stripe", "sepa", "klarna", "alma"] }).default("wire_transfer"),
      requestDetails: jsonb("request_details"),
      // Custom form data from client
      quoteAmount: decimal("quote_amount", { precision: 10, scale: 2 }),
      wheelCount: integer("wheel_count"),
      // Number of wheels: 1, 2, 3, or 4
      diameter: varchar("diameter", { length: 50 }),
      // Wheel diameter
      wheelPositions: jsonb("wheel_positions"),
      // ["FL", "FR", "RL", "RR"]
      priceExcludingTax: decimal("price_excluding_tax", { precision: 10, scale: 2 }),
      // Prix HT
      taxRate: decimal("tax_rate", { precision: 5, scale: 2 }),
      // TVA rate (e.g., 20.00 for 20%)
      taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }),
      // TVA amount
      productDetails: text("product_details"),
      // Details about products
      notes: text("notes"),
      validUntil: timestamp("valid_until"),
      viewToken: varchar("view_token", { length: 64 }).unique(),
      emailSentAt: timestamp("email_sent_at"),
      viewedAt: timestamp("viewed_at"),
      vehicleRegistration: varchar("vehicle_registration", { length: 20 }),
      vehicleMake: varchar("vehicle_make", { length: 100 }),
      vehicleModel: varchar("vehicle_model", { length: 100 }),
      vehicleVin: varchar("vehicle_vin", { length: 20 }),
      vehicleFuelType: varchar("vehicle_fuel_type", { length: 50 }),
      vehicleFiscalPower: varchar("vehicle_fiscal_power", { length: 10 }),
      vehicleFirstRegDate: varchar("vehicle_first_reg_date", { length: 20 }),
      vehicleColor: varchar("vehicle_color", { length: 50 }),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    reviews = pgTable("reviews", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      quoteId: varchar("quote_id").references(() => quotes.id, { onDelete: "cascade" }),
      invoiceId: varchar("invoice_id").references(() => invoices.id, { onDelete: "cascade" }),
      clientId: varchar("client_id").references(() => users.id, { onDelete: "cascade" }),
      clientName: varchar("client_name", { length: 255 }),
      rating: integer("rating").notNull(),
      comment: text("comment"),
      reviewToken: varchar("review_token", { length: 255 }).unique(),
      isApproved: boolean("is_approved").notNull().default(false),
      createdAt: timestamp("created_at").defaultNow()
    });
    quoteItems = pgTable("quote_items", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      quoteId: varchar("quote_id").notNull().references(() => quotes.id, { onDelete: "cascade" }),
      description: text("description").notNull(),
      quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull().default("1"),
      unitPriceExcludingTax: decimal("unit_price_excluding_tax", { precision: 10, scale: 2 }).notNull(),
      totalExcludingTax: decimal("total_excluding_tax", { precision: 10, scale: 2 }).notNull(),
      taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).notNull(),
      taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).notNull(),
      totalIncludingTax: decimal("total_including_tax", { precision: 10, scale: 2 }).notNull(),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    invoices = pgTable("invoices", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      // Multi-tenant
      quoteId: varchar("quote_id").references(() => quotes.id, { onDelete: "cascade" }),
      // Optional - nullable for direct invoices
      clientId: varchar("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      invoiceNumber: varchar("invoice_number", { length: 50 }).notNull().unique(),
      amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
      paymentMethod: varchar("payment_method", { enum: ["cash", "wire_transfer", "card", "stripe", "sepa", "klarna", "alma"] }).notNull().default("wire_transfer"),
      wheelCount: integer("wheel_count"),
      diameter: varchar("diameter", { length: 50 }),
      priceExcludingTax: decimal("price_excluding_tax", { precision: 10, scale: 2 }),
      taxRate: decimal("tax_rate", { precision: 5, scale: 2 }),
      taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }),
      productDetails: text("product_details"),
      status: varchar("status", { enum: ["pending", "paid", "overdue", "cancelled"] }).notNull().default("pending"),
      stripeSessionId: varchar("stripe_session_id", { length: 255 }),
      stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
      paymentLink: varchar("payment_link", { length: 500 }),
      dueDate: timestamp("due_date"),
      paidAt: timestamp("paid_at"),
      viewToken: varchar("view_token", { length: 64 }).unique(),
      emailSentAt: timestamp("email_sent_at"),
      viewedAt: timestamp("viewed_at"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    invoiceItems = pgTable("invoice_items", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      invoiceId: varchar("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
      description: text("description").notNull(),
      quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull().default("1"),
      unitPriceExcludingTax: decimal("unit_price_excluding_tax", { precision: 10, scale: 2 }).notNull(),
      totalExcludingTax: decimal("total_excluding_tax", { precision: 10, scale: 2 }).notNull(),
      taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).notNull(),
      taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).notNull(),
      totalIncludingTax: decimal("total_including_tax", { precision: 10, scale: 2 }).notNull(),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    reservations = pgTable("reservations", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      reference: varchar("reference", { length: 50 }).unique(),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      quoteId: varchar("quote_id").references(() => quotes.id, { onDelete: "cascade" }),
      clientId: varchar("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      serviceId: varchar("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
      assignedEmployeeId: varchar("assigned_employee_id").references(() => users.id, { onDelete: "set null" }),
      // Employee assigned to the reservation
      scheduledDate: timestamp("scheduled_date").notNull(),
      estimatedEndDate: timestamp("estimated_end_date"),
      // Estimated end time for calendar display
      wheelCount: integer("wheel_count"),
      // Number of wheels: 1, 2, 3, or 4
      diameter: varchar("diameter", { length: 50 }),
      // Wheel diameter
      wheelPositions: jsonb("wheel_positions"),
      // ["FL", "FR", "RL", "RR"]
      priceExcludingTax: decimal("price_excluding_tax", { precision: 10, scale: 2 }),
      // Prix HT
      taxRate: decimal("tax_rate", { precision: 5, scale: 2 }),
      // TVA rate (e.g., 20.00 for 20%)
      taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }),
      // TVA amount
      productDetails: text("product_details"),
      // Details about products
      status: varchar("status", { enum: ["pending", "confirmed", "completed", "cancelled"] }).notNull().default("pending"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    reservationServices = pgTable("reservation_services", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      reservationId: varchar("reservation_id").notNull().references(() => reservations.id, { onDelete: "cascade" }),
      serviceId: varchar("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
      quantity: integer("quantity").notNull().default(1),
      priceExcludingTax: decimal("price_excluding_tax", { precision: 10, scale: 2 }),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow()
    });
    notifications = pgTable("notifications", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      type: varchar("type", { enum: ["quote", "invoice", "reservation", "service", "chat"] }).notNull(),
      title: varchar("title", { length: 255 }).notNull(),
      message: text("message").notNull(),
      relatedId: varchar("related_id"),
      // ID of related quote/invoice/reservation/conversation
      isRead: boolean("is_read").notNull().default(false),
      createdAt: timestamp("created_at").defaultNow()
    });
    chatConversations = pgTable("chat_conversations", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      title: varchar("title", { length: 255 }).notNull(),
      type: varchar("type", { length: 50 }).notNull().default("internal"),
      createdById: varchar("created_by_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      isArchived: boolean("is_archived").notNull().default(false),
      lastMessageAt: timestamp("last_message_at").defaultNow(),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    chatParticipants = pgTable("chat_participants", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      conversationId: varchar("conversation_id").notNull().references(() => chatConversations.id, { onDelete: "cascade" }),
      userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      lastReadAt: timestamp("last_read_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    chatMessages = pgTable("chat_messages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      conversationId: varchar("conversation_id").notNull().references(() => chatConversations.id, { onDelete: "cascade" }),
      senderId: varchar("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      content: text("content").notNull(),
      isEdited: boolean("is_edited").notNull().default(false),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    chatAttachments = pgTable("chat_attachments", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      messageId: varchar("message_id").notNull().references(() => chatMessages.id, { onDelete: "cascade" }),
      fileType: varchar("file_type", { enum: ["image", "video", "document"] }).notNull(),
      filePath: varchar("file_path", { length: 500 }).notNull(),
      fileName: varchar("file_name", { length: 255 }).notNull(),
      fileSize: integer("file_size"),
      mimeType: varchar("mime_type", { length: 100 }),
      createdAt: timestamp("created_at").defaultNow()
    });
    invoiceCounters = pgTable("invoice_counters", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      paymentType: varchar("payment_type", { enum: ["cash", "wire_transfer", "card"] }).notNull().unique(),
      currentNumber: integer("current_number").notNull().default(0),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    deliveryNotes = pgTable("delivery_notes", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      clientId: varchar("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      deliveryNoteNumber: varchar("delivery_note_number", { length: 50 }).notNull().unique(),
      month: integer("month").notNull(),
      year: integer("year").notNull(),
      totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
      totalHT: decimal("total_ht", { precision: 10, scale: 2 }),
      totalTVA: decimal("total_tva", { precision: 10, scale: 2 }),
      status: varchar("status", { enum: ["draft", "finalized", "paid"] }).notNull().default("draft"),
      showPrices: boolean("show_prices").notNull().default(true),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    deliveryNoteInvoices = pgTable("delivery_note_invoices", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      deliveryNoteId: varchar("delivery_note_id").notNull().references(() => deliveryNotes.id, { onDelete: "cascade" }),
      invoiceId: varchar("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
      createdAt: timestamp("created_at").defaultNow()
    });
    deliveryNoteCounters = pgTable("delivery_note_counters", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      month: integer("month").notNull(),
      year: integer("year").notNull(),
      currentNumber: integer("current_number").notNull().default(0),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    quoteMedia = pgTable("quote_media", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      quoteId: varchar("quote_id").notNull().references(() => quotes.id, { onDelete: "cascade" }),
      fileType: varchar("file_type", { enum: ["image", "video"] }).notNull(),
      filePath: varchar("file_path", { length: 500 }).notNull(),
      fileName: varchar("file_name", { length: 255 }).notNull(),
      fileSize: integer("file_size"),
      createdAt: timestamp("created_at").defaultNow()
    });
    invoiceMedia = pgTable("invoice_media", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      invoiceId: varchar("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
      fileType: varchar("file_type", { enum: ["image", "video"] }).notNull(),
      filePath: varchar("file_path", { length: 500 }).notNull(),
      fileName: varchar("file_name", { length: 255 }).notNull(),
      fileSize: integer("file_size"),
      createdAt: timestamp("created_at").defaultNow()
    });
    applicationSettings = pgTable("application_settings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      defaultWheelCount: integer("default_wheel_count").notNull().default(4),
      // Default: 4 jantes
      defaultDiameter: varchar("default_diameter", { length: 50 }).notNull().default("17"),
      // Default diameter
      defaultTaxRate: decimal("default_tax_rate", { precision: 5, scale: 2 }).notNull().default("20.00"),
      // Default: 20% TVA
      wheelCountOptions: varchar("wheel_count_options").notNull().default("1,2,3,4"),
      // Available options (comma-separated)
      diameterOptions: text("diameter_options").notNull().default("14,15,16,17,18,19,20,21,22"),
      // Available diameters (comma-separated)
      companyName: varchar("company_name", { length: 255 }).notNull().default("AutoReport"),
      companyTagline: varchar("company_tagline", { length: 255 }),
      companyAddress: text("company_address"),
      companyCity: varchar("company_city", { length: 255 }),
      companyPhone: varchar("company_phone", { length: 50 }),
      companyEmail: varchar("company_email", { length: 255 }),
      companyWebsite: varchar("company_website", { length: 255 }),
      companySiret: varchar("company_siret", { length: 20 }),
      companyTvaNumber: varchar("company_tva_number", { length: 30 }),
      companyIban: varchar("company_iban", { length: 50 }),
      companySwift: varchar("company_swift", { length: 20 }),
      companyLogo: text("company_logo"),
      // Base64 encoded logo or Object Storage URL
      dailyRevenueObjective: decimal("daily_revenue_objective", { precision: 10, scale: 2 }).default("0"),
      chatbotWelcomeMessage: text("chatbot_welcome_message"),
      chatbotFaqItems: jsonb("chatbot_faq_items"),
      dailyReportEnabled: boolean("daily_report_enabled").notNull().default(false),
      dailyReportTime: varchar("daily_report_time", { length: 5 }).notNull().default("21:00"),
      dailyReportRecipients: text("daily_report_recipients").notNull().default("contact@autoreport.com"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    engagements = pgTable("engagements", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      clientId: varchar("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description"),
      status: varchar("status", { enum: ["active", "completed", "cancelled"] }).notNull().default("active"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    workflows = pgTable("workflows", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      serviceId: varchar("service_id").references(() => services.id, { onDelete: "cascade" }),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    workflowSteps = pgTable("workflow_steps", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      workflowId: varchar("workflow_id").notNull().references(() => workflows.id, { onDelete: "cascade" }),
      stepNumber: integer("step_number").notNull(),
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    serviceWorkflows = pgTable("service_workflows", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      serviceId: varchar("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
      workflowId: varchar("workflow_id").notNull().references(() => workflows.id, { onDelete: "cascade" }),
      createdAt: timestamp("created_at").defaultNow()
    });
    workshopTasks = pgTable("workshop_tasks", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      reservationId: varchar("reservation_id").notNull().references(() => reservations.id, { onDelete: "cascade" }),
      workflowStepId: varchar("workflow_step_id").notNull().references(() => workflowSteps.id, { onDelete: "cascade" }),
      isCompleted: boolean("is_completed").notNull().default(false),
      completedAt: timestamp("completed_at"),
      completedByUserId: varchar("completed_by_user_id").references(() => users.id),
      comment: text("comment"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    repairOrders = pgTable("repair_orders", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      reservationId: varchar("reservation_id").references(() => reservations.id, { onDelete: "cascade" }),
      clientId: varchar("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      reference: varchar("reference", { length: 50 }).unique(),
      vehicleBrand: varchar("vehicle_brand", { length: 100 }),
      vehicleModel: varchar("vehicle_model", { length: 100 }),
      vehiclePlate: varchar("vehicle_plate", { length: 20 }),
      vehicleVin: varchar("vehicle_vin", { length: 30 }),
      vehicleColor: varchar("vehicle_color", { length: 50 }),
      vehicleYear: integer("vehicle_year"),
      mileage: integer("mileage"),
      fuelLevel: varchar("fuel_level", { enum: ["empty", "quarter", "half", "three_quarters", "full"] }),
      exteriorCondition: jsonb("exterior_condition"),
      interiorCondition: jsonb("interior_condition"),
      existingDamages: text("existing_damages"),
      accessories: jsonb("accessories"),
      clientObservations: text("client_observations"),
      technicianNotes: text("technician_notes"),
      photos: jsonb("photos"),
      status: varchar("status", { enum: ["draft", "signed", "in_progress", "completed"] }).notNull().default("draft"),
      signedByClient: boolean("signed_by_client").notNull().default(false),
      signedAt: timestamp("signed_at"),
      createdById: varchar("created_by_id").references(() => users.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    auditLogs = pgTable("audit_logs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      entityType: varchar("entity_type", {
        enum: ["quote", "invoice", "reservation", "service", "workflow", "workflow_step", "user", "workshop_task"]
      }).notNull(),
      entityId: varchar("entity_id").notNull(),
      action: varchar("action", {
        enum: ["created", "updated", "deleted", "validated", "rejected", "completed", "cancelled", "paid", "confirmed"]
      }).notNull(),
      actorId: varchar("actor_id").references(() => users.id, { onDelete: "set null" }),
      actorRole: varchar("actor_role", { enum: ["client", "client_professionnel", "employe", "admin", "superadmin"] }),
      actorName: varchar("actor_name", { length: 255 }),
      // Store name at time of action
      summary: text("summary"),
      // Human-readable summary of action
      metadata: jsonb("metadata"),
      // Additional context (e.g., related entity info)
      ipAddress: varchar("ip_address", { length: 45 }),
      userAgent: text("user_agent"),
      occurredAt: timestamp("occurred_at").defaultNow().notNull()
    }, (table) => [
      index("IDX_audit_entity").on(table.entityType, table.entityId),
      index("IDX_audit_actor").on(table.actorId),
      index("IDX_audit_occurred").on(table.occurredAt)
    ]);
    auditLogChanges = pgTable("audit_log_changes", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      auditLogId: varchar("audit_log_id").notNull().references(() => auditLogs.id, { onDelete: "cascade" }),
      field: varchar("field", { length: 100 }).notNull(),
      previousValue: jsonb("previous_value"),
      newValue: jsonb("new_value")
    });
    garagesRelations = relations(garages, ({ many }) => ({
      users: many(users),
      services: many(services),
      quotes: many(quotes),
      invoices: many(invoices),
      reservations: many(reservations)
    }));
    usersRelations = relations(users, ({ one, many }) => ({
      garage: one(garages, {
        fields: [users.garageId],
        references: [garages.id]
      }),
      quotes: many(quotes),
      invoices: many(invoices),
      reservations: many(reservations),
      notifications: many(notifications),
      engagements: many(engagements)
    }));
    servicesRelations = relations(services, ({ one, many }) => ({
      garage: one(garages, {
        fields: [services.garageId],
        references: [garages.id]
      }),
      quotes: many(quotes),
      reservations: many(reservations)
    }));
    quotesRelations = relations(quotes, ({ one, many }) => ({
      garage: one(garages, {
        fields: [quotes.garageId],
        references: [garages.id]
      }),
      client: one(users, {
        fields: [quotes.clientId],
        references: [users.id]
      }),
      service: one(services, {
        fields: [quotes.serviceId],
        references: [services.id]
      }),
      invoices: many(invoices),
      reservations: many(reservations),
      items: many(quoteItems)
    }));
    quoteItemsRelations = relations(quoteItems, ({ one }) => ({
      quote: one(quotes, {
        fields: [quoteItems.quoteId],
        references: [quotes.id]
      })
    }));
    invoicesRelations = relations(invoices, ({ one, many }) => ({
      garage: one(garages, {
        fields: [invoices.garageId],
        references: [garages.id]
      }),
      quote: one(quotes, {
        fields: [invoices.quoteId],
        references: [quotes.id]
      }),
      client: one(users, {
        fields: [invoices.clientId],
        references: [users.id]
      }),
      items: many(invoiceItems)
    }));
    invoiceItemsRelations = relations(invoiceItems, ({ one }) => ({
      invoice: one(invoices, {
        fields: [invoiceItems.invoiceId],
        references: [invoices.id]
      })
    }));
    reservationsRelations = relations(reservations, ({ one, many }) => ({
      garage: one(garages, {
        fields: [reservations.garageId],
        references: [garages.id]
      }),
      quote: one(quotes, {
        fields: [reservations.quoteId],
        references: [quotes.id]
      }),
      client: one(users, {
        fields: [reservations.clientId],
        references: [users.id]
      }),
      service: one(services, {
        fields: [reservations.serviceId],
        references: [services.id]
      }),
      additionalServices: many(reservationServices)
    }));
    reservationServicesRelations = relations(reservationServices, ({ one }) => ({
      reservation: one(reservations, {
        fields: [reservationServices.reservationId],
        references: [reservations.id]
      }),
      service: one(services, {
        fields: [reservationServices.serviceId],
        references: [services.id]
      })
    }));
    notificationsRelations = relations(notifications, ({ one }) => ({
      user: one(users, {
        fields: [notifications.userId],
        references: [users.id]
      })
    }));
    workflowsRelations = relations(workflows, ({ many }) => ({
      steps: many(workflowSteps),
      serviceWorkflows: many(serviceWorkflows)
    }));
    workflowStepsRelations = relations(workflowSteps, ({ one, many }) => ({
      workflow: one(workflows, {
        fields: [workflowSteps.workflowId],
        references: [workflows.id]
      }),
      workshopTasks: many(workshopTasks)
    }));
    serviceWorkflowsRelations = relations(serviceWorkflows, ({ one }) => ({
      service: one(services, {
        fields: [serviceWorkflows.serviceId],
        references: [services.id]
      }),
      workflow: one(workflows, {
        fields: [serviceWorkflows.workflowId],
        references: [workflows.id]
      })
    }));
    workshopTasksRelations = relations(workshopTasks, ({ one }) => ({
      reservation: one(reservations, {
        fields: [workshopTasks.reservationId],
        references: [reservations.id]
      }),
      step: one(workflowSteps, {
        fields: [workshopTasks.workflowStepId],
        references: [workflowSteps.id]
      }),
      completedBy: one(users, {
        fields: [workshopTasks.completedByUserId],
        references: [users.id]
      })
    }));
    repairOrdersRelations = relations(repairOrders, ({ one }) => ({
      garage: one(garages, {
        fields: [repairOrders.garageId],
        references: [garages.id]
      }),
      reservation: one(reservations, {
        fields: [repairOrders.reservationId],
        references: [reservations.id]
      }),
      client: one(users, {
        fields: [repairOrders.clientId],
        references: [users.id]
      }),
      createdBy: one(users, {
        fields: [repairOrders.createdById],
        references: [users.id]
      })
    }));
    engagementsRelations = relations(engagements, ({ one }) => ({
      client: one(users, {
        fields: [engagements.clientId],
        references: [users.id]
      })
    }));
    quoteMediaRelations = relations(quoteMedia, ({ one }) => ({
      quote: one(quotes, {
        fields: [quoteMedia.quoteId],
        references: [quotes.id]
      })
    }));
    invoiceMediaRelations = relations(invoiceMedia, ({ one }) => ({
      invoice: one(invoices, {
        fields: [invoiceMedia.invoiceId],
        references: [invoices.id]
      })
    }));
    deliveryNotesRelations = relations(deliveryNotes, ({ one, many }) => ({
      garage: one(garages, {
        fields: [deliveryNotes.garageId],
        references: [garages.id]
      }),
      client: one(users, {
        fields: [deliveryNotes.clientId],
        references: [users.id]
      }),
      deliveryNoteInvoices: many(deliveryNoteInvoices)
    }));
    deliveryNoteInvoicesRelations = relations(deliveryNoteInvoices, ({ one }) => ({
      deliveryNote: one(deliveryNotes, {
        fields: [deliveryNoteInvoices.deliveryNoteId],
        references: [deliveryNotes.id]
      }),
      invoice: one(invoices, {
        fields: [deliveryNoteInvoices.invoiceId],
        references: [invoices.id]
      })
    }));
    auditLogsRelations = relations(auditLogs, ({ one, many }) => ({
      actor: one(users, {
        fields: [auditLogs.actorId],
        references: [users.id]
      }),
      changes: many(auditLogChanges)
    }));
    auditLogChangesRelations = relations(auditLogChanges, ({ one }) => ({
      auditLog: one(auditLogs, {
        fields: [auditLogChanges.auditLogId],
        references: [auditLogs.id]
      })
    }));
    chatConversationsRelations = relations(chatConversations, ({ one, many }) => ({
      createdBy: one(users, {
        fields: [chatConversations.createdById],
        references: [users.id]
      }),
      participants: many(chatParticipants),
      messages: many(chatMessages)
    }));
    chatParticipantsRelations = relations(chatParticipants, ({ one }) => ({
      conversation: one(chatConversations, {
        fields: [chatParticipants.conversationId],
        references: [chatConversations.id]
      }),
      user: one(users, {
        fields: [chatParticipants.userId],
        references: [users.id]
      })
    }));
    chatMessagesRelations = relations(chatMessages, ({ one, many }) => ({
      conversation: one(chatConversations, {
        fields: [chatMessages.conversationId],
        references: [chatConversations.id]
      }),
      sender: one(users, {
        fields: [chatMessages.senderId],
        references: [users.id]
      }),
      attachments: many(chatAttachments)
    }));
    chatAttachmentsRelations = relations(chatAttachments, ({ one }) => ({
      message: one(chatMessages, {
        fields: [chatAttachments.messageId],
        references: [chatMessages.id]
      })
    }));
    insertGarageSchema = createInsertSchema(garages).omit({ id: true, createdAt: true, updatedAt: true });
    insertUserSchema = createInsertSchema(users);
    insertServiceSchema = createInsertSchema(services).omit({ id: true, createdAt: true, updatedAt: true });
    insertQuoteSchema = createInsertSchema(quotes).omit({ id: true, createdAt: true, updatedAt: true });
    insertInvoiceSchema = createInsertSchema(invoices).omit({ id: true, createdAt: true, updatedAt: true, invoiceNumber: true }).extend({
      amount: z.union([z.string(), z.number()]).transform((val) => String(val)),
      dueDate: z.union([z.date(), z.string()]).transform(
        (val) => typeof val === "string" ? new Date(val) : val
      ).optional(),
      quoteId: z.string().nullable().optional(),
      // Optional for direct invoices
      paymentMethod: z.enum(["cash", "wire_transfer", "card", "stripe", "sepa", "klarna", "alma"]).default("wire_transfer"),
      wheelCount: z.number().min(1).max(4).nullable().optional(),
      diameter: z.string().nullable().optional(),
      priceExcludingTax: z.string().nullable().optional(),
      taxRate: z.string().nullable().optional(),
      taxAmount: z.string().nullable().optional(),
      productDetails: z.string().nullable().optional()
    });
    insertReservationSchema = createInsertSchema(reservations).omit({ id: true, createdAt: true, updatedAt: true }).extend({
      scheduledDate: z.union([z.date(), z.string()]).transform(
        (val) => typeof val === "string" ? new Date(val) : val
      ),
      estimatedEndDate: z.union([z.date(), z.string()]).transform(
        (val) => typeof val === "string" ? new Date(val) : val
      ).optional().nullable(),
      quoteId: z.string().nullable().optional(),
      wheelCount: z.number().min(1).max(4).nullable().optional(),
      diameter: z.string().nullable().optional(),
      priceExcludingTax: z.string().nullable().optional(),
      taxRate: z.string().nullable().optional(),
      taxAmount: z.string().nullable().optional(),
      productDetails: z.string().nullable().optional()
    });
    insertInvoiceItemSchema = createInsertSchema(invoiceItems).omit({ id: true, createdAt: true, updatedAt: true });
    insertQuoteItemSchema = createInsertSchema(quoteItems).omit({ id: true, createdAt: true, updatedAt: true });
    insertReservationServiceSchema = createInsertSchema(reservationServices).omit({ id: true, createdAt: true });
    insertNotificationSchema = createInsertSchema(notifications).omit({ id: true, createdAt: true });
    insertInvoiceCounterSchema = createInsertSchema(invoiceCounters).omit({ id: true, updatedAt: true });
    insertDeliveryNoteSchema = createInsertSchema(deliveryNotes).omit({ id: true, createdAt: true, updatedAt: true, deliveryNoteNumber: true });
    insertDeliveryNoteInvoiceSchema = createInsertSchema(deliveryNoteInvoices).omit({ id: true, createdAt: true });
    insertDeliveryNoteCounterSchema = createInsertSchema(deliveryNoteCounters).omit({ id: true, updatedAt: true });
    insertQuoteMediaSchema = createInsertSchema(quoteMedia).omit({ id: true, createdAt: true });
    insertInvoiceMediaSchema = createInsertSchema(invoiceMedia).omit({ id: true, createdAt: true });
    insertApplicationSettingsSchema = createInsertSchema(applicationSettings).omit({ id: true, createdAt: true, updatedAt: true });
    insertEngagementSchema = createInsertSchema(engagements).omit({ id: true, createdAt: true, updatedAt: true });
    insertWorkflowSchema = createInsertSchema(workflows).omit({ id: true, createdAt: true, updatedAt: true });
    insertWorkflowStepSchema = createInsertSchema(workflowSteps).omit({ id: true, createdAt: true, updatedAt: true });
    insertServiceWorkflowSchema = createInsertSchema(serviceWorkflows).omit({ id: true, createdAt: true });
    insertWorkshopTaskSchema = createInsertSchema(workshopTasks).omit({ id: true, createdAt: true, updatedAt: true });
    insertRepairOrderSchema = createInsertSchema(repairOrders).omit({ id: true, createdAt: true, updatedAt: true });
    insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
    insertAuditLogSchema = createInsertSchema(auditLogs).omit({ id: true, occurredAt: true });
    insertAuditLogChangeSchema = createInsertSchema(auditLogChanges).omit({ id: true });
    insertChatConversationSchema = createInsertSchema(chatConversations).omit({ id: true, createdAt: true, updatedAt: true, lastMessageAt: true });
    insertChatParticipantSchema = createInsertSchema(chatParticipants).omit({ id: true, createdAt: true });
    insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true, createdAt: true, updatedAt: true, isEdited: true });
    insertChatAttachmentSchema = createInsertSchema(chatAttachments).omit({ id: true, createdAt: true });
    expenseCategories = pgTable("expense_categories", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      name: varchar("name", { length: 255 }).notNull(),
      code: varchar("code", { length: 20 }),
      description: text("description"),
      defaultTaxRate: decimal("default_tax_rate", { precision: 5, scale: 2 }).default("20.00"),
      isActive: boolean("is_active").notNull().default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    expenses = pgTable("expenses", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      categoryId: varchar("category_id").references(() => expenseCategories.id, { onDelete: "set null" }),
      expenseNumber: varchar("expense_number", { length: 50 }).notNull().unique(),
      vendor: varchar("vendor", { length: 255 }).notNull(),
      description: text("description"),
      date: timestamp("date").notNull(),
      amountHT: decimal("amount_ht", { precision: 10, scale: 2 }).notNull(),
      taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).notNull().default("20.00"),
      taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).notNull().default("0"),
      amountTTC: decimal("amount_ttc", { precision: 10, scale: 2 }).notNull(),
      paymentMethod: varchar("payment_method", { enum: ["cash", "wire_transfer", "card", "check", "direct_debit"] }).notNull().default("wire_transfer"),
      status: varchar("status", { enum: ["pending", "paid", "cancelled"] }).notNull().default("paid"),
      attachmentPath: varchar("attachment_path", { length: 500 }),
      attachmentName: varchar("attachment_name", { length: 255 }),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    creditNotes = pgTable("credit_notes", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      invoiceId: varchar("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
      clientId: varchar("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      creditNoteNumber: varchar("credit_note_number", { length: 50 }).notNull().unique(),
      reason: text("reason").notNull(),
      totalHT: decimal("total_ht", { precision: 10, scale: 2 }).notNull(),
      taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).notNull().default("20.00"),
      taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).notNull(),
      totalTTC: decimal("total_ttc", { precision: 10, scale: 2 }).notNull(),
      status: varchar("status", { enum: ["draft", "issued", "refunded", "cancelled"] }).notNull().default("draft"),
      issuedAt: timestamp("issued_at"),
      refundedAt: timestamp("refunded_at"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    creditNoteItems = pgTable("credit_note_items", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      creditNoteId: varchar("credit_note_id").notNull().references(() => creditNotes.id, { onDelete: "cascade" }),
      description: text("description").notNull(),
      quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull().default("1"),
      unitPriceHT: decimal("unit_price_ht", { precision: 10, scale: 2 }).notNull(),
      totalHT: decimal("total_ht", { precision: 10, scale: 2 }).notNull(),
      taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).notNull(),
      taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).notNull(),
      totalTTC: decimal("total_ttc", { precision: 10, scale: 2 }).notNull(),
      createdAt: timestamp("created_at").defaultNow()
    });
    accountingEntries = pgTable("accounting_entries", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      entryNumber: varchar("entry_number", { length: 50 }).notNull().unique(),
      date: timestamp("date").notNull(),
      journal: varchar("journal", { enum: ["sales", "purchases", "bank", "cash", "misc"] }).notNull(),
      sourceType: varchar("source_type", { enum: ["invoice", "expense", "credit_note", "payment", "manual"] }).notNull(),
      sourceId: varchar("source_id"),
      description: text("description").notNull(),
      totalDebit: decimal("total_debit", { precision: 10, scale: 2 }).notNull().default("0"),
      totalCredit: decimal("total_credit", { precision: 10, scale: 2 }).notNull().default("0"),
      isValidated: boolean("is_validated").notNull().default(false),
      validatedAt: timestamp("validated_at"),
      validatedBy: varchar("validated_by").references(() => users.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    accountingLines = pgTable("accounting_lines", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      entryId: varchar("entry_id").notNull().references(() => accountingEntries.id, { onDelete: "cascade" }),
      accountCode: varchar("account_code", { length: 20 }).notNull(),
      accountLabel: varchar("account_label", { length: 255 }).notNull(),
      description: text("description"),
      debit: decimal("debit", { precision: 10, scale: 2 }).notNull().default("0"),
      credit: decimal("credit", { precision: 10, scale: 2 }).notNull().default("0"),
      vatRate: decimal("vat_rate", { precision: 5, scale: 2 }),
      vatAmount: decimal("vat_amount", { precision: 10, scale: 2 }),
      createdAt: timestamp("created_at").defaultNow()
    });
    fecExports = pgTable("fec_exports", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      periodStart: timestamp("period_start").notNull(),
      periodEnd: timestamp("period_end").notNull(),
      entryCount: integer("entry_count").notNull().default(0),
      totalDebit: decimal("total_debit", { precision: 12, scale: 2 }).notNull().default("0"),
      totalCredit: decimal("total_credit", { precision: 12, scale: 2 }).notNull().default("0"),
      fileName: varchar("file_name", { length: 255 }),
      filePath: varchar("file_path", { length: 500 }),
      generatedBy: varchar("generated_by").references(() => users.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at").defaultNow()
    });
    creditNoteCounters = pgTable("credit_note_counters", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      year: integer("year").notNull(),
      currentNumber: integer("current_number").notNull().default(0),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    expenseCounters = pgTable("expense_counters", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      year: integer("year").notNull(),
      currentNumber: integer("current_number").notNull().default(0),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    expenseCategoriesRelations = relations(expenseCategories, ({ one, many }) => ({
      garage: one(garages, {
        fields: [expenseCategories.garageId],
        references: [garages.id]
      }),
      expenses: many(expenses)
    }));
    expensesRelations = relations(expenses, ({ one }) => ({
      garage: one(garages, {
        fields: [expenses.garageId],
        references: [garages.id]
      }),
      category: one(expenseCategories, {
        fields: [expenses.categoryId],
        references: [expenseCategories.id]
      })
    }));
    creditNotesRelations = relations(creditNotes, ({ one, many }) => ({
      garage: one(garages, {
        fields: [creditNotes.garageId],
        references: [garages.id]
      }),
      invoice: one(invoices, {
        fields: [creditNotes.invoiceId],
        references: [invoices.id]
      }),
      client: one(users, {
        fields: [creditNotes.clientId],
        references: [users.id]
      }),
      items: many(creditNoteItems)
    }));
    creditNoteItemsRelations = relations(creditNoteItems, ({ one }) => ({
      creditNote: one(creditNotes, {
        fields: [creditNoteItems.creditNoteId],
        references: [creditNotes.id]
      })
    }));
    accountingEntriesRelations = relations(accountingEntries, ({ one, many }) => ({
      garage: one(garages, {
        fields: [accountingEntries.garageId],
        references: [garages.id]
      }),
      validatedByUser: one(users, {
        fields: [accountingEntries.validatedBy],
        references: [users.id]
      }),
      lines: many(accountingLines)
    }));
    accountingLinesRelations = relations(accountingLines, ({ one }) => ({
      entry: one(accountingEntries, {
        fields: [accountingLines.entryId],
        references: [accountingEntries.id]
      })
    }));
    insertExpenseCategorySchema = createInsertSchema(expenseCategories).omit({ id: true, createdAt: true, updatedAt: true });
    insertExpenseSchema = createInsertSchema(expenses).omit({ id: true, createdAt: true, updatedAt: true, expenseNumber: true }).extend({
      date: z.union([z.date(), z.string()]).transform((val) => typeof val === "string" ? new Date(val) : val),
      amountHT: z.union([z.string(), z.number()]).transform((val) => String(val)),
      taxRate: z.union([z.string(), z.number()]).transform((val) => String(val)),
      taxAmount: z.union([z.string(), z.number()]).transform((val) => String(val)),
      amountTTC: z.union([z.string(), z.number()]).transform((val) => String(val))
    });
    insertCreditNoteSchema = createInsertSchema(creditNotes).omit({ id: true, createdAt: true, updatedAt: true, creditNoteNumber: true }).extend({
      totalHT: z.union([z.string(), z.number()]).transform((val) => String(val)),
      taxAmount: z.union([z.string(), z.number()]).transform((val) => String(val)),
      totalTTC: z.union([z.string(), z.number()]).transform((val) => String(val))
    });
    insertCreditNoteItemSchema = createInsertSchema(creditNoteItems).omit({ id: true, createdAt: true });
    insertAccountingEntrySchema = createInsertSchema(accountingEntries).omit({ id: true, createdAt: true, updatedAt: true, entryNumber: true }).extend({
      date: z.union([z.date(), z.string()]).transform((val) => typeof val === "string" ? new Date(val) : val)
    });
    insertAccountingLineSchema = createInsertSchema(accountingLines).omit({ id: true, createdAt: true });
    insertFecExportSchema = createInsertSchema(fecExports).omit({ id: true, createdAt: true });
    ocrScans = pgTable("ocr_scans", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      scannedBy: varchar("scanned_by").references(() => users.id, { onDelete: "set null" }),
      documentType: varchar("document_type", { length: 50 }).notNull(),
      fileName: varchar("file_name", { length: 500 }),
      result: jsonb("result"),
      createdQuoteId: varchar("created_quote_id").references(() => quotes.id, { onDelete: "set null" }),
      createdInvoiceId: varchar("created_invoice_id").references(() => invoices.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertOcrScanSchema = createInsertSchema(ocrScans).omit({ id: true, createdAt: true });
    smsLogs = pgTable("sms_logs", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      recipientPhone: varchar("recipient_phone", { length: 20 }).notNull(),
      recipientName: varchar("recipient_name", { length: 255 }),
      recipientEmail: varchar("recipient_email", { length: 255 }),
      eventType: varchar("event_type", { length: 50 }).notNull(),
      eventTitle: varchar("event_title", { length: 255 }).notNull(),
      eventDetails: text("event_details"),
      messageBody: text("message_body"),
      provider: varchar("provider", { length: 20 }).notNull(),
      status: varchar("status", { length: 20 }).notNull().default("pending"),
      externalId: varchar("external_id", { length: 100 }),
      errorMessage: text("error_message"),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertSmsLogSchema = createInsertSchema(smsLogs).omit({ id: true, createdAt: true });
    notificationRules = pgTable("notification_rules", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "cascade" }),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      eventType: varchar("event_type", { enum: [
        "reservation_reminder",
        "invoice_overdue",
        "quote_expiry",
        "review_request",
        "payment_confirmed",
        "reservation_created",
        "invoice_created",
        "quote_sent",
        "custom"
      ] }).notNull(),
      channels: jsonb("channels").notNull().default(["app"]),
      triggerDelay: integer("trigger_delay").notNull().default(0),
      triggerUnit: varchar("trigger_unit", { enum: ["minutes", "hours", "days"] }).notNull().default("hours"),
      triggerDirection: varchar("trigger_direction", { enum: ["before", "after"] }).notNull().default("before"),
      recipientType: varchar("recipient_type", { enum: ["client", "admin", "both"] }).notNull().default("client"),
      emailSubject: varchar("email_subject", { length: 500 }),
      emailBody: text("email_body"),
      popupTitle: varchar("popup_title", { length: 255 }),
      popupMessage: text("popup_message"),
      smsMessage: text("sms_message"),
      isActive: boolean("is_active").notNull().default(true),
      lastTriggeredAt: timestamp("last_triggered_at"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    notificationRulesRelations = relations(notificationRules, ({ one }) => ({
      garage: one(garages, {
        fields: [notificationRules.garageId],
        references: [garages.id]
      })
    }));
    insertNotificationRuleSchema = createInsertSchema(notificationRules).omit({ id: true, createdAt: true, updatedAt: true, lastTriggeredAt: true });
    aiReports = pgTable("ai_reports", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
      garageId: varchar("garage_id").references(() => garages.id, { onDelete: "set null" }),
      make: varchar("make", { length: 100 }).notNull(),
      model: varchar("model", { length: 100 }).notNull(),
      year: varchar("year", { length: 10 }).notNull(),
      mileage: varchar("mileage", { length: 20 }),
      issue: text("issue").notNull(),
      content: text("content").notNull(),
      status: varchar("status", { enum: ["generated", "downloaded", "archived"] }).notNull().default("generated"),
      pdfPath: text("pdf_path"),
      metadata: jsonb("metadata"),
      guestEmail: varchar("guest_email", { length: 255 }),
      ipAddress: varchar("ip_address", { length: 45 }),
      isFree: boolean("is_free").notNull().default(true),
      createdAt: timestamp("created_at").defaultNow()
    });
    aiReportsRelations = relations(aiReports, ({ one }) => ({
      user: one(users, { fields: [aiReports.userId], references: [users.id] }),
      garage: one(garages, { fields: [aiReports.garageId], references: [garages.id] })
    }));
    insertAiReportSchema = createInsertSchema(aiReports).omit({ id: true, createdAt: true });
    panelUsers = pgTable("panel_users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      email: varchar("email", { length: 255 }).notNull().unique(),
      passwordHash: text("password_hash").notNull(),
      role: varchar("role", { length: 20 }).default("admin").notNull(),
      firstName: varchar("first_name", { length: 100 }),
      lastName: varchar("last_name", { length: 100 }),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertPanelUserSchema = createInsertSchema(panelUsers).omit({ id: true, createdAt: true });
    landingSettings = pgTable("landing_settings", {
      id: integer("id").primaryKey(),
      appName: varchar("app_name", { length: 100 }).default("AutoReport"),
      appTagline: text("app_tagline").default("Rapports automobiles intelligents propuls\xE9s par l'IA."),
      heroTitle: text("hero_title").default("Diagnostics automobiles nouvelle g\xE9n\xE9ration"),
      heroSubtitle: text("hero_subtitle").default("Analysez votre v\xE9hicule en quelques secondes gr\xE2ce \xE0 notre moteur d'intelligence artificielle."),
      heroCta: text("hero_cta").default("Analyser mon v\xE9hicule"),
      contactEmail: text("contact_email").default("support@autoreport.com"),
      contactPhone: text("contact_phone").default("+33 (0)1 21 40 80 80"),
      contactAddress: text("contact_address").default("75, Rue de la R\xE9publique, 75011 Paris"),
      footerCopyright: text("footer_copyright").default("AutoReport. Tous droits r\xE9serv\xE9s."),
      primaryColor: varchar("primary_color", { length: 20 }).default("#CE1126"),
      fontFamily: varchar("font_family", { length: 100 }).default("Exo 2"),
      aiPrompt: text("ai_prompt"),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    repairSheets = pgTable("repair_sheets", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      reportId: varchar("report_id"),
      reportSnapshot: jsonb("report_snapshot"),
      status: varchar("status", { enum: ["draft", "pending", "in_progress", "completed", "cancelled"] }).notNull().default("draft"),
      clientName: varchar("client_name", { length: 255 }),
      clientEmail: varchar("client_email", { length: 255 }),
      clientPhone: varchar("client_phone", { length: 50 }),
      clientAddress: text("client_address"),
      vehicleMake: varchar("vehicle_make", { length: 100 }),
      vehicleModel: varchar("vehicle_model", { length: 100 }),
      vehicleYear: varchar("vehicle_year", { length: 10 }),
      vehicleMileage: varchar("vehicle_mileage", { length: 20 }),
      vehiclePlate: varchar("vehicle_plate", { length: 20 }),
      diagnosticSummary: text("diagnostic_summary"),
      repairItems: jsonb("repair_items").default([]),
      quoteSubtotal: decimal("quote_subtotal", { precision: 10, scale: 2 }).default("0"),
      quoteTax: decimal("quote_tax", { precision: 10, scale: 2 }).default("0"),
      quoteDiscount: decimal("quote_discount", { precision: 10, scale: 2 }).default("0"),
      quoteTotal: decimal("quote_total", { precision: 10, scale: 2 }).default("0"),
      notes: text("notes"),
      technicianName: varchar("technician_name", { length: 255 }),
      scheduledAt: timestamp("scheduled_at"),
      completedAt: timestamp("completed_at"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    insertRepairSheetSchema = createInsertSchema(repairSheets).omit({ id: true, createdAt: true, updatedAt: true });
    insertLandingSettingsSchema = createInsertSchema(landingSettings).omit({ id: true, updatedAt: true });
    featureFlags = pgTable("feature_flags", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      key: varchar("key", { length: 100 }).notNull().unique(),
      enabled: boolean("enabled").notNull().default(false),
      description: text("description"),
      updatedAt: timestamp("updated_at").defaultNow(),
      updatedBy: varchar("updated_by", { length: 255 })
    });
    insertFeatureFlagSchema = createInsertSchema(featureFlags).omit({ id: true, updatedAt: true });
    subscriptionPlans = pgTable("subscription_plans", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: varchar("name", { length: 100 }).notNull(),
      description: text("description"),
      price: decimal("price", { precision: 10, scale: 2 }).notNull(),
      currency: varchar("currency", { length: 3 }).notNull().default("eur"),
      period: varchar("period", { length: 20 }).notNull().default("monthly"),
      reportsIncluded: integer("reports_included").notNull().default(5),
      stripeProductId: varchar("stripe_product_id", { length: 255 }),
      stripePriceId: varchar("stripe_price_id", { length: 255 }),
      isActive: boolean("is_active").notNull().default(true),
      sortOrder: integer("sort_order").notNull().default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans).omit({ id: true, createdAt: true, updatedAt: true });
    userSubscriptions = pgTable("user_subscriptions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      guestEmail: varchar("guest_email", { length: 255 }),
      planId: varchar("plan_id").references(() => subscriptionPlans.id, { onDelete: "set null" }),
      status: varchar("status", { length: 20 }).notNull().default("pending"),
      reportsUsed: integer("reports_used").notNull().default(0),
      reportsIncluded: integer("reports_included").notNull().default(1),
      stripeSessionId: varchar("stripe_session_id", { length: 255 }),
      stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
      currentPeriodEnd: timestamp("current_period_end"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    userSubscriptionsRelations = relations(userSubscriptions, ({ one }) => ({
      user: one(users, { fields: [userSubscriptions.userId], references: [users.id] }),
      plan: one(subscriptionPlans, { fields: [userSubscriptions.planId], references: [subscriptionPlans.id] })
    }));
    insertUserSubscriptionSchema = createInsertSchema(userSubscriptions).omit({ id: true, createdAt: true, updatedAt: true });
    supportTickets = pgTable("support_tickets", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
      email: varchar("email", { length: 255 }).notNull(),
      subject: varchar("subject", { length: 255 }).notNull(),
      message: text("message").notNull(),
      status: varchar("status", { length: 20 }).notNull().default("open"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    supportTicketsRelations = relations(supportTickets, ({ one }) => ({
      user: one(users, { fields: [supportTickets.userId], references: [users.id] })
    }));
    insertSupportTicketSchema = createInsertSchema(supportTickets).omit({ id: true, createdAt: true, updatedAt: true });
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  db: () => db,
  pool: () => pool
});
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema: schema_exports });
  }
});

// server/storage.ts
var storage_exports = {};
__export(storage_exports, {
  DatabaseStorage: () => DatabaseStorage,
  storage: () => storage
});
import { eq, desc, and, sql as sql2, inArray } from "drizzle-orm";
var DatabaseStorage, storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_schema();
    init_db();
    DatabaseStorage = class {
      // Garage methods (multi-tenant)
      async getGarages() {
        return await db.select().from(garages).orderBy(desc(garages.createdAt));
      }
      async getGarage(id) {
        const [garage] = await db.select().from(garages).where(eq(garages.id, id));
        return garage;
      }
      async getGarageBySlug(slug) {
        const [garage] = await db.select().from(garages).where(eq(garages.slug, slug));
        return garage;
      }
      async createGarage(garageData) {
        const [garage] = await db.insert(garages).values(garageData).returning();
        return garage;
      }
      async updateGarage(id, garageData) {
        const [garage] = await db.update(garages).set({ ...garageData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(garages.id, id)).returning();
        return garage;
      }
      async deleteGarage(id) {
        await db.delete(garages).where(eq(garages.id, id));
      }
      async getUsersByGarage(garageId) {
        return await db.select().from(users).where(eq(users.garageId, garageId));
      }
      async getUser(id) {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user;
      }
      async getUserByEmail(email) {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        return user;
      }
      async upsertUser(userData) {
        const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
          target: users.id,
          set: { ...userData, updatedAt: /* @__PURE__ */ new Date() }
        }).returning();
        return user;
      }
      async getAllUsers() {
        return await db.select().from(users).orderBy(desc(users.createdAt));
      }
      async updateUser(id, userData) {
        const [user] = await db.update(users).set({ ...userData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
        return user;
      }
      async createUser(userData) {
        const [user] = await db.insert(users).values({
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          address: userData.address,
          postalCode: userData.postalCode,
          city: userData.city,
          role: userData.role || "client",
          companyName: userData.companyName,
          siret: userData.siret,
          tvaNumber: userData.tvaNumber,
          companyAddress: userData.companyAddress
        }).returning();
        return user;
      }
      async deleteUser(id) {
        await db.delete(users).where(eq(users.id, id));
      }
      async getUsersByRoles(roles) {
        return await db.select().from(users).where(inArray(users.role, roles));
      }
      async getServices(garageId) {
        const conditions = [eq(services.isActive, true)];
        if (garageId) {
          conditions.push(eq(services.garageId, garageId));
        }
        return await db.select().from(services).where(and(...conditions)).orderBy(desc(services.createdAt));
      }
      async getAllServices(garageId) {
        const conditions = [];
        if (garageId) {
          conditions.push(eq(services.garageId, garageId));
        }
        if (conditions.length > 0) {
          return await db.select().from(services).where(and(...conditions)).orderBy(desc(services.createdAt));
        }
        return await db.select().from(services).orderBy(desc(services.createdAt));
      }
      async getService(id) {
        const [service] = await db.select().from(services).where(eq(services.id, id));
        return service;
      }
      async createService(serviceData) {
        const [service] = await db.insert(services).values(serviceData).returning();
        return service;
      }
      async updateService(id, serviceData) {
        const [service] = await db.update(services).set({ ...serviceData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(services.id, id)).returning();
        return service;
      }
      async deleteService(id) {
        await db.delete(services).where(eq(services.id, id));
      }
      async getQuotes(clientId, garageId) {
        const conditions = [];
        if (clientId) {
          conditions.push(eq(quotes.clientId, clientId));
        }
        if (garageId) {
          conditions.push(eq(quotes.garageId, garageId));
        }
        if (conditions.length > 0) {
          return await db.select().from(quotes).where(and(...conditions)).orderBy(desc(quotes.createdAt));
        }
        return await db.select().from(quotes).orderBy(desc(quotes.createdAt));
      }
      async getQuote(id) {
        const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));
        return quote;
      }
      async createQuote(quoteData) {
        const now = /* @__PURE__ */ new Date();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const existingQuotes = await db.select({ reference: quotes.reference }).from(quotes).where(sql2`${quotes.createdAt} >= ${startOfMonth}`);
        const sequentialNumber = Math.max(0, ...existingQuotes.map((q) => parseInt(q.reference?.split("-").pop() || "0"))) + 1;
        const reference = `DEV-${month}-${String(sequentialNumber).padStart(5, "0")}`;
        const [quote] = await db.insert(quotes).values({ ...quoteData, reference }).returning();
        return quote;
      }
      async updateQuote(id, quoteData) {
        const [quote] = await db.update(quotes).set({ ...quoteData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(quotes.id, id)).returning();
        return quote;
      }
      async getQuoteItems(quoteId) {
        return await db.select().from(quoteItems).where(eq(quoteItems.quoteId, quoteId)).orderBy(quoteItems.createdAt);
      }
      async getQuoteItem(id) {
        const [item] = await db.select().from(quoteItems).where(eq(quoteItems.id, id));
        return item;
      }
      async createQuoteItem(itemData) {
        const [item] = await db.insert(quoteItems).values([itemData]).returning();
        return item;
      }
      async updateQuoteItem(id, itemData) {
        const [item] = await db.update(quoteItems).set({ ...itemData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(quoteItems.id, id)).returning();
        return item;
      }
      async deleteQuoteItem(id) {
        await db.delete(quoteItems).where(eq(quoteItems.id, id));
      }
      async recalculateQuoteTotals(quoteId) {
        const items = await this.getQuoteItems(quoteId);
        let totalHT = 0;
        let totalVAT = 0;
        let totalTTC = 0;
        for (const item of items) {
          const ht = parseFloat(item.totalExcludingTax || "0");
          const vat = parseFloat(item.taxAmount || "0");
          const ttc = parseFloat(item.totalIncludingTax || "0");
          totalHT += ht;
          totalVAT += vat;
          totalTTC += ttc;
        }
        const avgTaxRate = items.length > 0 ? parseFloat(items[0].taxRate || "20") : 20;
        return await this.updateQuote(quoteId, {
          quoteAmount: totalTTC.toFixed(2),
          priceExcludingTax: totalHT.toFixed(2),
          taxAmount: totalVAT.toFixed(2),
          taxRate: avgTaxRate.toFixed(2)
        });
      }
      async deleteQuote(id) {
        await db.delete(quoteItems).where(eq(quoteItems.quoteId, id));
        const mediaList = await db.select().from(quoteMedia).where(eq(quoteMedia.quoteId, id));
        for (const m of mediaList) {
          await this.deleteQuoteMedia(m.id);
        }
        await db.delete(quotes).where(eq(quotes.id, id));
      }
      async getInvoices(clientId, garageId) {
        const conditions = [];
        if (clientId) {
          conditions.push(eq(invoices.clientId, clientId));
        }
        if (garageId) {
          conditions.push(eq(invoices.garageId, garageId));
        }
        let query = db.select().from(invoices);
        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }
        return await query.orderBy(desc(invoices.createdAt));
      }
      async getInvoice(id) {
        const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
        return invoice;
      }
      async createInvoice(invoiceData) {
        const now = /* @__PURE__ */ new Date();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        let prefix = "wire_transfer";
        let prefixLabel = "VIR";
        if (invoiceData.paymentMethod === "cash") {
          prefix = "cash";
          prefixLabel = "ESP";
        } else if (invoiceData.paymentMethod === "card") {
          prefix = "card";
          prefixLabel = "CBL";
        }
        const counter = await this.incrementInvoiceCounter(prefix);
        const invoiceNumber = `${prefixLabel}-${month}-${String(counter.currentNumber).padStart(4, "0")}`;
        const [existing] = await db.select().from(invoices).where(eq(invoices.invoiceNumber, invoiceNumber));
        if (existing) {
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const existingInvoices = await db.select({ invoiceNumber: invoices.invoiceNumber }).from(invoices).where(and(
            sql2`${invoices.createdAt} >= ${startOfMonth}`,
            sql2`${invoices.invoiceNumber} LIKE ${prefixLabel + "-%"}`
          ));
          const sequentialNumber = Math.max(counter.currentNumber, ...existingInvoices.map((i) => parseInt(i.invoiceNumber.split("-").pop() || "0"))) + 1;
          const safeNumber = `${prefixLabel}-${month}-${String(sequentialNumber).padStart(4, "0")}`;
          const [invoice2] = await db.insert(invoices).values([{
            ...invoiceData,
            invoiceNumber: safeNumber
          }]).returning();
          await db.update(invoiceCounters).set({ currentNumber: sequentialNumber }).where(eq(invoiceCounters.paymentType, prefix));
          return invoice2;
        }
        const [invoice] = await db.insert(invoices).values([{
          ...invoiceData,
          invoiceNumber
        }]).returning();
        return invoice;
      }
      async updateInvoice(id, invoiceData) {
        const [invoice] = await db.update(invoices).set({ ...invoiceData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(invoices.id, id)).returning();
        return invoice;
      }
      async deleteInvoice(id) {
        await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, id));
        const mediaList = await db.select().from(invoiceMedia).where(eq(invoiceMedia.invoiceId, id));
        for (const m of mediaList) {
          await this.deleteInvoiceMedia(m.id);
        }
        await db.delete(invoices).where(eq(invoices.id, id));
      }
      async getInvoiceItems(invoiceId) {
        return await db.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, invoiceId)).orderBy(invoiceItems.createdAt);
      }
      async getInvoiceItem(id) {
        const [item] = await db.select().from(invoiceItems).where(eq(invoiceItems.id, id));
        return item;
      }
      async createInvoiceItem(itemData) {
        const [item] = await db.insert(invoiceItems).values([itemData]).returning();
        return item;
      }
      async updateInvoiceItem(id, itemData) {
        const [item] = await db.update(invoiceItems).set({ ...itemData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(invoiceItems.id, id)).returning();
        return item;
      }
      async deleteInvoiceItem(id) {
        await db.delete(invoiceItems).where(eq(invoiceItems.id, id));
      }
      async recalculateInvoiceTotals(invoiceId) {
        const items = await this.getInvoiceItems(invoiceId);
        let totalHT = 0;
        let totalVAT = 0;
        let totalTTC = 0;
        for (const item of items) {
          const ht = parseFloat(item.totalExcludingTax || "0");
          const vat = parseFloat(item.taxAmount || "0");
          const ttc = parseFloat(item.totalIncludingTax || "0");
          totalHT += ht;
          totalVAT += vat;
          totalTTC += ttc;
        }
        const avgTaxRate = items.length > 0 ? parseFloat(items[0].taxRate || "20") : 20;
        return await this.updateInvoice(invoiceId, {
          amount: totalTTC.toFixed(2),
          priceExcludingTax: totalHT.toFixed(2),
          taxAmount: totalVAT.toFixed(2),
          taxRate: avgTaxRate.toFixed(2)
        });
      }
      async getReservations(clientId, garageId) {
        const conditions = [];
        if (clientId) {
          conditions.push(eq(reservations.clientId, clientId));
        }
        if (garageId) {
          conditions.push(eq(reservations.garageId, garageId));
        }
        if (conditions.length > 0) {
          return await db.select().from(reservations).where(and(...conditions)).orderBy(desc(reservations.createdAt));
        }
        return await db.select().from(reservations).orderBy(desc(reservations.createdAt));
      }
      async getReservation(id) {
        const [reservation] = await db.select().from(reservations).where(eq(reservations.id, id));
        return reservation;
      }
      async createReservation(reservationData) {
        const [reservation] = await db.insert(reservations).values(reservationData).returning();
        return reservation;
      }
      async updateReservation(id, reservationData) {
        const [reservation] = await db.update(reservations).set({ ...reservationData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(reservations.id, id)).returning();
        return reservation;
      }
      async getReservationServices(reservationId) {
        const results = await db.select({
          id: reservationServices.id,
          reservationId: reservationServices.reservationId,
          serviceId: reservationServices.serviceId,
          quantity: reservationServices.quantity,
          priceExcludingTax: reservationServices.priceExcludingTax,
          notes: reservationServices.notes,
          createdAt: reservationServices.createdAt,
          service: services
        }).from(reservationServices).innerJoin(services, eq(reservationServices.serviceId, services.id)).where(eq(reservationServices.reservationId, reservationId));
        return results;
      }
      async addReservationService(data) {
        const [result] = await db.insert(reservationServices).values(data).returning();
        return result;
      }
      async deleteReservation(id) {
        await db.delete(reservationServices).where(eq(reservationServices.reservationId, id));
        await db.delete(workshopTasks).where(eq(workshopTasks.reservationId, id));
        await db.delete(repairOrders).where(eq(repairOrders.reservationId, id));
        await db.delete(reservations).where(eq(reservations.id, id));
      }
      async deleteReservationServices(reservationId) {
        await db.delete(reservationServices).where(eq(reservationServices.reservationId, reservationId));
      }
      async setReservationServices(reservationId, serviceIds) {
        await this.deleteReservationServices(reservationId);
        if (serviceIds.length > 0) {
          const values = serviceIds.map((serviceId) => ({
            reservationId,
            serviceId,
            quantity: 1
          }));
          await db.insert(reservationServices).values(values);
        }
      }
      async getNotifications(userId) {
        return await db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt));
      }
      async createNotification(notificationData) {
        const [notification] = await db.insert(notifications).values(notificationData).returning();
        return notification;
      }
      async markNotificationAsRead(id) {
        await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
      }
      async getInvoiceCounter(paymentType) {
        const [counter] = await db.select().from(invoiceCounters).where(eq(invoiceCounters.paymentType, paymentType));
        return counter;
      }
      async createInvoiceCounter(counterData) {
        const [counter] = await db.insert(invoiceCounters).values(counterData).returning();
        return counter;
      }
      async incrementInvoiceCounter(paymentType) {
        const [counter] = await db.insert(invoiceCounters).values({ paymentType, currentNumber: 1 }).onConflictDoUpdate({
          target: invoiceCounters.paymentType,
          set: {
            currentNumber: sql2`${invoiceCounters.currentNumber} + 1`,
            updatedAt: /* @__PURE__ */ new Date()
          }
        }).returning();
        return counter;
      }
      async createQuoteMedia(media) {
        const [result] = await db.insert(quoteMedia).values({
          quoteId: media.quoteId,
          filePath: media.filePath,
          fileType: media.fileType,
          fileName: media.fileName || "file",
          fileSize: media.fileSize
        }).returning();
        return result;
      }
      async createInvoiceMedia(media) {
        const [result] = await db.insert(invoiceMedia).values({
          invoiceId: media.invoiceId,
          filePath: media.filePath,
          fileType: media.fileType,
          fileName: media.fileName || "file",
          fileSize: media.fileSize
        }).returning();
        return result;
      }
      async getQuoteByReference(reference) {
        const [quote] = await db.select().from(quotes).where(eq(quotes.reference, reference));
        return quote;
      }
      async getQuoteMedia(quoteId) {
        return await db.select().from(quoteMedia).where(eq(quoteMedia.quoteId, quoteId));
      }
      async getQuoteMediaByPath(filePath) {
        return await db.select().from(quoteMedia).where(eq(quoteMedia.filePath, filePath));
      }
      async getInvoiceMedia(invoiceId) {
        return await db.select().from(invoiceMedia).where(eq(invoiceMedia.invoiceId, invoiceId));
      }
      async getInvoiceMediaByPath(filePath) {
        return await db.select().from(invoiceMedia).where(eq(invoiceMedia.filePath, filePath));
      }
      async getQuoteMediaById(mediaId) {
        const [media] = await db.select().from(quoteMedia).where(eq(quoteMedia.id, mediaId));
        return media;
      }
      async deleteQuoteMedia(mediaId) {
        await db.delete(quoteMedia).where(eq(quoteMedia.id, mediaId));
      }
      async getInvoiceMediaById(mediaId) {
        const [media] = await db.select().from(invoiceMedia).where(eq(invoiceMedia.id, mediaId));
        return media;
      }
      async deleteInvoiceMedia(mediaId) {
        await db.delete(invoiceMedia).where(eq(invoiceMedia.id, mediaId));
      }
      async getApplicationSettings() {
        const [settings] = await db.select().from(applicationSettings).limit(1);
        return settings;
      }
      async createOrUpdateApplicationSettings(settingsData) {
        const existing = await this.getApplicationSettings();
        if (existing) {
          const [updated] = await db.update(applicationSettings).set({ ...settingsData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(applicationSettings.id, existing.id)).returning();
          return updated;
        } else {
          const [created] = await db.insert(applicationSettings).values([settingsData]).returning();
          return created;
        }
      }
      async getEngagements(clientId) {
        if (clientId) {
          return await db.select().from(engagements).where(eq(engagements.clientId, clientId)).orderBy(desc(engagements.createdAt));
        }
        return await db.select().from(engagements).orderBy(desc(engagements.createdAt));
      }
      async getEngagement(id) {
        const [engagement] = await db.select().from(engagements).where(eq(engagements.id, id));
        return engagement;
      }
      async createEngagement(engagementData) {
        const [engagement] = await db.insert(engagements).values([engagementData]).returning();
        return engagement;
      }
      async updateEngagement(id, engagementData) {
        const [engagement] = await db.update(engagements).set({ ...engagementData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(engagements.id, id)).returning();
        return engagement;
      }
      async getEngagementSummary(clientId) {
        const [quotesList, invoicesList, reservationsList] = await Promise.all([
          db.select().from(quotes).where(eq(quotes.clientId, clientId)).orderBy(desc(quotes.createdAt)),
          db.select().from(invoices).where(eq(invoices.clientId, clientId)).orderBy(desc(invoices.createdAt)),
          db.select().from(reservations).where(eq(reservations.clientId, clientId)).orderBy(desc(reservations.createdAt))
        ]);
        const quoteIds = quotesList.map((q) => q.id);
        const invoiceIds = invoicesList.map((i) => i.id);
        const [allQuoteMedia, allInvoiceMedia] = await Promise.all([
          quoteIds.length > 0 ? db.select().from(quoteMedia).where(inArray(quoteMedia.quoteId, quoteIds)) : Promise.resolve([]),
          invoiceIds.length > 0 ? db.select().from(invoiceMedia).where(inArray(invoiceMedia.invoiceId, invoiceIds)) : Promise.resolve([])
        ]);
        const quotesWithMedia = quotesList.map((quote) => ({
          ...quote,
          media: allQuoteMedia.filter((m) => m.quoteId === quote.id).map((m) => ({
            id: m.id,
            fileType: m.fileType,
            filePath: m.filePath,
            fileName: m.fileName
          }))
        }));
        const invoicesWithMedia = invoicesList.map((invoice) => ({
          ...invoice,
          media: allInvoiceMedia.filter((m) => m.invoiceId === invoice.id).map((m) => ({
            id: m.id,
            fileType: m.fileType,
            filePath: m.filePath,
            fileName: m.fileName
          }))
        }));
        return { quotes: quotesWithMedia, invoices: invoicesWithMedia, reservations: reservationsList };
      }
      async createWorkflow(workflowData) {
        const [workflow] = await db.insert(workflows).values([workflowData]).returning();
        return workflow;
      }
      async getWorkflow(id) {
        const [workflow] = await db.select().from(workflows).where(eq(workflows.id, id));
        return workflow;
      }
      async getWorkflows() {
        return await db.select().from(workflows).orderBy(desc(workflows.createdAt));
      }
      async getWorkflowByServiceId(serviceId) {
        const [workflow] = await db.select().from(workflows).where(eq(workflows.serviceId, serviceId));
        return workflow;
      }
      async updateWorkflow(id, workflowData) {
        const [workflow] = await db.update(workflows).set({ ...workflowData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(workflows.id, id)).returning();
        return workflow;
      }
      async deleteWorkflow(id) {
        await db.delete(workflows).where(eq(workflows.id, id));
      }
      async createWorkflowStep(stepData) {
        const [step] = await db.insert(workflowSteps).values([stepData]).returning();
        return step;
      }
      async getWorkflowSteps(workflowId) {
        return await db.select().from(workflowSteps).where(eq(workflowSteps.workflowId, workflowId)).orderBy(workflowSteps.stepNumber);
      }
      async updateWorkflowStep(id, stepData) {
        const [step] = await db.update(workflowSteps).set({ ...stepData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(workflowSteps.id, id)).returning();
        return step;
      }
      async deleteWorkflowStep(id) {
        await db.delete(workflowSteps).where(eq(workflowSteps.id, id));
      }
      async assignWorkflowToService(serviceWorkflowData) {
        const [sw] = await db.insert(serviceWorkflows).values([serviceWorkflowData]).returning();
        return sw;
      }
      async getServiceWorkflows(serviceId) {
        const serviceWorkflowsList = await db.select().from(serviceWorkflows).where(eq(serviceWorkflows.serviceId, serviceId));
        const workflowIds = serviceWorkflowsList.map((sw) => sw.workflowId);
        if (workflowIds.length === 0) return [];
        return await db.select().from(workflows).where(inArray(workflows.id, workflowIds));
      }
      async deleteServiceWorkflow(serviceId, workflowId) {
        await db.delete(serviceWorkflows).where(
          and(eq(serviceWorkflows.serviceId, serviceId), eq(serviceWorkflows.workflowId, workflowId))
        );
      }
      async createWorkshopTask(taskData) {
        const [task] = await db.insert(workshopTasks).values([taskData]).returning();
        return task;
      }
      async updateWorkshopTask(id, taskData) {
        const [task] = await db.update(workshopTasks).set({ ...taskData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(workshopTasks.id, id)).returning();
        return task;
      }
      async getReservationTasks(reservationId) {
        const tasks = await db.select().from(workshopTasks).where(eq(workshopTasks.reservationId, reservationId));
        return Promise.all(tasks.map(async (task) => {
          const [step] = await db.select().from(workflowSteps).where(eq(workflowSteps.id, task.workflowStepId));
          return { ...task, step };
        }));
      }
      async initializeReservationWorkflow(reservationId, workflowSteps2) {
        for (const step of workflowSteps2) {
          await this.createWorkshopTask({
            reservationId,
            workflowStepId: step.id,
            isCompleted: false
          });
        }
      }
      // Repair Order methods
      async createRepairOrder(data) {
        const [order] = await db.insert(repairOrders).values([data]).returning();
        return order;
      }
      async getRepairOrder(id) {
        const [order] = await db.select().from(repairOrders).where(eq(repairOrders.id, id));
        return order;
      }
      async getRepairOrders(garageId) {
        if (garageId) {
          return db.select().from(repairOrders).where(eq(repairOrders.garageId, garageId)).orderBy(desc(repairOrders.createdAt));
        }
        return db.select().from(repairOrders).orderBy(desc(repairOrders.createdAt));
      }
      async getRepairOrderByReservation(reservationId) {
        const [order] = await db.select().from(repairOrders).where(eq(repairOrders.reservationId, reservationId));
        return order;
      }
      async updateRepairOrder(id, data) {
        const [order] = await db.update(repairOrders).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(repairOrders.id, id)).returning();
        return order;
      }
      async deleteRepairOrder(id) {
        await db.delete(repairOrders).where(eq(repairOrders.id, id));
      }
      // Audit Log methods
      async createAuditLog(logData, changes) {
        const [auditLog] = await db.insert(auditLogs).values([logData]).returning();
        if (changes && changes.length > 0) {
          await db.insert(auditLogChanges).values(
            changes.map((change) => ({
              auditLogId: auditLog.id,
              field: change.field,
              previousValue: change.previousValue,
              newValue: change.newValue
            }))
          );
        }
        return auditLog;
      }
      async getAuditLogs(filters) {
        const conditions = [];
        if (filters?.entityType) {
          conditions.push(eq(auditLogs.entityType, filters.entityType));
        }
        if (filters?.entityId) {
          conditions.push(eq(auditLogs.entityId, filters.entityId));
        }
        if (filters?.actorId) {
          conditions.push(eq(auditLogs.actorId, filters.actorId));
        }
        if (filters?.action) {
          conditions.push(eq(auditLogs.action, filters.action));
        }
        if (filters?.startDate) {
          conditions.push(sql2`${auditLogs.occurredAt} >= ${filters.startDate}`);
        }
        if (filters?.endDate) {
          conditions.push(sql2`${auditLogs.occurredAt} <= ${filters.endDate}`);
        }
        const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
        const [{ count: count2 }] = await db.select({ count: sql2`count(*)` }).from(auditLogs).where(whereClause);
        let query = db.select().from(auditLogs).where(whereClause).orderBy(desc(auditLogs.occurredAt));
        if (filters?.limit) {
          query = query.limit(filters.limit);
        }
        if (filters?.offset) {
          query = query.offset(filters.offset);
        }
        const logs = await query;
        const enrichedLogs = await Promise.all(logs.map(async (log2) => {
          let actor;
          if (log2.actorId) {
            const [foundActor] = await db.select().from(users).where(eq(users.id, log2.actorId));
            actor = foundActor;
          }
          const changes = await db.select().from(auditLogChanges).where(eq(auditLogChanges.auditLogId, log2.id));
          return { ...log2, actor, changes };
        }));
        return { logs: enrichedLogs, total: Number(count2) };
      }
      async getAuditLog(id) {
        const [log2] = await db.select().from(auditLogs).where(eq(auditLogs.id, id));
        if (!log2) return void 0;
        let actor;
        if (log2.actorId) {
          const [foundActor] = await db.select().from(users).where(eq(users.id, log2.actorId));
          actor = foundActor;
        }
        const changes = await db.select().from(auditLogChanges).where(eq(auditLogChanges.auditLogId, log2.id));
        return { ...log2, actor, changes };
      }
      async getEntityAuditHistory(entityType, entityId) {
        const logs = await db.select().from(auditLogs).where(and(eq(auditLogs.entityType, entityType), eq(auditLogs.entityId, entityId))).orderBy(desc(auditLogs.occurredAt));
        return Promise.all(logs.map(async (log2) => {
          let actor;
          if (log2.actorId) {
            const [foundActor] = await db.select().from(users).where(eq(users.id, log2.actorId));
            actor = foundActor;
          }
          const changes = await db.select().from(auditLogChanges).where(eq(auditLogChanges.auditLogId, log2.id));
          return { ...log2, actor, changes };
        }));
      }
      // Password reset tokens
      async createPasswordResetToken(data) {
        const [resetToken] = await db.insert(passwordResetTokens).values({
          userId: data.userId,
          token: data.token,
          expiresAt: data.expiresAt
        }).returning();
        return resetToken;
      }
      async getPasswordResetToken(token) {
        const [resetToken] = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.token, token));
        return resetToken;
      }
      async markPasswordResetTokenUsed(token) {
        await db.update(passwordResetTokens).set({ used: true }).where(eq(passwordResetTokens.token, token));
      }
      // Chat methods
      async createChatConversation(data) {
        const [conversation] = await db.insert(chatConversations).values(data).returning();
        return conversation;
      }
      async getChatConversation(id) {
        const [conversation] = await db.select().from(chatConversations).where(eq(chatConversations.id, id));
        return conversation;
      }
      async getChatConversations(userId) {
        const participantRecords = await db.select().from(chatParticipants).where(eq(chatParticipants.userId, userId));
        const conversationIds = participantRecords.map((p) => p.conversationId);
        if (conversationIds.length === 0) return [];
        const conversations = await db.select().from(chatConversations).where(inArray(chatConversations.id, conversationIds)).orderBy(desc(chatConversations.lastMessageAt));
        return Promise.all(conversations.map(async (conv) => {
          const participants = await this.getChatParticipants(conv.id);
          const userParticipant = participantRecords.find((p) => p.conversationId === conv.id);
          const lastReadAt = userParticipant?.lastReadAt;
          let unreadCount = 0;
          if (lastReadAt) {
            const unreadMessages = await db.select({ count: sql2`count(*)` }).from(chatMessages).where(and(
              eq(chatMessages.conversationId, conv.id),
              sql2`${chatMessages.createdAt} > ${lastReadAt}`
            ));
            unreadCount = Number(unreadMessages[0]?.count || 0);
          } else {
            const allMessages = await db.select({ count: sql2`count(*)` }).from(chatMessages).where(eq(chatMessages.conversationId, conv.id));
            unreadCount = Number(allMessages[0]?.count || 0);
          }
          const [lastMessageRow] = await db.select().from(chatMessages).where(eq(chatMessages.conversationId, conv.id)).orderBy(desc(chatMessages.createdAt)).limit(1);
          let lastMessage;
          if (lastMessageRow) {
            const [sender] = await db.select().from(users).where(eq(users.id, lastMessageRow.senderId));
            if (sender) {
              const attachments = await db.select({ count: sql2`count(*)` }).from(chatAttachments).where(eq(chatAttachments.messageId, lastMessageRow.id));
              const attachmentCount = Number(attachments[0]?.count || 0);
              lastMessage = { ...lastMessageRow, sender, attachmentCount };
            }
          }
          return { ...conv, participants, unreadCount, lastMessage };
        }));
      }
      async updateChatConversation(id, data) {
        const [conversation] = await db.update(chatConversations).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(chatConversations.id, id)).returning();
        return conversation;
      }
      async deleteChatConversation(id) {
        await db.delete(chatConversations).where(eq(chatConversations.id, id));
      }
      async addChatParticipant(data) {
        const [participant] = await db.insert(chatParticipants).values(data).returning();
        return participant;
      }
      async removeChatParticipant(conversationId, odUserId) {
        await db.delete(chatParticipants).where(
          and(eq(chatParticipants.conversationId, conversationId), eq(chatParticipants.userId, odUserId))
        );
      }
      async getChatParticipants(conversationId) {
        const participants = await db.select().from(chatParticipants).where(eq(chatParticipants.conversationId, conversationId));
        return Promise.all(participants.map(async (p) => {
          const [user] = await db.select().from(users).where(eq(users.id, p.userId));
          return { ...p, user };
        }));
      }
      async updateLastRead(conversationId, userId) {
        await db.update(chatParticipants).set({ lastReadAt: /* @__PURE__ */ new Date() }).where(and(eq(chatParticipants.conversationId, conversationId), eq(chatParticipants.userId, userId)));
      }
      async createChatMessage(data) {
        const [message] = await db.insert(chatMessages).values(data).returning();
        await db.update(chatConversations).set({ lastMessageAt: /* @__PURE__ */ new Date() }).where(eq(chatConversations.id, data.conversationId));
        return message;
      }
      async getChatMessages(conversationId, limit = 50, offset = 0) {
        const messages = await db.select().from(chatMessages).where(eq(chatMessages.conversationId, conversationId)).orderBy(desc(chatMessages.createdAt)).limit(limit).offset(offset);
        return Promise.all(messages.reverse().map(async (msg) => {
          const [sender] = await db.select().from(users).where(eq(users.id, msg.senderId));
          const attachments = await db.select().from(chatAttachments).where(eq(chatAttachments.messageId, msg.id));
          return { ...msg, sender, attachments };
        }));
      }
      async updateChatMessage(id, content) {
        const [message] = await db.update(chatMessages).set({ content, isEdited: true, updatedAt: /* @__PURE__ */ new Date() }).where(eq(chatMessages.id, id)).returning();
        return message;
      }
      async deleteChatMessage(id) {
        await db.delete(chatMessages).where(eq(chatMessages.id, id));
      }
      async createChatAttachment(data) {
        const [attachment] = await db.insert(chatAttachments).values(data).returning();
        return attachment;
      }
      async getChatAttachments(messageId) {
        return await db.select().from(chatAttachments).where(eq(chatAttachments.messageId, messageId));
      }
      // Delivery Notes (Bons de Livraison)
      async getDeliveryNotes(clientId, garageId) {
        const conditions = [];
        if (clientId) conditions.push(eq(deliveryNotes.clientId, clientId));
        if (garageId) conditions.push(eq(deliveryNotes.garageId, garageId));
        if (conditions.length > 0) {
          return await db.select().from(deliveryNotes).where(and(...conditions)).orderBy(desc(deliveryNotes.createdAt));
        }
        return await db.select().from(deliveryNotes).orderBy(desc(deliveryNotes.createdAt));
      }
      async getDeliveryNote(id) {
        const [note] = await db.select().from(deliveryNotes).where(eq(deliveryNotes.id, id));
        if (!note) return void 0;
        const invoicesData = await db.select({
          invoice: invoices
        }).from(deliveryNoteInvoices).innerJoin(invoices, eq(deliveryNoteInvoices.invoiceId, invoices.id)).where(eq(deliveryNoteInvoices.deliveryNoteId, id));
        const invoicesWithDetails = await Promise.all(
          invoicesData.map(async (item) => {
            const invoice = item.invoice;
            const items = await db.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, invoice.id));
            const media = await db.select().from(invoiceMedia).where(eq(invoiceMedia.invoiceId, invoice.id));
            return { ...invoice, items, media };
          })
        );
        const [client] = await db.select().from(users).where(eq(users.id, note.clientId));
        return { ...note, client, invoices: invoicesWithDetails };
      }
      async createDeliveryNote(data) {
        const [note] = await db.insert(deliveryNotes).values(data).returning();
        return note;
      }
      async updateDeliveryNote(id, data) {
        const [note] = await db.update(deliveryNotes).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(deliveryNotes.id, id)).returning();
        return note;
      }
      async deleteDeliveryNote(id) {
        await db.delete(deliveryNotes).where(eq(deliveryNotes.id, id));
      }
      async getDeliveryNoteInvoices(deliveryNoteId) {
        const links = await db.select().from(deliveryNoteInvoices).where(eq(deliveryNoteInvoices.deliveryNoteId, deliveryNoteId));
        return Promise.all(links.map(async (link) => {
          const [invoice] = await db.select().from(invoices).where(eq(invoices.id, link.invoiceId));
          return { ...link, invoice };
        }));
      }
      async setDeliveryNoteInvoices(deliveryNoteId, invoiceIds) {
        await db.delete(deliveryNoteInvoices).where(eq(deliveryNoteInvoices.deliveryNoteId, deliveryNoteId));
        if (invoiceIds.length > 0) {
          await db.insert(deliveryNoteInvoices).values(
            invoiceIds.map((invoiceId) => ({ deliveryNoteId, invoiceId }))
          );
        }
      }
      async incrementDeliveryNoteCounter(month, year) {
        const existing = await db.select().from(deliveryNoteCounters).where(and(
          eq(deliveryNoteCounters.month, month),
          eq(deliveryNoteCounters.year, year)
        ));
        if (existing.length > 0) {
          const [counter] = await db.update(deliveryNoteCounters).set({
            currentNumber: sql2`${deliveryNoteCounters.currentNumber} + 1`,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(and(
            eq(deliveryNoteCounters.month, month),
            eq(deliveryNoteCounters.year, year)
          )).returning();
          return counter;
        } else {
          const [counter] = await db.insert(deliveryNoteCounters).values({ month, year, currentNumber: 1 }).returning();
          return counter;
        }
      }
      // ========== EXPENSE CATEGORIES ==========
      async getExpenseCategories(garageId) {
        if (garageId) {
          return await db.select().from(expenseCategories).where(eq(expenseCategories.garageId, garageId)).orderBy(expenseCategories.name);
        }
        return await db.select().from(expenseCategories).orderBy(expenseCategories.name);
      }
      async getExpenseCategory(id) {
        const [cat] = await db.select().from(expenseCategories).where(eq(expenseCategories.id, id));
        return cat;
      }
      async createExpenseCategory(data) {
        const [cat] = await db.insert(expenseCategories).values(data).returning();
        return cat;
      }
      async updateExpenseCategory(id, data) {
        const [cat] = await db.update(expenseCategories).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(expenseCategories.id, id)).returning();
        return cat;
      }
      async deleteExpenseCategory(id) {
        await db.delete(expenseCategories).where(eq(expenseCategories.id, id));
      }
      // ========== EXPENSES ==========
      async getExpenses(garageId) {
        if (garageId) {
          return await db.select().from(expenses).where(eq(expenses.garageId, garageId)).orderBy(desc(expenses.date));
        }
        return await db.select().from(expenses).orderBy(desc(expenses.date));
      }
      async getExpense(id) {
        const [exp] = await db.select().from(expenses).where(eq(expenses.id, id));
        return exp;
      }
      async createExpense(data) {
        const [exp] = await db.insert(expenses).values(data).returning();
        return exp;
      }
      async updateExpense(id, data) {
        const [exp] = await db.update(expenses).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(expenses.id, id)).returning();
        return exp;
      }
      async deleteExpense(id) {
        await db.delete(expenses).where(eq(expenses.id, id));
      }
      async getNextExpenseNumber(year) {
        const existing = await db.select().from(expenseCounters).where(eq(expenseCounters.year, year));
        let nextNum;
        if (existing.length > 0) {
          await db.update(expenseCounters).set({ currentNumber: sql2`${expenseCounters.currentNumber} + 1`, updatedAt: /* @__PURE__ */ new Date() }).where(eq(expenseCounters.year, year));
          nextNum = existing[0].currentNumber + 1;
        } else {
          await db.insert(expenseCounters).values({ year, currentNumber: 1 });
          nextNum = 1;
        }
        return `DEP-${year}-${String(nextNum).padStart(5, "0")}`;
      }
      // ========== CREDIT NOTES ==========
      async getCreditNotes(garageId) {
        if (garageId) {
          return await db.select().from(creditNotes).where(eq(creditNotes.garageId, garageId)).orderBy(desc(creditNotes.createdAt));
        }
        return await db.select().from(creditNotes).orderBy(desc(creditNotes.createdAt));
      }
      async getCreditNote(id) {
        const [cn] = await db.select().from(creditNotes).where(eq(creditNotes.id, id));
        return cn;
      }
      async getCreditNotesByInvoice(invoiceId) {
        return await db.select().from(creditNotes).where(eq(creditNotes.invoiceId, invoiceId)).orderBy(desc(creditNotes.createdAt));
      }
      async createCreditNote(data) {
        const [cn] = await db.insert(creditNotes).values(data).returning();
        return cn;
      }
      async updateCreditNote(id, data) {
        const [cn] = await db.update(creditNotes).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(creditNotes.id, id)).returning();
        return cn;
      }
      async getNextCreditNoteNumber(year) {
        const existing = await db.select().from(creditNoteCounters).where(eq(creditNoteCounters.year, year));
        let nextNum;
        if (existing.length > 0) {
          await db.update(creditNoteCounters).set({ currentNumber: sql2`${creditNoteCounters.currentNumber} + 1`, updatedAt: /* @__PURE__ */ new Date() }).where(eq(creditNoteCounters.year, year));
          nextNum = existing[0].currentNumber + 1;
        } else {
          await db.insert(creditNoteCounters).values({ year, currentNumber: 1 });
          nextNum = 1;
        }
        return `AV-${year}-${String(nextNum).padStart(5, "0")}`;
      }
      async getCreditNoteItems(creditNoteId) {
        return await db.select().from(creditNoteItems).where(eq(creditNoteItems.creditNoteId, creditNoteId));
      }
      async createCreditNoteItem(data) {
        const [item] = await db.insert(creditNoteItems).values(data).returning();
        return item;
      }
      // ========== ACCOUNTING ENTRIES ==========
      async getAccountingEntries(garageId, filters) {
        const conditions = [];
        if (garageId) conditions.push(eq(accountingEntries.garageId, garageId));
        if (filters?.journal) conditions.push(eq(accountingEntries.journal, filters.journal));
        if (filters?.startDate) conditions.push(sql2`${accountingEntries.date} >= ${filters.startDate}`);
        if (filters?.endDate) conditions.push(sql2`${accountingEntries.date} <= ${filters.endDate}`);
        if (conditions.length > 0) {
          return await db.select().from(accountingEntries).where(and(...conditions)).orderBy(desc(accountingEntries.date));
        }
        return await db.select().from(accountingEntries).orderBy(desc(accountingEntries.date));
      }
      async getAccountingEntry(id) {
        const [entry] = await db.select().from(accountingEntries).where(eq(accountingEntries.id, id));
        return entry;
      }
      async createAccountingEntry(data) {
        const [entry] = await db.insert(accountingEntries).values(data).returning();
        return entry;
      }
      async updateAccountingEntry(id, data) {
        const [entry] = await db.update(accountingEntries).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(accountingEntries.id, id)).returning();
        return entry;
      }
      async getAccountingLines(entryId) {
        return await db.select().from(accountingLines).where(eq(accountingLines.entryId, entryId));
      }
      async createAccountingLine(data) {
        const [line] = await db.insert(accountingLines).values(data).returning();
        return line;
      }
      async getNextEntryNumber(year) {
        const count2 = await db.select({ count: sql2`count(*)::int` }).from(accountingEntries).where(sql2`EXTRACT(YEAR FROM ${accountingEntries.date}) = ${year}`);
        const nextNum = (count2[0]?.count || 0) + 1;
        return `EC-${year}-${String(nextNum).padStart(6, "0")}`;
      }
      // ========== FEC EXPORTS ==========
      async getFecExports(garageId) {
        if (garageId) {
          return await db.select().from(fecExports).where(eq(fecExports.garageId, garageId)).orderBy(desc(fecExports.createdAt));
        }
        return await db.select().from(fecExports).orderBy(desc(fecExports.createdAt));
      }
      async createFecExport(data) {
        const [exp] = await db.insert(fecExports).values(data).returning();
        return exp;
      }
      // ========== NOTIFICATION RULES ==========
      async getNotificationRules(garageId) {
        if (garageId) {
          return await db.select().from(notificationRules).where(eq(notificationRules.garageId, garageId)).orderBy(desc(notificationRules.createdAt));
        }
        return await db.select().from(notificationRules).orderBy(desc(notificationRules.createdAt));
      }
      async getNotificationRule(id) {
        const [rule] = await db.select().from(notificationRules).where(eq(notificationRules.id, id));
        return rule;
      }
      async createNotificationRule(data) {
        const [rule] = await db.insert(notificationRules).values(data).returning();
        return rule;
      }
      async updateNotificationRule(id, data) {
        const [rule] = await db.update(notificationRules).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(notificationRules.id, id)).returning();
        return rule;
      }
      async deleteNotificationRule(id) {
        await db.delete(notificationRules).where(eq(notificationRules.id, id));
      }
      async getActiveNotificationRules(garageId, eventType) {
        const conditions = [eq(notificationRules.isActive, true)];
        if (garageId) conditions.push(eq(notificationRules.garageId, garageId));
        if (eventType) conditions.push(eq(notificationRules.eventType, eventType));
        return await db.select().from(notificationRules).where(and(...conditions));
      }
      // AI Reports
      async getAiReports(userId, garageId) {
        const conditions = [];
        if (userId) conditions.push(eq(aiReports.userId, userId));
        if (garageId) conditions.push(eq(aiReports.garageId, garageId));
        if (conditions.length > 0) {
          return await db.select().from(aiReports).where(and(...conditions)).orderBy(desc(aiReports.createdAt));
        }
        return await db.select().from(aiReports).orderBy(desc(aiReports.createdAt));
      }
      async getAiReport(id) {
        const [report] = await db.select().from(aiReports).where(eq(aiReports.id, id));
        return report;
      }
      async createAiReport(data) {
        const [report] = await db.insert(aiReports).values(data).returning();
        return report;
      }
      async updateAiReport(id, data) {
        const [report] = await db.update(aiReports).set(data).where(eq(aiReports.id, id)).returning();
        return report;
      }
      async deleteAiReport(id) {
        await db.delete(aiReports).where(eq(aiReports.id, id));
      }
      async getAllAiReports() {
        return await db.select().from(aiReports).orderBy(desc(aiReports.createdAt));
      }
      async getLandingSettings() {
        const [settings] = await db.select().from(landingSettings).where(eq(landingSettings.id, 1));
        if (!settings) {
          const [created] = await db.insert(landingSettings).values({ id: 1 }).returning();
          return created;
        }
        return settings;
      }
      async updateLandingSettings(data) {
        const existing = await this.getLandingSettings();
        if (!existing) {
          const [created] = await db.insert(landingSettings).values({ id: 1, ...data, updatedAt: /* @__PURE__ */ new Date() }).returning();
          return created;
        }
        const [updated] = await db.update(landingSettings).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(landingSettings.id, 1)).returning();
        return updated;
      }
      async getPanelUserByEmail(email) {
        const [user] = await db.select().from(panelUsers).where(eq(panelUsers.email, email.toLowerCase()));
        return user;
      }
      async getPanelUserById(id) {
        const [user] = await db.select().from(panelUsers).where(eq(panelUsers.id, id));
        return user;
      }
      async createPanelUser(data) {
        const [user] = await db.insert(panelUsers).values({ ...data, email: data.email.toLowerCase() }).returning();
        return user;
      }
      async countPanelUsers() {
        const result = await db.select({ count: sql2`count(*)` }).from(panelUsers);
        return Number(result[0]?.count || 0);
      }
      async getAllPanelUsers() {
        return await db.select().from(panelUsers).orderBy(desc(panelUsers.createdAt));
      }
      async updatePanelUser(id, data) {
        const [user] = await db.update(panelUsers).set(data).where(eq(panelUsers.id, id)).returning();
        return user;
      }
      async deletePanelUser(id) {
        await db.delete(panelUsers).where(eq(panelUsers.id, id));
      }
      // ===== REPAIR SHEETS =====
      async getAllRepairSheets() {
        return await db.select().from(repairSheets).orderBy(desc(repairSheets.createdAt));
      }
      async getRepairSheet(id) {
        const [sheet] = await db.select().from(repairSheets).where(eq(repairSheets.id, id));
        return sheet;
      }
      async createRepairSheet(data) {
        const [sheet] = await db.insert(repairSheets).values(data).returning();
        return sheet;
      }
      async updateRepairSheet(id, data) {
        const [sheet] = await db.update(repairSheets).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(repairSheets.id, id)).returning();
        return sheet;
      }
      async deleteRepairSheet(id) {
        await db.delete(repairSheets).where(eq(repairSheets.id, id));
      }
      // ===== FREE REPORT LIMITING =====
      async countFreeReportsByIp(ip) {
        const result = await db.select({ count: sql2`count(*)` }).from(aiReports).where(and(eq(aiReports.ipAddress, ip), eq(aiReports.isFree, true)));
        return Number(result[0]?.count ?? 0);
      }
      async countFreeReportsByEmail(email) {
        const result = await db.select({ count: sql2`count(*)` }).from(aiReports).where(and(eq(aiReports.guestEmail, email.toLowerCase()), eq(aiReports.isFree, true)));
        return Number(result[0]?.count ?? 0);
      }
      async countFreeReportsByUser(userId) {
        const result = await db.select({ count: sql2`count(*)` }).from(aiReports).where(and(eq(aiReports.userId, userId), eq(aiReports.isFree, true)));
        return Number(result[0]?.count ?? 0);
      }
      // ===== SUBSCRIPTION PLANS =====
      async getSubscriptionPlans(activeOnly = false) {
        if (activeOnly) {
          return await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.isActive, true)).orderBy(subscriptionPlans.sortOrder, subscriptionPlans.createdAt);
        }
        return await db.select().from(subscriptionPlans).orderBy(subscriptionPlans.sortOrder, subscriptionPlans.createdAt);
      }
      async getSubscriptionPlan(id) {
        const [plan] = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, id));
        return plan;
      }
      async createSubscriptionPlan(data) {
        const [plan] = await db.insert(subscriptionPlans).values(data).returning();
        return plan;
      }
      async updateSubscriptionPlan(id, data) {
        const [plan] = await db.update(subscriptionPlans).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(subscriptionPlans.id, id)).returning();
        return plan;
      }
      async deleteSubscriptionPlan(id) {
        await db.delete(subscriptionPlans).where(eq(subscriptionPlans.id, id));
      }
      // ===== USER SUBSCRIPTIONS =====
      async getUserSubscriptions(userId) {
        return await db.select().from(userSubscriptions).where(eq(userSubscriptions.userId, userId)).orderBy(desc(userSubscriptions.createdAt));
      }
      async getActiveSubscription(userId) {
        const now = /* @__PURE__ */ new Date();
        const results = await db.select().from(userSubscriptions).where(and(
          eq(userSubscriptions.userId, userId),
          eq(userSubscriptions.status, "active")
        )).orderBy(desc(userSubscriptions.createdAt));
        return results.find((s) => {
          if (!s.currentPeriodEnd) return true;
          return s.currentPeriodEnd > now;
        });
      }
      async createUserSubscription(data) {
        const [sub] = await db.insert(userSubscriptions).values(data).returning();
        return sub;
      }
      async updateUserSubscription(id, data) {
        const [sub] = await db.update(userSubscriptions).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(userSubscriptions.id, id)).returning();
        return sub;
      }
      async getSubscriptionBySessionId(sessionId) {
        const [sub] = await db.select().from(userSubscriptions).where(eq(userSubscriptions.stripeSessionId, sessionId));
        return sub;
      }
      async getAllSubscriptions() {
        const subs = await db.select().from(userSubscriptions).orderBy(desc(userSubscriptions.createdAt));
        const planIds = [...new Set(subs.map((s) => s.planId).filter(Boolean))];
        const plans = planIds.length ? await db.select().from(subscriptionPlans).where(inArray(subscriptionPlans.id, planIds)) : [];
        const planMap = new Map(plans.map((p) => [p.id, p]));
        return subs.map((s) => ({ ...s, plan: s.planId ? planMap.get(s.planId) ?? null : null }));
      }
      async createSupportTicket(data) {
        const [ticket] = await db.insert(supportTickets).values(data).returning();
        return ticket;
      }
      async getSupportTicketsByUser(userId) {
        return await db.select().from(supportTickets).where(eq(supportTickets.userId, userId)).orderBy(desc(supportTickets.createdAt));
      }
      async getAllSupportTickets() {
        return await db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
      }
      async updateSupportTicket(id, data) {
        const [ticket] = await db.update(supportTickets).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(supportTickets.id, id)).returning();
        return ticket;
      }
    };
    storage = new DatabaseStorage();
  }
});

// server/localAuth.ts
var localAuth_exports = {};
__export(localAuth_exports, {
  getSession: () => getSession,
  hashPassword: () => hashPassword,
  isAdmin: () => isAdmin,
  isAuthenticated: () => isAuthenticated,
  isRootAdmin: () => isRootAdmin,
  isSuperAdmin: () => isSuperAdmin,
  setupAuth: () => setupAuth,
  signAccessToken: () => signAccessToken,
  signRefreshToken: () => signRefreshToken,
  verifyPassword: () => verifyPassword,
  verifyToken: () => verifyToken
});
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectPg from "connect-pg-simple";
function getJwtSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is required for JWT authentication");
  }
  return secret;
}
function signAccessToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_ACCESS_EXPIRY });
}
function signRefreshToken(payload) {
  return jwt.sign({ ...payload, type: "refresh" }, getJwtSecret(), { expiresIn: JWT_REFRESH_EXPIRY });
}
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    return { userId: decoded.userId, email: decoded.email, role: decoded.role };
  } catch {
    return null;
  }
}
async function authenticateFromBearer(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  const payload = verifyToken(token);
  if (!payload) return false;
  const user = await storage.getUser(payload.userId);
  if (!user) return false;
  req.user = { id: user.id, email: user.email, role: user.role };
  return true;
}
function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions"
  });
  return session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    name: "autoreport.sid",
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
      sameSite: "none",
      path: "/"
    }
  });
}
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
async function setupAuth(app3) {
  app3.set("trust proxy", 1);
  app3.use(getSession());
  app3.use(passport.initialize());
  app3.use(passport.session());
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "Email ou mot de passe incorrect" });
          }
          if (!user.password) {
            console.warn(`[Auth] User ${email} has no password set. Using fallback or requiring reset.`);
            return done(null, false, { message: "Compte non configur\xE9. Veuillez contacter l'administrateur ou r\xE9initialiser votre mot de passe." });
          }
          const isValid = await verifyPassword(password, user.password);
          if (!isValid) {
            return done(null, false, { message: "Email ou mot de passe incorrect" });
          }
          return done(null, { id: user.id, email: user.email, role: user.role });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      if (!user) {
        return done(null, false);
      }
      done(null, { id: user.id, email: user.email, role: user.role });
    } catch (error) {
      done(error);
    }
  });
  app3.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err2, user, info) => {
      if (err2) {
        console.error("Auth error:", err2);
        return res.status(500).json({ message: "Erreur serveur" });
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Authentification \xE9chou\xE9e" });
      }
      req.logIn(user, (err3) => {
        if (err3) {
          return res.status(500).json({ message: "Erreur de session" });
        }
        return res.json({ user });
      });
    })(req, res, next);
  });
  app3.post("/api/mobile/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis" });
      }
      const user = await storage.getUserByEmail(email);
      if (!user || !user.password) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }
      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }
      const payload = { userId: user.id, email: user.email, role: user.role };
      const accessToken = signAccessToken(payload);
      const refreshToken = signRefreshToken(payload);
      console.log(`[Mobile Login] Success for user: ${user.email} (ID: ${user.id})`);
      const { password: _, ...safeUser } = user;
      res.json({
        accessToken,
        refreshToken,
        tokenType: "Bearer",
        user: safeUser
      });
    } catch (error) {
      console.error("[Mobile Login] Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.post("/api/mobile/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis" });
      }
      const user = await storage.getUserByEmail(email);
      if (!user || !user.password) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }
      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }
      const payload = { userId: user.id, email: user.email, role: user.role };
      const accessToken = signAccessToken(payload);
      const refreshToken = signRefreshToken(payload);
      const { password: _, ...safeUser } = user;
      res.json({
        accessToken,
        refreshToken,
        tokenType: "Bearer",
        user: safeUser
      });
    } catch (error) {
      console.error("[Mobile Login Alias] Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.post("/api/mobile/refresh-token", async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token requis" });
      }
      const decoded = jwt.verify(refreshToken, getJwtSecret());
      if (!decoded || decoded.type !== "refresh") {
        return res.status(401).json({ message: "Token invalide" });
      }
      const user = await storage.getUser(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: "Utilisateur introuvable" });
      }
      const payload = { userId: user.id, email: user.email, role: user.role };
      const newAccessToken = signAccessToken(payload);
      const newRefreshToken = signRefreshToken(payload);
      res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
          profileImageUrl: user.profileImageUrl
        }
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expir\xE9, veuillez vous reconnecter" });
      }
      res.status(401).json({ message: "Token invalide" });
    }
  });
  app3.post("/api/register", async (req, res) => {
    try {
      const { email, password, firstName, lastName, role, companyName, siret, tvaNumber, companyAddress } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis" });
      }
      const allowedRoles = ["client", "client_professionnel"];
      const userRole = role && allowedRoles.includes(role) ? role : "client";
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Cet email est d\xE9j\xE0 utilis\xE9" });
      }
      const hashedPassword = await hashPassword(password);
      const userData = {
        email,
        password: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null,
        role: userRole
      };
      if (userRole === "client_professionnel") {
        userData.companyName = companyName || null;
        userData.siret = siret || null;
        userData.tvaNumber = tvaNumber || null;
        userData.companyAddress = companyAddress || null;
      }
      const newUser = await storage.createUser(userData);
      const payload = { userId: newUser.id, email: newUser.email, role: newUser.role };
      const accessToken = signAccessToken(payload);
      const refreshToken = signRefreshToken(payload);
      res.json({
        message: "Compte cr\xE9\xE9 avec succ\xE8s",
        userId: newUser.id,
        accessToken,
        refreshToken,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Erreur lors de la cr\xE9ation du compte" });
    }
  });
  app3.post("/api/logout", (req, res) => {
    req.logout((err2) => {
      if (err2) {
        return res.status(500).json({ message: "Erreur lors de la d\xE9connexion" });
      }
      req.session.destroy((err3) => {
        if (err3) {
          return res.status(500).json({ message: "Erreur de session" });
        }
        res.clearCookie("autoreport.sid");
        res.json({ message: "D\xE9connexion r\xE9ussie" });
      });
    });
  });
}
var SALT_ROUNDS, JWT_ACCESS_EXPIRY, JWT_REFRESH_EXPIRY, isAuthenticated, isAdmin, isSuperAdmin, isRootAdmin;
var init_localAuth = __esm({
  "server/localAuth.ts"() {
    "use strict";
    init_storage();
    SALT_ROUNDS = 10;
    JWT_ACCESS_EXPIRY = "7d";
    JWT_REFRESH_EXPIRY = "30d";
    isAuthenticated = async (req, res, next) => {
      if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
      }
      const authenticated = await authenticateFromBearer(req);
      if (authenticated) {
        return next();
      }
      return res.status(401).json({ message: "Non authentifi\xE9" });
    };
    isAdmin = async (req, res, next) => {
      if (!(req.isAuthenticated && req.isAuthenticated())) {
        const authenticated = await authenticateFromBearer(req);
        if (!authenticated) {
          return res.status(401).json({ message: "Non authentifi\xE9" });
        }
      }
      const user = req.user;
      if (!user || user.role !== "admin" && user.role !== "employe" && user.role !== "superadmin" && user.role !== "rootadmin") {
        return res.status(403).json({ message: "Acc\xE8s administrateur requis" });
      }
      next();
    };
    isSuperAdmin = async (req, res, next) => {
      if (!(req.isAuthenticated && req.isAuthenticated())) {
        const authenticated = await authenticateFromBearer(req);
        if (!authenticated) {
          return res.status(401).json({ message: "Non authentifi\xE9" });
        }
      }
      const user = req.user;
      if (!user || user.role !== "superadmin" && user.role !== "rootadmin") {
        return res.status(403).json({ message: "Acc\xE8s super-administrateur requis" });
      }
      next();
    };
    isRootAdmin = async (req, res, next) => {
      if (!(req.isAuthenticated && req.isAuthenticated())) {
        const authenticated = await authenticateFromBearer(req);
        if (!authenticated) {
          return res.status(401).json({ message: "Non authentifi\xE9" });
        }
      }
      const user = req.user;
      if (!user || user.role !== "rootadmin") {
        return res.status(403).json({ message: "Acc\xE8s Root Admin requis" });
      }
      next();
    };
  }
});

// server/emailService.ts
var emailService_exports = {};
__export(emailService_exports, {
  generateAiReportEmailHtml: () => generateAiReportEmailHtml,
  generateInvoiceEmailHtml: () => generateInvoiceEmailHtml,
  generateInvoicePDF: () => generateInvoicePDF,
  generateInvoicePaidEmailHtml: () => generateInvoicePaidEmailHtml,
  generateQuoteApprovedEmailHtml: () => generateQuoteApprovedEmailHtml,
  generateQuoteEmailHtml: () => generateQuoteEmailHtml,
  generateQuotePDF: () => generateQuotePDF,
  generateVoiceDictationEmailHtml: () => generateVoiceDictationEmailHtml2,
  getEmailFooter: () => getEmailFooter,
  getEmailHeader: () => getEmailHeader,
  sendAiReportEmail: () => sendAiReportEmail,
  sendEmail: () => sendEmail,
  sendReminderEmail: () => sendReminderEmail
});
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import fs from "fs";
import path2 from "path";
import { Resend } from "resend";
async function getResendCredentials() {
  try {
    if (process.env.RESEND_API_KEY) {
      return { apiKey: process.env.RESEND_API_KEY, fromEmail: process.env.RESEND_FROM_EMAIL || "AutoReport <contact@autoreport.mytoolsgroup.eu>" };
    }
    if (process.env.RESEND_API_KEY_BACKUP) {
      console.log("[Email] Using backup Resend API key");
      return { apiKey: process.env.RESEND_API_KEY_BACKUP, fromEmail: process.env.RESEND_FROM_EMAIL_BACKUP || "AutoReport <contact@autoreport.mytoolsgroup.eu>" };
    }
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY ? "repl " + process.env.REPL_IDENTITY : process.env.WEB_REPL_RENEWAL ? "depl " + process.env.WEB_REPL_RENEWAL : null;
    if (!xReplitToken || !hostname) return null;
    connectionSettings = await fetch(
      "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=resend",
      {
        headers: {
          "Accept": "application/json",
          "X_REPLIT_TOKEN": xReplitToken
        }
      }
    ).then((res) => res.json()).then((data) => data.items?.[0]);
    if (!connectionSettings || !connectionSettings.settings?.api_key) return null;
    return {
      apiKey: connectionSettings.settings.api_key,
      fromEmail: connectionSettings.settings.from_email || "AutoReport <contact@autoreport.mytoolsgroup.eu>"
    };
  } catch (err2) {
    console.error("[Email] Erreur credentials Resend:", err2);
    return null;
  }
}
async function getResendClient() {
  const creds = await getResendCredentials();
  if (!creds) return null;
  return { client: new Resend(creds.apiKey), fromEmail: creds.fromEmail };
}
function getLogoBase64() {
  try {
    const logoPath = path2.resolve(process.cwd(), "public/logo.png");
    if (fs.existsSync(logoPath)) {
      const bitmap = fs.readFileSync(logoPath);
      return `data:image/png;base64,${bitmap.toString("base64")}`;
    }
    return null;
  } catch (error) {
    console.error("Error reading logo file:", error);
    return null;
  }
}
function drawRoundedRect(doc, x, y, w, h, r, fillColor, strokeColor) {
  if (fillColor) doc.setFillColor(...fillColor);
  if (strokeColor) {
    doc.setDrawColor(...strokeColor);
    doc.setLineWidth(0.3);
  }
  doc.roundedRect(x, y, w, h, r, r, fillColor && strokeColor ? "FD" : fillColor ? "F" : "S");
}
function drawPremiumFooter(doc, companyInfo, margin) {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const footerHeight = 35;
  const footerTop = pageHeight - footerHeight;
  const contentWidth = pageWidth - margin * 2;
  const colWidth = contentWidth / 3;
  const col1X = margin;
  const col2X = margin + colWidth;
  const col3X = margin + colWidth * 2;
  const titleColor = [85, 85, 85];
  const textColor = [119, 119, 119];
  const lineColor = [229, 229, 229];
  const bgColor = [247, 247, 247];
  doc.setFillColor(...bgColor);
  doc.rect(0, footerTop, pageWidth, footerHeight, "F");
  doc.setDrawColor(...lineColor);
  doc.setLineWidth(0.3);
  doc.line(margin, footerTop, pageWidth - margin, footerTop);
  const titleY = footerTop + 7;
  const lineSpacing = 4;
  const textStartY = titleY + 5;
  doc.setFontSize(7).setFont("helvetica", "bold").setTextColor(...titleColor);
  doc.text("PAIEMENT", col1X, titleY);
  doc.setFontSize(6.5).setFont("helvetica", "normal").setTextColor(...textColor);
  doc.text("Carte bancaire \u2022 Esp\xE8ces \u2022 Virement", col1X, textStartY);
  doc.setFont("helvetica", "bold").setTextColor(...titleColor);
  doc.text("Paiement en ligne via Stripe / Klarna", col1X, textStartY + lineSpacing);
  doc.setDrawColor(...lineColor);
  doc.setLineWidth(0.2);
  doc.line(col2X - 3, footerTop + 3, col2X - 3, pageHeight - 4);
  doc.setFontSize(7).setFont("helvetica", "bold").setTextColor(...titleColor);
  doc.text("COORDONN\xC9ES BANCAIRES", col2X, titleY);
  doc.setFontSize(6.5).setFont("helvetica", "normal").setTextColor(...textColor);
  doc.text(companyInfo.bankName, col2X, textStartY);
  doc.text(`IBAN : ${companyInfo.iban}`, col2X, textStartY + lineSpacing);
  doc.text(`BIC : ${companyInfo.swift}`, col2X, textStartY + lineSpacing * 2);
  doc.line(col3X - 3, footerTop + 3, col3X - 3, pageHeight - 4);
  doc.setFontSize(7).setFont("helvetica", "bold").setTextColor(...titleColor);
  doc.text("INFORMATIONS L\xC9GALES", col3X, titleY);
  doc.setFontSize(6.5).setFont("helvetica", "normal").setTextColor(...textColor);
  doc.text(`SIRET : ${companyInfo.siret} \u2022 TVA : ${companyInfo.tva}`, col3X, textStartY);
  doc.text(`${companyInfo.address}, ${companyInfo.city}`, col3X, textStartY + lineSpacing);
  doc.text(`${companyInfo.phone} \u2022 ${companyInfo.website}`, col3X, textStartY + lineSpacing * 2);
}
function generateDocumentPDFCore(doc, data, companyInfo) {
  const pageWidth = doc.internal.pageSize.width;
  const margin = 15;
  try {
    const logoBase64 = getLogoBase64();
    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", margin, 12, 50, 50 / 1.414);
    }
  } catch (error) {
    doc.setFontSize(20).setFont("helvetica", "bold").setTextColor(...COLORS.primary).text(companyInfo.name, margin, 25);
  }
  doc.setFontSize(14).setFont("helvetica", "bold").setTextColor(...COLORS.dark).text(data.reference, pageWidth - margin, 22, { align: "right" });
  doc.setFontSize(10).setFont("helvetica", "normal").text(`Date : ${data.date}`, pageWidth - margin, 28, { align: "right" });
  if (data.secondaryDate) {
    doc.text(`${data.secondaryDateLabel || "Validit\xE9"} : ${data.secondaryDate}`, pageWidth - margin, 34, { align: "right" });
  }
  const infoStartY = 45;
  const infoBoxWidth = (pageWidth - margin * 2 - 10) / 2;
  doc.setFontSize(9).setTextColor(...COLORS.gray).text("AUTOREPORT", margin, infoStartY + 17);
  doc.text([companyInfo.address, companyInfo.city, companyInfo.phone, companyInfo.email, companyInfo.website], margin, infoStartY + 24);
  const destX = pageWidth - margin - infoBoxWidth;
  const clientName = data.clientName || "Client";
  doc.setFontSize(11).setTextColor(...COLORS.dark).text(clientName, destX, infoStartY + 17);
  if (data.clientDetails && data.clientDetails.length > 0) {
    doc.setFontSize(9).setTextColor(...COLORS.gray).text(data.clientDetails.slice(0, 5), destX, infoStartY + 24);
  }
  const tableData = data.items.map((item, index2) => [
    index2 + 1,
    item.description,
    item.quantity.toFixed(2).replace(".", ","),
    `${item.unitPrice} \u20AC`,
    `${parseFloat(item.taxRate || "20").toFixed(0)} %`,
    `${item.total} \u20AC`
  ]);
  autoTable(doc, {
    startY: infoStartY + 55,
    head: [["No.", "Description", "Qt\xE9", "Prix unit. HT", "TVA", "Montant"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: COLORS.primary,
      textColor: COLORS.white,
      fontStyle: "bold",
      fontSize: 8,
      cellPadding: 3,
      halign: "center",
      valign: "middle",
      lineColor: COLORS.primary,
      lineWidth: 0.1
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 3,
      textColor: COLORS.dark,
      lineColor: COLORS.border,
      lineWidth: 0.1
    },
    alternateRowStyles: {
      fillColor: COLORS.lightGray
    },
    columnStyles: {
      0: { cellWidth: 8, halign: "center" },
      1: { cellWidth: "auto", halign: "left" },
      2: { cellWidth: 15, halign: "center" },
      3: { cellWidth: 25, halign: "right" },
      4: { cellWidth: 18, halign: "center" },
      5: { cellWidth: 25, halign: "right" }
    },
    tableLineColor: COLORS.border,
    tableLineWidth: 0.5
  });
  const finalY = doc.lastAutoTable.finalY + 10;
  const totalsBoxWidth = 90;
  const totalsBoxX = pageWidth - margin - totalsBoxWidth;
  const totalsX = pageWidth - margin;
  const totalHT = data.totalHT;
  const totalTTC = data.totalTTC;
  const totalVAT = totalTTC - totalHT;
  doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(...COLORS.dark);
  doc.text("Total HT", totalsBoxX, finalY);
  doc.text(`${totalHT.toFixed(2)} \u20AC`, totalsX, finalY, { align: "right" });
  doc.setDrawColor(...COLORS.border);
  doc.line(totalsBoxX, finalY + 3, totalsX, finalY + 3);
  doc.text("TVA", totalsBoxX, finalY + 10);
  doc.text(`${totalVAT.toFixed(2)} \u20AC`, totalsX, finalY + 10, { align: "right" });
  doc.line(totalsBoxX, finalY + 13, totalsX, finalY + 13);
  drawRoundedRect(doc, totalsBoxX - 5, finalY + 16, totalsBoxWidth + 5, 14, 3, COLORS.primary);
  doc.setFontSize(11).setFont("helvetica", "bold").setTextColor(...COLORS.white);
  const totalTtcY = finalY + 25;
  doc.text("Total TTC", totalsBoxX + 2, totalTtcY);
  doc.text(`${totalTTC.toFixed(2)} \u20AC`, totalsX - 2, totalTtcY, { align: "right" });
  doc.setTextColor(0, 0, 0);
  if (data.showSignature) {
    const signatureY = finalY + 45;
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...COLORS.dark);
    doc.text("Date et signature du client", margin, signatureY);
    doc.text("(Pr\xE9c\xE9d\xE9e de la mention 'Bon pour accord')", margin, signatureY + 5);
  }
  drawPremiumFooter(doc, companyInfo, margin);
}
function generateQuotePDF(data) {
  const doc = new jsPDF();
  let totalTTC = 0;
  let totalHT = 0;
  if (data.totalHT && data.amount) {
    totalTTC = parseFloat(data.amount.replace(/[^\d.,-]/g, "").replace(",", "."));
    totalHT = parseFloat(data.totalHT.replace(/[^\d.,-]/g, "").replace(",", "."));
  } else {
    totalTTC = parseFloat(data.amount.replace(/[^\d.,-]/g, "").replace(",", "."));
    totalHT = totalTTC / 1.2;
  }
  generateDocumentPDFCore(doc, {
    reference: data.quoteNumber,
    date: data.quoteDate,
    secondaryDate: data.expiryDate,
    secondaryDateLabel: "Validit\xE9",
    clientName: data.clientName,
    clientDetails: data.clientDetails,
    items: data.items,
    totalHT,
    totalTTC,
    showSignature: true
  }, COMPANY_INFO);
  return Buffer.from(doc.output("arraybuffer"));
}
function generateInvoicePDF(data) {
  const doc = new jsPDF();
  const totalTTC = parseFloat(data.amount.replace(/[^\d.,-]/g, "").replace(",", ".")) || 0;
  const totalHT = totalTTC / 1.2;
  generateDocumentPDFCore(doc, {
    reference: data.invoiceNumber,
    date: data.invoiceDate,
    secondaryDate: data.dueDate,
    secondaryDateLabel: "\xC9ch\xE9ance",
    clientName: data.clientName,
    clientDetails: data.clientDetails,
    items: data.items,
    totalHT,
    totalTTC,
    showSignature: false
  }, COMPANY_INFO);
  return Buffer.from(doc.output("arraybuffer"));
}
async function getLogoBuffer() {
  try {
    const logoPath = path2.resolve(process.cwd(), "public/logo.png");
    if (fs.existsSync(logoPath)) {
      return fs.readFileSync(logoPath);
    }
    return null;
  } catch (error) {
    console.error("Error reading logo file for buffer:", error);
    return null;
  }
}
async function sendEmail(toOrOptions, subjectArg, htmlArg, attachmentsArg, replyToArg) {
  let to;
  let subject;
  let html;
  let attachments;
  let replyTo;
  let cc;
  if (typeof toOrOptions === "object") {
    to = toOrOptions.to;
    subject = toOrOptions.subject;
    html = toOrOptions.html;
    attachments = toOrOptions.attachments;
    replyTo = toOrOptions.replyTo;
    cc = toOrOptions.cc;
  } else {
    to = toOrOptions;
    subject = subjectArg;
    html = htmlArg;
    attachments = attachmentsArg;
    replyTo = replyToArg;
  }
  const resendResult = await getResendClient();
  if (!resendResult) {
    console.log(`[Email Mock] Sending to ${to}: ${subject}`);
    return { success: true };
  }
  try {
    const { client, fromEmail } = resendResult;
    const emailOptions = {
      from: fromEmail,
      to,
      bcc: ["contact@autoreport.com", "r.belmahi@gmail.com", "rbelmahi90@gmail.com"],
      subject,
      html
    };
    if (cc) {
      emailOptions.cc = cc;
    }
    const finalAttachments = attachments ? [...attachments] : [];
    if (html.includes("cid:logo")) {
      const logoBuffer = await getLogoBuffer();
      if (logoBuffer) {
        finalAttachments.push({
          filename: "logo.png",
          content: logoBuffer.toString("base64"),
          contentId: "logo"
        });
      }
    }
    if (finalAttachments.length > 0) {
      emailOptions.attachments = finalAttachments.map((a) => {
        const att = { filename: a.filename };
        if (a.contentId) {
          att.content = typeof a.content === "string" ? a.content : Buffer.isBuffer(a.content) ? a.content.toString("base64") : a.content;
          att.content_id = a.contentId;
        } else {
          att.content = Buffer.isBuffer(a.content) ? a.content : a.content;
        }
        return att;
      });
    }
    if (replyTo) {
      emailOptions.reply_to = replyTo;
    }
    const result = await client.emails.send(emailOptions);
    if (result?.error) {
      throw new Error(result.error.message || "Resend error");
    }
    console.log(`[Email] Sent to ${to}: ${subject}`);
    return { success: true, messageId: result?.id || result?.data?.id };
  } catch (error) {
    if (process.env.RESEND_API_KEY_BACKUP) {
      console.warn(`[Email Backup] Primary failed for ${to}, trying backup...`, error.message);
      try {
        const backupClient = new Resend(process.env.RESEND_API_KEY_BACKUP);
        const backupFrom = process.env.RESEND_FROM_EMAIL_BACKUP || "AutoReport <contact@autoreport.mytoolsgroup.eu>";
        const emailOptions = {
          from: backupFrom,
          to,
          bcc: ["contact@autoreport.com", "r.belmahi@gmail.com", "rbelmahi90@gmail.com"],
          subject,
          html
        };
        const result = await backupClient.emails.send(emailOptions);
        if (result?.error) {
          throw new Error(result.error.message || "Backup Resend error");
        }
        console.log(`[Email Backup] Sent successfully to ${to} using backup key`);
        return { success: true, messageId: result?.id || result?.data?.id };
      } catch (backupError) {
        console.error(`[Email Backup Error] Backup also failed for ${to}:`, backupError.message);
        return { success: false, error: backupError.message || "Erreur d'envoi (Principal + Backup)" };
      }
    }
    console.error(`[Email Error] Failed to send to ${to}:`, error);
    return { success: false, error: error.message || "Erreur d'envoi" };
  }
}
function getEmailHeader(companyName = "AutoReport") {
  return `
    <div style="text-align: center; margin-bottom: 30px; padding: 25px; background-color: #ffffff; border-radius: 12px; border: 1px solid #eeeeee;">
      <center>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
          <tr>
            <td align="center" style="background-color: #ffffff; padding: 10px;">
              <img src="cid:logo" alt="AutoReport" width="220" style="width: 220px; max-width: 100%; height: auto; display: block; border: 0;">
            </td>
          </tr>
        </table>
      </center>
    </div>
  `;
}
function getEmailFooter(companyName = "AutoReport") {
  return `
    <div style="background-color: #ffffff; border-top: 2px solid #f0f0f0; margin-top: 40px; padding: 30px 20px; border-radius: 0 0 12px 12px;">
      <div style="text-align: center; font-size: 11px; color: #666666; line-height: 1.8;">
        <p style="margin: 0 0 15px 0; color: #444444; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
          Paiement : Carte bancaire \u2022 Esp\xE8ces \u2022 Virement \u2022 Stripe \u2022 Klarna \u2022 Alma
        </p>
        <p style="margin: 0 0 15px 0;">
          <span style="color: #444444; font-weight: bold;">BANQUE :</span> SG WATTIGNIES \u2022 IBAN : FR76...6525 \u2022 BIC : SOGEFRPP
        </p>
        <p style="margin: 0 0 15px 0;">
          <span style="color: #444444; font-weight: bold;">L\xC9GAL :</span> SIRET : 913 678 199 00021 \u2022 TVA : FR73 913 678 199
        </p>
        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
          <p style="margin: 0; font-size: 13px; font-weight: bold; color: #111111;">L'EXPERT DE LA JANTE ALU \u2014 ${companyName}</p>
          <p style="margin: 8px 0 0 0; font-size: 11px; color: #888888;">
            46 rue de la Convention, 62800 Li\xE9vin \u2022 03 21 40 80 53 \u2022 www.autoreport.fr
          </p>
        </div>
      </div>
    </div>
  `;
}
function generateQuoteApprovedEmailHtml(data) {
  return `
    <div style="background-color: #f4f4f5; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <div style="padding: 30px;">
          ${getEmailHeader(data.companyName)}
          <div style="text-align: center; margin-top: 20px;">
            <h2 style="color: #dc2626; font-size: 24px; margin-bottom: 15px;">Devis Approuv\xE9</h2>
            <p style="font-size: 16px; color: #4b5563;">Bonjour <strong>${data.clientName}</strong>,</p>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">Nous vous confirmons la validation de votre devis <strong>${data.reference || data.quoteNumber}</strong>.</p>
            <div style="background-color: #fef2f2; border: 1px solid #fee2e2; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <span style="display: block; font-size: 14px; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px;">Montant valid\xE9</span>
              <span style="display: block; font-size: 28px; font-weight: bold; color: #dc2626; margin-top: 5px;">${data.quoteAmount}</span>
            </div>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">Notre \xE9quipe va vous contacter prochainement pour organiser votre prestation.</p>
            <div style="margin: 35px 0;">
              <a href="${data.quoteUrl}" style="background-color: #dc2626; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">Consulter les d\xE9tails</a>
            </div>
          </div>
        </div>
        ${getEmailFooter(data.companyName)}
      </div>
    </div>
  `;
}
function generateInvoiceEmailHtml(data) {
  const payUrl = data.paymentLink || data.invoiceUrl || "#";
  const formatAmount = (val) => {
    if (!val) return "";
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    return num.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
  };
  const itemsHtml = data.items && data.items.length > 0 ? `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
      <thead>
        <tr style="background-color: #dc2626; color: white;">
          <th style="padding: 8px 10px; text-align: left;">Description</th>
          <th style="padding: 8px 10px; text-align: center;">Qt\xE9</th>
          <th style="padding: 8px 10px; text-align: right;">Prix unit.</th>
          <th style="padding: 8px 10px; text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${data.items.map((item, i) => `
          <tr style="background-color: ${i % 2 === 0 ? "#ffffff" : "#f9fafb"}; border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 10px;">${item.description}</td>
            <td style="padding: 8px 10px; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px 10px; text-align: right;">${formatAmount(item.unitPrice)}</td>
            <td style="padding: 8px 10px; text-align: right;">${formatAmount(item.total)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    ${data.totalHT ? `
      <div style="text-align: right; font-size: 13px; color: #4b5563; margin-bottom: 5px;">Total HT : ${formatAmount(data.totalHT)}</div>
    ` : ""}
    ${data.taxAmount ? `
      <div style="text-align: right; font-size: 13px; color: #4b5563; margin-bottom: 5px;">TVA : ${formatAmount(data.taxAmount)}</div>
    ` : ""}
  ` : "";
  return `
    <div style="background-color: #f4f4f5; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <div style="padding: 30px;">
          ${getEmailHeader(data.companyName)}
          <div style="text-align: center; margin-top: 20px;">
            <h2 style="color: #dc2626; font-size: 24px; margin-bottom: 15px;">Votre Facture</h2>
            <p style="font-size: 16px; color: #4b5563;">Bonjour <strong>${data.clientName}</strong>,</p>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">La facture <strong>${data.invoiceNumber}</strong> est disponible pour votre intervention.</p>
            ${data.invoiceDate ? `<p style="font-size: 13px; color: #6b7280;">Date : ${data.invoiceDate}${data.dueDate ? ` \u2014 \xC9ch\xE9ance : ${data.dueDate}` : ""}</p>` : ""}
            ${itemsHtml}
            <div style="background-color: #fef2f2; border: 1px solid #fee2e2; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <span style="display: block; font-size: 14px; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px;">Montant TTC \xE0 r\xE9gler</span>
              <span style="display: block; font-size: 28px; font-weight: bold; color: #dc2626; margin-top: 5px;">${formatAmount(data.amount)}</span>
            </div>
            <div style="margin: 35px 0;">
              <a href="${payUrl}" style="background-color: #dc2626; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">R\xE9gler ma facture</a>
            </div>
            <p style="font-size: 14px; color: #6b7280;">Paiement s\xE9curis\xE9 par carte bancaire, Klarna ou Alma (3x/4x).</p>
          </div>
        </div>
        ${getEmailFooter(data.companyName)}
      </div>
    </div>
  `;
}
function generateInvoicePaidEmailHtml(data) {
  const googleReviewLink = "https://share.google/O0VCgqh0z1Ab4qUF9";
  return `
    <div style="background-color: #f4f4f5; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <div style="padding: 30px;">
          ${getEmailHeader(data.companyName)}
          <div style="text-align: center; margin-top: 20px;">
            <div style="width: 60px; height: 60px; background-color: #d1fae5; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <span style="color: #059669; font-size: 30px;">\u2713</span>
            </div>
            <h2 style="color: #059669; font-size: 24px; margin-bottom: 15px;">Merci pour votre paiement</h2>
            <p style="font-size: 16px; color: #4b5563;">Bonjour <strong>${data.clientName}</strong>,</p>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">Nous confirmons la r\xE9ception de votre r\xE8glement de <strong>${data.amount} \u20AC</strong> pour la facture <strong>${data.invoiceNumber}</strong>${data.paymentDate ? ` du ${data.paymentDate}` : ""}.</p>
            
            <div style="margin-top: 40px; padding: 30px; border: 2px dashed #e5e7eb; border-radius: 12px; background-color: #fafafa;">
              <h3 style="margin-top: 0; color: #111827; font-size: 18px;">Votre avis compte \xE9norm\xE9ment !</h3>
              <p style="color: #6b7280; font-size: 15px; line-height: 1.5; margin-bottom: 20px;">Satisfait de notre prestation ? Votre retour nous aide \xE0 nous am\xE9liorer et aide d'autres clients \xE0 nous d\xE9couvrir.</p>
              
              ${data.reviewUrl ? `
              <div style="margin-bottom: 16px;">
                <a href="${data.reviewUrl}" style="background-color: #dc2626; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block; width: 80%; box-sizing: border-box;">
                  \u2605 Laisser mon avis AUTOREPORT
                </a>
                <p style="color: #9ca3af; font-size: 12px; margin-top: 8px;">Votre avis personnalis\xE9 sur notre plateforme</p>
              </div>
              ` : ""}

              <div>
                <a href="${googleReviewLink}" style="background-color: #ffffff; color: #111827; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block; border: 2px solid #e5e7eb; width: 80%; box-sizing: border-box;">
                  <span style="color: #4285F4;">G</span><span style="color: #EA4335;">o</span><span style="color: #FBBC05;">o</span><span style="color: #4285F4;">g</span><span style="color: #34A853;">l</span><span style="color: #EA4335;">e</span> \u2014 Partager sur Google
                </a>
                <p style="color: #9ca3af; font-size: 12px; margin-top: 8px;">Aidez d'autres clients \xE0 nous trouver</p>
              </div>
            </div>
          </div>
        </div>
        ${getEmailFooter(data.companyName)}
      </div>
    </div>
  `;
}
function generateQuoteEmailHtml(data) {
  return `
    <div style="background-color: #f4f4f5; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <div style="padding: 30px;">
          ${getEmailHeader(data.companyName)}
          <div style="text-align: center; margin-top: 20px;">
            <h2 style="color: #dc2626; font-size: 24px; margin-bottom: 15px;">Votre Devis Personnalis\xE9</h2>
            <p style="font-size: 16px; color: #4b5563;">Bonjour <strong>${data.clientName}</strong>,</p>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">Nous avons le plaisir de vous transmettre le devis <strong>${data.quoteNumber}</strong> relatif \xE0 votre demande.</p>
            <div style="background-color: #fef2f2; border: 1px solid #fee2e2; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <span style="display: block; font-size: 14px; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px;">Estimation totale</span>
              <span style="display: block; font-size: 28px; font-weight: bold; color: #dc2626; margin-top: 5px;">${data.quoteAmount}</span>
            </div>
            <div style="margin: 35px 0;">
              <a href="${data.quoteUrl}" style="background-color: #dc2626; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">Voir et signer le devis</a>
            </div>
            <p style="font-size: 14px; color: #6b7280;">Vous pouvez valider ce devis directement en ligne.</p>
          </div>
        </div>
        ${getEmailFooter(data.companyName)}
      </div>
    </div>
  `;
}
function generateVoiceDictationEmailHtml2(data) {
  return `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      ${getEmailHeader(data.companyName)}
      <h2 style="color: #dc2626; margin-bottom: 20px;">Compte-rendu d'intervention (Dict\xE9e vocale)</h2>
      <p><strong>Technicien :</strong> ${data.technicianName}</p>
      <p><strong>Date :</strong> ${data.date}</p>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #dc2626;">
        <p style="white-space: pre-wrap; margin: 0;">${data.content}</p>
      </div>
      ${getEmailFooter(data.companyName)}
    </div>
  `;
}
function generateAiReportEmailHtml(data) {
  const company = data.companyName || "AutoReport";
  const vehicleLabel = `${data.make} ${data.model} (${data.year})${data.mileage ? ` \u2014 ${Number(data.mileage).toLocaleString("fr-FR")} km` : ""}`;
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:30px 10px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;max-width:600px;">
        <tr>
          <td style="background-color:#0a0a12;padding:24px 30px;text-align:center;border-bottom:3px solid #CE1126;">
            <p style="margin:0;color:#CE1126;font-size:18px;font-weight:bold;letter-spacing:1px;">${company}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:30px;">
            <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">Bonjour,</p>
            <p style="margin:0 0 12px;font-size:15px;color:#374151;line-height:1.7;">L'\xE9quipe AutoReport a le plaisir de vous informer que votre rapport est pr\xEAt.</p>
            <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">Vous trouverez en pi\xE8ce jointe l'analyse compl\xE8te du v\xE9hicule que vous souhaitez acqu\xE9rir.</p>
            <p style="margin:0 0 8px;font-size:15px;color:#374151;line-height:1.7;">Ce rapport contient :</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr><td style="padding:3px 0 3px 16px;font-size:14px;color:#374151;line-height:1.7;">\u2022 les faiblesses connues du mod\xE8le</td></tr>
              <tr><td style="padding:3px 0 3px 16px;font-size:14px;color:#374151;line-height:1.7;">\u2022 les points essentiels \xE0 v\xE9rifier avant achat</td></tr>
              <tr><td style="padding:3px 0 3px 16px;font-size:14px;color:#374151;line-height:1.7;">\u2022 des conseils pratiques pour \xE9viter les mauvaises surprises</td></tr>
            </table>
            <p style="margin:0 0 12px;font-size:15px;color:#374151;line-height:1.7;">Nous vous recommandons de le consulter avant votre visite et de l'utiliser comme checklist sur place.</p>
            <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">Si vous analysez plusieurs v\xE9hicules, vous pouvez g\xE9n\xE9rer d'autres rapports directement depuis le site.</p>
            <p style="margin:0 0 8px;font-size:15px;color:#374151;line-height:1.7;">Bonne lecture et bon achat \u{1F697}</p>
            <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">L'\xE9quipe AutoReport</p>
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
              Ce message a \xE9t\xE9 envoy\xE9 automatiquement par ${company}.<br>
              <a href="https://autoreport.fr" style="color:#CE1126;text-decoration:none;">autoreport.fr</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#f9fafb;padding:16px 30px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;color:#9ca3af;">\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} ${company}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
async function sendAiReportEmail(to, data) {
  const subject = `AutoReport : Votre rapport v\xE9hicule est pr\xEAt`;
  const html = generateAiReportEmailHtml(data);
  await sendEmail(to, subject, html);
}
async function sendReminderEmail(to, clientName, subject, body2) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      ${getEmailHeader()}
      <div style="padding: 20px;">
        <h2 style="color: #333; margin-bottom: 15px;">${subject}</h2>
        <p>Bonjour ${clientName},</p>
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <p style="white-space: pre-wrap; margin: 0;">${body2}</p>
        </div>
      </div>
      ${getEmailFooter(COMPANY_INFO.name)}
    </div>
  `;
  return sendEmail(to, subject, html);
}
var connectionSettings, COLORS, COMPANY_INFO;
var init_emailService = __esm({
  "server/emailService.ts"() {
    "use strict";
    COLORS = {
      primary: [220, 38, 38],
      primaryLight: [254, 242, 242],
      dark: [31, 41, 55],
      gray: [107, 114, 128],
      lightGray: [243, 244, 246],
      white: [255, 255, 255],
      border: [229, 231, 235]
    };
    COMPANY_INFO = {
      name: "AutoReport",
      tagline: "L'EXPERT DE LA JANTE ALU",
      address: "46 rue de la Convention",
      city: "62800 Li\xE9vin",
      phone: "03 21 40 80 53",
      email: "contact@autoreport.com",
      website: "www.autoreport.fr",
      bankName: "SG WATTIGNIES (02958)",
      iban: "FR76 3000 3029 5800 0201 6936 525",
      swift: "SOGEFRPP",
      siret: "913 678 199 00021",
      tva: "FR73 913 678 199"
    };
  }
});

// server/smsService.ts
var smsService_exports = {};
__export(smsService_exports, {
  formatPhoneE164: () => formatPhoneE164,
  getSmsLogs: () => getSmsLogs,
  getSmsStats: () => getSmsStats,
  isFrenchMobile: () => isFrenchMobile,
  sendEventSms: () => sendEventSms,
  sendSms: () => sendSms
});
import twilio from "twilio";
import { desc as desc2 } from "drizzle-orm";
function getProvider() {
  const env = (process.env.SMS_PROVIDER || "twilio").toLowerCase();
  if (env === "twilio" || env === "textbelt" || env === "gatewayapi" || env === "relationcity" || env === "log") return env;
  return "twilio";
}
async function sendViaRelationCity(to, body2) {
  const apiKey = process.env.RELATIONCITY_API_KEY;
  if (!apiKey) {
    return { error: "RELATIONCITY_API_KEY non configur\xE9" };
  }
  const msisdn = to.replace(/\+/g, "");
  try {
    const response = await fetch("https://gatewayapi.com/rest/mtsms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        recipients: [{ msisdn: parseInt(msisdn, 10) }],
        message: body2
      })
    });
    const result = await response.json();
    console.log(`[SMS:RelationCity] Response:`, JSON.stringify(result));
    if (!response.ok) {
      const altResponse = await fetch("https://app.relationcity.io/api/v1/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          recipient: msisdn,
          message: body2
        })
      });
      const altResult = await altResponse.json();
      console.log(`[SMS:RelationCity] Alt Response:`, JSON.stringify(altResult));
      if (!altResponse.ok) {
        return { error: altResult.message || `RelationCity erreur HTTP ${altResponse.status}` };
      }
      return { sid: altResult.id || "relationcity-ok" };
    }
    return { sid: result.ids?.[0]?.toString() || "relationcity-ok" };
  } catch (error) {
    return { error: error.message };
  }
}
async function sendViaTwilio(to, body2) {
  const accountSid = "ACb2da59904227550d8a4f319d9cd25102";
  const authToken = "8e94bdeda306211c8080d555523bea44";
  const fromNumber = "+16084707669";
  console.log(`[Twilio] Attempting to send SMS to ${to}. Using verified credentials from screenshots.`);
  try {
    const client = twilio(accountSid, authToken);
    const message = await client.messages.create({ body: body2, from: fromNumber, to });
    console.log(`[Twilio] Success! SID: ${message.sid}`);
    return { sid: message.sid };
  } catch (error) {
    console.error(`[Twilio] Error detail:`, error);
    return { error: error.message };
  }
}
async function sendViaTextBelt(to, body2) {
  const apiKey = process.env.TEXTBELT_API_KEY || "textbelt";
  const response = await fetch("https://textbelt.com/text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: to,
      message: body2,
      key: apiKey
    })
  });
  const result = await response.json();
  console.log(`[SMS:TextBelt] Response:`, JSON.stringify(result));
  if (!result.success) {
    return { error: result.error || "TextBelt send failed" };
  }
  return { sid: result.textId || "textbelt-ok" };
}
async function sendViaGatewayAPI(to, body2) {
  const apiToken = process.env.GATEWAYAPI_TOKEN;
  if (!apiToken) {
    return { error: "GATEWAYAPI_TOKEN non configur\xE9" };
  }
  const sender = process.env.GATEWAYAPI_SENDER || "AutoReport";
  const msisdn = to.replace(/\+/g, "");
  const response = await fetch("https://gatewayapi.com/rest/mtsms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${apiToken}`
    },
    body: JSON.stringify({
      recipients: [{ msisdn: parseInt(msisdn, 10) }],
      message: body2,
      sender
    })
  });
  const result = await response.json();
  console.log(`[SMS:GatewayAPI] Response:`, JSON.stringify(result));
  if (!response.ok || result.code) {
    return { error: result.message || `GatewayAPI erreur HTTP ${response.status}` };
  }
  const messageId = result.ids?.[0]?.toString() || "gatewayapi-ok";
  return { sid: messageId };
}
function sendViaLog(to, body2) {
  console.log(`[SMS:Log] \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550`);
  console.log(`[SMS:Log] To: ${to}`);
  console.log(`[SMS:Log] Message:`);
  body2.split("\n").forEach((line) => console.log(`[SMS:Log]   ${line}`));
  console.log(`[SMS:Log] \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550`);
  return { sid: "log-" + Date.now() };
}
function isFrenchMobile(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s.\-()]/g, "");
  if (/^(?:\+33|0033)[67]\d{8}$/.test(cleaned)) return true;
  if (/^0[67]\d{8}$/.test(cleaned)) return true;
  return false;
}
function formatPhoneE164(phone) {
  const cleaned = phone.replace(/[\s.\-()]/g, "");
  if (cleaned.startsWith("+33")) return cleaned;
  if (cleaned.startsWith("0033")) return "+33" + cleaned.slice(4);
  if (cleaned.startsWith("0")) return "+33" + cleaned.slice(1);
  return cleaned;
}
function buildSmsBody(options) {
  const parts = [];
  switch (options.eventType) {
    case "quote_sent":
      parts.push(`AUTOREPORT : Nouveau devis ${options.eventTitle}.`);
      parts.push(`Montant : ${options.eventDetails}`);
      break;
    case "quote_approved":
      parts.push(`AUTOREPORT : Votre devis ${options.eventTitle} a \xE9t\xE9 approuv\xE9 !`);
      break;
    case "invoice_sent":
      parts.push(`AUTOREPORT : Votre facture ${options.eventTitle} est disponible.`);
      parts.push(`Montant \xE0 r\xE9gler : ${options.eventDetails}`);
      break;
    case "invoice_paid":
      parts.push(`AUTOREPORT : Merci ! Votre paiement pour la facture ${options.eventTitle} a \xE9t\xE9 re\xE7u.`);
      break;
    case "reservation_confirmed":
      parts.push(`AUTOREPORT : Votre rendez-vous pour ${options.eventTitle} est confirm\xE9.`);
      parts.push(`D\xE9tails : ${options.eventDetails}`);
      break;
    case "reservation_reminder":
      parts.push(`RAPPEL AUTOREPORT : Votre rendez-vous est pr\xE9vu pour ${options.eventDetails}.`);
      break;
    case "review_request":
      parts.push(`AUTOREPORT : Votre avis nous int\xE9resse ! Comment s'est pass\xE9e votre prestation ${options.eventTitle} ?`);
      break;
    default:
      parts.push(`AUTOREPORT : ${options.eventTitle}`);
      if (options.eventDetails) parts.push(options.eventDetails);
  }
  if (options.eventUrl) {
    parts.push(`Lien : ${options.eventUrl}`);
  }
  return parts.join("\n");
}
async function sendSms(options) {
  if (process.env.SMS_DISABLED === "true") {
    console.log(`[SMS] D\xE9sactiv\xE9 globalement (SMS_DISABLED=true) - message non envoy\xE9 \xE0 ${options.to}`);
    return { success: false, error: "SMS d\xE9sactiv\xE9s" };
  }
  const provider = getProvider();
  const toE164 = formatPhoneE164(options.to);
  const body2 = buildSmsBody(options);
  if (!isFrenchMobile(options.to)) {
    console.log(`[SMS] Skipped: ${options.to} is not a valid French mobile number`);
    await logSms({
      recipientPhone: toE164,
      recipientName: options.recipientName,
      recipientEmail: options.recipientEmail,
      eventType: options.eventType,
      eventTitle: options.eventTitle,
      eventDetails: options.eventDetails,
      messageBody: body2,
      provider,
      status: "skipped",
      errorMessage: "Num\xE9ro non mobile fran\xE7ais"
    });
    return { success: false, error: "Num\xE9ro non mobile" };
  }
  try {
    let result;
    switch (provider) {
      case "twilio":
        console.log(`[SMS:Twilio] Sending to ${toE164}`);
        result = await sendViaTwilio(toE164, body2);
        break;
      case "textbelt":
        console.log(`[SMS:TextBelt] Sending to ${toE164}`);
        result = await sendViaTextBelt(toE164, body2);
        break;
      case "gatewayapi":
        console.log(`[SMS:GatewayAPI] Sending to ${toE164}`);
        result = await sendViaGatewayAPI(toE164, body2);
        break;
      case "relationcity":
        console.log(`[SMS:RelationCity] Sending to ${toE164}`);
        result = await sendViaRelationCity(toE164, body2);
        break;
      case "log":
      default:
        result = sendViaLog(toE164, body2);
        break;
    }
    if (result.error) {
      await logSms({
        recipientPhone: toE164,
        recipientName: options.recipientName,
        recipientEmail: options.recipientEmail,
        eventType: options.eventType,
        eventTitle: options.eventTitle,
        eventDetails: options.eventDetails,
        messageBody: body2,
        provider,
        status: "failed",
        externalId: result.sid,
        errorMessage: result.error
      });
      console.error(`[SMS] Error (${provider}) to ${toE164}:`, result.error);
      return { success: false, error: result.error };
    }
    await logSms({
      recipientPhone: toE164,
      recipientName: options.recipientName,
      recipientEmail: options.recipientEmail,
      eventType: options.eventType,
      eventTitle: options.eventTitle,
      eventDetails: options.eventDetails,
      messageBody: body2,
      provider,
      status: "sent",
      externalId: result.sid
    });
    console.log(`[SMS] Sent via ${provider} to ${toE164}: ${options.eventType} (ID: ${result.sid})`);
    return { success: true, sid: result.sid };
  } catch (error) {
    await logSms({
      recipientPhone: toE164,
      recipientName: options.recipientName,
      recipientEmail: options.recipientEmail,
      eventType: options.eventType,
      eventTitle: options.eventTitle,
      eventDetails: options.eventDetails,
      messageBody: body2,
      provider,
      status: "error",
      errorMessage: error.message
    });
    console.error(`[SMS] Error (${provider}) to ${options.to}:`, error.message);
    return { success: false, error: error.message };
  }
}
async function sendEventSms(params) {
  if (!params.userSmsConsent) return;
  if (!params.userPhone || !isFrenchMobile(params.userPhone)) return;
  try {
    await sendSms({
      to: params.userPhone,
      eventType: params.eventType,
      eventTitle: params.eventTitle,
      eventDetails: params.eventDetails,
      eventUrl: params.eventUrl,
      recipientName: params.userName,
      recipientEmail: params.userEmail
    });
  } catch (err2) {
    console.error(`[SMS] Failed for event ${params.eventType}:`, err2);
  }
}
async function logSms(data) {
  try {
    await db.insert(smsLogs).values({
      recipientPhone: data.recipientPhone,
      recipientName: data.recipientName || null,
      recipientEmail: data.recipientEmail || null,
      eventType: data.eventType,
      eventTitle: data.eventTitle,
      eventDetails: data.eventDetails || null,
      messageBody: data.messageBody || null,
      provider: data.provider,
      status: data.status,
      externalId: data.externalId || null,
      errorMessage: data.errorMessage || null
    });
  } catch (err2) {
    console.error("[SMS] Failed to log SMS:", err2);
  }
}
async function getSmsLogs(limit = 50) {
  return db.select().from(smsLogs).orderBy(desc2(smsLogs.createdAt)).limit(limit);
}
async function getSmsStats() {
  const all = await db.select().from(smsLogs);
  const sent = all.filter((l) => l.status === "sent").length;
  const failed = all.filter((l) => l.status === "failed" || l.status === "error").length;
  const skipped = all.filter((l) => l.status === "skipped").length;
  return { total: all.length, sent, failed, skipped, provider: getProvider() };
}
var init_smsService = __esm({
  "server/smsService.ts"() {
    "use strict";
    init_db();
    init_schema();
  }
});

// server/replit_integrations/object_storage/objectAcl.ts
function isPermissionAllowed(requested, granted) {
  if (requested === "read" /* READ */) {
    return ["read" /* READ */, "write" /* WRITE */].includes(granted);
  }
  return granted === "write" /* WRITE */;
}
function createObjectAccessGroup(group) {
  switch (group.type) {
    // Implement the case for each type of access group to instantiate.
    //
    // For example:
    // case "USER_LIST":
    //   return new UserListAccessGroup(group.id);
    // case "EMAIL_DOMAIN":
    //   return new EmailDomainAccessGroup(group.id);
    // case "GROUP_MEMBER":
    //   return new GroupMemberAccessGroup(group.id);
    // case "SUBSCRIBER":
    //   return new SubscriberAccessGroup(group.id);
    default:
      throw new Error(`Unknown access group type: ${group.type}`);
  }
}
async function setObjectAclPolicy(objectFile, aclPolicy) {
  const [exists] = await objectFile.exists();
  if (!exists) {
    throw new Error(`Object not found: ${objectFile.name}`);
  }
  await objectFile.setMetadata({
    metadata: {
      [ACL_POLICY_METADATA_KEY]: JSON.stringify(aclPolicy)
    }
  });
}
async function getObjectAclPolicy(objectFile) {
  const [metadata] = await objectFile.getMetadata();
  const aclPolicy = metadata?.metadata?.[ACL_POLICY_METADATA_KEY];
  if (!aclPolicy) {
    return null;
  }
  return JSON.parse(aclPolicy);
}
async function canAccessObject({
  userId,
  objectFile,
  requestedPermission
}) {
  const aclPolicy = await getObjectAclPolicy(objectFile);
  if (!aclPolicy) {
    return false;
  }
  if (aclPolicy.visibility === "public" && requestedPermission === "read" /* READ */) {
    return true;
  }
  if (!userId) {
    return false;
  }
  if (aclPolicy.owner === userId) {
    return true;
  }
  for (const rule of aclPolicy.aclRules || []) {
    const accessGroup = createObjectAccessGroup(rule.group);
    if (await accessGroup.hasMember(userId) && isPermissionAllowed(requestedPermission, rule.permission)) {
      return true;
    }
  }
  return false;
}
var ACL_POLICY_METADATA_KEY;
var init_objectAcl = __esm({
  "server/replit_integrations/object_storage/objectAcl.ts"() {
    "use strict";
    ACL_POLICY_METADATA_KEY = "custom:aclPolicy";
  }
});

// server/replit_integrations/object_storage/objectStorage.ts
import { Storage } from "@google-cloud/storage";
import { randomUUID as randomUUID2 } from "crypto";
import path3 from "path";
function parseObjectPath(path13) {
  if (!path13.startsWith("/")) {
    path13 = `/${path13}`;
  }
  const pathParts = path13.split("/");
  if (pathParts.length < 2) {
    throw new Error("Invalid path: must contain at least a bucket name");
  }
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || pathParts[1];
  const objectName = bucketName === pathParts[1] ? pathParts.slice(2).join("/") : pathParts.slice(1).join("/");
  return {
    bucketName,
    objectName
  };
}
async function signObjectURL({
  bucketName,
  objectName,
  method,
  ttlSec
}) {
  const request = {
    bucket_name: bucketName,
    object_name: objectName,
    method,
    expires_at: new Date(Date.now() + ttlSec * 1e3).toISOString()
  };
  const response = await fetch(
    `${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to sign object URL, errorcode: ${response.status}, make sure you're running on Replit`
    );
  }
  const { signed_url: signedURL } = await response.json();
  return signedURL;
}
var REPLIT_SIDECAR_ENDPOINT, objectStorageClient, ObjectNotFoundError2, ObjectStorageService2;
var init_objectStorage = __esm({
  "server/replit_integrations/object_storage/objectStorage.ts"() {
    "use strict";
    init_objectAcl();
    REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
    objectStorageClient = new Storage({
      apiEndpoint: process.env.CLOUDFLARE_R2_PUBLIC_ENDPOINT || "https://storage.googleapis.com",
      credentials: {
        audience: "replit",
        subject_token_type: "access_token",
        token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
        type: "external_account",
        credential_source: {
          url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
          format: {
            type: "json",
            subject_token_field_name: "access_token"
          }
        },
        universe_domain: "googleapis.com"
      },
      projectId: ""
    });
    ObjectNotFoundError2 = class _ObjectNotFoundError extends Error {
      constructor() {
        super("Object not found");
        this.name = "ObjectNotFoundError";
        Object.setPrototypeOf(this, _ObjectNotFoundError.prototype);
      }
    };
    ObjectStorageService2 = class {
      constructor() {
      }
      // Gets the public object search paths.
      getPublicObjectSearchPaths() {
        const pathsStr = process.env.PUBLIC_OBJECT_SEARCH_PATHS || "/autoreport/public";
        const paths = Array.from(
          new Set(
            pathsStr.split(",").map((path13) => path13.trim()).filter((path13) => path13.length > 0)
          )
        );
        return paths;
      }
      // Gets the private object directory.
      getPrivateObjectDir() {
        return process.env.PRIVATE_OBJECT_DIR || "/autoreport/.private/uploads";
      }
      // Search for a public object from the search paths.
      async searchPublicObject(filePath) {
        for (const searchPath of this.getPublicObjectSearchPaths()) {
          const fullPath = `${searchPath}/${filePath}`;
          const { bucketName, objectName } = parseObjectPath(fullPath);
          const bucket = objectStorageClient.bucket(bucketName);
          const file = bucket.file(objectName);
          const [exists] = await file.exists();
          if (exists) {
            return file;
          }
        }
        return null;
      }
      // Downloads an object to the response.
      async downloadObject(file, res, cacheTtlSec = 3600) {
        try {
          const [metadata] = await file.getMetadata();
          const aclPolicy = await getObjectAclPolicy(file);
          const isPublic = aclPolicy?.visibility === "public";
          res.set({
            "Content-Type": metadata.contentType || "application/octet-stream",
            "Content-Length": metadata.size,
            "Cache-Control": `${isPublic ? "public" : "private"}, max-age=${cacheTtlSec}`
          });
          const stream = file.createReadStream();
          stream.on("error", (err2) => {
            console.error("Stream error:", err2);
            if (!res.headersSent) {
              res.status(500).json({ error: "Error streaming file" });
            }
          });
          stream.pipe(res);
        } catch (error) {
          console.error("Error downloading file:", error);
          if (!res.headersSent) {
            res.status(500).json({ error: "Error downloading file" });
          }
        }
      }
      async uploadFileBuffer(fileBuffer, fileName, folder = "uploads") {
        const privateObjectDir = this.getPrivateObjectDir();
        if (!privateObjectDir) {
          throw new Error("PRIVATE_OBJECT_DIR not set.");
        }
        const fileId = randomUUID2();
        const ext = path3.extname(fileName);
        const storagePath = `${privateObjectDir}/${folder}/${fileId}${ext}`;
        const { bucketName, objectName } = parseObjectPath(storagePath);
        const bucket = objectStorageClient.bucket(bucketName);
        const file = bucket.file(objectName);
        await file.save(fileBuffer, {
          metadata: {
            contentType: this.getMimeType(ext)
          }
        });
        return `/objects/${folder}/${fileId}${ext}`;
      }
      async downloadFileBuffer(objectPath) {
        const file = await this.getObjectEntityFile(objectPath);
        const [buffer] = await file.download();
        return Buffer.from(buffer);
      }
      async deleteFile(objectPath) {
        try {
          const file = await this.getObjectEntityFile(objectPath);
          await file.delete();
        } catch (err2) {
          console.error(`[ObjectStorage] Error deleting file ${objectPath}:`, err2);
        }
      }
      getMimeType(ext) {
        const mimeTypes = {
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".png": "image/png",
          ".gif": "image/gif",
          ".webp": "image/webp",
          ".pdf": "application/pdf",
          ".doc": "application/msword",
          ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        };
        return mimeTypes[ext.toLowerCase()] || "application/octet-stream";
      }
      // Gets the upload URL for an object entity.
      async getObjectEntityUploadURL() {
        const privateObjectDir = this.getPrivateObjectDir();
        if (!privateObjectDir) {
          throw new Error(
            "PRIVATE_OBJECT_DIR not set. Create a bucket in 'Object Storage' tool and set PRIVATE_OBJECT_DIR env var."
          );
        }
        const objectId = randomUUID2();
        const fullPath = `${privateObjectDir}/uploads/${objectId}`;
        const { bucketName, objectName } = parseObjectPath(fullPath);
        return signObjectURL({
          bucketName,
          objectName,
          method: "PUT",
          ttlSec: 900
        });
      }
      // Gets the object entity file from the object path.
      async getObjectEntityFile(objectPath) {
        if (objectPath.startsWith("/objects/")) {
          const parts = objectPath.slice(1).split("/");
          if (parts.length < 2) {
            throw new ObjectNotFoundError2();
          }
          const entityId = parts.slice(1).join("/");
          let entityDir2 = this.getPrivateObjectDir();
          if (!entityDir2.endsWith("/")) {
            entityDir2 = `${entityDir2}/`;
          }
          const objectEntityPath = `${entityDir2}${entityId}`;
          const { bucketName, objectName } = parseObjectPath(objectEntityPath);
          const bucket = objectStorageClient.bucket(bucketName);
          const objectFile = bucket.file(objectName);
          const [exists] = await objectFile.exists();
          if (exists) {
            return objectFile;
          }
        }
        let entityDir = this.getPrivateObjectDir();
        if (!entityDir.endsWith("/")) {
          entityDir = `${entityDir}/`;
        }
        let cleanPath = objectPath.startsWith("/") ? objectPath.slice(1) : objectPath;
        if (!cleanPath.includes("/")) {
          cleanPath = `uploads/${cleanPath}`;
        }
        const rawEntityPath = `${entityDir}${cleanPath}`;
        console.log(`[ObjectStorage] Trying raw entity path: ${rawEntityPath}`);
        try {
          const { bucketName, objectName } = parseObjectPath(rawEntityPath);
          const bucket = objectStorageClient.bucket(bucketName);
          const file = bucket.file(objectName);
          const [exists] = await file.exists();
          if (exists) return file;
          if (cleanPath.startsWith("uploads/")) {
            const altPath = `${entityDir}${cleanPath.replace("uploads/", "")}`;
            const { bucketName: bAlt, objectName: oAlt } = parseObjectPath(altPath);
            const fileAlt = objectStorageClient.bucket(bAlt).file(oAlt);
            const [existsAlt] = await fileAlt.exists();
            if (existsAlt) return fileAlt;
          }
          const filenameOnly = path3.basename(cleanPath);
          const rootPath = `${entityDir}${filenameOnly}`;
          const { bucketName: bRoot, objectName: oRoot } = parseObjectPath(rootPath);
          const fileRoot = objectStorageClient.bucket(bRoot).file(oRoot);
          const [existsRoot] = await fileRoot.exists();
          if (existsRoot) return fileRoot;
        } catch (e) {
          console.error(`[ObjectStorage] Error checking raw path: ${e.message}`);
        }
        try {
          let cleanPathForPublic = objectPath.startsWith("/objects/") ? objectPath.slice("/objects/".length) : objectPath.startsWith("/") ? objectPath.slice(1) : objectPath;
          const publicFile = await this.searchPublicObject(cleanPathForPublic);
          if (publicFile) return publicFile;
          const filenameOnly = path3.basename(cleanPathForPublic);
          if (filenameOnly !== cleanPathForPublic) {
            const publicFileByName = await this.searchPublicObject(filenameOnly);
            if (publicFileByName) return publicFileByName;
            const publicFileUploads = await this.searchPublicObject(`uploads/${filenameOnly}`);
            if (publicFileUploads) return publicFileUploads;
          }
        } catch (e) {
          console.error(`[ObjectStorage] Error checking public paths: ${e}`);
        }
        throw new ObjectNotFoundError2();
      }
      normalizeObjectEntityPath(rawPath) {
        if (!rawPath.startsWith("https://storage.googleapis.com/")) {
          return rawPath;
        }
        const url = new URL(rawPath);
        const rawObjectPath = url.pathname;
        let objectEntityDir = this.getPrivateObjectDir();
        if (!objectEntityDir.endsWith("/")) {
          objectEntityDir = `${objectEntityDir}/`;
        }
        if (!rawObjectPath.startsWith(objectEntityDir)) {
          return rawObjectPath;
        }
        const entityId = rawObjectPath.slice(objectEntityDir.length);
        return `/objects/${entityId}`;
      }
      // Tries to set the ACL policy for the object entity and return the normalized path.
      async trySetObjectEntityAclPolicy(rawPath, aclPolicy) {
        const normalizedPath = this.normalizeObjectEntityPath(rawPath);
        if (!normalizedPath.startsWith("/")) {
          return normalizedPath;
        }
        const objectFile = await this.getObjectEntityFile(normalizedPath);
        await setObjectAclPolicy(objectFile, aclPolicy);
        return normalizedPath;
      }
      // Checks if the user can access the object entity.
      async canAccessObjectEntity({
        userId,
        objectFile,
        requestedPermission
      }) {
        return canAccessObject({
          userId,
          objectFile,
          requestedPermission: requestedPermission ?? "read" /* READ */
        });
      }
    };
  }
});

// server/imageWatermark.ts
var imageWatermark_exports = {};
__export(imageWatermark_exports, {
  addWatermarkToImage: () => addWatermarkToImage
});
import sharp from "sharp";
import * as fs2 from "fs";
import * as path4 from "path";
async function addWatermarkToImage(imageBuffer, reference, mimeType) {
  try {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    if (!metadata.width || !metadata.height) {
      console.log("[Watermark] Could not get image dimensions, returning original");
      return imageBuffer;
    }
    const width = metadata.width;
    const height = metadata.height;
    const compositeOperations = [];
    const fontSize = Math.max(18, Math.round(Math.min(width, height) * 0.045));
    const barH = fontSize + 32;
    const logoSize = Math.max(80, Math.min(Math.min(width, height) * 0.25, 200));
    const logoZoneW = Math.round(logoSize * 1.3);
    const textSvg = `
      <svg width="${width}" height="${barH}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="ts" x="-5%" y="-20%" width="110%" height="140%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="black" flood-opacity="0.8"/>
          </filter>
        </defs>
        <rect x="0" y="0" width="${width}" height="${barH}" fill="rgba(0,0,0,0.55)"/>
        <text
          x="16"
          y="${Math.round(barH * 0.68)}"
          font-family="Arial Black, Arial, sans-serif"
          font-size="${fontSize}"
          font-weight="900"
          fill="white"
          filter="url(#ts)"
          letter-spacing="1"
        >${reference}</text>
        <text
          x="${width - logoZoneW - 12}"
          y="${Math.round(barH * 0.68)}"
          font-family="Arial, sans-serif"
          font-size="${Math.round(fontSize * 0.7)}"
          font-weight="bold"
          fill="rgba(255,255,255,0.7)"
          text-anchor="end"
        >autoreport.fr</text>
      </svg>
    `;
    compositeOperations.push({
      input: Buffer.from(textSvg),
      gravity: "south",
      blend: "over"
    });
    if (fs2.existsSync(LOGO_PATH)) {
      const logoRaw = await sharp(LOGO_PATH).resize(Math.round(logoSize), Math.round(logoSize), { fit: "inside" }).ensureAlpha().toBuffer();
      const logoPng = await sharp(logoRaw).png().toBuffer();
      const logoMeta = await sharp(logoPng).metadata();
      const logoW = logoMeta.width || Math.round(logoSize);
      const logoH = logoMeta.height || Math.round(logoSize);
      const paddingRight = 16;
      const paddingBottom = barH + 12;
      compositeOperations.push({
        input: logoPng,
        left: Math.max(0, width - logoW - paddingRight),
        top: Math.max(0, height - logoH - paddingBottom),
        blend: "over"
      });
    }
    let result = image.composite(compositeOperations);
    if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
      result = result.jpeg({ quality: 90 });
    } else if (mimeType === "image/png") {
      result = result.png();
    } else if (mimeType === "image/webp") {
      result = result.webp({ quality: 90 });
    } else {
      result = result.jpeg({ quality: 90 });
    }
    const outputBuffer = await result.toBuffer();
    console.log(`[Watermark] Filigrane appliqu\xE9 (logo + r\xE9f\xE9rence): ${reference}`);
    return outputBuffer;
  } catch (error) {
    console.error("[Watermark] Error processing image:", error);
    return imageBuffer;
  }
}
var LOGO_PATH;
var init_imageWatermark = __esm({
  "server/imageWatermark.ts"() {
    "use strict";
    LOGO_PATH = path4.join(process.cwd(), "attached_assets", "logo-autoreport-n2iUZrkN_1759796960103.png");
  }
});

// server/replit_integrations/object_storage/routes.ts
import * as fs3 from "fs";
import * as path5 from "path";
async function downloadToFile(file, destPath) {
  return new Promise((resolve2, reject) => {
    file.createReadStream().on("error", reject).pipe(fs3.createWriteStream(destPath)).on("finish", resolve2).on("error", reject);
  });
}
function registerObjectStorageRoutes(app3) {
  const objectStorageService2 = new ObjectStorageService2();
  app3.post("/api/uploads/request-url", async (req, res) => {
    try {
      const { name, size, contentType } = req.body;
      if (!name) {
        return res.status(400).json({
          error: "Missing required field: name"
        });
      }
      const uploadURL = await objectStorageService2.getObjectEntityUploadURL();
      const objectPath = objectStorageService2.normalizeObjectEntityPath(uploadURL);
      res.json({
        uploadURL,
        objectPath,
        // Echo back the metadata for client convenience
        metadata: { name, size, contentType }
      });
    } catch (error) {
      console.error("Error generating upload URL:", error);
      res.status(500).json({ error: "Failed to generate upload URL" });
    }
  });
  app3.post("/api/admin/media/:type/:id/process", async (req, res) => {
    try {
      const { type, id } = req.params;
      const { objectPath, fileName, fileSize, contentType } = req.body;
      if (!objectPath || !fileName) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const objectFile = await objectStorageService2.getObjectEntityFile(objectPath);
      const tempPath = path5.join("/tmp", fileName);
      await downloadToFile(objectFile, tempPath);
      const fileData = fs3.readFileSync(tempPath);
      fs3.unlinkSync(tempPath);
      let processedData = fileData;
      const isImage = /image\//i.test(contentType || "");
      if (isImage) {
        try {
          const { storage: storage3 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
          let reference = "DOC";
          if (type === "quote") {
            const quote = await storage3.getQuote(id);
            reference = quote?.reference || `DEVIS-${id.slice(0, 8).toUpperCase()}`;
          } else if (type === "invoice") {
            const invoice = await storage3.getInvoice(id);
            reference = invoice?.invoiceNumber || `FACTURE-${id.slice(0, 8).toUpperCase()}`;
          }
          const { addWatermarkToImage: addWatermarkToImage2 } = await Promise.resolve().then(() => (init_imageWatermark(), imageWatermark_exports));
          processedData = await addWatermarkToImage2(fileData, reference, contentType || "image/jpeg");
          console.log(`[ObjectStorage] Watermark applied for ${type} ${id}: ${reference}`);
        } catch (err2) {
          console.error("[ObjectStorage] Watermark failed, using original:", err2);
        }
      }
      const { storage: storage2 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
      if (type === "quote") {
        await storage2.createQuoteMedia({
          quoteId: id,
          fileName,
          filePath: objectPath,
          // The path remains the same but the file content is served via /objects/:path
          fileType: isImage ? "image" : "document",
          fileSize: processedData.length
        });
      } else if (type === "invoice") {
        await storage2.createInvoiceMedia({
          invoiceId: id,
          fileName,
          filePath: objectPath,
          fileType: isImage ? "image" : "document",
          fileSize: processedData.length
        });
      }
      res.json({ success: true, objectPath });
    } catch (error) {
      console.error("Error processing media:", error);
      res.status(500).json({ error: "Failed to process media" });
    }
  });
  app3.get("/objects/:objectPath(*)", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const { objectPath } = req.params;
      const svc = new ObjectStorageService2();
      const objectFile = await svc.getObjectEntityFile(objectPath);
      const [metadata] = await objectFile.getMetadata();
      let contentType = metadata.contentType || "application/octet-stream";
      if (!contentType || contentType === "application/octet-stream") {
        const ext = path5.extname(objectPath).toLowerCase();
        const mimeMap = {
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".png": "image/png",
          ".gif": "image/gif",
          ".webp": "image/webp",
          ".pdf": "application/pdf",
          ".mp4": "video/mp4",
          ".webm": "video/webm",
          ".mov": "video/quicktime"
        };
        if (mimeMap[ext]) contentType = mimeMap[ext];
      }
      res.set({
        "Content-Type": contentType,
        "Content-Length": metadata.size?.toString() || "",
        "Cache-Control": "private, max-age=3600"
      });
      const stream = objectFile.createReadStream();
      stream.on("error", (err2) => {
        console.error("Stream error:", err2);
        if (!res.headersSent) res.status(500).json({ error: "Error streaming file" });
      });
      stream.pipe(res);
    } catch (error) {
      console.error("Error serving object:", error);
      if (!res.headersSent) res.status(404).json({ error: "Object not found" });
    }
  });
}
var init_routes = __esm({
  "server/replit_integrations/object_storage/routes.ts"() {
    "use strict";
    init_objectStorage();
    init_object_storage();
  }
});

// server/replit_integrations/object_storage/index.ts
var object_storage_exports = {};
__export(object_storage_exports, {
  ObjectNotFoundError: () => ObjectNotFoundError2,
  ObjectStorageService: () => ObjectStorageService2,
  canAccessObject: () => canAccessObject,
  getObjectAclPolicy: () => getObjectAclPolicy,
  objectStorageClient: () => objectStorageClient,
  registerObjectStorageRoutes: () => registerObjectStorageRoutes,
  setObjectAclPolicy: () => setObjectAclPolicy
});
var init_object_storage = __esm({
  "server/replit_integrations/object_storage/index.ts"() {
    "use strict";
    init_objectStorage();
    init_objectAcl();
    init_routes();
  }
});

// server/cloudflareR2Service.ts
var cloudflareR2Service_exports = {};
__export(cloudflareR2Service_exports, {
  deleteFromR2: () => deleteFromR2,
  downloadFromR2: () => downloadFromR2,
  extractR2Key: () => extractR2Key,
  fileExistsOnR2: () => fileExistsOnR2,
  getPresignedDownloadUrl: () => getPresignedDownloadUrl,
  getPresignedUploadUrl: () => getPresignedUploadUrl,
  isCloudflareR2Configured: () => isCloudflareR2Configured,
  isR2Path: () => isR2Path,
  listR2Files: () => listR2Files,
  uploadToR2: () => uploadToR2
});
function getAccountId() {
  const realId = process.env.CLOUDFLARE_R2_REAL_ACCOUNT_ID;
  if (realId) return realId;
  const id = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  if (!id) throw new Error("Cloudflare R2 account ID not configured");
  return id;
}
function getBucketName() {
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_OVERRIDE || process.env.CLOUDFLARE_R2_BUCKET_NAME;
  if (!bucket) throw new Error("CLOUDFLARE_R2_BUCKET_NAME not configured");
  return bucket;
}
function getApiToken() {
  const token = process.env.CF_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
  if (!token) throw new Error("Cloudflare API token not configured (CF_API_TOKEN or CLOUDFLARE_API_TOKEN)");
  return token;
}
function getPublicUrl(key) {
  const customDomain = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  if (customDomain) {
    return `${customDomain.replace(/\/$/, "")}/${key}`;
  }
  return `/r2/${key}`;
}
function getMimeType(fileName) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    pdf: "application/pdf",
    json: "application/json",
    zip: "application/zip"
  };
  return mimeTypes[ext] || "application/octet-stream";
}
function r2ApiUrl(key) {
  const accountId = getAccountId();
  const bucket = getBucketName();
  const base = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucket}/objects`;
  if (key) return `${base}/${encodeURIComponent(key)}`;
  return base;
}
function isCloudflareR2Configured() {
  const hasToken = !!(process.env.CF_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN);
  const hasAccount = !!(process.env.CLOUDFLARE_R2_REAL_ACCOUNT_ID || process.env.CLOUDFLARE_R2_ACCOUNT_ID);
  const hasBucket = !!(process.env.CLOUDFLARE_R2_BUCKET_OVERRIDE || process.env.CLOUDFLARE_R2_BUCKET_NAME);
  return hasToken && hasAccount && hasBucket;
}
async function uploadToR2(fileBuffer, fileName, folder = "uploads", contentType) {
  const token = getApiToken();
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}_${fileName}`;
  const key = `${folder}/${uniqueName}`;
  const mime = contentType || getMimeType(fileName);
  const response = await fetch(r2ApiUrl(key), {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": mime
    },
    body: fileBuffer
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`R2 upload failed (${response.status}): ${errText}`);
  }
  const url = getPublicUrl(key);
  console.log(`[CloudflareR2] Uploaded: ${key} (${fileBuffer.length} bytes, ${mime})`);
  return { key, url };
}
async function downloadFromR2(key) {
  const token = getApiToken();
  const response = await fetch(r2ApiUrl(key), {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error(`R2 download failed (${response.status}): ${await response.text()}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return {
    data: Buffer.from(arrayBuffer),
    contentType: response.headers.get("content-type") || getMimeType(key)
  };
}
async function deleteFromR2(key) {
  const token = getApiToken();
  const response = await fetch(r2ApiUrl(key), {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`R2 delete failed (${response.status}): ${errText}`);
  }
  console.log(`[CloudflareR2] Deleted: ${key}`);
}
async function listR2Files(prefix = "", maxKeys = 100) {
  const token = getApiToken();
  const accountId = getAccountId();
  const bucket = getBucketName();
  const params = new URLSearchParams();
  if (prefix) params.set("prefix", prefix);
  params.set("per_page", String(maxKeys));
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucket}/objects?${params.toString()}`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`R2 list failed (${response.status}): ${errText}`);
  }
  const data = await response.json();
  if (!data.success) {
    throw new Error(`R2 list API error: ${JSON.stringify(data.errors)}`);
  }
  return (data.result || []).map((item) => ({
    key: item.key || item.Key || "",
    size: item.size || item.Size || 0,
    lastModified: new Date(item.last_modified || item.LastModified || Date.now())
  }));
}
async function fileExistsOnR2(key) {
  try {
    const token = getApiToken();
    const response = await fetch(r2ApiUrl(key), {
      method: "HEAD",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.ok;
  } catch {
    return false;
  }
}
async function getPresignedUploadUrl(_key, _contentType = "image/jpeg", _expiresIn = 3600) {
  throw new Error("Presigned URLs require S3-compatible endpoint which is not available. Use direct upload via /api/upload instead.");
}
async function getPresignedDownloadUrl(key, _expiresIn = 3600) {
  return getPublicUrl(key);
}
function extractR2Key(filePath) {
  if (filePath.startsWith("/r2/")) {
    return filePath.slice(4);
  }
  const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  if (publicUrl && filePath.startsWith(publicUrl)) {
    return filePath.slice(publicUrl.length).replace(/^\//, "");
  }
  return null;
}
function isR2Path(filePath) {
  if (filePath.startsWith("/r2/")) return true;
  const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  if (publicUrl && filePath.startsWith(publicUrl)) return true;
  return false;
}
var init_cloudflareR2Service = __esm({
  "server/cloudflareR2Service.ts"() {
    "use strict";
  }
});

// server/firebase.ts
var firebase_exports = {};
__export(firebase_exports, {
  deleteFromFirebaseStorage: () => deleteFromFirebaseStorage,
  firebaseConfig: () => firebaseConfig,
  getFirebaseStorage: () => getFirebaseStorage,
  initializeFirebase: () => initializeFirebase,
  isFirebaseConfigured: () => isFirebaseConfigured,
  uploadToFirebaseStorage: () => uploadToFirebaseStorage
});
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
function initializeFirebase() {
  if (getApps().length === 0) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountKey) {
      try {
        const serviceAccount = JSON.parse(serviceAccountKey);
        app = initializeApp({
          credential: cert(serviceAccount),
          storageBucket: firebaseConfig.storageBucket
        });
        console.log("[Firebase] Initialized with service account");
      } catch (error) {
        console.error("[Firebase] Error parsing service account key:", error);
        app = initializeApp({
          projectId: firebaseConfig.projectId,
          storageBucket: firebaseConfig.storageBucket
        });
        console.log("[Firebase] Initialized without credentials (limited access)");
      }
    } else {
      app = initializeApp({
        projectId: firebaseConfig.projectId,
        storageBucket: firebaseConfig.storageBucket
      });
      console.log("[Firebase] Initialized without service account (set FIREBASE_SERVICE_ACCOUNT_KEY for full access)");
    }
  }
  return app;
}
function getFirebaseStorage() {
  if (!app) {
    initializeFirebase();
  }
  return getStorage();
}
function isFirebaseConfigured() {
  return !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
}
async function uploadToFirebaseStorage(fileBuffer, fileName, folder = "uploads") {
  const storage2 = getFirebaseStorage();
  const bucket = storage2.bucket();
  const ext = path.extname(fileName).toLowerCase();
  const mimeTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".pdf": "application/pdf"
  };
  const mimeType = mimeTypes[ext] || "application/octet-stream";
  const filePath = `${folder}/${Date.now()}_${fileName}`;
  const file = bucket.file(filePath);
  await file.save(fileBuffer, {
    metadata: {
      contentType: mimeType
    }
  });
  try {
    await file.makePublic();
    return `https://storage.googleapis.com/${firebaseConfig.storageBucket}/${filePath}`;
  } catch (err2) {
    console.warn("[Firebase] Could not make file public, using signed URL instead");
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491"
    });
    return url;
  }
}
async function deleteFromFirebaseStorage(fileUrl) {
  try {
    const storage2 = getFirebaseStorage();
    const bucket = storage2.bucket();
    const urlPrefix = `https://storage.googleapis.com/${firebaseConfig.storageBucket}/`;
    if (fileUrl.startsWith(urlPrefix)) {
      const filePath = fileUrl.replace(urlPrefix, "");
      const file = bucket.file(filePath);
      await file.delete();
      console.log(`[Firebase] Deleted file: ${filePath}`);
    }
  } catch (error) {
    console.error("[Firebase] Error deleting file:", error);
  }
}
var firebaseConfig, app;
var init_firebase = __esm({
  "server/firebase.ts"() {
    "use strict";
    firebaseConfig = {
      projectId: "autoreport-96119",
      storageBucket: "autoreport-96119.appspot.com"
    };
  }
});

// server/googleDriveStorage.ts
var googleDriveStorage_exports = {};
__export(googleDriveStorage_exports, {
  deleteFromGoogleDrive: () => deleteFromGoogleDrive,
  downloadFromGoogleDrive: () => downloadFromGoogleDrive,
  exchangeCodeForTokens: () => exchangeCodeForTokens,
  extractFileId: () => extractFileId,
  getGoogleAuthUrl: () => getGoogleAuthUrl,
  isGoogleDriveConfigured: () => isGoogleDriveConfigured,
  isGoogleDrivePath: () => isGoogleDrivePath,
  uploadToGoogleDrive: () => uploadToGoogleDrive
});
import { google } from "googleapis";
import { Readable } from "stream";
function getOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Drive OAuth not configured (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN required)");
  }
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}
function getDriveClient() {
  if (driveClient) return driveClient;
  const auth = getOAuth2Client();
  driveClient = google.drive({ version: "v3", auth });
  console.log("[GoogleDrive] Drive client initialized with OAuth2");
  return driveClient;
}
async function getOrCreateRootFolder() {
  if (rootFolderId) return rootFolderId;
  const drive = getDriveClient();
  try {
    const folder2 = await drive.files.get({
      fileId: KNOWN_ROOT_FOLDER_ID,
      fields: "id,name"
    });
    if (folder2.data.id) {
      rootFolderId = folder2.data.id;
      console.log(`[GoogleDrive] Root folder verified: ${rootFolderId} (${folder2.data.name})`);
      return rootFolderId;
    }
  } catch (e) {
    console.warn(`[GoogleDrive] Known folder ID not accessible, searching by name...`, e.message);
  }
  const folderName = process.env.GOOGLE_DRIVE_FOLDER_NAME || "AutoReport";
  console.log(`[GoogleDrive] Searching for root folder: ${folderName}`);
  const list = await drive.files.list({
    q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id,name)",
    spaces: "drive"
  });
  if (list.data.files && list.data.files.length > 0) {
    rootFolderId = list.data.files[0].id;
    console.log(`[GoogleDrive] Root folder found: ${rootFolderId}`);
    return rootFolderId;
  }
  console.log(`[GoogleDrive] Folder '${folderName}' not found, creating...`);
  const folder = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder"
    },
    fields: "id"
  });
  rootFolderId = folder.data.id;
  console.log(`[GoogleDrive] Root folder created: ${rootFolderId}`);
  return rootFolderId;
}
async function getOrCreateSubFolder(subfolderName) {
  if (subFolderCache[subfolderName]) return subFolderCache[subfolderName];
  const drive = getDriveClient();
  const parentId = await getOrCreateRootFolder();
  const list = await drive.files.list({
    q: `'${parentId}' in parents and name='${subfolderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id,name)"
  });
  if (list.data.files && list.data.files.length > 0) {
    subFolderCache[subfolderName] = list.data.files[0].id;
    console.log(`[GoogleDrive] Subfolder '${subfolderName}' found: ${subFolderCache[subfolderName]}`);
    return subFolderCache[subfolderName];
  }
  const folder = await drive.files.create({
    requestBody: {
      name: subfolderName,
      parents: [parentId],
      mimeType: "application/vnd.google-apps.folder"
    },
    fields: "id"
  });
  subFolderCache[subfolderName] = folder.data.id;
  console.log(`[GoogleDrive] Subfolder '${subfolderName}' created: ${subFolderCache[subfolderName]}`);
  return subFolderCache[subfolderName];
}
function getMimeType2(fileName) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    pdf: "application/pdf"
  };
  return mimeTypes[ext] || "application/octet-stream";
}
async function uploadToGoogleDrive(fileBuffer, fileName, folder = "uploads") {
  const drive = getDriveClient();
  const folderId = await getOrCreateSubFolder(folder);
  const uniqueName = fileName;
  const mimeType = getMimeType2(fileName);
  const stream = new Readable();
  stream.push(fileBuffer);
  stream.push(null);
  console.log(`[GoogleDrive] Uploading ${uniqueName} to folder ${folderId}...`);
  const res = await drive.files.create({
    requestBody: {
      name: uniqueName,
      parents: [folderId]
    },
    media: {
      mimeType,
      body: stream
    },
    fields: "id"
  });
  const fileId = res.data.id;
  console.log(`[GoogleDrive] File uploaded successfully: ${fileId} (${uniqueName})`);
  return {
    fileId,
    filePath: `/gdrive/${fileId}/${encodeURIComponent(fileName)}`
  };
}
async function downloadFromGoogleDrive(fileId) {
  const drive = getDriveClient();
  const meta = await drive.files.get({
    fileId,
    fields: "mimeType,size"
  });
  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "arraybuffer" }
  );
  return {
    data: Buffer.from(response.data),
    mimeType: meta.data.mimeType || "application/octet-stream"
  };
}
async function deleteFromGoogleDrive(fileId) {
  const drive = getDriveClient();
  try {
    await drive.files.delete({ fileId });
    console.log(`[GoogleDrive] File deleted: ${fileId}`);
  } catch (error) {
    console.error(`[GoogleDrive] Error deleting file ${fileId}:`, error.message);
  }
}
function isGoogleDrivePath(filePath) {
  return filePath.startsWith("/gdrive/");
}
function extractFileId(filePath) {
  if (!isGoogleDrivePath(filePath)) return null;
  const parts = filePath.split("/");
  return parts[2] || null;
}
function isGoogleDriveConfigured() {
  return !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN);
}
function getGoogleAuthUrl() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET required");
  }
  const gDomain = process.env.REPLIT_DOMAINS?.split(",")[0]?.trim() || process.env.REPLIT_DEV_DOMAIN || "localhost:5000";
  const gProto = gDomain.includes("localhost") ? "http" : "https";
  const redirectUri = `${gProto}://${gDomain}/api/admin/gdrive/callback`;
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive"],
    prompt: "consent"
  });
}
async function exchangeCodeForTokens(code) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET required");
  }
  const gDomain = process.env.REPLIT_DOMAINS?.split(",")[0]?.trim() || process.env.REPLIT_DEV_DOMAIN || "localhost:5000";
  const gProto = gDomain.includes("localhost") ? "http" : "https";
  const redirectUri = `${gProto}://${gDomain}/api/admin/gdrive/callback`;
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  const { tokens } = await oauth2Client.getToken(code);
  if (!tokens.refresh_token) {
    throw new Error("No refresh token received. Try revoking access at https://myaccount.google.com/permissions then retry.");
  }
  return { refreshToken: tokens.refresh_token };
}
var driveClient, rootFolderId, subFolderCache, KNOWN_ROOT_FOLDER_ID;
var init_googleDriveStorage = __esm({
  "server/googleDriveStorage.ts"() {
    "use strict";
    driveClient = null;
    rootFolderId = null;
    subFolderCache = {};
    KNOWN_ROOT_FOLDER_ID = "1NwXGj35U9A-rYOhh5hNRkSs9DB3F0J5o";
  }
});

// server/mediaService.ts
var mediaService_exports = {};
__export(mediaService_exports, {
  deleteMedia: () => deleteMedia,
  downloadMedia: () => downloadMedia,
  isObjectStorageAvailable: () => isObjectStorageAvailable,
  migrateLocalToObjectStorage: () => migrateLocalToObjectStorage,
  renameMediaFile: () => renameMediaFile,
  serveMediaHeaders: () => serveMediaHeaders,
  uploadMedia: () => uploadMedia
});
import fs4 from "fs";
import path6 from "path";
import { eq as eq3 } from "drizzle-orm";
function ensureUploadsDir() {
  if (!fs4.existsSync(UPLOADS_DIR)) {
    fs4.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  if (!fs4.existsSync(BACKUP_DIR)) {
    fs4.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}
function getMimeType3(fileName) {
  const ext = path6.extname(fileName).toLowerCase();
  const mimeTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".pdf": "application/pdf",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mov": "video/quicktime",
    ".doc": "application/msword",
    ".zip": "application/zip",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  };
  return mimeTypes[ext] || "application/octet-stream";
}
async function renameMediaFile(oldPath, newFileName) {
  try {
    if (oldPath.startsWith("/objects/")) {
      const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
      const objStore = new ObjectStorageService3();
      const buffer = await objStore.downloadFileBuffer(oldPath);
      if (!buffer) throw new Error("Impossible de t\xE9l\xE9charger le fichier source");
      const parentDir = path6.dirname(oldPath);
      const newPath = await objStore.uploadFileBuffer(buffer, newFileName, parentDir);
      await objStore.deleteFile(oldPath);
      return newPath;
    } else if (oldPath.startsWith("/uploads/")) {
      const fullOldPath = path6.join(process.cwd(), oldPath);
      const parentDir = path6.dirname(fullOldPath);
      const fullNewPath = path6.join(parentDir, newFileName);
      if (fs4.existsSync(fullOldPath)) {
        fs4.renameSync(fullOldPath, fullNewPath);
        return oldPath.replace(path6.basename(oldPath), newFileName);
      }
    }
    return oldPath;
  } catch (err2) {
    console.error(`[MediaService] Rename failed:`, err2);
    throw err2;
  }
}
async function isObjectStorageAvailable() {
  try {
    const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
    const svc = new ObjectStorageService3();
    const testPath = svc.getPrivateObjectDir();
    return !!testPath;
  } catch {
    return false;
  }
}
async function sendLocalMediaAlert(fileName, reference, localUrl) {
  try {
    const { sendEmail: sendEmail2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
    const adminEmail = process.env.ADMIN_EMAIL || "contact@autoreport.com";
    await sendEmail2({
      to: adminEmail,
      cc: "rbelmahi90@gmail.com",
      subject: `\u{1F6A8} ALERTE: M\xE9dia en local - R\xE9f: ${reference}`,
      html: `
        <h3>Alerte Migration M\xE9dia</h3>
        <p>Le fichier <strong>${fileName}</strong> li\xE9 \xE0 la r\xE9f\xE9rence <strong>${reference}</strong> a \xE9t\xE9 enregistr\xE9 en local car aucun stockage cloud n'\xE9tait disponible.</p>
        <p>URL locale : <code>${localUrl}</code></p>
        <p><strong>Action requise :</strong> Une migration vers le cloud doit \xEAtre effectu\xE9e d\xE8s que possible pour garantir la p\xE9rennit\xE9 des donn\xE9es.</p>
      `
    });
    console.log(`[MediaService] Alerte admin envoy\xE9e pour ${fileName} (CC: rbelmahi90@gmail.com)`);
  } catch (err2) {
    console.error(`[MediaService] Erreur lors de l'envoi de l'alerte admin:`, err2);
  }
}
async function uploadMedia(fileData, fileName, folder = "uploads", garageSlug, reference = "Inconnue") {
  const tenantFolder = garageSlug ? `${garageSlug}/${folder}` : folder;
  try {
    const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
    const objStore = new ObjectStorageService3();
    const isPublic = folder.includes("public") || folder.includes("quote") || folder.includes("invoice");
    const publicDir = objStore.getPublicObjectSearchPaths()[0] || "public";
    const uploadFolder = isPublic ? `${publicDir}/${tenantFolder}` : tenantFolder;
    const objectPath = await objStore.uploadFileBuffer(fileData, fileName, uploadFolder);
    console.log(`[MediaService] Upload Object Storage OK: ${objectPath}`);
    return objectPath;
  } catch (objErr) {
    console.warn(`[MediaService] Object Storage indisponible: ${objErr.message}`);
  }
  try {
    const { isCloudflareR2Configured: isCloudflareR2Configured2, uploadToR2: uploadToR22 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
    if (isCloudflareR2Configured2()) {
      const result = await uploadToR22(fileData, fileName, tenantFolder);
      console.log(`[MediaService] Upload Cloudflare R2 OK: ${result.url}`);
      return result.url;
    }
  } catch (r2Err) {
    console.warn(`[MediaService] Cloudflare R2 indisponible: ${r2Err.message}`);
  }
  try {
    const { isFirebaseConfigured: isFirebaseConfigured2, uploadToFirebaseStorage: uploadToFirebaseStorage2 } = await Promise.resolve().then(() => (init_firebase(), firebase_exports));
    if (isFirebaseConfigured2()) {
      const firebasePath = await uploadToFirebaseStorage2(fileData, fileName, tenantFolder);
      console.log(`[MediaService] Upload Firebase OK: ${firebasePath}`);
      return firebasePath;
    }
  } catch (fbErr) {
    console.warn(`[MediaService] Firebase indisponible: ${fbErr.message}`);
  }
  ensureUploadsDir();
  const tenantDir = garageSlug ? path6.join(UPLOADS_DIR, garageSlug) : UPLOADS_DIR;
  if (!fs4.existsSync(tenantDir)) fs4.mkdirSync(tenantDir, { recursive: true });
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}_${fileName}`;
  const localPath = path6.join(tenantDir, uniqueName);
  fs4.writeFileSync(localPath, fileData);
  const localUrl = garageSlug ? `/uploads/${garageSlug}/${uniqueName}` : `/uploads/${uniqueName}`;
  console.error(`[MediaService] TOUS LES CLOUDS \xC9CHOU\xC9S. Enregistr\xE9 en LOCAL: ${localUrl}`);
  sendLocalMediaAlert(fileName, reference, localUrl);
  isObjectStorageAvailable().then((available) => {
    if (available) {
      migrateLocalToObjectStorage().catch(
        (err2) => console.error("[MediaService] Background migration failed:", err2)
      );
    }
  });
  return localUrl;
}
async function downloadMedia(filePath) {
  try {
    if (filePath.startsWith("/objects/")) {
      const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
      const objStore = new ObjectStorageService3();
      return await objStore.downloadFileBuffer(filePath);
    } else if (filePath.startsWith("/r2/")) {
      const { downloadFromR2: downloadFromR22, extractR2Key: extractR2Key2 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
      const key = extractR2Key2(filePath);
      if (key) {
        const { data } = await downloadFromR22(key);
        return data;
      }
    } else if (filePath.startsWith("/gdrive/")) {
      const { extractFileId: extractFileId2, downloadFromGoogleDrive: downloadFromGoogleDrive2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
      const fileId = extractFileId2(filePath);
      if (fileId) {
        const result = await downloadFromGoogleDrive2(fileId);
        return result.data;
      }
    } else if (filePath.startsWith("https://")) {
      const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
      if (publicUrl && filePath.startsWith(publicUrl)) {
        const { downloadFromR2: downloadFromR22, extractR2Key: extractR2Key2 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
        const key = extractR2Key2(filePath);
        if (key) {
          const { data } = await downloadFromR22(key);
          return data;
        }
      }
      const response = await fetch(filePath);
      if (response.ok) return Buffer.from(await response.arrayBuffer());
    } else if (filePath.startsWith("/uploads/")) {
      const localPath = path6.join(process.cwd(), filePath);
      if (fs4.existsSync(localPath)) return fs4.readFileSync(localPath);
      const fileName = path6.basename(filePath);
      const backupPath = path6.join(BACKUP_DIR, fileName);
      if (fs4.existsSync(backupPath)) return fs4.readFileSync(backupPath);
    } else {
      const localPath = filePath.startsWith("/") ? `.${filePath}` : filePath;
      if (fs4.existsSync(localPath)) return fs4.readFileSync(localPath);
    }
  } catch (err2) {
    console.error(`[MediaService] Download failed ${filePath}:`, err2);
  }
  return null;
}
async function deleteMedia(filePath) {
  try {
    if (filePath.startsWith("/objects/")) {
      const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
      const objStore = new ObjectStorageService3();
      await objStore.deleteFile(filePath);
    } else if (filePath.startsWith("/r2/")) {
      const { deleteFromR2: deleteFromR22, extractR2Key: extractR2Key2 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
      const key = extractR2Key2(filePath);
      if (key) await deleteFromR22(key);
    } else if (filePath.startsWith("/gdrive/")) {
      const { extractFileId: extractFileId2, deleteFromGoogleDrive: deleteFromGoogleDrive2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
      const fileId = extractFileId2(filePath);
      if (fileId) await deleteFromGoogleDrive2(fileId);
    } else if (filePath.startsWith("https://")) {
      const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
      if (publicUrl && filePath.startsWith(publicUrl)) {
        const { deleteFromR2: deleteFromR22, extractR2Key: extractR2Key2 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
        const key = extractR2Key2(filePath);
        if (key) await deleteFromR22(key);
      }
    } else {
      const localPath = filePath.startsWith("/") ? `.${filePath}` : filePath;
      if (fs4.existsSync(localPath)) fs4.unlinkSync(localPath);
    }
  } catch (err2) {
    console.error(`[MediaService] Delete failed ${filePath}:`, err2);
  }
}
function serveMediaHeaders(filePath) {
  return { contentType: getMimeType3(filePath) };
}
async function migrateLocalToObjectStorage() {
  console.log(`[MediaMigration] Demarrage migration local -> Object Storage...`);
  const results = [];
  let migrated = 0;
  let errors = 0;
  let skipped = 0;
  let objStoreAvailable = false;
  let objStore;
  try {
    const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
    objStore = new ObjectStorageService3();
    objStoreAvailable = true;
  } catch {
    console.warn(`[MediaMigration] Object Storage non disponible, tentative via Cloudflare R2 API...`);
  }
  let r2Available = false;
  try {
    const { isCloudflareR2Configured: isCloudflareR2Configured2 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
    r2Available = isCloudflareR2Configured2();
  } catch {
  }
  if (!objStoreAvailable && !r2Available) {
    console.error(`[MediaMigration] Aucun stockage cloud disponible, migration impossible`);
    return { migrated: 0, errors: 0, skipped: 0, details: [] };
  }
  const allLocalMedia = [
    ...(await db.select({ id: quoteMedia.id, filePath: quoteMedia.filePath, fileName: quoteMedia.fileName, table: quoteMedia.fileType }).from(quoteMedia)).filter((m) => m.filePath.startsWith("/uploads/")).map((m) => ({ ...m, entityTable: "quote_media" })),
    ...(await db.select({ id: invoiceMedia.id, filePath: invoiceMedia.filePath, fileName: invoiceMedia.fileName, table: invoiceMedia.fileType }).from(invoiceMedia)).filter((m) => m.filePath.startsWith("/uploads/")).map((m) => ({ ...m, entityTable: "invoice_media" }))
  ];
  console.log(`[MediaMigration] ${allLocalMedia.length} fichiers locaux a migrer`);
  for (const media of allLocalMedia) {
    const localFilePath = path6.join(process.cwd(), media.filePath);
    if (!fs4.existsSync(localFilePath)) {
      console.warn(`[MediaMigration] Fichier introuvable: ${media.filePath}`);
      results.push({ file: media.fileName, oldPath: media.filePath, newPath: "", status: "missing" });
      skipped++;
      continue;
    }
    try {
      const fileData = fs4.readFileSync(localFilePath);
      let newPath;
      if (objStoreAvailable) {
        newPath = await objStore.uploadFileBuffer(fileData, media.fileName, "uploads");
      } else {
        const { uploadToR2: uploadToR22 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
        const result = await uploadToR22(fileData, media.fileName, "uploads");
        newPath = result.url;
      }
      if (media.entityTable === "quote_media") {
        await db.update(quoteMedia).set({ filePath: newPath }).where(eq3(quoteMedia.id, media.id));
      } else {
        await db.update(invoiceMedia).set({ filePath: newPath }).where(eq3(invoiceMedia.id, media.id));
      }
      fs4.unlinkSync(localFilePath);
      results.push({ file: media.fileName, oldPath: media.filePath, newPath, status: "migrated" });
      migrated++;
      console.log(`[MediaMigration] ${media.filePath} -> ${newPath}`);
    } catch (err2) {
      results.push({ file: media.fileName, oldPath: media.filePath, newPath: "", status: `error: ${err2.message}` });
      errors++;
      console.error(`[MediaMigration] Erreur migration ${media.filePath}:`, err2.message);
    }
  }
  const localFiles = fs4.existsSync(UPLOADS_DIR) ? fs4.readdirSync(UPLOADS_DIR).filter((f) => !f.startsWith(".") && f !== "ocr") : [];
  for (const file of localFiles) {
    const localFilePath = path6.join(UPLOADS_DIR, file);
    const stat = fs4.statSync(localFilePath);
    if (stat.isDirectory()) continue;
    const isReferenced = allLocalMedia.some((m) => m.filePath === `/uploads/${file}`);
    if (isReferenced) continue;
    try {
      const fileData = fs4.readFileSync(localFilePath);
      let newPath;
      if (objStoreAvailable) {
        newPath = await objStore.uploadFileBuffer(fileData, file, "uploads");
      } else {
        const { uploadToR2: uploadToR22 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
        const result = await uploadToR22(fileData, file, "uploads");
        newPath = result.url;
      }
      fs4.unlinkSync(localFilePath);
      results.push({ file, oldPath: `/uploads/${file}`, newPath, status: "migrated-orphan" });
      migrated++;
      console.log(`[MediaMigration] Orphelin: /uploads/${file} -> ${newPath}`);
    } catch (err2) {
      errors++;
      console.error(`[MediaMigration] Erreur fichier orphelin ${file}:`, err2.message);
    }
  }
  console.log(`[MediaMigration] Termine: ${migrated} migres, ${errors} erreurs, ${skipped} ignores`);
  return { migrated, errors, skipped, details: results };
}
var UPLOADS_DIR, BACKUP_DIR;
var init_mediaService = __esm({
  "server/mediaService.ts"() {
    "use strict";
    init_db();
    init_schema();
    UPLOADS_DIR = path6.join(process.cwd(), "uploads");
    BACKUP_DIR = path6.join(UPLOADS_DIR, "backup_media");
  }
});

// server/tenantContext.ts
var tenantContext_exports = {};
__export(tenantContext_exports, {
  SHARED_TABLES: () => SHARED_TABLES,
  TENANT_TABLES: () => TENANT_TABLES,
  createTenantSchema: () => createTenantSchema,
  getSchemaName: () => getSchemaName,
  migrateDataToTenantSchema: () => migrateDataToTenantSchema,
  resetSearchPath: () => resetSearchPath,
  runInTenantContext: () => runInTenantContext,
  setRequestTenantSchema: () => setRequestTenantSchema,
  withTenantSchema: () => withTenantSchema
});
import { sql as sql3 } from "drizzle-orm";
function getSchemaName(garageSlug) {
  return `garage_${garageSlug.replace(/-/g, "_")}`;
}
async function createTenantSchema(garageSlug) {
  const schemaName = getSchemaName(garageSlug);
  const client = await pool.connect();
  try {
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
    for (const table of TENANT_TABLES) {
      const exists = await client.query(
        `SELECT 1 FROM information_schema.tables WHERE table_schema = $1 AND table_name = $2`,
        [schemaName, table]
      );
      if (exists.rows.length === 0) {
        const publicExists = await client.query(
          `SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = $1`,
          [table]
        );
        if (publicExists.rows.length > 0) {
          await client.query(
            `CREATE TABLE "${schemaName}"."${table}" (LIKE public."${table}" INCLUDING ALL)`
          );
          await createSequencesForTable(client, schemaName, table);
        }
      }
    }
    console.log(`[Tenant] Schema "${schemaName}" created with ${TENANT_TABLES.length} tables`);
  } finally {
    client.release();
  }
}
async function createSequencesForTable(client, schemaName, table) {
  const cols = await client.query(
    `SELECT column_name, column_default FROM information_schema.columns 
     WHERE table_schema = 'public' AND table_name = $1 
     AND column_default LIKE '%gen_random_uuid%'`,
    [table]
  );
  for (const col of cols.rows) {
    await client.query(
      `ALTER TABLE "${schemaName}"."${table}" ALTER COLUMN "${col.column_name}" SET DEFAULT gen_random_uuid()`
    );
  }
}
async function migrateDataToTenantSchema(garageId, garageSlug) {
  const schemaName = getSchemaName(garageSlug);
  const client = await pool.connect();
  const results = [];
  try {
    await client.query("BEGIN");
    const tablesWithGarageId = [
      "services",
      "quotes",
      "invoices",
      "reservations",
      "reviews",
      "delivery_notes",
      "repair_orders"
    ];
    for (const table of tablesWithGarageId) {
      const colCheck = await client.query(
        `SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 AND column_name = 'garage_id'`,
        [table]
      );
      if (colCheck.rows.length === 0) continue;
      const existingCheck = await client.query(
        `SELECT COUNT(*) as cnt FROM "${schemaName}"."${table}"`
      );
      if (parseInt(existingCheck.rows[0].cnt) > 0) {
        results.push({ table, count: 0 });
        continue;
      }
      const cols = await client.query(
        `SELECT column_name FROM information_schema.columns 
         WHERE table_schema = 'public' AND table_name = $1 
         ORDER BY ordinal_position`,
        [table]
      );
      const colNames = cols.rows.map((c) => `"${c.column_name}"`).join(", ");
      const result = await client.query(
        `INSERT INTO "${schemaName}"."${table}" (${colNames})
         SELECT ${colNames} FROM public."${table}" WHERE garage_id = $1`,
        [garageId]
      );
      results.push({ table, count: result.rowCount || 0 });
    }
    const childTables = [
      { table: "quote_items", parentTable: "quotes", fkColumn: "quote_id" },
      { table: "quote_media", parentTable: "quotes", fkColumn: "quote_id" },
      { table: "invoice_items", parentTable: "invoices", fkColumn: "invoice_id" },
      { table: "invoice_media", parentTable: "invoices", fkColumn: "invoice_id" },
      { table: "reservation_services", parentTable: "reservations", fkColumn: "reservation_id" },
      { table: "delivery_note_invoices", parentTable: "delivery_notes", fkColumn: "delivery_note_id" },
      { table: "workshop_tasks", parentTable: "reservations", fkColumn: "reservation_id" }
    ];
    for (const { table, parentTable, fkColumn } of childTables) {
      const tableExists = await client.query(
        `SELECT 1 FROM information_schema.tables WHERE table_schema = $1 AND table_name = $2`,
        [schemaName, table]
      );
      if (tableExists.rows.length === 0) continue;
      const existingCheck = await client.query(
        `SELECT COUNT(*) as cnt FROM "${schemaName}"."${table}"`
      );
      if (parseInt(existingCheck.rows[0].cnt) > 0) {
        results.push({ table, count: 0 });
        continue;
      }
      const cols = await client.query(
        `SELECT column_name FROM information_schema.columns 
         WHERE table_schema = 'public' AND table_name = $1 
         ORDER BY ordinal_position`,
        [table]
      );
      const colNames = cols.rows.map((c) => `"${c.column_name}"`).join(", ");
      const result = await client.query(
        `INSERT INTO "${schemaName}"."${table}" (${colNames})
         SELECT t.${colNames.split(", ").map((c) => `t.${c}`).join(", ")} 
         FROM public."${table}" t
         INNER JOIN "${schemaName}"."${parentTable}" p ON t."${fkColumn}" = p.id`
      );
      results.push({ table, count: result.rowCount || 0 });
    }
    const notifResult = await client.query(
      `INSERT INTO "${schemaName}"."notifications" 
       SELECT n.* FROM public."notifications" n
       INNER JOIN public."users" u ON n.user_id = u.id
       WHERE u.garage_id = $1
       AND NOT EXISTS (SELECT 1 FROM "${schemaName}"."notifications" WHERE id = n.id)`,
      [garageId]
    );
    results.push({ table: "notifications", count: notifResult.rowCount || 0 });
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
  return results;
}
async function withTenantSchema(garageSlug, fn) {
  const schemaName = getSchemaName(garageSlug);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`SET LOCAL search_path TO "${schemaName}", public`);
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err2) {
    await client.query("ROLLBACK");
    throw err2;
  } finally {
    client.release();
  }
}
async function runInTenantContext(garageSlug, queryFn) {
  const schemaName = getSchemaName(garageSlug);
  return queryFn(schemaName);
}
async function setRequestTenantSchema(garageSlug) {
  const schemaName = getSchemaName(garageSlug);
  await db.execute(sql3.raw(`SET search_path TO "${schemaName}", public`));
}
async function resetSearchPath() {
  await db.execute(sql3.raw(`SET search_path TO public`));
}
var TENANT_TABLES, SHARED_TABLES;
var init_tenantContext = __esm({
  "server/tenantContext.ts"() {
    "use strict";
    init_db();
    init_db();
    TENANT_TABLES = [
      "services",
      "quotes",
      "quote_items",
      "invoices",
      "invoice_items",
      "reservations",
      "reservation_services",
      "notifications",
      "quote_media",
      "invoice_media",
      "invoice_counters",
      "delivery_notes",
      "delivery_note_invoices",
      "delivery_note_counters",
      "reviews",
      "engagements",
      "workflows",
      "workflow_steps",
      "service_workflows",
      "workshop_tasks",
      "repair_orders",
      "audit_logs",
      "audit_log_changes",
      "chat_conversations",
      "chat_participants",
      "chat_messages",
      "chat_attachments",
      "expense_categories",
      "expenses",
      "credit_notes",
      "credit_note_items",
      "accounting_entries",
      "accounting_lines",
      "fec_exports",
      "credit_note_counters",
      "expense_counters",
      "notification_rules"
    ];
    SHARED_TABLES = [
      "sessions",
      "garages",
      "users",
      "password_reset_tokens",
      "application_settings"
    ];
  }
});

// server/urlHelper.ts
function getBaseUrl(req) {
  if (process.env.REPLIT_DOMAINS) {
    const domain = process.env.REPLIT_DOMAINS.split(",")[0].trim();
    if (domain) return `https://${domain}`;
  }
  if (process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }
  if (process.env.PUBLIC_BASE_URL) {
    return process.env.PUBLIC_BASE_URL.replace(/\/$/, "");
  }
  if (req) {
    const forwardedHost = req.headers["x-forwarded-host"];
    const forwardedProto = req.headers["x-forwarded-proto"];
    if (forwardedHost) {
      const host2 = Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost.split(",")[0].trim();
      const proto2 = forwardedProto ? Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto.split(",")[0].trim() : "https";
      return `${proto2}://${host2}`;
    }
    const host = req.get("host") || "localhost:5000";
    const proto = req.protocol || "https";
    return `${proto}://${host}`;
  }
  return "https://localhost:5000";
}
function buildUrl(req, path13) {
  const base = getBaseUrl(req);
  const cleanPath = path13.startsWith("/") ? path13 : `/${path13}`;
  return `${base}${cleanPath}`;
}
var init_urlHelper = __esm({
  "server/urlHelper.ts"() {
    "use strict";
  }
});

// server/swagger.ts
var swagger_exports = {};
__export(swagger_exports, {
  registerSwaggerRoutes: () => registerSwaggerRoutes
});
function registerSwaggerRoutes(app3) {
  app3.get("/api/swagger/spec", isAuthenticated, isRootAdmin, (req, res) => {
    const baseUrl = getBaseUrl(req);
    const spec = buildOpenApiSpec(baseUrl);
    res.json(spec);
  });
  app3.get("/api/swagger", isAuthenticated, isRootAdmin, (req, res) => {
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
function buildOpenApiSpec(baseUrl) {
  return {
    openapi: "3.0.3",
    info: {
      title: "AutoReport API",
      version: "2.0.0",
      description: "API compl\xE8te de gestion AutoReport \u2014 Devis, Factures, R\xE9servations, Clients, Comptabilit\xE9, etc.\n\nAuthentification: Session cookie (web) ou Bearer JWT (mobile).",
      contact: { email: "contact@autoreport.com" }
    },
    servers: [{ url: baseUrl, description: "Serveur principal" }],
    tags: [
      { name: "Auth", description: "Authentification (web + mobile)" },
      { name: "Auth Mobile", description: "Authentification JWT mobile" },
      { name: "Utilisateurs", description: "Gestion des utilisateurs" },
      { name: "Clients", description: "Gestion des clients" },
      { name: "Services", description: "Services propos\xE9s" },
      { name: "Devis", description: "Gestion des devis" },
      { name: "Devis - Lignes", description: "Lignes de devis" },
      { name: "Devis - M\xE9dias", description: "Photos/docs associ\xE9s aux devis" },
      { name: "Factures", description: "Gestion des factures" },
      { name: "Factures - Lignes", description: "Lignes de factures" },
      { name: "Factures - M\xE9dias", description: "Photos/docs associ\xE9s aux factures" },
      { name: "R\xE9servations", description: "R\xE9servations / planning" },
      { name: "Ordres de R\xE9paration", description: "Ordres de r\xE9paration atelier" },
      { name: "Workflows", description: "Workflows et \xE9tapes" },
      { name: "Engagements", description: "Engagements / prestations client" },
      { name: "Bons de Livraison", description: "Bons de livraison" },
      { name: "Avis", description: "Avis clients" },
      { name: "D\xE9penses", description: "Gestion des d\xE9penses" },
      { name: "Cat\xE9gories D\xE9penses", description: "Cat\xE9gories de d\xE9penses" },
      { name: "Avoirs", description: "Notes de cr\xE9dit / avoirs" },
      { name: "Comptabilit\xE9", description: "Module comptable" },
      { name: "Paiements", description: "Paiements Stripe" },
      { name: "Notifications", description: "Notifications utilisateur" },
      { name: "R\xE8gles Notifications", description: "R\xE8gles de notifications auto" },
      { name: "Sauvegardes", description: "Sauvegardes et restauration" },
      { name: "Exports", description: "Export de donn\xE9es" },
      { name: "Imports", description: "Import de donn\xE9es (Root Admin)" },
      { name: "OCR", description: "Scan de documents (Mindee)" },
      { name: "Analytics", description: "Tableaux de bord et statistiques" },
      { name: "Audit", description: "Journal d'audit" },
      { name: "SMS", description: "Envoi de SMS (Twilio)" },
      { name: "Stockage", description: "Gestion du stockage cloud" },
      { name: "Chat", description: "Messagerie interne" },
      { name: "IA", description: "Assistant IA" },
      { name: "Param\xE8tres", description: "Configuration de l'application" },
      { name: "Mobile", description: "Routes sp\xE9cifiques mobile" },
      { name: "Mobile Admin", description: "Proxy admin via mobile (m\xEAme routes que /api/admin/*)" },
      { name: "Public", description: "Routes publiques (sans auth)" }
    ],
    components: {
      securitySchemes: {
        sessionCookie: { type: "apiKey", in: "cookie", name: "autoreport.sid", description: "Session cookie (web)" },
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT", description: "JWT Token (mobile)" }
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
            garageId: { type: "string", format: "uuid" }
          }
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
            licensePlate: { type: "string" }
          }
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
            paymentMethod: { type: "string" }
          }
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
            vehicleModel: { type: "string" }
          }
        },
        Service: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            description: { type: "string" },
            basePrice: { type: "string" },
            duration: { type: "integer" },
            category: { type: "string" }
          }
        },
        LoginResponse: {
          type: "object",
          properties: {
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
            tokenType: { type: "string", example: "Bearer" },
            user: { $ref: "#/components/schemas/User" }
          }
        }
      }
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
      ...mobileAdminProxyInfo()
    }
  };
}
function ok(desc4, schema) {
  const r = { description: desc4 };
  if (schema) r.content = { "application/json": { schema } };
  return r;
}
function ref(s) {
  return { $ref: `#/components/schemas/${s}` };
}
function arr(s) {
  return { type: "array", items: ref(s) };
}
function err(code, desc4) {
  return { description: `${code} - ${desc4}`, content: { "application/json": { schema: ref("Error") } } };
}
function body(schema) {
  return { required: true, content: { "application/json": { schema } } };
}
function idParam(name = "id") {
  return { name, in: "path", required: true, schema: { type: "string", format: "uuid" } };
}
function qp(name, desc4, type = "string") {
  return { name, in: "query", schema: { type }, description: desc4 };
}
function authPaths() {
  return {
    "/api/login": {
      post: {
        tags: ["Auth"],
        summary: "Connexion (web session)",
        requestBody: body({ type: "object", required: ["email", "password"], properties: { email: { type: "string" }, password: { type: "string" } } }),
        responses: { "200": ok("Connexion r\xE9ussie", ref("User")), "401": err("401", "Identifiants incorrects") }
      }
    },
    "/api/logout": { post: { tags: ["Auth"], summary: "D\xE9connexion", responses: { "200": ok("D\xE9connexion r\xE9ussie") } } },
    "/api/register": {
      post: {
        tags: ["Auth"],
        summary: "Inscription (client)",
        requestBody: body({ type: "object", required: ["email", "password"], properties: { email: { type: "string" }, password: { type: "string" }, firstName: { type: "string" }, lastName: { type: "string" }, role: { type: "string", enum: ["client", "client_professionnel"] }, companyName: { type: "string" }, siret: { type: "string" } } }),
        responses: { "200": ok("Utilisateur cr\xE9\xE9", ref("User")), "400": err("400", "Email d\xE9j\xE0 utilis\xE9") }
      }
    },
    "/api/auth/user": { get: { tags: ["Auth"], summary: "Utilisateur connect\xE9", responses: { "200": ok("Utilisateur courant", ref("User")), "401": err("401", "Non authentifi\xE9") } } },
    "/api/auth/reset-password": {
      post: {
        tags: ["Auth"],
        summary: "Demande de r\xE9initialisation mot de passe",
        requestBody: body({ type: "object", required: ["email"], properties: { email: { type: "string" } } }),
        responses: { "200": ok("Email envoy\xE9") }
      }
    }
  };
}
function mobileAuthPaths() {
  return {
    "/api/mobile/auth/login": {
      post: {
        tags: ["Auth Mobile"],
        summary: "Connexion mobile (JWT)",
        requestBody: body({ type: "object", required: ["email", "password"], properties: { email: { type: "string" }, password: { type: "string" } } }),
        responses: { "200": ok("Tokens JWT", ref("LoginResponse")), "401": err("401", "Identifiants incorrects") }
      }
    },
    "/api/mobile/auth/me": { get: { tags: ["Auth Mobile"], summary: "Profil utilisateur mobile", security: [{ bearerAuth: [] }], responses: { "200": ok("Utilisateur", ref("User")) } } },
    "/api/mobile/refresh-token": {
      post: {
        tags: ["Auth Mobile"],
        summary: "Renouveler le token JWT",
        requestBody: body({ type: "object", required: ["refreshToken"], properties: { refreshToken: { type: "string" } } }),
        responses: { "200": ok("Nouveaux tokens", ref("LoginResponse")), "401": err("401", "Token invalide") }
      }
    }
  };
}
function crudPaths(basePath, tag, schemaName, extra) {
  const paths = {};
  paths[basePath] = {
    get: { tags: [tag], summary: `Lister les ${tag.toLowerCase()}`, responses: { "200": ok(`Liste des ${tag.toLowerCase()}`, arr(schemaName)) } },
    post: { tags: [tag], summary: `Cr\xE9er un(e) ${tag.toLowerCase()}`, requestBody: body(ref(schemaName)), responses: { "201": ok("Cr\xE9\xE9", ref(schemaName)) } }
  };
  paths[`${basePath}/{id}`] = {
    get: { tags: [tag], summary: `D\xE9tail ${tag.toLowerCase()}`, parameters: [idParam()], responses: { "200": ok("D\xE9tail", ref(schemaName)), "404": err("404", "Non trouv\xE9") } },
    patch: { tags: [tag], summary: `Modifier ${tag.toLowerCase()}`, parameters: [idParam()], requestBody: body(ref(schemaName)), responses: { "200": ok("Modifi\xE9", ref(schemaName)) } },
    delete: { tags: [tag], summary: `Supprimer ${tag.toLowerCase()}`, parameters: [idParam()], responses: { "200": ok("Supprim\xE9") } }
  };
  if (extra) Object.assign(paths, extra);
  return paths;
}
function userPaths() {
  return crudPaths("/api/admin/users", "Utilisateurs", "User", {
    "/api/admin/users/{id}/password": { patch: { tags: ["Utilisateurs"], summary: "Changer mot de passe", parameters: [idParam()], requestBody: body({ type: "object", properties: { password: { type: "string" } } }), responses: { "200": ok("Modifi\xE9") } } }
  });
}
function clientPaths() {
  return { "/api/admin/clients": { post: { tags: ["Clients"], summary: "Cr\xE9er un client", requestBody: body(ref("User")), responses: { "201": ok("Client cr\xE9\xE9", ref("User")) } } } };
}
function servicePaths() {
  return crudPaths("/api/admin/services", "Services", "Service");
}
function quotePaths() {
  return crudPaths("/api/admin/quotes", "Devis", "Quote", {
    "/api/admin/quotes/{id}/send-email": { post: { tags: ["Devis"], summary: "Envoyer le devis par email", parameters: [idParam()], responses: { "200": ok("Email envoy\xE9") } } }
  });
}
function quoteItemPaths() {
  return {
    "/api/admin/quotes/{id}/items": {
      get: { tags: ["Devis - Lignes"], summary: "Lister les lignes du devis", parameters: [idParam()], responses: { "200": ok("Lignes") } },
      post: { tags: ["Devis - Lignes"], summary: "Ajouter une ligne", parameters: [idParam()], requestBody: body({ type: "object", properties: { description: { type: "string" }, quantity: { type: "number" }, unitPrice: { type: "string" }, tvaRate: { type: "string" } } }), responses: { "201": ok("Ligne ajout\xE9e") } }
    },
    "/api/admin/quote-items/{id}": {
      patch: { tags: ["Devis - Lignes"], summary: "Modifier une ligne", parameters: [idParam()], responses: { "200": ok("Modifi\xE9e") } },
      delete: { tags: ["Devis - Lignes"], summary: "Supprimer une ligne", parameters: [idParam()], responses: { "200": ok("Supprim\xE9e") } }
    }
  };
}
function quoteMediaPaths() {
  return {
    "/api/admin/quotes/{id}/media": {
      get: { tags: ["Devis - M\xE9dias"], summary: "Lister les m\xE9dias du devis", parameters: [idParam()], responses: { "200": ok("M\xE9dias") } },
      post: { tags: ["Devis - M\xE9dias"], summary: "Ajouter un m\xE9dia", parameters: [idParam()], requestBody: { content: { "multipart/form-data": { schema: { type: "object", properties: { media: { type: "string", format: "binary" } } } } } }, responses: { "200": ok("M\xE9dia ajout\xE9") } }
    },
    "/api/admin/quote-media/{mediaId}": { delete: { tags: ["Devis - M\xE9dias"], summary: "Supprimer un m\xE9dia", parameters: [{ name: "mediaId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Supprim\xE9") } } },
    "/api/admin/quotes/{id}/media/download-zip": { get: { tags: ["Devis - M\xE9dias"], summary: "T\xE9l\xE9charger les m\xE9dias en ZIP", parameters: [idParam()], responses: { "200": { description: "Fichier ZIP", content: { "application/zip": {} } } } } }
  };
}
function invoicePaths() {
  return crudPaths("/api/admin/invoices", "Factures", "Invoice", {
    "/api/admin/invoices/direct": { post: { tags: ["Factures"], summary: "Cr\xE9er une facture directe (sans devis)", requestBody: body(ref("Invoice")), responses: { "201": ok("Facture cr\xE9\xE9e") } } },
    "/api/admin/invoices/{id}/send-email": { post: { tags: ["Factures"], summary: "Envoyer la facture par email", parameters: [idParam()], responses: { "200": ok("Email envoy\xE9") } } },
    "/api/admin/clients/{clientId}/invoices": { get: { tags: ["Factures"], summary: "Factures d'un client", parameters: [{ name: "clientId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Factures") } } }
  });
}
function invoiceItemPaths() {
  return {
    "/api/admin/invoices/{id}/items": {
      get: { tags: ["Factures - Lignes"], summary: "Lister les lignes", parameters: [idParam()], responses: { "200": ok("Lignes") } },
      post: { tags: ["Factures - Lignes"], summary: "Ajouter une ligne", parameters: [idParam()], responses: { "201": ok("Ajout\xE9e") } }
    },
    "/api/admin/invoice-items/{id}": {
      patch: { tags: ["Factures - Lignes"], summary: "Modifier une ligne", parameters: [idParam()], responses: { "200": ok("Modifi\xE9e") } },
      delete: { tags: ["Factures - Lignes"], summary: "Supprimer une ligne", parameters: [idParam()], responses: { "200": ok("Supprim\xE9e") } }
    }
  };
}
function invoiceMediaPaths() {
  return {
    "/api/admin/invoices/{id}/media": {
      get: { tags: ["Factures - M\xE9dias"], summary: "Lister les m\xE9dias", parameters: [idParam()], responses: { "200": ok("M\xE9dias") } },
      post: { tags: ["Factures - M\xE9dias"], summary: "Ajouter un m\xE9dia", parameters: [idParam()], responses: { "200": ok("Ajout\xE9") } }
    },
    "/api/admin/invoice-media/{mediaId}": { delete: { tags: ["Factures - M\xE9dias"], summary: "Supprimer un m\xE9dia", parameters: [{ name: "mediaId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Supprim\xE9") } } },
    "/api/admin/invoices/{id}/media/download-zip": { get: { tags: ["Factures - M\xE9dias"], summary: "T\xE9l\xE9charger en ZIP", parameters: [idParam()], responses: { "200": { description: "ZIP", content: { "application/zip": {} } } } } }
  };
}
function reservationPaths() {
  return crudPaths("/api/admin/reservations", "R\xE9servations", "Reservation", {
    "/api/admin/reservations/{id}/services": { get: { tags: ["R\xE9servations"], summary: "Services associ\xE9s", parameters: [idParam()], responses: { "200": ok("Services") } } }
  });
}
function repairOrderPaths() {
  return crudPaths("/api/admin/repair-orders", "Ordres de R\xE9paration", "Error", {
    "/api/admin/repair-orders/reservation/{reservationId}": { get: { tags: ["Ordres de R\xE9paration"], summary: "OR par r\xE9servation", parameters: [{ name: "reservationId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Ordres") } } }
  });
}
function workflowPaths() {
  return {
    ...crudPaths("/api/admin/workflows", "Workflows", "Error"),
    "/api/admin/workflows/{workflowId}/steps": { get: { tags: ["Workflows"], summary: "\xC9tapes du workflow", parameters: [{ name: "workflowId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("\xC9tapes") } } },
    "/api/admin/workflow-steps": { post: { tags: ["Workflows"], summary: "Cr\xE9er une \xE9tape", responses: { "201": ok("\xC9tape cr\xE9\xE9e") } } },
    "/api/admin/workflow-steps/{stepId}": {
      patch: { tags: ["Workflows"], summary: "Modifier une \xE9tape", parameters: [{ name: "stepId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Modifi\xE9e") } },
      delete: { tags: ["Workflows"], summary: "Supprimer une \xE9tape", parameters: [{ name: "stepId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Supprim\xE9e") } }
    },
    "/api/admin/services/{serviceId}/workflows": {
      get: { tags: ["Workflows"], summary: "Workflows d'un service", parameters: [{ name: "serviceId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Workflows") } },
      post: { tags: ["Workflows"], summary: "Lier un workflow \xE0 un service", parameters: [{ name: "serviceId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Li\xE9") } }
    },
    "/api/admin/init-all-default-workflows": { post: { tags: ["Workflows"], summary: "Initialiser les workflows par d\xE9faut pour tous les services", responses: { "200": ok("Initialis\xE9s") } } }
  };
}
function engagementPaths() {
  return crudPaths("/api/admin/engagements", "Engagements", "Error", {
    "/api/admin/engagements/summary/{clientId}": { get: { tags: ["Engagements"], summary: "R\xE9sum\xE9 engagements client", parameters: [{ name: "clientId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("R\xE9sum\xE9") } } },
    "/api/admin/engagements/clients-summary": { get: { tags: ["Engagements"], summary: "R\xE9sum\xE9 tous clients", responses: { "200": ok("R\xE9sum\xE9 global") } } }
  });
}
function deliveryNotePaths() {
  return crudPaths("/api/admin/delivery-notes", "Bons de Livraison", "Error");
}
function reviewPaths() {
  return {
    "/api/admin/reviews": { get: { tags: ["Avis"], summary: "Lister les avis", responses: { "200": ok("Avis") } } },
    "/api/admin/reviews/{id}/approve": { patch: { tags: ["Avis"], summary: "Approuver/publier un avis", parameters: [idParam()], responses: { "200": ok("Approuv\xE9") } } },
    "/api/admin/reviews/{id}": { delete: { tags: ["Avis"], summary: "Supprimer un avis", parameters: [idParam()], responses: { "200": ok("Supprim\xE9") } } }
  };
}
function expensePaths() {
  return crudPaths("/api/admin/expenses", "D\xE9penses", "Error");
}
function expenseCategoryPaths() {
  return crudPaths("/api/admin/expense-categories", "Cat\xE9gories D\xE9penses", "Error");
}
function creditNotePaths() {
  return {
    "/api/admin/credit-notes": {
      get: { tags: ["Avoirs"], summary: "Lister les avoirs", responses: { "200": ok("Avoirs") } },
      post: { tags: ["Avoirs"], summary: "Cr\xE9er un avoir", responses: { "201": ok("Cr\xE9\xE9") } }
    },
    "/api/admin/credit-notes/{id}": {
      get: { tags: ["Avoirs"], summary: "D\xE9tail avoir", parameters: [idParam()], responses: { "200": ok("Avoir") } },
      patch: { tags: ["Avoirs"], summary: "Modifier un avoir", parameters: [idParam()], responses: { "200": ok("Modifi\xE9") } }
    }
  };
}
function accountingPaths() {
  return {
    "/api/admin/accounting/entries": {
      get: { tags: ["Comptabilit\xE9"], summary: "\xC9critures comptables", parameters: [qp("startDate", "Date d\xE9but"), qp("endDate", "Date fin")], responses: { "200": ok("\xC9critures") } },
      post: { tags: ["Comptabilit\xE9"], summary: "Cr\xE9er une \xE9criture", responses: { "201": ok("Cr\xE9\xE9e") } }
    },
    "/api/admin/accounting/entries/{id}": { get: { tags: ["Comptabilit\xE9"], summary: "D\xE9tail \xE9criture", parameters: [idParam()], responses: { "200": ok("\xC9criture") } } },
    "/api/admin/accounting/entries/{id}/validate": { patch: { tags: ["Comptabilit\xE9"], summary: "Valider une \xE9criture", parameters: [idParam()], responses: { "200": ok("Valid\xE9e") } } },
    "/api/admin/accounting/backfill-invoices": { post: { tags: ["Comptabilit\xE9"], summary: "Rattrapage \xE9critures depuis factures", responses: { "200": ok("Rattrapage effectu\xE9") } } },
    "/api/admin/accounting/tva-report": { get: { tags: ["Comptabilit\xE9"], summary: "Rapport TVA", parameters: [qp("startDate", "D\xE9but"), qp("endDate", "Fin")], responses: { "200": ok("Rapport TVA") } } },
    "/api/admin/accounting/profit-loss": { get: { tags: ["Comptabilit\xE9"], summary: "Compte de r\xE9sultat", responses: { "200": ok("P&L") } } },
    "/api/admin/accounting/cash-flow": { get: { tags: ["Comptabilit\xE9"], summary: "Flux de tr\xE9sorerie", responses: { "200": ok("Cash flow") } } },
    "/api/admin/accounting/fec-export": { post: { tags: ["Comptabilit\xE9"], summary: "Export FEC", responses: { "200": ok("FEC g\xE9n\xE9r\xE9") } } },
    "/api/admin/accounting/fec-exports": { get: { tags: ["Comptabilit\xE9"], summary: "Liste exports FEC", responses: { "200": ok("Exports") } } },
    "/api/admin/accounting/dossier-validation": { get: { tags: ["Comptabilit\xE9"], summary: "Validation dossier comptable", responses: { "200": ok("Validation") } } },
    "/api/admin/accounting/dossier-export": { post: { tags: ["Comptabilit\xE9"], summary: "Export dossier comptable", responses: { "200": ok("Dossier") } } },
    "/api/admin/accounting/e-invoicing/compliance": { get: { tags: ["Comptabilit\xE9"], summary: "Conformit\xE9 e-invoicing", responses: { "200": ok("Statut") } } }
  };
}
function paymentPaths() {
  return {
    "/api/admin/payment/generate-link": { post: { tags: ["Paiements"], summary: "G\xE9n\xE9rer un lien de paiement", requestBody: body({ type: "object", properties: { invoiceId: { type: "string" } } }), responses: { "200": ok("Lien g\xE9n\xE9r\xE9") } } },
    "/api/admin/payments": { get: { tags: ["Paiements"], summary: "Lister les paiements", responses: { "200": ok("Paiements") } } }
  };
}
function notificationPaths() {
  return {
    "/api/notifications": { get: { tags: ["Notifications"], summary: "Mes notifications", responses: { "200": ok("Notifications") } } },
    "/api/notifications/unread-count": { get: { tags: ["Notifications"], summary: "Nombre non lues", responses: { "200": ok("Compteur") } } },
    "/api/notifications/{id}/read": { patch: { tags: ["Notifications"], summary: "Marquer comme lue", parameters: [idParam()], responses: { "200": ok("Lu") } } },
    "/api/notifications/mark-all-read": { post: { tags: ["Notifications"], summary: "Tout marquer comme lu", responses: { "200": ok("OK") } } }
  };
}
function notificationRulePaths() {
  return crudPaths("/api/admin/notification-rules", "R\xE8gles Notifications", "Error");
}
function backupPaths() {
  return {
    "/api/admin/backups": {
      get: { tags: ["Sauvegardes"], summary: "Lister les sauvegardes", responses: { "200": ok("Sauvegardes") } },
      post: { tags: ["Sauvegardes"], summary: "Cr\xE9er une sauvegarde m\xE9dias", responses: { "200": ok("Sauvegarde cr\xE9\xE9e") } }
    },
    "/api/admin/backups/stats": { get: { tags: ["Sauvegardes"], summary: "Statistiques de stockage", responses: { "200": ok("Stats") } } },
    "/api/admin/backups/{name}/download": { get: { tags: ["Sauvegardes"], summary: "T\xE9l\xE9charger une sauvegarde", parameters: [{ name: "name", in: "path", required: true, schema: { type: "string" } }], responses: { "200": { description: "Fichier", content: { "application/octet-stream": {} } } } } },
    "/api/admin/backups/{name}": { delete: { tags: ["Sauvegardes"], summary: "Supprimer une sauvegarde (Super Admin)", parameters: [{ name: "name", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Supprim\xE9e") } } },
    "/api/admin/backup-scheduler": {
      get: { tags: ["Sauvegardes"], summary: "Config planificateur", responses: { "200": ok("Config") } },
      post: { tags: ["Sauvegardes"], summary: "Configurer planificateur", responses: { "200": ok("OK") } }
    },
    "/api/admin/backup-now": { post: { tags: ["Sauvegardes"], summary: "Sauvegarde imm\xE9diate", responses: { "200": ok("Lanc\xE9e") } } },
    "/api/admin/restore": { post: { tags: ["Sauvegardes"], summary: "Restaurer depuis JSON", responses: { "200": ok("Restaur\xE9") } } }
  };
}
function exportPaths() {
  return {
    "/api/admin/export-data": { get: { tags: ["Exports"], summary: "Export JSON complet (Super Admin)", responses: { "200": { description: "JSON", content: { "application/json": {} } } } } },
    "/api/admin/export-database": { get: { tags: ["Exports"], summary: "Export base de donn\xE9es SQL", responses: { "200": { description: "SQL", content: { "application/sql": {} } } } } },
    "/api/admin/export/quotes": { get: { tags: ["Exports"], summary: "Export devis CSV/Excel", parameters: [qp("format", "csv ou xlsx")], responses: { "200": { description: "Fichier" } } } },
    "/api/admin/export/invoices": { get: { tags: ["Exports"], summary: "Export factures CSV/Excel", parameters: [qp("format", "csv ou xlsx")], responses: { "200": { description: "Fichier" } } } }
  };
}
function importPaths() {
  return {
    "/api/admin/import/csv": { post: { tags: ["Imports"], summary: "Import CSV en masse (Root Admin)", requestBody: { content: { "multipart/form-data": { schema: { type: "object", properties: { file: { type: "string", format: "binary" }, type: { type: "string" } } } } } }, responses: { "200": ok("Import\xE9") } } },
    "/api/admin/import-data": { post: { tags: ["Imports"], summary: "Import JSON (Root Admin)", responses: { "200": ok("Import\xE9") } } },
    "/api/admin/import-sql": { post: { tags: ["Imports"], summary: "Import SQL (Root Admin)", responses: { "200": ok("Import\xE9") } } },
    "/api/admin/import-media": { post: { tags: ["Imports"], summary: "Import m\xE9dias (Root Admin)", responses: { "200": ok("Import\xE9") } } }
  };
}
function ocrPaths() {
  return {
    "/api/admin/ocr/history": { get: { tags: ["OCR"], summary: "Historique des scans", responses: { "200": ok("Scans") } } },
    "/api/admin/ocr/history/{id}": {
      get: { tags: ["OCR"], summary: "D\xE9tail scan", parameters: [idParam()], responses: { "200": ok("Scan") } },
      delete: { tags: ["OCR"], summary: "Supprimer scan", parameters: [idParam()], responses: { "200": ok("Supprim\xE9") } }
    },
    "/api/admin/ocr/create-quote": { post: { tags: ["OCR"], summary: "Cr\xE9er devis depuis OCR", responses: { "201": ok("Devis cr\xE9\xE9") } } },
    "/api/admin/ocr/create-invoice": { post: { tags: ["OCR"], summary: "Cr\xE9er facture depuis OCR", responses: { "201": ok("Facture cr\xE9\xE9e") } } },
    "/api/admin/ocr/create-credit-note": { post: { tags: ["OCR"], summary: "Cr\xE9er avoir depuis OCR", responses: { "201": ok("Avoir cr\xE9\xE9") } } },
    "/api/admin/ocr/create-expense": { post: { tags: ["OCR"], summary: "Cr\xE9er d\xE9pense depuis OCR", responses: { "201": ok("D\xE9pense cr\xE9\xE9e") } } }
  };
}
function analyticsPaths() {
  return {
    "/api/admin/analytics": { get: { tags: ["Analytics"], summary: "Dashboard principal", responses: { "200": ok("Analytics") } } },
    "/api/admin/advanced-analytics": { get: { tags: ["Analytics"], summary: "Analytics avanc\xE9es", parameters: [qp("startDate", "D\xE9but"), qp("endDate", "Fin")], responses: { "200": ok("Analytics avanc\xE9es") } } }
  };
}
function auditPaths() {
  return {
    "/api/admin/audit-logs": { get: { tags: ["Audit"], summary: "Journal d'audit", parameters: [qp("page", "Page", "integer"), qp("limit", "Par page", "integer")], responses: { "200": ok("Logs") } } },
    "/api/admin/audit-logs/{id}": { get: { tags: ["Audit"], summary: "D\xE9tail entr\xE9e audit", parameters: [idParam()], responses: { "200": ok("Entr\xE9e") } } },
    "/api/admin/entity-history/{entityType}/{entityId}": { get: { tags: ["Audit"], summary: "Historique d'une entit\xE9", parameters: [{ name: "entityType", in: "path", required: true, schema: { type: "string" } }, { name: "entityId", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Historique") } } }
  };
}
function smsPaths() {
  return {
    "/api/admin/sms/logs": { get: { tags: ["SMS"], summary: "Historique SMS", responses: { "200": ok("Logs SMS") } } },
    "/api/admin/sms/stats": { get: { tags: ["SMS"], summary: "Statistiques SMS", responses: { "200": ok("Stats") } } },
    "/api/admin/sms/test": { post: { tags: ["SMS"], summary: "Envoyer SMS test", requestBody: body({ type: "object", properties: { to: { type: "string" }, message: { type: "string" } } }), responses: { "200": ok("Envoy\xE9") } } }
  };
}
function storagePaths() {
  return {
    "/api/admin/storage/status": { get: { tags: ["Stockage"], summary: "Statut du stockage", responses: { "200": ok("Statut") } } },
    "/api/admin/r2/files": { get: { tags: ["Stockage"], summary: "Fichiers R2", responses: { "200": ok("Fichiers") } } },
    "/api/admin/r2/migrate-local": { post: { tags: ["Stockage"], summary: "Migrer fichiers locaux vers cloud", responses: { "200": ok("Migration lanc\xE9e") } } }
  };
}
function chatPaths() {
  return {
    "/api/mobile/chat/conversations": {
      get: { tags: ["Chat"], summary: "Mes conversations", security: [{ bearerAuth: [] }], responses: { "200": ok("Conversations") } },
      post: { tags: ["Chat"], summary: "Cr\xE9er conversation", security: [{ bearerAuth: [] }], requestBody: body({ type: "object", properties: { title: { type: "string" }, participantIds: { type: "array", items: { type: "string" } }, type: { type: "string" } } }), responses: { "200": ok("Conversation") } }
    },
    "/api/mobile/chat/conversations/{id}/messages": {
      get: { tags: ["Chat"], summary: "Messages d'une conversation", security: [{ bearerAuth: [] }], parameters: [idParam()], responses: { "200": ok("Messages") } },
      post: { tags: ["Chat"], summary: "Envoyer un message", security: [{ bearerAuth: [] }], parameters: [idParam()], requestBody: body({ type: "object", required: ["content"], properties: { content: { type: "string" } } }), responses: { "200": ok("Message envoy\xE9") } }
    }
  };
}
function aiPaths() {
  return {
    "/api/mobile/ai/assistant": { post: { tags: ["IA"], summary: "Assistant IA", security: [{ bearerAuth: [] }], requestBody: body({ type: "object", required: ["messages"], properties: { messages: { type: "array", items: { type: "object", properties: { role: { type: "string" }, content: { type: "string" } } } } } }), responses: { "200": ok("R\xE9ponse IA") } } }
  };
}
function settingsPaths() {
  return {
    "/api/admin/settings": {
      get: { tags: ["Param\xE8tres"], summary: "Param\xE8tres de l'application", responses: { "200": ok("Param\xE8tres") } },
      patch: { tags: ["Param\xE8tres"], summary: "Modifier les param\xE8tres", responses: { "200": ok("Modifi\xE9s") } }
    },
    "/api/admin/garage-legal": {
      get: { tags: ["Param\xE8tres"], summary: "Informations l\xE9gales du garage", responses: { "200": ok("Info l\xE9gales") } },
      patch: { tags: ["Param\xE8tres"], summary: "Modifier les infos l\xE9gales", responses: { "200": ok("Modifi\xE9es") } }
    },
    "/api/admin/daily-report/test": { post: { tags: ["Param\xE8tres"], summary: "Envoyer rapport test", responses: { "200": ok("Envoy\xE9") } } },
    "/api/admin/cache/clear": { post: { tags: ["Param\xE8tres"], summary: "Vider le cache", responses: { "200": ok("Cache vid\xE9") } } },
    "/api/admin/search-entity": { get: { tags: ["Param\xE8tres"], summary: "Rechercher devis/facture par r\xE9f\xE9rence", parameters: [qp("q", "R\xE9f\xE9rence")], responses: { "200": ok("R\xE9sultats") } } }
  };
}
function publicPaths() {
  return {
    "/api/public/quotes/{token}": { get: { tags: ["Public"], summary: "Consulter un devis (lien public)", parameters: [{ name: "token", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Devis"), "404": err("404", "Non trouv\xE9") }, security: [] } },
    "/api/public/invoices/{token}": { get: { tags: ["Public"], summary: "Consulter une facture (lien public)", parameters: [{ name: "token", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Facture") }, security: [] } },
    "/api/public/reviews/{token}": { get: { tags: ["Public"], summary: "Consulter/laisser un avis (lien public)", parameters: [{ name: "token", in: "path", required: true, schema: { type: "string" } }], responses: { "200": ok("Avis") }, security: [] } },
    "/api/quotes/{id}/pdf": { get: { tags: ["Public"], summary: "Donn\xE9es PDF devis", parameters: [idParam()], responses: { "200": ok("Donn\xE9es PDF") }, security: [] } },
    "/api/invoices/{id}/pdf": { get: { tags: ["Public"], summary: "Donn\xE9es PDF facture", parameters: [idParam()], responses: { "200": ok("Donn\xE9es PDF") }, security: [] } }
  };
}
function mobileSpecificPaths() {
  return {
    "/api/mobile/profile": {
      get: { tags: ["Mobile"], summary: "Mon profil", security: [{ bearerAuth: [] }], responses: { "200": ok("Profil", ref("User")) } },
      patch: { tags: ["Mobile"], summary: "Modifier mon profil", security: [{ bearerAuth: [] }], responses: { "200": ok("Modifi\xE9") } }
    },
    "/api/mobile/profile/avatar": { post: { tags: ["Mobile"], summary: "Changer mon avatar", security: [{ bearerAuth: [] }], requestBody: { content: { "multipart/form-data": { schema: { type: "object", properties: { avatar: { type: "string", format: "binary" } } } } } }, responses: { "200": ok("Avatar mis \xE0 jour") } } },
    "/api/mobile/quotes": {
      get: { tags: ["Mobile"], summary: "Mes devis (selon r\xF4le)", security: [{ bearerAuth: [] }], responses: { "200": ok("Devis", arr("Quote")) } },
      post: { tags: ["Mobile"], summary: "Cr\xE9er un devis avec photos", security: [{ bearerAuth: [] }], responses: { "201": ok("Devis cr\xE9\xE9") } }
    },
    "/api/mobile/quotes/{id}": { get: { tags: ["Mobile"], summary: "D\xE9tail devis", security: [{ bearerAuth: [] }], parameters: [idParam()], responses: { "200": ok("Devis", ref("Quote")) } } },
    "/api/mobile/invoices": { get: { tags: ["Mobile"], summary: "Mes factures (selon r\xF4le)", security: [{ bearerAuth: [] }], responses: { "200": ok("Factures", arr("Invoice")) } } },
    "/api/mobile/invoices/{id}": { get: { tags: ["Mobile"], summary: "D\xE9tail facture", security: [{ bearerAuth: [] }], parameters: [idParam()], responses: { "200": ok("Facture", ref("Invoice")) } } },
    "/api/mobile/reservations": { get: { tags: ["Mobile"], summary: "Mes r\xE9servations", security: [{ bearerAuth: [] }], responses: { "200": ok("R\xE9servations", arr("Reservation")) } } },
    "/api/mobile/services": { get: { tags: ["Mobile"], summary: "Services disponibles", security: [{ bearerAuth: [] }], responses: { "200": ok("Services", arr("Service")) } } },
    "/api/mobile/notifications": { get: { tags: ["Mobile"], summary: "Mes notifications", security: [{ bearerAuth: [] }], responses: { "200": ok("Notifications") } } },
    "/api/mobile/notifications/unread-count": { get: { tags: ["Mobile"], summary: "Notifications non lues", security: [{ bearerAuth: [] }], responses: { "200": ok("Compteur") } } },
    "/api/mobile/upload": { post: { tags: ["Mobile"], summary: "Upload image", security: [{ bearerAuth: [] }], requestBody: { content: { "multipart/form-data": { schema: { type: "object", properties: { image: { type: "string", format: "binary" }, folder: { type: "string" } } } } } }, responses: { "200": ok("URL du fichier") } } },
    "/api/mobile/upload/multiple": { post: { tags: ["Mobile"], summary: "Upload multiple images (max 10)", security: [{ bearerAuth: [] }], responses: { "200": ok("URLs") } } },
    "/api/mobile/routes": { get: { tags: ["Mobile"], summary: "Catalogue des routes API", security: [{ bearerAuth: [] }], responses: { "200": ok("Routes disponibles") } } }
  };
}
function mobileAdminProxyInfo() {
  return {
    "/api/mobile/admin/{path}": {
      get: {
        tags: ["Mobile Admin"],
        summary: "Proxy Admin (GET) - Toutes les routes /api/admin/* sont accessibles via /api/mobile/admin/*",
        description: "Ce proxy redirige automatiquement les requ\xEAtes `/api/mobile/admin/*` vers `/api/admin/*`.\nAuthentification par Bearer JWT requise.\nToutes les fonctionnalit\xE9s admin (170+ routes) sont ainsi disponibles sur mobile.",
        parameters: [{ name: "path", in: "path", required: true, schema: { type: "string" }, description: "Sous-chemin admin (ex: quotes, invoices, users...)" }],
        security: [{ bearerAuth: [] }],
        responses: { "200": ok("R\xE9ponse admin"), "401": err("401", "Non authentifi\xE9"), "403": err("403", "Acc\xE8s refus\xE9") }
      },
      post: { tags: ["Mobile Admin"], summary: "Proxy Admin (POST)", parameters: [{ name: "path", in: "path", required: true, schema: { type: "string" } }], security: [{ bearerAuth: [] }], responses: { "200": ok("R\xE9ponse admin") } },
      patch: { tags: ["Mobile Admin"], summary: "Proxy Admin (PATCH)", parameters: [{ name: "path", in: "path", required: true, schema: { type: "string" } }], security: [{ bearerAuth: [] }], responses: { "200": ok("R\xE9ponse admin") } },
      delete: { tags: ["Mobile Admin"], summary: "Proxy Admin (DELETE)", parameters: [{ name: "path", in: "path", required: true, schema: { type: "string" } }], security: [{ bearerAuth: [] }], responses: { "200": ok("R\xE9ponse admin") } }
    }
  };
}
var init_swagger = __esm({
  "server/swagger.ts"() {
    "use strict";
    init_localAuth();
    init_urlHelper();
  }
});

// server/plaidService.ts
var plaidService_exports = {};
__export(plaidService_exports, {
  createLinkToken: () => createLinkToken,
  exchangePublicToken: () => exchangePublicToken,
  getAccounts: () => getAccounts,
  getBalances: () => getBalances,
  isPlaidConfigured: () => isPlaidConfigured
});
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from "plaid";
import fs5 from "fs";
import path7 from "path";
function loadTokens() {
  try {
    if (fs5.existsSync(TOKENS_FILE)) {
      const data = fs5.readFileSync(TOKENS_FILE, "utf-8");
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (e) {
    console.error("Error loading Plaid tokens:", e);
  }
  return [];
}
function saveTokens(tokens) {
  try {
    fs5.writeFileSync(TOKENS_FILE, JSON.stringify(tokens), "utf-8");
  } catch (e) {
    console.error("Error saving Plaid tokens:", e);
  }
}
function getPlaidClient() {
  if (!plaidClient) {
    const clientId = process.env.PLAID_CLIENT_ID || "testing";
    const secret = process.env.PLAID_SECRET || "testing";
    if (!clientId || !secret) {
      throw new Error("PLAID_CLIENT_ID et PLAID_SECRET doivent \xEAtre configur\xE9s.");
    }
    const env = process.env.PLAID_ENV === "production" ? PlaidEnvironments.production : PlaidEnvironments.development;
    console.log(`[Plaid] Initializing with environment: ${process.env.PLAID_ENV || "sandbox (defaulted to development)"}`);
    const configuration = new Configuration({
      basePath: env,
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": clientId,
          "PLAID-SECRET": secret
        }
      }
    });
    plaidClient = new PlaidApi(configuration);
  }
  return plaidClient;
}
async function createLinkToken(userId) {
  const client = getPlaidClient();
  const response = await client.linkTokenCreate({
    user: { client_user_id: userId },
    client_name: "AutoReport",
    products: [Products.Auth, Products.Transactions],
    country_codes: [CountryCode.Fr],
    language: "fr"
  });
  return response.data.link_token;
}
async function exchangePublicToken(publicToken) {
  const client = getPlaidClient();
  const response = await client.itemPublicTokenExchange({
    public_token: publicToken
  });
  const accessToken = response.data.access_token;
  const itemId = response.data.item_id;
  const tokens = loadTokens();
  if (!tokens.includes(accessToken)) {
    tokens.push(accessToken);
    saveTokens(tokens);
  }
  return { access_token: accessToken, item_id: itemId };
}
async function getAccounts() {
  const client = getPlaidClient();
  const tokens = loadTokens();
  const allAccounts = [];
  for (const token of tokens) {
    try {
      const response = await client.accountsGet({ access_token: token });
      const institution = response.data.item?.institution_id;
      for (const account of response.data.accounts) {
        allAccounts.push({
          id: account.account_id,
          name: account.name,
          official_name: account.official_name,
          type: account.type,
          subtype: account.subtype,
          mask: account.mask,
          institution_id: institution,
          balances: {
            current: account.balances.current,
            available: account.balances.available,
            currency: account.balances.iso_currency_code || "EUR"
          }
        });
      }
    } catch (error) {
      console.error("Plaid getAccounts error for token:", error.message);
    }
  }
  return allAccounts;
}
async function getBalances() {
  const client = getPlaidClient();
  const tokens = loadTokens();
  const allAccounts = [];
  for (const token of tokens) {
    try {
      const response = await client.accountsBalanceGet({ access_token: token });
      for (const account of response.data.accounts) {
        allAccounts.push({
          id: account.account_id,
          name: account.name,
          official_name: account.official_name,
          type: account.type,
          subtype: account.subtype,
          mask: account.mask,
          balances: {
            current: account.balances.current,
            available: account.balances.available,
            currency: account.balances.iso_currency_code || "EUR"
          }
        });
      }
    } catch (error) {
      console.error("Plaid getBalances error for token:", error.message);
    }
  }
  return allAccounts;
}
function isPlaidConfigured() {
  return !!(process.env.PLAID_CLIENT_ID && process.env.PLAID_SECRET);
}
var plaidClient, TOKENS_FILE;
var init_plaidService = __esm({
  "server/plaidService.ts"() {
    "use strict";
    plaidClient = null;
    TOKENS_FILE = path7.join(process.cwd(), ".plaid_tokens.json");
  }
});

// server/aiReportService.ts
var aiReportService_exports = {};
__export(aiReportService_exports, {
  generateAiReport: () => generateAiReport,
  generateReportHtml: () => generateReportHtml
});
async function callGemini(prompt, systemPromptOverride) {
  const url = USE_INTEGRATION ? `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent` : `${GEMINI_BASE_URL}/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const headers = { "Content-Type": "application/json" };
  if (USE_INTEGRATION) {
    headers["x-goog-api-key"] = GEMINI_API_KEY;
  }
  const body2 = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemPromptOverride || SYSTEM_PROMPT }] },
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 8192,
      topP: 0.92,
      topK: 40
    }
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body2)
  });
  if (!response.ok) {
    const errText = await response.text();
    console.error("[AIReport] Gemini API error:", response.status, errText);
    throw new Error(`Gemini API error: ${response.status}`);
  }
  const data = await response.json();
  const text2 = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text2) {
    throw new Error("Pas de r\xE9ponse de l'IA");
  }
  return text2;
}
function inferMotorization(make, model, year) {
  const m = model.toLowerCase();
  const mk = make.toLowerCase();
  if (m.includes("tdi") || m.includes("hdi") || m.includes("cdti") || m.includes("dci") || m.includes("bluehdI") || m.includes("d ") || m.includes(" d") || m.includes("diesel")) return "diesel";
  if (m.includes("tsi") || m.includes("tfsi") || m.includes("gti") || m.includes("turbo") || m.includes("t5") || m.includes("t6")) return "essence turbo";
  if (m.includes("hybrid") || m.includes("hybride") || m.includes("phev") || m.includes("e-power") || m.includes("prius")) return "hybride";
  if (m.includes("electric") || m.includes("\xE9lectrique") || m.includes("ev") || m.includes("bev") || m.includes("ioniq") || m.includes("model ") || mk.includes("tesla")) return "\xE9lectrique";
  if ((mk.includes("bmw") || mk.includes("mercedes") || mk.includes("audi") || mk.includes("volkswagen")) && m.includes("d")) return "diesel";
  return "essence";
}
function categorizeProblem(issue) {
  const i = issue.toLowerCase();
  if (i.includes("d\xE9marr") || i.includes("start") || i.includes("batterie") || i.includes("d\xE9part")) return "d\xE9marrage/\xE9lectrique";
  if (i.includes("frein") || i.includes("brake") || i.includes("abs") || i.includes("p\xE9dale")) return "freinage";
  if (i.includes("vitesse") || i.includes("bo\xEEte") || i.includes("embrayage") || i.includes("transmission") || i.includes("passage")) return "transmission";
  if (i.includes("chauff") || i.includes("refroid") || i.includes("temp\xE9rat") || i.includes("surchauff") || i.includes("radiateur")) return "refroidissement";
  if (i.includes("huile") || i.includes("consomm") || i.includes("fuite") || i.includes("goutte")) return "lubrification/\xE9tanch\xE9it\xE9";
  if (i.includes("voyant") || i.includes("lumi\xE8re") || i.includes("tableau") || i.includes("check") || i.includes("d\xE9faut")) return "\xE9lectronique/capteurs";
  if (i.includes("bruit") || i.includes("vibr") || i.includes("claque") || i.includes("grince") || i.includes("craque")) return "m\xE9canique/bruit";
  if (i.includes("turbo") || i.includes("puissance") || i.includes("acc\xE9l\xE9r") || i.includes("cloque")) return "motorisation/performances";
  if (i.includes("direction") || i.includes("suspension") || i.includes("amort") || i.includes("train")) return "train roulant/direction";
  if (i.includes("carburant") || i.includes("injection") || i.includes("essence") || i.includes("gazole")) return "alimentation/injection";
  return "g\xE9n\xE9ral";
}
function buildPrompt(vehicleInfo) {
  const ageYears = Math.max(0, (/* @__PURE__ */ new Date()).getFullYear() - parseInt(vehicleInfo.year || "0", 10));
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;
  const motorization = vehicleInfo.carburant || inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const engineSpec = vehicleInfo.motorisation || null;
  const issueText = vehicleInfo.issue || "Analyse pr\xE9-achat v\xE9hicule d'occasion";
  const problemCategory = categorizeProblem(issueText);
  let prompt = `## V\xC9HICULE \xC0 ANALYSER
`;
  prompt += `- **Marque** : ${vehicleInfo.make}
`;
  prompt += `- **Mod\xE8le** : ${vehicleInfo.model}
`;
  prompt += `- **Ann\xE9e** : ${vehicleInfo.year}`;
  if (ageYears > 0) prompt += ` (v\xE9hicule de ${ageYears} an${ageYears > 1 ? "s" : ""})`;
  prompt += `
`;
  if (vehicleInfo.finition) prompt += `- **Finition** : ${vehicleInfo.finition}
`;
  if (engineSpec) prompt += `- **Motorisation (moteur)** : ${engineSpec}
`;
  if (vehicleInfo.gearbox) prompt += `- **Bo\xEEte de vitesse** : ${vehicleInfo.gearbox}
`;
  if (vehicleInfo.usage) {
    const usageStr = Array.isArray(vehicleInfo.usage) ? vehicleInfo.usage.join(", ") : vehicleInfo.usage;
    if (usageStr) prompt += `- **Usage** : ${usageStr}
`;
  }
  prompt += `- **Type de carburant** : ${motorization}
`;
  if (km !== null && !isNaN(km)) {
    prompt += `- **Kilom\xE9trage** : ${km.toLocaleString("fr-FR")} km`;
    if (km < 3e4) prompt += ` \u2192 tr\xE8s faible kilom\xE9trage, privil\xE9gier vieillissement/stockage sur usure m\xE9canique`;
    else if (km < 8e4) prompt += ` \u2192 kilom\xE9trage faible \xE0 moyen, surveillance entretiens pr\xE9ventifs`;
    else if (km < 15e4) prompt += ` \u2192 kilom\xE9trage moyen-\xE9lev\xE9, pi\xE8ces d'usure \xE0 v\xE9rifier (distribution, embrayage, amortisseurs)`;
    else if (km < 25e4) prompt += ` \u2192 kilom\xE9trage \xE9lev\xE9, vigilance sur moteur/transmission/\xE9lectronique vieillie`;
    else prompt += ` \u2192 tr\xE8s haut kilom\xE9trage, v\xE9hicule en fin de vie de certains composants majeurs`;
    prompt += `
`;
  }
  prompt += `- **Cat\xE9gorie du probl\xE8me** : ${problemCategory}
`;
  prompt += `
## CONTEXTE DE L'ANALYSE
`;
  prompt += `"${issueText}"

`;
  prompt += `## INSTRUCTIONS SP\xC9CIFIQUES POUR CE RAPPORT
`;
  prompt += `1. Mobilise tes connaissances approfondies sur les **${vehicleInfo.make} ${vehicleInfo.model}** de g\xE9n\xE9ration ${vehicleInfo.year} \u2014 d\xE9fauts de s\xE9rie, TSB, rappels constructeur document\xE9s sur cette motorisation ${motorization}.
`;
  prompt += `2. Le probl\xE8me est cat\xE9goris\xE9 comme **${problemCategory}** \u2014 concentre tes hypoth\xE8ses sur cette famille de composants en premier.
`;
  if (motorization === "diesel") {
    prompt += `3. Motorisation diesel : analyse EGR, FAP/DPF, syst\xE8me d'injection haute pression, turbocompresseur, capteurs NOx/lambda, circuit AdBlue si applicable.
`;
  } else if (motorization === "hybride") {
    prompt += `3. Motorisation hybride : analyse batterie HT (d\xE9gradation SOH, BMS), onduleur, DCDC converter, gestion thermique hybride, r\xE9cup\xE9ration d'\xE9nergie.
`;
  } else if (motorization === "\xE9lectrique") {
    prompt += `3. V\xE9hicule \xE9lectrique : analyse batterie HT (capacit\xE9, \xE9quilibrage cellules, BMS), chargeur embarqu\xE9, onduleur de traction, pompe de refroidissement HT, c\xE2blage haute tension.
`;
  } else {
    prompt += `3. Motorisation essence : analyse circuit d'allumage, injection directe/indirecte, capteurs (MAP, MAF, lambda), distribution, refroidissement moteur.
`;
  }
  if (km && km > 1e5) {
    prompt += `4. \xC0 ${km.toLocaleString("fr-FR")} km : int\xE8gre obligatoirement l'\xE9tat probable de la distribution (courroie/cha\xEEne), des joints moteur, des amortisseurs, et de l'embrayage (si thermique).
`;
  }
  if (ageYears >= 8) {
    prompt += `5. V\xE9hicule de ${ageYears} ans : int\xE8gre le vieillissement des durites, joints caoutchouc, capteurs \xE9lectroniques, et la corrosion des connecteurs/faisceaux.
`;
  }
  prompt += `
## RECOMMANDATION D'ACHAT \u2014 CALCUL DU SCORE
`;
  prompt += `Calcule le score (0-10) selon ces crit\xE8res pond\xE9r\xE9s :
`;
  prompt += `- \xC9tat m\xE9canique (40%) : bas\xE9 sur le nombre/gravit\xE9 des d\xE9fauts identifi\xE9s
`;
  prompt += `- Kilom\xE9trage/\xE2ge (30%) : ${km ? `${km.toLocaleString("fr-FR")} km, ${ageYears} ans` : `${ageYears} ans`}
`;
  prompt += `- Fiabilit\xE9 du mod\xE8le (20%) : historique TSB et rappels constructeur sur ce mill\xE9sime
`;
  prompt += `- Rapport qualit\xE9/prix estim\xE9 (10%) : d\xE9fauts vs. prix march\xE9 attendu
`;
  prompt += `Produis des negotiationTips CHIFFR\xC9S en \u20AC bas\xE9s sur les co\xFBts de r\xE9paration de tes recommandations.
`;
  prompt += `Produis une inspectionChecklist SP\xC9CIFIQUE \xE0 ce v\xE9hicule/${motorization} \u2014 pas de conseils g\xE9n\xE9riques.
`;
  prompt += `
Produis le rapport JSON complet selon le sch\xE9ma impos\xE9. Sois PR\xC9CIS, SP\xC9CIFIQUE, EXPERT. Aucune phrase g\xE9n\xE9rique.`;
  return prompt;
}
function generateFallbackPurchaseRecommendation(vehicleInfo) {
  const motorization = inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;
  const ageYears = Math.max(0, (/* @__PURE__ */ new Date()).getFullYear() - parseInt(vehicleInfo.year || "0", 10));
  const baseChecklist = [
    "Scanner OBD-II sur tous les calculateurs (moteur, bo\xEEte, ABS, habitacle) \u2014 pr\xE9voir 40-80 \u20AC en garage ind\xE9pendant",
    "V\xE9rifier visuellement toutes les fuites sous le v\xE9hicule moteur chaud (huile, liquide de refroidissement)",
    "Inspecter l'\xE9tat et la couleur de l'huile moteur \u2014 pr\xE9sence de lait = joint de culasse, huile tr\xE8s noire = entretiens n\xE9glig\xE9s",
    "Tester le d\xE9marrage \xE0 froid ET apr\xE8s chauffe compl\xE8te \u2014 noter tout rat\xE9 d'allumage, fum\xE9e anormale, vibration",
    "Contr\xF4ler l'usure des pneumatiques et la g\xE9om\xE9trie (usure irr\xE9guli\xE8re = probl\xE8me de suspension ou direction)",
    "V\xE9rifier le carnet d'entretien complet : intervalles respect\xE9s, factures \xE0 l'appui"
  ];
  if (motorization === "diesel") {
    baseChecklist.push("Faire un essai \xE0 froid : surveiller la fum\xE9e noire au d\xE9marrage (turbo/injection) et l'acc\xE9l\xE9ration franche sans \xE0-coups (FAP)");
  } else if (motorization === "\xE9lectrique" || motorization === "hybride") {
    baseChecklist.push("Demander le rapport SOH (State of Health) de la batterie HT \u2014 refuser si < 80% ou si non disponible");
    baseChecklist.push("Tester la recharge AC (borne 7kW) et DC (rapide) \u2014 noter le temps de charge r\xE9el vs. th\xE9orique");
  } else {
    baseChecklist.push("V\xE9rifier la date et l'\xE9tat de la courroie de distribution (ou tension cha\xEEne de distribution si applicable)");
  }
  if (km && km > 1e5) {
    baseChecklist.push(`\xC0 ${km.toLocaleString("fr-FR")} km : demander les factures de remplacement amortisseurs, embrayage (si thermique), courroie accessoires`);
  }
  return {
    score: 5.5,
    verdict: "N\xE9gocier",
    negotiationTips: [
      "Faites r\xE9aliser un diagnostic OBD complet avant signature \u2014 utilisez les codes d\xE9faut trouv\xE9s pour n\xE9gocier le prix",
      "Demandez syst\xE9matiquement le rapport d'historique (CarVertical, Histovec gratuit) \u2014 accident non d\xE9clar\xE9 = levier -10 \xE0 -20% du prix",
      "Exigez toutes les factures d'entretien \u2014 absence de preuves = n\xE9gociation de 300-500 \u20AC minimum pour couvrir les risques"
    ],
    inspectionChecklist: baseChecklist
  };
}
function generateFallbackReport(vehicleInfo) {
  const motorization = inferMotorization(vehicleInfo.make, vehicleInfo.model, vehicleInfo.year);
  const km = vehicleInfo.mileage ? parseInt(vehicleInfo.mileage.replace(/\D/g, ""), 10) : null;
  const ageYears = Math.max(0, (/* @__PURE__ */ new Date()).getFullYear() - parseInt(vehicleInfo.year || "0", 10));
  return {
    vehicleInfo,
    summary: `Rapport d'analyse pr\xE9-achat pour ${vehicleInfo.make} ${vehicleInfo.model} (${vehicleInfo.year}${km ? `, ${km.toLocaleString("fr-FR")} km` : ""}) \u2014 motorisation ${motorization}. Une inspection physique du v\xE9hicule reste indispensable avant acquisition.`,
    sections: [
      {
        title: `Analyse pr\xE9liminaire \u2014 ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}`,
        content: `Ce ${vehicleInfo.make} ${vehicleInfo.model} de motorisation ${motorization}${km ? ` \xE0 ${km.toLocaleString("fr-FR")} km` : ""} n\xE9cessite une inspection compl\xE8te avant achat. V\xE9rifiez les points de vigilance connus sur ce mod\xE8le, l'entretien suivi et l'\xE9tat g\xE9n\xE9ral de la carrosserie. Un scan OBD-II (codes d\xE9faut actifs et pass\xE9s, donn\xE9es temps r\xE9el) permettra de d\xE9tecter d'\xE9ventuels probl\xE8mes \xE9lectroniques avant acquisition.`,
        severity: "medium"
      },
      {
        title: "Priorit\xE9s d'inspection selon kilom\xE9trage et \xE2ge",
        content: `${ageYears >= 5 ? `V\xE9hicule de ${ageYears} ans : v\xE9rifier l'\xE9tat des durites de refroidissement, joints, capteurs. ` : ""}${km && km > 1e5 ? `\xC0 ${km.toLocaleString("fr-FR")} km : contr\xF4ler la distribution, l'embrayage, les amortisseurs. ` : ""}Un contr\xF4le visuel complet des niveaux (huile moteur, liquide de refroidissement, liquide de frein) et de l'\xE9tat des courroies s'impose avant tout diagnostic \xE9lectronique.`,
        severity: "low"
      },
      {
        title: "Diagnostic \xE9lectronique recommand\xE9",
        content: `Connexion \xE0 la valise OBD-II : lecture des codes d\xE9faut (DTCs) actifs et m\xE9moris\xE9s sur tous les calculateurs (moteur, bo\xEEte, ABS/ESP, habitacle). Analyse des donn\xE9es temps r\xE9el : temp\xE9rature moteur, pression d'admission, d\xE9bitm\xE8tre d'air, tensions batterie/alternateur, r\xE9gimes moteur. Ces donn\xE9es permettront d'orienter pr\xE9cis\xE9ment le diagnostic.`,
        severity: "medium"
      }
    ],
    recommendations: [
      "Scan OBD-II complet (tous calculateurs) \u2014 lire codes d\xE9faut actifs ET m\xE9moris\xE9s \u2014 co\xFBt : 40-80 \u20AC en garage ind\xE9pendant",
      "Contr\xF4le visuel des niveaux : huile moteur (quantit\xE9 + couleur), liquide refroidissement, liquide de frein",
      "Planifier un rendez-vous en atelier avec description pr\xE9cise du sympt\xF4me (conditions d'apparition, temp\xE9rature, r\xE9gime)",
      "Ne pas ignorer un voyant moteur allum\xE9 \u2014 risque d'aggravation et de dommages secondaires co\xFBteux"
    ],
    estimatedCost: "80-250 \u20AC (diagnostic initial complet)",
    urgencyLevel: "medium",
    purchaseRecommendation: generateFallbackPurchaseRecommendation(vehicleInfo),
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function generateAiReport(vehicleInfo, customSystemPrompt) {
  try {
    const prompt = buildPrompt(vehicleInfo);
    const rawResponse = await callGemini(prompt, customSystemPrompt || void 0);
    let cleanJson = rawResponse.trim();
    const jsonMatch = cleanJson.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      cleanJson = jsonMatch[1].trim();
    }
    const firstBrace = cleanJson.indexOf("{");
    const lastBrace = cleanJson.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanJson = cleanJson.slice(firstBrace, lastBrace + 1);
    }
    const parsed = JSON.parse(cleanJson);
    const purchaseRec = parsed.purchaseRecommendation;
    const validVerdicts = ["Acheter", "N\xE9gocier", "\xC9viter"];
    const report = {
      vehicleInfo,
      summary: parsed.summary || "Rapport de diagnostic g\xE9n\xE9r\xE9 par IA.",
      sections: Array.isArray(parsed.sections) ? parsed.sections : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
      estimatedCost: parsed.estimatedCost || void 0,
      urgencyLevel: parsed.urgencyLevel || "medium",
      purchaseRecommendation: purchaseRec && typeof purchaseRec.score === "number" && validVerdicts.includes(purchaseRec.verdict) ? {
        score: Math.min(10, Math.max(0, purchaseRec.score)),
        verdict: purchaseRec.verdict,
        negotiationTips: Array.isArray(purchaseRec.negotiationTips) ? purchaseRec.negotiationTips : [],
        inspectionChecklist: Array.isArray(purchaseRec.inspectionChecklist) ? purchaseRec.inspectionChecklist : []
      } : generateFallbackPurchaseRecommendation(vehicleInfo),
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return report;
  } catch (err2) {
    console.error("[AIReport] Generation failed, using fallback:", err2.message);
    return generateFallbackReport(vehicleInfo);
  }
}
function generateReportHtml(report) {
  const severityColors = {
    low: "#22c55e",
    medium: "#f59e0b",
    high: "#f97316",
    critical: "#ef4444"
  };
  const urgencyLabels = {
    low: "Faible",
    medium: "Moyen",
    high: "\xC9lev\xE9",
    critical: "Critique"
  };
  const verdictColors = {
    Acheter: "#22c55e",
    N\u00E9gocier: "#f59e0b",
    \u00C9viter: "#ef4444"
  };
  const sectionsHtml = report.sections.map(
    (s) => `
    <div style="margin-bottom: 20px; padding: 16px; border-left: 4px solid ${severityColors[s.severity || "medium"]}; background: #f8f9fa; border-radius: 4px;">
      <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #1a1a1a;">${s.title}</h3>
      <p style="margin: 0; color: #444; line-height: 1.6; font-size: 13px;">${s.content}</p>
      ${s.severity ? `<span style="display: inline-block; margin-top: 8px; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; color: white; background: ${severityColors[s.severity]};">${urgencyLabels[s.severity]}</span>` : ""}
    </div>`
  ).join("");
  const recsHtml = report.recommendations.map((r, i) => `<li style="margin-bottom: 10px; color: #333; font-size: 13px; line-height:1.6;"><strong style="color:#dc2626;">#${i + 1}</strong> ${r}</li>`).join("");
  const pr = report.purchaseRecommendation;
  const purchaseHtml = pr ? `
    <div style="margin-bottom: 30px; padding: 20px; border-radius: 8px; border: 2px solid ${verdictColors[pr.verdict] || "#f59e0b"}; background: ${verdictColors[pr.verdict] || "#f59e0b"}08;">
      <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: #0a0a0a; text-transform: uppercase; letter-spacing: 1px;">Recommandation d'achat</h2>
      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 16px; flex-wrap: wrap;">
        <div style="text-align: center;">
          <div style="width: 64px; height: 64px; border-radius: 50%; border: 4px solid ${verdictColors[pr.verdict] || "#f59e0b"}; display: flex; align-items: center; justify-content: center;">
            <span style="font-size: 22px; font-weight: 800; color: ${verdictColors[pr.verdict] || "#f59e0b"};">${pr.score.toFixed(1)}</span>
          </div>
          <p style="font-size: 10px; color: #888; margin-top: 4px;">/ 10</p>
        </div>
        <div>
          <span style="display: inline-block; padding: 6px 18px; border-radius: 20px; font-size: 16px; font-weight: 800; color: white; background: ${verdictColors[pr.verdict] || "#f59e0b"};">${pr.verdict}</span>
        </div>
      </div>
      ${pr.negotiationTips.length > 0 ? `
      <div style="margin-bottom: 14px;">
        <h3 style="font-size: 13px; font-weight: 700; color: #0a0a0a; margin-bottom: 8px;">\u{1F4B0} Arguments de n\xE9gociation</h3>
        <ul style="padding-left: 16px; margin: 0;">
          ${pr.negotiationTips.map((t) => `<li style="font-size: 12px; color: #444; margin-bottom: 6px; line-height: 1.5;">${t}</li>`).join("")}
        </ul>
      </div>` : ""}
      ${pr.inspectionChecklist.length > 0 ? `
      <div>
        <h3 style="font-size: 13px; font-weight: 700; color: #0a0a0a; margin-bottom: 8px;">\u2705 Points \xE0 v\xE9rifier avant signature</h3>
        <ul style="padding-left: 16px; margin: 0; list-style: none;">
          ${pr.inspectionChecklist.map((item) => `<li style="font-size: 12px; color: #444; margin-bottom: 6px; line-height: 1.5; padding-left: 4px;">\u2610 ${item}</li>`).join("")}
        </ul>
      </div>` : ""}
    </div>` : "";
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Exo 2', sans-serif; color: #1a1a1a; background: white; }
  </style>
</head>
<body>
  <div style="max-width: 800px; margin: 0 auto; padding: 40px 30px;">
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 24px; border-bottom: 3px solid #dc2626; margin-bottom: 30px;">
      <div>
        <h1 style="font-size: 28px; font-weight: 800; letter-spacing: 1px;">Auto<span style="color: #dc2626;">Report</span></h1>
        <p style="font-size: 11px; color: #888; letter-spacing: 3px; text-transform: uppercase; margin-top: 2px;">Rapport IA Automobile</p>
      </div>
      <div style="text-align: right;">
        <p style="font-size: 12px; color: #666;">Date: ${new Date(report.generatedAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}</p>
        <p style="font-size: 12px; color: #666;">R\xE9f: AR-${Date.now().toString(36).toUpperCase()}</p>
      </div>
    </div>

    <!-- Vehicle Info -->
    <div style="background: #0a0a0a; color: white; padding: 20px 24px; border-radius: 8px; margin-bottom: 30px;">
      <h2 style="font-size: 14px; color: #dc2626; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">V\xE9hicule analys\xE9</h2>
      <div style="display: flex; gap: 30px; flex-wrap: wrap;">
        <div>
          <span style="font-size: 11px; color: #888; text-transform: uppercase;">Marque / Mod\xE8le</span>
          <p style="font-size: 18px; font-weight: 700; margin-top: 2px;">${report.vehicleInfo.make} ${report.vehicleInfo.model}</p>
        </div>
        <div>
          <span style="font-size: 11px; color: #888; text-transform: uppercase;">Ann\xE9e</span>
          <p style="font-size: 18px; font-weight: 700; margin-top: 2px;">${report.vehicleInfo.year}</p>
        </div>
        ${report.vehicleInfo.mileage ? `<div>
          <span style="font-size: 11px; color: #888; text-transform: uppercase;">Kilom\xE9trage</span>
          <p style="font-size: 18px; font-weight: 700; margin-top: 2px;">${report.vehicleInfo.mileage} km</p>
        </div>` : ""}
      </div>
    </div>

    <!-- Urgency -->
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding: 14px 18px; border-radius: 8px; background: ${severityColors[report.urgencyLevel]}15; border: 1px solid ${severityColors[report.urgencyLevel]}30;">
      <div style="width: 12px; height: 12px; border-radius: 50%; background: ${severityColors[report.urgencyLevel]};"></div>
      <span style="font-weight: 600; font-size: 14px;">Niveau d'urgence : ${urgencyLabels[report.urgencyLevel]}</span>
      ${report.estimatedCost ? `<span style="margin-left: auto; font-weight: 600; font-size: 14px; color: #555;">Estimation : ${report.estimatedCost}</span>` : ""}
    </div>

    <!-- Purchase Recommendation -->
    ${purchaseHtml}

    <!-- Summary -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #0a0a0a;">R\xE9sum\xE9 du diagnostic</h2>
      <p style="line-height: 1.7; color: #444; font-size: 14px;">${report.summary}</p>
    </div>

    <!-- Problem -->
    <div style="margin-bottom: 30px; padding: 16px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
      <h3 style="font-size: 14px; color: #dc2626; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Probl\xE8me signal\xE9</h3>
      <p style="color: #333; line-height: 1.6; font-size: 13px;">${report.vehicleInfo.issue}</p>
    </div>

    <!-- Sections -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #0a0a0a;">Analyse d\xE9taill\xE9e</h2>
      ${sectionsHtml}
    </div>

    <!-- Recommendations -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #0a0a0a;">Recommandations</h2>
      <ol style="padding-left: 20px; line-height: 1.8;">
        ${recsHtml}
      </ol>
    </div>

    <!-- Footer -->
    <div style="border-top: 2px solid #e5e5e5; padding-top: 20px; margin-top: 40px; text-align: center;">
      <p style="font-size: 11px; color: #999; margin-bottom: 4px;">Ce rapport a \xE9t\xE9 g\xE9n\xE9r\xE9 automatiquement par AutoReport \u2014 Intelligence Artificielle Automobile</p>
      <p style="font-size: 11px; color: #999;">support@autoreport.com | +33 (0)1 21 40 80 80 | www.autoreport.com</p>
    </div>
  </div>
</body>
</html>`;
}
var USE_INTEGRATION, GEMINI_BASE_URL, GEMINI_API_KEY, GEMINI_MODEL, SYSTEM_PROMPT;
var init_aiReportService = __esm({
  "server/aiReportService.ts"() {
    "use strict";
    USE_INTEGRATION = !!(process.env.AI_INTEGRATIONS_GEMINI_BASE_URL && process.env.AI_INTEGRATIONS_GEMINI_API_KEY);
    GEMINI_BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "https://generativelanguage.googleapis.com";
    GEMINI_API_KEY = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
    GEMINI_MODEL = "gemini-2.0-flash";
    if (!USE_INTEGRATION && !GEMINI_API_KEY) {
      console.warn("[AIReport] No Gemini API key configured \u2014 report generation will fail. Set AI_INTEGRATIONS_GEMINI_API_KEY or GEMINI_API_KEY.");
    }
    console.info(`[AIReport] Gemini provider: ${USE_INTEGRATION ? "Replit integration proxy" : "Google direct API"}`);
    SYSTEM_PROMPT = `Tu es ALEXIS, expert senior en diagnostic automobile chez AutoReport \u2014 ing\xE9nieur m\xE9canicien avec 30 ans d'exp\xE9rience, certifi\xE9 multi-constructeurs (VW Group, PSA, Stellantis, BMW Group, Mercedes, Renault-Nissan, Toyota, Ford), sp\xE9cialiste OBD-II/OBD-III, \xE9lectronique embarqu\xE9e, CAN bus, motorisations thermiques/hybrides/\xE9lectriques (HV/BEV/PHEV). Tu connais par c\u0153ur les TSB (Technical Service Bulletins), les rappels constructeur, les d\xE9fauts de s\xE9rie document\xE9s, et les statistiques de sinistralit\xE9 par mod\xE8le/mill\xE9sime.

## TON MANDAT
Produire un rapport de diagnostic ULTRA-PERSONNALIS\xC9, aussi pr\xE9cis qu'un vrai compte-rendu d'atelier. Chaque rapport doit \xEAtre unique et calibr\xE9 sur le v\xE9hicule EXACT fourni. Interdit de copier-coller des phrases g\xE9n\xE9riques.

## INTELLIGENCE CONTEXTUELLE REQUISE
Pour chaque v\xE9hicule analys\xE9, tu DOIS mobiliser :
- Les **d\xE9fauts de s\xE9rie connus** (ex: EGR encrass\xE9 sur les 2.0 TDI EA189, vanos d\xE9faillant sur les N47, bo\xEEte DSG7 DQ200 s\xE8che, distribution 1.6 e-HDi fragile, etc.)
- Les **codes d\xE9faut OBD sp\xE9cifiques** (P0XXX, P1XXX, C0XXX, B0XXX, U0XXX) probables selon le sympt\xF4me ET la motorisation
- Les **intervalles d'entretien constructeur** et leur respect probable selon le kilom\xE9trage
- L'**\xE2ge \xE9lectronique** du v\xE9hicule (calculateurs, capteurs, faisceaux \xE9lectriques)
- Les **co\xFBts r\xE9els 2026** : diff\xE9rencier garage ind\xE9pendant / concession / sp\xE9cialiste marque

## FORMAT DE R\xC9PONSE \u2014 JSON STRICT
R\xE9ponds UNIQUEMENT en JSON valide (z\xE9ro markdown, z\xE9ro texte hors JSON) :
{
  "summary": "Synth\xE8se experte en 5-7 phrases : identifie pr\xE9cis\xE9ment le v\xE9hicule et sa motorisation probable, interpr\xE8te techniquement le sympt\xF4me, hi\xE9rarchise les 2-3 hypoth\xE8ses les plus probables avec justification, donne le niveau de criticit\xE9 et l'horizon d'intervention recommand\xE9. Cite le mod\xE8le exact et l'ann\xE9e.",
  "sections": [
    {
      "title": "Titre technique pr\xE9cis et sp\xE9cifique (NON g\xE9n\xE9rique) \u2014 ex: 'Vanne EGR encrass\xE9e \u2014 d\xE9faut r\xE9current sur 2.0 TDI EA288 (2015-2019)' ou 'Pompe \xE0 eau d\xE9faillante \u2014 point faible document\xE9 sur BMW N47 de cette g\xE9n\xE9ration'",
      "content": "Analyse approfondie en 5-8 phrases : m\xE9canisme physique de la panne, organes pr\xE9cis concern\xE9s avec leur r\xE9f\xE9rence ou d\xE9signation technique, codes OBD probables (ex: P0401, P0087), sympt\xF4mes corr\xE9l\xE9s \xE0 surveiller, cause racine (usure m\xE9canique/thermique, d\xE9faut s\xE9rie, entretien insuffisant, corrosion, vieillissement), proc\xE9dure de test pr\xE9cise (ex: mesure au multim\xE8tre tension alimentation capteur, test pression rampe injection, scan valise OBD param\xE8tre XX), cons\xE9quences si non trait\xE9 (ex: casse turbo, immobilisation, d\xE9pollution catalyseur). Mobilise tes connaissances des pathologies DOCUMENT\xC9ES de ce mod\xE8le/mill\xE9sime.",
      "severity": "low|medium|high|critical"
    }
  ],
  "recommendations": [
    "Action n\xB01 \u2014 PRIORIT\xC9 IMM\xC9DIATE : [organe exact] \xE0 [action] \u2014 co\xFBt estim\xE9 : [X-Y \u20AC] pi\xE8ce + [Z \u20AC] MO \u2248 [total] \u20AC TTC (garage ind\xE9pendant) / [total] \u20AC TTC (concession)",
    "Action n\xB02 \u2014 SOUS 500 KM : ...",
    "Action n\xB03 \u2014 AU PROCHAIN ENTRETIEN : ...",
    "V\xE9rification pr\xE9ventive li\xE9e au kilom\xE9trage et \xE0 l'\xE2ge..."
  ],
  "estimatedCost": "Fourchette globale selon hypoth\xE8se confirm\xE9e : XXX-YYY \u20AC TTC (garage ind\xE9pendant) / XXX-YYY \u20AC TTC (concession ou sp\xE9cialiste marque)",
  "urgencyLevel": "low|medium|high|critical",
  "purchaseRecommendation": {
    "score": 7.5,
    "verdict": "N\xE9gocier",
    "negotiationTips": [
      "N\xE9gociez 800-1 200 \u20AC en justifiant le remplacement imminent de la courroie de distribution \xE0 150 000 km (pi\xE8ce 120 \u20AC + MO 350 \u20AC = 470 \u20AC garage ind\xE9pendant)",
      "Faites valoir l'usure document\xE9e des amortisseurs arri\xE8re (bruit sourd en virage) \u2014 devis de remplacement : 400-600 \u20AC",
      "Exigez la facture du dernier vidange \u2014 absence de preuve = levier de n\xE9gociation suppl\xE9mentaire de 200-300 \u20AC"
    ],
    "inspectionChecklist": [
      "V\xE9rifier visuellement toutes les fuites sous le v\xE9hicule moteur chaud (huile, refroidissement, direction assist\xE9e)",
      "Tester le d\xE9marrage \xE0 froid ET apr\xE8s 10 min de chauffe \u2014 noter tout rat\xE9, fum\xE9e bleue/blanche, vibration",
      "Scanner OBD-II : lire les codes d\xE9faut actifs ET m\xE9moris\xE9s sur TOUS les calculateurs (moteur, bo\xEEte, ABS, habitacle)",
      "Inspecter l'\xE9tat de la courroie de distribution / cha\xEEne (si accessible) et v\xE9rifier la date du dernier remplacement sur carnet",
      "Contr\xF4ler l'\xE9tat des pneumatiques (usure r\xE9guli\xE8re = alignement correct, usure irr\xE9guli\xE8re = suspension d\xE9fectueuse)",
      "V\xE9rifier le niveau et la couleur de l'huile moteur : huile noire tr\xE8s visqueuse = entretiens n\xE9glig\xE9s, lait = joint de culasse",
      "Tester toutes les vitres, r\xE9troviseurs \xE9lectriques, climatisation, chauffage, audiovisuel \u2014 noter les pannes \xE9lectriques"
    ]
  }
}

## R\xC8GLES NON N\xC9GOCIABLES
1. **5 \xE0 7 sections obligatoires**, chacune avec un angle technique DIFF\xC9RENT :
   - Section 1 : Hypoth\xE8se principale (la plus probable) avec m\xE9canisme d\xE9taill\xE9
   - Section 2 : Hypoth\xE8se alternative (seconde cause probable)
   - Section 3 : D\xE9fauts de s\xE9rie / TSB connus sur ce mod\xE8le/mill\xE9sime sp\xE9cifique
   - Section 4 : Codes OBD-II/III probables et proc\xE9dure de scan \xE0 r\xE9aliser
   - Section 5 : Proc\xE9dures de validation et tests m\xE9caniques/\xE9lectroniques
   - Section 6 : Impact du kilom\xE9trage / \xE2ge sur ce composant et usures connexes
   - Section 7 (optionnelle) : Point sp\xE9cifique motorisation (diesel/essence/hybride/\xE9lectrique)
2. **5 \xE0 8 recommandations** chiffr\xE9es, hi\xE9rarchis\xE9es par priorit\xE9, avec d\xE9lai d'intervention
3. **Co\xFBts en euros TTC 2026** \u2014 garage ind\xE9pendant ET concession quand pertinent
4. **Jamais de conseil vague** : "v\xE9rifier les niveaux" \u2192 interdit. \xC0 la place : "V\xE9rifier le niveau d'huile moteur et sa viscosit\xE9 (5W-30 ou 5W-40 selon pr\xE9conisation constructeur) \u2014 signe de consommation anormale > 0,5L/1000km sur ce moteur indique usure segments ou joints de queues de soupapes"
5. **V\xE9hicules premium/sportifs** (Ferrari, Porsche, Maserati, AMG, M, RS, F-Sport) : co\xFBts \xD7 2-5, mentionner "atelier agr\xE9\xE9 constructeur requis"
6. **V\xE9hicules \xE9lectriques/hybrides** : analyser batterie HT (d\xE9gradation SOH, cellules d\xE9faillantes), BMS, onduleur, pompe de refroidissement HT, recharge AC/DC
7. **R\xE9ponds toujours en FRAN\xC7AIS technique professionnel**
8. **purchaseRecommendation OBLIGATOIRE** :
   - score : note de 0 \xE0 10 (10 = v\xE9hicule parfait, 0 = catastrophe) calcul\xE9e sur : \xE9tat m\xE9canique (40%), kilom\xE9trage/\xE2ge (30%), fiabilit\xE9 du mod\xE8le (20%), rapport qualit\xE9/prix (10%)
   - verdict : "Acheter" (score \u2265 7), "N\xE9gocier" (score 4-6.9), "\xC9viter" (score < 4)
   - negotiationTips : 3 \xE0 5 arguments chiffr\xE9s en \u20AC pour faire baisser le prix, bas\xE9s sur les d\xE9fauts trouv\xE9s
   - inspectionChecklist : 6 \xE0 10 points de contr\xF4le physique SP\xC9CIFIQUES \xE0 ce v\xE9hicule/motorisation avant de signer`;
  }
});

// server/stripeService.ts
var stripeService_exports = {};
__export(stripeService_exports, {
  constructWebhookEvent: () => constructWebhookEvent,
  createCheckoutSession: () => createCheckoutSession,
  createInstallmentPaymentIntent: () => createInstallmentPaymentIntent,
  createSEPAPaymentIntent: () => createSEPAPaymentIntent,
  getPaymentIntent: () => getPaymentIntent,
  getStripe: () => getStripe,
  isStripeConfigured: () => isStripeConfigured,
  listPayments: () => listPayments,
  mapStripePaymentMethod: () => mapStripePaymentMethod,
  retrievePaymentIntentWithCharge: () => retrievePaymentIntentWithCharge,
  retrieveSession: () => retrieveSession
});
import Stripe from "stripe";
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY_PROD || process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }
  if (!stripeInstance) {
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2025-01-27.acacia"
    });
  }
  return stripeInstance;
}
function isStripeConfigured() {
  return !!(process.env.STRIPE_SECRET_KEY_PROD || process.env.STRIPE_SECRET_KEY);
}
async function createCheckoutSession(options) {
  const stripe = getStripe();
  if (!stripe) {
    throw new Error("Stripe n'est pas configur\xE9. Veuillez ajouter STRIPE_SECRET_KEY.");
  }
  const session2 = await stripe.checkout.sessions.create({
    payment_method_configuration: "pmc_1T0mKfPJqqJIj81kvE4fVmGF",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `Facture ${options.invoiceNumber}`,
            description: options.description || `Paiement facture ${options.invoiceNumber}`
          },
          unit_amount: Math.round(options.amount * 100)
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: options.successUrl,
    cancel_url: options.cancelUrl,
    customer_email: options.clientEmail,
    metadata: {
      invoiceId: options.invoiceId,
      invoiceNumber: options.invoiceNumber,
      clientName: options.clientName
    }
  });
  return session2;
}
async function createSEPAPaymentIntent(options) {
  const stripe = getStripe();
  if (!stripe) {
    throw new Error("Stripe n'est pas configur\xE9.");
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(options.amount * 100),
    currency: "eur",
    payment_method_types: ["sepa_debit"],
    metadata: {
      invoiceId: options.invoiceId,
      invoiceNumber: options.invoiceNumber,
      clientName: options.clientName
    }
  });
  return paymentIntent;
}
async function retrieveSession(sessionId) {
  const stripe = getStripe();
  if (!stripe) return null;
  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error("[Stripe] Error retrieving session:", error);
    return null;
  }
}
async function getPaymentIntent(paymentIntentId) {
  const stripe = getStripe();
  if (!stripe) return null;
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error("[Stripe] Error retrieving payment intent:", error);
    return null;
  }
}
function constructWebhookEvent(body2, signature) {
  const stripe = getStripe();
  if (!stripe) {
    throw new Error("Stripe n'est pas configur\xE9.");
  }
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET n'est pas configur\xE9.");
  }
  return stripe.webhooks.constructEvent(body2, signature, webhookSecret);
}
async function createInstallmentPaymentIntent(options) {
  const stripe = getStripe();
  if (!stripe) {
    throw new Error("Stripe n'est pas configur\xE9. Veuillez ajouter STRIPE_SECRET_KEY.");
  }
  const amountInCents = Math.round(options.amount * 100);
  const intentParams = {
    amount: amountInCents,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "always"
    },
    payment_method_configuration: "pmc_1T0mKfPJqqJIj81kvE4fVmGF",
    payment_method_options: {
      klarna: {
        preferred_locale: "fr-FR"
      }
    },
    metadata: {
      invoiceId: options.invoiceId,
      invoiceNumber: options.invoiceNumber,
      clientName: options.clientName,
      paymentFlow: "installment"
    },
    description: `Facture ${options.invoiceNumber} - ${options.clientName}`,
    receipt_email: options.clientEmail
  };
  const paymentIntent = await stripe.paymentIntents.create(intentParams);
  return paymentIntent;
}
function mapStripePaymentMethod(paymentIntent) {
  const pmTypes = paymentIntent.payment_method_types;
  const charges = paymentIntent.latest_charge;
  if (typeof charges === "object" && charges !== null) {
    const charge = charges;
    const pmType = charge.payment_method_details?.type;
    if (pmType === "klarna") return "klarna";
    if (pmType === "alma") return "alma";
    if (pmType === "card") return "stripe";
    if (pmType === "sepa_debit") return "sepa";
  }
  if (pmTypes?.includes("klarna")) return "klarna";
  if (pmTypes?.includes("alma")) return "alma";
  return "stripe";
}
async function retrievePaymentIntentWithCharge(paymentIntentId) {
  const stripe = getStripe();
  if (!stripe) return null;
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["latest_charge"]
    });
  } catch (error) {
    console.error("[Stripe] Error retrieving payment intent with charge:", error);
    return null;
  }
}
async function listPayments(options) {
  const stripe = getStripe();
  if (!stripe) return [];
  try {
    const result = await stripe.paymentIntents.list({
      limit: options?.limit || 25,
      starting_after: options?.startingAfter
    });
    return result.data;
  } catch (error) {
    console.error("[Stripe] Error listing payments:", error);
    return [];
  }
}
var stripeInstance;
var init_stripeService = __esm({
  "server/stripeService.ts"() {
    "use strict";
    stripeInstance = null;
  }
});

// server/backupScheduler.ts
var backupScheduler_exports = {};
__export(backupScheduler_exports, {
  generateBackupData: () => generateBackupData,
  getBackupSettings: () => getBackupSettings,
  initBackupScheduler: () => initBackupScheduler,
  listBackups: () => listBackups,
  performMediaBackup: () => performMediaBackup,
  triggerManualBackup: () => triggerManualBackup,
  updateBackupSchedule: () => updateBackupSchedule
});
import * as cron from "node-cron";
import { eq as eq4 } from "drizzle-orm";
import fs6 from "fs";
import path8 from "path";
function ensureBackupsDir() {
  if (!fs6.existsSync(BACKUPS_DIR)) fs6.mkdirSync(BACKUPS_DIR, { recursive: true });
}
function listOldFiles(prefix, ext) {
  ensureBackupsDir();
  return fs6.readdirSync(BACKUPS_DIR).filter((f) => f.startsWith(prefix) && f.endsWith(ext)).sort();
}
function deleteOldFiles(prefix, ext, excludeFile) {
  const oldFiles = listOldFiles(prefix, ext);
  for (const f of oldFiles) {
    if (excludeFile && f === excludeFile) continue;
    try {
      fs6.unlinkSync(path8.join(BACKUPS_DIR, f));
      console.log(`[Backup] Ancienne sauvegarde supprimee: ${f}`);
    } catch (_) {
    }
  }
}
async function generateBackupData() {
  const backupData = {
    version: "1.2",
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    data: {
      users: await db.select().from(users),
      services: await db.select().from(services),
      quotes: await db.select().from(quotes),
      quoteItems: await db.select().from(quoteItems),
      quoteMedia: await db.select().from(quoteMedia),
      invoices: await db.select().from(invoices),
      invoiceItems: await db.select().from(invoiceItems),
      invoiceMedia: await db.select().from(invoiceMedia),
      reservations: await db.select().from(reservations),
      reservationServices: await db.select().from(reservationServices),
      notifications: await db.select().from(notifications),
      engagements: await db.select().from(engagements),
      workflows: await db.select().from(workflows),
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
      chatAttachments: await db.select().from(chatAttachments)
    }
  };
  return backupData;
}
async function downloadMediaFile(filePath) {
  const { downloadMedia: downloadMedia3 } = await Promise.resolve().then(() => (init_mediaService(), mediaService_exports));
  return downloadMedia3(filePath);
}
async function performMediaBackup() {
  console.log(`[MediaBackup] Demarrage sauvegarde medias...`);
  try {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    const quoteMediaResults = await db.select({
      reference: quotes.reference,
      quoteId: quoteMedia.quoteId,
      mediaId: quoteMedia.id,
      filePath: quoteMedia.filePath,
      fileName: quoteMedia.fileName,
      fileType: quoteMedia.fileType
    }).from(quoteMedia).innerJoin(quotes, eq4(quoteMedia.quoteId, quotes.id));
    const invoiceMediaResults = await db.select({
      reference: invoices.invoiceNumber,
      invoiceId: invoiceMedia.invoiceId,
      mediaId: invoiceMedia.id,
      filePath: invoiceMedia.filePath,
      fileName: invoiceMedia.fileName,
      fileType: invoiceMedia.fileType
    }).from(invoiceMedia).innerJoin(invoices, eq4(invoiceMedia.invoiceId, invoices.id));
    let mediaCount = 0;
    let errorCount = 0;
    for (let i = 0; i < quoteMediaResults.length; i++) {
      const m = quoteMediaResults[i];
      try {
        const buffer = await downloadMediaFile(m.filePath);
        if (buffer) {
          const ext = path8.extname(m.fileName || ".jpg");
          const zipName = `devis/${m.reference || "SANS-REF"}_${i + 1}${ext}`;
          zip.file(zipName, buffer);
          mediaCount++;
        }
      } catch (err2) {
        errorCount++;
        console.error(`[MediaBackup] Erreur devis media ${m.mediaId}:`, err2);
      }
    }
    for (let i = 0; i < invoiceMediaResults.length; i++) {
      const m = invoiceMediaResults[i];
      try {
        const buffer = await downloadMediaFile(m.filePath);
        if (buffer) {
          const ext = path8.extname(m.fileName || ".jpg");
          const zipName = `factures/${m.reference || "SANS-REF"}_${i + 1}${ext}`;
          zip.file(zipName, buffer);
          mediaCount++;
        }
      } catch (err2) {
        errorCount++;
        console.error(`[MediaBackup] Erreur facture media ${m.mediaId}:`, err2);
      }
    }
    const mapping = {
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      quoteMedia: quoteMediaResults.map((m) => ({ entityType: "quote", ...m })),
      invoiceMedia: invoiceMediaResults.map((m) => ({ entityType: "invoice", ...m }))
    };
    zip.file("media_mapping.json", JSON.stringify(mapping, null, 2));
    if (mediaCount === 0) {
      console.log(`[MediaBackup] Aucun media a sauvegarder`);
      return { success: true, mediaCount: 0 };
    }
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 6 } });
    const dateStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const zipFileName = `media_backup_${dateStr}.zip`;
    ensureBackupsDir();
    const localZipPath = path8.join(BACKUPS_DIR, zipFileName);
    fs6.writeFileSync(localZipPath, zipBuffer);
    try {
      const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
      const objStore = new ObjectStorageService3();
      await objStore.uploadFileBuffer(zipBuffer, zipFileName, "backups");
      console.log(`[MediaBackup] Sauvegarde R2 OK (${mediaCount} medias, ${(zipBuffer.length / 1024 / 1024).toFixed(2)} Mo)`);
    } catch (r2Err) {
      console.error(`[MediaBackup] Upload R2 echoue:`, r2Err.message);
    }
    console.log(`[MediaBackup] Termine: ${mediaCount} medias, ${errorCount} erreurs, ${(zipBuffer.length / 1024 / 1024).toFixed(2)} Mo`);
    return { success: true, filename: zipFileName, size: zipBuffer.length, mediaCount, zipBuffer };
  } catch (error) {
    console.error("[MediaBackup] Erreur critique:", error.message);
    return { success: false, error: error.message };
  }
}
async function performScheduledBackup() {
  console.log(`[Backup] === Sauvegarde quotidienne demarree a ${(/* @__PURE__ */ new Date()).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })} ===`);
  try {
    const backupData = await generateBackupData();
    const dateStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const dbFilename = `backup_${dateStr}.json`;
    ensureBackupsDir();
    const dbFilepath = path8.join(BACKUPS_DIR, dbFilename);
    const dbJsonStr = JSON.stringify(backupData, null, 2);
    fs6.writeFileSync(dbFilepath, dbJsonStr);
    const dbBuffer = Buffer.from(dbJsonStr);
    console.log(`[Backup] BDD sauvegardee: ${dbFilename} (${(dbBuffer.length / 1024 / 1024).toFixed(2)} Mo)`);
    try {
      const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
      const objStore = new ObjectStorageService3();
      await objStore.uploadFileBuffer(dbBuffer, dbFilename, "backups");
      console.log(`[Backup] BDD envoyee sur R2`);
    } catch (r2Err) {
      console.error(`[Backup] Upload R2 BDD echoue:`, r2Err.message);
    }
    console.log(`[Backup] Migration fichiers locaux -> cloud...`);
    try {
      const { migrateLocalToObjectStorage: migrateLocalToObjectStorage2 } = await Promise.resolve().then(() => (init_mediaService(), mediaService_exports));
      const migrationResult = await migrateLocalToObjectStorage2();
      if (migrationResult.migrated > 0) {
        console.log(`[Backup] Migration: ${migrationResult.migrated} fichiers migres vers le cloud`);
      } else {
        console.log(`[Backup] Migration: aucun fichier local a migrer`);
      }
      if (migrationResult.errors > 0) {
        console.warn(`[Backup] Migration: ${migrationResult.errors} erreurs`);
      }
    } catch (migErr) {
      console.error(`[Backup] Migration echouee:`, migErr.message);
    }
    console.log(`[Backup] Lancement sauvegarde medias...`);
    const mediaResult = await performMediaBackup();
    const dateFormatted = (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" });
    const timeFormatted = (/* @__PURE__ */ new Date()).toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris" });
    const dbStats = Object.entries(backupData.data).map(([table, data]) => {
      const count2 = Array.isArray(data) ? data.length : 0;
      return `<tr><td style="padding: 4px 12px; border-bottom: 1px solid #f0f0f0;">${table}</td><td style="padding: 4px 12px; border-bottom: 1px solid #f0f0f0; text-align: right; font-weight: bold;">${count2}</td></tr>`;
    }).join("");
    const dbSizeMo = (dbBuffer.length / 1024 / 1024).toFixed(2);
    const mediaSizeMo = mediaResult.size ? (mediaResult.size / 1024 / 1024).toFixed(2) : "0";
    const mediaCountStr = mediaResult.mediaCount?.toString() || "0";
    const attachments = [];
    let attachmentNote = "";
    if (dbBuffer.length <= MAX_EMAIL_ATTACHMENT_SIZE) {
      attachments.push({ filename: dbFilename, content: dbBuffer });
    } else {
      attachmentNote += `<p style="color: #b45309;">La sauvegarde BDD (${dbSizeMo} Mo) depasse la limite email. Disponible sur R2.</p>`;
    }
    if (mediaResult.success && mediaResult.filename && mediaResult.size && mediaResult.zipBuffer) {
      if (mediaResult.size <= MAX_EMAIL_ATTACHMENT_SIZE) {
        attachments.push({ filename: mediaResult.filename, content: mediaResult.zipBuffer });
      } else {
        attachmentNote += `<p style="color: #b45309;">Le ZIP medias (${mediaSizeMo} Mo) depasse la limite email. Disponible sur R2.</p>`;
      }
    }
    try {
      await sendEmail({
        to: BACKUP_EMAIL,
        subject: `[AutoReport] Sauvegarde du ${dateFormatted} - BDD + Medias`,
        html: `
          <div style="background-color: #f4f4f5; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
              <div style="padding: 30px;">
                ${getEmailHeader("AUTOREPORT")}
                <h2 style="color: #dc2626; text-align: center; font-size: 22px; margin-bottom: 20px;">Sauvegarde Quotidienne</h2>
                <p style="color: #4b5563; font-size: 14px;">Sauvegarde du <strong>${dateFormatted}</strong> a <strong>${timeFormatted}</strong>.</p>
                <p style="color: #6b7280; font-size: 13px;">La sauvegarde precedente a ete supprimee automatiquement.</p>
                
                <div style="background-color: #fef2f2; border: 1px solid #fee2e2; padding: 16px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #991b1b; margin: 0 0 10px 0; font-size: 16px;">Base de donnees</h3>
                  <p style="margin: 4px 0; color: #4b5563;">Fichier : <strong>${dbFilename}</strong></p>
                  <p style="margin: 4px 0; color: #4b5563;">Taille : <strong>${dbSizeMo} Mo</strong></p>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; color: #4b5563;">
                    ${dbStats}
                  </table>
                </div>

                <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #166534; margin: 0 0 10px 0; font-size: 16px;">Medias (photos devis/factures)</h3>
                  <p style="margin: 4px 0; color: #4b5563;">Fichier : <strong>${mediaResult.filename || "Aucun media"}</strong></p>
                  <p style="margin: 4px 0; color: #4b5563;">Medias sauvegardes : <strong>${mediaCountStr}</strong></p>
                  <p style="margin: 4px 0; color: #4b5563;">Taille : <strong>${mediaSizeMo} Mo</strong></p>
                </div>

                ${attachmentNote ? `<div style="background-color: #fffbeb; border: 1px solid #fde68a; padding: 12px; border-radius: 8px; margin: 15px 0;">${attachmentNote}</div>` : ""}

                <p style="color: #6b7280; font-size: 12px; margin-top: 20px; text-align: center;">
                  ${attachments.length > 0 ? `${attachments.length} fichier(s) en piece jointe.` : "Fichiers trop volumineux - disponibles sur R2."}
                  <br/>Sauvegarde egalement stockee sur le bucket R2.
                </p>
              </div>
              ${getEmailFooter("AUTOREPORT")}
            </div>
          </div>
        `,
        attachments: attachments.length > 0 ? attachments : void 0
      });
      console.log(`[Backup] Email envoye a ${BACKUP_EMAIL} avec ${attachments.length} piece(s) jointe(s)`);
    } catch (emailErr) {
      console.error(`[Backup] Erreur envoi email:`, emailErr.message);
    }
    const dbFileExists = fs6.existsSync(dbFilepath) && fs6.statSync(dbFilepath).size > 0;
    const mediaOk = mediaResult.success === true;
    if (dbFileExists && mediaOk) {
      deleteOldFiles("backup_", ".json", dbFilename);
      if (mediaResult.filename) {
        deleteOldFiles("media_backup_", ".zip", mediaResult.filename);
      }
      console.log(`[Backup] Anciennes sauvegardes supprimees (nouvelle sauvegarde reussie)`);
    } else {
      console.log(`[Backup] Anciennes sauvegardes conservees (BDD ok: ${dbFileExists}, medias ok: ${mediaOk})`);
    }
    console.log(`[Backup] === Sauvegarde quotidienne terminee avec succes ===`);
    return { success: true, filename: dbFilename, filepath: dbFilepath, mediaResult };
  } catch (error) {
    console.error("[Backup] ECHEC sauvegarde:", error.message);
    return { success: false, error: error.message };
  }
}
function updateBackupSchedule(settings) {
  backupSettings = { ...backupSettings, ...settings };
  if (scheduledTask) {
    scheduledTask.stop();
    scheduledTask = null;
  }
  if (backupSettings.enabled && backupSettings.time) {
    const [hours, minutes] = backupSettings.time.split(":");
    const cronExpression = `${minutes} ${hours} * * *`;
    scheduledTask = cron.schedule(cronExpression, performScheduledBackup, {
      timezone: "Europe/Paris"
    });
    console.log(`[Backup] Sauvegarde quotidienne planifiee a ${backupSettings.time} (Europe/Paris) -> ${BACKUP_EMAIL}`);
  }
}
function getBackupSettings() {
  return { ...backupSettings };
}
async function listBackups() {
  ensureBackupsDir();
  const files = fs6.readdirSync(BACKUPS_DIR).filter((f) => f.startsWith("backup_") && f.endsWith(".json") || f.startsWith("media_backup_") && f.endsWith(".zip")).map((filename) => {
    const filepath = path8.join(BACKUPS_DIR, filename);
    const stats = fs6.statSync(filepath);
    return {
      filename,
      type: filename.startsWith("media_backup_") ? "media" : "database",
      size: stats.size,
      createdAt: stats.mtime.toISOString()
    };
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return files;
}
async function triggerManualBackup() {
  return performScheduledBackup();
}
function initBackupScheduler() {
  updateBackupSchedule(backupSettings);
  console.log(`[Backup] Service initialise (quotidien a 21h, sans cumul, email -> ${BACKUP_EMAIL})`);
}
var scheduledTask, BACKUP_EMAIL, BACKUP_TIME, MAX_EMAIL_ATTACHMENT_SIZE, BACKUPS_DIR, backupSettings;
var init_backupScheduler = __esm({
  "server/backupScheduler.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_emailService();
    scheduledTask = null;
    BACKUP_EMAIL = "rbelmahi90@gmail.com";
    BACKUP_TIME = "21:00";
    MAX_EMAIL_ATTACHMENT_SIZE = 25 * 1024 * 1024;
    BACKUPS_DIR = path8.join(process.cwd(), "backups");
    backupSettings = {
      enabled: true,
      time: BACKUP_TIME,
      emailEnabled: true,
      emailRecipient: BACKUP_EMAIL
    };
  }
});

// server/dailyReportScheduler.ts
var dailyReportScheduler_exports = {};
__export(dailyReportScheduler_exports, {
  getDailyReportSettings: () => getDailyReportSettings,
  initDailyReportScheduler: () => initDailyReportScheduler,
  triggerDailyReport: () => triggerDailyReport,
  updateDailyReportSchedule: () => updateDailyReportSchedule
});
import * as cron2 from "node-cron";
async function generateDailyReport() {
  console.log(`[DailyReport] G\xE9n\xE9ration du rapport quotidien \xE0 ${(/* @__PURE__ */ new Date()).toISOString()}`);
  try {
    const now = /* @__PURE__ */ new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59, 999);
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(yesterdayStart);
    yesterdayEnd.setHours(23, 59, 59, 999);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const currentDay = now.getDate();
    const allInvoices = await db.select().from(invoices);
    const allQuotes = await db.select().from(quotes);
    const todayPaidInvoices = allInvoices.filter((inv) => {
      const d = new Date(inv.createdAt);
      return inv.status === "paid" && d >= todayStart && d <= todayEnd;
    });
    const todayRevenue = todayPaidInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount || "0"), 0);
    const yesterdayPaidInvoices = allInvoices.filter((inv) => {
      const d = new Date(inv.createdAt);
      return inv.status === "paid" && d >= yesterdayStart && d <= yesterdayEnd;
    });
    const yesterdayRevenue = yesterdayPaidInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount || "0"), 0);
    const monthPaidInvoices = allInvoices.filter((inv) => {
      const d = new Date(inv.createdAt);
      return inv.status === "paid" && d >= monthStart && d <= todayEnd;
    });
    const monthRevenue = monthPaidInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount || "0"), 0);
    const monthPendingInvoices = allInvoices.filter((inv) => {
      const d = new Date(inv.createdAt);
      return inv.status === "pending" && d >= monthStart && d <= todayEnd;
    });
    const monthPending = monthPendingInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount || "0"), 0);
    const todayNewQuotes = allQuotes.filter((q) => {
      const d = new Date(q.createdAt);
      return d >= todayStart && d <= todayEnd;
    });
    const todayNewInvoices = allInvoices.filter((inv) => {
      const d = new Date(inv.createdAt);
      return d >= todayStart && d <= todayEnd;
    });
    const appSettings = await storage.getApplicationSettings();
    const dailyObj = parseFloat(appSettings?.dailyRevenueObjective || "0");
    const monthlyObjective = dailyObj > 0 ? dailyObj * daysInMonth : 1e4;
    const progressPercent = monthlyObjective > 0 ? Math.min(monthRevenue / monthlyObjective * 100, 100) : 0;
    const avgDaily = currentDay > 0 ? monthRevenue / currentDay : 0;
    const projection = avgDaily * daysInMonth;
    const remainingDays = daysInMonth - currentDay;
    const requiredDaily = remainingDays > 0 ? Math.max(0, (monthlyObjective - monthRevenue) / remainingDays) : 0;
    const variation = yesterdayRevenue > 0 ? (todayRevenue - yesterdayRevenue) / yesterdayRevenue * 100 : todayRevenue > 0 ? 100 : 0;
    const isUp = variation >= 0;
    const monthName = now.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    const todayFormatted = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const progressBarWidth = Math.round(progressPercent);
    const progressColor = progressPercent >= 100 ? "#10b981" : progressPercent >= 70 ? "#f59e0b" : "#ef4444";
    const variationColor = isUp ? "#10b981" : "#ef4444";
    const variationArrow = isUp ? "&#9650;" : "&#9660;";
    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Rapport Quotidien - ${todayFormatted}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
        ${getEmailHeader("AUTOREPORT")}
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: 0;">
          
          <!-- Encaissement du jour -->
          <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
            <h2 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px;">Encaissement du Jour</h2>
            <div style="font-size: 32px; font-weight: bold; color: #1e3a5f;">${todayRevenue.toLocaleString("fr-FR")} \u20AC</div>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #666;">
              Hier : ${yesterdayRevenue.toLocaleString("fr-FR")} \u20AC 
              <span style="color: ${variationColor}; font-weight: bold; margin-left: 8px;">
                ${variationArrow} ${variation === 0 && yesterdayRevenue === 0 && todayRevenue === 0 ? "\u2014" : `${isUp ? "+" : ""}${variation.toFixed(0)}%`}
              </span>
            </p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #888;">${todayPaidInvoices.length} facture(s) encaiss\xE9e(s) | ${todayNewQuotes.length} nouveau(x) devis | ${todayNewInvoices.length} nouvelle(s) facture(s)</p>
          </div>
          
          <!-- Objectif Mensuel -->
          <div style="background: #f0fdf4; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid ${progressColor};">
            <h2 style="margin: 0 0 10px 0; color: #166534; font-size: 16px;">Objectif Mensuel - ${monthName}</h2>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
              <span style="font-size: 28px; font-weight: bold; color: #1e3a5f;">${monthRevenue.toLocaleString("fr-FR")} \u20AC</span>
              <span style="font-size: 14px; color: #666;">sur ${monthlyObjective.toLocaleString("fr-FR")} \u20AC</span>
            </div>
            <!-- Progress bar -->
            <div style="background: #e5e7eb; border-radius: 6px; height: 12px; overflow: hidden; margin-bottom: 8px;">
              <div style="background: ${progressColor}; height: 100%; border-radius: 6px; width: ${progressBarWidth}%;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #666;">
              <span style="font-weight: bold; color: ${progressColor};">${progressPercent.toFixed(0)}% atteint</span>
              <span>En attente : ${monthPending.toLocaleString("fr-FR")} \u20AC</span>
            </div>
          </div>
          
          <!-- Moyennes & Projection -->
          <div style="background: #faf5ff; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #8b5cf6;">
            <h2 style="margin: 0 0 12px 0; color: #5b21b6; font-size: 16px;">Moyennes & Projection</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #666; font-size: 14px;">Moyenne/jour actuelle</td>
                <td style="padding: 6px 0; text-align: right; font-weight: bold; font-size: 14px;">${avgDaily.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} \u20AC</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666; font-size: 14px;">Objectif/jour restant</td>
                <td style="padding: 6px 0; text-align: right; font-weight: bold; font-size: 14px; color: ${requiredDaily <= avgDaily ? "#10b981" : "#ef4444"};">${requiredDaily.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} \u20AC</td>
              </tr>
              <tr style="border-top: 1px solid #e5e7eb;">
                <td style="padding: 8px 0 0 0; color: #666; font-size: 14px;">Projection fin de mois</td>
                <td style="padding: 8px 0 0 0; text-align: right; font-weight: bold; font-size: 16px; color: ${projection >= monthlyObjective ? "#10b981" : "#f59e0b"};">${projection.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} \u20AC</td>
              </tr>
            </table>
          </div>
          
          <!-- R\xE9cap chiffres -->
          <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 10px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 4px 0; color: #888;">Jour ${currentDay}/${daysInMonth} du mois</td>
                <td style="padding: 4px 0; text-align: right; color: #888;">${remainingDays} jours restants</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #888;">Total factures du mois</td>
                <td style="padding: 4px 0; text-align: right; color: #888;">${monthPaidInvoices.length} pay\xE9es + ${monthPendingInvoices.length} en attente</td>
              </tr>
            </table>
          </div>
        </div>
        
        ${getEmailFooter("AUTOREPORT")}
      </body>
      </html>
    `;
    const recipientList = currentSettings.recipients.split(",").map((r) => r.trim()).filter((r) => r.length > 0);
    if (recipientList.length === 0) {
      console.log("[DailyReport] Aucun destinataire configur\xE9");
      return;
    }
    const primaryRecipient = recipientList[0];
    const ccRecipients = recipientList.slice(1);
    const result = await sendEmail({
      to: primaryRecipient,
      cc: ccRecipients.length > 0 ? ccRecipients : void 0,
      subject: `[AutoReport] Rapport Quotidien - ${todayFormatted}`,
      html
    });
    if (result.success) {
      console.log(`[DailyReport] Rapport envoy\xE9 \xE0 ${recipientList.join(", ")}`);
    } else {
      console.error(`[DailyReport] Erreur d'envoi: ${result.error}`);
    }
  } catch (error) {
    console.error("[DailyReport] Erreur:", error.message);
  }
}
function updateDailyReportSchedule(settings) {
  currentSettings = { ...settings };
  if (scheduledTask2) {
    scheduledTask2.stop();
    scheduledTask2 = null;
  }
  if (currentSettings.enabled && currentSettings.time) {
    const [hours, minutes] = currentSettings.time.split(":");
    const cronExpression = `${minutes} ${hours} * * *`;
    scheduledTask2 = cron2.schedule(cronExpression, generateDailyReport, {
      timezone: "Europe/Paris"
    });
    console.log(`[DailyReport] Rapport quotidien planifi\xE9 \xE0 ${currentSettings.time} (Europe/Paris) -> ${currentSettings.recipients}`);
  } else {
    console.log("[DailyReport] Rapport quotidien d\xE9sactiv\xE9");
  }
}
function getDailyReportSettings() {
  return { ...currentSettings };
}
async function initDailyReportScheduler() {
  try {
    const appSettings = await storage.getApplicationSettings();
    if (appSettings) {
      const settings = {
        enabled: appSettings.dailyReportEnabled ?? false,
        time: appSettings.dailyReportTime || "21:00",
        recipients: appSettings.dailyReportRecipients || "contact@autoreport.com"
      };
      updateDailyReportSchedule(settings);
    }
  } catch (error) {
    console.log("[DailyReport] Initialisation sans param\xE8tres sauvegard\xE9s, utilisation des valeurs par d\xE9faut");
  }
}
async function triggerDailyReport() {
  return generateDailyReport();
}
var scheduledTask2, currentSettings;
var init_dailyReportScheduler = __esm({
  "server/dailyReportScheduler.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_emailService();
    init_storage();
    scheduledTask2 = null;
    currentSettings = {
      enabled: false,
      time: "21:00",
      recipients: "contact@autoreport.com"
    };
  }
});

// server/imageOptimizer.ts
var imageOptimizer_exports = {};
__export(imageOptimizer_exports, {
  optimizeImageBuffer: () => optimizeImageBuffer
});
import sharp2 from "sharp";
async function optimizeImageBuffer(buffer, mimetype) {
  if (!mimetype.startsWith("image/") || mimetype === "image/gif") {
    return buffer;
  }
  try {
    const metadata = await sharp2(buffer).metadata();
    const needsResize = metadata.width && metadata.width > MAX_DIMENSION || metadata.height && metadata.height > MAX_DIMENSION;
    let pipeline = sharp2(buffer).rotate();
    if (needsResize) {
      pipeline = pipeline.resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true });
    }
    let result;
    if (mimetype === "image/png") {
      result = await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 8 }).toBuffer();
    } else if (mimetype === "image/webp") {
      result = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
    } else {
      result = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
    }
    const originalSize = buffer.length;
    const newSize = result.length;
    if (newSize < originalSize) {
      console.log(`[ImageOptimizer] ${(originalSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (${((1 - newSize / originalSize) * 100).toFixed(0)}% saved)`);
      return result;
    }
    return buffer;
  } catch (error) {
    console.warn("[ImageOptimizer] Optimization skipped:", error);
    return buffer;
  }
}
var MAX_DIMENSION, JPEG_QUALITY, PNG_QUALITY, WEBP_QUALITY;
var init_imageOptimizer = __esm({
  "server/imageOptimizer.ts"() {
    "use strict";
    MAX_DIMENSION = 1920;
    JPEG_QUALITY = 82;
    PNG_QUALITY = 85;
    WEBP_QUALITY = 82;
  }
});

// server/aiAssistant.ts
var aiAssistant_exports = {};
__export(aiAssistant_exports, {
  analyzeWheelImage: () => analyzeWheelImage,
  generateAssistantResponse: () => generateAssistantResponse
});
async function getServicesContext() {
  const now = Date.now();
  if (now - servicesCacheTime > CACHE_TTL || cachedServices.length === 0) {
    try {
      const services2 = await storage.getServices();
      cachedServices = services2.map((s) => ({
        name: s.name,
        description: s.description || null,
        basePrice: s.basePrice || null,
        category: s.category || null
      }));
      servicesCacheTime = now;
    } catch (e) {
      console.error("[AI] Failed to fetch services:", e);
    }
  }
  if (cachedServices.length === 0) {
    return "Services disponibles: Montage de jantes, R\xE9paration de jantes endommag\xE9es, Changement de pneus, \xC9quilibrage, G\xE9om\xE9trie, Personnalisation de jantes, Peinture de jantes.";
  }
  return "Services propos\xE9s par AutoReport:\n" + cachedServices.map((s) => {
    let line = `- ${s.name}`;
    if (s.description) line += `: ${s.description}`;
    if (s.basePrice && parseFloat(s.basePrice) > 0) line += ` (\xE0 partir de ${parseFloat(s.basePrice).toFixed(2)} \u20AC)`;
    return line;
  }).join("\n");
}
function buildSystemPrompt(servicesContext, userRole) {
  const roleContext = userRole === "client" ? "L'utilisateur est un client du garage. Aide-le \xE0 comprendre les services, demander un devis, ou suivre ses commandes." : "L'utilisateur est un membre du personnel (administrateur/employ\xE9). Aide-le avec la gestion des op\xE9rations.";
  return `Tu es l'assistant virtuel intelligent de AutoReport, expert en jantes automobiles et services de r\xE9paration/personnalisation. Tu es toujours disponible et enthousiaste pour aider.

${roleContext}

## Expertise Technique - Jantes Automobiles

Tu poss\xE8des une connaissance approfondie sur les jantes automobiles:

### Types de Jantes
- **Jantes en alliage (aluminium)**: L\xE9g\xE8res, esth\xE9tiques, bonne dissipation thermique. Sensibles aux chocs et \xE0 la corrosion.
- **Jantes en acier**: Robustes, \xE9conomiques, r\xE9sistantes aux d\xE9formations. Plus lourdes, moins esth\xE9tiques.
- **Jantes forg\xE9es**: Tr\xE8s l\xE9g\xE8res et r\xE9sistantes, haut de gamme. Prix plus \xE9lev\xE9.
- **Jantes en carbone**: Ultra-l\xE9g\xE8res, haute performance, usage sportif/luxe.

### Probl\xE8mes Courants et R\xE9parations
- **Voile de jante**: D\xE9formation qui provoque des vibrations. R\xE9parable par redressage sur tour.
- **Fissure/Crack**: N\xE9cessite soudure TIG sp\xE9cialis\xE9e aluminium. Contr\xF4le d'\xE9tanch\xE9it\xE9 obligatoire.
- **Rayures superficielles**: Pon\xE7age et polissage, possible remise \xE0 neuf compl\xE8te.
- **\xC9clats/Impacts**: Rechargement mati\xE8re + usinage + finition.
- **Corrosion/Oxydation**: D\xE9capage chimique ou sablage + traitement anti-corrosion + peinture.
- **Perte d'\xE9tanch\xE9it\xE9**: Nettoyage des port\xE9es de pneu, v\xE9rification des fissures, joint d'\xE9tanch\xE9it\xE9.

### Personnalisation de Jantes
- **Peinture**: Changement de couleur, finition mate/brillante/satin\xE9e
- **Diamond Cut (usinage diamant)**: Finition premium avec face usin\xE9e brillante et flancs peints
- **Hydrographie / Covering**: Application de motifs (carbone, camouflage, etc.)
- **Changement de taille**: Passage \xE0 des jantes plus grandes (upsizing) - attention aux compatibilit\xE9s

### Dimensions et Compatibilit\xE9
- **Diam\xE8tre (pouces)**: 14" \xE0 22" courants, jusqu'\xE0 24" pour SUV
- **Largeur (pouces)**: 5.5J \xE0 12J selon v\xE9hicule
- **Entraxe (PCD)**: 4x100, 5x112, 5x120, etc. - DOIT correspondre au v\xE9hicule
- **D\xE9port (ET)**: Influence le positionnement de la roue, crucial pour la g\xE9om\xE9trie
- **Al\xE9sage central**: Doit correspondre au moyeu du v\xE9hicule

## Configurateur de Jantes

Tu peux analyser des photos de jantes envoy\xE9es par les utilisateurs. Quand un utilisateur envoie une photo:
1. Identifie le type de jante (alliage, acier, forg\xE9, etc.)
2. \xC9value l'\xE9tat (rayures, voile, fissures, corrosion)
3. Propose des options de personnalisation (couleur, finition, diamond cut)
4. Estime la faisabilit\xE9 des travaux
5. Recommande des services AutoReport adapt\xE9s

Si l'utilisateur demande une personnalisation, d\xE9cris en d\xE9tail le rendu attendu (couleur, finition, effet visuel).

## ${servicesContext}

## Navigation de l'Application
- **Clients**: Tableau de bord (/), Services (/services), Mes Devis (/quotes), Mes Factures (/invoices), Messages (/messages)
- **Administrateurs**: Dashboard (/admin/dashboard), Devis (/admin/quotes), Factures (/admin/invoices), R\xE9servations (/admin/reservations), Atelier (/admin/workshop), Chat (/admin/chat)

## Processus Client
1. **Demande de devis**: Le client d\xE9crit son besoin \u2192 l'\xE9quipe AutoReport \xE9value et propose un devis personnalis\xE9
2. **Approbation**: Le client consulte le devis en ligne et l'approuve
3. **R\xE9servation**: Prise de rendez-vous pour l'intervention
4. **Intervention**: R\xE9alisation des travaux en atelier
5. **Facturation**: Facture g\xE9n\xE9r\xE9e automatiquement, paiement en ligne possible (CB, virement, Klarna, Alma)

## R\xE8gles de Conversation
- R\xE9ponds TOUJOURS en fran\xE7ais
- Sois concis, pr\xE9cis et enthousiaste
- Pour les prix: oriente vers un devis personnalis\xE9, tu peux mentionner les prix de base des services si disponibles
- Pour un diagnostic: pose des questions sur le type de jante, la nature du dommage, le v\xE9hicule
- Propose toujours des solutions concr\xE8tes et explique les \xE9tapes de r\xE9paration
- Si le client h\xE9site entre r\xE9paration et remplacement, aide-le \xE0 comprendre les avantages de chaque option`;
}
async function callGemini2(contents, systemInstruction) {
  const url = `${GEMINI_BASE_URL2}/models/${GEMINI_MODEL2}:generateContent`;
  const body2 = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192
    }
  };
  if (systemInstruction) {
    body2.systemInstruction = { parts: [{ text: systemInstruction }] };
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_API_KEY2
    },
    body: JSON.stringify(body2)
  });
  if (!response.ok) {
    const errText = await response.text();
    console.error("[AI] Gemini API error:", response.status, errText);
    throw new Error(`Gemini API error: ${response.status}`);
  }
  const data = await response.json();
  const text2 = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text2) {
    throw new Error("Pas de r\xE9ponse de l'IA");
  }
  return text2;
}
async function generateAssistantResponse(messages, userRole) {
  const servicesContext = await getServicesContext();
  const systemPrompt = buildSystemPrompt(servicesContext, userRole);
  const geminiContents = messages.map((m) => {
    const parts = [];
    if (m.imageBase64 && m.imageMimeType) {
      parts.push({
        inlineData: {
          mimeType: m.imageMimeType,
          data: m.imageBase64
        }
      });
    }
    parts.push({ text: m.content });
    return {
      role: m.role === "user" ? "user" : "model",
      parts
    };
  });
  return callGemini2(geminiContents, systemPrompt);
}
async function analyzeWheelImage(imageBase64, imageMimeType, userPrompt, conversationHistory = []) {
  const analysisSystemPrompt = `Tu es un expert en jantes automobiles chez AutoReport. Tu analyses des photos de jantes envoy\xE9es par les clients.

Quand tu re\xE7ois une photo de jante:
1. **Identification**: Type de jante (alliage, acier, forg\xE9), marque si identifiable, nombre de branches, design
2. **\xC9tat**: \xC9value l'\xE9tat visible (rayures, corrosion, voile, fissures, usure)
3. **Personnalisation**: Propose des options r\xE9alistes de personnalisation:
   - Couleurs possibles (noir mat, noir brillant, gris anthracite, bronze, or, blanc, rouge, bleu, etc.)
   - Finitions (mat, brillant, satin\xE9, bross\xE9)
   - Diamond Cut (face usin\xE9e + flancs peints)
   - Hydrographie (motifs carbone, camouflage, etc.)
4. **Recommandation**: Sugg\xE8re le meilleur traitement et oriente vers un devis AutoReport
5. **Visualisation**: D\xE9cris en d\xE9tail comment la jante appara\xEEtrait apr\xE8s chaque option de personnalisation propos\xE9e

R\xE9ponds TOUJOURS en fran\xE7ais. Sois enthousiaste et professionnel.
Si l'image n'est pas une jante, indique-le poliment et demande une photo de jante.`;
  const contents = [];
  for (const msg of conversationHistory) {
    const parts = [];
    if (msg.imageBase64 && msg.imageMimeType) {
      parts.push({ inlineData: { mimeType: msg.imageMimeType, data: msg.imageBase64 } });
    }
    parts.push({ text: msg.content });
    contents.push({ role: msg.role === "user" ? "user" : "model", parts });
  }
  const userParts = [
    { inlineData: { mimeType: imageMimeType, data: imageBase64 } },
    { text: userPrompt || "Analyse cette jante et propose des options de personnalisation." }
  ];
  contents.push({ role: "user", parts: userParts });
  return callGemini2(contents, analysisSystemPrompt);
}
var GEMINI_BASE_URL2, GEMINI_API_KEY2, GEMINI_MODEL2, cachedServices, servicesCacheTime, CACHE_TTL;
var init_aiAssistant = __esm({
  "server/aiAssistant.ts"() {
    "use strict";
    init_storage();
    GEMINI_BASE_URL2 = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "http://localhost:1106/modelfarm/gemini";
    GEMINI_API_KEY2 = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "dummy-key";
    GEMINI_MODEL2 = "gemini-2.5-flash";
    cachedServices = [];
    servicesCacheTime = 0;
    CACHE_TTL = 5 * 60 * 1e3;
  }
});

// server/ocrVisionService.ts
var ocrVisionService_exports = {};
__export(ocrVisionService_exports, {
  scanCarteGrise: () => scanCarteGrise,
  scanDocument: () => scanDocument,
  scanInvoice: () => scanInvoice,
  scanLicensePlate: () => scanLicensePlate
});
function getPromptForType(documentType) {
  const baseInstruction = `Tu es un expert en OCR. Analyse cette image de document et extrais toutes les informations visibles. R\xE9ponds UNIQUEMENT en JSON valide, sans markdown, sans commentaire.`;
  switch (documentType) {
    case "carte_grise":
      return `${baseInstruction}
Extrais les champs suivants d'une carte grise fran\xE7aise (certificat d'immatriculation) :
{
  "type": "carte_grise",
  "confidence": 0.0-1.0,
  "registrationNumber": "immatriculation (champ A)",
  "firstRegistrationDate": "date 1\xE8re immatriculation (champ B)",
  "ownerFullName": "nom du titulaire (champ C.1)",
  "ownerAddress": "adresse (champ C.3)",
  "make": "marque (champ D.1)",
  "commercialName": "d\xE9nomination commerciale (champ D.2)",
  "model": "type variante version (champ D.2.1 ou D.3)",
  "vin": "num\xE9ro VIN (champ E)",
  "category": "cat\xE9gorie (champ J)",
  "bodyType": "carrosserie (champ J.2)",
  "fuelType": "\xE9nergie/carburant (champ P.3)",
  "engineCapacity": "cylindr\xE9e (champ P.1)",
  "maxPower": "puissance nette max (champ P.2)",
  "fiscalPower": "puissance fiscale (champ P.6)",
  "seatingCapacity": "places assises (champ S.1)",
  "color": "couleur",
  "co2Emissions": "\xE9missions CO2 (champ V.7)",
  "formulaNumber": "num\xE9ro de formule",
  "rawText": "texte brut extrait"
}`;
    case "invoice":
      return `${baseInstruction}
Extrais les champs suivants d'une facture :
{
  "type": "invoice",
  "confidence": 0.0-1.0,
  "invoiceNumber": "num\xE9ro de facture",
  "invoiceDate": "date de facture (format YYYY-MM-DD)",
  "dueDate": "date d'\xE9ch\xE9ance (format YYYY-MM-DD)",
  "totalAmount": nombre,
  "totalNet": nombre (HT),
  "totalTax": nombre (TVA),
  "taxRate": nombre (%),
  "supplierName": "nom fournisseur",
  "supplierAddress": "adresse fournisseur",
  "supplierSiret": "SIRET fournisseur",
  "customerName": "nom client",
  "customerAddress": "adresse client",
  "lineItems": [{"description": "", "quantity": 0, "unitPrice": 0, "totalAmount": 0, "taxRate": 0}],
  "rawText": "texte brut extrait"
}`;
    case "id_card":
      return `${baseInstruction}
Extrais les champs suivants d'une carte d'identit\xE9 :
{
  "type": "id_card",
  "confidence": 0.0-1.0,
  "documentNumber": "num\xE9ro du document",
  "surname": "nom de famille",
  "givenNames": ["pr\xE9nom1", "pr\xE9nom2"],
  "birthDate": "date de naissance (format YYYY-MM-DD)",
  "birthPlace": "lieu de naissance",
  "gender": "M ou F",
  "nationality": "nationalit\xE9",
  "expiryDate": "date d'expiration (format YYYY-MM-DD)",
  "issueDate": "date de d\xE9livrance (format YYYY-MM-DD)",
  "address": "adresse",
  "rawText": "texte brut extrait"
}`;
    case "passport":
      return `${baseInstruction}
Extrais les champs suivants d'un passeport :
{
  "type": "passport",
  "confidence": 0.0-1.0,
  "documentNumber": "num\xE9ro du passeport",
  "surname": "nom de famille",
  "givenNames": ["pr\xE9nom1"],
  "birthDate": "date de naissance (format YYYY-MM-DD)",
  "birthPlace": "lieu de naissance",
  "gender": "M ou F",
  "nationality": "nationalit\xE9",
  "expiryDate": "date d'expiration (format YYYY-MM-DD)",
  "issuanceDate": "date de d\xE9livrance (format YYYY-MM-DD)",
  "country": "pays \xE9metteur",
  "mrz1": "ligne MRZ 1",
  "mrz2": "ligne MRZ 2",
  "rawText": "texte brut extrait"
}`;
    case "license_plate":
      return `${baseInstruction}
Identifie et extrais le num\xE9ro de plaque d'immatriculation visible sur cette image :
{
  "type": "license_plate",
  "confidence": 0.0-1.0,
  "plateNumber": "num\xE9ro de plaque",
  "country": "pays suppos\xE9",
  "format": "ancien ou nouveau format",
  "rawText": "texte brut extrait"
}`;
    case "auto_detect":
    default:
      return `${baseInstruction}
D\xE9tecte automatiquement le type de document dans cette image et extrais toutes les informations pertinentes.
Le type peut \xEAtre : "carte_grise", "invoice", "id_card", "passport", "license_plate", "receipt", "other".
R\xE9ponds avec :
{
  "type": "type_detect\xE9",
  "confidence": 0.0-1.0,
  "detectedFields": { ... tous les champs extraits ... },
  "rawText": "texte brut extrait de l'image"
}`;
  }
}
async function scanDocument(imageBuffer, documentType = "auto_detect", mimeType = "image/jpeg") {
  const base64Image = imageBuffer.toString("base64");
  const prompt = getPromptForType(documentType);
  const url = `${GEMINI_BASE_URL3}/models/${GEMINI_MODEL3}:generateContent`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: base64Image } }
        ]
      }],
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.1
      }
    })
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }
  const result = await response.json();
  const content = result.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  let jsonStr = content;
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }
  try {
    const parsed = JSON.parse(jsonStr);
    return {
      type: parsed.type || documentType,
      confidence: parsed.confidence || 0.8,
      data: parsed,
      rawText: parsed.rawText || ""
    };
  } catch {
    return {
      type: documentType,
      confidence: 0.5,
      data: { rawText: content, parseError: true },
      rawText: content
    };
  }
}
async function scanCarteGrise(imageBuffer, mimeType = "image/jpeg") {
  return scanDocument(imageBuffer, "carte_grise", mimeType);
}
async function scanInvoice(imageBuffer, mimeType = "image/jpeg") {
  return scanDocument(imageBuffer, "invoice", mimeType);
}
async function scanLicensePlate(imageBuffer, mimeType = "image/jpeg") {
  return scanDocument(imageBuffer, "license_plate", mimeType);
}
var GEMINI_BASE_URL3, GEMINI_MODEL3;
var init_ocrVisionService = __esm({
  "server/ocrVisionService.ts"() {
    "use strict";
    GEMINI_BASE_URL3 = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "http://localhost:1106/modelfarm/gemini";
    GEMINI_MODEL3 = "gemini-2.5-flash";
  }
});

// server/mediaBulkService.ts
var mediaBulkService_exports = {};
__export(mediaBulkService_exports, {
  bulkDeleteMedia: () => bulkDeleteMedia,
  bulkRenameMedia: () => bulkRenameMedia
});
import { eq as eq5, inArray as inArray2 } from "drizzle-orm";
async function bulkDeleteMedia(mediaIds) {
  const allMedia = [
    ...await db.select().from(quoteMedia).where(inArray2(quoteMedia.id, mediaIds)),
    ...await db.select().from(invoiceMedia).where(inArray2(invoiceMedia.id, mediaIds))
  ];
  for (const m of allMedia) {
    try {
      await deleteMedia(m.filePath);
    } catch (e) {
      console.error(`Failed to delete physical file ${m.filePath}`, e);
    }
  }
  await db.delete(quoteMedia).where(inArray2(quoteMedia.id, mediaIds));
  await db.delete(invoiceMedia).where(inArray2(invoiceMedia.id, mediaIds));
  return { success: true, count: allMedia.length };
}
async function bulkRenameMedia(mediaIds, newNames) {
  const results = [];
  for (let i = 0; i < mediaIds.length; i++) {
    const id = mediaIds[i];
    const newName = newNames[i];
    const qm = await db.select().from(quoteMedia).where(eq5(quoteMedia.id, id)).limit(1);
    if (qm.length > 0) {
      await db.update(quoteMedia).set({ fileName: newName }).where(eq5(quoteMedia.id, id));
      results.push({ id, status: "updated" });
      continue;
    }
    const im = await db.select().from(invoiceMedia).where(eq5(invoiceMedia.id, id)).limit(1);
    if (im.length > 0) {
      await db.update(invoiceMedia).set({ fileName: newName }).where(eq5(invoiceMedia.id, id));
      results.push({ id, status: "updated" });
    }
  }
  return results;
}
var init_mediaBulkService = __esm({
  "server/mediaBulkService.ts"() {
    "use strict";
    init_mediaService();
    init_schema();
    init_db();
  }
});

// server/index.ts
import express3 from "express";
import { createServer } from "http";
import fileUpload from "express-fileupload";
import path12 from "path";
import fs9 from "fs";

// server/routes.ts
init_storage();
init_localAuth();
init_schema();
init_db();
init_emailService();
init_smsService();
import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import { z as z2 } from "zod";
import { eq as eq6, sql as sql4, count, desc as desc3 } from "drizzle-orm";
import * as fs7 from "fs";
import * as path9 from "path";
import { execSync } from "child_process";
import bcrypt2 from "bcrypt";
import crypto from "crypto";

// server/objectStorage.ts
import { Client } from "@replit/object-storage";
import { randomUUID } from "crypto";
function getBucketId() {
  const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID || process.env.REPLIT_OBJECT_STORAGE_BUCKET_ID;
  if (!bucketId) {
    throw new Error("DEFAULT_OBJECT_STORAGE_BUCKET_ID not set");
  }
  return bucketId;
}
function getStorageClient() {
  return new Client({ bucketId: getBucketId() });
}
var ObjectNotFoundError = class _ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, _ObjectNotFoundError.prototype);
  }
};
var ObjectStorageService = class {
  client;
  constructor() {
    this.client = getStorageClient();
  }
  // Upload file directly to object storage (server-side upload)
  async uploadFileBuffer(buffer, contentType) {
    const objectId = randomUUID();
    const objectName = `.private/uploads/${objectId}`;
    console.log(`Uploading file: ${objectName}, size: ${buffer.length} bytes, type: ${contentType}`);
    const result = await this.client.uploadFromBytes(objectName, buffer);
    if (!result.ok) {
      const error = result;
      const errorMsg = typeof error.error === "string" ? error.error : JSON.stringify(error.error);
      console.error(`Upload failed:`, error.error);
      throw new Error(`Upload failed: ${errorMsg}`);
    }
    console.log(`Upload successful: ${objectName}`);
    return {
      objectPath: `/objects/uploads/${objectId}`,
      objectId
    };
  }
  // Helper to convert result value to Buffer
  toBuffer(value) {
    if (Buffer.isBuffer(value)) {
      return value;
    } else if (value instanceof Uint8Array) {
      return Buffer.from(value);
    } else if (Array.isArray(value) && value.length > 0) {
      return Buffer.isBuffer(value[0]) ? value[0] : Buffer.from(value[0]);
    } else {
      return Buffer.from(value);
    }
  }
  // Gets an object from storage by path - supports multiple path formats
  async getObject(objectPath) {
    const pathsToTry = [];
    if (objectPath.startsWith("/objects/")) {
      const parts = objectPath.slice(1).split("/");
      if (parts.length >= 2) {
        const entityId = parts.slice(1).join("/");
        pathsToTry.push(`.private/${entityId}`);
      }
    }
    pathsToTry.push(objectPath);
    if (!objectPath.startsWith(".private/") && !objectPath.startsWith("/")) {
      pathsToTry.push(`.private/${objectPath}`);
    }
    if (objectPath.startsWith("/")) {
      pathsToTry.push(objectPath.slice(1));
    }
    for (const storagePath of pathsToTry) {
      const result = await this.client.downloadAsBytes(storagePath);
      if (result.ok) {
        return { data: this.toBuffer(result.value), exists: true };
      }
    }
    throw new ObjectNotFoundError();
  }
  // Check if object exists
  async objectExists(objectPath) {
    if (!objectPath.startsWith("/objects/")) {
      return false;
    }
    const parts = objectPath.slice(1).split("/");
    if (parts.length < 2) {
      return false;
    }
    const entityId = parts.slice(1).join("/");
    const storagePath = `.private/${entityId}`;
    const result = await this.client.exists(storagePath);
    return result.ok && result.value;
  }
  // Downloads an object to the response.
  async downloadObject(objectPath, res) {
    try {
      const { data } = await this.getObject(objectPath);
      let contentType = "application/octet-stream";
      if (objectPath.includes(".")) {
        const ext = objectPath.split(".").pop()?.toLowerCase();
        const mimeTypes = {
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          png: "image/png",
          gif: "image/gif",
          webp: "image/webp",
          mp4: "video/mp4",
          webm: "video/webm",
          mov: "video/quicktime"
        };
        if (ext && mimeTypes[ext]) {
          contentType = mimeTypes[ext];
        }
      }
      res.set({
        "Content-Type": contentType,
        "Content-Length": data.length,
        "Cache-Control": "private, max-age=3600"
      });
      res.send(data);
    } catch (error) {
      console.error("Error downloading file:", error);
      if (!res.headersSent) {
        if (error instanceof ObjectNotFoundError) {
          res.status(404).json({ error: "Object not found" });
        } else {
          res.status(500).json({ error: "Error downloading file" });
        }
      }
    }
  }
  normalizeObjectEntityPath(rawPath) {
    if (rawPath.startsWith("/objects/")) {
      return rawPath;
    }
    return rawPath;
  }
  // Sets the ACL policy for an object (stores metadata alongside the object)
  async trySetObjectEntityAclPolicy(rawPath, aclPolicy) {
    const normalizedPath = this.normalizeObjectEntityPath(rawPath);
    if (!normalizedPath.startsWith("/objects/")) {
      return normalizedPath;
    }
    const parts = normalizedPath.slice(1).split("/");
    const entityId = parts.slice(1).join("/");
    const aclPath = `.private/${entityId}.acl`;
    const aclData = JSON.stringify(aclPolicy);
    await this.client.uploadFromText(aclPath, aclData);
    return normalizedPath;
  }
  // Gets the ACL policy for an object
  async getObjectAclPolicy(objectPath) {
    if (!objectPath.startsWith("/objects/")) {
      return null;
    }
    const parts = objectPath.slice(1).split("/");
    const entityId = parts.slice(1).join("/");
    const aclPath = `.private/${entityId}.acl`;
    const result = await this.client.downloadAsText(aclPath);
    if (!result.ok) {
      return null;
    }
    try {
      return JSON.parse(result.value);
    } catch {
      return null;
    }
  }
  // Checks if the user can access the object entity.
  async canAccessObjectEntity({
    userId,
    objectPath,
    requestedPermission
  }) {
    const aclPolicy = await this.getObjectAclPolicy(objectPath);
    if (!aclPolicy) {
      return false;
    }
    if (aclPolicy.owner === userId) {
      return true;
    }
    if (aclPolicy.visibility === "public" && requestedPermission === "read" /* READ */) {
      return true;
    }
    return false;
  }
};

// server/routes.ts
init_object_storage();
init_mediaService();

// server/wsClients.ts
var wsClients = /* @__PURE__ */ new Map();
function getWsClients() {
  return wsClients;
}
function sendWsNotification(userId, data) {
  const client = wsClients.get(userId);
  if (client && client.readyState === 1) {
    client.send(JSON.stringify(data));
  }
}

// server/tenantMiddleware.ts
init_db();
init_tenantContext();
function tenantMiddleware() {
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return next();
      }
      let garageSlug = null;
      let garageId = null;
      if (user.role === "superadmin") {
        const selectedGarageId = req.headers["x-garage-id"] || req.query.garageId || req.session?.selectedGarageId;
        if (selectedGarageId) {
          const result = await pool.query(
            `SELECT id, slug FROM garages WHERE id = $1`,
            [selectedGarageId]
          );
          if (result.rows.length > 0) {
            garageId = result.rows[0].id;
            garageSlug = result.rows[0].slug;
          }
        }
      } else if (user.garageId) {
        const result = await pool.query(
          `SELECT id, slug FROM garages WHERE id = $1`,
          [user.garageId]
        );
        if (result.rows.length > 0) {
          garageId = result.rows[0].id;
          garageSlug = result.rows[0].slug;
        }
      }
      if (garageSlug) {
        req.tenantSchema = getSchemaName(garageSlug);
        req.tenantGarageId = garageId;
        req.tenantGarageSlug = garageSlug;
      }
      next();
    } catch (error) {
      console.error("[TenantMiddleware] Error resolving tenant:", error);
      next();
    }
  };
}

// server/tenantStorage.ts
init_db();
init_tenantContext();
var TenantStorage = class {
  schemaName;
  constructor(garageSlug) {
    this.schemaName = getSchemaName(garageSlug);
  }
  async query(text2, params) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(`SET LOCAL search_path TO "${this.schemaName}", public`);
      const result = await client.query(text2, params);
      await client.query("COMMIT");
      return result;
    } catch (err2) {
      await client.query("ROLLBACK");
      throw err2;
    } finally {
      client.release();
    }
  }
  async getServices() {
    const result = await this.query(`SELECT * FROM services WHERE is_active = true ORDER BY name`);
    return result.rows.map(this.mapService);
  }
  async getAllServices() {
    const result = await this.query(`SELECT * FROM services ORDER BY name`);
    return result.rows.map(this.mapService);
  }
  async getService(id) {
    const result = await this.query(`SELECT * FROM services WHERE id = $1`, [id]);
    return result.rows[0] ? this.mapService(result.rows[0]) : void 0;
  }
  async createService(service) {
    const result = await this.query(
      `INSERT INTO services (name, description, base_price, category, is_active, estimated_duration, image_url, custom_form_fields)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        service.name,
        service.description,
        service.basePrice,
        service.category,
        service.isActive ?? true,
        service.estimatedDuration,
        service.imageUrl,
        service.customFormFields ? JSON.stringify(service.customFormFields) : null
      ]
    );
    return this.mapService(result.rows[0]);
  }
  async updateService(id, service) {
    const sets = [];
    const vals = [];
    let idx = 1;
    if (service.name !== void 0) {
      sets.push(`name = $${idx++}`);
      vals.push(service.name);
    }
    if (service.description !== void 0) {
      sets.push(`description = $${idx++}`);
      vals.push(service.description);
    }
    if (service.basePrice !== void 0) {
      sets.push(`base_price = $${idx++}`);
      vals.push(service.basePrice);
    }
    if (service.category !== void 0) {
      sets.push(`category = $${idx++}`);
      vals.push(service.category);
    }
    if (service.isActive !== void 0) {
      sets.push(`is_active = $${idx++}`);
      vals.push(service.isActive);
    }
    if (service.estimatedDuration !== void 0) {
      sets.push(`estimated_duration = $${idx++}`);
      vals.push(service.estimatedDuration);
    }
    if (service.imageUrl !== void 0) {
      sets.push(`image_url = $${idx++}`);
      vals.push(service.imageUrl);
    }
    sets.push(`updated_at = NOW()`);
    vals.push(id);
    const result = await this.query(
      `UPDATE services SET ${sets.join(", ")} WHERE id = $${idx} RETURNING *`,
      vals
    );
    return this.mapService(result.rows[0]);
  }
  async deleteService(id) {
    await this.query(`DELETE FROM services WHERE id = $1`, [id]);
  }
  async getQuotes(clientId) {
    let query = `SELECT * FROM quotes`;
    const params = [];
    if (clientId) {
      query += ` WHERE client_id = $1`;
      params.push(clientId);
    }
    query += ` ORDER BY created_at DESC`;
    const result = await this.query(query, params);
    return result.rows.map(this.mapQuote);
  }
  async getQuote(id) {
    const result = await this.query(`SELECT * FROM quotes WHERE id = $1`, [id]);
    return result.rows[0] ? this.mapQuote(result.rows[0]) : void 0;
  }
  async getInvoices(clientId) {
    let query = `SELECT * FROM invoices`;
    const params = [];
    if (clientId) {
      query += ` WHERE client_id = $1`;
      params.push(clientId);
    }
    query += ` ORDER BY created_at DESC`;
    const result = await this.query(query, params);
    return result.rows.map(this.mapInvoice);
  }
  async getInvoice(id) {
    const result = await this.query(`SELECT * FROM invoices WHERE id = $1`, [id]);
    return result.rows[0] ? this.mapInvoice(result.rows[0]) : void 0;
  }
  async getReservations(clientId) {
    let query = `SELECT * FROM reservations`;
    const params = [];
    if (clientId) {
      query += ` WHERE client_id = $1`;
      params.push(clientId);
    }
    query += ` ORDER BY scheduled_date DESC`;
    const result = await this.query(query, params);
    return result.rows.map(this.mapReservation);
  }
  async getReservation(id) {
    const result = await this.query(`SELECT * FROM reservations WHERE id = $1`, [id]);
    return result.rows[0] ? this.mapReservation(result.rows[0]) : void 0;
  }
  async getNotifications(userId) {
    const result = await this.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows.map(this.mapNotification);
  }
  async getReviews() {
    const result = await this.query(`SELECT * FROM reviews ORDER BY created_at DESC`);
    return result.rows.map(this.mapReview);
  }
  async getQuoteMedia(quoteId) {
    const result = await this.query(
      `SELECT * FROM quote_media WHERE quote_id = $1 ORDER BY created_at ASC`,
      [quoteId]
    );
    return result.rows.map(this.mapQuoteMedia);
  }
  async getInvoiceMedia(invoiceId) {
    const result = await this.query(
      `SELECT * FROM invoice_media WHERE invoice_id = $1 ORDER BY created_at ASC`,
      [invoiceId]
    );
    return result.rows.map(this.mapInvoiceMedia);
  }
  async getDeliveryNotes(clientId) {
    let query = `SELECT * FROM delivery_notes`;
    const params = [];
    if (clientId) {
      query += ` WHERE client_id = $1`;
      params.push(clientId);
    }
    query += ` ORDER BY created_at DESC`;
    const result = await this.query(query, params);
    return result.rows.map(this.mapDeliveryNote);
  }
  async getTableCount(tableName) {
    const result = await this.query(`SELECT COUNT(*) as cnt FROM "${tableName}"`);
    return parseInt(result.rows[0].cnt);
  }
  async getSchemaStats() {
    const stats = {};
    const tables = ["services", "quotes", "invoices", "reservations", "reviews", "notifications", "quote_media", "invoice_media"];
    for (const table of tables) {
      try {
        stats[table] = await this.getTableCount(table);
      } catch {
        stats[table] = 0;
      }
    }
    return stats;
  }
  mapService(row) {
    return {
      id: row.id,
      garageId: row.garage_id,
      name: row.name,
      description: row.description,
      basePrice: row.base_price,
      category: row.category,
      isActive: row.is_active,
      estimatedDuration: row.estimated_duration,
      imageUrl: row.image_url,
      customFormFields: row.custom_form_fields,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
  mapQuote(row) {
    return {
      id: row.id,
      garageId: row.garage_id,
      reference: row.reference,
      clientId: row.client_id,
      serviceId: row.service_id,
      status: row.status,
      paymentMethod: row.payment_method,
      requestDetails: row.request_details,
      quoteAmount: row.quote_amount,
      wheelCount: row.wheel_count,
      diameter: row.diameter,
      wheelPositions: row.wheel_positions,
      priceExcludingTax: row.price_excluding_tax,
      taxRate: row.tax_rate,
      taxAmount: row.tax_amount,
      productDetails: row.product_details,
      notes: row.notes,
      validUntil: row.valid_until,
      viewToken: row.view_token,
      emailSentAt: row.email_sent_at,
      viewedAt: row.viewed_at,
      vehicleRegistration: row.vehicle_registration,
      vehicleMake: row.vehicle_make,
      vehicleModel: row.vehicle_model,
      vehicleVin: row.vehicle_vin,
      vehicleFuelType: row.vehicle_fuel_type,
      vehicleFiscalPower: row.vehicle_fiscal_power,
      vehicleFirstRegDate: row.vehicle_first_reg_date,
      vehicleColor: row.vehicle_color,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
  mapInvoice(row) {
    return {
      id: row.id,
      garageId: row.garage_id,
      quoteId: row.quote_id,
      clientId: row.client_id,
      invoiceNumber: row.invoice_number,
      amount: row.amount,
      paymentMethod: row.payment_method,
      wheelCount: row.wheel_count,
      diameter: row.diameter,
      priceExcludingTax: row.price_excluding_tax,
      taxRate: row.tax_rate,
      taxAmount: row.tax_amount,
      productDetails: row.product_details,
      status: row.status,
      stripeSessionId: row.stripe_session_id,
      stripePaymentIntentId: row.stripe_payment_intent_id,
      paymentLink: row.payment_link,
      dueDate: row.due_date,
      paidAt: row.paid_at,
      viewToken: row.view_token,
      emailSentAt: row.email_sent_at,
      viewedAt: row.viewed_at,
      notes: row.notes,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
  mapReservation(row) {
    return {
      id: row.id,
      reference: row.reference,
      garageId: row.garage_id,
      quoteId: row.quote_id,
      clientId: row.client_id,
      serviceId: row.service_id,
      assignedEmployeeId: row.assigned_employee_id,
      scheduledDate: row.scheduled_date,
      estimatedEndDate: row.estimated_end_date,
      wheelCount: row.wheel_count,
      diameter: row.diameter,
      wheelPositions: row.wheel_positions,
      priceExcludingTax: row.price_excluding_tax,
      taxRate: row.tax_rate,
      taxAmount: row.tax_amount,
      productDetails: row.product_details,
      status: row.status,
      notes: row.notes,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
  mapNotification(row) {
    return {
      id: row.id,
      userId: row.user_id,
      type: row.type,
      title: row.title,
      message: row.message,
      relatedId: row.related_id,
      isRead: row.is_read,
      createdAt: row.created_at
    };
  }
  mapReview(row) {
    return {
      id: row.id,
      garageId: row.garage_id,
      quoteId: row.quote_id,
      invoiceId: row.invoice_id,
      clientId: row.client_id,
      clientName: row.client_name,
      rating: row.rating,
      comment: row.comment,
      reviewToken: row.review_token,
      isApproved: row.is_approved,
      createdAt: row.created_at
    };
  }
  mapQuoteMedia(row) {
    return {
      id: row.id,
      quoteId: row.quote_id,
      fileType: row.file_type,
      filePath: row.file_path,
      fileName: row.file_name,
      fileSize: row.file_size,
      createdAt: row.created_at
    };
  }
  mapInvoiceMedia(row) {
    return {
      id: row.id,
      invoiceId: row.invoice_id,
      fileType: row.file_type,
      filePath: row.file_path,
      fileName: row.file_name,
      fileSize: row.file_size,
      createdAt: row.created_at
    };
  }
  mapDeliveryNote(row) {
    return {
      id: row.id,
      garageId: row.garage_id,
      clientId: row.client_id,
      deliveryNoteNumber: row.delivery_note_number,
      month: row.month,
      year: row.year,
      totalAmount: row.total_amount,
      totalHT: row.total_ht,
      totalTVA: row.total_tva,
      status: row.status,
      showPrices: row.show_prices,
      notes: row.notes,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
};
function createTenantStorage(garageSlug) {
  return new TenantStorage(garageSlug);
}

// server/routes.ts
init_db();
init_urlHelper();
import { parse } from "url";
var objectStorageService = null;
try {
  objectStorageService = new ObjectStorageService();
} catch (e) {
  const hasBucketConfig = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID || process.env.REPLIT_OBJECT_STORAGE_BUCKET_ID;
  if (hasBucketConfig) {
    console.warn("Object storage not available:", e.message);
  } else {
    console.log("[ObjectStorage] No bucket configured \u2014 using local /uploads/ fallback.");
  }
}
var downloadFileFromPath = downloadMedia;
var deleteFileAtPath = deleteMedia;
var uploadToStorage = uploadMedia;
async function processMediaAfterCreation(mediaEntries, reference, folder, updateFn) {
  const { addWatermarkToImage: addWatermarkToImage2 } = await Promise.resolve().then(() => (init_imageWatermark(), imageWatermark_exports));
  for (let i = 0; i < mediaEntries.length; i++) {
    const entry = mediaEntries[i];
    const ext = path9.extname(entry.fileName || entry.filePath) || ".jpg";
    const cleanRef = reference.replace(/[^a-zA-Z0-9\-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
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
          const mimeType = ext.toLowerCase().includes("png") ? "image/png" : ext.toLowerCase().includes("webp") ? "image/webp" : "image/jpeg";
          fileData = await addWatermarkToImage2(fileData, reference, mimeType);
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
    } catch (err2) {
      console.error(`[PostProcess] Error processing media ${entry.id}:`, err2);
    }
  }
}
var BACKUP_EMAIL_RECIPIENT = "mytoolslast@gmail.com";
var fetchMediaFileBuffer = downloadMedia;
async function sendMediaZipByEmail(type, entityId, reference) {
  try {
    const mediaList = type === "quote" ? await storage.getQuoteMedia(entityId) : await storage.getInvoiceMedia(entityId);
    const imageMedia = mediaList.filter((m) => m.fileType === "image");
    if (imageMedia.length === 0) {
      console.log(`[ZipEmail] No images for ${type} ${reference}, skipping`);
      return;
    }
    const archiver = (await import("archiver")).default;
    const { PassThrough } = await import("stream");
    const buffers = [];
    const passThrough = new PassThrough();
    passThrough.on("data", (chunk) => buffers.push(chunk));
    const archive = archiver("zip", { zlib: { level: 5 } });
    archive.on("warning", (err2) => console.warn("[ZipEmail] Archive warning:", err2));
    archive.on("error", (err2) => {
      throw err2;
    });
    archive.pipe(passThrough);
    for (let i = 0; i < imageMedia.length; i++) {
      const m = imageMedia[i];
      try {
        const buffer = await fetchMediaFileBuffer(m.filePath);
        if (buffer) {
          const ext = path9.extname(m.fileName || ".jpg");
          const cleanRef = reference.replace(/[^a-zA-Z0-9]/g, "_");
          const cleanName = `${cleanRef}_${i + 1}${ext}`;
          archive.append(buffer, { name: cleanName });
        }
      } catch (fileErr) {
        console.error(`[ZipEmail] Error reading file ${m.filePath}:`, fileErr);
      }
    }
    await archive.finalize();
    await new Promise((resolve2, reject) => {
      passThrough.on("end", resolve2);
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
      attachments: [{ filename: zipFileName, content: zipBuffer }]
    });
    if (emailResult.success) {
      console.log(`[ZipEmail] ZIP sent for ${type} ${reference} to ${BACKUP_EMAIL_RECIPIENT}`);
    } else {
      console.error(`[ZipEmail] Failed to send for ${type} ${reference}:`, emailResult.error);
    }
  } catch (err2) {
    console.error(`[ZipEmail] Error creating/sending ZIP for ${type} ${reference}:`, err2);
  }
}
var wsClients2 = getWsClients();
function sanitizeUser(user) {
  const { password, ...sanitized } = user;
  return sanitized;
}
function sanitizeUsers(users2) {
  return users2.map(sanitizeUser);
}
function getGarageScope(user) {
  if (!user) return void 0;
  if (user.role === "superadmin") return void 0;
  return user.garageId || void 0;
}
function hasGarageAccess(user, resourceGarageId) {
  if (!user) return false;
  if (user.role === "superadmin" || user.role === "rootadmin") return true;
  if (resourceGarageId === null || resourceGarageId === void 0 || resourceGarageId === "") return false;
  return user.garageId === resourceGarageId;
}
async function logAuditEvent(ctx) {
  try {
    const user = ctx.req.user;
    const changes = [];
    if (ctx.previousData && ctx.newData) {
      const allKeys = Array.from(/* @__PURE__ */ new Set([...Object.keys(ctx.previousData), ...Object.keys(ctx.newData)]));
      for (const key of allKeys) {
        const prev = ctx.previousData[key];
        const curr = ctx.newData[key];
        if (JSON.stringify(prev) !== JSON.stringify(curr)) {
          changes.push({ field: key, previousValue: prev, newValue: curr });
        }
      }
    }
    const logData = {
      entityType: ctx.entityType,
      entityId: ctx.entityId,
      action: ctx.action,
      actorId: user?.id ?? null,
      actorRole: user?.role ?? null,
      actorName: user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email : null,
      summary: ctx.summary,
      metadata: ctx.metadata ?? null,
      ipAddress: ctx.req.ip ?? ctx.req.socket?.remoteAddress ?? null,
      userAgent: ctx.req.headers["user-agent"] ?? null
    };
    await storage.createAuditLog(logData, changes);
  } catch (error) {
    console.error("Error logging audit event:", error);
  }
}
var actionLabels = {
  created: "cr\xE9\xE9",
  updated: "modifi\xE9",
  deleted: "supprim\xE9",
  validated: "valid\xE9",
  rejected: "refus\xE9",
  completed: "termin\xE9",
  cancelled: "annul\xE9",
  paid: "pay\xE9",
  confirmed: "confirm\xE9"
};
var entityLabels = {
  quote: "Devis",
  invoice: "Facture",
  reservation: "R\xE9servation",
  service: "Service",
  workflow: "Workflow",
  workflow_step: "\xC9tape de workflow",
  user: "Utilisateur",
  workshop_task: "T\xE2che atelier"
};
async function registerRoutes(app3, server) {
  try {
    await db.execute(sql4`
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
    console.warn("[Migration] landing_settings:", e.message);
  }
  try {
    await db.execute(sql4`
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
    const count2 = await storage.countPanelUsers();
    if (count2 === 0) {
      const bcrypt3 = await import("bcrypt");
      const defaultEmail = process.env.PANEL_ADMIN_EMAIL || "admin@autoreport.com";
      const defaultPassword = process.env.PANEL_ADMIN_PASSWORD || "AutoReport2024!";
      const hash = await bcrypt3.default.hash(defaultPassword, 10);
      await storage.createPanelUser({
        email: defaultEmail,
        passwordHash: hash,
        role: "superadmin",
        firstName: "Super",
        lastName: "Admin"
      });
      console.log(`[Panel] Superadmin cr\xE9\xE9: ${defaultEmail} / ${defaultPassword}`);
    }
  } catch (e) {
    console.warn("[Migration] panel_users:", e.message);
  }
  try {
    await db.execute(sql4`
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
    await db.execute(sql4`ALTER TABLE landing_settings ADD COLUMN IF NOT EXISTS ai_prompt text`);
  } catch (e) {
    console.warn("[Migration] repair_sheets:", e.message);
  }
  const wss = new WebSocketServer({ noServer: true });
  server.on("upgrade", (request, socket, head) => {
    const { pathname } = parse(request.url || "", true);
    if (pathname === "/ws") {
      wss.handleUpgrade(request, socket, head, (ws2) => {
        wss.emit("connection", ws2, request);
      });
    }
  });
  app3.use((req, res, next) => {
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
  app3.use("/uploads", express.static(path9.join(process.cwd(), "uploads")));
  app3.use("/backups", express.static(path9.join(process.cwd(), "backups")));
  app3.get("/uploads/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path9.join(process.cwd(), "uploads", filename);
    if (fs7.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "Fichier non trouv\xE9 localement" });
    }
  });
  app3.get("/r2/*", async (req, res) => {
    try {
      const key = req.params[0];
      if (!key) return res.status(400).json({ message: "Cl\xE9 R2 manquante" });
      const { isCloudflareR2Configured: isCloudflareR2Configured2, downloadFromR2: downloadFromR22 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
      if (!isCloudflareR2Configured2()) {
        return res.status(503).json({ message: "Cloudflare R2 non configur\xE9" });
      }
      const { data, contentType } = await downloadFromR22(key);
      res.set("Content-Type", contentType);
      res.set("Cache-Control", "public, max-age=31536000, immutable");
      res.send(data);
    } catch (err2) {
      console.error(`[R2Proxy] Error serving ${req.params[0]}:`, err2.message);
      res.status(404).json({ message: "Fichier R2 non trouv\xE9" });
    }
  });
  await setupAuth(app3);
  app3.use(tenantMiddleware());
  registerObjectStorageRoutes(app3);
  const { registerSwaggerRoutes: registerSwaggerRoutes2 } = await Promise.resolve().then(() => (init_swagger(), swagger_exports));
  registerSwaggerRoutes2(app3);
  app3.post("/api/plaid/create-link-token", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { createLinkToken: createLinkToken2 } = await Promise.resolve().then(() => (init_plaidService(), plaidService_exports));
      const userId = req.user.id;
      const linkToken = await createLinkToken2(userId);
      res.json({ link_token: linkToken });
    } catch (error) {
      console.error("Plaid create link token error:", error);
      res.status(500).json({ message: "Erreur lors de la cr\xE9ation du lien Plaid", error: error.message });
    }
  });
  app3.post("/api/plaid/exchange-token", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { exchangePublicToken: exchangePublicToken2 } = await Promise.resolve().then(() => (init_plaidService(), plaidService_exports));
      const { public_token } = req.body;
      if (!public_token) {
        return res.status(400).json({ message: "public_token est requis" });
      }
      const result = await exchangePublicToken2(public_token);
      res.json(result);
    } catch (error) {
      console.error("Plaid exchange token error:", error);
      res.status(500).json({ message: "Erreur lors de l'\xE9change du token", error: error.message });
    }
  });
  app3.get("/api/plaid/accounts", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { getAccounts: getAccounts2 } = await Promise.resolve().then(() => (init_plaidService(), plaidService_exports));
      const accounts = await getAccounts2();
      res.json({ accounts });
    } catch (error) {
      console.error("Plaid get accounts error:", error);
      res.status(500).json({ message: "Erreur lors de la r\xE9cup\xE9ration des comptes", error: error.message });
    }
  });
  app3.get("/api/plaid/balances", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { getBalances: getBalances2 } = await Promise.resolve().then(() => (init_plaidService(), plaidService_exports));
      const accounts = await getBalances2();
      res.json({ accounts });
    } catch (error) {
      console.error("Plaid get balances error:", error);
      res.status(500).json({ message: "Erreur lors de la r\xE9cup\xE9ration des soldes", error: error.message });
    }
  });
  app3.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(sanitizeUser(user));
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app3.get("/api/plans", async (req, res) => {
    try {
      const plans = await storage.getSubscriptionPlans(true);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la r\xE9cup\xE9ration des plans" });
    }
  });
  app3.post("/api/reports/generate", async (req, res) => {
    try {
      const { make, model, year, mileage, issue, guestEmail, finition, motorisation, carburant, gearbox, usage } = req.body;
      if (!make || !model || !year) {
        return res.status(400).json({ message: "Marque, mod\xE8le et ann\xE9e sont requis" });
      }
      const userId = req.user?.id ?? null;
      const userRole = req.user?.role;
      const isAdminUser = !!userRole && ["admin", "superadmin", "rootadmin", "employe"].includes(userRole);
      const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
      if (userId && !isAdminUser) {
        const freeCount = await storage.countFreeReportsByUser(userId);
        const activeSub = await storage.getActiveSubscription(userId);
        if (freeCount >= 1 && !activeSub) {
          return res.status(429).json({
            message: "Vous avez d\xE9j\xE0 utilis\xE9 votre rapport gratuit. Souscrivez \xE0 un plan pour g\xE9n\xE9rer plus de rapports.",
            code: "FREE_LIMIT_REACHED"
          });
        }
        if (activeSub) {
          if (activeSub.reportsUsed >= activeSub.reportsIncluded) {
            return res.status(429).json({
              message: "Quota de rapports atteint pour votre abonnement.",
              code: "SUBSCRIPTION_QUOTA_REACHED"
            });
          }
          await storage.updateUserSubscription(activeSub.id, { reportsUsed: activeSub.reportsUsed + 1 });
        }
      }
      const { generateAiReport: generateAiReport2 } = await Promise.resolve().then(() => (init_aiReportService(), aiReportService_exports));
      let customPrompt;
      try {
        const settings = await storage.getLandingSettings();
        customPrompt = settings.aiPrompt || void 0;
      } catch {
      }
      const report = await generateAiReport2({ make, model, year, mileage, issue: issue || void 0, finition, motorisation, carburant, gearbox, usage }, customPrompt);
      const garageId = req.tenantGarageId || null;
      const isSubscribed = userId && !isAdminUser ? !!await storage.getActiveSubscription(userId) : false;
      try {
        const contentStr = typeof report === "object" ? JSON.stringify(report) : String(report);
        await storage.createAiReport({
          userId,
          garageId,
          make,
          model,
          year,
          mileage: mileage || null,
          issue: issue || null,
          content: contentStr,
          status: "generated",
          metadata: {
            urgencyLevel: report.urgencyLevel,
            estimatedCost: report.estimatedCost,
            finition: finition || null,
            motorisation: motorisation || null,
            carburant: carburant || null,
            gearbox: gearbox || null,
            usage: usage || null,
            ...isAdminUser ? { generatedByAdmin: true, adminRole: userRole } : {}
          },
          guestEmail: guestEmail ? guestEmail.toLowerCase() : null,
          ipAddress: ip,
          // Admin-generated reports are NOT counted as "free" so they don't pollute quota counters
          isFree: isAdminUser ? false : !isSubscribed
        });
      } catch (dbErr) {
        console.error("[AIReport] Failed to persist report:", dbErr);
      }
      if (guestEmail) {
        try {
          const { sendAiReportEmail: sendAiReportEmail2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
          await sendAiReportEmail2(guestEmail.toLowerCase(), { make, model, year, mileage, issue });
        } catch (emailErr) {
          console.error("[AIReport] Failed to send report email:", emailErr);
        }
      }
      res.json(report);
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({ message: "Erreur lors de la g\xE9n\xE9ration du rapport" });
    }
  });
  app3.post("/api/reports/download-pdf", async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Vous devez \xEAtre connect\xE9 pour t\xE9l\xE9charger un rapport.",
          code: "AUTH_REQUIRED"
        });
      }
      const reportData = req.body;
      if (!reportData || !reportData.vehicleInfo) {
        return res.status(400).json({ message: "Donn\xE9es du rapport requises" });
      }
      const { generateReportHtml: generateReportHtml2 } = await Promise.resolve().then(() => (init_aiReportService(), aiReportService_exports));
      const html = generateReportHtml2(reportData);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="rapport-${reportData.vehicleInfo.make}-${Date.now()}.html"`);
      res.send(html);
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Erreur lors de la g\xE9n\xE9ration du PDF" });
    }
  });
  app3.post("/api/subscriptions/checkout", async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Connexion requise pour souscrire." });
      }
      const { planId } = req.body;
      if (!planId) return res.status(400).json({ message: "planId requis" });
      const plan = await storage.getSubscriptionPlan(planId);
      if (!plan || !plan.isActive) return res.status(404).json({ message: "Plan introuvable" });
      const { getStripe: getStripe2 } = await Promise.resolve().then(() => (init_stripeService(), stripeService_exports));
      const stripe = getStripe2();
      if (!stripe) return res.status(503).json({ message: "Stripe non configur\xE9" });
      const baseUrl = req.headers["x-forwarded-proto"] ? `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"] || req.headers.host}` : `http://${req.headers.host}`;
      const isRecurring = plan.period === "monthly" || plan.period === "yearly";
      let session2;
      if (isRecurring && plan.stripePriceId) {
        session2 = await stripe.checkout.sessions.create({
          mode: "subscription",
          line_items: [{ price: plan.stripePriceId, quantity: 1 }],
          success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=subscription`,
          cancel_url: `${baseUrl}/payment-cancel`,
          customer_email: req.user.email || void 0,
          metadata: { planId, userId: req.user.id }
        });
      } else {
        session2 = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items: [{
            price_data: {
              currency: plan.currency || "eur",
              product_data: { name: plan.name, description: plan.description || void 0 },
              unit_amount: Math.round(Number(plan.price) * 100)
            },
            quantity: 1
          }],
          success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=plan`,
          cancel_url: `${baseUrl}/payment-cancel`,
          customer_email: req.user.email || void 0,
          metadata: { planId, userId: req.user.id }
        });
      }
      const periodEnd = plan.period === "monthly" ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3) : plan.period === "yearly" ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3) : null;
      await storage.createUserSubscription({
        userId: req.user.id,
        planId,
        status: "pending",
        reportsUsed: 0,
        reportsIncluded: plan.reportsIncluded,
        stripeSessionId: session2.id,
        currentPeriodEnd: periodEnd
      });
      res.json({ url: session2.url, sessionId: session2.id });
    } catch (error) {
      console.error("Subscription checkout error:", error);
      res.status(500).json({ message: "Erreur lors de la cr\xE9ation du paiement" });
    }
  });
  app3.post("/api/subscriptions/confirm", async (req, res) => {
    try {
      const { sessionId } = req.body;
      if (!sessionId) return res.status(400).json({ message: "sessionId requis" });
      const sub = await storage.getSubscriptionBySessionId(sessionId);
      if (!sub) return res.status(404).json({ message: "Abonnement introuvable" });
      const { getStripe: getStripe2 } = await Promise.resolve().then(() => (init_stripeService(), stripeService_exports));
      const stripe = getStripe2();
      if (stripe) {
        const session2 = await stripe.checkout.sessions.retrieve(sessionId);
        if (session2.payment_status === "paid" || session2.status === "complete") {
          await storage.updateUserSubscription(sub.id, {
            status: "active",
            stripeSubscriptionId: session2.subscription || void 0
          });
          return res.json({ success: true });
        }
      }
      res.json({ success: false, status: sub.status });
    } catch (error) {
      res.status(500).json({ message: "Erreur de confirmation" });
    }
  });
  app3.get("/api/panel/plans", requirePanelAuth(), async (req, res) => {
    try {
      const plans = await storage.getSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.post("/api/panel/plans", requirePanelAuth("admin"), async (req, res) => {
    try {
      const { name, description, price, currency, period, reportsIncluded, stripePriceId, stripeProductId, isActive, sortOrder } = req.body;
      if (!name || !price || !period) return res.status(400).json({ message: "name, price, period requis" });
      const plan = await storage.createSubscriptionPlan({
        name,
        description,
        price: String(price),
        currency: currency || "eur",
        period,
        reportsIncluded: reportsIncluded || 5,
        stripePriceId,
        stripeProductId,
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0
      });
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Erreur cr\xE9ation plan" });
    }
  });
  app3.put("/api/panel/plans/:id", requirePanelAuth("admin"), async (req, res) => {
    try {
      const plan = await storage.updateSubscriptionPlan(req.params.id, req.body);
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Erreur mise \xE0 jour plan" });
    }
  });
  app3.delete("/api/panel/plans/:id", requirePanelAuth("admin"), async (req, res) => {
    try {
      await storage.deleteSubscriptionPlan(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Erreur suppression plan" });
    }
  });
  app3.get("/api/panel/subscriptions", requirePanelAuth(), async (req, res) => {
    try {
      const subs = await storage.getAllSubscriptions();
      res.json(subs);
    } catch (error) {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.get("/api/reports", async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Non autoris\xE9" });
      }
      const reports = await storage.getAiReports(req.user.id);
      res.json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      res.status(500).json({ message: "Erreur lors de la r\xE9cup\xE9ration des rapports" });
    }
  });
  app3.get("/api/reports/:id", async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Non autoris\xE9" });
      }
      const report = await storage.getAiReport(req.params.id);
      if (!report) {
        return res.status(404).json({ message: "Rapport non trouv\xE9" });
      }
      if (report.userId && report.userId !== req.user.id && !["admin", "superadmin", "rootadmin"].includes(req.user.role || "")) {
        return res.status(403).json({ message: "Acc\xE8s refus\xE9" });
      }
      res.json(report);
    } catch (error) {
      console.error("Error fetching report:", error);
      res.status(500).json({ message: "Erreur lors de la r\xE9cup\xE9ration du rapport" });
    }
  });
  app3.get("/api/admin/ai-reports", async (req, res) => {
    try {
      if (!req.user || !["admin", "superadmin", "rootadmin"].includes(req.user.role || "")) {
        return res.status(403).json({ message: "Acc\xE8s refus\xE9" });
      }
      const garageId = req.tenantGarageId || void 0;
      const reports = garageId ? await storage.getAiReports(void 0, garageId) : await storage.getAllAiReports();
      res.json(reports);
    } catch (error) {
      console.error("Error fetching admin reports:", error);
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.delete("/api/admin/ai-reports/:id", async (req, res) => {
    try {
      if (!req.user || !["admin", "superadmin", "rootadmin"].includes(req.user.role || "")) {
        return res.status(403).json({ message: "Acc\xE8s refus\xE9" });
      }
      await storage.deleteAiReport(req.params.id);
      res.json({ message: "Rapport supprim\xE9" });
    } catch (error) {
      console.error("Error deleting report:", error);
      res.status(500).json({ message: "Erreur" });
    }
  });
  const PANEL_JWT_SECRET = process.env.PANEL_JWT_SECRET || "panel-secret-autoreport-2024";
  async function verifyPanelToken(req) {
    try {
      const auth = req.headers.authorization;
      if (!auth?.startsWith("Bearer ")) return null;
      const token = auth.slice(7);
      const jwt2 = await import("jsonwebtoken");
      const decoded = jwt2.default.verify(token, PANEL_JWT_SECRET);
      const user = await storage.getPanelUserById(decoded.id);
      return user || null;
    } catch {
      return null;
    }
  }
  const ROLE_LEVELS = { manager: 1, admin: 2, superadmin: 3 };
  function requirePanelAuth(minRole) {
    return async (req, res, next) => {
      const user = await verifyPanelToken(req);
      if (!user) return res.status(401).json({ message: "Non authentifi\xE9" });
      if (minRole) {
        const userLevel = ROLE_LEVELS[user.role] ?? 0;
        const required = ROLE_LEVELS[minRole] ?? 99;
        if (userLevel < required) return res.status(403).json({ message: "Acc\xE8s refus\xE9 \u2014 niveau insuffisant" });
      }
      req.panelUser = user;
      next();
    };
  }
  app3.post("/api/panel/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ message: "Email et mot de passe requis" });
      const user = await storage.getPanelUserByEmail(email);
      if (!user) return res.status(401).json({ message: "Identifiants invalides" });
      const bcrypt3 = await import("bcrypt");
      const valid = await bcrypt3.default.compare(password, user.passwordHash);
      if (!valid) return res.status(401).json({ message: "Identifiants invalides" });
      const jwt2 = await import("jsonwebtoken");
      const token = jwt2.default.sign({ id: user.id, email: user.email, role: user.role }, PANEL_JWT_SECRET, { expiresIn: "7d" });
      const { passwordHash: _, ...safeUser } = user;
      res.json({ token, user: safeUser });
    } catch (error) {
      console.error("Panel login error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.get("/api/panel/auth/me", requirePanelAuth(), async (req, res) => {
    const { passwordHash: _, ...safeUser } = req.panelUser;
    res.json(safeUser);
  });
  app3.get("/api/panel/users", requirePanelAuth("admin"), async (req, res) => {
    try {
      const users2 = await storage.getAllPanelUsers();
      res.json(users2.map(({ passwordHash: _, ...u }) => u));
    } catch {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.post("/api/panel/users", requirePanelAuth("admin"), async (req, res) => {
    try {
      const { email, password, role, firstName, lastName } = req.body;
      if (!email || !password) return res.status(400).json({ message: "Email et mot de passe requis" });
      const allowedRole = role || "manager";
      const callerLevel = ROLE_LEVELS[req.panelUser.role] ?? 0;
      const targetLevel = ROLE_LEVELS[allowedRole] ?? 0;
      if (targetLevel >= callerLevel) return res.status(403).json({ message: "Vous ne pouvez pas cr\xE9er un r\xF4le sup\xE9rieur ou \xE9gal au v\xF4tre" });
      const bcrypt3 = await import("bcrypt");
      const hash = await bcrypt3.default.hash(password, 10);
      const user = await storage.createPanelUser({ email, passwordHash: hash, role: allowedRole, firstName, lastName });
      const { passwordHash: _, ...safe } = user;
      res.json(safe);
    } catch (error) {
      if (error.code === "23505") return res.status(409).json({ message: "Email d\xE9j\xE0 utilis\xE9" });
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.put("/api/panel/users/:id", requirePanelAuth("admin"), async (req, res) => {
    try {
      const { email, password, role, firstName, lastName } = req.body;
      const callerLevel = ROLE_LEVELS[req.panelUser.role] ?? 0;
      if (role) {
        const targetLevel = ROLE_LEVELS[role] ?? 0;
        if (targetLevel >= callerLevel) return res.status(403).json({ message: "Vous ne pouvez pas assigner un r\xF4le sup\xE9rieur ou \xE9gal au v\xF4tre" });
      }
      const updates = { firstName, lastName };
      if (email) updates.email = email;
      if (role) updates.role = role;
      if (password) {
        const bcrypt3 = await import("bcrypt");
        updates.passwordHash = await bcrypt3.default.hash(password, 10);
      }
      const user = await storage.updatePanelUser(req.params.id, updates);
      const { passwordHash: _, ...safe } = user;
      res.json(safe);
    } catch (error) {
      if (error.code === "23505") return res.status(409).json({ message: "Email d\xE9j\xE0 utilis\xE9" });
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.delete("/api/panel/users/:id", requirePanelAuth("admin"), async (req, res) => {
    try {
      if (req.panelUser.id === req.params.id) return res.status(400).json({ message: "Vous ne pouvez pas vous supprimer" });
      await storage.deletePanelUser(req.params.id);
      res.json({ message: "Utilisateur supprim\xE9" });
    } catch {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.put("/api/panel/auth/change-password", requirePanelAuth(), async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) return res.status(400).json({ message: "Mot de passe actuel et nouveau requis" });
      if (newPassword.length < 8) return res.status(400).json({ message: "Le nouveau mot de passe doit contenir au moins 8 caract\xE8res" });
      const bcrypt3 = await import("bcrypt");
      const valid = await bcrypt3.default.compare(currentPassword, req.panelUser.passwordHash);
      if (!valid) return res.status(401).json({ message: "Mot de passe actuel incorrect" });
      const hash = await bcrypt3.default.hash(newPassword, 10);
      await storage.updatePanelUser(req.panelUser.id, { passwordHash: hash });
      res.json({ message: "Mot de passe mis \xE0 jour" });
    } catch {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.get("/api/landing/settings", async (req, res) => {
    try {
      const settings = await storage.getLandingSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching landing settings:", error);
      res.json({
        appName: "AutoReport",
        appTagline: "Rapports automobiles intelligents propuls\xE9s par l'IA.",
        heroTitle: "Diagnostics automobiles nouvelle g\xE9n\xE9ration",
        heroSubtitle: "Analysez votre v\xE9hicule en quelques secondes gr\xE2ce \xE0 notre moteur d'intelligence artificielle.",
        heroCta: "Analyser mon v\xE9hicule",
        contactEmail: "support@autoreport.com",
        contactPhone: "+33 (0)1 21 40 80 80",
        contactAddress: "75, Rue de la R\xE9publique, 75011 Paris",
        footerCopyright: "AutoReport. Tous droits r\xE9serv\xE9s.",
        primaryColor: "#CE1126",
        fontFamily: "Exo 2"
      });
    }
  });
  app3.get("/api/panel/settings", requirePanelAuth(), async (req, res) => {
    try {
      const settings = await storage.getLandingSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.put("/api/panel/settings", requirePanelAuth(), async (req, res) => {
    try {
      const updated = await storage.updateLandingSettings(req.body);
      res.json(updated);
    } catch (error) {
      console.error("Error updating landing settings:", error);
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.get("/api/panel/reports", requirePanelAuth(), async (req, res) => {
    try {
      const reports = await storage.getAllAiReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.delete("/api/panel/reports/:id", requirePanelAuth(), async (req, res) => {
    try {
      await storage.deleteAiReport(req.params.id);
      res.json({ message: "Rapport supprim\xE9" });
    } catch {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.get("/api/panel/stats", requirePanelAuth(), async (req, res) => {
    try {
      const reports = await storage.getAllAiReports();
      const total = reports.length;
      const byUrgency = { low: 0, medium: 0, high: 0, critical: 0 };
      const byMake = {};
      const byDay = {};
      for (const r of reports) {
        const urgency = r.metadata?.urgencyLevel || "medium";
        byUrgency[urgency] = (byUrgency[urgency] || 0) + 1;
        const make = r.make.toLowerCase();
        byMake[make] = (byMake[make] || 0) + 1;
        if (r.createdAt) {
          const day = new Date(r.createdAt).toISOString().split("T")[0];
          byDay[day] = (byDay[day] || 0) + 1;
        }
      }
      const topMakes = Object.entries(byMake).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, count2]) => ({ name, count: count2 }));
      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const d = /* @__PURE__ */ new Date();
        d.setDate(d.getDate() - (29 - i));
        const key = d.toISOString().split("T")[0];
        return { date: key, count: byDay[key] || 0 };
      });
      res.json({ total, byUrgency, topMakes, last30Days });
    } catch (error) {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.get("/api/panel/reports/export", requirePanelAuth(), async (req, res) => {
    try {
      const reports = await storage.getAllAiReports();
      const header = ["ID", "Marque", "Mod\xE8le", "Ann\xE9e", "Kilom\xE9trage", "Probl\xE8me", "Urgence", "Co\xFBt estim\xE9", "Statut", "Date"];
      const rows = reports.map((r) => {
        const meta = r.metadata || {};
        return [
          r.id,
          r.make,
          r.model,
          r.year,
          r.mileage || "",
          `"${(r.issue || "").replace(/"/g, '""')}"`,
          meta.urgencyLevel || "",
          meta.estimatedCost || "",
          r.status,
          r.createdAt ? new Date(r.createdAt).toLocaleDateString("fr-FR") : ""
        ].join(",");
      });
      const csv = [header.join(","), ...rows].join("\n");
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="rapports-${Date.now()}.csv"`);
      res.send("\uFEFF" + csv);
    } catch {
      res.status(500).json({ message: "Erreur export" });
    }
  });
  app3.get("/api/panel/prompt", requirePanelAuth(), async (req, res) => {
    try {
      const settings = await storage.getLandingSettings();
      res.json({ prompt: settings.aiPrompt || null });
    } catch {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.put("/api/panel/prompt", requirePanelAuth("admin"), async (req, res) => {
    try {
      const { prompt } = req.body;
      await storage.updateLandingSettings({ aiPrompt: prompt || null });
      res.json({ message: "Prompt mis \xE0 jour", prompt });
    } catch {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.get("/api/panel/feature-flags", requirePanelAuth(), async (req, res) => {
    try {
      const { featureFlags: featureFlags2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const flags = await db.select().from(featureFlags2).orderBy(featureFlags2.key);
      res.json(flags);
    } catch {
      res.status(500).json({ message: "Erreur r\xE9cup\xE9ration feature flags" });
    }
  });
  app3.post("/api/panel/feature-flags", requirePanelAuth("admin"), async (req, res) => {
    try {
      const { featureFlags: featureFlags2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { key, enabled, description } = req.body;
      if (!key || typeof key !== "string" || !/^[a-z0-9_]+$/.test(key)) {
        return res.status(400).json({ message: "Cl\xE9 invalide (minuscules, chiffres, underscores uniquement)" });
      }
      const [existing] = await db.select().from(featureFlags2).where(eq6(featureFlags2.key, key));
      if (existing) return res.status(409).json({ message: "Ce flag existe d\xE9j\xE0" });
      const [created] = await db.insert(featureFlags2).values({
        key: key.toLowerCase(),
        enabled: !!enabled,
        description: description || null,
        updatedBy: req.panelUser?.email || "panel"
      }).returning();
      res.status(201).json(created);
    } catch {
      res.status(500).json({ message: "Erreur cr\xE9ation feature flag" });
    }
  });
  app3.patch("/api/panel/feature-flags/:key", requirePanelAuth("admin"), async (req, res) => {
    try {
      const { featureFlags: featureFlags2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { key } = req.params;
      const { enabled, description } = req.body;
      const updates = { updatedAt: /* @__PURE__ */ new Date(), updatedBy: req.panelUser?.email || "panel" };
      if (typeof enabled === "boolean") updates.enabled = enabled;
      if (typeof description === "string") updates.description = description;
      const [updated] = await db.update(featureFlags2).set(updates).where(eq6(featureFlags2.key, key)).returning();
      if (!updated) return res.status(404).json({ message: "Flag introuvable" });
      res.json(updated);
    } catch {
      res.status(500).json({ message: "Erreur mise \xE0 jour feature flag" });
    }
  });
  app3.delete("/api/panel/feature-flags/:key", requirePanelAuth("admin"), async (req, res) => {
    try {
      const { featureFlags: featureFlags2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { key } = req.params;
      await db.delete(featureFlags2).where(eq6(featureFlags2.key, key));
      res.json({ message: "Flag supprim\xE9" });
    } catch {
      res.status(500).json({ message: "Erreur suppression feature flag" });
    }
  });
  app3.get("/api/feature-flags/:key", async (req, res) => {
    try {
      const { featureFlags: featureFlags2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const [flag] = await db.select({ enabled: featureFlags2.enabled }).from(featureFlags2).where(eq6(featureFlags2.key, req.params.key));
      res.json({ enabled: flag?.enabled ?? false });
    } catch {
      res.json({ enabled: false });
    }
  });
  app3.get("/api/panel/maintenance-status", requirePanelAuth(), async (req, res) => {
    res.json({ maintenance: process.env.MAINTENANCE_MODE === "true" });
  });
  app3.get("/api/panel/repair-sheets", requirePanelAuth(), async (req, res) => {
    try {
      const sheets = await storage.getAllRepairSheets();
      res.json(sheets);
    } catch {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.get("/api/panel/repair-sheets/:id", requirePanelAuth(), async (req, res) => {
    try {
      const sheet = await storage.getRepairSheet(req.params.id);
      if (!sheet) return res.status(404).json({ message: "Fiche non trouv\xE9e" });
      res.json(sheet);
    } catch {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.post("/api/panel/repair-sheets", requirePanelAuth(), async (req, res) => {
    try {
      const data = req.body;
      const sheet = await storage.createRepairSheet({
        reportId: data.reportId || null,
        reportSnapshot: data.reportSnapshot || null,
        status: data.status || "draft",
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
        quoteSubtotal: data.quoteSubtotal || "0",
        quoteTax: data.quoteTax || "0",
        quoteDiscount: data.quoteDiscount || "0",
        quoteTotal: data.quoteTotal || "0",
        notes: data.notes || null,
        technicianName: data.technicianName || null,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null
      });
      res.json(sheet);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Erreur cr\xE9ation fiche" });
    }
  });
  app3.put("/api/panel/repair-sheets/:id", requirePanelAuth(), async (req, res) => {
    try {
      const data = req.body;
      const updates = { ...data };
      if (data.scheduledAt) updates.scheduledAt = new Date(data.scheduledAt);
      if (data.status === "completed" && !data.completedAt) updates.completedAt = /* @__PURE__ */ new Date();
      const sheet = await storage.updateRepairSheet(req.params.id, updates);
      res.json(sheet);
    } catch {
      res.status(500).json({ message: "Erreur mise \xE0 jour" });
    }
  });
  app3.delete("/api/panel/repair-sheets/:id", requirePanelAuth(), async (req, res) => {
    try {
      await storage.deleteRepairSheet(req.params.id);
      res.json({ message: "Fiche supprim\xE9e" });
    } catch {
      res.status(500).json({ message: "Erreur" });
    }
  });
  app3.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "L'email est requis" });
      }
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.json({
          message: "Si un compte existe avec cette adresse email, vous recevrez un lien de r\xE9initialisation."
        });
      }
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1e3);
      await storage.createPasswordResetToken({
        userId: user.id,
        token,
        expiresAt
      });
      const resetUrl = buildUrl(req, `/reset-password/${token}`);
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>R\xE9initialisation de mot de passe</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${getEmailHeader("AUTOREPORT")}
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #dc2626; margin-top: 0;">R\xE9initialisation de mot de passe</h2>
            
            <p>Bonjour ${user.firstName || user.email},</p>
            
            <p>Vous avez demand\xE9 la r\xE9initialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                R\xE9initialiser mon mot de passe
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">Ce lien est valable pendant 1 heure.</p>
            
            <p style="color: #666; font-size: 14px;">Si vous n'avez pas demand\xE9 cette r\xE9initialisation, vous pouvez ignorer cet email.</p>
            
            <p>Cordialement,<br><strong>L'\xE9quipe AUTOREPORT</strong></p>
          </div>
          
          ${getEmailFooter("AUTOREPORT")}
        </body>
        </html>
      `;
      const emailResult = await sendEmail({
        to: user.email,
        subject: "R\xE9initialisation de votre mot de passe - AUTOREPORT",
        html: emailHtml
      });
      if (!emailResult.success) {
        console.error("Failed to send password reset email:", emailResult.error);
      }
      res.json({
        message: "Si un compte existe avec cette adresse email, vous recevrez un lien de r\xE9initialisation."
      });
    } catch (error) {
      console.error("Error in forgot-password:", error);
      res.status(500).json({ message: "Une erreur est survenue. Veuillez r\xE9essayer." });
    }
  });
  app3.get("/api/auth/reset-password/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const resetToken = await storage.getPasswordResetToken(token);
      if (!resetToken) {
        return res.status(400).json({ valid: false, message: "Lien invalide ou expir\xE9" });
      }
      if (resetToken.used) {
        return res.status(400).json({ valid: false, message: "Ce lien a d\xE9j\xE0 \xE9t\xE9 utilis\xE9" });
      }
      if (/* @__PURE__ */ new Date() > new Date(resetToken.expiresAt)) {
        return res.status(400).json({ valid: false, message: "Ce lien a expir\xE9" });
      }
      res.json({ valid: true });
    } catch (error) {
      console.error("Error verifying reset token:", error);
      res.status(500).json({ valid: false, message: "Une erreur est survenue" });
    }
  });
  app3.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { token, password } = req.body;
      if (!token || !password) {
        return res.status(400).json({ message: "Token et mot de passe requis" });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caract\xE8res" });
      }
      const resetToken = await storage.getPasswordResetToken(token);
      if (!resetToken) {
        return res.status(400).json({ message: "Lien invalide ou expir\xE9" });
      }
      if (resetToken.used) {
        return res.status(400).json({ message: "Ce lien a d\xE9j\xE0 \xE9t\xE9 utilis\xE9" });
      }
      if (/* @__PURE__ */ new Date() > new Date(resetToken.expiresAt)) {
        return res.status(400).json({ message: "Ce lien a expir\xE9" });
      }
      const hashedPassword = await bcrypt2.hash(password, 10);
      await storage.updateUser(resetToken.userId, { password: hashedPassword });
      await storage.markPasswordResetTokenUsed(token);
      res.json({ message: "Mot de passe r\xE9initialis\xE9 avec succ\xE8s" });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Une erreur est survenue. Veuillez r\xE9essayer." });
    }
  });
  app3.post("/api/admin/import/csv", isAuthenticated, isRootAdmin, async (req, res) => {
    try {
      const { table, data, garageId: bodyGarageId } = req.body;
      const validTables = ["users", "quotes", "invoices", "reservations"];
      if (!validTables.includes(table)) {
        return res.status(400).json({ message: "Table non support\xE9e pour l'import" });
      }
      if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ message: "Donn\xE9es invalides" });
      }
      const garageId = bodyGarageId || null;
      let successCount = 0;
      let errorCount = 0;
      for (const item of data) {
        try {
          if (table !== "users" || item.role !== "superadmin") {
            item.garageId = item.garageId || garageId;
          }
          if (table === "users") {
            if (item.password) {
              item.password = await bcrypt2.hash(item.password, 10);
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
        } catch (err2) {
          console.error(`[Import] Error importing into ${table}:`, err2.message);
          errorCount++;
        }
      }
      res.json({
        message: "Import termin\xE9",
        successCount,
        errorCount,
        total: data.length
      });
    } catch (error) {
      console.error("[Import] Global error:", error);
      res.status(500).json({ message: "Erreur lors de l'import CSV", error: error.message });
    }
  });
  app3.get("/api/admin/analytics", isAuthenticated, isAdmin, async (req, res) => {
    try {
      let garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      if (req.user?.role === "superadmin" && req.query.garageId) {
        garageId = req.query.garageId;
      }
      const { startDate, endDate, paymentMethod, serviceId } = req.query;
      const allInvoices = await storage.getInvoices(void 0, garageId);
      const allQuotes = await storage.getQuotes(void 0, garageId);
      const allServices = await storage.getServices();
      const allReservations = await storage.getReservations(void 0, garageId);
      const dateStart = startDate ? new Date(startDate) : null;
      const dateEnd = endDate ? new Date(endDate) : null;
      let filteredInvoices = allInvoices;
      let filteredQuotes = allQuotes;
      if (dateStart) {
        filteredInvoices = filteredInvoices.filter((i) => new Date(i.createdAt) >= dateStart);
        filteredQuotes = filteredQuotes.filter((q) => new Date(q.createdAt) >= dateStart);
      }
      if (dateEnd) {
        const endOfDay = new Date(dateEnd);
        endOfDay.setHours(23, 59, 59, 999);
        filteredInvoices = filteredInvoices.filter((i) => new Date(i.createdAt) <= endOfDay);
        filteredQuotes = filteredQuotes.filter((q) => new Date(q.createdAt) <= endOfDay);
      }
      if (paymentMethod && paymentMethod !== "all") {
        filteredInvoices = filteredInvoices.filter((i) => i.paymentMethod === paymentMethod);
      }
      if (serviceId && serviceId !== "all") {
        filteredQuotes = filteredQuotes.filter((q) => q.serviceId === serviceId);
        const quoteIds = new Set(filteredQuotes.map((q) => q.id));
        filteredInvoices = filteredInvoices.filter((i) => i.quoteId && quoteIds.has(i.quoteId));
      }
      const monthlyRevenue = {};
      const now = /* @__PURE__ */ new Date();
      for (let i = 0; i < 12; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = d.toLocaleString("fr-FR", { month: "short", year: "numeric" });
        monthlyRevenue[monthKey] = 0;
      }
      filteredInvoices.filter((inv) => inv.status === "paid").forEach((inv) => {
        const paymentDate = new Date(inv.paidAt || inv.createdAt);
        const monthKey = paymentDate.toLocaleString("fr-FR", { month: "short", year: "numeric" });
        if (monthlyRevenue.hasOwnProperty(monthKey)) {
          monthlyRevenue[monthKey] += parseFloat(inv.amount || "0");
        }
      });
      const revenueByPaymentMethod = {
        card: 0,
        wire_transfer: 0,
        cash: 0,
        check: 0
      };
      filteredInvoices.filter((i) => i.status === "paid").forEach((inv) => {
        const method = inv.paymentMethod || "other";
        if (revenueByPaymentMethod.hasOwnProperty(method)) {
          revenueByPaymentMethod[method] += parseFloat(inv.amount || "0");
        }
      });
      const revenueByService = {};
      allServices.forEach((s) => {
        revenueByService[s.id] = { name: s.name, revenue: 0, count: 0 };
      });
      filteredQuotes.forEach((q) => {
        if (q.serviceId && revenueByService[q.serviceId]) {
          revenueByService[q.serviceId].count += 1;
        }
      });
      filteredInvoices.filter((i) => i.status === "paid").forEach((inv) => {
        const quote = filteredQuotes.find((q) => q.id === inv.quoteId);
        if (quote?.serviceId && revenueByService[quote.serviceId]) {
          revenueByService[quote.serviceId].revenue += parseFloat(inv.amount || "0");
        }
      });
      const weeklyRevenue = [];
      for (let i = 0; i < 4; i++) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - 7 * (i + 1));
        const weekEnd = new Date(now);
        weekEnd.setDate(weekEnd.getDate() - 7 * i);
        const weekInvoices = filteredInvoices.filter((inv) => {
          const date = new Date(inv.paidAt || inv.createdAt);
          return inv.status === "paid" && date >= weekStart && date < weekEnd;
        });
        weeklyRevenue.unshift({
          week: `S-${i}`,
          revenue: weekInvoices.reduce((sum, i2) => sum + parseFloat(i2.amount || "0"), 0),
          invoices: weekInvoices.length
        });
      }
      const invoiceStatusStats = {
        paid: filteredInvoices.filter((i) => i.status === "paid").length,
        pending: filteredInvoices.filter((i) => i.status === "pending").length,
        overdue: filteredInvoices.filter((i) => i.status === "overdue").length,
        cancelled: filteredInvoices.filter((i) => i.status === "cancelled").length
      };
      const quoteStatusStats = {
        pending: filteredQuotes.filter((q) => q.status === "pending").length,
        approved: filteredQuotes.filter((q) => q.status === "approved").length,
        accepted: filteredQuotes.filter((q) => q.status === "accepted").length,
        rejected: filteredQuotes.filter((q) => q.status === "rejected").length,
        completed: filteredQuotes.filter((q) => q.status === "completed").length
      };
      const conversionRate = filteredQuotes.length > 0 ? (filteredQuotes.filter((q) => q.status === "approved" || q.status === "accepted" || q.status === "completed").length / filteredQuotes.length * 100).toFixed(1) : "0";
      const paidInvoices = filteredInvoices.filter((i) => i.status === "paid");
      const avgInvoiceAmount = paidInvoices.length > 0 ? paidInvoices.reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0) / paidInvoices.length : 0;
      const globalRevenue = filteredInvoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      const pendingRevenue = filteredInvoices.filter((i) => i.status === "pending" || i.status === "overdue").reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      const currentMonthInvoices = allInvoices.filter((i) => {
        const date = new Date(i.paidAt || i.createdAt);
        return date >= currentMonthStart && date <= currentMonthEnd;
      });
      const currentMonthQuotes = allQuotes.filter((q) => {
        const date = new Date(q.createdAt);
        return date >= currentMonthStart && date <= currentMonthEnd;
      });
      const currentMonthRevenue = currentMonthInvoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      const currentMonthPending = currentMonthInvoices.filter((i) => i.status === "pending" || i.status === "overdue").reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      const currentMonthInvoiceCount = currentMonthInvoices.length;
      const currentMonthQuoteCount = currentMonthQuotes.length;
      const currentMonthPaidCount = currentMonthInvoices.filter((i) => i.status === "paid").length;
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      const lastMonthRevenue = allInvoices.filter((i) => {
        const date = new Date(i.paidAt || i.createdAt);
        return i.status === "paid" && date >= lastMonthStart && date <= lastMonthEnd;
      }).reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      const revenueGrowth = lastMonthRevenue > 0 ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1) : currentMonthRevenue > 0 ? "100" : "0";
      const allUsers = garageId ? await storage.getUsersByGarage(garageId) : await storage.getAllUsers();
      const clients = allUsers.filter((u) => u.role === "client").map((u) => ({ id: u.id, name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email || "Client" }));
      const dailyRevenue = [];
      const dailyViews = [];
      for (let i = 29; i >= 0; i--) {
        const dayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        const dateStr = dayDate.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
        const dayEnd = new Date(dayDate);
        dayEnd.setHours(23, 59, 59, 999);
        const dayStart = new Date(dayDate);
        dayStart.setHours(0, 0, 0, 0);
        const dayInvoices = filteredInvoices.filter((inv) => {
          const date = new Date(inv.createdAt);
          return date >= dayStart && date <= dayEnd;
        });
        dailyRevenue.push({
          date: dateStr,
          revenue: dayInvoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + parseFloat(inv.amount || "0"), 0),
          invoices: dayInvoices.length
        });
        const dayQuoteViews = filteredQuotes.filter((q) => {
          if (!q.viewedAt) return false;
          const vDate = new Date(q.viewedAt);
          return vDate >= dayStart && vDate <= dayEnd;
        }).length;
        const dayInvoiceViews = filteredInvoices.filter((inv) => {
          if (!inv.viewedAt) return false;
          const vDate = new Date(inv.viewedAt);
          return vDate >= dayStart && vDate <= dayEnd;
        }).length;
        dailyViews.push({
          date: dateStr,
          quotes: dayQuoteViews,
          invoices: dayInvoiceViews
        });
      }
      const appSettings = await storage.getApplicationSettings();
      const dailyObjective = parseFloat(appSettings?.dailyRevenueObjective || "0");
      res.json({
        monthlyRevenue: Object.entries(monthlyRevenue).reverse().map(([name, total]) => ({ name, total })),
        weeklyRevenue,
        dailyRevenue,
        dailyObjective,
        dailyViews,
        revenueByPaymentMethod: Object.entries(revenueByPaymentMethod).map(([method, amount]) => ({
          method: method === "card" ? "Carte" : method === "wire_transfer" ? "Virement" : method === "cash" ? "Esp\xE8ces" : "Ch\xE8que",
          amount
        })),
        revenueByService: Object.values(revenueByService).filter((s) => s.count > 0 || s.revenue > 0),
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
          quotesSent: allQuotes.filter((q) => q.emailSentAt).length,
          quotesViewed: allQuotes.filter((q) => q.viewedAt).length,
          quotesNotSent: allQuotes.filter((q) => !q.emailSentAt).length,
          invoicesSent: allInvoices.filter((i) => i.emailSentAt).length,
          invoicesViewed: allInvoices.filter((i) => i.viewedAt).length,
          invoicesNotSent: allInvoices.filter((i) => !i.emailSentAt).length
        },
        services: allServices.map((s) => ({ id: s.id, name: s.name })),
        clients,
        filterApplied: !!(startDate || endDate || paymentMethod && paymentMethod !== "all" || serviceId && serviceId !== "all"),
        filteredInvoiceIds: filteredInvoices.map((i) => i.id),
        filteredQuoteIds: filteredQuotes.map((q) => q.id),
        currentMonth: {
          revenue: currentMonthRevenue,
          pending: currentMonthPending,
          invoiceCount: currentMonthInvoiceCount,
          quoteCount: currentMonthQuoteCount,
          paidCount: currentMonthPaidCount,
          growth: revenueGrowth,
          monthName: now.toLocaleString("fr-FR", { month: "long", year: "numeric" })
        }
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });
  app3.get("/api/admin/advanced-analytics", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const allInvoices = await storage.getInvoices(void 0, garageId);
      const allQuotes = await storage.getQuotes(void 0, garageId);
      const allServices = await storage.getServices();
      const allReservations = await storage.getReservations(void 0, garageId);
      const allUsers = garageId ? await storage.getUsersByGarage(garageId) : await storage.getAllUsers();
      const clients = allUsers.filter((u) => u.role === "client");
      const now = /* @__PURE__ */ new Date();
      const paidInvoices = allInvoices.filter((i) => i.status === "paid");
      const serviceMonthlyData = {};
      allServices.forEach((s) => {
        serviceMonthlyData[s.id] = {};
      });
      for (let m = 0; m < 12; m++) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0, 23, 59, 59, 999);
        const monthKey = monthStart.toLocaleString("fr-FR", { month: "short", year: "2-digit" });
        allServices.forEach((s) => {
          const sQuotes = allQuotes.filter((q) => q.serviceId === s.id);
          const sQuoteIds = new Set(sQuotes.map((q) => q.id));
          const monthInvoices = paidInvoices.filter((inv) => {
            const d = new Date(inv.createdAt);
            return d >= monthStart && d <= monthEnd && inv.quoteId && sQuoteIds.has(inv.quoteId);
          });
          const monthQuotes = sQuotes.filter((q) => {
            const d = new Date(q.createdAt);
            return d >= monthStart && d <= monthEnd;
          });
          serviceMonthlyData[s.id][monthKey] = {
            revenue: monthInvoices.reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0),
            count: monthQuotes.length
          };
        });
      }
      const serviceTrends = allServices.map((s) => {
        const months = Object.entries(serviceMonthlyData[s.id]).reverse();
        const totalRevenue2 = months.reduce((sum, [, d]) => sum + d.revenue, 0);
        const totalCount = months.reduce((sum, [, d]) => sum + d.count, 0);
        const recentHalf = months.slice(Math.floor(months.length / 2));
        const olderHalf = months.slice(0, Math.floor(months.length / 2));
        const recentRevenue = recentHalf.reduce((sum, [, d]) => sum + d.revenue, 0);
        const olderRevenue = olderHalf.reduce((sum, [, d]) => sum + d.revenue, 0);
        const trend = olderRevenue > 0 ? (recentRevenue - olderRevenue) / olderRevenue * 100 : recentRevenue > 0 ? 100 : 0;
        return {
          id: s.id,
          name: s.name,
          totalRevenue: totalRevenue2,
          totalCount,
          trend: parseFloat(trend.toFixed(1)),
          monthly: months.map(([month, d]) => ({ month, revenue: d.revenue, count: d.count }))
        };
      }).filter((s) => s.totalRevenue > 0 || s.totalCount > 0).sort((a, b) => b.totalRevenue - a.totalRevenue);
      const topServices = [...serviceTrends].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);
      const decliningServices = [...serviceTrends].filter((s) => s.trend < 0).sort((a, b) => a.trend - b.trend).slice(0, 5);
      const growingServices = [...serviceTrends].filter((s) => s.trend > 0).sort((a, b) => b.trend - a.trend).slice(0, 5);
      const cashFlow = [];
      for (let m = 11; m >= 0; m--) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0, 23, 59, 59, 999);
        const monthKey = monthStart.toLocaleString("fr-FR", { month: "short", year: "2-digit" });
        const income = paidInvoices.filter((inv) => {
          const d = new Date(inv.createdAt);
          return d >= monthStart && d <= monthEnd;
        }).reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
        cashFlow.push({ month: monthKey, income, expenses: 0, net: income });
      }
      const last3Months = cashFlow.slice(-3);
      const avg3m = last3Months.reduce((sum, m) => sum + m.income, 0) / 3;
      const forecast = [];
      for (let m = 1; m <= 3; m++) {
        const futureMonth = new Date(now.getFullYear(), now.getMonth() + m, 1);
        const monthKey = futureMonth.toLocaleString("fr-FR", { month: "short", year: "2-digit" });
        forecast.push({
          month: monthKey,
          projected: Math.round(avg3m),
          optimistic: Math.round(avg3m * 1.2),
          pessimistic: Math.round(avg3m * 0.8)
        });
      }
      const paymentDelays = [];
      paidInvoices.forEach((inv) => {
        if (inv.createdAt && inv.paidAt) {
          const created = new Date(inv.createdAt);
          const paid = new Date(inv.paidAt);
          const days = Math.max(0, Math.floor((paid.getTime() - created.getTime()) / (1e3 * 60 * 60 * 24)));
          paymentDelays.push(days);
        }
      });
      const avgPaymentDelay = paymentDelays.length > 0 ? paymentDelays.reduce((s, d) => s + d, 0) / paymentDelays.length : 0;
      const medianPaymentDelay = paymentDelays.length > 0 ? paymentDelays.sort((a, b) => a - b)[Math.floor(paymentDelays.length / 2)] : 0;
      const quarterlyRevenue = [];
      for (let q = 3; q >= 0; q--) {
        const qStart = new Date(now.getFullYear(), now.getMonth() - (q * 3 + 2), 1);
        const qEnd = new Date(now.getFullYear(), now.getMonth() - q * 3 + 1, 0, 23, 59, 59, 999);
        const qLabel = `T${Math.floor(qStart.getMonth() / 3) + 1} ${qStart.getFullYear()}`;
        const qInvoices = paidInvoices.filter((inv) => {
          const d = new Date(inv.createdAt);
          return d >= qStart && d <= qEnd;
        });
        quarterlyRevenue.push({
          quarter: qLabel,
          revenue: qInvoices.reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0),
          invoiceCount: qInvoices.length
        });
      }
      const amountRanges = [
        { label: "0-100\u20AC", min: 0, max: 100 },
        { label: "100-300\u20AC", min: 100, max: 300 },
        { label: "300-500\u20AC", min: 300, max: 500 },
        { label: "500-1000\u20AC", min: 500, max: 1e3 },
        { label: "1000-2000\u20AC", min: 1e3, max: 2e3 },
        { label: "2000\u20AC+", min: 2e3, max: Infinity }
      ];
      const amountDistribution = amountRanges.map((r) => ({
        range: r.label,
        count: paidInvoices.filter((i) => {
          const amt = parseFloat(i.amount || "0");
          return amt >= r.min && amt < r.max;
        }).length
      }));
      const clientRevenue = {};
      clients.forEach((c) => {
        clientRevenue[c.id] = {
          name: `${c.firstName || ""} ${c.lastName || ""}`.trim() || c.email || "Client",
          email: c.email || "",
          revenue: 0,
          invoiceCount: 0,
          quoteCount: 0,
          firstDate: null,
          lastDate: null
        };
      });
      paidInvoices.forEach((inv) => {
        if (inv.clientId && clientRevenue[inv.clientId]) {
          const cr = clientRevenue[inv.clientId];
          const amt = parseFloat(inv.amount || "0");
          cr.revenue += amt;
          cr.invoiceCount += 1;
          const d = new Date(inv.createdAt);
          if (!cr.firstDate || d < cr.firstDate) cr.firstDate = d;
          if (!cr.lastDate || d > cr.lastDate) cr.lastDate = d;
        }
      });
      allQuotes.forEach((q) => {
        if (q.clientId && clientRevenue[q.clientId]) {
          clientRevenue[q.clientId].quoteCount += 1;
        }
      });
      const topClients = Object.values(clientRevenue).filter((c) => c.revenue > 0).sort((a, b) => b.revenue - a.revenue).slice(0, 10).map((c) => ({
        name: c.name,
        email: c.email,
        revenue: c.revenue,
        invoiceCount: c.invoiceCount,
        quoteCount: c.quoteCount,
        avgInvoice: c.invoiceCount > 0 ? Math.round(c.revenue / c.invoiceCount) : 0
      }));
      const clientFirstActivity = {};
      allQuotes.forEach((q) => {
        if (q.clientId) {
          const d = new Date(q.createdAt);
          if (!clientFirstActivity[q.clientId] || d < clientFirstActivity[q.clientId]) {
            clientFirstActivity[q.clientId] = d;
          }
        }
      });
      allInvoices.forEach((inv) => {
        if (inv.clientId) {
          const d = new Date(inv.createdAt);
          if (!clientFirstActivity[inv.clientId] || d < clientFirstActivity[inv.clientId]) {
            clientFirstActivity[inv.clientId] = d;
          }
        }
      });
      const clientAcquisition = [];
      for (let m = 11; m >= 0; m--) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0, 23, 59, 59, 999);
        const monthKey = monthStart.toLocaleString("fr-FR", { month: "short", year: "2-digit" });
        const newClients = Object.values(clientFirstActivity).filter((d) => d >= monthStart && d <= monthEnd).length;
        clientAcquisition.push({ month: monthKey, newClients });
      }
      const returningClients = Object.values(clientRevenue).filter((c) => c.invoiceCount > 1).length;
      const totalActiveClients = Object.values(clientRevenue).filter((c) => c.invoiceCount > 0).length;
      const retentionRate = totalActiveClients > 0 ? (returningClients / totalActiveClients * 100).toFixed(1) : "0";
      const totalQuotes = allQuotes.length;
      const approvedQuotes = allQuotes.filter((q) => ["approved", "accepted", "completed"].includes(q.status || "")).length;
      const invoicedQuotes = allQuotes.filter((q) => allInvoices.some((i) => i.quoteId === q.id)).length;
      const paidQuotes = allQuotes.filter((q) => paidInvoices.some((i) => i.quoteId === q.id)).length;
      const conversionFunnel = [
        { stage: "Devis cr\xE9\xE9s", count: totalQuotes, percentage: 100 },
        { stage: "Devis approuv\xE9s", count: approvedQuotes, percentage: totalQuotes > 0 ? parseFloat((approvedQuotes / totalQuotes * 100).toFixed(1)) : 0 },
        { stage: "Factur\xE9s", count: invoicedQuotes, percentage: totalQuotes > 0 ? parseFloat((invoicedQuotes / totalQuotes * 100).toFixed(1)) : 0 },
        { stage: "Pay\xE9s", count: paidQuotes, percentage: totalQuotes > 0 ? parseFloat((paidQuotes / totalQuotes * 100).toFixed(1)) : 0 }
      ];
      const dayOfWeekRevenue = {
        "Lun": { revenue: 0, count: 0 },
        "Mar": { revenue: 0, count: 0 },
        "Mer": { revenue: 0, count: 0 },
        "Jeu": { revenue: 0, count: 0 },
        "Ven": { revenue: 0, count: 0 },
        "Sam": { revenue: 0, count: 0 },
        "Dim": { revenue: 0, count: 0 }
      };
      const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
      paidInvoices.forEach((inv) => {
        const d = new Date(inv.createdAt);
        const dayName = dayNames[d.getDay()];
        dayOfWeekRevenue[dayName].revenue += parseFloat(inv.amount || "0");
        dayOfWeekRevenue[dayName].count += 1;
      });
      const weekdayDistribution = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => ({
        day,
        revenue: Math.round(dayOfWeekRevenue[day].revenue),
        count: dayOfWeekRevenue[day].count
      }));
      const totalRevenue = paidInvoices.reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      const paidAmount = totalRevenue;
      const pendingAmount = allInvoices.filter((i) => i.status === "pending" || i.status === "overdue").reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
      const forecastAmount = allQuotes.filter((q) => q.status === "pending" || q.status === "approved").reduce((sum, i) => sum + parseFloat(i.quoteAmount || "0"), 0);
      const avgTicket = paidInvoices.length > 0 ? totalRevenue / paidInvoices.length : 0;
      const overdueCount = allInvoices.filter((i) => i.status === "overdue").length;
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
          paidInvoices: paidInvoices.length
        }
      });
    } catch (error) {
      console.error("Error fetching advanced analytics:", error);
      res.status(500).json({ message: "Failed to fetch advanced analytics" });
    }
  });
  app3.get("/api/superadmin/garages", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const allGarages = await storage.getGarages();
      res.json(allGarages);
    } catch (error) {
      console.error("Error fetching garages:", error);
      res.status(500).json({ message: "Failed to fetch garages" });
    }
  });
  app3.get("/api/superadmin/garages/:id", isAuthenticated, isSuperAdmin, async (req, res) => {
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
  app3.post("/api/superadmin/garages", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const validatedData = insertGarageSchema.parse(req.body);
      const garage = await storage.createGarage(validatedData);
      res.status(201).json(garage);
    } catch (error) {
      console.error("Error creating garage:", error);
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create garage" });
    }
  });
  app3.patch("/api/superadmin/garages/:id", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const garage = await storage.updateGarage(req.params.id, req.body);
      res.json(garage);
    } catch (error) {
      console.error("Error updating garage:", error);
      res.status(500).json({ message: "Failed to update garage" });
    }
  });
  app3.get("/api/garages/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garage = await storage.getGarage(req.params.id);
      if (!garage) return res.status(404).json({ message: "Garage non trouv\xE9" });
      if (!hasGarageAccess(req.user, garage.id)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      res.json(garage);
    } catch (error) {
      console.error("Error fetching garage:", error);
      res.status(500).json({ message: "Failed to fetch garage" });
    }
  });
  app3.patch("/api/garages/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garage = await storage.getGarage(req.params.id);
      if (!garage) return res.status(404).json({ message: "Garage non trouv\xE9" });
      if (!hasGarageAccess(req.user, garage.id)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      const updated = await storage.updateGarage(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Error updating garage:", error);
      res.status(500).json({ message: "Failed to update garage" });
    }
  });
  app3.delete("/api/superadmin/garages/:id", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      await storage.deleteGarage(req.params.id);
      res.json({ message: "Garage deleted successfully" });
    } catch (error) {
      console.error("Error deleting garage:", error);
      res.status(500).json({ message: "Failed to delete garage" });
    }
  });
  app3.get("/api/superadmin/garages/:id/users", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const garageUsers = await storage.getUsersByGarage(req.params.id);
      res.json(garageUsers);
    } catch (error) {
      console.error("Error fetching garage users:", error);
      res.status(500).json({ message: "Failed to fetch garage users" });
    }
  });
  app3.post("/api/superadmin/garages/:garageId/users/:userId", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const user = await storage.updateUser(req.params.userId, { garageId: req.params.garageId });
      res.json(user);
    } catch (error) {
      console.error("Error assigning user to garage:", error);
      res.status(500).json({ message: "Failed to assign user to garage" });
    }
  });
  app3.delete("/api/superadmin/garages/:garageId/users/:userId", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const user = await storage.updateUser(req.params.userId, { garageId: null });
      res.json(user);
    } catch (error) {
      console.error("Error removing user from garage:", error);
      res.status(500).json({ message: "Failed to remove user from garage" });
    }
  });
  app3.get("/api/superadmin/garage-stats", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const allGarages = await storage.getGarages();
      const allUsers = await storage.getAllUsers();
      const garageStats = await Promise.all(allGarages.map(async (garage) => {
        const schemaName = `garage_${garage.slug.replace(/-/g, "_")}`;
        const client = await pool.connect();
        try {
          const schemaExists = await client.query(
            `SELECT 1 FROM information_schema.schemata WHERE schema_name = $1`,
            [schemaName]
          );
          let invoiceCount = 0, paidInvoices = 0, quoteCount = 0, reservationCount = 0;
          let revenue = 0, pendingRevenue = 0, monthRevenue = 0;
          if (schemaExists.rows.length > 0) {
            await client.query("BEGIN");
            await client.query(`SET LOCAL search_path TO "${schemaName}", public`);
            const invResult = await client.query(`SELECT status, amount, created_at FROM invoices`);
            const invRows = invResult.rows;
            invoiceCount = invRows.length;
            const now = /* @__PURE__ */ new Date();
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
            await client.query("COMMIT");
          }
          const gClients = allUsers.filter((u) => u.garageId === garage.id && u.role === "client");
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
            totalClients: gClients.length
          };
        } finally {
          client.release();
        }
      }));
      const totalRevenue = garageStats.reduce((s, g) => s + g.totalRevenue, 0);
      const totalMonthRevenue = garageStats.reduce((s, g) => s + g.monthRevenue, 0);
      res.json({
        totalGarages: allGarages.length,
        activeGarages: allGarages.filter((g) => g.isActive).length,
        totalRevenue,
        totalMonthRevenue,
        garages: garageStats
      });
    } catch (error) {
      console.error("Error fetching garage stats:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.get("/api/rootadmin/app-logs", isAuthenticated, isRootAdmin, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 200;
      const offset = parseInt(req.query.offset) || 0;
      const garageId = req.query.garageId;
      const entityType = req.query.entityType;
      const action = req.query.action;
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
        createdAt: auditLogs.occurredAt
      }).from(auditLogs).orderBy(desc3(auditLogs.occurredAt)).limit(limit).offset(offset);
      const logs = await query;
      const total = await db.select({ count: count() }).from(auditLogs);
      res.json({ logs, total: total[0]?.count || 0 });
    } catch (error) {
      console.error("[AppLogs] Error:", error);
      res.status(500).json({ message: "Erreur lors de la r\xE9cup\xE9ration des logs", error: error.message });
    }
  });
  app3.patch("/api/rootadmin/users/:userId/role", isAuthenticated, isRootAdmin, async (req, res) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;
      const allowedRoles = ["client", "client_professionnel", "employe", "admin", "superadmin"];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "R\xF4le invalide. Les r\xF4les assignables sont: " + allowedRoles.join(", ") });
      }
      const targetUser = await storage.getUser(userId);
      if (!targetUser) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }
      if (targetUser.role === "rootadmin") {
        return res.status(403).json({ message: "Impossible de modifier le r\xF4le d'un Root Admin" });
      }
      await storage.updateUser(userId, { role });
      await logAuditEvent({
        req,
        entityType: "user",
        entityId: userId,
        action: "updated",
        summary: `Root Admin a chang\xE9 le r\xF4le de ${targetUser.email} de '${targetUser.role}' vers '${role}'`,
        previousData: { role: targetUser.role },
        newData: { role }
      });
      res.json({ message: `R\xF4le de ${targetUser.email} mis \xE0 jour vers '${role}'`, userId, role });
    } catch (error) {
      console.error("[RoleAssignment] Error:", error);
      res.status(500).json({ message: "Erreur lors de la mise \xE0 jour du r\xF4le", error: error.message });
    }
  });
  app3.get("/api/rootadmin/users", isAuthenticated, isRootAdmin, async (req, res) => {
    try {
      const { garageId } = req.query;
      const allUsers = await storage.getAllUsers();
      const filtered = garageId ? allUsers.filter((u) => u.garageId === garageId) : allUsers;
      const sanitized = filtered.map(({ password: _, ...u }) => u);
      res.json(sanitized);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  });
  app3.post("/api/superadmin/select-garage", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const { garageId } = req.body;
      if (garageId) {
        const garage = await storage.getGarage(garageId);
        if (!garage) return res.status(404).json({ message: "Garage non trouv\xE9" });
        req.session.selectedGarageId = garageId;
        req.session.selectedGarageSlug = garage.slug;
        res.json({ success: true, garage: { id: garage.id, name: garage.name, slug: garage.slug } });
      } else {
        req.session.selectedGarageId = null;
        req.session.selectedGarageSlug = null;
        res.json({ success: true, garage: null });
      }
    } catch (error) {
      console.error("Error selecting garage:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.get("/api/superadmin/selected-garage", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const garageId = req.session?.selectedGarageId;
      if (garageId) {
        const garage = await storage.getGarage(garageId);
        res.json({ garage: garage ? { id: garage.id, name: garage.name, slug: garage.slug } : null });
      } else {
        res.json({ garage: null });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.post("/api/superadmin/tenant/setup", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const { createTenantSchema: createTenantSchema2, migrateDataToTenantSchema: migrateDataToTenantSchema2 } = await Promise.resolve().then(() => (init_tenantContext(), tenantContext_exports));
      const allGarages = await storage.getGarages();
      const results = [];
      for (const garage of allGarages) {
        console.log(`[Tenant] Setting up schema for garage: ${garage.name} (${garage.slug})`);
        await createTenantSchema2(garage.slug);
        const migrationResults = await migrateDataToTenantSchema2(garage.id, garage.slug);
        results.push({
          garage: garage.name,
          slug: garage.slug,
          schema: `garage_${garage.slug.replace(/-/g, "_")}`,
          tables: migrationResults
        });
      }
      res.json({ success: true, results });
    } catch (error) {
      console.error("[Tenant] Setup error:", error);
      res.status(500).json({ message: "Erreur lors de la configuration des sch\xE9mas: " + error.message });
    }
  });
  app3.get("/api/superadmin/tenant/status", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const { pool: pool2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { getSchemaName: getSchemaName2 } = await Promise.resolve().then(() => (init_tenantContext(), tenantContext_exports));
      const allGarages = await storage.getGarages();
      const statuses = [];
      for (const garage of allGarages) {
        const schemaName = getSchemaName2(garage.slug);
        const schemaExists = await pool2.query(
          `SELECT 1 FROM information_schema.schemata WHERE schema_name = $1`,
          [schemaName]
        );
        let tableCount = 0;
        let dataStats = {};
        if (schemaExists.rows.length > 0) {
          const tables = await pool2.query(
            `SELECT table_name FROM information_schema.tables WHERE table_schema = $1`,
            [schemaName]
          );
          tableCount = tables.rows.length;
          for (const t of ["services", "quotes", "invoices", "reservations", "reviews"]) {
            try {
              const cnt = await pool2.query(`SELECT COUNT(*) as cnt FROM "${schemaName}"."${t}"`);
              dataStats[t] = parseInt(cnt.rows[0].cnt);
            } catch {
              dataStats[t] = 0;
            }
          }
        }
        statuses.push({
          garageId: garage.id,
          garageName: garage.name,
          slug: garage.slug,
          schemaName,
          schemaExists: schemaExists.rows.length > 0,
          tableCount,
          dataStats
        });
      }
      res.json({ tenants: statuses });
    } catch (error) {
      console.error("[Tenant] Status error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.get("/api/services", isAuthenticated, async (req, res) => {
    try {
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        return res.json(await ts.getServices());
      }
      const services2 = await storage.getServices();
      res.json(services2);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  app3.get("/api/admin/services", isAuthenticated, isAdmin, async (req, res) => {
    try {
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        return res.json(await ts.getAllServices());
      }
      const services2 = await storage.getServices();
      res.json(services2);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  app3.post("/api/admin/services", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      const workflow = await storage.createWorkflow({
        name: `Workflow - ${service.name}`,
        description: `Workflow pour le service ${service.name}`,
        serviceId: service.id
      });
      const defaultSteps = [
        { stepNumber: 1, title: "R\xE9ception du v\xE9hicule", description: "Accueil client et prise en charge du v\xE9hicule" },
        { stepNumber: 2, title: "Ordre de r\xE9paration", description: "\xC9tat des lieux du v\xE9hicule avant intervention" },
        { stepNumber: 3, title: "Diagnostic", description: "Inspection technique et diagnostic" },
        { stepNumber: 4, title: "Pr\xE9paration", description: "Pr\xE9paration des pi\xE8ces et outils" },
        { stepNumber: 5, title: "Intervention", description: "R\xE9alisation des travaux" },
        { stepNumber: 6, title: "Contr\xF4le qualit\xE9", description: "V\xE9rification de la qualit\xE9" },
        { stepNumber: 7, title: "Nettoyage", description: "Nettoyage du v\xE9hicule" },
        { stepNumber: 8, title: "Restitution", description: "Remise du v\xE9hicule au client" }
      ];
      for (const step of defaultSteps) {
        await storage.createWorkflowStep({ workflowId: workflow.id, ...step });
      }
      await logAuditEvent({
        req,
        entityType: "service",
        entityId: service.id,
        action: "created",
        summary: `${entityLabels.service} "${service.name}" ${actionLabels.created} avec workflow associ\xE9 (${defaultSteps.length} \xE9tapes)`,
        newData: service,
        metadata: { workflowId: workflow.id }
      });
      res.json(service);
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(400).json({ message: error.message || "Failed to create service" });
    }
  });
  app3.patch("/api/admin/services/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const previousService = await storage.getService(id);
      const service = await storage.updateService(id, req.body);
      await logAuditEvent({
        req,
        entityType: "service",
        entityId: service.id,
        action: "updated",
        summary: `${entityLabels.service} "${service.name}" ${actionLabels.updated}`,
        previousData: previousService,
        newData: service
      });
      res.json(service);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Failed to update service" });
    }
  });
  app3.delete("/api/admin/services/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const previousService = await storage.getService(id);
      await storage.deleteService(id);
      await logAuditEvent({
        req,
        entityType: "service",
        entityId: id,
        action: "deleted",
        summary: `${entityLabels.service} "${previousService?.name || id}" ${actionLabels.deleted}`,
        previousData: previousService
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Failed to delete service" });
    }
  });
  app3.get("/api/quotes", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const quotes2 = await storage.getQuotes(userId);
      res.json(quotes2);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });
  app3.post("/api/quotes", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { mediaFiles, ...quoteData } = req.body;
      if (!mediaFiles || !Array.isArray(mediaFiles)) {
        return res.status(400).json({ message: "Les photos sont requises" });
      }
      const imageCount = mediaFiles.filter((f) => f.type && f.type.startsWith("image/")).length;
      if (imageCount < 3) {
        return res.status(400).json({
          message: `Au moins 3 photos sont requises (${imageCount}/3 fournis)`
        });
      }
      const now = /* @__PURE__ */ new Date();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const allQuotes = await storage.getQuotes();
      const count2 = allQuotes.filter((q) => {
        if (!q.createdAt) return false;
        const qDate = new Date(q.createdAt);
        return !isNaN(qDate.getTime()) && qDate >= startOfMonth;
      }).length + 1;
      const reference = `DEV-${mm}-${String(count2).padStart(5, "0")}`;
      const validatedData = insertQuoteSchema.parse({
        ...quoteData,
        reference,
        clientId: userId,
        status: "pending"
      });
      const quote = await storage.createQuote(validatedData);
      for (const file of mediaFiles) {
        await storage.createQuoteMedia({
          quoteId: quote.id,
          filePath: file.key,
          fileType: file.type.startsWith("image/") ? "image" : "video",
          fileName: file.name
        });
      }
      await logAuditEvent({
        req,
        entityType: "quote",
        entityId: quote.id,
        action: "created",
        summary: `${entityLabels.quote} ${actionLabels.created} par le client`,
        newData: quote
      });
      res.json(quote);
    } catch (error) {
      console.error("Error creating quote:", error);
      res.status(400).json({ message: error.message || "Failed to create quote" });
    }
  });
  app3.get("/api/admin/quotes", isAuthenticated, isAdmin, async (req, res) => {
    try {
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        const quotes3 = await ts.getQuotes();
        return res.json(quotes3);
      }
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const quotes2 = await storage.getQuotes(void 0, garageId);
      res.json(quotes2);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });
  app3.get("/api/admin/quotes/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouv\xE9" });
      }
      if (!hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9 \xE0 ce devis" });
      }
      res.json(quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  });
  app3.post("/api/admin/quotes", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { mediaFiles, wheelCount, wheelPositions, diameter, priceExcludingTax, taxRate, taxAmount, productDetails, quoteAmount, services: services2, ...quoteData } = req.body;
      if (!mediaFiles || !Array.isArray(mediaFiles)) {
        return res.status(400).json({ message: "Media files are required" });
      }
      const imageCount = mediaFiles.filter((f) => f.type && f.type.startsWith("image/")).length;
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
      const now = /* @__PURE__ */ new Date();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const allQuotes = await storage.getQuotes();
      const count2 = allQuotes.filter((q) => {
        if (!q.createdAt) return false;
        const qDate = new Date(q.createdAt);
        return !isNaN(qDate.getTime()) && qDate >= startOfMonth;
      }).length + 1;
      const reference = `DEV-${mm}-${String(count2).padStart(5, "0")}`;
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
        status: "approved"
        // Auto-approved when created by admin
      });
      const quote = await storage.createQuote(validatedData);
      const createdMediaEntries = [];
      for (const file of mediaFiles) {
        let fileName = file.name;
        if (!fileName.includes(".")) {
          const ext = file.type.split("/")[1] || "jpg";
          fileName = `${fileName}.${ext}`;
        }
        const media = await storage.createQuoteMedia({
          quoteId: quote.id,
          filePath: file.key,
          fileType: file.type.startsWith("image/") ? "image" : "video",
          fileName
        });
        createdMediaEntries.push({ id: media.id, filePath: file.key, fileType: media.fileType || "image", fileName });
      }
      processMediaAfterCreation(
        createdMediaEntries,
        reference,
        "quotes",
        async (mediaId, newPath, newFileName) => {
          await db.update(quoteMedia).set({ filePath: newPath, fileName: newFileName }).where(eq6(quoteMedia.id, mediaId));
        }
      ).catch((err2) => console.error("[PostProcess] Quote media processing error:", err2));
      if (services2 && Array.isArray(services2) && services2.length > 0) {
        for (const service of services2) {
          const quantity = parseFloat(service.quantity || 1);
          const unitPrice = parseFloat(service.unitPrice || 0);
          const totalHT = quantity * unitPrice;
          const taxRateDecimal = parseFloat(taxRate || 0);
          const taxAmountItem = totalHT * taxRateDecimal / 100;
          const totalTTC = totalHT + taxAmountItem;
          await storage.createQuoteItem({
            quoteId: quote.id,
            description: service.serviceName,
            quantity: quantity.toString(),
            unitPriceExcludingTax: unitPrice.toString(),
            totalExcludingTax: totalHT.toString(),
            taxRate: taxRateDecimal.toString(),
            taxAmount: taxAmountItem.toString(),
            totalIncludingTax: totalTTC.toString()
          });
        }
      }
      await logAuditEvent({
        req,
        entityType: "quote",
        entityId: quote.id,
        action: "created",
        summary: `${entityLabels.quote} ${actionLabels.created} et approuv\xE9 par l'administrateur`,
        newData: quote,
        metadata: { clientId: quote.clientId, servicesCount: services2?.length || 0, autoApproved: true }
      });
      await storage.createNotification({
        userId: quote.clientId,
        type: "quote",
        title: "Nouveau devis",
        message: `Un devis a \xE9t\xE9 cr\xE9\xE9 pour vous`,
        relatedId: quote.id
      });
      const client = wsClients2.get(quote.clientId);
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: "quote_updated",
          quoteId: quote.id,
          status: quote.status
        }));
      }
      res.json(quote);
    } catch (error) {
      console.error("Error creating quote:", error);
      res.status(400).json({ message: error.message || "Failed to create quote" });
    }
  });
  app3.patch("/api/admin/quotes/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const previousQuote = await storage.getQuote(id);
      if (!hasGarageAccess(req.user, previousQuote?.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9 \xE0 ce devis" });
      }
      const quote = await storage.updateQuote(id, req.body);
      let action = "updated";
      if (req.body.status) {
        if (req.body.status === "approved") action = "validated";
        else if (req.body.status === "rejected") action = "rejected";
        else if (req.body.status === "completed") action = "completed";
        else if (req.body.status === "cancelled") action = "cancelled";
      }
      await logAuditEvent({
        req,
        entityType: "quote",
        entityId: quote.id,
        action,
        summary: `${entityLabels.quote} ${actionLabels[action]}`,
        previousData: previousQuote,
        newData: quote
      });
      await storage.createNotification({
        userId: quote.clientId,
        type: "quote",
        title: "Devis mis \xE0 jour",
        message: `Votre devis a \xE9t\xE9 ${actionLabels[action]}`,
        relatedId: quote.id
      });
      const wsClient = wsClients2.get(quote.clientId);
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({
          type: "quote_updated",
          quoteId: quote.id,
          status: quote.status
        }));
      }
      res.json(quote);
    } catch (error) {
      console.error("Error updating quote:", error);
      res.status(500).json({ message: "Failed to update quote" });
    }
  });
  app3.delete("/api/admin/quotes/:id", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouv\xE9" });
      }
      const items = await storage.getQuoteItems(id);
      for (const item of items) {
        await storage.deleteQuoteItem(item.id);
      }
      const media = await storage.getQuoteMedia(id);
      const fs10 = await import("fs");
      for (const m of media) {
        if (m.filePath) {
          if (m.filePath.startsWith("/gdrive/")) {
            try {
              const { extractFileId: extractFileId2, deleteFromGoogleDrive: deleteFromGoogleDrive2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
              const fileId = extractFileId2(m.filePath);
              if (fileId) await deleteFromGoogleDrive2(fileId);
            } catch (err2) {
              console.error("[Delete] Google Drive cascade delete failed:", err2);
            }
          } else {
            const localPath = m.filePath.startsWith("/") ? `.${m.filePath}` : m.filePath;
            if (fs10.existsSync(localPath)) {
              fs10.unlinkSync(localPath);
            }
          }
        }
        await storage.deleteQuoteMedia(m.id);
      }
      await storage.deleteQuote(id);
      await logAuditEvent({
        req,
        entityType: "quote",
        entityId: id,
        action: "deleted",
        summary: `${entityLabels.quote} supprim\xE9 d\xE9finitivement`,
        previousData: quote,
        newData: void 0
      });
      res.json({ success: true, message: "Devis supprim\xE9 avec succ\xE8s" });
    } catch (error) {
      console.error("Error deleting quote:", error);
      res.status(500).json({ message: "Erreur lors de la suppression du devis" });
    }
  });
  app3.post("/api/admin/quotes/:id/send-email", isAuthenticated, isAdmin, async (req, res) => {
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
        return res.status(404).json({ message: "Devis non trouv\xE9" });
      }
      const client = await storage.getUser(quote.clientId);
      if (!client || !client.email) {
        return res.status(400).json({ message: "Email du client non disponible" });
      }
      const items = await storage.getQuoteItems(id);
      const settings = await storage.getApplicationSettings();
      const adminUser = req.user;
      const { sendEmail: sendEmail2, generateQuoteEmailHtml: generateQuoteEmailHtml2, generateQuotePDF: generateQuotePDF2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
      const formatPrice = (value) => {
        if (value === null || value === void 0 || value === "") return "0,00 \u20AC";
        const num = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(num)) return "0,00 \u20AC";
        return num.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
      };
      async function downloadMediaBuffer2(filePath) {
        try {
          if (filePath.startsWith("/objects/")) {
            const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
            const objStore = new ObjectStorageService3();
            return await objStore.downloadFileBuffer(filePath);
          } else if (filePath.startsWith("/r2/")) {
            try {
              const { downloadFromR2: downloadFromR22, extractR2Key: extractR2Key2 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
              const key = extractR2Key2(filePath);
              if (key) {
                const { data } = await downloadFromR22(key);
                return data;
              }
            } catch (e) {
              console.error("[Download] R2 download failed:", e);
            }
          } else if (filePath.startsWith("/gdrive/")) {
            try {
              const { downloadFromGoogleDrive: downloadFromGoogleDrive2, extractFileId: extractFileId2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
              const fileId = extractFileId2(filePath);
              if (fileId) {
                const result = await downloadFromGoogleDrive2(fileId);
                return result;
              }
            } catch (e) {
              console.error("[Download] GDrive download failed:", e);
            }
          } else if (filePath.startsWith("http")) {
            const resp = await fetch(filePath);
            if (resp.ok) return Buffer.from(await resp.arrayBuffer());
          } else if (fs7.existsSync(filePath)) {
            return fs7.readFileSync(filePath);
          }
          return null;
        } catch (error) {
          console.error(`[Download] Error downloading ${filePath}:`, error);
          return null;
        }
      }
      let viewToken = quote.viewToken;
      if (!viewToken) {
        viewToken = crypto.randomBytes(32).toString("hex");
        await storage.updateQuote(id, { viewToken });
      }
      const quoteViewUrl = buildUrl(req, `/devis/${viewToken}`);
      const quoteRef = quote.reference || quote.id.slice(0, 8).toUpperCase();
      const clientName = `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email;
      const companyName = settings?.companyName || "AutoReport";
      const quoteTTC = parseFloat(quote.quoteAmount || "0");
      const quoteTax = parseFloat(quote.taxAmount || "0");
      const quoteHT = quoteTax > 0 ? quoteTTC - quoteTax : quoteTTC / 1.2;
      const pdfBuffer = generateQuotePDF2({
        quoteNumber: quoteRef,
        quoteDate: quote.createdAt ? new Date(quote.createdAt).toLocaleDateString("fr-FR") : (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"),
        clientName,
        status: quote.status,
        items: items.map((i) => ({
          description: i.description || "",
          quantity: Number(i.quantity) || 1,
          unitPrice: parseFloat(i.unitPriceExcludingTax || "0").toFixed(2),
          total: parseFloat(i.totalExcludingTax || "0").toFixed(2)
        })),
        amount: formatPrice(quote.quoteAmount),
        totalHT: quoteHT.toFixed(2),
        totalTTC: quoteTTC.toFixed(2),
        companyName
      });
      const pdfFilename = `Devis-${quoteRef}.pdf`;
      const attachments = [{ filename: pdfFilename, content: pdfBuffer }];
      try {
        const media = await storage.getQuoteMedia(id);
        for (const item of media) {
          try {
            const data = await downloadMediaBuffer2(item.filePath);
            if (data) {
              attachments.push({ filename: item.fileName || path9.basename(item.filePath), content: data });
            }
          } catch (err2) {
            console.warn(`[Email] Failed to attach file: ${item.filePath}`, err2);
          }
        }
      } catch (err2) {
        console.error("Error fetching media for email:", err2);
      }
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
        html = generateQuoteEmailHtml2({
          clientName,
          quoteNumber: quoteRef,
          quoteAmount: formatPrice(quote.quoteAmount),
          quoteUrl: quoteViewUrl,
          companyName
        });
      }
      const to = customRecipient || client.email;
      const finalAdditional = [...additionalRecipients];
      if (sendCopy && adminUser.email) finalAdditional.push(adminUser.email);
      await sendEmail2({
        to,
        cc: finalAdditional.join(","),
        subject: customSubject || `Votre Devis ${quoteRef} - ${companyName}`,
        html,
        attachments
      });
      if (client.phone && client.smsConsent) {
        await sendEventSms({
          userPhone: client.phone,
          userSmsConsent: client.smsConsent,
          userName: `${client.firstName || ""} ${client.lastName || ""}`.trim(),
          userEmail: client.email,
          eventType: "quote_sent",
          eventTitle: quoteRef,
          eventDetails: formatPrice(quote.quoteAmount),
          eventUrl: quoteViewUrl
        });
      }
      try {
        const staffMembers = await storage.getUsersByRoles(["admin", "employee"]);
        for (const staff of staffMembers) {
          if (staff.phone && isFrenchMobile(staff.phone)) {
            await sendSms({
              to: staff.phone,
              eventType: "quote_sent",
              eventTitle: `Nouveau devis : ${quoteRef}`,
              eventDetails: `Client : ${client.firstName || ""} ${client.lastName || ""} - ${formatPrice(quote.quoteAmount)}`,
              recipientName: `${staff.firstName || ""} ${staff.lastName || ""}`.trim()
            });
          }
        }
      } catch (err2) {
        console.error("[SMS:Staff] Failed to notify staff for quote:", err2);
      }
      res.json({ success: true, message: "Email envoy\xE9 avec succ\xE8s" });
    } catch (error) {
      console.error("Error sending quote email:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'envoi de l'email" });
    }
  });
  app3.get("/api/admin/quotes/:id/items", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (quote && !hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      const items = await storage.getQuoteItems(id);
      res.json(items);
    } catch (error) {
      console.error("Error fetching quote items:", error);
      res.status(500).json({ message: "Failed to fetch quote items" });
    }
  });
  app3.post("/api/admin/quotes/:id/items", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (quote && !hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      const { insertQuoteItemSchema: insertQuoteItemSchema2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const validatedData = insertQuoteItemSchema2.parse({ ...req.body, quoteId: id });
      const item = await storage.createQuoteItem(validatedData);
      await storage.recalculateQuoteTotals(id);
      res.json(item);
    } catch (error) {
      console.error("Error creating quote item:", error);
      res.status(400).json({ message: error.message || "Failed to create quote item" });
    }
  });
  app3.patch("/api/admin/quote-items/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const item = await storage.updateQuoteItem(id, req.body);
      await storage.recalculateQuoteTotals(item.quoteId);
      res.json(item);
    } catch (error) {
      console.error("Error updating quote item:", error);
      res.status(400).json({ message: error.message || "Failed to update quote item" });
    }
  });
  app3.delete("/api/admin/quote-items/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const itemToDelete = await storage.getQuoteItem(id);
      if (!itemToDelete) {
        return res.status(404).json({ message: "Item not found" });
      }
      await storage.deleteQuoteItem(id);
      await storage.recalculateQuoteTotals(itemToDelete.quoteId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting quote item:", error);
      res.status(400).json({ message: error.message || "Failed to delete quote item" });
    }
  });
  app3.get("/api/admin/quotes/:id/media", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (quote && !hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      const media = await storage.getQuoteMedia(id);
      res.json(media);
    } catch (error) {
      console.error("Error fetching quote media:", error);
      res.status(500).json({ message: "Failed to fetch quote media" });
    }
  });
  app3.post("/api/admin/quotes/:id/media", isAuthenticated, isAdmin, async (req, res) => {
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
      const existingMedia = await storage.getQuoteMedia(id);
      const nextIndex = (existingMedia?.length || 0) + 1;
      const ext = path9.extname(file.name) || ".jpg";
      const newFileName = `${reference}_${nextIndex}${ext}`;
      let fileData;
      if (file.tempFilePath) {
        fileData = fs7.readFileSync(file.tempFilePath);
      } else if (file.data) {
        fileData = file.data;
      } else {
        return res.status(400).json({ message: "Impossible de lire le fichier" });
      }
      if (isImage) {
        try {
          const { addWatermarkToImage: addWatermarkToImage2 } = await Promise.resolve().then(() => (init_imageWatermark(), imageWatermark_exports));
          fileData = await addWatermarkToImage2(fileData, reference, file.mimetype);
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
        fileSize: fileData.length
      });
      if (file.tempFilePath) {
        try {
          fs7.unlinkSync(file.tempFilePath);
        } catch (_) {
        }
      }
      sendMediaZipByEmail("quote", id, reference).catch(
        (err2) => console.error("[ZipEmail] Background quote ZIP failed:", err2)
      );
      res.json(media);
    } catch (error) {
      console.error("Error uploading quote media:", error);
      res.status(500).json({ message: error.message || "Failed to upload media" });
    }
  });
  app3.post("/api/admin/quotes/:id/media-zip", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const files = req.files;
      if (!files || !files.file) {
        return res.status(400).json({ message: "Fichier ZIP requis" });
      }
      const file = files.file;
      if (!file.name.toLowerCase().endsWith(".zip")) {
        return res.status(400).json({ message: "Seuls les fichiers ZIP sont accept\xE9s" });
      }
      let zipData;
      if (file.tempFilePath) {
        zipData = fs7.readFileSync(file.tempFilePath);
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
      const results = [];
      for (const [fileName, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir) continue;
        const ext = path9.extname(fileName).toLowerCase();
        if (!imageExts.includes(ext)) continue;
        const baseName = path9.basename(fileName);
        if (baseName.startsWith(".") || baseName.startsWith("__MACOSX")) continue;
        let fileData = Buffer.from(await zipEntry.async("arraybuffer"));
        const newFileName = `${reference}_${nextIndex}${ext}`;
        nextIndex++;
        try {
          const { addWatermarkToImage: addWatermarkToImage2 } = await Promise.resolve().then(() => (init_imageWatermark(), imageWatermark_exports));
          const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
          fileData = await addWatermarkToImage2(fileData, reference, mimeType);
        } catch (_) {
        }
        const filePath = await uploadToStorage(fileData, newFileName, "quotes");
        const media = await storage.createQuoteMedia({
          quoteId: id,
          fileName: newFileName,
          filePath,
          fileType: "image",
          fileSize: fileData.length
        });
        results.push(media);
        console.log(`[ZIP] Extracted and uploaded: ${baseName} -> ${newFileName}`);
      }
      if (file.tempFilePath) {
        try {
          fs7.unlinkSync(file.tempFilePath);
        } catch (_) {
        }
      }
      if (results.length === 0) {
        return res.status(400).json({ message: "Aucune image trouv\xE9e dans le fichier ZIP" });
      }
      sendMediaZipByEmail("quote", id, reference).catch(
        (err2) => console.error("[ZipEmail] Background quote ZIP failed:", err2)
      );
      res.json({ success: true, count: results.length, media: results });
    } catch (error) {
      console.error("Error uploading quote ZIP:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'extraction du ZIP" });
    }
  });
  app3.delete("/api/admin/quote-media/:mediaId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { mediaId } = req.params;
      const media = await storage.getQuoteMediaById(mediaId);
      if (!media) {
        return res.status(404).json({ message: "Media not found" });
      }
      if (media.filePath) {
        if (media.filePath.startsWith("/gdrive/")) {
          try {
            const { extractFileId: extractFileId2, deleteFromGoogleDrive: deleteFromGoogleDrive2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
            const fileId = extractFileId2(media.filePath);
            if (fileId) await deleteFromGoogleDrive2(fileId);
          } catch (err2) {
            console.error("[Delete] Google Drive delete failed:", err2);
          }
        } else if (media.filePath.startsWith("/objects/")) {
          try {
            const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
            const objStore = new ObjectStorageService3();
            await objStore.deleteFile(media.filePath);
          } catch (err2) {
            console.error("[Delete] Object Storage delete failed:", err2);
          }
        } else if (media.filePath.startsWith("https://storage.googleapis.com/")) {
          try {
            const { deleteFromFirebaseStorage: deleteFromFirebaseStorage2 } = await Promise.resolve().then(() => (init_firebase(), firebase_exports));
            await deleteFromFirebaseStorage2(media.filePath);
          } catch (err2) {
            console.error("[Delete] Firebase delete failed:", err2);
          }
        } else {
          const fs10 = await import("fs");
          const localPath = media.filePath.startsWith("/") ? `.${media.filePath}` : media.filePath;
          if (fs10.existsSync(localPath)) fs10.unlinkSync(localPath);
        }
      }
      await storage.deleteQuoteMedia(mediaId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting quote media:", error);
      res.status(500).json({ message: error.message || "Failed to delete media" });
    }
  });
  async function downloadMediaBuffer(filePath) {
    try {
      if (filePath.startsWith("/objects/")) {
        const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
        const objStore = new ObjectStorageService3();
        return await objStore.downloadFileBuffer(filePath);
      } else if (filePath.startsWith("/r2/")) {
        try {
          const { downloadFromR2: downloadFromR22, extractR2Key: extractR2Key2 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
          const key = extractR2Key2(filePath);
          if (key) {
            const { data } = await downloadFromR22(key);
            return data;
          }
        } catch (e) {
          console.error("[Download] R2 download failed:", e);
        }
      } else if (filePath.startsWith("/gdrive/")) {
        try {
          const { downloadFromGoogleDrive: downloadFromGoogleDrive2, extractFileId: extractFileId2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
          const fileId = extractFileId2(filePath);
          if (fileId) {
            const result = await downloadFromGoogleDrive2(fileId);
            return result.data;
          }
        } catch (e) {
          console.error("[Download] Google Drive download failed:", e);
        }
      } else if (filePath.startsWith("https://")) {
        try {
          const response = await fetch(filePath);
          if (response.ok) {
            return Buffer.from(await response.arrayBuffer());
          }
        } catch (e) {
          console.error("[Download] URL download failed:", e);
        }
      } else if (filePath.startsWith("/uploads/")) {
        const localPath = path9.join(process.cwd(), filePath);
        if (fs7.existsSync(localPath)) return fs7.readFileSync(localPath);
      } else {
        const localPath = filePath.startsWith("/") ? `.${filePath}` : filePath;
        if (fs7.existsSync(localPath)) return fs7.readFileSync(localPath);
      }
    } catch (err2) {
      console.error(`[Download] Error downloading ${filePath}:`, err2);
    }
    return null;
  }
  app3.get("/api/admin/quotes/:id/media/download-zip", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (quote && !hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      const mediaList = await storage.getQuoteMedia(id);
      if (!mediaList || mediaList.length === 0) {
        return res.status(404).json({ message: "Aucune photo \xE0 t\xE9l\xE9charger" });
      }
      const reference = quote?.reference || `DEVIS-${id.slice(0, 8).toUpperCase()}`;
      const archiver = (await import("archiver")).default;
      const archive = archiver("zip", { zlib: { level: 5 } });
      res.set({
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="photos_${reference}.zip"`
      });
      archive.pipe(res);
      for (let i = 0; i < mediaList.length; i++) {
        const m = mediaList[i];
        try {
          const buffer = await downloadMediaBuffer(m.filePath);
          if (buffer) {
            const ext = path9.extname(m.fileName || ".jpg");
            const cleanName = `devis_${reference}_${i + 1}${ext}`;
            archive.append(buffer, { name: cleanName });
          }
        } catch (fileErr) {
          console.error(`[ZIP] Error reading file ${m.filePath}:`, fileErr);
        }
      }
      await archive.finalize();
    } catch (error) {
      console.error("Error creating quote media ZIP:", error);
      if (!res.headersSent) {
        res.status(500).json({ message: error.message || "Erreur lors de la cr\xE9ation du ZIP" });
      }
    }
  });
  app3.get("/api/invoices", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const invoices2 = await storage.getInvoices(userId);
      res.json(invoices2);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });
  app3.get("/api/admin/invoices", isAuthenticated, isAdmin, async (req, res) => {
    try {
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        const invoiceList2 = await ts.getInvoices();
        return res.json(invoiceList2);
      }
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const invoiceList = await storage.getInvoices(void 0, garageId);
      res.json(invoiceList);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });
  app3.post("/api/admin/invoices", isAuthenticated, isAdmin, async (req, res) => {
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
      const nowInvoiceNew = /* @__PURE__ */ new Date();
      const ddInvoiceNew = String(nowInvoiceNew.getDate()).padStart(2, "0");
      const mmInvoiceNew = String(nowInvoiceNew.getMonth() + 1).padStart(2, "0");
      const allInvoicesInvoiceNew = await storage.getInvoices();
      const startOfDayInvoiceNew = new Date(nowInvoiceNew.getFullYear(), nowInvoiceNew.getMonth(), nowInvoiceNew.getDate());
      const countInvoiceNew = allInvoicesInvoiceNew.filter((i) => {
        const iDate = new Date(i.createdAt || "");
        return iDate >= startOfDayInvoiceNew;
      }).length + 1;
      let invoiceNumberVal = `FACT-${ddInvoiceNew}-${mmInvoiceNew}-${String(countInvoiceNew).padStart(3, "0")}`;
      if (validatedData.paymentMethod === "klarna" || validatedData.paymentMethod === "alma") {
        const count2 = allInvoicesInvoiceNew.filter((i) => (i.invoiceNumber || "").startsWith("PPF")).length + 1;
        invoiceNumberVal = `PPF-${mmInvoiceNew}-${String(count2).padStart(4, "0")}`;
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
        productDetails
      });
      if (validatedData.quoteId && quote) {
        const quoteItems2 = await storage.getQuoteItems(validatedData.quoteId);
        for (const quoteItem of quoteItems2) {
          await storage.createInvoiceItem({
            invoiceId: invoice.id,
            description: quoteItem.description,
            quantity: quoteItem.quantity,
            unitPriceExcludingTax: quoteItem.unitPriceExcludingTax,
            taxRate: quoteItem.taxRate,
            taxAmount: quoteItem.taxAmount,
            totalExcludingTax: quoteItem.totalExcludingTax,
            totalIncludingTax: quoteItem.totalIncludingTax
          });
        }
      }
      if (mediaFiles && Array.isArray(mediaFiles)) {
        for (const fileEntry of mediaFiles) {
          const fp = typeof fileEntry === "string" ? fileEntry : fileEntry.filePath || fileEntry.path || fileEntry.key || "";
          const fn = typeof fileEntry === "string" ? path9.basename(fileEntry) : fileEntry.fileName || fileEntry.name || path9.basename(fp);
          if (fp) {
            await storage.createInvoiceMedia({
              invoiceId: invoice.id,
              fileType: "image",
              filePath: fp,
              fileName: fn
            });
          }
        }
      }
      await storage.createNotification({
        userId: invoice.clientId,
        type: "invoice",
        title: "New Invoice",
        message: `A new invoice has been generated`,
        relatedId: invoice.id
      });
      const wsClient = wsClients2.get(invoice.clientId);
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({
          type: "invoice_created",
          invoiceId: invoice.id
        }));
      }
      console.log(`Invoice created: ${invoice.invoiceNumber} - auto-email disabled`);
      res.json(invoice);
    } catch (error) {
      console.error("Error creating invoice:", error);
      res.status(400).json({ message: error.message || "Failed to create invoice" });
    }
  });
  app3.post("/api/admin/invoices/direct", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { mediaFiles, ...invoiceData } = req.body;
      if (!invoiceData.garageId && req.user?.garageId) {
        invoiceData.garageId = req.user.garageId;
      }
      const validatedData = insertInvoiceSchema.parse(invoiceData);
      const nowInvoiceDirect = /* @__PURE__ */ new Date();
      const ddInvoiceDirect = String(nowInvoiceDirect.getDate()).padStart(2, "0");
      const mmInvoiceDirect = String(nowInvoiceDirect.getMonth() + 1).padStart(2, "0");
      const startOfDayInvoiceDirect = new Date(nowInvoiceDirect.getFullYear(), nowInvoiceDirect.getMonth(), nowInvoiceDirect.getDate());
      const allInvoicesInvoiceDirect = await storage.getInvoices();
      const countInvoiceDirect = allInvoicesInvoiceDirect.filter((i) => {
        const iDate = new Date(i.createdAt || "");
        return iDate >= startOfDayInvoiceDirect;
      }).length + 1;
      const invoiceNumberGenerated = `FACT-${ddInvoiceDirect}-${mmInvoiceDirect}-${String(countInvoiceDirect).padStart(3, "0")}`;
      const invoice = await storage.createInvoice({
        ...validatedData,
        invoiceNumber: invoiceNumberGenerated
      });
      if (mediaFiles && Array.isArray(mediaFiles)) {
        for (const fileEntry of mediaFiles) {
          const fp = typeof fileEntry === "string" ? fileEntry : fileEntry.filePath || fileEntry.path || fileEntry.key || "";
          const fn = typeof fileEntry === "string" ? path9.basename(fileEntry) : fileEntry.fileName || fileEntry.name || path9.basename(fp);
          if (fp) {
            await storage.createInvoiceMedia({
              invoiceId: invoice.id,
              fileType: "image",
              filePath: fp,
              fileName: fn
            });
          }
        }
      }
      await storage.createNotification({
        userId: invoice.clientId,
        type: "invoice",
        title: "New Invoice",
        message: `A new invoice has been generated`,
        relatedId: invoice.id
      });
      const wsClient = wsClients2.get(invoice.clientId);
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({
          type: "invoice_created",
          invoiceId: invoice.id
        }));
      }
      console.log(`Direct invoice created: ${invoice.invoiceNumber} - auto-email disabled`);
      res.json(invoice);
    } catch (error) {
      console.error("Error creating direct invoice:", error);
      res.status(400).json({ message: error.message || "Failed to create direct invoice" });
    }
  });
  app3.get("/api/admin/invoices/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      if (!hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9 \xE0 cette facture" });
      }
      res.json(invoice);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      res.status(500).json({ message: "Failed to fetch invoice" });
    }
  });
  app3.patch("/api/admin/invoices/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Update invoice request body:", JSON.stringify(req.body, null, 2));
      const previousInvoice = await storage.getInvoice(id);
      if (!hasGarageAccess(req.user, previousInvoice?.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9 \xE0 cette facture" });
      }
      const updateData = { ...req.body };
      Object.keys(updateData).forEach((key) => {
        const value = updateData[key];
        if (value && typeof value === "string") {
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
      let action = "updated";
      let summary = "Facture mise \xE0 jour";
      if (updateData.status === "paid" && previousInvoice?.status !== "paid") {
        action = "paid";
        summary = "Facture marqu\xE9e comme pay\xE9e";
      } else if (updateData.status === "cancelled" && previousInvoice?.status !== "cancelled") {
        action = "cancelled";
        summary = "Facture annul\xE9e";
      }
      await logAuditEvent({
        req,
        entityType: "invoice",
        entityId: id,
        action,
        summary,
        previousData: previousInvoice,
        newData: invoice
      });
      if (updateData.status === "paid" && previousInvoice?.status !== "paid") {
        try {
          const year = (/* @__PURE__ */ new Date()).getFullYear();
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
            date: /* @__PURE__ */ new Date(),
            journal: "sales",
            sourceType: "invoice",
            sourceId: invoice.id,
            description: `Facture ${invoice.invoiceNumber} pay\xE9e`,
            totalDebit: String(ttc),
            totalCredit: String(ttc)
          });
          await storage.createAccountingLine({
            entryId: entry.id,
            accountCode: bankAccount,
            accountLabel: bankLabel,
            description: `Encaissement facture ${invoice.invoiceNumber}`,
            debit: String(ttc),
            credit: "0"
          });
          await storage.createAccountingLine({
            entryId: entry.id,
            accountCode: "706000",
            accountLabel: "Prestations de services",
            description: `Vente ${invoice.invoiceNumber}`,
            debit: "0",
            credit: String(ht)
          });
          if (tva > 0) {
            await storage.createAccountingLine({
              entryId: entry.id,
              accountCode: "445710",
              accountLabel: "TVA collect\xE9e",
              description: `TVA facture ${invoice.invoiceNumber}`,
              debit: "0",
              credit: String(tva)
            });
          }
        } catch (accError) {
          console.error("Error creating accounting entry for invoice payment:", accError);
        }
      }
      if (updateData.status === "paid" && previousInvoice?.status !== "paid") {
        try {
          const client = await storage.getUser(invoice.clientId);
          const quote = invoice.quoteId ? await storage.getQuote(invoice.quoteId) : null;
          const garage = await storage.getGarage(invoice.garageId || "");
          if (client && client.email) {
            let reviewUrl = "";
            const crypto2 = await import("crypto");
            const reviewToken = crypto2.randomBytes(32).toString("hex");
            const clientName = `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email;
            const existingReviewsForInvoice = await db.select().from(reviews).where(eq6(reviews.invoiceId, invoice.id));
            if (existingReviewsForInvoice.length === 0) {
              await db.insert(reviews).values({
                garageId: invoice.garageId,
                invoiceId: invoice.id,
                clientId: invoice.clientId,
                clientName,
                rating: 0,
                reviewToken
              });
              reviewUrl = buildUrl(req, `/avis/${reviewToken}`);
            } else if (existingReviewsForInvoice[0].reviewToken) {
              reviewUrl = buildUrl(req, `/avis/${existingReviewsForInvoice[0].reviewToken}`);
            }
            const { generateInvoicePaidEmailHtml: generateInvoicePaidEmailHtml2, sendEmail: sendEmail2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
            const emailHtml = generateInvoicePaidEmailHtml2({
              clientName,
              invoiceNumber: invoice.invoiceNumber,
              amount: invoice.amount || "0",
              paymentDate: (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"),
              companyName: garage?.name || "AUTOREPORT",
              reviewUrl: reviewUrl || void 0
            });
            await sendEmail2({
              to: client.email,
              subject: `Confirmation de paiement - Facture ${invoice.invoiceNumber}`,
              html: emailHtml
            });
            console.log(`[Email] Automatic paid confirmation sent to ${client.email} for invoice ${invoice.invoiceNumber}`);
            if (client.phone && client.smsConsent) {
              await sendEventSms({
                userPhone: client.phone,
                userSmsConsent: client.smsConsent,
                userName: `${client.firstName || ""} ${client.lastName || ""}`.trim(),
                userEmail: client.email,
                eventType: "invoice_paid",
                eventTitle: invoice.invoiceNumber,
                eventDetails: invoice.amount || "0",
                eventUrl: reviewUrl || void 0
              });
            }
            try {
              const staffMembers = await storage.getUsersByRoles(["admin", "employee"]);
              for (const staff of staffMembers) {
                if (staff.phone && isFrenchMobile(staff.phone)) {
                  await sendSms({
                    to: staff.phone,
                    eventType: "invoice_paid",
                    eventTitle: `Paiement re\xE7u : ${invoice.invoiceNumber}`,
                    eventDetails: `Client : ${clientName} - ${invoice.amount || "0"} \u20AC`,
                    recipientName: `${staff.firstName || ""} ${staff.lastName || ""}`.trim()
                  });
                }
              }
            } catch (err2) {
              console.error("[SMS:Staff] Failed to notify staff for payment:", err2);
            }
          }
        } catch (emailErr) {
          console.error("[Email] Failed to send automatic paid confirmation:", emailErr);
        }
      }
      res.json(invoice);
    } catch (error) {
      console.error("Error updating invoice:", error);
      res.status(400).json({ message: error.message || "Failed to update invoice" });
    }
  });
  app3.delete("/api/admin/invoices/:id", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) {
        return res.status(404).json({ message: "Facture non trouv\xE9e" });
      }
      const items = await storage.getInvoiceItems(id);
      for (const item of items) {
        await storage.deleteInvoiceItem(item.id);
      }
      const media = await storage.getInvoiceMedia(id);
      const fs10 = await import("fs");
      for (const m of media) {
        if (m.filePath) {
          if (m.filePath.startsWith("/gdrive/")) {
            try {
              const { extractFileId: extractFileId2, deleteFromGoogleDrive: deleteFromGoogleDrive2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
              const fileId = extractFileId2(m.filePath);
              if (fileId) await deleteFromGoogleDrive2(fileId);
            } catch (err2) {
              console.error("[Delete] Google Drive cascade delete failed:", err2);
            }
          } else {
            const localPath = m.filePath.startsWith("/") ? `.${m.filePath}` : m.filePath;
            if (fs10.existsSync(localPath)) {
              fs10.unlinkSync(localPath);
            }
          }
        }
        await storage.deleteInvoiceMedia(m.id);
      }
      await storage.deleteInvoice(id);
      await logAuditEvent({
        req,
        entityType: "invoice",
        entityId: id,
        action: "deleted",
        summary: `${entityLabels.invoice} supprim\xE9e d\xE9finitivement`,
        previousData: invoice,
        newData: void 0
      });
      res.json({ success: true, message: "Facture supprim\xE9e avec succ\xE8s" });
    } catch (error) {
      console.error("Error deleting invoice:", error);
      res.status(500).json({ message: "Erreur lors de la suppression de la facture" });
    }
  });
  app3.post("/api/admin/invoices/:id/send-email", isAuthenticated, isAdmin, async (req, res) => {
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
        return res.status(404).json({ message: "Facture non trouv\xE9e" });
      }
      const client = await storage.getUser(invoice.clientId);
      if (!client || !client.email) {
        return res.status(400).json({ message: "Email du client non disponible" });
      }
      const items = await storage.getInvoiceItems(id);
      const settings = await storage.getApplicationSettings();
      const companyName = settings?.companyName || "AutoReport";
      const { sendEmail: sendEmail2, generateInvoiceEmailHtml: generateInvoiceEmailHtml2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
      const formatPrice = (value) => {
        if (value === null || value === void 0 || value === "") return "0,00 \u20AC";
        const num = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(num)) return "0,00 \u20AC";
        return num.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
      };
      const invoiceCreatedAt = invoice.createdAt ? new Date(invoice.createdAt) : /* @__PURE__ */ new Date();
      const dueDate = invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("fr-FR") : new Date(invoiceCreatedAt.getTime() + 30 * 24 * 60 * 60 * 1e3).toLocaleDateString("fr-FR");
      const html = generateInvoiceEmailHtml2({
        clientName: `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email,
        invoiceNumber: invoice.invoiceNumber || invoice.id.slice(0, 8).toUpperCase(),
        invoiceDate: invoiceCreatedAt.toLocaleDateString("fr-FR"),
        dueDate,
        amount: invoice.amount || "0",
        totalHT: invoice.priceExcludingTax || "0",
        taxAmount: invoice.taxAmount || "0",
        companyName: settings?.companyName || "AutoReport",
        items: items.map((item) => ({
          description: item.description,
          quantity: parseFloat(item.quantity || "1"),
          unitPrice: item.unitPriceExcludingTax || "0",
          total: item.totalIncludingTax || "0"
        })),
        paymentLink: buildUrl(req, `/payment/checkout?invoice_id=${invoice.id}`)
      });
      const { generateInvoicePDF: genInvoicePdf } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
      const invClientDetails = [];
      if (client.siret) invClientDetails.push(`SIRET: ${client.siret}`);
      if (client.tvaNumber) invClientDetails.push(`TVA: ${client.tvaNumber}`);
      if (client.email) invClientDetails.push(client.email);
      if (client.phone) invClientDetails.push(`T\xE9l: ${client.phone}`);
      const invClientAddr = client.companyAddress || client.address;
      if (invClientAddr) invClientDetails.push(invClientAddr);
      const invClientLoc = [client.postalCode, client.city].filter(Boolean).join(" ");
      if (invClientLoc) invClientDetails.push(invClientLoc);
      const sendPdfBuffer = genInvoicePdf({
        invoiceNumber: invoice.invoiceNumber || invoice.id.slice(0, 8).toUpperCase(),
        invoiceDate: invoiceCreatedAt.toLocaleDateString("fr-FR"),
        dueDate,
        clientName: client.companyName || `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email,
        clientDetails: invClientDetails,
        items: items.map((item) => ({
          description: item.description,
          quantity: parseFloat(item.quantity || "1"),
          unitPrice: parseFloat(item.unitPriceExcludingTax || "0").toFixed(2),
          total: parseFloat(item.totalExcludingTax || "0").toFixed(2),
          taxRate: item.taxRate || "20"
        })),
        amount: formatPrice(invoice.amount),
        companyName: settings?.companyName || "AutoReport"
      });
      const invoiceRef = invoice.invoiceNumber || invoice.id.slice(0, 8).toUpperCase();
      const attachments = [{ filename: `Facture-${invoiceRef}.pdf`, content: sendPdfBuffer }];
      console.log(`[Email] Sending invoice ${invoice.invoiceNumber} to ${client.email}`);
      const media = await storage.getInvoiceMedia(id);
      const photoAttachments = [];
      const fs10 = await import("fs");
      for (const item of media) {
        if (item.fileType === "image") {
          try {
            console.log(`[Email] Attempting to attach: ${item.filePath}`);
            const data = await downloadMediaBuffer(item.filePath);
            if (data) {
              photoAttachments.push({ filename: item.fileName || path9.basename(item.filePath), content: data });
              console.log(`[Email] Successfully attached: ${item.fileName}`);
            }
          } catch (err2) {
            console.warn(`[Email] Photo attachment failed: ${item.filePath}`, err2);
          }
        }
      }
      const finalAttachments = [...attachments, ...photoAttachments];
      const to = customRecipient || client.email;
      const cc = [...additionalRecipients];
      if (sendCopy && adminUser.email) cc.push(adminUser.email);
      await sendEmail2({
        to,
        cc: cc.join(","),
        subject: customSubject || `Votre Facture ${invoiceRef} - ${companyName}`,
        html,
        attachments: finalAttachments
      });
      if (client.phone && client.smsConsent) {
        await sendEventSms({
          userPhone: client.phone,
          userSmsConsent: client.smsConsent,
          userName: `${client.firstName || ""} ${client.lastName || ""}`.trim(),
          userEmail: client.email,
          eventType: "invoice_sent",
          eventTitle: invoiceRef,
          eventDetails: formatPrice(invoice.amount),
          eventUrl: buildUrl(req, `/payment/checkout?invoice_id=${invoice.id}`)
        });
      }
      try {
        const staffMembers = await storage.getUsersByRoles(["admin", "employee"]);
        for (const staff of staffMembers) {
          if (staff.phone && isFrenchMobile(staff.phone)) {
            await sendSms({
              to: staff.phone,
              eventType: "invoice_sent",
              eventTitle: `Facture envoy\xE9e : ${invoiceRef}`,
              eventDetails: `Client : ${client.firstName || ""} ${client.lastName || ""} - ${formatPrice(invoice.amount)}`,
              recipientName: `${staff.firstName || ""} ${staff.lastName || ""}`.trim()
            });
          }
        }
      } catch (err2) {
        console.error("[SMS:Staff] Failed to notify staff for invoice:", err2);
      }
      res.json({ success: true, message: "Email envoy\xE9 avec succ\xE8s" });
    } catch (error) {
      console.error("Error sending invoice email:", error);
      res.status(500).json({ message: error.message || "\xC9chec de l'envoi de l'email" });
    }
  });
  app3.delete("/api/admin/quotes/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (!quote) return res.status(404).json({ message: "Devis non trouv\xE9" });
      if (!hasGarageAccess(req.user, quote.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
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
        summary: `Devis ${quote.reference} supprim\xE9 d\xE9finitivement`
      });
      if (req.user.role !== "superadmin") {
        const { sendEmail: sendEmail2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
        await sendEmail2({
          to: "rbelmahi90@gmail.com",
          cc: "contact@autoreport.com",
          subject: `[ALERTE] Suppression d\xE9finitive du Devis ${quote.reference}`,
          html: `
            <h3>Alerte Suppression D\xE9finitive</h3>
            <p>Le devis suivant a \xE9t\xE9 supprim\xE9 du syst\xE8me par <strong>${req.user.firstName} ${req.user.lastName}</strong> (${req.user.email}).</p>
            <ul>
              <li><strong>R\xE9f\xE9rence :</strong> ${quote.reference}</li>
              <li><strong>Client :</strong> ${client?.firstName || ""} ${client?.lastName || ""} (${client?.email || "N/A"})</li>
              <li><strong>Montant :</strong> ${parseFloat(quote.quoteAmount || "0").toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</li>
              <li><strong>Garage :</strong> ${companyName}</li>
              <li><strong>Date de suppression :</strong> ${(/* @__PURE__ */ new Date()).toLocaleString("fr-FR")}</li>
            </ul>
          `
        }).catch((err2) => console.error("[Delete Notification] Failed to send quote delete email:", err2));
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting quote:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la suppression" });
    }
  });
  app3.delete("/api/admin/invoices/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) return res.status(404).json({ message: "Facture non trouv\xE9e" });
      if (!hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
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
        summary: `Facture ${invoice.invoiceNumber} supprim\xE9e d\xE9finitivement`
      });
      if (req.user.role !== "superadmin") {
        const { sendEmail: sendEmail2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
        await sendEmail2({
          to: "rbelmahi90@gmail.com",
          cc: "contact@autoreport.com",
          subject: `[ALERTE] Suppression d\xE9finitive de la Facture ${invoice.invoiceNumber}`,
          html: `
            <h3>Alerte Suppression D\xE9finitive</h3>
            <p>La facture suivante a \xE9t\xE9 supprim\xE9e du syst\xE8me par <strong>${req.user.firstName} ${req.user.lastName}</strong> (${req.user.email}).</p>
            <ul>
              <li><strong>N\xB0 Facture :</strong> ${invoice.invoiceNumber}</li>
              <li><strong>Client :</strong> ${client?.firstName || ""} ${client?.lastName || ""} (${client?.email || "N/A"})</li>
              <li><strong>Montant :</strong> ${parseFloat(invoice.amount || "0").toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</li>
              <li><strong>Garage :</strong> ${companyName}</li>
              <li><strong>Date de suppression :</strong> ${(/* @__PURE__ */ new Date()).toLocaleString("fr-FR")}</li>
            </ul>
          `
        }).catch((err2) => console.error("[Delete Notification] Failed to send invoice delete email:", err2));
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting invoice:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la suppression" });
    }
  });
  app3.delete("/api/admin/reservations/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const reservation = await storage.getReservation(id);
      if (!reservation) return res.status(404).json({ message: "R\xE9servation non trouv\xE9e" });
      if (!hasGarageAccess(req.user, reservation.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
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
        summary: `R\xE9servation supprim\xE9e d\xE9finitivement`
      });
      if (req.user.role !== "superadmin") {
        const { sendEmail: sendEmail2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
        await sendEmail2({
          to: "rbelmahi90@gmail.com",
          cc: "contact@autoreport.com",
          subject: `[ALERTE] Suppression d\xE9finitive d'une R\xE9servation`,
          html: `
            <h3>Alerte Suppression D\xE9finitive</h3>
            <p>La r\xE9servation suivante a \xE9t\xE9 supprim\xE9e du syst\xE8me par <strong>${req.user.firstName} ${req.user.lastName}</strong> (${req.user.email}).</p>
            <ul>
              <li><strong>Client :</strong> ${client?.firstName || ""} ${client?.lastName || ""} (${client?.email || "N/A"})</li>
              <li><strong>Prestation :</strong> ${service?.name || "N/A"}</li>
              <li><strong>Date pr\xE9vue :</strong> ${reservation.scheduledDate ? new Date(reservation.scheduledDate).toLocaleString("fr-FR") : "N/A"}</li>
              <li><strong>Garage :</strong> ${companyName}</li>
              <li><strong>Date de suppression :</strong> ${(/* @__PURE__ */ new Date()).toLocaleString("fr-FR")}</li>
            </ul>
          `
        }).catch((err2) => console.error("[Delete Notification] Failed to send reservation delete email:", err2));
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting reservation:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la suppression" });
    }
  });
  app3.get("/api/admin/invoices/:id/items", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (invoice && !hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      const items = await storage.getInvoiceItems(id);
      res.json(items);
    } catch (error) {
      console.error("Error fetching invoice items:", error);
      res.status(500).json({ message: "Failed to fetch invoice items" });
    }
  });
  app3.post("/api/admin/invoices/:id/items", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (invoice && !hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      const { insertInvoiceItemSchema: insertInvoiceItemSchema2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const validatedData = insertInvoiceItemSchema2.parse({ ...req.body, invoiceId: id });
      const item = await storage.createInvoiceItem(validatedData);
      await storage.recalculateInvoiceTotals(id);
      res.json(item);
    } catch (error) {
      console.error("Error creating invoice item:", error);
      res.status(400).json({ message: error.message || "Failed to create invoice item" });
    }
  });
  app3.patch("/api/admin/invoice-items/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const item = await storage.updateInvoiceItem(id, req.body);
      await storage.recalculateInvoiceTotals(item.invoiceId);
      res.json(item);
    } catch (error) {
      console.error("Error updating invoice item:", error);
      res.status(400).json({ message: error.message || "Failed to update invoice item" });
    }
  });
  app3.delete("/api/admin/invoice-items/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const itemToDelete = await storage.getInvoiceItem(id);
      if (!itemToDelete) {
        return res.status(404).json({ message: "Item not found" });
      }
      await storage.deleteInvoiceItem(id);
      await storage.recalculateInvoiceTotals(itemToDelete.invoiceId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting invoice item:", error);
      res.status(400).json({ message: error.message || "Failed to delete invoice item" });
    }
  });
  app3.get("/api/admin/invoices/:id/media", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (invoice && !hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      const media = await storage.getInvoiceMedia(id);
      res.json(media);
    } catch (error) {
      console.error("Error fetching invoice media:", error);
      res.status(500).json({ message: "Failed to fetch invoice media" });
    }
  });
  app3.post("/api/admin/invoices/:id/media", isAuthenticated, isAdmin, async (req, res) => {
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
      const existingInvMedia = await storage.getInvoiceMedia(id);
      const nextInvIndex = (existingInvMedia?.length || 0) + 1;
      const ext = path9.extname(file.name) || ".jpg";
      const newInvFileName = `${reference}_${nextInvIndex}${ext}`;
      let fileData;
      if (file.tempFilePath) {
        fileData = fs7.readFileSync(file.tempFilePath);
      } else if (file.data) {
        fileData = file.data;
      } else {
        return res.status(400).json({ message: "Impossible de lire le fichier" });
      }
      if (isImage) {
        try {
          const { addWatermarkToImage: addWatermarkToImage2 } = await Promise.resolve().then(() => (init_imageWatermark(), imageWatermark_exports));
          fileData = await addWatermarkToImage2(fileData, reference, file.mimetype);
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
        fileSize: fileData.length
      });
      if (file.tempFilePath) {
        try {
          fs7.unlinkSync(file.tempFilePath);
        } catch (_) {
        }
      }
      sendMediaZipByEmail("invoice", id, reference).catch(
        (err2) => console.error("[ZipEmail] Background invoice ZIP failed:", err2)
      );
      res.json(media);
    } catch (error) {
      console.error("Error uploading invoice media:", error);
      res.status(500).json({ message: error.message || "Failed to upload media" });
    }
  });
  app3.post("/api/admin/invoices/:id/media-zip", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const files = req.files;
      if (!files || !files.file) {
        return res.status(400).json({ message: "Fichier ZIP requis" });
      }
      const file = files.file;
      if (!file.name.toLowerCase().endsWith(".zip")) {
        return res.status(400).json({ message: "Seuls les fichiers ZIP sont accept\xE9s" });
      }
      let zipData;
      if (file.tempFilePath) {
        zipData = fs7.readFileSync(file.tempFilePath);
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
      const results = [];
      for (const [fileName, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir) continue;
        const ext = path9.extname(fileName).toLowerCase();
        if (!imageExts.includes(ext)) continue;
        const baseName = path9.basename(fileName);
        if (baseName.startsWith(".") || baseName.startsWith("__MACOSX")) continue;
        let fileData = Buffer.from(await zipEntry.async("arraybuffer"));
        const newFileName = `${reference}_${nextIndex}${ext}`;
        nextIndex++;
        try {
          const { addWatermarkToImage: addWatermarkToImage2 } = await Promise.resolve().then(() => (init_imageWatermark(), imageWatermark_exports));
          const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
          fileData = await addWatermarkToImage2(fileData, reference, mimeType);
        } catch (_) {
        }
        const filePath = await uploadToStorage(fileData, newFileName, "invoices");
        const media = await storage.createInvoiceMedia({
          invoiceId: id,
          fileName: newFileName,
          filePath,
          fileType: "image",
          fileSize: fileData.length
        });
        results.push(media);
        console.log(`[ZIP] Invoice extracted and uploaded: ${baseName} -> ${newFileName}`);
      }
      if (file.tempFilePath) {
        try {
          fs7.unlinkSync(file.tempFilePath);
        } catch (_) {
        }
      }
      if (results.length === 0) {
        return res.status(400).json({ message: "Aucune image trouv\xE9e dans le fichier ZIP" });
      }
      sendMediaZipByEmail("invoice", id, reference).catch(
        (err2) => console.error("[ZipEmail] Background invoice ZIP failed:", err2)
      );
      res.json({ success: true, count: results.length, media: results });
    } catch (error) {
      console.error("Error uploading invoice ZIP:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'extraction du ZIP" });
    }
  });
  app3.delete("/api/admin/invoice-media/:mediaId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { mediaId } = req.params;
      const media = await storage.getInvoiceMediaById(mediaId);
      if (!media) {
        return res.status(404).json({ message: "Media not found" });
      }
      if (media.filePath) {
        if (media.filePath.startsWith("/gdrive/")) {
          try {
            const { extractFileId: extractFileId2, deleteFromGoogleDrive: deleteFromGoogleDrive2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
            const fileId = extractFileId2(media.filePath);
            if (fileId) await deleteFromGoogleDrive2(fileId);
          } catch (err2) {
            console.error("[Delete] Google Drive delete failed:", err2);
          }
        } else if (media.filePath.startsWith("/objects/")) {
          try {
            const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
            const objStore = new ObjectStorageService3();
            await objStore.deleteFile(media.filePath);
          } catch (err2) {
            console.error("[Delete] Object Storage delete failed:", err2);
          }
        } else if (media.filePath.startsWith("https://storage.googleapis.com/")) {
          try {
            const { deleteFromFirebaseStorage: deleteFromFirebaseStorage2 } = await Promise.resolve().then(() => (init_firebase(), firebase_exports));
            await deleteFromFirebaseStorage2(media.filePath);
          } catch (err2) {
            console.error("[Delete] Firebase delete failed:", err2);
          }
        } else {
          const fs10 = await import("fs");
          const localPath = media.filePath.startsWith("/") ? `.${media.filePath}` : media.filePath;
          if (fs10.existsSync(localPath)) fs10.unlinkSync(localPath);
        }
      }
      await storage.deleteInvoiceMedia(mediaId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting invoice media:", error);
      res.status(500).json({ message: error.message || "Failed to delete media" });
    }
  });
  app3.get("/api/admin/invoices/:id/media/download-zip", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (invoice && !hasGarageAccess(req.user, invoice.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      const mediaList = await storage.getInvoiceMedia(id);
      if (!mediaList || mediaList.length === 0) {
        return res.status(404).json({ message: "Aucune photo \xE0 t\xE9l\xE9charger" });
      }
      const reference = invoice?.invoiceNumber || `FACTURE-${id.slice(0, 8).toUpperCase()}`;
      const archiver = (await import("archiver")).default;
      const archive = archiver("zip", { zlib: { level: 5 } });
      res.set({
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="photos_${reference}.zip"`
      });
      archive.pipe(res);
      for (let i = 0; i < mediaList.length; i++) {
        const m = mediaList[i];
        try {
          const buffer = await downloadMediaBuffer(m.filePath);
          if (buffer) {
            const ext = path9.extname(m.fileName || ".jpg");
            const cleanName = `facture_${reference}_${i + 1}${ext}`;
            archive.append(buffer, { name: cleanName });
          }
        } catch (fileErr) {
          console.error(`[ZIP] Error reading file ${m.filePath}:`, fileErr);
        }
      }
      await archive.finalize();
    } catch (error) {
      console.error("Error creating invoice media ZIP:", error);
      if (!res.headersSent) {
        res.status(500).json({ message: error.message || "Erreur lors de la cr\xE9ation du ZIP" });
      }
    }
  });
  app3.post("/api/admin/bulk-media-zip", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const files = req.files;
      if (!files || !files.file) {
        return res.status(400).json({ message: "Fichier ZIP requis" });
      }
      const file = files.file;
      if (!file.name.toLowerCase().endsWith(".zip")) {
        return res.status(400).json({ message: "Seuls les fichiers ZIP sont accept\xE9s" });
      }
      let zipData;
      if (file.tempFilePath) {
        zipData = fs7.readFileSync(file.tempFilePath);
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
      const quoteMap = /* @__PURE__ */ new Map();
      for (const q of allQuotes) {
        if (q.reference) quoteMap.set(q.reference.toUpperCase(), q.id);
      }
      const invoiceMap = /* @__PURE__ */ new Map();
      for (const inv of allInvoices) {
        if (inv.invoiceNumber) invoiceMap.set(inv.invoiceNumber.toUpperCase(), inv.id);
      }
      const results = [];
      const matchCounters = {};
      for (const [fileName, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir) continue;
        const ext = path9.extname(fileName).toLowerCase();
        if (!imageExts.includes(ext)) continue;
        const baseName = path9.basename(fileName);
        if (baseName.startsWith(".") || baseName.startsWith("__MACOSX")) continue;
        const upperName = baseName.toUpperCase();
        let matchedType = null;
        let matchedId = null;
        let matchedRef = null;
        let bestMatchLen = 0;
        for (const [ref2, id] of Array.from(quoteMap.entries())) {
          if (ref2.length >= 3 && upperName.includes(ref2) && ref2.length > bestMatchLen) {
            const idx = upperName.indexOf(ref2);
            const before = idx > 0 ? upperName[idx - 1] : "_";
            const after = idx + ref2.length < upperName.length ? upperName[idx + ref2.length] : "_";
            if (/[^A-Z0-9]/.test(before) && /[^A-Z0-9]/.test(after)) {
              matchedType = "quote";
              matchedId = id;
              matchedRef = ref2;
              bestMatchLen = ref2.length;
            }
          }
        }
        if (!matchedType) {
          bestMatchLen = 0;
          for (const [ref2, id] of Array.from(invoiceMap.entries())) {
            if (ref2.length >= 3 && upperName.includes(ref2) && ref2.length > bestMatchLen) {
              const idx = upperName.indexOf(ref2);
              const before = idx > 0 ? upperName[idx - 1] : "_";
              const after = idx + ref2.length < upperName.length ? upperName[idx + ref2.length] : "_";
              if (/[^A-Z0-9]/.test(before) && /[^A-Z0-9]/.test(after)) {
                matchedType = "invoice";
                matchedId = id;
                matchedRef = ref2;
                bestMatchLen = ref2.length;
              }
            }
          }
        }
        if (!matchedType || !matchedId || !matchedRef) {
          results.push({ fileName: baseName, matched: false, error: "Aucune r\xE9f\xE9rence trouv\xE9e dans le nom du fichier" });
          continue;
        }
        try {
          let fileData = Buffer.from(await zipEntry.async("arraybuffer"));
          const counterKey = `${matchedType}_${matchedId}`;
          if (!matchCounters[counterKey]) {
            const existing = matchedType === "quote" ? await storage.getQuoteMedia(matchedId) : await storage.getInvoiceMedia(matchedId);
            matchCounters[counterKey] = (existing?.length || 0) + 1;
          }
          const idx = matchCounters[counterKey]++;
          const newFileName = `${matchedRef}_${idx}${ext}`;
          try {
            const { addWatermarkToImage: addWatermarkToImage2 } = await Promise.resolve().then(() => (init_imageWatermark(), imageWatermark_exports));
            const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
            fileData = await addWatermarkToImage2(fileData, matchedRef, mimeType);
          } catch (_) {
          }
          const folder = matchedType === "quote" ? "quotes" : "invoices";
          const filePath = await uploadToStorage(fileData, newFileName, folder);
          if (matchedType === "quote") {
            await storage.createQuoteMedia({
              quoteId: matchedId,
              fileName: newFileName,
              filePath,
              fileType: "image",
              fileSize: fileData.length
            });
          } else {
            await storage.createInvoiceMedia({
              invoiceId: matchedId,
              fileName: newFileName,
              filePath,
              fileType: "image",
              fileSize: fileData.length
            });
          }
          results.push({ fileName: baseName, matched: true, type: matchedType, reference: matchedRef });
          console.log(`[BulkZIP] ${baseName} -> ${matchedType} ${matchedRef} (${newFileName})`);
        } catch (err2) {
          results.push({ fileName: baseName, matched: false, error: err2.message });
        }
      }
      if (file.tempFilePath) {
        try {
          fs7.unlinkSync(file.tempFilePath);
        } catch (_) {
        }
      }
      const matched = results.filter((r) => r.matched).length;
      const unmatched = results.filter((r) => !r.matched).length;
      res.json({ success: true, total: results.length, matched, unmatched, details: results });
    } catch (error) {
      console.error("Error processing bulk ZIP:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'import ZIP" });
    }
  });
  app3.post("/api/admin/media-backup-now", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { performMediaBackup: performMediaBackup2 } = await Promise.resolve().then(() => (init_backupScheduler(), backupScheduler_exports));
      const result = await performMediaBackup2();
      res.json(result);
    } catch (error) {
      console.error("Error triggering media backup:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app3.get("/api/reservations", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const reservations2 = await storage.getReservations(userId);
      res.json(reservations2);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });
  app3.get("/api/admin/delivery-notes", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = getGarageScope(req.user);
      const notes = await storage.getDeliveryNotes(void 0, garageId);
      const notesWithClient = await Promise.all(notes.map(async (note) => {
        const client = await storage.getUser(note.clientId);
        const dnInvoices = await storage.getDeliveryNoteInvoices(note.id);
        return { ...note, client, invoices: dnInvoices.map((dni) => dni.invoice) };
      }));
      res.json(notesWithClient);
    } catch (error) {
      console.error("Error fetching delivery notes:", error);
      res.status(500).json({ message: "Failed to fetch delivery notes" });
    }
  });
  app3.get("/api/admin/delivery-notes/:id", isAuthenticated, isAdmin, async (req, res) => {
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
  app3.post("/api/admin/delivery-notes", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { clientId, invoiceIds, notes } = req.body;
      if (!clientId || typeof clientId !== "string") {
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
      const now = /* @__PURE__ */ new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const mm = String(month).padStart(2, "0");
      const counter = await storage.incrementDeliveryNoteCounter(month, year);
      const deliveryNoteNumber = `BLV-${mm}-${String(counter.currentNumber).padStart(4, "0")}`;
      let totalHT = 0;
      let totalTVA = 0;
      let totalAmount = 0;
      for (const invoiceId of invoiceIds) {
        const invoice = await storage.getInvoice(invoiceId);
        if (invoice) {
          const items = await storage.getInvoiceItems(invoiceId);
          if (items.length > 0) {
            totalHT += items.reduce((sum, item) => sum + parseFloat(item.totalExcludingTax || "0"), 0);
            totalTVA += items.reduce((sum, item) => sum + parseFloat(item.taxAmount || "0"), 0);
            totalAmount += items.reduce((sum, item) => sum + parseFloat(item.totalIncludingTax || "0"), 0);
          } else {
            totalHT += parseFloat(invoice.priceExcludingTax || "0");
            totalTVA += parseFloat(invoice.taxAmount || "0");
            totalAmount += parseFloat(invoice.amount || "0");
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
        notes: notes || null
      });
      await storage.setDeliveryNoteInvoices(note.id, invoiceIds);
      res.json(note);
    } catch (error) {
      console.error("Error creating delivery note:", error);
      res.status(500).json({ message: "Failed to create delivery note" });
    }
  });
  app3.patch("/api/admin/delivery-notes/:id", isAuthenticated, isAdmin, async (req, res) => {
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
      const updateData = {};
      if (status) updateData.status = status;
      if (showPrices !== void 0) updateData.showPrices = showPrices;
      if (req.body.notes !== void 0) updateData.notes = req.body.notes;
      const updated = await storage.updateDeliveryNote(req.params.id, updateData);
      res.json(updated);
    } catch (error) {
      console.error("Error updating delivery note:", error);
      res.status(500).json({ message: "Failed to update delivery note" });
    }
  });
  app3.delete("/api/admin/delivery-notes/:id", isAuthenticated, isAdmin, async (req, res) => {
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
  app3.get("/api/admin/clients/:clientId/invoices", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = getGarageScope(req.user);
      const invoiceList = await storage.getInvoices(req.params.clientId, garageId);
      res.json(invoiceList);
    } catch (error) {
      console.error("Error fetching client invoices:", error);
      res.status(500).json({ message: "Failed to fetch client invoices" });
    }
  });
  app3.get("/api/admin/reservations", isAuthenticated, isAdmin, async (req, res) => {
    try {
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        const reservationList2 = await ts.getReservations();
        return res.json(reservationList2);
      }
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const reservationList = await storage.getReservations(void 0, garageId);
      res.json(reservationList);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });
  app3.get("/api/admin/reservations/:id/services", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const services2 = await storage.getReservationServices(id);
      res.json(services2);
    } catch (error) {
      console.error("Error fetching reservation services:", error);
      res.status(500).json({ message: "Failed to fetch reservation services" });
    }
  });
  app3.post("/api/admin/reservations", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { additionalServiceIds, ...reservationData } = req.body;
      const validatedData = insertReservationSchema.parse(reservationData);
      const scheduledDate = new Date(validatedData.scheduledDate);
      const mm = String(scheduledDate.getMonth() + 1).padStart(2, "0");
      const jj = String(scheduledDate.getDate()).padStart(2, "0");
      const prefix = `RES-${mm}-${jj}-`;
      let reservation = null;
      for (let attempt = 0; attempt < 5; attempt++) {
        try {
          const existing = await db.execute(sql4`SELECT reference FROM reservations WHERE reference LIKE ${prefix + "%"} ORDER BY reference DESC LIMIT 1`);
          let seq = 1;
          if (existing.rows && existing.rows.length > 0) {
            const lastRef = existing.rows[0].reference;
            const lastSeq = parseInt(lastRef.split("-").pop() || "0", 10);
            seq = lastSeq + 1;
          }
          validatedData.reference = `${prefix}${String(seq).padStart(2, "0")}`;
          reservation = await storage.createReservation(validatedData);
          break;
        } catch (err2) {
          if (err2.message?.includes("unique") && attempt < 4) {
            continue;
          }
          throw err2;
        }
      }
      if (additionalServiceIds && Array.isArray(additionalServiceIds) && additionalServiceIds.length > 0) {
        await storage.setReservationServices(reservation.id, additionalServiceIds);
      }
      try {
        const serviceWorkflows2 = await storage.getServiceWorkflows(reservation.serviceId);
        for (const workflow of serviceWorkflows2) {
          const workflowSteps2 = await storage.getWorkflowSteps(workflow.id);
          await storage.initializeReservationWorkflow(reservation.id, workflowSteps2);
        }
      } catch (error) {
        console.log("No workflows for this service or error initializing tasks:", error);
      }
      if (reservation.clientId) {
        try {
          const clientUser = await storage.getUser(reservation.clientId);
          if (clientUser?.phone && clientUser.smsConsent) {
            await sendEventSms({
              userPhone: clientUser.phone,
              userSmsConsent: clientUser.smsConsent,
              userName: `${clientUser.firstName || ""} ${clientUser.lastName || ""}`.trim(),
              eventType: "reservation_confirmed",
              eventTitle: reservation.reference || "votre rendez-vous",
              eventDetails: reservation.date ? new Date(reservation.date).toLocaleString("fr-FR") : void 0
            });
          }
          const staffMembers = await storage.getUsersByRoles(["admin", "employee"]);
          for (const staff of staffMembers) {
            if (staff.phone && isFrenchMobile(staff.phone)) {
              await sendSms({
                to: staff.phone,
                eventType: "reservation_confirmed",
                eventTitle: `Nouveau RDV : ${reservation.reference || ""}`,
                eventDetails: `Client : ${clientUser ? clientUser.firstName + " " + clientUser.lastName : "Client"} - ${reservation.date ? new Date(reservation.date).toLocaleString("fr-FR") : ""}`,
                recipientName: `${staff.firstName || ""} ${staff.lastName || ""}`.trim()
              });
            }
          }
        } catch (smsErr) {
          console.error("[SMS] Failed to send reservation confirmation SMS:", smsErr);
        }
      }
      const client = wsClients2.get(reservation.clientId);
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: "reservation_confirmed",
          reservationId: reservation.id
        }));
      }
      const additionalServices = await storage.getReservationServices(reservation.id);
      res.json({ ...reservation, additionalServices });
    } catch (error) {
      console.error("Error creating reservation:", error);
      res.status(400).json({ message: error.message || "Failed to create reservation" });
    }
  });
  app3.get("/api/admin/reservations/:id/services", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const services2 = await storage.getReservationServices(id);
      res.json(services2);
    } catch (error) {
      console.error("Error fetching reservation services:", error);
      res.status(500).json({ message: "Failed to fetch reservation services" });
    }
  });
  app3.get("/api/notifications", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      if (req.tenantSchema) {
        const ts = createTenantStorage(req.tenantGarageSlug);
        const notifications3 = await ts.getNotifications(userId);
        return res.json(notifications3);
      }
      const notifications2 = await storage.getNotifications(userId);
      res.json(notifications2);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });
  app3.patch("/api/notifications/:id/read", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.markNotificationAsRead(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });
  app3.get("/api/invoices/:id/pdf", async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) return res.status(404).json({ message: "Facture non trouv\xE9e" });
      const items = await storage.getInvoiceItems(id);
      const client = await storage.getUser(invoice.clientId);
      const settings = await storage.getApplicationSettings();
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
  app3.get("/api/quotes/:id/pdf", async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (!quote) return res.status(404).json({ message: "Devis non trouv\xE9" });
      const items = await storage.getQuoteItems(id);
      const client = await storage.getUser(quote.clientId);
      const settings = await storage.getApplicationSettings();
      const service = await storage.getService(quote.serviceId);
      res.json({ quote, items, client, settings, service });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.get("/api/invoices/:id/facturx", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const isUserAdmin = req.user.role === "admin" || req.user.role === "superadmin";
      const invoice = await storage.getInvoice(id);
      if (!invoice) {
        return res.status(404).json({ message: "Facture introuvable" });
      }
      if (!isUserAdmin && invoice.clientId !== userId) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
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
      const sellerSiren = garage?.siren || "";
      const sellerSiret = garage?.siret || settings?.companySiret || "";
      const sellerTva = garage?.tvaNumber || settings?.companyTvaNumber || "";
      const sellerEmail = garage?.email || settings?.companyEmail || "";
      const sellerPhone = garage?.phone || settings?.companyPhone || "";
      const sellerIban = garage?.iban || settings?.companyIban || "";
      const sellerSwift = garage?.swift || settings?.companySwift || "";
      const sellerCountry = garage?.country || "FR";
      const sellerLegalForm = garage?.legalForm || "";
      const sellerCapitalSocial = garage?.capitalSocial || "";
      const sellerNafCode = garage?.nafCode || "";
      const sellerRcsCity = garage?.rcsCity || "";
      const sellerBankName = garage?.bankName || "";
      const buyerName = client?.companyName || `${client?.firstName || ""} ${client?.lastName || ""}`.trim() || client?.email || "Client";
      const buyerSiret = client?.siret || "";
      const buyerTva = client?.tvaNumber || "";
      const buyerAddress = client?.companyAddress || client?.address || "";
      const buyerPostalCode = client?.companyPostalCode || client?.postalCode || "";
      const buyerCity = client?.companyCity || client?.city || "";
      const buyerCountry = client?.companyCountry || "FR";
      const buyerEmail = client?.email || "";
      const isBuyerPro = !!(buyerSiret || buyerTva);
      const invoiceDate = invoice.createdAt ? new Date(invoice.createdAt).toISOString().slice(0, 10) : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const dueDate = invoice.dueDate ? new Date(invoice.dueDate).toISOString().slice(0, 10) : invoiceDate;
      const ht = parseFloat(invoice.priceExcludingTax || "0");
      const tva = parseFloat(invoice.taxAmount || "0");
      const ttc = parseFloat(invoice.amount || "0");
      const taxRate = parseFloat(invoice.taxRate || "20");
      const itemLines = items.length > 0 ? items.map((item, idx) => `
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
      const paymentMethodCode = invoice.paymentMethod === "card" ? "48" : invoice.paymentMethod === "sepa" ? "59" : invoice.paymentMethod === "wire_transfer" ? "30" : invoice.paymentMethod === "cash" ? "10" : "30";
      const invoiceTypeCode = invoice.type === "credit_note" ? "381" : "380";
      const sellerDescription = [
        sellerLegalForm,
        sellerCapitalSocial ? `Capital ${sellerCapitalSocial} EUR` : "",
        sellerRcsCity ? `RCS ${sellerRcsCity}` : "",
        sellerNafCode ? `NAF ${sellerNafCode}` : ""
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
    } catch (error) {
      console.error("Error generating client Factur-X XML:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.patch("/api/admin/reservations/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { additionalServiceIds, ...bodyData } = req.body;
      const previousReservation = await storage.getReservation(id);
      const validatedData = insertReservationSchema.partial().parse(bodyData);
      const reservation = await storage.updateReservation(id, validatedData);
      if (additionalServiceIds !== void 0 && Array.isArray(additionalServiceIds)) {
        await storage.setReservationServices(id, additionalServiceIds);
      }
      let action = "updated";
      let summary = "R\xE9servation mise \xE0 jour";
      if (validatedData.status === "confirmed" && previousReservation?.status !== "confirmed") {
        action = "confirmed";
        summary = "R\xE9servation confirm\xE9e";
      } else if (validatedData.status === "cancelled" && previousReservation?.status !== "cancelled") {
        action = "cancelled";
        summary = "R\xE9servation annul\xE9e";
      } else if (validatedData.status === "completed" && previousReservation?.status !== "completed") {
        action = "completed";
        summary = "R\xE9servation termin\xE9e";
      }
      await logAuditEvent({
        req,
        entityType: "reservation",
        entityId: id,
        action,
        summary,
        previousData: previousReservation,
        newData: reservation
      });
      if (validatedData.status) {
        await storage.createNotification({
          userId: reservation.clientId,
          type: "reservation",
          title: "R\xE9servation mise \xE0 jour",
          message: `Votre r\xE9servation a \xE9t\xE9 mise \xE0 jour - Statut: ${validatedData.status}`,
          relatedId: reservation.id
        });
        const wsClient = wsClients2.get(reservation.clientId);
        if (wsClient && wsClient.readyState === WebSocket.OPEN) {
          wsClient.send(JSON.stringify({
            type: "reservation_updated",
            reservationId: reservation.id,
            status: validatedData.status
          }));
        }
      }
      const additionalServices = await storage.getReservationServices(id);
      res.json({ ...reservation, additionalServices });
    } catch (error) {
      console.error("Error updating reservation:", error);
      res.status(400).json({ message: error.message || "Failed to update reservation" });
    }
  });
  app3.delete("/api/admin/reservations/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const reservation = await storage.getReservation(id);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      await storage.updateReservation(id, { status: "cancelled" });
      await storage.createNotification({
        userId: reservation.clientId,
        type: "reservation",
        title: "R\xE9servation annul\xE9e",
        message: "Votre r\xE9servation a \xE9t\xE9 annul\xE9e",
        relatedId: reservation.id
      });
      const client = wsClients2.get(reservation.clientId);
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: "reservation_cancelled",
          reservationId: reservation.id
        }));
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting reservation:", error);
      res.status(400).json({ message: error.message || "Failed to delete reservation" });
    }
  });
  app3.get("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = getGarageScope(req.user);
      let userList;
      if (garageId) {
        userList = await storage.getUsersByGarage(garageId);
      } else {
        userList = await storage.getAllUsers();
      }
      res.json(sanitizeUsers(userList));
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app3.get("/api/admin/users/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(id);
      if (user && !hasGarageAccess(req.user, user.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouv\xE9" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Erreur lors de la r\xE9cup\xE9ration de l'utilisateur" });
    }
  });
  app3.patch("/api/admin/users/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const currentUser = req.user;
      const targetUser = await storage.getUser(id);
      if (!targetUser) {
        return res.status(404).json({ message: "Utilisateur non trouv\xE9" });
      }
      const allowedRoles = currentUser.role === "rootadmin" ? ["client", "client_professionnel", "employe", "admin", "superadmin"] : ["client", "client_professionnel", "employe", "admin"];
      const updateSchema = z2.object({
        role: z2.enum(allowedRoles).optional(),
        email: z2.string().email().optional(),
        firstName: z2.string().optional(),
        lastName: z2.string().optional(),
        phone: z2.string().optional().nullable(),
        address: z2.string().optional().nullable(),
        postalCode: z2.string().optional().nullable(),
        city: z2.string().optional().nullable(),
        companyName: z2.string().optional().nullable(),
        siret: z2.string().optional().nullable(),
        tvaNumber: z2.string().optional().nullable(),
        companyAddress: z2.string().optional().nullable(),
        smsConsent: z2.boolean().optional()
      });
      const validatedData = updateSchema.parse(req.body);
      if (validatedData.role === "rootadmin") {
        return res.status(403).json({ message: "Le r\xF4le rootadmin ne peut pas \xEAtre assign\xE9 via cette interface" });
      }
      if (currentUser.role === "employe" && targetUser.role === "admin") {
        if (validatedData.role && validatedData.role !== "admin") {
          return res.status(403).json({
            message: "Vous n'avez pas la permission de modifier le r\xF4le d'un administrateur"
          });
        }
      }
      if (currentUser.role === "employe" && validatedData.role === "admin" && targetUser.role !== "admin") {
        return res.status(403).json({
          message: "Vous n'avez pas la permission de promouvoir un utilisateur au r\xF4le administrateur"
        });
      }
      const user = await storage.updateUser(id, validatedData);
      res.json(sanitizeUser(user));
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(400).json({ message: error.message || "Failed to update user" });
    }
  });
  app3.patch("/api/user/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const updateSchema = z2.object({
        firstName: z2.string().optional(),
        lastName: z2.string().optional(),
        phone: z2.string().optional().nullable(),
        address: z2.string().optional().nullable(),
        postalCode: z2.string().optional().nullable(),
        city: z2.string().optional().nullable(),
        companyName: z2.string().optional().nullable(),
        siret: z2.string().optional().nullable(),
        tvaNumber: z2.string().optional().nullable(),
        companyAddress: z2.string().optional().nullable(),
        smsConsent: z2.boolean().optional()
      });
      const validatedData = updateSchema.parse(req.body);
      const user = await storage.updateUser(userId, validatedData);
      res.json(sanitizeUser(user));
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(400).json({ message: error.message || "Erreur lors de la mise \xE0 jour du profil" });
    }
  });
  app3.patch("/api/admin/users/:id/password", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const currentUser = req.user;
      const passwordSchema = z2.object({
        newPassword: z2.string().min(6, "Le mot de passe doit contenir au moins 6 caract\xE8res")
      });
      const { newPassword } = passwordSchema.parse(req.body);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouv\xE9" });
      }
      if (currentUser.role === "employe" && user.role === "admin") {
        return res.status(403).json({
          message: "Vous n'avez pas la permission de modifier le mot de passe d'un administrateur"
        });
      }
      const hashedPassword = await bcrypt2.hash(newPassword, 10);
      await storage.updateUser(id, { password: hashedPassword });
      res.json({ message: "Mot de passe modifi\xE9 avec succ\xE8s" });
    } catch (error) {
      console.error("Error changing user password:", error);
      res.status(400).json({ message: error.message || "\xC9chec de la modification du mot de passe" });
    }
  });
  app3.patch("/api/user/password", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const passwordSchema = z2.object({
        currentPassword: z2.string().min(1, "Le mot de passe actuel est requis"),
        newPassword: z2.string().min(6, "Le nouveau mot de passe doit contenir au moins 6 caract\xE8res")
      });
      const { currentPassword, newPassword } = passwordSchema.parse(req.body);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouv\xE9" });
      }
      if (!user.password) {
        return res.status(400).json({ message: "Ce compte utilise une authentification externe" });
      }
      const isValidPassword = await bcrypt2.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Mot de passe actuel incorrect" });
      }
      const hashedPassword = await bcrypt2.hash(newPassword, 10);
      await storage.updateUser(userId, { password: hashedPassword });
      res.json({ message: "Mot de passe modifi\xE9 avec succ\xE8s" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(400).json({ message: error.message || "\xC9chec de la modification du mot de passe" });
    }
  });
  app3.get("/api/user/dashboard-stats", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const reports = await storage.getAiReports({ userId });
      const subs = await storage.getUserSubscriptions(userId);
      const active = subs.find((s) => s.status === "active");
      let planName;
      if (active?.planId) {
        const plan = await storage.getSubscriptionPlan(active.planId);
        planName = plan?.name;
      }
      res.json({
        totalReports: reports.length,
        recentReports: reports.slice(0, 5).map((r) => ({
          id: r.id,
          make: r.make,
          model: r.model,
          year: r.year,
          createdAt: r.createdAt,
          severity: r.metadata?.report?.urgencyLevel
        })),
        subscription: active ? {
          status: active.status,
          planName,
          reportsUsed: active.reportsUsed,
          reportsIncluded: active.reportsIncluded,
          periodEnd: active.currentPeriodEnd
        } : null
      });
    } catch (error) {
      console.error("[user/dashboard-stats]", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/user/reports", isAuthenticated, async (req, res) => {
    try {
      const reports = await storage.getAiReports({ userId: req.user.id });
      res.json(reports.map((r) => ({
        id: r.id,
        make: r.make,
        model: r.model,
        year: r.year,
        mileage: r.mileage,
        issue: r.issue,
        content: r.content,
        createdAt: r.createdAt,
        severity: r.metadata?.report?.urgencyLevel,
        metadata: r.metadata
      })));
    } catch (error) {
      console.error("[user/reports]", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/user/reports/:id/excel", isAuthenticated, async (req, res) => {
    try {
      const report = await storage.getAiReport(req.params.id);
      if (!report || report.userId !== req.user.id) {
        return res.status(404).json({ message: "Rapport introuvable" });
      }
      const XLSX = await import("xlsx");
      const wb = XLSX.utils.book_new();
      const data = report.metadata?.report || {};
      const summary = [
        ["Marque", report.make],
        ["Mod\xE8le", report.model],
        ["Ann\xE9e", report.year],
        ["Kilom\xE9trage", report.mileage || ""],
        ["Probl\xE8me", report.issue],
        ["Urgence", data.urgencyLevel || ""],
        ["Co\xFBt estim\xE9", data.estimatedCost || ""],
        ["R\xE9sum\xE9", data.summary || ""],
        ["Date", new Date(report.createdAt).toLocaleString("fr-FR")]
      ];
      const wsSummary = XLSX.utils.aoa_to_sheet(summary);
      XLSX.utils.book_append_sheet(wb, wsSummary, "R\xE9sum\xE9");
      if (Array.isArray(data.sections) && data.sections.length) {
        const sectionsRows = [["Titre", "S\xE9v\xE9rit\xE9", "Contenu"], ...data.sections.map((s) => [s.title, s.severity || "", s.content])];
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sectionsRows), "Points de vigilance");
      }
      if (Array.isArray(data.recommendations) && data.recommendations.length) {
        const recRows = [["#", "Action"], ...data.recommendations.map((r, i) => [i + 1, r])];
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(recRows), "Checklist");
      }
      const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="diagnostic-${report.make}-${Date.now()}.xlsx"`);
      res.send(buf);
    } catch (error) {
      console.error("[user/reports/excel]", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/user/payments", isAuthenticated, async (req, res) => {
    try {
      const subs = await storage.getUserSubscriptions(req.user.id);
      const planIds = [...new Set(subs.map((s) => s.planId).filter(Boolean))];
      const planMap = /* @__PURE__ */ new Map();
      for (const id of planIds) {
        const plan = await storage.getSubscriptionPlan(id);
        if (plan) planMap.set(id, plan.name);
      }
      res.json(subs.map((s) => ({
        id: s.id,
        planId: s.planId,
        planName: s.planId ? planMap.get(s.planId) : void 0,
        status: s.status,
        reportsUsed: s.reportsUsed,
        reportsIncluded: s.reportsIncluded,
        currentPeriodEnd: s.currentPeriodEnd,
        createdAt: s.createdAt
      })));
    } catch (error) {
      console.error("[user/payments]", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/user/invoices", isAuthenticated, async (req, res) => {
    try {
      const subs = await storage.getUserSubscriptions(req.user.id);
      const paid = subs.filter((s) => s.status === "active" || s.status === "completed");
      const planIds = [...new Set(paid.map((s) => s.planId).filter(Boolean))];
      const planMap = /* @__PURE__ */ new Map();
      for (const id of planIds) {
        const plan = await storage.getSubscriptionPlan(id);
        if (plan) planMap.set(id, plan);
      }
      res.json(paid.map((s) => {
        const plan = s.planId ? planMap.get(s.planId) : null;
        return {
          id: s.id,
          number: `INV-${s.id.slice(0, 8).toUpperCase()}`,
          amount: plan?.price || "0",
          currency: plan?.currency || "eur",
          status: "paid",
          createdAt: s.createdAt,
          description: plan?.name || "Pack rapports"
        };
      }));
    } catch (error) {
      console.error("[user/invoices]", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/user/invoices/:id/pdf", isAuthenticated, async (req, res) => {
    try {
      const subs = await storage.getUserSubscriptions(req.user.id);
      const sub = subs.find((s) => s.id === req.params.id);
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
<table><thead><tr><th>Description</th><th>Quantit\xE9</th><th>Prix</th></tr></thead>
<tbody><tr><td>${plan?.name || "Pack rapports"}</td><td>${plan?.reportsIncluded || 1} rapports</td><td>${Number(plan?.price || 0).toFixed(2)} \u20AC</td></tr></tbody></table>
<p class="total">Total TTC : ${Number(plan?.price || 0).toFixed(2)} \u20AC</p>
<p style="margin-top:40px;font-size:0.9em;color:#666">Statut : Pay\xE9e \xB7 Merci pour votre confiance.</p>
</body></html>`;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Content-Disposition", `inline; filename="${number}.html"`);
      res.send(html);
    } catch (error) {
      console.error("[user/invoice/pdf]", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/user/support", isAuthenticated, async (req, res) => {
    try {
      const tickets = await storage.getSupportTicketsByUser(req.user.id);
      res.json(tickets);
    } catch (error) {
      console.error("[user/support GET]", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/user/support", isAuthenticated, async (req, res) => {
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
        status: "open"
      });
      try {
        const { sendEmail: sendEmail2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
        const settings = await storage.getApplicationSettings();
        const to = settings?.companyEmail || "support@autoreport.com";
        const clientName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.email || req.user.id;
        await sendEmail2({
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
          replyTo: user?.email || void 0
        });
      } catch (e) {
        console.error("[support email]", e);
      }
      res.json(ticket);
    } catch (error) {
      console.error("[user/support POST]", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/user/delete-request", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouv\xE9" });
      }
      const { reason } = req.body;
      const { sendEmail: sendEmail2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
      const settings = await storage.getApplicationSettings();
      const clientName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || userId;
      const adminEmail = settings?.companyEmail || "contact@autoreport.com";
      await sendEmail2({
        to: adminEmail,
        subject: `[RGPD] Demande de suppression de compte - ${clientName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #dc2626;">Demande de suppression de compte</h2>
            <p><strong>Client :</strong> ${clientName}</p>
            <p><strong>Email :</strong> ${user.email || "N/A"}</p>
            <p><strong>ID :</strong> ${userId}</p>
            <p><strong>Date :</strong> ${(/* @__PURE__ */ new Date()).toLocaleString("fr-FR")}</p>
            ${reason ? `<p><strong>Motif :</strong> ${reason}</p>` : ""}
            <hr />
            <p style="color: #6b7280; font-size: 14px;">
              Conform\xE9ment au RGPD, cette demande doit \xEAtre trait\xE9e dans un d\xE9lai de 72 heures.
              Veuillez supprimer manuellement le compte et toutes les donn\xE9es associ\xE9es depuis l'interface d'administration.
            </p>
          </div>
        `
      });
      res.json({ message: "Demande de suppression envoy\xE9e avec succ\xE8s" });
    } catch (error) {
      console.error("Error sending delete request:", error);
      res.status(500).json({ message: "Impossible d'envoyer la demande de suppression" });
    }
  });
  app3.post("/api/admin/clients", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const createClientSchema = z2.object({
        email: z2.string().email(),
        firstName: z2.string().min(1, "Le pr\xE9nom est requis"),
        lastName: z2.string().min(1, "Le nom est requis"),
        phone: z2.string().optional(),
        address: z2.string().optional(),
        postalCode: z2.string().optional(),
        city: z2.string().optional(),
        role: z2.enum(["client", "client_professionnel"]),
        companyName: z2.string().optional(),
        siret: z2.string().optional(),
        tvaNumber: z2.string().optional(),
        companyAddress: z2.string().optional()
      });
      const validatedData = createClientSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Cet email est d\xE9j\xE0 utilis\xE9" });
      }
      const { hashPassword: hashPassword2 } = await Promise.resolve().then(() => (init_localAuth(), localAuth_exports));
      const defaultPassword = await hashPassword2("123user");
      const userData = {
        email: validatedData.email,
        password: defaultPassword,
        firstName: validatedData.firstName || null,
        lastName: validatedData.lastName || null,
        phone: validatedData.phone || null,
        address: validatedData.address || null,
        postalCode: validatedData.postalCode || null,
        city: validatedData.city || null,
        role: validatedData.role
      };
      if (validatedData.role === "client_professionnel") {
        userData.companyName = validatedData.companyName || null;
        userData.siret = validatedData.siret || null;
        userData.tvaNumber = validatedData.tvaNumber || null;
        userData.companyAddress = validatedData.companyAddress || null;
      }
      const newClient = await storage.createUser(userData);
      res.json(sanitizeUser(newClient));
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(400).json({ message: error.message || "\xC9chec de la cr\xE9ation du client" });
    }
  });
  app3.post("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const createSchema = z2.object({
        email: z2.string().email(),
        firstName: z2.string().optional(),
        lastName: z2.string().optional(),
        phone: z2.string().optional(),
        address: z2.string().optional(),
        postalCode: z2.string().optional(),
        city: z2.string().optional(),
        role: z2.enum(["client", "client_professionnel", "employe", "admin"]).optional(),
        companyName: z2.string().optional(),
        siret: z2.string().optional(),
        tvaNumber: z2.string().optional(),
        companyAddress: z2.string().optional()
      });
      const validatedData = createSchema.parse(req.body);
      const { hashPassword: hashPassword2 } = await Promise.resolve().then(() => (init_localAuth(), localAuth_exports));
      const defaultPassword = await hashPassword2("123user");
      const user = await storage.createUser({
        ...validatedData,
        password: defaultPassword
      });
      res.json(sanitizeUser(user));
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ message: error.message || "Failed to create user" });
    }
  });
  app3.delete("/api/admin/users/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const currentUser = req.user;
      const targetUser = await storage.getUser(id);
      if (!targetUser) {
        return res.status(404).json({ message: "Utilisateur non trouv\xE9" });
      }
      if (currentUser.role === "employe" && targetUser.role === "admin") {
        return res.status(403).json({
          message: "Vous n'avez pas la permission de supprimer un administrateur"
        });
      }
      await storage.deleteUser(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(400).json({ message: error.message || "Failed to delete user" });
    }
  });
  app3.get("/api/admin/settings", isAuthenticated, isAdmin, async (req, res) => {
    try {
      let settings = await storage.getApplicationSettings();
      if (!settings) {
        settings = await storage.createOrUpdateApplicationSettings({});
      }
      res.json(settings);
    } catch (error) {
      console.error("Error fetching application settings:", error);
      res.status(500).json({ message: "Failed to fetch application settings" });
    }
  });
  app3.patch("/api/admin/settings", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const settings = await storage.createOrUpdateApplicationSettings(req.body);
      const { updateDailyReportSchedule: updateDailyReportSchedule2 } = await Promise.resolve().then(() => (init_dailyReportScheduler(), dailyReportScheduler_exports));
      updateDailyReportSchedule2({
        enabled: settings.dailyReportEnabled ?? false,
        time: settings.dailyReportTime || "21:00",
        recipients: settings.dailyReportRecipients || "contact@autoreport.com"
      });
      res.json(settings);
    } catch (error) {
      console.error("Error updating application settings:", error);
      res.status(400).json({ message: error.message || "Failed to update application settings" });
    }
  });
  app3.post("/api/admin/daily-report/test", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { triggerDailyReport: triggerDailyReport2 } = await Promise.resolve().then(() => (init_dailyReportScheduler(), dailyReportScheduler_exports));
      await triggerDailyReport2();
      res.json({ success: true, message: "Rapport test envoy\xE9" });
    } catch (error) {
      console.error("Error sending test daily report:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'envoi du rapport test" });
    }
  });
  app3.get("/api/admin/garage-legal", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.garageId;
      if (!garageId) {
        return res.status(404).json({ message: "Aucun garage associ\xE9" });
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
        siren: garage.siren || "",
        siret: garage.siret || "",
        tvaNumber: garage.tvaNumber || "",
        iban: garage.iban || "",
        swift: garage.swift || "",
        bankName: garage.bankName || "",
        legalForm: garage.legalForm || "",
        capitalSocial: garage.capitalSocial || "",
        nafCode: garage.nafCode || "",
        rcsCity: garage.rcsCity || "",
        country: garage.country || "FR"
      });
    } catch (error) {
      console.error("Error fetching garage legal info:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.patch("/api/admin/garage-legal", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.garageId;
      if (!garageId) {
        return res.status(404).json({ message: "Aucun garage associ\xE9" });
      }
      const allowedFields = [
        "name",
        "address",
        "city",
        "postalCode",
        "phone",
        "email",
        "website",
        "siren",
        "siret",
        "tvaNumber",
        "iban",
        "swift",
        "bankName",
        "legalForm",
        "capitalSocial",
        "nafCode",
        "rcsCity",
        "country"
      ];
      const updateData = {};
      for (const field of allowedFields) {
        if (req.body[field] !== void 0) {
          updateData[field] = req.body[field];
        }
      }
      updateData.updatedAt = /* @__PURE__ */ new Date();
      const garage = await storage.updateGarage(garageId, updateData);
      res.json(garage);
    } catch (error) {
      console.error("Error updating garage legal info:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/engagements", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { clientId } = req.query;
      const garageId = req.user.role !== "superadmin" ? req.user.garageId : null;
      const engagementsList = await storage.getEngagements(clientId);
      const filteredEngagements = garageId ? engagementsList.filter((e) => {
        return true;
      }) : engagementsList;
      res.json(filteredEngagements);
    } catch (error) {
      console.error("Error fetching engagements:", error);
      res.status(500).json({ message: "Failed to fetch engagements" });
    }
  });
  app3.get("/api/admin/engagements/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const engagement = await storage.getEngagement(req.params.id);
      if (!engagement) {
        return res.status(404).json({ message: "Engagement not found" });
      }
      res.json(engagement);
    } catch (error) {
      console.error("Error fetching engagement:", error);
      res.status(500).json({ message: "Failed to fetch engagement" });
    }
  });
  app3.post("/api/admin/engagements", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const engagement = await storage.createEngagement({
        clientId: req.body.clientId,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || "active"
      });
      res.json(engagement);
    } catch (error) {
      console.error("Error creating engagement:", error);
      res.status(400).json({ message: error.message || "Failed to create engagement" });
    }
  });
  app3.patch("/api/admin/engagements/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const engagement = await storage.updateEngagement(req.params.id, req.body);
      res.json(engagement);
    } catch (error) {
      console.error("Error updating engagement:", error);
      res.status(400).json({ message: error.message || "Failed to update engagement" });
    }
  });
  app3.delete("/api/admin/engagements/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.updateEngagement(req.params.id, { status: "cancelled" });
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting engagement:", error);
      res.status(400).json({ message: error.message || "Failed to delete engagement" });
    }
  });
  app3.get("/api/admin/engagements/summary/:clientId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const summary = await storage.getEngagementSummary(req.params.clientId);
      res.json(summary);
    } catch (error) {
      console.error("Error fetching engagement summary:", error);
      res.status(500).json({ message: "Failed to fetch engagement summary" });
    }
  });
  app3.get("/api/admin/engagements/clients-summary", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user.role !== "superadmin" ? req.user.garageId : null;
      const allUsers = await storage.getAllUsers();
      const clients = allUsers.filter((u) => u.role === "client" || u.role === "client_professionnel");
      const allQuotes = await storage.getQuotes();
      const allInvoices = await storage.getInvoices();
      const allReservations = await storage.getReservations();
      const filteredQuotes = garageId ? allQuotes.filter((q) => q.garageId === garageId) : allQuotes;
      const filteredInvoices = garageId ? allInvoices.filter((i) => i.garageId === garageId) : allInvoices;
      const filteredReservations = garageId ? allReservations.filter((r) => r.garageId === garageId) : allReservations;
      const clientSummaries = clients.map((client) => {
        const clientQuotes = filteredQuotes.filter((q) => q.clientId === client.id);
        const clientInvoices = filteredInvoices.filter((i) => i.clientId === client.id);
        const clientReservations = filteredReservations.filter((r) => r.clientId === client.id);
        if (clientQuotes.length === 0 && clientInvoices.length === 0 && clientReservations.length === 0) {
          return null;
        }
        const totalCA = clientInvoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + parseFloat(i.amount || "0"), 0);
        const lastActivity = [...clientQuotes, ...clientInvoices, ...clientReservations].map((item) => item.createdAt ? new Date(item.createdAt).getTime() : 0).sort((a, b) => b - a)[0] || 0;
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
          lastActivity: lastActivity ? new Date(lastActivity).toISOString() : null
        };
      }).filter(Boolean).sort((a, b) => {
        const dateA = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
        const dateB = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
        return dateB - dateA;
      });
      res.json(clientSummaries);
    } catch (error) {
      console.error("Error fetching clients summary:", error);
      res.status(500).json({ message: "Failed to fetch clients summary" });
    }
  });
  app3.get("/api/admin/workflows", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const workflows2 = await storage.getWorkflows();
      res.json(workflows2);
    } catch (error) {
      console.error("Error fetching workflows:", error);
      res.status(500).json({ message: "Failed to fetch workflows" });
    }
  });
  app3.get("/api/admin/workflows/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const workflow = await storage.getWorkflow(req.params.id);
      if (!workflow) {
        return res.status(404).json({ message: "Workflow not found" });
      }
      res.json(workflow);
    } catch (error) {
      console.error("Error fetching workflow:", error);
      res.status(500).json({ message: "Failed to fetch workflow" });
    }
  });
  app3.get("/api/services/:serviceId/workflow", isAuthenticated, async (req, res) => {
    try {
      const workflow = await storage.getWorkflowByServiceId(req.params.serviceId);
      if (!workflow) {
        return res.status(404).json({ message: "No workflow found for this service" });
      }
      const steps = await storage.getWorkflowSteps(workflow.id);
      res.json({ ...workflow, steps });
    } catch (error) {
      console.error("Error fetching service workflow:", error);
      res.status(500).json({ message: "Failed to fetch service workflow" });
    }
  });
  app3.get("/api/services-with-workflows", isAuthenticated, async (req, res) => {
    try {
      const allServices = await storage.getServices();
      const servicesWithWorkflows = await Promise.all(
        allServices.map(async (service) => {
          const workflow = await storage.getWorkflowByServiceId(service.id);
          let steps = [];
          if (workflow) {
            steps = await storage.getWorkflowSteps(workflow.id);
          }
          return { ...service, workflow: workflow ? { ...workflow, steps } : null };
        })
      );
      res.json(servicesWithWorkflows);
    } catch (error) {
      console.error("Error fetching services with workflows:", error);
      res.status(500).json({ message: "Failed to fetch services with workflows" });
    }
  });
  app3.post("/api/admin/workflows", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const workflow = await storage.createWorkflow({
        name: req.body.name,
        description: req.body.description
      });
      res.json(workflow);
    } catch (error) {
      console.error("Error creating workflow:", error);
      res.status(400).json({ message: error.message || "Failed to create workflow" });
    }
  });
  app3.post("/api/admin/workflow-steps", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const step = await storage.createWorkflowStep({
        workflowId: req.body.workflowId,
        stepNumber: req.body.stepNumber,
        title: req.body.title,
        description: req.body.description
      });
      res.json(step);
    } catch (error) {
      console.error("Error creating workflow step:", error);
      res.status(400).json({ message: error.message || "Failed to create workflow step" });
    }
  });
  app3.get("/api/admin/workflows/:workflowId/steps", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const steps = await storage.getWorkflowSteps(req.params.workflowId);
      res.json(steps);
    } catch (error) {
      console.error("Error fetching workflow steps:", error);
      res.status(500).json({ message: "Failed to fetch workflow steps" });
    }
  });
  app3.post("/api/admin/services/:serviceId/workflows", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const serviceWorkflow = await storage.assignWorkflowToService({
        serviceId: req.params.serviceId,
        workflowId: req.body.workflowId
      });
      res.json(serviceWorkflow);
    } catch (error) {
      console.error("Error assigning workflow to service:", error);
      res.status(400).json({ message: error.message || "Failed to assign workflow" });
    }
  });
  app3.get("/api/admin/services/:serviceId/workflows", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const workflows2 = await storage.getServiceWorkflows(req.params.serviceId);
      res.json(workflows2);
    } catch (error) {
      console.error("Error fetching service workflows:", error);
      res.status(500).json({ message: "Failed to fetch service workflows" });
    }
  });
  app3.delete("/api/admin/workflows/:workflowId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteWorkflow(req.params.workflowId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting workflow:", error);
      res.status(400).json({ message: error.message || "Failed to delete workflow" });
    }
  });
  app3.patch("/api/admin/workflows/:workflowId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const workflow = await storage.updateWorkflow(req.params.workflowId, {
        name: req.body.name,
        description: req.body.description
      });
      res.json(workflow);
    } catch (error) {
      console.error("Error updating workflow:", error);
      res.status(400).json({ message: error.message || "Failed to update workflow" });
    }
  });
  app3.delete("/api/admin/workflow-steps/:stepId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteWorkflowStep(req.params.stepId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting workflow step:", error);
      res.status(400).json({ message: error.message || "Failed to delete workflow step" });
    }
  });
  app3.patch("/api/admin/workflow-steps/:stepId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const step = await storage.updateWorkflowStep(req.params.stepId, {
        title: req.body.title,
        description: req.body.description,
        stepNumber: req.body.stepNumber
      });
      res.json(step);
    } catch (error) {
      console.error("Error updating workflow step:", error);
      res.status(400).json({ message: error.message || "Failed to update workflow step" });
    }
  });
  app3.delete("/api/admin/services/:serviceId/workflows/:workflowId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteServiceWorkflow(req.params.serviceId, req.params.workflowId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error unassigning workflow:", error);
      res.status(400).json({ message: error.message || "Failed to unassign workflow" });
    }
  });
  app3.get("/api/workshop/reservations/:reservationId/tasks", isAuthenticated, async (req, res) => {
    try {
      const tasks = await storage.getReservationTasks(req.params.reservationId);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching workshop tasks:", error);
      res.status(500).json({ message: "Failed to fetch workshop tasks" });
    }
  });
  app3.patch("/api/workshop/tasks/:taskId", isAuthenticated, async (req, res) => {
    try {
      const task = await storage.updateWorkshopTask(req.params.taskId, {
        isCompleted: req.body.isCompleted,
        comment: req.body.comment,
        completedByUserId: req.body.isCompleted ? req.user.id : void 0,
        completedAt: req.body.isCompleted ? /* @__PURE__ */ new Date() : void 0
      });
      await logAuditEvent({
        req,
        entityType: "workshop_task",
        entityId: task.id,
        action: req.body.isCompleted ? "completed" : "updated",
        summary: `\xC9tape ${req.body.isCompleted ? "valid\xE9e" : "mise \xE0 jour"}`,
        newData: task
      });
      res.json(task);
    } catch (error) {
      console.error("Error updating workshop task:", error);
      res.status(400).json({ message: error.message || "Failed to update workshop task" });
    }
  });
  app3.get("/api/admin/repair-orders", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const orders = await storage.getRepairOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching repair orders:", error);
      res.status(500).json({ message: "Failed to fetch repair orders" });
    }
  });
  app3.get("/api/admin/repair-orders/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const order = await storage.getRepairOrder(req.params.id);
      if (!order) return res.status(404).json({ message: "Repair order not found" });
      res.json(order);
    } catch (error) {
      console.error("Error fetching repair order:", error);
      res.status(500).json({ message: "Failed to fetch repair order" });
    }
  });
  app3.get("/api/admin/repair-orders/reservation/:reservationId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const order = await storage.getRepairOrderByReservation(req.params.reservationId);
      res.json(order || null);
    } catch (error) {
      console.error("Error fetching repair order by reservation:", error);
      res.status(500).json({ message: "Failed to fetch repair order" });
    }
  });
  app3.post("/api/admin/repair-orders", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const now = /* @__PURE__ */ new Date();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      const prefix = `OR-${mm}-${dd}-`;
      let order;
      for (let attempt = 0; attempt < 5; attempt++) {
        try {
          let seq = 1;
          const existing = await db.select().from(repairOrders).where(sql4`reference LIKE ${prefix + "%"}`).orderBy(desc3(repairOrders.reference));
          if (existing.length > 0) {
            const lastRef = existing[0].reference || "";
            const lastSeq = parseInt(lastRef.split("-").pop() || "0", 10);
            seq = lastSeq + 1;
          }
          const reference = `${prefix}${String(seq).padStart(2, "0")}`;
          order = await storage.createRepairOrder({
            ...req.body,
            reference,
            createdById: req.user.id
          });
          break;
        } catch (err2) {
          if (err2.message?.includes("unique") && attempt < 4) continue;
          throw err2;
        }
      }
      res.json(order);
    } catch (error) {
      console.error("Error creating repair order:", error);
      res.status(400).json({ message: error.message || "Failed to create repair order" });
    }
  });
  app3.patch("/api/admin/repair-orders/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const order = await storage.updateRepairOrder(req.params.id, req.body);
      res.json(order);
    } catch (error) {
      console.error("Error updating repair order:", error);
      res.status(400).json({ message: error.message || "Failed to update repair order" });
    }
  });
  app3.delete("/api/admin/repair-orders/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteRepairOrder(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting repair order:", error);
      res.status(500).json({ message: "Failed to delete repair order" });
    }
  });
  app3.get("/api/workshop/active-reservations", isAuthenticated, async (req, res) => {
    try {
      const allReservations = await storage.getReservations();
      const active = allReservations.filter(
        (r) => r.status === "confirmed" || r.status === "pending" || r.status === "in_progress"
      );
      const result = await Promise.all(active.map(async (reservation) => {
        const tasks = await storage.getReservationTasks(reservation.id);
        const repairOrder = await storage.getRepairOrderByReservation(reservation.id);
        const completedTasks = tasks.filter((t) => t.isCompleted).length;
        const totalTasks = tasks.length;
        return {
          ...reservation,
          tasks,
          repairOrder,
          progress: totalTasks > 0 ? Math.round(completedTasks / totalTasks * 100) : 0,
          completedTasks,
          totalTasks
        };
      }));
      res.json(result);
    } catch (error) {
      console.error("Error fetching active reservations:", error);
      res.status(500).json({ message: "Failed to fetch active reservations" });
    }
  });
  app3.post("/api/admin/services/:serviceId/init-default-workflow", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { serviceId } = req.params;
      const service = await storage.getService(serviceId);
      if (!service) return res.status(404).json({ message: "Service not found" });
      let workflow = await storage.getWorkflowByServiceId(serviceId);
      if (!workflow) {
        workflow = await storage.createWorkflow({
          name: `Workflow - ${service.name}`,
          description: `Workflow pour le service ${service.name}`,
          serviceId
        });
      }
      const existingSteps = await storage.getWorkflowSteps(workflow.id);
      if (existingSteps.length > 0) {
        return res.json({ workflow, steps: existingSteps, message: "Workflow already has steps" });
      }
      const defaultSteps = [
        { stepNumber: 1, title: "R\xE9ception du v\xE9hicule", description: "Accueil client, v\xE9rification du rendez-vous, prise en charge du v\xE9hicule" },
        { stepNumber: 2, title: "Ordre de r\xE9paration", description: "\xC9tat des lieux complet du v\xE9hicule avant intervention (ext\xE9rieur, int\xE9rieur, kilom\xE9trage, carburant)" },
        { stepNumber: 3, title: "Diagnostic", description: "Inspection technique et diagnostic des travaux \xE0 r\xE9aliser" },
        { stepNumber: 4, title: "Pr\xE9paration pi\xE8ces", description: "V\xE9rification et pr\xE9paration des pi\xE8ces et outils n\xE9cessaires" },
        { stepNumber: 5, title: "Intervention", description: "R\xE9alisation des travaux selon le devis valid\xE9" },
        { stepNumber: 6, title: "Contr\xF4le qualit\xE9", description: "V\xE9rification de la qualit\xE9 des travaux r\xE9alis\xE9s" },
        { stepNumber: 7, title: "Nettoyage", description: "Nettoyage du v\xE9hicule et de la zone de travail" },
        { stepNumber: 8, title: "Restitution", description: "Remise du v\xE9hicule au client avec explications des travaux effectu\xE9s" }
      ];
      const steps = [];
      for (const step of defaultSteps) {
        const created = await storage.createWorkflowStep({
          workflowId: workflow.id,
          ...step
        });
        steps.push(created);
      }
      res.json({ workflow, steps });
    } catch (error) {
      console.error("Error initializing default workflow:", error);
      res.status(400).json({ message: error.message || "Failed to initialize workflow" });
    }
  });
  app3.post("/api/admin/init-all-default-workflows", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const allServices = await storage.getServices();
      const results = [];
      for (const service of allServices) {
        let workflow = await storage.getWorkflowByServiceId(service.id);
        if (!workflow) {
          workflow = await storage.createWorkflow({
            name: `Workflow - ${service.name}`,
            description: `Workflow pour le service ${service.name}`,
            serviceId: service.id
          });
        }
        const existingSteps = await storage.getWorkflowSteps(workflow.id);
        if (existingSteps.length > 0) {
          results.push({ service: service.name, status: "already_configured", stepsCount: existingSteps.length });
          continue;
        }
        const defaultSteps = [
          { stepNumber: 1, title: "R\xE9ception du v\xE9hicule", description: "Accueil client et prise en charge du v\xE9hicule" },
          { stepNumber: 2, title: "Ordre de r\xE9paration", description: "\xC9tat des lieux du v\xE9hicule avant intervention" },
          { stepNumber: 3, title: "Diagnostic", description: "Inspection technique et diagnostic" },
          { stepNumber: 4, title: "Pr\xE9paration", description: "Pr\xE9paration des pi\xE8ces et outils" },
          { stepNumber: 5, title: "Intervention", description: "R\xE9alisation des travaux" },
          { stepNumber: 6, title: "Contr\xF4le qualit\xE9", description: "V\xE9rification de la qualit\xE9" },
          { stepNumber: 7, title: "Nettoyage", description: "Nettoyage du v\xE9hicule" },
          { stepNumber: 8, title: "Restitution", description: "Remise du v\xE9hicule au client" }
        ];
        for (const step of defaultSteps) {
          await storage.createWorkflowStep({ workflowId: workflow.id, ...step });
        }
        results.push({ service: service.name, status: "initialized", stepsCount: defaultSteps.length });
      }
      res.json({ results });
    } catch (error) {
      console.error("Error initializing all default workflows:", error);
      res.status(400).json({ message: error.message || "Failed to initialize workflows" });
    }
  });
  app3.get("/api/admin/audit-logs", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const filters = {};
      if (req.query.entityType) filters.entityType = req.query.entityType;
      if (req.query.entityId) filters.entityId = req.query.entityId;
      if (req.query.actorId) filters.actorId = req.query.actorId;
      if (req.query.action) filters.action = req.query.action;
      if (req.query.startDate) filters.startDate = new Date(req.query.startDate);
      if (req.query.endDate) filters.endDate = new Date(req.query.endDate);
      if (req.query.limit) filters.limit = parseInt(req.query.limit);
      if (req.query.offset) filters.offset = parseInt(req.query.offset);
      const result = await storage.getAuditLogs(filters);
      res.json(result);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });
  app3.get("/api/admin/audit-logs/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const log2 = await storage.getAuditLog(req.params.id);
      if (!log2) {
        return res.status(404).json({ message: "Audit log not found" });
      }
      res.json(log2);
    } catch (error) {
      console.error("Error fetching audit log:", error);
      res.status(500).json({ message: "Failed to fetch audit log" });
    }
  });
  app3.get("/api/admin/entity-history/:entityType/:entityId", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const history = await storage.getEntityAuditHistory(req.params.entityType, req.params.entityId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching entity history:", error);
      res.status(500).json({ message: "Failed to fetch entity history" });
    }
  });
  app3.post("/api/admin/cache/clear", isAuthenticated, isAdmin, async (req, res) => {
    try {
      res.json({ success: true, message: "Cache cleared successfully" });
    } catch (error) {
      console.error("Error clearing cache:", error);
      res.status(500).json({ message: error.message || "Failed to clear cache" });
    }
  });
  app3.get("/gdrive/:fileId/:filename", isAuthenticated, async (req, res) => {
    try {
      const { downloadFromGoogleDrive: downloadFromGoogleDrive2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
      const { fileId } = req.params;
      const { data, mimeType } = await downloadFromGoogleDrive2(fileId);
      res.set({
        "Content-Type": mimeType,
        "Content-Length": data.length,
        "Cache-Control": "private, max-age=86400"
      });
      res.send(data);
    } catch (error) {
      console.error("[GoogleDrive] Error serving file:", error.message);
      if (!res.headersSent) {
        res.status(404).json({ error: "File not found" });
      }
    }
  });
  app3.get("/api/admin/gdrive/status", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { isGoogleDriveConfigured: isGoogleDriveConfigured2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
      const configured = isGoogleDriveConfigured2();
      res.json({ configured, hasClientId: !!process.env.GOOGLE_CLIENT_ID, hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET, hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app3.get("/api/admin/gdrive/auth-url", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { getGoogleAuthUrl: getGoogleAuthUrl2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
      const url = getGoogleAuthUrl2();
      res.redirect(url);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app3.get("/api/admin/gdrive/callback", async (req, res) => {
    try {
      const { code } = req.query;
      if (!code) {
        return res.status(400).send("Code manquant");
      }
      const { exchangeCodeForTokens: exchangeCodeForTokens2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
      const { refreshToken } = await exchangeCodeForTokens2(code);
      res.send(`
        <!DOCTYPE html>
        <html><head><title>Google Drive - Connexion r\xE9ussie</title>
        <style>body{font-family:sans-serif;max-width:600px;margin:40px auto;padding:20px;text-align:center;}
        .token{background:#f0f0f0;padding:15px;border-radius:8px;word-break:break-all;font-family:monospace;font-size:12px;margin:20px 0;}
        .success{color:#16a34a;font-size:24px;}</style></head>
        <body>
        <h1 class="success">Connexion Google Drive r\xE9ussie !</h1>
        <p>Copiez le token ci-dessous et ajoutez-le comme secret <strong>GOOGLE_REFRESH_TOKEN</strong> dans Replit :</p>
        <div class="token" id="token">${refreshToken}</div>
        <button onclick="navigator.clipboard.writeText(document.getElementById('token').textContent).then(()=>alert('Copi\xE9 !'))">Copier le token</button>
        <p style="margin-top:30px;color:#666;">Apr\xE8s avoir ajout\xE9 le secret, red\xE9marrez l'application.</p>
        </body></html>
      `);
    } catch (error) {
      console.error("[GoogleDrive OAuth] Callback error:", error.message);
      res.status(500).send(`<h1>Erreur</h1><p>${error.message}</p><p><a href="javascript:history.back()">Retour</a></p>`);
    }
  });
  app3.get("/api/admin/gdrive/test", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { isGoogleDriveConfigured: isGoogleDriveConfigured2, uploadToGoogleDrive: uploadToGoogleDrive2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
      if (!isGoogleDriveConfigured2()) {
        return res.status(400).json({ error: "Google Drive non configur\xE9" });
      }
      const testBuffer = Buffer.from("Test upload AutoReport " + (/* @__PURE__ */ new Date()).toISOString());
      const result = await uploadToGoogleDrive2(testBuffer, "test_connexion.txt", "tests");
      const { deleteFromGoogleDrive: deleteFromGoogleDrive2, extractFileId: extractFileId2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
      const fileId = extractFileId2(result.filePath);
      if (fileId) await deleteFromGoogleDrive2(fileId);
      res.json({ success: true, message: "Upload Google Drive fonctionne !" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app3.post("/api/upload", isAuthenticated, async (req, res) => {
    try {
      if (!req.files || !req.files.media) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const file = req.files.media;
      const mimetype = file.mimetype || "";
      const reference = req.query.reference;
      const folder = req.query.folder || "uploads";
      if (!mimetype.startsWith("image/") && !mimetype.startsWith("video/") && !mimetype.startsWith("application/pdf")) {
        return res.status(400).json({ error: "Only images, videos and PDFs are allowed" });
      }
      let fileData;
      if (file.tempFilePath) {
        const fsModule = await import("fs");
        fileData = fsModule.readFileSync(file.tempFilePath);
      } else if (file.data) {
        fileData = file.data;
      } else {
        return res.status(400).json({ error: "Cannot read file data" });
      }
      if (mimetype.startsWith("image/") && mimetype !== "image/gif") {
        try {
          const { optimizeImageBuffer: optimizeImageBuffer2 } = await Promise.resolve().then(() => (init_imageOptimizer(), imageOptimizer_exports));
          fileData = await optimizeImageBuffer2(fileData, mimetype);
        } catch (optErr) {
          console.warn("[Upload] Image optimization skipped:", optErr);
        }
      }
      if (reference && mimetype.startsWith("image/")) {
        try {
          const { addWatermarkToImage: addWatermarkToImage2 } = await Promise.resolve().then(() => (init_imageWatermark(), imageWatermark_exports));
          fileData = await addWatermarkToImage2(fileData, reference, mimetype);
          console.log(`[Upload] Applied watermark for reference: ${reference}`);
        } catch (wmErr) {
          console.error("[Upload] Watermark failed:", wmErr);
        }
      }
      const objectPath = await uploadToStorage(fileData, file.name, folder);
      if (file.tempFilePath) {
        try {
          const fsModule = await import("fs");
          fsModule.unlinkSync(file.tempFilePath);
        } catch (_) {
        }
      }
      res.json({
        success: true,
        message: "Upload OK",
        objectPath,
        filename: objectPath.split("/").pop() || file.name,
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
  app3.post("/api/upload-base64", isAuthenticated, async (req, res) => {
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
          const { optimizeImageBuffer: optimizeImageBuffer2 } = await Promise.resolve().then(() => (init_imageOptimizer(), imageOptimizer_exports));
          fileData = await optimizeImageBuffer2(fileData, mimeType);
        } catch (_) {
        }
      }
      const objectPath = await uploadToStorage(fileData, finalName, folder);
      res.json({
        success: true,
        objectPath,
        filename: objectPath.split("/").pop() || finalName,
        originalName: finalName,
        size: fileData.length,
        mimetype: mimeType
      });
    } catch (error) {
      console.error("Error uploading base64:", error);
      res.status(500).json({ error: "Failed to upload", details: error instanceof Error ? error.message : "Unknown error" });
    }
  });
  app3.put("/api/quote-media", isAuthenticated, async (req, res) => {
    if (!req.body.mediaURL) {
      return res.status(400).json({ error: "mediaURL is required" });
    }
    const userId = req.user.id;
    try {
      const objectStorageService2 = new ObjectStorageService();
      const objectPath = await objectStorageService2.trySetObjectEntityAclPolicy(
        req.body.mediaURL,
        {
          owner: userId,
          visibility: "private"
        }
      );
      res.status(200).json({ objectPath });
    } catch (error) {
      console.error("Error setting media ACL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app3.put("/api/invoice-media", isAuthenticated, async (req, res) => {
    if (!req.body.mediaURL) {
      return res.status(400).json({ error: "mediaURL is required" });
    }
    const userId = req.user.id;
    try {
      const objectStorageService2 = new ObjectStorageService();
      const objectPath = await objectStorageService2.trySetObjectEntityAclPolicy(
        req.body.mediaURL,
        {
          owner: userId,
          visibility: "private"
        }
      );
      res.status(200).json({ objectPath });
    } catch (error) {
      console.error("Error setting media ACL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app3.post("/api/voice-dictation/send-email", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { to, subject, body: body2, documentType, documentNumber, documentId, clientName } = req.body;
      if (!to || !subject || !body2) {
        return res.status(400).json({ message: "Destinataire, sujet et corps de l'email requis" });
      }
      const fs10 = await import("fs");
      const { generateQuotePDF: generateQuotePDF2, generateInvoicePDF: generateInvoicePDF2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
      const attachments = [];
      const attachmentNames = [];
      if (documentId) {
        try {
          if (documentType === "quote") {
            const quote = await storage.getQuote(documentId);
            if (quote) {
              const items = await storage.getQuoteItems(documentId);
              const settings = await storage.getApplicationSettings();
              const formatPrice = (val) => `${parseFloat(val || "0").toFixed(2)} \u20AC`;
              const vdQuoteTTC = parseFloat(quote.quoteAmount || "0");
              const vdQuoteTax = parseFloat(quote.taxAmount || "0");
              const vdQuoteHT = vdQuoteTax > 0 ? vdQuoteTTC - vdQuoteTax : vdQuoteTTC / 1.2;
              const pdfBuffer = generateQuotePDF2({
                quoteNumber: quote.reference || quote.id,
                quoteDate: quote.createdAt ? new Date(quote.createdAt).toLocaleDateString("fr-FR") : (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"),
                clientName: clientName || "Client",
                status: quote.status,
                items: items.map((i) => ({
                  description: i.description || "",
                  quantity: Number(i.quantity) || 1,
                  unitPrice: parseFloat(i.unitPriceExcludingTax || "0").toFixed(2),
                  total: parseFloat(i.totalExcludingTax || "0").toFixed(2)
                })),
                amount: formatPrice(quote.quoteAmount),
                totalHT: vdQuoteHT.toFixed(2),
                totalTTC: vdQuoteTTC.toFixed(2),
                companyName: settings?.companyName || "AUTOREPORT"
              });
              const pdfFilename = `Devis-${quote.reference || quote.id}.pdf`;
              attachments.push({ filename: pdfFilename, content: pdfBuffer });
              attachmentNames.push(pdfFilename);
            }
          } else if (documentType === "invoice") {
            const invoice = await storage.getInvoice(documentId);
            if (invoice) {
              const items = await storage.getInvoiceItems(documentId);
              const settings = await storage.getApplicationSettings();
              const formatPrice = (val) => `${parseFloat(val || "0").toFixed(2)} \u20AC`;
              const pdfBuffer = generateInvoicePDF2({
                invoiceNumber: invoice.invoiceNumber || invoice.id,
                invoiceDate: invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString("fr-FR") : (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"),
                dueDate: invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("fr-FR") : "",
                clientName: clientName || "Client",
                status: invoice.status,
                items: items.map((i) => ({
                  description: i.description || "",
                  quantity: Number(i.quantity) || 1,
                  unitPrice: parseFloat(i.unitPriceExcludingTax || "0").toFixed(2),
                  total: parseFloat(i.totalExcludingTax || "0").toFixed(2)
                })),
                amount: formatPrice(invoice.amount),
                companyName: settings?.companyName || "AUTOREPORT"
              });
              const pdfFilename = `Facture-${invoice.invoiceNumber || invoice.id}.pdf`;
              attachments.push({ filename: pdfFilename, content: pdfBuffer });
              attachmentNames.push(pdfFilename);
            }
          }
        } catch (err2) {
          console.error("Error generating PDF:", err2);
        }
        try {
          let media = [];
          if (documentType === "quote") {
            media = await storage.getQuoteMedia(documentId);
          } else if (documentType === "invoice") {
            media = await storage.getInvoiceMedia(documentId);
          }
          for (const item of media) {
            try {
              let data = null;
              if (item.filePath.startsWith("/gdrive/")) {
                try {
                  const { extractFileId: extractFileId2, downloadFromGoogleDrive: downloadFromGoogleDrive2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
                  const fileId = extractFileId2(item.filePath);
                  if (fileId) {
                    const result2 = await downloadFromGoogleDrive2(fileId);
                    data = result2.data;
                  }
                } catch (err2) {
                  console.warn(`[Email] Google Drive attachment not found: ${item.filePath}`);
                }
              } else if (item.filePath.startsWith("/objects/")) {
                try {
                  const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
                  const objStore = new ObjectStorageService3();
                  data = await objStore.downloadFileBuffer(item.filePath);
                } catch (err2) {
                  console.warn(`[Email] Object Storage attachment not found: ${item.filePath}`);
                }
              } else if (item.filePath.startsWith("https://")) {
                try {
                  const resp = await fetch(item.filePath);
                  if (resp.ok) data = Buffer.from(await resp.arrayBuffer());
                } catch (err2) {
                  console.warn(`[Email] Remote attachment fetch failed: ${item.filePath}`);
                }
              } else {
                const localPath = item.filePath.startsWith("/") ? `.${item.filePath}` : item.filePath;
                if (fs10.existsSync(localPath)) {
                  data = fs10.readFileSync(localPath);
                } else {
                  try {
                    const result2 = await objectStorageService.getObject(item.filePath);
                    data = result2.data;
                  } catch (storageErr) {
                    console.warn(`[Email] Attachment not found in storage: ${item.filePath}`);
                  }
                }
              }
              if (data) {
                const ext = item.fileType === "image" ? "jpg" : "mp4";
                const filename = item.fileName || `${item.fileType}-${item.id.slice(0, 4)}.${ext}`;
                attachments.push({ filename, content: data });
                attachmentNames.push(filename);
              }
            } catch (err2) {
              console.error("Error fetching attachment:", err2);
            }
          }
        } catch (err2) {
          console.error("Error fetching document media:", err2);
        }
      }
      const htmlEmail = generateVoiceDictationEmailHtml({
        clientName: clientName || "Client",
        documentNumber: documentNumber || "",
        documentType: documentType === "quote" ? "quote" : "invoice",
        emailBody: body2,
        companyName: "AUTOREPORT",
        attachmentNames: attachmentNames.length > 0 ? attachmentNames : void 0
      });
      const result = await sendEmail({
        to,
        subject,
        html: htmlEmail,
        text: body2,
        attachments: attachments.length > 0 ? attachments : void 0
      });
      if (result.success) {
        await logAuditEvent({
          req,
          entityType: documentType === "quote" ? "quote" : "invoice",
          entityId: documentId || documentNumber,
          action: "updated",
          summary: `Email envoy\xE9 via dict\xE9e vocale \xE0 ${to}`,
          metadata: { emailTo: to, emailSubject: subject, attachmentCount: attachments.length }
        });
        res.json({ success: true, message: "Email envoy\xE9 avec succ\xE8s" });
      } else {
        res.status(500).json({ message: result.error || "Erreur lors de l'envoi de l'email" });
      }
    } catch (error) {
      console.error("Error sending voice dictation email:", error);
      res.status(500).json({ message: error.message || "Erreur lors de l'envoi de l'email" });
    }
  });
  const isStaffUser = (user) => {
    return user.role === "employe" || user.role === "admin" || user.role === "superadmin";
  };
  const isConversationParticipant = async (conversationId, userId) => {
    const participants = await storage.getChatParticipants(conversationId);
    return participants.some((p) => p.userId === userId);
  };
  app3.get("/api/chat/conversations", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const conversations = await storage.getChatConversations(userId);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/chat/conversations", isAuthenticated, async (req, res) => {
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
      const validParticipantIds = [];
      const isClientAdminChat = type === "client_admin";
      if (isClientAdminChat) {
      } else {
        if (!isStaffUser(req.user)) {
          return res.status(403).json({ message: "Acc\xE8s r\xE9serv\xE9 aux employ\xE9s et administrateurs" });
        }
      }
      for (const participantId of participantIds) {
        const participant = allUsers.find((u) => u.id === participantId);
        if (!participant) {
          return res.status(400).json({ message: `Participant ${participantId} introuvable` });
        }
        if (!isClientAdminChat && participant.role === "client") {
          return res.status(400).json({ message: "Utilisez le type 'client_admin' pour les discussions avec des clients" });
        }
        if (participantId !== userId) {
          validParticipantIds.push(participantId);
        }
      }
      const conversation = await storage.createChatConversation({
        title,
        createdById: userId,
        type: isClientAdminChat ? "client_admin" : "internal"
      });
      await storage.addChatParticipant({ conversationId: conversation.id, userId });
      for (const participantId of validParticipantIds) {
        await storage.addChatParticipant({ conversationId: conversation.id, userId: participantId });
      }
      const fullConversation = await storage.getChatConversations(userId);
      const created = fullConversation.find((c) => c.id === conversation.id);
      res.json(created || conversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/chat/conversations/:conversationId/messages", isAuthenticated, async (req, res) => {
    try {
      const { conversationId } = req.params;
      const userId = req.user.id;
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      if (!await isConversationParticipant(conversationId, userId)) {
        return res.status(403).json({ message: "Vous n'\xEAtes pas membre de cette conversation" });
      }
      const messages = await storage.getChatMessages(conversationId, limit, offset);
      await storage.updateLastRead(conversationId, userId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/chat/conversations/:conversationId/messages", isAuthenticated, async (req, res) => {
    try {
      const { conversationId } = req.params;
      const { content } = req.body;
      const userId = req.user.id;
      if (!await isConversationParticipant(conversationId, userId)) {
        return res.status(403).json({ message: "Vous n'\xEAtes pas membre de cette conversation" });
      }
      if (!content || content.trim().length === 0) {
        return res.status(400).json({ message: "Le message ne peut pas \xEAtre vide" });
      }
      const message = await storage.createChatMessage({
        conversationId,
        senderId: userId,
        content: content.trim()
      });
      const participants = await storage.getChatParticipants(conversationId);
      const senderName = `${req.user.firstName || ""} ${req.user.lastName || ""}`.trim() || req.user.email;
      for (const participant of participants) {
        if (participant.userId !== userId) {
          await storage.createNotification({
            userId: participant.userId,
            type: "chat",
            title: `Nouveau message de ${senderName}`,
            message: content.length > 50 ? content.substring(0, 50) + "..." : content,
            relatedId: conversationId
          });
          const wsClient = wsClients2.get(participant.userId);
          if (wsClient && wsClient.readyState === WebSocket.OPEN) {
            wsClient.send(JSON.stringify({
              type: "chat_message",
              conversationId,
              message: {
                ...message,
                sender: {
                  id: req.user.id,
                  firstName: req.user.firstName,
                  lastName: req.user.lastName,
                  email: req.user.email,
                  profileImageUrl: req.user.profileImageUrl
                },
                attachments: []
              }
            }));
          }
        }
      }
      const sender = await storage.getUser(userId);
      res.json({ ...message, sender, attachments: [] });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/chat/conversations/:conversationId/participants", isAuthenticated, async (req, res) => {
    try {
      const { conversationId } = req.params;
      const userId = req.user.id;
      if (!await isConversationParticipant(conversationId, userId)) {
        return res.status(403).json({ message: "Vous n'\xEAtes pas membre de cette conversation" });
      }
      const participants = await storage.getChatParticipants(conversationId);
      res.json(participants);
    } catch (error) {
      console.error("Error fetching participants:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/chat/conversations/:conversationId/participants", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { conversationId } = req.params;
      const { userId } = req.body;
      const userToAdd = await storage.getUser(userId);
      if (!userToAdd) {
        return res.status(400).json({ message: "Utilisateur introuvable" });
      }
      const participant = await storage.addChatParticipant({ conversationId, userId });
      res.json(participant);
    } catch (error) {
      console.error("Error adding participant:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/chat/users", isAuthenticated, async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      if (isStaffUser(req.user)) {
        res.json(sanitizeUsers(allUsers));
      } else {
        const staffUsers = allUsers.filter((u) => u.role === "employe" || u.role === "admin" || u.role === "superadmin");
        res.json(sanitizeUsers(staffUsers));
      }
    } catch (error) {
      console.error("Error fetching chat users:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/chat/conversations/:conversationId/read", isAuthenticated, async (req, res) => {
    try {
      const { conversationId } = req.params;
      const userId = req.user.id;
      if (!await isConversationParticipant(conversationId, userId)) {
        return res.status(403).json({ message: "Vous n'\xEAtes pas membre de cette conversation" });
      }
      await storage.updateLastRead(conversationId, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking conversation as read:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/export/quotes", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { startDate, endDate, clientId, status } = req.query;
      const garageScope = getGarageScope(req.user);
      let allQuotes = await storage.getQuotes();
      if (garageScope) allQuotes = allQuotes.filter((q) => q.garageId === garageScope);
      if (startDate) allQuotes = allQuotes.filter((q) => q.createdAt && new Date(q.createdAt) >= new Date(startDate));
      if (endDate) allQuotes = allQuotes.filter((q) => q.createdAt && new Date(q.createdAt) <= new Date(endDate));
      if (clientId) allQuotes = allQuotes.filter((q) => q.clientId === clientId);
      if (status) allQuotes = allQuotes.filter((q) => q.status === status);
      const allUsers = await storage.getAllUsers();
      const allServices = await storage.getServices();
      const csvRows = [
        ["R\xE9f\xE9rence", "Client", "Email", "Service", "Montant TTC", "Montant HT", "TVA %", "Statut", "Date cr\xE9ation", "D\xE9tails"].join(";")
      ];
      for (const q of allQuotes) {
        const client = allUsers.find((u) => u.id === q.clientId);
        const service = allServices.find((s) => s.id === q.serviceId);
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
          `"${(q.productDetails || "").replace(/"/g, '""')}"`
        ].join(";"));
      }
      const csv = "\uFEFF" + csvRows.join("\n");
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename=export_devis_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
      res.send(csv);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/export/invoices", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { startDate, endDate, clientId, status } = req.query;
      const garageScope = getGarageScope(req.user);
      let allInvoices = await storage.getInvoices();
      if (garageScope) allInvoices = allInvoices.filter((i) => i.garageId === garageScope);
      if (startDate) allInvoices = allInvoices.filter((i) => i.createdAt && new Date(i.createdAt) >= new Date(startDate));
      if (endDate) allInvoices = allInvoices.filter((i) => i.createdAt && new Date(i.createdAt) <= new Date(endDate));
      if (clientId) allInvoices = allInvoices.filter((i) => i.clientId === clientId);
      if (status) allInvoices = allInvoices.filter((i) => i.status === status);
      const allUsers = await storage.getAllUsers();
      const csvRows = [
        ["N\xB0 Facture", "Client", "Email", "Montant TTC", "Montant HT", "TVA %", "Statut", "Date cr\xE9ation", "Date \xE9ch\xE9ance", "M\xE9thode paiement", "Notes"].join(";")
      ];
      for (const inv of allInvoices) {
        const client = allUsers.find((u) => u.id === inv.clientId);
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
          `"${(inv.notes || "").replace(/"/g, '""')}"`
        ].join(";"));
      }
      const csv = "\uFEFF" + csvRows.join("\n");
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename=export_factures_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
      res.send(csv);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  const CONFIGURATOR_PRICES = {
    serviceBase: { renovation: 99, personnalisation: 160, "diamond-cut": 140, reparation: 120 },
    colors: { "noir-mat": 0, "noir-brillant": 20, "gris-anthracite": 0, "gris-argent": 10, "blanc-nacre": 30, "blanc-brillant": 20, bronze: 30, "or-champagne": 40, "rouge-candy": 50, "bleu-nuit": 30, gunmetal: 15, cuivre: 35 },
    finishes: { mat: 0, brillant: 20, satin: 10, metallique: 30, "diamond-cut": 60, hydrographie: 80 },
    sizes: { "16": 0, "17": 0, "18": 10, "19": 20, "20": 35, "21": 50, "22": 70 },
    accessories: { lisere: 15, "centre-logo": 25, "valve-alu": 8, "sticker-perso": 20 }
  };
  function computeConfiguratorPrice(serviceType, color, finish, size, wheelCount, accessories) {
    const count2 = wheelCount || 4;
    const base = CONFIGURATOR_PRICES.serviceBase[serviceType] || 99;
    const perWheel = base + (CONFIGURATOR_PRICES.colors[color] || 0) + (CONFIGURATOR_PRICES.finishes[finish] || 0) + (CONFIGURATOR_PRICES.sizes[size] || 0);
    const accessoriesTotal = (accessories || []).reduce((s, a) => s + (CONFIGURATOR_PRICES.accessories[a] || 0) * count2, 0);
    const totalHT = perWheel * count2 + accessoriesTotal;
    const tva = Math.round(totalHT * 0.2 * 100) / 100;
    return { totalHT, tva, totalTTC: totalHT + tva, perWheel, count: count2 };
  }
  app3.post("/api/configurator/quote-request", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { configuration } = req.body;
      if (!configuration) {
        return res.status(400).json({ message: "Configuration requise" });
      }
      const serverPrice = computeConfiguratorPrice(
        configuration.serviceType,
        configuration.color || "",
        configuration.finish || "",
        configuration.size || "18",
        configuration.wheelCount || 4,
        configuration.accessories || []
      );
      const services2 = await storage.getServices();
      let matchedService = services2.find(
        (s) => s.name.toLowerCase().includes("personnalisation") && s.isActive
      );
      if (!matchedService) {
        matchedService = services2.find((s) => s.isActive);
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
        configSummary: configuration.summary
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
        notes: `[Configurateur] ${configuration.summary}`
      });
      if (configuration.wheelImageUrl) {
        try {
          await storage.createQuoteMedia({
            quoteId: quote.id,
            filePath: configuration.wheelImageUrl,
            fileType: "image",
            fileName: "rendu-3d-configurateur.png"
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
            fileName: "photo-client.jpg"
          });
        } catch (mediaErr) {
          console.error("Error attaching client photo to quote:", mediaErr);
        }
      }
      res.json({ success: true, quoteId: quote.id, message: "Demande de devis cr\xE9\xE9e" });
    } catch (error) {
      console.error("Configurator quote error:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la cr\xE9ation du devis" });
    }
  });
  app3.post("/api/configurator/estimate", async (req, res) => {
    try {
      const { serviceType, color, finish, size, wheelCount, accessories } = req.body;
      const result = computeConfiguratorPrice(serviceType, color, finish, size, wheelCount, accessories);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/ai/assistant", isAuthenticated, async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ message: "Messages requis" });
      }
      const { generateAssistantResponse: generateAssistantResponse2 } = await Promise.resolve().then(() => (init_aiAssistant(), aiAssistant_exports));
      const response = await generateAssistantResponse2(messages, req.user.role);
      res.json({ response });
    } catch (error) {
      console.error("AI Assistant error:", error.message, error.stack?.substring(0, 300));
      res.status(500).json({ message: "L'assistant est temporairement indisponible. Veuillez r\xE9essayer." });
    }
  });
  app3.post("/api/ai/analyze-wheel", isAuthenticated, async (req, res) => {
    try {
      const { imageBase64, imageMimeType, prompt, conversationHistory } = req.body;
      if (!imageBase64 || !imageMimeType) {
        return res.status(400).json({ message: "Image requise" });
      }
      const maxSize = 10 * 1024 * 1024;
      const imageSize = Buffer.from(imageBase64, "base64").length;
      if (imageSize > maxSize) {
        return res.status(400).json({ message: "Image trop volumineuse (max 10 MB)" });
      }
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(imageMimeType)) {
        return res.status(400).json({ message: "Format non support\xE9. Utilisez JPG, PNG ou WEBP." });
      }
      const { analyzeWheelImage: analyzeWheelImage2 } = await Promise.resolve().then(() => (init_aiAssistant(), aiAssistant_exports));
      const response = await analyzeWheelImage2(
        imageBase64,
        imageMimeType,
        prompt || "Analyse cette jante et propose des options de personnalisation.",
        conversationHistory || []
      );
      res.json({ response });
    } catch (error) {
      console.error("AI Wheel Analysis error:", error.message);
      res.status(500).json({ message: "L'analyse est temporairement indisponible. Veuillez r\xE9essayer." });
    }
  });
  app3.post("/api/ai/analyze-wheel-params", isAuthenticated, async (req, res) => {
    try {
      const { imageBase64, imageMimeType } = req.body;
      if (!imageBase64 || !imageMimeType) {
        return res.status(400).json({ message: "Image requise" });
      }
      const { analyzeWheelImage: analyzeWheelImage2 } = await Promise.resolve().then(() => (init_aiAssistant(), aiAssistant_exports));
      const structuredPrompt = `Analyse cette photo de jante automobile avec une grande pr\xE9cision pour permettre une reconstruction 3D fid\xE8le. Examine attentivement la forme des branches, leur courbure, leur \xE9paisseur, la profondeur du plat (dish/concavit\xE9), et le style global.

R\xE9ponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de texte autour, pas de \`\`\`json), avec exactement ces champs :
{
  "spokeCount": <nombre EXACT de branches principales visibles, entre 3 et 20>,
  "spokeWidth": <largeur relative des branches entre 0.03 et 0.20 (0.03=tr\xE8s fines, 0.15=larges)>,
  "spokePattern": <style g\xE9om\xE9trique parmi: "straight" (droites simples), "double" (paires parall\xE8les), "ysplit" (branches en Y qui se divisent), "curved" (courb\xE9es dans un sens), "turbine" (fortement courb\xE9es type turbine), "mesh" (grillage/treillis avec nombreuses fines branches), "split5" (branches larges avec fente centrale), "fan" (\xE9ventail s'\xE9largissant vers l'ext\xE9rieur), "multipiece" (jante multi-pi\xE8ces avec boulons visibles sur le bord), "classic" (branches organiques/\xE9toile classique)>,
  "dishDepth": <profondeur du plat/concavit\xE9 entre 0.0 (plat) et 0.35 (tr\xE8s concave). Regarde si les branches sont en retrait par rapport \xE0 la l\xE8vre>,
  "spokeCurvature": <courbure des branches entre 0.0 (droites) et 0.8 (tr\xE8s courb\xE9es). Important pour "curved" et "turbine">,
  "spokeSplitRatio": <pour "ysplit" uniquement, point de division entre 0.3 et 0.7 (0.5=milieu)>,
  "lipStepCount": <nombre de niveaux sur la l\xE8vre: 1 (simple) ou 2 (l\xE8vre \xE0 marche)>,
  "color": <couleur hexad\xE9cimale principale ex "#c0c0c0">,
  "colorName": <nom de la couleur en fran\xE7ais>,
  "finish": <type de finition parmi: "mat", "brillant", "chrome", "carbone", "forge", "satine">,
  "rimDepth": <profondeur du rebord/l\xE8vre entre 0.15 et 0.40>,
  "hubRadius": <rayon du moyeu central entre 0.12 et 0.30>,
  "lipWidth": <largeur de la l\xE8vre entre 0.03 et 0.10>,
  "description": <description courte de la jante en fran\xE7ais, max 80 caract\xE8res, incluant le style identifi\xE9>
}
Sois TR\xC8S pr\xE9cis sur le spokePattern : c'est le param\xE8tre le plus important pour la reconstruction. Analyse la forme exacte des branches.`;
      const response = await analyzeWheelImage2(imageBase64, imageMimeType, structuredPrompt, []);
      let parsed = null;
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
          message: "Impossible d'extraire les param\xE8tres automatiquement"
        });
      }
      const validPatterns = ["straight", "double", "ysplit", "curved", "turbine", "mesh", "split5", "fan", "multipiece", "classic"];
      const safeParams = {
        spokeCount: Math.min(20, Math.max(3, parseInt(parsed.spokeCount) || 5)),
        spokeWidth: Math.min(0.2, Math.max(0.03, parseFloat(parsed.spokeWidth) || 0.12)),
        spokePattern: validPatterns.includes(parsed.spokePattern) ? parsed.spokePattern : "straight",
        dishDepth: Math.min(0.35, Math.max(0, parseFloat(parsed.dishDepth) || 0.15)),
        spokeCurvature: Math.min(0.8, Math.max(0, parseFloat(parsed.spokeCurvature) || 0)),
        spokeSplitRatio: Math.min(0.7, Math.max(0.3, parseFloat(parsed.spokeSplitRatio) || 0.5)),
        lipStepCount: [1, 2].includes(parseInt(parsed.lipStepCount)) ? parseInt(parsed.lipStepCount) : 1,
        color: typeof parsed.color === "string" && /^#[0-9a-fA-F]{6}$/.test(parsed.color) ? parsed.color : "#c0c0c0",
        colorName: parsed.colorName || "Argent",
        finish: ["mat", "brillant", "chrome", "carbone", "forge", "satine"].includes(parsed.finish) ? parsed.finish : "brillant",
        rimDepth: Math.min(0.4, Math.max(0.15, parseFloat(parsed.rimDepth) || 0.25)),
        hubRadius: Math.min(0.3, Math.max(0.12, parseFloat(parsed.hubRadius) || 0.18)),
        lipWidth: Math.min(0.1, Math.max(0.03, parseFloat(parsed.lipWidth) || 0.06)),
        description: parsed.description || "Jante analys\xE9e"
      };
      res.json({ params: safeParams });
    } catch (error) {
      console.error("Wheel params analysis error:", error.message);
      res.status(500).json({ message: "L'analyse est temporairement indisponible." });
    }
  });
  const hdRenderLimits = /* @__PURE__ */ new Map();
  app3.post("/api/ai/render-hd", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const now = Date.now();
      const limit = hdRenderLimits.get(userId);
      if (limit && limit.resetAt > now && limit.count >= 5) {
        return res.status(429).json({ message: "Limite de rendus HD atteinte (5/heure). R\xE9essayez plus tard." });
      }
      if (!limit || limit.resetAt <= now) {
        hdRenderLimits.set(userId, { count: 1, resetAt: now + 36e5 });
      } else {
        limit.count++;
      }
      const { imageBase64, params } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ message: "Image requise" });
      }
      const { analyzeWheelImage: analyzeWheelImage2 } = await Promise.resolve().then(() => (init_aiAssistant(), aiAssistant_exports));
      const prompt = `Tu es un assistant de rendu 3D professionnel. Voici une capture d'un mod\xE8le 3D de jante avec ces param\xE8tres : couleur ${params?.color || "argent"}, finition ${params?.finish || "standard"}, metalness ${params?.metalness || 0.8}, roughness ${params?.roughness || 0.2}${params?.lisereEnabled ? ", liser\xE9 " + params.lisereColor : ""}${params?.gravureText ? ', gravure "' + params.gravureText + '"' : ""}. D\xE9cris cette jante en d\xE9tail et sugg\xE8re comment am\xE9liorer le rendu pour un r\xE9sultat photor\xE9aliste. Propose des am\xE9liorations de mat\xE9riaux et d'\xE9clairage.`;
      const callWithTimeout = (retryAttempt = 0) => {
        return new Promise((resolve2, reject) => {
          const timer = setTimeout(() => {
            if (retryAttempt === 0) {
              callWithTimeout(1).then(resolve2).catch(reject);
            } else {
              reject(new Error("Timeout apr\xE8s 30 secondes"));
            }
          }, 3e4);
          analyzeWheelImage2(imageBase64, "image/png", prompt, []).then((result) => {
            clearTimeout(timer);
            resolve2(result);
          }).catch((err2) => {
            clearTimeout(timer);
            if (retryAttempt === 0) {
              callWithTimeout(1).then(resolve2).catch(reject);
            } else {
              reject(err2);
            }
          });
        });
      };
      const response = await callWithTimeout();
      res.json({ message: response, imageBase64: null });
    } catch (error) {
      console.error("HD Render error:", error.message);
      res.status(500).json({ message: "Le rendu HD est temporairement indisponible. R\xE9essayez." });
    }
  });
  app3.post("/api/admin/migrate-media-to-cloud", isAuthenticated, isAdmin, async (req, res) => {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Superadmin uniquement" });
    }
    try {
      const { isGoogleDriveConfigured: isGoogleDriveConfigured2, uploadToGoogleDrive: uploadToGoogleDrive2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
      const fsLocal = await import("fs");
      const pathLocal = await import("path");
      const useGDrive = isGoogleDriveConfigured2();
      let objStore = null;
      if (!useGDrive) {
        const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
        objStore = new ObjectStorageService3();
      }
      let migratedQuotes = 0, migratedInvoices = 0, skippedQuotes = 0, skippedInvoices = 0, errors = 0;
      const errorDetails = [];
      const allQuoteMedia = await db.select().from(quoteMedia);
      for (const item of allQuoteMedia) {
        if (item.filePath && !item.filePath.startsWith("/objects/") && !item.filePath.startsWith("https://") && !item.filePath.startsWith("/gdrive/")) {
          try {
            const localPath = item.filePath.startsWith("/") ? `.${item.filePath}` : item.filePath;
            if (fsLocal.existsSync(localPath)) {
              const fileData = fsLocal.readFileSync(localPath);
              const fileName = pathLocal.basename(localPath);
              let newPath;
              if (useGDrive) {
                const result = await uploadToGoogleDrive2(fileData, fileName, "quotes");
                newPath = result.filePath;
              } else {
                newPath = await objStore.uploadFileBuffer(fileData, fileName, "quotes");
              }
              await db.update(quoteMedia).set({ filePath: newPath }).where(eq6(quoteMedia.id, item.id));
              migratedQuotes++;
              console.log(`[Migration] Quote media ${item.id}: ${item.filePath} -> ${newPath}`);
            } else {
              skippedQuotes++;
            }
          } catch (err2) {
            errors++;
            errorDetails.push(`Quote ${item.id}: ${err2.message}`);
            console.error(`[Migration] Quote media error ${item.id}:`, err2.message);
          }
        }
      }
      const allInvoiceMedia = await db.select().from(invoiceMedia);
      for (const item of allInvoiceMedia) {
        if (item.filePath && !item.filePath.startsWith("/objects/") && !item.filePath.startsWith("https://") && !item.filePath.startsWith("/gdrive/")) {
          try {
            const localPath = item.filePath.startsWith("/") ? `.${item.filePath}` : item.filePath;
            if (fsLocal.existsSync(localPath)) {
              const fileData = fsLocal.readFileSync(localPath);
              const fileName = pathLocal.basename(localPath);
              let newPath;
              if (useGDrive) {
                const result = await uploadToGoogleDrive2(fileData, fileName, "invoices");
                newPath = result.filePath;
              } else {
                newPath = await objStore.uploadFileBuffer(fileData, fileName, "invoices");
              }
              await db.update(invoiceMedia).set({ filePath: newPath }).where(eq6(invoiceMedia.id, item.id));
              migratedInvoices++;
              console.log(`[Migration] Invoice media ${item.id}: ${item.filePath} -> ${newPath}`);
            } else {
              skippedInvoices++;
            }
          } catch (err2) {
            errors++;
            errorDetails.push(`Invoice ${item.id}: ${err2.message}`);
            console.error(`[Migration] Invoice media error ${item.id}:`, err2.message);
          }
        }
      }
      res.json({
        message: `Migration termin\xE9e`,
        destination: useGDrive ? "Google Drive" : "Object Storage",
        migratedQuotes,
        migratedInvoices,
        skippedQuotes,
        skippedInvoices,
        errors,
        errorDetails: errorDetails.slice(0, 10),
        total: migratedQuotes + migratedInvoices
      });
    } catch (error) {
      console.error("Error migrating media:", error);
      res.status(500).json({ message: error.message || "Erreur de migration" });
    }
  });
  app3.get("/api/admin/backup", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const backupData = {
        version: "1.1",
        exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
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
          chatAttachments: await db.select().from(chatAttachments)
        }
      };
      const filename = `autoreport-backup-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").slice(0, 19)}.json`;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.json(backupData);
    } catch (error) {
      console.error("Backup error:", error);
      res.status(500).json({ message: "Erreur lors de la sauvegarde", error: error.message });
    }
  });
  app3.post("/api/admin/restore", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { data, options = {} } = req.body;
      if (!data || !data.version) {
        return res.status(400).json({ message: "Format de backup invalide" });
      }
      const { clearExisting = false } = options;
      const results = {};
      const tableMap = {
        users,
        services,
        quotes,
        quoteItems,
        quoteMedia,
        invoices,
        invoiceItems,
        invoiceMedia,
        reservations,
        reservationServices,
        notifications,
        engagements,
        workflows,
        workflowSteps,
        serviceWorkflows,
        workshopTasks,
        applicationSettings,
        invoiceCounters,
        auditLogs,
        auditLogChanges,
        chatConversations,
        chatParticipants,
        chatMessages,
        chatAttachments
      };
      const importOrder = [
        "users",
        "services",
        "quotes",
        "quoteItems",
        "quoteMedia",
        "invoices",
        "invoiceItems",
        "invoiceMedia",
        "reservations",
        "reservationServices",
        "notifications",
        "engagements",
        "workflows",
        "workflowSteps",
        "serviceWorkflows",
        "workshopTasks",
        "applicationSettings",
        "invoiceCounters",
        "auditLogs",
        "auditLogChanges",
        "chatConversations",
        "chatParticipants",
        "chatMessages",
        "chatAttachments"
      ];
      for (const tableName of importOrder) {
        const tableData = data.data?.[tableName];
        if (!tableData || !Array.isArray(tableData)) continue;
        results[tableName] = { imported: 0, errors: 0, skipped: 0 };
        const table = tableMap[tableName];
        if (!table) continue;
        for (const row of tableData) {
          try {
            if (tableName === "users") {
              const existingUser = await storage.getUser(row.id);
              if (existingUser) {
                results[tableName].skipped = (results[tableName].skipped || 0) + 1;
                continue;
              }
            }
            await db.insert(table).values(row).onConflictDoNothing();
            results[tableName].imported++;
          } catch (err2) {
            console.error(`Error importing ${tableName}:`, err2.message);
            results[tableName].errors++;
          }
        }
      }
      res.json({
        success: true,
        message: "Restauration termin\xE9e",
        results
      });
    } catch (error) {
      console.error("Restore error:", error);
      res.status(500).json({ message: "Erreur lors de la restauration", error: error.message });
    }
  });
  app3.get("/api/admin/backup-stats", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const stats = {
        users: (await storage.getAllUsers()).length,
        services: (await storage.getServices()).length,
        quotes: (await storage.getQuotes()).length,
        invoices: (await storage.getInvoices()).length,
        reservations: (await storage.getReservations()).length,
        engagements: (await storage.getEngagements()).length,
        workflows: (await storage.getWorkflows()).length
      };
      res.json(stats);
    } catch (error) {
      console.error("Backup stats error:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/backup-scheduler", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { getBackupSettings: getBackupSettings2, listBackups: listBackups2 } = await Promise.resolve().then(() => (init_backupScheduler(), backupScheduler_exports));
      const settings = getBackupSettings2();
      const backups = await listBackups2();
      res.json({ settings, backups });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/backup-scheduler", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { updateBackupSchedule: updateBackupSchedule2, getBackupSettings: getBackupSettings2 } = await Promise.resolve().then(() => (init_backupScheduler(), backupScheduler_exports));
      const { enabled, time, emailEnabled, emailRecipient } = req.body;
      updateBackupSchedule2({ enabled, time, emailEnabled, emailRecipient });
      res.json({ success: true, settings: getBackupSettings2() });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/backup-now", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { triggerManualBackup: triggerManualBackup2 } = await Promise.resolve().then(() => (init_backupScheduler(), backupScheduler_exports));
      const result = await triggerManualBackup2();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/export-database", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { pool: pool2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const getTableNames = async () => {
        const result = await pool2.query(`
          SELECT tablename FROM pg_tables 
          WHERE schemaname = 'public'
          ORDER BY tablename
        `);
        return result.rows.map((row) => row.tablename);
      };
      const getTableSchema = async (tableName) => {
        const result = await pool2.query(`
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = $1
          ORDER BY ordinal_position
        `, [tableName]);
        const columns = result.rows.map((col) => {
          let def = `  "${col.column_name}" ${col.data_type.toUpperCase()}`;
          if (col.column_default) def += ` DEFAULT ${col.column_default}`;
          if (col.is_nullable === "NO") def += " NOT NULL";
          return def;
        });
        return `CREATE TABLE IF NOT EXISTS "${tableName}" (
${columns.join(",\n")}
);`;
      };
      const getTableData = async (tableName) => {
        const result = await pool2.query(`SELECT * FROM "${tableName}"`);
        if (result.rows.length === 0) {
          return `-- No data in table ${tableName}`;
        }
        const columns = Object.keys(result.rows[0]);
        const inserts = [];
        for (const row of result.rows) {
          const values = columns.map((col) => {
            const val = row[col];
            if (val === null) return "NULL";
            if (typeof val === "boolean") return val ? "TRUE" : "FALSE";
            if (typeof val === "number") return val.toString();
            if (val instanceof Date) return `'${val.toISOString()}'`;
            if (typeof val === "object") return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
            return `'${String(val).replace(/'/g, "''")}'`;
          });
          inserts.push(`INSERT INTO "${tableName}" ("${columns.join('", "')}") VALUES (${values.join(", ")});`);
        }
        return inserts.join("\n");
      };
      const tables = await getTableNames();
      let output = `-- Database Export
-- Generated: ${(/* @__PURE__ */ new Date()).toISOString()}
-- Tables: ${tables.join(", ")}

`;
      output += "-- Disable foreign key checks for import\nSET session_replication_role = replica;\n\n";
      for (const table of tables) {
        output += `-- ==========================================
`;
        output += `-- Table: ${table}
`;
        output += `-- ==========================================

`;
        const schema = await getTableSchema(table);
        output += schema + "\n\n";
        const data = await getTableData(table);
        output += data + "\n\n";
      }
      output += "-- Re-enable foreign key checks\nSET session_replication_role = DEFAULT;\n";
      const filename = `autoreport-export-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").slice(0, 19)}.sql`;
      res.setHeader("Content-Type", "application/sql");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(output);
    } catch (error) {
      console.error("Database export error:", error);
      res.status(500).json({ message: "Erreur lors de l'export de la base de donn\xE9es", error: error.message });
    }
  });
  app3.get("/api/admin/export-data", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const { generateBackupData: generateBackupData2 } = await Promise.resolve().then(() => (init_backupScheduler(), backupScheduler_exports));
      const backupData = await generateBackupData2();
      const garagesList = await db.select().from(garages);
      backupData.data.garages = garagesList;
      const filename = `autoreport-data-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").slice(0, 19)}.json`;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(JSON.stringify(backupData, null, 2));
    } catch (error) {
      console.error("Data export error:", error);
      res.status(500).json({ message: "Erreur lors de l'export des donn\xE9es", error: error.message });
    }
  });
  app3.post("/api/admin/import-data", isAuthenticated, isRootAdmin, async (req, res) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({ message: "Aucun fichier fourni" });
      }
      const file = req.files.file;
      let content;
      if (file.tempFilePath) {
        content = fs7.readFileSync(file.tempFilePath, "utf8");
      } else {
        content = file.data.toString("utf8");
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
      const tableMap = {
        garages,
        users,
        services,
        quotes,
        quoteItems,
        quoteMedia,
        invoices,
        invoiceItems,
        invoiceMedia,
        reservations,
        reservationServices,
        notifications,
        engagements,
        workflows,
        workflowSteps,
        serviceWorkflows,
        workshopTasks,
        applicationSettings,
        invoiceCounters,
        auditLogs,
        auditLogChanges,
        chatConversations,
        chatParticipants,
        chatMessages,
        chatAttachments
      };
      const importOrder = [
        "garages",
        "users",
        "services",
        "quotes",
        "quoteItems",
        "quoteMedia",
        "invoices",
        "invoiceItems",
        "invoiceMedia",
        "reservations",
        "reservationServices",
        "notifications",
        "engagements",
        "workflows",
        "workflowSteps",
        "serviceWorkflows",
        "workshopTasks",
        "applicationSettings",
        "invoiceCounters",
        "auditLogs",
        "auditLogChanges",
        "chatConversations",
        "chatParticipants",
        "chatMessages",
        "chatAttachments"
      ];
      const results = {};
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
          } catch (err2) {
            console.error(`Error importing ${tableName}:`, err2.message);
            results[tableName].errors++;
          }
        }
      }
      await logAuditEvent({
        req,
        entityType: "service",
        entityId: "import",
        action: "created",
        summary: `Import de donn\xE9es: ${JSON.stringify(results)}`
      });
      res.json({
        success: true,
        message: "Import termin\xE9",
        version: backupData.version,
        exportedAt: backupData.exportedAt,
        results
      });
    } catch (error) {
      console.error("Data import error:", error);
      res.status(500).json({ message: "Erreur lors de l'import des donn\xE9es", error: error.message });
    }
  });
  app3.post("/api/admin/import-sql", isAuthenticated, isRootAdmin, async (req, res) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({ message: "Aucun fichier SQL fourni" });
      }
      const replaceExisting = req.body?.replaceExisting === "true" || req.body?.replaceExisting === true;
      const file = req.files.file;
      let content;
      if (file.tempFilePath) {
        content = fs7.readFileSync(file.tempFilePath, "utf8");
      } else {
        content = file.data.toString("utf8");
      }
      const { pool: pool2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const results = {};
      await pool2.query("SET session_replication_role = replica");
      const tablesInFile = /* @__PURE__ */ new Set();
      const insertRegex = /^INSERT\s+INTO\s+(?:public\.)?"?(\w+)"?/gim;
      let m;
      while ((m = insertRegex.exec(content)) !== null) {
        tablesInFile.add(m[1]);
      }
      if (replaceExisting && tablesInFile.size > 0) {
        const tablesToTruncate = Array.from(tablesInFile).filter((t) => t !== "sessions").map((t) => `"${t}"`).join(", ");
        if (tablesToTruncate) {
          try {
            await pool2.query(`TRUNCATE TABLE ${tablesToTruncate} CASCADE`);
          } catch (truncErr) {
            console.error("[SQL Import] Truncate warning:", truncErr.message?.slice(0, 200));
          }
        }
      }
      const statements = [];
      let buffer = "";
      let inString = false;
      let escaped = false;
      let inCreateBlock = false;
      const lines = content.split("\n");
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith("--")) continue;
        if (inCreateBlock) {
          if (trimmedLine.endsWith(");")) {
            inCreateBlock = false;
          }
          continue;
        }
        if (!buffer) {
          if (trimmedLine.startsWith("SET ")) continue;
          if (/^CREATE\s+(TABLE|INDEX|SEQUENCE|TYPE|EXTENSION)/i.test(trimmedLine)) {
            if (!trimmedLine.endsWith(");")) {
              inCreateBlock = true;
            }
            continue;
          }
          if (/^(ALTER|DROP|GRANT|REVOKE|COMMENT)\s/i.test(trimmedLine)) {
            if (!trimmedLine.endsWith(";")) {
              inCreateBlock = true;
            }
            continue;
          }
          if (!/^INSERT\s/i.test(trimmedLine)) continue;
        }
        buffer += (buffer ? " " : "") + trimmedLine;
        for (let ci = 0; ci < trimmedLine.length; ci++) {
          const ch = trimmedLine[ci];
          if (escaped) {
            escaped = false;
            continue;
          }
          if (ch === "\\" && inString) {
            escaped = true;
            continue;
          }
          if (ch === "'") {
            if (inString && ci + 1 < trimmedLine.length && trimmedLine[ci + 1] === "'") {
              ci++;
              continue;
            }
            inString = !inString;
            continue;
          }
          if (!inString && ch === ";") {
            statements.push(buffer.slice(0, buffer.length).replace(/;\s*$/, ""));
            buffer = "";
            break;
          }
        }
      }
      if (buffer.trim()) statements.push(buffer.trim().replace(/;\s*$/, ""));
      for (const trimmed of statements) {
        const headerMatch = trimmed.match(/^INSERT\s+INTO\s+(?:public\.)?"?(\w+)"?\s*\(([^)]+)\)\s*VALUES\s*/i);
        if (!headerMatch) continue;
        const tableName = headerMatch[1];
        if (tableName === "sessions") continue;
        const columns = headerMatch[2].split(",").map((c) => c.trim().replace(/"/g, ""));
        const validCol = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
        if (!columns.every((c) => validCol.test(c))) continue;
        const valuesBlock = trimmed.slice(headerMatch[0].length).replace(/;\s*$/, "");
        const rowStrings = [];
        let depth = 0;
        let current = "";
        let inStr = false;
        let esc = false;
        for (let i = 0; i < valuesBlock.length; i++) {
          const ch = valuesBlock[i];
          if (esc) {
            current += ch;
            esc = false;
            continue;
          }
          if (ch === "'" && !inStr) {
            inStr = true;
            current += ch;
            continue;
          }
          if (ch === "'" && inStr) {
            if (i + 1 < valuesBlock.length && valuesBlock[i + 1] === "'") {
              current += "''";
              i++;
              continue;
            }
            inStr = false;
            current += ch;
            continue;
          }
          if (ch === "\\" && inStr) {
            esc = true;
            current += ch;
            continue;
          }
          if (!inStr) {
            if (ch === "(") {
              if (depth === 0) current = "";
              depth++;
              continue;
            }
            if (ch === ")") {
              depth--;
              if (depth === 0) {
                rowStrings.push(current);
                current = "";
              }
              continue;
            }
            if (ch === "," && depth === 0) continue;
          }
          current += ch;
        }
        if (!results[tableName]) results[tableName] = { imported: 0, skipped: 0, errors: 0 };
        for (const rowStr of rowStrings) {
          const values = [];
          let cur = "";
          let inS = false;
          let escd = false;
          for (let i = 0; i < rowStr.length; i++) {
            const ch = rowStr[i];
            if (escd) {
              cur += ch;
              escd = false;
              continue;
            }
            if (ch === "'" && !inS) {
              inS = true;
              cur += ch;
              continue;
            }
            if (ch === "'" && inS) {
              if (i + 1 < rowStr.length && rowStr[i + 1] === "'") {
                cur += "''";
                i++;
                continue;
              }
              inS = false;
              cur += ch;
              continue;
            }
            if (ch === "\\" && inS) {
              escd = true;
              cur += ch;
              continue;
            }
            if (ch === "," && !inS) {
              values.push(cur.trim());
              cur = "";
              continue;
            }
            cur += ch;
          }
          if (cur.trim()) values.push(cur.trim());
          if (values.length !== columns.length) {
            results[tableName].errors++;
            continue;
          }
          const parsedValues = values.map((v) => {
            if (v === "NULL") return null;
            if (v === "TRUE" || v === "true") return true;
            if (v === "FALSE" || v === "false") return false;
            if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replace(/''/g, "'").replace(/\\'/g, "'");
            if (!isNaN(Number(v)) && v !== "") return Number(v);
            return v;
          });
          const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
          const colNames = columns.map((c) => `"${c}"`).join(", ");
          const insertSQL = `INSERT INTO "${tableName}" (${colNames}) VALUES (${placeholders}) ON CONFLICT DO NOTHING`;
          try {
            const result = await pool2.query(insertSQL, parsedValues);
            if (result.rowCount && result.rowCount > 0) {
              results[tableName].imported++;
            } else {
              results[tableName].skipped++;
            }
          } catch (err2) {
            results[tableName].errors++;
            console.error(`[SQL Import] Error on ${tableName}:`, err2.message?.slice(0, 200));
          }
        }
      }
      await pool2.query("SET session_replication_role = DEFAULT");
      await logAuditEvent({
        req,
        entityType: "service",
        entityId: "sql-import",
        action: "created",
        summary: `Import SQL: ${JSON.stringify(results)}`
      });
      res.json({
        success: true,
        message: "Import SQL termin\xE9",
        results
      });
    } catch (error) {
      console.error("SQL import error:", error);
      const { pool: pool2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      try {
        await pool2.query("SET session_replication_role = DEFAULT");
      } catch (_) {
      }
      res.status(500).json({ message: "Erreur lors de l'import SQL", error: error.message });
    }
  });
  app3.post("/api/admin/import-media", isAuthenticated, isRootAdmin, async (req, res) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({ message: "Aucun fichier fourni" });
      }
      const file = req.files.file;
      const tmpDir = path9.join("/tmp", `media-import-${Date.now()}`);
      fs7.mkdirSync(tmpDir, { recursive: true });
      const archivePath = path9.join(tmpDir, file.name);
      if (file.tempFilePath) {
        fs7.copyFileSync(file.tempFilePath, archivePath);
      } else {
        await file.mv(archivePath);
      }
      if (file.name.endsWith(".tar.gz") || file.name.endsWith(".tgz")) {
        execSync(`tar -xzf "${archivePath}" -C "${tmpDir}"`);
      } else if (file.name.endsWith(".zip")) {
        execSync(`unzip -o "${archivePath}" -d "${tmpDir}"`);
      }
      let sourceDir = tmpDir;
      const entries = fs7.readdirSync(tmpDir);
      for (const entry of entries) {
        const entryPath = path9.join(tmpDir, entry);
        if (fs7.statSync(entryPath).isDirectory() && entry.startsWith("media_backup_")) {
          sourceDir = entryPath;
          break;
        }
      }
      const uploadsDir = path9.join(process.cwd(), "uploads");
      fs7.mkdirSync(uploadsDir, { recursive: true });
      let copiedCount = 0;
      let skippedCount = 0;
      const copiedFiles = [];
      const sourceFiles = fs7.readdirSync(sourceDir);
      for (const fileName of sourceFiles) {
        if (fileName === "media_mapping.json" || fileName === "restore-media.sh" || fileName === "media_tables.sql") {
          continue;
        }
        if (fileName.endsWith(".tar.gz") || fileName.endsWith(".tgz") || fileName.endsWith(".zip")) {
          continue;
        }
        if (fileName.includes("..") || fileName.includes("/") || fileName.includes("\\")) {
          continue;
        }
        const srcPath = path9.join(sourceDir, fileName);
        if (!fs7.statSync(srcPath).isFile()) continue;
        const destPath = path9.join(uploadsDir, path9.basename(fileName));
        if (fs7.existsSync(destPath)) {
          skippedCount++;
          continue;
        }
        fs7.copyFileSync(srcPath, destPath);
        copiedCount++;
        copiedFiles.push(fileName);
      }
      let mapping = null;
      const mappingPath = path9.join(sourceDir, "media_mapping.json");
      if (fs7.existsSync(mappingPath)) {
        try {
          mapping = JSON.parse(fs7.readFileSync(mappingPath, "utf8"));
        } catch (e) {
        }
      }
      fs7.rmSync(tmpDir, { recursive: true, force: true });
      await logAuditEvent({
        req,
        entityType: "service",
        entityId: "import-media",
        action: "created",
        summary: `Import m\xE9dia: ${copiedCount} fichiers import\xE9s, ${skippedCount} ignor\xE9s`
      });
      res.json({
        success: true,
        message: `Import m\xE9dia termin\xE9`,
        copiedCount,
        skippedCount,
        totalInArchive: sourceFiles.length,
        hasMappingFile: !!mapping,
        mappingEntries: Array.isArray(mapping) ? mapping.length : 0
      });
    } catch (error) {
      console.error("Media import error:", error);
      res.status(500).json({ message: "Erreur lors de l'import des m\xE9dias", error: error.message });
    }
  });
  const wsAuthTokens = /* @__PURE__ */ new Map();
  app3.post("/api/ws/auth-token", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = Date.now() + 3e4;
      wsAuthTokens.set(token, { userId, expiresAt });
      Array.from(wsAuthTokens.entries()).forEach(([t, data]) => {
        if (data.expiresAt < Date.now()) {
          wsAuthTokens.delete(t);
        }
      });
      res.json({ token });
    } catch (error) {
      console.error("Error generating WS auth token:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/import-quote-media", isAuthenticated, isRootAdmin, async (req, res) => {
    try {
      const fs10 = await import("fs");
      const path13 = await import("path");
      const { randomUUID: randomUUID3 } = await import("crypto");
      const { Storage: Storage2 } = await import("@google-cloud/storage");
      const REPLIT_SIDECAR_ENDPOINT2 = "http://127.0.0.1:1106";
      const gcsClient = new Storage2({
        credentials: {
          audience: "replit",
          subject_token_type: "access_token",
          token_url: `${REPLIT_SIDECAR_ENDPOINT2}/token`,
          type: "external_account",
          credential_source: {
            url: `${REPLIT_SIDECAR_ENDPOINT2}/credential`,
            format: { type: "json", subject_token_field_name: "access_token" }
          },
          universe_domain: "googleapis.com"
        },
        projectId: ""
      });
      const privateObjectDir = process.env.PRIVATE_OBJECT_DIR || "";
      if (!privateObjectDir) {
        return res.status(500).json({ error: "PRIVATE_OBJECT_DIR not set" });
      }
      const pathParts = privateObjectDir.split("/").filter((p) => p);
      const bucketName = pathParts[0];
      const basePath = pathParts.slice(1).join("/");
      const mediaMappings = [
        {
          quoteRef: "0395C819",
          files: [
            { path: "/tmp/upDb/Devis-0395C819.pdf", type: "pdf" },
            { path: "/tmp/upDb/IMG_0103.jpeg", type: "image" },
            { path: "/tmp/upDb/IMG_0106.jpeg", type: "image" }
          ]
        },
        {
          quoteRef: "DEV-01-00068",
          files: [
            { path: "/tmp/upDb/Devis-DEV-01-00068.pdf", type: "pdf" },
            { path: "/tmp/upDb/IMG_0144.jpeg", type: "image" },
            { path: "/tmp/upDb/IMG_0143.jpeg", type: "image" }
          ]
        },
        {
          quoteRef: "3AFD6186",
          files: [{ path: "/tmp/upDb/Devis-3AFD6186.pdf", type: "pdf" }]
        },
        {
          quoteRef: "6DD863A5",
          files: [
            { path: "/tmp/upDb/Devis-6DD863A5.pdf", type: "pdf" },
            { path: "/tmp/upDb/0181C530-4C5A-4DA5-BB9B-9E83992402DC.jpeg", type: "image" }
          ]
        },
        {
          quoteRef: "C43335ED",
          files: [{ path: "/tmp/upDb/Devis-C43335ED.pdf", type: "pdf" }]
        },
        {
          quoteRef: "DEV-01-00076",
          files: [{ path: "/tmp/upDb/IMG_0219.png", type: "image" }]
        }
      ];
      const results = [];
      const bucket = gcsClient.bucket(bucketName);
      for (const mapping of mediaMappings) {
        const quote = await storage.getQuoteByReference(mapping.quoteRef);
        if (!quote) {
          results.push({ quoteRef: mapping.quoteRef, error: "Quote not found" });
          continue;
        }
        for (const file of mapping.files) {
          if (!fs10.existsSync(file.path)) {
            results.push({ quoteRef: mapping.quoteRef, file: file.path, error: "File not found" });
            continue;
          }
          const fileName = path13.basename(file.path);
          const buffer = fs10.readFileSync(file.path);
          const stats = fs10.statSync(file.path);
          const ext = path13.extname(file.path).toLowerCase();
          let contentType = "application/octet-stream";
          if (ext === ".pdf") contentType = "application/pdf";
          else if (ext === ".jpeg" || ext === ".jpg") contentType = "image/jpeg";
          else if (ext === ".png") contentType = "image/png";
          try {
            const objectId = randomUUID3();
            const objectName = `${basePath}/uploads/${objectId}`;
            const gcsFile = bucket.file(objectName);
            await gcsFile.save(buffer, {
              contentType,
              resumable: false
            });
            const objectPath = `/objects/uploads/${objectId}`;
            await storage.createQuoteMedia({
              quoteId: quote.id,
              fileType: "image",
              filePath: objectPath,
              fileName,
              fileSize: stats.size
            });
            results.push({ quoteRef: mapping.quoteRef, file: fileName, success: true, path: objectPath });
          } catch (error) {
            results.push({ quoteRef: mapping.quoteRef, file: fileName, error: error.message });
          }
        }
      }
      res.json({ message: "Import completed", results });
    } catch (error) {
      console.error("Error importing quote media:", error);
      res.status(500).json({ error: error.message });
    }
  });
  async function syncDatabases(sourceUrl, targetUrl, direction) {
    const backupFileName = `backup-before-sync-${direction}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:.]/g, "-")}.sql`;
    const backupsDir = path9.join(process.cwd(), "backups");
    if (!fs7.existsSync(backupsDir)) fs7.mkdirSync(backupsDir, { recursive: true });
    const backupPath = path9.join(backupsDir, backupFileName);
    execSync(`pg_dump "${targetUrl}" --no-owner --no-privileges --data-only > "${backupPath}"`, { timeout: 6e4 });
    console.log(`[DBSync ${direction}] Backup created: ${backupFileName}`);
    const dumpOutput = execSync(`pg_dump "${sourceUrl}" --no-owner --no-privileges --data-only --inserts`, {
      timeout: 12e4,
      maxBuffer: 100 * 1024 * 1024
    }).toString();
    const { Pool: Pool2 } = await import("@neondatabase/serverless");
    const targetPool = new Pool2({ connectionString: targetUrl });
    try {
      await targetPool.query("SET session_replication_role = replica");
      const tableNames = /* @__PURE__ */ new Set();
      const insertRegex = /^INSERT INTO (?:public\.)?"?(\w+)"?/gm;
      let m;
      while ((m = insertRegex.exec(dumpOutput)) !== null) {
        tableNames.add(m[1]);
      }
      const tablesToTruncate = Array.from(tableNames).filter((t) => t !== "sessions").map((t) => `"${t}"`).join(", ");
      if (tablesToTruncate) {
        await targetPool.query(`TRUNCATE TABLE ${tablesToTruncate} CASCADE`);
      }
      let totalRows = 0;
      const statements = dumpOutput.split("\n").filter((line) => line.startsWith("INSERT INTO"));
      for (const stmt of statements) {
        try {
          await targetPool.query(stmt);
          totalRows++;
        } catch (err2) {
          console.error(`[DBSync ${direction}] Insert error:`, err2.message?.slice(0, 150));
        }
      }
      await targetPool.query("SET session_replication_role = DEFAULT");
      console.log(`[DBSync ${direction}] Synced ${totalRows} rows across ${tableNames.size} tables`);
      return { backup: backupFileName, tables: tableNames.size, rows: totalRows };
    } finally {
      await targetPool.end();
    }
  }
  app3.post("/api/admin/db/sync-prod", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const prodDbUrl = process.env.PRODUCTION_DB_URL;
      const devDbUrl = process.env.DEVELOPPEMENT_DB_URL || process.env.DATABASE_URL;
      if (!prodDbUrl) {
        return res.status(400).json({ message: "Secret PRODUCTION_DB_URL non configur\xE9." });
      }
      if (!devDbUrl) {
        return res.status(500).json({ message: "URL de base de donn\xE9es de d\xE9veloppement non trouv\xE9e." });
      }
      console.log("[DBSync] Starting Prod \u2192 Dev sync...");
      const result = await syncDatabases(prodDbUrl, devDbUrl, "prod-to-dev");
      await logAuditEvent({
        req,
        entityType: "user",
        entityId: req.user.id,
        action: "updated",
        summary: `Sync Prod\u2192Dev: ${result.rows} lignes, ${result.tables} tables`
      });
      res.json({
        message: `Synchronisation Prod \u2192 Dev r\xE9ussie ! ${result.rows} lignes synchronis\xE9es dans ${result.tables} tables. Sauvegarde de s\xE9curit\xE9 cr\xE9\xE9e.`,
        backup: result.backup,
        tables: result.tables,
        rows: result.rows
      });
    } catch (error) {
      console.error("[DBSync Prod\u2192Dev] Error:", error);
      res.status(500).json({ message: `Erreur: ${error.message}` });
    }
  });
  app3.post("/api/admin/db/sync-dev-to-prod", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const devDbUrl = process.env.DEVELOPPEMENT_DB_URL || process.env.DATABASE_URL;
      const prodDbUrl = process.env.PRODUCTION_DB_URL;
      if (!prodDbUrl) {
        return res.status(400).json({ message: "Secret PRODUCTION_DB_URL non configur\xE9." });
      }
      if (!devDbUrl) {
        return res.status(500).json({ message: "URL de base de donn\xE9es de d\xE9veloppement non trouv\xE9e." });
      }
      console.log("[DBSync] Starting Dev \u2192 Prod sync...");
      const result = await syncDatabases(devDbUrl, prodDbUrl, "dev-to-prod");
      await logAuditEvent({
        req,
        entityType: "user",
        entityId: req.user.id,
        action: "updated",
        summary: `Sync Dev\u2192Prod: ${result.rows} lignes, ${result.tables} tables`
      });
      res.json({
        message: `Synchronisation Dev \u2192 Prod r\xE9ussie ! ${result.rows} lignes synchronis\xE9es dans ${result.tables} tables. Sauvegarde de s\xE9curit\xE9 cr\xE9\xE9e.`,
        backup: result.backup,
        tables: result.tables,
        rows: result.rows
      });
    } catch (error) {
      console.error("[DBSync Dev\u2192Prod] Error:", error);
      res.status(500).json({ message: `Erreur: ${error.message}` });
    }
  });
  app3.get("/api/admin/backups/stats", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const uploadsDir = path9.join(process.cwd(), "uploads");
      let totalFiles = 0;
      let totalSize = 0;
      if (fs7.existsSync(uploadsDir)) {
        const files = fs7.readdirSync(uploadsDir);
        totalFiles = files.length;
        for (const file of files) {
          const stats = fs7.statSync(path9.join(uploadsDir, file));
          totalSize += stats.size;
        }
      }
      const quoteMediaCount = await db.select({ count: count() }).from(quoteMedia);
      const invoiceMediaCount = await db.select({ count: count() }).from(invoiceMedia);
      res.json({
        filesOnDisk: totalFiles,
        totalSize,
        totalSizeFormatted: formatFileSize(totalSize),
        quoteMediaCount: Number(quoteMediaCount[0]?.count || 0),
        invoiceMediaCount: Number(invoiceMediaCount[0]?.count || 0)
      });
    } catch (error) {
      console.error("Error getting backup stats:", error);
      res.status(500).json({ error: error.message });
    }
  });
  app3.get("/api/admin/backups", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const backupsDir = path9.join(process.cwd(), "backups");
      if (!fs7.existsSync(backupsDir)) {
        return res.json({ backups: [] });
      }
      const files = fs7.readdirSync(backupsDir);
      const backups = files.filter((f) => f.startsWith("media_backup_") || f.startsWith("backup-")).map((f) => {
        const filePath = path9.join(backupsDir, f);
        const stats = fs7.statSync(filePath);
        const isArchive = f.endsWith(".tar.gz") || f.endsWith(".sql") || f.endsWith(".zip");
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
      }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      res.json({ backups });
    } catch (error) {
      console.error("Error listing backups:", error);
      res.status(500).json({ error: error.message });
    }
  });
  function formatFileSize(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "Ko", "Mo", "Go"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
  app3.post("/api/admin/backups", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const dateStr = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const backupDir = path9.join(process.cwd(), "backups", `media_backup_${dateStr}`);
      const uploadsDir = path9.join(process.cwd(), "uploads");
      fs7.mkdirSync(path9.join(process.cwd(), "backups"), { recursive: true });
      fs7.mkdirSync(backupDir, { recursive: true });
      if (fs7.existsSync(uploadsDir)) {
        const uploadFiles = fs7.readdirSync(uploadsDir);
        for (const file of uploadFiles) {
          fs7.copyFileSync(path9.join(uploadsDir, file), path9.join(backupDir, file));
        }
      }
      const quoteMediaResults = await db.select({
        reference: quotes.reference,
        quoteId: quoteMedia.quoteId,
        mediaId: quoteMedia.id,
        filePath: quoteMedia.filePath,
        fileName: quoteMedia.fileName,
        fileType: quoteMedia.fileType
      }).from(quoteMedia).innerJoin(quotes, eq6(quoteMedia.quoteId, quotes.id));
      const invoiceMediaResults = await db.select({
        reference: invoices.invoiceNumber,
        invoiceId: invoiceMedia.invoiceId,
        mediaId: invoiceMedia.id,
        filePath: invoiceMedia.filePath,
        fileName: invoiceMedia.fileName,
        fileType: invoiceMedia.fileType
      }).from(invoiceMedia).innerJoin(invoices, eq6(invoiceMedia.invoiceId, invoices.id));
      const allMedia = [
        ...quoteMediaResults.map((m) => ({ entityType: "quote", ...m })),
        ...invoiceMediaResults.map((m) => ({ entityType: "invoice", ...m }))
      ];
      fs7.writeFileSync(path9.join(backupDir, "media_mapping.json"), JSON.stringify(allMedia, null, 2));
      const restoreScript = `#!/bin/bash
# Script de restauration des m\xE9dias pour AutoReport
SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
echo "=== Restauration des m\xE9dias AutoReport ==="
mkdir -p uploads
for file in "$SCRIPT_DIR"/*; do
  filename=$(basename "$file")
  if [[ "$filename" != "restore-media.sh" && "$filename" != "media_mapping.json" && "$filename" != "media_tables.sql" ]]; then
    cp "$file" uploads/
  fi
done
echo "Fichiers restaur\xE9s dans uploads/"
echo "=== Restauration termin\xE9e ==="`;
      fs7.writeFileSync(path9.join(backupDir, "restore-media.sh"), restoreScript);
      fs7.chmodSync(path9.join(backupDir, "restore-media.sh"), "755");
      const archiveName = `media_backup_${dateStr.slice(0, 10)}.tar.gz`;
      const archivePath = path9.join(process.cwd(), "backups", archiveName);
      execSync(`cd "${path9.join(process.cwd(), "backups")}" && tar -czf "${archiveName}" "media_backup_${dateStr}"`);
      const files = fs7.readdirSync(backupDir);
      const archiveStats = fs7.statSync(archivePath);
      await logAuditEvent({
        req,
        entityType: "service",
        entityId: "backup",
        action: "created",
        summary: `Sauvegarde cr\xE9\xE9e: ${archiveName} (${files.length} fichiers, ${formatFileSize(archiveStats.size)})`
      });
      res.json({
        success: true,
        backup: {
          name: archiveName,
          fileCount: files.length,
          size: archiveStats.size,
          sizeFormatted: formatFileSize(archiveStats.size),
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
    } catch (error) {
      console.error("Error creating backup:", error);
      res.status(500).json({ error: error.message });
    }
  });
  app3.get("/api/admin/backups/:name/download", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { name } = req.params;
      const backupsDir = path9.join(process.cwd(), "backups");
      const backupPath = path9.join(backupsDir, name);
      console.log(`[BackupDownload] Request for: ${name}, path: ${backupPath}`);
      if (!fs7.existsSync(backupPath)) {
        console.error(`[BackupDownload] File not found: ${backupPath}`);
        return res.status(404).json({ error: "Sauvegarde non trouv\xE9e" });
      }
      const stats = fs7.statSync(backupPath);
      if (stats.isDirectory()) {
        const archiver = (await import("archiver")).default;
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", `attachment; filename="${name}.zip"`);
        const archive = archiver("zip", { zlib: { level: 5 } });
        archive.on("error", (err2) => {
          console.error(`[BackupDownload] Archive error:`, err2);
          if (!res.headersSent) res.status(500).send({ error: err2.message });
        });
        archive.pipe(res);
        archive.directory(backupPath, false);
        await archive.finalize();
        return;
      }
      const contentType = name.endsWith(".tar.gz") ? "application/gzip" : name.endsWith(".sql") ? "application/sql" : name.endsWith(".zip") ? "application/zip" : "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
      res.setHeader("Content-Length", stats.size);
      const stream = fs7.createReadStream(backupPath);
      stream.on("error", (err2) => {
        console.error(`[BackupDownload] Stream error:`, err2);
        if (!res.headersSent) res.status(500).send({ error: err2.message });
      });
      stream.pipe(res);
    } catch (error) {
      console.error("Error downloading backup:", error);
      if (!res.headersSent) res.status(500).json({ error: error.message });
    }
  });
  app3.delete("/api/admin/backups/:name", isAuthenticated, isSuperAdmin, async (req, res) => {
    try {
      const { name } = req.params;
      const backupsDir = path9.join(process.cwd(), "backups");
      const archivePath = path9.join(backupsDir, name);
      if (fs7.existsSync(archivePath)) {
        fs7.unlinkSync(archivePath);
      }
      const folderName = name.replace(".tar.gz", "");
      const folderPath = path9.join(backupsDir, folderName);
      if (fs7.existsSync(folderPath) && fs7.statSync(folderPath).isDirectory()) {
        fs7.rmSync(folderPath, { recursive: true });
      }
      await logAuditEvent({
        req,
        entityType: "service",
        entityId: "backup",
        action: "deleted",
        summary: `Sauvegarde supprim\xE9e: ${name}`
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting backup:", error);
      res.status(500).json({ error: error.message });
    }
  });
  wss.on("connection", (ws2, req) => {
    console.log("WebSocket client connected");
    let authenticatedUserId = null;
    ws2.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === "authenticate" && data.token) {
          const tokenData = wsAuthTokens.get(data.token);
          if (tokenData && tokenData.expiresAt > Date.now()) {
            authenticatedUserId = tokenData.userId;
            wsClients2.set(tokenData.userId, ws2);
            wsAuthTokens.delete(data.token);
            console.log(`User ${tokenData.userId} authenticated via WebSocket`);
            ws2.send(JSON.stringify({ type: "authenticated", success: true }));
          } else {
            console.log("WebSocket authentication failed: invalid or expired token");
            ws2.send(JSON.stringify({ type: "authenticated", success: false, error: "Invalid token" }));
          }
        }
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    });
    ws2.on("close", () => {
      for (const [userId, client] of Array.from(wsClients2.entries())) {
        if (client === ws2) {
          wsClients2.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });
  app3.get("/api/admin/reviews", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageScope = getGarageScope(req.user);
      let query = db.select().from(reviews);
      if (garageScope) {
        query = query.where(eq6(reviews.garageId, garageScope));
      }
      const allReviews = await query.orderBy(desc3(reviews.createdAt));
      res.json(allReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.patch("/api/admin/reviews/:id/approve", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const [review] = await db.select().from(reviews).where(eq6(reviews.id, id));
      if (!review) {
        return res.status(404).json({ message: "Avis non trouv\xE9" });
      }
      const garageScope = getGarageScope(req.user);
      if (garageScope && review.garageId !== garageScope) {
        return res.status(403).json({ message: "Non autoris\xE9" });
      }
      const [updatedReview] = await db.update(reviews).set({ isApproved: true }).where(eq6(reviews.id, id)).returning();
      if (updatedReview.rating >= 4 && updatedReview.clientId) {
        try {
          const user = await storage.getUser(updatedReview.clientId);
          if (user && user.email) {
            await sendEmail({
              to: user.email,
              subject: "Partagez votre exp\xE9rience sur Google - AUTOREPORT",
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #dc2626;">Merci pour votre confiance !</h2>
                  <p>Bonjour ${user.firstName || "cher client"},</p>
                  <p>Nous avons bien re\xE7u votre avis positif concernant votre r\xE9cente prestation chez AUTOREPORT. Nous sommes ravis que vous soyez satisfait !</p>
                  <p>Pourriez-vous prendre quelques secondes pour partager \xE9galement votre exp\xE9rience sur Google ? Cela nous aide \xE9norm\xE9ment \xE0 faire conna\xEEtre notre travail.</p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="https://share.google/O0VCgqh0z1Ab4qUF9" style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                      Laisser un avis sur Google
                    </a>
                  </div>
                  <p>\xC0 tr\xE8s bient\xF4t dans notre atelier !</p>
                  <p>L'\xE9quipe AUTOREPORT</p>
                </div>
              `
            });
            sendEventSms({
              userPhone: user.phone,
              userSmsConsent: user.smsConsent,
              userName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
              userEmail: user.email,
              eventType: "review_request",
              eventTitle: "Merci pour votre confiance !",
              eventDetails: "Partagez votre exp\xE9rience sur Google pour nous aider.",
              eventUrl: "https://share.google/O0VCgqh0z1Ab4qUF9"
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
  app3.delete("/api/admin/reviews/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const [review] = await db.select().from(reviews).where(eq6(reviews.id, id));
      if (!review) {
        return res.status(404).json({ message: "Avis non trouv\xE9" });
      }
      if (!hasGarageAccess(req.user, review.garageId)) {
        return res.status(403).json({ message: "Acc\xE8s refus\xE9" });
      }
      await db.delete(reviews).where(eq6(reviews.id, id));
      res.json({ message: "Avis supprim\xE9" });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.post("/api/quotes/:id/track-view", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (!quote) return res.status(404).json({ message: "Devis non trouv\xE9" });
      if (quote.clientId !== req.user.id && req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Acc\xE8s refus\xE9" });
      }
      if (req.user.role === "client" && !quote.viewedAt) {
        await storage.updateQuote(id, { viewedAt: /* @__PURE__ */ new Date() });
        console.log(`[Tracking] Quote ${id} marked as viewed by client ${req.user.id}`);
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error tracking quote view:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/invoices/:id/track-view", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) return res.status(404).json({ message: "Facture non trouv\xE9e" });
      if (invoice.clientId !== req.user.id && req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Acc\xE8s refus\xE9" });
      }
      if (req.user.role === "client" && !invoice.viewedAt) {
        await storage.updateInvoice(id, { viewedAt: /* @__PURE__ */ new Date() });
        console.log(`[Tracking] Invoice ${id} marked as viewed by client ${req.user.id}`);
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error tracking invoice view:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/support/contact", async (req, res) => {
    try {
      const { name, email, category, subject, message } = req.body;
      if (!email || !category || !subject || !message) {
        return res.status(400).json({ success: false, message: "Tous les champs obligatoires doivent \xEAtre remplis." });
      }
      const escapeHtml = (str) => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      const safeName = escapeHtml(name || "");
      const safeEmail = escapeHtml(email);
      const safeSubject = escapeHtml(subject);
      const safeMessage = escapeHtml(message);
      const categoryLabels = {
        question: "Question g\xE9n\xE9rale",
        devis: "Devis / Facturation",
        reservation: "R\xE9servation",
        technique: "Probl\xE8me technique",
        reclamation: "R\xE9clamation",
        autre: "Autre"
      };
      const { sendEmail: sendEmail2, getEmailHeader: getEmailHeader2, getEmailFooter: getEmailFooter2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
      const htmlContent = `
        ${getEmailHeader2("AUTOREPORT")}
        <div style="padding: 20px;">
          <h2 style="color: #e53e3e; margin-bottom: 20px;">Nouvelle demande de support</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; background: #f7fafc; font-weight: bold; width: 140px;">Nom</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${safeName || "Non renseign\xE9"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; background: #f7fafc; font-weight: bold;">Email</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; background: #f7fafc; font-weight: bold;">Cat\xE9gorie</td>
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
      await sendEmail2(
        "contact@autoreport.com",
        `[Support] ${categoryLabels[category] || category} - ${subject}`,
        htmlContent,
        void 0,
        email
      );
      res.json({ success: true, message: "Message envoy\xE9 avec succ\xE8s." });
    } catch (error) {
      console.error("[Support] Error:", error);
      res.status(500).json({ success: false, message: "Une erreur est survenue." });
    }
  });
  app3.get("/api/public/quotes/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const [quote] = await db.select().from(quotes).where(eq6(quotes.viewToken, token));
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouv\xE9" });
      }
      await db.update(quotes).set({ viewedAt: /* @__PURE__ */ new Date() }).where(eq6(quotes.id, quote.id));
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
          diameter: quote.diameter
        },
        client: client ? {
          name: `${client.firstName || ""} ${client.lastName || ""}`.trim() || "Client"
        } : null,
        items: items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPriceExcludingTax: item.unitPriceExcludingTax,
          totalExcludingTax: item.totalExcludingTax,
          totalIncludingTax: item.totalIncludingTax,
          taxRate: item.taxRate
        })),
        garage: garage ? {
          name: garage.name,
          logo: garage.logo,
          primaryColor: garage.primaryColor,
          phone: garage.phone,
          email: garage.email,
          address: garage.address,
          city: garage.city,
          postalCode: garage.postalCode
        } : null
      });
    } catch (error) {
      console.error("Error fetching public quote:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.post("/api/public/quotes/:token/accept", async (req, res) => {
    try {
      const { token } = req.params;
      const [quote] = await db.select().from(quotes).where(eq6(quotes.viewToken, token));
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouv\xE9" });
      }
      if (quote.status === "accepted") {
        return res.json({ message: "Ce devis a d\xE9j\xE0 \xE9t\xE9 accept\xE9", status: "accepted" });
      }
      if (quote.status === "rejected" || quote.status === "completed") {
        return res.status(400).json({ message: "Ce devis ne peut plus \xEAtre modifi\xE9" });
      }
      await storage.updateQuote(quote.id, { status: "accepted" });
      await storage.createNotification({
        userId: quote.clientId,
        type: "quote",
        title: "Devis accept\xE9 par le client",
        message: `Le devis ${quote.reference || quote.id.slice(0, 8)} a \xE9t\xE9 accept\xE9 par le client`
      });
      sendWsNotification(quote.clientId, { type: "quote_updated", quoteId: quote.id, status: "accepted" });
      res.json({ message: "Devis accept\xE9 avec succ\xE8s", status: "accepted" });
    } catch (error) {
      console.error("Error accepting public quote:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.post("/api/public/quotes/:token/reject", async (req, res) => {
    try {
      const { token } = req.params;
      const [quote] = await db.select().from(quotes).where(eq6(quotes.viewToken, token));
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouv\xE9" });
      }
      if (quote.status === "rejected") {
        return res.json({ message: "Ce devis a d\xE9j\xE0 \xE9t\xE9 refus\xE9", status: "rejected" });
      }
      if (quote.status === "accepted" || quote.status === "completed") {
        return res.status(400).json({ message: "Ce devis ne peut plus \xEAtre modifi\xE9" });
      }
      await storage.updateQuote(quote.id, { status: "rejected" });
      res.json({ message: "Devis refus\xE9", status: "rejected" });
    } catch (error) {
      console.error("Error rejecting public quote:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.post("/api/quotes/:id/view-link", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await storage.getQuote(id);
      if (!quote) return res.status(404).json({ message: "Devis non trouv\xE9" });
      const user = req.user;
      if (user.role !== "admin" && user.role !== "superadmin" && quote.clientId !== user.id) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      let viewToken = quote.viewToken;
      if (!viewToken) {
        viewToken = crypto.randomBytes(32).toString("hex");
        await storage.updateQuote(id, { viewToken });
      }
      const viewUrl = buildUrl(req, `/devis/${viewToken}`);
      res.json({ viewUrl, viewToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/invoices/:id/view-link", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await storage.getInvoice(id);
      if (!invoice) return res.status(404).json({ message: "Facture non trouv\xE9e" });
      const user = req.user;
      if (user.role !== "admin" && user.role !== "superadmin" && invoice.clientId !== user.id) {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      let viewToken = invoice.viewToken;
      if (!viewToken) {
        viewToken = crypto.randomBytes(32).toString("hex");
        await db.update(invoices).set({ viewToken }).where(eq6(invoices.id, id));
      }
      const viewUrl = buildUrl(req, `/facture/${viewToken}`);
      res.json({ viewUrl, viewToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/public/invoices/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const [invoice] = await db.select().from(invoices).where(eq6(invoices.viewToken, token));
      if (!invoice) {
        return res.status(404).json({ message: "Facture non trouv\xE9e" });
      }
      if (!invoice.viewedAt) {
        await db.update(invoices).set({ viewedAt: /* @__PURE__ */ new Date() }).where(eq6(invoices.id, invoice.id));
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
          paymentLink: invoice.paymentLink
        },
        client: client ? {
          name: `${client.firstName || ""} ${client.lastName || ""}`.trim() || "Client"
        } : null,
        items: items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPriceExcludingTax: item.unitPriceExcludingTax,
          totalExcludingTax: item.totalExcludingTax,
          totalIncludingTax: item.totalIncludingTax,
          taxRate: item.taxRate
        })),
        garage: garage ? {
          name: garage.name,
          logo: garage.logo,
          primaryColor: garage.primaryColor,
          phone: garage.phone,
          email: garage.email,
          address: garage.address,
          city: garage.city,
          postalCode: garage.postalCode
        } : null
      });
    } catch (error) {
      console.error("Error fetching public invoice:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.get("/api/public/reviews/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const [review] = await db.select().from(reviews).where(eq6(reviews.reviewToken, token));
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
          postalCode: garage.postalCode
        } : null
      });
    } catch (error) {
      console.error("Error fetching review:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.post("/api/public/reviews/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const { rating, comment } = req.body;
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "La note doit \xEAtre entre 1 et 5" });
      }
      const [review] = await db.select().from(reviews).where(eq6(reviews.reviewToken, token));
      if (!review) {
        return res.status(404).json({ message: "Lien d'avis invalide" });
      }
      if (review.rating > 0) {
        return res.status(400).json({ message: "Un avis a d\xE9j\xE0 \xE9t\xE9 laiss\xE9 pour cette facture" });
      }
      await db.update(reviews).set({
        rating: parseInt(rating),
        comment: comment || null
      }).where(eq6(reviews.reviewToken, token));
      res.json({ message: "Merci pour votre avis !" });
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.get("/api/public/logo.png", (req, res) => {
    const logoPath = path9.join(process.cwd(), "attached_assets", "logoAutoReport.png");
    if (fs7.existsSync(logoPath)) {
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=31536000");
      res.sendFile(logoPath);
    } else {
      res.status(404).send("Logo not found");
    }
  });
  app3.get("/api/public/quotes/:token/pdf", async (req, res) => {
    try {
      const { token } = req.params;
      const [quote] = await db.select().from(quotes).where(eq6(quotes.viewToken, token));
      if (!quote) {
        return res.status(404).json({ message: "Devis non trouv\xE9" });
      }
      const client = await storage.getUser(quote.clientId);
      const items = await storage.getQuoteItems(quote.id);
      const settings = await storage.getApplicationSettings();
      const formatPrice = (value) => {
        if (value === null || value === void 0 || value === "") return "0,00 \u20AC";
        const num = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(num)) return "0,00 \u20AC";
        return num.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
      };
      const { generateQuotePDF: generateQuotePDF2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
      const pubQuoteTTC = parseFloat(quote.quoteAmount || "0");
      const pubQuoteTax = parseFloat(quote.taxAmount || "0");
      const pubQuoteHT = pubQuoteTax > 0 ? pubQuoteTTC - pubQuoteTax : pubQuoteTTC / 1.2;
      const pdfBuffer = generateQuotePDF2({
        quoteNumber: quote.reference || quote.id.slice(0, 8).toUpperCase(),
        quoteDate: quote.createdAt ? new Date(quote.createdAt).toLocaleDateString("fr-FR") : (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"),
        clientName: client ? client.companyName || `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email : "Client",
        status: quote.status,
        items: items.map((item) => ({
          description: item.description,
          quantity: parseFloat(item.quantity || "1"),
          unitPrice: parseFloat(item.unitPriceExcludingTax || "0").toFixed(2),
          total: parseFloat(item.totalExcludingTax || "0").toFixed(2),
          taxRate: item.taxRate || "20"
        })),
        amount: formatPrice(quote.quoteAmount),
        totalHT: pubQuoteHT.toFixed(2),
        totalTTC: pubQuoteTTC.toFixed(2),
        companyName: settings?.companyName || "AutoReport"
      });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="Devis-${quote.reference || quote.id.slice(0, 8)}.pdf"`);
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Error generating public quote PDF:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.get("/api/payment/config", async (req, res) => {
    const { isStripeConfigured: isStripeConfigured2 } = await Promise.resolve().then(() => (init_stripeService(), stripeService_exports));
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY_PROD || process.env.STRIPE_PUBLISHABLE_KEY || null;
    res.json({
      stripeConfigured: isStripeConfigured2(),
      publishableKey,
      isLiveMode: publishableKey?.startsWith("pk_live_") || false
    });
  });
  app3.post("/api/payment/create-intent", isAuthenticated, async (req, res) => {
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
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      if (invoice.status === "paid") {
        return res.status(400).json({ message: "Cette facture est d\xE9j\xE0 pay\xE9e" });
      }
      const amount = parseFloat(invoice.amount);
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "Montant de facture invalide" });
      }
      const client = await storage.getUser(invoice.clientId);
      const clientEmail = client?.email || req.user.email || "client@autoreport.com";
      const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() : "Client";
      const { createInstallmentPaymentIntent: createInstallmentPaymentIntent2 } = await Promise.resolve().then(() => (init_stripeService(), stripeService_exports));
      const paymentIntent = await createInstallmentPaymentIntent2({
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        amount,
        clientEmail,
        clientName
      });
      try {
        await storage.updateInvoice(invoice.id, { viewedAt: /* @__PURE__ */ new Date() });
        console.log(`[Tracking] Invoice ${invoice.id} marked as viewed (Intent)`);
      } catch (err2) {
        console.error(`[Tracking] Failed to mark invoice ${invoice.id} as viewed:`, err2);
      }
      await db.update(invoices).set({
        stripePaymentIntentId: paymentIntent.id,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq6(invoices.id, invoice.id));
      if (invoiceId) {
        try {
          await storage.updateInvoice(invoiceId, { viewedAt: /* @__PURE__ */ new Date() });
          console.log(`[Tracking] Invoice ${invoiceId} marked as viewed`);
        } catch (err2) {
          console.error(`[Tracking] Failed to mark invoice ${invoiceId} as viewed:`, err2);
        }
      }
      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY_PROD || process.env.STRIPE_PUBLISHABLE_KEY || null,
        amount,
        invoiceNumber: invoice.invoiceNumber
      });
    } catch (error) {
      console.error("[Stripe] PaymentIntent error:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la cr\xE9ation du paiement" });
    }
  });
  app3.post("/api/payment/create-checkout", isAuthenticated, async (req, res) => {
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
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      if (invoice.status === "paid") {
        return res.status(400).json({ message: "Cette facture est d\xE9j\xE0 pay\xE9e" });
      }
      const amount = parseFloat(invoice.amount);
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "Montant de facture invalide" });
      }
      const client = await storage.getUser(invoice.clientId);
      const clientEmail = client?.email || req.user.email || "client@autoreport.com";
      const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() : "Client";
      const { createCheckoutSession: createCheckoutSession2 } = await Promise.resolve().then(() => (init_stripeService(), stripeService_exports));
      const session2 = await createCheckoutSession2({
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        amount,
        clientEmail,
        clientName,
        description: invoice.productDetails || `Facture ${invoice.invoiceNumber}`,
        successUrl: buildUrl(req, `/payment/success?session_id={CHECKOUT_SESSION_ID}&invoice_id=${invoice.id}`),
        cancelUrl: buildUrl(req, `/payment/cancel?invoice_id=${invoice.id}`),
        paymentMethods: paymentMethods || ["card"]
      });
      try {
        await storage.updateInvoice(invoice.id, { viewedAt: /* @__PURE__ */ new Date() });
        console.log(`[Tracking] Invoice ${invoice.id} marked as viewed (Checkout)`);
      } catch (err2) {
        console.error(`[Tracking] Failed to mark invoice ${invoice.id} as viewed:`, err2);
      }
      await db.update(invoices).set({
        stripeSessionId: session2.id,
        paymentLink: session2.url,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq6(invoices.id, invoice.id));
      try {
        await storage.updateInvoice(invoice.id, { viewedAt: /* @__PURE__ */ new Date() });
        console.log(`[Tracking] Invoice ${invoice.id} marked as viewed`);
      } catch (err2) {
        console.error(`[Tracking] Failed to mark invoice ${invoice.id} as viewed:`, err2);
      }
      res.json({
        sessionId: session2.id,
        url: session2.url
      });
    } catch (error) {
      console.error("[Stripe] Checkout error:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la cr\xE9ation du paiement" });
    }
  });
  app3.get("/api/payment/status/:invoiceId", isAuthenticated, async (req, res) => {
    try {
      const invoice = await storage.getInvoice(req.params.invoiceId);
      if (!invoice) {
        return res.status(404).json({ message: "Facture introuvable" });
      }
      if (invoice.clientId !== req.user.id && req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Acc\xE8s non autoris\xE9" });
      }
      let stripeStatus = null;
      if (invoice.stripeSessionId) {
        const { retrieveSession: retrieveSession2 } = await Promise.resolve().then(() => (init_stripeService(), stripeService_exports));
        const session2 = await retrieveSession2(invoice.stripeSessionId);
        if (session2) {
          stripeStatus = {
            paymentStatus: session2.payment_status,
            status: session2.status,
            amountTotal: session2.amount_total ? session2.amount_total / 100 : null
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
        paidAt: invoice.paidAt
      });
    } catch (error) {
      console.error("[Payment] Status error:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/payment/verify/:sessionId", isAuthenticated, async (req, res) => {
    try {
      const { retrieveSession: retrieveSession2 } = await Promise.resolve().then(() => (init_stripeService(), stripeService_exports));
      const session2 = await retrieveSession2(req.params.sessionId);
      if (!session2) {
        return res.status(404).json({ message: "Session de paiement introuvable" });
      }
      const invoiceId = session2.metadata?.invoiceId;
      if (!invoiceId) {
        return res.status(400).json({ message: "Aucune facture associ\xE9e \xE0 cette session" });
      }
      if (session2.payment_status === "paid") {
        await db.update(invoices).set({
          status: "paid",
          paidAt: /* @__PURE__ */ new Date(),
          stripePaymentIntentId: session2.payment_intent,
          paymentMethod: "stripe",
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq6(invoices.id, invoiceId));
        const invoice = await storage.getInvoice(invoiceId);
        if (invoice) {
          await storage.createNotification({
            userId: invoice.clientId,
            type: "invoice",
            title: "Paiement confirm\xE9",
            message: `Le paiement de la facture ${invoice.invoiceNumber} a \xE9t\xE9 confirm\xE9.`,
            relatedId: invoice.id
          });
          const wsClient = wsClients2.get(invoice.clientId);
          if (wsClient && wsClient.readyState === WebSocket.OPEN) {
            wsClient.send(JSON.stringify({
              type: "payment_confirmed",
              invoiceId: invoice.id
            }));
          }
        }
      }
      res.json({
        status: session2.payment_status,
        invoiceId,
        paid: session2.payment_status === "paid"
      });
    } catch (error) {
      console.error("[Payment] Verify error:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/webhooks/stripe", async (req, res) => {
    try {
      const signature = req.headers["stripe-signature"];
      if (!signature) {
        return res.status(400).json({ message: "Missing stripe-signature header" });
      }
      const { constructWebhookEvent: constructWebhookEvent2 } = await Promise.resolve().then(() => (init_stripeService(), stripeService_exports));
      let event;
      try {
        event = constructWebhookEvent2(req.body, signature);
      } catch (err2) {
        console.error("[Stripe Webhook] Signature verification failed:", err2.message);
        return res.status(400).json({ message: `Webhook Error: ${err2.message}` });
      }
      switch (event.type) {
        case "checkout.session.completed": {
          const session2 = event.data.object;
          const invoiceId = session2.metadata?.invoiceId;
          const planId = session2.metadata?.planId;
          const subUserId = session2.metadata?.userId;
          if (planId && session2.payment_status === "paid") {
            try {
              const sub = await storage.getSubscriptionBySessionId(session2.id);
              if (sub) {
                await storage.updateUserSubscription(sub.id, {
                  status: "active",
                  stripeSubscriptionId: session2.subscription || void 0
                });
                console.log(`[Stripe Webhook] Subscription ${sub.id} activated (plan ${planId})`);
              }
            } catch (e) {
              console.error("[Stripe Webhook] subscription activation error:", e);
            }
          }
          if (invoiceId && session2.payment_status === "paid") {
            await db.update(invoices).set({
              status: "paid",
              paidAt: /* @__PURE__ */ new Date(),
              stripePaymentIntentId: session2.payment_intent,
              paymentMethod: "stripe",
              updatedAt: /* @__PURE__ */ new Date()
            }).where(eq6(invoices.id, invoiceId));
            const invoice = await storage.getInvoice(invoiceId);
            if (invoice) {
              const client = await storage.getUser(invoice.clientId);
              const settings = await storage.getApplicationSettings();
              const { sendEmail: sendEmail2, generateInvoicePaidEmailHtml: generateInvoicePaidEmailHtml2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
              const crypto2 = await import("crypto");
              const clientName = `${client?.firstName || ""} ${client?.lastName || ""}`.trim() || client?.email || "";
              let reviewUrl = "";
              const existingReviews = await db.select().from(reviews).where(eq6(reviews.invoiceId, invoice.id));
              if (existingReviews.length === 0) {
                const reviewToken = crypto2.randomBytes(32).toString("hex");
                await db.insert(reviews).values({
                  garageId: invoice.garageId,
                  invoiceId: invoice.id,
                  clientId: invoice.clientId,
                  clientName,
                  rating: 0,
                  reviewToken
                });
                reviewUrl = buildUrl(req, `/avis/${reviewToken}`);
              } else if (existingReviews[0].reviewToken) {
                reviewUrl = buildUrl(req, `/avis/${existingReviews[0].reviewToken}`);
              }
              if (client?.email) {
                const paidHtml = generateInvoicePaidEmailHtml2({
                  clientName,
                  invoiceNumber: invoice.invoiceNumber || invoice.id.slice(0, 8).toUpperCase(),
                  amount: invoice.amount || "0",
                  paymentDate: (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"),
                  companyName: settings?.companyName || "AutoReport",
                  reviewUrl: reviewUrl || void 0
                });
                await sendEmail2({
                  to: client.email,
                  subject: `Paiement re\xE7u - Facture ${invoice.invoiceNumber}`,
                  html: paidHtml
                });
                sendEventSms({
                  userPhone: client.phone,
                  userSmsConsent: client.smsConsent,
                  userName: `${client.firstName || ""} ${client.lastName || ""}`.trim(),
                  userEmail: client.email,
                  eventType: "invoice_paid",
                  eventTitle: `Paiement re\xE7u - ${invoice.invoiceNumber}`,
                  eventDetails: `Montant : ${invoice.amount || "0"} \u20AC. Merci pour votre confiance !`,
                  eventUrl: reviewUrl || void 0
                });
              }
              await storage.createNotification({
                userId: invoice.clientId,
                type: "invoice",
                title: "Paiement re\xE7u",
                message: `Le paiement de la facture ${invoice.invoiceNumber} a \xE9t\xE9 re\xE7u. Merci !`,
                relatedId: invoice.id
              });
              sendWsNotification(invoice.clientId, { type: "payment_confirmed", invoiceId: invoice.id });
            }
            console.log(`[Stripe Webhook] Invoice ${invoiceId} marked as paid`);
          }
          break;
        }
        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object;
          const invoiceId = paymentIntent.metadata?.invoiceId;
          if (invoiceId) {
            let paymentMethodType = "stripe";
            try {
              const { retrievePaymentIntentWithCharge: retrievePaymentIntentWithCharge2, mapStripePaymentMethod: mapStripePaymentMethod2 } = await Promise.resolve().then(() => (init_stripeService(), stripeService_exports));
              const fullPI = await retrievePaymentIntentWithCharge2(paymentIntent.id);
              if (fullPI) {
                paymentMethodType = mapStripePaymentMethod2(fullPI);
              }
            } catch (e) {
              console.error("[Stripe Webhook] Error mapping payment method:", e);
            }
            await db.update(invoices).set({
              status: "paid",
              paidAt: /* @__PURE__ */ new Date(),
              stripePaymentIntentId: paymentIntent.id,
              paymentMethod: paymentMethodType,
              updatedAt: /* @__PURE__ */ new Date()
            }).where(eq6(invoices.id, invoiceId));
            const invoice = await storage.getInvoice(invoiceId);
            if (invoice) {
              const client = await storage.getUser(invoice.clientId);
              const settings = await storage.getApplicationSettings();
              const { sendEmail: sendEmail2, generateInvoicePaidEmailHtml: generateInvoicePaidEmailHtml2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
              const crypto2 = await import("crypto");
              const clientName = `${client?.firstName || ""} ${client?.lastName || ""}`.trim() || client?.email || "";
              let reviewUrl = "";
              const existingReviews = await db.select().from(reviews).where(eq6(reviews.invoiceId, invoice.id));
              if (existingReviews.length === 0) {
                const reviewToken = crypto2.randomBytes(32).toString("hex");
                await db.insert(reviews).values({
                  garageId: invoice.garageId,
                  invoiceId: invoice.id,
                  clientId: invoice.clientId,
                  clientName,
                  rating: 0,
                  reviewToken
                });
                reviewUrl = buildUrl(req, `/avis/${reviewToken}`);
              } else if (existingReviews[0].reviewToken) {
                reviewUrl = buildUrl(req, `/avis/${existingReviews[0].reviewToken}`);
              }
              if (client?.email) {
                const paidHtml = generateInvoicePaidEmailHtml2({
                  clientName,
                  invoiceNumber: invoice.invoiceNumber || invoice.id.slice(0, 8).toUpperCase(),
                  amount: invoice.amount || "0",
                  paymentDate: (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"),
                  companyName: settings?.companyName || "AutoReport",
                  reviewUrl: reviewUrl || void 0
                });
                await sendEmail2({
                  to: client.email,
                  subject: `Paiement re\xE7u - Facture ${invoice.invoiceNumber}`,
                  html: paidHtml
                });
              }
              await storage.createNotification({
                userId: invoice.clientId,
                type: "invoice",
                title: "Paiement re\xE7u",
                message: `Le paiement de la facture ${invoice.invoiceNumber} a \xE9t\xE9 confirm\xE9 via ${paymentMethodType === "klarna" ? "Klarna" : paymentMethodType === "alma" ? "Alma" : "Stripe"}.`,
                relatedId: invoice.id
              });
              const wsClient = wsClients2.get(invoice.clientId);
              if (wsClient && wsClient.readyState === WebSocket.OPEN) {
                wsClient.send(JSON.stringify({
                  type: "payment_confirmed",
                  invoiceId: invoice.id,
                  paymentMethod: paymentMethodType
                }));
              }
            }
            console.log(`[Stripe Webhook] PaymentIntent ${paymentIntent.id} succeeded for invoice ${invoiceId} (method: ${paymentMethodType})`);
          }
          break;
        }
        case "payment_intent.canceled": {
          const paymentIntent = event.data.object;
          const invoiceId = paymentIntent.metadata?.invoiceId;
          console.log(`[Stripe Webhook] PaymentIntent ${paymentIntent.id} canceled for invoice ${invoiceId}`);
          break;
        }
        case "payment_intent.payment_failed": {
          const paymentIntent = event.data.object;
          const invoiceId = paymentIntent.metadata?.invoiceId;
          console.log(`[Stripe Webhook] Payment failed for invoice ${invoiceId}: ${paymentIntent.last_payment_error?.message}`);
          break;
        }
        default:
          console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
      }
      res.json({ received: true });
    } catch (error) {
      console.error("[Stripe Webhook] Error:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/payment/generate-link", isAuthenticated, isAdmin, async (req, res) => {
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
        return res.status(400).json({ message: "Facture d\xE9j\xE0 pay\xE9e" });
      }
      const client = await storage.getUser(invoice.clientId);
      const clientEmail = client?.email || "client@autoreport.com";
      const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() : "Client";
      const { createCheckoutSession: createCheckoutSession2 } = await Promise.resolve().then(() => (init_stripeService(), stripeService_exports));
      const session2 = await createCheckoutSession2({
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        amount: parseFloat(invoice.amount),
        clientEmail,
        clientName,
        description: invoice.productDetails || `Facture ${invoice.invoiceNumber}`,
        successUrl: buildUrl(req, `/payment/success?session_id={CHECKOUT_SESSION_ID}&invoice_id=${invoice.id}`),
        cancelUrl: buildUrl(req, `/payment/cancel?invoice_id=${invoice.id}`),
        paymentMethods: paymentMethods || ["card"]
      });
      await db.update(invoices).set({
        stripeSessionId: session2.id,
        paymentLink: session2.url,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq6(invoices.id, invoice.id));
      res.json({
        sessionId: session2.id,
        paymentLink: session2.url,
        invoiceNumber: invoice.invoiceNumber
      });
    } catch (error) {
      console.error("[Payment] Generate link error:", error);
      res.status(500).json({ message: error.message || "Erreur lors de la g\xE9n\xE9ration du lien de paiement" });
    }
  });
  app3.get("/api/admin/payments", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const allInvoices = await storage.getInvoices();
      const paidInvoices = allInvoices.filter((i) => i.stripePaymentIntentId || i.paymentMethod === "stripe" || i.paymentMethod === "sepa" || i.paymentMethod === "klarna" || i.paymentMethod === "alma");
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
          createdAt: inv.createdAt
        });
      }
      res.json(payments);
    } catch (error) {
      console.error("[Payments] List error:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/expense-categories", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const categories = await storage.getExpenseCategories(garageId);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/expense-categories", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const data = { ...req.body, garageId: req.user?.garageId || null };
      const category = await storage.createExpenseCategory(data);
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app3.patch("/api/admin/expense-categories/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const category = await storage.updateExpenseCategory(req.params.id, req.body);
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app3.delete("/api/admin/expense-categories/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteExpenseCategory(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app3.get("/api/admin/expenses", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const allExpenses = await storage.getExpenses(garageId);
      res.json(allExpenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/expenses/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const expense = await storage.getExpense(req.params.id);
      if (!expense) return res.status(404).json({ message: "D\xE9pense non trouv\xE9e" });
      res.json(expense);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/expenses", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const year = (/* @__PURE__ */ new Date()).getFullYear();
      const expenseNumber = await storage.getNextExpenseNumber(year);
      const data = {
        ...req.body,
        expenseNumber,
        garageId: req.user?.garageId || null
      };
      const expense = await storage.createExpense(data);
      await createAccountingEntryForExpense(expense, req.user);
      res.json(expense);
    } catch (error) {
      console.error("Error creating expense:", error);
      res.status(400).json({ message: error.message });
    }
  });
  app3.patch("/api/admin/expenses/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const expense = await storage.updateExpense(req.params.id, req.body);
      res.json(expense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app3.delete("/api/admin/expenses/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteExpense(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app3.get("/api/admin/credit-notes", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const notes = await storage.getCreditNotes(garageId);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/credit-notes/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const note = await storage.getCreditNote(req.params.id);
      if (!note) return res.status(404).json({ message: "Avoir non trouv\xE9" });
      const items = await storage.getCreditNoteItems(req.params.id);
      res.json({ ...note, items });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/credit-notes", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { items, ...noteData } = req.body;
      const year = (/* @__PURE__ */ new Date()).getFullYear();
      const creditNoteNumber = await storage.getNextCreditNoteNumber(year);
      const creditNote = await storage.createCreditNote({
        ...noteData,
        creditNoteNumber,
        garageId: req.user?.garageId || null
      });
      if (items && Array.isArray(items)) {
        for (const item of items) {
          await storage.createCreditNoteItem({
            ...item,
            creditNoteId: creditNote.id
          });
        }
      }
      await createAccountingEntryForCreditNote(creditNote, req.user);
      res.json(creditNote);
    } catch (error) {
      console.error("Error creating credit note:", error);
      res.status(400).json({ message: error.message });
    }
  });
  app3.patch("/api/admin/credit-notes/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const note = await storage.updateCreditNote(req.params.id, req.body);
      res.json(note);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app3.get("/api/admin/accounting/entries", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const filters = {};
      if (req.query.journal) filters.journal = req.query.journal;
      if (req.query.startDate) filters.startDate = new Date(req.query.startDate);
      if (req.query.endDate) filters.endDate = new Date(req.query.endDate);
      const entries = await storage.getAccountingEntries(garageId, filters);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/accounting/entries/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const entry = await storage.getAccountingEntry(req.params.id);
      if (!entry) return res.status(404).json({ message: "\xC9criture non trouv\xE9e" });
      const lines = await storage.getAccountingLines(req.params.id);
      res.json({ ...entry, lines });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/accounting/entries", isAuthenticated, isAdmin, async (req, res) => {
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
        garageId: req.user?.garageId || null
      });
      if (lines && Array.isArray(lines)) {
        for (const line of lines) {
          await storage.createAccountingLine({
            ...line,
            entryId: entry.id
          });
        }
      }
      res.json(entry);
    } catch (error) {
      console.error("Error creating accounting entry:", error);
      res.status(400).json({ message: error.message });
    }
  });
  app3.patch("/api/admin/accounting/entries/:id/validate", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const entry = await storage.updateAccountingEntry(req.params.id, {
        isValidated: true,
        validatedAt: /* @__PURE__ */ new Date(),
        validatedBy: req.user.id
      });
      res.json(entry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app3.post("/api/admin/accounting/backfill-invoices", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const allInvoices = await storage.getInvoices(void 0, garageId);
      const paidInvoices = allInvoices.filter((inv) => inv.status === "paid");
      const existingEntries = await storage.getAccountingEntries(garageId, { sourceType: "invoice" });
      const existingInvoiceIds = new Set(existingEntries.map((e) => e.sourceId));
      const invoicesToBackfill = paidInvoices.filter((inv) => !existingInvoiceIds.has(inv.id));
      let createdCount = 0;
      for (const invoice of invoicesToBackfill) {
        try {
          const year = new Date(invoice.paidAt || invoice.createdAt || /* @__PURE__ */ new Date()).getFullYear();
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
            date: invoice.paidAt || invoice.createdAt || /* @__PURE__ */ new Date(),
            journal: "sales",
            sourceType: "invoice",
            sourceId: invoice.id,
            description: `Facture ${invoice.invoiceNumber} pay\xE9e (backfill)`,
            totalDebit: String(ttc),
            totalCredit: String(ttc)
          });
          await storage.createAccountingLine({
            entryId: entry.id,
            accountCode: bankAccount,
            accountLabel: bankLabel,
            description: `Encaissement facture ${invoice.invoiceNumber}`,
            debit: String(ttc),
            credit: "0"
          });
          await storage.createAccountingLine({
            entryId: entry.id,
            accountCode: "706000",
            accountLabel: "Prestations de services",
            description: `Vente ${invoice.invoiceNumber}`,
            debit: "0",
            credit: String(ht)
          });
          if (tva > 0) {
            await storage.createAccountingLine({
              entryId: entry.id,
              accountCode: "445710",
              accountLabel: "TVA collect\xE9e",
              description: `TVA facture ${invoice.invoiceNumber}`,
              debit: "0",
              credit: String(tva)
            });
          }
          createdCount++;
        } catch (err2) {
          console.error(`Error backfilling invoice ${invoice.id}:`, err2);
        }
      }
      res.json({ message: `${createdCount} \xE9critures comptables g\xE9n\xE9r\xE9es pour les factures existantes.`, count: createdCount });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/accounting/tva-report", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1);
      const endDate = req.query.endDate ? new Date(req.query.endDate) : /* @__PURE__ */ new Date();
      const allInvoices = await storage.getInvoices(void 0, garageId);
      const allExpenses = await storage.getExpenses(garageId);
      const allCreditNotes = await storage.getCreditNotes(garageId);
      const filteredInvoices = allInvoices.filter((inv) => {
        const d = new Date(inv.createdAt || 0);
        return d >= startDate && d <= endDate && inv.status === "paid";
      });
      const filteredExpenses = allExpenses.filter((exp) => {
        const d = new Date(exp.date);
        return d >= startDate && d <= endDate && exp.status === "paid";
      });
      const filteredCreditNotes = allCreditNotes.filter((cn) => {
        const d = new Date(cn.createdAt || 0);
        return d >= startDate && d <= endDate && (cn.status === "issued" || cn.status === "refunded");
      });
      let tvaCollected = 0;
      let salesHT = 0;
      for (const inv of filteredInvoices) {
        tvaCollected += parseFloat(inv.taxAmount || "0");
        salesHT += parseFloat(inv.priceExcludingTax || inv.amount || "0");
      }
      let tvaDeductible = 0;
      let purchasesHT = 0;
      for (const exp of filteredExpenses) {
        tvaDeductible += parseFloat(exp.taxAmount || "0");
        purchasesHT += parseFloat(exp.amountHT || "0");
      }
      let tvaCreditNotes = 0;
      for (const cn of filteredCreditNotes) {
        tvaCreditNotes += parseFloat(cn.taxAmount || "0");
      }
      const tvaNet = tvaCollected - tvaDeductible - tvaCreditNotes;
      const tvaByRate = {};
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
        creditNoteCount: filteredCreditNotes.length
      });
    } catch (error) {
      console.error("Error generating TVA report:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/accounting/profit-loss", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1);
      const endDate = req.query.endDate ? new Date(req.query.endDate) : /* @__PURE__ */ new Date();
      const allInvoices = await storage.getInvoices(void 0, garageId);
      const allExpenses = await storage.getExpenses(garageId);
      const allCreditNotes = await storage.getCreditNotes(garageId);
      const categories = await storage.getExpenseCategories(garageId);
      const filteredInvoices = allInvoices.filter((inv) => {
        const d = new Date(inv.createdAt || 0);
        return d >= startDate && d <= endDate && inv.status === "paid";
      });
      const filteredExpenses = allExpenses.filter((exp) => {
        const d = new Date(exp.date);
        return d >= startDate && d <= endDate && exp.status === "paid";
      });
      const filteredCreditNotes = allCreditNotes.filter((cn) => {
        const d = new Date(cn.createdAt || 0);
        return d >= startDate && d <= endDate && (cn.status === "issued" || cn.status === "refunded");
      });
      let totalRevenue = 0;
      const revenueByMonth = {};
      for (const inv of filteredInvoices) {
        const ht = parseFloat(inv.priceExcludingTax || inv.amount || "0");
        totalRevenue += ht;
        const month = new Date(inv.createdAt || 0).toISOString().slice(0, 7);
        revenueByMonth[month] = (revenueByMonth[month] || 0) + ht;
      }
      let totalCreditNotes = 0;
      for (const cn of filteredCreditNotes) {
        totalCreditNotes += parseFloat(cn.totalHT || "0");
      }
      let totalExpenses = 0;
      const expensesByCategory = {};
      const expensesByMonth = {};
      for (const exp of filteredExpenses) {
        const ht = parseFloat(exp.amountHT || "0");
        totalExpenses += ht;
        const month = new Date(exp.date).toISOString().slice(0, 7);
        expensesByMonth[month] = (expensesByMonth[month] || 0) + ht;
        const catName = exp.categoryId ? categories.find((c) => c.id === exp.categoryId)?.name || "Autre" : "Non cat\xE9goris\xE9";
        if (!expensesByCategory[catName]) expensesByCategory[catName] = { name: catName, total: 0, count: 0 };
        expensesByCategory[catName].total += ht;
        expensesByCategory[catName].count++;
      }
      const netRevenue = totalRevenue - totalCreditNotes;
      const netProfit = netRevenue - totalExpenses;
      const margin = netRevenue > 0 ? netProfit / netRevenue * 100 : 0;
      res.json({
        period: { startDate, endDate },
        revenue: { total: totalRevenue, creditNotes: totalCreditNotes, net: netRevenue, byMonth: revenueByMonth },
        expenses: { total: totalExpenses, byCategory: Object.values(expensesByCategory), byMonth: expensesByMonth },
        netProfit,
        margin: Math.round(margin * 100) / 100,
        invoiceCount: filteredInvoices.length,
        expenseCount: filteredExpenses.length
      });
    } catch (error) {
      console.error("Error generating P&L report:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/accounting/cash-flow", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1);
      const endDate = req.query.endDate ? new Date(req.query.endDate) : /* @__PURE__ */ new Date();
      const allInvoices = await storage.getInvoices(void 0, garageId);
      const allExpenses = await storage.getExpenses(garageId);
      const paidInvoices = allInvoices.filter((inv) => {
        const d = new Date(inv.paidAt || inv.createdAt || 0);
        return d >= startDate && d <= endDate && inv.status === "paid";
      });
      const paidExpenses = allExpenses.filter((exp) => {
        const d = new Date(exp.date);
        return d >= startDate && d <= endDate && exp.status === "paid";
      });
      const cashFlowByMonth = {};
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
      const inflowsByMethod = {};
      for (const inv of paidInvoices) {
        const method = inv.paymentMethod || "other";
        inflowsByMethod[method] = (inflowsByMethod[method] || 0) + parseFloat(inv.amount || "0");
      }
      const outflowsByMethod = {};
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
        outflowsByMethod
      });
    } catch (error) {
      console.error("Error generating cash flow:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/accounting/fec-export", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const entries = await storage.getAccountingEntries(garageId, { startDate: start, endDate: end });
      const fecLines = [];
      fecLines.push("JournalCode|JournalLib|EcritureNum|EcritureDate|CompteNum|CompteLib|CompAuxNum|CompAuxLib|PieceRef|PieceDate|EcritureLib|Debit|Credit|EcritureLet|DateLet|ValidDate|Montantdevise|Idevise");
      for (const entry of entries) {
        const lines = await storage.getAccountingLines(entry.id);
        for (const line of lines) {
          const dateStr = new Date(entry.date).toISOString().slice(0, 10).replace(/-/g, "");
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
            parseFloat(line.debit || "0").toFixed(2).replace(".", ","),
            parseFloat(line.credit || "0").toFixed(2).replace(".", ","),
            "",
            "",
            entry.isValidated ? dateStr : "",
            "",
            "EUR"
          ].join("|"));
        }
      }
      const fecContent = fecLines.join("\n");
      const fileName = `FEC_${start.toISOString().slice(0, 10)}_${end.toISOString().slice(0, 10)}.txt`;
      await storage.createFecExport({
        garageId: garageId || null,
        periodStart: start,
        periodEnd: end,
        entryCount: entries.length,
        totalDebit: String(entries.reduce((s, e) => s + parseFloat(e.totalDebit || "0"), 0)),
        totalCredit: String(entries.reduce((s, e) => s + parseFloat(e.totalCredit || "0"), 0)),
        fileName,
        generatedBy: req.user.id
      });
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
      res.send(fecContent);
    } catch (error) {
      console.error("Error generating FEC export:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/accounting/fec-exports", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const exports = await storage.getFecExports(garageId);
      res.json(exports);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/accounting/dossier-validation", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const { startDate, endDate } = req.query;
      const start = startDate ? new Date(startDate) : new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1);
      const end = endDate ? new Date(endDate) : /* @__PURE__ */ new Date();
      const garage = garageId ? await storage.getGarage(garageId) : null;
      const invoices2 = await storage.getInvoices(garageId);
      const expenses2 = await storage.getExpenses(garageId);
      const creditNotes2 = await storage.getCreditNotes(garageId);
      const entries = await storage.getAccountingEntries(garageId, { startDate: start, endDate: end });
      const warnings = [];
      if (garage) {
        if (!garage.siret) warnings.push({ severity: "error", category: "garage", message: "SIRET du garage non renseign\xE9" });
        if (!garage.tvaNumber) warnings.push({ severity: "error", category: "garage", message: "N\xB0 TVA intracommunautaire manquant" });
        if (!garage.address) warnings.push({ severity: "warning", category: "garage", message: "Adresse du garage manquante" });
        if (!garage.iban) warnings.push({ severity: "warning", category: "garage", message: "IBAN bancaire non renseign\xE9" });
        if (!garage.legalForm) warnings.push({ severity: "info", category: "garage", message: "Forme juridique non renseign\xE9e" });
        if (!garage.capitalSocial) warnings.push({ severity: "info", category: "garage", message: "Capital social non renseign\xE9" });
        if (!garage.nafCode) warnings.push({ severity: "info", category: "garage", message: "Code NAF non renseign\xE9" });
        if (!garage.rcsCity) warnings.push({ severity: "info", category: "garage", message: "Ville RCS non renseign\xE9e" });
      }
      const invoicesWithoutClient = invoices2.filter((i) => !i.clientId);
      if (invoicesWithoutClient.length > 0) {
        warnings.push({ severity: "error", category: "invoices", message: "Factures sans client associ\xE9", count: invoicesWithoutClient.length });
      }
      const invoicesWithoutHT = invoices2.filter((i) => !i.priceExcludingTax || parseFloat(i.priceExcludingTax) === 0);
      if (invoicesWithoutHT.length > 0) {
        warnings.push({ severity: "warning", category: "invoices", message: "Factures sans montant HT", count: invoicesWithoutHT.length });
      }
      const invoicesWithoutDueDate = invoices2.filter((i) => !i.dueDate);
      if (invoicesWithoutDueDate.length > 0) {
        warnings.push({ severity: "warning", category: "invoices", message: "Factures sans date d'\xE9ch\xE9ance", count: invoicesWithoutDueDate.length });
      }
      const invoicesWithoutPayment = invoices2.filter((i) => !i.paymentMethod);
      if (invoicesWithoutPayment.length > 0) {
        warnings.push({ severity: "info", category: "invoices", message: "Factures sans mode de paiement", count: invoicesWithoutPayment.length });
      }
      const expensesWithoutCategory = expenses2.filter((e) => !e.categoryId);
      if (expensesWithoutCategory.length > 0) {
        warnings.push({ severity: "warning", category: "expenses", message: "D\xE9penses sans cat\xE9gorie", count: expensesWithoutCategory.length });
      }
      const expensesWithoutReceipt = expenses2.filter((e) => !e.receiptPath);
      if (expensesWithoutReceipt.length > 0) {
        warnings.push({ severity: "info", category: "expenses", message: "D\xE9penses sans justificatif", count: expensesWithoutReceipt.length });
      }
      const unvalidatedEntries = entries.filter((e) => !e.isValidated);
      if (unvalidatedEntries.length > 0) {
        warnings.push({ severity: "warning", category: "entries", message: "\xC9critures comptables non valid\xE9es", count: unvalidatedEntries.length });
      }
      const creditNotesWithoutInvoice = creditNotes2.filter((cn) => !cn.invoiceId);
      if (creditNotesWithoutInvoice.length > 0) {
        warnings.push({ severity: "warning", category: "creditNotes", message: "Avoirs sans facture associ\xE9e", count: creditNotesWithoutInvoice.length });
      }
      const errorCount = warnings.filter((w) => w.severity === "error").length;
      const warningCount = warnings.filter((w) => w.severity === "warning").length;
      const infoCount = warnings.filter((w) => w.severity === "info").length;
      const summary = {
        invoiceCount: invoices2.length,
        expenseCount: expenses2.length,
        creditNoteCount: creditNotes2.length,
        entryCount: entries.length,
        validatedEntryCount: entries.filter((e) => e.isValidated).length
      };
      res.json({ warnings, errorCount, warningCount, infoCount, summary, isReady: errorCount === 0 });
    } catch (error) {
      console.error("Error validating dossier:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/accounting/dossier-export", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const garage = garageId ? await storage.getGarage(garageId) : null;
      const invoices2 = await storage.getInvoices(garageId);
      const expenses2 = await storage.getExpenses(garageId);
      const creditNotes2 = await storage.getCreditNotes(garageId);
      const entries = await storage.getAccountingEntries(garageId, { startDate: start, endDate: end });
      const periodInvoices = invoices2.filter((i) => {
        const d = i.createdAt ? new Date(i.createdAt) : null;
        return d && d >= start && d <= end;
      });
      const periodExpenses = expenses2.filter((e) => {
        const d = e.date ? new Date(e.date) : null;
        return d && d >= start && d <= end;
      });
      const periodCreditNotes = creditNotes2.filter((cn) => {
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
      dossierContent.push("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
      dossierContent.push("              DOSSIER COMPTABLE COMPLET");
      dossierContent.push("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
      dossierContent.push("");
      dossierContent.push(`P\xE9riode : du ${start.toLocaleDateString("fr-FR")} au ${end.toLocaleDateString("fr-FR")}`);
      dossierContent.push(`G\xE9n\xE9r\xE9 le : ${(/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR")} \xE0 ${(/* @__PURE__ */ new Date()).toLocaleTimeString("fr-FR")}`);
      dossierContent.push("");
      if (garage) {
        dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
        dossierContent.push("1. IDENTIFICATION DE L'ENTREPRISE");
        dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
        dossierContent.push(`Raison sociale    : ${garage.name || "Non renseign\xE9"}`);
        dossierContent.push(`SIRET             : ${garage.siret || "Non renseign\xE9"}`);
        dossierContent.push(`N\xB0 TVA            : ${garage.tvaNumber || "Non renseign\xE9"}`);
        dossierContent.push(`Adresse           : ${garage.address || "Non renseign\xE9"}`);
        dossierContent.push(`T\xE9l\xE9phone         : ${garage.phone || "Non renseign\xE9"}`);
        dossierContent.push(`Email             : ${garage.email || "Non renseign\xE9"}`);
        dossierContent.push(`Forme juridique   : ${garage.legalForm || "Non renseign\xE9"}`);
        dossierContent.push(`Capital social    : ${garage.capitalSocial || "Non renseign\xE9"}`);
        dossierContent.push(`Code NAF          : ${garage.nafCode || "Non renseign\xE9"}`);
        dossierContent.push(`RCS               : ${garage.rcsCity || "Non renseign\xE9"}`);
        dossierContent.push(`IBAN              : ${garage.iban || "Non renseign\xE9"}`);
        dossierContent.push(`BIC/SWIFT         : ${garage.swift || "Non renseign\xE9"}`);
        dossierContent.push("");
      }
      dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
      dossierContent.push("2. COMPTE DE R\xC9SULTAT SIMPLIFI\xC9");
      dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
      dossierContent.push(`Chiffre d'affaires HT        : ${totalRevenueHT.toFixed(2)} \u20AC`);
      dossierContent.push(`Avoirs \xE9mis                   : -${totalCreditNotesHT.toFixed(2)} \u20AC`);
      dossierContent.push(`CA net HT                     : ${(totalRevenueHT - totalCreditNotesHT).toFixed(2)} \u20AC`);
      dossierContent.push(`Charges HT                    : -${totalExpensesHT.toFixed(2)} \u20AC`);
      dossierContent.push(`R\xE9sultat net                  : ${(totalRevenueHT - totalCreditNotesHT - totalExpensesHT).toFixed(2)} \u20AC`);
      dossierContent.push(`Marge (%)                     : ${totalRevenueHT > 0 ? ((1 - totalExpensesHT / totalRevenueHT) * 100).toFixed(1) : "0.0"}%`);
      dossierContent.push("");
      dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
      dossierContent.push("3. D\xC9CLARATION DE TVA");
      dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
      dossierContent.push(`TVA collect\xE9e (ventes)        : ${totalTVACollected.toFixed(2)} \u20AC`);
      dossierContent.push(`TVA d\xE9ductible (achats)       : ${totalTVADeductible.toFixed(2)} \u20AC`);
      dossierContent.push(`TVA nette \xE0 payer             : ${(totalTVACollected - totalTVADeductible).toFixed(2)} \u20AC`);
      dossierContent.push("");
      dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
      dossierContent.push("4. SYNTH\xC8SE DES OP\xC9RATIONS");
      dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
      dossierContent.push(`Factures \xE9mises               : ${periodInvoices.length}`);
      dossierContent.push(`  - Total HT                  : ${totalRevenueHT.toFixed(2)} \u20AC`);
      dossierContent.push(`  - Total TTC                 : ${totalRevenueTTC.toFixed(2)} \u20AC`);
      dossierContent.push(`D\xE9penses enregistr\xE9es         : ${periodExpenses.length}`);
      dossierContent.push(`  - Total HT                  : ${totalExpensesHT.toFixed(2)} \u20AC`);
      dossierContent.push(`  - Total TTC                 : ${totalExpensesTTC.toFixed(2)} \u20AC`);
      dossierContent.push(`Avoirs \xE9mis                   : ${periodCreditNotes.length}`);
      dossierContent.push(`  - Total HT                  : ${totalCreditNotesHT.toFixed(2)} \u20AC`);
      dossierContent.push(`\xC9critures comptables          : ${entries.length}`);
      dossierContent.push(`  - Valid\xE9es                  : ${entries.filter((e) => e.isValidated).length}`);
      dossierContent.push(`  - Brouillons                : ${entries.filter((e) => !e.isValidated).length}`);
      dossierContent.push("");
      dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
      dossierContent.push("5. D\xC9TAIL DES FACTURES");
      dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
      for (const inv of periodInvoices.slice(0, 200)) {
        const client = inv.clientId ? await storage.getUser(inv.clientId) : null;
        const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email : "Inconnu";
        dossierContent.push(`${inv.invoiceNumber || "N/A"} | ${inv.createdAt ? new Date(inv.createdAt).toLocaleDateString("fr-FR") : "N/A"} | ${clientName} | HT: ${parseFloat(inv.priceExcludingTax || "0").toFixed(2)}\u20AC | TTC: ${parseFloat(inv.amount || "0").toFixed(2)}\u20AC | ${inv.status || "N/A"}`);
      }
      dossierContent.push("");
      dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
      dossierContent.push("6. D\xC9TAIL DES D\xC9PENSES");
      dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
      for (const exp of periodExpenses.slice(0, 200)) {
        dossierContent.push(`${exp.expenseNumber || "N/A"} | ${exp.date ? new Date(exp.date).toLocaleDateString("fr-FR") : "N/A"} | ${exp.supplier || "N/A"} | ${exp.description || "N/A"} | HT: ${parseFloat(exp.amountHT || "0").toFixed(2)}\u20AC | TTC: ${parseFloat(exp.amountTTC || "0").toFixed(2)}\u20AC`);
      }
      dossierContent.push("");
      if (periodCreditNotes.length > 0) {
        dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
        dossierContent.push("7. D\xC9TAIL DES AVOIRS");
        dossierContent.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
        for (const cn of periodCreditNotes.slice(0, 200)) {
          const client = cn.clientId ? await storage.getUser(cn.clientId) : null;
          const clientName = client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email : "Inconnu";
          dossierContent.push(`${cn.creditNoteNumber || "N/A"} | ${cn.createdAt ? new Date(cn.createdAt).toLocaleDateString("fr-FR") : "N/A"} | ${clientName} | ${cn.reason || "N/A"} | HT: ${parseFloat(cn.totalHT || "0").toFixed(2)}\u20AC`);
        }
        dossierContent.push("");
      }
      dossierContent.push("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
      dossierContent.push("Fin du dossier comptable");
      dossierContent.push("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
      const content = dossierContent.join("\n");
      const fileName = `Dossier_Comptable_${start.toISOString().slice(0, 10)}_${end.toISOString().slice(0, 10)}.txt`;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
      res.send(content);
    } catch (error) {
      console.error("Error generating dossier export:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/notification-rules", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const rules = await storage.getNotificationRules(garageId);
      res.json(rules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/notification-rules/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const rule = await storage.getNotificationRule(req.params.id);
      if (!rule) return res.status(404).json({ message: "R\xE8gle non trouv\xE9e" });
      res.json(rule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/notification-rules", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? req.body.garageId : req.user?.garageId;
      const rule = await storage.createNotificationRule({ ...req.body, garageId });
      res.json(rule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.patch("/api/admin/notification-rules/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const rule = await storage.updateNotificationRule(req.params.id, req.body);
      res.json(rule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.delete("/api/admin/notification-rules/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteNotificationRule(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/accounting/e-invoicing/compliance", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageId = req.user?.role === "superadmin" ? void 0 : req.user?.garageId;
      const invoices2 = await storage.getInvoices(garageId);
      const garage = garageId ? await storage.getGarage(garageId) : null;
      console.log(`[E-Invoicing] Checking compliance for garage: ${garageId || "All"} - Found ${invoices2.length} invoices`);
      const complianceResults = await Promise.all(invoices2.map(async (invoice) => {
        const client = await storage.getUser(invoice.clientId);
        const items = await storage.getInvoiceItems(invoice.id);
        const issues = [];
        if (!invoice.invoiceNumber) issues.push("Num\xE9ro de facture manquant");
        if (!invoice.createdAt) issues.push("Date de facture manquante");
        if (!invoice.clientId) issues.push("Client non renseign\xE9");
        if (!client?.firstName && !client?.lastName && !client?.email) issues.push("Identit\xE9 client incompl\xE8te");
        if (!client?.address) issues.push("Adresse client manquante");
        if (!invoice.amount || parseFloat(invoice.amount) <= 0) issues.push("Montant TTC manquant ou nul");
        if (!invoice.priceExcludingTax) issues.push("Montant HT manquant");
        if (!invoice.taxRate) issues.push("Taux de TVA manquant");
        if (!invoice.taxAmount) issues.push("Montant TVA manquant");
        if (!invoice.paymentMethod) issues.push("Mode de paiement manquant");
        if (!invoice.dueDate) issues.push("Date d'\xE9ch\xE9ance manquante");
        if (items.length === 0 && !invoice.productDetails) issues.push("Aucune ligne de d\xE9tail");
        if (garage) {
          if (!garage.siret) issues.push("SIRET du garage manquant");
          if (!garage.tvaNumber) issues.push("N\xB0 TVA intracommunautaire du garage manquant");
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
          issueCount: issues.length
        };
      }));
      const totalInvoices = complianceResults.length;
      const compliantCount = complianceResults.filter((r) => r.isCompliant).length;
      const nonCompliantCount = totalInvoices - compliantCount;
      const complianceRate = totalInvoices > 0 ? Math.round(compliantCount / totalInvoices * 100) : 0;
      const commonIssues = {};
      complianceResults.forEach((r) => {
        r.issues.forEach((issue) => {
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
        hasIban: !!garage?.iban
      };
      res.json({
        totalInvoices,
        compliantCount,
        nonCompliantCount,
        complianceRate,
        commonIssues: Object.entries(commonIssues).sort(([, a], [, b]) => b - a),
        invoices: complianceResults,
        garageCompliance
      });
    } catch (error) {
      console.error("Error checking e-invoicing compliance:", error);
      res.status(500).json({ message: error.message });
    }
  });
  function escapeXml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  async function createAccountingEntryForExpense(expense, user) {
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
        description: `D\xE9pense ${expense.expenseNumber} - ${expense.vendor}`,
        totalDebit: expense.amountTTC,
        totalCredit: expense.amountTTC
      });
      await storage.createAccountingLine({
        entryId: entry.id,
        accountCode: "606100",
        accountLabel: "Fournitures non stockables",
        description: expense.description || expense.vendor,
        debit: expense.amountHT,
        credit: "0",
        vatRate: expense.taxRate,
        vatAmount: expense.taxAmount
      });
      if (parseFloat(expense.taxAmount || "0") > 0) {
        await storage.createAccountingLine({
          entryId: entry.id,
          accountCode: "445660",
          accountLabel: "TVA d\xE9ductible sur achats",
          description: `TVA ${expense.taxRate}%`,
          debit: expense.taxAmount,
          credit: "0"
        });
      }
      const bankAccount = expense.paymentMethod === "cash" ? "530000" : "512000";
      const bankLabel = expense.paymentMethod === "cash" ? "Caisse" : "Banque";
      await storage.createAccountingLine({
        entryId: entry.id,
        accountCode: bankAccount,
        accountLabel: bankLabel,
        description: `R\xE8glement ${expense.expenseNumber}`,
        debit: "0",
        credit: expense.amountTTC
      });
    } catch (error) {
      console.error("Error creating accounting entry for expense:", error);
    }
  }
  async function createAccountingEntryForCreditNote(creditNote, user) {
    try {
      const year = (/* @__PURE__ */ new Date()).getFullYear();
      const entryNumber = await storage.getNextEntryNumber(year);
      const entry = await storage.createAccountingEntry({
        garageId: creditNote.garageId || null,
        entryNumber,
        date: /* @__PURE__ */ new Date(),
        journal: "sales",
        sourceType: "credit_note",
        sourceId: creditNote.id,
        description: `Avoir ${creditNote.creditNoteNumber}`,
        totalDebit: creditNote.totalTTC,
        totalCredit: creditNote.totalTTC
      });
      await storage.createAccountingLine({
        entryId: entry.id,
        accountCode: "706000",
        accountLabel: "Prestations de services",
        description: `Avoir ${creditNote.creditNoteNumber}`,
        debit: creditNote.totalHT,
        credit: "0"
      });
      if (parseFloat(creditNote.taxAmount || "0") > 0) {
        await storage.createAccountingLine({
          entryId: entry.id,
          accountCode: "445710",
          accountLabel: "TVA collect\xE9e",
          description: `TVA avoir ${creditNote.taxRate}%`,
          debit: creditNote.taxAmount,
          credit: "0"
        });
      }
      await storage.createAccountingLine({
        entryId: entry.id,
        accountCode: "411000",
        accountLabel: "Clients",
        description: `Avoir client ${creditNote.creditNoteNumber}`,
        debit: "0",
        credit: creditNote.totalTTC
      });
    } catch (error) {
      console.error("Error creating accounting entry for credit note:", error);
    }
  }
  const multerImport = await import("multer");
  const multerUpload = multerImport.default({ storage: multerImport.default.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
  app3.post("/api/ar/detect-wheels", isAuthenticated, multerUpload.single("image"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ message: "Aucune image fournie" });
      const base64 = file.buffer.toString("base64");
      const mimeType = file.mimetype || "image/jpeg";
      const GEMINI_BASE_URL4 = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "http://localhost:1106/modelfarm/gemini";
      const GEMINI_API_KEY3 = process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "dummy-key";
      const prompt = `Analyse cette photo de voiture et identifie les positions des roues/jantes visibles.
Pour chaque roue visible, retourne ses coordonn\xE9es normalis\xE9es (entre 0 et 1) par rapport \xE0 l'image:
- x: position horizontale du centre de la roue (0 = gauche, 1 = droite)
- y: position verticale du centre de la roue (0 = haut, 1 = bas)
- radius: rayon approximatif de la roue en proportion de la largeur de l'image

R\xE9ponds UNIQUEMENT en JSON valide avec ce format exact:
{"positions": [{"x": 0.25, "y": 0.7, "radius": 0.08}, {"x": 0.75, "y": 0.7, "radius": 0.08}]}

Si ce n'est pas une photo de voiture ou si aucune roue n'est visible, r\xE9ponds: {"positions": []}`;
      const response = await fetch(`${GEMINI_BASE_URL4}/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY3}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [
              { inlineData: { mimeType, data: base64 } },
              { text: prompt }
            ]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 500
          }
        })
      });
      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }
      const data = await response.json();
      const text2 = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const jsonMatch = text2.match(/\{[\s\S]*"positions"[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        if (Array.isArray(result.positions)) {
          result.positions = result.positions.filter((p) => typeof p.x === "number" && typeof p.y === "number").map((p) => ({
            x: Math.max(0, Math.min(1, p.x)),
            y: Math.max(0, Math.min(1, p.y)),
            radius: Math.max(0.03, Math.min(0.3, p.radius || 0.08))
          }));
        }
        res.json(result);
      } else {
        res.json({ positions: [] });
      }
    } catch (error) {
      console.error("[AR] Wheel detection error:", error.message);
      res.json({ positions: [] });
    }
  });
  app3.post("/api/ocr/scan", isAuthenticated, isAdmin, multerUpload.single("file"), async (req, res) => {
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
      console.log(`[OCR] Fichier sauvegard\xE9 localement: ${localFilePath}`);
      const apiKey = process.env.MINDEE_API_KEY_PROD || process.env.MINDEE_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ message: "Cl\xE9 API Mindee non configur\xE9e" });
      }
      const mindee = await import("mindee");
      const mindeeClient = new mindee.Client({ apiKey });
      const inputSource = await mindeeClient.docFromPath(localFilePath);
      let result;
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
            lineItems: (pred.lineItems || []).map((item) => ({
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalAmount: item.totalAmount,
              taxRate: item.taxRate
            })),
            raw: response.document.toString()
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
            raw: response.document.toString()
          };
          break;
        }
        case "id_card": {
          const response = await mindeeClient.parse(mindee.product.fr.IdCardV2, inputSource);
          const pred = response.document.inference.prediction;
          result = {
            type: "id_card",
            documentNumber: pred.documentNumber?.value || null,
            givenNames: (pred.givenNames || []).map((n) => n.value),
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
            raw: response.document.toString()
          };
          break;
        }
        case "passport": {
          const response = await mindeeClient.parse(mindee.product.PassportV1, inputSource);
          const pred = response.document.inference.prediction;
          result = {
            type: "passport",
            documentId: pred.idNumber?.value || null,
            givenNames: (pred.givenNames || []).map((n) => n.value),
            surname: pred.surname?.value || null,
            birthDate: pred.birthDate?.value || null,
            birthPlace: pred.birthPlace?.value || null,
            expiryDate: pred.expiryDate?.value || null,
            issuanceDate: pred.issuanceDate?.value || null,
            gender: pred.gender?.value || null,
            country: pred.country?.value || null,
            mrz1: pred.mrz1?.value || null,
            mrz2: pred.mrz2?.value || null,
            raw: response.document.toString()
          };
          break;
        }
        default:
          return res.status(400).json({ message: `Type de document non support\xE9: ${documentType}` });
      }
      let savedScan = null;
      try {
        const [scan] = await db.insert(ocrScans).values({
          garageId: req.user?.garageId || null,
          scannedBy: req.user.id,
          documentType,
          fileName: file.originalname,
          result
        }).returning();
        savedScan = scan;
      } catch (saveErr) {
        console.error("[OCR] Erreur sauvegarde historique:", saveErr);
      }
      console.log(`[OCR] Document scann\xE9 avec succ\xE8s: ${documentType} par ${req.user.email}`);
      res.status(200).json({ success: true, result, scanId: savedScan?.id });
    } catch (error) {
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
  app3.get("/api/admin/ocr/history", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const garageScope = getGarageScope(req.user);
      let query = db.select().from(ocrScans);
      if (garageScope) {
        query = query.where(eq6(ocrScans.garageId, garageScope));
      }
      const scans = await query.orderBy(desc3(ocrScans.createdAt)).limit(50);
      res.json(scans);
    } catch (error) {
      console.error("[OCR] Erreur r\xE9cup\xE9ration historique:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.get("/api/admin/ocr/history/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const [scan] = await db.select().from(ocrScans).where(eq6(ocrScans.id, id));
      if (!scan) {
        return res.status(404).json({ message: "Scan non trouv\xE9" });
      }
      const garageScope = getGarageScope(req.user);
      if (garageScope && scan.garageId !== garageScope) {
        return res.status(403).json({ message: "Acc\xE8s refus\xE9" });
      }
      res.json(scan);
    } catch (error) {
      console.error("[OCR] Erreur r\xE9cup\xE9ration scan:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.delete("/api/admin/ocr/history/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const [scan] = await db.select().from(ocrScans).where(eq6(ocrScans.id, id));
      if (!scan) {
        return res.status(404).json({ message: "Scan non trouv\xE9" });
      }
      const garageScope = getGarageScope(req.user);
      if (garageScope && scan.garageId !== garageScope) {
        return res.status(403).json({ message: "Acc\xE8s refus\xE9" });
      }
      await db.delete(ocrScans).where(eq6(ocrScans.id, id));
      res.json({ success: true });
    } catch (error) {
      console.error("[OCR] Erreur suppression scan:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  app3.post("/api/admin/ocr/create-quote", isAuthenticated, isAdmin, async (req, res) => {
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
      const now = /* @__PURE__ */ new Date();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const allQuotes = await storage.getQuotes();
      const count2 = allQuotes.filter((q) => {
        if (!q.createdAt) return false;
        const qDate = new Date(q.createdAt);
        return !isNaN(qDate.getTime()) && qDate >= startOfMonth;
      }).length + 1;
      const reference = `DEV-${mm}-${String(count2).padStart(5, "0")}`;
      const parsedTaxRate = parseFloat(taxRate || "20");
      const wMult = parseInt(wheelCount) || 1;
      let totalHT = 0;
      for (const s of ocrServices) {
        totalHT += (parseFloat(s.quantity) || 0) * (parseFloat(s.unitPrice) || 0) * wMult;
      }
      const taxAmount = totalHT * parsedTaxRate / 100;
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
        status: "approved"
      });
      for (const service of ocrServices) {
        const qty = parseFloat(service.quantity) || 1;
        const unitPrice = parseFloat(service.unitPrice) || 0;
        const itemTotalHT = qty * unitPrice * wMult;
        const itemTaxAmount = itemTotalHT * parsedTaxRate / 100;
        const itemTotalTTC = itemTotalHT + itemTaxAmount;
        await storage.createQuoteItem({
          quoteId: quote.id,
          description: service.description || service.serviceName || "Ligne OCR",
          quantity: qty.toString(),
          unitPriceExcludingTax: unitPrice.toString(),
          totalExcludingTax: itemTotalHT.toString(),
          taxRate: parsedTaxRate.toString(),
          taxAmount: itemTaxAmount.toString(),
          totalIncludingTax: itemTotalTTC.toString()
        });
      }
      await logAuditEvent({
        req,
        entityType: "quote",
        entityId: quote.id,
        action: "created",
        summary: `${entityLabels.quote} ${actionLabels.created} depuis scan OCR`,
        newData: quote,
        metadata: { clientId, source: "ocr_scan" }
      });
      await storage.createNotification({
        userId: clientId,
        type: "quote",
        title: "Nouveau devis",
        message: `Un devis a \xE9t\xE9 cr\xE9\xE9 pour vous`,
        relatedId: quote.id
      });
      const wsClient = wsClients2.get(clientId);
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({ type: "quote_updated", quoteId: quote.id, status: quote.status }));
      }
      if (req.body.scanId) {
        try {
          await db.update(ocrScans).set({ createdQuoteId: quote.id }).where(eq6(ocrScans.id, req.body.scanId));
        } catch (e) {
        }
      }
      console.log(`[OCR] Devis cr\xE9\xE9 depuis scan: ${reference} par ${req.user.email}`);
      res.json(quote);
    } catch (error) {
      console.error("[OCR] Erreur cr\xE9ation devis:", error);
      res.status(400).json({ message: error.message || "\xC9chec de la cr\xE9ation du devis" });
    }
  });
  app3.post("/api/admin/ocr/create-invoice", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { clientId, paymentMethod, wheelCount, diameter, taxRate, productDetails, notes, dueDate, invoiceItems: invoiceItems2 } = req.body;
      const garageId = req.user?.garageId || null;
      if (!clientId) {
        return res.status(400).json({ message: "Client requis" });
      }
      if (!invoiceItems2 || !Array.isArray(invoiceItems2) || invoiceItems2.length === 0) {
        return res.status(400).json({ message: "Au moins une ligne est requise" });
      }
      const now = /* @__PURE__ */ new Date();
      const dd = String(now.getDate()).padStart(2, "0");
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const allInvoices = await storage.getInvoices();
      const countToday = allInvoices.filter((i) => {
        const iDate = new Date(i.createdAt || "");
        return iDate >= startOfDay;
      }).length + 1;
      const invoiceNumber = `FACT-${dd}-${mm}-${String(countToday).padStart(3, "0")}`;
      const parsedTaxRate = parseFloat(taxRate || "20");
      const wMult = parseInt(wheelCount) || 1;
      let totalHT = 0;
      for (const item of invoiceItems2) {
        totalHT += (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPriceExcludingTax) || 0) * wMult;
      }
      const taxAmount = totalHT * parsedTaxRate / 100;
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
        dueDate: dueDate ? new Date(dueDate) : void 0,
        status: "pending"
      });
      for (const item of invoiceItems2) {
        await storage.createInvoiceItem({
          invoiceId: invoice.id,
          description: item.description || "Ligne OCR",
          quantity: String(parseFloat(item.quantity) || 1),
          unitPriceExcludingTax: String(parseFloat(item.unitPriceExcludingTax) || 0),
          totalExcludingTax: String(item.totalExcludingTax || 0),
          taxRate: String(item.taxRate || parsedTaxRate),
          taxAmount: String(item.taxAmount || 0),
          totalIncludingTax: String(item.totalIncludingTax || 0)
        });
      }
      await storage.createNotification({
        userId: clientId,
        type: "invoice",
        title: "Nouvelle facture",
        message: `Une facture a \xE9t\xE9 cr\xE9\xE9e pour vous`,
        relatedId: invoice.id
      });
      const wsClient = wsClients2.get(clientId);
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({ type: "invoice_created", invoiceId: invoice.id }));
      }
      if (req.body.scanId) {
        try {
          await db.update(ocrScans).set({ createdInvoiceId: invoice.id }).where(eq6(ocrScans.id, req.body.scanId));
        } catch (e) {
        }
      }
      console.log(`[OCR] Facture cr\xE9\xE9e depuis scan: ${invoiceNumber} par ${req.user.email}`);
      res.json(invoice);
    } catch (error) {
      console.error("[OCR] Erreur cr\xE9ation facture:", error);
      res.status(400).json({ message: error.message || "\xC9chec de la cr\xE9ation de la facture" });
    }
  });
  app3.post("/api/admin/ocr/create-credit-note", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { clientId, invoiceId, reason, taxRate, notes, lineItems, scanId } = req.body;
      const garageId = req.user?.garageId || null;
      if (!clientId) {
        return res.status(400).json({ message: "Client requis" });
      }
      if (!invoiceId) {
        return res.status(400).json({ message: "Facture li\xE9e requise" });
      }
      if (!reason) {
        return res.status(400).json({ message: "Motif requis" });
      }
      if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
        return res.status(400).json({ message: "Au moins une ligne est requise" });
      }
      const now = /* @__PURE__ */ new Date();
      const creditNoteNumber = await storage.getNextCreditNoteNumber(now.getFullYear());
      const parsedTaxRate = parseFloat(taxRate || "20");
      let totalHT = 0;
      for (const item of lineItems) {
        totalHT += (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPriceHT) || 0);
      }
      const taxAmount = totalHT * parsedTaxRate / 100;
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
        notes: notes || null
      });
      for (const item of lineItems) {
        const qty = parseFloat(item.quantity) || 1;
        const unitPrice = parseFloat(item.unitPriceHT) || 0;
        const itemTotalHT = qty * unitPrice;
        const itemTaxRate = parseFloat(item.taxRate || taxRate) || parsedTaxRate;
        const itemTaxAmount = itemTotalHT * itemTaxRate / 100;
        const itemTotalTTC = itemTotalHT + itemTaxAmount;
        await storage.createCreditNoteItem({
          creditNoteId: creditNote.id,
          description: item.description || "Ligne avoir OCR",
          quantity: qty.toString(),
          unitPriceHT: unitPrice.toString(),
          totalHT: itemTotalHT.toString(),
          taxRate: itemTaxRate.toString(),
          taxAmount: itemTaxAmount.toString(),
          totalTTC: itemTotalTTC.toString()
        });
      }
      if (scanId) {
        try {
          await db.update(ocrScans).set({ createdQuoteId: creditNote.id }).where(eq6(ocrScans.id, scanId));
        } catch (e) {
        }
      }
      console.log(`[OCR] Avoir cr\xE9\xE9 depuis scan: ${creditNoteNumber} par ${req.user.email}`);
      res.json(creditNote);
    } catch (error) {
      console.error("[OCR] Erreur cr\xE9ation avoir:", error);
      res.status(400).json({ message: error.message || "\xC9chec de la cr\xE9ation de l'avoir" });
    }
  });
  app3.post("/api/admin/ocr/create-expense", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { categoryId, supplier, amountHT, taxRate, taxAmount: inputTaxAmount, amountTTC: inputTTC, date, description, notes, receiptRef, scanId } = req.body;
      const garageId = req.user?.garageId || null;
      if (!supplier) {
        return res.status(400).json({ message: "Fournisseur requis" });
      }
      const now = /* @__PURE__ */ new Date();
      const expenseNumber = await storage.getNextExpenseNumber(now.getFullYear());
      const parsedAmountHT = parseFloat(amountHT) || 0;
      const parsedTaxRate = parseFloat(taxRate || "20");
      const computedTaxAmount = inputTaxAmount != null ? parseFloat(inputTaxAmount) : parsedAmountHT * parsedTaxRate / 100;
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
        attachmentName: receiptRef || null
      });
      if (scanId) {
        try {
          await db.update(ocrScans).set({ createdInvoiceId: expense.id }).where(eq6(ocrScans.id, scanId));
        } catch (e) {
        }
      }
      console.log(`[OCR] D\xE9pense cr\xE9\xE9e depuis scan: ${expenseNumber} par ${req.user.email}`);
      res.json(expense);
    } catch (error) {
      console.error("[OCR] Erreur cr\xE9ation d\xE9pense:", error);
      res.status(400).json({ message: error.message || "\xC9chec de la cr\xE9ation de la d\xE9pense" });
    }
  });
  const multerOcrVision = (await import("multer")).default({
    storage: (await import("multer")).default.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }
  });
  app3.post("/api/ocr/scan-vision", isAuthenticated, multerOcrVision.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, message: "Aucun fichier fourni" });
      }
      const documentType = req.body.documentType || "auto_detect";
      const { scanDocument: scanDocument2 } = await Promise.resolve().then(() => (init_ocrVisionService(), ocrVisionService_exports));
      console.log(`[OCR-Vision] Scan ${documentType} par ${req.user?.email}, fichier: ${file.originalname} (${file.size} bytes)`);
      const result = await scanDocument2(file.buffer, documentType, file.mimetype);
      let savedScan = null;
      try {
        const [scan] = await db.insert(ocrScans).values({
          garageId: req.user?.garageId || null,
          scannedBy: req.user.id,
          documentType,
          fileName: file.originalname,
          result: result.data
        }).returning();
        savedScan = scan;
      } catch (saveErr) {
        console.error("[OCR-Vision] Erreur sauvegarde historique:", saveErr);
      }
      console.log(`[OCR-Vision] Scan r\xE9ussi: type=${result.type}, confidence=${result.confidence}`);
      res.json({ success: true, result, scanId: savedScan?.id });
    } catch (error) {
      console.error("[OCR-Vision] Erreur:", error);
      res.status(500).json({ success: false, message: "Erreur lors du scan OCR", error: error.message });
    }
  });
  app3.post("/api/ocr/scan-carte-grise", isAuthenticated, multerOcrVision.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, message: "Aucun fichier fourni" });
      }
      const { scanCarteGrise: scanCarteGrise2 } = await Promise.resolve().then(() => (init_ocrVisionService(), ocrVisionService_exports));
      console.log(`[OCR-Vision] Scan carte grise par ${req.user?.email}`);
      const result = await scanCarteGrise2(file.buffer, file.mimetype);
      let savedScan = null;
      try {
        const [scan] = await db.insert(ocrScans).values({
          garageId: req.user?.garageId || null,
          scannedBy: req.user.id,
          documentType: "carte_grise",
          fileName: file.originalname,
          result: result.data
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
          engineCapacity: result.data.engineCapacity || null
        },
        confidence: result.confidence,
        rawText: result.rawText
      });
    } catch (error) {
      console.error("[OCR-Vision] Erreur carte grise:", error);
      res.status(500).json({ success: false, message: "Erreur lors du scan de la carte grise", error: error.message });
    }
  });
  app3.post("/api/ocr/scan-license-plate", isAuthenticated, multerOcrVision.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, message: "Aucun fichier fourni" });
      }
      const { scanLicensePlate: scanLicensePlate2 } = await Promise.resolve().then(() => (init_ocrVisionService(), ocrVisionService_exports));
      console.log(`[OCR-Vision] Scan plaque par ${req.user?.email}`);
      const result = await scanLicensePlate2(file.buffer, file.mimetype);
      res.json({
        success: true,
        plateNumber: result.data.plateNumber || null,
        country: result.data.country || null,
        format: result.data.format || null,
        confidence: result.confidence
      });
    } catch (error) {
      console.error("[OCR-Vision] Erreur plaque:", error);
      res.status(500).json({ success: false, message: "Erreur lors du scan de la plaque", error: error.message });
    }
  });
  app3.get("/api/admin/storage/status", isAuthenticated, isAdmin, async (_req, res) => {
    try {
      const { isCloudflareR2Configured: isCloudflareR2Configured2, listR2Files: listR2Files2 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
      const { isGoogleDriveConfigured: isGoogleDriveConfigured2 } = await Promise.resolve().then(() => (init_googleDriveStorage(), googleDriveStorage_exports));
      const r2Configured = isCloudflareR2Configured2();
      let r2FileCount = 0;
      if (r2Configured) {
        try {
          const files = await listR2Files2("", 1e3);
          r2FileCount = files.length;
        } catch {
        }
      }
      const uploadsDir = path9.join(process.cwd(), "uploads");
      let localFileCount = 0;
      if (fs7.existsSync(uploadsDir)) {
        localFileCount = fs7.readdirSync(uploadsDir).filter((f) => !f.startsWith(".")).length;
      }
      res.json({
        cloudflareR2: { configured: r2Configured, fileCount: r2FileCount },
        googleDrive: { configured: isGoogleDriveConfigured2() },
        localStorage: { available: true, fileCount: localFileCount },
        priority: r2Configured ? "cloudflare_r2" : isGoogleDriveConfigured2() ? "google_drive" : "local"
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/r2/files", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { isCloudflareR2Configured: isCloudflareR2Configured2, listR2Files: listR2Files2 } = await Promise.resolve().then(() => (init_cloudflareR2Service(), cloudflareR2Service_exports));
      if (!isCloudflareR2Configured2()) {
        return res.status(503).json({ message: "Cloudflare R2 non configur\xE9" });
      }
      const prefix = req.query.prefix || "";
      const maxKeys = parseInt(req.query.limit) || 100;
      const files = await listR2Files2(prefix, maxKeys);
      res.json({ files, count: files.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/r2/migrate-local", isAuthenticated, isAdmin, async (_req, res) => {
    try {
      const result = await migrateLocalToObjectStorage();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/sync-production", isAuthenticated, isAdmin, async (_req, res) => {
    try {
      let formatVal2 = function(val) {
        if (val === null || val === void 0) return "NULL";
        if (typeof val === "boolean") return val ? "TRUE" : "FALSE";
        if (typeof val === "number") return String(val);
        if (Array.isArray(val)) return "'" + JSON.stringify(val).replace(/'/g, "''") + "'::jsonb";
        if (typeof val === "object") return "'" + JSON.stringify(val).replace(/'/g, "''") + "'::jsonb";
        return "'" + String(val).replace(/'/g, "''") + "'";
      };
      var formatVal = formatVal2;
      const fs10 = await import("fs");
      const path13 = await import("path");
      const syncDataPath = path13.join(process.cwd(), "server", "sync_data.json");
      if (!fs10.existsSync(syncDataPath)) {
        return res.status(404).json({ message: "Fichier de synchronisation non trouv\xE9" });
      }
      const syncData = JSON.parse(fs10.readFileSync(syncDataPath, "utf8"));
      const results = {};
      const tableOrder = ["garages", "users", "services", "quotes", "invoices", "reservations", "notifications", "quote_media", "invoice_media", "reviews", "delivery_notes", "repair_orders"];
      for (const table of tableOrder) {
        const rows = syncData[table];
        if (!rows || rows.length === 0) continue;
        results[table] = { upserted: 0, errors: 0 };
        const columns = Object.keys(rows[0]);
        const colNames = columns.map((c) => `"${c}"`).join(", ");
        for (const row of rows) {
          try {
            const valueParts = columns.map((c) => formatVal2(row[c])).join(", ");
            const updateSet = columns.filter((c) => c !== "id").map((c) => `"${c}" = ${formatVal2(row[c])}`).join(", ");
            const query = `INSERT INTO ${table} (${colNames}) VALUES (${valueParts}) ON CONFLICT (id) DO UPDATE SET ${updateSet}`;
            await db.execute(sql4.raw(query));
            results[table].upserted++;
          } catch (err2) {
            results[table].errors++;
            if (results[table].errors <= 3) {
              console.error(`[Sync] Error ${table} id=${row.id}:`, err2.message?.substring(0, 200));
            }
          }
        }
        console.log(`[Sync] ${table}: ${results[table].upserted} upserted, ${results[table].errors} errors`);
      }
      const totalCheck = await db.execute(sql4.raw("SELECT SUM(CAST(amount AS DECIMAL)) as ca FROM invoices WHERE status = 'paid' AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)"));
      res.json({
        success: true,
        results,
        verification: { ca_mois: totalCheck.rows[0]?.ca }
      });
    } catch (error) {
      console.error("[Sync] Error:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/sms/logs", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const logs = await getSmsLogs(limit);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/admin/sms/stats", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const stats = await getSmsStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/admin/sms/test", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { phone, message } = req.body;
      if (!phone) return res.status(400).json({ message: "Num\xE9ro de t\xE9l\xE9phone requis" });
      const result = await sendSms({
        to: phone,
        eventType: "general",
        eventTitle: "Test SMS",
        eventDetails: message || "Ceci est un test de notification SMS AutoReport.",
        recipientName: "Test Admin"
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.get("/api/gallery", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const {
        type,
        reference,
        clientId,
        dateFrom,
        dateTo,
        fileType,
        sortBy = "date_desc",
        page = "1",
        limit = "50",
        engagementId
      } = req.query;
      const offset = (parseInt(page) - 1) * parseInt(limit);
      let qConditions = ["1=1"];
      let qParams = [];
      let qIdx = 1;
      let iConditions = ["1=1"];
      let iParams = [];
      let iIdx = 1;
      if (engagementId) {
        qConditions.push(`qm.quote_id IN (SELECT quote_id FROM engagement_quotes WHERE engagement_id = $${qIdx++})`);
        qParams.push(engagementId);
        iConditions.push(`im.invoice_id IN (SELECT invoice_id FROM engagement_invoices WHERE engagement_id = $${iIdx++})`);
        iParams.push(engagementId);
      }
      if (reference) {
        qConditions.push(`q.reference ILIKE $${qIdx++}`);
        qParams.push(`%${reference}%`);
        iConditions.push(`i.invoice_number ILIKE $${iIdx++}`);
        iParams.push(`%${reference}%`);
      }
      if (clientId) {
        qConditions.push(`q.client_id = $${qIdx++}`);
        qParams.push(clientId);
        iConditions.push(`i.client_id = $${iIdx++}`);
        iParams.push(clientId);
      }
      if (dateFrom) {
        qConditions.push(`qm.created_at >= $${qIdx++}`);
        qParams.push(dateFrom);
        iConditions.push(`im.created_at >= $${iIdx++}`);
        iParams.push(dateFrom);
      }
      if (dateTo) {
        qConditions.push(`qm.created_at <= $${qIdx++}`);
        qParams.push(dateTo);
        iConditions.push(`im.created_at <= $${iIdx++}`);
        iParams.push(dateTo);
      }
      if (fileType && fileType !== "all") {
        qConditions.push(`qm.file_type = $${qIdx++}`);
        qParams.push(fileType);
        iConditions.push(`im.file_type = $${iIdx++}`);
        iParams.push(fileType);
      }
      const sortMap = {
        date_desc: "created_at DESC",
        date_asc: "created_at ASC",
        ref_asc: "reference ASC",
        ref_desc: "reference DESC"
      };
      const sortOrder = sortMap[sortBy] || "created_at DESC";
      let allMedia = [];
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
      allMedia.sort((a, b) => {
        if (sortBy === "date_asc") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        if (sortBy === "ref_asc") return (a.reference || "").localeCompare(b.reference || "");
        if (sortBy === "ref_desc") return (b.reference || "").localeCompare(a.reference || "");
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      const total = allMedia.length;
      const paginated = allMedia.slice(offset, offset + parseInt(limit));
      res.json({ media: paginated, total, page: parseInt(page), limit: parseInt(limit) });
    } catch (error) {
      console.error("[Gallery] Error:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/gallery/bulk-delete", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { mediaIds } = req.body;
      const { bulkDeleteMedia: bulkDeleteMedia2 } = await Promise.resolve().then(() => (init_mediaBulkService(), mediaBulkService_exports));
      const result = await bulkDeleteMedia2(mediaIds);
      res.json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });
  app3.post("/api/gallery/bulk-rename", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { mediaIds, newNames } = req.body;
      const { bulkRenameMedia: bulkRenameMedia2 } = await Promise.resolve().then(() => (init_mediaBulkService(), mediaBulkService_exports));
      const result = await bulkRenameMedia2(mediaIds, newNames);
      res.json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });
  app3.get("/api/gallery/export", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { type, reference, clientId, dateFrom, dateTo, fileType } = req.query;
      let allMedia = [];
      if (!type || type === "all" || type === "quote") {
        const qConditions = ["1=1"];
        const qParams = [];
        let qIdx = 1;
        if (reference) {
          qConditions.push(`q.reference ILIKE $${qIdx++}`);
          qParams.push(`%${reference}%`);
        }
        if (clientId) {
          qConditions.push(`q.client_id = $${qIdx++}`);
          qParams.push(clientId);
        }
        if (dateFrom) {
          qConditions.push(`qm.created_at >= $${qIdx++}`);
          qParams.push(dateFrom);
        }
        if (dateTo) {
          qConditions.push(`qm.created_at <= $${qIdx++}`);
          qParams.push(dateTo);
        }
        if (fileType && fileType !== "all") {
          qConditions.push(`qm.file_type = $${qIdx++}`);
          qParams.push(fileType);
        }
        const qResult = await pool.query(`
          SELECT qm.id, qm.file_path, qm.file_name, qm.file_type, q.reference, 'quote' as entity_type
          FROM quote_media qm LEFT JOIN quotes q ON q.id = qm.quote_id
          WHERE ${qConditions.join(" AND ")}
        `, qParams);
        allMedia = [...allMedia, ...qResult.rows];
      }
      if (!type || type === "all" || type === "invoice") {
        const iConditions = ["1=1"];
        const iParams = [];
        let iIdx = 1;
        if (reference) {
          iConditions.push(`i.invoice_number ILIKE $${iIdx++}`);
          iParams.push(`%${reference}%`);
        }
        if (clientId) {
          iConditions.push(`i.client_id = $${iIdx++}`);
          iParams.push(clientId);
        }
        if (dateFrom) {
          iConditions.push(`im.created_at >= $${iIdx++}`);
          iParams.push(dateFrom);
        }
        if (dateTo) {
          iConditions.push(`im.created_at <= $${iIdx++}`);
          iParams.push(dateTo);
        }
        if (fileType && fileType !== "all") {
          iConditions.push(`im.file_type = $${iIdx++}`);
          iParams.push(fileType);
        }
        const iResult = await pool.query(`
          SELECT im.id, im.file_path, im.file_name, im.file_type, i.invoice_number as reference, 'invoice' as entity_type
          FROM invoice_media im LEFT JOIN invoices i ON i.id = im.invoice_id
          WHERE ${iConditions.join(" AND ")}
        `, iParams);
        allMedia = [...allMedia, ...iResult.rows];
      }
      if (allMedia.length === 0) {
        return res.status(404).json({ message: "Aucun m\xE9dia \xE0 exporter" });
      }
      const archiver = (await import("archiver")).default;
      const { PassThrough } = await import("stream");
      const buffers = [];
      const passThrough = new PassThrough();
      passThrough.on("data", (chunk) => buffers.push(chunk));
      const archive = archiver("zip", { zlib: { level: 5 } });
      archive.on("error", (err2) => {
        throw err2;
      });
      archive.pipe(passThrough);
      const usedNames = /* @__PURE__ */ new Set();
      for (const m of allMedia) {
        try {
          const buffer = await downloadMedia(m.file_path);
          if (!buffer) continue;
          const ext = path9.extname(m.file_name || ".jpg");
          const base = `${m.entity_type === "quote" ? "DEV" : "FACT"}_${m.reference || "unknown"}_${m.id.slice(0, 6)}${ext}`;
          const safeName = base.replace(/[^a-zA-Z0-9._\-]/g, "_");
          let finalName = safeName;
          let counter = 1;
          while (usedNames.has(finalName)) {
            finalName = safeName.replace(ext, `_${counter}${ext}`);
            counter++;
          }
          usedNames.add(finalName);
          archive.append(buffer, { name: finalName });
        } catch (e) {
        }
      }
      await archive.finalize();
      await new Promise((resolve2, reject) => {
        passThrough.on("end", resolve2);
        passThrough.on("error", reject);
      });
      const zipBuffer = Buffer.concat(buffers);
      const label = reference ? `gallery_${reference}` : "gallery_export";
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="${label}_${Date.now()}.zip"`);
      res.send(zipBuffer);
    } catch (error) {
      console.error("[Gallery Export] Error:", error);
      res.status(500).json({ message: error.message });
    }
  });
  const galleryZipUpload = multerImport.default({ storage: multerImport.default.memoryStorage(), limits: { fileSize: 500 * 1024 * 1024 } });
  app3.post("/api/gallery/import", isAuthenticated, isAdmin, galleryZipUpload.single("file"), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "Aucun fichier re\xE7u" });
      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(req.file.buffer);
      const quoteRefRe = /DEV-[\w\-]+/i;
      const invoiceRefRe = /(VIR|FACT|CB)-[\w\-]+/i;
      const results = [];
      const conflicts = [];
      const imageExts = /\.(jpg|jpeg|png|gif|webp)$/i;
      const videoExts = /\.(mp4|mov|avi|webm)$/i;
      for (const [filename, file] of Object.entries(zip.files)) {
        if (file.dir) continue;
        const basename2 = path9.basename(filename);
        if (basename2.startsWith(".") || basename2.startsWith("__MACOSX")) continue;
        const quoteMatch = basename2.match(quoteRefRe);
        const invoiceMatch = basename2.match(invoiceRefRe);
        const ref2 = quoteMatch?.[0] || invoiceMatch?.[0];
        const entityType = quoteMatch ? "quote" : invoiceMatch ? "invoice" : null;
        if (!ref2 || !entityType) {
          results.push({ filename: basename2, status: "skipped", reason: "Aucune r\xE9f\xE9rence d\xE9tect\xE9e" });
          continue;
        }
        let entityId = null;
        if (entityType === "quote") {
          const qr = await pool.query("SELECT id FROM quotes WHERE reference = $1", [ref2]);
          if (qr.rows.length > 0) entityId = qr.rows[0].id;
        } else {
          const ir = await pool.query("SELECT id FROM invoices WHERE invoice_number = $1", [ref2]);
          if (ir.rows.length > 0) entityId = ir.rows[0].id;
        }
        if (!entityId) {
          results.push({ filename: basename2, status: "skipped", reason: `R\xE9f\xE9rence ${ref2} introuvable en base` });
          continue;
        }
        const existing = entityType === "quote" ? await pool.query("SELECT id FROM quote_media WHERE file_name = $1 AND quote_id = $2", [basename2, entityId]) : await pool.query("SELECT id FROM invoice_media WHERE file_name = $1 AND invoice_id = $2", [basename2, entityId]);
        if (existing.rows.length > 0) {
          conflicts.push({ filename: basename2, reference: ref2, entityType, entityId, mediaId: existing.rows[0].id });
          continue;
        }
        const buffer = Buffer.from(await file.async("arraybuffer"));
        const ext = path9.extname(basename2);
        const safeRef = ref2.replace(/[^a-zA-Z0-9\-]/g, "_");
        const newFileName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}_${safeRef}_import${ext}`;
        const newPath = await uploadMedia(buffer, newFileName, entityType === "quote" ? "quotes" : "invoices", void 0, ref2);
        const ft = imageExts.test(basename2) ? "image" : videoExts.test(basename2) ? "video" : "document";
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
        results.push({ filename: basename2, status: "imported", reference: ref2, entityType, newPath });
      }
      res.json({ results, conflicts, summary: { imported: results.filter((r) => r.status === "imported").length, skipped: results.filter((r) => r.status === "skipped").length, conflicts: conflicts.length } });
    } catch (error) {
      console.error("[Gallery Import] Error:", error);
      res.status(500).json({ message: error.message });
    }
  });
  const galleryBulkUpload = multerImport.default({
    storage: multerImport.default.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 }
  });
  app3.post("/api/gallery/bulk-upload", isAuthenticated, isAdmin, galleryBulkUpload.array("files", 20), async (req, res) => {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "Aucun fichier re\xE7u" });
      }
      if (files.length > 20) {
        return res.status(400).json({ message: "Maximum 20 fichiers autoris\xE9s" });
      }
      const { entityId, entityType, reference } = req.body;
      const imageExts = /\.(jpg|jpeg|png|gif|webp|heic|heif)$/i;
      const videoExts = /\.(mp4|mov|avi|webm|mkv)$/i;
      const results = [];
      let fileIndex = 0;
      for (const file of files) {
        try {
          fileIndex++;
          const ext = path9.extname(file.originalname);
          const safeRef = reference ? reference.replace(/[^a-zA-Z0-9\-]/g, "_") : "upload";
          const ft = imageExts.test(file.originalname) ? "image" : videoExts.test(file.originalname) ? "video" : "document";
          const folder = entityType === "quote" ? "quotes" : entityType === "invoice" ? "invoices" : "uploads";
          let displayName;
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
          const newPath = await uploadMedia(file.buffer, storageFileName, folder, void 0, reference || void 0);
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
        } catch (fileErr) {
          results.push({ filename: file.originalname, status: "error", reason: fileErr.message });
        }
      }
      const uploaded = results.filter((r) => r.status === "uploaded").length;
      const errors = results.filter((r) => r.status === "error").length;
      console.log(`[Gallery BulkUpload] ${uploaded} uploaded, ${errors} errors out of ${files.length} files`);
      res.json({ results, summary: { uploaded, errors, total: files.length } });
    } catch (error) {
      console.error("[Gallery BulkUpload] Error:", error);
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/gallery/assign", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { mediaIds, entityId, entityType, reference } = req.body;
      if (!mediaIds || !entityId || !entityType) {
        return res.status(400).json({ message: "Param\xE8tres manquants" });
      }
      for (const mediaId of mediaIds) {
        let mediaData;
        let table = "";
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
        const ext = path9.extname(mediaData.file_name);
        const safeRef = (reference || "").replace(/[^a-zA-Z0-9\-]/g, "_");
        const newFileName = `${safeRef}_${nextNum}${ext}`;
        const { renameMediaFile: renameMediaFile2 } = await Promise.resolve().then(() => (init_mediaService(), mediaService_exports));
        let newPath;
        try {
          newPath = await renameMediaFile2(mediaData.file_path, newFileName);
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
      res.json({ message: "Association et renommage r\xE9ussis" });
    } catch (e) {
      console.error("[Gallery Assign] Error:", e);
      res.status(500).json({ message: e.message });
    }
  });
  app3.get("/api/admin/search-entity", isAuthenticated, isAdmin, async (req, res) => {
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
      res.status(404).json({ message: "Non trouv\xE9" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app3.post("/api/gallery/import/resolve", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { conflicts, action } = req.body;
      if (!conflicts || !action) return res.status(400).json({ message: "conflicts et action requis" });
      const results = [];
      for (const c of conflicts) {
        try {
          if (!c.buffer || !c.filename || !c.entityType || !c.entityId) {
            results.push({ filename: c.filename, status: "error", reason: "Donn\xE9es manquantes" });
            continue;
          }
          const buffer = Buffer.from(c.buffer, "base64");
          const ext = path9.extname(c.filename);
          const ref2 = c.reference || "unknown";
          const safeRef = ref2.replace(/[^a-zA-Z0-9\-]/g, "_");
          const newFileName = action === "rename" ? `${Date.now()}-${Math.random().toString(36).slice(2, 7)}_${safeRef}_v2${ext}` : c.filename;
          const newPath = await uploadMedia(buffer, newFileName, c.entityType === "quote" ? "quotes" : "invoices", void 0, ref2);
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
        } catch (e) {
          results.push({ filename: c.filename, status: "error", reason: e.message });
        }
      }
      res.json({ results });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  return server;
}

// server/vite.ts
import express2 from "express";
import fs8 from "fs";
import path11 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path10 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path10.resolve(import.meta.dirname, "client", "src"),
      "@shared": path10.resolve(import.meta.dirname, "shared"),
      "@assets": path10.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path10.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path10.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: "0.0.0.0",
    port: 5e3,
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app3, server) {
  const serverOptions = {
    middlewareMode: true,
    // hmr: { server }, // Disabled to allow @replit/vite-plugin-cartographer to handle HMR
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app3.use(vite.middlewares);
  app3.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path11.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs8.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app3) {
  const distPath = path11.resolve(import.meta.dirname, "public");
  if (!fs8.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app3.use(express2.static(distPath));
  app3.use("*", (_req, res) => {
    res.sendFile(path11.resolve(distPath, "index.html"));
  });
}

// server/index.ts
init_backupScheduler();
init_dailyReportScheduler();

// server/notificationScheduler.ts
init_storage();
var schedulerInterval = null;
var sentNotifications = /* @__PURE__ */ new Set();
function getDeduplicationKey(ruleId, entityId, userId) {
  return `${ruleId}:${entityId}:${userId}`;
}
function cleanupOldKeys() {
  if (sentNotifications.size > 1e4) {
    sentNotifications.clear();
  }
}
async function checkReservationReminders() {
  try {
    const rules = await storage.getActiveNotificationRules(void 0, "reservation_reminder");
    if (rules.length === 0) return;
    const reservations2 = await storage.getReservations();
    const now = /* @__PURE__ */ new Date();
    for (const rule of rules) {
      const delayMs = getDelayMs(rule.triggerDelay, rule.triggerUnit);
      for (const reservation of reservations2) {
        if (reservation.status === "cancelled" || reservation.status === "completed") continue;
        const scheduledDate = new Date(reservation.scheduledDate);
        if (scheduledDate < now) continue;
        const triggerTime = new Date(scheduledDate.getTime() - delayMs);
        const windowStart = new Date(now.getTime() - 5 * 60 * 1e3);
        const windowEnd = new Date(now.getTime() + 5 * 60 * 1e3);
        if (triggerTime >= windowStart && triggerTime <= windowEnd) {
          const dedupeKey = getDeduplicationKey(rule.id, reservation.id, reservation.clientId);
          if (sentNotifications.has(dedupeKey)) continue;
          sentNotifications.add(dedupeKey);
          const recipients = getRecipients(rule.recipientType, reservation.clientId);
          for (const recipientId of recipients) {
            if (recipientId === "admin") {
              const users2 = await storage.getAllUsers();
              const admins = users2.filter((u) => u.role === "admin" || u.role === "superadmin");
              for (const admin of admins) {
                await triggerNotification(rule, admin.id, {
                  reservationId: reservation.id,
                  reservationDate: scheduledDate.toLocaleDateString("fr-FR"),
                  reservationTime: scheduledDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
                });
              }
            } else {
              await triggerNotification(rule, recipientId, {
                reservationId: reservation.id,
                reservationDate: scheduledDate.toLocaleDateString("fr-FR"),
                reservationTime: scheduledDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("[NotificationScheduler] Error checking reservation reminders:", error);
  }
}
async function checkInvoiceOverdue() {
  try {
    const rules = await storage.getActiveNotificationRules(void 0, "invoice_overdue");
    if (rules.length === 0) return;
    const invoices2 = await storage.getInvoices();
    const now = /* @__PURE__ */ new Date();
    for (const rule of rules) {
      const delayMs = getDelayMs(rule.triggerDelay, rule.triggerUnit);
      for (const invoice of invoices2) {
        if (invoice.status === "paid" || invoice.status === "cancelled") continue;
        if (!invoice.dueDate) continue;
        const dueDate = new Date(invoice.dueDate);
        const triggerTime = new Date(dueDate.getTime() + delayMs);
        const windowStart = new Date(now.getTime() - 5 * 60 * 1e3);
        const windowEnd = new Date(now.getTime() + 5 * 60 * 1e3);
        if (triggerTime >= windowStart && triggerTime <= windowEnd) {
          const dedupeKey = getDeduplicationKey(rule.id, invoice.id, invoice.clientId);
          if (sentNotifications.has(dedupeKey)) continue;
          sentNotifications.add(dedupeKey);
          const recipients = getRecipients(rule.recipientType, invoice.clientId);
          for (const recipientId of recipients) {
            if (recipientId === "admin") {
              const users2 = await storage.getAllUsers();
              const admins = users2.filter((u) => u.role === "admin" || u.role === "superadmin");
              for (const admin of admins) {
                await triggerNotification(rule, admin.id, {
                  invoiceNumber: invoice.invoiceNumber,
                  amount: invoice.amount,
                  dueDate: dueDate.toLocaleDateString("fr-FR")
                });
              }
            } else {
              await triggerNotification(rule, recipientId, {
                invoiceNumber: invoice.invoiceNumber,
                amount: invoice.amount,
                dueDate: dueDate.toLocaleDateString("fr-FR")
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("[NotificationScheduler] Error checking invoice overdue:", error);
  }
}
async function checkQuoteExpiry() {
  try {
    const rules = await storage.getActiveNotificationRules(void 0, "quote_expiry");
    if (rules.length === 0) return;
    const quotes2 = await storage.getQuotes();
    const now = /* @__PURE__ */ new Date();
    for (const rule of rules) {
      const delayMs = getDelayMs(rule.triggerDelay, rule.triggerUnit);
      for (const quote of quotes2) {
        if (quote.status === "accepted" || quote.status === "completed" || quote.status === "rejected") continue;
        if (!quote.validUntil) continue;
        const expiryDate = new Date(quote.validUntil);
        const triggerTime = rule.triggerDirection === "before" ? new Date(expiryDate.getTime() - delayMs) : new Date(expiryDate.getTime() + delayMs);
        const windowStart = new Date(now.getTime() - 5 * 60 * 1e3);
        const windowEnd = new Date(now.getTime() + 5 * 60 * 1e3);
        if (triggerTime >= windowStart && triggerTime <= windowEnd) {
          const dedupeKey = getDeduplicationKey(rule.id, quote.id, quote.clientId);
          if (sentNotifications.has(dedupeKey)) continue;
          sentNotifications.add(dedupeKey);
          const recipients = getRecipients(rule.recipientType, quote.clientId);
          for (const recipientId of recipients) {
            if (recipientId === "admin") {
              const users2 = await storage.getAllUsers();
              const admins = users2.filter((u) => u.role === "admin" || u.role === "superadmin");
              for (const admin of admins) {
                await triggerNotification(rule, admin.id, {
                  quoteReference: quote.reference || quote.id,
                  amount: quote.quoteAmount,
                  expiryDate: expiryDate.toLocaleDateString("fr-FR")
                });
              }
            } else {
              await triggerNotification(rule, recipientId, {
                quoteReference: quote.reference || quote.id,
                amount: quote.quoteAmount,
                expiryDate: expiryDate.toLocaleDateString("fr-FR")
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("[NotificationScheduler] Error checking quote expiry:", error);
  }
}
async function checkReviewRequests() {
  try {
    const rules = await storage.getActiveNotificationRules(void 0, "review_request");
    if (rules.length === 0) return;
    const reservations2 = await storage.getReservations();
    const now = /* @__PURE__ */ new Date();
    for (const rule of rules) {
      const delayMs = getDelayMs(rule.triggerDelay, rule.triggerUnit);
      for (const reservation of reservations2) {
        if (reservation.status !== "completed") continue;
        const completedDate = reservation.updatedAt ? new Date(reservation.updatedAt) : null;
        if (!completedDate) continue;
        const triggerTime = new Date(completedDate.getTime() + delayMs);
        const windowStart = new Date(now.getTime() - 5 * 60 * 1e3);
        const windowEnd = new Date(now.getTime() + 5 * 60 * 1e3);
        if (triggerTime >= windowStart && triggerTime <= windowEnd) {
          const dedupeKey = getDeduplicationKey(rule.id, reservation.id, reservation.clientId);
          if (sentNotifications.has(dedupeKey)) continue;
          sentNotifications.add(dedupeKey);
          await triggerNotification(rule, reservation.clientId, {
            reservationId: reservation.id,
            reservationDate: new Date(reservation.scheduledDate).toLocaleDateString("fr-FR")
          });
        }
      }
    }
  } catch (error) {
    console.error("[NotificationScheduler] Error checking review requests:", error);
  }
}
function getRecipients(recipientType, entityClientId) {
  const recipients = [];
  if (recipientType === "admin" || recipientType === "both") {
    recipients.push("admin");
  }
  if (recipientType === "client" || recipientType === "both") {
    recipients.push(entityClientId);
  }
  return recipients;
}
async function triggerNotification(rule, userId, variables) {
  const channels = Array.isArray(rule.channels) ? rule.channels : [];
  const user = await storage.getUser(userId);
  if (!user) return;
  const clientName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "";
  const allVars = { ...variables, clientName };
  if (channels.includes("app")) {
    const title = replaceVariables(rule.popupTitle || rule.name, allVars);
    const message = replaceVariables(rule.popupMessage || rule.description || "", allVars);
    try {
      await storage.createNotification({
        userId,
        type: mapEventToNotificationType(rule.eventType),
        title,
        message,
        relatedId: variables.reservationId || variables.invoiceNumber || variables.quoteReference || null
      });
      sendWsNotification(userId, {
        type: "notification",
        title,
        message,
        eventType: rule.eventType
      });
    } catch (err2) {
      console.error("[NotificationScheduler] Error creating in-app notification:", err2);
    }
  }
  if (channels.includes("email") && user.email) {
    const subject = replaceVariables(rule.emailSubject || rule.name, allVars);
    const body2 = replaceVariables(rule.emailBody || "", allVars);
    try {
      const { sendReminderEmail: sendReminderEmail2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
      await sendReminderEmail2(user.email, clientName, subject, body2);
    } catch (err2) {
      console.error("[NotificationScheduler] Error sending email notification:", err2);
    }
  }
  if (channels.includes("sms") && user.phone && user.smsConsent) {
    const smsBody = replaceVariables(rule.smsMessage || rule.popupMessage || "", allVars);
    try {
      const { sendSms: sendSms2 } = await Promise.resolve().then(() => (init_smsService(), smsService_exports));
      const smsEventMap = {
        reservation_reminder: "reservation_reminder",
        invoice_overdue: "invoice_sent",
        quote_expiry: "quote_sent",
        review_request: "review_request",
        payment_confirmed: "invoice_paid",
        reservation_created: "reservation_confirmed",
        invoice_created: "invoice_sent",
        quote_sent: "quote_sent",
        custom: "general"
      };
      await sendSms2({
        to: user.phone,
        recipientName: clientName,
        recipientEmail: user.email || void 0,
        eventType: smsEventMap[rule.eventType] || "general",
        eventTitle: rule.name,
        eventDetails: smsBody
      });
    } catch (err2) {
      console.error("[NotificationScheduler] Error sending SMS notification:", err2);
    }
  }
  try {
    await storage.updateNotificationRule(rule.id, { lastTriggeredAt: /* @__PURE__ */ new Date() });
  } catch (err2) {
  }
}
function mapEventToNotificationType(eventType) {
  switch (eventType) {
    case "reservation_reminder":
    case "reservation_created":
      return "reservation";
    case "invoice_overdue":
    case "invoice_created":
    case "payment_confirmed":
      return "invoice";
    case "quote_expiry":
    case "quote_sent":
      return "quote";
    case "review_request":
      return "service";
    default:
      return "service";
  }
}
function replaceVariables(template, vars) {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), value || "");
  }
  return result;
}
function getDelayMs(delay, unit) {
  switch (unit) {
    case "minutes":
      return delay * 60 * 1e3;
    case "hours":
      return delay * 60 * 60 * 1e3;
    case "days":
      return delay * 24 * 60 * 60 * 1e3;
    default:
      return delay * 60 * 60 * 1e3;
  }
}
function initNotificationScheduler() {
  if (process.env.DISABLE_AUTO_REMINDERS === "true") {
    console.log("[NotificationScheduler] Automatic reminders are disabled (DISABLE_AUTO_REMINDERS=true)");
    return;
  }
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
  }
  schedulerInterval = setInterval(async () => {
    cleanupOldKeys();
    await checkReservationReminders();
    await checkInvoiceOverdue();
    await checkQuoteExpiry();
    await checkReviewRequests();
  }, 5 * 60 * 1e3);
  console.log("[NotificationScheduler] Scheduler initialized - checking every 5 minutes");
}

// server/index.ts
if (!process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID && process.env.REPLIT_OBJECT_STORAGE_BUCKET_ID) {
  process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID = process.env.REPLIT_OBJECT_STORAGE_BUCKET_ID;
}
var app2 = express3();
app2.set("trust proxy", 1);
app2.use("/api/webhooks/stripe", express3.raw({ type: "application/json" }));
app2.use((req, res, next) => {
  const multerPaths = [
    "/api/ocr/",
    "/api/mobile/upload",
    "/api/mobile/quotes",
    "/api/mobile/invoices",
    "/api/mobile/admin/",
    "/api/gallery/bulk-upload",
    "/api/gallery/import"
  ];
  if (multerPaths.some((p) => req.path.startsWith(p))) {
    return next();
  }
  fileUpload({
    limits: { fileSize: 500 * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })(req, res, next);
});
app2.use((req, res, next) => {
  if (req.path === "/api/webhooks/stripe") return next();
  express3.json({ limit: "15mb" })(req, res, next);
});
app2.use(express3.urlencoded({ extended: false }));
app2.use("/uploads", async (req, res, next) => {
  const localPath = path12.join(process.cwd(), "uploads", req.path);
  if (fs9.existsSync(localPath) && fs9.statSync(localPath).isFile()) {
    return express3.static("./uploads")(req, res, next);
  }
  try {
    const { ObjectStorageService: ObjectStorageService3 } = await Promise.resolve().then(() => (init_object_storage(), object_storage_exports));
    const objStore = new ObjectStorageService3();
    const filename = req.path.startsWith("/") ? req.path.slice(1) : req.path;
    const basename2 = path12.basename(filename);
    const pathsToTry = [`uploads/${filename}`, filename, `uploads/${basename2}`, basename2];
    for (const storagePath of pathsToTry) {
      try {
        const file = await objStore.getObjectEntityFile(storagePath);
        await objStore.downloadObject(file, res);
        return;
      } catch (e) {
      }
    }
    next();
  } catch (err2) {
    console.error(`[MediaFallback] Error:`, err2?.message ?? err2);
    next();
  }
});
app2.use((req, res, next) => {
  if (process.env.MAINTENANCE_MODE !== "true") return next();
  const isPanelRoute = req.path.startsWith("/panel") || req.path.startsWith("/api/panel");
  const isHealthCheck = req.path === "/api/health" || req.path === "/health";
  if (isPanelRoute || isHealthCheck) return next();
  if (req.path.startsWith("/api/")) {
    return res.status(503).json({ message: "Service temporairement indisponible pour maintenance. R\xE9essayez dans quelques instants." });
  }
  next();
});
app2.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 120) logLine = logLine.slice(0, 119) + "\u2026";
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = createServer(app2);
  await registerRoutes(app2, server);
  app2.use((err2, _req, res, _next) => {
    const status = err2.status || err2.statusCode || 500;
    res.status(status).json({ message: err2.message || "Internal Server Error" });
  });
  const port = parseInt(process.env.PORT || "5000", 10);
  if (app2.get("env") === "development") {
    await setupVite(app2, server);
  } else {
    serveStatic(app2);
  }
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
    initBackupScheduler();
    updateBackupSchedule({ enabled: true, time: "21:00", emailEnabled: false, emailRecipient: "" });
    initDailyReportScheduler();
    initNotificationScheduler();
  });
})();
