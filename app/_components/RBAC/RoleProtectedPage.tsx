"use client";

import {
  PermissionConfig,
  permissions,
} from "@/app/_lib/constants/permissions";
import { useAuthContext } from "@/app/_lib/context/AuthContext";
import { ReactNode } from "react";
import { FullScreenLoader } from "../Loader/FullScreenLoader";
import { Unauthorized } from "../Unauthorized/Unauthorized";

type ProtectedPageProps = {
  resource: keyof typeof permissions; // page or resource key
  action?: keyof PermissionConfig;
  children: ReactNode;
};

export function RoleProtectedPage({
  resource,
  children,
  action = "canView",
}: ProtectedPageProps) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <FullScreenLoader />;

  if (user && !permissions[resource][action].includes(user.role)) {
    return <Unauthorized />;
  }

  return <>{children}</>;
}
