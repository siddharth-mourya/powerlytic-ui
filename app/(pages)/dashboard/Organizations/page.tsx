"use client";

import { OrganizationList } from "./_components/OrganizationsList";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";

export default function OrganizationListPage() {
  return (
    <RoleProtectedGuard
      resource={Resources.ORGANIZATIONS}
      action={Actions.VIEW}
    >
      <Breadcrumbs items={BREADCRUMBS.organizations.items || []} />
      <PageContentHeader title={"Organization"} />
      <OrganizationList />
    </RoleProtectedGuard>
  );
}
