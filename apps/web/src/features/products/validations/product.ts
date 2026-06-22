import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  compareAtPrice: z.number().optional(),
  stock: z.number().min(0, "Stock must be positive"),
  status: z.enum(["active", "draft", "archived"]),
  featured: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

export const brandSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
});

export const couponSchema = z.object({
  code: z.string().min(2, "Code is required"),
  description: z.string().optional(),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().min(0),
  minOrderAmount: z.number().optional(),
  maxDiscount: z.number().optional(),
  usageLimit: z.number().optional(),
  expiryDate: z.string().optional(),
  active: z.boolean().optional(),
});

export const bannerSchema = z.object({
  title: z.string().min(2, "Title is required"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  link: z.string().optional(),
  buttonText: z.string().optional(),
  type: z.enum(["hero", "promotional", "category"]),
  active: z.boolean().optional(),
  order: z.number().optional(),
});

export const settingsSchema = z.object({
  storeName: z.string().min(2),
  storeDescription: z.string().optional(),
  whatsappNumber: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type BrandInput = z.infer<typeof brandSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type BannerInput = z.infer<typeof bannerSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
