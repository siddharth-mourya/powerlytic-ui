"use client";

import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import { OrganizationList } from "./_components/OrganizationsList";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";

export default function OrganizationListPage() {
  return (
    <RoleProtectedPage resource="organizations">
      <Breadcrumbs items={BREADCRUMBS.organizations.items || []} />
      <PageContentHeader title={"Organization"} />
      <OrganizationList />
    </RoleProtectedPage>
  );
}
