"use client";
import { DeviceModel } from "@/app/_lib/_react-query-hooks/deviceModels/deviceModels.types";
import { usePortTypes } from "@/app/_lib/_react-query-hooks/portTypes/portTypes";
import { Cpu, Plug, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

interface IDeviceModelFormProps {
  model?: DeviceModel;
  onSubmit: (data: any) => Promise<void>;
}
export default function DeviceModelForm({
  model,
  onSubmit,
}: IDeviceModelFormProps) {
  const { register, control, handleSubmit } = useForm({
    defaultValues: model || {
      name: "",
      description: "",
      microControllerType: "",
      ports: [],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "ports" });

  const { data: portTypes } = usePortTypes();
  // const portTypesOpti
  console.log("---portype", portTypes);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl mx-auto"
    >
      {/* Name */}
      <div>
        <label className="label">Name</label>
        <input
          {...register("name")}
          className="input input-bordered w-full"
          placeholder="Device Name"
        />
      </div>

      {/* Description */}
      <div>
        <label className="label">Description</label>
        <textarea
          {...register("description")}
          className="textarea textarea-bordered w-full"
          placeholder="Short description"
        />
      </div>

      {/* Microcontroller */}
      <div className="flex items-center gap-2">
        <Cpu className="w-5 h-5 text-gray-500" />
        <input
          {...register("microControllerType")}
          className="input input-bordered w-full"
          placeholder="Microcontroller Type"
        />
      </div>

      {/* Ports */}
      <div>
        <label className="label flex items-center gap-2">
          <Plug className="w-5 h-5 text-gray-500" /> Ports
        </label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2 items-center">
            <input
              {...register(`ports.${index}.portNumber`)}
              placeholder="Port #"
              className="input input-bordered w-24"
            />
            <input
              {...register(`ports.${index}.microControllerPin`)}
              placeholder="Pin"
              className="input input-bordered w-24"
            />
            <select
              {...register(`ports.${index}.portTypeId`)}
              className="select select-bordered"
            >
              {portTypes?.map((pt) => (
                <option key={pt._id} value={pt._id}>
                  {pt.category} - {pt.valueFormat}
                </option>
              ))}
            </select>
            <input
              {...register(`ports.${index}.description`)}
              placeholder="Description"
              className="input input-bordered flex-1"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="btn btn-xs btn-error"
            >
              <Trash className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              _id: "",
              portNumber: "",
              portTypeId: { name: "", _id: "" },
              microControllerPin: "",
              description: "",
            })
          }
          className="btn btn-sm btn-outline flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Port
        </button>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-2">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}
