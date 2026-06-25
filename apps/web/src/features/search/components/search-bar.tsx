"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Search, X } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import type { Product } from "@/shared/types";
import { formatPrice, getProductImageUrl } from "@/shared/utils/format";
import { searchProducts } from "@/features/products/services/product-service";
import { useSearchStore } from "@/features/search/store/search-store";

interface SearchBarProps {
  /** Use in-flow results (mobile sidebar) — avoids popover clipping inside sheets */
  inlineResults?: boolean;
  onNavigate?: () => void;
  className?: string;
}

export function SearchBar({ inlineResults = false, onNavigate, className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { history, addToHistory, removeFromHistory } = useSearchStore();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const data = await searchProducts(q);
    setResults(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  useEffect(() => {
    if (inlineResults) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [inlineResults]);

  const closeAndNavigate = useCallback(() => {
    setOpen(false);
    onNavigate?.();
  }, [onNavigate]);

  const handleSelect = (product: Product) => {
    addToHistory(query);
    setQuery("");
    setOpen(false);
    closeAndNavigate();
    router.push(`/products/${product.slug.current}`);
  };

  const handleSearch = (q: string) => {
    addToHistory(q);
    setQuery("");
    setOpen(false);
    closeAndNavigate();
    router.push(`/products?search=${encodeURIComponent(q)}`);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuery("");
    setResults([]);
  };

  const showPanel = open && (!!query || history.length > 0);

  const resultsPanel = (
    <div
      className={cn(
        "bg-popover text-popover-foreground border-brand-border-global/60 rounded-global overflow-hidden border shadow-lg",
        inlineResults
          ? "mt-2 w-full"
          : "absolute top-[calc(100%+0.5rem)] right-0 left-0 z-[100] w-full min-w-[16rem]"
      )}
    >
      {loading ? (
        <div className="text-brand-text/70 p-4 text-sm">Searching...</div>
      ) : query && results.length > 0 ? (
        <div className="max-h-64 overflow-y-auto sm:max-h-80">
          {results.map((product) => (
            <button
              key={product._id}
              type="button"
              onClick={() => handleSelect(product)}
              className="hover:bg-brand-secondary-hover flex w-full items-center gap-3 p-3 text-left transition-colors"
            >
              <div className="bg-brand-secondary-hover relative h-10 w-10 shrink-0 overflow-hidden rounded">
                <Image
                  src={getProductImageUrl(product)}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="text-brand-text/70 text-xs">{formatPrice(product.price)}</p>
              </div>
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleSearch(query)}
            className="text-brand-primary hover:bg-brand-secondary-hover w-full border-t p-3 text-left text-sm"
          >
            View all results for &quot;{query}&quot;
          </button>
        </div>
      ) : query && !loading ? (
        <div className="text-brand-text/70 p-4 text-sm">No products found</div>
      ) : history.length > 0 ? (
        <div className="p-2">
          <p className="text-brand-text/70 px-2 py-1 text-xs">Recent searches</p>
          {history.map((h) => (
            <div key={h} className="flex min-w-0 items-center gap-1">
              <button
                type="button"
                onClick={() => handleSearch(h)}
                className="hover:bg-brand-secondary-hover flex min-w-0 flex-1 items-center gap-2 rounded p-2 text-left text-sm"
              >
                <Clock className="text-brand-text/70 h-3 w-3 shrink-0" />
                <span className="truncate">{h}</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromHistory(h);
                }}
                className="hover:bg-brand-secondary-hover shrink-0 rounded p-2"
                aria-label={`Remove ${h} from history`}
              >
                <X className="text-brand-text/70 h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full min-w-0", inlineResults && "shrink-0", className)}
    >
      <div className="relative w-full">
        <Search className="text-brand-surface/70 pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2" />
        <Input
          type="search"
          placeholder="Search products..."
          className="bg-brand-surface/10 border-brand-surface/20 text-brand-surface placeholder:text-brand-surface/60 focus-visible:bg-brand-surface/15 h-10 w-full rounded-none pr-9 pl-9 text-sm transition-colors"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          aria-label="Search products"
          aria-expanded={!!showPanel}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1/2 right-3 z-10 -translate-y-1/2 p-0.5 hover:opacity-70"
            aria-label="Clear search"
          >
            <X className="text-brand-surface/70 h-4 w-4" />
          </button>
        )}
      </div>

      {showPanel && resultsPanel}
    </div>
  );
}
