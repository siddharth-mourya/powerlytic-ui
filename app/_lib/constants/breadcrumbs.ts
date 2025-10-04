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
};
