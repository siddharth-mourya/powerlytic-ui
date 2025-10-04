import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import { DeviceModelList } from "./_components/DeviceModelList";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";

const DeviceModelPage = () => {
  return (
    <RoleProtectedPage resource="deviceModels">
      <Breadcrumbs items={BREADCRUMBS.deviceModels.items || []} />
      <PageContentHeader title={"Device Model"} />
      <DeviceModelList />
    </RoleProtectedPage>
  );
};

export default DeviceModelPage;
