import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Download, Info, AlertTriangle, AlertCircle, TriangleAlert } from "lucide-react";

export interface ReportSection {
  title: string;
  content: string;
  severity?: "low" | "medium" | "high" | "critical";
}

export interface GeneratedReport {
  vehicleInfo: { make: string; model: string; year: string; mileage?: string; issue: string };
  summary: string;
  sections: ReportSection[];
  recommendations: string[];
  estimatedCost?: string;
  urgencyLevel: "low" | "medium" | "high" | "critical";
  generatedAt: string;
}

export const SEVERITY_CONFIG = {
  low:      { label: "Faible",   color: "#22c55e", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.3)",  Icon: Info },
  medium:   { label: "Moyen",    color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", Icon: AlertTriangle },
  high:     { label: "Élevé",    color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)", Icon: AlertCircle },
  critical: { label: "Critique", color: "#CE1126", bg: "rgba(206,17,38,0.1)",  border: "rgba(206,17,38,0.3)",  Icon: TriangleAlert },
};

export function SeverityBadge({ severity }: { severity: keyof typeof SEVERITY_CONFIG }) {
  const cfg = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.medium;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      <span className="h-1.5 w-1.5 rounded-full inline-block" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
}

export default function ReportDisplay({ report }: { report: GeneratedReport }) {
  const handleDownload = async () => {
    try {
      const res = await fetch("/api/reports/download-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });
      if (res.status === 401) {
        const proceed = window.confirm(
          "Le téléchargement PDF est réservé aux membres inscrits.\n\nCréer un compte gratuit maintenant ?"
        );
        if (proceed) window.location.href = "/auth?tab=register";
        return;
      }
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `diagnostic-${report.vehicleInfo.make}-${Date.now()}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Impossible de télécharger le PDF");
    }
  };

  const urgencyCfg = SEVERITY_CONFIG[report.urgencyLevel] || SEVERITY_CONFIG.medium;
  const UrgencyIcon = urgencyCfg.Icon;

  const sectionsByGroup = (report.sections || []).reduce((acc, s) => {
    const sev = s.severity || "medium";
    acc[sev] = (acc[sev] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(sectionsByGroup).map(([sev, count]) => ({
    name: SEVERITY_CONFIG[sev as keyof typeof SEVERITY_CONFIG]?.label || sev,
    value: count,
    color: SEVERITY_CONFIG[sev as keyof typeof SEVERITY_CONFIG]?.color || "#888",
  }));

  return (
    <div className="space-y-4">
      <div
        className="flex items-center justify-between gap-3 px-4 py-3 rounded-md"
        style={{ background: urgencyCfg.bg, border: `1px solid ${urgencyCfg.border}` }}
      >
        <div className="flex items-center gap-2">
          <UrgencyIcon className="h-4 w-4" style={{ color: urgencyCfg.color }} />
          <span className="text-sm font-bold text-white">Urgence : {urgencyCfg.label}</span>
        </div>
        {report.estimatedCost && (
          <span className="text-xs font-mono font-bold" style={{ color: "#C9A656" }}>
            {report.estimatedCost}
          </span>
        )}
      </div>

      <div className="hud-card rounded-md p-4">
        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2 font-mono">// RÉSUMÉ_DIAGNOSTIC</p>
        <p className="text-sm text-white/80 leading-relaxed">{report.summary}</p>
      </div>

      {chartData.length > 1 && (
        <div className="hud-card rounded-md p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-32 h-32 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={28} outerRadius={52} strokeWidth={0}>
                  {chartData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0a0a14", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#fff", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3 font-mono">// DISTRIBUTION_SÉVÉRITÉ</p>
            <div className="space-y-1.5">
              {chartData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: d.color }} />
                  <span className="text-xs text-white/60">{d.name}</span>
                  <span className="ml-auto text-xs font-mono font-bold" style={{ color: d.color }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">// ANALYSE_DÉTAILLÉE</p>
        {(report.sections || []).map((section, i) => {
          const sev = section.severity || "medium";
          return (
            <div
              key={i}
              className={`rounded-md p-4 border-l-2 severity-${sev}`}
              style={{ background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm font-bold text-white/90">{section.title}</h4>
                <SeverityBadge severity={sev as keyof typeof SEVERITY_CONFIG} />
              </div>
              <p className="text-xs text-white/55 leading-relaxed">{section.content}</p>
            </div>
          );
        })}
      </div>

      {(report.recommendations || []).length > 0 && (
        <div className="hud-card rounded-md p-4">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3 font-mono">// RECOMMANDATIONS</p>
          <ol className="space-y-2">
            {report.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-sm bg-[#CE1126]/20 border border-[#CE1126]/30 text-[#CE1126] text-[10px] font-mono font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-white/65 leading-relaxed">{rec}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          data-testid="button-download-pdf"
          className="flex-1 flex items-center justify-center gap-2 bg-[#CE1126] hover:bg-[#b8101f] text-white text-xs font-bold py-2.5 rounded-md transition-colors neon-red-glow"
        >
          <Download className="h-3.5 w-3.5" />
          Exporter PDF
        </button>
        <button
          onClick={() => window.location.reload()}
          data-testid="button-new-report"
          className="px-4 text-xs text-white/40 border border-white/10 rounded-md hover:border-white/20 hover:text-white/60 transition-all"
        >
          Nouveau
        </button>
      </div>
    </div>
  );
}
