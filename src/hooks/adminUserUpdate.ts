"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

type AdminUserUpdateInput = {
  id: string;
  name?: string;
  email?: string;
  role?: "admin" | "customer";
  banned?: boolean;
  banReason?: string | null;
};

const adminUserUpdate = async ({
  id,
  name,
  email,
  role,
  banned,
  banReason,
}: AdminUserUpdateInput) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "admin") {
    return {
      isSuccess: false,
      message: "Unauthorized 🚫",
    };
  }

  if (id === session.user.id && (role === "customer" || banned)) {
    return {
      isSuccess: false,
      message: "You can't demote or ban yourself",
    };
  }

  try {
    await prisma.user.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(role !== undefined && { role }),
        ...(banned !== undefined && {
          banned,
          banReason: banned ? (banReason ?? "") : null,
          banExpires: null,
        }),
      },
    });

    revalidatePath("/admin/users");

    return {
      isSuccess: true,
      message: "User Updated Successfully 👍",
    };
  } catch (error) {
    console.error(error);

    return {
      isSuccess: false,
      message: "User update failed 😢",
    };
  }
};

export default adminUserUpdate;
