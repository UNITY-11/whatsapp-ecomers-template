import dynamic from "next/dynamic";

import {
  getBanners,
  getBestSellers,
  getCategories,
  getFAQs,
  getFeaturedProducts,
  getNewArrivals,
} from "@/shared/services/content-service";
import { CategoriesSection } from "@/features/home/components/categories-section";
import { FeaturesMarquee } from "@/features/home/components/features-marquee";
import { HeroBanner } from "@/features/home/components/hero-banner";
import { ProductGrid } from "@/features/products/components/product-grid";

const BrandsSection = dynamic(() =>
  import("@/features/home/components/brands-section").then((m) => m.BrandsSection)
);
const FAQSection = dynamic(() =>
  import("@/features/home/components/faq-section").then((m) => m.FAQSection)
);
const LastChanceBanner = dynamic(() =>
  import("@/features/home/components/last-chance-banner").then((m) => m.LastChanceBanner)
);
const NewsletterSection = dynamic(() =>
  import("@/features/home/components/newsletter-section").then((m) => m.NewsletterSection)
);

export const revalidate = 3600;

export default async function HomePage() {
  const [banners, categories, featured, newArrivals, bestSellers, faqs] = await Promise.all([
    getBanners(),
    getCategories(),
    getFeaturedProducts(),
    getNewArrivals(),
    getBestSellers(),
    getFAQs(),
  ]);

  return (
    <>
      <HeroBanner banners={banners} />
      <FeaturesMarquee />
      <BrandsSection />
      <CategoriesSection categories={categories} />
      <ProductGrid
        products={featured}
        title="Signature Dresses"
        subtitle="Handpicked gowns and silhouettes for every occasion"
        label="Featured"
        viewAllHref="/products?featured=true"
      />
      <ProductGrid
        products={newArrivals}
        title="Just Arrived"
        subtitle="Fresh styles from our atelier"
        label="New Season"
        viewAllHref="/products?sort=newest"
      />
      <ProductGrid
        products={bestSellers}
        title="Most Loved"
        subtitle="The dresses our clients reach for again and again"
        label="Bestsellers"
        viewAllHref="/products?sort=popular"
      />
      <LastChanceBanner />
      <FAQSection faqs={faqs} />
      <NewsletterSection />
    </>
  );
}
