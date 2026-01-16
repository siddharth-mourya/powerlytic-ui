import {
  IDevice,
  IPort,
} from "@/app/_lib/_react-query-hooks/device/devices.types";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { SlaveSection } from "./SlaveSection";
import Button from "@/app/_components/Button/Button";

export function ModbusPort({
  port,
  control,
  register,
}: {
  port: IPort & { originalIndex: number };
  control: Control<IDevice>;
  register: UseFormRegister<IDevice>;
}) {
  const portIndex = port.originalIndex;

  const { fields, append, remove } = useFieldArray({
    control,
    name: `ports.${portIndex}.modbusSlaves`,
  });

  return (
    <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-purple-800">
          {port.name} ({port.portKey})
        </h3>
      </div>

      <div className="space-y-3">
        {fields.map((_, idx) => (
          <SlaveSection
            key={idx}
            portIndex={portIndex}
            slaveIndex={idx}
            control={control}
            register={register}
            onRemove={() => remove(idx)}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({
            name: "New Slave",
            slaveId: "",
            portKey: "",
            serial: {
              baudRate: 9600,
              dataBits: 8,
              stopBits: 1,
              parity: "none",
            },
            polling: { intervalMs: 1000, timeoutMs: 2000, retries: 3 },
            reads: [],
          })
        }
      >
        + Add Slave
      </Button>
    </div>
  );
}
