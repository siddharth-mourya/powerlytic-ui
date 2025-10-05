"use client";

import DeviceModelForm from "./DeviceModelForm";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";

export default function NewDeviceModelPage() {
  return (
    <RoleProtectedGuard
      resource={Resources.DEVICE_MODELS}
      action={Actions.CREATE}
    >
      <Breadcrumbs items={BREADCRUMBS.newDeviceModels.items || []} />
      <PageContentHeader title={"Device Model"} />
      <DeviceModelForm />
    </RoleProtectedGuard>
  );
}
