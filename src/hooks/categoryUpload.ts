"use server";

import prisma from "@/lib/dbClient/prisma";
import { CreateCategory } from "@/lib/types";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const categoryUpload = async ({ name, slug }: CreateCategory) => {
  try {
    const finalSlug = slug?.trim() || slugify(name);
    await prisma.category.create({
      data: {
        name,
        slug: finalSlug,
      },
    });

    return {
      isSuccess: true,
      message: "Category Created Successfully 👍",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: "Category Create failed 👍",
    };
  }
};

export default categoryUpload;
