import { cn} from"@/lib/utils"

function Skeleton({ className, ...props}: React.ComponentProps<"div">) {
 return (
 <div
 data-slot="skeleton"
 className={cn("animate-pulse rounded-global bg-brand-secondary-hover", className)}
 {...props}
 />
 )
}

export { Skeleton}
