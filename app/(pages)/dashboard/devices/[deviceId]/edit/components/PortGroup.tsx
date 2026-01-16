import { AccordionHeader } from "@/app/_components/Accordion/AccordionHeader";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import {
  IDevice,
  IPort,
} from "@/app/_lib/_react-query-hooks/device/devices.types";
import { UseFormRegister } from "react-hook-form";
interface PortGroupProps {
  title: string;
  color: string;
  ports?: IPortGroupWithIndex;
  register: UseFormRegister<IDevice>;
}

export type IPortGroupWithIndex = Array<IPort & { originalIndex: number }>;

export function PortGroup({ title, ports, register }: PortGroupProps) {
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
                <TextInput label="Unit" {...register(`ports.${i}.unit`)} />

                <div>
                  <label className="text-xs">Status</label>
                  <select
                    {...register(`ports.${i}.status`)}
                    className="select select-bordered w-full"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>

                <TextInput
                  label="Scaling"
                  type="number"
                  {...register(`ports.${i}.calibrationValue.scaling`)}
                />
                <TextInput
                  label="Offset"
                  type="number"
                  {...register(`ports.${i}.calibrationValue.offset`)}
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
                    {...register(`ports.${i}.thresholds.min`)}
                  />
                  <TextInput
                    placeholder="Max"
                    type="number"
                    {...register(`ports.${i}.thresholds.max`)}
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
