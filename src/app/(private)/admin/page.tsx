import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin page | E-commerce App",
  description: "Admin page of E-commerce App",
};

const AdminPage = () => {
  return (
    <>
      <section className="grid h-dvh place-items-center">
        Welcome to Admin page
      </section>
    </>
  );
};

export default AdminPage;
