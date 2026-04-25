import { useEffect, useState } from "react";
import { panelFetch } from "./usePanelAuth";
import {
  Download, Trash2, ChevronDown, ChevronUp, Search, AlertTriangle, Clock, CheckCircle, Wrench, Plus,
} from "lucide-react";

interface Report {
  id: string;
  make: string;
  model: string;
  year: string;
  mileage?: string;
  issue?: string;
  status: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
  content?: Record<string, unknown>;
}

const urgencyColor: Record<string, string> = {
  critical: "#CE1126",
  high: "#FF6B35",
  medium: "#FFB800",
  low: "#22C55E",
};

export default function PanelReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [creatingSheet, setCreatingSheet] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    panelFetch("/api/panel/reports")
      .then(r => r.json())
      .then(data => setReports(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleExport = () => {
    window.open("/api/panel/reports/export?token=" + localStorage.getItem("panel_token"), "_blank");
  };

  const handleExportWithAuth = async () => {
    const token = localStorage.getItem("panel_token");
    const r = await fetch("/api/panel/reports/export", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rapports-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce rapport ?")) return;
    setDeleting(id);
    await panelFetch(`/api/panel/reports/${id}`, { method: "DELETE" });
    setReports(prev => prev.filter(r => r.id !== id));
    setDeleting(null);
  };

  const handleCreateSheet = async (report: Report) => {
    setCreatingSheet(report.id);
    try {
      const meta = report.metadata as any || {};
      await panelFetch("/api/panel/repair-sheets", {
        method: "POST",
        body: JSON.stringify({
          reportId: report.id,
          reportSnapshot: { id: report.id, make: report.make, model: report.model, year: report.year, issue: report.issue },
          vehicleMake: report.make,
          vehicleModel: report.model,
          vehicleYear: report.year,
          vehicleMileage: report.mileage || "",
          diagnosticSummary: report.issue || "",
          status: "draft",
        }),
      });
      alert("Fiche de réparation créée avec succès !");
    } catch {
      alert("Erreur lors de la création de la fiche.");
    } finally {
      setCreatingSheet(null);
    }
  };

  const filtered = reports.filter(r => {
    const q = search.toLowerCase();
    return (
      r.make.toLowerCase().includes(q) ||
      r.model.toLowerCase().includes(q) ||
      r.year.includes(q) ||
      (r.issue || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Historique des Rapports</h1>
          <p className="text-white/40 text-sm mt-1">{reports.length} rapport{reports.length !== 1 ? "s" : ""} au total</p>
        </div>
        <button
          onClick={handleExportWithAuth}
          data-testid="button-export-reports"
          className="flex items-center gap-2 px-4 py-2 bg-[#CE1126]/15 border border-[#CE1126]/30 text-[#CE1126] rounded-md text-sm font-semibold hover:bg-[#CE1126]/25 transition-colors"
        >
          <Download className="h-4 w-4" />
          Exporter CSV
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher par marque, modèle, année..."
          data-testid="input-report-search"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md pl-10 pr-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#CE1126]/40 text-sm"
        />
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-white/[0.03] rounded-md animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <AlertTriangle className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Aucun rapport trouvé</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((report) => {
            const meta = report.metadata as any || {};
            const urgency = meta.urgencyLevel || "medium";
            const isExp = expanded === report.id;

            return (
              <div key={report.id} className="bg-white/[0.03] border border-white/[0.06] rounded-md overflow-hidden" data-testid={`card-report-${report.id}`}>
                <div
                  className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpanded(isExp ? null : report.id)}
                >
                  <div
                    className="w-1.5 h-8 rounded-full shrink-0"
                    style={{ backgroundColor: urgencyColor[urgency] || "#666" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm capitalize">
                        {report.make} {report.model}
                      </span>
                      <span className="text-white/40 text-xs">{report.year}</span>
                      {report.mileage && (
                        <span className="text-white/30 text-xs">{report.mileage} km</span>
                      )}
                    </div>
                    <p className="text-white/40 text-xs truncate mt-0.5">{report.issue || "Sans description"}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {report.createdAt && (
                      <span className="text-white/30 text-xs hidden sm:block">
                        {new Date(report.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    )}
                    {meta.estimatedCost && (
                      <span className="text-[#FFB800] text-xs font-mono">{meta.estimatedCost}</span>
                    )}
                    {isExp ? (
                      <ChevronUp className="h-4 w-4 text-white/30" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white/30" />
                    )}
                  </div>
                </div>

                {isExp && (
                  <div className="border-t border-white/[0.06] px-4 py-4 space-y-4">
                    {meta.sections && Array.isArray(meta.sections) && meta.sections.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Sections du rapport</h4>
                        <div className="space-y-2">
                          {(meta.sections as any[]).map((sec: any, i: number) => (
                            <div key={i} className="bg-white/[0.02] rounded-md p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-white text-sm font-semibold">{sec.title}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{
                                  backgroundColor: `${urgencyColor[sec.severity] || "#666"}20`,
                                  color: urgencyColor[sec.severity] || "#aaa",
                                }}>{sec.severity}</span>
                              </div>
                              <p className="text-white/50 text-xs">{sec.description}</p>
                              {sec.recommendations && (
                                <ul className="mt-2 space-y-1">
                                  {(Array.isArray(sec.recommendations) ? sec.recommendations : [sec.recommendations]).map((r: string, j: number) => (
                                    <li key={j} className="text-xs text-white/40 flex gap-2">
                                      <span className="text-[#CE1126]">›</span>{r}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleCreateSheet(report)}
                        disabled={creatingSheet === report.id}
                        data-testid={`button-create-sheet-${report.id}`}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.1] text-white/60 hover:text-white rounded-md text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <Plus className="h-3 w-3" />
                        {creatingSheet === report.id ? "Création..." : "Créer fiche réparation"}
                      </button>
                      <button
                        onClick={() => handleDelete(report.id)}
                        disabled={deleting === report.id}
                        data-testid={`button-delete-report-${report.id}`}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#CE1126]/10 border border-[#CE1126]/20 text-[#CE1126]/70 hover:text-[#CE1126] rounded-md text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="h-3 w-3" />
                        {deleting === report.id ? "Suppression..." : "Supprimer"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
