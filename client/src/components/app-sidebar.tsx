import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Garage } from "@shared/schema";
import {
  Home,
  FileText,
  DollarSign,
  Calendar,
  CalendarCheck,
  Settings,
  Package,
  Users,
  Briefcase,
  Wrench,
  ClipboardList,
  GitBranch,
  History,
  MessageCircle,
  LifeBuoy,
  Archive,
  Building2,
  Truck,
  Star,
  CreditCard,
  Landmark,
  ChevronDown,
  Receipt,
  Calculator,
  BookOpen,
  ShoppingBag,
  UserCircle,
  UsersRound,
  Cog,
  ShieldCheck,
  Shield,
  FileCode,
  ScanLine,
  BarChart3,
  MessageSquare,
  Bell,
  Upload,
  Clock,
  Images,
  Globe,
  type LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { AutoReportLogo } from "@/components/autoreport-logo";
import { useSidebar } from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  hideForEmployee?: boolean;
  external?: boolean;
}

interface MenuGroup {
  label: string;
  icon: LucideIcon;
  items: MenuItem[];
  superadminOnly?: boolean;
  rootadminOnly?: boolean;
  hideForEmployee?: boolean;
  collapsible?: boolean;
}

const menuGroups: MenuGroup[] = [
  {
    label: "Site AutoReport",
    icon: Globe,
    collapsible: false,
    items: [
      { title: "Site AutoReport", url: "/", icon: Globe },
    ],
  },
  {
    label: "Tableau de bord",
    icon: Home,
    items: [
      { title: "Tableau de bord", url: "/admin", icon: Home },
      { title: "Analyses avancées", url: "/admin/advanced-analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Activité",
    icon: Briefcase,
    items: [
      { title: "Prestations", url: "/admin/engagements", icon: Briefcase },
      { title: "Atelier", url: "/admin/workshop", icon: Wrench },
      { title: "Catalogue", url: "/admin/services-catalog", icon: ClipboardList },
      { title: "Services", url: "/admin/services", icon: Package },
      { title: "Réservations", url: "/admin/reservations", icon: Calendar },
      { title: "Planning", url: "/admin/calendar", icon: CalendarCheck },
      { title: "Livraisons", url: "/admin/delivery-notes", icon: Truck },
      { title: "Workflows", url: "/admin/service-workflows", icon: GitBranch },
      { title: "Scanner OCR", url: "/admin/scanner", icon: ScanLine },
      { title: "Galerie", url: "/admin/gallery", icon: Images },
    ],
  },
  {
    label: "Ventes",
    icon: ShoppingBag,
    items: [
      { title: "Devis", url: "/admin/quotes", icon: FileText },
      { title: "Factures", url: "/admin/invoices", icon: DollarSign },
      { title: "Paiements", url: "/admin/payments", icon: CreditCard },
      { title: "Banque", url: "/admin/bank-connection", icon: Landmark },
    ],
  },
    {
    label: "Comptabilité",
    icon: Calculator,
    hideForEmployee: true,
    items: [
      { title: "Vue d'ensemble", url: "/admin/accounting", icon: BookOpen },
      { title: "Dépenses", url: "/admin/expenses", icon: Receipt },
      { title: "Avoirs", url: "/admin/credit-notes", icon: FileText },
    ],
  },
  {
    label: "Clients",
    icon: UserCircle,
    items: [
      { title: "Liste clients", url: "/admin/clients", icon: Users },
      { title: "Avis clients", url: "/admin/reviews", icon: Star },
    ],
  },
  {
    label: "Équipe",
    icon: UsersRound,
    items: [
      { title: "Membres", url: "/admin/team", icon: UsersRound },
      { title: "Chat interne", url: "/admin/chat", icon: MessageCircle },
      { title: "Historique", url: "/admin/audit-logs", icon: History },
      { title: "Journal SMS", url: "/admin/sms-logs", icon: MessageSquare },
    ],
  },
  {
    label: "Gestion",
    icon: Cog,
    items: [
      { title: "Utilisateurs", url: "/admin/users", icon: UserCircle },
      { title: "Paramètres", url: "/admin/settings", icon: Settings },
      { title: "Rappels & Notifications", url: "/admin/notification-settings", icon: Bell },
      { title: "Confidentialité", url: "/privacy", icon: Shield },
    ],
  },
  {
    label: "Administration",
    icon: ShieldCheck,
    superadminOnly: true,
    items: [
      { title: "Garages", url: "/admin/garages", icon: Building2 },
      { title: "Sauvegardes", url: "/admin/backups", icon: Archive },
    ],
  },
  {
    label: "Root Admin",
    icon: Shield,
    rootadminOnly: true,
    items: [
      { title: "Logs Applicatifs", url: "/admin/app-logs", icon: History },
      { title: "Imports", url: "/admin/imports", icon: Upload },
      { title: "API Swagger", url: "/api/swagger", icon: FileCode, external: true },
    ],
  },
];

function isGroupActive(group: MenuGroup, location: string) {
  return group.items.some(item => item.url === location);
}

export function AppSidebar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const { setOpenMobile } = useSidebar();
  const isRootAdmin = user?.role === "rootadmin";
  const isSuperAdmin = user?.role === "superadmin" || isRootAdmin;
  const isEmployee = user?.role === "employe";

  const { data: garages = [] } = useQuery<Garage[]>({
    queryKey: ["/api/superadmin/garages"],
    enabled: isSuperAdmin || isRootAdmin,
  });

  const { data: selectedGarageData } = useQuery<{ garage: { id: string; name: string; slug: string } | null }>({
    queryKey: ["/api/superadmin/selected-garage"],
    enabled: isSuperAdmin || isRootAdmin,
  });

  const selectGarageMutation = useMutation({
    mutationFn: async (garageId: string | null) => {
      const res = await apiRequest("POST", "/api/superadmin/select-garage", { garageId });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/superadmin/selected-garage"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin"] });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quotes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/invoices"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/analytics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/superadmin/garage-stats"] });
    },
  });

  const handleGarageSelect = (value: string) => {
    selectGarageMutation.mutate(value === "all" ? null : value);
  };

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    menuGroups.forEach(group => {
      if (isGroupActive(group, location)) {
        initial[group.label] = true;
      }
    });
    return initial;
  });

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentlyViewed");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (location && location.startsWith("/admin")) {
      setRecentlyViewed(prev => {
        const filtered = prev.filter(url => url !== location);
        const next = [location, ...filtered].slice(0, 5);
        localStorage.setItem("recentlyViewed", JSON.stringify(next));
        return next;
      });
    }
  }, [location]);

  const recentItems = useMemo(() => {
    const allItems = menuGroups.flatMap(g => g.items);
    return recentlyViewed
      .map(url => allItems.find(item => item.url === url))
      .filter((item): item is MenuItem => !!item && item.url !== "/admin");
  }, [recentlyViewed]);

  return (
    <Sidebar className="sidebar-gradient">
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-5">
            <AutoReportLogo data-testid="logo-autoreport" />
            <p className="text-[10px] font-bold tracking-widest text-sidebar-foreground/50 mt-2 uppercase">Rapports IA Auto</p>
          </div>
        </SidebarGroup>

        {(isSuperAdmin || isRootAdmin) && garages.length > 0 && (
          <SidebarGroup>
            <div className="px-3 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-sidebar-foreground/70" />
                <span className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">Garage actif</span>
              </div>
              <Select 
                value={selectedGarageData?.garage?.id || "all"} 
                onValueChange={handleGarageSelect}
              >
                <SelectTrigger 
                  className="bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground"
                  data-testid="select-active-garage"
                >
                  <SelectValue placeholder="Tous les garages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les garages</SelectItem>
                  {garages.map((g: Garage) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedGarageData?.garage && (
                <p className="text-[10px] text-sidebar-foreground/50 mt-1 px-1">
                  Données isolées : {selectedGarageData.garage.name}
                </p>
              )}
            </div>
          </SidebarGroup>
        )}

        {recentItems.length > 0 && (
          <SidebarGroup>
            <div className="px-3 pb-1">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-3.5 w-3.5 text-sidebar-foreground/50" />
                <span className="text-[10px] font-bold text-sidebar-foreground/50 uppercase tracking-widest">Consultés récemment</span>
              </div>
              <SidebarMenu>
                {recentItems.map((item) => (
                  <SidebarMenuItem key={`recent-${item.url}`}>
                    <SidebarMenuButton
                      asChild
                      isActive={location === item.url}
                      onClick={() => setOpenMobile(false)}
                      className="h-8 text-xs"
                    >
                      <Link href={item.url}>
                        <item.icon className="h-3.5 w-3.5" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarMenu>
            {menuGroups.map((group) => {
              if (group.superadminOnly && !isSuperAdmin) return null;
              if (group.rootadminOnly && !isRootAdmin) return null;
              if (group.hideForEmployee && isEmployee) return null;

              const active = isGroupActive(group, location);
              const isOpen = openGroups[group.label] || active;
              const isSingleDirect = group.collapsible === false;
              const GroupIcon = group.icon;

              if (isSingleDirect) {
                const item = group.items[0];
                return (
                  <SidebarMenuItem key={group.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={location === item.url}
                      data-testid={`nav-${group.label.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => setOpenMobile(false)}
                    >
                      <Link href={item.url}>
                        <GroupIcon className="h-4 w-4" />
                        <span>{group.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return (
                <Collapsible
                  key={group.label}
                  open={isOpen}
                  onOpenChange={() => toggleGroup(group.label)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        data-testid={`nav-group-${group.label.toLowerCase().replace(/\s+/g, "-")}`}
                        className={active ? "font-medium" : ""}
                      >
                        <GroupIcon className="h-4 w-4" />
                        <span className="flex-1">{group.label}</span>
                        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {group.items.map((item) => {
                          if (item.hideForEmployee && isEmployee) return null;
                          return (
                            <SidebarMenuSubItem key={item.url}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={!item.external && location === item.url}
                                data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => {
                                  if (window.innerWidth < 1024) {
                                    setOpenMobile(false);
                                  }
                                }}
                              >
                                {item.external ? (
                                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <item.icon className="h-3.5 w-3.5" />
                                    <span>{item.title}</span>
                                  </a>
                                ) : (
                                  <Link href={item.url}>
                                    <item.icon className="h-3.5 w-3.5" />
                                    <span>{item.title}</span>
                                  </Link>
                                )}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild data-testid="button-support">
              <Link href="/support">
                <LifeBuoy className="h-4 w-4" />
                <span>Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
