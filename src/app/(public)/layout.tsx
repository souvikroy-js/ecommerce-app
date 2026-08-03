import { PageLayoutProps } from "@/lib/types";

const PublicLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default PublicLayout;
