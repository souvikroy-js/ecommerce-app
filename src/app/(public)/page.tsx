import { ProductCard } from "@/components/Product/ProductCard";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home page | E-commerce App",
  description: "Home page of E-commerce App",
};

const HomePage = async () => {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      name: true,
      // description: true,
      price: true,
      images: true,
      stock: true,
      category: { select: { name: true } },
      // category: { select: { id: true, name: true, slug: true } },
    },
  });

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Shop</h1>
          <p className="text-muted-foreground mt-1">
            {products.length} product{products.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>

        {products.length === 0 ?
          <div className="text-muted-foreground flex h-64 items-center justify-center">
            No products available yet.
          </div>
        : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        }
      </div>
    </>
  );
};

export default HomePage;
