import { Button } from "@/components/shadcnui/button";
import { DataTable } from "@/components/shadcnui/data-table";
import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/dbClient/prisma";
import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { columns } from "./columns";

export const metadata: Metadata = {
  title: "Categories",
};

const page = async () => {
  await requireAdmin();
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
  });

  const data = categories.map(({ _count, ...category }) => ({
    ...category,
    productCount: _count.products,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Categories</h1>
          <p className="text-muted-foreground">
            {categories.length} categories
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/admin/categories/new" />}>
          <PlusIcon className="size-4" />
          Add Category
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Search categories..."
      />
    </div>
  );
};

export default page;
