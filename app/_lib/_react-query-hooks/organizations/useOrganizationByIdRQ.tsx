import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { api } from "@/app/_lib/api/axios";
import { OrganizationByIdResponse } from "./organizations.types";

export interface OrganizationDetails {}

export const useOrganizationByIdRQ = (id: string) => {
  const getOrganizationDetails = async () => {
    console.log("getting organization details by id", id);
    if (id) {
      const res = await api.get(`/organizations/${id}`);

      if (res.status != 200) throw new Error("Unauthorized");
      return res.data as Promise<OrganizationByIdResponse>;
    }
    return Promise.reject("No Id");
  };

  return useQuery<OrganizationByIdResponse>({
    queryKey: [queryKeys.organizations.specificOrg, id],
    queryFn: getOrganizationDetails,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
