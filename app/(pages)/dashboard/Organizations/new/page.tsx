"use client";

import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import OrganizationForm from "../_components/OrganizationForm";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";

export default function NewOrganizationPage() {
  return (
    <RoleProtectedPage resource="organizations" action="canEdit">
      <Breadcrumbs items={BREADCRUMBS.organizationById.items || []} />
      <PageContentHeader title={"Add Organization"} />
      <OrganizationForm />
    </RoleProtectedPage>
  );
}
