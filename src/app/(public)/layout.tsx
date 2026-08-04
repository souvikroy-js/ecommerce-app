import Header from "@/components/Layout/Header";
import { PageLayoutProps } from "@/lib/types";

const PublicLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default PublicLayout;
