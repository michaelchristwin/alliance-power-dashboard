import z from "zod";
import puppeteer from "puppeteer-core";
import { addExtra } from "puppeteer-extra";
import chromium from "@sparticuz/chromium-min";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { createServerFn, createMiddleware } from "@tanstack/react-start";

export const internalOnlyMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const host = request.headers.get("host");
    const referer = request.headers.get("referer");

    const isAuthorized = referer && host && referer.includes(host);

    if (!isAuthorized && process.env.NODE_ENV === "production") {
      throw new Error("Unauthorized: Requests must originate from the app.");
    }

    return next();
  },
);

const exportPageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
  dpr: z.number(),
});

export const exportPagePdfServer = createServerFn()
  .middleware([internalOnlyMiddleware])
  .inputValidator(exportPageSchema)
  .handler(async ({ data }) => {
    const { url, width, height, dpr } = data;
    const puppeteerExtra = addExtra(puppeteer);
    puppeteerExtra.use(StealthPlugin());
    const pageUrl = new URL(url);
    const browser = await puppeteerExtra.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar",
      ),
      headless: true,
    });
    const page = await browser.newPage();

    await page.goto(pageUrl.toString(), { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
    });

    await page.setViewport({
      width: width,
      height: height,
      deviceScaleFactor: dpr,
    });
    const pdf = await page.pdf({
      width: `${width}px`,
      height: `${height}px`,
      printBackground: true,
      pageRanges: "1",
    });

    await browser.close();
    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="page.pdf"',
      },
    });
  });
