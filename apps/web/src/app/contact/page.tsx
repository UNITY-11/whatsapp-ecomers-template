import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/shared/container";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { getSettings } from "@/services/content-service";
import { BRAND_NAME, CONTACT_PHONE_DISPLAY } from "@/lib/constants";
import { getTelHref, getWhatsAppHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

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
    <div className={cn("flex gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm", className)}>
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
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
        className="mb-10 sm:mb-12 max-w-2xl"
      />

      <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
        <div className="space-y-4 lg:col-span-3">
          <ContactCard
            icon={<WhatsAppIcon className="size-5 text-[#25D366]" />}
            label="WhatsApp"
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
            >
              {CONTACT_PHONE_DISPLAY}
              <ArrowUpRight className="size-3.5 opacity-60 group-hover:opacity-100" />
            </a>
            <p className="mt-1 text-sm text-muted-foreground">Fastest way to reach our styling team</p>
          </ContactCard>

          <ContactCard icon={<Phone className="size-5" />} label="Phone">
            <a
              href={telHref}
              className="group inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
            >
              {CONTACT_PHONE_DISPLAY}
              <ArrowUpRight className="size-3.5 opacity-60 group-hover:opacity-100" />
            </a>
            <p className="mt-1 text-sm text-muted-foreground">Call for urgent order or delivery queries</p>
          </ContactCard>

          {settings.email && (
            <ContactCard icon={<Mail className="size-5" />} label="Email">
              <a
                href={`mailto:${settings.email}`}
                className="font-medium text-foreground hover:text-primary transition-colors break-all"
              >
                {settings.email}
              </a>
            </ContactCard>
          )}

          {settings.address && (
            <ContactCard icon={<MapPin className="size-5" />} label="Studio">
              <p className="text-sm leading-relaxed text-foreground/90">{settings.address}</p>
            </ContactCard>
          )}

          <ContactCard icon={<Clock className="size-5" />} label="Hours">
            <p className="text-sm text-foreground/90">Monday – Saturday, 10:00 AM – 7:00 PM IST</p>
            <p className="mt-1 text-sm text-muted-foreground">WhatsApp messages welcome anytime</p>
          </ContactCard>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/8 via-card to-accent/10 p-6 sm:p-8 shadow-sm">
            <p className="label-caps mb-3 text-accent">Concierge</p>
            <h2 className="font-heading text-2xl sm:text-3xl text-primary leading-tight mb-3">
              Personal styling &amp; orders
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Share your occasion, preferred silhouette, or dress link — we&apos;ll help you find the perfect fit from our collection.
            </p>
            <div className="space-y-3">
              <Button
                className="w-full h-11 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-0"
                asChild
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button variant="outline" className="w-full h-11 rounded-full border-primary/30 text-primary hover:bg-primary/5" asChild>
                <a href={telHref}>
                  <Phone className="size-4 mr-2" />
                  Call {CONTACT_PHONE_DISPLAY}
                </a>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
              Prefer browsing first?{" "}
              <Link href="/products" className="text-primary underline-offset-4 hover:underline">
                Explore our dresses
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
