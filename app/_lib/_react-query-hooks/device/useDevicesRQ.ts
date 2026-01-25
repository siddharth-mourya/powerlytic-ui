import { api } from "@/app/_lib/api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { IDevice, IDeviceUpdateInput } from "./devices.types";
import { toast } from "react-toastify";

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
      toast.success("Device created successfully");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAllByOrgId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAll],
      });
    },
    onError: () => {
      toast.error("Failed to create device");
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
      toast.success("Device updated successfully");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAllByOrgId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAll],
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.devices.byId, id] });
    },
    onError: () => {
      toast.error("Failed to update device");
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
      toast.success("Device organization updated successfully");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAll],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.byId, deviceId],
      });
    },
    onError: () => {
      toast.error("Failed to update device organization");
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
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.listAll],
      });
      toast.success("Device deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete device");
    },
  });
};

// ===============================
// 🔹 Deployment Status & Config
// ===============================

export interface DeploymentStatus {
  status: "pending" | "sent" | "applied" | "error";
  errorMessage?: string;
  sentAt?: string;
  savedAt?: string;
}

export const useDeploymentStatusRQ = (
  deviceId: string,
  enabled: boolean = false,
) => {
  const getDeploymentStatus = async () => {
    const res = await api.get(`/device/${deviceId}/deployment-status`);
    if (res.status !== 200)
      throw new Error("Failed to fetch deployment status");
    return res.data as DeploymentStatus;
  };

  return useQuery<DeploymentStatus>({
    queryKey: [queryKeys.devices.deploymentStatus, deviceId],
    queryFn: getDeploymentStatus,
    refetchInterval: enabled ? 5000 : false, // Poll every 5 second when enabled
    enabled: enabled && !!deviceId,
    retry: 1,
    staleTime: 0, // Always treat data as stale during polling
  });
};

export const useDeployConfigMutation = (deviceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post(`/device/${deviceId}/deploy`);
      if (res.status !== 200 && res.status !== 201)
        throw new Error("Failed to deploy configuration");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Deployment initiated successfully");
      // Immediately invalidate and refetch deployment status
      queryClient.invalidateQueries({
        queryKey: [queryKeys.devices.deploymentStatus, deviceId],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to deploy configuration";
      toast.error(errorMessage);
    },
  });
};
