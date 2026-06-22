import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  label,
  className,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  label?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-12 md:mb-14", align === "center" && "text-center", className)}>
      {label && (
        <p className={cn("label-caps mb-3", align === "center" && "mx-auto")}>{label}</p>
      )}
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl",
          align === "center" && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
      {align === "center" && (
        <div className="mt-6 mx-auto h-px w-12 bg-accent/60" />
      )}
    </div>
  );
}
