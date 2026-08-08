import AdminHeader from "@/components/Admin/AdminHeader";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/shadcnui/sidebar";
import { PageLayoutProps } from "@/lib/types";

const AdminLayout = ({ children }: PageLayoutProps) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
