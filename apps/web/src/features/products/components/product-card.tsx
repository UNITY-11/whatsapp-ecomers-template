"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { productHasVariants } from "@/shared/lib/dress-variants";
import { cn } from "@/shared/lib/utils";
import type { Product } from "@/shared/types";
import { calculateDiscount, formatPrice, getProductImageUrl } from "@/shared/utils/format";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useWishlistStore } from "@/features/wishlist/store/wishlist-store";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
  layout?: "grid" | "list";
}

export function ProductCard({
  product,
  onQuickView,
  className,
  layout = "grid",
}: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const [mounted, setMounted] = useState(false);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = mounted && isInWishlist(product._id);
  const hasVariants = productHasVariants(product);

  useEffect(() => {
    setMounted(true);
  }, []);
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const imageUrl = getProductImageUrl(product);
  const productHref = `/products/${product.slug.current}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasVariants) return;
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl,
      slug: product.slug.current,
      stock: product.stock,
    });
    setCartOpen(true);
    toast.success("Added to your bag");
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product._id);
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const goToProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(productHref);
  };

  if (layout === "list") {
    return (
      <article
        className={cn("group bg-brand-surface flex gap-4 rounded-none p-3 sm:p-4", className)}
      >
        <Link
          href={productHref}
          className="bg-brand-secondary-hover relative h-32 w-24 shrink-0 overflow-hidden rounded-none sm:h-40 sm:w-32"
        >
          <Image src={imageUrl} alt={product.name} fill className="object-cover" sizes="128px" />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col">
          <Link href={productHref} className="min-w-0 flex-1">
            {product.brand && <p className="label-caps truncate">{product.brand.name}</p>}
            <h3 className="sm:text-brand-h3 font-brand mt-1 line-clamp-1 text-base font-bold">
              {product.name}
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-brand-primary font-semibold">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-brand-text/70 text-xs line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </Link>
          <div className="mt-3 flex flex-wrap gap-2">
            {hasVariants ? (
              <Button size="sm" className="rounded-global h-8 text-xs" asChild>
                <Link href={productHref}>Select Options</Link>
              </Button>
            ) : (
              <Button size="sm" className="rounded-global h-8 text-xs" onClick={handleAddToCart}>
                <ShoppingBag className="mr-1 h-3 w-3" /> Add to Bag
              </Button>
            )}
            {onQuickView && (
              <Button
                size="sm"
                variant="outline"
                className="rounded-global h-8 w-8 p-0"
                onClick={handleQuickView}
                aria-label="Quick view"
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="rounded-global h-8 w-8 p-0"
              onClick={handleWishlist}
              aria-label="Wishlist"
            >
              <Heart className={cn("h-3.5 w-3.5", inWishlist && "fill-accent text-accent")} />
            </Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <motion.article
      className={cn("group relative flex flex-col", className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-brand-secondary-hover shadow-brand-card group-hover:shadow-brand-card relative aspect-[3/4] overflow-hidden rounded-none transition-shadow">
        <Link href={productHref} className="absolute inset-0 z-[1]" aria-label={product.name}>
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
          />
        </Link>
        {discount > 0 && (
          <Badge className="rounded-global absolute top-2 left-2 z-[2] border-0 bg-red-600 px-2 text-[9px] tracking-wider text-white uppercase shadow-sm sm:text-[10px]">
            -{discount}%
          </Badge>
        )}
        {product.isNewArrival && !discount && (
          <Badge className="rounded-global bg-brand-primary absolute top-2 left-2 z-[2] border-0 px-2 text-[9px] tracking-wider text-white uppercase shadow-sm sm:text-[10px]">
            New
          </Badge>
        )}
      </div>

      <Link href={productHref} className="mt-2 block space-y-1 px-0.5 sm:mt-3">
        {product.brand && <p className="label-caps truncate">{product.brand.name}</p>}
        <h3 className="text-foreground/90 font-brand line-clamp-1 text-sm leading-snug font-bold sm:text-base">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-brand-primary text-sm font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-brand-text/70 text-xs line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </Link>

      {/* Desktop wishlist */}
      <button
        type="button"
        onClick={handleWishlist}
        className={cn(
          "drop-shadow-brand-card absolute top-2 right-2 z-10 p-1.5",
          "hidden opacity-0 transition-all group-hover:opacity-100 hover:scale-110 sm:flex",
          inWishlist ? "text-accent opacity-100" : "text-white"
        )}
        aria-label="Add to wishlist"
      >
        <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
      </button>
    </motion.article>
  );
}
