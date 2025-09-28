// store/authStore.ts
import { create } from "zustand";
import { Role } from "../types/roles.types";

type User = {
  _id: string;
  role: Role;
  orgId: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
