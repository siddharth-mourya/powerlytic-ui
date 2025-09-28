// context/AuthContext.tsx
"use client";

import { createContext, useContext } from "react";
import {
  useCurrentLoggedinUserRQ,
  User,
} from "../_react-query-hooks/auth/useCurrentLoggedinUserRQ";
import { useLogoutMutation } from "../_react-query-hooks/auth/useLogout";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  refetchUser: () => void;
  error: Error | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, refetch, error } = useCurrentLoggedinUserRQ();

  const { mutate: logoutAPI } = useLogoutMutation();

  const logout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    logoutAPI({ refreshToken: refreshToken || "" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: data ?? null,
        isLoading,
        refetchUser: refetch,
        error,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
