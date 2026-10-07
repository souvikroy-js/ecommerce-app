"use client";

import { useAtomValue } from "jotai";
import { cartCountAtom } from "@/lib/atoms";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

const CartBadge = () => {
  const cartCount = useAtomValue(cartCountAtom);

  return (
    <Link
      href="/cart"
      className="hover:bg-accent relative flex size-9 items-center justify-center rounded-md transition-colors">
      <ShoppingCartIcon className="size-5" />
      {cartCount > 0 && (
        <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-[10px] font-bold">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartBadge;
