import { defineField, defineType } from "sanity";

export const orderRequest = defineType({
  name: "orderRequest",
  title: "Order Request",
  type: "document",
  fields: [
    defineField({ name: "orderNumber", title: "Order Number", type: "string", validation: (r) => r.required() }),
    defineField({ name: "user", title: "User", type: "reference", to: [{ type: "user" }] }),
    defineField({
      name: "customer",
      title: "Customer Details",
      type: "object",
      fields: [
        { name: "name", type: "string" },
        { name: "phone", type: "string" },
        { name: "email", type: "string" },
        { name: "address", type: "text" },
      ],
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "productId", type: "string" },
          { name: "productName", type: "string" },
          { name: "price", type: "number" },
          { name: "quantity", type: "number" },
          { name: "subtotal", type: "number" },
          { name: "productUrl", type: "string" },
        ],
      }],
    }),
    defineField({ name: "totalItems", title: "Total Items", type: "number" }),
    defineField({ name: "grandTotal", title: "Grand Total", type: "number" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"] },
      initialValue: "pending",
    }),
    defineField({ name: "type", title: "Type", type: "string", options: { list: ["single", "cart"] } }),
    defineField({ name: "whatsappMessage", title: "WhatsApp Message", type: "text" }),
    defineField({ name: "notes", title: "Admin Notes", type: "text" }),
  ],
  preview: { select: { title: "orderNumber", subtitle: "status" } },
});
