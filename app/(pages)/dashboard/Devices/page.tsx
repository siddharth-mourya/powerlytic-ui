import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import DeviceListPage from "./components/DeviceLists";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";
import NewDeviceForm from "./components/NewDeviceForm";

const DevicesPage = () => {
  return (
    <RoleProtectedGuard resource={Resources.DEVICES} action={Actions.VIEW}>
      <Breadcrumbs items={BREADCRUMBS.devices.items || []} />
      <PageContentHeader title={"Devices"} />
      <div className="flex flex-col gap-6">
        <NewDeviceForm />
        <DeviceListPage />
      </div>
    </RoleProtectedGuard>
  );
};

export default DevicesPage;
