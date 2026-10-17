import AdminCategoryForm from "@/components/Admin/AdminCategoryForm";
import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Category",
};

type Props = {
  params: Promise<{ id: string }>;
};

const AdminEditCategoryPage = async ({ params }: Props) => {
  const { id } = await params;
  await requireAdmin();

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Edit Category</h1>
        <p className="text-muted-foreground">{category.name}</p>
      </div>
      <AdminCategoryForm
        mode="edit"
        categoryId={id}
        initialValues={{ name: category.name, slug: category.slug }}
      />
    </div>
  );
};

export default AdminEditCategoryPage;
