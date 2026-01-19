import { setCookie, getCookie } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const COOKIE_NAME = "color-scheme";

const cookieOptions = {
  path: "/",
  sameSite: "lax" as const,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export const colorSchema = z
  .enum(["dark", "light", "system"])
  .default("dark")
  .catch("system");

export type Color = z.infer<typeof colorSchema>;

export const setColorScheme = createServerFn({ method: "POST" })
  .inputValidator(colorSchema)
  .handler(async ({ data }) => {
    setCookie(COOKIE_NAME, data, cookieOptions);
    return;
  });

export const getColorScheme = createServerFn().handler(async () => {
  return getCookie(COOKIE_NAME) ?? "system";
});

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
