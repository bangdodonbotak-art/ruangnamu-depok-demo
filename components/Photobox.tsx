import Image from "next/image";
import { SITE_DATA } from "@/lib/site-data";
import { BlurText } from "@/components/blur-text";
import { MagneticButton } from "@/components/magnetic-button";

interface PhotoboxProps {
  onAddToBooking: () => void;
}

/**
 * Photobox — RedRoom, opened 6 Feb 2025. The ONE price on the page,
 * rendered from SITE_DATA.photobox.priceText (never a literal here).
 * Motion: hover-zoom only. No scroll-entry animation, no entrance.
 */
export default function Photobox({ onAddToBooking }: PhotoboxProps) {
  const box = SITE_DATA.photobox;

  return (
    <section id="photobox" aria-label="Photobox" className="section-pad-tight-bottom">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <BlurText
              as="h2"
              by="word"
              stagger={0.06}
              duration={0.7}
              trigger="inView"
              className="display-lg"
              text="RedRoom Photobox"
            />
            <p className="body-lg mt-4 max-w-[55ch] text-muted">
              Bilik foto digital di sudut kafe — cetak kenangan sebelum pulang,
              bareng siapa pun yang ikut duduk di meja.
            </p>
            <p className="mt-8 font-display text-6xl font-bold leading-none text-awning sm:text-7xl">
              {box.priceText}
            </p>
            <p className="mt-3 text-lg font-medium">{box.includes}</p>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-muted">
              {box.sourceLine}
            </p>
            <MagneticButton
              href="#booking"
              onClick={onAddToBooking}
              variant="solid"
              size="lg"
              strength={0.35}
              labelStrength={0.15}
              spotlight={false}
              className="mt-8 bg-awning text-paper focus-visible:ring-0"
            >
              Tambah ke reservasi
            </MagneticButton>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="photo-frame aspect-[9/16] w-full">
              <Image
                src="/media/photobox-booth.webp"
                alt="Pasangan berdiri di depan bilik photobox, di samping spanduk Photoplace dan rak gantungan kunci"
                width={900}
                height={1600}
                sizes="(max-width: 1024px) 50vw, 25vw"
                loading="lazy"
              />
            </div>
            <div className="photo-frame aspect-[9/16] w-full">
              <Image
                src="/media/photobox-detail.webp"
                alt="Dua strip foto cetak dari photobox yang diselipkan di saku celana"
                width={540}
                height={960}
                sizes="(max-width: 1024px) 50vw, 25vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
