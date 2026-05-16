import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, LayoutDashboard, FileText, CreditCard, Receipt, LifeBuoy, LogOut, ShieldCheck } from "lucide-react";
import { AutoReportLogo } from "@/components/autoreport-logo";
import { queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { href: "/", label: "Accueil", icon: Home, exact: true },
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/reports", label: "Mes rapports", icon: FileText },
  { href: "/dashboard/subscriptions", label: "Abonnements & paiements", icon: CreditCard },
  { href: "/dashboard/invoices", label: "Factures", icon: Receipt },
  { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
];

export default function DashboardLayout({ children, title }: { children: ReactNode; title: string }) {
  const [location] = useLocation();
  const { isAdmin } = useAuth();

  const isActive = (href: string, exact?: boolean) =>
    exact ? location === href : location === href || location.startsWith(href + "/");

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
    } catch {}
    queryClient.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6 gap-3">
          <AutoReportLogo />
          <div className="flex items-center gap-2">
            {isAdmin && (
              <a
                href="/dashboard"
                data-testid="link-dashboard-admin"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-amber-400/40 hover:border-amber-300/60 hover:bg-amber-400/[0.06] text-amber-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Espace Admin</span>
              </a>
            )}
            <button
              onClick={handleLogout}
              data-testid="button-logout"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" /> Déconnexion
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <aside className="lg:sticky lg:top-6 self-start">
            <div className="hud-card rounded-md p-3 bg-white/[0.02] border border-white/[0.06]">
              <p className="text-[10px] font-mono text-[#CE1126] uppercase tracking-[0.2em] px-2 mb-3">// ESPACE_CLIENT</p>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href, item.exact);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      data-testid={`link-dashboard-${item.href.split("/").pop() || "home"}`}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                        active
                          ? "bg-[#CE1126]/15 text-white border border-[#CE1126]/30"
                          : "text-white/60 hover:text-white hover:bg-white/[0.04] border border-transparent"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">{title}</h1>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
