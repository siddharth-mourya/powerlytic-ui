"use client";

import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import Button from "@/app/_components/Button/Button";
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
import { FormGroup, ActionsBar } from "@/app/_components/layout/LayoutHelpers";

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
  }, [editingPortTypeData, reset]);

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
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-base-content">
            {editingId ? "Edit Port Type" : "Add New Port Type"}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
          <FormGroup>
            {/* Name */}
            <FormField label="Name" error={errors.name?.message} required>
              <TextInput
                {...register("name", { required: "Name is required" })}
                placeholder="e.g., Temperature Sensor"
              />
            </FormField>

            {/* Category + ValueFormat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Category"
                error={errors.category?.message}
                required
              >
                <Select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  options={categoryOptions}
                />
              </FormField>

              <FormField
                label="Value Format"
                error={errors.valueFormat?.message}
                required
              >
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
                {...register("description")}
                placeholder="Enter description (optional)"
              />
            </FormField>
          </FormGroup>

          {/* Actions */}
          <ActionsBar>
            {editingId && (
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button disabled={!isValid} type="submit" variant="primary">
              {editingId ? "Update Port Type" : "Add Port Type"}
            </Button>
          </ActionsBar>
        </form>
      </div>
    </SectionWrapper>
  );
}
