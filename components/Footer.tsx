import { SITE_DATA } from "@/lib/site-data";

export function Footer() {
  return (
    <footer
      id="visit"
      className="bg-ink px-6 py-16 text-bg md:px-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 border-b border-bg/20 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-bold text-bg">
              {SITE_DATA.fullBrandName}
            </p>
            <p className="mt-2 max-w-sm text-xs text-bg/60">
              Juga dikenal sebagai {SITE_DATA.alsoKnownAs}.
            </p>
            <p className="mt-4 max-w-sm text-sm text-bg/75">
              {SITE_DATA.address}
            </p>
            <p className="mt-3 max-w-sm text-xs text-bg/60">
              {SITE_DATA.landmarkNote}
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-sans text-sm font-semibold text-bg">
              Jam Buka
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-bg/80">
              {SITE_DATA.hours.map((row) => (
                <li key={row.days}>
                  <span className="block font-medium text-bg">{row.days}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-sans text-sm font-semibold text-bg">
              Kanal Resmi
            </h2>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <a
                  href={SITE_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center text-bg/85 underline underline-offset-4 hover:text-bg"
                >
                  Instagram {SITE_DATA.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  className="inline-flex min-h-[44px] items-center text-bg/85 underline underline-offset-4 hover:text-bg"
                >
                  Formulir {SITE_DATA.primaryCtaLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 text-xs text-bg/65 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_DATA.fullBrandName}.
          </p>
          <p>
            Aset visual: belum ada foto resmi di <code>public/media/</code>{" "}
            (tampilan menggunakan panel tipografi &amp; tonal).
          </p>
        </div>
      </div>
    </footer>
  );
}
