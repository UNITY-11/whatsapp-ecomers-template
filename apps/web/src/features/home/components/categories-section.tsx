"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container, SectionHeading } from "@/shared/components/shared/container";
import { fadeIn, staggerContainer } from "@/shared/components/shared/motion";
import { Button } from "@/shared/components/ui/button";
import type { Category } from "@/shared/types";

export function CategoriesSection({ categories }: { categories: Category[] }) {
  const featured = categories.filter((c) => c.featured).slice(0, 4);

  return (
    <section className="bg-brand-secondary py-14 sm:py-20 md:py-24">
      <Container>
        <div className="mb-10 flex flex-col items-center justify-between gap-4 text-center sm:mb-12 md:mb-14 md:flex-row md:gap-8 md:text-left">
          <div className="flex flex-1 flex-col gap-1 sm:gap-2">
            <h2 className="font-brand text-brand-h2 sm:text-brand-h2 md:text-brand-h1 text-brand-primary leading-none uppercase lg:text-[2.5rem]">
              Shop by Category
            </h2>
          </div>
          <Button
            variant="outline"
            className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary hover:border-brand-primary w-full shrink-0 rounded-none bg-transparent sm:w-auto"
            asChild
          >
            <Link href="/categories">
              View All <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <motion.div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:gap-7 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((category) => (
            <motion.div key={category._id} variants={fadeIn}>
              <Link href={`/products?category=${category.slug.current}`} className="group block">
                <div className="bg-brand-secondary-hover relative aspect-[3/4] overflow-hidden rounded-none">
                  <Image
                    src={
                      category.imageUrl ||
                      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600"
                    }
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-all group-hover:from-black/60" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="font-brand md:text-brand-h3 text-sm leading-tight font-medium tracking-wide text-white sm:text-base">
                      {category.name}
                    </h3>
                    {category.productCount && (
                      <p className="mt-1 text-[10px] tracking-[0.15em] uppercase opacity-75">
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
