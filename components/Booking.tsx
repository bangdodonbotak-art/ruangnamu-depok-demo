"use client";

import { useMemo, useState } from "react";
import { SITE_DATA } from "@/lib/site-data";

const AREAS = [
  "Pendopo Joglo",
  "Indoor",
  "Teras Taman & Kolam Ikan",
  "Bebas (mana yang tersedia)",
] as const;

interface BookingProps {
  photoboxSelected: boolean;
  onPhotoboxChange: (value: boolean) => void;
}

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDateID(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Booking — form → IG DM + copy composer. Single-column centred form:
 * the right column of a two-column layout would not reach 70% of the
 * form height (§6.8), so no empty column is ever rendered.
 * No price literal lives here: the photobox price is interpolated from
 * SITE_DATA.photobox.priceText, and the composed message is never
 * previewed on the page (the photobox price renders exactly once,
 * in Photobox).
 */
export default function Booking({ photoboxSelected, onPhotoboxChange }: BookingProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState<string>(AREAS[3]);
  const [notes, setNotes] = useState("");
  const [bigParty, setBigParty] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const todayISO = useMemo(() => toISODate(new Date()), []);

  const hoursForDate = (iso: string): { min: string; max: string } => {
    if (!iso) return { min: "10:00", max: "22:00" };
    const day = new Date(`${iso}T12:00:00`).getDay();
    const weekend = day === 5 || day === 6; // Jumat / Sabtu
    return { min: "10:00", max: weekend ? "23:00" : "22:00" };
  };
  const hours = hoursForDate(date);

  const buildMessage = (): string | null => {
    if (!name.trim()) return null;
    if (!date) return null;
    if (!time) return null;
    const catatanParts: string[] = [];
    if (bigParty) catatanParts.push("Rombongan >20 orang — mohon konfirmasi ke admin");
    if (notes.trim()) catatanParts.push(notes.trim());
    const catatan = catatanParts.length > 0 ? catatanParts.join(". ") : "—";
    const photoboxLine = photoboxSelected
      ? `Ya — tambah photobox ${SITE_DATA.photobox.priceText}`
      : "Tidak";
    return [
      "Halo Ruangnamu! Saya mau reservasi:",
      `Nama: ${name.trim()}`,
      `Tanggal: ${formatDateID(date)}`,
      `Jam: ${time.replace(":", ".")}`,
      `Jumlah tamu: ${guests} orang`,
      `Area: ${area}`,
      `Photobox: ${photoboxLine}`,
      `Catatan: ${catatan}`,
      "Mohon konfirmasi slotnya, terima kasih.",
    ].join("\n");
  };

  const validate = (): string => {
    if (!name.trim()) return "Isi namamu dulu.";
    if (!date) return "Pilih tanggal kunjungan.";
    if (date < todayISO) return "Tanggal sudah lewat — pilih hari ini atau sesudahnya.";
    if (!time) return "Pilih jam kunjungan.";
    if (time < hours.min || time > hours.max) {
      return `Jam buka hari itu ${hours.min.replace(":", ".")}–${hours.max.replace(":", ".")}.`;
    }
    if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
      return "Jumlah tamu 1–20 orang; rombongan lebih besar centang kotak di bawah.";
    }
    return "";
  };

  const copyMessage = async () => {
    const err = validate();
    if (err) {
      setError(err);
      setCopied(false);
      return;
    }
    setError("");
    const message = buildMessage();
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = message;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
  };

  const inputCls =
    "mt-1 w-full rounded-sm border border-line bg-paper px-3 py-2.5 text-base text-ink placeholder:text-muted focus:border-joglo focus:outline-none";
  const labelCls = "block text-sm font-semibold";

  return (
    <section id="booking" aria-label="Reservasi" className="section-pad">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 className="display-lg text-center">Reservasi meja</h2>
        <ol className="mt-6 space-y-2 text-base leading-relaxed text-muted">
          <li>
            <span className="font-semibold text-ink">1.</span> Isi formulir
          </li>
          <li>
            <span className="font-semibold text-ink">2.</span> Salin pesan atau kirim lewat DM
            Instagram {SITE_DATA.instagramHandle}
          </li>
          <li>
            <span className="font-semibold text-ink">3.</span> Admin mengonfirmasi slotmu — slot
            baru terbooking saat admin bilang ya, bukan saat kamu kirim pesan.
          </li>
        </ol>

        <form
          className="mt-10 space-y-5 rounded-sm border border-line bg-paper p-5 sm:p-7"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="bk-nama" className={labelCls}>
              Nama
            </label>
            <input
              id="bk-nama"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Namamu"
              autoComplete="name"
              className={inputCls}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="bk-tanggal" className={labelCls}>
                Tanggal
              </label>
              <input
                id="bk-tanggal"
                type="date"
                min={todayISO}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="bk-jam" className={labelCls}>
                Jam
              </label>
              <input
                id="bk-jam"
                type="time"
                min={hours.min}
                max={hours.max}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputCls}
              />
              <p className="mt-1 text-sm text-muted">
                Jam buka 10.00–22.00
                {date && hours.max === "23:00" ? " (hari ini sampai 23.00)" : ""} — Jumat–Sabtu
                sampai 23.00.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="bk-tamu" className={labelCls}>
                Jumlah tamu
              </label>
              <input
                id="bk-tamu"
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className={inputCls}
              />
              <label className="mt-2 flex items-start gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={bigParty}
                  onChange={(e) => setBigParty(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-joglo"
                />
                Kami rombongan lebih dari 20 orang
              </label>
            </div>
            <div>
              <label htmlFor="bk-area" className={labelCls}>
                Area
              </label>
              <select
                id="bk-area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className={inputCls}
              >
                {AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-start gap-2 text-base">
              <input
                type="checkbox"
                checked={photoboxSelected}
                onChange={(e) => onPhotoboxChange(e.target.checked)}
                className="mt-1 h-4 w-4 accent-joglo"
              />
              <span>
                Tambah photobox RedRoom — {SITE_DATA.photobox.includes}
              </span>
            </label>
          </div>

          <div>
            <label htmlFor="bk-catatan" className={labelCls}>
              Catatan (opsional)
            </label>
            <textarea
              id="bk-catatan"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Mis. bawa anak kecil, butuh kursi roda, perayaan ulang tahun"
              className={inputCls}
            />
          </div>

          {error && (
            <p role="alert" className="rounded-sm border border-awning px-3 py-2 text-base font-medium text-awning">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <a
              href={SITE_DATA.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-sm bg-ink px-6 py-3 text-center text-base font-semibold text-paper transition-opacity hover:opacity-90"
            >
              DM Instagram {SITE_DATA.instagramHandle}
            </a>
            <button
              type="button"
              onClick={copyMessage}
              className="rounded-sm border border-ink px-6 py-3 text-base font-semibold transition-colors hover:bg-ink hover:text-paper"
            >
              {copied ? "Tersalin" : "Salin Pesan Reservasi"}
            </button>
          </div>
          {copied && (
            <p className="text-sm text-muted">
              Pesan tersalin — tempel di DM Instagram {SITE_DATA.instagramHandle}.
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-base text-muted">
          Harga makanan &amp; minuman dikonfirmasi admin saat reservasi.
        </p>

        <div className="mt-10 grid gap-4 border-t border-line pt-8 text-base sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">Jam buka</p>
            {SITE_DATA.hours.map((h) => (
              <p key={h.days} className="mt-1 text-muted">
                {h.days}
                <br />
                {h.time}
              </p>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold">Alamat</p>
            <p className="mt-1 text-muted">{SITE_DATA.address}</p>
            <p className="mt-2 text-muted">{SITE_DATA.landmarkNote}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Konfirmasi</p>
            <p className="mt-1 text-muted">{SITE_DATA.todayAvailability.note}</p>
            <p className="mt-2 text-muted">{SITE_DATA.todayAvailability.updatedLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
