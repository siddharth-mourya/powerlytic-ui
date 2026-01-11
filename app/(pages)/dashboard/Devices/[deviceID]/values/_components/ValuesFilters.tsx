"use client";

import { Card, CardContent } from "@/app/_components/Card/Card";
import { IPort } from "@/app/_lib/_react-query-hooks/device/devices.types";
import { Calendar, Filter } from "lucide-react";

interface ValuesFiltersProps {
  ports: IPort[];
  selectedPortKey: string;
  onPortChange: (portKey: string) => void;
  dateRange: {
    startTime?: string;
    endTime?: string;
  };
  onDateRangeChange: (range: { startTime?: string; endTime?: string }) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export default function ValuesFilters({
  ports,
  selectedPortKey,
  onPortChange,
  dateRange,
  onDateRangeChange,
  limit,
  onLimitChange,
}: ValuesFiltersProps) {
  // Group ports by type
  const digitalPorts = ports.filter((p) => p.portKey?.startsWith("DI_"));
  const analogPorts = ports.filter((p) => p.portKey?.startsWith("AI_"));
  const modbusPorts = ports.filter((p) => p.portKey?.startsWith("MI_"));

  const handleDateChange = (field: "startTime" | "endTime", value: string) => {
    onDateRangeChange({
      ...dateRange,
      [field]: value,
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Filter Header */}
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-primary" />
            <h3 className="font-semibold text-gray-900">
              Filter & Display Options
            </h3>
          </div>

          {/* Port Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Port Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📍 Select Port
              </label>
              <select
                value={selectedPortKey}
                onChange={(e) => onPortChange(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">-- All Ports --</option>
                {digitalPorts.length > 0 && (
                  <optgroup label="Digital Inputs (DI)">
                    {digitalPorts.map((port) => (
                      <option key={port.portKey} value={port.portKey}>
                        {port.portKey} - {port.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                {analogPorts.length > 0 && (
                  <optgroup label="Analog Inputs (AI)">
                    {analogPorts.map((port) => (
                      <option key={port.portKey} value={port.portKey}>
                        {port.portKey} - {port.name}
                        {port.unit ? ` (${port.unit})` : ""}
                      </option>
                    ))}
                  </optgroup>
                )}
                {modbusPorts.length > 0 && (
                  <optgroup label="Modbus Inputs (MI)">
                    {modbusPorts.map((port) => (
                      <option key={port.portKey} value={port.portKey}>
                        {port.portKey} - {port.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>

            {/* Results Limit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📊 Results Limit
              </label>
              <select
                value={limit}
                onChange={(e) => onLimitChange(parseInt(e.target.value))}
                className="select select-bordered w-full"
              >
                <option value={100}>100 results</option>
                <option value={500}>500 results</option>
                <option value={1000}>1000 results</option>
                <option value={2000}>2000 results</option>
                <option value={5000}>5000 results</option>
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} className="inline mr-2" />
              Date Range (Optional)
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="datetime-local"
                  value={dateRange.startTime?.slice(0, 16) || ""}
                  onChange={(e) =>
                    handleDateChange(
                      "startTime",
                      e.target.value
                        ? new Date(e.target.value).toISOString()
                        : ""
                    )
                  }
                  className="input input-bordered w-full"
                  placeholder="Start Time"
                />
              </div>
              <div>
                <input
                  type="datetime-local"
                  value={dateRange.endTime?.slice(0, 16) || ""}
                  onChange={(e) =>
                    handleDateChange(
                      "endTime",
                      e.target.value
                        ? new Date(e.target.value).toISOString()
                        : ""
                    )
                  }
                  className="input input-bordered w-full"
                  placeholder="End Time"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Leave empty to show latest data. For large date ranges, results
              will be limited based on your selection above.
            </p>
          </div>

          {/* Active Filters Summary */}
          {(selectedPortKey || dateRange.startTime || dateRange.endTime) && (
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-2">
                Active Filters:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedPortKey && (
                  <span className="badge badge-primary badge-outline">
                    Port: {selectedPortKey}
                  </span>
                )}
                {dateRange.startTime && (
                  <span className="badge badge-secondary badge-outline">
                    From: {new Date(dateRange.startTime).toLocaleString()}
                  </span>
                )}
                {dateRange.endTime && (
                  <span className="badge badge-secondary badge-outline">
                    To: {new Date(dateRange.endTime).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
