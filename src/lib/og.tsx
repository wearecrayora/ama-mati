import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ImageResponse } from "next/og";
import sharp from "sharp";

/*
  Shared assets and building blocks for the generated share images
  (opengraph-image.tsx files). Rendered by next/og (Satori): flexbox only,
  TTF fonts and PNG/JPEG images, so everything is read from /assets once.
*/

const asset = (p: string) => join(process.cwd(), "assets", p);

// No Odia font here: Satori can't shape Odia (vowel signs land in the wrong place),
// so the cards stay Latin-only.
const [shrikhand, bricolageMedium, bricolageBold] = await Promise.all([
  readFile(asset("fonts/Shrikhand-Regular.ttf")),
  readFile(asset("fonts/BricolageGrotesque-Medium.ttf")),
  readFile(asset("fonts/BricolageGrotesque-ExtraBold.ttf")),
]);

export const ogFonts = [
  { name: "Shrikhand", data: shrikhand, weight: 400 as const, style: "normal" as const },
  { name: "Bricolage", data: bricolageMedium, weight: 500 as const, style: "normal" as const },
  { name: "Bricolage", data: bricolageBold, weight: 800 as const, style: "normal" as const },
];

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/jpeg";

/*
  Satori only emits PNG, which is ~1 MB with photos in it. WhatsApp and some
  other apps drop preview images much over ~300 KB, so re-encode as JPEG.
*/
export async function asJpeg(image: ImageResponse) {
  const png = Buffer.from(await image.arrayBuffer());
  const jpeg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    // Rendered on demand; let the CDN keep it for a week and browsers for a day.
    headers: { "Content-Type": OG_TYPE, "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400" },
  });
}

const dataUri = async (file: string, mime: string) => `data:${mime};base64,${(await readFile(asset(file))).toString("base64")}`;

export const ogImages = {
  mark: await dataUri("og/amahata-mark.png", "image/png"),
  seal: await dataUri("og/mati-seal.png", "image/png"),
};

// Product photos keyed by the folder name under public/products.
const photoCache = new Map<string, string>();
export async function ogPhoto(folder: string) {
  if (!photoCache.has(folder)) photoCache.set(folder, await dataUri(`og/${folder}.jpg`, "image/jpeg"));
  return photoCache.get(folder)!;
}

/* "/products/biri-badi/1.webp" -> "biri-badi" */
export const photoFolder = (src: string) => src.split("/")[2];

export const C = {
  chilli: "#e35336",
  cream: "#f5f5dc",
  paper: "#fbfbef",
  sand: "#f4a460",
  sienna: "#a0522d",
  ink: "#2b160c",
};

/* Site domain shown on the cards. */
export const ogDomain = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aamahata.com").replace(/^https?:\/\//, "").replace(/\/$/, "");

export function Brand({ color = C.cream, scale = 1 }: { color?: string; scale?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 * scale }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img only */}
      <img src={ogImages.mark} width={62 * scale} height={53 * scale} alt="" />
      <span style={{ fontFamily: "Bricolage", fontWeight: 800, fontSize: 40 * scale, color, letterSpacing: -1 }}>aamahata</span>
    </div>
  );
}
