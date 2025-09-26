// lib/permissions.ts
export type Role = "companyAdmin" | "orgAdmin" | "orgOperator";

export const Roles: Record<string, Role> = {
  COMPANY_ADMIN: "companyAdmin",
  ORG_ADMIN: "orgAdmin",
  ORG_USER: "orgOperator",
};
