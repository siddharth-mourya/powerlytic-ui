"use client";

import { Menu } from "lucide-react";
import ToggleSideBarButton from "./ToggleSidebarButton";

export default function Header({
  collapsed,
  onToggleSidebar,
}: {
  collapsed: boolean;
  onToggleSidebar: () => void;
}) {
  if (collapsed) {
    return (
      <header className="h-14 flex items-center gap-3 border-b border-base-200 bg-base-100 px-4 sticky top-0 z-20">
        {/* Sidebar toggle */}
        <ToggleSideBarButton
          showButton={collapsed}
          onToggleSidebar={onToggleSidebar}
        />
      </header>
    );
  }
  return null;
}
