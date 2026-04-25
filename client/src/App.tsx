// Local authentication with email/password
import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationBell } from "@/components/notification-bell";
import { UserMenu } from "@/components/user-menu";
import { useAuth } from "@/hooks/useAuth";
import { useWebSocket } from "@/hooks/useWebSocket";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import AuthSignIn from "@/pages/auth-signin";
import AuthSignUp from "@/pages/auth-signup";
import ClientDashboard from "@/pages/client-dashboard";
import ClientQuotes from "@/pages/client-quotes";
import ClientInvoices from "@/pages/client-invoices";
import AdminDashboard from "@/pages/admin-dashboard";
import Services from "@/pages/services";
import AdminQuotes from "@/pages/admin-quotes";
import AdminServices from "@/pages/admin-services";
import AdminInvoices from "@/pages/admin-invoices";
import AdminInvoiceEdit from "@/pages/admin-invoice-edit";
import AdminQuoteEdit from "@/pages/admin-quote-edit";
import AdminReservations from "@/pages/admin-reservations";
import AdminCalendar from "@/pages/admin-calendar";
import AdminSettings from "@/pages/admin-settings";
import AdminUsers from "@/pages/admin-users";
import AdminEngagements from "@/pages/admin-engagements";
import AdminServiceWorkflows from "@/pages/admin-service-workflows";
import AdminAuditLogs from "@/pages/admin-audit-logs";
import AdminSmsLogs from "@/pages/admin-sms-logs";
import WorkshopManagement from "@/pages/workshop-management";
import EmployeeServices from "@/pages/employee-services";
import ForgotPassword from "@/pages/forgot-password";
import ResetPassword from "@/pages/reset-password";
import InternalChat from "@/pages/internal-chat";
import AdminBackups from "@/pages/admin-backups";
import AdminGarages from "@/pages/admin-garages";
import AdminDeliveryNotes from "@/pages/admin-delivery-notes";
import PanelApp from "@/panel/PanelApp";
import PublicQuoteView from "@/pages/public-quote-view";
import PublicInvoiceView from "@/pages/public-invoice-view";
import PublicReview from "@/pages/public-review";
import AdminReviews from "@/pages/admin-reviews";
import AdminClients from "@/pages/admin-clients";
import AdminTeam from "@/pages/admin-team";

import AdminPayments from "@/pages/admin-payments";
import AdminBankConnection from "@/pages/admin-bank-connection";
import PaymentSuccess from "@/pages/payment-success";
import PaymentCancel from "@/pages/payment-cancel";
import PaymentCheckout from "@/pages/payment-checkout";
import AdminAccounting from "@/pages/admin-accounting";
import AdminExpenses from "@/pages/admin-expenses";
import AdminCreditNotes from "@/pages/admin-credit-notes";
import AdminScanner from "@/pages/admin-scanner";
import AdminAdvancedAnalytics from "@/pages/admin-advanced-analytics";
import AdminNotificationSettings from "@/pages/admin-notification-settings";
import ClientChat from "@/pages/client-chat";
import SupportPage from "@/pages/support";
import AdminCSVImport from "@/pages/admin-csv-import";
import AdminAppLogs from "@/pages/admin-app-logs";
import AdminImports from "@/pages/admin-imports";
import AdminGallery from "@/pages/admin-gallery";
import PrivacyPolicy from "@/pages/privacy-policy";
import Legal from "@/pages/legal";
import { AutoReportLogo } from "@/components/autoreport-logo";
import { lazy, Suspense } from "react";
const DashboardHome = lazy(() => import("@/pages/dashboard/DashboardHome"));
const DashboardReports = lazy(() => import("@/pages/dashboard/MyReports"));
const DashboardSubscriptions = lazy(() => import("@/pages/dashboard/Subscriptions"));
const DashboardInvoices = lazy(() => import("@/pages/dashboard/Invoices"));
const DashboardSupport = lazy(() => import("@/pages/dashboard/Support"));


function Router() {
  const { isAuthenticated, isLoading, isAdmin, isSuperAdmin, isRootAdmin, isEmployee } = useAuth();
  const [location] = useLocation();
  useWebSocket(); // Initialize WebSocket connection

  // Panel has its own JWT auth — serve it independently before SaaS auth checks
  if (location === "/panel" || location.startsWith("/panel/")) {
    return <PanelApp />;
  }

  if (isLoading) {
    return (
      <Switch>
        <Route path="/devis/:token" component={PublicQuoteView} />
        <Route path="/facture/:token" component={PublicInvoiceView} />
        <Route path="/avis/:token" component={PublicReview} />
        <Route>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Chargement...</p>
            </div>
          </div>
        </Route>
      </Switch>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Switch>
          <Route path="/">{() => <Landing isAdmin={isAdmin || isSuperAdmin} />}</Route>
          <Route path="/legal" component={Legal} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/login">
            <Redirect to="/signin" />
          </Route>
          <Route path="/signin" component={AuthSignIn} />
          <Route path="/signup" component={AuthSignUp} />
          <Route path="/devis/:token" component={PublicQuoteView} />
          <Route path="/facture/:token" component={PublicInvoiceView} />
          <Route path="/avis/:token" component={PublicReview} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route path="/payment/checkout" component={PaymentCheckout} />
          <Route path="/payment/success" component={PaymentSuccess} />
          <Route path="/payment/cancel" component={PaymentCancel} />
          <Route>
            <Redirect to="/signin" />
          </Route>
        </Switch>
      </>
    );
  }

  if (isAdmin || isSuperAdmin) {
    const style = {
      "--sidebar-width": "16rem",
      "--sidebar-width-icon": "3rem",
    };

    return (
      <>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between gap-2 p-2 sm:p-4 header-glass shrink-0 sticky top-0 z-50">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex items-center gap-1 sm:gap-2">
                  <NotificationBell />
                  <ThemeToggle />
                  <UserMenu />
                </div>
              </header>
              <main className="flex-1 overflow-auto page-transition">
                <Switch>
                  <Route path="/devis/:token" component={PublicQuoteView} />
                  <Route path="/facture/:token" component={PublicInvoiceView} />
                  <Route path="/avis/:token" component={PublicReview} />
                  <Route path="/dashboard/dashboard" component={AdminDashboard} />
                  <Route path="/dashboard" component={AdminDashboard} />
                  <Route path="/dashboard/engagements" component={AdminEngagements} />
                  <Route path="/dashboard/service-workflows" component={AdminServiceWorkflows} />
                  <Route path="/dashboard/services" component={AdminServices} />
                  <Route path="/dashboard/quotes/:id/edit" component={AdminQuoteEdit} />
                  <Route path="/dashboard/quotes" component={AdminQuotes} />
                  <Route path="/dashboard/invoices/:id/edit" component={AdminInvoiceEdit} />
                  <Route path="/dashboard/invoices" component={AdminInvoices} />
                  <Route path="/payment/checkout" component={PaymentCheckout} />
                  <Route path="/payment/success" component={PaymentSuccess} />
                  <Route path="/payment/cancel" component={PaymentCancel} />
                  <Route path="/dashboard/delivery-notes" component={AdminDeliveryNotes} />
                  <Route path="/dashboard/reservations" component={AdminReservations} />
                  <Route path="/dashboard/calendar" component={AdminCalendar} />
                  <Route path="/dashboard/workshop" component={WorkshopManagement} />
                  <Route path="/dashboard/services-catalog" component={EmployeeServices} />
                  <Route path="/dashboard/users" component={AdminUsers} />
                  <Route path="/dashboard/audit-logs" component={AdminAuditLogs} />
                  <Route path="/dashboard/sms-logs" component={AdminSmsLogs} />
                  <Route path="/dashboard/settings" component={AdminSettings} />
                  <Route path="/dashboard/chat" component={InternalChat} />
                  <Route path="/dashboard/backups" component={AdminBackups} />
                  <Route path="/dashboard/garages" component={AdminGarages} />
                  <Route path="/dashboard/reviews" component={AdminReviews} />
                  <Route path="/dashboard/clients" component={AdminClients} />
                  <Route path="/dashboard/team" component={AdminTeam} />
                  
                  <Route path="/dashboard/payments" component={AdminPayments} />
                  <Route path="/dashboard/bank-connection" component={AdminBankConnection} />
                  <Route path="/dashboard/advanced-analytics" component={AdminAdvancedAnalytics} />

                  {/* Accounting routes restricted for employees */}
                  {!isEmployee && (
                    <>
                      <Route path="/dashboard/accounting" component={AdminAccounting} />
                      <Route path="/dashboard/expenses" component={AdminExpenses} />
                      <Route path="/dashboard/credit-notes" component={AdminCreditNotes} />
                    </>
                  )}

                  <Route path="/dashboard/scanner" component={AdminScanner} />
                  <Route path="/dashboard/gallery" component={AdminGallery} />
                  <Route path="/dashboard/engagements/:id/gallery" component={AdminGallery} />
                  <Route path="/dashboard/import-csv" component={AdminCSVImport} />
                  {isRootAdmin && (
                    <>
                      <Route path="/dashboard/app-logs" component={AdminAppLogs} />
                      <Route path="/dashboard/imports" component={AdminImports} />
                    </>
                  )}
                  <Route path="/dashboard/notification-settings" component={AdminNotificationSettings} />
                  <Route path="/privacy" component={PrivacyPolicy} />
                  <Route path="/support" component={SupportPage} />
                  <Route path="/login">
                    <Redirect to="/signin" />
                  </Route>
                  <Route path="/admin">
                    <Redirect to="/dashboard" />
                  </Route>
                  <Route path="/admin/:rest*">
                    <Redirect to="/dashboard" />
                  </Route>
                  <Route path="/">{() => <Landing isAdmin={true} />}</Route>
                  <Route>
                    <Redirect to="/dashboard" />
                  </Route>
                </Switch>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col h-screen">
        <main className="flex-1 overflow-auto">
          <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Chargement…</div>}>
            <Switch>
              <Route path="/privacy" component={PrivacyPolicy} />
              <Route path="/payment/checkout" component={PaymentCheckout} />
              <Route path="/payment/success" component={PaymentSuccess} />
              <Route path="/payment/cancel" component={PaymentCancel} />
              <Route path="/dashboard" component={DashboardHome} />
              <Route path="/dashboard/reports" component={DashboardReports} />
              <Route path="/dashboard/subscriptions" component={DashboardSubscriptions} />
              <Route path="/dashboard/invoices" component={DashboardInvoices} />
              <Route path="/dashboard/support" component={DashboardSupport} />
              <Route path="/">{() => <Landing />}</Route>
              <Route path="/login">
                <Redirect to="/signin" />
              </Route>
              <Route path="/signin">
                <Redirect to="/dashboard" />
              </Route>
              <Route path="/signup">
                <Redirect to="/dashboard" />
              </Route>
              <Route>
                <Redirect to="/dashboard" />
              </Route>
            </Switch>
          </Suspense>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
