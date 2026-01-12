"use client";

import { Badge } from "@/app/_components/Badge/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/Card/Card";
import { IDevice } from "@/app/_lib/_react-query-hooks/device/devices.types";
import { useValuesLatestRQ } from "@/app/_lib/_react-query-hooks/values/useValuesRQ";
import {
  IValue,
  IValuesListResponse,
} from "@/app/_lib/_react-query-hooks/values/values.types";
import { Loader2, Activity } from "lucide-react";
import { useMemo } from "react";

interface LatestValuesSnapshotProps {
  deviceId: string;
  device: IDevice;
  isLoading: boolean;
}

interface PortSnapshot {
  portKey: string;
  name: string;
  value?: number | boolean | string;
  unit?: string;
  quality?: "good" | "bad" | "uncertain";
  timestamp?: string;
  type: "DIGITAL" | "ANALOG" | "MODBUS";
  modbusRead?: {
    readId: string;
    slaveId: string;
    name: string;
  };
}

export default function LatestValuesSnapshot({
  deviceId,
  device,
  isLoading: parentIsLoading,
}: LatestValuesSnapshotProps) {
  // Fetch latest values using the hook
  const { data: latestValuesResponse, isLoading } = useValuesLatestRQ(deviceId);

  // Transform API response to PortSnapshot format
  const snapshots = useMemo(() => {
    if (
      !latestValuesResponse?.data ||
      !Array.isArray(latestValuesResponse.data)
    ) {
      return [];
    }

    return latestValuesResponse.data.map((value: IValue) => {
      const port = device.ports?.find((p) => p.portKey === value.port.portKey);

      // Extract Modbus read metadata if present
      let modbusMeta = null;
      if (value.modbusRead) {
        modbusMeta = {
          readId: value.modbusRead.readId,
          slaveId: value.modbusRead.slaveId,
          name: value.modbusRead.name || value.modbusRead.tag,
        };
      }

      return {
        portKey: value.port.portKey,
        name: port?.name || value.port.portKey,
        value: value.calibratedValue,
        unit: value.unit || port?.unit,
        quality: value.quality,
        timestamp: value.ts,
        type: value.port.portType,
        modbusRead: modbusMeta,
      };
    });
  }, [latestValuesResponse, device.ports]);

  const fetchTime = useMemo(() => {
    if (latestValuesResponse?.data?.[0]?.ts) {
      return new Date(latestValuesResponse.data[0].ts).toLocaleTimeString();
    }
    return new Date().toLocaleTimeString();
  }, [latestValuesResponse]);

  if (isLoading || parentIsLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
      </div>
    );
  }

  // Group ports by type
  const digitalPorts = snapshots.filter((s) => s.type === "DIGITAL");
  const analogPorts = snapshots.filter((s) => s.type === "ANALOG");
  const modbusPorts = snapshots.filter((s) => s.type === "MODBUS");

  const getQualityColor = (quality?: string) => {
    switch (quality) {
      case "good":
        return "success";
      case "bad":
        return "error";
      case "uncertain":
        return "warning";
      default:
        return "info";
    }
  };

  const getQualityIcon = (quality?: string) => {
    switch (quality) {
      case "good":
        return "✓";
      case "bad":
        return "✗";
      case "uncertain":
        return "?";
      default:
        return "•";
    }
  };

  return (
    <div className="space-y-4">
      {/* Last Update Info - Compact */}
      <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-blue-600" />
          <span className="text-xs text-gray-700">
            Updated: <strong>{fetchTime}</strong>
          </span>
        </div>
        <Badge variant="info" className="text-xs animate-pulse">
          LIVE
        </Badge>
      </div>

      {/* Digital Inputs - Compact Grid */}
      {digitalPorts.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            🔘 <span>Digital</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {digitalPorts.map((port) => {
              const isOn = port.value === 1 || port.value === true;
              return (
                <div
                  key={port.portKey}
                  className="p-2 border rounded-lg bg-white hover:shadow-sm transition-shadow"
                >
                  <p className="text-xs font-medium text-gray-600 truncate">
                    {port.portKey}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isOn
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isOn ? "ON" : "OFF"}
                    </span>
                    <Badge
                      variant={getQualityColor(port.quality)}
                      className="text-xs"
                    >
                      {getQualityIcon(port.quality)}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Analog Inputs - Compact Grid */}
      {analogPorts.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            📊 <span>Analog</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {analogPorts.map((port) => (
              <div
                key={port.portKey}
                className="p-2 border rounded-lg bg-white hover:shadow-sm transition-shadow"
              >
                <p className="text-xs font-medium text-gray-600 truncate">
                  {port.portKey}
                </p>
                <p className="text-sm font-bold text-primary mt-1 truncate">
                  {typeof port.value === "number"
                    ? port.value.toFixed(1)
                    : port.value}
                </p>
                <div className="flex items-center justify-between">
                  {port.unit && (
                    <p className="text-xs text-gray-500 truncate">
                      {port.unit}
                    </p>
                  )}
                  <Badge
                    variant={getQualityColor(port.quality)}
                    className="text-xs ml-auto"
                  >
                    {getQualityIcon(port.quality)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modbus Inputs - Compact */}
      {modbusPorts.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            🔧 <span>Modbus</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {modbusPorts.map((port) => (
              <div
                key={port.portKey}
                className="p-3 border border-amber-200 rounded-lg bg-amber-50 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700">
                      {port.portKey}
                      {port.modbusRead && (
                        <span className="text-gray-500 ml-1">
                          (Slave {port.modbusRead.slaveId} •{" "}
                          {port.modbusRead.name})
                        </span>
                      )}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {port.name}
                    </p>
                  </div>
                  <Badge
                    variant={getQualityColor(port.quality)}
                    className="text-xs ml-2 flex-shrink-0"
                  >
                    {getQualityIcon(port.quality)}
                  </Badge>
                </div>
                <div className="pt-2 border-t border-amber-200">
                  <p className="text-sm font-bold text-gray-900">
                    {typeof port.value === "number"
                      ? port.value.toFixed(2)
                      : port.value || "-"}
                  </p>
                  {port.unit && (
                    <p className="text-xs text-gray-600">{port.unit}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {snapshots.length === 0 && (
        <div className="p-6 text-center border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-500 mb-1">No values available</p>
          <p className="text-xs text-gray-400">
            Device hasn`&apos;`t sent readings yet
          </p>
        </div>
      )}
    </div>
  );
}
