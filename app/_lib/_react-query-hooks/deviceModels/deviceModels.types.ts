export interface DeviceModel {
  _id: string;
  name: string;
  description: string;
  microControllerType: string;
  ports: {
    _id: string;
    portNumber: string;
    portTypeId?: {
      name: string;
      _id: string;
    };
    microControllerPin: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
