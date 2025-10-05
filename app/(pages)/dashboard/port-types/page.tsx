import PortTypeManager from "./components/PortTypes";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";

const PortTypesPage = () => {
  return (
    <RoleProtectedGuard resource={Resources.USERS} action={Actions.VIEW}>
      <Breadcrumbs items={BREADCRUMBS.portTypes.items || []} />
      <PageContentHeader title={"Port Types"} />
      <PortTypeManager />
    </RoleProtectedGuard>
  );
};

export default PortTypesPage;
