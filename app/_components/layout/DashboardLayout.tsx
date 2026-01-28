"use client";

import { ReactNode, useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed((v) => !v);
  };

  return (
    <div className="flex h-screen bg-base-100">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggleSidebar={toggleSidebar} />

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header collapsed={collapsed} onToggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 bg-base-100">
          {children}
        </main>
      </div>
    </div>
  );
}
