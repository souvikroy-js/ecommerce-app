"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/dbClient/prisma";
import { headers } from "next/headers";

const updateCartItemQuantity = async (itemId: string, quantity: number) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return {
        success: false,
        error: "Unauthorized",
      };

    if (!Number.isInteger(quantity) || quantity < 1) {
      return {
        success: false,
        error: "Invalid quantity",
      };
    }

    // Ownership check: Verify the item belongs to the user's cart
    const item = await prisma.cartItem.findFirst({
      where: { id: itemId, cart: { userId: session.user.id } },
      select: { id: true, product: { select: { stock: true } } },
    });

    if (!item)
      return {
        success: false,
        error: "Cart item not found",
      };

    if (quantity > item.product.stock) {
      return {
        success: false,
        error: `Only ${item.product.stock} in stock`,
      };
    }

    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity },
    });

    return {
      success: true,
      error: "uantity Updated",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to update quantity",
    };
  }
};

export default updateCartItemQuantity;
