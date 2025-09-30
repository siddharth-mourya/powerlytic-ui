"use client";

import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormField } from "@/app/_components/Inputs/FormField";
import { Select } from "@/app/_components/Inputs/Select";
import { TextArea } from "@/app/_components/Inputs/Textarea";
import { TextInput } from "@/app/_components/Inputs/TextInput";

type PortType = {
  _id?: string;
  name: string;
  category: string;
  valueFormat: string;
  description: string;
};

const initialPortTypes: PortType[] = [
  {
    _id: "2345432",
    name: "Input - Modbus",
    category: "input",
    valueFormat: "modbus",
    description: "Modbus port for industrial devices",
  },
  {
    _id: "2345499",
    name: "Input - Analog",
    category: "input",
    valueFormat: "analog",
    description: "Analog sensor input",
  },
  {
    _id: "2345412",
    name: "Output - Digital",
    category: "output",
    valueFormat: "digital",
    description: "Digital output for actuators",
  },
];

export default function PortTypeManager() {
  const [portTypes, setPortTypes] = useState<PortType[]>(initialPortTypes);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PortType>({
    defaultValues: {
      name: "",
      category: "input",
      valueFormat: "digital",
      description: "",
    },
  });

  const onSubmit = (data: PortType) => {
    if (editingId) {
      setPortTypes((prev) =>
        prev.map((pt) =>
          pt._id === editingId ? { ...data, _id: editingId } : pt
        )
      );
      setEditingId(null);
    } else {
      setPortTypes((prev) => [
        ...prev,
        { ...data, _id: Date.now().toString() },
      ]);
    }

    reset(); // clear form
  };

  const handleEdit = (pt: PortType) => {
    setEditingId(pt._id || null);
    reset(pt); // populate form with values
  };

  const handleCancel = () => {
    setEditingId(null);
    reset();
  };

  const handleDelete = (id?: string) => {
    setPortTypes((prev) => prev.filter((pt) => pt._id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl mb-5 font-bold">Port Types</h2>

      {/* Form Section */}
      <SectionWrapper>
        <div className="card bg-base-100 shadow-md border border-base-200 p-6">
          <h2 className="text-lg font-bold mb-4">
            {editingId ? "Edit Port Type" : "Add New Port Type"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField label="Name" error={errors.name?.message}>
              <TextInput
                {...register("name", { required: "Name is required" })}
                placeholder="Enter port type name"
              />
            </FormField>

            {/* Category + ValueFormat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Category" error={errors.category?.message}>
                <Select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  options={[
                    { value: "input", label: "Input" },
                    { value: "output", label: "Output" },
                  ]}
                />
              </FormField>

              <FormField
                label="Value Format"
                error={errors.valueFormat?.message}
              >
                <Select
                  {...register("valueFormat", {
                    required: "Value format is required",
                  })}
                  options={[
                    { value: "digital", label: "Digital" },
                    { value: "analog", label: "Analog" },
                    { value: "modbus", label: "Modbus" },
                  ]}
                />
              </FormField>
            </div>

            {/* Description */}
            <FormField label="Description">
              <TextArea
                {...register("description")}
                placeholder="Enter description (optional)"
              />
            </FormField>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </SectionWrapper>

      {/* List of compact cards */}
      <div className="my-5 space-y-3">
        {portTypes.map((pt) => (
          <div
            key={pt._id}
            className="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-200 shadow-sm hover:shadow-md transition"
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
    </div>
  );
}
