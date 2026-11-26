"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/open-now";

/**
 * OpenNowChip — live OPEN NOW status computed from the verified hours in
 * SITE_DATA.hoursStructured. SSR renders a static, day-agnostic, factual
 * line (never a live claim); the client swaps in the live chip on mount.
 * If JS fails, the static line remains. Never claims slots, availability,
 * or crowd levels — only open/closed + today's closing/opening hour.
 */
export default function OpenNowChip({ variant = "onFilm" }: { variant?: "onFilm" | "onPaper" }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    setStatus(getOpenStatus(new Date()));
  }, []);

  if (!status) {
    // Fallback colour follows the variant (F-02 fix round 1, 27 Nov 2026):
    // onPaper sits on the Paper ground, so Paper/90 text would be
    // Paper-on-Paper (~1:1, invisible) until hydration swaps in the pill.
    // onFilm keeps Paper/90 — it sits on the dark film + scrim.
    return (
      <p
        className={`text-sm font-semibold ${
          variant === "onPaper" ? "text-ink" : "text-paper/90"
        }`}
      >
        Buka 10.00–22.00 · Jum–Sab sampai 23.00
      </p>
    );
  }

  const pill =
    variant === "onFilm"
      ? "bg-ink/70 text-paper backdrop-blur-sm"
      : "bg-ink text-paper";

  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${pill}`}
      aria-live="polite"
    >
      {status.open ? (
        <>
          <span className="open-dot-pulse inline-block h-2 w-2 rounded-full bg-joglo" aria-hidden="true" />
          Buka sekarang · sampai {status.closesAt}
        </>
      ) : (
        <>
          <span
            className="inline-block h-2 w-2 rounded-full border border-paper/60"
            aria-hidden="true"
          />
          Tutup · buka {status.opensAt}
        </>
      )}
    </p>
  );
}
