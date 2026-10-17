import AdminHeader from "@/components/Admin/AdminHeader";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/shadcnui/sidebar";
import { auth } from "@/lib/auth/auth";
import { PageLayoutProps } from "@/lib/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: PageLayoutProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "admin") {
    redirect("/customer");
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
