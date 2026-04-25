import { useQuery } from "@tanstack/react-query";
import { Download, FileSpreadsheet, Eye } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { useState } from "react";
import ReportDisplay, { GeneratedReport } from "@/components/report-display";

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

export default function MyReports() {
  const { data: reports, isLoading } = useQuery<UserReport[]>({
    queryKey: ["/api/user/reports"],
  });

  const [openId, setOpenId] = useState<string | null>(null);
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
      <div className="hud-card rounded-md bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        {isLoading ? (
          <p className="text-sm text-white/40 p-8 text-center">Chargement…</p>
        ) : !reports?.length ? (
          <p className="text-sm text-white/40 p-8 text-center">Aucun rapport généré pour le moment</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-[10px] font-mono uppercase tracking-wider text-white/40">
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Véhicule</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Score</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {reports.map((r) => (
                  <tr key={r.id} data-testid={`row-report-${r.id}`} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-xs text-white/60">
                      {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold">{r.make} {r.model}</div>
                      <div className="text-xs text-white/40 font-mono">{r.year}{r.mileage ? ` · ${r.mileage} km` : ""}</div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs font-mono uppercase">{r.severity || "—"}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setOpenId(r.id)}
                          data-testid={`button-view-${r.id}`}
                          className="p-1.5 rounded text-white/60 hover:text-white hover:bg-white/[0.05]"
                          title="Voir"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => downloadPdf(r)}
                          data-testid={`button-pdf-${r.id}`}
                          className="p-1.5 rounded text-white/60 hover:text-white hover:bg-white/[0.05]"
                          title="PDF"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => downloadExcel(r)}
                          data-testid={`button-excel-${r.id}`}
                          className="p-1.5 rounded text-white/60 hover:text-white hover:bg-white/[0.05]"
                          title="Excel"
                        >
                          <FileSpreadsheet className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {opened && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-auto"
          onClick={() => setOpenId(null)}
        >
          <div
            className="hud-card rounded-md bg-[#0a0a14] border border-white/10 max-w-3xl w-full p-6 max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{opened.make} {opened.model} · {opened.year}</h3>
              <button onClick={() => setOpenId(null)} className="text-white/40 hover:text-white text-2xl leading-none">×</button>
            </div>
            {(() => {
              const report = parseReport(opened);
              return report ? (
                <ReportDisplay report={report} />
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
