import Link from "next/link";
import AuthStatus from "../AuthStatus";
import ThemeToggleButton from "../ThemeToggleButton";
import CartBadge from "../Cart/CartBadge";

const Header = () => {
  return (
    <header
      className="bg-background/80 sticky top-0 z-50 border-b shadow-sm backdrop-blur-md"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-2xl font-semibold no-underline">
          E-commerce App
        </Link>

        <nav
          aria-label="user-navigation"
          className="flex items-center gap-4">
          <CartBadge />
          <AuthStatus />
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
