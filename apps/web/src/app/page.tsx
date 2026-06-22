import { HeroBanner } from "@/components/home/hero-banner";
import { ProductGrid } from "@/components/home/product-grid";
import { CategoriesSection } from "@/components/home/categories-section";
import { PromotionalBanners } from "@/components/home/promotional-banners";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FAQSection } from "@/components/home/faq-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
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
      <CategoriesSection categories={categories} />
      <ProductGrid products={featured} title="Signature Dresses" subtitle="Handpicked gowns and silhouettes for every occasion" label="Featured" viewAllHref="/products?featured=true" />
      <PromotionalBanners banners={banners} />
      <ProductGrid products={newArrivals} title="Just Arrived" subtitle="Fresh styles from our atelier" label="New Season" viewAllHref="/products?sort=newest" />
      <ProductGrid products={bestSellers} title="Most Loved" subtitle="The dresses our clients reach for again and again" label="Bestsellers" viewAllHref="/products?sort=popular" />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <NewsletterSection />
    </>
  );
}
