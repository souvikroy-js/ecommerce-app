"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const adminProductsControl = async (productId: string) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || session.user.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { isActive: true },
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    const updated = await prisma.product.update({
      where: { id: productId },
      data: { isActive: !product.isActive },
      select: { isActive: true },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      isActive: updated.isActive,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to toggle product",
    };
  }
};

export default adminProductsControl;
