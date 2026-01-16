import { AccordionHeader } from "@/app/_components/Accordion/AccordionHeader";
import Button from "@/app/_components/Button/Button";
import { Card, CardContent, CardTitle } from "@/app/_components/Card/Card";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import { IDevice } from "@/app/_lib/_react-query-hooks/device/devices.types";
import { Delete, DeleteIcon, Trash, Trash2 } from "lucide-react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";

export function SlaveSection({
  portIndex,
  slaveIndex,
  control,
  register,
  onRemove,
}: {
  portIndex: number;
  slaveIndex: number;
  control: Control<IDevice>;
  register: UseFormRegister<IDevice>;
  onRemove: () => void;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads`,
  });

  return (
    <details className="group rounded-md border border-gray-200 bg-white">
      <AccordionHeader title={`Slave ${slaveIndex + 1}`} />

      <div className="space-y-4 p-4">
        {/* Serial + Polling */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardTitle>Serial</CardTitle>
            <CardContent className="grid grid-cols-2 gap-2">
              <TextInput
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.baudRate`
                )}
                label="Baud Rate"
                type="number"
              />
              <TextInput
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.dataBits`
                )}
                label="Data Bits"
                type="number"
              />
              <TextInput
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.stopBits`
                )}
                label="Stop Bits"
                type="number"
              />
              <TextInput
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.parity`
                )}
                label="Parity"
              />
            </CardContent>
          </Card>

          <Card>
            <CardTitle>Polling</CardTitle>
            <CardContent className="grid grid-cols-3 gap-2">
              <TextInput
                label="Interval (ms)"
                type="number"
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.polling.intervalMs`
                )}
              />
              <TextInput
                label="Timeout (ms)"
                type="number"
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.polling.timeoutMs`
                )}
              />
              <TextInput
                label="Retries"
                type="number"
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.polling.retries`
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Reads */}
        <div className="space-y-3">
          {fields.map((_, readIndex) => (
            <Card key={readIndex}>
              <CardTitle className="flex justify-between">
                Read {readIndex + 1}
                <button onClick={() => remove(readIndex)}>
                  <Trash2 size={16} color="#fa0000" />
                </button>
              </CardTitle>
              <CardContent className="grid md:grid-cols-3 gap-3">
                <TextInput
                  label="startAddress"
                  {...register(
                    `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.startAddress`
                  )}
                />
                <TextInput
                  label="Name"
                  {...register(
                    `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.name`
                  )}
                />
                <TextInput
                  label="Unit"
                  {...register(
                    `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.unit`
                  )}
                />
                <TextInput
                  label="Scaling"
                  type="number"
                  {...register(
                    `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.scaling`
                  )}
                />
                <TextInput
                  label="Offset"
                  type="number"
                  {...register(
                    `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.offset`
                  )}
                />
                <TextInput
                  label="Data Type"
                  {...register(
                    `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.dataType`
                  )}
                />
                <TextInput
                  label="Tag"
                  {...register(
                    `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.tag`
                  )}
                />
                <TextInput
                  label="Bits to read"
                  {...register(
                    `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.bitsToRead`
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              append({
                readId: "",
                slaveId: "",
                portKey: "",
                unit: "",
                scaling: 1,
                offset: 0,
                name: "",
                functionCode: "fc_3",
                startAddress: 0,
                bitsToRead: 1,
              })
            }
          >
            + Add Read
          </Button>

          <Button type="button" variant="danger" size="sm" onClick={onRemove}>
            <Trash2 size={16} /> Remove Slave
          </Button>
        </div>
      </div>
    </details>
  );
}
