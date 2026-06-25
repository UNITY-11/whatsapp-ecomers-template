"use client";

import { getProductSizes, getVariantStock } from "@/shared/lib/dress-variants";
import { cn } from "@/shared/lib/utils";
import type { Product, ProductColor } from "@/shared/types";

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
    <div className="mb-6 space-y-5">
      {colors.length > 0 && (
        <div>
          <p className="label-caps mb-3">
            Color —{" "}
            <span className="text-foreground font-medium tracking-normal normal-case">
              {selectedColor}
            </span>
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
                    "rounded-global flex h-10 w-10 shrink-0 items-center justify-center border-2 transition-colors",
                    isSelected
                      ? "border-brand-primary"
                      : "hover:border-brand-primary/40 border-transparent",
                    !inStock && "cursor-not-allowed opacity-40"
                  )}
                >
                  <span
                    className={cn(
                      "rounded-global block h-7 w-7 border border-black/10",
                      isSelected && "ring-primary ring-offset-background ring-2 ring-offset-1"
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <p className="label-caps mb-3">
          Size —{" "}
          <span className="text-foreground font-medium tracking-normal normal-case">
            {selectedSize}
          </span>
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
                  "h-10 min-w-[2.75rem] rounded-none border px-8 text-sm font-medium transition-colors",
                  isSelected
                    ? "border-brand-primary bg-brand-primary text-brand-surface"
                    : "border-brand-primary/60 text-brand-primary hover:bg-brand-primary/5 bg-transparent",
                  !available && "cursor-not-allowed line-through opacity-40"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
        <p className="text-brand-text/70 mt-2 text-xs">True to size · Model wears size S</p>
      </div>
    </div>
  );
}
