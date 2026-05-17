import { useQuery } from "@tanstack/react-query";
import { Download, FileSpreadsheet, X, Link } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useState } from "react";
import ReportDisplay, { GeneratedReport, ScoreRing } from "@/components/report-display";

interface UserReport {
  id: string;
  make: string;
  model: string;
  year: string;
  mileage?: string;
  issue: string;
  content: string;
  createdAt: string;
  severity?: string;
  metadata?: any;
}

function verdictFromReport(r: GeneratedReport | null): string {
  return r?.purchaseRecommendation?.verdict ?? "—";
}

function scoreFromReport(r: GeneratedReport | null): number | null {
  const s = r?.purchaseRecommendation?.score;
  if (s == null) return null;
  return Number(s) || null;
}

const VERDICT_COLOR: Record<string, string> = {
  "BONNE AFFAIRE": "text-emerald-400/80",
  "CORRECT": "text-white/50",
  "RISQUÉ": "text-amber-400/80",
  "À ÉVITER": "text-red-400/80",
};

export default function MyReports() {
  const { data: reports, isLoading } = useQuery<UserReport[]>({
    queryKey: ["/api/user/reports"],
  });

  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const opened = reports?.find((r) => r.id === openId);

  const parseReport = (r: UserReport): GeneratedReport | null => {
    try {
      if (r.metadata && typeof r.metadata === "object" && r.metadata.report) {
        return r.metadata.report as GeneratedReport;
      }
      const parsed = JSON.parse(r.content);
      return parsed;
    } catch {
      return null;
    }
  };

  const handleShare = async (r: UserReport) => {
    const url = `${window.location.origin}/rapport/${r.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(r.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      window.prompt("Copiez ce lien :", url);
    }
  };

  const downloadPdf = async (r: UserReport) => {
    const report = parseReport(r);
    if (!report) {
      alert("Rapport indisponible au format PDF");
      return;
    }
    try {
      const res = await fetch("/api/reports/download-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `diagnostic-${r.make}-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Impossible de télécharger le PDF");
    }
  };

  const downloadExcel = async (r: UserReport) => {
    try {
      const res = await fetch(`/api/user/reports/${r.id}/excel`);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `diagnostic-${r.make}-${Date.now()}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Impossible de télécharger l'Excel");
    }
  };

  return (
    <DashboardLayout title="Mes rapports">
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="hud-card rounded-md p-5 animate-pulse h-36" />
          ))}
        </div>
      ) : !reports?.length ? (
        <div className="hud-card rounded-md p-12 text-center">
          <p className="text-sm text-white/40 mb-1">Aucun rapport généré pour le moment</p>
          <p className="text-xs text-white/20 font-mono">
            Générez votre premier rapport depuis la{" "}
            <a href="/" className="text-[#CE1126] hover:underline">page d'accueil</a>
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((r, idx) => {
            const parsed = parseReport(r);
            const score = scoreFromReport(parsed);
            const verdict = verdictFromReport(parsed);
            const verdictClass = VERDICT_COLOR[verdict] ?? "text-white/40";

            return (
              <div
                key={r.id}
                data-testid={`row-report-${r.id}`}
                className="hud-card rounded-md p-4 flex flex-col gap-3 card-stagger hover:border-white/10 transition-all cursor-pointer group"
                style={{ animationDelay: `${idx * 50}ms` }}
                onClick={() => setOpenId(r.id)}
              >
                <div className="flex items-start gap-3">
                  {score != null ? (
                    <div className="shrink-0">
                      <ScoreRing score={score} size={44} />
                    </div>
                  ) : (
                    <div className="w-11 h-11 shrink-0 rounded-full border border-white/[0.07] flex items-center justify-center bg-white/[0.02]">
                      <span className="text-white/20 text-[10px] font-mono">—</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-white/90 truncate">{r.make} {r.model}</p>
                    <p className="text-xs text-white/40 font-mono mt-0.5">
                      {r.year}{r.mileage ? ` · ${Number(r.mileage).toLocaleString("fr-FR")} km` : ""}
                    </p>
                    {verdict !== "—" && (
                      <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${verdictClass}`}>{verdict}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
                  <span className="text-[10px] font-mono text-white/25">
                    {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={e => { e.stopPropagation(); handleShare(r); }}
                      data-testid={`button-share-${r.id}`}
                      className={`p-1.5 rounded transition-colors ${copiedId === r.id ? "text-white/60" : "text-white/30 hover:text-white/60"}`}
                      title={copiedId === r.id ? "Lien copié !" : "Partager"}
                    >
                      <Link className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); downloadPdf(r); }}
                      data-testid={`button-pdf-${r.id}`}
                      className="p-1.5 rounded text-white/30 hover:text-white/60 transition-colors"
                      title="PDF"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); downloadExcel(r); }}
                      data-testid={`button-excel-${r.id}`}
                      className="p-1.5 rounded text-white/30 hover:text-white/60 transition-colors"
                      title="Excel"
                    >
                      <FileSpreadsheet className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {opened && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-auto"
          onClick={() => setOpenId(null)}
        >
          <div
            className="hud-card rounded-md bg-[#0a0a14] border border-white/10 max-w-3xl w-full p-6 max-h-[90vh] overflow-auto report-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] font-mono text-white/25 uppercase tracking-wider mb-0.5">// RAPPORT_DÉTAILLÉ</p>
                <h3 className="text-lg font-extrabold text-white">{opened.make} {opened.model} <span className="text-white/40 font-normal text-base">· {opened.year}</span></h3>
              </div>
              <button
                onClick={() => setOpenId(null)}
                className="p-2 rounded-md border border-white/10 hover:border-white/20 text-white/40 hover:text-white/70 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {(() => {
              const report = parseReport(opened);
              return report ? (
                <ReportDisplay
                  report={report}
                  reportId={opened.id}
                />
              ) : (
                <div className="text-sm text-white/60 whitespace-pre-wrap">{opened.content}</div>
              );
            })()}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
