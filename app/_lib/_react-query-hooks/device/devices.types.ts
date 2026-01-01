// -----------------------------
// 🔹 Port Types

import { PORT_STATUS } from "../portTypes/portTypes.types";

// -----------------------------
export type PortStatus = keyof typeof PORT_STATUS; // 'INACTIVE' | 'ACTIVE' etc.

export interface Calibration {
  scaling: number;
  offset: number;
}

export interface Threshold {
  min?: number;
  max?: number;
  message?: string;
}

export interface ModbusRead {
  registerType: "holding" | "input" | "coil" | "discrete";
  functionCode: number;
  startAddress: number;
  bitsToRead: number;
  name: string;
  description?: string;
  scaling?: number;
  offset?: number;
  unit?: string;
}

export interface ModbusSlave {
  id: string;
  name: string;
  serial: {
    baudRate: number;
    dataBits: number;
    stopBits: number;
    parity: "none" | "even" | "odd";
  };
  reads: ModbusRead[];
}

export interface Port {
  name: string;
  portNumber: number;
  portTypeId: string;
  unit?: string;
  calibrationValue?: Calibration;
  status?: PortStatus;
  thresholds?: Threshold;
  slaves?: ModbusSlave[];
}

// -----------------------------
// 🔹 Device Types
// -----------------------------
export interface Device {
  _id: string;
  name: string;
  imei: string;
  deviceModelId: { _id: string; name: string }; // populated
  organizationId?: { _id: string; name: string }; // populated optional
  status?: "online" | "offline" | "maintenance";
  location?: {
    lat?: number;
    lng?: number;
    address?: string;
  };
  metadata?: Record<string, any>;
  ports: Port[];
  pointOfContact?: string;
  alertEmails?: string[];
  alertPhones?: string[];
  assignedAt?: string; // ISO date string
  lastSeen?: string; // ISO date string
  manufacturingYear?: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

// -----------------------------
// 🔹 DTOs for Create / Update
// -----------------------------
export interface CreateDeviceDTO {
  name: string;
  imei: string;
  deviceModelId: string;
  metadata?: Record<string, any>;
  organizationId?: string;
}

export type UpdateDeviceDTO = Omit<
  Device,
  | "_id"
  | "imei"
  | "deviceModelId"
  | "createdAt"
  | "updatedAt"
  | "manufacturingYear"
>;

// -----------------------------
// 🔹 API Responses
// -----------------------------
export type ListAllDevicesResponse = Device[];
export type GetDeviceByIdResponse = Device;
