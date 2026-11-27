"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JourneyWalk from "@/components/JourneyWalk";
import Menu from "@/components/Menu";
import Spaces from "@/components/Spaces";
import Finder from "@/components/Finder";
import Photobox from "@/components/Photobox";
import Proof from "@/components/Proof";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

/**
 * Page composition — order: Navbar, Hero, JourneyWalk, Menu, Spaces,
 * Finder, Photobox, Proof, Booking, Footer. The photobox pre-select is
 * component state held here (set when the Photobox CTA is tapped), never
 * a URL hash. The Finder area pre-select (v4 §8.4) is the same pattern:
 * areaPreset { area, nonce } is set by the Finder and consumed once by
 * Booking; the photobox checkbox reuses photoboxSelected.
 */
export default function Home() {
  const [photoboxSelected, setPhotoboxSelected] = useState(false);
  const [areaPreset, setAreaPreset] = useState<{ area: string; nonce: number } | null>(null);

  const handleSelectArea = (area: string, photobox: boolean) => {
    if (photobox) setPhotoboxSelected(true);
    setAreaPreset({ area, nonce: Date.now() });
  };

  return (
    <>
      <Navbar />
      <main id="konten">
        <Hero />
        <JourneyWalk />
        <Menu />
        <Spaces />
        <Finder onSelectArea={handleSelectArea} />
        <Photobox onAddToBooking={() => setPhotoboxSelected(true)} />
        <Proof />
        <Booking
          photoboxSelected={photoboxSelected}
          onPhotoboxChange={setPhotoboxSelected}
          areaPreset={areaPreset}
          onAreaPresetConsumed={() => setAreaPreset(null)}
        />
      </main>
      <Footer />
    </>
  );
}
