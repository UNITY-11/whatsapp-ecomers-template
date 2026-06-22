import type { Product, ProductFilters, PaginatedResponse } from "@/types";
import { isSanityConfigured, sanityClient } from "@/lib/sanity/client";
import { PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { mockProducts } from "@/lib/mock-data";
import { ITEMS_PER_PAGE } from "@/lib/constants";

function filterMockProducts(filters: ProductFilters): Product[] {
  let products = [...mockProducts];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q)
    );
  }

  if (filters.category) {
    products = products.filter((p) => p.category?.slug.current === filters.category);
  }

  if (filters.brand) {
    products = products.filter((p) => p.brand?.slug.current === filters.brand);
  }

  if (filters.minPrice !== undefined) {
    products = products.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    products = products.filter((p) => p.price <= filters.maxPrice!);
  }

  switch (filters.sort) {
    case "price-asc":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      products.sort((a, b) => b.price - a.price);
      break;
    case "name":
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "popular":
      products.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      break;
    default:
      products.sort((a, b) => (b._createdAt || "").localeCompare(a._createdAt || ""));
  }

  return products;
}

export async function getProducts(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
  const page = filters.page || 1;
  const limit = filters.limit || ITEMS_PER_PAGE;

  if (!isSanityConfigured) {
    const filtered = filterMockProducts(filters);
    const start = (page - 1) * limit;
    return {
      data: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  }

  const products = await sanityClient.fetch<Product[]>(PRODUCTS_QUERY);
  const filtered = filterMockProducts({ ...filters });
  const mapped = products.length ? products : filtered;
  const start = (page - 1) * limit;
  return {
    data: mapped.slice(start, start + limit),
    total: mapped.length,
    page,
    limit,
    totalPages: Math.ceil(mapped.length / limit),
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured) {
    return mockProducts.find((p) => p.slug.current === slug) || null;
  }
  const product = await sanityClient.fetch<Product | null>(PRODUCT_BY_SLUG_QUERY, { slug });
  return product || mockProducts.find((p) => p.slug.current === slug) || null;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const result = await getProducts({ search: query, limit: 8 });
  return result.data;
}
