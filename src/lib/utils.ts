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
