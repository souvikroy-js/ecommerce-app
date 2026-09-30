import { Button } from "@/components/shadcnui/button";
import { DataTable } from "@/components/shadcnui/data-table";
import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/dbClient/prisma";
import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { columns, ProductItem } from "./columns";

export const metadata: Metadata = {
  title: "Products",
};

const AdminProductsPage = async () => {
  await requireAdmin();

  const products = await prisma.product.findMany({
    take: 1000,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      isActive: true,
      category: { select: { name: true } },
    },
  });

  const rows: ProductItem[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    stock: p.stock,
    isActive: p.isActive,
    categoryName: p.category?.name ?? "-",
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Products</h1>
          <p className="text-muted-foreground">{products.length} products</p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/admin/products/new" />}>
          <PlusIcon className="size-4" />
          Add Product
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={rows}
        searchKey="name"
        searchPlaceholder="Search products..."
      />
    </div>
  );
};

export default AdminProductsPage;
