"use server";

import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";

const deleteCategory = async (categoryId: string) => {
  try {
    await prisma.category.delete({ where: { id: categoryId } });

    revalidatePath("/admin/categories");

    return {
      success: true,
      error: "Category Deleted Successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to delete category",
    };
  }
};

export default deleteCategory;
