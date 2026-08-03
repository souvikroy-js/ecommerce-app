import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer page | E-commerce App",
  description: "Customer page of E-commerce App",
};

const CustomerPage = () => {
  return (
    <>
      <section className="grid h-dvh place-items-center">
        Welcome to Customer page
      </section>
    </>
  );
};

export default CustomerPage;
