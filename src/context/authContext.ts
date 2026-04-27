// Plain .ts file — holds the context object, types and hook
// No React components here, so react-refresh has nothing to complain about
import { createContext, useContext } from "react";

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

export const AuthContext = createContext<AuthCtx | null>(null);

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}