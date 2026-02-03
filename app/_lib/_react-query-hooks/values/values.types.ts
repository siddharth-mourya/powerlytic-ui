/**
 * Value Module Type Definitions
 * Interfaces for device value readings (sensor data)
 * Designed for frontend consumption following backend API response
 */

// 🔹 Modbus Register Details
export interface IModbusRegisters {
  rawRegisters: string[]; // Hex values ["0x5AF0", "0x1234"]
  parsedValue: number; // After register parsing & endianness
  bitsToRead: number; // 8, 16, 32, or 64
  endianness: "ABCD" | "CDAB" | "BADC" | "DCBA" | "NONE";
}

// 🔹 Modbus Read Metadata
export interface IModbusReadMetadata {
  readId: string; // Unique read identifier
  slaveId: string; // Modbus slave ID
  name: string; // e.g., "Pressure Reading"
  tag: string; // e.g., "PRESSURE_01"
}

// 🔹 Port Information in Value
export interface IPortInfo {
  portKey: string; // "DI_1", "AI_1", "MI_1"
  portType: "DIGITAL" | "ANALOG" | "MODBUS";
}

// 🔹 Device Metadata in Value
export interface IValueMetadata {
  deviceId: string;
  orgId: string;
}

// 🔹 Main Value Interface (single reading)
export interface IValue {
  _id: string;

  // ⏰ Timestamps
  ts: Date; // When device measured the value
  ingestTs: Date; // When server received it

  // 📍 Identification
  metadata: IValueMetadata;

  // 🔌 Port Info
  port: IPortInfo;

  // 📡 Modbus-Specific (only for MODBUS type)
  modbusRead?: IModbusReadMetadata;

  // 🔢 Register Details (for MODBUS only)
  modbusRegisters?: IModbusRegisters;

  // 📊 Values
  rawValue: number | boolean | string;
  calibratedValue: number | boolean | string; // ✅ USE THIS FOR DISPLAY
  unit?: string; // "°C", "%", "kPa", etc.

  // ✅ Data Quality
  quality: "good" | "bad" | "uncertain";

  // 🔍 Debug
  rawPayload?: Record<string, unknown>;
}

// 🔹 Value for Table View (row with all ports)
export interface IValueTableRow {
  ts: Date;
  timestamp: string; // Formatted timestamp
  [portKey: string]: unknown; // Dynamic columns for each port
  // Example structure:
  // ts: "2025-01-10T14:30:00Z",
  // DI_1: { value: 1, unit: null, quality: "good" },
  // AI_1: { value: -15, unit: "°C", quality: "good" },
  // Slave1_Read1: { value: 1002.3, unit: "kPa", quality: "good" }
}

// 🔹 Time-Series Data for Charts
export interface IValueTimeSeries {
  portKey: string;
  name: string;
  unit?: string;
  dataPoints: Array<{
    ts: string;
    value: number | boolean | string;
    rawValue: number | boolean | string;
    quality?: "good" | "bad" | "uncertain";
  }>;
  stats: {
    count: number;
    minValue: number;
    maxValue: number;
    avgValue: number;
    firstTimestamp: string;
    lastTimestamp: string;
  };
}

// 🔹 Modbus Read Time-Series
export interface IModbusReadTimeSeries {
  readId: string;
  name: string;
  tag?: string;
  unit?: string;
  dataPoints: Array<{
    ts: string;
    value: number | boolean | string;
    rawValue: number | boolean | string;
    registers?: IModbusRegisters;
    quality?: "good" | "bad" | "uncertain";
  }>;
  stats: {
    count: number;
    minValue: number;
    maxValue: number;
    avgValue: number;
    firstTimestamp: string;
    lastTimestamp: string;
  };
}

// 🔹 Calibration Configuration
export interface ICalibration {
  scaling: number;
  offset: number;
}

// 🔹 Thresholds Configuration
export interface IThresholds {
  min: number | null;
  max: number | null;
  message: string;
}

// 🔹 Modbus Read (nested in Modbus Port)
export interface IModbusRead {
  portKey: string;
  readId: string;
  slaveId: string;
  name: string;
  slaveName?: string;
  tag?: string;
  unit?: string;
  dataType?: string;
  startAddress: number;
  bitsToRead: number;
  endianness: string;
  registerType: string;
  functionCode: string;
  scaling: number;
  offset: number;
  rawValue: number | null;
  calibratedValue: number | null;
  parsedValue?: number;
  rawRegisters?: string[];
  quality: "good" | "bad" | "uncertain";
  timestamp: string | null;
  ingestTimestamp: string | null;
}

// 🔹 Latest Port (Digital/Analog)
export interface ILatestPort {
  portKey: string;
  portType: string; // Can be ID or "MODBUS"
  name: string;
  unit?: string;
  status: string;
  calibration: ICalibration;
  thresholds: IThresholds;
  rawValue: number | boolean | null;
  calibratedValue: number | boolean | null;
  quality: "good" | "bad" | "uncertain";
  timestamp: string | null;
  ingestTimestamp: string | null;
}

// 🔹 Latest Modbus Port (with reads array)
export interface ILatestModbusPort extends Omit<ILatestPort, "portType"> {
  portType: "MODBUS";
  reads: IModbusRead[];
}

// 🔹 Latest Port Type (Digital/Analog/Modbus)
export type ILatestPortType = ILatestPort | ILatestModbusPort;

// 🔹 Device Info in Latest Values Response
export interface ILatestValueDevice {
  id: string;
  name: string;
  status: string;
}

// 🔹 Latest Values Snapshot Response
export interface IValuesSnapshot {
  success: boolean;
  device: ILatestValueDevice;
  count: number;
  ports: ILatestPortType[];
}

// 🔹 Port Statistics
export interface IPortStats {
  count: number;
  minValue: number;
  maxValue: number;
  avgValue: number;
  lastValue: number;
  lastTimestamp: string;
}

// 🔹 API Response Wrappers

// List response
export interface IValuesListResponse {
  success: boolean;
  count: number;
  data: IValue[];
}

// Table view response
export interface IValuesTableResponse {
  success: boolean;
  count: number;
  data: IValueTableRow[];
}

// Time-series response
export interface IValuesTimeSeriesResponse {
  success: boolean;
  data: IValueTimeSeries;
}

// Modbus time-series response
export interface IModbusReadTimeSeriesResponse {
  success: boolean;
  data: IModbusReadTimeSeries;
}

// Snapshot response
export interface IValuesSnapshotResponse {
  success: boolean;
  device: ILatestValueDevice;
  count: number;
  ports: Array<ILatestPortType>;
}

// Stats response
export interface IPortStatsResponse {
  success: boolean;
  data: IPortStats;
}

// Status response
export interface IDeviceStatusResponse {
  success: boolean;
  data: {
    deviceId: string;
    deviceName: string;
    lastUpdate: string;
    portCount: number;
    portStatus: {
      [portKey: string]: {
        name: string;
        value?: number | boolean | string;
        unit?: string;
        lastUpdate: string;
        readCount?: number;
        slaveCount?: number;
      };
    };
  };
}
