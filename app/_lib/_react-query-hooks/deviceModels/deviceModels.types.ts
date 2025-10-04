export interface DeviceModel {
  _id: string;
  name: string;
  description: string;
  microControllerType: string;
  ports: {
    _id: string;
    portNumber: string;
    portType?: {
      _id: string;
      name: string;
      category: string;
      valueFormat: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
    microControllerPin: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface NewDeviceModelParams {
  name: string;
  description: string;
  microControllerType: string;
  ports: {
    portNumber: string;
    portType: string;
    microControllerPin: string;
    description: string;
  }[];
}
