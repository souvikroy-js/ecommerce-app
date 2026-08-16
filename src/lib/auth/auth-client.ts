import { createAuthClient } from "better-auth/react";
import { clientEnv } from "../env/clientEnv";
import {
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { auth } from "./auth";
import { ac, customer, admin } from "./permissions";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    organizationClient({
      ac,
      roles: {
        customer,
        admin,
      },
    }),
  ],
});
