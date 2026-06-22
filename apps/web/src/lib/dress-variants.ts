import type { Product } from "@/types";

export const DRESS_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export type DressSize = (typeof DRESS_SIZES)[number];

export function getCartLineId(productId: string, size?: string, color?: string) {
  return `${productId}::${size || "default"}::${color || "default"}`;
}

export function getProductSizes(product: Product): string[] {
  if (product.sizes?.length) return product.sizes;
  return [...DRESS_SIZES];
}

export function getVariantStock(product: Product, size: string, color: string): number {
  const match = product.variantStock?.find((v) => v.size === size && v.color === color);
  if (match) return match.stock;
  if (product.variantStock?.length) return 0;
  return product.stock;
}

export function isVariantInStock(product: Product, size: string, color: string): boolean {
  return getVariantStock(product, size, color) > 0;
}

export function productHasVariants(product: Product): boolean {
  return Boolean(product.sizes?.length || product.colors?.length);
}
