// components/Sidebar.tsx
"use client";
import { permissions } from "@/app/_lib/constants/permissions";
import { useAuthContext } from "@/app/_lib/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", path: "/dashboard", resource: "dashboard" },
  {
    label: "Organizations",
    path: "/dashboard/organizations",
    resource: "organizations",
  },
  { label: "Users", path: "/dashboard/users", resource: "users" },
  { label: "Devices", path: "/dashboard/devices", resource: "devices" },
];

export default function Sidebar() {
  const { user, logout } = useAuthContext();
  const router = useRouter();
  if (!user) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    router.push(path);
  };

  const navsToShow = navItems.filter((item) => {
    const canViewForResource =
      permissions[item.resource as keyof typeof permissions]?.canView || [];

    return canViewForResource.includes(user.role);
  });

  return (
    <aside className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <ul>
        {navsToShow.map((item) => (
          <li key={item.path}>
            <Link
              onClick={(e) => handleLinkClick(e, item.path)}
              href={item.path}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={logout} className="btn btn-secondary mt-4">
        Logout
      </button>
    </aside>
  );
}
