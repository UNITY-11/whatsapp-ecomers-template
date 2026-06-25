"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  Ruler,
  Share2,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Container } from "@/shared/components/shared/container";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { Textarea } from "@/shared/components/ui/textarea";
import { getProductSizes, getVariantStock, productHasVariants } from "@/shared/lib/dress-variants";
import { cn } from "@/shared/lib/utils";
import type { Product, Review } from "@/shared/types";
import { calculateDiscount, formatPrice, getProductImageUrl } from "@/shared/utils/format";
import { createSingleOrderAction } from "@/features/cart/actions/order-actions";
import { useCartStore } from "@/features/cart/store/cart-store";
import { ProductCard } from "@/features/products/components/product-card";
import { VariantSelector } from "@/features/products/components/variant-selector";
import { useWishlistStore } from "@/features/wishlist/store/wishlist-store";

interface ProductDetailProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

export function ProductDetail({ product, reviews, relatedProducts }: ProductDetailProps) {
  const sizes = getProductSizes(product);
  const defaultColor = product.colors?.[0]?.name ?? "";
  const defaultSize =
    sizes.find((s) => defaultColor && getVariantStock(product, s, defaultColor) > 0) ??
    sizes[0] ??
    "M";

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const hasVariants = productHasVariants(product);
  const variantStock = useMemo(
    () => (hasVariants ? getVariantStock(product, selectedSize, selectedColor) : product.stock),
    [hasVariants, product, selectedSize, selectedColor]
  );

  useEffect(() => {
    if (variantStock > 0 && quantity > variantStock) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuantity(variantStock);
    }
  }, [variantStock, quantity]);

  const colorImage = product.colors?.find((c) => c.name === selectedColor)?.imageUrl;
  const imageUrl = colorImage || getProductImageUrl(product);
  const images = product.images?.length ? product.images.map(() => imageUrl) : [imageUrl];
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const inWishlist = isInWishlist(product._id);
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : product.averageRating;

  const variantLabel = hasVariants ? `${selectedColor} · Size ${selectedSize}` : undefined;

  const handleAddToCart = () => {
    if (hasVariants && (!selectedSize || !selectedColor)) {
      toast.error("Please select size and colour");
      return;
    }
    if (variantStock <= 0) {
      toast.error("This combination is out of stock");
      return;
    }
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl,
      slug: product.slug.current,
      stock: variantStock,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
    setCartOpen(true);
    toast.success("Added to your bag");
  };

  const handleWhatsAppOrder = async () => {
    if (hasVariants && (!selectedSize || !selectedColor)) {
      toast.error("Please select size and colour");
      return;
    }
    if (!customer.name || !customer.phone || !customer.address) {
      toast.error("Please fill in all customer details");
      return;
    }
    setOrdering(true);
    const result = await createSingleOrderAction({
      productName: product.name,
      price: product.price,
      quantity,
      slug: product.slug.current,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      customer,
    });
    setOrdering(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    if (result.whatsappUrl) {
      window.open(result.whatsappUrl, "_blank");
      setWhatsappOpen(false);
      toast.success(`Order ${result.orderNumber} created!`);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <Container className="py-6 sm:py-8">
      <nav className="text-brand-text/70 mb-4 flex flex-wrap items-center gap-x-1 gap-y-1 text-xs sm:mb-6 sm:text-sm">
        <Link href="/" className="hover:text-brand-primary shrink-0">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-primary shrink-0">
          Dresses
        </Link>
        <span>/</span>
        <span className="text-foreground min-w-0 truncate">{product.name}</span>
      </nav>

      <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="space-y-4 lg:col-span-3">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="bg-brand-secondary-hover group relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-none"
                onClick={() => {
                  setSelectedImage(i);
                  setZoomOpen(true);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSelectedImage(i);
                    setZoomOpen(true);
                  }
                }}
              >
                <Image
                  src={img}
                  alt={`${product.name} - view ${i + 1}`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  priority={i < 2}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                {i === 0 && discount > 0 && (
                  <Badge className="rounded-global bg-accent text-brand-text absolute top-2 left-2 border-0 text-[10px] tracking-wider uppercase">
                    -{discount}%
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:col-span-2">
          {product.category && (
            <p className="label-caps text-accent mb-2">{product.category.name}</p>
          )}
          <h1 className="font-brand text-brand-h2 sm:text-brand-h2 md:text-brand-h1 text-brand-primary mb-2 leading-tight font-medium">
            {product.name}
          </h1>
          {avgRating && (
            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(avgRating) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-brand-text/70 text-sm">
                ({reviews.length || product.reviewCount} reviews)
              </span>
            </div>
          )}
          <div className="mb-5 flex flex-wrap items-center gap-2 sm:mb-6 sm:gap-3">
            <span className="text-brand-h2 sm:text-brand-h2 text-brand-primary font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-brand-h3 text-brand-text/70 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <div className="mb-6 flex items-center gap-2">
            {variantStock > 0 ? (
              <Badge
                variant="outline"
                className="text-brand-primary border-brand-primary/30 rounded-global"
              >
                <Check className="mr-1 h-3 w-3" /> In Stock
                {variantLabel ? ` — ${variantLabel}` : ` (${variantStock})`}
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-destructive border-destructive/30 rounded-global"
              >
                <X className="mr-1 h-3 w-3" /> Out of Stock
              </Badge>
            )}
          </div>

          {product.shortDescription && (
            <p className="text-brand-text/70 mb-6 leading-relaxed">{product.shortDescription}</p>
          )}

          {hasVariants && (
            <VariantSelector
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onSizeChange={setSelectedSize}
              onColorChange={setSelectedColor}
            />
          )}

          <div className="mb-6 flex items-center gap-3">
            <span className="label-caps text-sm font-medium">Qty</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={() => setQuantity(Math.min(variantStock, quantity + 1))}
              disabled={variantStock === 0}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="bg-brand-surface/95 border-brand-border-global/60 sticky bottom-0 z-20 -mx-4 mb-4 flex flex-col gap-3 border-t px-4 py-3 backdrop-blur-sm sm:static sm:mx-0 sm:flex-row sm:border-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
            <Button
              size="lg"
              className="h-11 w-full rounded-none text-white sm:flex-1"
              onClick={handleAddToCart}
              disabled={variantStock === 0}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to Bag
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 h-11 w-full rounded-none sm:flex-1"
              onClick={() => setWhatsappOpen(true)}
              disabled={variantStock === 0}
            >
              <MessageCircle className="mr-2 h-4 w-4" /> Order via WhatsApp
            </Button>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-none"
              onClick={() => {
                toggleItem(product._id);
                toast.success(inWishlist ? "Removed" : "Saved to wishlist");
              }}
            >
              <Heart className={`mr-1 h-4 w-4 ${inWishlist ? "fill-accent text-accent" : ""}`} />{" "}
              Wishlist
            </Button>
            <Button variant="outline" size="sm" className="rounded-none" onClick={handleShare}>
              <Share2 className="mr-1 h-4 w-4" /> Share
            </Button>
            <Button variant="ghost" size="sm" className="text-brand-text/70 rounded-none">
              <Ruler className="mr-1 h-4 w-4" /> Size Guide
            </Button>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="rounded-global bg-brand-secondary/50 border-brand-border-global/40 mt-4 border p-4">
              <h3 className="label-caps mb-3">Details</h3>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="text-brand-text/70 flex items-center gap-2 text-sm">
                    <Check className="text-accent h-4 w-4 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <Separator className="bg-border/60 my-12" />

      <div className="w-full">
        <h2 className="font-brand text-brand-h3 sm:text-brand-h3 text-brand-primary mb-6">
          Reviews ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p className="text-brand-text/70">
            No reviews yet. Be the first to share your experience.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border-brand-border-global/50 rounded-global bg-brand-secondary/20 border p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <Badge variant="outline" className="rounded-global h-5 px-2 py-0 text-[10px]">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="mb-2">
                  <span className="text-foreground text-sm font-medium">{review.userName}</span>
                </div>
                {review.title && <h4 className="mb-1 text-sm font-semibold">{review.title}</h4>}
                <p className="text-brand-text/70 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <p className="label-caps mb-2 text-center">You may also love</p>
          <h2 className="font-brand text-brand-h2 sm:text-brand-h2 text-brand-primary mb-8 text-center">
            Similar Products
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-brand w-[calc(100vw-2rem)] p-0">
          <div className="relative aspect-[3/4]">
            <Image src={images[selectedImage]} alt={product.name} fill className="object-contain" />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={whatsappOpen} onOpenChange={setWhatsappOpen}>
        <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-md overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-brand">Order via WhatsApp</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="bg-brand-secondary/60 rounded-global border-brand-border-global/40 border p-4 text-sm">
              <p className="text-brand-primary font-medium">{product.name}</p>
              {variantLabel && <p className="text-brand-text/70 mt-1">{variantLabel}</p>}
              <p className="mt-2">
                {formatPrice(product.price)} × {quantity} = {formatPrice(product.price * quantity)}
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <Label>Name</Label>
                <Input
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="rounded-global"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="rounded-global"
                />
              </div>
              <div>
                <Label>Delivery Address</Label>
                <Textarea
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="rounded-global"
                />
              </div>
            </div>
            <Button
              className="bg-brand-primary hover:bg-brand-primary/90 w-full rounded-none"
              onClick={handleWhatsAppOrder}
              disabled={ordering}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {ordering ? "Processing..." : "Continue to WhatsApp"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
