"use server";

import { getSession } from "@/shared/lib/auth";
import { APP_URL } from "@/shared/lib/constants";
import { mockOrders } from "@/shared/lib/mock-data";
import { isSanityConfigured, sanityWriteClient } from "@/shared/lib/sanity/client";
import type { CartItem } from "@/shared/types";
import {
  cartToOrderItems,
  generateCartMessage,
  generateOrderNumber,
  generateSingleProductMessage,
  getWhatsAppUrl,
} from "@/shared/utils/whatsapp";
import { orderCustomerSchema } from "@/features/cart/validations/order";

async function resolveCustomerUser(customer: {
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  district: string;
  state: string;
  pincode: string;
}) {
  if (!isSanityConfigured) return undefined;

  try {
    const existingUser = await sanityWriteClient.fetch(`*[_type == "user" && phone == $phone][0]`, {
      phone: customer.phone,
    });

    if (existingUser) {
      return existingUser._id;
    }

    const newUser = await sanityWriteClient.create({
      _type: "user",
      name: customer.name,
      phone: customer.phone,
      role: "customer",
      addresses: [
        {
          _key: Math.random().toString(36).slice(2),
          label: "Home",
          street: customer.address + (customer.landmark ? `, ${customer.landmark}` : ""),
          city: customer.district,
          state: customer.state,
          zip: customer.pincode,
          country: "India",
          isDefault: true,
        },
      ],
    });

    return newUser._id;
  } catch (error) {
    console.error("Error resolving customer user:", error);
    return undefined;
  }
}

interface SingleOrderInput {
  productName: string;
  price: number;
  quantity: number;
  slug: string;
  size?: string;
  color?: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    landmark?: string;
    district: string;
    state: string;
    pincode: string;
  };
}

export async function createSingleOrderAction(input: SingleOrderInput) {
  const customerParsed = orderCustomerSchema.safeParse(input.customer);
  if (!customerParsed.success) {
    return { error: customerParsed.error.issues[0].message };
  }

  const productUrl = `${APP_URL}/products/${input.slug}`;
  const message = generateSingleProductMessage(
    input.productName,
    input.price,
    input.quantity,
    productUrl,
    customerParsed.data,
    { size: input.size, color: input.color }
  );

  const orderNumber = generateOrderNumber();
  const session = await getSession();

  let userId = session?.id;
  if (isSanityConfigured) {
    const resolvedUserId = await resolveCustomerUser(customerParsed.data);
    if (resolvedUserId) {
      userId = resolvedUserId;
    }
  }

  const orderData = {
    _type: "orderRequest" as const,
    orderNumber,
    user: userId ? { _type: "reference" as const, _ref: userId } : undefined,
    customer: customerParsed.data,
    items: [
      {
        productId: input.slug,
        productName: input.productName,
        price: input.price,
        quantity: input.quantity,
        subtotal: input.price * input.quantity,
        productUrl,
        size: input.size,
        color: input.color,
      },
    ],
    totalItems: input.quantity,
    grandTotal: input.price * input.quantity,
    status: "pending",
    type: "single",
    whatsappMessage: message,
  };

  if (isSanityConfigured) {
    await sanityWriteClient.create(orderData);
  } else {
    mockOrders.unshift({
      _id: `order-${Date.now()}`,
      orderNumber,
      customer: customerParsed.data,
      items: orderData.items,
      totalItems: input.quantity,
      grandTotal: input.price * input.quantity,
      status: "pending",
      type: "single",
      _createdAt: new Date().toISOString(),
    });
  }

  const whatsappUrl = getWhatsAppUrl(message);
  return { success: true, whatsappUrl, orderNumber };
}

export async function createCartOrderAction(
  items: CartItem[],
  customer: {
    name: string;
    phone: string;
    address: string;
    landmark?: string;
    district: string;
    state: string;
    pincode: string;
  }
) {
  if (items.length === 0) return { error: "Cart is empty" };

  const customerParsed = orderCustomerSchema.safeParse(customer);
  if (!customerParsed.success) {
    return { error: customerParsed.error.issues[0].message };
  }

  const message = generateCartMessage(items, customerParsed.data);
  const orderNumber = generateOrderNumber();
  const session = await getSession();

  let userId = session?.id;
  if (isSanityConfigured) {
    const resolvedUserId = await resolveCustomerUser(customerParsed.data);
    if (resolvedUserId) {
      userId = resolvedUserId;
    }
  }

  const orderItems = cartToOrderItems(items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const grandTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const orderData = {
    _type: "orderRequest" as const,
    orderNumber,
    user: userId ? { _type: "reference" as const, _ref: userId } : undefined,
    customer: customerParsed.data,
    items: orderItems,
    totalItems,
    grandTotal,
    status: "pending",
    type: "cart",
    whatsappMessage: message,
  };

  if (isSanityConfigured) {
    await sanityWriteClient.create(orderData);
  } else {
    mockOrders.unshift({
      _id: `order-${Date.now()}`,
      orderNumber,
      customer: customerParsed.data,
      items: orderItems,
      totalItems,
      grandTotal,
      status: "pending",
      type: "cart",
      _createdAt: new Date().toISOString(),
    });
  }

  const whatsappUrl = getWhatsAppUrl(message);
  return { success: true, whatsappUrl, orderNumber };
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  if (isSanityConfigured) {
    await sanityWriteClient.patch(orderId).set({ status }).commit();
  } else {
    const order = mockOrders.find((o) => o._id === orderId);
    if (order) order.status = status as typeof order.status;
  }
  return { success: true };
}
