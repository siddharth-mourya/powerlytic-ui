/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Card, CardContent } from "@/app/_components/Card/Card";
import { IDevice } from "@/app/_lib/_react-query-hooks/device/devices.types";
import { useValuesTableRQ } from "@/app/_lib/_react-query-hooks/values/useValuesRQ";
import { Badge } from "@/app/_components/Badge/Badge";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { IValueTableRow } from "@/app/_lib/_react-query-hooks/values/values.types";

interface ValuesTableViewProps {
  deviceId: string;
  device: IDevice;
  filters?: {
    startTime?: string;
    endTime?: string;
    limit?: number;
  };
}

interface TableRow {
  timestamp: string;
  ts: Date;
  [key: string]: any;
}

export default function ValuesTableView({
  deviceId,
  device,
  filters,
}: ValuesTableViewProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "timestamp", desc: true },
  ]);

  // Fetch table data
  const {
    data: tableData,
    isLoading,
    isError,
  } = useValuesTableRQ(deviceId, {
    startTime: filters?.startTime,
    endTime: filters?.endTime,
    limit: filters?.limit || 1000,
  });

  // Format data for table - flatten nested Modbus structure
  const formattedData = useMemo(() => {
    if (!tableData?.data) return [];

    return tableData.data.map((row: IValueTableRow) => {
      const baseRow: any = {
        ts: new Date(row.ts),
        timestamp: new Date(row.ts).toLocaleString(),
      };

      // Process each port in the row
      Object.keys(row).forEach((portKey) => {
        if (portKey === "ts" || portKey === "timestamp") return;

        const portData = row[portKey];

        // Check if this is a Modbus port (MI_*) with nested structure
        if (
          portKey.startsWith("MI_") &&
          portData &&
          typeof portData === "object"
        ) {
          // Modbus data is nested: { "slaveId_readTag": { readId, slaveId, readName, calibratedValue, ... } }
          Object.keys(portData).forEach((readKey) => {
            // @ts-expect-error – Modbus reads are dynamic
            const readData = portData[readKey];
            // Create a flattened key for this read
            const flatKey = `${portKey}_${readKey}`;
            baseRow[flatKey] = readData;
          });
        } else {
          // Standard port (DI/AI) - already flat
          baseRow[portKey] = portData;
        }
      });

      return baseRow;
    }) as TableRow[];
  }, [tableData]);

  // Get available port keys from device
  const portKeys = device.ports?.map((p) => p.portKey) || [];

  // Extract Modbus read keys from actual data (since API returns nested structure)
  const modbusReadKeys = useMemo(() => {
    const keys: {
      [portKey: string]: Array<{ key: string; readData: any }>;
    } = {};

    if (formattedData.length > 0) {
      const firstRow = formattedData[0];
      Object.keys(firstRow).forEach((key) => {
        if (key.startsWith("MI_") && key.includes("_") && key !== "MI_1") {
          // This is a flattened Modbus key like MI_1_slaveId_readTag
          const parts = key.split("_");
          const portKey = parts.slice(0, 2).join("_"); // MI_1
          if (!keys[portKey]) keys[portKey] = [];
          keys[portKey].push({
            key,
            readData: firstRow[key],
          });
        }
      });
    }

    return keys;
  }, [formattedData]);

  // Define columns dynamically based on ports
  const columns: ColumnDef<TableRow>[] = useMemo(() => {
    const baseCols: ColumnDef<TableRow>[] = [
      {
        accessorKey: "timestamp",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 font-semibold"
          >
            📅 Timestamp
            {column.getIsSorted() === "asc" ? (
              <ChevronUp size={14} />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown size={14} />
            ) : null}
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-sm font-medium">{row.original.timestamp}</span>
        ),
      },
    ];

    // Add columns for each port
    portKeys.forEach((portKey) => {
      const port = device.ports?.find((p) => p.portKey === portKey);
      const portType = portKey?.substring(0, 2); // DI, AI, MI

      // Handle Modbus ports - use actual data structure
      if (portType === "MI") {
        const modbusReads = modbusReadKeys[portKey] || [];

        if (modbusReads.length > 0) {
          // Create columns for each Modbus read from actual data
          modbusReads.forEach(({ key, readData }) => {
            baseCols.push({
              accessorKey: key,
              header: () => (
                <div className="bg-amber-50 p-2 border-l-2 border-amber-400 text-center">
                  <div className="font-semibold text-xs text-gray-900">
                    {readData?.readName || readData?.tag || "Read"}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {portKey} → Slave {readData?.slaveId}
                  </div>
                  {readData?.unit && (
                    <div className="text-xs text-gray-500">
                      [{readData.unit}]
                    </div>
                  )}
                </div>
              ),
              cell: ({ row }) => {
                const value = row.original[key];
                if (!value)
                  return <span className="text-gray-300 text-xs">-</span>;
                return (
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-semibold text-sm">
                      {typeof value?.calibratedValue === "number"
                        ? value.calibratedValue.toFixed(2)
                        : value?.calibratedValue || "-"}
                    </span>
                    {value?.unit && (
                      <span className="text-xs text-gray-500">
                        {value.unit}
                      </span>
                    )}
                  </div>
                );
              },
            });
          });
        } else {
          // Fallback if no Modbus reads found - show port column
          baseCols.push({
            accessorKey: portKey,
            header: () => (
              <div className="text-center">
                <div className="font-semibold text-sm">🔧 {portKey}</div>
                <div className="text-xs text-gray-500">{port?.name || ""}</div>
              </div>
            ),
            cell: () => <span className="text-gray-400 text-xs">-</span>,
          });
        }
      } else {
        // Standard column for DI and AI ports
        baseCols.push({
          accessorKey: portKey,
          header: () => (
            <div className="text-center">
              <div className="font-semibold text-sm">
                {portType === "DI" && "🔘"}
                {portType === "AI" && "📊"}
                {portType === "MI" && "🔧"} {portKey}
              </div>
              <div className="text-xs text-gray-500">{port?.name || ""}</div>
              {port?.unit && (
                <div className="text-xs text-gray-400">[{port.unit}]</div>
              )}
            </div>
          ),
          cell: ({ row }) => {
            const value = row.original[portKey];
            if (!value) return <span className="text-gray-400 text-xs">-</span>;

            // Handle different port types
            if (portType === "DI") {
              // Digital input - show ON/OFF
              const isOn =
                value?.calibratedValue === 1 || value?.calibratedValue === true;
              return (
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      isOn
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isOn ? "ON" : "OFF"}
                  </span>
                  {value?.unit && (
                    <span className="text-xs text-gray-500">{value.unit}</span>
                  )}
                </div>
              );
            } else if (portType === "AI") {
              // Analog input - show numeric value with unit
              return (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {typeof value?.calibratedValue === "number"
                      ? value.calibratedValue.toFixed(2)
                      : value?.calibratedValue || "-"}
                  </span>
                  {value?.unit && (
                    <span className="text-xs text-gray-500">{value.unit}</span>
                  )}
                </div>
              );
            }
          },
        });
      }
    });

    return baseCols;
  }, [portKeys, device.ports, modbusReadKeys]);

  const table = useReactTable({
    data: formattedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="py-8 text-center">
          <p className="text-red-600 font-semibold mb-2">
            Failed to load data table
          </p>
          <p className="text-sm text-red-500">
            Please try adjusting your filters or contact support.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Info Card */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600">
            Showing <strong>{formattedData.length}</strong> records
            {filters?.limit && ` (limit: ${filters.limit})`}
          </p>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 border-b border-gray-300">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200 last:border-r-0 whitespace-nowrap"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 text-gray-800 border-r border-gray-100 last:border-r-0"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No data available for the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">Legend:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔘</span>
              <span className="text-gray-700">Digital Input (1=ON, 0=OFF)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <span className="text-gray-700">Analog Input (Sensor Value)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔧</span>
              <span className="text-gray-700">Modbus Input (Industrial)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getQualityVariant(quality: string) {
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
}
