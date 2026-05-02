import React, { useState, useEffect, useCallback } from "react";
import { getMe, logout as apiLogout } from "../api";

export interface User {
  id:         string;
  username:   string;
  email:      string | null;
  avatar_url: string | null;
  role:       string;
  is_active:  boolean;
}

export interface AuthCtx {
  user:    User | null;
  loading: boolean;
  logout:  () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await getMe();
      setUser(res.data.data as User);
    } catch {
      setUser(null);
    }
  }, []);

  const logout = useCallback(async () => {
    await apiLogout().catch(() => {});
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    setUser(null);
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    // Don't attempt getMe on the callback page — tokens aren't stored yet
    // AuthCallback will call refresh() itself after storing tokens
    if (window.location.pathname === "/auth/callback") {
      setLoading(false);
      return;
    }
    void (async () => {
      await refresh();
      setLoading(false);
    })();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, loading, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}