"use client";

import Button from "@/app/_components/Button/Button";
import { Badge } from "@/app/_components/Badge/Badge";
import { usePortTypes } from "@/app/_lib/_react-query-hooks/portTypes/portTypes";
import { IPortType } from "@/app/_lib/_react-query-hooks/portTypes/portTypes.types";
import { PortTypesListSkeleton } from "./PortTypesListSkeleton";
import { useDeletePortTypeMutation } from "@/app/_lib/_react-query-hooks/portTypes/deletePortType";
import { Edit, Trash2 } from "lucide-react";

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
    <div className="space-y-3 mt-6">
      {portTypes?.map((pt) => (
        <div
          key={pt._id}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-base-100 rounded-lg border border-base-300 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Left */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-base-content">{pt.name}</h3>
              <Badge variant="info">{pt.category}</Badge>
              <Badge variant="success">{pt.valueFormat}</Badge>
            </div>
            {pt.description && (
              <p className="text-sm text-base-content/60">{pt.description}</p>
            )}
          </div>

          {/* Right */}
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Edit className="w-4 h-4" />}
              onClick={() => handleEdit(pt)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={() => handleDelete(pt._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
