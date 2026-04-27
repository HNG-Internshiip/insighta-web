import React, { useState } from "react";
import { Link } from "react-router-dom";
import { searchProfiles } from "../api";

interface Profile {
  id:           string;
  name:         string;
  gender:       string;
  age:          number;
  country_name: string;
}

interface Meta {
  total: number;
}

const styles: Record<string, React.CSSProperties> = {
  page:  { padding: 32, color: "#c9d1d9", maxWidth: 1000, margin: "0 auto" },
  row:   { display: "flex", gap: 12, alignItems: "center", marginBottom: 16 },
  input: { flex: 1, background: "#161b22", color: "#c9d1d9", border: "1px solid #30363d", borderRadius: 6, padding: "8px 12px" },
  btn:   { background: "#1f6feb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse" },
  th:    { textAlign: "left", padding: "10px 12px", borderBottom: "1px solid #30363d", color: "#58a6ff" },
  td:    { padding: "10px 12px", borderBottom: "1px solid #21262d" },
};

export function Search() {
  const [q, setQ]             = useState("");
  const [data, setData]       = useState<Profile[]>([]);
  const [meta, setMeta]       = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const run = async () => {
    if (!q.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await searchProfiles(q);
      setData(res.data.data as Profile[]);
      setMeta({ total: res.data.total });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Search failed";
      setError(
        (e as { response?: { data?: { message?: string } } })
          ?.response?.data?.message ?? msg
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h2>Natural Language Search</h2>
      <div style={styles.row}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") void run(); }}
          placeholder='e.g. "young males from nigeria"'
          style={styles.input}
        />
        <button onClick={() => void run()} style={styles.btn}>Search</button>
      </div>

      {error   && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Searching...</p>}

      {!loading && meta && (
        <>
          <p style={{ color: "#8b949e" }}>{meta.total} results</p>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Name","Gender","Age","Country"].map(h =>
                  <th key={h} style={styles.th}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map(r => (
                <tr key={r.id}>
                  <td style={styles.td}><Link to={`/profiles/${r.id}`}>{r.name}</Link></td>
                  <td style={styles.td}>{r.gender}</td>
                  <td style={styles.td}>{r.age}</td>
                  <td style={styles.td}>{r.country_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}