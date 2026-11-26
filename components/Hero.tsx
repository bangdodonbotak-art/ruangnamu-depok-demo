"use client";

import { motion } from "motion/react";
import { SITE_DATA } from "@/lib/site-data";
import { useReducedMotion } from "@/lib/motion";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[92vh] items-end border-b border-line bg-surface px-6 pt-32 pb-16 md:px-16 md:pb-24">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h1 className="text-[clamp(2.75rem,6vw,5.125rem)] font-bold text-ink">
            {SITE_DATA.heroHeadlineLines.map((line, idx) => (
              <motion.span
                key={idx}
                className="block"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.75, ease: "easeOut", delay: idx * 0.09 }
                }
              >
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="mt-6 max-w-xl text-base text-muted md:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.75, ease: "easeOut", delay: 0.27 }
            }
          >
            {SITE_DATA.heroSubtext}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.75, ease: "easeOut", delay: 0.36 }
            }
          >
            <a
              href="#booking"
              className="inline-flex min-h-[44px] items-center bg-accent px-8 py-4 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
            >
              {SITE_DATA.primaryCtaLabel}
            </a>
            <a
              href="#story"
              className="inline-flex min-h-[44px] items-center border border-line bg-bg px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-surface"
            >
              Lihat Perjalanan Ruang
            </a>
          </motion.div>
          <div className="mt-12">
            <p className="text-sm font-medium text-muted">
              Gulir — 4 pemberhentian menuju Joglo
            </p>
            <span
              aria-hidden="true"
              className="mt-3 block h-12 w-px bg-accent"
            />
          </div>
        </div>

        <div className="border-t border-line pt-5 text-sm text-muted lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <p className="font-display text-5xl font-semibold text-ink">
            ±50 m
          </p>
          <p className="mt-2 text-xs font-medium text-accent">
            dari Jl. Margonda Raya
          </p>
          <p className="mt-4 font-semibold text-ink">{SITE_DATA.fullBrandName}</p>
          <p className="mt-2">{SITE_DATA.landmarkNote}</p>
          <p className="mt-3 font-medium text-ink">
            {SITE_DATA.hours[0].days}: {SITE_DATA.hours[0].time}
          </p>
        </div>
      </div>
    </section>
  );
}
