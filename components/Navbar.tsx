"use client";

import { useState } from "react";
import { SITE_DATA } from "@/lib/site-data";

const NAV_LINKS = [
  { href: "#story", label: "Perjalanan" },
  { href: "#services", label: "Menu" },
  { href: "#gallery", label: "Ruang" },
  { href: "#booking", label: "Reservasi" },
  { href: "#visit", label: "Lokasi" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-8">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-6xl items-center justify-between border border-line bg-bg/90 px-5 py-3 backdrop-blur-md"
      >
        <a
          href="/"
          className="font-display text-xl font-bold tracking-tight text-ink"
        >
          {SITE_DATA.brandName}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#booking"
            className="inline-flex min-h-[44px] items-center bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
          >
            {SITE_DATA.primaryCtaLabel}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-line px-3 text-sm font-medium text-ink md:hidden"
        >
          {menuOpen ? "Tutup" : "Menu"}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          className="mx-auto mt-2 flex max-w-6xl flex-col border border-line bg-bg p-4 md:hidden"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[44px] items-center border-b border-line/60 py-2 text-base font-medium text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-[44px] items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-accent-ink"
          >
            {SITE_DATA.primaryCtaLabel}
          </a>
        </div>
      )}
    </header>
  );
}
