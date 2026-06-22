import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "shortDescription", title: "Short Description", type: "string" }),
    defineField({ name: "price", title: "Price", type: "number", validation: (r) => r.required().min(0) }),
    defineField({ name: "compareAtPrice", title: "Compare At Price", type: "number" }),
    defineField({ name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "brand", title: "Brand", type: "reference", to: [{ type: "brand" }] }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["XS", "S", "M", "L", "XL", "XXL"] },
    }),
    defineField({
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name", title: "Name", type: "string" },
          { name: "hex", title: "Hex Code", type: "string" },
          { name: "imageUrl", title: "Image URL", type: "url" },
        ],
      }],
    }),
    defineField({
      name: "variantStock",
      title: "Variant Stock",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "size", title: "Size", type: "string" },
          { name: "color", title: "Color", type: "string" },
          { name: "stock", title: "Stock", type: "number" },
        ],
      }],
    }),
    defineField({
      name: "variants",
      title: "Legacy Variants",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name", title: "Name", type: "string" },
          { name: "sku", title: "SKU", type: "string" },
          { name: "price", title: "Price", type: "number" },
          { name: "stock", title: "Stock", type: "number" },
        ],
      }],
    }),
    defineField({ name: "stock", title: "Stock", type: "number", initialValue: 0 }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["active", "draft", "archived"] },
      initialValue: "active",
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "isNewArrival", title: "New Arrival", type: "boolean", initialValue: false }),
    defineField({ name: "isBestSeller", title: "Best Seller", type: "boolean", initialValue: false }),
    defineField({ name: "specifications", title: "Specifications", type: "array", of: [{ type: "object", fields: [{ name: "key", type: "string" }, { name: "value", type: "string" }] }] }),
    defineField({ name: "features", title: "Features", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),
  ],
  preview: {
    select: { title: "name", media: "images.0" },
  },
});
