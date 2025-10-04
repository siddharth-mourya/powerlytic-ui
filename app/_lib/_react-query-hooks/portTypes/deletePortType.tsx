import { api } from "@/app/_lib/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKeys } from "../queryKeys";
import { IPortType } from "./portTypes.types";

interface DeleteRequestType {
  _id: string;
}

export const useDeletePortTypeMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = ({ _id }: DeleteRequestType): Promise<IPortType> => {
    return api.delete(`/port-types/${_id}`).then((res) => res.data);
  };

  return useMutation<IPortType, Error, DeleteRequestType>({
    mutationFn: mutationFn,
    retry: 1,
    onSuccess: () => {
      toast(`Port type is deleted successfully`);
    },
    onError: () => {
      toast.error(`Failed to delete the port type`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.portTypes.listAll],
      });
    },
  });
};
