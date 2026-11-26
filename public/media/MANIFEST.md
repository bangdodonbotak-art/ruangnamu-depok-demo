# Media Manifest — Ruangnamu v2

Every file in `public/media/` is a processed derivative of a reel or still in
`assets-raw/`. No raw reel is ever shipped. Permission for **every** file:
**NOT ASKED** — Tier A = the venue's own channel (`@ruangnamucoffee`),
Tier B = a third-party creator (needs creator OK **and** owner OK before
final/commercial use). Demo only; owner approval required before showing
as a final offer.

| # | Output file | Source reel | Timestamp | Slot | Tier |
|---|---|---|---|---|---|
| 1 | `hero/hero-film-9x16.mp4` | `01-ig-official-hero.mp4` | 10.0–20.0s (10s) | Hero film, all breakpoints | A |
| 2 | `hero/hero-poster.webp` | `01-ig-official-hero.mp4` | 18.5s | Hero poster — carries LCP | A |
| 3 | `journey-01-joglo.webp` | `02-ig-official-wfc.mp4` | 10.0s | Journey stop 01 — pendopo Joglo | A |
| 4 | `journey-02-garden.webp` | `12-diantin04-review.mp4` | 49.0s | Journey stop 02 — teras taman & kolam (garden-wide, NOT a pond close-up); top-cropped to remove burned-in OPEN/hours caption | B |
| 5 | `journey-03-photobox.webp` | `06-ig-official-photobox.mp4` | 12.0s | Journey stop 03 — photobox | A |
| 6 | `menu-nasi-jeruk.webp` | `13-dndagrvna-food.mp4` | 54.0s | Menu featured — Nasi Jeruk With Paru Pedas | B |
| 7 | `menu-carbonara.webp` | `13-dndagrvna-food.mp4` | 61.3s | Menu featured — Pasta Carbonara | B |
| 8 | `spaces-joglo.webp` | `15-ngopididepokk-aerial-02.webp` | still | Spaces — Pendopo Kayu Joglo (service counter) | B |
| 9 | `spaces-taman.webp` | `01-ig-official-hero.mp4` | 2.0s | Spaces — Teras Taman & Kolam | A |
| 10 | `spaces-wfc.webp` | `14-saazhrr-night.mp4` | 13.5s | Spaces — Meja Kerja & Colokan (night shot; 360w source, shipped 540w) | B |
| 11 | `spaces-parkir.webp` | `12-diantin04-review.mp4` | 50.5s | Spaces — Parkir & Mushola; top-cropped to remove burned-in title, 9 licence plates blurred (fix round: re-measured from enlarged crops — v1 counted 7 and misplaced the boxes, ≥3 plates stayed legible) | B |
| 12 | `photobox-booth.webp` | `06-ig-official-photobox.mp4` | 10.5s | Photobox — booth entrance | A |
| 13 | `photobox-detail.webp` | `09-caestories-photobox.mp4` | 24.5s | Photobox — printed strips (360w source, shipped 540w); 3 customer faces on the strips blurred (fix round — §5.3 no-face pick rule) | B |
| 14 | `visit-night.webp` | `14-saazhrr-night.mp4` | 8.5s | Visit/footer — night frame: mushola sign + parked bikes (360w source, shipped 540w) | B |

## Cuts (rows from BLUEPRINT-V2.md §10.2 that did NOT ship)

- `journey-01-gate.webp` (`10-eldenx-tour.mp4`) — CUT. No clean gate frame
  exists in any candidate: the garden-gate arch carries a large burned-in
  caption, the street sign shows an unconfirmed phone number, the night
  gate frame is underexposed. Journey becomes 3 stops; the GSAP pin is cut.
- `menu-matcha.webp` (`04-ig-official-matcha.jpg`) — CUT. The file's actual
  content is an iced coffee glass with a burned-in "COFFEE" caption, not
  matcha. The `02` latte-art fallback is latte, not matcha (wrong subject).
  Ice Matcha Espresso is a text row.
- `menu-kopsus.webp` (`12-diantin04-review.mp4`) — CUT. No clean,
  correctly-identified bottled-Kopsus pour frame found after three
  frame-by-frame hunts (t35–42, t42–54, stills f2/f3). Kopi Susu Tuanruma
  is a text row.

## Visual-distinctness confirmations (shared source reels)

- `01`: hero film (t10–20, staff routine + pour) vs `spaces-taman` (t2.0,
  bougainvillea wall) — different segment, different subject. The poster
  (t18.5) is a frame of the hero film by design.
- `06`: `journey-03-photobox` (t12.0, man entering the red room, banner on
  the right) vs `photobox-booth` (t10.5, couple at the counter with the
  keychain stand) — different angle and framing, 1.5s apart.
- `12`: `journey-02-garden` (t49.0, vine arch) vs `spaces-parkir` (t50.5,
  parking lot) — different subject.
- `13`: `menu-nasi-jeruk` (t54.0, top-down plate on a table) vs
  `menu-carbonara` (t61.3, plate held up) — different dish, different
  framing.
- `14`: `spaces-wfc` (t13.5, tables under the roof) vs `visit-night`
  (t8.5, walkway + mushola sign) — different subject.

## Processing

- Hero film: `ffmpeg -ss 10 -t 10 -i 01… -vf scale=720:1280 -c:v libx264
  -crf 23 -preset slow -movflags +faststart -an` — 1,852,912 B (<2.5MB).
  Quality gate: viewed 3 transcoded frames — no banding, no softness.
- Poster: frame @18.5s → WebP q80, 720w.
- Stills: frame extract → WebP q80 at slot width (journey/spaces 900w
  portrait, menu 800w 4:5, photobox 900w portrait). 360w sources
  (`02`, `09`, `14`) ship at 540w to avoid a 2.5x upscale.
- Scripts: `v2/scripts/render-hero.sh`, `v2/scripts/extract-stills.sh`
  (reproduce every file above).
