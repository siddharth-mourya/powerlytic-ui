// lib/api/axios.ts
import axios from "axios";

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

export const api = axios.create({
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // attach token if exists
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: handle logout or redirect
      console.warn("Unauthorized! Redirecting...");
    }
    return Promise.reject(error);
  }
);
