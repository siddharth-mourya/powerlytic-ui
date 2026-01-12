import { Card, CardContent, CardTitle } from "@/app/_components/Card/Card";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import { ReadOnlyField } from "./ReadOnlyField";
import { IPort } from "@/app/_lib/_react-query-hooks/device/devices.types";
import { UseFormRegister } from "react-hook-form";
import { IDevice } from "@/app/_lib/_react-query-hooks/device/devices.types";
import { IPortGroupWithIndex } from "./PortGroup";

interface ModbusPortsSectionProps {
  ports?: IPortGroupWithIndex;
  register: UseFormRegister<IDevice>;
}

export function ModbusPortsSection({
  ports,
  register,
}: ModbusPortsSectionProps) {
  if (!ports?.length) return null;

  return (
    <details open>
      <summary className="cursor-pointer font-medium text-purple-600">
        Modbus Input Ports
      </summary>

      <div className="space-y-6 mt-4">
        {ports?.map((port) => {
          const portIndex = port.originalIndex;
          return (
            <div
              key={port.portKey}
              className="border border-purple-300 rounded-lg p-4"
            >
              <h3 className="font-semibold mb-3">
                {port.name} ({port.portKey})
              </h3>

              {port.modbusSlaves?.map((slave, slaveIndex) => (
                <details key={slave.slaveId} className="mb-4">
                  <summary className="cursor-pointer font-medium">
                    Slave: {slave.name}
                  </summary>

                  <div className="mt-3 space-y-4 pl-4">
                    {/* Serial (Read-only) */}
                    <Card>
                      <CardTitle className="border-b border-base-200">
                        Serial Configuration
                      </CardTitle>
                      <CardContent className="p-4 grid grid-cols-4 gap-3">
                        <TextInput
                          label="Baud Rate"
                          type="number"
                          {...register(
                            `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.baudRate`
                          )}
                        />
                        <TextInput
                          label="Data Bits"
                          type="number"
                          {...register(
                            `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.dataBits`
                          )}
                        />
                        <TextInput
                          label="Stop Bits"
                          type="number"
                          {...register(
                            `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.stopBits`
                          )}
                        />
                        <TextInput
                          label="Parity"
                          {...register(
                            `ports.${portIndex}.modbusSlaves.${slaveIndex}.serial.parity`
                          )}
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
                    {slave.reads?.map((read, readIndex) => (
                      <Card key={read.readId}>
                        <CardTitle className="border-b border-base-200">
                          Read: {read.name} (Function Code: {read.functionCode})
                        </CardTitle>
                        <CardContent className="p-4 grid md:grid-cols-3 gap-3">
                          <ReadOnlyField
                            label="Register"
                            value={read.startAddress}
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
                            label="Tag"
                            {...register(
                              `ports.${portIndex}.modbusSlaves.${slaveIndex}.reads.${readIndex}.tag`
                            )}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          );
        })}
      </div>
    </details>
  );
}
