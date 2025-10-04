import { Role, Roles } from "../types/roles.types";

export type Action = "canView" | "canEdit";

export type PermissionConfig = {
  canView: string[];
  canEdit: string[];
};

export const permissions = {
  users: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN] as Role[],
    canEdit: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN],
  },
  portTypes: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN, Roles.ORG_USER],
    canEdit: [Roles.COMPANY_ADMIN],
  },
  dashboard: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN, Roles.ORG_USER],
    canEdit: [Roles.COMPANY_ADMIN],
  },
  deviceModels: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN, Roles.ORG_USER],
    canEdit: [Roles.COMPANY_ADMIN],
  },
  organizations: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN],
    canEdit: [Roles.COMPANY_ADMIN],
  },
  devices: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN, Roles.ORG_USER],
    canEdit: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN],
  },
  deviceModelDetails: {
    canView: [Roles.COMPANY_ADMIN],
    canEdit: [Roles.COMPANY_ADMIN],
  },
} satisfies Record<string, PermissionConfig>;
