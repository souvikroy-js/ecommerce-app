"use client";

import { Badge } from "@/components/shadcnui/badge";
import { Button } from "@/components/shadcnui/button";
import { addToCartAtom } from "@/lib/atoms";
import { formatPrice } from "@/lib/format";
import { getImageSrc } from "@/lib/getImageSrc";
import { parseImages } from "@/lib/images";
import { useSetAtom } from "jotai";
import {
  ImageOffIcon,
  Loader2Icon,
  ShoppingCartIcon,
  ZapIcon,
} from "lucide-react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type ProductItem = {
  id: string;
  name: string;
  price: number;
  images: string;
  stock: number;
  category: {
    name: string;
  } | null;
};

export const ProductCard = ({ product }: { product: ProductItem }) => {
  const addToCart = useSetAtom(addToCartAtom);
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const images = parseImages(product.images);
  const imageUrl = getImageSrc(images[0]);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart({ productId: product.id });
    } catch {
      toast.error("Failed to add to cart");
    }
    setAdding(false);
  };

  const handleBuyNow = async () => {
    setAdding(true);
    try {
      await addToCart({ productId: product.id });
      // router.push("/checkout");
    } catch {
      toast.error("Failed to add to cart");
      setAdding(false);
    }
  };

  return (
    <div className="group bg-card overflow-hidden rounded-lg border transition-all hover:shadow-md">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}` as Route}>
          <div className="bg-muted flex aspect-square items-center justify-center">
            {imageUrl ?
              <Image
                // src={`/upload/products/${images}`}
                src={imageUrl}
                alt={product.name}
                width={400}
                height={400}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            : <div
                className="flex size-full flex-col items-center justify-center gap-1.5"
                aria-label="No image available">
                <ImageOffIcon className="text-muted-foreground/20 size-10" />
                <span className="text-muted-foreground/30 text-xs">
                  No image
                </span>
              </div>
            }
          </div>
        </Link>
        {isOutOfStock && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="bg-background text-destructive rounded-md px-3 py-1 text-xs font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <Link href={`/products/${product.id}` as Route}>
        <div className="space-y-1.5 p-4">
          {product.category?.name && (
            <Badge
              variant="secondary"
              className="w-fit text-[10px] leading-none tracking-wide uppercase">
              {product.category?.name}
            </Badge>
          )}
          <h3 className="line-clamp-2 text-sm leading-snug font-semibold">
            {product.name}
          </h3>
          <p className="text-primary text-xl font-bold">
            {formatPrice(product.price)}
          </p>
          <span className="flex items-center gap-1.5">
            {isOutOfStock ?
              <span className="bg-destructive size-1.5 rounded-full" />
            : product.stock <= 5 ?
              <span className="size-1.5 rounded-full bg-amber-500" />
            : <span className="size-1.5 rounded-full bg-green-500" />}
            {isOutOfStock ?
              <span className="text-destructive text-xs font-medium">
                Out of stock
              </span>
            : product.stock <= 5 ?
              <span className="text-xs font-medium text-amber-500">
                Only {product.stock} left
              </span>
            : <span className="text-muted-foreground text-xs">In stock</span>}
          </span>
        </div>
      </Link>
      {!isOutOfStock && (
        <div className="flex items-center gap-2 border-t p-3 pt-3">
          <Button
            onClick={handleAddToCart}
            disabled={adding}
            variant="outline"
            size="sm"
            className="flex-1">
            {adding ?
              <Loader2Icon className="size-4 animate-spin" />
            : <ShoppingCartIcon className="size-4" />}
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            disabled={adding}
            size="sm"
            className="flex-1">
            {adding ?
              <Loader2Icon className="size-4 animate-spin" />
            : <ZapIcon className="size-4" />}
            Buy Now
          </Button>
        </div>
      )}
    </div>
  );
};

export type { ProductItem };
