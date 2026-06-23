"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";

import { BrandLogo } from "@/shared/components/shared/brand-logo";
import { Container } from "@/shared/components/shared/container";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet";
import { NAV_LINKS } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";
import { useCartStore } from "@/features/cart/store/cart-store";
import { SearchBar } from "@/features/search/components/search-bar";
import { useWishlistStore } from "@/features/wishlist/store/wishlist-store";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="bg-brand-primary text-[#f5f0e8] fixed top-0 z-50 w-full backdrop-blur-md">
      <Container className="px-3 sm:px-6">
        <div className="relative flex h-14 min-w-0 items-center justify-between gap-2 sm:h-16 sm:gap-4">
          {/* Left: Menu & Search */}
          <div className="flex flex-1 items-center gap-2 sm:gap-4">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-global size-10 sm:size-11 hover:text-[#0f4a3a]"
                )}
              >
                <Menu className="size-[18px] stroke-[1.5] sm:size-5" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="border-brand-border-global/60 flex w-full max-w-[min(100vw,20rem)] flex-col overflow-y-auto border-r p-4 sm:max-w-xs sm:p-6"
              >
                <div className="mt-4 flex flex-1 flex-col gap-6 pb-4 sm:mt-8 sm:gap-8">
                  <SearchBar inlineResults onNavigate={() => setMobileOpen(false)} />
                  <nav className="flex flex-col gap-4 sm:gap-5">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-brand text-brand-h2 sm:text-brand-h2 text-brand-primary border-brand-border-global/60 hover:text-accent border-b pb-3 font-medium tracking-tight transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto flex items-center gap-5 pt-8">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-global bg-brand-secondary text-brand-text-foreground hover:bg-brand-primary hover:text-brand-primary-foreground p-2.5 transition-colors"
                      aria-label="Facebook"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-global bg-brand-secondary text-brand-text-foreground hover:bg-brand-primary hover:text-brand-primary-foreground p-2.5 transition-colors"
                      aria-label="Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </a>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-global bg-brand-secondary text-brand-text-foreground hover:bg-brand-primary hover:text-brand-primary-foreground p-2.5 transition-colors"
                      aria-label="X (Twitter)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Center: Logo */}
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <Link href="/" className="group flex min-w-0 shrink-0 items-center justify-center">
              <motion.div whileHover={{ opacity: 0.85 }} transition={{ duration: 0.2 }} className="flex items-center justify-center">
                <BrandLogo variant="light" className="text-3xl italic sm:text-4xl" />
              </motion.div>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className={cn("flex flex-1 shrink-0 items-center justify-end transition-opacity", searchOpen && "opacity-0")}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-global relative size-10 sm:size-11 hover:text-[#0f4a3a]"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="size-[18px] stroke-[1.25] sm:size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-global relative size-10 sm:size-11 hover:text-[#0f4a3a]"
              asChild
            >
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="size-[18px] stroke-[1.25] sm:size-5" />
                {mounted && wishlistCount > 0 && (
                  <span className="rounded-global bg-accent text-brand-text absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center px-1 text-[10px] font-medium sm:h-5 sm:min-w-5 sm:text-[11px]">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-global relative size-10 sm:size-11 hover:text-[#0f4a3a]"
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag className="size-[18px] stroke-[1.25] sm:size-5" />
              {mounted && itemCount > 0 && (
                <span className="rounded-global bg-accent text-brand-text absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center px-1 text-[10px] font-medium sm:h-5 sm:min-w-5 sm:text-[11px]">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>

          {/* Search Overlay */}
          {searchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 z-50 flex items-center bg-brand-primary gap-2"
            >
              <div className="flex-1 w-full max-w-2xl mx-auto">
                <SearchBar onNavigate={() => setSearchOpen(false)} />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="shrink-0 hover:text-[#0f4a3a]"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="size-5" />
              </Button>
            </motion.div>
          )}
        </div>
      </Container>
    </header>
  );
}
