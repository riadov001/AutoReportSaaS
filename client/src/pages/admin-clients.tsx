import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { User } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Building2,
  Calendar,
  FileText,
  DollarSign,
  User as UserIcon,
  Users,
  Filter,
  MessageCircle,
  ExternalLink,
  TrendingUp,
  UserPlus,
} from "lucide-react";

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getInitials(user: User): string {
  const f = user.firstName?.charAt(0)?.toUpperCase() || "";
  const l = user.lastName?.charAt(0)?.toUpperCase() || "";
  return f + l || user.email.charAt(0).toUpperCase();
}

export default function AdminClients() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [selectedClient, setSelectedClient] = useState<User | null>(null);

  const { data: allUsers = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    enabled: isAuthenticated && isAdmin,
  });

  const { data: quotes = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/quotes"],
    enabled: isAuthenticated && isAdmin,
  });

  const { data: invoices = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/invoices"],
    enabled: isAuthenticated && isAdmin,
  });

  const clients = useMemo(() => {
    return allUsers.filter(
      (u) => u.role === "client" || u.role === "client_professionnel"
    );
  }, [allUsers]);

  const cities = useMemo(() => {
    const set = new Set<string>();
    clients.forEach((c) => {
      if (c.city) set.add(c.city);
    });
    return Array.from(set).sort();
  }, [clients]);

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        (c.firstName || "").toLowerCase().includes(q) ||
        (c.lastName || "").toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone || "").includes(q) ||
        (c.companyName || "").toLowerCase().includes(q) ||
        (c.city || "").toLowerCase().includes(q);
      const matchRole = roleFilter === "all" || c.role === roleFilter;
      const matchCity = cityFilter === "all" || c.city === cityFilter;
      return matchSearch && matchRole && matchCity;
    });
  }, [clients, searchQuery, roleFilter, cityFilter]);

  function getClientStats(clientId: string) {
    const clientQuotes = quotes.filter((q: any) => q.clientId === clientId);
    const clientInvoices = invoices.filter((i: any) => i.clientId === clientId);
    const totalRevenue = clientInvoices.reduce(
      (sum: number, inv: any) => sum + (parseFloat(inv.totalTTC) || 0),
      0
    );
    return {
      quotesCount: clientQuotes.length,
      invoicesCount: clientInvoices.length,
      totalRevenue,
    };
  }

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  const totalRevenue = useMemo(() => {
    return clients.reduce((sum, c) => sum + getClientStats(c.id).totalRevenue, 0);
  }, [clients, invoices]);

  const proClients = clients.filter(c => c.role === "client_professionnel").length;
  const recentClients = clients.filter(c => {
    if (!c.createdAt) return false;
    const d = new Date(c.createdAt);
    const now = new Date();
    return (now.getTime() - d.getTime()) < 30 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="p-4 sm:p-6 space-y-4" data-testid="page-admin-clients">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-clients-title">
            Clients
          </h1>
          <p className="text-sm text-muted-foreground">
            {filteredClients.length} client{filteredClients.length !== 1 ? "s" : ""} trouvé{filteredClients.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setLocation("/admin/users")}
            data-testid="button-go-to-users"
          >
            <Users className="h-4 w-4 mr-2" />
            Utilisateurs
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Total clients</p>
                <p className="text-2xl font-bold mt-1">{clients.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Professionnels</p>
                <p className="text-2xl font-bold mt-1">{proClients}</p>
              </div>
              <Building2 className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Nouveaux (30j)</p>
                <p className="text-2xl font-bold mt-1">{recentClients}</p>
              </div>
              <UserPlus className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground">CA total</p>
                <p className="text-2xl font-bold mt-1">{totalRevenue.toFixed(0)}<span className="text-sm font-normal ml-1">EUR</span></p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email, téléphone, société..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-clients"
              />
            </div>
            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[160px]" data-testid="select-role-filter">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="client">Particulier</SelectItem>
                  <SelectItem value="client_professionnel">Professionnel</SelectItem>
                </SelectContent>
              </Select>
              {cities.length > 0 && (
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger className="w-[160px]" data-testid="select-city-filter">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredClients.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <UserIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">Aucun client trouvé</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredClients.map((client) => {
            const stats = getClientStats(client.id);
            return (
              <Card
                key={client.id}
                className="hover-elevate cursor-pointer transition-all"
                onClick={() => setSelectedClient(client)}
                data-testid={`card-client-${client.id}`}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarImage src={client.profileImageUrl || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(client)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap" data-testid="client-name-badge">
                        <h3 className="font-semibold truncate">
                          {client.firstName || ""} {client.lastName || ""}
                        </h3>
                        <Badge variant={client.role === "client_professionnel" ? "default" : "secondary"}>
                          {client.role === "client_professionnel" ? "Pro" : "Particulier"}
                        </Badge>
                      </div>
                      {client.companyName && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Building2 className="h-3 w-3" />
                          {client.companyName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    {client.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                    {(client.city || client.address) && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                          {[client.address, client.postalCode, client.city]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t flex-wrap">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        {stats.quotesCount} devis
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        {stats.invoicesCount} factures
                      </span>
                    </div>
                    <span className="text-xs font-semibold">
                      {stats.totalRevenue.toFixed(2)} EUR
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-lg">
          {selectedClient && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedClient.profileImageUrl || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(selectedClient)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span>
                      {selectedClient.firstName || ""} {selectedClient.lastName || ""}
                    </span>
                    <Badge variant={selectedClient.role === "client_professionnel" ? "default" : "secondary"} className="ml-2">
                      {selectedClient.role === "client_professionnel" ? "Professionnel" : "Particulier"}
                    </Badge>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Email</p>
                    <p className="text-sm">{selectedClient.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Telephone</p>
                    <p className="text-sm">{selectedClient.phone || "-"}</p>
                    {selectedClient.smsConsent && (
                      <Badge variant="outline" className="text-xs">SMS actif</Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Adresse</p>
                    <p className="text-sm">
                      {[selectedClient.address, selectedClient.postalCode, selectedClient.city]
                        .filter(Boolean)
                        .join(", ") || "-"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Inscrit le</p>
                    <p className="text-sm">{formatDate(selectedClient.createdAt as any)}</p>
                  </div>
                </div>

                {selectedClient.companyName && (
                  <div className="border-t pt-3">
                    <p className="text-xs text-muted-foreground font-medium mb-2">Informations société</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Société</p>
                        <p className="text-sm">{selectedClient.companyName}</p>
                      </div>
                      {selectedClient.siret && (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">SIRET</p>
                          <p className="text-sm">{selectedClient.siret}</p>
                        </div>
                      )}
                      {selectedClient.tvaNumber && (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">TVA</p>
                          <p className="text-sm">{selectedClient.tvaNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {(() => {
                  const stats = getClientStats(selectedClient.id);
                  return (
                    <div className="border-t pt-3">
                      <p className="text-xs text-muted-foreground font-medium mb-2">Activité</p>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 rounded-md bg-muted/50">
                          <p className="text-lg font-bold">{stats.quotesCount}</p>
                          <p className="text-xs text-muted-foreground">Devis</p>
                        </div>
                        <div className="p-3 rounded-md bg-muted/50">
                          <p className="text-lg font-bold">{stats.invoicesCount}</p>
                          <p className="text-xs text-muted-foreground">Factures</p>
                        </div>
                        <div className="p-3 rounded-md bg-muted/50">
                          <p className="text-lg font-bold">{stats.totalRevenue.toFixed(0)}</p>
                          <p className="text-xs text-muted-foreground">EUR</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="flex gap-2 pt-2 flex-wrap">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedClient(null);
                      setLocation(`/admin/quotes`);
                    }}
                    data-testid="button-view-client-quotes"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Devis
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedClient(null);
                      setLocation(`/admin/invoices`);
                    }}
                    data-testid="button-view-client-invoices"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Factures
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedClient(null);
                      setLocation(`/admin/chat`);
                    }}
                    data-testid="button-chat-client"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setSelectedClient(null);
                      setLocation(`/admin/users`);
                    }}
                    data-testid="button-edit-client-user"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
