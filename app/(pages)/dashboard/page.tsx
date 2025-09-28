"use client";
import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import { CurrentUserProfile } from "./components/CurrentUserProfile/CurrentUserProfile";

const DashboardPage = () => {
  return (
    <RoleProtectedPage resource="dashboard">
      <h1 className="text-2xl">Dashboard</h1>
      <CurrentUserProfile />
    </RoleProtectedPage>
  );
};

export default DashboardPage;
