import { useEffect, useRef } from "react";
import { useNavigate }       from "react-router-dom";
import { useAuth }           from "../context/useAuth";

export function AuthCallback() {
  const navigate    = useNavigate();
  const { refresh } = useAuth();
  const ran         = useRef(false); // prevent double-run in StrictMode

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    void (async () => {
      // 1. Read tokens from URL hash
      const hash   = window.location.hash.slice(1);
      const params = new URLSearchParams(hash);
      const at     = params.get("access_token");
      const rt     = params.get("refresh_token");

      if (at && rt) {
        // 2. Store before any API call
        sessionStorage.setItem("access_token",  at);
        sessionStorage.setItem("refresh_token", rt);
        // 3. Clean URL
        window.history.replaceState(null, "", "/auth/callback");
      } else {
        // No tokens in hash — something went wrong
        navigate("/login", { replace: true });
        return;
      }

      // 4. Now fetch user with the stored token
      await refresh();

      // 5. Navigate to dashboard
      navigate("/dashboard", { replace: true });
    })();
  }, [navigate, refresh]);

  return (
    <div style={{
      minHeight: "100vh", background: "#0d1117",
      display: "flex", alignItems: "center",
      justifyContent: "center", color: "#58a6ff", fontSize: 18,
    }}>
      Completing login...
    </div>
  );
}