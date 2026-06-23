"use client";

import Link from"next/link";
import { ArrowRight} from"lucide-react";
import { Container, SectionHeading} from"@/shared/components/shared/container";
import { ProductCard} from"@/features/products/components/product-card";
import { Button} from"@/shared/components/ui/button";
import { motion} from"framer-motion";
import { staggerContainer, fadeIn} from"@/shared/components/shared/motion";
import type { Product} from"@/shared/types";

interface ProductGridProps {
 products: Product[];
 title: string;
 subtitle?: string;
 label?: string;
 viewAllHref?: string;
}

export function ProductGrid({ products, title, subtitle, label, viewAllHref}: ProductGridProps) {
 if (products.length === 0) return null;

 return (
 <section className="py-14 sm:py-20 md:py-24">
 <Container>
 <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 sm:mb-12 md:mb-14 gap-4 md:gap-8">
 <div className="flex flex-col gap-1 sm:gap-2 flex-1">
 <h2 className="font-brand text-brand-h2 sm:text-brand-h2 md:text-brand-h1 lg:text-[2.5rem] leading-none whitespace-nowrap">
 {title}
 </h2>
 {subtitle && (
 <p className="text-brand-text/70 text-sm sm:text-base md:text-brand-h3 leading-snug max-w-xl">
 {subtitle}
 </p>
 )}
 </div>
 {viewAllHref && (
 <Button variant="outline"className="w-full sm:w-auto shrink-0 rounded-none bg-transparent border-brand-primary text-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary hover:border-brand-primary"asChild>
 <Link href={viewAllHref}>
 View All <ArrowRight className="ml-1.5 h-3.5 w-3.5"/>
 </Link>
 </Button>
 )}
 </div>
 <motion.div
 className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-7"
 variants={staggerContainer}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin:"-60px"}}
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
