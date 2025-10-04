export interface Organization {
  _id: string;
  name: string;
  address: string;
  orgEmail: string;
  orgPhone: string;
  isActive: boolean;
  cin: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface OrganizationUser {
  _id: string;
  email: string;
  password: string; // hashed password
  name: string;
  phone: string;
  role: "OrgAdmin" | "orgUser"; // extend if more roles
  organization: string; // reference to Organization._id
  isActive: boolean;
  refreshTokens: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrganizationDevice {
  _id: string;
  name: string;
  imei: string;
  deviceModelId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrganizationByIdResponse {
  organization: Organization;
  users: OrganizationUser[];
  devices: OrganizationDevice[];
}

export interface NewOrganizationParams {
  name: string;
  address: string;
  orgEmail: string;
  orgPhone: string;
}
