import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Bengali ০–৯ (U+09E6–U+09EF) and Arabic-Indic ٠–٩ (U+0660–U+0669) → ASCII 0–9 */
function indicDigitsToAscii(input: string): string {
  let out = "";
  for (const ch of input) {
    const cp = ch.codePointAt(0)!;
    if (cp >= 0x09e6 && cp <= 0x09ef) {
      out += String(cp - 0x09e6);
    } else if (cp >= 0x0660 && cp <= 0x0669) {
      out += String(cp - 0x0660);
    } else {
      out += ch;
    }
  }
  return out;
}

/** Bangladesh mobile: exactly 11 digits, must start with 01 (accepts Bengali/Arabic-Indic numerals) */
export function isValidBdMobile11(phone: string): boolean {
  const digits = normalizeBdMobileDigits(phone);
  return /^01\d{9}$/.test(digits);
}

/** ASCII digits only; Bengali (০১…) and Arabic-Indic numerals are converted first */
export function normalizeBdMobileDigits(phone: string): string {
  return indicDigitsToAscii(phone).replace(/\D/g, "");
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
