"use client";

import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { OrganizationDetails } from "../_components/OrganizationDetails";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { useParams } from "next/navigation";

export default function OrganizationDetailsPage() {
  const { orgId } = useParams();
  return (
    <RoleProtectedGuard
      resource={Resources.ORGANIZATIONS}
      action={Actions.VIEW}
      data={{ orgId }}
    >
      <Breadcrumbs items={BREADCRUMBS.organizationById.items || []} />
      {/* <PageContentHeader title={"Organization Details"} /> */}
      <OrganizationDetails />
    </RoleProtectedGuard>
  );
}
