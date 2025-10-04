"use client";

import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import { OrganizationDetails } from "../_components/OrganizationDetails";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";

export default function OrganizationDetailsPage() {
  return (
    <RoleProtectedPage resource="organizations">
      <Breadcrumbs items={BREADCRUMBS.organizationById.items || []} />
      {/* <PageContentHeader title={"Organization Details"} /> */}
      <OrganizationDetails />
    </RoleProtectedPage>
  );
}
