import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Shield, Search, RefreshCw, User, Clock, Activity, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface AppLog {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  actorId: string | null;
  actorRole: string | null;
  actorName: string | null;
  summary: string;
  metadata: any;
  ipAddress: string | null;
  createdAt: string;
}

const actionColors: Record<string, string> = {
  created: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  updated: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  deleted: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  validated: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  cancelled: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  completed: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
};

const entityLabels: Record<string, string> = {
  quote: "Devis",
  invoice: "Facture",
  reservation: "Réservation",
  service: "Service",
  workflow: "Workflow",
  workflow_step: "Étape",
  user: "Utilisateur",
  workshop_task: "Atelier",
};

const actionLabels: Record<string, string> = {
  created: "Créé",
  updated: "Modifié",
  deleted: "Supprimé",
  validated: "Validé",
  rejected: "Refusé",
  completed: "Terminé",
  cancelled: "Annulé",
  paid: "Payé",
  confirmed: "Confirmé",
};

export default function AdminAppLogs() {
  const { isRootAdmin } = useAuth();
  const [search, setSearch] = useState("");
  const [filterAction, setFilterAction] = useState("all");
  const [filterEntity, setFilterEntity] = useState("all");
  const [page, setPage] = useState(0);
  const limit = 100;

  const { data, isLoading, refetch, isFetching } = useQuery<{ logs: AppLog[]; total: number }>({
    queryKey: ["/api/rootadmin/app-logs", page],
    queryFn: async () => {
      const res = await fetch(`/api/rootadmin/app-logs?limit=${limit}&offset=${page * limit}`, { credentials: "include" });
      if (!res.ok) throw new Error("Accès refusé");
      return res.json();
    },
    enabled: isRootAdmin,
    refetchInterval: 30000,
  });

  if (!isRootAdmin) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <p className="text-lg font-semibold">Accès Root Admin requis</p>
            <p className="text-sm text-muted-foreground text-center">Cette page est réservée aux Root Admins uniquement.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const logs = data?.logs || [];
  const total = data?.total || 0;

  const filtered = logs.filter((log) => {
    const matchSearch =
      !search ||
      log.summary?.toLowerCase().includes(search.toLowerCase()) ||
      log.actorName?.toLowerCase().includes(search.toLowerCase()) ||
      log.entityId?.toLowerCase().includes(search.toLowerCase());
    const matchAction = filterAction === "all" || log.action === filterAction;
    const matchEntity = filterEntity === "all" || log.entityType === filterEntity;
    return matchSearch && matchAction && matchEntity;
  });

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-primary/10">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Logs Applicatifs</h1>
          <p className="text-sm text-muted-foreground">Suivi complet des actions dans l'application — Root Admin uniquement</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto"
          onClick={() => refetch()}
          disabled={isFetching}
          data-testid="button-refresh-logs"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-search-logs"
          />
        </div>
        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-40" data-testid="select-filter-action">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes actions</SelectItem>
            {Object.entries(actionLabels).map(([v, l]) => (
              <SelectItem key={v} value={v}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterEntity} onValueChange={setFilterEntity}>
          <SelectTrigger className="w-40" data-testid="select-filter-entity">
            <SelectValue placeholder="Entité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes entités</SelectItem>
            {Object.entries(entityLabels).map(([v, l]) => (
              <SelectItem key={v} value={v}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <CardTitle className="text-base">
              {filtered.length} entrée{filtered.length !== 1 ? "s" : ""} affichée{filtered.length !== 1 ? "s" : ""}
            </CardTitle>
            <CardDescription>{total} entrées au total dans la base</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Activity className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>Aucun log trouvé</p>
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="divide-y divide-border">
                {filtered.map((log) => (
                  <div key={log.id} className="px-4 py-3 hover-elevate" data-testid={`log-entry-${log.id}`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-1.5 rounded-md bg-muted shrink-0">
                        <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Badge className={`text-[10px] no-default-active-elevate ${actionColors[log.action] || "bg-muted text-muted-foreground"}`}>
                            {actionLabels[log.action] || log.action}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] no-default-active-elevate">
                            {entityLabels[log.entityType] || log.entityType}
                          </Badge>
                          {log.entityId && (
                            <span className="text-[10px] text-muted-foreground font-mono truncate max-w-24">
                              #{log.entityId.slice(0, 8)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-snug">{log.summary || "—"}</p>
                        <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                          {log.actorName && (
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {log.actorName}
                              {log.actorRole && <Badge variant="secondary" className="text-[9px] px-1 py-0 no-default-active-elevate">{log.actorRole}</Badge>}
                            </span>
                          )}
                          {log.ipAddress && (
                            <span className="font-mono">{log.ipAddress}</span>
                          )}
                          {log.createdAt && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {format(new Date(log.createdAt), "dd MMM yyyy HH:mm:ss", { locale: fr })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">Page {page + 1} — {limit} entrées par page</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
            Précédent
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={(page + 1) * limit >= total}>
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
