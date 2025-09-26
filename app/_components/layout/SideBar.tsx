// components/Sidebar.tsx
"use client";
import { permissions } from "@/app/_lib/constants/permissions";
import { useAuthStore } from "@/app/_lib/stores/useAuthStore";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", path: "/dashboard", resource: "dashboard" },
  { label: "Organizations", path: "/organizations", resource: "organizations" },
  { label: "Users", path: "/users", resource: "users" },
  { label: "Devices", path: "/devices", resource: "devices" },
];

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  return (
    <aside className="w-60 bg-gray-100 p-4">
      <ul>
        {navItems.map(
          (item) =>
            permissions[
              item.resource as keyof typeof permissions
            ].canView.includes(user.role) && (
              <li key={item.path}>
                <Link href={item.path}>{item.label}</Link>
              </li>
            )
        )}
      </ul>
    </aside>
  );
}
