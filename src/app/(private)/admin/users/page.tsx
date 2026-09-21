import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";
import { columns } from "./columns"; // must be a "use client" file
import AdminUserForm from "@/components/Admin/AdminUserForm";
import { DataTable } from "@/components/shadcnui/data-table";

export const metadata: Metadata = {
  title: "Users",
};

const AdminUsersPage = async () => {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      banned: true,
      createdAt: true,
    },
  });

  const rows = users.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Users</h1>
          <p className="text-muted-foreground">{users.length} users</p>
        </div>
        <AdminUserForm mode="create" />
      </div>
      <DataTable
        columns={columns}
        data={rows}
        searchKey="email"
        searchPlaceholder="Search by email..."
      />
    </div>
  );
};

export default AdminUsersPage;
