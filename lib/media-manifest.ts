export interface MediaManifestRow {
  output: string;
  sourceReel: string;
  sourceTimestampSec: number;
  slot: string;
  tier: "A" | "B";
  permission: "NOT ASKED";
  alt: string;
  budgetKb: number;
}

/**
 * Media manifest — every file in public/media/ traced to its source reel.
 * Permission: ALL NOT ASKED (§0.1). Tier A = venue's own channel
 * (@ruangnamucoffee); Tier B = third-party creator — needs creator OK +
 * owner OK before final/commercial use.
 *
 * Deviations from BLUEPRINT-V2.md §10.2 (see BUILD-V2.md for reasons):
 * - journey-01-gate CUT (no clean gate frame in any candidate) → journey
 *   re-sequenced to 3 stops, pin cut, stacked stops + stepper.
 * - journey-03 source 11 → 12 @49.0, top-cropped to remove the burned-in
 *   OPEN/hours caption.
 * - spaces-joglo source 11 → 15-ngopididepokk-aerial-02.webp (clean counter).
 * - spaces-taman source 12 → 01 @2.0 (bougainvillea wall).
 * - spaces-wfc source 10 → 14 @13.5 (night tables under Joglo roof).
 * - photobox-booth source 08 → 06 @10.5 (couple at booth entrance).
 * - menu-matcha CUT: 04-ig-official-matcha.jpg is iced coffee, not matcha.
 * - menu-kopsus CUT: no clean, correctly-identified bottled-Kopsus pour
 *   found in 12 after three frame-by-frame hunts.
 * - 360w sources (02, 09, 14) ship at 540w, not 900w — upscaling 2.5x
 *   would soften them; noted per row.
 */
export const MEDIA_MANIFEST: MediaManifestRow[] = [
  {
    output: "hero/hero-film-9x16.mp4",
    sourceReel: "01-ig-official-hero.mp4",
    sourceTimestampSec: 10,
    slot: "Hero film, all breakpoints — staff morning routine ending on the espresso pour (10s window)",
    tier: "A",
    permission: "NOT ASKED",
    alt: "Film suasana pagi di Ruangnamu: staf menyiapkan kafe, menyapu teras, dan menuang espresso",
    budgetKb: 2560,
  },
  {
    output: "hero/hero-poster.webp",
    sourceReel: "01-ig-official-hero.mp4",
    sourceTimestampSec: 14.5,
    slot: "Hero poster — carries LCP; same window as the film; re-picked in v3 — shows the place, not the cup (staff sweeping the garden path)",
    tier: "A",
    permission: "NOT ASKED",
    alt: "Taman rindang Ruangnamu di pagi hari, staf menyapu jalan batu di antara tanaman hijau",
    budgetKb: 350,
  },
  {
    output: "journey-01-joglo.webp",
    sourceReel: "02-ig-official-wfc.mp4",
    sourceTimestampSec: 10,
    slot: "Journey stop 01 — pendopo Joglo",
    tier: "A",
    permission: "NOT ASKED",
    alt: "Ruang dalam pendopo Joglo yang kosong: meja kayu, tanaman gantung, dan atap kain",
    budgetKb: 350,
  },
  {
    output: "journey-02-garden.webp",
    sourceReel: "12-diantin04-review.mp4",
    sourceTimestampSec: 49,
    slot: "Journey stop 02 — teras taman & kolam (garden-wide, NOT a pond close-up); top-cropped y780..1920 to remove burned-in OPEN/hours caption",
    tier: "B",
    permission: "NOT ASKED",
    alt: "Jalan batu di taman yang rimbun, dilihat dari balik gapura tanaman",
    budgetKb: 350,
  },
  {
    output: "journey-03-photobox.webp",
    sourceReel: "06-ig-official-photobox.mp4",
    sourceTimestampSec: 12,
    slot: "Journey stop 03 — photobox",
    tier: "A",
    permission: "NOT ASKED",
    alt: "Pengunjung masuk ke ruang photobox merah di bawah spanduk Photoplace",
    budgetKb: 350,
  },
  {
    output: "menu-nasi-jeruk.webp",
    sourceReel: "13-dndagrvna-food.mp4",
    sourceTimestampSec: 54,
    slot: "Menu featured — Nasi Jeruk With Paru Pedas",
    tier: "B",
    permission: "NOT ASKED",
    alt: "Sepiring nasi daun jeruk dengan paru pedas, timun, dan kerupuk, dilihat dari atas",
    budgetKb: 350,
  },
  {
    output: "menu-carbonara.webp",
    sourceReel: "13-dndagrvna-food.mp4",
    sourceTimestampSec: 61.3,
    slot: "Menu featured — Pasta Carbonara",
    tier: "B",
    permission: "NOT ASKED",
    alt: "Sepiring pasta carbonara creamy dengan smoked beef dan garlic bread, diangkat dengan dua tangan",
    budgetKb: 350,
  },
  {
    output: "spaces-joglo.webp",
    sourceReel: "15-ngopididepokk-aerial-02.webp",
    sourceTimestampSec: 0,
    slot: "Spaces — Pendopo Kayu Joglo (service counter)",
    tier: "B",
    permission: "NOT ASKED",
    alt: "Konter layanan Ruangnamu di bawah atap Joglo: balok kayu, lampu rotan, dan hiasan hijau",
    budgetKb: 350,
  },
  {
    output: "spaces-taman.webp",
    sourceReel: "01-ig-official-hero.mp4",
    sourceTimestampSec: 2,
    slot: "Spaces — Teras Taman & Kolam",
    tier: "A",
    permission: "NOT ASKED",
    alt: "Dinding tanaman monstera dan bougainvillea merah muda di taman",
    budgetKb: 350,
  },
  {
    output: "spaces-wfc.webp",
    sourceReel: "14-saazhrr-night.mp4",
    sourceTimestampSec: 13.5,
    slot: "Spaces — Meja Kerja & Colokan (night shot of the same Joglo seating used for daytime work; 360w source, shipped at 540w)",
    tier: "B",
    permission: "NOT ASKED",
    alt: "Meja kayu panjang di bawah atap Joglo pada malam hari, diterangi lampu gantung hangat",
    budgetKb: 350,
  },
  {
    output: "spaces-parkir.webp",
    sourceReel: "12-diantin04-review.mp4",
    sourceTimestampSec: 50.5,
    slot: "Spaces — Parkir & Mushola; top-cropped y620..1920 to remove the burned-in title, 9 licence plates blurred for privacy (fix round: re-measured, v1's 7 boxes were misplaced)",
    tier: "B",
    permission: "NOT ASKED",
    alt: "Halaman parkir dengan motor terparkir di depan bangunan kafe yang ditumbuhi bougainvillea",
    budgetKb: 350,
  },
  {
    output: "photobox-booth.webp",
    sourceReel: "06-ig-official-photobox.mp4",
    sourceTimestampSec: 10.5,
    slot: "Photobox — booth entrance",
    tier: "A",
    permission: "NOT ASKED",
    alt: "Pasangan berdiri di depan bilik photobox, di samping spanduk Photoplace dan rak gantungan kunci",
    budgetKb: 350,
  },
  {
    output: "photobox-detail.webp",
    sourceReel: "09-caestories-photobox.mp4",
    sourceTimestampSec: 24.5,
    slot: "Photobox — printed strips (360w source, shipped at 540w); 3 customer faces on the strips blurred for privacy (fix round)",
    tier: "B",
    permission: "NOT ASKED",
    alt: "Dua strip foto cetak dari photobox yang diselipkan di saku celana",
    budgetKb: 350,
  },
  {
    output: "visit-night.webp",
    sourceReel: "14-saazhrr-night.mp4",
    sourceTimestampSec: 8.5,
    slot: "Visit/footer — night frame: mushola sign + parked bikes (360w source, shipped at 540w)",
    tier: "B",
    permission: "NOT ASKED",
    alt: "Jalan setapak kafe pada malam hari dengan rambu mushola berwarna merah",
    budgetKb: 350,
  },
];
