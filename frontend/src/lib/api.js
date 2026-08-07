import axios from "axios";

const configuredUrl = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || "";
const normalizedConfiguredUrl = typeof configuredUrl === "string" ? configuredUrl.replace(/\/+$/, "") : "";

// REACT_APP_API_URL may be configured as either the backend root or the full /api URL.
export const API = normalizedConfiguredUrl
  ? (normalizedConfiguredUrl.endsWith("/api") ? normalizedConfiguredUrl : `${normalizedConfiguredUrl}/api`)
  : "http://localhost:4000/api";

export const BACKEND_URL = API.replace(/\/api$/, "");
export const api = axios.create({ baseURL: API, timeout: 15000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("malhar_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getToken = () => localStorage.getItem("malhar_admin_token");
export const setToken = (t) => localStorage.setItem("malhar_admin_token", t);
export const clearToken = () => localStorage.removeItem("malhar_admin_token");
