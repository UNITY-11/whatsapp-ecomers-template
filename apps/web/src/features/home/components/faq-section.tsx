"use client";

import { Container, SectionHeading } from "@/shared/components/shared/container";
import { MotionWrapper } from "@/shared/components/shared/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import type { FAQ } from "@/shared/types";

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="bg-brand-secondary-hover/30 py-14 sm:py-20 md:py-24">
      <Container className="max-w-3xl">
        <SectionHeading title="Frequently Asked Questions" label="Help" />
        <MotionWrapper>
          <Accordion className="divide-border/60 w-full divide-y">
            {faqs.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id} className="border-0 py-1">
                <AccordionTrigger className="py-5 text-left text-sm font-medium tracking-wide hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-brand-text/70 pb-5 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MotionWrapper>
      </Container>
    </section>
  );
}
