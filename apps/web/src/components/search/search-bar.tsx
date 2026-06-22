"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/store/search-store";
import { searchProducts } from "@/services/product-service";
import { formatPrice, getProductImageUrl } from "@/utils/format";
import type { Product } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

  const showPanel = open && (inlineResults || !!query || history.length > 0);

  const resultsPanel = (
    <div
      className={cn(
        "bg-popover text-popover-foreground border border-border/60 shadow-lg rounded-xl overflow-hidden",
        inlineResults ? "mt-2 w-full" : "absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[100] w-full min-w-[16rem]"
      )}
    >
      {loading ? (
        <div className="p-4 text-sm text-muted-foreground">Searching...</div>
      ) : query && results.length > 0 ? (
        <div className="max-h-64 sm:max-h-80 overflow-y-auto">
          {results.map((product) => (
            <button
              key={product._id}
              type="button"
              onClick={() => handleSelect(product)}
              className="flex items-center gap-3 w-full p-3 hover:bg-muted transition-colors text-left"
            >
              <div className="relative h-10 w-10 rounded overflow-hidden bg-muted shrink-0">
                <Image src={getProductImageUrl(product)} alt={product.name} fill className="object-cover" sizes="40px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p>
              </div>
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleSearch(query)}
            className="w-full p-3 text-sm text-primary hover:bg-muted border-t text-left"
          >
            View all results for &quot;{query}&quot;
          </button>
        </div>
      ) : query && !loading ? (
        <div className="p-4 text-sm text-muted-foreground">No products found</div>
      ) : history.length > 0 ? (
        <div className="p-2">
          <p className="text-xs text-muted-foreground px-2 py-1">Recent searches</p>
          {history.map((h) => (
            <div key={h} className="flex items-center gap-1 min-w-0">
              <button
                type="button"
                onClick={() => handleSearch(h)}
                className="flex items-center gap-2 flex-1 min-w-0 p-2 hover:bg-muted rounded text-sm text-left"
              >
                <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                <span className="truncate">{h}</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromHistory(h);
                }}
                className="p-2 shrink-0 hover:bg-muted rounded"
                aria-label={`Remove ${h} from history`}
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-sm text-muted-foreground">Start typing to search</div>
      )}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full min-w-0", inlineResults && "shrink-0", className)}
    >
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-9 pr-9 h-10 rounded-full bg-muted/60 border-border/60 text-sm w-full"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-0.5 hover:opacity-70"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {showPanel && resultsPanel}
    </div>
  );
}
