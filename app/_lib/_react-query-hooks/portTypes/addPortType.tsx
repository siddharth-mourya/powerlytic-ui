import { api } from "@/app/_lib/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKeys } from "../queryKeys";
import { IPortType, PortCategory, ValueFormat } from "./portTypes.types";

interface NewPortTypeRequestParam {
  name: string;
  category: PortCategory;
  valueFormat: ValueFormat;
  description: string;
}

export const useCreatePortTypeMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = (params: NewPortTypeRequestParam): Promise<IPortType> => {
    return api.post(`/port-types`, { ...params }).then((res) => res.data);
  };

  return useMutation<IPortType, Error, NewPortTypeRequestParam>({
    mutationFn: mutationFn,
    retry: 1,
    onSuccess: (data) => {
      toast(`${data.name} with ${data.category} is created successfully`);
    },
    onError: () => {
      toast.error(`Failed to create the port type`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.portTypes.listAll],
      });
    },
  });
};
