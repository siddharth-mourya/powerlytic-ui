import { api } from "@/app/_lib/api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { IDevice, IDeviceUpdateInput } from "./devices.types";

// -----------------------------
// 🔹 List All Devices
// -----------------------------
export type ListAllDevicesResponse = IDevice[];

export const useDevicesListRQ = () => {
  const getAllDevices = async () => {
    const res = await api.get("/device");
    if (res.status !== 200) throw new Error("Failed to fetch devices");
    return res.data as ListAllDevicesResponse;
  };

  return useQuery<ListAllDevicesResponse>({
    queryKey: [queryKeys.devices.listAll],
    queryFn: getAllDevices,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useDevicesListByOrgIdRQ = (organizationId?: string) => {
  const getAllDevices = async () => {
    const res = await api.get("/device", {
      params: organizationId ? { organizationId } : {},
    });
    if (res.status !== 200) throw new Error("Failed to fetch devices");
    return res.data as ListAllDevicesResponse;
  };

  return useQuery<ListAllDevicesResponse>({
    queryKey: [queryKeys.devices.listAllByOrgId],
    queryFn: getAllDevices,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

// -----------------------------
// 🔹 Get IDevice By ID
// -----------------------------
export const useDeviceByIdRQ = (id: string) => {
  const getDeviceById = async () => {
    const res = await api.get(`/device/${id}`);
    if (res.status !== 200) throw new Error("Failed to fetch device");
    return res.data as IDevice;
  };

  return useQuery<IDevice>({
    queryKey: [queryKeys.devices.byId, id],
    queryFn: getDeviceById,
    enabled: !!id,
  });
};

// -----------------------------
// 🔹 Create IDevice
// -----------------------------
export interface CreateDeviceDTO {
  name: string;
  imei: string;
  deviceModelId: string;
  metadata?: Record<string, unknown>;
}

export const useCreateDeviceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDeviceDTO) => {
      const res = await api.post("/device", data);
      if (res.status !== 201 && res.status !== 200)
        throw new Error("Failed to create device");
      return res.data as IDevice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAllByOrgId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAll],
      });
    },
  });
};

// -----------------------------
// 🔹 Update IDevice
// -----------------------------

export const useUpdateDeviceMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IDeviceUpdateInput) => {
      const res = await api.put(`/device/${id}`, data);
      if (res.status !== 200) throw new Error("Failed to update device");
      return res.data as IDevice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAllByOrgId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAll],
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.devices.byId, id] });
    },
  });
};

export interface UpdateDeviceOrgDTO {
  organizationId: string;
}

export const useUpdateDeviceOrgRQ = (deviceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateDeviceOrgDTO) => {
      const res = await api.put(`/device/${deviceId}`, data);
      if (res.status !== 200)
        throw new Error("Failed to update device organization");
      return res.data as IDevice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAll],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.byId, deviceId],
      });
    },
  });
};

// -----------------------------
// 🔹 Delete IDevice
// -----------------------------
export const useDeleteDeviceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/device/${id}`);
      if (res.status !== 200) throw new Error("Failed to delete device");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAllByOrgId],
      });
    },
  });
};
