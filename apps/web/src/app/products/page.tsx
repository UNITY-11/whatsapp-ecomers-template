"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Grid3x3, List, SlidersHorizontal } from "lucide-react";

import { Container, SectionHeading } from "@/shared/components/shared/container";
import { Badge } from "@/shared/components/ui/badge";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ITEMS_PER_PAGE, SORT_OPTIONS } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/utils";
import { getBrands, getCategories } from "@/shared/services/content-service";
import type { Brand, Category, Product } from "@/shared/types";
import { ProductCard } from "@/features/products/components/product-card";
import {
  ActiveFilterChips,
  ProductFilters,
  type ProductFilterState,
} from "@/features/products/components/product-filters";
import { ProductQuickView } from "@/features/products/components/product-quick-view";
import { getProducts } from "@/features/products/services/product-service";

const DEFAULT_PRICE: [number, number] = [0, 15000];

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<ProductFilterState>({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    priceRange: DEFAULT_PRICE,
  });
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(1);

  const activeFilterCount = [
    filters.search,
    filters.category,
    filters.brand,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 15000,
  ].filter(Boolean).length;

  const patchFilters = (patch: Partial<ProductFilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ search: "", category: "", brand: "", priceRange: DEFAULT_PRICE });
    setPage(1);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const result = await getProducts({
      search: filters.search || undefined,
      category: filters.category || undefined,
      brand: filters.brand || undefined,
      sort: sort as "newest" | "price-asc" | "price-desc" | "name" | "popular",
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      page,
      limit: ITEMS_PER_PAGE,
    });
    setProducts(result.data);
    setTotal(result.total);
    setTotalPages(result.totalPages);
    setLoading(false);
  }, [filters, sort, page]);

  useEffect(() => {
    getCategories().then(setCategories);
    getBrands().then(setBrands);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container className="py-6 sm:py-20">
      <SectionHeading
        title="All Dresses"
        subtitle={`${total} piece${total === 1 ? "" : "s"} in our collection`}
        label="Shop"
        align="left"
        className="mb-6 sm:mb-8"
      />

      <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block xl:w-80">
          <div className="sticky top-24">
            <ProductFilters
              filters={filters}
              categories={categories}
              brands={brands}
              onChange={patchFilters}
              onClear={clearFilters}
              variant="sidebar"
            />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-4 flex flex-col gap-3 sm:mb-6">
            <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "rounded-global h-9 shrink-0 gap-1.5 lg:hidden"
                  )}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="rounded-global bg-brand-primary text-brand-primary-foreground h-5 min-w-5 px-1 text-[10px]">
                      {activeFilterCount}
                    </Badge>
                  )}
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-full max-w-[min(100vw,22rem)] overflow-y-auto p-0"
                >
                  <SheetHeader className="border-brand-border-global/60 border-b p-5 pb-0">
                    <SheetTitle className="font-brand text-brand-primary text-left">
                      Filter Dresses
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-5">
                    <ProductFilters
                      filters={filters}
                      categories={categories}
                      brands={brands}
                      onChange={patchFilters}
                      onClear={clearFilters}
                      variant="sheet"
                    />
                  </div>
                  <div className="border-brand-border-global/60 bg-brand-surface sticky bottom-0 border-t p-4">
                    <Button className="rounded-global w-full" onClick={() => setFiltersOpen(false)}>
                      Show {total} results
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-initial sm:gap-2.5">
                <span className="label-caps hidden shrink-0 whitespace-nowrap sm:inline">
                  Sort by
                </span>
                <Select
                  value={sort}
                  onValueChange={(v) => {
                    if (v) {
                      setSort(v);
                      setPage(1);
                    }
                  }}
                >
                  <SelectTrigger size="sm" className="h-9 min-w-0 flex-1 sm:w-[11rem] sm:flex-none">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent align="start" alignItemWithTrigger={false} className="bg-brand-surface">
                    <SelectGroup>
                      <SelectLabel>Order</SelectLabel>
                      {SORT_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-global border-brand-border-global/60 bg-brand-surface ml-auto flex h-9 shrink-0 items-center gap-0.5 border p-0.5">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-global h-8 w-8"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-global h-8 w-8"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ActiveFilterChips
              filters={filters}
              categories={categories}
              brands={brands}
              onChange={patchFilters}
            />
          </div>

          {loading ? (
            <div
              className={cn(
                "grid gap-3 sm:gap-5",
                viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
              )}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={
                    viewMode === "grid" ? "rounded-global aspect-[3/4]" : "rounded-global h-36"
                  }
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center sm:py-20">
              <p className="font-brand text-brand-h3 text-brand-primary mb-2">No dresses found</p>
              <p className="text-brand-text/70 mb-6 text-sm">Try adjusting your filters</p>
              <Button variant="outline" className="rounded-global" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div
              className={cn(
                "grid gap-3 sm:gap-5",
                viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
              )}
            >
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  layout={viewMode}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex scrollbar-none justify-center gap-1.5 overflow-x-auto pb-2 sm:gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "default" : "outline"}
                  size="sm"
                  className="rounded-global min-w-9 shrink-0"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ProductQuickView
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Container>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <Container className="py-8">
          <Skeleton className="rounded-global h-96 w-full" />
        </Container>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
