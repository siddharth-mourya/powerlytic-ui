import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import DeviceListPage from "./devices/components/DeviceLists";

const DashboardPage = () => {
  return (
    <RoleProtectedGuard resource={Resources.DEVICES} action={Actions.VIEW}>
      <PageContentHeader title={"Devices"} />
      <DeviceListPage />
    </RoleProtectedGuard>
  );
};

export default DashboardPage;
