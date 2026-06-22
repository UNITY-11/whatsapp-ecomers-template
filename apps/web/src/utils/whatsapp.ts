import type { CartItem, OrderItem } from "@/types";
import { APP_URL, WHATSAPP_NUMBER } from "@/lib/constants";

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  email?: string;
}

function variantLine(size?: string, color?: string) {
  const parts = [color, size ? `Size ${size}` : undefined].filter(Boolean);
  return parts.length ? `\n${parts.join(" · ")}` : "";
}

export function generateSingleProductMessage(
  productName: string,
  price: number,
  quantity: number,
  productUrl: string,
  customer: CustomerDetails,
  options?: { size?: string; color?: string }
): string {
  return `Hello Calira Couture,

I would like to order the following dress:

Product:
${productName}${variantLine(options?.size, options?.color)}

Price:
₹${price.toLocaleString("en-IN")}

Quantity:
${quantity}

Product URL:
${productUrl}

Customer Details:

Name:
${customer.name}

Phone:
${customer.phone}

Address:
${customer.address}

Please confirm size availability and delivery.

Thank you.`;
}

export function generateCartMessage(
  items: CartItem[],
  customer: CustomerDetails
): string {
  const itemLines = items
    .map(
      (item, i) =>
        `${i + 1}. ${item.name}${variantLine(item.size, item.color)}\n   Price: ₹${item.price.toLocaleString("en-IN")}\n   Qty: ${item.quantity}\n   Subtotal: ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
    )
    .join("\n\n");

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const grandTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return `Hello Calira Couture,

I would like to order the following dresses:

---

${itemLines}

---

Total Items: ${totalItems}
Grand Total: ₹${grandTotal.toLocaleString("en-IN")}

Customer Details

Name:
${customer.name}

Phone:
${customer.phone}

Address:
${customer.address}

Please confirm availability and delivery details.

Thank you.`;
}

export function getWhatsAppUrl(message: string, phone?: string): string {
  const number = phone || WHATSAPP_NUMBER;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function cartToOrderItems(items: CartItem[]): OrderItem[] {
  return items.map((item) => ({
    productId: item.productId,
    productName: item.name,
    price: item.price,
    quantity: item.quantity,
    subtotal: item.price * item.quantity,
    productUrl: `${APP_URL}/products/${item.slug}`,
    size: item.size,
    color: item.color,
  }));
}

export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `CC-${year}-${random}`;
}
