import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Bangladesh mobile: exactly 11 digits, must start with 01 */
export function isValidBdMobile11(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return /^01\d{9}$/.test(digits);
}

export function normalizeBdMobileDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

/** HH:mm (24h) from <input type="time" /> — readable 12h label for messages */
export function formatPickupTimeDisplay(hhmm: string, locale: "bn" | "en"): string {
  const trimmed = hhmm.trim();
  const parts = trimmed.split(":");
  if (parts.length < 2) return trimmed;
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  if (Number.isNaN(h) || Number.isNaN(m)) return trimmed;
  const d = new Date(2000, 0, 1, h, m, 0, 0);
  const loc = locale === "bn" ? "bn-BD" : "en-US";
  return d.toLocaleTimeString(loc, { hour: "numeric", minute: "2-digit", hour12: true });
}
