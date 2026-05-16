// Auth hook - Local authentication with email/password
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    // Retourner null sur 401 (non authentifié) au lieu de throw —
    // évite de mettre la query en état d'erreur "toujours stale"
    // qui déclencherait des refetch à chaque montée de composant.
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const isRootAdmin = user?.role === "rootadmin";
  const isSuperAdmin = user?.role === "superadmin" || isRootAdmin;
  const isAdmin = user?.role === "admin" || user?.role === "employe" || isSuperAdmin;
  const isEmployee = user?.role === "employe";
  const isClient = user?.role === "client";
  const isClientPro = user?.role === "client_professionnel";

  return {
    user: user ?? undefined,
    isLoading,
    isAuthenticated: !!user,
    isAdmin,
    isSuperAdmin,
    isRootAdmin,
    isClient,
    isClientPro,
    isEmployee,
  };
}
