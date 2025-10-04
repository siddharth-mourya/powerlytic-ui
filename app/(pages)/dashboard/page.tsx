"use client";
import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import { CurrentUserProfile } from "./_components/CurrentUserProfile/CurrentUserProfile";
import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { PageContentHeader } from "@/app/_components/layout/PageContentHeader";

const DashboardPage = () => {
  return (
    <RoleProtectedPage resource="dashboard">
      <Breadcrumbs items={BREADCRUMBS.dashboard.items || []} />
      <PageContentHeader title={"Dashboard"} />
      <SectionWrapper>
        <CurrentUserProfile />
      </SectionWrapper>
    </RoleProtectedPage>
  );
};

export default DashboardPage;
