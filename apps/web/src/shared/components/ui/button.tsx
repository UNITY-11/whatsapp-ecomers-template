import * as React from"react";
import { Button as ButtonPrimitive} from"@base-ui/react/button";
import { cva, type VariantProps} from"class-variance-authority";

import { cn} from"@/shared/lib/utils";

const buttonVariants = cva(
"group/button inline-flex shrink-0 items-center justify-center rounded-global border border-transparent bg-clip-padding text-sm font-medium tracking-wide whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-brand-focus-ring/50 active:not-aria-[haspopup]:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
 {
 variants: {
 variant: {
 default:"bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 shadow-brand-card",
 outline:
"border-brand-border-global bg-brand-surface hover:bg-brand-secondary-hover hover:text-foreground aria-expanded:bg-brand-secondary-hover aria-expanded:text-foreground",
 secondary:
"bg-brand-secondary text-brand-text-foreground hover:bg-brand-secondary/80",
 ghost:
"hover:bg-brand-secondary-hover/80 hover:text-foreground rounded-global",
 destructive:
"bg-destructive/10 text-destructive hover:bg-destructive/20",
 link:"text-foreground underline-offset-4 hover:underline rounded-none",
 luxury:
"bg-accent text-brand-text hover:bg-accent/90 shadow-brand-card",
},
 size: {
 default:"h-9 gap-1.5 px-5",
 xs:"h-7 gap-1 px-3 text-xs",
 sm:"h-8 gap-1.5 px-4 text-[0.8rem]",
 lg:"h-11 gap-2 px-8 text-sm",
 icon:"size-9 rounded-global",
"icon-xs":"size-7 rounded-global [&_svg:not([class*='size-'])]:size-3",
"icon-sm":"size-8 rounded-global",
"icon-lg":"size-11 rounded-global",
},
},
 defaultVariants: {
 variant:"default",
 size:"default",
},
}
);

type ButtonProps = ButtonPrimitive.Props &
 VariantProps<typeof buttonVariants> & {
 asChild?: boolean;
};

function Button({
 className,
 variant ="default",
 size ="default",
 asChild = false,
 children,
 ...props
}: ButtonProps) {
 const classes = cn(buttonVariants({ variant, size, className}));

 if (asChild && React.isValidElement(children)) {
 return React.cloneElement(children as React.ReactElement<{ className?: string}>, {
 className: cn(classes, (children as React.ReactElement<{ className?: string}>).props.className),
 ...props,
});
}

 return (
 <ButtonPrimitive
 data-slot="button"
 className={classes}
 {...props}
 >
 {children}
 </ButtonPrimitive>
 );
}

export { Button, buttonVariants};
