import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { api } from "@/app/_lib/api/axios";
import { IPortType } from "./portTypes.types";

export type PortTypesResponse = Array<IPortType>;

export const usePortTypes = () => {
  const getAllPortTypes = async () => {
    const res = await api.get("/port-types");

    if (res.status != 200) throw new Error("Unauthorized");
    return res.data as Promise<PortTypesResponse>;
  };

  return useQuery<PortTypesResponse>({
    queryKey: [queryKeys.portTypes.listAll],
    queryFn: getAllPortTypes,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
