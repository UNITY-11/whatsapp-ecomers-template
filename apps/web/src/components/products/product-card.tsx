"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice, calculateDiscount, getProductImageUrl } from "@/utils/format";
import { productHasVariants } from "@/lib/dress-variants";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
  layout?: "grid" | "list";
}

export function ProductCard({ product, onQuickView, className, layout = "grid" }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product._id);
  const hasVariants = productHasVariants(product);
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
      <article className={cn("group flex gap-4 p-3 sm:p-4 rounded-xl border border-border/60 bg-card", className)}>
        <Link href={productHref} className="relative h-32 w-24 sm:h-40 sm:w-32 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image src={imageUrl} alt={product.name} fill className="object-cover" sizes="128px" />
        </Link>
        <div className="flex-1 min-w-0 flex flex-col">
          <Link href={productHref} className="flex-1 min-w-0">
            {product.brand && <p className="label-caps truncate">{product.brand.name}</p>}
            <h3 className="font-medium text-sm sm:text-base line-clamp-2 mt-1">{product.name}</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-semibold text-primary">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>
          </Link>
          <div className="flex flex-wrap gap-2 mt-3">
            {hasVariants ? (
              <Button size="sm" className="rounded-full h-8 text-xs" asChild>
                <Link href={productHref}>Select Options</Link>
              </Button>
            ) : (
              <Button size="sm" className="rounded-full h-8 text-xs" onClick={handleAddToCart}>
                <ShoppingBag className="h-3 w-3 mr-1" /> Add to Bag
              </Button>
            )}
            {onQuickView && (
              <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0" onClick={handleQuickView} aria-label="Quick view">
                <Eye className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0" onClick={handleWishlist} aria-label="Wishlist">
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
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl bg-muted shadow-sm transition-shadow duration-500 group-hover:shadow-md">
        <Link href={productHref} className="absolute inset-0 z-[1]" aria-label={product.name}>
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
          />
        </Link>
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 z-[2] rounded-full bg-accent text-accent-foreground border-0 px-2 text-[9px] sm:text-[10px] tracking-wider uppercase">
            -{discount}%
          </Badge>
        )}
        {product.isNewArrival && !discount && (
          <Badge className="absolute top-2 left-2 z-[2] rounded-full bg-primary text-primary-foreground border-0 px-2 text-[9px] sm:text-[10px] tracking-wider uppercase">
            New
          </Badge>
        )}
        {/* Desktop hover overlay — above image link so buttons don't nest <a> tags */}
        <div className="absolute inset-0 z-[3] hidden sm:flex items-end justify-center p-3 gap-2 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          {hasVariants ? (
            <Button size="sm" className="flex-1 rounded-full h-9 text-xs" onClick={goToProduct}>
              Select Options
            </Button>
          ) : (
            <Button size="sm" className="flex-1 rounded-full h-9 text-xs" onClick={handleAddToCart}>
              <ShoppingBag className="h-3.5 w-3.5 mr-1.5" /> Add to Bag
            </Button>
          )}
          {onQuickView && (
            <Button size="sm" variant="secondary" className="rounded-full h-9 w-9 p-0 bg-white/95" onClick={handleQuickView}>
              <Eye className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile action row — always visible, compact */}
      <div className="flex sm:hidden gap-1.5 mt-2">
        {hasVariants ? (
          <Button size="sm" className="flex-1 rounded-full h-8 text-[11px]" asChild>
            <Link href={productHref}>Options</Link>
          </Button>
        ) : (
          <Button size="sm" className="flex-1 rounded-full h-8 text-[11px]" onClick={handleAddToCart}>
            <ShoppingBag className="h-3 w-3 mr-1" /> Add
          </Button>
        )}
        {onQuickView && (
          <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0 shrink-0" onClick={handleQuickView} aria-label="Quick view">
            <Eye className="h-3.5 w-3.5" />
          </Button>
        )}
        <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0 shrink-0" onClick={handleWishlist} aria-label="Wishlist">
          <Heart className={cn("h-3.5 w-3.5", inWishlist && "fill-accent text-accent")} />
        </Button>
      </div>

      <Link href={productHref} className="mt-2 sm:mt-3 space-y-1 px-0.5 block">
        {product.brand && <p className="label-caps truncate">{product.brand.name}</p>}
        <h3 className="font-medium text-xs sm:text-sm leading-snug line-clamp-2 text-foreground/90">{product.name}</h3>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-semibold text-primary">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1.5 pt-1 items-center">
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={c.name}
                className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border border-border/60 shrink-0"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Desktop wishlist */}
      <button
        type="button"
        onClick={handleWishlist}
        className={cn(
          "absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm",
          "hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity",
          inWishlist && "opacity-100 text-accent"
        )}
        aria-label="Add to wishlist"
      >
        <Heart className={cn("h-3.5 w-3.5", inWishlist && "fill-current")} />
      </button>
    </motion.article>
  );
}
