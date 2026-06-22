import { cn } from "@/lib/utils";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";

interface BrandLogoProps {
  className?: string;
  nameClassName?: string;
  taglineClassName?: string;
  variant?: "default" | "light";
}

export function BrandLogo({
  className,
  nameClassName,
  taglineClassName,
  variant = "default",
}: BrandLogoProps) {
  return (
    <span className={cn("flex flex-col leading-none gap-0.5", className)}>
      <span
        className={cn(
          "font-heading text-xl sm:text-2xl md:text-[1.85rem] font-semibold tracking-[0.04em]",
          variant === "light" ? "text-white" : "text-primary",
          nameClassName
        )}
      >
        {BRAND_NAME}
      </span>
      <span
        className={cn(
          "label-caps text-[0.55rem] sm:text-[0.6rem] tracking-[0.28em]",
          variant === "light" ? "text-white/70" : "text-accent",
          taglineClassName
        )}
      >
        {BRAND_TAGLINE}
      </span>
    </span>
  );
}
