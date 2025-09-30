"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="drawer sm:drawer-open h-screen w-full overflow-hidden bg-base-100">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col w-full overflow-x-hidden">
        <Header />
        <div className="flex-1 w-full overflow-y-auto p-6 bg-base-100">
          {children}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-30">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
}
