import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getProfiles } from "../api";

interface Profile {
  id:           string;
  name:         string;
  gender:       string;
  age:          number;
  age_group:    string;
  country_name: string;
}

interface Meta {
  total:       number;
  page:        number;
  total_pages: number;
}

const styles: Record<string, React.CSSProperties> = {
  page:  { padding: 32, color: "#c9d1d9", maxWidth: 1000, margin: "0 auto" },
  row:   { display: "flex", gap: 12, alignItems: "center", marginBottom: 16 },
  sel:   { background: "#161b22", color: "#c9d1d9", border: "1px solid #30363d", borderRadius: 6, padding: "6px 12px" },
  meta:  { color: "#8b949e", fontSize: 14 },
  table: { width: "100%", borderCollapse: "collapse" },
  th:    { textAlign: "left", padding: "10px 12px", borderBottom: "1px solid #30363d", color: "#58a6ff" },
  td:    { padding: "10px 12px", borderBottom: "1px solid #21262d" },
  btn:   { background: "#1f6feb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer" },
};

export function Profiles() {
  const [data, setData]       = useState<Profile[]>([]);
  const [meta, setMeta]       = useState<Meta>({ total: 0, page: 1, total_pages: 1 });
  const [page, setPage]       = useState(1);
  const [gender, setGender]   = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (p: number, g: string) => {
    setLoading(true);
    try {
      const res = await getProfiles({
        page: p, limit: 10,
        ...(g ? { gender: g } : {}),
      });
      setData(res.data.data as Profile[]);
      setMeta({
        total:       res.data.total,
        page:        res.data.page,
        total_pages: res.data.total_pages,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Async IIFE pattern avoids synchronous setState in effect body
  useEffect(() => {
    void (async () => { await load(1, gender); setPage(1); })();
  }, [gender, load]);

  useEffect(() => {
    void (async () => { await load(page, gender); })();
  }, [page, gender, load]);

  return (
    <div style={styles.page}>
      <h2>Profiles</h2>
      <div style={styles.row}>
        <select
          value={gender}
          onChange={e => setGender(e.target.value)}
          style={styles.sel}
        >
          <option value="">All genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <span style={styles.meta}>
          {meta.total} results — page {meta.page}/{meta.total_pages}
        </span>
      </div>

      {loading ? <p>Loading...</p> : (
        <table style={styles.table}>
          <thead>
            <tr>
              {["Name","Gender","Age","Age Group","Country"].map(h =>
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
                <td style={styles.td}>{r.age_group}</td>
                <td style={styles.td}>{r.country_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ ...styles.row, marginTop: 16 }}>
        <button disabled={page <= 1}              onClick={() => setPage(p => p - 1)} style={styles.btn}>← Prev</button>
        <button disabled={page >= meta.total_pages} onClick={() => setPage(p => p + 1)} style={styles.btn}>Next →</button>
      </div>
    </div>
  );
}