"use client";

import { useEffect, useState } from "react";
import { SITE_DATA } from "@/lib/site-data";

const LINKS = [
  { href: "#jalan", label: "Jalan" },
  { href: "#menu", label: "Menu" },
  { href: "#tempat", label: "Tempat" },
  { href: "#booking", label: "Reservasi" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Navigasi utama"
      >
        <a href="/" className="flex flex-col leading-none" aria-label="Ruangnamu Coffee & Space — beranda">
          <span className="font-display text-xl font-bold tracking-tight">Ruangnamu</span>
          <span className="font-sans text-xs font-semibold tracking-wide text-muted">
            Coffee <span className="font-sans">&amp;</span> Space
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-joglo hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE_DATA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full border border-ink px-4 py-2 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
          >
            Instagram
          </a>
        </div>

        <button
          type="button"
          className="rounded-full border border-ink px-4 py-2 text-sm font-semibold md:hidden"
          aria-expanded={open}
          aria-controls="nav-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </nav>

      {open && (
        <div id="nav-drawer" className="border-t border-line bg-paper px-4 pb-4 pt-2 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-joglo hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE_DATA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block rounded-lg border border-ink px-3 py-3 text-base font-semibold"
          >
            Instagram {SITE_DATA.instagramHandle}
          </a>
        </div>
      )}
    </header>
  );
}
