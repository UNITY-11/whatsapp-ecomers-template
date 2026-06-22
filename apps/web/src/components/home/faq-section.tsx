"use client";

import { Container, SectionHeading } from "@/components/shared/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MotionWrapper } from "@/components/shared/motion";
import type { FAQ } from "@/types";

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="py-14 sm:py-20 md:py-24 bg-muted/30">
      <Container className="max-w-3xl">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about shopping with us."
          label="Help"
        />
        <MotionWrapper>
          <Accordion className="w-full divide-y divide-border/60">
            {faqs.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id} className="border-0 py-1">
                <AccordionTrigger className="text-left font-medium text-sm tracking-wide py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
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
