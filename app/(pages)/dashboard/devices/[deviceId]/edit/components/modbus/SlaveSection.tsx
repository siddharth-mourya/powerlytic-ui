import { AccordionHeader } from "@/app/_components/Accordion/AccordionHeader";
import Button from "@/app/_components/Button/Button";
import { Card, CardContent, CardTitle } from "@/app/_components/Card/Card";
import { FormField } from "@/app/_components/Inputs/FormField";
import { Select } from "@/app/_components/Inputs/Select";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import {
  BAUD_RATE_OPTIONS,
  DATA_BITS_OPTIONS,
  ENDIANNESS_OPTION,
  FUNCTION_CODE_OPTIONS,
  IDevice,
  PARITY_OPTIONS,
  STOP_BITS_OPTIONS,
} from "@/app/_lib/_react-query-hooks/device/devices.types";
import { Trash2 } from "lucide-react";
import {
  Control,
  useFieldArray,
  UseFormRegister,
  useWatch,
  FieldErrors,
} from "react-hook-form";

// Determine available bit options based on function code
function getBitsToReadOptions(functionCode: string) {
  if (functionCode === "fc_1" || functionCode === "fc_2") {
    // Coil (FC01) and Discrete Input (FC02) only support 1-bit
    return [{ label: "1", value: "1" }];
  }
  // Holding Register (FC03) and Input Register (FC04) support 16, 32, 64-bit
  return [
    { label: "16", value: "16" },
    { label: "32", value: "32" },
    { label: "64", value: "64" },
  ];
}

// Separate component for each read card to enable useWatch per read
interface ReadCardProps {
  portIndex: number;
  slaveIndex: number;
  readIndex: number;
  control: Control<IDevice>;
  register: UseFormRegister<IDevice>;
  errors?: FieldErrors<IDevice>;
  onRemove: () => void;
}

function ReadCard({
  portIndex,
  slaveIndex,
  readIndex,
  control,
  register,
  errors,
  onRemove,
}: ReadCardProps) {
  const fieldPath = ``;

  // Watch the functionCode field to dynamically update bit options
  const functionCode = useWatch({
    control,
    name: `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.functionCode`,
  });

  const bitsToReadOptions = getBitsToReadOptions(functionCode);

  return (
    <Card>
      <CardTitle className="flex justify-between">
        Read {readIndex + 1}
        <button onClick={onRemove}>
          <Trash2 size={16} color="#fa0000" />
        </button>
      </CardTitle>
      <CardContent className="grid md:grid-cols-3 gap-3">
        <TextInput
          label="Start Address"
          error={
            errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.reads?.[
              readIndex
            ]?.startAddress?.message
          }
          {...register(
            `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.startAddress`,

            {
              required: "Start Address is required",
            },
          )}
          required
        />
        <TextInput
          label="Name"
          required
          error={
            errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.reads?.[
              readIndex
            ]?.name?.message
          }
          {...register(
            `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.name`,
            {
              required: "Name is required",
            },
          )}
        />
        <TextInput
          label="Unit"
          required
          error={
            errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.reads?.[
              readIndex
            ]?.unit?.message
          }
          {...register(
            `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.unit`,
            {
              required: "Unit is required",
            },
          )}
        />
        <TextInput
          label="Scaling"
          type="number"
          required
          error={
            errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.reads?.[
              readIndex
            ]?.scaling?.message
          }
          {...register(
            `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.scaling`,
            {
              required: "Scaling is required",
              valueAsNumber: true,
            },
          )}
        />
        <TextInput
          label="Offset"
          type="number"
          required
          error={
            errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.reads?.[
              readIndex
            ]?.offset?.message
          }
          {...register(
            `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.offset`,
            {
              required: "Offset is required",
              valueAsNumber: true,
            },
          )}
        />

        <Select
          label="Endianness"
          required
          error={
            errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.reads?.[
              readIndex
            ]?.endianness?.message
          }
          {...register(
            `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.endianness`,
            {
              required: "Endianness is required",
            },
          )}
          options={ENDIANNESS_OPTION}
        />
        <Select
          label="Function Code"
          required
          error={
            errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.reads?.[
              readIndex
            ]?.functionCode?.message
          }
          {...register(
            `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.functionCode`,
            {
              required: "Function Code is required",
            },
          )}
          options={FUNCTION_CODE_OPTIONS}
        />

        <FormField label="Data Bits" required>
          <Select
            required
            error={
              errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.reads?.[
                readIndex
              ]?.bitsToRead?.message
            }
            {...register(
              `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.bitsToRead`,
              {
                required: "Data Bits is required",
              },
            )}
            options={bitsToReadOptions}
          />
        </FormField>
      </CardContent>
    </Card>
  );
}

export function SlaveSection({
  portIndex,
  slaveIndex,
  control,
  register,
  onRemove,
  errors,
}: {
  portIndex: number;
  slaveIndex: number;
  control: Control<IDevice>;
  register: UseFormRegister<IDevice>;
  errors?: FieldErrors<IDevice>;
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
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            className="w-fit"
            required
            error={
              errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.slaveId
                ?.message
            }
            {...register(
              `ports.${portIndex}.modbusSlaves.${slaveIndex}.slaveId`,
              {
                required: "Slave Id is required",
                valueAsNumber: true,
              },
            )}
            label="Slave Id"
            type="number"
          />
          <TextInput
            required
            error={
              errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.name
                ?.message
            }
            {...register(`ports.${portIndex}.modbusSlaves.${slaveIndex}.name`, {
              required: "Slave Name is required",
            })}
            label="Slave Name"
            type="text"
          />
        </div>

        {/* Serial + Polling */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardTitle>Serial</CardTitle>
            <CardContent className="grid grid-cols-2 gap-2">
              <Select
                label="BaudRate"
                required
                error={
                  errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.serial
                    ?.baudRate?.message
                }
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.baudRate`,
                  {
                    required: "BaudRate format is required",
                  },
                )}
                options={BAUD_RATE_OPTIONS}
              />

              <Select
                error={
                  errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.serial
                    ?.dataBits?.message
                }
                required
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.dataBits`,
                  {
                    required: "Data Bits format is required",
                  },
                )}
                label="Data Bits"
                options={DATA_BITS_OPTIONS}
              />

              <Select
                error={
                  errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.serial
                    ?.stopBits?.message
                }
                required
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.stopBits`,
                  {
                    required: "Stop Bits format is required",
                  },
                )}
                options={STOP_BITS_OPTIONS}
                label="Stop Bits"
              />

              <Select
                error={
                  errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]?.serial
                    ?.parity?.message
                }
                required
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.parity`,
                  {
                    required: "Parity is required",
                  },
                )}
                options={PARITY_OPTIONS}
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
                required
                error={
                  errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]
                    ?.polling?.intervalMs?.message
                }
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.polling.intervalMs`,
                  {
                    required: "Interval is required",
                    valueAsNumber: true,
                  },
                )}
              />
              <TextInput
                label="Timeout (ms)"
                type="number"
                required
                error={
                  errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]
                    ?.polling?.timeoutMs?.message
                }
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.polling.timeoutMs`,
                  {
                    required: "Timeout is required",
                    valueAsNumber: true,
                  },
                )}
              />
              <TextInput
                label="Retries"
                type="number"
                required
                error={
                  errors?.ports?.[portIndex]?.modbusSlaves?.[slaveIndex]
                    ?.polling?.retries?.message
                }
                {...register(
                  `ports.${portIndex}.modbusSlaves.${slaveIndex}.polling.retries`,
                  {
                    required: "Retries is required",
                    valueAsNumber: true,
                  },
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Reads */}
        <div className="space-y-3">
          {fields.map((_, readIndex) => (
            <ReadCard
              key={readIndex}
              readIndex={readIndex}
              slaveIndex={slaveIndex}
              portIndex={portIndex}
              control={control}
              register={register}
              errors={errors}
              onRemove={() => remove(readIndex)}
            />
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
                bitsToRead: 16,
                endianness: ENDIANNESS_OPTION[0].value,
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
