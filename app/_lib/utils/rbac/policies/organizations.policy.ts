// app/_lib/rbac/policies/organizations.policy.ts
import { Organization } from "@/app/_lib/_react-query-hooks/organizations/organizations.types";
import { can } from "../can";
import { Actions, Resources } from "../resources";
import { Policy } from "./policy.types";

export const organizationsPolicy: Policy<Organization> = {
  canView(user, data) {
    if (!can(user.role, Resources.ORGANIZATIONS, Actions.VIEW)) return false;

    if (user.role === "CompanyAdmin") return true;

    if ((user.role === "OrgAdmin" || user.role === "OrgUser") && data) {
      return user.orgId === data._id;
    }

    return false;
  },

  canCreate(user) {
    return can(user.role, Resources.ORGANIZATIONS, Actions.CREATE);
  },

  canEdit(user, data) {
    if (!can(user.role, Resources.ORGANIZATIONS, Actions.EDIT)) return false;
    if (user.role === "CompanyAdmin") return true;
    if (user.role === "OrgAdmin" && data) {
      return user.orgId === data._id;
    }
    return false;
  },
};
