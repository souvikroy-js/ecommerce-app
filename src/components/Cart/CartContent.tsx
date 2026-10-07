"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { formatPrice } from "@/lib/format";
import {
  Loader2Icon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PublicCartItem } from "@/lib/types";
import {
  cartAtom,
  removeFromCartAtom,
  setCartAtom,
  updateQuantityAtom,
} from "@/lib/atoms";

export const CartContent = ({
  initialItems,
}: {
  initialItems: PublicCartItem[];
}) => {
  const cart = useAtomValue(cartAtom);
  const setCart = useSetAtom(setCartAtom);
  const updateQuantity = useSetAtom(updateQuantityAtom);
  const removeFromCart = useSetAtom(removeFromCartAtom);
  const [updating, setUpdating] = useState<string | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    if (initialItems.length && !hydrated.current) {
      hydrated.current = true;
      setCart({ id: "", items: initialItems });
    }
  }, [initialItems, setCart]);

  const items = hydrated.current ? (cart?.items ?? []) : initialItems;

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <ShoppingBagIcon className="text-muted-foreground/40 size-16" />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground text-sm">
          Add some products to get started.
        </p>
        <Link
          href="/"
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium">
          Browse Products
        </Link>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0,
  );

  const handleQuantity = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    setUpdating(itemId);
    await updateQuantity({ itemId, quantity: newQty });
    setUpdating(null);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      <div className="divide-y rounded-lg border">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4">
            <div className="bg-muted flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-md">
              {item.productImage ?
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  width={80}
                  height={80}
                  className="size-full object-cover"
                />
              : <span className="text-muted-foreground/30">✕</span>}
            </div>

            <div className="min-w-0 flex-1">
              <span className="font-medium">{item.productName}</span>
              <p className="text-muted-foreground text-sm">
                {formatPrice(item.productPrice)} each
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantity(item.id, item.quantity - 1)}
                disabled={updating === item.id || item.quantity <= 1}
                className="hover:bg-accent flex size-8 items-center justify-center rounded-md border disabled:opacity-40">
                <MinusIcon className="size-4" />
              </button>
              <span className="flex size-10 items-center justify-center text-sm font-medium tabular-nums">
                {updating === item.id ?
                  <Loader2Icon className="size-4 animate-spin" />
                : item.quantity}
              </span>
              <button
                onClick={() => handleQuantity(item.id, item.quantity + 1)}
                disabled={updating === item.id || item.quantity >= item.stock}
                className="hover:bg-accent flex size-8 items-center justify-center rounded-md border disabled:opacity-40">
                <PlusIcon className="size-4" />
              </button>
            </div>

            <p className="w-20 text-right font-medium tabular-nums">
              {formatPrice(item.productPrice * item.quantity)}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive flex size-8 shrink-0 items-center justify-center rounded-md">
              <Trash2Icon className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-2xl font-bold">{formatPrice(total)}</span>
      </div>

      <div className="flex justify-end">
        <Link
          href="/checkout"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 text-sm font-medium">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};
