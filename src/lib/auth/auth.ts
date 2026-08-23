import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins/admin";
import prisma from "../dbClient/prisma";
import { serverEnv } from "../env/serverEnv";
import { hashPasswordFn, verifyPasswordFn } from "./argon2";
import { ac, adminUserRole, customerUserRole } from "./permissions";

export const auth = betterAuth({
  secret: serverEnv.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "sqlite"
  }),

  plugins: [
    admin({
      ac,
      roles: {
        customer: customerUserRole,
        admin: adminUserRole,
      },
      defaultRole: "customer",
      adminRoles: ["admin"],
    }),
  ],
  // plugins: [
  //   organization({
  //     ac,
  //     roles: { customer, admin },
  //     defaultRole: "customer",
  //     adminRoles: ["admin"],
  //   }),
  //   nextCookies(),
  // ],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    password: {
      hash: hashPasswordFn,
      verify: verifyPasswordFn,
    },
    sendResetPassword: async ({ user, url }) => {
      // TODO: wire up real email sending (Resend, Nodemailer, etc.)
      console.log(`Reset link for ${user.email}: ${url}`);
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      console.log(`[AUTH] Verification email to ${user.email}: ${url}`);
    },
  },

  advanced: {
    cookiePrefix: "ecom",
    database: {
      generateId: false,
    },
  },
});

export type AppRole = "admin" | "customer";
