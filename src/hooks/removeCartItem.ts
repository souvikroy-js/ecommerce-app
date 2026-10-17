"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/dbClient/prisma";
import { headers } from "next/headers";

const removeCartItem = async (itemId: string) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return {
        success: false,
        error: "Unauthorized",
      };

    // Ownership check + delete query
    const { count } = await prisma.cartItem.deleteMany({
      where: { id: itemId, cart: { userId: session.user.id } },
    });

    if (count === 0)
      return {
        success: false,
        error: "Cart item not found",
      };

    return {
      success: true,
      message: "Item removed from cart",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export default removeCartItem;
