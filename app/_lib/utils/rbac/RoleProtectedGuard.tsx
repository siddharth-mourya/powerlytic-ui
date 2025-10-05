"use client";

import { FullScreenLoader } from "@/app/_components/Loader/FullScreenLoader";
import { Unauthorized } from "@/app/_components/Unauthorized/Unauthorized";
import { useAuthContext } from "@/app/_lib/context/AuthContext";
import { ReactNode } from "react";
import { Action, Resource } from "./resources";
import { canWithPolicy } from "./usePolicy";

type Props = {
  resource: Resource;
  action: Action;
  children: ReactNode;
  data?: unknown;
};

export function RoleProtectedGuard({
  resource,
  action,
  children,
  data,
}: Props) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <FullScreenLoader />;
  if (!user) return <Unauthorized />;

  const isAllowed = canWithPolicy(user, resource, action, data);
  if (!isAllowed) return <Unauthorized />;

  return <>{children}</>;
}
