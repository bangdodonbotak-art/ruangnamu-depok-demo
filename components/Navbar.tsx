"use client";

import { useEffect, useState } from "react";
import { SITE_DATA } from "@/lib/site-data";

const LINKS = [
  { href: "#jalan", label: "Jalan" },
  { href: "#menu", label: "Menu" },
  { href: "#tempat", label: "Tempat" },
  { href: "#booking", label: "Reservasi" },
];

/**
 * Navbar v3 — fixed two-state bar. Over the hero it is transparent with
 * Paper text (a Paper bar above the full-bleed film would re-introduce a
 * cream strip at the top of the first viewport); once the hero is
 * scrolled past it becomes the v2 Paper bar. The drawer always renders
 * on solid Paper regardless of state. State swap is an instant class
 * change — the bar is chrome, not motion.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setOverHero(false);
      return;
    }
    // Switch to the Paper bar once the hero is (almost) scrolled past:
    // hero height minus ~80px of nav room.
    const onScroll = () => {
      setOverHero(window.scrollY < hero.offsetHeight - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onFilm = overHero && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 ${
        onFilm ? "border-b border-transparent" : "border-b border-line bg-paper/90 backdrop-blur"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Navigasi utama"
      >
        <a
          href="/"
          className="flex flex-col leading-none"
          aria-label="Ruangnamu Coffee & Space — beranda"
        >
          <span className={`font-display text-xl font-bold tracking-tight ${onFilm ? "text-paper" : "text-ink"}`}>
            Ruangnamu
          </span>
          <span
            className={`font-sans text-xs font-semibold tracking-wide ${
              onFilm ? "text-paper/70" : "text-muted"
            }`}
          >
            Coffee <span className="font-sans">&amp;</span> Space
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                onFilm ? "text-paper hover:bg-paper/15" : "text-ink hover:bg-joglo hover:text-paper"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE_DATA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              onFilm
                ? "border-paper/60 text-paper hover:bg-paper hover:text-ink"
                : "border-ink text-ink hover:bg-ink hover:text-paper"
            }`}
          >
            Instagram
          </a>
        </div>

        <button
          type="button"
          className={`rounded-full border px-4 py-2 text-sm font-semibold md:hidden ${
            onFilm ? "border-paper/60 text-paper" : "border-ink text-ink"
          }`}
          aria-expanded={open}
          aria-controls="nav-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </nav>

      {open && (
        <div id="nav-drawer" className="border-t border-line bg-paper px-4 pb-4 pt-2 text-ink md:hidden">
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
