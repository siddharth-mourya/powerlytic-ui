// lib/permissions.ts
export type Role = "CompanyAdmin" | "OrgAdmin" | "OrgUser";

export const Roles: Record<string, Role> = {
  COMPANY_ADMIN: "CompanyAdmin",
  ORG_ADMIN: "OrgAdmin",
  ORG_USER: "OrgUser",
};
