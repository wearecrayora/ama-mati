# Aamahata storefront (Phase 1 prototype)

Frontend-only prototype of the Aamahata online store, selling Mati Odisha products. No backend: bag, wishlist and checkout run in the browser for client review.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerender statically)
```

## Where things live

| What | Where |
| --- | --- |
| Catalogue, categories, festivals, contact details | `src/lib/products.ts` |
| Product photos (from the brand's Instagram posts) | `public/products/<product>/1.webp…` |
| Logos (originals + transparent cut-outs) | `public/brand/` |
| Bag / wishlist / UI state | `src/lib/store.ts` (Zustand, persisted to localStorage) |
| Design tokens (palette, fonts) | `src/app/globals.css` |
| Preloader, header, menu, bag drawer, search, footer | `src/components/layout/` |
| Declarative scroll animations (`data-split`, `data-reveal`, `data-speed`, `data-pop`) | `src/components/layout/PageShell.tsx` |

## Link previews (Open Graph)

- Site-wide image: the Amahata favicon mark on cream, `src/app/opengraph-image.png` (static, 1200×630).
- One card per product: `src/app/shop/[slug]/opengraph-image.tsx`, rendered with `next/og` and re-encoded to JPEG (~100 KB) so WhatsApp shows them.
- Fonts and images for the cards live in `assets/` (Satori needs TTF + PNG/JPEG).
- Per-page titles/descriptions go through `pageMeta()` in `src/lib/seo.ts`.
- Set `NEXT_PUBLIC_SITE_URL=https://aamahata.com` in production. Without it, Vercel deployment URLs (or localhost) are used.
- Favicon and app icons: `src/app/favicon.ico`, `icon.png`, `apple-icon.png`, `public/icon-*.png`, `src/app/manifest.ts`.

## Skeleton loading (boneyard-js)

Skeletons are captured from the real UI, so they match the layout exactly:

- `product-card`: while a product photo downloads
- `cart-page`, `wishlist-grid`, `checkout`: while the saved bag loads from the browser
- `page-hero`, `shop-grid`, `product-page`: route `loading.tsx` screens

After changing any of those layouts, start the dev server and re-capture:

```bash
npm run dev
npm run bones -- http://localhost:3000 --force
```

This writes `src/bones/*.bones.json` + `registry.ts` (commit them). Colours live in `boneyard.config.json`. The CLI needs a Chromium: `npx playwright install chromium`, or pass `--cdp <port>` to reuse a running Chrome.

## Placeholder data

Prices are the printed MRP for Niti Usuna (White), Biryani Rice and Kolatha Dali; every other price, size, rating, review and testimonial is a placeholder. The three festival boxes are proposed bundles. See the PRD for the full list of what the client needs to confirm.

## Stack

Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS v4, GSAP (ScrollTrigger, SplitText, Flip), Lenis, Zustand.
