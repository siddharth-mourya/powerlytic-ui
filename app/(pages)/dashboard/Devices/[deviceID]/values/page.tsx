"use client";

import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { useParams } from "next/navigation";
import ValuesPage from "./_components/ValuesPage";

export default function DeviceValuesPage() {
  const { deviceId } = useParams();

  return (
    <RoleProtectedGuard
      resource={Resources.DEVICES}
      action={Actions.VIEW}
      data={{ deviceId }}
    >
      <Breadcrumbs items={BREADCRUMBS.deviceValues.items || []} />
      <ValuesPage deviceId={deviceId as string} />
    </RoleProtectedGuard>
  );
}
