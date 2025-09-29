"use client";
import { RoleProtectedPage } from "@/app/_components/RBAC/RoleProtectedPage";
import { CurrentUserProfile } from "./components/CurrentUserProfile/CurrentUserProfile";
import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";

const DashboardPage = () => {
  return (
    <RoleProtectedPage resource="dashboard">
      <SectionWrapper>
        <h1 className="text-2xl">Dashboard</h1>
        <CurrentUserProfile />
      </SectionWrapper>
    </RoleProtectedPage>
  );
};

export default DashboardPage;
