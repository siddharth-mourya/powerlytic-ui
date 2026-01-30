import {
  BAUD_RATE_OPTIONS,
  IDevice,
  IPort,
} from "@/app/_lib/_react-query-hooks/device/devices.types";
import {
  Control,
  useFieldArray,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { SlaveSection } from "./SlaveSection";
import Button from "@/app/_components/Button/Button";

export function ModbusPort({
  port,
  control,
  register,
  errors,
}: {
  port: IPort & { originalIndex: number };
  control: Control<IDevice>;
  register: UseFormRegister<IDevice>;
  errors?: FieldErrors<IDevice>;
}) {
  const portIndex = port.originalIndex;
  const MAX_SLAVES = 5;

  const { fields, append, remove } = useFieldArray({
    control,
    name: `ports.${portIndex}.modbusSlaves`,
  });

  const handleAddSlave = () => {
    if (fields.length >= MAX_SLAVES) {
      alert(`Maximum ${MAX_SLAVES} slaves allowed per port`);
      return;
    }

    append({
      name: "New Slave",
      slaveId: "",
      portKey: "",
      serial: {
        baudRate: BAUD_RATE_OPTIONS[0].value,
        dataBits: 8,
        stopBits: 1,
        parity: "none",
      },
      polling: { intervalMs: 1000, timeoutMs: 2000, retries: 3 },
      reads: [],
    });
  };

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
            errors={errors}
            onRemove={() => remove(idx)}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddSlave}
        disabled={fields.length >= MAX_SLAVES}
      >
        + Add Slave{" "}
        {fields.length >= MAX_SLAVES && `(Max ${MAX_SLAVES} reached)`}
      </Button>
    </div>
  );
}
