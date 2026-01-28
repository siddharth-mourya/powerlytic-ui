"use client";
import { navItems } from "@/app/_lib/constants/nav";
import { useAuthContext } from "@/app/_lib/context/AuthContext";
import { can } from "@/app/_lib/utils/rbac/can";
import { Actions } from "@/app/_lib/utils/rbac/resources";
import Link from "next/link";
import { useRouter } from "next/navigation";

import clsx from "clsx";
import { LogOut, PanelRightClose, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import ToggleSideBarButton from "./ToggleSidebarButton";

export default function Sidebar({
  collapsed,
  onToggleSidebar,
}: {
  collapsed: boolean;
  onToggleSidebar: () => void;
}) {
  const pathname = usePathname();

  const { user, logout } = useAuthContext();
  const router = useRouter();
  if (!user) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    router.push(path);
  };

  const navsToShow = navItems.filter((item) => {
    return can(user.role, item.resource, Actions.VIEW);
  });

  return (
    <aside
      className={clsx(
        "z-1 border-r absolute md:static border-base-300  bg-base-200 h-full transition-all duration-300",
        collapsed ? "w-16 invisible md:visible" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Brand */}
        <div className="h-14 relative flex justify-between items-center px-4 border-b border-base-300">
          <div className="flex">
            <Zap className="text-primary" />
            {!collapsed && (
              <span className="ml-2 text-lg font-bold">Powerlytic</span>
            )}
          </div>

          <ToggleSideBarButton
            showButton={!collapsed}
            onToggleSidebar={onToggleSidebar}
            Icon={PanelRightClose}
          />
        </div>

        {/* Nav */}
        <ul className="menu p-2 flex-1">
          {navsToShow.map((item) => {
            const active = pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <Link
                  onClick={(e) => handleLinkClick(e, item.path)}
                  href={item.path}
                  className={clsx(
                    "flex items-center gap-3 rounded-md px-3 py-2 transition",
                    active
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-300",
                  )}
                >
                  {Icon && <Icon size={18} />}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="p-2 border-t border-base-300">
          <button
            onClick={logout}
            className="btn btn-ghost w-full justify-start gap-3"
          >
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </button>
        </div>
      </div>
    </aside>
  );
}
