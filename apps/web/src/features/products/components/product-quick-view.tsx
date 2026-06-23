"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { productHasVariants } from "@/shared/lib/dress-variants";
import { cn } from "@/shared/lib/utils";
import type { Product } from "@/shared/types";
import { calculateDiscount, formatPrice, getProductImageUrl } from "@/shared/utils/format";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useWishlistStore } from "@/features/wishlist/store/wishlist-store";

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export function ProductQuickView({ product, open, onClose }: ProductQuickViewProps) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) return null;

  const imageUrl = getProductImageUrl(product);
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const hasVariants = productHasVariants(product);
  const inWishlist = isInWishlist(product._id);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "flex max-h-[min(90dvh,800px)] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] flex-col gap-0 overflow-hidden p-0",
          "sm:w-full sm:max-w-3xl",
          "[&_[data-slot=dialog-close]]:rounded-global [&_[data-slot=dialog-close]]:bg-brand-surface/90 [&_[data-slot=dialog-close]]:z-20 [&_[data-slot=dialog-close]]:backdrop-blur-sm"
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto md:grid-cols-2 md:overflow-hidden">
          <div className="bg-brand-secondary-hover relative aspect-[3/4] max-h-[min(42dvh,22rem)] w-full shrink-0 sm:max-h-[min(46dvh,24rem)] md:aspect-auto md:h-full md:max-h-none md:min-h-[20rem]">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 480px"
            />
            {discount > 0 && (
              <Badge className="rounded-global bg-accent text-brand-text absolute top-3 left-3 z-10 border-0 sm:top-4 sm:left-4">
                -{discount}%
              </Badge>
            )}
          </div>

          <div className="flex min-h-0 flex-col p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6 md:overflow-y-auto">
            {product.brand && <p className="label-caps mb-2">{product.brand.name}</p>}
            <h2 className="font-brand text-brand-h3 sm:text-brand-h2 mb-2 pr-8 leading-tight font-medium">
              {product.name}
            </h2>
            <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">
              <span className="text-brand-h3 sm:text-brand-h2 font-semibold">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-brand-text/70 text-sm line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            {product.shortDescription && (
              <p className="text-brand-text/70 mb-4 line-clamp-3 text-sm leading-relaxed sm:line-clamp-4 md:line-clamp-none">
                {product.shortDescription}
              </p>
            )}

            <div className="mt-auto space-y-2.5 pt-3 sm:space-y-3 sm:pt-4">
              {hasVariants ? (
                <Button className="rounded-global h-11 w-full" asChild>
                  <Link href={`/products/${product.slug.current}`} onClick={onClose}>
                    Select Size &amp; Colour
                  </Link>
                </Button>
              ) : (
                <Button
                  className="rounded-global h-11 w-full"
                  onClick={() => {
                    addItem({
                      productId: product._id,
                      name: product.name,
                      price: product.price,
                      imageUrl,
                      slug: product.slug.current,
                      stock: product.stock,
                    });
                    setCartOpen(true);
                    onClose();
                    toast.success("Added to your bag");
                  }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Add to Bag
                </Button>
              )}
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-global h-10 min-w-0 flex-1" asChild>
                  <Link href={`/products/${product.slug.current}`} onClick={onClose}>
                    View Details
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-global h-10 w-10 shrink-0"
                  onClick={() => toggleItem(product._id)}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={cn("h-4 w-4", inWishlist && "fill-accent text-accent")} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
