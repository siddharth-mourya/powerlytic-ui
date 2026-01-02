"use client";

import { usePortTypes } from "@/app/_lib/_react-query-hooks/portTypes/portTypes";
import { IPortType } from "@/app/_lib/_react-query-hooks/portTypes/portTypes.types";
import { PortTypesListSkeleton } from "./PortTypesListSkeleton";
import { useDeletePortTypeMutation } from "@/app/_lib/_react-query-hooks/portTypes/deletePortType";

export function PortTypesList({
  setEditingPortTypeData,
}: {
  setEditingPortTypeData: (pt: IPortType) => void;
}) {
  const { data: portTypes, isLoading } = usePortTypes();
  const { mutate: deletePortType } = useDeletePortTypeMutation();

  const handleEdit = (pt: IPortType) => {
    setEditingPortTypeData(pt); // populate form with values
  };

  const handleDelete = (_id: string) => {
    deletePortType({ _id });
  };

  if (isLoading) {
    return <PortTypesListSkeleton />;
  }

  return (
    <div className="my-5 space-y-3">
      {portTypes?.map((pt) => (
        <div
          key={pt._id}
          className="flex flex-col gap-4 items md:flex-row md:items-center justify-between p-3 bg-base-100 rounded-lg border border-base-200 shadow-sm hover:shadow-md transition"
        >
          {/* Left */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium">{pt.name}</span>
              <span className="badge badge-outline">{pt.category}</span>
              <span className="badge badge-primary">{pt.valueFormat}</span>
            </div>
            {pt.description && (
              <p className="text-sm text-gray-500">{pt.description}</p>
            )}
          </div>

          {/* Right */}
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(pt)}
              className="btn btn-xs btn-outline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(pt._id)}
              className="btn btn-xs btn-error"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
