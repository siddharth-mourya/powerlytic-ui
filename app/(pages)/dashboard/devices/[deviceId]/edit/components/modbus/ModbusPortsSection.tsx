import { IDevice } from "@/app/_lib/_react-query-hooks/device/devices.types";
import { IPortGroupWithIndex } from "../PortGroup";
import { Control, UseFormRegister } from "react-hook-form";
import { ModbusPort } from "./ModbusPorts";

interface ModbusPortsSectionProps {
  ports?: IPortGroupWithIndex;
  control: Control<IDevice>;
  register: UseFormRegister<IDevice>;
}

export function ModbusPortsSection({
  ports,
  control,
  register,
}: ModbusPortsSectionProps) {
  if (!ports?.length) return null;

  return (
    <details open>
      <summary className="cursor-pointer font-medium text-purple-600">
        Modbus Input Ports
      </summary>

      <div className="space-y-6 mt-4">
        {ports.map((port) => (
          <ModbusPort
            key={port.portKey}
            port={port}
            control={control}
            register={register}
          />
        ))}
      </div>
    </details>
  );
}
