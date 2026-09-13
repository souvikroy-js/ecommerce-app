import AdminCategoryForm from "@/components/Admin/AdminCategoryForm";
import { requireAdmin } from "@/lib/admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Category",
};

const AdminNewCategoryPage = async () => {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">New Category</h1>
        <p className="text-muted-foreground">Create a new product category</p>
      </div>
      <AdminCategoryForm mode="create" />
    </div>
  );
};

export default AdminNewCategoryPage;
