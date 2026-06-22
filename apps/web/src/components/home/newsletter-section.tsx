"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, Gift, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/constants";
import { toast } from "sonner";

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
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#0F4A3A]/10 shadow-xl shadow-[#0F4A3A]/5"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-[#0F4A3A]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,_#B89A5A33,_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_100%,_#F5F0E810,_transparent_50%)]" />
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#B89A5A]/20"
            aria-hidden
          />
          <div
            className="absolute -left-8 bottom-8 h-40 w-40 rounded-full border border-[#F5F0E8]/10"
            aria-hidden
          />

          <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
            {/* Editorial copy */}
            <div className="p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center">
              <p className="label-caps text-[#B89A5A] mb-4 sm:mb-5">The Calira Edit</p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] text-[#F5F0E8] text-balance max-w-md">
                Be first to discover our{" "}
                <span className="italic text-[#B89A5A]">newest dresses</span>
              </h2>
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#F5F0E8]/75 leading-relaxed max-w-md">
                Join {BRAND_NAME}&apos;s inner circle for collection previews, fit guides, and
                invitations to private styling sessions.
              </p>

              <ul className="mt-8 sm:mt-10 space-y-3.5">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-[#F5F0E8]/85">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5F0E8]/10 border border-[#B89A5A]/30">
                      <Icon className="h-3.5 w-3.5 text-[#B89A5A]" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form panel */}
            <div className="p-8 sm:p-10 md:p-12 lg:p-14 flex items-center bg-[#F5F0E8]/[0.07] backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-[#F5F0E8]/10">
              <div className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                <div className="mb-6 sm:mb-8">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#B89A5A]/20 border border-[#B89A5A]/40 mb-4">
                    <Mail className="h-5 w-5 text-[#B89A5A]" />
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl text-[#F5F0E8]">
                    Subscribe
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F5F0E8]/60 mt-2 leading-relaxed">
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
                      className="h-12 sm:h-[3.25rem] rounded-full bg-[#F5F0E8] text-[#0F4A3A] border-0 pl-5 pr-4 text-sm placeholder:text-[#0F4A3A]/45 shadow-inner"
                      required
                      aria-label="Email address"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitted}
                    className="w-full h-12 sm:h-[3.25rem] rounded-full bg-[#B89A5A] text-[#1a2e28] hover:bg-[#c9ab6b] font-medium tracking-wide shadow-md"
                  >
                    {submitted ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        You&apos;re on the list
                      </>
                    ) : (
                      <>
                        Join the list
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="mt-5 text-[10px] sm:text-xs text-[#F5F0E8]/45 leading-relaxed text-center lg:text-left">
                  By subscribing you agree to receive updates from Calira Couture.
                  We respect your privacy.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
