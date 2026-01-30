import { api } from "@/app/_lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import {
  IValuesListResponse,
  IValuesTableResponse,
  IValuesTimeSeriesResponse,
  IModbusReadTimeSeriesResponse,
  IValuesSnapshotResponse,
  IPortStatsResponse,
  IDeviceStatusResponse,
} from "./values.types";

// 🔹 Parameters interface
export interface IValuesQueryParams {
  portKey?: string;
  readId?: string;
  startTime?: string;
  endTime?: string;
  limit?: number;
}

// 1️⃣ Get All Values (with filters)
// GET /api/devices/:deviceId
export const useValuesListRQ = (
  deviceId: string,
  params?: IValuesQueryParams,
) => {
  const getValues = async () => {
    const res = await api.get(`/values/devices/${deviceId}`, { params });
    if (res.status !== 200) throw new Error("Failed to fetch values");
    return res.data as IValuesListResponse;
  };

  return useQuery({
    queryKey: [queryKeys.values.list, deviceId, params],
    queryFn: getValues,
    enabled: !!deviceId,
    staleTime: 1000 * 30, // 30 seconds
  });
};

// 2️⃣ Get Latest Values (one per port)
// GET /api/devices/:deviceId/latest
export const useValuesLatestRQ = (deviceId: string) => {
  const getLatestValues = async () => {
    const res = await api.get(`/values/devices/${deviceId}/latest`);
    if (res.status !== 200) throw new Error("Failed to fetch latest values");
    return res.data as IValuesSnapshotResponse;
  };

  return useQuery({
    queryKey: [queryKeys.values.latest, deviceId],
    queryFn: getLatestValues,
    enabled: !!deviceId,
    staleTime: 1000 * 3, // 3 seconds
    refetchInterval: 1000 * 3, // Refetch every 3 seconds
  });
};

// 3️⃣ Get Port-Specific Values
// GET /api/devices/:deviceId/port/:portKey
export const useValuesPortSpecificRQ = (
  deviceId: string,
  portKey: string,
  params?: IValuesQueryParams,
) => {
  const getPortValues = async () => {
    const res = await api.get(`/values/devices/${deviceId}/port/${portKey}`, {
      params,
    });
    if (res.status !== 200) throw new Error("Failed to fetch port values");
    return res.data as IValuesListResponse;
  };

  return useQuery({
    queryKey: [queryKeys.values.portSpecific, deviceId, portKey, params],
    queryFn: getPortValues,
    enabled: !!deviceId && !!portKey,
    staleTime: 1000 * 30,
  });
};

// 4️⃣ Get Modbus Read Values
// GET /api/devices/:deviceId/modbus/:readId
export const useValuesModbusReadRQ = (
  deviceId: string,
  readId: string,
  params?: IValuesQueryParams,
) => {
  const getModbusValues = async () => {
    const res = await api.get(`/values/devices/${deviceId}/modbus/${readId}`, {
      params,
    });
    if (res.status !== 200) throw new Error("Failed to fetch modbus values");
    return res.data as IValuesListResponse;
  };

  return useQuery({
    queryKey: [queryKeys.values.modbusRead, deviceId, readId, params],
    queryFn: getModbusValues,
    enabled: !!deviceId && !!readId,
    staleTime: 1000 * 30,
  });
};

// 5️⃣ Get Port Statistics
// GET /api/devices/:deviceId/stats/:portKey
export const useValuesPortStatsRQ = (
  deviceId: string,
  portKey: string,
  startTime: string,
  endTime: string,
) => {
  const getPortStats = async () => {
    const res = await api.get(`/values/devices/${deviceId}/stats/${portKey}`, {
      params: { startTime, endTime },
    });
    if (res.status !== 200) throw new Error("Failed to fetch port stats");
    return res.data as IPortStatsResponse;
  };

  return useQuery({
    queryKey: [queryKeys.values.stats, deviceId, portKey, startTime, endTime],
    queryFn: getPortStats,
    enabled: !!deviceId && !!portKey && !!startTime && !!endTime,
    staleTime: 1000 * 60, // 1 minute
  });
};

// 6️⃣ Table View (All ports in one table)
// GET /api/devices/:deviceId/table
export const useValuesTableRQ = (
  deviceId: string,
  params?: IValuesQueryParams,
) => {
  const getTableValues = async () => {
    const res = await api.get(`/values/devices/${deviceId}/table`, {
      params,
    });
    if (res.status !== 200) throw new Error("Failed to fetch table values");
    return res.data as IValuesTableResponse;
  };

  return useQuery({
    queryKey: [queryKeys.values.table, deviceId, params],
    queryFn: getTableValues,
    enabled: !!deviceId,
    staleTime: 1000 * 30,
  });
};

// 7️⃣ Latest Snapshot (Current values)
// GET /api/devices/:deviceId/snapshot
export const useValuesSnapshotRQ = (deviceId: string) => {
  const getSnapshot = async () => {
    const res = await api.get(`/values/devices/${deviceId}/snapshot`);
    if (res.status !== 200) throw new Error("Failed to fetch snapshot");
    return res.data as IValuesSnapshotResponse;
  };

  return useQuery({
    queryKey: [queryKeys.values.snapshot, deviceId],
    queryFn: getSnapshot,
    enabled: !!deviceId,
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 30, // Real-time updates every 30 seconds
  });
};

// 8️⃣ Time-Series Data (for charts)
// GET /api/devices/:deviceId/timeseries/:portKey
export const useValuesTimeseriesRQ = (
  deviceId: string,
  portKey: string,
  params?: IValuesQueryParams,
) => {
  const getTimeseries = async () => {
    const res = await api.get(
      `/values/devices/${deviceId}/timeseries/${portKey}`,
      { params },
    );
    if (res.status !== 200) throw new Error("Failed to fetch timeseries");
    return res.data as IValuesTimeSeriesResponse;
  };

  return useQuery({
    queryKey: [queryKeys.values.timeseries, deviceId, portKey, params],
    queryFn: getTimeseries,
    enabled: !!deviceId && !!portKey,
    staleTime: 1000 * 60, // 1 minute
  });
};

// 9️⃣ Modbus Read Time-Series (for charts)
// GET /api/devices/:deviceId/timeseries/modbus/:readId
export const useValuesModbusTimeseriesRQ = (
  deviceId: string,
  readId: string,
  params?: IValuesQueryParams,
) => {
  const getModbusTimeseries = async () => {
    const res = await api.get(
      `/values/devices/${deviceId}/timeseries/modbus/${readId}`,
      { params },
    );
    if (res.status !== 200)
      throw new Error("Failed to fetch modbus timeseries");
    return res.data as IModbusReadTimeSeriesResponse;
  };

  return useQuery({
    queryKey: [queryKeys.values.modbusTimeseries, deviceId, readId, params],
    queryFn: getModbusTimeseries,
    enabled: !!deviceId && !!readId,
    staleTime: 1000 * 60,
  });
};

// 🔟 Device Status Summary
// GET /api/devices/:deviceId/status
export const useDeviceValuesStatusRQ = (deviceId: string) => {
  const getDeviceStatus = async () => {
    const res = await api.get(`/values/devices/${deviceId}/status`);
    if (res.status !== 200) throw new Error("Failed to fetch device status");
    return res.data as IDeviceStatusResponse;
  };

  return useQuery({
    queryKey: [queryKeys.values.status, deviceId],
    queryFn: getDeviceStatus,
    enabled: !!deviceId,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
  });
};
