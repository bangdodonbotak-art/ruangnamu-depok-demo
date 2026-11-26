import Image from "next/image";
import { SITE_DATA } from "@/lib/site-data";

/**
 * Visit / Footer — Ink ground, last element on the page, no trailing gap.
 * Address, landmark, hours, IG follow, rating line repeat, alias line,
 * one-line photo credits linking to the manifest, one small night frame.
 */
export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            <p className="flex flex-col leading-none">
              <span className="font-display text-3xl font-bold tracking-tight">Ruangnamu</span>
              <span className="mt-1 font-sans text-sm font-semibold tracking-wide text-paper/70">
                Coffee <span className="font-sans">&amp;</span> Space
              </span>
            </p>
            <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-paper/80">
              {SITE_DATA.address}
            </p>
            <p className="mt-2 max-w-[55ch] text-base leading-relaxed text-paper/80">
              {SITE_DATA.landmarkNote}
            </p>
            <div className="mt-6">
              <p className="text-sm font-semibold text-paper">Jam buka</p>
              {SITE_DATA.hours.map((h) => (
                <p key={h.days} className="mt-1 text-base text-paper/80">
                  {h.days} — {h.time}
                </p>
              ))}
            </div>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-paper/80">
              Buka sampai malam — mushola di area belakang.
            </p>
            <p className="mt-6 text-base font-semibold">
              Rating {SITE_DATA.googleRating}/5 di Google Maps
            </p>
            <p className="mt-2 text-base text-paper/70">
              Juga dikenal sebagai {SITE_DATA.alsoKnownAs}.
            </p>
            <a
              href={SITE_DATA.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-sm bg-paper px-6 py-3 text-base font-semibold text-ink transition-opacity hover:opacity-90"
            >
              Ikuti {SITE_DATA.instagramHandle}
            </a>
          </div>

          <div>
            <div className="photo-frame aspect-[9/16] w-full max-w-[280px]">
              <Image
                src="/media/visit-night.webp"
                alt="Jalan setapak kafe pada malam hari dengan rambu mushola berwarna merah"
                width={540}
                height={960}
                sizes="280px"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line-on-ink pt-6 text-sm leading-relaxed text-paper/70">
          <p>
            Foto &amp; video: Instagram {SITE_DATA.instagramHandle} dan para kreator — lihat{" "}
            <a href="/media/MANIFEST.md" className="font-semibold text-paper underline">
              MANIFEST.md
            </a>
          </p>
          <p className="mt-2">
            {SITE_DATA.fullBrandName} — demo. Harga &amp; jam dikonfirmasi admin saat reservasi.
          </p>
        </div>
      </div>
    </footer>
  );
}
