"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { PRODUCT_IMAGE_FALLBACK } from "@/lib/images";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/utils/format";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { items, isOpen, setCartOpen, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full max-w-[min(100vw,24rem)] flex-col p-4 sm:p-6 bg-background">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-heading text-primary">
            <ShoppingBag className="h-5 w-5" />
            Your Bag ({getItemCount()})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-48 text-muted-foreground"
              >
                <ShoppingBag className="h-12 w-12 mb-4 opacity-30" />
                <p>Your bag is empty</p>
                <Button variant="link" onClick={() => setCartOpen(false)} asChild>
                  <Link href="/products">Browse Dresses</Link>
                </Button>
              </motion.div>
            ) : (
              items.map((item) => (
                <motion.div
                  key={item.cartLineId}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 py-4 border-b border-border/40 last:border-0"
                >
                  <div className="relative h-24 w-20 rounded-sm overflow-hidden bg-muted shrink-0">
                    <Image src={item.imageUrl || PRODUCT_IMAGE_FALLBACK} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`} className="font-medium text-sm hover:text-primary line-clamp-2" onClick={() => setCartOpen(false)}>
                      {item.name}
                    </Link>
                    {(item.color || item.size) && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {[item.color, item.size ? `Size ${item.size}` : undefined].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <p className="text-sm font-semibold mt-1 text-primary">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.cartLineId, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.cartLineId, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto text-destructive" onClick={() => removeItem(item.cartLineId)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-3 sm:flex-col border-t border-border/60 pt-4">
            <div className="flex justify-between w-full text-lg font-semibold text-primary">
              <span>Subtotal</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <Button className="w-full rounded-full" asChild onClick={() => setCartOpen(false)}>
              <Link href="/cart">View Bag</Link>
            </Button>
            <Button variant="outline" className="w-full rounded-full border-primary text-primary" asChild onClick={() => setCartOpen(false)}>
              <Link href="/checkout">Checkout via WhatsApp</Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
