"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const adminProductsDelete = async (productId: string) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || session.user.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      error: "Product deleted",
    };
  } catch (error) {
    console.error(error, "Network error");
    return { success: false, error: "Failed to delete product" };
  }
};

export default adminProductsDelete;
