"use client";

import { cn} from"@/lib/utils";
import type { Product, ProductColor} from"@/types";
import { getProductSizes, getVariantStock} from"@/lib/dress-variants";

interface VariantSelectorProps {
 product: Product;
 selectedSize: string;
 selectedColor: string;
 onSizeChange: (size: string) => void;
 onColorChange: (color: string) => void;
}

export function VariantSelector({
 product,
 selectedSize,
 selectedColor,
 onSizeChange,
 onColorChange,
}: VariantSelectorProps) {
 const sizes = getProductSizes(product);
 const colors = product.colors ?? [];

 return (
 <div className="space-y-5 mb-6">
 {colors.length > 0 && (
 <div>
 <p className="label-caps mb-3">
 Color — <span className="text-foreground normal-case tracking-normal font-medium">{selectedColor}</span>
 </p>
 <div className="flex flex-wrap gap-3">
 {colors.map((color: ProductColor) => {
 const inStock = sizes.some((size) => getVariantStock(product, size, color.name) > 0);
 const isSelected = selectedColor === color.name;
 return (
 <button
 key={color.name}
 type="button"
 disabled={!inStock}
 onClick={() => onColorChange(color.name)}
 title={color.name}
 aria-label={`Color ${color.name}`}
 aria-pressed={isSelected}
 className={cn(
"flex h-10 w-10 shrink-0 items-center justify-center rounded-global border-2 transition-colors",
 isSelected ?"border-brand-primary":"border-transparent hover:border-brand-primary/40",
 !inStock &&"opacity-40 cursor-not-allowed"
 )}
 >
 <span
 className={cn(
"block h-7 w-7 rounded-global border border-black/10",
 isSelected &&"ring-2 ring-primary ring-offset-1 ring-offset-background"
 )}
 style={{ backgroundColor: color.hex}}
 />
 </button>
 );
})}
 </div>
 </div>
 )}

 <div>
 <p className="label-caps mb-3">
 Size — <span className="text-foreground normal-case tracking-normal font-medium">{selectedSize}</span>
 </p>
 <div className="flex flex-wrap gap-2">
 {sizes.map((size) => {
 const stock = selectedColor
 ? getVariantStock(product, size, selectedColor)
 : product.stock;
 const available = stock > 0;
 const isSelected = selectedSize === size;
 return (
 <button
 key={size}
 type="button"
 disabled={!available}
 onClick={() => onSizeChange(size)}
 className={cn(
"min-w-[2.75rem] h-10 px-8 rounded-none border text-sm font-medium transition-colors",
 isSelected
 ?"bg-brand-primary text-brand-primary-foreground border-brand-primary"
 :"bg-brand-surface border-brand-border-global/80 hover:border-brand-primary/40 text-foreground",
 !available &&"opacity-40 line-through cursor-not-allowed"
 )}
 >
 {size}
 </button>
 );
})}
 </div>
 <p className="text-xs text-brand-text/70 mt-2">
 True to size · Model wears size S
 </p>
 </div>
 </div>
 );
}
