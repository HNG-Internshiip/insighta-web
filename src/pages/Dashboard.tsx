// ─── pages/Dashboard.tsx ─────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { getProfiles } from "../api";
import { useAuth }     from "../context/authContext";

export function Dashboard() {
  const { user } = useAuth();
  const [total, setTotal]       = useState<number | null>(null);
  const [byGender, setByGender] = useState<{ male: number; female: number }>({ male: 0, female: 0 });

  useEffect(() => {
    Promise.all([
      getProfiles({ limit: 1 }),
      getProfiles({ limit: 1, gender: "male" }),
      getProfiles({ limit: 1, gender: "female" }),
    ]).then(([all, male, female]) => {
      setTotal(all.data.total);
      setByGender({ male: male.data.total, female: female.data.total });
    });
  }, []);

  return (
    <div style={styles.page}>
      <h2>Welcome, @{user?.username}</h2>
      <div style={styles.grid}>
        <Stat label="Total Profiles"  value={total ?? "..."} />
        <Stat label="Male Profiles"   value={byGender.male}  />
        <Stat label="Female Profiles" value={byGender.female}/>
        <Stat label="Your Role"       value={user?.role ?? ""} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div style={styles.stat}>
      <div style={styles.statVal}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}