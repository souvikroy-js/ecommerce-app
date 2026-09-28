"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const adminUserDelete = async (id: string) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "admin") {
    return {
      isSuccess: false,
      message: "Unauthorized 🚫",
    };
  }

  if (id === session.user.id) {
    return {
      isSuccess: false,
      message: "You can't delete yourself",
    };
  }

  try {
    await prisma.user.delete({ where: { id } });

    revalidatePath("/admin/users");

    return {
      isSuccess: true,
      message: "User Deleted Successfully 👍",
    };
  } catch (error) {
    console.error(error);

    return {
      isSuccess: false,
      message: "User delete failed 😢",
    };
  }
};

export default adminUserDelete;
