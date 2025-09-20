export type NavItem = {
  label: string;
  href: string;
  roles: ("companyAdmin" | "orgAdmin" | "orgOperator")[];
};

export const navItems: NavItem[] = [
  // Company Admin links
  {
    label: "Organizations",
    href: "/dashboard/company/organizations",
    roles: ["companyAdmin"],
  },
  {
    label: "Device Models",
    href: "/dashboard/company/devices",
    roles: ["companyAdmin"],
  },
  {
    label: "Global Settings",
    href: "/dashboard/company/settings",
    roles: ["companyAdmin"],
  },

  // Org Admin links
  {
    label: "Org Overview",
    href: "/dashboard/org-admin",
    roles: ["orgAdmin", "companyAdmin"],
  },
  {
    label: "Users",
    href: "/dashboard/org-admin/users",
    roles: ["orgAdmin", "companyAdmin"],
  },
  {
    label: "Devices",
    href: "/dashboard/org-admin/devices",
    roles: ["orgAdmin", "companyAdmin"],
  },
  {
    label: "Alerts",
    href: "/dashboard/org-admin/alerts",
    roles: ["orgAdmin", "companyAdmin"],
  },

  // Operator links
  {
    label: "Monitoring",
    href: "/dashboard/operator",
    roles: ["orgOperator", "orgAdmin", "companyAdmin"],
  },
  {
    label: "My Alerts",
    href: "/dashboard/operator/alerts",
    roles: ["orgOperator", "orgAdmin", "companyAdmin"],
  },
];
