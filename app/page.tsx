"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JourneyWalk from "@/components/JourneyWalk";
import Menu from "@/components/Menu";
import Spaces from "@/components/Spaces";
import Photobox from "@/components/Photobox";
import Proof from "@/components/Proof";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

/**
 * Page composition — order: Navbar, Hero, JourneyWalk, Menu, Spaces,
 * Photobox, Proof, Booking, Footer. The photobox pre-select is component
 * state held here (set when the Photobox CTA is tapped), never a URL hash.
 */
export default function Home() {
  const [photoboxSelected, setPhotoboxSelected] = useState(false);

  return (
    <>
      <Navbar />
      <main id="konten">
        <Hero />
        <JourneyWalk />
        <Menu />
        <Spaces />
        <Photobox onAddToBooking={() => setPhotoboxSelected(true)} />
        <Proof />
        <Booking photoboxSelected={photoboxSelected} onPhotoboxChange={setPhotoboxSelected} />
      </main>
      <Footer />
    </>
  );
}
