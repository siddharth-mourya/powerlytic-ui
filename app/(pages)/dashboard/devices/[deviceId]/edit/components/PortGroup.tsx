import { TextInput } from "@/app/_components/Inputs/TextInput";
import { ReadOnlyField } from "./ReadOnlyField";
import { IPort } from "@/app/_lib/_react-query-hooks/device/devices.types";
import { UseFormRegister } from "react-hook-form";
import { IDevice } from "@/app/_lib/_react-query-hooks/device/devices.types";

interface PortGroupProps {
  title: string;
  color: string;
  ports?: IPortGroupWithIndex;
  register: UseFormRegister<IDevice>;
}

export type IPortGroupWithIndex = Array<IPort & { originalIndex: number }>;

export function PortGroup({ title, color, ports, register }: PortGroupProps) {
  if (!ports?.length) return null;

  return (
    <details className="group">
      <summary className="cursor-pointer font-medium">{title}</summary>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {ports?.map((port) => {
          const actualIndex = port.originalIndex;
          return (
            <div
              key={port.portKey}
              className={`border ${color} rounded-lg p-4 space-y-3`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{port.name}</h3>
                <span className="badge badge-outline">{port.portKey}</span>
              </div>

              <ReadOnlyField label="Port Key" value={port.portKey} />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label>Status</label>
                  <select
                    {...register(`ports.${actualIndex}.status`)}
                    className="select select-bordered w-full"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>

                <div>
                  <label>Unit</label>
                  <TextInput {...register(`ports.${actualIndex}.unit`)} />
                </div>

                <div>
                  <label>Scaling</label>
                  <TextInput
                    type="number"
                    step="any"
                    {...register(
                      `ports.${actualIndex}.calibrationValue.scaling`
                    )}
                  />
                </div>

                <div>
                  <label>Offset</label>
                  <TextInput
                    type="number"
                    step="any"
                    {...register(
                      `ports.${actualIndex}.calibrationValue.offset`
                    )}
                  />
                </div>
              </div>

              <div className="pt-2 border-t">
                <label className="text-sm">Thresholds</label>
                <div className="grid grid-cols-3 gap-2">
                  <TextInput
                    type="number"
                    placeholder="Min"
                    {...register(`ports.${actualIndex}.thresholds.min`)}
                  />
                  <TextInput
                    type="number"
                    placeholder="Max"
                    {...register(`ports.${actualIndex}.thresholds.max`)}
                  />
                  <TextInput
                    placeholder="Message"
                    {...register(`ports.${actualIndex}.thresholds.message`)}
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
