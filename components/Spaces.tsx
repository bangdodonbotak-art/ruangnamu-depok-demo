import Image from "next/image";
import { SITE_DATA } from "@/lib/site-data";
import { BlurText } from "@/components/blur-text";

const ALTS: Record<string, string> = {
  "space-joglo":
    "Konter layanan Ruangnamu di bawah atap Joglo: balok kayu, lampu rotan, dan hiasan hijau",
  "space-kolam": "Dinding tanaman monstera dan bougainvillea merah muda di taman",
  "space-wfc":
    "Meja kayu panjang di bawah atap Joglo pada malam hari, diterangi lampu gantung hangat",
  "space-parkir":
    "Halaman parkir dengan motor terparkir di depan bangunan kafe yang ditumbuhi bougainvillea",
};

/**
 * Spaces — photo wall, portrait-native, not a filterable gallery.
 * Each space gets one line of verified fact only. Hover zoom only.
 */
export default function Spaces() {
  return (
    <section id="tempat" aria-label="Tempat" className="section-pad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <BlurText
            as="h2"
            by="word"
            stagger={0.06}
            duration={0.7}
            trigger="inView"
            className="display-lg"
            text="Empat sudut yang bikin betah"
          />
          <p className="body-lg mt-4 text-muted">
            Pendopo kayu, taman dan kolam, meja kerja, sampai halaman parkir —
            semuanya dalam satu halaman yang sama.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_DATA.spaces.map((space) => (
            <article key={space.id} className="group">
              <div className="photo-frame aspect-[9/16] w-full">
                {space.mediaPath && (
                  <Image
                    src={space.mediaPath}
                    alt={ALTS[space.id] ?? space.title}
                    width={900}
                    height={1600}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                )}
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{space.title}</h3>
              <p className="mt-1 text-base leading-relaxed text-muted">{space.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
