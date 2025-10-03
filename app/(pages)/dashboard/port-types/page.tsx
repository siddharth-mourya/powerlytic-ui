import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import PortTypeManager from "./components/PortTypes";

const PortTypesPage = () => {
  return (
    <RoleProtectedPage resource="portTypes">
      <PortTypeManager />
    </RoleProtectedPage>
  );
};

export default PortTypesPage;
