"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { OrderStatusBadge } from "@/components/Admin/OrderStatusBadge";
import { formatPrice } from "@/lib/format";
import { AdminOrdersActions } from "@/components/Admin/AdminOrdersActions";
import { DataTableColumnHeader } from "@/components/shadcnui/data-table-column-header";

export type OrderItem = {
  id: string;
  userName: string;
  userEmail: string;
  total: number;
  status: string;
  itemCount: number;
  createdAt: string;
};

export const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <a
        href={`/admin/orders/${row.original.id}`}
        className="font-mono text-xs hover:underline">
        {row.original.id.slice(0, 8).toUpperCase()}…
      </a>
    ),
  },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Customer"
      />
    ),
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.userName}</div>
        <div className="text-muted-foreground text-xs">
          {row.original.userEmail}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total"
      />
    ),
    cell: ({ row }) => <>{formatPrice(row.original.total)}</>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "itemCount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Items"
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
      />
    ),
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <AdminOrdersActions order={row.original} />,
  },
];
