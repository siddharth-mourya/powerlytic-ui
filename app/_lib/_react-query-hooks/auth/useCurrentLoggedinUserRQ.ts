import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { api } from "@/app/_lib/api/axios";
import { useAuthStore } from "../../stores/useAuthStore";
import { Role } from "../../types/roles.types";

export interface User {
  _id: string;
  email: string;
  role: Role;
  orgId: string;
  phone?: string;
  name?: string;
}
export const useCurrentLoggedinUserRQ = () => {
  const getUser = async () => {
    const res = await api.get("/auth/me");

    if (res.status != 200) throw new Error("Unauthorized");
    return res.data as Promise<User>;
  };

  return useQuery<User>({
    queryKey: [queryKeys.auth.profile],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
