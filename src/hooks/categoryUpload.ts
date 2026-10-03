"use server";

import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/dbClient/prisma";
import { CreateCategory } from "@/lib/types";
import { revalidatePath } from "next/cache";

const slugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-|-$/g, "");

const categoryUpload = async (
  { name, slug }: CreateCategory,
  categoryId?: string | null,
) => {
  await requireAdmin();

  const cleanName = name.trim();
  const finalSlug = slugify(slug?.trim() || cleanName);
  if (!cleanName || !finalSlug) {
    return { success: false, message: "Name and slug are required" };
  }

  const data = { name: cleanName, slug: finalSlug };

  try {
    if (categoryId) {
      await prisma.category.update({ where: { id: categoryId }, data });
    } else {
      await prisma.category.create({ data });
    }
  } catch (error) {
    const code =
      typeof error === "object" && error !== null && "code" in error ?
        String(error.code)
      : undefined;

    if (code === "P2002") {
      return {
        success: false,
        message: "A category with this slug already exists",
      };
    }
    if (code === "P2025") {
      return { success: false, message: "Category not found" };
    }
    console.error(error);
    return {
      success: false,
      message: `Failed to ${categoryId ? "update" : "create"} category`,
    };
  }

  revalidatePath("/admin/categories", "layout");
  return {
    success: true,
    message:
      categoryId ?
        "Category updated successfully"
      : "Category created successfully",
  };
};

export default categoryUpload;
