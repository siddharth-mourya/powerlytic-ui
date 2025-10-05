export const Roles = {
  COMPANY_ADMIN: "CompanyAdmin",
  ORG_ADMIN: "OrgAdmin",
  ORG_USER: "OrgUser",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
