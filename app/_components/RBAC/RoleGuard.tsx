"use client";

import {
  PermissionConfig,
  permissions,
} from "@/app/_lib/constants/permissions";
import { Role } from "@/app/_lib/types/roles.types";
import { can } from "@/app/_lib/utils/permissions";
import { ReactNode } from "react";

type RoleGuardProps = {
  role: Role;
  resource: keyof typeof permissions;
  action: keyof PermissionConfig;
  children: ReactNode;
  fallback?: ReactNode;
};

export default function RoleGuard({
  role,
  resource,
  action,
  children,
  fallback = null,
}: RoleGuardProps) {
  if (!can(role, resource, action)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
