import type {
  Product,
  Category,
  Brand,
  Banner,
  FAQ,
  Testimonial,
  StoreSettings,
  Review,
  OrderRequest,
  User,
  Coupon,
  ProductColor,
} from "@/types";
import { DRESS_SIZES } from "@/lib/dress-variants";

const slug = (s: string) => ({ _type: "slug" as const, current: s });

function buildVariantStock(sizes: string[], colors: ProductColor[], baseStock = 4) {
  return sizes.flatMap((size) =>
    colors.map((color, i) => ({
      size,
      color: color.name,
      stock: baseStock - (sizes.indexOf(size) % 2) - (i % 2),
    }))
  );
}

const dressColors = {
  emerald: { name: "Emerald", hex: "#0F4A3A" },
  champagne: { name: "Champagne", hex: "#F5F0E8" },
  gold: { name: "Antique Gold", hex: "#B89A5A" },
  noir: { name: "Noir", hex: "#1a1a1a" },
  blush: { name: "Blush Rose", hex: "#d4a5a5" },
  ivory: { name: "Ivory", hex: "#fffff0" },
} as const;

export const mockSettings: StoreSettings = {
  _id: "settings-1",
  storeName: "Calira Couture",
  storeDescription: "Curated ladies dresses for every occasion — from garden parties to black-tie evenings.",
  whatsappNumber: "917736085178",
  email: "hello@caliracouture.com",
  phone: "+91 77360 85178",
  address: "12 Couture Lane, Mumbai, India",
  socialLinks: {
    instagram: "https://instagram.com/caliracouture",
    facebook: "https://facebook.com/caliracouture",
  },
  seoTitle: "Calira Couture — Premium Ladies Dresses",
  seoDescription: "Discover elegant midi, maxi, and evening dresses crafted for the modern woman.",
  currency: "INR",
  currencySymbol: "₹",
};

export const mockCategories: Category[] = [
  { _id: "cat-1", name: "Evening Gowns", slug: slug("evening-gowns"), description: "Statement gowns for special nights", featured: true, order: 1, productCount: 8, imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600" },
  { _id: "cat-2", name: "Midi Dresses", slug: slug("midi-dresses"), description: "Effortless mid-length silhouettes", featured: true, order: 2, productCount: 10, imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600" },
  { _id: "cat-3", name: "Maxi Dresses", slug: slug("maxi-dresses"), description: "Flowing floor-length elegance", featured: true, order: 3, productCount: 7, imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600" },
  { _id: "cat-4", name: "Cocktail Dresses", slug: slug("cocktail-dresses"), description: "Chic dresses for celebrations", featured: true, order: 4, productCount: 6, imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600" },
  { _id: "cat-5", name: "Wedding Guest", slug: slug("wedding-guest"), description: "Graceful looks for ceremonies", featured: false, order: 5, productCount: 5, imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600" },
  { _id: "cat-6", name: "Party Wear", slug: slug("party-wear"), description: "Sparkle-ready party dresses", featured: false, order: 6, productCount: 6, imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600" },
];

export const mockBrands: Brand[] = [
  { _id: "brand-1", name: "Calira Atelier", slug: slug("calira-atelier"), description: "House signature collection" },
  { _id: "brand-2", name: "Maison Élise", slug: slug("maison-elise"), description: "Parisian-inspired evening wear" },
  { _id: "brand-3", name: "Silk & Sage", slug: slug("silk-sage"), description: "Natural fabrics, timeless cuts" },
];

const sizes = ["XS", "S", "M", "L", "XL"];

export const mockProducts: Product[] = [
  {
    _id: "prod-1", name: "Emerald Silk Midi Dress", slug: slug("emerald-silk-midi-dress"),
    shortDescription: "Bias-cut silk midi with draped neckline",
    description: "An ode to quiet luxury — this bias-cut silk midi drapes beautifully along the body. Features a subtle cowl neckline, concealed side zip, and fully lined interior for all-day comfort.",
    price: 8999, compareAtPrice: 11999, stock: 24, status: "active", featured: true, isNewArrival: true, isBestSeller: true,
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
    category: mockCategories[1], brand: mockBrands[0],
    sizes, colors: [dressColors.emerald, dressColors.champagne, dressColors.noir],
    variantStock: buildVariantStock(sizes, [dressColors.emerald, dressColors.champagne, dressColors.noir]),
    specifications: [{ key: "Fabric", value: "100% Silk" }, { key: "Length", value: "Midi" }, { key: "Fit", value: "Relaxed" }, { key: "Care", value: "Dry clean only" }],
    features: ["Fully lined", "Concealed zip", "Side slit"],
    averageRating: 4.9, reviewCount: 86,
  },
  {
    _id: "prod-2", name: "Champagne Satin Evening Gown", slug: slug("champagne-satin-evening-gown"),
    shortDescription: "Floor-sweeping satin gown with open back",
    description: "Make an entrance in fluid champagne satin. This evening gown features a sculpted bodice, open back with crossover straps, and a gentle train for red-carpet moments.",
    price: 14999, compareAtPrice: 18999, stock: 12, status: "active", featured: true, isBestSeller: true,
    imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
    category: mockCategories[0], brand: mockBrands[1],
    sizes, colors: [dressColors.champagne, dressColors.gold, dressColors.ivory],
    variantStock: buildVariantStock(sizes, [dressColors.champagne, dressColors.gold, dressColors.ivory], 3),
    specifications: [{ key: "Fabric", value: "Duchess Satin" }, { key: "Length", value: "Floor length" }, { key: "Neckline", value: "Sweetheart" }],
    features: ["Built-in cups", "Open back", "Train detail"],
    averageRating: 4.8, reviewCount: 52,
  },
  {
    _id: "prod-3", name: "Floral Maxi Garden Dress", slug: slug("floral-maxi-garden-dress"),
    shortDescription: "Printed chiffon maxi with flutter sleeves",
    description: "A romantic garden-party essential in airy printed chiffon. Tiered skirt, flutter sleeves, and an adjustable waist tie create a feminine, flowing silhouette.",
    price: 6499, stock: 30, status: "active", featured: true, isNewArrival: true,
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    category: mockCategories[2], brand: mockBrands[2],
    sizes, colors: [dressColors.blush, dressColors.ivory, dressColors.emerald],
    variantStock: buildVariantStock(sizes, [dressColors.blush, dressColors.ivory, dressColors.emerald]),
    specifications: [{ key: "Fabric", value: "Chiffon" }, { key: "Length", value: "Maxi" }, { key: "Sleeve", value: "Flutter" }],
    averageRating: 4.7, reviewCount: 64,
  },
  {
    _id: "prod-4", name: "Noir Cocktail Slip Dress", slug: slug("noir-cocktail-slip-dress"),
    shortDescription: "Minimal slip dress with lace trim",
    description: "Understated glamour for cocktail hour. A sleek slip silhouette in matte crepe with delicate lace trim at the hem and adjustable spaghetti straps.",
    price: 5499, compareAtPrice: 6999, stock: 20, status: "active", isBestSeller: true,
    imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800",
    category: mockCategories[3], brand: mockBrands[0],
    sizes, colors: [dressColors.noir, dressColors.emerald, dressColors.gold],
    variantStock: buildVariantStock(sizes, [dressColors.noir, dressColors.emerald, dressColors.gold]),
    averageRating: 4.6, reviewCount: 41,
  },
  {
    _id: "prod-5", name: "Gold Sequin Party Dress", slug: slug("gold-sequin-party-dress"),
    shortDescription: "All-over sequin mini with sheer sleeves",
    description: "Turn heads in antique gold sequins. This party-ready mini features sheer mesh sleeves, a fitted bodice, and a flared skirt that catches every light.",
    price: 7999, stock: 16, status: "active", featured: true,
    imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800",
    category: mockCategories[5], brand: mockBrands[1],
    sizes, colors: [dressColors.gold, dressColors.noir],
    variantStock: buildVariantStock(sizes, [dressColors.gold, dressColors.noir], 4),
    averageRating: 4.9, reviewCount: 37,
  },
  {
    _id: "prod-6", name: "Blush Pleated Wedding Guest Dress", slug: slug("blush-pleated-wedding-guest"),
    shortDescription: "Pleated midi with bow-detail shoulders",
    description: "Soft pleats and bow-tie shoulders make this blush midi perfect for weddings and daytime celebrations. Fully lined with a hidden back zip.",
    price: 7299, compareAtPrice: 8999, stock: 18, status: "active", isNewArrival: true,
    imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
    category: mockCategories[4], brand: mockBrands[2],
    sizes, colors: [dressColors.blush, dressColors.champagne, dressColors.ivory],
    variantStock: buildVariantStock(sizes, [dressColors.blush, dressColors.champagne, dressColors.ivory]),
    averageRating: 4.8, reviewCount: 29,
  },
  {
    _id: "prod-7", name: "Ivory Lace Column Dress", slug: slug("ivory-lace-column-dress"),
    shortDescription: "Column silhouette in French lace",
    description: "Refined and timeless — a column dress crafted from French lace over silk charmeuse. Perfect for rehearsal dinners and elegant brunches.",
    price: 9999, compareAtPrice: 12999, stock: 14, status: "active", isBestSeller: true,
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
    category: mockCategories[4], brand: mockBrands[0],
    sizes, colors: [dressColors.ivory, dressColors.champagne],
    variantStock: buildVariantStock(sizes, [dressColors.ivory, dressColors.champagne], 3),
    averageRating: 4.7, reviewCount: 48,
  },
  {
    _id: "prod-8", name: "Forest Green Wrap Maxi", slug: slug("forest-green-wrap-maxi"),
    shortDescription: "Wrap-front maxi in sustainable viscose",
    description: "Our signature forest green wrap maxi flatters every figure. Tie waist, flutter sleeve, and a sweeping skirt that moves with you.",
    price: 5999, stock: 22, status: "active",
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    category: mockCategories[2], brand: mockBrands[2],
    sizes: [...DRESS_SIZES], colors: [dressColors.emerald, dressColors.noir],
    variantStock: buildVariantStock([...DRESS_SIZES], [dressColors.emerald, dressColors.noir]),
    averageRating: 4.5, reviewCount: 33,
  },
  {
    _id: "prod-9", name: "Antique Gold Brocade Midi", slug: slug("antique-gold-brocade-midi"),
    shortDescription: "Structured brocade with square neckline",
    description: "Rich brocade in antique gold with a structured bodice and A-line skirt. A statement piece for festive gatherings and cocktail events.",
    price: 8499, compareAtPrice: 10499, stock: 10, status: "active", featured: true,
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
    category: mockCategories[3], brand: mockBrands[1],
    sizes, colors: [dressColors.gold, dressColors.emerald],
    variantStock: buildVariantStock(sizes, [dressColors.gold, dressColors.emerald], 2),
    averageRating: 4.8, reviewCount: 22,
  },
  {
    _id: "prod-10", name: "Sage Linen Sundress", slug: slug("sage-linen-sundress"),
    shortDescription: "Relaxed linen dress with smocked bodice",
    description: "Effortless summer dressing in breathable linen. Smocked bodice, adjustable straps, and side pockets for everyday elegance.",
    price: 4499, stock: 28, status: "active", isNewArrival: true,
    imageUrl: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800",
    category: mockCategories[1], brand: mockBrands[2],
    sizes, colors: [{ name: "Sage", hex: "#8a9a7e" }, dressColors.champagne, dressColors.ivory],
    variantStock: buildVariantStock(sizes, [{ name: "Sage", hex: "#8a9a7e" }, dressColors.champagne, dressColors.ivory]),
    averageRating: 4.6, reviewCount: 55,
  },
];

export const mockBanners: Banner[] = [
  {
    _id: "banner-1", title: "The New Season", subtitle: "Spring / Summer 2026",
    description: "Discover flowing silks, delicate lace, and dresses made for golden-hour moments.",
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600",
    link: "/products", buttonText: "Shop Dresses", type: "hero", active: true, order: 1,
  },
  {
    _id: "banner-2", title: "Evening Edit", subtitle: "After Dark",
    description: "Gowns and cocktail dresses crafted for nights you will remember.",
    imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1600",
    link: "/products?category=evening-gowns", buttonText: "View Collection", type: "hero", active: true, order: 2,
  },
  {
    _id: "banner-3", title: "Complimentary Styling", subtitle: "Via WhatsApp",
    description: "Order your perfect size and colour — our stylists confirm fit before dispatch.",
    imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200",
    type: "promotional", active: true, order: 1,
  },
];

export const mockFAQs: FAQ[] = [
  { _id: "faq-1", question: "How do I choose my size?", answer: "Each dress page includes a size guide. Our styles generally run true to size. Message us on WhatsApp for personalised fit advice.", order: 1 },
  { _id: "faq-2", question: "Can I order a different colour?", answer: "Yes — select your preferred colour and size on the product page before adding to bag or ordering via WhatsApp.", order: 2 },
  { _id: "faq-3", question: "How do I place an order?", answer: "Choose your dress, select size and colour, then checkout via WhatsApp. We confirm availability before dispatch.", order: 3 },
  { _id: "faq-4", question: "What is your return policy?", answer: "Unworn dresses with tags attached may be returned within 7 days. Custom or altered pieces are final sale.", order: 4 },
  { _id: "faq-5", question: "How long does delivery take?", answer: "Standard delivery is 3–7 business days across India. Express options available in select cities.", order: 5 },
];

export const mockTestimonials: Testimonial[] = [
  { _id: "test-1", name: "Ananya Kapoor", role: "Bride's sister", content: "Wore the blush pleated dress to my sister's wedding — I received compliments all evening. The fabric quality is exceptional.", rating: 5, featured: true, avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
  { _id: "test-2", name: "Meera Thomas", role: "Fashion editor", content: "Calira Couture understands modern Indian women — elegant dresses that feel special yet wearable. WhatsApp ordering is seamless.", rating: 5, featured: true, avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
  { _id: "test-3", name: "Sofia Rahman", role: "Entrepreneur", content: "The emerald silk midi is my go-to for dinner dates. True to size and the colour is even more beautiful in person.", rating: 5, featured: true, avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
];

export const mockReviews: Review[] = [
  { _id: "rev-1", userName: "Priya M.", rating: 5, title: "Perfect fit", comment: "Ordered size M in emerald — fits like a dream. The silk feels luxurious.", verified: true, approved: true, _createdAt: "2026-02-15" },
  { _id: "rev-2", userName: "Lisa K.", rating: 5, title: "Stunning gown", comment: "Wore the champagne evening gown to a gala. Felt like a million dollars.", verified: true, approved: true, _createdAt: "2026-02-10" },
  { _id: "rev-3", userName: "Divya S.", rating: 4, title: "Beautiful colour", comment: "Love the antique gold brocade. Slightly fitted at the waist — size up if between sizes.", verified: true, approved: true, _createdAt: "2026-01-28" },
];

export const mockOrders: OrderRequest[] = [
  {
    _id: "order-1", orderNumber: "CC-2026-001", type: "cart",
    customer: { name: "Ananya Kapoor", phone: "9876543210", email: "ananya@email.com", address: "Mumbai, India" },
    items: [{ productId: "prod-1", productName: "Emerald Silk Midi Dress", price: 8999, quantity: 1, subtotal: 8999, size: "M", color: "Emerald" }],
    totalItems: 1, grandTotal: 8999, status: "pending", _createdAt: "2026-06-15",
  },
  {
    _id: "order-2", orderNumber: "CC-2026-002", type: "cart",
    customer: { name: "Meera Thomas", phone: "9876543211", address: "Delhi, India" },
    items: [
      { productId: "prod-2", productName: "Champagne Satin Evening Gown", price: 14999, quantity: 1, subtotal: 14999, size: "S", color: "Champagne" },
      { productId: "prod-5", productName: "Gold Sequin Party Dress", price: 7999, quantity: 1, subtotal: 7999, size: "M", color: "Antique Gold" },
    ],
    totalItems: 2, grandTotal: 22998, status: "confirmed", _createdAt: "2026-06-14",
  },
];

export const mockUsers: User[] = [
  { _id: "user-1", name: "Ananya Kapoor", email: "ananya@email.com", phone: "9876543210", role: "customer", emailVerified: true },
  { _id: "user-2", name: "Meera Thomas", email: "meera@email.com", phone: "9876543211", role: "customer", emailVerified: true },
  { _id: "user-3", name: "Admin", email: "admin@calira.com", role: "admin", emailVerified: true },
];

export const mockCoupons: Coupon[] = [
  { _id: "coupon-1", code: "CALIRA10", description: "10% off your first dress", discountType: "percentage", discountValue: 10, minOrderAmount: 3000, usageLimit: 100, usedCount: 23, active: true },
  { _id: "coupon-2", code: "GOWN500", description: "₹500 off evening gowns above ₹8000", discountType: "fixed", discountValue: 500, minOrderAmount: 8000, usageLimit: 50, usedCount: 12, active: true },
];
