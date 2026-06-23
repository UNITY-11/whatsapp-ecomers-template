"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

import { Container } from "@/shared/components/shared/container";
import { Button } from "@/shared/components/ui/button";
import { mockProducts } from "@/shared/lib/mock-data";
import type { Product } from "@/shared/types";
import { ProductCard } from "@/features/products/components/product-card";
import { useWishlistStore } from "@/features/wishlist/store/wishlist-store";

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((s) => s.items);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProducts(mockProducts.filter((p) => wishlistIds.includes(p._id)));
  }, [wishlistIds]);

  if (products.length === 0) {
    return (
      <Container className="py-20 text-center">
        <Heart className="text-brand-text/70/30 mx-auto mb-4 h-16 w-16" />
        <h1 className="text-brand-h2 mb-2 font-bold">Your wishlist is empty</h1>
        <p className="text-brand-text/70 mb-6">Save items you love for later</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <h1 className="text-brand-h2 mb-8 font-bold">My Wishlist ({products.length})</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Container>
  );
}
