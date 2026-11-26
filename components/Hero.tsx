"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SITE_DATA } from "@/lib/site-data";
import { shouldPlayFilm } from "@/lib/motion";

const FILM_SRC = "/media/hero/hero-film-9x16.mp4";
const POSTER_SRC = "/media/hero/hero-poster.webp";

/**
 * Hero — asymmetric split. Desktop: ~55% ground / ~45% full-height native
 * 9:16 film panel. Mobile: film first, sized BY HEIGHT (h-[24svh], full
 * width — never aspect-ratio + max-h: that geometry shrank the panel to
 * 293px with an 82px cream strip, Audit-V2 F3), ground below with tight
 * mobile spacing so H1 + subtext + CTA all sit in the first 667px viewport
 * (Audit-V2 F4). Text is static at first paint — no entrance animation, no
 * hidden start state. The film only mounts after a client-side check
 * (reduced-motion or Save-Data → poster still fills the panel, never a video).
 */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [paused, setPaused] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);

  useEffect(() => {
    setCanPlay(shouldPlayFilm());
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const panel = panelRef.current;
    if (!video || !panel || !canPlay) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!manuallyPaused) {
            void video.play().catch(() => undefined);
            setPaused(false);
          }
        } else {
          video.pause();
          setPaused(true);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(panel);
    return () => io.disconnect();
  }, [canPlay, manuallyPaused]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => undefined);
      setPaused(false);
      setManuallyPaused(false);
    } else {
      video.pause();
      setPaused(true);
      setManuallyPaused(true);
    }
  };

  return (
    <section aria-label="Ruangnamu Coffee & Space" className="relative">
      <div className="grid lg:min-h-svh lg:grid-cols-[55%_45%]">
        {/* Ground — left on desktop, below the film on mobile */}
        <div className="order-2 flex flex-col justify-center px-4 pb-12 pt-4 sm:px-6 lg:order-1 lg:px-12 lg:pb-20 lg:pt-16 xl:px-16">
          <p className="font-display text-lg font-semibold text-joglo">
            ±50 m dari Jl. Margonda Raya
          </p>
          <h1 className="display-xl mt-3 lg:mt-4">
            {SITE_DATA.heroHeadlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="body-lg mt-4 max-w-[55ch] text-muted lg:mt-6">{SITE_DATA.heroSubtext}</p>
          <div className="mt-6 lg:mt-8">
            <a
              href="#booking"
              className="inline-block rounded-sm bg-joglo px-7 py-3.5 text-base font-semibold text-paper transition-opacity hover:opacity-90"
            >
              {SITE_DATA.primaryCtaLabel}
            </a>
          </div>
          <div className="mt-8 flex items-start gap-4 lg:mt-12">
            <div className="h-12 w-px shrink-0 bg-joglo" aria-hidden="true" />
            <p className="text-sm font-medium text-muted">
              Gulir — 3 pemberhentian menuju Joglo
            </p>
          </div>
        </div>

        {/* Film — right on desktop, first on mobile. Sized BY HEIGHT on
            mobile (F3): aspect-ratio + max-h capped the width at 293px and
            left an 82px cream strip plus a 147px phantom grid gap. */}
        <div
          ref={panelRef}
          className="photo-frame relative order-1 h-[24svh] w-full lg:order-2 lg:h-auto lg:min-h-svh"
        >
          {canPlay ? (
            <video
              ref={videoRef}
              className="block h-full w-full object-cover"
              src={FILM_SRC}
              poster={POSTER_SRC}
              muted
              loop
              playsInline
              autoPlay
              aria-label="Film suasana pagi di Ruangnamu Coffee & Space"
            />
          ) : (
            <Image
              src={POSTER_SRC}
              alt="Espresso dituang ke cangkir di Ruangnamu Coffee & Space"
              width={720}
              height={1280}
              priority
              className="block h-full w-full object-cover"
            />
          )}
          {canPlay && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label={paused ? "Putar film" : "Jeda film"}
              className="absolute bottom-4 right-4 rounded-full border border-paper/60 bg-ink/70 px-4 py-2 text-sm font-semibold text-paper backdrop-blur-sm transition-opacity hover:opacity-90"
            >
              {paused ? "Putar" : "Jeda"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
