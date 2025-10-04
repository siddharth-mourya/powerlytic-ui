import { api } from "@/app/_lib/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Role } from "../../types/roles.types";
import { queryKeys } from "../queryKeys";
import { User } from "./useCurrentLoggedinUserRQ";

export interface DecodedToken {
  userId: string;
  role: Role;
  orgId: string;
  email: string;
  iat: number;
  exp: number;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = (params: LoginRequest): Promise<LoginResponse> => {
    return api
      .post("/auth/login", { email: params.email, password: params.password })
      .then((res) => res.data);
  };

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: mutationFn,
    retry: 1,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.auth.profile] });
    },
  });
};
