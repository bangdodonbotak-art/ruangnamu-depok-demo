import { SITE_DATA } from "./site-data";

export interface BookingPayload {
  name: string;
  guests: string;
  date: string;
  time: string;
  area: string;
  notes: string;
}

export function buildWhatsAppMessage(payload: BookingPayload): string {
  const lines = [
    `Halo ${SITE_DATA.brandName}, saya ingin reservasi meja:`,
    `- Nama: ${payload.name || "-"}`,
    `- Jumlah tamu: ${payload.guests || "-"} orang`,
    `- Tanggal: ${payload.date || "-"}`,
    `- Jam datang: ${payload.time || "-"}`,
    `- Pilihan area: ${payload.area || "Bebas"}`,
  ];

  if (payload.notes.trim()) {
    lines.push(`- Catatan: ${payload.notes.trim()}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(payload: BookingPayload): string | null {
  const cleanNumber = SITE_DATA.whatsappNumber.replace(/[^0-9]/g, "");
  if (!cleanNumber) {
    return null;
  }

  const text = encodeURIComponent(buildWhatsAppMessage(payload));
  return `https://wa.me/${cleanNumber}?text=${text}`;
}
