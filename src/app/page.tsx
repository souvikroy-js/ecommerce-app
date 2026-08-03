import Header from "@/components/Layout/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home page | E-commerce App",
  description: "Home page of E-commerce App",
};

const page = () => {
  return (
    <>
      <Header />

      <main className="grid h-dvh place-items-center">
        Welcome to E-commerce App
      </main>
    </>
  );
};

export default page;
