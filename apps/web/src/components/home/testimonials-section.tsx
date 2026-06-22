"use client";

import Image from "next/image";
import { Container, SectionHeading } from "@/components/shared/container";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/components/shared/motion";
import type { Testimonial } from "@/types";

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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((testimonial) => (
            <motion.div
              key={testimonial._id}
              variants={fadeIn}
              className="bg-card rounded-2xl p-7 md:p-8 border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-500"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <span key={i} className="text-accent text-sm">★</span>
                ))}
              </div>
              <p className="font-heading text-lg leading-relaxed text-foreground/85 mb-8">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-border/60">
                <div className="relative h-11 w-11 rounded-full overflow-hidden bg-muted ring-2 ring-border/40">
                  {testimonial.avatarUrl && (
                    <Image src={testimonial.avatarUrl} alt={testimonial.name} fill className="object-cover" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm tracking-wide">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-xs text-muted-foreground mt-0.5">{testimonial.role}</p>
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
