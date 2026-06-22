"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/shared/container";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/components/shared/motion";
import type { Product } from "@/types";

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 md:mb-14">
          <SectionHeading title={title} subtitle={subtitle} label={label} align="left" className="mb-0" />
          {viewAllHref && (
            <Button variant="outline" className="w-full sm:w-auto shrink-0 rounded-full" asChild>
              <Link href={viewAllHref}>
                View All <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-7"
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
