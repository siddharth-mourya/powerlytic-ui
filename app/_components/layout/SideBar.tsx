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
    <aside className="menu bg-base-200 text-base-content min-h-full w-64 p-4 border-r border-base-300">
      <ul className="space-y-1">
        {navsToShow.map((item) => (
          <li key={item.path}>
            <Link
              onClick={(e) => handleLinkClick(e, item.path)}
              href={item.path}
              className="block rounded-lg px-3 py-2 hover:bg-base-300 transition"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <button onClick={logout} className="btn btn-primary w-full">
          Logout
        </button>
      </div>
    </aside>
  );
}
