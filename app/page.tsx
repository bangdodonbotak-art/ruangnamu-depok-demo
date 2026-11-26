import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Proof } from "@/components/Proof";
import { Services } from "@/components/Services";
import { StoryFilm } from "@/components/StoryFilm";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <StoryFilm />
        <Services />
        <Gallery />
        <Proof />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
