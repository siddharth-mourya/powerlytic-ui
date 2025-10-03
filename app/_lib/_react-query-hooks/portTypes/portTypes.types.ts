export enum PORT_CATEGORY {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

export enum PORT_VALUE_FORMAT {
  ANALOG = "ANALOG",
  DIGITAL = "DIGITAL",
  MODBUS = "MODBUS",
  AC_INPUT = "AC_INPUT",
}

export enum PORT_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type PortCategory = keyof typeof PORT_CATEGORY;
export type ValueFormat = keyof typeof PORT_VALUE_FORMAT;

export interface IPortType {
  _id: string;
  name: string;
  category: PortCategory;
  valueFormat: ValueFormat;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
