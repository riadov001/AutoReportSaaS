import React, { useState } from "react";
import { Download, CheckSquare, Square, TrendingUp, Minus, TrendingDown, Ban, Link, RotateCcw } from "lucide-react";

function MarkdownContent({ text, className }: { text: string; className?: string }) {
  const lines = text.split("\n");
  return (
    <span className={className}>
      {lines.map((line, li) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <React.Fragment key={li}>
            {parts.map((part, i) =>
              part.startsWith("**") && part.endsWith("**")
                ? <strong key={i} className="font-semibold text-white/90">{part.slice(2, -2)}</strong>
                : <span key={i}>{part}</span>
            )}
            {li < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </span>
  );
}

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
  _reportId?: string;
}

export const SEVERITY_CONFIG = {
  low:      { label: "Faible",   color: "#22c55e", bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)" },
  medium:   { label: "Moyen",    color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
  high:     { label: "Élevé",    color: "#f97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)" },
  critical: { label: "Critique", color: "#CE1126", bg: "rgba(206,17,38,0.08)",  border: "rgba(206,17,38,0.2)" },
};

const VERDICT_ICONS: Record<string, React.ElementType> = {
  "BONNE AFFAIRE": TrendingUp,
  "CORRECT":       Minus,
  "RISQUÉ":        TrendingDown,
  "À ÉVITER":      Ban,
  "Acheter":       TrendingUp,
  "Négocier":      TrendingDown,
  "Éviter":        Ban,
};

const VERDICT_LABELS: Record<string, string> = {
  "BONNE AFFAIRE": "Bonne affaire — excellent rapport qualité/risque",
  "CORRECT":       "Correct — acceptable mais quelques vérifications s'imposent",
  "RISQUÉ":        "Risqué — des problèmes identifiés, négociez le prix",
  "À ÉVITER":      "À éviter — les risques déconseillent fortement cet achat",
  "Acheter":       "Bonne affaire — excellent rapport qualité/risque",
  "Négocier":      "Risqué — des problèmes identifiés, négociez le prix",
  "Éviter":        "À éviter — les risques déconseillent fortement cet achat",
};

const DEFAULT_SCORE_BREAKDOWN: ScoreBreakdown = { fiabilite: 5, cout: 5, securite: 5, praticite: 5 };

function normalizePR(pr: PurchaseRecommendation): Required<PurchaseRecommendation> {
  const sb = (pr.scoreBreakdown as ScoreBreakdown | undefined) ?? DEFAULT_SCORE_BREAKDOWN;
  return {
    ...pr,
    scoreBreakdown: {
      fiabilite: Number(sb.fiabilite) || 5,
      cout: Number(sb.cout) || 5,
      securite: Number(sb.securite) || 5,
      praticite: Number(sb.praticite) || 5,
    },
  };
}

export function ScoreRing({ score, size = 72 }: { score: number; size?: number }) {
  const clamped = Math.min(10, Math.max(0, score));
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
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="5"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.7s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-black leading-none text-white/80" style={{ fontSize: size * 0.27 }}>{clamped.toFixed(1)}</span>
          <span className="text-white/25 font-mono" style={{ fontSize: size * 0.12 }}>/10</span>
        </div>
      </div>
    </div>
  );
}

function SubScoreBar({ label, value }: { label: string; value: number }) {
  const clamped = Math.min(10, Math.max(0, value));
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-white/40 font-mono">{label}</span>
        <span className="text-[11px] font-bold text-white/50">{clamped.toFixed(1)}/10</span>
      </div>
      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-white/25"
          style={{ width: `${clamped * 10}%`, transition: "width 0.7s ease" }}
        />
      </div>
    </div>
  );
}

const DUPLICATE_SECTION_TITLES = [
  "bilan rapide", "bilan", "résumé",
  "verdict expert", "verdict",
  "conseils pratiques", "conseils",
  "recommandations",
];

function isDuplicateSection(title: string): boolean {
  const normalized = title.toLowerCase().trim();
  return DUPLICATE_SECTION_TITLES.some(t => normalized.includes(t));
}

function deduplicateStrings(arr: string[]): string[] {
  const seen = new Set<string>();
  return arr.filter(item => {
    const key = item.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function PurchaseRecommendationCard({ pr: prRaw, onSignupPrompt }: { pr: PurchaseRecommendation; onSignupPrompt?: () => void }) {
  const pr = normalizePR(prRaw);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const VerdictIcon = VERDICT_ICONS[pr.verdict] || Minus;
  const verdictLabel = VERDICT_LABELS[pr.verdict] || "";

  const toggle = (i: number) => setChecked(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  const doneCount = checked.size;
  const totalCount = pr.inspectionChecklist.length;
  const dedupedTips = deduplicateStrings(pr.negotiationTips);
  const dedupedChecklist = deduplicateStrings(pr.inspectionChecklist);

  return (
    <div className="rounded-md p-4 space-y-4 hud-card">
      <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">// VERDICT_EXPERT</p>

      <div className="flex items-center gap-4">
        <ScoreRing score={pr.score} size={72} />
        <div className="flex flex-col gap-2 flex-1">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-black self-start text-white/70 bg-white/[0.06] border border-white/10">
            <VerdictIcon className="h-3.5 w-3.5 text-white/50" />
            {pr.verdict}
          </span>
          <p className="text-[11px] text-white/40 leading-tight">{verdictLabel}</p>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <p className="text-[10px] text-white/25 uppercase tracking-wider font-mono mb-2">// SOUS-SCORES</p>
        <SubScoreBar label="Fiabilité" value={pr.scoreBreakdown.fiabilite} />
        <SubScoreBar label="Coût" value={pr.scoreBreakdown.cout} />
        <SubScoreBar label="Sécurité" value={pr.scoreBreakdown.securite} />
        <SubScoreBar label="Praticité" value={pr.scoreBreakdown.praticite} />
      </div>

      {dedupedTips.length > 0 && (
        <div>
          <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono mb-2">// ARGUMENTS_NÉGOCIATION</p>
          <ul className="space-y-2">
            {dedupedTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5 text-[10px] font-black px-1.5 py-0.5 rounded text-white/50 bg-white/[0.06] border border-white/10">
                  €
                </span>
                <span className="text-xs text-white/65 leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {dedupedChecklist.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">// CHECKLIST_AVANT_ACHAT</p>
            {totalCount > 0 && (
              <span className="text-[10px] font-mono text-white/30">
                {doneCount}/{dedupedChecklist.length} vérifiés
              </span>
            )}
          </div>
          <ul className="space-y-2">
            {dedupedChecklist.map((item, i) => {
              const done = checked.has(i);
              return (
                <li
                  key={i}
                  className="flex items-start gap-2 cursor-pointer group"
                  onClick={() => toggle(i)}
                >
                  {done
                    ? <CheckSquare className="h-3.5 w-3.5 shrink-0 mt-0.5 text-white/50" />
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
  reportId,
  onSignupPrompt,
  onNewReport,
}: {
  report: GeneratedReport;
  reportId?: string;
  onSignupPrompt?: () => void;
  onNewReport?: () => void;
}) {
  const [copied, setCopied] = useState(false);

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

  const handleShare = async () => {
    const id = reportId || report._reportId;
    if (!id) return;
    const shareUrl = `${window.location.origin}/rapport/${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copiez ce lien :", shareUrl);
    }
  };

  const handleNewReport = () => {
    if (onNewReport) {
      onNewReport();
    } else {
      window.location.reload();
    }
  };

  const filteredSections = (report.sections || []).filter(s => !isDuplicateSection(s.title));
  const dedupedRecs = deduplicateStrings(report.recommendations || []);
  const shareId = reportId || report._reportId;

  return (
    <div className="space-y-4">

      {report.purchaseRecommendation && (
        <PurchaseRecommendationCard pr={report.purchaseRecommendation} onSignupPrompt={onSignupPrompt} />
      )}

      {report.estimatedCost && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-md hud-card">
          <span className="text-xs text-white/40">Coût annuel estimé :</span>
          <span className="text-xs font-mono font-bold text-white/70">{report.estimatedCost}</span>
        </div>
      )}

      {report.summary && (
        <div className="hud-card rounded-md p-4">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2 font-mono">// BILAN_RAPIDE</p>
          <p className="text-sm text-white/75 leading-relaxed">
            <MarkdownContent text={report.summary} />
          </p>
        </div>
      )}

      {filteredSections.length > 0 && (
        <div className="space-y-3">
          <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">// ANALYSE_DÉTAILLÉE</p>
          {filteredSections.map((section, i) => (
            <div key={i} className="hud-card rounded-md p-4">
              <h4 className="text-sm font-bold text-white/90 mb-2">
                <MarkdownContent text={section.title} />
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                <MarkdownContent text={section.content} />
              </p>
            </div>
          ))}
        </div>
      )}

      {dedupedRecs.length > 0 && (
        <div className="hud-card rounded-md p-4">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3 font-mono">// CONSEILS_PRATIQUES</p>
          <ol className="space-y-2.5">
            {dedupedRecs.map((rec, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-sm bg-white/[0.06] border border-white/10 text-white/40 text-[10px] font-mono font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-white/65 leading-relaxed">
                  <MarkdownContent text={rec} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          onClick={handleDownload}
          data-testid="button-download-pdf"
          className="flex-1 flex items-center justify-center gap-2 bg-[#CE1126] hover:bg-[#b8101f] text-white text-xs font-bold py-2.5 rounded-md transition-colors neon-red-glow"
        >
          <Download className="h-3.5 w-3.5" />
          Télécharger le rapport
        </button>

        {shareId && (
          <button
            onClick={handleShare}
            data-testid="button-share-report"
            className={`px-3.5 flex items-center gap-1.5 text-xs border rounded-md transition-all ${copied ? "border-white/30 text-white/70 bg-white/[0.04]" : "text-white/40 border-white/10 hover:border-white/20 hover:text-white/60"}`}
            title="Partager le rapport"
          >
            <Link className="h-3.5 w-3.5" />
            {copied ? "Copié !" : "Partager"}
          </button>
        )}

        <button
          onClick={handleNewReport}
          data-testid="button-new-report"
          className="px-3.5 flex items-center gap-1.5 text-xs text-white/35 border border-white/10 rounded-md hover:border-white/20 hover:text-white/55 transition-all"
          title="Analyser un autre véhicule"
        >
          <RotateCcw className="h-3 w-3" />
          Nouveau
        </button>
      </div>

      {onNewReport && (
        <button
          onClick={onNewReport}
          data-testid="button-analyze-another"
          className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 border border-white/[0.07] hover:border-white/15 text-white/30 hover:text-white/55 text-xs font-mono rounded-md transition-all"
        >
          <RotateCcw className="h-3 w-3" />
          ↺ Analyser un autre véhicule
        </button>
      )}
    </div>
  );
}
