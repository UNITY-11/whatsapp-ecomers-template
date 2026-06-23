"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Container } from "@/shared/components/shared/container";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { formatPrice } from "@/shared/utils/format";
import { useCartStore } from "@/features/cart/store/cart-store";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <ShoppingBag className="text-brand-text/70/30 mx-auto mb-4 h-16 w-16" />
        <h1 className="font-brand text-brand-h2 text-brand-primary mb-2">Your bag is empty</h1>
        <p className="text-brand-text/70 mb-6">Discover our latest dress collections</p>
        <Button className="rounded-global" asChild>
          <Link href="/products">Browse Dresses</Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-6 sm:py-8">
      <div className="mb-6 flex min-w-0 items-center gap-3 sm:mb-8 sm:gap-4">
        <Button variant="ghost" size="icon" className="rounded-global shrink-0" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="font-brand text-brand-h3 sm:text-brand-h2 text-brand-primary min-w-0 truncate font-semibold">
          Your Bag ({getItemCount()})
        </h1>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <div className="order-last space-y-3 sm:space-y-4 lg:order-first lg:col-span-2">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.cartLineId}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-brand-border-global/60 rounded-global bg-brand-surface flex gap-3 border p-3 sm:gap-4 sm:p-4"
              >
                <div className="rounded-global bg-brand-secondary-hover relative h-24 w-20 shrink-0 overflow-hidden sm:h-28 sm:w-24">
                  <Image
                    src={
                      item.imageUrl ||
                      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200"
                    }
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${item.slug}`}
                    className="hover:text-brand-primary line-clamp-2 text-sm font-medium sm:text-base"
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
                  <p className="sm:text-brand-h3 text-brand-primary mt-1 text-base font-semibold">
                    {formatPrice(item.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 sm:mt-3 sm:gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-global h-8 w-8"
                      onClick={() => updateQuantity(item.cartLineId, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-global h-8 w-8"
                      onClick={() => updateQuantity(item.cartLineId, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive ml-auto"
                      onClick={() => removeItem(item.cartLineId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-brand-primary hidden text-right font-semibold sm:block">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="border-brand-border-global/60 rounded-global bg-brand-surface order-first h-fit border p-4 sm:p-6 lg:sticky lg:top-24 lg:order-last">
          <h2 className="font-brand text-brand-h3 text-brand-primary mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-brand-text/70">Confirmed on WhatsApp</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-brand-h3 text-brand-primary mb-6 flex justify-between font-bold">
            <span>Total</span>
            <span>{formatPrice(getTotal())}</span>
          </div>
          <Button className="rounded-global mb-3 w-full" size="lg" asChild>
            <Link href="/checkout">Checkout via WhatsApp</Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-global border-brand-primary/30 w-full"
            asChild
          >
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
