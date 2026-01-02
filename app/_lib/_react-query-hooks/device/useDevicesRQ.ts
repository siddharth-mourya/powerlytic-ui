import { api } from "@/app/_lib/api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { Device, UpdateDeviceDTO } from "./devices.types";

// -----------------------------
// 🔹 List All Devices
// -----------------------------
export type ListAllDevicesResponse = Device[];

export const useDevicesListRQ = () => {
  const getAllDevices = async () => {
    console.log("sterted ");
    const res = await api.get("/devices");
    console.log("fetching", res);
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
    const res = await api.get("/devices", {
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
// 🔹 Get Device By ID
// -----------------------------
export const useDeviceByIdRQ = (id: string) => {
  const getDeviceById = async () => {
    const res = await api.get(`/devices/${id}`);
    if (res.status !== 200) throw new Error("Failed to fetch device");
    return res.data as Device;
  };

  return useQuery<Device>({
    queryKey: [queryKeys.devices.byId, id],
    queryFn: getDeviceById,
    enabled: !!id,
  });
};

// -----------------------------
// 🔹 Create Device
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
      const res = await api.post("/devices", data);
      if (res.status !== 201 && res.status !== 200)
        throw new Error("Failed to create device");
      return res.data as Device;
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
// 🔹 Update Device
// -----------------------------

export const useUpdateDeviceMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateDeviceDTO) => {
      const res = await api.put(`/devices/${id}`, data);
      if (res.status !== 200) throw new Error("Failed to update device");
      return res.data as Device;
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
      const res = await api.put(`/devices/${deviceId}`, data);
      if (res.status !== 200)
        throw new Error("Failed to update device organization");
      return res.data as Device;
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
// 🔹 Delete Device
// -----------------------------
export const useDeleteDeviceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/devices/${id}`);
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
