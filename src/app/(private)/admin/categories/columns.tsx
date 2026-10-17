"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/shadcnui/badge";
import { DataTableColumnHeader } from "@/components/shadcnui/data-table-column-header";
import AdminCategoriesActions from "@/components/Admin/AdminCategoriesActions";

export type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
};

export const columns: ColumnDef<CategoryItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <Badge variant="outline">{row.original.slug}</Badge>,
  },
  {
    accessorKey: "productCount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Products"
      />
    ),
    meta: { label: "Products" },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <AdminCategoriesActions category={row.original} />,
  },
];
