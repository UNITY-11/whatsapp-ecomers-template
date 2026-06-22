import { Container } from "@/components/shared/container";
import { getCategories } from "@/services/content-service";
import Link from "next/link";
import Image from "next/image";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat._id} href={`/products?category=${cat.slug.current}`} className="group">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              {cat.imageUrl && (
                <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover transition-transform group-hover:scale-105" />
              )}
              <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-semibold">{cat.name}</h3>
                  {cat.productCount && <p className="text-xs opacity-80">{cat.productCount} products</p>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
