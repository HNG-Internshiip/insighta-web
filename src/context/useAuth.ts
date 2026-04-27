import { useContext } from "react";
import { AuthContext, AuthCtx } from "./AuthContext";

export function useAuth(): AuthCtx {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}