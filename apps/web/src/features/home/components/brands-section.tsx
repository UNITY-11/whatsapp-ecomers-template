import { Container } from "@/shared/components/shared/container";

const BRANDS = ["CHANEL", "DIOR", "PRADA", "GUCCI", "CELINE", "SAINT LAURENT", "VALENTINO"];

export function BrandsSection() {
  return (
    <section className="bg-brand-surface border-brand-border-global/30 flex h-[calc(25vh-2.5rem)] items-center border-b sm:h-auto sm:py-14">
      <Container className="overflow-hidden">
        {/* We duplicate the brands array to create a seamless marquee loop */}
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-x-12 whitespace-nowrap opacity-60 sm:gap-x-16 md:gap-x-24">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="font-brand text-brand-primary shrink-0 cursor-pointer text-3xl font-extrabold tracking-widest transition-opacity hover:opacity-100 sm:text-4xl md:text-5xl"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
