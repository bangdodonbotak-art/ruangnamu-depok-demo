import type { Metadata } from "next";
import { SITE_DATA } from "@/lib/site-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_DATA.siteUrl),
  title: "Ruangnamu — Kafe Rumah Joglo & Taman di Beji, Depok",
  description:
    "Kafe hidden gem bernuansa rumah Joglo di Kemiri Muka, Depok. Nikmati kopi susu, nasi jeruk paru, taman kolam ikan, dan reservasi meja.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Ruangnamu — Kafe Rumah Joglo & Taman di Beji, Depok",
    description:
      "Rumah Joglo di balik ramai Margonda, untuk ngopi pelan dan pulang kenyang.",
    url: SITE_DATA.siteUrl,
    siteName: SITE_DATA.fullBrandName,
    locale: SITE_DATA.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruangnamu — Kafe Rumah Joglo & Taman di Beji, Depok",
    description:
      "Kafe hidden gem bernuansa rumah Joglo di Kemiri Muka, Beji, Depok.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: SITE_DATA.fullBrandName,
    alternateName: SITE_DATA.alsoKnownAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Ciliwung No.10, RW.1, Kemiri Muka",
      addressLocality: "Beji, Kota Depok",
      addressRegion: "Jawa Barat",
      postalCode: "16423",
      addressCountry: "ID",
    },
    openingHours: ["Mo-Th,Su 10:00-22:00", "Fr-Sa 10:00-23:00"],
    sameAs: [SITE_DATA.instagramUrl],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE_DATA.googleRating,
    },
  };

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-3 focus:text-accent-ink"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
