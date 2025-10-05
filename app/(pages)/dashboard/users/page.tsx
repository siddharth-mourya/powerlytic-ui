"use client";
import { UsersList } from "./UserList/UserList";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";

const DashboardPage = () => {
  return (
    <RoleProtectedGuard resource={Resources.USERS} action={Actions.VIEW}>
      <Breadcrumbs items={BREADCRUMBS.users.items || []} />
      <PageContentHeader title={"Users"} />
      <UsersList />
    </RoleProtectedGuard>
  );
};

export default DashboardPage;
