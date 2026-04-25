import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { FileText, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

export default function DashboardHome() {
  const { data: stats, isLoading } = useQuery<{
    totalReports: number;
    recentReports: Array<{ id: string; make: string; model: string; year: string; createdAt: string; severity?: string }>;
    subscription: { status: string; planName?: string; reportsUsed: number; reportsIncluded: number; periodEnd?: string } | null;
  }>({
    queryKey: ["/api/user/dashboard-stats"],
  });

  return (
    <DashboardLayout title="Tableau de bord">
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="hud-card rounded-md p-5 bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Rapports</span>
            <FileText className="h-4 w-4 text-[#CE1126]" />
          </div>
          <div className="text-3xl font-extrabold font-mono" data-testid="text-stats-reports">
            {isLoading ? "—" : stats?.totalReports ?? 0}
          </div>
          <p className="text-xs text-white/40 mt-1">Diagnostics générés</p>
        </div>

        <div className="hud-card rounded-md p-5 bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Abonnement</span>
            <CreditCard className="h-4 w-4 text-[#CE1126]" />
          </div>
          <div className="text-base font-bold" data-testid="text-stats-subscription">
            {isLoading ? "—" : stats?.subscription?.planName || "Aucun"}
          </div>
          <p className="text-xs text-white/40 mt-1">
            {stats?.subscription
              ? `${stats.subscription.reportsUsed}/${stats.subscription.reportsIncluded} utilisés`
              : "Aucun abonnement actif"}
          </p>
        </div>

        <div className="hud-card rounded-md p-5 bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Statut</span>
            {stats?.subscription?.status === "active" ? (
              <CheckCircle2 className="h-4 w-4 text-[#22c55e]" />
            ) : (
              <AlertCircle className="h-4 w-4 text-white/30" />
            )}
          </div>
          <div className="text-base font-bold capitalize" data-testid="text-stats-status">
            {isLoading ? "—" : stats?.subscription?.status === "active" ? "Actif" : "Inactif"}
          </div>
          <p className="text-xs text-white/40 mt-1">État du compte</p>
        </div>
      </div>

      <div className="hud-card rounded-md p-5 bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider">Derniers rapports</h2>
          <Link href="/dashboard/reports" className="text-xs text-[#CE1126] hover:underline" data-testid="link-view-all-reports">
            Voir tout →
          </Link>
        </div>
        {isLoading ? (
          <p className="text-sm text-white/40 py-4 text-center">Chargement…</p>
        ) : stats?.recentReports?.length ? (
          <div className="divide-y divide-white/[0.04]">
            {stats.recentReports.slice(0, 5).map((r) => (
              <div key={r.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold">{r.make} {r.model}</p>
                  <p className="text-xs text-white/40 font-mono">
                    {r.year} · {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <Link
                  href="/dashboard/reports"
                  className="text-xs text-white/60 hover:text-white"
                  data-testid={`link-report-${r.id}`}
                >
                  Voir →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/40 py-4 text-center">Aucun rapport pour le moment</p>
        )}
      </div>
    </DashboardLayout>
  );
}
