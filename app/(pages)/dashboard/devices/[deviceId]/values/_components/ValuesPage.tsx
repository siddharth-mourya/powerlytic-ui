"use client";

import { useState } from "react";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";
import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import { Loader2 } from "lucide-react";
import { useDeviceByIdRQ } from "@/app/_lib/_react-query-hooks/device/useDevicesRQ";
import { useValuesSnapshotRQ } from "@/app/_lib/_react-query-hooks/values/useValuesRQ";
import LatestValuesSnapshot from "./LatestValuesSnapshot";
import ValuesFilters from "./ValuesFilters";
import ValuesTableView from "./ValuesTableView";
import PortTimeSeriesChart from "./PortTimeSeriesChart";

interface ValuesPageProps {
  deviceId: string;
}

type ViewMode = "snapshot" | "table" | "charts";

export default function ValuesPage({ deviceId }: ValuesPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("snapshot");
  const [selectedPortKey, setSelectedPortKey] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    startTime?: string;
    endTime?: string;
  }>({});
  const [limit, setLimit] = useState<number>(1000);

  // Fetch device info
  const { data: device, isLoading: deviceLoading } = useDeviceByIdRQ(deviceId);

  // Fetch latest snapshot
  const { data: snapshot, isLoading: snapshotLoading } =
    useValuesSnapshotRQ(deviceId);

  if (deviceLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
      </div>
    );
  }

  if (!device) {
    return <p className="text-center text-gray-500">Device not found</p>;
  }

  // Get available ports from device
  const availablePorts = device.ports || [];

  return (
    <SectionWrapper>
      <PageContentHeader title={`Device Values: ${device.name}`} />
      <p className="text-gray-600 text-sm mb-4">
        Monitor and analyze sensor readings and IoT data
      </p>

      {/* View Mode Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setViewMode("snapshot")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            viewMode === "snapshot"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          📊 Current Status
        </button>
        <button
          onClick={() => setViewMode("table")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            viewMode === "table"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          📋 Data Table
        </button>
        <button
          onClick={() => setViewMode("charts")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            viewMode === "charts"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          📈 Charts & Trends
        </button>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {/* Filters (shown for table and charts) */}
        {(viewMode === "table" || viewMode === "charts") && (
          <ValuesFilters
            ports={availablePorts}
            selectedPortKey={selectedPortKey}
            onPortChange={setSelectedPortKey}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            limit={limit}
            onLimitChange={setLimit}
          />
        )}

        {/* View: Latest Values Snapshot */}
        {viewMode === "snapshot" && (
          <LatestValuesSnapshot
            deviceId={deviceId}
            device={device}
            isLoading={snapshotLoading}
          />
        )}

        {/* View: Data Table */}
        {viewMode === "table" && (
          <ValuesTableView
            deviceId={deviceId}
            device={device}
            filters={{
              startTime: dateRange.startTime,
              endTime: dateRange.endTime,
              limit,
            }}
          />
        )}

        {/* View: Charts */}
        {viewMode === "charts" && selectedPortKey && (
          <PortTimeSeriesChart
            deviceId={deviceId}
            device={device}
            portKey={selectedPortKey}
            filters={{
              startTime: dateRange.startTime,
              endTime: dateRange.endTime,
              limit,
            }}
          />
        )}

        {viewMode === "charts" && !selectedPortKey && (
          <div className="text-center py-12 bg-base-100 rounded-lg">
            <p className="text-gray-500">
              Please select a port from the filters above to view its chart
            </p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
