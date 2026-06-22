"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Banner } from "@/types";

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0);
  const heroBanners = banners.filter((b) => b.type === "hero");

  if (heroBanners.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % heroBanners.length);
  const prev = () => setCurrent((c) => (c - 1 + heroBanners.length) % heroBanners.length);

  return (
    <section className="relative h-[52vh] min-h-[340px] sm:h-[60vh] sm:min-h-[400px] md:h-[72vh] md:min-h-[480px] max-h-[820px] overflow-hidden brand-gradient">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={heroBanners[current].imageUrl || "https://images.unsplash.com/photo-1441984904996-e0b6fe7783a0?w=1600"}
            alt={heroBanners[current].title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10 sm:from-black/55 sm:via-black/25 sm:to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-end sm:items-center pb-20 sm:pb-12 md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-white pr-0 sm:pr-4"
            >
              {heroBanners[current].subtitle && (
                <p className="label-caps mb-3 sm:mb-4 text-white/75">
                  {heroBanners[current].subtitle}
                </p>
              )}
              <h1 className="font-heading text-[1.75rem] leading-[1.12] sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-balance mb-4 sm:mb-5">
                {heroBanners[current].title}
              </h1>
              {heroBanners[current].description && (
                <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-6 sm:mb-8 max-w-lg font-light line-clamp-3 sm:line-clamp-none">
                  {heroBanners[current].description}
                </p>
              )}
              {heroBanners[current].link && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-[#F5F0E8] hover:text-[#0F4A3A] px-6 sm:px-8 h-10 sm:h-11"
                  asChild
                >
                  <Link href={heroBanners[current].link!}>
                    <span className="truncate">{heroBanners[current].buttonText || "Shop Collection"}</span>
                    <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                  </Link>
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {heroBanners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
            {heroBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === current ? "w-8 sm:w-10 bg-white" : "w-3 sm:w-4 bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
