// app/_lib/rbac/policies/index.ts
import { Resources } from "../resources";
import { organizationsPolicy } from "./organizations.policy";
import { PolicyMap } from "./policy.types";

export const policies: PolicyMap = {
  // @ts-expect-error: Policy type is more specific than PolicyMap allows
  [Resources.ORGANIZATIONS]: organizationsPolicy,
};
