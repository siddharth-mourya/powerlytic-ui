"use client";
import { NewDeviceModelParams } from "@/app/_lib/_react-query-hooks/deviceModels/deviceModels.types";
import { usePortTypes } from "@/app/_lib/_react-query-hooks/portTypes/portTypes";
import { Cpu, Plug, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDeviceModelMutation } from "@/app/_lib/_react-query-hooks/deviceModels/useDeviceModelMutation";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import { Select } from "@/app/_components/Inputs/Select";
import { TextArea } from "@/app/_components/Inputs/Textarea";

enum NewModelFormKeys {
  NAME = "name",
  DESCRIPTION = "description",
  MICRO_CONTROLLER_TYPE = "microControllerType",
}

export default function DeviceModelForm() {
  const { mutate: addNewDeviceModel } = useDeviceModelMutation();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewDeviceModelParams>({
    mode: "onSubmit",
    shouldFocusError: true,
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
      addNewDeviceModel(data);
    } catch (err) {
      console.error(err);
    }
  };

  const portTypeOptions =
    portTypes?.map((pt) => ({
      value: pt._id,
      label: `${pt.category} - ${pt.valueFormat}`,
    })) || [];

  return (
    <div className="mt-4 flex flex-col gap-2">
      <small>
        * Add the details below to create a new device model. Once a model is
        created it cannot be edited.
      </small>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-2xl"
        noValidate
      >
        {/* Name */}
        <TextInput
          label="Name"
          placeholder="Device Name"
          required
          error={errors.name?.message}
          {...register(NewModelFormKeys.NAME, {
            required: "Device name is required",
          })}
        />

        {/* Description */}

        <TextArea
          error={errors?.description?.message}
          {...register(NewModelFormKeys.DESCRIPTION)}
          label="Description"
          className={`textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
            errors.description ? "textarea-error" : ""
          }`}
          placeholder="Short description"
        />

        {/* Microcontroller */}
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <TextInput
              label="Microcontroller Type"
              placeholder="Microcontroller Type"
              required
              error={errors.microControllerType?.message}
              {...register(NewModelFormKeys.MICRO_CONTROLLER_TYPE, {
                required: "Microcontroller type is required",
              })}
            />
          </div>
        </div>

        {/* Ports */}
        <div>
          <label className="label flex items-center gap-2">
            <Plug className="w-5 h-5 text-gray-500" /> Ports
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-4 items-start">
              {/* Auto-generated port number */}
              <div className="flex flex-col">
                <input
                  {...register(`ports.${index}.portNumber`)}
                  disabled
                  className="input input-bordered w-20 disabled"
                />
              </div>
              <div className="flex flex-col flex-1">
                <TextInput
                  placeholder="Pin"
                  error={errors.ports?.[index]?.microControllerPin?.message}
                  {...register(`ports.${index}.microControllerPin`, {
                    required: "Pin is required",
                  })}
                  required
                />
              </div>
              <div className="flex flex-col flex-1">
                <Select
                  error={errors.ports?.[index]?.portType?.message}
                  {...register(`ports.${index}.portType`, {
                    required: "Port type is required",
                  })}
                  options={portTypeOptions}
                  required
                />
              </div>
              <div className="flex flex-col flex-1">
                <TextInput
                  placeholder="Description"
                  {...register(`ports.${index}.description`)}
                />
              </div>
              <button
                type="button"
                onClick={() => removePortField(index)}
                className="btn btn-xs btn-error mt-2"
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
