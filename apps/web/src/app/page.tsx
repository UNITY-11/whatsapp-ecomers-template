import { HeroBanner } from "@/features/home/components/hero-banner";
import { ProductGrid } from "@/features/products/components/product-grid";
import { CategoriesSection } from "@/features/home/components/categories-section";
import { LastChanceBanner } from "@/features/home/components/last-chance-banner";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { FAQSection } from "@/features/home/components/faq-section";
import { NewsletterSection } from "@/features/home/components/newsletter-section";
import { FeaturesMarquee } from "@/features/home/components/features-marquee";
import { BrandsSection } from "@/features/home/components/brands-section";
import {
  getBanners, getCategories, getFeaturedProducts,
  getNewArrivals, getBestSellers, getFAQs, getTestimonials,
} from "@/services/content-service";

export const revalidate = 3600;

export default async function HomePage() {
  const [banners, categories, featured, newArrivals, bestSellers, faqs, testimonials] = await Promise.all([
    getBanners(),
    getCategories(),
    getFeaturedProducts(),
    getNewArrivals(),
    getBestSellers(),
    getFAQs(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroBanner banners={banners} />
      <FeaturesMarquee />
      <BrandsSection />
      <CategoriesSection categories={categories} />
      <ProductGrid products={featured} title="Signature Dresses" subtitle="Handpicked gowns and silhouettes for every occasion" label="Featured" viewAllHref="/products?featured=true" />
      <ProductGrid products={newArrivals} title="Just Arrived" subtitle="Fresh styles from our atelier" label="New Season" viewAllHref="/products?sort=newest" />
      <ProductGrid products={bestSellers} title="Most Loved" subtitle="The dresses our clients reach for again and again" label="Bestsellers" viewAllHref="/products?sort=popular" />
      <LastChanceBanner />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <NewsletterSection />
    </>
  );
}
