import { createAccessControl } from "better-auth/plugins";
import {
  adminAc,
  defaultStatements,
} from "better-auth/plugins/organization/access";

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  ...defaultStatements,
  product: ["create", "update", "delete", "read"],
} as const;

export const ac = createAccessControl(statement);

export const customer = ac.newRole({
  product: ["read"],
});

export const admin = ac.newRole({
  ...adminAc.statements,
  product: ["create", "update", "delete", "read"],
});
