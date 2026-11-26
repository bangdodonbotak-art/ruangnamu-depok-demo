import { SITE_DATA } from "@/lib/site-data";

/**
 * Proof — the one verified voice. Full-width editorial quote, no grid,
 * no carousel, no motion. Rating line above; never a review count.
 */
export default function Proof() {
  const review = SITE_DATA.verifiedReviews[0];

  return (
    <section aria-label="Ulasan pengunjung" className="proof-pad">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-base font-semibold text-joglo">
          Rating {SITE_DATA.googleRating}/5 di Google Maps
        </p>
        <blockquote className="mt-6">
          <p className="font-display text-3xl font-semibold leading-snug sm:text-4xl">
            &ldquo;{review.quote}&rdquo;
          </p>
          <footer className="mt-6 text-base text-muted">
            {review.author} · {review.source} · {review.date}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
