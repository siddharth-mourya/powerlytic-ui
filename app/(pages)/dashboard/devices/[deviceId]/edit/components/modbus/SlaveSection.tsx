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
  const {
    fields: reads,
    append: addRead,
    remove: removeRead,
  } = useFieldArray({
    control,
    name: `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads`,
  });

  return (
    <details className="mb-4">
      <summary className="cursor-pointer font-medium">
        Slave #{slaveIndex + 1}
      </summary>

      <div className="mt-3 space-y-4 pl-4">
        {/* Serial */}
        <Card>
          <CardTitle>Serial Configuration</CardTitle>
          <CardContent className="grid grid-cols-4 gap-3">
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

        {/* Polling */}
        <Card>
          <CardTitle className="border-b border-base-200">
            Polling Configuration
          </CardTitle>
          <CardContent className="p-4 grid grid-cols-3 gap-3">
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

        {/* Reads */}
        {reads.map((read, readIndex) => (
          <Card key={read.id}>
            <div className="flex justify-between">
              <CardTitle>Read #{readIndex + 1}</CardTitle>
              <button type="button" onClick={() => removeRead(readIndex)}>
                <Trash2 color="#9c5e5e" />
              </button>
            </div>
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

        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() =>
            addRead({
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
        </button>

        <button
          type="button"
          className="btn btn-danger btn-xs mt-2"
          onClick={onRemove}
        >
          Remove Slave
        </button>
      </div>
    </details>
  );
}
