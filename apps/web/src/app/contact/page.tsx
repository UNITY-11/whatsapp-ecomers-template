import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import { Container, SectionHeading } from "@/shared/components/shared/container";
import { WhatsAppIcon } from "@/shared/components/shared/whatsapp-icon";
import { Button } from "@/shared/components/ui/button";
import { BRAND_NAME, CONTACT_PHONE_DISPLAY } from "@/shared/lib/constants";
import { getTelHref, getWhatsAppHref } from "@/shared/lib/contact";
import { cn } from "@/shared/lib/utils";
import { getSettings } from "@/shared/services/content-service";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${BRAND_NAME}. Chat on WhatsApp or call us for styling advice, orders, and enquiries.`,
};

function ContactCard({
  icon,
  label,
  children,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-global border-brand-border-global/60 bg-brand-surface shadow-brand-card flex gap-4 border p-5",
        className
      )}
    >
      <div className="rounded-global bg-brand-secondary text-brand-primary flex size-11 shrink-0 items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="label-caps mb-1">{label}</p>
        {children}
      </div>
    </div>
  );
}

export default async function ContactPage() {
  const settings = await getSettings();
  const whatsappHref = getWhatsAppHref();
  const telHref = getTelHref();

  return (
    <Container className="py-8 sm:py-12 lg:py-16">
      <SectionHeading
        label="Get in Touch"
        title="We'd Love to Hear From You"
        subtitle="Questions about sizing, styling, or your order? Reach out — we typically reply within a few hours on WhatsApp."
        align="left"
        className="mb-10 max-w-2xl sm:mb-12"
      />

      <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
        <div className="space-y-4 lg:col-span-3">
          <ContactCard icon={<WhatsAppIcon className="size-5 text-[#25D366]" />} label="WhatsApp">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-foreground hover:text-brand-primary inline-flex items-center gap-1 font-medium transition-colors"
            >
              {CONTACT_PHONE_DISPLAY}
              <ArrowUpRight className="size-3.5 opacity-60 group-hover:opacity-100" />
            </a>
            <p className="text-brand-text/70 mt-1 text-sm">Fastest way to reach our styling team</p>
          </ContactCard>

          <ContactCard icon={<Phone className="size-5" />} label="Phone">
            <a
              href={telHref}
              className="group text-foreground hover:text-brand-primary inline-flex items-center gap-1 font-medium transition-colors"
            >
              {CONTACT_PHONE_DISPLAY}
              <ArrowUpRight className="size-3.5 opacity-60 group-hover:opacity-100" />
            </a>
            <p className="text-brand-text/70 mt-1 text-sm">
              Call for urgent order or delivery queries
            </p>
          </ContactCard>

          {settings.email && (
            <ContactCard icon={<Mail className="size-5" />} label="Email">
              <a
                href={`mailto:${settings.email}`}
                className="text-foreground hover:text-brand-primary font-medium break-all transition-colors"
              >
                {settings.email}
              </a>
            </ContactCard>
          )}

          {settings.address && (
            <ContactCard icon={<MapPin className="size-5" />} label="Studio">
              <p className="text-foreground/90 text-sm leading-relaxed">{settings.address}</p>
            </ContactCard>
          )}

          <ContactCard icon={<Clock className="size-5" />} label="Hours">
            <p className="text-foreground/90 text-sm">Monday – Saturday, 10:00 AM – 7:00 PM IST</p>
            <p className="text-brand-text/70 mt-1 text-sm">WhatsApp messages welcome anytime</p>
          </ContactCard>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-global border-brand-primary/15 from-primary/8 via-card to-accent/10 shadow-brand-card sticky top-24 border bg-gradient-to-br p-6 sm:p-8">
            <p className="label-caps text-accent mb-3">Concierge</p>
            <h2 className="font-brand text-brand-h2 sm:text-brand-h2 text-brand-primary mb-3 leading-tight">
              Personal styling &amp; orders
            </h2>
            <p className="text-brand-text/70 mb-6 text-sm leading-relaxed sm:text-base">
              Share your occasion, preferred silhouette, or dress link — we&apos;ll help you find
              the perfect fit from our collection.
            </p>
            <div className="space-y-3">
              <Button
                className="rounded-global h-11 w-full border-0 bg-[#25D366] text-white hover:bg-[#20bd5a]"
                asChild
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-2 size-5" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button
                variant="outline"
                className="rounded-global border-brand-primary/30 text-brand-primary hover:bg-brand-primary/5 h-11 w-full"
                asChild
              >
                <a href={telHref}>
                  <Phone className="mr-2 size-4" />
                  Call {CONTACT_PHONE_DISPLAY}
                </a>
              </Button>
            </div>
            <p className="text-brand-text/70 mt-6 text-xs leading-relaxed">
              Prefer browsing first?{""}
              <Link
                href="/products"
                className="text-brand-primary underline-offset-4 hover:underline"
              >
                Explore our dresses
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
