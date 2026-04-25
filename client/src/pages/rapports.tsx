import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Download, Calendar, Car, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { AiReport } from "@shared/schema";

const urgencyConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  low: { label: "Faible", variant: "secondary" },
  medium: { label: "Moyen", variant: "default" },
  high: { label: "Élevé", variant: "destructive" },
  critical: { label: "Critique", variant: "destructive" },
};

export default function Rapports() {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const { data: reports = [], isLoading } = useQuery<AiReport[]>({
    queryKey: ["/api/reports"],
    enabled: isAuthenticated,
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
      toast({ title: "Téléchargement lancé" });
    } catch {
      toast({ title: "Erreur", description: "Impossible de télécharger", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-4 max-w-5xl mx-auto">
        <Skeleton className="h-10 w-48" />
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-28" />)}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" data-testid="text-reports-title">
            Mes Rapports IA
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Historique de vos diagnostics automobiles</p>
        </div>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground font-medium mb-2">Aucun rapport généré</p>
            <p className="text-sm text-muted-foreground/60">
              Vos rapports générés depuis la page d'accueil apparaîtront ici.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => {
            let urgency = "medium";
            let cost = "";
            try {
              const meta = report.metadata as any;
              if (meta?.urgencyLevel) urgency = meta.urgencyLevel;
              if (meta?.estimatedCost) cost = meta.estimatedCost;
            } catch {}
            const uc = urgencyConfig[urgency] || urgencyConfig.medium;

            return (
              <Card key={report.id} className="hover-elevate" data-testid={`report-card-${report.id}`}>
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
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(report)}
                      data-testid={`button-download-${report.id}`}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Télécharger</span>
                    </Button>
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
