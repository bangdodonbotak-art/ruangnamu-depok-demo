import Image from "next/image";
import { SITE_DATA } from "@/lib/site-data";

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
    <section id="photobox" aria-label="Photobox" className="section-pad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="display-lg">RedRoom Photobox</h2>
            <p className="body-lg mt-4 max-w-[55ch] text-muted">
              Bilik foto digital di sudut kafe — cetak kenangan sebelum pulang,
              bareng siapa pun yang ikut duduk di meja.
            </p>
            <p className="mt-8 font-display text-6xl font-bold leading-none text-awning sm:text-7xl">
              {box.priceText}
            </p>
            <p className="mt-3 text-lg font-medium">{box.includes}</p>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-muted">
              Harga peluncuran {box.source} (juga 30K, Jul 2025). {box.note}
            </p>
            <a
              href="#booking"
              onClick={onAddToBooking}
              className="mt-8 inline-block rounded-sm bg-awning px-7 py-3.5 text-base font-semibold text-paper transition-opacity hover:opacity-90"
            >
              Tambah ke reservasi
            </a>
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
