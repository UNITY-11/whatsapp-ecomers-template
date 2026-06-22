"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
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

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-xl supports-backdrop-filter:bg-background/75">
      <Container className="px-3 sm:px-6">
        <div className="relative flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4 min-w-0">
          
          {/* Left: Menu & Search */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full size-10 sm:size-11")}>
                <Menu className="h-6 w-6 sm:h-7 sm:w-7 stroke-[1.5]" />
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-[min(100vw,20rem)] sm:max-w-xs border-r border-border/60 p-4 sm:p-6 overflow-y-auto">
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
                        className="font-heading text-2xl sm:text-3xl font-medium tracking-tight hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <div className="hidden md:flex min-w-0 max-w-xs">
              <SearchBar />
            </div>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex items-center shrink-0 min-w-0 group">
              <motion.div whileHover={{ opacity: 0.85 }} transition={{ duration: 0.2 }}>
                <BrandLogo className="h-8 sm:h-10 w-auto" />
              </motion.div>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-1 sm:gap-2 flex-1 shrink-0">
            <Button variant="ghost" size="icon" className="relative rounded-full size-10 sm:size-11" asChild>
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="h-6 w-6 sm:h-7 sm:w-7 stroke-[1.25]" />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 min-w-4 sm:h-5 sm:min-w-5 px-1 rounded-full bg-accent text-[10px] sm:text-[11px] text-accent-foreground flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full size-10 sm:size-11"
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag className="h-6 w-6 sm:h-7 sm:w-7 stroke-[1.25]" />
              {mounted && itemCount > 0 && (
                <span className="absolute top-0 right-0 h-4 min-w-4 sm:h-5 sm:min-w-5 px-1 rounded-full bg-accent text-[10px] sm:text-[11px] text-accent-foreground flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full size-10 sm:size-11 hidden sm:inline-flex" asChild>
              <Link href="/account" aria-label="Account">
                <User className="h-6 w-6 sm:h-7 sm:w-7 stroke-[1.25]" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
