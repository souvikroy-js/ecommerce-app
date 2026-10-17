"use server";

import { requireAdmin } from "@/lib/admin";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/dbClient/prisma";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^\S+@\S+$/;
const ROLES = ["admin", "customer"] as const;

type Role = (typeof ROLES)[number];

type UserFormData = {
  name: string;
  email: string;
  password?: string;
  role: string;
};

const fail = (message: string) => ({ isSuccess: false, message });

const adminUserUpload = async (
  mode: "create" | "edit",
  data: UserFormData,
  id?: string,
) => {
  await requireAdmin();

  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();
  const password = data.password ?? "";
  const role = data.role as Role;

  if (!name) return fail("Name is required.");
  if (!EMAIL_REGEX.test(email)) return fail("Invalid email.");
  if (!ROLES.includes(role)) return fail("Invalid role.");

  if (mode === "create" && password.length < MIN_PASSWORD_LENGTH) {
    return fail(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }

  try {
    if (mode === "create") {
      await auth.api.createUser({
        body: { name, email, password, role },
        headers: await headers(),
      });
    } else {
      if (!id) return fail("User id is missing.");

      await prisma.user.update({
        where: { id },
        data: { name, email, role },
        select: { id: true },
      });
    }

    revalidatePath("/admin");

    return {
      isSuccess: true,
      message:
        mode === "create" ?
          "User Created Successfully 👍"
        : "User Updated Successfully 👍",
    };
  } catch (error) {
    console.error(error);

    if (error instanceof APIError) return fail(error.message);

    // Prisma unique constraint (email already exists)
    if ((error as { code?: string })?.code === "P2002") {
      return fail("Email is already in use.");
    }

    return fail(
      mode === "create" ? "User Create failed 😢" : "User Update failed 😢",
    );
  }
};

export default adminUserUpload;
