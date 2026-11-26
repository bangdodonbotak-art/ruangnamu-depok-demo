"use client";

import { useState } from "react";
import Image from "next/image";
import { SITE_DATA } from "@/lib/site-data";

/**
 * Journey — the walk in 3 stops. The pinned GSAP scroll-film from the
 * blueprint is CUT by the blueprint's own fill-or-cut rule: no clean
 * gerbang (gate) frame exists in any of the 18 candidates, so the walk
 * is 3 stops and ships as stacked inline stops with a tap stepper.
 * The stepper is interaction, not motion — it stays under reduced-motion.
 * No GSAP, no pin, no crossfade anywhere in this component.
 */
export default function JourneyWalk() {
  const beats = SITE_DATA.storyBeats;
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    setActive(index);
    const el = document.getElementById(`stop-${beats[index].id}`);
    if (el) {
      el.scrollIntoView({ behavior: "auto", block: "nearest" });
    }
  };

  return (
    <section id="jalan" aria-label="Jalan menuju Joglo" className="section-pad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="display-lg">Jalan pelan, tiga pemberhentian</h2>
          <p className="body-lg mt-4 text-muted">{SITE_DATA.storyUnitLabel}.</p>
        </div>

        {/* Stepper — numbered buttons + progress dots, touch targets ≥44px */}
        <div className="mt-10 flex flex-wrap items-center gap-3" aria-label="Pemberhentian">
          {beats.map((beat, i) => (
            <button
              key={beat.id}
              type="button"
              aria-current={active === i ? "true" : undefined}
              aria-label={`Pemberhentian ${beat.step}: ${beat.title}`}
              onClick={() => goTo(i)}
              className={`flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full border px-4 py-2 font-display text-lg font-semibold transition-colors ${
                active === i
                  ? "border-joglo bg-joglo text-paper"
                  : "border-line bg-paper text-ink hover:border-joglo"
              }`}
            >
              {beat.step}
              <span className="hidden font-sans text-sm font-medium sm:inline">{beat.title}</span>
            </button>
          ))}
          <div className="ml-1 flex items-center gap-2" aria-hidden="true">
            {beats.map((beat, i) => (
              <span
                key={beat.id}
                className={`h-2 w-2 rounded-full ${active === i ? "bg-joglo" : "bg-line"}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-16 lg:space-y-24">
          {beats.map((beat, i) => (
            <article
              key={beat.id}
              id={`stop-${beat.id}`}
              className={`grid items-center gap-6 lg:grid-cols-2 lg:gap-12`}
            >
              <div className={`photo-frame aspect-[9/16] max-h-[560px] w-full lg:max-h-[640px] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                {beat.mediaPath && (
                  <Image
                    src={beat.mediaPath}
                    alt={
                      beat.id === "beat-joglo"
                        ? "Ruang dalam pendopo Joglo yang kosong: meja kayu, tanaman gantung, dan atap kain"
                        : beat.id === "beat-kolam"
                          ? "Jalan batu di taman yang rimbun, dilihat dari balik gapura tanaman"
                          : "Pengunjung masuk ke ruang photobox merah di bawah spanduk Photoplace"
                    }
                    width={900}
                    height={1600}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                )}
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="font-display text-8xl font-bold leading-none text-joglo" aria-hidden="true">
                  {beat.step}
                </p>
                <h3 className="display-md mt-4">{beat.title}</h3>
                <p className="body-lg mt-4 max-w-[55ch] text-muted">{beat.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
