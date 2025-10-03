import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import { DeviceModelList } from "./components/DeviceModelList";

const DeviceModelPage = () => {
  return (
    <RoleProtectedPage resource="deviceModels">
      <DeviceModelList />
    </RoleProtectedPage>
  );
};

export default DeviceModelPage;
