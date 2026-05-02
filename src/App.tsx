import React from "react";
import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth }      from "./context/useAuth";
import { Login }        from "./pages/Login";
import { Dashboard }    from "./pages/Dashboard";
import { Profiles }     from "./pages/Profiles";
import { ProfileDetail }from "./pages/ProfileDetail";
import { Search }       from "./pages/Search";
import { Account }      from "./pages/Account";
import { AuthCallback } from "./pages/AuthCallback";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // Never interrupt the OAuth callback page
  if (window.location.pathname === "/auth/callback") {
    return <>{children}</>;
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0d1117", display: "flex",
      alignItems: "center", justifyContent: "center", color: "#58a6ff", fontSize: 18 }}>
      Loading...
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function Layout({ children }: { children: React.ReactNode }) {
  const linkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
    color: isActive ? "#58a6ff" : "#8b949e",
    textDecoration: "none", padding: "8px 12px", borderRadius: 6,
    background: isActive ? "#1f2937" : "transparent",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1117" }}>
      <nav style={{ width: 200, background: "#161b22", padding: 16, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ color: "#58a6ff", fontWeight: 700, fontSize: 18, padding: "12px 12px 24px" }}>
          Insighta+
        </div>
        <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/profiles"  style={linkStyle}>Profiles</NavLink>
        <NavLink to="/search"    style={linkStyle}>Search</NavLink>
        <NavLink to="/account"   style={linkStyle}>Account</NavLink>
      </nav>
      <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"         element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/"              element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>
          }/>
          <Route path="/profiles" element={
            <ProtectedRoute><Layout><Profiles /></Layout></ProtectedRoute>
          }/>
          <Route path="/profiles/:id" element={
            <ProtectedRoute><Layout><ProfileDetail /></Layout></ProtectedRoute>
          }/>
          <Route path="/search" element={
            <ProtectedRoute><Layout><Search /></Layout></ProtectedRoute>
          }/>
          <Route path="/account" element={
            <ProtectedRoute><Layout><Account /></Layout></ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}