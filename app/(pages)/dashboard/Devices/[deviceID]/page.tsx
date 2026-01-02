"use client";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { useParams } from "next/navigation";
import { DeviceDetails } from "./DeviceDetails";

const DevicesByIDPage = () => {
  const { deviceId } = useParams();
  return (
    <RoleProtectedGuard resource={Resources.DEVICES} action={Actions.VIEW}>
      <Breadcrumbs items={BREADCRUMBS.deviceById.items || []} />
      <DeviceDetails deviceId={(deviceId as string) || ""} />
    </RoleProtectedGuard>
  );
};

export default DevicesByIDPage;
