"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { Banner } from "@/shared/types";

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const heroBanners = banners.filter((b) => b.type === "hero");

  const [visibleCount, setVisibleCount] = useState(3);
  const [mounted, setMounted] = useState(false);

  // Duplicate exactly once to create a seamless 50% translation loop
  const extendedBanners = [...heroBanners, ...heroBanners];
  const totalOriginal = heroBanners.length;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <section className="relative flex h-screen w-full flex-col justify-center overflow-hidden bg-[#0F4A3A]">
      <div className="brand-gradient absolute inset-0 opacity-80" />

      <div className="relative z-10 h-full w-full">
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

                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-6 text-center sm:p-10">
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
                  style={{ width: `${100 / (mounted ? visibleCount : 3)}vw` }} // Use vw so it scales relative to viewport
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
      </div>
    </section>
  );
}
