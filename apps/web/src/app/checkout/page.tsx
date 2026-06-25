"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { Container } from "@/shared/components/shared/container";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { Textarea } from "@/shared/components/ui/textarea";
import { PRODUCT_IMAGE_FALLBACK } from "@/shared/lib/images";
import { formatPrice } from "@/shared/utils/format";
import { createCartOrderAction } from "@/features/cart/actions/order-actions";
import { useCartStore } from "@/features/cart/store/cart-store";

export default function CheckoutPage() {
  const { items, getTotal, getItemCount, clearCart } = useCartStore();
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [ordering, setOrdering] = useState(false);

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-brand-h2 mb-4 font-bold">No items to checkout</h1>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </Container>
    );
  }

  const handleOrder = async () => {
    if (
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.district ||
      !customer.state ||
      !customer.pincode
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    setOrdering(true);
    const result = await createCartOrderAction(items, customer);
    setOrdering(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    if (result.whatsappUrl) {
      window.open(result.whatsappUrl, "_blank");
      clearCart();
      toast.success(`Order ${result.orderNumber} placed! Redirecting to WhatsApp...`);
    }
  };

  return (
    <Container className="max-w-brand py-6 sm:py-8">
      <div className="mb-6 flex min-w-0 items-center gap-3 sm:mb-8 sm:gap-4">
        <Button variant="ghost" size="icon" className="shrink-0" asChild>
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="font-brand text-brand-h3 sm:text-brand-h2 truncate font-semibold">
          Checkout via WhatsApp
        </h1>
      </div>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        <div className="order-last space-y-6 md:order-first">
          <div className="rounded-global border-brand-border-global/50 border p-5 sm:p-7">
            <h2 className="text-brand-h3 mb-6 font-semibold">Customer Details</h2>
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Name *</Label>
                  <Input
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone *</Label>
                  <Input
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Delivery Address *</Label>
                <Textarea
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Landmark</Label>
                <Input
                  value={customer.landmark}
                  onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })}
                  placeholder="Optional"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label>District *</Label>
                  <Input
                    value={customer.district}
                    onChange={(e) => setCustomer({ ...customer, district: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>State *</Label>
                  <Input
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Pincode *</Label>
                  <Input
                    value={customer.pincode}
                    onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button
              className="text-brand-surface bg-brand-primary hover:bg-brand-primary/90 w-full"
              size="lg"
              onClick={handleOrder}
              disabled={ordering}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {ordering ? "Processing..." : "Place Order via WhatsApp"}
            </Button>
            <p className="text-brand-text/70 mt-3 text-center text-xs">
              Your order will be saved and you&apos;ll be redirected to WhatsApp to confirm.
            </p>
          </div>
        </div>

        <div className="rounded-global order-first h-fit border p-4 sm:p-6 md:sticky md:top-24 md:order-last">
          <h2 className="text-brand-h3 mb-4 font-semibold">
            Order Summary ({getItemCount()} items)
          </h2>
          <div className="max-h-64 space-y-3 overflow-y-auto">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <div className="bg-brand-secondary-hover relative h-12 w-12 shrink-0 overflow-hidden rounded">
                  <Image
                    src={item.imageUrl || PRODUCT_IMAGE_FALLBACK}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="text-brand-text/70 text-xs">
                    Qty: {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <span className="text-sm font-medium">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="text-brand-h3 mb-6 flex justify-between font-bold">
            <span>Grand Total</span>
            <span>{formatPrice(getTotal())}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
