import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/services/product-service";
import { getProductReviews, getRelatedProducts } from "@/services/content-service";
import { ProductDetail } from "@/features/products/product-detail";
import { generateProductJsonLd, generateBreadcrumbJsonLd } from "@/utils/seo";
import { APP_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const title = product.seoTitle || product.name;
  const description = product.seoDescription || product.shortDescription || product.description;

  return {
    title,
    description: description?.slice(0, 160),
    openGraph: {
      title,
      description: description?.slice(0, 160),
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description?.slice(0, 160),
      images: product.imageUrl ? [product.imageUrl] : [],
    },
    alternates: {
      canonical: `${APP_URL}/products/${slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [reviews, relatedProducts] = await Promise.all([
    getProductReviews(product._id),
    product.category ? getRelatedProducts(product.category._id, product._id) : Promise.resolve([]),
  ]);

  const jsonLd = generateProductJsonLd(product);
  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "Home", url: APP_URL },
    { name: "Products", url: `${APP_URL}/products` },
    { name: product.name, url: `${APP_URL}/products/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ProductDetail product={product} reviews={reviews} relatedProducts={relatedProducts} />
    </>
  );
}
