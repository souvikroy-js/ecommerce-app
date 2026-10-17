// import { CartContent } from "@/components/Cart/CartContent";
// import { auth } from "@/lib/auth/auth";
// import prisma from "@/lib/dbClient/prisma";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";

// const CartPage = async () => {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session) redirect("/sign-in");

//   const cart = await prisma.cart.findUnique({
//     where: { userId: session.user.id },
//     include: {
//       items: {
//         include: {
//           product: {
//             select: {
//               id: true,
//               name: true,
//               price: true,
//               image: true,
//               slug: true,
//             },
//           },
//         },
//         orderBy: { createdAt: "asc" },
//       },
//     },
//   });
//   const items = cart?.items ?? [];

//   return (
//     <div className="mx-auto max-w-7xl px-6 py-10">
//       <CartContent initialItems={items} />
//     </div>
//   );
// };

// export default CartPage;

import { CartContent } from "@/components/Cart/CartContent";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/dbClient/prisma";
import { PublicCartItem } from "@/lib/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const parseImages = (value: string): string[] => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const CartPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
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
        orderBy: { createdAt: "asc" },
      },
    },
  });

  const items: PublicCartItem[] = (cart?.items ?? []).map((item) => ({
    id: item.id,
    quantity: item.quantity,
    productId: item.product.id,
    productName: item.product.name,
    productPrice: item.product.price,
    productImage: parseImages(item.product.images)[0] ?? null,
    stock: item.product.stock,
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <CartContent initialItems={items} />
    </div>
  );
};

export default CartPage;
