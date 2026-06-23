import { defineField, defineType } from "sanity";

export const coupon = defineType({
  name: "coupon",
  title: "Coupon",
  type: "document",
  fields: [
    defineField({ name: "code", title: "Code", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "string" }),
    defineField({ name: "discountType", title: "Discount Type", type: "string", options: { list: ["percentage", "fixed"] } }),
    defineField({ name: "discountValue", title: "Discount Value", type: "number", validation: (r) => r.required() }),
    defineField({ name: "minOrderAmount", title: "Min Order Amount", type: "number" }),
    defineField({ name: "maxDiscount", title: "Max Discount", type: "number" }),
    defineField({ name: "usageLimit", title: "Usage Limit", type: "number" }),
    defineField({ name: "usedCount", title: "Used Count", type: "number", initialValue: 0 }),
    defineField({ name: "expiryDate", title: "Expiry Date", type: "datetime" }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "code", subtitle: "description" } },
});
