"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice, calculateDiscount, getProductImageUrl } from "@/utils/format";
import { productHasVariants } from "@/lib/dress-variants";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { toast } from "sonner";

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
          "[&_[data-slot=dialog-close]]:z-20 [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-background/90 [&_[data-slot=dialog-close]]:backdrop-blur-sm"
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto md:grid-cols-2 md:overflow-hidden">
          <div className="relative aspect-[3/4] w-full max-h-[min(42dvh,22rem)] shrink-0 bg-muted sm:max-h-[min(46dvh,24rem)] md:aspect-auto md:h-full md:max-h-none md:min-h-[20rem]">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 480px"
            />
            {discount > 0 && (
              <Badge className="absolute top-3 left-3 z-10 border-0 rounded-full bg-accent text-accent-foreground sm:top-4 sm:left-4">
                -{discount}%
              </Badge>
            )}
          </div>

          <div className="flex min-h-0 flex-col p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6 md:overflow-y-auto">
            {product.brand && <p className="label-caps mb-2">{product.brand.name}</p>}
            <h2 className="font-heading text-lg font-medium leading-tight sm:text-2xl mb-2 pr-8">
              {product.name}
            </h2>
            <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">
              <span className="text-xl font-semibold sm:text-2xl">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            {product.shortDescription && (
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3 sm:line-clamp-4 md:line-clamp-none">
                {product.shortDescription}
              </p>
            )}

            <div className="mt-auto space-y-2.5 pt-3 sm:space-y-3 sm:pt-4">
              {hasVariants ? (
                <Button className="h-11 w-full rounded-full" asChild>
                  <Link href={`/products/${product.slug.current}`} onClick={onClose}>
                    Select Size &amp; Colour
                  </Link>
                </Button>
              ) : (
                <Button
                  className="h-11 w-full rounded-full"
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
                <Button variant="outline" className="h-10 min-w-0 flex-1 rounded-full" asChild>
                  <Link href={`/products/${product.slug.current}`} onClick={onClose}>
                    View Details
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full"
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
