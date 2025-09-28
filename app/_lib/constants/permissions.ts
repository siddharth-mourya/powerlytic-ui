import { Role, Roles } from "../types/roles.types";

export type Action = "canView" | "canEdit" | "canAdd";

export type PermissionConfig = {
  canView: string[];
  canEdit: string[];
};

export const permissions = {
  users: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN] as Role[],
    canEdit: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN],
  },
  dashboard: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN, Roles.ORG_USER],
    canEdit: [Roles.COMPANY_ADMIN],
  },
  organizations: {
    canView: [Roles.COMPANY_ADMIN],
    canEdit: [Roles.COMPANY_ADMIN],
  },
  devices: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN, Roles.ORG_USER],
    canEdit: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN],
  },
  deviceModel: {
    canView: [Roles.COMPANY_ADMIN],
    canEdit: [Roles.COMPANY_ADMIN],
  },
  deviceModelDetails: {
    canView: [Roles.COMPANY_ADMIN],
    canEdit: [Roles.COMPANY_ADMIN],
  },
} satisfies Record<string, PermissionConfig>;
