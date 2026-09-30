"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/shadcnui/badge";
import { DataTableColumnHeader } from "@/components/shadcnui/data-table-column-header";
import { formatPrice } from "@/lib/format";
import AdminProductsActions from "@/components/Admin/AdminProductsActions";

export type ProductItem = {
  id: string;
  name: string;
  price: number;
  categoryName: string | null;
  stock: number;
  isActive: boolean;
};

export const columns: ColumnDef<ProductItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => (
      <a
        href={`/admin/products/${row.original.id}`}
        className="font-medium hover:underline">
        {row.original.name}
      </a>
    ),
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category"
      />
    ),
    meta: { label: "Category" },
    cell: ({ row }) =>
      row.original.categoryName ?
        <Badge variant="outline">{row.original.categoryName}</Badge>
      : <span className="text-muted-foreground text-sm">—</span>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
      />
    ),
    cell: ({ row }) => <>{formatPrice(row.original.price)}</>,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Stock"
      />
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
      />
    ),
    meta: { label: "Status" },
    cell: ({ row }) =>
      row.original.isActive ?
        <Badge variant="secondary">Active</Badge>
      : <Badge variant="outline">Inactive</Badge>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <AdminProductsActions
        product={{
          id: row.original.id,
          name: row.original.name,
          isActive: row.original.isActive,
        }}
      />
    ),
  },
];
