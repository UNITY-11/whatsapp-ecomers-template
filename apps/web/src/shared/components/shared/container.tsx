import { cn } from "@/shared/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("max-w-brand mx-auto w-full px-4 sm:px-6 lg:px-10", className)}>
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
      {label && <p className={cn("label-caps mb-3", align === "center" && "mx-auto")}>{label}</p>}
      <h2 className="font-brand text-brand-h2 sm:text-brand-h2 md:text-brand-h1 leading-[1.15] text-balance lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-brand-text/70 md:text-brand-h3 mt-4 max-w-xl text-base leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
      {align === "center" && <div className="bg-accent/60 mx-auto mt-6 h-px w-12" />}
    </div>
  );
}
