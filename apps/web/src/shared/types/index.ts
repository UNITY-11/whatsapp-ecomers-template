export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

export interface Slug {
  current: string;
  _type: "slug";
}

export interface ProductVariant {
  _key?: string;
  name: string;
  sku?: string;
  price?: number;
  stock?: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  imageUrl?: string;
}

export interface VariantStock {
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: Slug;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  images?: SanityImage[];
  imageUrl?: string;
  category?: Category;
  brand?: Brand;
  variants?: ProductVariant[];
  sizes?: string[];
  colors?: ProductColor[];
  variantStock?: VariantStock[];
  stock: number;
  status: "active" | "draft" | "archived";
  featured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  specifications?: { key: string; value: string }[];
  features?: string[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  _createdAt?: string;
  averageRating?: number;
  reviewCount?: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: Slug;
  description?: string;
  image?: SanityImage;
  imageUrl?: string;
  parent?: Category;
  featured?: boolean;
  order?: number;
  productCount?: number;
}

export interface Brand {
  _id: string;
  name: string;
  slug: Slug;
  description?: string;
  logo?: SanityImage;
  logoUrl?: string;
  website?: string;
}

export interface UserAddress {
  _key?: string;
  label?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: SanityImage;
  role: "customer" | "admin";
  emailVerified?: boolean;
  addresses?: UserAddress[];
  wishlist?: string[];
}

export interface Review {
  _id: string;
  product?: { _id: string; name: string };
  user?: User;
  userName?: string;
  rating: number;
  title?: string;
  comment?: string;
  images?: SanityImage[];
  verified?: boolean;
  approved?: boolean;
  _createdAt?: string;
}

export interface Coupon {
  _id: string;
  code: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount?: number;
  expiryDate?: string;
  active?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
  productUrl?: string;
  size?: string;
  color?: string;
}

export interface OrderRequest {
  _id: string;
  orderNumber: string;
  user?: User;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
  };
  items: OrderItem[];
  totalItems: number;
  grandTotal: number;
  status: OrderStatus;
  type: "single" | "cart";
  whatsappMessage?: string;
  notes?: string;
  _createdAt?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: SanityImage;
  imageUrl?: string;
  link?: string;
  buttonText?: string;
  type: "hero" | "promotional" | "category";
  active?: boolean;
  order?: number;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  content: string;
  rating?: number;
  avatar?: SanityImage;
  avatarUrl?: string;
  featured?: boolean;
}

export interface StoreSettings {
  _id: string;
  storeName: string;
  storeDescription?: string;
  logo?: SanityImage;
  whatsappNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  currency?: string;
  currencySymbol?: string;
}

export interface CartItem {
  cartLineId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  slug: string;
  stock: number;
  size?: string;
  color?: string;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-asc" | "price-desc" | "name" | "popular";
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalUsers: number;
  totalOrderRequests: number;
  recentOrders: OrderRequest[];
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}
