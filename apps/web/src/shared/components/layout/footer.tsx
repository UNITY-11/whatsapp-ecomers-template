import Link from "next/link";
import { Globe, Link2 } from "lucide-react";

import { BrandLogo } from "@/shared/components/shared/brand-logo";
import { Container } from "@/shared/components/shared/container";
import { APP_NAME, NAV_LINKS } from "@/shared/lib/constants";
import { getSettings } from "@/shared/services/content-service";

export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="border-brand-border-global/60 bg-brand-secondary/30 mt-auto border-t">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <BrandLogo className="mb-4" />
            <p className="text-brand-text/70 max-w-xs text-sm leading-relaxed">
              {settings.storeDescription}
            </p>
            <div className="mt-6 flex gap-4">
              {settings.socialLinks?.instagram && (
                <Link
                  href={settings.socialLinks.instagram}
                  className="text-brand-text/70 hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Link2 className="h-4 w-4" />
                </Link>
              )}
              {settings.socialLinks?.facebook && (
                <Link
                  href={settings.socialLinks.facebook}
                  className="text-brand-text/70 hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Globe className="h-4 w-4" />
                </Link>
              )}
              {settings.socialLinks?.twitter && (
                <Link
                  href={settings.socialLinks.twitter}
                  className="text-brand-text/70 hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  <Link2 className="h-4 w-4" />
                </Link>
              )}
              {settings.socialLinks?.youtube && (
                <Link
                  href={settings.socialLinks.youtube}
                  className="text-brand-text/70 hover:text-accent transition-colors"
                  aria-label="YouTube"
                >
                  <Globe className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          <div>
            <h4 className="label-caps mb-5">Shop</h4>
            <ul className="text-brand-text/70 space-y-3 text-sm">
              <li>
                <Link href="/products" className="hover:text-foreground transition-colors">
                  All Dresses
                </Link>
              </li>
              <li>
                <Link
                  href="/products?sort=newest"
                  className="hover:text-foreground transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-foreground transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="label-caps mb-5">Support</h4>
            <ul className="text-brand-text/70 space-y-3 text-sm">
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-foreground transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="label-caps mb-5">Contact</h4>
            <ul className="text-brand-text/70 space-y-3 text-sm leading-relaxed">
              {settings.email && <li>{settings.email}</li>}
              {settings.phone && <li>{settings.phone}</li>}
              {settings.address && <li>{settings.address}</li>}
            </ul>
          </div>
        </div>
        <div className="border-brand-border-global/60 text-brand-text/70 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs tracking-wide sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {settings.storeName || APP_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground tracking-widest uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
