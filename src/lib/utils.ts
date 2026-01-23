import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Color } from "../server/theme.server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLastDayOfPreviousMonthUTC(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0));
}

export function applyTheme(scheme: Color) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  // This is the missing logic:
  let resolved = scheme;

  if (scheme === "system") {
    // Check the actual OS preference
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    resolved = isDark ? "dark" : "light";
  }

  root.classList.add(resolved);
  root.dataset.theme = resolved;
}

export function idToColor(id: number) {
  // Better hash function with more mixing
  let hash = id;
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
  hash = (hash >> 16) ^ hash;

  const hue = Math.abs(hash) % 360;
  const saturation = 65;
  const lightness = 50;
  return hslToHex(hue, saturation, lightness);
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return (
    "#" +
    [f(0), f(8), f(4)]
      .map((v) =>
        Math.round(v * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
