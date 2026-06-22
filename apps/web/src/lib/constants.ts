export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Calira Couture";
export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "Calira";
export const BRAND_TAGLINE = process.env.NEXT_PUBLIC_BRAND_TAGLINE || "Couture";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL || APP_URL;
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917736085178";
export const CONTACT_PHONE_DISPLAY = "+91 77360 85178";
export const CURRENCY_SYMBOL = "₹";
export const ITEMS_PER_PAGE = 12;

export const ORDER_STATUSES = [
  { value: "pending", label: "Pending", color: "bg-yellow-500" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-500" },
  { value: "processing", label: "Processing", color: "bg-purple-500" },
  { value: "shipped", label: "Shipped", color: "bg-indigo-500" },
  { value: "delivered", label: "Delivered", color: "bg-green-500" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-500" },
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
  { value: "popular", label: "Most Popular" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Dresses" },
  { href: "/categories", label: "Collections" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
] as const;
