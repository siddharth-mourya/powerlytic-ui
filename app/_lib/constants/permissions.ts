import { Role, Roles } from "../types/roles.types";

export type PermissionConfig = {
  canView: Role[];
  canEdit?: Role[];
};

export const permissions = {
  dashboard: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN, Roles.ORG_USER],
  },
  organizations: {
    canView: [Roles.COMPANY_ADMIN],
    canEdit: [Roles.COMPANY_ADMIN],
  },
  users: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN],
    canEdit: [Roles.COMPANY_ADMIN],
  },
  devices: {
    canView: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN, Roles.ORG_USER],
    canEdit: [Roles.COMPANY_ADMIN, Roles.ORG_ADMIN],
  },
} satisfies Record<string, PermissionConfig>;
