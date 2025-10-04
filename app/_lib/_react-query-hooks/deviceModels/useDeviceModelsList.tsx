import { api } from "@/app/_lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { DeviceModel } from "./deviceModels.types";

export type ListAllDeviceModelResponse = Array<DeviceModel>;

export const useDeviceModelsListRQ = () => {
  const getAllDeviceModels = async () => {
    const res = await api.get("/device-models");

    if (res.status != 200) throw new Error("Unauthorized");
    return res.data as Promise<ListAllDeviceModelResponse>;
  };

  return useQuery<ListAllDeviceModelResponse>({
    queryKey: [queryKeys.deviceModels.listAll],
    queryFn: getAllDeviceModels,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
