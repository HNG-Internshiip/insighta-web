import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function AuthCallback() {
  const navigate  = useNavigate();
  const { refresh } = useAuth();

  useEffect(() => {
    void (async () => {
      const hash   = window.location.hash.slice(1);
      const params = new URLSearchParams(hash);
      const at     = params.get("access_token");
      const rt     = params.get("refresh_token");

      if (at && rt) {
        sessionStorage.setItem("access_token",  at);
        sessionStorage.setItem("refresh_token", rt);
        window.history.replaceState(null, "", "/dashboard");
      }

      await refresh();
      navigate("/dashboard", { replace: true });
    })();
  }, [navigate, refresh]);

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", display: "flex",
      alignItems: "center", justifyContent: "center", color: "#58a6ff", fontSize: 18 }}>
      Completing login...
    </div>
  );
}