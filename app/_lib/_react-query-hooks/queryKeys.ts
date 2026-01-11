export const queryKeys = {
  auth: {
    profile: "auth-profile",
    login: "auth-login",
    logout: "auth-logout",
  },
  healthCheck: "health-check",
  users: {
    listAll: "users-list-all",
  },
  portTypes: {
    listAll: "port-types-list-all",
  },
  deviceModels: {
    listAll: "device-models-list-all",
    specificDevice: "specific device",
  },
  organizations: {
    listAll: "organization-list-all",
    specificOrg: "specific-org",
  },
  devices: {
    listAll: "devices-list-all",
    listAllByOrgId: "devices-list-all-by-org",
    byId: "device-by-id",
  },
  values: {
    list: "values-list",
    latest: "values-latest",
    portSpecific: "values-port-specific",
    modbusRead: "values-modbus-read",
    stats: "values-stats",
    table: "values-table",
    snapshot: "values-snapshot",
    timeseries: "values-timeseries",
    modbusTimeseries: "values-modbus-timeseries",
    status: "values-status",
  },
};
