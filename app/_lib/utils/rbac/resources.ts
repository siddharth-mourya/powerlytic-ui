export const Resources = {
  DASHBOARD: "dashboard",
  USERS: "users",
  DEVICES: "devices",
  DEVICE_MODELS: "deviceModels",
  ORGANIZATIONS: "organizations",
  PORT_TYPES: "portTypes",
} as const;

export const Actions = {
  VIEW: "view",
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
} as const;

export type Resource = (typeof Resources)[keyof typeof Resources];
export type Action = (typeof Actions)[keyof typeof Actions];
