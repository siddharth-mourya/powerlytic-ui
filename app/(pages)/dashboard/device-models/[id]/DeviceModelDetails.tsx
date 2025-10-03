"use client";

import { useDeviceModelDetailsRQ } from "@/app/_lib/_react-query-hooks/deviceModels/useDeviceModelDetailsRQ";
import { Cpu, Plug, Clock, Edit, Eye } from "lucide-react";
import { useParams } from "next/navigation";
import DeviceModelDetailsSkeleton from "./DeviceModelDetailsSkeleton";

export default function DeviceModelDetails() {
  const { id } = useParams();
  const { data: deviceModel, isLoading } = useDeviceModelDetailsRQ(
    (id as string) || ""
  );

  if (isLoading) {
    return <DeviceModelDetailsSkeleton />;
  }
  return (
    <div className="max-w-4xl p-6 bg-base-100 shadow rounded-lg space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Cpu className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">{deviceModel?.name}</h1>
      </div>
      <p className="text-gray-600">{deviceModel?.description}</p>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg flex items-center gap-2">
          <Cpu className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-700 font-medium">Microcontroller</p>
            <p className="text-sm">{deviceModel?.microControllerType}</p>
          </div>
        </div>
        <div className="p-4 border rounded-lg flex items-center gap-2">
          <Plug className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-700 font-medium">Total Ports</p>
            <p className="text-sm">{deviceModel?.ports.length}</p>
          </div>
        </div>
      </div>

      {/* Ports Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Plug className="w-5 h-5 text-primary" /> Ports
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm">
            <thead>
              <tr>
                <th>Port Number</th>
                <th>Type</th>
                <th>Pin</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {deviceModel?.ports.map((port) => (
                <tr key={port._id}>
                  <td>{port.portNumber}</td>
                  <td>{port.portTypeId?.name}</td>
                  <td>{port.microControllerPin}</td>
                  <td>{port.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Metadata */}
      <div className="text-sm text-gray-500 flex flex-col gap-1">
        <p className="flex items-center gap-1">
          <Clock className="w-4 h-4" /> Created:{" "}
          {deviceModel?.createdAt
            ? new Date(deviceModel.createdAt).toLocaleString()
            : "-"}
        </p>
        <p className="flex items-center gap-1">
          <Clock className="w-4 h-4" /> Updated:{" "}
          {deviceModel?.updatedAt
            ? new Date(deviceModel.updatedAt).toLocaleString()
            : "-"}
        </p>
      </div>
    </div>
  );
}
