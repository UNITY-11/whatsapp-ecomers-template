import Image from "next/image";
import Link from "next/link";

import { Container } from "@/shared/components/shared/container";
import { getCategories } from "@/shared/services/content-service";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <Container className="py-8 sm:py-20">
      <h1 className="text-brand-h1 mb-8 font-bold">All Categories</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link key={cat._id} href={`/products?category=${cat.slug.current}`} className="group">
            <div className="bg-brand-secondary-hover relative aspect-[3/4] overflow-hidden rounded-none">
              {cat.imageUrl && (
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 flex items-end bg-black/30 p-4">
                <div className="w-full text-white">
                  <h3 className="drop-shadow-brand-card text-brand-h2 font-semibold text-white">
                    {cat.name}
                  </h3>
                  {cat.productCount && (
                    <p className="drop-shadow-brand-card mt-0.5 text-xs text-white/90">
                      {cat.productCount} products
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
