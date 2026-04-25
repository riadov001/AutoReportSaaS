import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { FileText, Download, Trash2, Calendar, Car, AlertTriangle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import type { AiReport } from "@shared/schema";

const urgencyConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  low: { label: "Faible", variant: "secondary" },
  medium: { label: "Moyen", variant: "default" },
  high: { label: "Élevé", variant: "destructive" },
  critical: { label: "Critique", variant: "destructive" },
};

export default function AdminRapports() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const { data: reports = [], isLoading } = useQuery<AiReport[]>({
    queryKey: ["/api/admin/ai-reports"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/ai-reports/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ai-reports"] });
      toast({ title: "Rapport supprimé" });
    },
    onError: () => {
      toast({ title: "Erreur", description: "Impossible de supprimer", variant: "destructive" });
    },
  });

  const handleDownload = async (report: AiReport) => {
    try {
      const parsed = JSON.parse(report.content);
      const res = await fetch("/api/reports/download-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (!res.ok) throw new Error("Erreur");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rapport-${report.make}-${report.model}-${Date.now()}.html`;
      a.click();
    } catch {
      toast({ title: "Erreur", description: "Impossible de télécharger", variant: "destructive" });
    }
  };

  const filteredReports = reports.filter((r) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      r.make.toLowerCase().includes(s) ||
      r.model.toLowerCase().includes(s) ||
      r.year.includes(s) ||
      r.issue.toLowerCase().includes(s)
    );
  });

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-full max-w-sm" />
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24" />)}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" data-testid="text-admin-reports-title">
            Rapports IA
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {reports.length} rapport{reports.length !== 1 ? "s" : ""} généré{reports.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un véhicule..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-search-reports"
          />
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground font-medium">
              {search ? "Aucun rapport trouvé" : "Aucun rapport généré"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredReports.map((report) => {
            let urgency = "medium";
            let cost = "";
            try {
              const meta = report.metadata as any;
              if (meta?.urgencyLevel) urgency = meta.urgencyLevel;
              if (meta?.estimatedCost) cost = meta.estimatedCost;
            } catch {}
            const uc = urgencyConfig[urgency] || urgencyConfig.medium;

            return (
              <Card key={report.id} className="hover-elevate" data-testid={`admin-report-card-${report.id}`}>
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 rounded-md bg-primary/10 shrink-0">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-sm truncate">
                          {report.make} {report.model} ({report.year})
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {report.issue}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <Badge variant={uc.variant} className="text-[10px]">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {uc.label}
                          </Badge>
                          {cost && (
                            <span className="text-xs text-muted-foreground font-mono">{cost}</span>
                          )}
                          {report.createdAt && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(report.createdAt).toLocaleDateString("fr-FR")}
                            </span>
                          )}
                          {report.userId && (
                            <span className="text-[10px] text-muted-foreground/60 font-mono">
                              ID: {report.userId.slice(0, 8)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(report)}
                        data-testid={`button-admin-download-${report.id}`}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMutation.mutate(report.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-admin-delete-${report.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
