"use client";

import { useState } from "react";
import { SITE_DATA } from "@/lib/site-data";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  type BookingPayload,
} from "@/lib/whatsapp";

export function Booking() {
  const [form, setForm] = useState<BookingPayload>({
    name: "",
    guests: "4",
    date: "",
    time: "16:00",
    area: "Pendopo Joglo",
    notes: "",
  });
  const [copied, setCopied] = useState(false);

  const waUrl = buildWhatsAppUrl(form);
  const messagePreview = buildWhatsAppMessage(form);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(messagePreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id="booking"
      className="border-b border-line bg-surface px-6 py-20 md:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-line pb-8">
          <h2 className="text-4xl font-semibold text-ink md:text-[3.5rem]">
            Reservasi meja
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted">
            {SITE_DATA.todayAvailability.updatedLabel}.{" "}
            {SITE_DATA.todayAvailability.note}
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <ol className="space-y-6">
              <li className="border-l-2 border-accent pl-5">
                <p className="text-xs font-semibold text-accent">Langkah 1</p>
                <p className="mt-1 text-lg font-semibold text-ink">
                  Isi detail rencana datang di formulir
                </p>
              </li>
              <li className="border-l-2 border-line pl-5">
                <p className="text-xs font-semibold text-muted">Langkah 2</p>
                <p className="mt-1 text-lg font-semibold text-ink">
                  Tap DM Instagram atau salin pesan yang sudah terisi
                </p>
              </li>
              <li className="border-l-2 border-line pl-5">
                <p className="text-xs font-semibold text-muted">Langkah 3</p>
                <p className="mt-1 text-lg font-semibold text-ink">
                  Tunggu balasan konfirmasi ketersediaan meja
                </p>
              </li>
            </ol>

            <p className="border border-line bg-bg p-5 text-sm text-ink">
              <strong>Penting:</strong> Slot baru ter-booking saat kami yang
              bilang, bukan saat pesan terkirim.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid gap-5 border border-line bg-bg p-6 md:grid-cols-2 md:p-8 lg:col-span-7"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="booking-name" className="text-sm font-medium text-ink">
                Nama pemesan
              </label>
              <input
                id="booking-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nama kamu"
                className="min-h-[44px] border border-line bg-bg px-4 py-2.5 text-base text-ink"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="booking-guests" className="text-sm font-medium text-ink">
                Jumlah tamu
              </label>
              <input
                id="booking-guests"
                type="number"
                min={1}
                max={40}
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="min-h-[44px] border border-line bg-bg px-4 py-2.5 text-base text-ink"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="booking-date" className="text-sm font-medium text-ink">
                Tanggal datang
              </label>
              <input
                id="booking-date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="min-h-[44px] border border-line bg-bg px-4 py-2.5 text-base text-ink"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="booking-time" className="text-sm font-medium text-ink">
                Perkiraan jam
              </label>
              <input
                id="booking-time"
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="min-h-[44px] border border-line bg-bg px-4 py-2.5 text-base text-ink"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="booking-area" className="text-sm font-medium text-ink">
                Pilihan area
              </label>
              <select
                id="booking-area"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="min-h-[44px] border border-line bg-bg px-4 py-2.5 text-base text-ink"
              >
                <option value="Pendopo Joglo">Pendopo Joglo</option>
                <option value="Indoor">Indoor</option>
                <option value="Teras Taman & Kolam Ikan">
                  Teras Taman &amp; Kolam Ikan
                </option>
                <option value="Bebas (mana yang tersedia)">
                  Bebas (mana yang tersedia)
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="booking-notes" className="text-sm font-medium text-ink">
                Catatan tambahan
              </label>
              <textarea
                id="booking-notes"
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Misal: butuh meja dekat colokan atau acara ulang tahun"
                className="border border-line bg-bg px-4 py-2.5 text-base text-ink"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 md:col-span-2">
              {waUrl ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
                >
                  Kirim via WhatsApp
                </a>
              ) : (
                <a
                  href={SITE_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
                >
                  DM Instagram {SITE_DATA.instagramHandle}
                </a>
              )}

              <button
                type="button"
                onClick={handleCopy}
                className="min-h-[44px] border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
              >
                {copied ? "Pesan Tersalin" : "Salin Pesan Reservasi"}
              </button>
            </div>

            {!waUrl && (
              <p className="text-xs text-muted md:col-span-2">
                Nomor WhatsApp resmi belum dikonfirmasi. Sementara ini kamu
                bisa salin pesan di atas lalu kirim lewat DM{" "}
                <a
                  href={SITE_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {SITE_DATA.instagramHandle}
                </a>
                .
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
