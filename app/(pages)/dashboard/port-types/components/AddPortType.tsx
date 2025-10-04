"use client";

import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FormField } from "@/app/_components/Inputs/FormField";
import { Select } from "@/app/_components/Inputs/Select";
import { TextArea } from "@/app/_components/Inputs/Textarea";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import {
  IPortType,
  PORT_CATEGORY,
  PORT_VALUE_FORMAT,
} from "@/app/_lib/_react-query-hooks/portTypes/portTypes.types";
import { useCreatePortTypeMutation } from "@/app/_lib/_react-query-hooks/portTypes/addPortType";
import { useUpdatePortTypeMutation } from "@/app/_lib/_react-query-hooks/portTypes/updatePortType";

type FormDataType = Pick<
  IPortType,
  "category" | "name" | "valueFormat" | "description"
>;

const defaultValues: FormDataType = {
  name: "",
  category: "INPUT",
  valueFormat: "DIGITAL",
  description: "",
};

export function AddPortType({
  editingPortTypeData,
}: {
  editingPortTypeData: Partial<IPortType> | null;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const { mutate: createNewPortType } = useCreatePortTypeMutation();
  const { mutate: updatePortType } = useUpdatePortTypeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormDataType>({
    defaultValues,
  });

  const onSubmit = async (data: FormDataType) => {
    if (editingId) {
      updatePortType({ _id: editingId, ...data });
      setEditingId(null);
    } else {
      createNewPortType(data);
    }
    reset(defaultValues);
  };

  useEffect(() => {
    setEditingId(editingPortTypeData?._id || null);
    if (editingPortTypeData) {
      reset(editingPortTypeData);
    }
  }, [editingPortTypeData]);

  const handleCancel = () => {
    setEditingId(null);
    reset(defaultValues);
  };

  const valueFormatOptions = Object.values(PORT_VALUE_FORMAT).map((key) => ({
    label: key,
    value: key,
  }));

  const categoryOptions = Object.values(PORT_CATEGORY).map((key) => ({
    label: key,
    value: key,
  }));

  return (
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
                options={categoryOptions}
              />
            </FormField>

            <FormField label="Value Format" error={errors.valueFormat?.message}>
              <Select
                {...register("valueFormat", {
                  required: "Value format is required",
                })}
                options={valueFormatOptions}
              />
            </FormField>
          </div>

          {/* Description */}
          <FormField label="Description">
            <TextArea
              {...register("description", {
                required: "Value format is required",
              })}
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
            <button
              disabled={!isValid}
              type="submit"
              className="btn btn-primary"
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </SectionWrapper>
  );
}
