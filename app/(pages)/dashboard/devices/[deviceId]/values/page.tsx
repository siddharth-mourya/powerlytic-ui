"use client";

import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { useParams } from "next/navigation";
import ValuesPage from "./_components/ValuesPage";
import { replaceBreadcumbPlaceholders } from "@/app/_lib/utils/breadCrumbsHelper";

export default function DeviceValuesPage() {
  const { deviceId } = useParams();

  const breadcrumb = replaceBreadcumbPlaceholders(
    BREADCRUMBS.deviceValues.items,
    {
      deviceId: deviceId as string,
    },
  );

  return (
    <RoleProtectedGuard
      resource={Resources.DEVICES}
      action={Actions.VIEW}
      data={{ deviceId }}
    >
      <Breadcrumbs items={breadcrumb || []} />
      <ValuesPage deviceId={deviceId as string} />
    </RoleProtectedGuard>
  );
}
