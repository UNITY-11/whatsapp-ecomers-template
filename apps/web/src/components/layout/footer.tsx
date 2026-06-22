import Link from "next/link";
import { Container } from "@/components/shared/container";
import { BrandLogo } from "@/components/shared/brand-logo";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";
import { Globe, Link2 } from "lucide-react";
import { getSettings } from "@/services/content-service";

export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="border-t border-border/60 bg-secondary/30 mt-auto">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <BrandLogo className="mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {settings.storeDescription}
            </p>
            <div className="flex gap-4 mt-6">
              {settings.socialLinks?.instagram && (
                <Link href={settings.socialLinks.instagram} className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram">
                  <Link2 className="h-4 w-4" />
                </Link>
              )}
              {settings.socialLinks?.facebook && (
                <Link href={settings.socialLinks.facebook} className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook">
                  <Globe className="h-4 w-4" />
                </Link>
              )}
              {settings.socialLinks?.twitter && (
                <Link href={settings.socialLinks.twitter} className="text-muted-foreground hover:text-accent transition-colors" aria-label="Twitter">
                  <Link2 className="h-4 w-4" />
                </Link>
              )}
              {settings.socialLinks?.youtube && (
                <Link href={settings.socialLinks.youtube} className="text-muted-foreground hover:text-accent transition-colors" aria-label="YouTube">
                  <Globe className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          <div>
            <h4 className="label-caps mb-5">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-foreground transition-colors">All Dresses</Link></li>
              <li><Link href="/products?sort=newest" className="hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link href="/categories" className="hover:text-foreground transition-colors">Collections</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="label-caps mb-5">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/account/orders" className="hover:text-foreground transition-colors">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="label-caps mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              {settings.email && <li>{settings.email}</li>}
              {settings.phone && <li>{settings.phone}</li>}
              {settings.address && <li>{settings.address}</li>}
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground tracking-wide">
          <p>&copy; {new Date().getFullYear()} {settings.storeName || APP_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors uppercase tracking-widest">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
