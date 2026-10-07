export type CartItem = {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string | null;
  stock: number;
  quantity: number;
};

export type Cart = {
  id: string;
  items: CartItem[];
};

import addToCart from "@/hooks/addToCart";
import removeCartItem from "@/hooks/removeCartItem";
import updateCartItemQuantity from "@/hooks/updateCartItemQuantity";
import { atom } from "jotai";
import { toast } from "react-toastify";

export const cartAtom = atom<Cart | null>(null);

export const cartCountAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
});

export const setCartAtom = atom(null, (_get, set, cart: Cart | null) => {
  set(cartAtom, cart);
});

export const updateQuantityAtom = atom(
  null,
  async (
    _get,
    set,
    { itemId, quantity }: { itemId: string; quantity: number },
  ) => {
    const res = await updateCartItemQuantity(itemId, quantity);

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    set(cartAtom, (prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item,
        ),
      };
    });

    toast.success(res.error);
  },
);

export const removeFromCartAtom = atom(
  null,
  async (_get, set, itemId: string) => {
    const res = await removeCartItem(itemId);

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    set(cartAtom, (prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId),
      };
    });
  },
);

export const addToCartAtom = atom(
  null,
  async (
    _get,
    set,
    { productId, quantity = 1 }: { productId: string; quantity?: number },
  ) => {
    const res = await addToCart(productId, quantity);

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    set(cartAtom, res.cart);
    toast.success("Added to cart");
  },
);
