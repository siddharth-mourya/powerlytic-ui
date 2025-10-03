import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import DeviceModelDetails from "./DeviceModelDetails";

const Page = () => {
  return (
    <RoleProtectedPage resource="deviceModels">
      <DeviceModelDetails />
    </RoleProtectedPage>
  );
};

export default Page;
