import { defineField, defineType } from "sanity";

export const user = defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.required().email() }),
    defineField({ name: "password", title: "Password Hash", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "avatar", title: "Avatar", type: "image" }),
    defineField({ name: "role", title: "Role", type: "string", options: { list: ["customer", "admin"] }, initialValue: "customer" }),
    defineField({ name: "emailVerified", title: "Email Verified", type: "boolean", initialValue: false }),
    defineField({
      name: "addresses",
      title: "Addresses",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", type: "string" },
          { name: "street", type: "string" },
          { name: "city", type: "string" },
          { name: "state", type: "string" },
          { name: "zip", type: "string" },
          { name: "country", type: "string" },
          { name: "isDefault", type: "boolean" },
        ],
      }],
    }),
    defineField({ name: "wishlist", title: "Wishlist", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] }),
  ],
  preview: { select: { title: "name", subtitle: "email" } },
});
