"use client";
import { CurrentUserProfile } from "./_components/CurrentUserProfile/CurrentUserProfile";
import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";

const DashboardPage = () => {
  return (
    <RoleProtectedGuard resource={Resources.DASHBOARD} action={Actions.VIEW}>
      <Breadcrumbs items={BREADCRUMBS.dashboard.items || []} />
      <PageContentHeader title={"Dashboard"} />
      <SectionWrapper>
        <CurrentUserProfile />
      </SectionWrapper>
    </RoleProtectedGuard>
  );
};

export default DashboardPage;
