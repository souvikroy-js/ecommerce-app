import z from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, { error: "DATABASE_URL is required" }),

  BETTER_AUTH_SECRET: z
    .string()
    .min(1, { error: "BETTER_AUTH_SECRET key is required" }),

  BETTER_AUTH_URL: z.url({ error: "BETTER_AUTH_URL is required" }),
});

const serverEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,

  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,

  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
};

export const serverEnv = serverEnvSchema.parse(serverEnvVars);
