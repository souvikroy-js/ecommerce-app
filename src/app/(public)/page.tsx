import Header from "@/components/Layout/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home page | E-commerce App",
  description: "Home page of E-commerce App",
};

const HomePage = () => {
  return (
    <>
      <Header />

      <section className="grid h-dvh place-items-center">
        Welcome to Public page
      </section>
    </>
  );
};

export default HomePage;
