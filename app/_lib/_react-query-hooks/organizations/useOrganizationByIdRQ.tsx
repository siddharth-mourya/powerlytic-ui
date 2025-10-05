import { api } from "@/app/_lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { OrganizationByIdResponse } from "./organizations.types";

export const useOrganizationByIdRQ = (id: string) => {
  const getOrganizationDetails = async () => {
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
