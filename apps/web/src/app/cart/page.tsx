"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/utils/format";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
        <h1 className="font-heading text-2xl text-primary mb-2">Your bag is empty</h1>
        <p className="text-muted-foreground mb-6">Discover our latest dress collections</p>
        <Button className="rounded-full" asChild><Link href="/products">Browse Dresses</Link></Button>
      </Container>
    );
  }

  return (
    <Container className="py-6 sm:py-8">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 min-w-0">
        <Button variant="ghost" size="icon" className="shrink-0 rounded-full" asChild><Link href="/products"><ArrowLeft className="h-4 w-4" /></Link></Button>
        <h1 className="font-heading text-xl sm:text-2xl font-semibold truncate min-w-0 text-primary">Your Bag ({getItemCount()})</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-3 sm:space-y-4 order-last lg:order-first">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.cartLineId}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 sm:gap-4 p-3 sm:p-4 border border-border/60 rounded-xl bg-card"
              >
                <div className="relative h-24 w-20 sm:h-28 sm:w-24 rounded-sm overflow-hidden bg-muted shrink-0">
                  <Image src={item.imageUrl || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.slug}`} className="font-medium text-sm sm:text-base hover:text-primary line-clamp-2">{item.name}</Link>
                  {(item.color || item.size) && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {[item.color, item.size ? `Size ${item.size}` : undefined].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="text-base sm:text-lg font-semibold mt-1 text-primary">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.cartLineId, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.cartLineId, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-auto text-destructive" onClick={() => removeItem(item.cartLineId)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-right font-semibold hidden sm:block text-primary">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="border border-border/60 rounded-xl p-4 sm:p-6 h-fit lg:sticky lg:top-24 order-first lg:order-last bg-card">
          <h2 className="font-heading text-lg text-primary mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(getTotal())}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="text-muted-foreground">Confirmed on WhatsApp</span></div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-lg font-bold mb-6 text-primary">
            <span>Total</span><span>{formatPrice(getTotal())}</span>
          </div>
          <Button className="w-full mb-3 rounded-full" size="lg" asChild>
            <Link href="/checkout">Checkout via WhatsApp</Link>
          </Button>
          <Button variant="outline" className="w-full rounded-full border-primary/30" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
