// lib/api/axios.ts
import axios from "axios";
import { redirectToLogin } from "../utils/redirectHelper";

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
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(
      "eeee",
      error,
      (error.request.responseUrl as string).includes("/api/auth/me")
    );
    // Redirect to login if any api returns in 401 and skip for auth/me api as it already redirect to login from Authenitcator and it would trigger a infite loop
    if (
      error.response?.status === 401 &&
      !(error.request.responseUrl as string).includes("/api/auth/me")
    ) {
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);
