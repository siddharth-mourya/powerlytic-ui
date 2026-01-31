"use client";

import { Badge } from "@/app/_components/Badge/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/Card/Card";
import { useValuesLatestRQ } from "@/app/_lib/_react-query-hooks/values/useValuesRQ";
import {
  ILatestPort,
  ILatestModbusPort,
  IModbusRead,
} from "@/app/_lib/_react-query-hooks/values/values.types";
import { Loader2, Activity, Info } from "lucide-react";
import { useMemo } from "react";

// Helper function to check if port is Modbus
function isModbusPort(port: unknown): port is ILatestModbusPort {
  const p = port as Record<string, unknown>;
  return (
    p.portType === "MODBUS" &&
    Array.isArray(p.reads) &&
    (p.reads as unknown[]).length > 0
  );
}

// Helper function to check if port is Digital
function isDigitalPort(port: unknown): boolean {
  const p = port as Record<string, unknown>;
  return (
    typeof p.portType === "string" &&
    p.portType !== "MODBUS" &&
    p.calibratedValue !== null &&
    (p.calibratedValue === 0 || p.calibratedValue === 1)
  );
}

// Helper function to check if port is Analog
function isAnalogPort(port: unknown): boolean {
  const p = port as Record<string, unknown>;
  return (
    typeof p.portType === "string" &&
    p.portType !== "MODBUS" &&
    p.calibratedValue !== null &&
    p.calibratedValue !== 0 &&
    p.calibratedValue !== 1
  );
}

function PortDetailsTooltip({
  port,
}: {
  port: ILatestPort | ILatestModbusPort;
}) {
  const timestamp = port.timestamp
    ? new Date(port.timestamp).toLocaleString()
    : "N/A";

  return (
    <div className="tooltip tooltip-left tooltip-hover">
      {/* Tooltip content */}
      <div className="tooltip-content z-50 w-56 rounded-lg bg-neutral text-neutral-content p-3 text-xs shadow-lg">
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Raw Value</span>
            <div className="opacity-70">{port.rawValue ?? "N/A"}</div>
          </div>

          <div>
            <span className="font-semibold">Calibration</span>
            <div className="opacity-70">
              <div>Scaling: {port.calibration.scaling}</div>
              <div>Offset: {port.calibration.offset}</div>
            </div>
          </div>

          <div>
            <span className="font-semibold">Status</span>
            <div className="opacity-70">{port.status}</div>
          </div>

          <div>
            <span className="font-semibold">Last Updated</span>
            <div className="opacity-70">{timestamp}</div>
          </div>
        </div>
      </div>

      {/* Trigger */}
      <button
        className="btn btn-ghost btn-xs text-base-content/60 hover:text-base-content"
        aria-label="Port details"
      >
        <Info size={14} />
      </button>
    </div>
  );
}
// Modbus Read Details Tooltip

function ModbusReadDetailsTooltip({
  read,
  slaveName,
}: {
  read: IModbusRead;
  slaveName: string;
}) {
  const timestamp = read.timestamp
    ? new Date(read.timestamp).toLocaleString()
    : "N/A";

  return (
    <div className="z-1 tooltip tooltip-left tooltip-hover">
      {/* Tooltip content */}
      <div className="tooltip-content z-50 w-60 rounded-lg bg-neutral text-neutral-content p-3 text-xs shadow-lg">
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Slave</span>
            <div className="opacity-70">{slaveName}</div>
          </div>

          <div>
            <span className="font-semibold">Read ID</span>
            <div className="opacity-70 truncate">{read.readId}</div>
          </div>

          <div>
            <span className="font-semibold">Raw Value</span>
            <div className="opacity-70">{read.rawValue ?? "N/A"}</div>
          </div>

          <div>
            <span className="font-semibold">Calibration</span>
            <div className="opacity-70">
              <div>Scaling: {read.scaling}</div>
              <div>Offset: {read.offset}</div>
            </div>
          </div>

          <div>
            <span className="font-semibold">Register Type</span>
            <div className="opacity-70">{read.registerType}</div>
          </div>

          <div>
            <span className="font-semibold">Last Updated</span>
            <div className="opacity-70">{timestamp}</div>
          </div>
        </div>
      </div>

      {/* Trigger */}
      <button
        className="btn btn-ghost btn-xs text-warning hover:text-warning-content"
        aria-label="Modbus read details"
      >
        <Info size={14} />
      </button>
    </div>
  );
}

interface LatestValuesSnapshotProps {
  deviceId: string;
}

export default function LatestValuesSnapshot({
  deviceId,
}: LatestValuesSnapshotProps) {
  const { data: response, isLoading } = useValuesLatestRQ(deviceId);

  const ports = useMemo(() => response?.ports ?? [], [response?.ports]);

  const fetchTime = useMemo(() => {
    if (response?.ports?.[0]?.timestamp) {
      return new Date(response.ports[0].timestamp).toLocaleTimeString();
    }
    return new Date().toLocaleTimeString();
  }, [response?.ports]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
      </div>
    );
  }

  // Group ports by type
  const digitalPorts = ports.filter((p) => isDigitalPort(p));
  const analogPorts = ports.filter((p) => isAnalogPort(p));
  const modbusPorts = ports.filter((p) => isModbusPort(p));

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
    <div className="space-y-6">
      {/* Last Update Info */}
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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Digital Inputs - Card View */}
        {digitalPorts.length > 0 && (
          <Card className="max-w-6xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                🔘 <span>Digital Inputs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {digitalPorts.map((port) => {
                  const p = port as ILatestPort;
                  const isOn =
                    p.calibratedValue === 1 || p.calibratedValue === true;
                  return (
                    <div
                      key={p.portKey}
                      className="p-2 border rounded-lg bg-white hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <p className="text-xs font-medium text-gray-600 truncate flex-1">
                          {p.name}
                        </p>
                        <PortDetailsTooltip port={p} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            isOn
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {isOn ? "ON" : "OFF"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analog Inputs - Card View */}
        {analogPorts.length > 0 && (
          <Card className="max-w-6xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                📊 <span>Analog Inputs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {analogPorts.map((port) => {
                  const p = port as ILatestPort;
                  return (
                    <div
                      key={p.portKey}
                      className="p-2 border rounded-lg bg-white hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <p className="text-xs font-medium text-gray-600 truncate flex-1">
                          {p.name}
                        </p>
                        <PortDetailsTooltip port={p} />
                      </div>
                      <p className="text-sm font-bold text-primary mb-1">
                        {typeof p.calibratedValue === "number"
                          ? p.calibratedValue.toFixed(2)
                          : p.calibratedValue}
                      </p>
                      <div className="flex items-center justify-between">
                        {p.unit && (
                          <p className="text-xs text-gray-500 truncate">
                            {p.unit}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {/* Modbus Inputs - Card View */}
      {modbusPorts.length > 0 && (
        <Card className="max-w-4xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              🔧 <span>Modbus Inputs</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {modbusPorts.map((modbusPort) => {
                const mbPort = modbusPort as ILatestModbusPort;

                // Group reads by slaveId
                const readsBySlaveId = mbPort.reads.reduce(
                  (acc, read) => {
                    const slaveId = read.slaveId;
                    if (!acc[slaveId]) {
                      acc[slaveId] = [];
                    }
                    acc[slaveId].push(read);
                    return acc;
                  },
                  {} as Record<string, IModbusRead[]>,
                );

                return (
                  <div
                    key={mbPort.portKey}
                    className="border rounded-lg bg-gray-50"
                  >
                    {/* Port Header */}
                    <div className="bg-amber-100 px-3 py-2 border-b border-amber-200">
                      <p className="text-xs font-semibold text-amber-900">
                        Port: {mbPort.portKey}
                      </p>
                    </div>

                    {/* Slaves and Reads */}
                    <div className="divide-y divide-gray-200">
                      {Object.entries(readsBySlaveId).map(
                        ([slaveId, reads]) => (
                          <div key={slaveId} className="px-3 py-2">
                            {/* Slave Header */}
                            <p className="text-xs font-medium text-gray-600 mb-1.5">
                              Slave{" "}
                              <span className="font-bold text-gray-900">
                                {slaveId}
                              </span>
                            </p>

                            {/* Reads Table */}
                            <div className="space-y-1">
                              {reads.map((read) => (
                                <div
                                  key={read.readId}
                                  className="flex items-center justify-between gap-2 p-1.5 bg-white hover:bg-blue-50 rounded transition-colors group"
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-700 truncate">
                                      {read.name || read.tag}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <div className="text-right flex gap-2 align-center">
                                      <p className="text-sm font-bold text-gray-900">
                                        {typeof read.calibratedValue ===
                                        "number"
                                          ? read.calibratedValue.toFixed(2)
                                          : (read.calibratedValue ?? "-")}
                                      </p>
                                      {read.unit && (
                                        <p className="text-sm ">{read.unit}</p>
                                      )}
                                    </div>
                                    <ModbusReadDetailsTooltip
                                      read={read}
                                      slaveName={slaveId}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {ports.length === 0 && (
        <div className="p-6 text-center border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-500 mb-1">No values available</p>
          <p className="text-xs text-gray-400">
            Device hasn&apos;t sent readings yet
          </p>
        </div>
      )}
    </div>
  );
}
