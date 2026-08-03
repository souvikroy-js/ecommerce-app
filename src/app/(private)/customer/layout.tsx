import CustomerHeader from "@/components/Customer/CustomerHeader";
import { PageLayoutProps } from "@/lib/types";

const CustomerLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <CustomerHeader />
      <main>{children}</main>
    </>
  );
};

export default CustomerLayout;
