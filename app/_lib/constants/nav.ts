import { Resources } from "../utils/rbac/resources";

export const navItems = [
  { label: "Dashboard", path: "/dashboard", resource: Resources.DASHBOARD },
  { label: "Users", path: "/dashboard/users", resource: Resources.USERS },
  {
    label: "Port Types",
    path: "/dashboard/port-types",
    resource: Resources.PORT_TYPES,
  },
  {
    label: "Device Models",
    path: "/dashboard/device-models",
    resource: Resources.DEVICE_MODELS,
  },
  {
    label: "Organizations",
    path: "/dashboard/organizations",
    resource: Resources.ORGANIZATIONS,
  },
  { label: "Devices", path: "/dashboard/devices", resource: Resources.DEVICES },
];
