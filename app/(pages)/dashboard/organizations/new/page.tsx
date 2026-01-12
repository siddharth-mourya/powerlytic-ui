"use client";

import OrganizationForm from "../_components/OrganizationForm";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";

export default function NewOrganizationPage() {
  return (
    <RoleProtectedGuard
      resource={Resources.ORGANIZATIONS}
      action={Actions.CREATE}
    >
      <Breadcrumbs items={BREADCRUMBS.organizationById.items || []} />
      <PageContentHeader title={"Add Organization"} />
      <OrganizationForm />
    </RoleProtectedGuard>
  );
}
