import { Container } from "@/shared/components/shared/container";

const BRANDS = ["CHANEL", "DIOR", "PRADA", "GUCCI", "CELINE", "SAINT LAURENT", "VALENTINO"];

export function BrandsSection() {
    return (
        <section className="bg-brand-surface border-brand-border-global/30 border-b py-10 sm:py-14">
            <Container>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 sm:gap-x-16 md:gap-x-24">
                    {BRANDS.map((brand) => (
                        <div
                            key={brand}
                            className="text-brand-h3 sm:text-brand-h2 md:text-brand-h2 font-brand text-brand-primary cursor-pointer tracking-widest transition-opacity hover:opacity-100"
                        >
                            {brand}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
