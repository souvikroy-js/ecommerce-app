"use client";

import { Badge } from "@/components/shadcnui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/shadcnui/breadcrumb";
import { Button } from "@/components/shadcnui/button";
import { addToCartAtom } from "@/lib/atoms";
import { formatPrice } from "@/lib/format";
import { getImageSrc } from "@/lib/getImageSrc";
import { parseImages } from "@/lib/images";
import { useSetAtom } from "jotai";
import {
  CalendarIcon,
  ImageOffIcon,
  Loader2Icon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

// type ProductDetailProps = {
//   product: {
//     id: string;
//     name: string;
//     description: string | null;
//     price: number;
//     images: string;
//     categoryName: string | null;
//     stock: number;
//     createdAt: string;
//   };
// };
type ProductDetailProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    images: string;
    stock: number;
    createdAt: Date;
    category: {
      name: string;
    } | null;
  };
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const addToCart = useSetAtom(addToCartAtom);
  const router = useRouter();
  const images = parseImages(product.images);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const isOutOfStock = product.stock === 0;
  const mainImage = getImageSrc(images[selectedImage]);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart({ productId: product.id, quantity });
      setQuantity(1);
    } catch {
      toast.error("Failed to add to cart");
    }
    setAdding(false);
  };

  const handleBuyNow = async () => {
    setAdding(true);
    try {
      await addToCart({ productId: product.id, quantity });
      //   router.push("/checkout");
    } catch {
      toast.error("Failed to add to cart");
      setAdding(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: images.length > 0 ? images[0] : undefined,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "INR",
              availability:
                isOutOfStock ?
                  "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
            },
          }),
        }}
      />

      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Products</BreadcrumbLink>
          </BreadcrumbItem>
          {product.category?.name && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/products?category=${product.category.name}`}>
                  {product.category.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="text-foreground max-w-40 truncate font-normal">
              {product.name}
            </span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="bg-muted flex aspect-square items-center justify-center overflow-hidden rounded-lg">
            {mainImage ?
              <Image
                src={mainImage}
                alt={product.name}
                width={600}
                height={600}
                className="size-full object-cover"
                priority
              />
            : <div
                className="flex flex-col items-center justify-center gap-2"
                aria-label="No image available">
                <ImageOffIcon className="text-muted-foreground/20 size-14" />
                <span className="text-muted-foreground/30 text-sm">
                  No image available
                </span>
              </div>
            }
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`size-20 overflow-hidden rounded-md border transition-opacity hover:opacity-80 ${
                    i === selectedImage ? "ring-primary ring-2" : ""
                  }`}>
                  <Image
                    src={url}
                    alt=""
                    width={80}
                    height={80}
                    className="size-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            {product.category?.name && (
              <Badge
                variant="secondary"
                className="text-[10px] tracking-wide uppercase">
                {product.category.name}
              </Badge>
            )}
            <h1 className="mt-2 text-3xl leading-tight font-bold">
              {product.name}
            </h1>
            <p className="text-primary mt-3 text-4xl font-bold">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isOutOfStock ?
              <span className="bg-destructive size-2 rounded-full" />
            : product.stock <= 5 ?
              <span className="size-2 rounded-full bg-amber-500" />
            : <span className="size-2 rounded-full bg-green-500" />}
            <span
              className={`text-sm font-medium ${
                isOutOfStock ? "text-destructive"
                : product.stock <= 5 ? "text-amber-500"
                : "text-green-600 dark:text-green-400"
              }`}>
              {isOutOfStock ?
                "Out of stock"
              : product.stock <= 5 ?
                `Low stock — only ${product.stock} left`
              : `${product.stock} in stock`}
            </span>
          </div>

          {!isOutOfStock && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}>
                    <MinusIcon className="size-4" />
                  </Button>
                  <span className="flex size-9 w-10 items-center justify-center text-sm font-medium tabular-nums">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    disabled={quantity >= product.stock}>
                    <PlusIcon className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  onClick={handleAddToCart}
                  disabled={adding}
                  size="lg"
                  className="flex-1">
                  {adding ?
                    <Loader2Icon className="size-5 animate-spin" />
                  : <ShoppingCartIcon className="size-5" />}
                  Add to Cart — {formatPrice(product.price * quantity)}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={adding}
                  variant="outline"
                  size="lg"
                  className="flex-1">
                  {adding ?
                    <Loader2Icon className="size-5 animate-spin" />
                  : <ZapIcon className="size-5" />}
                  Buy Now
                </Button>
              </div>
            </div>
          )}

          {product.description && (
            <div className="pt-4">
              <h2 className="mb-3 text-lg font-semibold">Description</h2>
              <div className="prose prose-sm dark:prose-invert text-muted-foreground max-w-none leading-relaxed whitespace-pre-wrap">
                {product.description}
              </div>
            </div>
          )}

          <div className="text-muted-foreground flex items-center gap-1.5 pt-4 text-xs">
            <CalendarIcon className="size-3.5" />
            Listed on{" "}
            {new Date(product.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
