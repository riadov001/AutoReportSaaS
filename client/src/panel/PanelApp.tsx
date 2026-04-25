import { useState } from "react";
import { useLocation, Link } from "wouter";
import { usePanelAuth } from "./usePanelAuth";
import PanelLogin from "./PanelLogin";
import PanelDashboard from "./PanelDashboard";
import PanelReports from "./PanelReports";
import PanelRepairSheets from "./PanelRepairSheets";
import PanelSettings from "./PanelSettings";
import PanelFeatureFlags from "./PanelFeatureFlags";
import { AutoReportLogo } from "@/components/autoreport-logo";
import {
  LayoutDashboard,
  FileText,
  Wrench,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  Flag,
} from "lucide-react";

const NAV_ITEMS = [
  { path: "/panel", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/panel/reports", label: "Rapports", icon: FileText },
  { path: "/panel/repair-sheets", label: "Fiches Réparation", icon: Wrench },
  { path: "/panel/feature-flags", label: "Feature Flags", icon: Flag },
  { path: "/panel/settings", label: "Paramètres", icon: Settings },
];

export default function PanelApp() {
  const { user, isLoading, login, logout } = usePanelAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05050A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-2 border-[#CE1126]/30 border-t-[#CE1126] rounded-full animate-spin" />
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Initialisation...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <PanelLogin onLogin={login} />;
  }

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location === path;
    return location.startsWith(path);
  };

  const renderPage = () => {
    if (location === "/panel") return <PanelDashboard />;
    if (location.startsWith("/panel/reports")) return <PanelReports />;
    if (location.startsWith("/panel/repair-sheets")) return <PanelRepairSheets />;
    if (location.startsWith("/panel/feature-flags")) return <PanelFeatureFlags user={user} />;
    if (location.startsWith("/panel/settings")) return <PanelSettings user={user} />;
    return <PanelDashboard />;
  };

  const roleColor: Record<string, string> = {
    superadmin: "#FFD700",
    admin: "#CE1126",
    manager: "#4FA3E0",
  };
  const roleLabel: Record<string, string> = {
    superadmin: "Super Admin",
    admin: "Admin",
    manager: "Manager",
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.06]">
        <AutoReportLogo variant="icon" className="w-8 h-8 shrink-0" />
        {sidebarOpen && (
          <div>
            <div className="text-white font-bold text-sm tracking-tight">AutoReport</div>
            <div className="text-[#CE1126] text-[10px] uppercase tracking-[0.2em] font-semibold">Panel</div>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, item.exact);
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              data-testid={`nav-panel-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all group relative ${
                active
                  ? "bg-[#CE1126]/15 text-white"
                  : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#CE1126] rounded-r-full" />
              )}
              <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#CE1126]" : ""}`} />
              {sidebarOpen && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {sidebarOpen && active && (
                <ChevronRight className="ml-auto h-3 w-3 text-[#CE1126]/60" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.06] px-3 py-4">
        {sidebarOpen && (
          <div className="flex items-center gap-2 px-3 py-2 mb-2 bg-white/[0.03] rounded-md">
            <div className="h-7 w-7 rounded-full bg-[#CE1126]/20 flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-[#CE1126]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">
                {user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : user.email}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: roleColor[user.role] || "#fff" }}>
                {roleLabel[user.role] || user.role}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          data-testid="button-panel-logout"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-white/40 hover:text-white/80 hover:bg-white/[0.04] transition-all"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {sidebarOpen && <span className="text-sm font-medium">Déconnexion</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05050A] flex">
      <aside
        className={`hidden md:flex flex-col bg-[#0A0A0F] border-r border-white/[0.06] transition-all duration-200 shrink-0 ${
          sidebarOpen ? "w-56" : "w-[60px]"
        }`}
      >
        <SidebarContent />
      </aside>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileSidebarOpen(false)} />
          <aside className="relative z-10 w-56 bg-[#0A0A0F] border-r border-white/[0.06] flex flex-col">
            <div className="absolute top-4 right-4">
              <button onClick={() => setMobileSidebarOpen(false)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#080810]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSidebarOpen(!sidebarOpen); setMobileSidebarOpen(!mobileSidebarOpen); }}
              data-testid="button-panel-sidebar-toggle"
              className="text-white/40 hover:text-white transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-xs text-white/30">
              <span>Panel</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">
                {NAV_ITEMS.find(n => isActive(n.path, n.exact))?.label || "Dashboard"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-white/30 font-mono">Système actif</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
