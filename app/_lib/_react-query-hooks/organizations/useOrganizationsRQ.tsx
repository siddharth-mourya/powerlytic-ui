import { api } from "@/app/_lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { Organization } from "./organizations.types";

export type ListAllOrganizationResponse = Array<Organization>;

export const useOrganizationsRQ = () => {
  const getAllDeviceModels = async () => {
    const res = await api.get("/organizations");

    if (res.status != 200) throw new Error("Unauthorized");
    return res.data as Promise<ListAllOrganizationResponse>;
  };

  return useQuery<ListAllOrganizationResponse>({
    queryKey: [queryKeys.organizations.listAll],
    queryFn: getAllDeviceModels,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
