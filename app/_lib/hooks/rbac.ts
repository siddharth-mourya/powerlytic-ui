import { permissions, PermissionConfig } from "../constants/permissions";
import { useAuthStore } from "../stores/useAuthStore";

export const useCan = (
  resource: keyof typeof permissions,
  action: keyof PermissionConfig
) => {
  const user = useAuthStore((s) => s.user);
  if (!user) return false;

  const resourcePermissions = permissions[resource];
  if (!resourcePermissions) return false;

  if (action in resourcePermissions) {
    const roles = (resourcePermissions as PermissionConfig)[action];
    return Array.isArray(roles) && roles.includes(user.role);
  }
  return false;
};
