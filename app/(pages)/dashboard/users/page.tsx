"use client";
import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import { UsersList } from "./UserList/UserList";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";

const DashboardPage = () => {
  return (
    <RoleProtectedPage resource="users">
      <Breadcrumbs items={BREADCRUMBS.users.items || []} />
      <PageContentHeader title={"Users"} />
      <UsersList />
    </RoleProtectedPage>
  );
};

export default DashboardPage;
