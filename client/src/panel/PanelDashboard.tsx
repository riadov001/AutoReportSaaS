import { useEffect, useState } from "react";
import { panelFetch } from "./usePanelAuth";
import { BarChart2, FileText, AlertTriangle, CheckCircle, Clock, Wrench, TrendingUp, Car } from "lucide-react";

interface Stats {
  total: number;
  byUrgency: { low: number; medium: number; high: number; critical: number };
  topMakes: { name: string; count: number }[];
  last30Days: { date: string; count: number }[];
}

export default function PanelDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    panelFetch("/api/panel/stats")
      .then(r => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  const urgencyConfig = {
    critical: { label: "Critique", color: "#CE1126", icon: AlertTriangle },
    high: { label: "Élevé", color: "#FF6B35", icon: AlertTriangle },
    medium: { label: "Moyen", color: "#FFB800", icon: Clock },
    low: { label: "Faible", color: "#22C55E", icon: CheckCircle },
  };

  const maxDayCount = stats ? Math.max(...stats.last30Days.map(d => d.count), 1) : 1;
  const maxMakeCount = stats ? Math.max(...stats.topMakes.map(m => m.count), 1) : 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Vue d'ensemble des diagnostics AutoReport</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-md h-28 animate-pulse" />
          ))}
        </div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.entries(urgencyConfig) as Array<[keyof typeof urgencyConfig, typeof urgencyConfig.critical]>).map(([key, cfg]) => {
              const Icon = cfg.icon;
              return (
                <div key={key} className="bg-white/[0.03] border border-white/[0.06] rounded-md p-4" data-testid={`card-urgency-${key}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: cfg.color }}>{cfg.label}</span>
                    <Icon className="h-4 w-4" style={{ color: cfg.color }} />
                  </div>
                  <div className="text-3xl font-bold text-white">{stats.byUrgency[key] || 0}</div>
                  <div className="text-xs text-white/30 mt-1">rapports</div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 bg-white/[0.03] border border-white/[0.06] rounded-md p-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-4 w-4 text-[#CE1126]" />
                <span className="text-sm font-semibold text-white">Total Rapports</span>
              </div>
              <div className="text-4xl font-black text-white" data-testid="stat-total-reports">{stats.total}</div>
              <div className="text-xs text-white/30 mt-1">diagnostics générés</div>
            </div>

            <div className="md:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-md p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-[#CE1126]" />
                <span className="text-sm font-semibold text-white">Activité 30 jours</span>
              </div>
              <div className="flex items-end gap-0.5 h-20">
                {stats.last30Days.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div
                      className="w-full rounded-sm transition-all"
                      style={{
                        height: `${Math.max((d.count / maxDayCount) * 100, d.count > 0 ? 8 : 0)}%`,
                        backgroundColor: d.count > 0 ? "#CE1126" : "rgba(255,255,255,0.05)",
                      }}
                      title={`${d.date}: ${d.count}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-white/20 mt-2">
                <span>-30j</span>
                <span>Aujourd'hui</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-md p-4">
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-4 w-4 text-[#CE1126]" />
              <span className="text-sm font-semibold text-white">Top Marques</span>
            </div>
            {stats.topMakes.length === 0 ? (
              <p className="text-white/30 text-sm">Aucune donnée</p>
            ) : (
              <div className="space-y-3">
                {stats.topMakes.map((m) => (
                  <div key={m.name} className="flex items-center gap-3" data-testid={`row-make-${m.name}`}>
                    <span className="text-xs text-white/50 w-24 truncate capitalize">{m.name}</span>
                    <div className="flex-1 bg-white/[0.04] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#CE1126]"
                        style={{ width: `${(m.count / maxMakeCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/40 w-6 text-right">{m.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-white/40 text-sm">Erreur chargement stats</p>
      )}
    </div>
  );
}
