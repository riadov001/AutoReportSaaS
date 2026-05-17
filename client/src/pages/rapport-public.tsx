import { useEffect, useState, Suspense, lazy } from "react";
import { useParams } from "wouter";
import { AutoReportLogo } from "@/components/autoreport-logo";
import type { GeneratedReport } from "@/components/report-display";

const ReportDisplay = lazy(() => import("@/components/report-display"));

interface PublicReportData {
  id: string;
  make: string;
  model: string;
  year: string;
  mileage?: string;
  content: string;
  metadata?: any;
  createdAt: string;
}

export default function RapportPublic() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PublicReportData | null>(null);
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/reports/public/${id}`)
      .then(r => {
        if (!r.ok) throw new Error(r.status === 404 ? "Rapport introuvable" : "Erreur serveur");
        return r.json();
      })
      .then((d: PublicReportData) => {
        setData(d);
        try {
          const parsed: GeneratedReport = typeof d.content === "string" ? JSON.parse(d.content) : d.content;
          setReport(parsed);
        } catch {
          setError("Impossible de lire le contenu du rapport.");
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-[#05050A] text-white flex flex-col overflow-x-hidden">
      <header className="border-b border-white/[0.05]" style={{ background: "#07070F" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <AutoReportLogo variant="icon" className="w-8 h-8" />
            <span className="text-base font-extrabold tracking-tight">AutoReport</span>
          </a>
          {data && (
            <span className="text-xs text-white/30 font-mono">
              {data.make} {data.model} · {data.year}
            </span>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative">
              <div className="w-12 h-12 border-2 border-[#CE1126]/20 rounded-full" />
              <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-[#CE1126] rounded-full animate-spin" />
            </div>
            <p className="text-xs font-mono text-white/30">Chargement du rapport…</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-14 h-14 rounded-md border border-white/[0.06] flex items-center justify-center bg-white/[0.02]">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-sm text-white/50">{error}</p>
            <a href="/" className="text-xs text-[#CE1126] hover:underline">← Retour à l'accueil</a>
          </div>
        )}

        {report && !loading && (
          <div className="space-y-6">
            <div className="hud-card rounded-md px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <p className="text-[10px] font-mono text-white/25 uppercase tracking-wider mb-0.5">// RAPPORT_PARTAGÉ</p>
                <h1 className="text-xl font-extrabold tracking-tight text-white">
                  {data?.make} {data?.model} <span className="text-white/40 font-normal text-base">· {data?.year}</span>
                </h1>
                {data?.mileage && (
                  <p className="text-xs text-white/30 font-mono mt-0.5">{Number(data.mileage).toLocaleString("fr-FR")} km</p>
                )}
              </div>
              {data?.createdAt && (
                <span className="text-[10px] font-mono text-white/20 shrink-0">
                  {new Date(data.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                </span>
              )}
            </div>

            <Suspense fallback={<div className="text-xs text-white/30 py-8 text-center">Chargement…</div>}>
              <div className="report-fade-in">
                <ReportDisplay
                  report={report}
                  reportId={id}
                />
              </div>
            </Suspense>

            <div className="pt-4 border-t border-white/[0.05] text-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#CE1126] hover:bg-[#b8101f] text-white text-xs font-bold rounded-md transition-colors neon-red-glow"
              >
                Analyser mon véhicule →
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
