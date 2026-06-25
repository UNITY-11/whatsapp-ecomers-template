"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Gift, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Container } from "@/shared/components/shared/container";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { BRAND_NAME } from "@/shared/lib/constants";

const perks = [
  { icon: Sparkles, text: "First look at new collections" },
  { icon: Gift, text: "Exclusive member offers" },
  { icon: Mail, text: "Styling notes from our atelier" },
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to The Calira Edit — check your inbox soon.");
    setEmail("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-16 sm:py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-none border border-[#0F4A3A]/10 shadow-xl shadow-[#0F4A3A]/5"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-[#0F4A3A]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,_#B89A5A33,_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_100%,_#F5F0E810,_transparent_50%)]" />
          <div
            className="rounded-global absolute -top-16 -right-16 h-64 w-64 border border-[#B89A5A]/20"
            aria-hidden
          />
          <div
            className="rounded-global absolute bottom-8 -left-8 h-40 w-40 border border-[#F5F0E8]/10"
            aria-hidden
          />

          <div className="relative grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Editorial copy */}
            <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12 lg:p-14">
              <p className="label-caps mb-4 text-[#B89A5A] sm:mb-5">The Calira Edit</p>
              <h2 className="text-brand-h2 sm:text-brand-h1 max-w-md leading-[1.1] text-balance text-[#F5F0E8] md:text-[2.75rem]">
                Be first to discover our{""}
                <span className="text-brand text-[#B89A5A] italic">newest dresses</span>
              </h2>

              <ul className="mt-8 space-y-3.5 sm:mt-10">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-[#F5F0E8]/85">
                    <span className="rounded-global flex h-8 w-8 shrink-0 items-center justify-center border border-[#B89A5A]/30 bg-[#F5F0E8]/10">
                      <Icon className="h-3.5 w-3.5 text-[#B89A5A]" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form panel */}
            <div className="flex items-center border-t border-[#F5F0E8]/10 bg-[#F5F0E8]/[0.07] p-8 backdrop-blur-sm sm:p-10 md:p-12 lg:border-t-0 lg:border-l lg:p-14">
              <div className="mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
                <div className="mb-6 sm:mb-8">
                  <div className="rounded-global mb-4 inline-flex h-12 w-12 items-center justify-center border border-[#B89A5A]/40 bg-[#B89A5A]/20">
                    <Mail className="h-5 w-5 text-[#B89A5A]" />
                  </div>
                  <h3 className="text-brand-h3 sm:text-brand-h2 text-[#F5F0E8]">Subscribe</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#F5F0E8]/60 sm:text-sm">
                    One thoughtful email per week. Unsubscribe anytime.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-none border-0 bg-[#F5F0E8] pr-4 pl-5 text-sm text-[#0F4A3A] shadow-inner placeholder:text-[#0F4A3A]/45 sm:h-[3.25rem]"
                      required
                      aria-label="Email address"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitted}
                    className="shadow-brand-card h-12 w-full rounded-none bg-[#B89A5A] font-medium tracking-wide text-[#1a2e28] hover:bg-[#c9ab6b] sm:h-[3.25rem]"
                  >
                    {submitted ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        You&apos;re on the list
                      </>
                    ) : (
                      <>
                        Join the list
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="mt-5 text-center text-[10px] leading-relaxed text-[#F5F0E8]/45 sm:text-xs lg:text-left">
                  By subscribing you agree to receive updates from Calira Couture. We respect your
                  privacy.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
