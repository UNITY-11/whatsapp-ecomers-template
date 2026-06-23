import { cn} from"@/lib/utils";
import { BRAND_NAME, BRAND_TAGLINE} from"@/lib/constants";

interface BrandLogoProps {
 className?: string;
 nameClassName?: string;
 taglineClassName?: string;
 variant?:"default"|"light";
}

export function BrandLogo({
 className,
 nameClassName,
 taglineClassName,
 variant ="default",
}: BrandLogoProps) {
 return (
 <span className={cn("flex flex-col leading-none gap-0.5", className)}>
 <span
 className={cn(
"font-bold tracking-wider uppercase",
 variant ==="light"?"text-white":"text-[#1a2e28]",
 nameClassName
 )}
 >
 {BRAND_NAME}
 <span className="text-[#B89A5A] drop-shadow-[0_0_8px_rgba(184,154,90,0.3)]">.</span>
 </span>
 </span>
 );
}
