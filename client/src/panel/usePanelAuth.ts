import { useState, useEffect, useCallback } from "react";

export interface PanelUser {
  id: string;
  email: string;
  role: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt?: string;
}

export function panelFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("panel_token");
  return fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
}

export function usePanelAuth() {
  const [user, setUser] = useState<PanelUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem("panel_token");
    if (!token) { setIsLoading(false); return; }
    try {
      const r = await fetch("/api/panel/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (r.ok) setUser(await r.json());
      else localStorage.removeItem("panel_token");
    } catch {
      localStorage.removeItem("panel_token");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  const login = async (email: string, password: string) => {
    const r = await fetch("/api/panel/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.message || "Erreur"); }
    const data = await r.json();
    localStorage.setItem("panel_token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("panel_token");
    setUser(null);
  };

  return { user, isLoading, login, logout, isSuperAdmin: user?.role === "superadmin" };
}
