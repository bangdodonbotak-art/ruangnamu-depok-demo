"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SITE_DATA, type GallerySpace } from "@/lib/site-data";
import { useReducedMotion } from "@/lib/motion";

const ZONES = ["Semua", "Joglo", "Taman", "Fasilitas"] as const;

export function Gallery() {
  const [selectedZone, setSelectedZone] =
    useState<(typeof ZONES)[number]>("Semua");
  const [activeSpace, setActiveSpace] = useState<GallerySpace | null>(null);
  const reduceMotion = useReducedMotion();

  const visibleSpaces =
    selectedZone === "Semua"
      ? SITE_DATA.gallerySpaces
      : SITE_DATA.gallerySpaces.filter((s) => s.zone === selectedZone);

  return (
    <section
      id="gallery"
      className="border-b border-line bg-surface px-6 py-24 md:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div>
          <h2 className="text-4xl font-semibold text-ink md:text-[3.5rem]">
            Sudut ruang & fasilitas
          </h2>
          <div
            className="mt-6 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter zona ruang"
          >
            {ZONES.map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`min-h-[44px] border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedZone === zone
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line bg-bg text-ink hover:bg-surface"
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-12">
          {visibleSpaces.map((space, idx) => (
            <motion.button
              key={space.id}
              type="button"
              onClick={() => setActiveSpace(space)}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.6, ease: "easeOut", delay: idx * 0.12 }
              }
              className={`group flex flex-col justify-between border border-line bg-bg p-7 text-left transition-colors hover:border-accent ${
                idx % 3 === 0 ? "md:col-span-7" : "md:col-span-5"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-accent">
                  {space.zone}
                </span>
                <span className="text-xs text-muted group-hover:text-ink">
                  Detail ruang →
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-ink">
                  {space.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{space.detail}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {activeSpace && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="space-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
          onClick={() => setActiveSpace(null)}
        >
          <div
            className="w-full max-w-lg border border-line bg-bg p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-semibold text-accent">
              {activeSpace.zone}
            </p>
            <h3
              id="space-dialog-title"
              className="mt-2 text-3xl font-semibold text-ink"
            >
              {activeSpace.title}
            </h3>
            <p className="mt-4 text-base text-muted">{activeSpace.detail}</p>
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveSpace(null)}
                className="min-h-[44px] border border-line px-5 py-2.5 text-sm font-medium text-ink"
              >
                Tutup
              </button>
              <a
                href="#booking"
                onClick={() => setActiveSpace(null)}
                className="inline-flex min-h-[44px] items-center bg-accent px-6 py-2.5 text-sm font-semibold text-accent-ink"
              >
                {SITE_DATA.primaryCtaLabel}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
