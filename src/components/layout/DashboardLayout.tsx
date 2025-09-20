"use client";

import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./SideBar";

// fake role fetcher (replace with real auth decoding)
function getRoleFromStorage(): "companyAdmin" | "orgAdmin" | "orgOperator" {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("role") as any) || "orgOperator";
  }
  return "orgOperator";
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<"companyAdmin" | "orgAdmin" | "orgOperator">(
    "orgOperator"
  );

  useEffect(() => {
    setRole(getRoleFromStorage());
  }, []);

  return (
    <div className="flex">
      <Sidebar role={role} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
