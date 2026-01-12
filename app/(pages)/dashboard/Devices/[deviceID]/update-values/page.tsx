"use client";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { useParams } from "next/navigation";
import DeviceValueSimulatorPage from "./DeviceValueSimulatorPage";

const DevicesByIDPage = () => {
  const { deviceId } = useParams();
  return (
    <RoleProtectedGuard resource={Resources.DEVICES} action={Actions.VIEW}>
      <DeviceValueSimulatorPage deviceId={(deviceId as string) || ""} />
    </RoleProtectedGuard>
  );
};

export default DevicesByIDPage;
