import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import PortTypeManager from "./PortTypes";
import DashboardLayout from "@/app/_components/layout/DashboardLayout";

const PortTypesPage = () => {
  return (
    <RoleProtectedPage resource="portTypes">
      <PortTypeManager />
    </RoleProtectedPage>
  );
};

export default PortTypesPage;
