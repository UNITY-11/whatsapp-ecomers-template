"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Banner } from "@/shared/types";

function MobileHeroSlider({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Clone first and last items for seamless infinite loop
  const items = [banners[banners.length - 1], ...banners, banners[0]];

  const paginate = (newDirection: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => prev + newDirection);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 3000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isTransitioning]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (index === 0) {
      setIndex(banners.length);
    } else if (index === banners.length + 1) {
      setIndex(1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const swipe = touchEnd - touchStart;
    if (swipe < -50) paginate(1);
    else if (swipe > 50) paginate(-1);
    setTouchStart(null);
  };

  return (
    <div className="group relative flex h-full w-full overflow-hidden bg-black">
      <div
        className="flex h-full w-full shrink-0"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: isTransitioning ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((banner, i) => (
          <div key={`${i}-${banner.title}`} className="relative h-full w-full shrink-0">
            <Image
              src={
                banner.imageUrl ||
                "https://images.unsplash.com/photo-1441984904996-e0b6fe7783a0?w=1600"
              }
              alt={banner.title}
              fill
              className="object-cover"
              priority={i <= 2}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

            <div className="absolute inset-x-0 bottom-12 flex flex-col items-center p-6 text-center sm:p-10">
              <h2 className="drop-shadow-brand-card font-brand mb-4 text-3xl leading-tight font-medium text-white sm:text-4xl lg:text-5xl">
                {banner.title}
              </h2>
              {banner.description && (
                <p className="max-w-2xl text-sm text-white/90 drop-shadow-md sm:text-base">
                  {banner.description}
                </p>
              )}
            </div>
            {banner.link && <Link href={banner.link} className="absolute inset-0 z-10 block" />}
          </div>
        ))}
      </div>

      {/* Thin Navigation Buttons */}
      <button
        onClick={() => paginate(-1)}
        className="absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white/50 opacity-0 transition-all group-hover:opacity-100 hover:text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft strokeWidth={1} size={40} />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute top-1/2 right-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white/50 opacity-0 transition-all group-hover:opacity-100 hover:text-white"
        aria-label="Next slide"
      >
        <ChevronRight strokeWidth={1} size={40} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 z-20 flex w-full justify-center gap-2">
        {banners.map((_, i) => {
          let isActive = false;
          if (index === i + 1) isActive = true;
          if (index === 0 && i === banners.length - 1) isActive = true;
          if (index === banners.length + 1 && i === 0) isActive = true;

          return (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive ? "bg-brand-primary w-6" : "w-1.5 bg-white/50"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const heroBanners = banners.filter((b) => b.type === "hero");

  const [visibleCount, setVisibleCount] = useState(3);
  const [mounted, setMounted] = useState(false);

  const extendedBanners = [...heroBanners, ...heroBanners];
  const totalOriginal = heroBanners.length;

  useEffect(() => {
    setMounted(true);
    const updateVisible = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 640) setVisibleCount(2);
      else setVisibleCount(1);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  if (totalOriginal === 0) return null;

  return (
    <section className="relative flex h-[calc(75vh-3.5rem)] w-full flex-col justify-center overflow-hidden bg-[#0F4A3A] sm:h-[calc(100vh-4rem)]">
      <div className="brand-gradient absolute inset-0 opacity-80" />

      <div className="relative z-10 h-full w-full">
        {mounted && visibleCount === 1 ? (
          <MobileHeroSlider banners={heroBanners} />
        ) : (
          <div className="flex h-full w-full overflow-hidden">
            <div
              className="animate-marquee pause-on-hover flex h-full w-max"
              style={
                {
                  "--marquee-duration": `${totalOriginal * 8}s`,
                } as React.CSSProperties
              }
            >
              {extendedBanners.map((banner, i) => {
                const content = (
                  <div className="group relative h-full w-full overflow-hidden shadow-2xl">
                    <Image
                      src={
                        banner.imageUrl ||
                        "https://images.unsplash.com/photo-1441984904996-e0b6fe7783a0?w=1600"
                      }
                      alt={banner.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority={i < totalOriginal + 3}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                    <div className="absolute inset-x-0 bottom-12 flex flex-col items-center p-6 text-center sm:p-10">
                      <h2 className="drop-shadow-brand-card font-brand mb-4 text-3xl leading-tight font-medium text-white sm:text-4xl lg:text-5xl">
                        {banner.title}
                      </h2>
                      {banner.description && (
                        <p className="max-w-2xl text-sm text-white/90 drop-shadow-md sm:text-base">
                          {banner.description}
                        </p>
                      )}
                    </div>
                  </div>
                );

                return (
                  <div
                    key={i}
                    className="h-full shrink-0"
                    style={{ width: `${100 / (mounted ? visibleCount : 3)}vw` }}
                  >
                    {banner.link ? (
                      <Link href={banner.link} className="block h-full w-full">
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
