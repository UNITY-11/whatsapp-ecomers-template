"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Container, SectionHeading } from "@/shared/components/shared/container";
import { fadeIn, staggerContainer } from "@/shared/components/shared/motion";
import type { Testimonial } from "@/shared/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const featured = testimonials.filter((t) => t.featured).slice(0, 3);

  return (
    <section className="py-14 sm:py-20 md:py-24">
      <Container>
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Trusted by thousands who value quality and craftsmanship."
          label="Testimonials"
        />
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((testimonial) => (
            <motion.div
              key={testimonial._id}
              variants={fadeIn}
              className="bg-brand-surface border-brand-border-global/60 shadow-brand-card hover:shadow-brand-card rounded-none border p-7 transition-shadow md:p-8"
            >
              <div className="mb-5 flex gap-0.5">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <span key={i} className="text-accent text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="font-brand text-brand-h3 text-foreground/85 mb-8 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="border-brand-border-global/60 flex items-center gap-3 border-t pt-5">
                <div className="rounded-global bg-brand-secondary-hover ring-border/40 relative h-11 w-11 overflow-hidden ring-2">
                  {testimonial.avatarUrl && (
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium tracking-wide">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-brand-text/70 mt-0.5 text-xs">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
