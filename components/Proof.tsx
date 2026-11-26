import { SITE_DATA } from "@/lib/site-data";

export function Proof() {
  if (SITE_DATA.verifiedReviews.length === 0) {
    return null;
  }

  const review = SITE_DATA.verifiedReviews[0];

  return (
    <section className="border-b border-line bg-bg px-6 py-16 md:px-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold text-ink md:text-[3.5rem]">
          Catatan pengunjung
        </h2>

        <blockquote className="mt-10 max-w-4xl">
          <p className="text-xs font-semibold text-accent">
            Rating {SITE_DATA.googleRating}/5 di Google Maps
          </p>
          <p className="mt-4 font-display text-3xl leading-snug font-semibold text-ink md:text-4xl">
            &ldquo;{review.quote}&rdquo;
          </p>
          <footer className="mt-6 text-sm text-muted">
            <span className="font-semibold text-ink">{review.author}</span>
            {" · "}
            {review.source} · {review.date}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
