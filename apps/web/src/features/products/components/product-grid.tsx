"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container, SectionHeading } from "@/shared/components/shared/container";
import { fadeIn, staggerContainer } from "@/shared/components/shared/motion";
import { Button } from "@/shared/components/ui/button";
import type { Product } from "@/shared/types";
import { ProductCard } from "@/features/products/components/product-card";

interface ProductGridProps {
  products: Product[];
  title: string;
  subtitle?: string;
  label?: string;
  viewAllHref?: string;
}

export function ProductGrid({ products, title, subtitle, label, viewAllHref }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 md:py-24">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 md:mb-14 md:flex-row md:items-center md:gap-8">
          <div className="flex flex-1 flex-col gap-1 sm:gap-2">
            <h2 className="font-brand text-brand-h2 sm:text-brand-h2 md:text-brand-h1 text-brand-primary leading-none whitespace-nowrap uppercase lg:text-[2.5rem]">
              {title}
            </h2>
          </div>
          {viewAllHref && (
            <Button
              variant="outline"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary hover:border-brand-primary w-full shrink-0 rounded-none bg-transparent sm:w-auto"
              asChild
            >
              <Link href={viewAllHref}>
                View All <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
        <motion.div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:gap-7 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {products.map((product) => (
            <motion.div key={product._id} variants={fadeIn}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
