export type DeviceStatus = "online" | "offline" | "maintenance";
export type PortKind = "DI" | "AI" | "MI";

export interface DeviceFormValues {
  name: string;
  status: DeviceStatus;
  pointOfContact: string;
  alertEmails: string[];
  alertPhones: string[];
  metadata: Record<string, string | undefined>;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  ports: PortForm[];
}

export interface PortForm {
  portKey: string;
  name: string;
  portType: {
    code: PortKind;
  };
  status: string;
  unit?: string;
  calibrationValue?: {
    scaling: number;
    offset: number;
  };
  thresholds?: {
    min?: number;
    max?: number;
    message?: string;
  };
  modbusSlaves?: ModbusSlaveForm[];
}

export interface ModbusSlaveForm {
  slaveId: string;
  name: string;
  serial: {
    baudRate: number;
    dataBits: number;
    stopBits: number;
    parity: "none" | "even" | "odd";
  };
  polling: {
    intervalMs: number;
    timeoutMs: number;
    retries: number;
  };
  reads: ModbusReadForm[];
}

export interface ModbusReadForm {
  readId: string;
  name: string;
  description?: string;
  scaling: number;
  offset: number;
  unit?: string;
  tag?: string;
  dataType?: string;
  endianness?: "ABCD" | "CDAB" | "BADC" | "DCBA" | "NONE";
}
