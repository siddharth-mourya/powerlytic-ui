import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import DeviceModelDetails from "./DeviceModelDetails";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";

const Page = () => {
  return (
    <RoleProtectedPage resource="deviceModels">
      <Breadcrumbs items={BREADCRUMBS.newDeviceModels.items || []} />
      <PageContentHeader title={"Device Model"} />
      <DeviceModelDetails />
    </RoleProtectedPage>
  );
};

export default Page;
