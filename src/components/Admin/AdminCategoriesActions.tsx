"use client";

import deleteCategory from "@/hooks/deleteCategory";
import { Loader2Icon, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";

type CategoryItem = {
  id: string;
  name: string;
  productCount: number;
};

type AdminCategoriesActionsProps = {
  category: CategoryItem;
};

const AdminCategoriesActions = ({ category }: AdminCategoriesActionsProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { success, error } = await deleteCategory(category.id);
      if (!success) {
        toast.error(error);
      }

      if (success) {
        toast.success(error);
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-1">
      <a
        href={`/admin/categories/${category.id}/edit`}
        className="hover:bg-accent inline-flex size-7 items-center justify-center rounded-md"
        title="Edit">
        <PencilIcon className="size-4" />
      </a>
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={handleDelete}
        disabled={loading}
        title="Delete"
        className="text-destructive hover:text-destructive">
        {loading ?
          <Loader2Icon className="size-4 animate-spin" />
        : <Trash2Icon className="size-4" />}
      </Button>
    </div>
  );
};

export default AdminCategoriesActions;
