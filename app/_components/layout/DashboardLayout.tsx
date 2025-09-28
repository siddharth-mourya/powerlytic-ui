"use client";

import { ReactNode } from "react";
import Header from "./Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen min-w-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
}
