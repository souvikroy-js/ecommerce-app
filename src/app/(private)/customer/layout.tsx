import CustomerHeader from "@/components/Customer/CustomerHeader";
import CustomerSidebar from "@/components/Customer/CustomerSidebar";
import { SidebarInset, SidebarProvider } from "@/components/shadcnui/sidebar";
import { PageLayoutProps } from "@/lib/types";

const CustomerLayout = ({ children }: PageLayoutProps) => {
  return (
    <SidebarProvider>
      <CustomerSidebar />
      <SidebarInset>
        <CustomerHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CustomerLayout;
