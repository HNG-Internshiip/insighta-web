// Only exports a single component — satisfies react-refresh/only-export-components
import React, { useState, useEffect, useCallback } from "react";
import { getMe, logout as apiLogout } from "../api";
import { AuthContext } from "./authContext";
import type { User } from "./authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const refresh = useCallback(async () => {
		try {
			const res = await getMe();
			setUser(res.data.data as User);
		} catch {
			setUser(null);
		}
	}, []);

	const logout = useCallback(async () => {
		await apiLogout().catch(() => { });
		sessionStorage.removeItem("access_token");
		sessionStorage.removeItem("refresh_token");
		setUser(null);
		window.location.href = "/login";
	}, []);

	useEffect(() => {
		void (async () => {
			await refresh();
			setLoading(false);
		})();
	}, [refresh]);

	return (
		<AuthContext.Provider value={{ user, loading, logout, refresh }}>
			{children}
		</AuthContext.Provider>
	);
}