"use client";

import { navItems } from "@/app/_lib/constants/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  role: "companyAdmin" | "orgAdmin" | "orgOperator";
};

export default function Sidebar({ role }: Props) {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-base-200 p-4">
      <h2 className="text-xl font-bold mb-6">IoT Portal</h2>
      <ul className="menu">
        {navItems
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${
                  pathname === item.href ? "active font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
}
