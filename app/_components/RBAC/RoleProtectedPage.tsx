"use client";

import { permissions } from "@/app/_lib/constants/permissions";
import { useAuthContext } from "@/app/_lib/context/AuthContext";
import { ReactNode } from "react";
import { FullScreenLoader } from "../Loader/FullScreenLoader";
import { Unauthorized } from "../Unauthorized/Unauthorized";

type ProtectedPageProps = {
  resource: keyof typeof permissions; // page or resource key
  children: ReactNode;
};

export function RoleProtectedPage({ resource, children }: ProtectedPageProps) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <FullScreenLoader />;

  if (user && !permissions[resource].canView.includes(user.role)) {
    return <Unauthorized />;
  }

  return <>{children}</>;
}
