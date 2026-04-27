// ─── pages/Login.tsx ──────────────────────────────────────────────────────────
import React from "react";
import { loginUrl } from "../api";

export function Login() {
  return (
    <div style={styles.center}>
      <div style={styles.card}>
        <h1 style={styles.title}>Insighta Labs+</h1>
        <p style={styles.sub}>Demographic Intelligence Platform</p>
        <a href={loginUrl()} style={styles.btn}>Continue with GitHub</a>
      </div>
    </div>
  );
}











// ─── Shared styles ────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  center:    { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d1117" },
  card:      { background: "#161b22", padding: 40, borderRadius: 12, textAlign: "center", color: "#c9d1d9", minWidth: 320 },
  title:     { fontSize: 28, marginBottom: 4, color: "#58a6ff" },
  sub:       { color: "#8b949e", marginBottom: 32 },
  btn:       { display: "inline-block", background: "#238636", color: "#fff", padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontWeight: 600 },
  btn2:      { background: "#1f6feb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer" },
  page:      { padding: 32, color: "#c9d1d9", maxWidth: 1000, margin: "0 auto" },
  grid:      { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginTop: 24 },
  stat:      { background: "#161b22", borderRadius: 8, padding: 20, textAlign: "center" },
  statVal:   { fontSize: 32, fontWeight: 700, color: "#58a6ff" },
  statLabel: { color: "#8b949e", marginTop: 4 },
  row:       { display: "flex", gap: 12, alignItems: "center", marginBottom: 16 },
  sel:       { background: "#161b22", color: "#c9d1d9", border: "1px solid #30363d", borderRadius: 6, padding: "6px 12px" },
  input:     { flex: 1, background: "#161b22", color: "#c9d1d9", border: "1px solid #30363d", borderRadius: 6, padding: "8px 12px" },
  meta:      { color: "#8b949e", fontSize: 14 },
  table:     { width: "100%", borderCollapse: "collapse" },
  th:        { textAlign: "left", padding: "10px 12px", borderBottom: "1px solid #30363d", color: "#58a6ff" },
  td:        { padding: "10px 12px", borderBottom: "1px solid #21262d" },
  dl:        { display: "grid", gridTemplateColumns: "180px 1fr", gap: "8px 0" },
  dt:        { color: "#8b949e", fontWeight: 600 },
  dd:        { color: "#c9d1d9", margin: 0 },
  avatar:    { width: 80, height: 80, borderRadius: "50%", marginBottom: 16 },
};