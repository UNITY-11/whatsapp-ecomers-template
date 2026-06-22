"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, User, Menu } from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "@/components/search/search-bar";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { NAV_LINKS } from "@/lib/constants";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-xl supports-backdrop-filter:bg-background/75">
      <Container className="px-3 sm:px-6">
        <div className="flex h-14 sm:h-16 md:h-20 items-center justify-between gap-2 sm:gap-4 min-w-0">
          <Link href="/" className="flex items-center shrink-0 min-w-0 max-w-[45%] sm:max-w-none group">
            <motion.div whileHover={{ opacity: 0.85 }} transition={{ duration: 0.2 }}>
              <BrandLogo />
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "label-caps transition-colors hover:text-foreground whitespace-nowrap",
                  pathname === link.href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex flex-1 justify-end min-w-0 max-w-xs lg:max-w-sm ml-2">
            <SearchBar />
          </div>

          <div className="flex items-center gap-0 shrink-0">
            <Button variant="ghost" size="icon" className="relative rounded-full size-8 sm:size-9" asChild>
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem] stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-3.5 min-w-3.5 sm:h-4 sm:min-w-4 px-0.5 rounded-full bg-accent text-[9px] sm:text-[10px] text-accent-foreground flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full size-8 sm:size-9"
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem] stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-3.5 min-w-3.5 sm:h-4 sm:min-w-4 px-0.5 rounded-full bg-accent text-[9px] sm:text-[10px] text-accent-foreground flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full size-8 sm:size-9 hidden sm:inline-flex" asChild>
              <Link href="/account" aria-label="Account">
                <User className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem] stroke-[1.5]" />
              </Link>
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden rounded-full size-8 sm:size-9")}>
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-[min(100vw,20rem)] sm:max-w-xs border-l border-border/60 p-4 sm:p-6 overflow-y-auto">
                <div className="flex flex-col gap-6 sm:gap-8 mt-4 sm:mt-8 pb-4">
                  <SearchBar
                    inlineResults
                    onNavigate={() => setMobileOpen(false)}
                  />
                  <nav className="flex flex-col gap-4 sm:gap-5">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-heading text-xl sm:text-2xl font-medium tracking-tight hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/account"
                      onClick={() => setMobileOpen(false)}
                      className="font-heading text-xl sm:text-2xl font-medium tracking-tight hover:text-accent transition-colors sm:hidden"
                    >
                      Account
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
