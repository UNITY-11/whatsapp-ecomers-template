import { Container} from"@/shared/components/shared/container";
import { getSettings} from"@/shared/services/content-service";

export default async function AboutPage() {
 const settings = await getSettings();

 return (
 <Container className="py-12 max-w-3xl">
 <h1 className="text-brand-h2 font-bold mb-6">About {settings.storeName}</h1>
 <div className="prose max-w-none text-brand-text/70 space-y-4">
 <p>{settings.storeDescription}</p>
 <p>
 We believe in delivering premium quality products with an exceptional shopping experience.
 Our WhatsApp ordering system makes it easy and convenient to place orders and get personalized service.
 </p>
 <p>
 Every product in our collection is carefully curated to meet the highest standards of quality and style.
 From fashion to accessories, we bring you the best from renowned brands.
 </p>
 </div>
 </Container>
 );
}
