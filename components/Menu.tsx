import Image from "next/image";
import { SITE_DATA } from "@/lib/site-data";

/**
 * Menu — 9 items in site-data order, one honest list. No category
 * picker (cut — no category data drives it), no price row on any card, no
 * per-card ask-the-admin badge. The 2 featured dishes carry a photo; the other 7 are
 * text rows. Hover only: card lift 2px + photo zoom 1.02.
 */
export default function Menu() {
  type SiteMenuItem = (typeof SITE_DATA.menuItems)[number];
  const featured: SiteMenuItem[] = [];
  const rest: SiteMenuItem[] = [];
  for (const item of SITE_DATA.menuItems) {
    if (item.featured && item.mediaPath) featured.push(item);
    else rest.push(item);
  }

  return (
    <section id="menu" aria-label="Menu" className="section-pad bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="display-lg">Yang bisa dipesan di meja</h2>
          <p className="body-lg mt-4 text-muted">
            Sembilan sajian rumahan — dari nasi daun jeruk sampai kopi susu
            gula aren. Foto dua hidangan di bawah ini asli dari meja
            Ruangnamu.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
          {featured.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-sm border border-line bg-paper transition-transform duration-300 ease-out hover:-translate-y-0.5"
            >
              <div className="photo-frame aspect-[4/5] w-full">
                {item.mediaPath && (
                  <Image
                    src={item.mediaPath}
                    alt={
                      item.id === "nasi-jeruk-paru"
                        ? "Sepiring nasi daun jeruk dengan paru pedas, timun, dan kerupuk, dilihat dari atas"
                        : "Sepiring pasta carbonara creamy dengan smoked beef dan garlic bread, diangkat dengan dua tangan"
                    }
                    width={800}
                    height={1000}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl font-semibold">{item.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{item.description}</p>
                <p className="mt-3 text-sm font-medium text-wood">{item.basisText}</p>
              </div>
            </article>
          ))}
        </div>

        <ul className="mt-12 divide-y divide-line border-y border-line">
          {rest.map((item) => (
            <li key={item.id} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6">
              <div>
                <h3 className="font-display text-2xl font-semibold">{item.name}</h3>
                <p className="mt-1 max-w-[60ch] text-base leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
              <p className="text-sm font-medium text-wood">{item.basisText}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
