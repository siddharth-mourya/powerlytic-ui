import { Roles, Role } from "./roles";
import { Resources, Actions, Resource, Action } from "./resources";

// role → resource → allowed actions[]
export type RolePermissionMap = Record<
  Role,
  Partial<Record<Resource, Action[]>>
>;

export const RolePermissions: RolePermissionMap = {
  [Roles.COMPANY_ADMIN]: {
    [Resources.DASHBOARD]: [Actions.VIEW],
    [Resources.USERS]: [
      Actions.VIEW,
      Actions.CREATE,
      Actions.EDIT,
      Actions.DELETE,
    ],
    [Resources.DEVICES]: [
      Actions.VIEW,
      Actions.CREATE,
      Actions.EDIT,
      Actions.DELETE,
    ],
    [Resources.DEVICE_MODELS]: [Actions.VIEW, Actions.CREATE, Actions.EDIT],
    [Resources.ORGANIZATIONS]: [Actions.VIEW, Actions.CREATE, Actions.EDIT],
    [Resources.PORT_TYPES]: [Actions.VIEW, Actions.CREATE, Actions.EDIT],
  },

  [Roles.ORG_ADMIN]: {
    [Resources.DASHBOARD]: [Actions.VIEW],
    [Resources.USERS]: [Actions.VIEW],
    [Resources.DEVICES]: [Actions.VIEW, Actions.EDIT],
    [Resources.DEVICE_MODELS]: [Actions.VIEW],
    [Resources.PORT_TYPES]: [Actions.VIEW],
    [Resources.ORGANIZATIONS]: [Actions.VIEW],
  },

  [Roles.ORG_USER]: {
    [Resources.DASHBOARD]: [Actions.VIEW],
    [Resources.DEVICES]: [Actions.VIEW],
    [Resources.ORGANIZATIONS]: [Actions.VIEW],
  },
};
