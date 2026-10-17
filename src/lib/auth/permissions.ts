import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  ...defaultStatements,
  product: ["create", "update", "delete", "read"],
} as const;

export const ac = createAccessControl(statement);

export const customerUserRole = ac.newRole({
  product: ["read"],
});

export const adminUserRole = ac.newRole({
  ...adminAc.statements,
  product: ["create", "update", "delete", "read"],
});
