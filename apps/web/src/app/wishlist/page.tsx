"use client";

import { useEffect, useState} from"react";
import Link from"next/link";
import { Heart} from"lucide-react";
import { Container} from"@/shared/components/shared/container";
import { ProductCard} from"@/features/products/components/product-card";
import { Button} from"@/shared/components/ui/button";
import { useWishlistStore} from"@/features/wishlist/store/wishlist-store";
import { mockProducts} from"@/shared/lib/mock-data";
import type { Product} from"@/shared/types";

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
 <Heart className="h-16 w-16 mx-auto mb-4 text-brand-text/70/30"/>
 <h1 className="text-brand-h2 font-bold mb-2">Your wishlist is empty</h1>
 <p className="text-brand-text/70 mb-6">Save items you love for later</p>
 <Button asChild><Link href="/products">Browse Products</Link></Button>
 </Container>
 );
}

 return (
 <Container className="py-8">
 <h1 className="text-brand-h2 font-bold mb-8">My Wishlist ({products.length})</h1>
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
 {products.map((product) => (
 <ProductCard key={product._id} product={product} />
 ))}
 </div>
 </Container>
 );
}
