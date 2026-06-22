import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "product", title: "Product", type: "reference", to: [{ type: "product" }], validation: (r) => r.required() }),
    defineField({ name: "user", title: "User", type: "reference", to: [{ type: "user" }] }),
    defineField({ name: "userName", title: "User Name", type: "string" }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "comment", title: "Comment", type: "text" }),
    defineField({ name: "images", title: "Images", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "verified", title: "Verified Purchase", type: "boolean", initialValue: false }),
    defineField({ name: "approved", title: "Approved", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "title", subtitle: "userName" } },
});
