import { RolePermissions } from "./permissions";
import { Role } from "./roles";
import { Resource, Action } from "./resources";

export function can(role: Role, resource: Resource, action: Action): boolean {
  const allowed = RolePermissions[role]?.[resource] ?? [];
  return allowed.includes(action);
}
