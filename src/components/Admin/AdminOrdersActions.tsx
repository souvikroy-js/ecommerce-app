"use client";

import { EyeIcon } from "lucide-react";

type OrderItem = {
  id: string;
};

type AdminOrdersActionsProps = {
  order: OrderItem;
};

export const AdminOrdersActions = ({ order }: AdminOrdersActionsProps) => {
  return (
    <div className="flex gap-1">
      <a
        href={`/admin/orders/${order.id}`}
        className="hover:bg-accent inline-flex size-7 items-center justify-center rounded-md"
        title="View">
        <EyeIcon className="size-4" />
      </a>
    </div>
  );
};
