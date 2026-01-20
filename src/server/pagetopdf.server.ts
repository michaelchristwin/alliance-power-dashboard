import z from "zod";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { createServerFn } from "@tanstack/react-start";

const exportPageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
  dpr: z.number(),
});
export const exportPagePdfServer = createServerFn()
  .inputValidator(exportPageSchema)
  .handler(async ({ data }) => {
    const { url, width, height, dpr } = data;
    const pageUrl = new URL(url);
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
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
