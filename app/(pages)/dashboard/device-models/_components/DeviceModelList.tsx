"use client";

import { useDeviceModelsListRQ } from "@/app/_lib/_react-query-hooks/deviceModels/useDeviceModelsList";
import { Clock, Cpu, Eye, Plug, Plus } from "lucide-react";
import DeviceModelListSkeleton from "./DeviceModelListSkeleton";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Button from "@/app/_components/Button/Button";
import Link from "next/link";

export const DeviceModelList = () => {
  const { data: deviceModels, isLoading } = useDeviceModelsListRQ();

  const router = useRouter();
  const handleViewClick = (id: string) => {
    router.push(`/dashboard/device-models/${id}`);
  };

  const handleNewClick = () => {
    router.push(`/dashboard/device-models/new`);
  };

  if (isLoading) {
    return <DeviceModelListSkeleton />;
  }
  return (
    <div className="space-y-6 mt-6">
      <div className="flex justify-between items-center">
        <Button
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={handleNewClick}
        >
          Add New Model
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deviceModels?.map((model) => (
          <div
            key={model._id}
            className="rounded-lg bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary flex-shrink-0" />
                  <Link
                    href={`/dashboard/device-models/${model._id}`}
                    className="text-lg font-bold text-primary link link-hover"
                  >
                    {model.name}
                  </Link>
                </div>
                <p className="text-sm text-base-content/60 line-clamp-2 leading-relaxed">
                  {model.description || "No description available"}
                </p>
              </div>

              {/* Quick Info */}
              <div className="space-y-2.5 text-sm pt-2 border-t border-base-300">
                <p className="flex items-center gap-2 text-base-content/80">
                  <Cpu className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium">MCU:</span>
                  <span>{model.microControllerType}</span>
                </p>
                <p className="flex items-center gap-2 text-base-content/80">
                  <Plug className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium">Ports:</span>
                  <span>{model.ports.length}</span>
                </p>
                <p className="flex items-center gap-2 text-base-content/50 text-xs">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span>
                    Updated: {new Date(model.updatedAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
