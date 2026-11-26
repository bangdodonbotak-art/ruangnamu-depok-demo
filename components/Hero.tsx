"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SITE_DATA } from "@/lib/site-data";
import { shouldPlayFilm } from "@/lib/motion";
import { AnnotationText } from "@/components/annotation-text";
import OpenNowChip from "@/components/OpenNowChip";

const FILM_SRC = "/media/hero/hero-film-9x16.mp4";
const POSTER_SRC = "/media/hero/hero-poster.webp";
const POSTER_ALT =
  "Taman rindang Ruangnamu di pagi hari, staf menyapu jalan batu di antara tanaman hijau";

/**
 * Hero v3 — full-bleed film background with typography OVER the film.
 * Desktop: the 9:16 master is rendered oversized (top -15%, height 130%)
 * with a slow vertical drift, so the visible band pans through the frame
 * (garden → people → pour). Mobile: the master fits 375×667 almost
 * exactly — no oversize, no drift. Two scrim layers (flat Ink + a
 * monochrome Ink ramp over the lower 70%) keep the Paper type readable.
 * Text is static at first paint — no entrance animation, no hidden start
 * state; only the AnnotationText SVG mark draws after mount. The film
 * only mounts after a client-side check (reduced-motion or Save-Data →
 * the poster still fills the viewport, never a video, no Pause button).
 */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [paused, setPaused] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);

  useEffect(() => {
    setCanPlay(shouldPlayFilm());
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || !canPlay) return;
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
    io.observe(section);
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
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Ruangnamu Coffee & Space"
      className="hero-viewport relative overflow-hidden"
    >
      {/* Film / poster — absolute background, edge to edge. */}
      <div className="absolute inset-0" aria-hidden="true">
        {canPlay ? (
          <video
            ref={videoRef}
            className="hero-media-drift absolute inset-x-0 top-0 h-full w-full object-cover object-[50%_38%] lg:top-[-15%] lg:h-[130%]"
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
            alt={POSTER_ALT}
            width={720}
            height={1280}
            priority
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
          />
        )}
      </div>

      {/* Scrim — layer 1 flat Ink 45% (raised from 35/40 per §5.3: the
          worst-pixel sampling at 0.35 failed the H1 3:1 bar at film
          t=2.5s/8.0s; at 0.45 every element band passes), layer 2
          monochrome Ink ramp over the lower 70%. No hue, no colour stop. */}
      <div className="pointer-events-none absolute inset-0 bg-ink/45" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background: "linear-gradient(to top, rgb(26 30 27 / 0.85), rgb(26 30 27 / 0))",
        }}
        aria-hidden="true"
      />

      {/* Content — bottom-anchored, left-aligned. Static at first paint. */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-5 sm:px-6 lg:px-12 lg:pb-8">
        <p className="text-lg font-semibold text-paper">±50 m dari Jl. Margonda Raya</p>
        <h1 className="display-xl mt-3 text-paper lg:mt-4">
          {SITE_DATA.heroHeadlineLines.slice(0, 3).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block">
            <AnnotationText
              type="underline"
              color="var(--color-paper)"
              strokeWidth={3}
              delay={0.9}
              duration={0.7}
            >
              ngopi pelan.
            </AnnotationText>
          </span>
        </h1>
        <p className="body-lg mt-4 max-w-[55ch] text-paper/90 lg:mt-6">{SITE_DATA.heroSubtext}</p>
        <div className="mt-6 lg:mt-8">
          <a
            href="#booking"
            className="inline-block rounded-sm bg-joglo px-7 py-3.5 text-base font-semibold text-paper transition-opacity hover:opacity-90"
          >
            {SITE_DATA.primaryCtaLabel}
          </a>
        </div>
        <div className="mt-4">
          <OpenNowChip variant="onFilm" />
        </div>
        <div className="mt-6 flex items-start gap-4">
          <div className="h-12 w-px shrink-0 bg-paper/70" aria-hidden="true" />
          <p className="text-sm font-medium text-paper/70">Gulir — 3 pemberhentian menuju Joglo</p>
        </div>
      </div>

      {/* Pause — bottom-right on desktop; raised on mobile so it clears
          the scroll-cue row (CTA is left-anchored, Pause right-anchored). */}
      {canPlay && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={paused ? "Putar film" : "Jeda film"}
          className="absolute bottom-24 right-4 z-10 min-h-[44px] rounded-full border border-paper/60 bg-ink/70 px-4 py-2.5 text-sm font-semibold text-paper backdrop-blur-sm transition-opacity hover:opacity-90 lg:bottom-6 lg:right-6"
        >
          {paused ? "Putar" : "Jeda"}
        </button>
      )}
    </section>
  );
}
