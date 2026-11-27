"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SITE_DATA } from "@/lib/site-data";
import { ContourLines } from "@/components/contour-lines";
import { MagneticButton } from "@/components/magnetic-button";

/**
 * Finder — Pencari Sudut (v4 §8). "Mau ngapain di sini?" → four intent
 * buttons → one verified corner (photo + title + verbatim detail from
 * site-data.ts) → one-tap "Reservasi di [Area]" that pre-selects the
 * booking area (and the photobox checkbox for the photobox intent).
 * A finder, not a quiz: every result is a row that already exists in
 * site-data.ts. The result NEVER shows a price.
 * H2 is plain text by design (§8.6) — the canvas is the section's motion.
 * Photos re-use the home-section stills with the same alt text (§8.5).
 */

const ALTS: Record<string, string> = {
  "space-joglo":
    "Konter layanan Ruangnamu di bawah atap Joglo: balok kayu, lampu rotan, dan hiasan hijau",
  "space-kolam": "Dinding tanaman monstera dan bougainvillea merah muda di taman",
  "space-wfc":
    "Meja kayu panjang di bawah atap Joglo pada malam hari, diterangi lampu gantung hangat",
};

const PHOTOBOX_ALT =
  "Pasangan berdiri di depan bilik photobox, di samping spanduk Photoplace dan rak gantungan kunci";

type Intent = {
  id: string;
  label: string;
  line: string;
  /** space id from site-data.ts, or "photobox" for the RedRoom result. */
  target: string;
  /** Booking area pre-selected by this intent (an AREAS value). */
  area: string;
  /** Intent 3 also pre-selects the photobox checkbox. */
  photobox: boolean;
};

const INTENTS: Intent[] = [
  {
    id: "kerja",
    label: "Kerja / nugas",
    line: "Meja, colokan, Wi-Fi",
    target: "space-wfc",
    area: "Pendopo Joglo",
    photobox: false,
  },
  {
    id: "taman",
    label: "Ngopi santai di taman",
    line: "Semi-outdoor, kolam ikan",
    target: "space-kolam",
    area: "Teras Taman & Kolam Ikan",
    photobox: false,
  },
  {
    id: "foto",
    label: "Foto-foto di photobox",
    line: "Bilik merah, cetak + softfile",
    target: "photobox",
    area: "Bebas (mana yang tersedia)",
    photobox: true,
  },
  {
    id: "rombongan",
    label: "Makan bareng rombongan",
    line: "Meja kayu panjang di Joglo",
    target: "space-joglo",
    area: "Pendopo Joglo",
    photobox: false,
  },
];

interface FinderProps {
  onSelectArea: (area: string, photobox: boolean) => void;
}

export default function Finder({ onSelectArea }: FinderProps) {
  const [selected, setSelected] = useState<Intent | null>(null);
  const [pointerFine, setPointerFine] = useState(false);

  useEffect(() => {
    setPointerFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const space = selected
    ? SITE_DATA.spaces.find((s) => s.id === selected.target)
    : undefined;
  const isPhotobox = selected?.target === "photobox";
  const resultTitle = isPhotobox ? "RedRoom Photobox" : space?.title;
  const resultPhoto = isPhotobox ? "/media/photobox-booth.webp" : space?.mediaPath;
  const resultAlt = isPhotobox ? PHOTOBOX_ALT : selected ? ALTS[selected.target] : undefined;

  return (
    <section id="sudut" aria-label="Pencari sudut" className="section-pad relative bg-paper">
      {/* ContourLines canvas — the section's background only (§5.5).
          Pointer hill on pointer-fine only; touch gets the ambient drift. */}
      <ContourLines
        color="var(--color-wood)"
        lines={10}
        scale={1}
        speed={0.6}
        lift={0.6}
        interactive={pointerFine}
        className="absolute inset-0"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="display-lg">Cari sudut yang cocok</h2>
          <p className="body-lg mt-4 text-muted">
            Empat suasana, satu halaman yang sama. Pilih satu — sudut yang cocok muncul di
            bawah, lengkap dengan fotonya.
          </p>
        </div>

        <div
          role="radiogroup"
          aria-label="Suasana yang dicari"
          className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {INTENTS.map((intent) => {
            const active = selected?.id === intent.id;
            return (
              <button
                key={intent.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelected(intent)}
                className={`min-h-[44px] rounded-sm border px-4 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-joglo active:scale-[0.97] ${
                  active ? "border-joglo bg-joglo text-paper" : "border-line bg-paper text-ink"
                }`}
              >
                <span className="block text-base font-semibold">{intent.label}</span>
                <span
                  className={`mt-1 block text-sm ${active ? "text-paper/80" : "text-muted"}`}
                >
                  {intent.line}
                </span>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-8">
          {selected ? (
            <article
              key={selected.id}
              className="anim-rise-250 grid gap-6 rounded-sm border border-line bg-paper p-6 sm:grid-cols-[200px_1fr] sm:p-8"
            >
              {resultPhoto && (
                <div className="photo-frame aspect-[9/16] w-full max-w-[200px]">
                  <Image
                    src={resultPhoto}
                    alt={resultAlt ?? resultTitle ?? ""}
                    width={900}
                    height={1600}
                    sizes="200px"
                    loading="lazy"
                  />
                </div>
              )}
              <div>
                <h3 className="font-display text-2xl font-semibold">{resultTitle}</h3>
                {isPhotobox ? (
                  <p className="mt-2 text-base leading-relaxed text-muted">
                    {SITE_DATA.photobox.includes}
                  </p>
                ) : (
                  <p className="mt-2 max-w-[55ch] text-base leading-relaxed text-muted">
                    {space?.detail}
                  </p>
                )}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <MagneticButton
                    href="#booking"
                    variant="solid"
                    size="lg"
                    strength={0.35}
                    labelStrength={0.15}
                    spotlight={false}
                    onClick={() => onSelectArea(selected.area, selected.photobox)}
                    className="bg-joglo text-paper focus-visible:ring-0"
                  >
                    Reservasi di {selected.area}
                  </MagneticButton>
                  <MagneticButton
                    href="#tempat"
                    variant="outline"
                    size="md"
                    strength={0.3}
                    labelStrength={0.15}
                    spotlight={false}
                    className="border-ink bg-paper text-ink backdrop-blur-none hover:bg-ink hover:text-paper focus-visible:ring-0"
                  >
                    Lihat semua sudut
                  </MagneticButton>
                </div>
              </div>
            </article>
          ) : (
            <p className="text-base text-muted">
              Pilih satu suasana di atas — sudut yang cocok muncul di sini.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
