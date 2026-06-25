import Image from "next/image";
import Link from "next/link";

import { Container } from "@/shared/components/shared/container";
import { getCategories } from "@/shared/services/content-service";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <Container className="py-8 sm:py-20">
      <h1 className="font-brand text-brand-h1 text-brand-primary mb-8 font-medium">
        All Categories
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/products?category=${cat.slug.current}`}
            className="group block"
          >
            <div className="bg-brand-secondary-hover relative aspect-[3/4] overflow-hidden rounded-none">
              {cat.imageUrl && (
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-all group-hover:from-black/60" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="font-brand md:text-brand-h3 text-sm leading-tight font-medium tracking-wide text-white sm:text-base">
                  {cat.name}
                </h3>
                {cat.productCount && (
                  <p className="mt-1 text-[10px] tracking-[0.15em] uppercase opacity-75">
                    {cat.productCount} pieces
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
