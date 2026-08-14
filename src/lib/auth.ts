import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./dbClient/prisma";
import { serverEnv } from "./env/serverEnv";
import { nextCookies } from "better-auth/next-js";
import { hashPasswordFn, verifyPasswordFn } from "./argon2";

export const auth = betterAuth({
  secret: serverEnv.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "sqlite"
  }),
  plugins: [nextCookies()],

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
  advanced: {
    cookiePrefix: "wp",
    database: {
      generateId: false,
    },
  },
});
