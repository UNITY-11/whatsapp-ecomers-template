import Link from "next/link";
import { Globe, Link2 } from "lucide-react";

import { BrandLogo } from "@/shared/components/shared/brand-logo";
import { Container } from "@/shared/components/shared/container";
import { APP_NAME, NAV_LINKS } from "@/shared/lib/constants";
import { getSettings } from "@/shared/services/content-service";

export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="bg-brand-primary mt-auto text-[#f5f0e8]">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <BrandLogo variant="light" className="mb-4" />
            <p className="max-w-xs text-sm leading-relaxed text-[#f5f0e8]/70">
              {settings.storeDescription}
            </p>
            <div className="mt-6 flex gap-4">
              {settings.socialLinks?.instagram && (
                <Link
                  href={settings.socialLinks.instagram}
                  className="hover:text-accent text-[#f5f0e8]/70 transition-colors"
                  aria-label="Instagram"
                >
                  <Link2 className="h-4 w-4" />
                </Link>
              )}
              {settings.socialLinks?.facebook && (
                <Link
                  href={settings.socialLinks.facebook}
                  className="hover:text-accent text-[#f5f0e8]/70 transition-colors"
                  aria-label="Facebook"
                >
                  <Globe className="h-4 w-4" />
                </Link>
              )}
              {settings.socialLinks?.twitter && (
                <Link
                  href={settings.socialLinks.twitter}
                  className="hover:text-accent text-[#f5f0e8]/70 transition-colors"
                  aria-label="Twitter"
                >
                  <Link2 className="h-4 w-4" />
                </Link>
              )}
              {settings.socialLinks?.youtube && (
                <Link
                  href={settings.socialLinks.youtube}
                  className="hover:text-accent text-[#f5f0e8]/70 transition-colors"
                  aria-label="YouTube"
                >
                  <Globe className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          <div>
            <h4 className="label-caps mb-5">Shop</h4>
            <ul className="space-y-3 text-sm text-[#f5f0e8]/70">
              <li>
                <Link href="/products" className="transition-colors hover:text-white">
                  All Dresses
                </Link>
              </li>
              <li>
                <Link href="/products?sort=newest" className="transition-colors hover:text-white">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/categories" className="transition-colors hover:text-white">
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="label-caps mb-5">Support</h4>
            <ul className="space-y-3 text-sm text-[#f5f0e8]/70">
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="transition-colors hover:text-white">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="label-caps mb-5">Contact</h4>
            <ul className="space-y-3 text-sm leading-relaxed text-[#f5f0e8]/70">
              {settings.email && <li>{settings.email}</li>}
              {settings.phone && <li>{settings.phone}</li>}
              {settings.address && <li>{settings.address}</li>}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#f5f0e8]/20 pt-8 text-xs tracking-wide text-[#f5f0e8]/70 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {settings.storeName || APP_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="tracking-widest uppercase transition-colors hover:text-white"
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
