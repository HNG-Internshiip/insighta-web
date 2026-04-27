// ─── pages/Account.tsx ───────────────────────────────────────────────────────
import { useAuth as useAuthCtx } from "../context/authContext";

export function Account() {
  const { user, logout } = useAuthCtx();
  return (
    <div style={styles.page}>
      <h2>My Account</h2>
      {user?.avatar_url && <img src={user.avatar_url} alt="avatar" style={styles.avatar} />}
      <dl style={styles.dl}>
        <dt style={styles.dt}>Username</dt> <dd style={styles.dd}>@{user?.username}</dd>
        <dt style={styles.dt}>Email</dt>    <dd style={styles.dd}>{user?.email ?? "—"}</dd>
        <dt style={styles.dt}>Role</dt>     <dd style={styles.dd}>{user?.role}</dd>
      </dl>
      <button onClick={logout} style={{ ...styles.btn2, background: "#c0392b", marginTop: 24 }}>
        Log out
      </button>
    </div>
  );
}