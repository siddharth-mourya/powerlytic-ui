"use client";
import { api } from "@/app/_lib/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { queryKeys } from "../queryKeys";

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutationFn = ({ refreshToken }: { refreshToken: string }) => {
    return api.post("/auth/logout", { refreshToken }).then((res) => res.data);
  };

  return useMutation({
    mutationFn: mutationFn,
    retry: 1,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [queryKeys.auth.profile] });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};
