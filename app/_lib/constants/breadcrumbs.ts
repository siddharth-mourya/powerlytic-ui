export const BREADCRUMBS = {
  dashboard: {
    route: "/dashboard",
    items: [{ label: "Dashboard", path: "/dashboard" }],
  },
  users: {
    route: "/dashboard/users",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Users", path: "/dashboard/users" },
    ],
  },
  portTypes: {
    route: "/dashboard/port-types",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Port Types", path: "/dashboard/port-types" },
    ],
  },
  deviceModels: {
    route: "/dashboard/device-models",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Device Models", path: "/dashboard/device-models" },
    ],
  },
  deviceModelById: {
    route: "/dashboard/device-models/:id",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Device Models", path: "/dashboard/device-models" },
      { label: "Device Model Details", path: "/dashboard/device-models/:id" },
    ],
  },
  newDeviceModels: {
    route: "/dashboard/device-models/new",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Device Models", path: "/dashboard/device-models" },
      { label: "Add Device Model", path: "/dashboard/device-models/new" },
    ],
  },

  //Organizations
  organizations: {
    route: "/dashboard/organizations",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Organizations", path: "/dashboard/organizations" },
    ],
  },
  organizationById: {
    route: "/dashboard/organizations/:id",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Organizations", path: "/dashboard/organizations" },
      { label: "Organization Details", path: "" },
    ],
  },

  //Devices
  devices: {
    route: "/dashboard/devices",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Devices", path: "/dashboard/devices" },
    ],
  },
  deviceById: {
    route: "/dashboard/device-models/:id",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Device", path: "/dashboard/devices" },
      { label: "Device Details", path: "" },
    ],
  },
  deviceValues: {
    route: "/dashboard/devices/:id/values",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Devices", path: "/dashboard/devices" },
      { label: "Device Details", path: "" },
      { label: "Values", path: "" },
    ],
  },
  newDevice: {
    route: "/dashboard/devices/new",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Devices", path: "/dashboard/device" },
      { label: "Add Device", path: "/dashboard/device/new" },
    ],
  },
};
