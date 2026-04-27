import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../api";

interface Profile {
  id:                  string;
  name:                string;
  gender:              string;
  gender_probability:  number;
  age:                 number;
  age_group:           string;
  country_id:          string;
  country_name:        string;
  country_probability: number;
  created_at:          string;
}

const styles: Record<string, React.CSSProperties> = {
  page: { padding: 32, color: "#c9d1d9", maxWidth: 600, margin: "0 auto" },
  dl:   { display: "grid", gridTemplateColumns: "200px 1fr", gap: "10px 0" },
  dt:   { color: "#8b949e", fontWeight: 600 },
  dd:   { color: "#c9d1d9", margin: 0 },
};

export function ProfileDetail() {
  const { id }                      = useParams<{ id: string }>();
  const [profile, setProfile]       = useState<Profile | null>(null);
  const [error, setError]           = useState("");

  useEffect(() => {
    if (!id) return;
    void (async () => {
      try {
        const res = await getProfile(id);
        setProfile(res.data.data as Profile);
      } catch {
        setError("Profile not found");
      }
    })();
  }, [id]);

  if (error)    return <div style={styles.page}><p style={{ color: "red" }}>{error}</p></div>;
  if (!profile) return <div style={styles.page}><p>Loading...</p></div>;

  return (
    <div style={styles.page}>
      <h2>{profile.name}</h2>
      <dl style={styles.dl}>
        {(Object.entries(profile) as [string, string | number][]).map(([k, v]) => (
          <React.Fragment key={k}>
            <dt style={styles.dt}>{k}</dt>
            <dd style={styles.dd}>{String(v)}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
}