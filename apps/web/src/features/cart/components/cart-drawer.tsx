"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";
import { PRODUCT_IMAGE_FALLBACK } from "@/shared/lib/images";
import { formatPrice } from "@/shared/utils/format";
import { useCartStore } from "@/features/cart/store/cart-store";

export function CartDrawer() {
  const { items, isOpen, setCartOpen, updateQuantity, removeItem, getTotal, getItemCount } =
    useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent className="bg-brand-surface flex w-full max-w-[min(100vw,24rem)] flex-col p-4 sm:p-6">
        <SheetHeader>
          <SheetTitle className="font-brand text-brand-primary flex items-center gap-2">
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
                className="text-brand-text/70 flex h-48 flex-col items-center justify-center"
              >
                <ShoppingBag className="mb-4 h-12 w-12 opacity-30" />
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
                  className="border-brand-border-global/40 flex gap-4 border-b py-4 last:border-0"
                >
                  <div className="rounded-global bg-brand-secondary-hover relative h-24 w-20 shrink-0 overflow-hidden">
                    <Image
                      src={item.imageUrl || PRODUCT_IMAGE_FALLBACK}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.slug}`}
                      className="hover:text-brand-primary line-clamp-2 text-sm font-medium"
                      onClick={() => setCartOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {(item.color || item.size) && (
                      <p className="text-brand-text/70 mt-0.5 text-xs">
                        {[item.color, item.size ? `Size ${item.size}` : undefined]
                          .filter(Boolean)
                          .join("·")}
                      </p>
                    )}
                    <p className="text-brand-primary mt-1 text-sm font-semibold">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-global h-7 w-7"
                        onClick={() => updateQuantity(item.cartLineId, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-global h-7 w-7"
                        onClick={() => updateQuantity(item.cartLineId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive ml-auto h-7 w-7"
                        onClick={() => removeItem(item.cartLineId)}
                      >
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
          <SheetFooter className="border-brand-border-global/60 flex-col gap-3 border-t pt-4 sm:flex-col">
            <div className="text-brand-h3 text-brand-primary flex w-full justify-between font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <Button className="rounded-global w-full" asChild onClick={() => setCartOpen(false)}>
              <Link href="/cart">View Bag</Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-global border-brand-primary text-brand-primary w-full"
              asChild
              onClick={() => setCartOpen(false)}
            >
              <Link href="/checkout">Checkout via WhatsApp</Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
