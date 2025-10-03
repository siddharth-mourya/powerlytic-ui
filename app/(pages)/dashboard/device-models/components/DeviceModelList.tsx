"use client";

import { useListAllDeviceModelsRQ } from "@/app/_lib/_react-query-hooks/deviceModels/useListAllDeviceModels";
import { Cpu, Plug, Clock, Edit, Eye } from "lucide-react";
import DeviceModelListSkeleton from "./DeviceModelListSkeleton";

export function DeviceModelList() {
  const { data: deviceModels, isLoading } = useListAllDeviceModelsRQ();
  if (isLoading) {
    return <DeviceModelListSkeleton />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deviceModels?.map((model) => (
        <div
          key={model._id}
          className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-lg transition"
        >
          <div className="card-body space-y-3">
            {/* Header */}
            <h2 className="card-title flex items-center gap-2 text-lg font-bold">
              <Cpu className="w-5 h-5 text-primary" /> {model.name}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-2">
              {model.description || "No description available"}
            </p>

            {/* Quick Info */}
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-1">
                <Cpu className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">MCU:</span>{" "}
                {model.microControllerType}
              </p>
              <p className="flex items-center gap-1">
                <Plug className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">Ports:</span>{" "}
                {model.ports.length}
              </p>
              <p className="flex items-center gap-1 text-gray-500 text-xs">
                <Clock className="w-3 h-3" /> Updated:{" "}
                {new Date(model.updatedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="card-actions justify-end mt-2 gap-2">
              <a
                href={`/dashboard/device-models/${model._id}`}
                className="btn btn-xs btn-outline flex items-center gap-1"
              >
                <Eye className="w-3 h-3" /> View
              </a>
              <a
                href={`/dashboard/device-models/${model._id}/edit`}
                className="btn btn-xs btn-primary flex items-center gap-1"
              >
                <Edit className="w-3 h-3" /> Edit
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
