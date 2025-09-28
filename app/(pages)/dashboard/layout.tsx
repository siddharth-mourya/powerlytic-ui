"use client";
import Breadcrumbs from "@/app/_components/Breadcrumbs/Breadcrumbs";
import DashboardLayout from "@/app/_components/layout/DashboardLayout";
import { BREADCRUMBS } from "@/app/_lib/constants/breadcrumbs";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const activeBreadcrumbs = BREADCRUMBS.find((crumb) => {
    if (crumb.route.startsWith(pathname)) return crumb;
  });

  return (
    <DashboardLayout>
      <Breadcrumbs items={activeBreadcrumbs?.items || []} />
      {children}
    </DashboardLayout>
  );
}
