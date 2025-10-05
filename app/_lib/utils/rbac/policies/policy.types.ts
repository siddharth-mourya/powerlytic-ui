// app/_lib/rbac/types.ts
import { User } from "@/app/_lib/_react-query-hooks/auth/useCurrentLoggedinUserRQ";
import { Resource } from "../resources";

/**
 * Policy definition per resource.
 * Each policy can use a specific data type for contextual checks.
 */
export type Policy<TData> = {
  canView?: (user: User, data?: TData) => boolean;
  canCreate?: (user: User, data?: TData) => boolean;
  canEdit?: (user: User, data?: TData) => boolean;
  canDelete?: (user: User, data?: TData) => boolean;
};

/**
 * PolicyMap: maps resource name to a specific policy.
 * Use `unknown` for data so each policy can define its own type later.
 */

export type PolicyMap = Partial<Record<Resource, Policy<unknown>>>;
