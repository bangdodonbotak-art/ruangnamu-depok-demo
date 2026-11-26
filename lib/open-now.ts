import { SITE_DATA } from "./site-data";

export interface OpenStatus {
  open: boolean;
  /** Today's closing hour, display form ("22.00" | "23.00"). */
  closesAt: string;
  /** Today's opening hour, display form ("10.00"). */
  opensAt: string;
}

/**
 * Pure Jakarta-time open/closed computation over the VERIFIED hours in
 * SITE_DATA.hoursStructured (RESEARCH.md row 5). No network, no API.
 * Open if opens <= now < closes — at exactly 22:00 / 23:00 the café is
 * closed. Known limit: computed from the visitor's device clock, so a
 * wrong device clock gives a wrong chip.
 */
function jakartaParts(now: Date): { weekday: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const weekday = new Date(Date.UTC(get("year"), get("month") - 1, get("day"))).getUTCDay();
  return { weekday, minutes: get("hour") * 60 + get("minute") };
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toDisplay(hhmm: string): string {
  return hhmm.replace(":", ".");
}

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const { weekday, minutes } = jakartaParts(now);
  const row = SITE_DATA.hoursStructured.find((r) =>
    (r.days as readonly number[]).includes(weekday),
  );
  if (!row) return { open: false, closesAt: "22.00", opensAt: "10.00" };
  const opens = toMinutes(row.opens);
  const closes = toMinutes(row.closes);
  return {
    open: minutes >= opens && minutes < closes,
    closesAt: toDisplay(row.closes),
    opensAt: toDisplay(row.opens),
  };
}
