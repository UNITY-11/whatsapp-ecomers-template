"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { createCartOrderAction } from "@/actions/order-actions";
import { formatPrice } from "@/utils/format";
import { PRODUCT_IMAGE_FALLBACK } from "@/lib/images";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, getTotal, getItemCount, clearCart } = useCartStore();
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", email: "" });
  const [ordering, setOrdering] = useState(false);

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">No items to checkout</h1>
        <Button asChild><Link href="/products">Continue Shopping</Link></Button>
      </Container>
    );
  }

  const handleOrder = async () => {
    if (!customer.name || !customer.phone || !customer.address) {
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
    <Container className="py-6 sm:py-8 max-w-4xl">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 min-w-0">
        <Button variant="ghost" size="icon" className="shrink-0" asChild><Link href="/cart"><ArrowLeft className="h-4 w-4" /></Link></Button>
        <h1 className="font-heading text-xl sm:text-2xl font-semibold truncate">Checkout via WhatsApp</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-6 order-last md:order-first">
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
            <div className="space-y-4">
              <div><Label>Name *</Label><Input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} /></div>
              <div><Label>Phone *</Label><Input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} /></div>
              <div><Label>Email</Label><Input type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} /></div>
              <div><Label>Delivery Address *</Label><Textarea value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} rows={3} /></div>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-4 sm:p-6 h-fit md:sticky md:top-24 order-first md:order-last">
          <h2 className="text-lg font-semibold mb-4">Order Summary ({getItemCount()} items)</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <div className="relative h-12 w-12 rounded overflow-hidden bg-muted shrink-0">
                  <Image src={item.imageUrl || PRODUCT_IMAGE_FALLBACK} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                </div>
                <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Grand Total</span><span>{formatPrice(getTotal())}</span>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700" size="lg" onClick={handleOrder} disabled={ordering}>
            <MessageCircle className="h-4 w-4 mr-2" />
            {ordering ? "Processing..." : "Place Order via WhatsApp"}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Your order will be saved and you&apos;ll be redirected to WhatsApp to confirm.
          </p>
        </div>
      </div>
    </Container>
  );
}
