"use server";

import { CreateProduct } from "@/lib/types";
import sharp from "sharp";
import { nanoid } from "nanoid";
import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";

const adminProductUpload = async (
  { name, price, stock, description, images, categoryId }: CreateProduct,
  file: File,
) => {
  const productId = nanoid();
  const imgArrayBuffer = await file.arrayBuffer();
  const productName = `${nanoid()}.jpeg`;

  try {
    await sharp(imgArrayBuffer)
      .resize({ width: 300, height: 240 })
      .jpeg({ quality: 87, mozjpeg: true })
      .toFile(`public/upload/products/${productName}`);
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: "Image processing failed 😢",
    };
  }

  try {
    await prisma.product.create({
      data: {
        id: productId,
        name,
        price,
        stock,
        description,
        images,
        categoryId: categoryId || undefined,
      },
    });
    revalidatePath("/", "layout");
    return {
      isSuccess: true,
      message: "Product Created Successfully 👍",
    };
  } catch (error) {
    console.error(error);

    await rm(`./public/upload/products/${productName}`, { force: true });

    return {
      isSuccess: false,
      message: "Product Create failed 😢",
    };
  }
};

export default adminProductUpload;
