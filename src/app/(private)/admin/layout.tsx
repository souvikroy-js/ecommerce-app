import AdminHeader from "@/components/Admin/AdminHeader";
import { PageLayoutProps } from "@/lib/types";

const AdminLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <AdminHeader />
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
