import { DataTable } from "@/components/shadcnui/data-table";
import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";
import { columns, type OrderItem } from "./columns";

export const metadata: Metadata = {
  title: "Orders",
};

const AdminOrdersPage = async () => {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { items: true } },
    },
  });

  const data: OrderItem[] = orders.map((o) => ({
    id: o.id,
    userName: o.user?.name ?? "Unknown",
    userEmail: o.user?.email ?? "",
    total: Number(o.total),
    status: o.status,
    itemCount: o._count.items,
    createdAt: o.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Orders</h1>
        <p className="text-muted-foreground">{data.length} orders</p>
      </div>
      <DataTable
        columns={columns}
        data={data}
        searchKey="userName"
        searchPlaceholder="Search by customer name..."
      />
    </div>
  );
};

export default AdminOrdersPage;
