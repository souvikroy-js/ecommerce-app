"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/dbClient/prisma";
import { parseImages } from "@/lib/images";
import { PublicCartItem } from "@/lib/types";
import { headers } from "next/headers";

type PublicCart = { id: string; items: PublicCartItem[] };

export type AddToCartResult =
  { success: true; cart: PublicCart } | { success: false; error: string };

const addToCart = async (productId: string, quantity: number = 1) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return {
        success: false,
        error: "Please sign in to add items to your cart",
        unauthorized: true,
      };
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return { success: false, error: "Invalid quantity" };
    }

    const userId = session.user.id;

    // Fetch the product and its existing quantity in the user's cart in a single query
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        stock: true,
        isActive: true,
        cartItems: { where: { cart: { userId } }, select: { quantity: true } },
      },
    });
    if (!product?.isActive) {
      return { success: false, error: "Product not found" };
    }

    const newQuantity = (product.cartItems[0]?.quantity ?? 0) + quantity;
    if (newQuantity > product.stock) {
      return { success: false, error: `Only ${product.stock} in stock` };
    }

    const { id: cartId } = await prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
      select: { id: true },
    });

    // Write and return the updated cart in a single call
    const cart = await prisma.cart.update({
      where: { id: cartId },
      data: {
        items: {
          upsert: {
            where: { cartId_productId: { cartId, productId } },
            create: { productId, quantity: newQuantity },
            update: { quantity: newQuantity },
          },
        },
      },
      select: {
        id: true,
        items: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true,
                stock: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      cart: {
        id: cart.id,
        items: cart.items.map(({ id, quantity, product: p }) => ({
          id,
          quantity,
          productId: p.id,
          productName: p.name,
          productPrice: p.price,
          productImage: parseImages(p.images)[0] ?? null,
          stock: p.stock,
        })),
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add item to cart" };
  }
};

export default addToCart;
