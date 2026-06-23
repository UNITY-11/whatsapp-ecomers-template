import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

import "./globals.css";

import { Footer } from "@/shared/components/layout/footer";
import { Header } from "@/shared/components/layout/header";
import { SmoothScrolling } from "@/shared/components/layout/smooth-scrolling";
import { ContactFab } from "@/shared/components/shared/contact-fab";
import { Toaster } from "@/shared/components/ui/sonner";
import { APP_NAME, APP_URL, BRAND_NAME, BRAND_TAGLINE } from "@/shared/lib/constants";
import { QueryProvider } from "@/shared/providers/query-provider";
import { generateOrganizationJsonLd } from "@/shared/utils/seo";
import { CartDrawer } from "@/features/cart/components/cart-drawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-brand",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} ${BRAND_TAGLINE} — Premium Ladies Dresses`,
    template: `%s | ${BRAND_NAME} ${BRAND_TAGLINE}`,
  },
  description:
    "Discover elegant evening gowns, midi dresses, and occasion wear at Calira Couture. Shop curated ladies fashion with WhatsApp ordering.",
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: APP_URL,
    siteName: APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationJsonLd()) }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans antialiased" suppressHydrationWarning>
        <QueryProvider>
          <SmoothScrolling>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <ContactFab />
            <Toaster position="top-right" richColors />
          </SmoothScrolling>
        </QueryProvider>
      </body>
    </html>
  );
}
