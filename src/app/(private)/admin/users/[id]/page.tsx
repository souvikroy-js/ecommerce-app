// import { requireAdmin, adminFetch } from "@/lib/admin";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Badge } from "@/components/shadcnui/badge";
// import { AdminUserDetailResponse } from "@/lib/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/dbClient/prisma";

export const metadata: Metadata = {
  title: "User Detail",
};

const AdminUserDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  await requireAdmin();

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      role: true,
      banned: true,
      banReason: true,
      createdAt: true,
    },
  });

  if (!user) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">{user.name}</h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role</span>
              <Badge variant={user.role === "admin" ? "default" : "outline"}>
                {user.role ?? "customer"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email Verified</span>
              <span>{user.emailVerified ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              {user.banned ?
                <span className="text-destructive">Banned</span>
              : <span className="text-green-600">Active</span>}
            </div>
            {user.banReason && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ban Reason</span>
                <span>{user.banReason}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUserDetailPage;
