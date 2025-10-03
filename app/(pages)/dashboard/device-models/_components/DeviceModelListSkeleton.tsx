"use client";

import { Clock, Cpu, Plug } from "lucide-react";

export default function DeviceModelListSkeleton() {
  // Placeholder array for skeleton cards
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="card bg-base-100 border border-base-200 shadow-sm animate-pulse"
        >
          <div className="card-body space-y-3">
            <h2 className="card-title flex items-center gap-2">
              <Cpu className="w-5 h-5 text-gray-400" />{" "}
              <span className="bg-gray-300 h-5 w-32 rounded" />
            </h2>
            <p className="text-sm text-gray-400 bg-gray-300 h-3 w-full rounded"></p>

            <div className="space-y-2">
              <p className="flex items-center gap-1">
                <Cpu className="w-4 h-4 text-gray-300" />
                <span className="bg-gray-300 h-3 w-16 rounded"></span>
              </p>
              <p className="flex items-center gap-1">
                <Plug className="w-4 h-4 text-gray-300" />
                <span className="bg-gray-300 h-3 w-10 rounded"></span>
              </p>
              <p className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-300" />
                <span className="bg-gray-300 h-3 w-20 rounded"></span>
              </p>
            </div>

            <div className="card-actions justify-end mt-2 gap-2">
              <span className="btn btn-xs btn-outline w-16 h-6 opacity-50 cursor-not-allowed" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
