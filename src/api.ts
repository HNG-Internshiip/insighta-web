import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const BASE = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL:         BASE,
  withCredentials: true,
  headers: { "X-API-Version": "1" },
});

// Auto-refresh on 401
let refreshing: Promise<void> | null = null;

api.interceptors.response.use(
  r => r,
  async (err) => {
    const config = err.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (err.response?.status !== 401 || config._retry) throw err;
    config._retry = true;

    if (!refreshing) {
      refreshing = api.post("/auth/refresh")
        .then(() => { refreshing = null; })
        .catch(() => {
          refreshing = null;
          window.location.href = "/login";
        });
    }
    await refreshing;
    return api(config);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const getMe    = ()  => api.get("/auth/me");
export const logout   = ()  => api.post("/auth/logout");
export const loginUrl = ()  => `${BASE}/auth/github?from=web`;

// ── Profiles ──────────────────────────────────────────────────────────────────
export interface ProfileParams {
  gender?:    string;
  age_group?: string;
  country_id?:string;
  min_age?:   number;
  max_age?:   number;
  sort_by?:   string;
  order?:     string;
  page?:      number;
  limit?:     number;
}

export const getProfiles    = (params: ProfileParams = {}) =>
  api.get("/api/profiles", { params });

export const getProfile     = (id: string) =>
  api.get(`/api/profiles/${id}`);

export const searchProfiles = (q: string, params: ProfileParams = {}) =>
  api.get("/api/profiles/search", { params: { q, ...params } });

export const createProfile  = (name: string) =>
  api.post("/api/profiles", { name });

export const deleteProfile  = (id: string) =>
  api.delete(`/api/profiles/${id}`);

export const exportUrl      = (params: ProfileParams = {}) => {
  const q = new URLSearchParams(
    Object.entries({ ...params, format: "csv" })
      .filter(([, v]) => v != null)
      .map(([k, v]) => [k, String(v)])
  ).toString();
  return `${BASE}/api/profiles/export?${q}`;
};