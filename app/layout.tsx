import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://classicbarberia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Classic Barbería | Cortes Premium en Laureles, Medellín",
    template: "%s | Classic Barbería",
  },
  description:
    "La mejor barbería de lujo en Laureles, Medellín. Cortes clásicos, afeitado con navaja, ritual de toallas calientes y atención personalizada. Reserva tu turno por WhatsApp.",
  keywords: [
    "barbería Medellín",
    "barbería Laureles",
    "corte de cabello hombre Medellín",
    "afeitado clásico navaja",
    "barbería de lujo Colombia",
    "barbero profesional Antioquia",
  ],
  authors: [{ name: "Classic Barbería" }],
  creator: "Classic Barbería",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: "Classic Barbería",
    title: "Classic Barbería | Cortes Premium en Laureles, Medellín",
    description:
      "La mejor barbería de lujo en Laureles, Medellín. Cortes clásicos, afeitado con navaja, ritual de toallas calientes y atención personalizada.",
    images: [
      {
        url: process.env.NEXT_PUBLIC_BUSINESS_IMAGE ?? `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Classic Barbería — Tradición y Distinción",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Classic Barbería | Cortes Premium en Laureles, Medellín",
    description:
      "La mejor barbería de lujo en Laureles, Medellín. Cortes clásicos, afeitado con navaja y atención personalizada.",
    images: [process.env.NEXT_PUBLIC_BUSINESS_IMAGE ?? `${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${montserrat.variable}`}
    >
      <head>
        {/* Font Awesome for icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
        />
        {/* Structured data — HairSalon LocalBusiness (Medellín) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              name: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Classic Barbería",
              image: process.env.NEXT_PUBLIC_BUSINESS_IMAGE ?? `${siteUrl}/og-image.jpg`,
              url: process.env.NEXT_PUBLIC_SITE_URL ?? siteUrl,
              telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "+57XXXXXXXXXX",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. 80 #53a-10",
                addressLocality: "Medellín",
                addressRegion: "Antioquia",
                addressCountry: "CO",
                postalCode: "050034",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "6.2476",
                longitude: "-75.5958",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday", "Tuesday", "Wednesday",
                    "Thursday", "Friday", "Saturday",
                  ],
                  opens: "08:00",
                  closes: "19:00",
                },
              ],
              sameAs: [
                process.env.NEXT_PUBLIC_INSTAGRAM_URL,
                process.env.NEXT_PUBLIC_FACEBOOK_URL,
              ].filter(Boolean),
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}
