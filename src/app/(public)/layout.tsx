import Header from "@/components/Header/Header";
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
