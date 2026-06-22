"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Grid3x3, List, SlidersHorizontal } from "lucide-react";
import { Container, SectionHeading } from "@/components/shared/container";
import { ProductCard } from "@/components/products/product-card";
import { ProductQuickView } from "@/components/products/product-quick-view";
import {
  ProductFilters,
  ActiveFilterChips,
  type ProductFilterState,
} from "@/components/products/product-filters";
import { Button, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { getProducts } from "@/services/product-service";
import { getCategories, getBrands } from "@/services/content-service";
import { SORT_OPTIONS, ITEMS_PER_PAGE } from "@/lib/constants";
import type { Product, Category, Brand } from "@/types";
import { cn } from "@/lib/utils";

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
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container className="py-6 sm:py-8">
      <SectionHeading
        title="All Dresses"
        subtitle={`${total} piece${total === 1 ? "" : "s"} in our collection`}
        label="Shop"
        align="left"
        className="mb-6 sm:mb-8"
      />

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 min-w-0">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
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

        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-col gap-3 mb-4 sm:mb-6">
            <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "lg:hidden shrink-0 rounded-full h-9 gap-1.5"
                  )}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px]">
                      {activeFilterCount}
                    </Badge>
                  )}
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-[min(100vw,22rem)] overflow-y-auto p-0">
                  <SheetHeader className="p-5 pb-0 border-b border-border/60">
                    <SheetTitle className="font-heading text-primary text-left">Filter Dresses</SheetTitle>
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
                  <div className="sticky bottom-0 p-4 border-t border-border/60 bg-background">
                    <Button className="w-full rounded-full" onClick={() => setFiltersOpen(false)}>
                      Show {total} results
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-initial sm:gap-2.5">
                <span className="label-caps hidden shrink-0 whitespace-nowrap sm:inline">Sort by</span>
                <Select value={sort} onValueChange={(v) => { if (v) { setSort(v); setPage(1); } }}>
                  <SelectTrigger size="sm" className="h-9 min-w-0 flex-1 sm:w-[11rem] sm:flex-none">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent align="start" alignItemWithTrigger={false}>
                    <SelectGroup>
                      <SelectLabel>Order</SelectLabel>
                      {SORT_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="ml-auto flex h-9 shrink-0 items-center gap-0.5 rounded-full border border-border/60 bg-card p-0.5">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8 rounded-full"
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
            <div className={cn("grid gap-3 sm:gap-5", viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1")}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className={viewMode === "grid" ? "aspect-[3/4] rounded-xl" : "h-36 rounded-xl"} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <p className="font-heading text-xl text-primary mb-2">No dresses found</p>
              <p className="text-muted-foreground text-sm mb-6">Try adjusting your filters</p>
              <Button variant="outline" className="rounded-full" onClick={clearFilters}>Clear filters</Button>
            </div>
          ) : (
            <div className={cn("grid gap-3 sm:gap-5", viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1")}>
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
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "default" : "outline"}
                  size="sm"
                  className="shrink-0 min-w-9 rounded-full"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ProductQuickView product={quickViewProduct} open={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </Container>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Container className="py-8"><Skeleton className="h-96 w-full rounded-xl" /></Container>}>
      <ProductsContent />
    </Suspense>
  );
}
