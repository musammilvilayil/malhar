import axios from "axios";

const rawConfiguredUrl = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || "";
const configuredUrl = typeof rawConfiguredUrl === "string" ? rawConfiguredUrl.trim() : "";

const trimTrailingSlashes = (value) => {
  let result = value;
  while (result.endsWith("/")) result = result.slice(0, -1);
  return result;
};

const normalizedConfiguredUrl = trimTrailingSlashes(configuredUrl);

// REACT_APP_API_URL may be configured as either the backend root or the full /api URL.
export const API = normalizedConfiguredUrl
  ? (normalizedConfiguredUrl.endsWith("/api") ? normalizedConfiguredUrl : `${normalizedConfiguredUrl}/api`)
  : "http://localhost:4000/api";

export const BACKEND_URL = API.endsWith("/api") ? API.slice(0, -4) : API;
export const api = axios.create({ baseURL: API, timeout: 15000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("malhar_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getToken = () => localStorage.getItem("malhar_admin_token");
export const setToken = (t) => localStorage.setItem("malhar_admin_token", t);
export const clearToken = () => localStorage.removeItem("malhar_admin_token");
