// lib/api/axios.ts
import axios from "axios";
import { redirectToLogin } from "../utils/redirectHelper";

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // attach token if exists
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to logout/login
    const status = error.response?.status;
    const url = error.config?.url || error.response?.config?.url || "";

    // Skip for /api/auth/me to avoid infinite loops (Authenticator already handles it)
    const isAuthMeEndpoint =
      url.includes("/api/auth/me") || url.includes("/auth/me");

    if (status === 401 && !isAuthMeEndpoint) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
