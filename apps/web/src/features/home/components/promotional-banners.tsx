"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/shared/components/shared/container";
import type { Banner } from "@/shared/types";

export function PromotionalBanners({ banners }: { banners: Banner[] }) {
  const promos = banners.filter((b) => b.type === "promotional");
  if (promos.length === 0) return null;

  return (
    <section className="py-10 md:py-12">
      <Container>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {promos.map((banner, i) => (
            <motion.div
              key={banner._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                href={banner.link || "/products"}
                className="group rounded-global sm:rounded-global relative block aspect-[4/3] overflow-hidden sm:aspect-[21/9]"
              >
                <Image
                  src={
                    banner.imageUrl ||
                    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200"
                  }
                  alt={banner.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white">
                  <div>
                    {banner.subtitle && (
                      <p className="label-caps mb-2 text-white/70">{banner.subtitle}</p>
                    )}
                    <h3 className="text-brand-h3 sm:text-brand-h2 md:text-brand-h2 leading-tight font-medium tracking-wide">
                      {banner.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
