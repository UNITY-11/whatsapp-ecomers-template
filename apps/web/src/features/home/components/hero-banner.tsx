"use client";

import { useState, useEffect} from"react";
import Image from"next/image";
import Link from"next/link";
import { ArrowRight} from"lucide-react";
import { Button} from"@/shared/components/ui/button";
import { motion} from"framer-motion";
import type { Banner} from"@/shared/types";

export function HeroBanner({ banners}: { banners: Banner[]}) {
 const heroBanners = banners.filter((b) => b.type ==="hero");
 
 const [visibleCount, setVisibleCount] = useState(3);
 const [mounted, setMounted] = useState(false);

 // Duplicate exactly once to create a seamless 50% translation loop
 const extendedBanners = [...heroBanners, ...heroBanners];
 const totalOriginal = heroBanners.length;

 useEffect(() => {
 // eslint-disable-next-line react-hooks/set-state-in-effect
 setMounted(true);
 const updateVisible = () => {
 if (window.innerWidth >= 1024) setVisibleCount(3);
 else if (window.innerWidth >= 640) setVisibleCount(2);
 else setVisibleCount(1);
};
 updateVisible();
 window.addEventListener("resize", updateVisible);
 return () => window.removeEventListener("resize", updateVisible);
}, []);

 if (totalOriginal === 0) return null;

 return (
 <section className="relative h-screen w-full bg-[#0F4A3A] overflow-hidden flex flex-col justify-center">
 <div className="absolute inset-0 brand-gradient opacity-80"/>
 
 <div className="relative z-10 w-full h-full">
 <div className="overflow-hidden h-full flex w-full">
 <div 
 className="flex h-full w-max animate-marquee pause-on-hover"
 style={{ 
"--marquee-duration": `${totalOriginal * 8}s` 
} as React.CSSProperties}
 >
 {extendedBanners.map((banner, i) => (
 <div 
 key={i} 
 className="shrink-0 h-full"
 style={{ width: `${100 / (mounted ? visibleCount : 3)}vw`}} // Use vw so it scales relative to viewport
 >
 <div className="relative h-full w-full overflow-hidden group shadow-2xl">
 <Image
 src={banner.imageUrl ||"https://images.unsplash.com/photo-1441984904996-e0b6fe7783a0?w=1600"}
 alt={banner.title}
 fill
 className="object-cover transition-transform duration-1000 group-hover:scale-105"
 priority={i < totalOriginal + 3}
 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"/>
 
 <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col items-center text-center">
 <h2 className="text-brand-h2 sm:text-brand-h1 lg:text-brand-h1 font-brand font-medium text-white mb-4 leading-tight drop-shadow-brand-card">
 {banner.title}
 </h2>
 {banner.description && (
 <p className="text-white/80 text-sm sm:text-brand-h3 line-clamp-2 mb-8 font-light">
 {banner.description}
 </p>
 )}
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}
