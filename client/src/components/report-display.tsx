import { useState } from "react";
import { Download, Info, AlertTriangle, AlertCircle, TriangleAlert, CheckSquare, Square, TrendingUp, Minus, TrendingDown, Ban } from "lucide-react";

export interface ReportSection {
  title: string;
  content: string;
  severity?: "low" | "medium" | "high" | "critical";
}

export interface ScoreBreakdown {
  fiabilite: number;
  cout: number;
  securite: number;
  praticite: number;
}

export interface PurchaseRecommendation {
  score: number;
  scoreBreakdown: ScoreBreakdown;
  verdict: "BONNE AFFAIRE" | "CORRECT" | "RISQUÉ" | "À ÉVITER";
  negotiationTips: string[];
  inspectionChecklist: string[];
}

export interface GeneratedReport {
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    mileage?: string;
    issue?: string;
    finition?: string;
    motorisation?: string;
    puissance?: string;
    carburant?: string;
    gearbox?: string;
    usage?: string | string[];
    prix?: string;
  };
  summary: string;
  sections: ReportSection[];
  recommendations: string[];
  estimatedCost?: string;
  urgencyLevel: "low" | "medium" | "high" | "critical";
  purchaseRecommendation?: PurchaseRecommendation;
  generatedAt: string;
}

export const SEVERITY_CONFIG = {
  low:      { label: "Faible",   color: "#22c55e", bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)",  Icon: Info },
  medium:   { label: "Moyen",    color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", Icon: AlertTriangle },
  high:     { label: "Élevé",    color: "#f97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)", Icon: AlertCircle },
  critical: { label: "Critique", color: "#CE1126", bg: "rgba(206,17,38,0.08)",  border: "rgba(206,17,38,0.2)",  Icon: TriangleAlert },
};

const VERDICT_CONFIG = {
  "BONNE AFFAIRE": { color: "#22c55e", bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.2)",  Icon: TrendingUp,   label: "Bonne affaire — excellent rapport qualité/risque" },
  "CORRECT":       { color: "#3b82f6", bg: "rgba(59,130,246,0.07)", border: "rgba(59,130,246,0.2)", Icon: Minus,        label: "Correct — acceptable mais quelques vérifications s'imposent" },
  "RISQUÉ":        { color: "#f97316", bg: "rgba(249,115,22,0.07)", border: "rgba(249,115,22,0.2)", Icon: TrendingDown, label: "Risqué — des problèmes identifiés, négociez le prix" },
  "À ÉVITER":      { color: "#CE1126", bg: "rgba(206,17,38,0.07)",  border: "rgba(206,17,38,0.2)",  Icon: Ban,          label: "À éviter — les risques déconseillent fortement cet achat" },
};

export function SeverityBadge({ severity }: { severity: keyof typeof SEVERITY_CONFIG }) {
  const cfg = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.medium;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      <span className="h-1.5 w-1.5 rounded-full inline-block" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
}

function ScoreRing({ score, size = 72 }: { score: number; size?: number }) {
  const clamped = Math.min(10, Math.max(0, score));
  const color = clamped >= 8 ? "#22c55e" : clamped >= 6 ? "#3b82f6" : clamped >= 4 ? "#f97316" : "#CE1126";
  const r = 22;
  const circ = 2 * Math.PI * r;
  const pct = clamped / 10;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div style={{ width: size, height: size }} className="relative">
        <svg viewBox="0 0 52 52" className="w-full h-full -rotate-90">
          <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
          <circle
            cx="26" cy="26" r={r}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.7s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-black leading-none" style={{ color, fontSize: size * 0.27 }}>{clamped.toFixed(1)}</span>
          <span className="text-white/25 font-mono" style={{ fontSize: size * 0.12 }}>/10</span>
        </div>
      </div>
    </div>
  );
}

function SubScoreBar({ label, value }: { label: string; value: number }) {
  const clamped = Math.min(10, Math.max(0, value));
  const color = clamped >= 8 ? "#22c55e" : clamped >= 6 ? "#3b82f6" : clamped >= 4 ? "#f97316" : "#CE1126";
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-white/40 font-mono">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{clamped.toFixed(1)}/10</span>
      </div>
      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${clamped * 10}%`, background: color, transition: "width 0.7s ease" }}
        />
      </div>
    </div>
  );
}

function PurchaseRecommendationCard({ pr, onSignupPrompt }: { pr: PurchaseRecommendation; onSignupPrompt?: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const vcfg = VERDICT_CONFIG[pr.verdict] || VERDICT_CONFIG["CORRECT"];
  const VerdictIcon = vcfg.Icon;

  const toggle = (i: number) => setChecked(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  const doneCount = checked.size;
  const totalCount = pr.inspectionChecklist.length;

  return (
    <div
      className="rounded-md p-4 space-y-4"
      style={{ background: vcfg.bg, border: `1px solid ${vcfg.border}` }}
    >
      <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">// VERDICT_EXPERT</p>

      {/* Score + Verdict */}
      <div className="flex items-center gap-4">
        <ScoreRing score={pr.score} size={72} />
        <div className="flex flex-col gap-2 flex-1">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-black self-start"
            style={{ color: vcfg.color, background: `${vcfg.color}18`, border: `1px solid ${vcfg.border}` }}
          >
            <VerdictIcon className="h-3.5 w-3.5" />
            {pr.verdict}
          </span>
          <p className="text-[11px] text-white/40 leading-tight">{vcfg.label}</p>
        </div>
      </div>

      {/* Score breakdown — always rendered (mandatory field) */}
      <div className="space-y-2 pt-1">
        <p className="text-[10px] text-white/25 uppercase tracking-wider font-mono mb-2">// SOUS-SCORES</p>
        <SubScoreBar label="Fiabilité" value={pr.scoreBreakdown.fiabilite} />
        <SubScoreBar label="Coût" value={pr.scoreBreakdown.cout} />
        <SubScoreBar label="Sécurité" value={pr.scoreBreakdown.securite} />
        <SubScoreBar label="Praticité" value={pr.scoreBreakdown.praticite} />
      </div>

      {/* Negotiation tips */}
      {pr.negotiationTips.length > 0 && (
        <div>
          <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono mb-2">// ARGUMENTS_NÉGOCIATION</p>
          <ul className="space-y-2">
            {pr.negotiationTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="shrink-0 mt-0.5 text-[10px] font-black px-1.5 py-0.5 rounded"
                  style={{ color: "#C9A656", background: "rgba(201,166,86,0.12)", border: "1px solid rgba(201,166,86,0.2)" }}
                >
                  €
                </span>
                <span className="text-xs text-white/65 leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Checklist */}
      {pr.inspectionChecklist.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">// CHECKLIST_AVANT_ACHAT</p>
            {totalCount > 0 && (
              <span className="text-[10px] font-mono" style={{ color: doneCount === totalCount ? "#22c55e" : "#f59e0b" }}>
                {doneCount}/{totalCount} vérifiés
              </span>
            )}
          </div>
          <ul className="space-y-2">
            {pr.inspectionChecklist.map((item, i) => {
              const done = checked.has(i);
              return (
                <li
                  key={i}
                  className="flex items-start gap-2 cursor-pointer group"
                  onClick={() => toggle(i)}
                >
                  {done
                    ? <CheckSquare className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                    : <Square className="h-3.5 w-3.5 shrink-0 mt-0.5 text-white/25 group-hover:text-white/50 transition-colors" />
                  }
                  <span
                    className="text-xs leading-relaxed transition-colors"
                    style={{ color: done ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.65)", textDecoration: done ? "line-through" : "none" }}
                  >
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ReportDisplay({
  report,
  onSignupPrompt,
}: {
  report: GeneratedReport;
  onSignupPrompt?: () => void;
}) {
  const handleDownload = async () => {
    try {
      const res = await fetch("/api/reports/download-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });
      if (res.status === 401) {
        if (onSignupPrompt) {
          onSignupPrompt();
        } else {
          const proceed = window.confirm(
            "Le téléchargement PDF est réservé aux membres inscrits.\n\nCréer un compte gratuit maintenant ?"
          );
          if (proceed) window.location.href = "/signup";
        }
        return;
      }
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rapport-${report.vehicleInfo.make}-${report.vehicleInfo.model}-${Date.now()}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Impossible de télécharger le rapport");
    }
  };

  const urgencyCfg = SEVERITY_CONFIG[report.urgencyLevel] || SEVERITY_CONFIG.medium;
  const UrgencyIcon = urgencyCfg.Icon;

  return (
    <div className="space-y-4">

      {/* Verdict + Score — element principal */}
      {report.purchaseRecommendation && (
        <PurchaseRecommendationCard pr={report.purchaseRecommendation} onSignupPrompt={onSignupPrompt} />
      )}

      {/* Urgency strip */}
      <div
        className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-md"
        style={{ background: urgencyCfg.bg, border: `1px solid ${urgencyCfg.border}` }}
      >
        <div className="flex items-center gap-2">
          <UrgencyIcon className="h-3.5 w-3.5" style={{ color: urgencyCfg.color }} />
          <span className="text-xs font-bold text-white/80">Niveau d'urgence : <span style={{ color: urgencyCfg.color }}>{urgencyCfg.label}</span></span>
        </div>
        {report.estimatedCost && (
          <span className="text-xs font-mono font-bold shrink-0" style={{ color: "#C9A656" }}>
            {report.estimatedCost}
          </span>
        )}
      </div>

      {/* Summary / Bilan rapide */}
      <div className="hud-card rounded-md p-4">
        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2 font-mono">// BILAN_RAPIDE</p>
        <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{report.summary}</p>
      </div>

      {/* Sections */}
      {(report.sections || []).length > 0 && (
        <div className="space-y-3">
          <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">// ANALYSE_DÉTAILLÉE</p>
          {(report.sections || []).map((section, i) => {
            const sev = section.severity || "medium";
            const cfg = SEVERITY_CONFIG[sev as keyof typeof SEVERITY_CONFIG] || SEVERITY_CONFIG.medium;
            return (
              <div
                key={i}
                className="rounded-md p-4"
                style={{ background: cfg.bg, borderLeft: `3px solid ${cfg.color}`, border: `1px solid ${cfg.border}`, borderLeftWidth: 3 }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="text-sm font-bold text-white/90">{section.title}</h4>
                  <SeverityBadge severity={sev as keyof typeof SEVERITY_CONFIG} />
                </div>
                <p className="text-xs text-white/60 leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Recommendations / Conseils pratiques */}
      {(report.recommendations || []).length > 0 && (
        <div className="hud-card rounded-md p-4">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3 font-mono">// CONSEILS_PRATIQUES</p>
          <ol className="space-y-2.5">
            {report.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-sm bg-[#CE1126]/15 border border-[#CE1126]/25 text-[#CE1126] text-[10px] font-mono font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-white/65 leading-relaxed">{rec}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={handleDownload}
          data-testid="button-download-pdf"
          className="flex-1 flex items-center justify-center gap-2 bg-[#CE1126] hover:bg-[#b8101f] text-white text-xs font-bold py-2.5 rounded-md transition-colors neon-red-glow"
        >
          <Download className="h-3.5 w-3.5" />
          Télécharger le rapport
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
