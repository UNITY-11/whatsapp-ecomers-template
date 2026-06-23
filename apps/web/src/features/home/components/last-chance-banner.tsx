import Image from"next/image";
import Link from"next/link";
import { Container} from"@/shared/components/shared/container";

export function LastChanceBanner() {
 return (
 <section className="bg-brand-primary overflow-hidden my-14 sm:my-20">
 <Container className="max-w-[1600px] p-0">
 <div className="flex flex-col md:flex-row items-center w-full">
 {/* Image Container */}
 <div className="w-full md:w-1/2 relative h-[300px] md:h-[380px] lg:h-[450px]">
 <Image
 src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=1000&q=80"
 alt="Fashion model"
 fill
 className="object-cover object-center"
 />
 </div>
 
 {/* Text Container */}
 <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10 lg:p-16">
 <h2 className="text-brand-h2 md:text-brand-h1 lg:text-6xl font-sans tracking-tight text-background mb-2">
 Last chance!
 </h2>
 <p className="text-base md:text-brand-h3 lg:text-brand-h3 text-background/80 mb-4 font-light">
 Few sizes left
 </p>
 <h3 className="text-brand-h1 md:text-brand-h1 lg:text-[4.5rem] leading-none font-bold tracking-tight text-background mb-6">
 UPTO 30% OFF*
 </h3>
 <Link 
 href="/products"
 className="inline-block bg-transparent border border-background text-background px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-brand-surface/10 transition-colors w-fit"
 >
 Shop Now
 </Link>
 </div>
 </div>
 </Container>
 </section>
 );
}
