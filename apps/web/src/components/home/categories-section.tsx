"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container, SectionHeading } from "@/components/shared/container";
import { staggerContainer, fadeIn } from "@/components/shared/motion";
import type { Category } from "@/types";

export function CategoriesSection({ categories }: { categories: Category[] }) {
  const featured = categories.filter((c) => c.featured).slice(0, 6);

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-muted/30">
      <Container>
        <SectionHeading
          title="Shop by Category"
          subtitle="Explore our curated collections"
          label="Collections"
        />
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 md:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((category) => (
            <motion.div key={category._id} variants={fadeIn}>
              <Link href={`/products?category=${category.slug.current}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={category.imageUrl || "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:from-black/60 transition-all duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="font-heading text-sm sm:text-base md:text-lg font-medium tracking-wide leading-tight">{category.name}</h3>
                    {category.productCount && (
                      <p className="text-[10px] uppercase tracking-[0.15em] opacity-75 mt-1">
                        {category.productCount} pieces
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
