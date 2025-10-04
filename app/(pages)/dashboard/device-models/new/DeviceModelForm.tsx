"use client";
import { NewDeviceModelParams } from "@/app/_lib/_react-query-hooks/deviceModels/deviceModels.types";
import { usePortTypes } from "@/app/_lib/_react-query-hooks/portTypes/portTypes";
import { Cpu, Plug, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDeviceModelMutation } from "@/app/_lib/_react-query-hooks/deviceModels/useDeviceModelMutation";

enum NewModelFormKeys {
  NAME = "name",
  DESCRIPTION = "description",
  MICRO_CONTROLLER_TYPE = "microControllerType",
}

export default function DeviceModelForm() {
  const { mutate: addNewDeviceModel } = useDeviceModelMutation();
  const { register, control, handleSubmit, setValue } =
    useForm<NewDeviceModelParams>({
      defaultValues: {
        name: "",
        description: "",
        microControllerType: "",
        ports: [
          {
            portNumber: "P1",
            portType: "",
            microControllerPin: "",
            description: "",
          },
        ], // ensure at least one port on mount
      },
    });

  const { fields, append, remove } = useFieldArray({ control, name: "ports" });
  const { data: portTypes } = usePortTypes();

  // Auto update portNumber when fields change
  useEffect(() => {
    fields.forEach((_, index) => {
      setValue(`ports.${index}.portNumber`, `P${index + 1}`, {
        shouldValidate: true,
      });
    });
  }, [fields, setValue]);

  const addNewPortField = () => {
    append({
      portNumber: `P${fields.length + 1}`,
      portType: "",
      microControllerPin: "",
      description: "",
    });
  };

  const removePortField = (index: number) => {
    if (fields.length === 1) return;
    remove(index);
  };

  const onSubmit = async (data: NewDeviceModelParams) => {
    try {
      console.log("Submitting device model", data);
      addNewDeviceModel(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <small>
        * Add the details below to create a new device model. Once a model is
        created it cannot be edited.
      </small>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            {...register(NewModelFormKeys.NAME, { required: true })}
            className="input input-bordered w-full"
            placeholder="Device Name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            {...register(NewModelFormKeys.DESCRIPTION, { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Short description"
          />
        </div>

        {/* Microcontroller */}
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-gray-500" />
          <input
            {...register(NewModelFormKeys.MICRO_CONTROLLER_TYPE, {
              required: true,
            })}
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
              {/* Auto-generated port number */}
              <input
                {...register(`ports.${index}.portNumber`)}
                disabled
                className="input input-bordered w-20 disabled"
              />
              <input
                {...register(`ports.${index}.microControllerPin`, {
                  required: true,
                })}
                placeholder="Pin"
                className="input input-bordered w-24"
              />
              <select
                {...register(`ports.${index}.portType`, { required: true })}
                className="select select-bordered"
              >
                <option value="">Select type</option>
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
                onClick={() => removePortField(index)}
                className="btn btn-xs btn-error"
                disabled={fields.length === 1} // prevent removing last port
              >
                <Trash className="w-3 h-3" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addNewPortField}
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
    </div>
  );
}
