"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { motion } from "framer-motion";
import type { Banner } from "@/types";

export function PromotionalBanners({ banners }: { banners: Banner[] }) {
  const promos = banners.filter((b) => b.type === "promotional");
  if (promos.length === 0) return null;

  return (
    <section className="py-10 md:py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {promos.map((banner, i) => (
            <motion.div
              key={banner._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link href={banner.link || "/products"} className="group block relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden rounded-xl sm:rounded-2xl">
                <Image
                  src={banner.imageUrl || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200"}
                  alt={banner.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                  <div>
                    {banner.subtitle && (
                      <p className="label-caps text-white/70 mb-2">{banner.subtitle}</p>
                    )}
                    <h3 className="font-heading text-lg sm:text-2xl md:text-3xl font-medium tracking-wide leading-tight">{banner.title}</h3>
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
