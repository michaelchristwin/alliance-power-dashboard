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
