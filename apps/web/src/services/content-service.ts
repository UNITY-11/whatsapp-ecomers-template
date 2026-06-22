import type { Category, Brand, Banner, FAQ, Testimonial, StoreSettings, Review, OrderRequest, User, Coupon, DashboardStats } from "@/types";
import { isSanityConfigured, sanityClient } from "@/lib/sanity/client";
import {
  CATEGORIES_QUERY, BRANDS_QUERY, BANNERS_QUERY, FAQS_QUERY,
  TESTIMONIALS_QUERY, SETTINGS_QUERY, FEATURED_PRODUCTS_QUERY,
  NEW_ARRIVALS_QUERY, BEST_SELLERS_QUERY, REVIEWS_BY_PRODUCT_QUERY,
  RELATED_PRODUCTS_QUERY, ORDER_REQUESTS_QUERY, USERS_QUERY,
  COUPONS_QUERY, DASHBOARD_STATS_QUERY,
} from "@/lib/sanity/queries";
import {
  mockCategories, mockBrands, mockBanners, mockFAQs,
  mockTestimonials, mockSettings, mockProducts, mockReviews,
  mockOrders, mockUsers, mockCoupons,
} from "@/lib/mock-data";
import type { Product } from "@/types";

export async function getCategories(): Promise<Category[]> {
  if (!isSanityConfigured) return mockCategories;
  const data = await sanityClient.fetch<Category[]>(CATEGORIES_QUERY);
  return data.length ? data : mockCategories;
}

export async function getBrands(): Promise<Brand[]> {
  if (!isSanityConfigured) return mockBrands;
  const data = await sanityClient.fetch<Brand[]>(BRANDS_QUERY);
  return data.length ? data : mockBrands;
}

export async function getBanners(type?: string): Promise<Banner[]> {
  if (!isSanityConfigured) {
    return type ? mockBanners.filter((b) => b.type === type) : mockBanners;
  }
  const data = await sanityClient.fetch<Banner[]>(BANNERS_QUERY);
  const banners = data.length ? data : mockBanners;
  return type ? banners.filter((b) => b.type === type) : banners;
}

export async function getFAQs(): Promise<FAQ[]> {
  if (!isSanityConfigured) return mockFAQs;
  const data = await sanityClient.fetch<FAQ[]>(FAQS_QUERY);
  return data.length ? data : mockFAQs;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured) return mockTestimonials;
  const data = await sanityClient.fetch<Testimonial[]>(TESTIMONIALS_QUERY);
  return data.length ? data : mockTestimonials;
}

export async function getSettings(): Promise<StoreSettings> {
  if (!isSanityConfigured) return mockSettings;
  const data = await sanityClient.fetch<StoreSettings>(SETTINGS_QUERY);
  return data || mockSettings;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isSanityConfigured) return mockProducts.filter((p) => p.featured);
  const data = await sanityClient.fetch<Product[]>(FEATURED_PRODUCTS_QUERY);
  return data.length ? data : mockProducts.filter((p) => p.featured);
}

export async function getNewArrivals(): Promise<Product[]> {
  if (!isSanityConfigured) return mockProducts.filter((p) => p.isNewArrival);
  const data = await sanityClient.fetch<Product[]>(NEW_ARRIVALS_QUERY);
  return data.length ? data : mockProducts.filter((p) => p.isNewArrival);
}

export async function getBestSellers(): Promise<Product[]> {
  if (!isSanityConfigured) return mockProducts.filter((p) => p.isBestSeller);
  const data = await sanityClient.fetch<Product[]>(BEST_SELLERS_QUERY);
  return data.length ? data : mockProducts.filter((p) => p.isBestSeller);
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  if (!isSanityConfigured) return mockReviews;
  const data = await sanityClient.fetch<Review[]>(REVIEWS_BY_PRODUCT_QUERY, { productId });
  return data.length ? data : mockReviews;
}

export async function getRelatedProducts(categoryId: string, productId: string): Promise<Product[]> {
  if (!isSanityConfigured) {
    return mockProducts.filter((p) => p.category?._id === categoryId && p._id !== productId).slice(0, 4);
  }
  const data = await sanityClient.fetch<Product[]>(RELATED_PRODUCTS_QUERY, { categoryId, productId });
  return data.length ? data : mockProducts.filter((p) => p.category?._id === categoryId && p._id !== productId).slice(0, 4);
}

export async function getOrderRequests(): Promise<OrderRequest[]> {
  if (!isSanityConfigured) return mockOrders;
  const data = await sanityClient.fetch<OrderRequest[]>(ORDER_REQUESTS_QUERY);
  return data.length ? data : mockOrders;
}

export async function getUsers(): Promise<User[]> {
  if (!isSanityConfigured) return mockUsers;
  const data = await sanityClient.fetch<User[]>(USERS_QUERY);
  return data.length ? data : mockUsers;
}

export async function getCoupons(): Promise<Coupon[]> {
  if (!isSanityConfigured) return mockCoupons;
  const data = await sanityClient.fetch<Coupon[]>(COUPONS_QUERY);
  return data.length ? data : mockCoupons;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!isSanityConfigured) {
    return {
      totalProducts: mockProducts.length,
      totalCategories: mockCategories.length,
      totalUsers: mockUsers.length,
      totalOrderRequests: mockOrders.length,
      recentOrders: mockOrders.slice(0, 5),
    };
  }
  const stats = await sanityClient.fetch<{ totalProducts: number; totalCategories: number; totalUsers: number; totalOrderRequests: number }>(DASHBOARD_STATS_QUERY);
  const orders = await getOrderRequests();
  return { ...stats, recentOrders: orders.slice(0, 5) };
}
