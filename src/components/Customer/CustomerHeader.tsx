import Link from "next/link";
import ThemeToggleButton from "../Layout/ThemeToggleButton";

const CustomerHeader = () => {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b shadow"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href={"/"}>
          <h1
            className="text-2xl font-semibold"
            aria-label="App Name">
            E-commerce App
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href={"/"}>Customer</Link>

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default CustomerHeader;
