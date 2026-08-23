import CustomerHeader from "@/components/Customer/CustomerHeader";
import CustomerSidebar from "@/components/Customer/CustomerSidebar";
import { SidebarInset, SidebarProvider } from "@/components/shadcnui/sidebar";
import { auth } from "@/lib/auth/auth";
import { PageLayoutProps } from "@/lib/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const CustomerLayout = async ({ children }: PageLayoutProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "customer") {
    redirect("/admin");
  }

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
