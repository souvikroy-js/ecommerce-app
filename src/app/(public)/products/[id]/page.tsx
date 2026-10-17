import ProductDetail from "@/components/Product/ProductDetail";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const getProduct = cache(async (id: string) => {
  try {
    return await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        category: { select: { name: true } },
        stock: true,
        createdAt: true,
      },
    });
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product Not Found" };
  return { title: product.name };
}

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return <ProductDetail product={product} />;
};

export default ProductPage;
