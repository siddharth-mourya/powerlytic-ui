"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "../types/roles.types";

export type User = { email: string; role: Role };

type AuthState = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (token: string) => {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        set({ user: { email: decoded.email, role: decoded.role } });
        localStorage.setItem("token", token);
      },
      logout: () => {
        set({ user: null });
        localStorage.removeItem("token");
      },
    }),
    { name: "auth-storage" }
  )
);
