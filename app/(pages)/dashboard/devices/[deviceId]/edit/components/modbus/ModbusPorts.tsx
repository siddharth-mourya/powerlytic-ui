import {
  IDevice,
  IModbusRead,
  IModbusSlave,
  IPort,
} from "@/app/_lib/_react-query-hooks/device/devices.types";
import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { SlaveSection } from "./SlaveSection";

export type IModbusReadForm = Omit<
  IModbusRead,
  "readId" | "slaveId" | "portKey"
> & {
  readId?: string;
  slaveId?: string;
  portKey?: string;
};

export type IModbusSlaveForm = Omit<IModbusSlave, "slaveId" | "portKey"> & {
  slaveId?: string;
  portKey?: string;
  reads: IModbusReadForm[];
};

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

  const {
    fields: slaves,
    append: addSlave,
    remove: removeSlave,
  } = useFieldArray({
    control,
    name: `ports.${portIndex}.modbusSlaves`,
  });

  return (
    <div className="border border-purple-300 rounded-lg p-4">
      <h3 className="font-semibold mb-3">
        {port.name} ({port.portKey})
      </h3>

      {slaves.map((slave, slaveIndex) => (
        <SlaveSection
          key={slave.id}
          portIndex={portIndex}
          slaveIndex={slaveIndex}
          control={control}
          register={register}
          onRemove={() => removeSlave(slaveIndex)}
        />
      ))}

      <button
        type="button"
        className="btn btn-outline btn-sm mt-3"
        onClick={() =>
          addSlave({
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
      </button>
    </div>
  );
}
