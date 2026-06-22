"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Heart, Share2, MessageCircle, Star, Check, X, Ruler } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ProductCard } from "@/components/products/product-card";
import { VariantSelector } from "@/components/products/variant-selector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { createSingleOrderAction } from "@/actions/order-actions";
import { formatPrice, calculateDiscount, getProductImageUrl } from "@/utils/format";
import { getProductSizes, getVariantStock, productHasVariants } from "@/lib/dress-variants";
import { cn } from "@/lib/utils";
import type { Product, Review } from "@/types";
import { toast } from "sonner";

interface ProductDetailProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

export function ProductDetail({ product, reviews, relatedProducts }: ProductDetailProps) {
  const sizes = getProductSizes(product);
  const defaultColor = product.colors?.[0]?.name ?? "";
  const defaultSize = sizes.find((s) => defaultColor && getVariantStock(product, s, defaultColor) > 0) ?? sizes[0] ?? "M";

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
      <nav className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 flex flex-wrap items-center gap-x-1 gap-y-1">
        <Link href="/" className="hover:text-primary shrink-0">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary shrink-0">Dresses</Link>
        <span>/</span>
        <span className="text-foreground truncate min-w-0">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-start">
        <div className="lg:sticky lg:top-24 space-y-3">
          <div className="relative w-full max-h-[min(70vh,520px)] sm:max-h-[min(75vh,600px)] aspect-[3/4] overflow-hidden rounded-lg bg-muted ring-1 ring-border/40 cursor-zoom-in"
            onClick={() => setZoomOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setZoomOpen(true)}
          >
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 rounded-full bg-accent text-accent-foreground border-0 uppercase tracking-wider text-[10px]">
                -{discount}%
              </Badge>
            )}
          </div>
          {product.colors && product.colors.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    selectedColor === color.name ? "border-primary" : "border-transparent"
                  )}
                  title={color.name}
                >
                  <span
                    className="h-6 w-6 rounded-full border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          )}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-16 w-14 sm:h-20 sm:w-16 rounded-md overflow-hidden border-2 transition-colors shrink-0 ${i === selectedImage ? "border-primary" : "border-border/40"}`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.category && (
            <p className="label-caps mb-2 text-accent">{product.category.name}</p>
          )}
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium mb-2 leading-tight text-primary">{product.name}</h1>
          {avgRating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(avgRating) ? "fill-accent text-accent" : "text-muted"}`} />
              ))}</div>
              <span className="text-sm text-muted-foreground">({reviews.length || product.reviewCount} reviews)</span>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
            <span className="text-2xl sm:text-3xl font-semibold text-primary">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            {variantStock > 0 ? (
              <Badge variant="outline" className="text-primary border-primary/30 rounded-full">
                <Check className="h-3 w-3 mr-1" /> In Stock{variantLabel ? ` — ${variantLabel}` : ` (${variantStock})`}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-destructive border-destructive/30 rounded-full">
                <X className="h-3 w-3 mr-1" /> Out of Stock
              </Badge>
            )}
          </div>

          {product.shortDescription && (
            <p className="text-muted-foreground mb-6 leading-relaxed">{product.shortDescription}</p>
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

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium label-caps">Qty</span>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => setQuantity(Math.min(variantStock, quantity + 1))} disabled={variantStock === 0}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4 sticky bottom-0 sm:static z-20 bg-background/95 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none py-3 sm:py-0 -mx-4 px-4 sm:mx-0 sm:px-0 border-t sm:border-t-0 border-border/60 sm:border-0">
            <Button size="lg" className="w-full sm:flex-1 h-11 rounded-full" onClick={handleAddToCart} disabled={variantStock === 0}>
              <ShoppingBag className="h-4 w-4 mr-2" /> Add to Bag
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:flex-1 border-primary text-primary hover:bg-primary/5 h-11 rounded-full" onClick={() => setWhatsappOpen(true)} disabled={variantStock === 0}>
              <MessageCircle className="h-4 w-4 mr-2" /> Order via WhatsApp
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => { toggleItem(product._id); toast.success(inWishlist ? "Removed" : "Saved to wishlist"); }}>
              <Heart className={`h-4 w-4 mr-1 ${inWishlist ? "fill-accent text-accent" : ""}`} /> Wishlist
            </Button>
            <Button variant="outline" size="sm" className="rounded-full" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground">
              <Ruler className="h-4 w-4 mr-1" /> Size Guide
            </Button>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-secondary/50 border border-border/40">
              <h3 className="label-caps mb-3">Details</h3>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-accent shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <Separator className="my-12 bg-border/60" />

      <Tabs defaultValue="description">
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-1 gap-1 bg-secondary/50">
          <TabsTrigger value="description" className="shrink-0 text-xs sm:text-sm rounded-full">Description</TabsTrigger>
          <TabsTrigger value="specifications" className="shrink-0 text-xs sm:text-sm rounded-full">Fabric & Fit</TabsTrigger>
          <TabsTrigger value="reviews" className="shrink-0 text-xs sm:text-sm rounded-full">Reviews ({reviews.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6 prose max-w-none">
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          {product.specifications && product.specifications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.specifications.map((spec, i) => (
                <div key={i} className="flex justify-between border-b border-border/50 pb-2">
                  <span className="font-medium text-primary">{spec.key}</span>
                  <span className="text-muted-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Contact us for detailed measurements.</p>
          )}
        </TabsContent>
        <TabsContent value="reviews" className="mt-6 space-y-6">
          {reviews.length === 0 ? (
            <p className="text-muted-foreground">No reviews yet. Be the first to share your experience.</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="border-b border-border/50 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`} />
                  ))}</div>
                  <span className="font-medium text-sm">{review.userName}</span>
                  {review.verified && <Badge variant="outline" className="text-xs rounded-full">Verified</Badge>}
                </div>
                {review.title && <h4 className="font-medium mb-1">{review.title}</h4>}
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <p className="label-caps mb-2 text-center">You may also love</p>
          <h2 className="font-heading text-2xl sm:text-3xl text-center mb-8 text-primary">Complete the Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-4xl p-0">
          <div className="relative aspect-[3/4]">
            <Image src={images[selectedImage]} alt={product.name} fill className="object-contain" />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={whatsappOpen} onOpenChange={setWhatsappOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">Order via WhatsApp</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-secondary/60 rounded-xl p-4 text-sm border border-border/40">
              <p className="font-medium text-primary">{product.name}</p>
              {variantLabel && <p className="text-muted-foreground mt-1">{variantLabel}</p>}
              <p className="mt-2">{formatPrice(product.price)} × {quantity} = {formatPrice(product.price * quantity)}</p>
            </div>
            <div className="space-y-3">
              <div><Label>Name</Label><Input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="rounded-xl" /></div>
              <div><Label>Phone</Label><Input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className="rounded-xl" /></div>
              <div><Label>Delivery Address</Label><Textarea value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} className="rounded-xl" /></div>
            </div>
            <Button className="w-full rounded-full bg-primary hover:bg-primary/90" onClick={handleWhatsAppOrder} disabled={ordering}>
              <MessageCircle className="h-4 w-4 mr-2" />
              {ordering ? "Processing..." : "Continue to WhatsApp"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
