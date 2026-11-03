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

## Placeholder data

Prices are the printed MRP for Niti Usuna (White), Biryani Rice and Kolatha Dali; every other price, size, rating, review and testimonial is a placeholder. The three festival boxes are proposed bundles. See the PRD for the full list of what the client needs to confirm.

## Stack

Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS v4, GSAP (ScrollTrigger, SplitText, Flip), Lenis, Zustand.
