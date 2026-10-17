import AdminProductForm from "@/components/Admin/AdminProductForm";
import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Product",
};

const AdminNewProductPage = async () => {
  await requireAdmin();
  const categories = await prisma.category.findMany();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">New Product</h1>
        <p className="text-muted-foreground">Create a new product</p>
      </div>
      <AdminProductForm
        mode="create"
        categories={categories}
      />
    </div>
  );
};

export default AdminNewProductPage;
