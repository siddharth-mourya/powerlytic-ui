import { DeviceModelList } from "./_components/DeviceModelList";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";

const DeviceModelPage = () => {
  return (
    <RoleProtectedGuard
      resource={Resources.DEVICE_MODELS}
      action={Actions.VIEW}
    >
      <Breadcrumbs items={BREADCRUMBS.deviceModels.items || []} />
      <PageContentHeader title={"Device Model"} />
      <DeviceModelList />
    </RoleProtectedGuard>
  );
};

export default DeviceModelPage;
