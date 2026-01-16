import {
  IDevice,
  IModbusRead,
  IModbusSlave,
  IPort,
} from "@/app/_lib/_react-query-hooks/device/devices.types";

export type IModbusReadForm = Omit<
  IModbusRead,
  "readId" | "slaveId" | "portKey"
> & {
  readId?: string; // optional for new reads
  slaveId?: string;
  portKey?: string;
};

export type IModbusSlaveForm = Omit<
  IModbusSlave,
  "slaveId" | "portKey" | "reads"
> & {
  slaveId?: string; // optional for new slaves
  portKey?: string;
  reads: IModbusReadForm[];
};

export type IPortForm = Omit<IPort, "modbusSlaves"> & {
  modbusSlaves?: IModbusSlaveForm[];
};

export type IDeviceForm = Omit<IDevice, "ports"> & {
  ports: IPortForm[];
};
