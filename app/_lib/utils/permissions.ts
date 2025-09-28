import { Action, permissions } from "../constants/permissions";
import { Role } from "../types/roles.types";

export function can(
  role: Role,
  resource: keyof typeof permissions,
  action: Action
) {
  const resourcePermission = permissions[resource];
  return resourcePermission[action]?.includes(role);
}
