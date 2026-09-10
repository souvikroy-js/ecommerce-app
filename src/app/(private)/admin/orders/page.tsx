import { requireAdmin } from "@/lib/admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};

const AdminOrdersPage = async () => {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Orders</h1>
        <p className="text-muted-foreground">
          {/* {orders.length}  */}
          orders
        </p>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
