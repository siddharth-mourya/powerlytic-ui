"use client";

import { Cpu, Plug, Clock } from "lucide-react";

export default function DeviceModelDetailsSkeleton() {
  return (
    <div className="max-w-4xl p-6 bg-base-100 shadow rounded-lg space-y-6 animate-pulse">
      <div className="flex items-center gap-2">
        <Cpu className="w-6 h-6 text-gray-300" />
        <div className="bg-gray-300 h-8 w-48 rounded"></div>
      </div>
      <div className="bg-gray-300 h-4 w-full rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg flex items-center gap-2">
          <Cpu className="w-5 h-5 text-gray-300" />
          <div className="flex-1">
            <div className="bg-gray-300 h-3 w-24 rounded mb-1"></div>
            <div className="bg-gray-300 h-4 w-32 rounded"></div>
          </div>
        </div>
        <div className="p-4 border rounded-lg flex items-center gap-2">
          <Plug className="w-5 h-5 text-gray-300" />
          <div className="flex-1">
            <div className="bg-gray-300 h-3 w-24 rounded mb-1"></div>
            <div className="bg-gray-300 h-4 w-16 rounded"></div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Plug className="w-5 h-5 text-gray-300" /> Ports
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm w-full">
            <thead>
              <tr>
                <th className="bg-gray-300 h-3 rounded">&nbsp;</th>
                <th className="bg-gray-300 h-3 rounded">&nbsp;</th>
                <th className="bg-gray-300 h-3 rounded">&nbsp;</th>
                <th className="bg-gray-300 h-3 rounded">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, idx) => (
                <tr key={idx}>
                  <td className="bg-gray-300 h-3 rounded">&nbsp;</td>
                  <td className="bg-gray-300 h-3 rounded">&nbsp;</td>
                  <td className="bg-gray-300 h-3 rounded">&nbsp;</td>
                  <td className="bg-gray-300 h-3 rounded">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-500 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-gray-300" />
          <div className="bg-gray-300 h-3 w-32 rounded"></div>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-gray-300" />
          <div className="bg-gray-300 h-3 w-32 rounded"></div>
        </div>
      </div>
    </div>
  );
}
