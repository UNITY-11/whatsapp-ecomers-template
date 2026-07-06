import Image from "next/image";
import Link from "next/link";

import { Container } from "@/shared/components/shared/container";

export function LastChanceBanner() {
  return (
    <section className="bg-brand-primary my-14 overflow-hidden sm:my-20">
      <Container className="max-w-[1600px] p-0">
        <div className="flex w-full flex-col items-center md:flex-row">
          {/* Image Container */}
          <div className="relative h-[300px] w-full md:h-[380px] md:w-1/2 lg:h-[450px]">
            <Image
              src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=1000&q=80"
              alt="Fashion model"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Container */}
          <div className="flex w-full flex-col items-center justify-center p-6 text-center md:w-1/2 md:items-start md:p-10 md:text-left lg:p-16">
            <h2 className="text-brand-h2 md:text-brand-h1 text-background font-brand mb-2 tracking-tight lg:text-6xl">
              Last chance!
            </h2>
            <h3 className="text-brand-h1 md:text-brand-h1 text-background font-brand mb-6 leading-none tracking-tight lg:text-[4.5rem]">
              UPTO 30% OFF*
            </h3>
            <Link
              href="/products"
              className="border-background text-background hover:bg-brand-surface/10 inline-block w-fit border bg-transparent px-8 py-4 text-sm font-medium tracking-wider uppercase transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
