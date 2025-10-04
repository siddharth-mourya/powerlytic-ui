import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { api } from "@/app/_lib/api/axios";
import { DeviceModel } from "./deviceModels.types";

export const useDeviceModelDetailsRQ = (id: string) => {
  const getDeviceModelsDetails = async () => {
    if (id) {
      const res = await api.get(`/device-models/${id}`);

      if (res.status != 200) throw new Error("Unauthorized");
      return res.data as Promise<DeviceModel>;
    }
    return Promise.reject("No Id");
  };

  return useQuery<DeviceModel>({
    queryKey: [queryKeys.deviceModels.specificDevice, id],
    queryFn: getDeviceModelsDetails,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
