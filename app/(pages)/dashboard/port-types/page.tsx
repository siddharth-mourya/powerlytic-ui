import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import PortTypeManager from "./components/PortTypes";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";

const PortTypesPage = () => {
  return (
    <RoleProtectedPage resource="portTypes">
      <Breadcrumbs items={BREADCRUMBS.portTypes.items || []} />
      <PageContentHeader title={"Port Types"} />
      <PortTypeManager />
    </RoleProtectedPage>
  );
};

export default PortTypesPage;
