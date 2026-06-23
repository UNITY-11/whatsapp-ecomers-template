"use client";

import { Search, X} from"lucide-react";
import { Input} from"@/components/ui/input";
import { Button} from"@/components/ui/button";
import { Slider} from"@/components/ui/slider";
import { cn} from"@/lib/utils";
import type { Category, Brand} from"@/types";

export interface ProductFilterState {
 search: string;
 category: string;
 brand: string;
 priceRange: [number, number];
}

interface ProductFiltersProps {
 filters: ProductFilterState;
 categories: Category[];
 brands: Brand[];
 onChange: (patch: Partial<ProductFilterState>) => void;
 onClear: () => void;
 className?: string;
 variant?:"sidebar"|"sheet";
}

function FilterSection({
 title,
 children,
}: {
 title: string;
 children: React.ReactNode;
}) {
 return (
 <div className="rounded-global border border-brand-border-global/60 bg-brand-surface/50 p-4">
 <h4 className="label-caps text-accent mb-3">{title}</h4>
 {children}
 </div>
 );
}

export function ProductFilters({
 filters,
 categories,
 brands,
 onChange,
 onClear,
 className,
 variant ="sidebar",
}: ProductFiltersProps) {
 const hasActive =
 filters.search ||
 filters.category ||
 filters.brand ||
 filters.priceRange[0] > 0 ||
 filters.priceRange[1] < 15000;

 return (
 <div className={cn("space-y-4", className)}>
 {variant ==="sidebar"&& (
 <div className="flex items-center justify-between mb-1">
 <p className="font-brand text-brand-h3 text-brand-primary">Refine</p>
 {hasActive && (
 <Button variant="ghost"size="sm"className="h-8 text-xs rounded-global"onClick={onClear}>
 Clear all
 </Button>
 )}
 </div>
 )}

 <FilterSection title="Search">
 <div className="relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text/70"/>
 <Input
 placeholder="Dress name, style..."
 value={filters.search}
 onChange={(e) => onChange({ search: e.target.value})}
 className="pl-9 h-10 rounded-global bg-brand-surface"
 />
 </div>
 </FilterSection>

 <FilterSection title="Collection">
 <div className="flex flex-wrap gap-2">
 <button
 type="button"
 onClick={() => onChange({ category:""})}
 className={cn(
"px-3 py-1.5 rounded-global text-xs font-medium border transition-colors",
 !filters.category
 ?"bg-brand-primary text-brand-primary-foreground border-brand-primary"
 :"bg-brand-surface border-brand-border-global/80 text-brand-text/70 hover:border-brand-primary/40"
 )}
 >
 All
 </button>
 {categories.map((c) => (
 <button
 key={c._id}
 type="button"
 onClick={() => onChange({ category: c.slug.current})}
 className={cn(
"px-3 py-1.5 rounded-global text-xs font-medium border transition-colors whitespace-nowrap",
 filters.category === c.slug.current
 ?"bg-brand-primary text-brand-primary-foreground border-brand-primary"
 :"bg-brand-surface border-brand-border-global/80 text-brand-text/70 hover:border-brand-primary/40"
 )}
 >
 {c.name}
 </button>
 ))}
 </div>
 </FilterSection>

 <FilterSection title="Brand">
 <div className="flex flex-wrap gap-2">
 <button
 type="button"
 onClick={() => onChange({ brand:""})}
 className={cn(
"px-3 py-1.5 rounded-global text-xs font-medium border transition-colors",
 !filters.brand
 ?"bg-brand-primary text-brand-primary-foreground border-brand-primary"
 :"bg-brand-surface border-brand-border-global/80 text-brand-text/70 hover:border-brand-primary/40"
 )}
 >
 All
 </button>
 {brands.map((b) => (
 <button
 key={b._id}
 type="button"
 onClick={() => onChange({ brand: b.slug.current})}
 className={cn(
"px-3 py-1.5 rounded-global text-xs font-medium border transition-colors whitespace-nowrap",
 filters.brand === b.slug.current
 ?"bg-brand-primary text-brand-primary-foreground border-brand-primary"
 :"bg-brand-surface border-brand-border-global/80 text-brand-text/70 hover:border-brand-primary/40"
 )}
 >
 {b.name}
 </button>
 ))}
 </div>
 </FilterSection>

 <FilterSection title="Price">
 <Slider
 min={0}
 max={15000}
 step={500}
 value={filters.priceRange}
 onValueChange={(v) => {
 if (Array.isArray(v) && v.length === 2) onChange({ priceRange: [v[0], v[1]]});
}}
 className="mb-4"
 />
 <div className="flex items-center justify-between gap-2 text-sm">
 <span className="rounded-global bg-brand-secondary px-3 py-1 font-medium text-brand-primary">
 ₹{filters.priceRange[0].toLocaleString("en-IN")}
 </span>
 <span className="text-brand-text/70 text-xs">to</span>
 <span className="rounded-global bg-brand-secondary px-3 py-1 font-medium text-brand-primary">
 ₹{filters.priceRange[1].toLocaleString("en-IN")}
 </span>
 </div>
 </FilterSection>

 {variant ==="sheet"&& hasActive && (
 <Button variant="outline"className="w-full rounded-global"onClick={onClear}>
 <X className="h-4 w-4 mr-2"/>
 Clear all filters
 </Button>
 )}
 </div>
 );
}

export function ActiveFilterChips({
 filters,
 categories,
 brands,
 onChange,
}: {
 filters: ProductFilterState;
 categories: Category[];
 brands: Brand[];
 onChange: (patch: Partial<ProductFilterState>) => void;
}) {
 const chips: { label: string; clear: () => void}[] = [];

 if (filters.search) chips.push({ label: `"${filters.search}"`, clear: () => onChange({ search:""})});
 if (filters.category) {
 const name = categories.find((c) => c.slug.current === filters.category)?.name ?? filters.category;
 chips.push({ label: name, clear: () => onChange({ category:""})});
}
 if (filters.brand) {
 const name = brands.find((b) => b.slug.current === filters.brand)?.name ?? filters.brand;
 chips.push({ label: name, clear: () => onChange({ brand:""})});
}
 if (filters.priceRange[0] > 0 || filters.priceRange[1] < 15000) {
 chips.push({
 label: `₹${filters.priceRange[0].toLocaleString()} – ₹${filters.priceRange[1].toLocaleString()}`,
 clear: () => onChange({ priceRange: [0, 15000]}),
});
}

 if (chips.length === 0) return null;

 return (
 <div className="flex flex-wrap gap-2 mb-4">
 {chips.map((chip) => (
 <button
 key={chip.label}
 type="button"
 onClick={chip.clear}
 className="inline-flex items-center gap-1.5 rounded-global border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-xs font-medium text-brand-primary hover:bg-brand-primary/10 transition-colors"
 >
 {chip.label}
 <X className="h-3 w-3"/>
 </button>
 ))}
 </div>
 );
}
