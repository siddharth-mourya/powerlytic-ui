import { api } from "@/app/_lib/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { queryKeys } from "../queryKeys";
import { NewOrganizationParams, Organization } from "./organizations.types";

export const useOrganizationsMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationFn = (params: NewOrganizationParams): Promise<Organization> => {
    return api.post("/organizations", { ...params }).then((res) => res.data);
  };

  return useMutation<Organization, Error, NewOrganizationParams>({
    mutationFn: mutationFn,
    retry: 1,
    onSuccess: (data) => {
      toast(`organizations ${data.name} added successfully`);
      router.push("/dashboard/organizations");
    },
    onError: () => {
      toast.error("Failed to add organization");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.organizations.listAll],
      });
    },
  });
};
