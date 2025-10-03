"use client";

import { useState } from "react";

import { AddPortType } from "./AddPortType";
import { PortTypesList } from "./PortTypesList";
import { IPortType } from "@/app/_lib/_react-query-hooks/portTypes/portTypes.types";

export default function PortTypeManager() {
  const [editingPortTypeData, setEditingPortTypeData] =
    useState<IPortType | null>(null);

  return (
    <div>
      <h2 className="text-2xl mb-5 font-bold">Port Types</h2>

      {/* Form Section */}
      <AddPortType editingPortTypeData={editingPortTypeData} />

      {/* List of compact cards */}
      <PortTypesList setEditingPortTypeData={setEditingPortTypeData} />
    </div>
  );
}
