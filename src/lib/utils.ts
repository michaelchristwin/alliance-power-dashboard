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

/**
 * Simple, predictable color generation.
 * Focus on UX features rather than impossible color distinction.
 */
export function getHighlyDistinctColor(id: number): string {
  const hue = ((id - 1) * 137.508) % 360;
  const lightness = [45, 65, 55][id % 3];
  const saturation = [85, 75][id % 2 === 0 ? 1 : 0];

  return `hsl(${Math.floor(hue)}, ${saturation}%, ${lightness}%)`;
}
