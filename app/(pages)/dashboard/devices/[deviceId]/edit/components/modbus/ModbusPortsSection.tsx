import { IDevice } from "@/app/_lib/_react-query-hooks/device/devices.types";
import { IPortGroupWithIndex } from "../PortGroup";
import { Control, UseFormRegister } from "react-hook-form";
import { ModbusPort } from "./ModbusPorts";
import { AccordionHeader } from "@/app/_components/Accordion/AccordionHeader";

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
    <details className="group rounded-lg border border-purple-200 bg-white">
      <AccordionHeader
        title="Modbus Input Ports"
        subtitle={`${ports.length} modbus ports`}
      />

      <div className="space-y-6 p-4">
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
