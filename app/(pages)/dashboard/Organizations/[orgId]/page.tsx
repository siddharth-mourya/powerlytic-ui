"use client";

import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { OrganizationDetails } from "../_components/OrganizationDetails";

export default function OrganizationDetailsPage() {
  return (
    <RoleProtectedPage resource="organizations">
      <Breadcrumbs items={BREADCRUMBS.organizationById.items || []} />
      {/* <PageContentHeader title={"Organization Details"} /> */}
      <OrganizationDetails />
    </RoleProtectedPage>
  );
}
