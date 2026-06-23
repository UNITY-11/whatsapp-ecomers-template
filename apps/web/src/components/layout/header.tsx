"use client";

import Link from"next/link";
import { usePathname} from"next/navigation";
import { ShoppingBag, Heart, Menu} from"lucide-react";
import { useState, useEffect} from"react";
import { Button, buttonVariants} from"@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger} from"@/components/ui/sheet";
import { SearchBar} from"@/features/search/components/search-bar";
import { useCartStore} from"@/features/cart/store/cart-store";
import { useWishlistStore} from"@/features/wishlist/store/wishlist-store";
import { NAV_LINKS} from"@/lib/constants";
import { BrandLogo} from"@/components/shared/brand-logo";
import { Container} from"@/components/shared/container";
import { cn} from"@/lib/utils";
import { motion} from"framer-motion";

export function Header() {
 const pathname = usePathname();
 const [mobileOpen, setMobileOpen] = useState(false);
 const itemCount = useCartStore((s) => s.getItemCount());
 const setCartOpen = useCartStore((s) => s.setCartOpen);
 const wishlistCount = useWishlistStore((s) => s.items.length);

 const [mounted, setMounted] = useState(false);
 
 useEffect(() => {
 // eslint-disable-next-line react-hooks/set-state-in-effect
 setMounted(true);
}, []);

 return (
 <header className="fixed top-0 z-50 w-full border-b border-brand-border-global/60 bg-brand-surface/90 backdrop-blur-xl supports-backdrop-filter:bg-brand-surface/75">
 <Container className="px-3 sm:px-6">
 <div className="relative flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4 min-w-0">
 
 {/* Left: Menu & Search */}
 <div className="flex items-center gap-2 sm:gap-4 flex-1">
 <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
 <SheetTrigger className={cn(buttonVariants({ variant:"ghost", size:"icon"}),"rounded-global size-10 sm:size-11")}>
 <Menu className="size-[18px] sm:size-5 stroke-[1.5]"/>
 </SheetTrigger>
 <SheetContent side="left"className="w-full max-w-[min(100vw,20rem)] sm:max-w-xs border-r border-brand-border-global/60 p-4 sm:p-6 overflow-y-auto flex flex-col">
 <div className="flex flex-col gap-6 sm:gap-8 mt-4 sm:mt-8 pb-4 flex-1">
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
 className="font-brand text-brand-h2 sm:text-brand-h2 font-medium tracking-tight text-brand-primary border-b border-brand-border-global/60 pb-3 hover:text-accent transition-colors"
 >
 {link.label}
 </Link>
 ))}
 </nav>

 <div className="mt-auto pt-8 flex items-center gap-5">
 <a href="https://facebook.com"target="_blank"rel="noopener noreferrer"className="p-2.5 rounded-global bg-brand-secondary text-brand-text-foreground hover:bg-brand-primary hover:text-brand-primary-foreground transition-colors"aria-label="Facebook">
 <svg xmlns="http://www.w3.org/2000/svg"width="24"height="24"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
 </a>
 <a href="https://instagram.com"target="_blank"rel="noopener noreferrer"className="p-2.5 rounded-global bg-brand-secondary text-brand-text-foreground hover:bg-brand-primary hover:text-brand-primary-foreground transition-colors"aria-label="Instagram">
 <svg xmlns="http://www.w3.org/2000/svg"width="24"height="24"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"className="h-5 w-5"><rect width="20"height="20"x="2"y="2"rx="5"ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5"x2="17.51"y1="6.5"y2="6.5"/></svg>
 </a>
 <a href="https://x.com"target="_blank"rel="noopener noreferrer"className="p-2.5 rounded-global bg-brand-secondary text-brand-text-foreground hover:bg-brand-primary hover:text-brand-primary-foreground transition-colors"aria-label="X (Twitter)">
 <svg xmlns="http://www.w3.org/2000/svg"width="24"height="24"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
 </a>
 </div>
 </div>
 </SheetContent>
 </Sheet>
 <div className="hidden lg:flex min-w-0 w-48 xl:w-64">
 <SearchBar />
 </div>
 </div>

 {/* Center: Logo */}
 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
 <Link href="/"className="flex items-center shrink-0 min-w-0 group">
 <motion.div whileHover={{ opacity: 0.85}} transition={{ duration: 0.2}}>
 <BrandLogo className="h-8 sm:h-10 w-auto"/>
 </motion.div>
 </Link>
 </div>

 {/* Right: Actions */}
 <div className="flex items-center justify-end flex-1 shrink-0">
 <Button variant="ghost"size="icon"className="relative rounded-global size-10 sm:size-11"asChild>
 <Link href="/wishlist"aria-label="Wishlist">
 <Heart className="size-[18px] sm:size-5 stroke-[1.25]"/>
 {mounted && wishlistCount > 0 && (
 <span className="absolute top-0 right-0 h-4 min-w-4 sm:h-5 sm:min-w-5 px-1 rounded-global bg-accent text-[10px] sm:text-[11px] text-brand-text flex items-center justify-center font-medium">
 {wishlistCount}
 </span>
 )}
 </Link>
 </Button>
 <Button
 variant="ghost"
 size="icon"
 className="relative rounded-global size-10 sm:size-11"
 onClick={() => setCartOpen(true)}
 aria-label="Cart"
 >
 <ShoppingBag className="size-[18px] sm:size-5 stroke-[1.25]"/>
 {mounted && itemCount > 0 && (
 <span className="absolute top-0 right-0 h-4 min-w-4 sm:h-5 sm:min-w-5 px-1 rounded-global bg-accent text-[10px] sm:text-[11px] text-brand-text flex items-center justify-center font-medium">
 {itemCount}
 </span>
 )}
 </Button>
 </div>
 </div>
 </Container>
 </header>
 );
}
