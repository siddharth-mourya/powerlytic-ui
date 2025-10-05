// app/_lib/rbac/usePolicy.ts
import { policies } from "./policies";
import { can } from "./can";
import { Resource, Action } from "./resources";
import { User } from "@/app/_lib/_react-query-hooks/auth/useCurrentLoggedinUserRQ";
import { Policy } from "./policies/policy.types";

export function canWithPolicy<TData>(
  user: User,
  resource: Resource,
  action: Action,
  data?: TData
): boolean {
  const policy = policies[resource] as Policy<TData> | undefined;
  const baseAllowed = can(user.role, resource, action);
  if (!policy) return baseAllowed;

  switch (action) {
    case "view":
      return policy.canView ? policy.canView(user, data) : baseAllowed;
    case "create":
      return policy.canCreate ? policy.canCreate(user, data) : baseAllowed;
    case "edit":
      return policy.canEdit ? policy.canEdit(user, data) : baseAllowed;
    case "delete":
      return policy.canDelete ? policy.canDelete(user, data) : baseAllowed;
    default:
      return baseAllowed;
  }
}
