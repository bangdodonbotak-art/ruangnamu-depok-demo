"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { SITE_DATA } from "@/lib/site-data";
import {
  createLenisInstance,
  prefersReducedMotion,
  useReducedMotion,
} from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function StoryFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const lenis = createLenisInstance();
    let rafId = 0;

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1025px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const total = SITE_DATA.storyBeats.length;
            const nextIndex = Math.min(
              total - 1,
              Math.floor(self.progress * total)
            );
            setActiveBeat(nextIndex);
            if (railRef.current) {
              gsap.set(railRef.current, { scaleX: self.progress });
            }
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  const current = SITE_DATA.storyBeats[activeBeat];

  return (
    <section
      id="story"
      ref={sectionRef}
      className="border-b border-line bg-bg px-6 py-20 md:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
          <h2 className="text-4xl font-semibold text-ink md:text-[3.5rem]">
            Dari gerbang ke Joglo
          </h2>
          <p className="max-w-sm text-sm text-muted">
            {SITE_DATA.storyUnitLabel}
          </p>
        </div>

        {/* S-01(a) scroll-progress rail: thin accent bar, scaleX follows pin progress, transform only */}
        <div
          aria-hidden="true"
          className="mt-8 h-0.5 w-full bg-line"
        >
          <div
            ref={railRef}
            className="h-full w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            {SITE_DATA.storyBeats.map((beat, idx) => {
              const isActive = idx === activeBeat;
              return (
                <button
                  key={beat.id}
                  type="button"
                  onClick={() => setActiveBeat(idx)}
                  className={`min-h-[44px] border p-5 text-left transition-colors ${
                    isActive
                      ? "border-accent bg-surface"
                      : "border-line bg-bg hover:bg-surface/60"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-semibold text-accent">
                      {beat.step}
                    </span>
                    <span className="text-xs text-muted">
                      {beat.highlightItem}
                    </span>
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold text-ink">
                    {beat.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted lg:hidden">
                    {beat.summary}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col justify-between border border-line bg-surface p-8 md:p-12 lg:col-span-7">
            {/* S-01(c) crossfade on panel content, keyed by activeBeat; S-01(b) oversized step numeral inside */}
            <motion.div
              key={current.id}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.4, ease: "easeOut" }
              }
            >
              <p
                aria-hidden="true"
                className="font-display text-[6rem] leading-none font-semibold text-accent"
              >
                {current.step}
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
                {current.title}
              </h3>
              <p className="mt-4 max-w-xl text-base text-muted md:text-lg">
                {current.summary}
              </p>
            </motion.div>

            <div className="mt-10 border-t border-line pt-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-muted">Sajian di titik ini</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-ink">
                    {current.highlightItem}
                  </p>
                  {current.priceText ? (
                    <p className="mt-1 text-sm font-medium text-ink">
                      {current.priceText}{" "}
                      <span className="text-muted">· {current.basisText}</span>
                    </p>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-ink">
                      Tanya harga{" "}
                      <span className="text-muted">· tanya saat reservasi</span>
                    </p>
                  )}
                </div>
                <a
                  href="#booking"
                  className="inline-flex min-h-[44px] items-center bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
                >
                  {SITE_DATA.primaryCtaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
