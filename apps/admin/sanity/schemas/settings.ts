import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Store Settings",
  type: "document",
  fields: [
    defineField({ name: "storeName", title: "Store Name", type: "string" }),
    defineField({ name: "storeDescription", title: "Store Description", type: "text" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "facebook", type: "url" },
        { name: "instagram", type: "url" },
        { name: "twitter", type: "url" },
        { name: "youtube", type: "url" },
      ],
    }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),
    defineField({ name: "currency", title: "Currency", type: "string", initialValue: "INR" }),
    defineField({ name: "currencySymbol", title: "Currency Symbol", type: "string", initialValue: "₹" }),
  ],
});
