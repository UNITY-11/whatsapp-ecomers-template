import { Container } from "@/components/shared/container";

const BRANDS = [
  "CHANEL",
  "DIOR",
  "PRADA",
  "GUCCI",
  "CELINE",
  "SAINT LAURENT",
  "VALENTINO"
];

export function BrandsSection() {
  return (
    <section className="py-10 sm:py-14 bg-background border-b border-border/30">
      <Container>
        <p className="text-center text-xs uppercase tracking-[0.3em] font-medium text-muted-foreground mb-8">
          Curating the World&apos;s Finest Brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 md:gap-x-24 gap-y-8 opacity-60">
          {BRANDS.map((brand) => (
            <div 
              key={brand} 
              className="text-xl sm:text-2xl md:text-3xl font-heading tracking-widest text-primary hover:opacity-100 transition-opacity cursor-pointer"
            >
              {brand}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
