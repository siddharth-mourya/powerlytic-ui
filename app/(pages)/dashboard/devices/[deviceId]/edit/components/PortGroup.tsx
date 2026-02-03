import { AccordionHeader } from "@/app/_components/Accordion/AccordionHeader";
import { Select } from "@/app/_components/Inputs/Select";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import {
  IDevice,
  IPort,
  PORT_STATUS_OPTIONS,
} from "@/app/_lib/_react-query-hooks/device/devices.types";
import { UseFormRegister, FieldErrors } from "react-hook-form";
interface PortGroupProps {
  title: string;
  color: string;
  ports?: IPortGroupWithIndex;
  register: UseFormRegister<IDevice>;
  errors?: FieldErrors<IDevice>;
  isDigital?: boolean;
}

export type IPortGroupWithIndex = Array<IPort & { originalIndex: number }>;

export function PortGroup({
  isDigital,
  title,
  ports,
  register,
  errors,
}: PortGroupProps) {
  if (!ports?.length) return null;

  return (
    <details className="group rounded-lg border border-gray-200 bg-white">
      <AccordionHeader title={title} subtitle={`${ports.length} ports`} />

      <div className="grid gap-4 p-4 md:grid-cols-2">
        {ports.map((port) => {
          const i = port.originalIndex;

          return (
            <div
              key={port.portKey}
              className="rounded-md border border-gray-200 bg-gray-50 p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">{port.name}</h3>
                <span className="rounded bg-white px-2 py-0.5 text-xs text-gray-600 border">
                  {port.portKey}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <TextInput
                  label="Name"
                  required
                  error={errors?.ports?.[i]?.name?.message}
                  {...register(`ports.${i}.name`, {
                    required: "Name is required",
                  })}
                />
                {isDigital ? null : (
                  <TextInput
                    label="Unit"
                    required
                    error={errors?.ports?.[i]?.unit?.message}
                    {...register(`ports.${i}.unit`, {
                      required: "Unit is required",
                    })}
                  />
                )}
                <Select
                  label="Value Format"
                  required
                  error={errors?.ports?.[i]?.status?.message}
                  {...register(`ports.${i}.status`, {
                    required: "Status format is required",
                  })}
                  options={PORT_STATUS_OPTIONS}
                />

                <TextInput
                  label="Scaling"
                  type="number"
                  required
                  error={errors?.ports?.[i]?.calibrationValue?.scaling?.message}
                  {...register(`ports.${i}.calibrationValue.scaling`, {
                    required: "Scaling is required",
                    valueAsNumber: true,
                  })}
                />
                <TextInput
                  label="Offset"
                  type="number"
                  required
                  error={errors?.ports?.[i]?.calibrationValue?.offset?.message}
                  {...register(`ports.${i}.calibrationValue.offset`, {
                    required: "Offset is required",
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div className="border-t pt-3">
                <div className="text-xs font-medium text-gray-600 mb-2">
                  Thresholds
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <TextInput
                    placeholder="Min"
                    type="number"
                    error={errors?.ports?.[i]?.thresholds?.min?.message}
                    {...register(`ports.${i}.thresholds.min`, {
                      valueAsNumber: true,
                    })}
                  />
                  <TextInput
                    placeholder="Max"
                    type="number"
                    error={errors?.ports?.[i]?.thresholds?.max?.message}
                    {...register(`ports.${i}.thresholds.max`, {
                      valueAsNumber: true,
                    })}
                  />
                  <TextInput
                    placeholder="Message"
                    {...register(`ports.${i}.thresholds.message`)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </details>
  );
}
