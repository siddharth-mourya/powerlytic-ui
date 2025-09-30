import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { api } from "@/app/_lib/api/axios";
import { Role } from "../../types/roles.types";

export interface User {
  _id: string;
  email: string;
  name: string;
  phone: string;
  role: Role;
  organization: {
    _id: string;
    name: string;
    address: string;
    orgEmail: string;
    orgPhone: string;
    isActive: boolean;
    cin: string;
    createdAt: string;
    updatedAt: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export type ListAllUsersResponse = Array<User>;

export const useListAllUsersRQ = () => {
  const getAllUsers = async () => {
    const res = await api.get("/users");

    if (res.status != 200) throw new Error("Unauthorized");
    return res.data as Promise<ListAllUsersResponse>;
  };

  return useQuery<ListAllUsersResponse>({
    queryKey: [queryKeys.users.listAll],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
