import { api } from "@/app/_lib/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKeys } from "../queryKeys";
import { IPortType, PortCategory, ValueFormat } from "./portTypes.types";

interface UpdatePortTypeRequestParam {
  _id: string;
  name: string;
  category: PortCategory;
  valueFormat: ValueFormat;
  description: string;
}

export const useUpdatePortTypeMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = (
    params: UpdatePortTypeRequestParam
  ): Promise<IPortType> => {
    return api
      .put(`/port-types/${params._id}`, { ...params })
      .then((res) => res.data);
  };

  return useMutation<IPortType, Error, UpdatePortTypeRequestParam>({
    mutationFn: mutationFn,
    retry: 1,
    onSuccess: (data) => {
      toast(`${data.name} with ${data.category} is updated successfully`);
    },
    onError: (error) => {
      toast.error(`Failed to update the port type`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.portTypes.listAll],
      });
    },
  });
};
