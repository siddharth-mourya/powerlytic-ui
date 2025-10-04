import { api } from "@/app/_lib/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { queryKeys } from "../queryKeys";
import { DeviceModel, NewDeviceModelParams } from "./deviceModels.types";

export const useDeviceModelMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationFn = (params: NewDeviceModelParams): Promise<DeviceModel> => {
    return api.post("/device-models", { ...params }).then((res) => res.data);
  };

  return useMutation<DeviceModel, Error, NewDeviceModelParams>({
    mutationFn: mutationFn,
    retry: 1,
    onSuccess: (data) => {
      toast(`Device ${data.name} added successfully`);
      router.push("/dashboard/device-models");
    },
    onError: (error) => {
      toast.error("Failed to add device");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.deviceModels.listAll],
      });
    },
  });
};
