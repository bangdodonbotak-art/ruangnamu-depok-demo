import type { Metadata } from "next";
import { SITE_DATA } from "@/lib/site-data";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";

const TITLE = "Ruangnamu Coffee & Space — Kafe Joglo di Beji, Depok";
const DESCRIPTION =
  "Kafe Joglo di Kemiri Muka, Beji — taman rindang, kolam ikan, dan kopi pelan 50 meter dari Margonda. Reservasi meja lewat DM Instagram @ruangnamucoffee.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_DATA.siteUrl),
  alternates: { canonical: SITE_DATA.siteUrl },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_DATA.siteUrl,
    siteName: SITE_DATA.fullBrandName,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/media/hero/hero-poster.webp",
        width: 720,
        height: 1280,
        alt: "Taman rindang Ruangnamu di pagi hari, staf menyapu jalan batu di antara tanaman hijau",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/media/hero/hero-poster.webp"],
  },
  robots: { index: true, follow: true },
};

/**
 * JSON-LD: CafeOrCoffeeShop. No aggregateRating — Google requires a
 * ratingValue AND a count of ratings/reviews for AggregateRating, and the
 * review count is unverified (never publish it); self-serving review
 * markup on the business's own site is ineligible for rich results
 * anyway. The 4.7 rating stays as plain copy on the page (§6.7/§6.9).
 * No Review markup either — the one verified quote carries no star value.
 */
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: SITE_DATA.fullBrandName,
  alternateName: SITE_DATA.alsoKnownAs,
  url: SITE_DATA.siteUrl,
  sameAs: [SITE_DATA.instagramUrl],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Ciliwung No.10, RW.1, Kemiri Muka",
    addressLocality: "Beji, Kota Depok",
    addressRegion: "Jawa Barat",
    postalCode: "16423",
    addressCountry: "ID",
  },
  // Derived from SITE_DATA.hoursStructured — single source of truth,
  // never a duplicated copy of the hours.
  openingHoursSpecification: SITE_DATA.hoursStructured.map((row) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: (row.days as readonly number[]).map((d) => DAY_NAMES[d]),
    opens: row.opens,
    closes: row.closes,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Lewati ke konten
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
