"use client";
import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import { UsersList } from "./UserList/UserList";

const DashboardPage = () => {
  return (
    <RoleProtectedPage resource="users">
      <UsersList />
    </RoleProtectedPage>
  );
};

export default DashboardPage;
