import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";
import { PRODUCT_IMAGE_FALLBACK } from "@/lib/images";
import type { SanityImage } from "@/types";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

export function getImageUrl(source?: SanityImage, width = 800): string {
  if (!source) return PRODUCT_IMAGE_FALLBACK;
  try {
    return urlFor(source).width(width).auto("format").url();
  } catch {
    return PRODUCT_IMAGE_FALLBACK;
  }
}
