"use client";

import { Badge } from "@/app/_components/Badge/Badge";
import { useValuesLatestRQ } from "@/app/_lib/_react-query-hooks/values/useValuesRQ";
import {
  ILatestPort,
  ILatestModbusPort,
  IModbusRead,
} from "@/app/_lib/_react-query-hooks/values/values.types";
import { Loader2, Activity, Info } from "lucide-react";
import { useMemo, useState } from "react";

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

// Port Details Tooltip Component
function PortDetailsTooltip({
  port,
}: {
  port: ILatestPort | ILatestModbusPort;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const portDetails = {
    rawValue: port.rawValue ?? "N/A",
    calibration: {
      scaling: port.calibration.scaling,
      offset: port.calibration.offset,
    },
    status: port.status,
    timestamp: port.timestamp
      ? new Date(port.timestamp).toLocaleString()
      : "N/A",
  };

  return (
    <div className="relative inline-block">
      <button
        className="ml-2 p-1 rounded-full hover:bg-gray-200 text-gray-600 flex-shrink-0"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Port details"
      >
        <Info size={14} />
      </button>
      {isVisible && (
        <div className="absolute bottom-full right-0 mb-2 w-56 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-50">
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Raw Value:</span>
              <div className="text-gray-300">{portDetails.rawValue}</div>
            </div>
            <div>
              <span className="font-semibold">Calibration:</span>
              <div className="text-gray-300 space-y-1">
                <div>Scaling: {portDetails.calibration.scaling}</div>
                <div>Offset: {portDetails.calibration.offset}</div>
              </div>
            </div>
            <div>
              <span className="font-semibold">Status:</span>
              <div className="text-gray-300">{portDetails.status}</div>
            </div>
            <div>
              <span className="font-semibold">Timestamp:</span>
              <div className="text-gray-300">{portDetails.timestamp}</div>
            </div>
          </div>
          <div className="absolute top-full right-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
        </div>
      )}
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
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="ml-2 p-1 rounded-full hover:bg-amber-100 text-amber-700 flex-shrink-0"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Modbus details"
      >
        <Info size={14} />
      </button>
      {isVisible && (
        <div className="absolute bottom-full right-0 mb-2 w-60 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-50">
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Slave ID:</span>
              <div className="text-gray-300">{slaveName}</div>
            </div>
            <div>
              <span className="font-semibold">Read ID:</span>
              <div className="text-gray-300 truncate">{read.readId}</div>
            </div>
            <div>
              <span className="font-semibold">Raw Value:</span>
              <div className="text-gray-300">{read.rawValue ?? "N/A"}</div>
            </div>
            <div>
              <span className="font-semibold">Calibration:</span>
              <div className="text-gray-300 space-y-1">
                <div>Scaling: {read.scaling}</div>
                <div>Offset: {read.offset}</div>
              </div>
            </div>
            <div>
              <span className="font-semibold">Register Type:</span>
              <div className="text-gray-300">{read.registerType}</div>
            </div>
            <div>
              <span className="font-semibold">Timestamp:</span>
              <div className="text-gray-300">
                {read.timestamp
                  ? new Date(read.timestamp).toLocaleString()
                  : "N/A"}
              </div>
            </div>
          </div>
          <div className="absolute top-full right-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
        </div>
      )}
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
                    <Badge
                      variant={getQualityColor(p.quality)}
                      className="text-xs"
                    >
                      {getQualityIcon(p.quality)}
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
                    <Badge
                      variant={getQualityColor(p.quality)}
                      className="text-xs ml-auto"
                    >
                      {getQualityIcon(p.quality)}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modbus Inputs - Grouped by Port */}
      {modbusPorts.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            🔧 <span>Modbus</span>
          </h4>
          {modbusPorts.map((modbusPort) => {
            const mbPort = modbusPort as ILatestModbusPort;
            return (
              <div key={mbPort.portKey} className="mb-4">
                {mbPort.reads.map((read) => (
                  <div
                    key={read.readId}
                    className="p-3 border border-amber-200 rounded-lg bg-amber-50 hover:shadow-sm transition-shadow mb-2 last:mb-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-700">
                          {read.name || read.tag}
                        </p>
                        <p className="text-xs text-gray-500">
                          Slave {read.slaveId}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Badge
                          variant={getQualityColor(read.quality)}
                          className="text-xs"
                        >
                          {getQualityIcon(read.quality)}
                        </Badge>
                        <ModbusReadDetailsTooltip
                          read={read}
                          slaveName={read.slaveId}
                        />
                      </div>
                    </div>
                    <div className="pt-2 border-t border-amber-200">
                      <p className="text-sm font-bold text-gray-900">
                        {typeof read.calibratedValue === "number"
                          ? read.calibratedValue.toFixed(2)
                          : read.calibratedValue ?? "-"}
                      </p>
                      {read.unit && (
                        <p className="text-xs text-gray-600">{read.unit}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
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
