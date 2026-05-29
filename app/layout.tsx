import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import { StickyCTA } from "./components/StickyCTA";
import { CartProvider } from "./components/cart/CartProvider";
import { CartDrawer } from "./components/cart/CartDrawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jami's Kitchen | Nima, Accra",
  description:
    "Delicious, affordable Ghanaian street food in Nima. Angwamo, gizzard, plantain, sausage and fresh salad. Delivery around Accra. Order online via WhatsApp.",
  openGraph: {
    title: "Jami's Kitchen | Nima, Accra",
    description:
      "Rice with oil (Angwamo), plantain, gizzard and more. Nima Shell Filling Station. Order on WhatsApp with delivery around Accra.",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Jami's Kitchen",
  image: "/jamis/angwamo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nima Shell Filling Station (Free Pipe)",
    addressLocality: "Nima, Accra",
    addressCountry: "GH",
  },
  telephone: ["+233535494913", "+233552805691"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "10:00",
    closes: "20:00",
  },
  servesCuisine: "Ghanaian",
  priceRange: "₵",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dancingScript.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <CartProvider>
          {children}
          <CartDrawer />
          <StickyCTA />
        </CartProvider>
      </body>
    </html>
  );
}
