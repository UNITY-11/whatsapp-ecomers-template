"use client";

import Link from"next/link";
import Image from"next/image";
import { motion} from"framer-motion";
import { ArrowRight} from"lucide-react";
import { Button} from"@/shared/components/ui/button";
import { Container, SectionHeading} from"@/shared/components/shared/container";
import { staggerContainer, fadeIn} from"@/shared/components/shared/motion";
import type { Category} from"@/shared/types";

export function CategoriesSection({ categories}: { categories: Category[]}) {
 const featured = categories.filter((c) => c.featured).slice(0, 4);

 return (
 <section className="py-14 sm:py-20 md:py-24 bg-brand-secondary-hover/30">
 <Container>
 <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 sm:mb-12 md:mb-14 gap-4 md:gap-8">
 <div className="flex flex-col gap-1 sm:gap-2 flex-1">
 <h2 className="font-brand text-brand-h2 sm:text-brand-h2 md:text-brand-h1 lg:text-[2.5rem] leading-none whitespace-nowrap">
 Shop by Category
 </h2>
 <p className="text-brand-text/70 text-sm sm:text-base md:text-brand-h3 leading-snug max-w-xl">
 Explore our curated collections
 </p>
 </div>
 <Button variant="outline"className="w-full sm:w-auto shrink-0 rounded-none border-brand-primary text-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary hover:border-brand-primary"asChild>
 <Link href="/products">
 View All <ArrowRight className="ml-1.5 h-3.5 w-3.5"/>
 </Link>
 </Button>
 </div>
 <motion.div
 className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-7"
 variants={staggerContainer}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true}}
 >
 {featured.map((category) => (
 <motion.div key={category._id} variants={fadeIn}>
 <Link href={`/products?category=${category.slug.current}`} className="group block">
 <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-brand-secondary-hover">
 <Image
 src={category.imageUrl ||"https://images.unsplash.com/photo-1445205170230-053b83016050?w=600"}
 alt={category.name}
 fill
 className="object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:from-black/60 transition-all"/>
 <div className="absolute inset-x-0 bottom-0 p-4 text-white">
 <h3 className="font-brand text-sm sm:text-base md:text-brand-h3 font-medium tracking-wide leading-tight text-white">{category.name}</h3>
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
