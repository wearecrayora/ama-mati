import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { products } from "@/lib/products";
import ShopGrid from "@/components/shop/ShopGrid";
import Marquee from "@/components/ui/Marquee";
import Ingredient from "@/components/art/Ingredient";

export const metadata: Metadata = pageMeta({
  title: "Mati Odisha",
  description: "From Odisha to the World — desi usuna rice, dali and homemade badi by Mati Odisha.",
  path: "/brands/mati-odisha",
});

const STEPS = [
  { n: "01", t: "Sourced direct", d: "Usuna rice and kolatha dali come straight from farmers in Jajpur — no middlemen, no mystery.", k: "paddy" as const },
  { n: "02", t: "Kept natural", d: "No polish, no chemicals, no preservatives. Just the grain, cleaned and checked by hand.", k: "dal" as const },
  { n: "03", t: "Made at home", d: "Biri badi is beaten by hand and dried in the sun — 100% homemade, the traditional way.", k: "badi" as const },
  { n: "04", t: "Packed pura fresh", d: "Packed at our Bhubaneswar outlet with the date on every label, and dispatched within 24 hours.", k: "sparkle" as const },
];

export default function MatiOdishaPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-[calc(var(--header-h)+3rem)] text-cream md:pb-28">
        <div className="wrap grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
          <div data-pop className="relative mx-auto aspect-square w-[80%] max-w-[480px]">
            <Image src="/brand/mati-odisha-gold.png" alt="Mati Odisha logo — From Odisha to the World" fill priority sizes="(min-width: 768px) 40vw, 80vw" className="object-contain" />
          </div>
          <div>
            <p className="eyebrow mb-4 text-sand">Brand profile</p>
            <h1 data-split className="display text-[17vw] md:text-[8vw]">
              Mati Odisha
            </h1>
            <p className="odia mt-2 text-3xl text-sand">ମାଟି ଓଡ଼ିଶା</p>
            <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed opacity-85 md:text-xl">
              &ldquo;Upcoming Odia pioneer. Order your flavours.&rdquo; Mati Odisha sells desi usuna rice, biryani rice, kolatha and harada dali and homemade biri badi — first at Raja, Ratha Yatra and Bali Jatra stalls, then from its own factory outlet in Bhubaneswar. Aamahata is now its home online.
            </p>
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <a href="#range" className="btn btn-sand">See the range</a>
              <a href="https://www.instagram.com/matiodisha/" target="_blank" rel="noreferrer" className="btn btn-cream">@matiodisha</a>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b-2 border-ink bg-chilli py-4 text-cream">
        <Marquee items={["From Odisha to the World", "ସ୍ୱଦେଶୀ ଖାଆନ୍ତୁ ସୁସ୍ଥ ରୁହନ୍ତୁ", "Pura fresh", "Order your flavours"].map((t) => <span key={t} className="display text-3xl md:text-5xl">{t}</span>)} separator="✦" />
      </div>

      <section className="wrap py-24 md:py-32">
        <h2 data-split className="display mb-14 max-w-[14ch] text-[12vw] md:text-[5.5vw]">
          From the field to your pot
        </h2>
        <ol className="grid gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.n} data-reveal className="sticker relative rounded-3xl bg-paper p-6" style={{ rotate: `${(i % 2 ? 1 : -1) * 1.5}deg` }}>
              <Ingredient kind={s.k} className="absolute -right-4 -top-6 w-16" />
              <span className="display text-5xl text-chilli">{s.n}</span>
              <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 opacity-80">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="range" className="wrap scroll-mt-24 pb-28">
        <h2 data-split className="display mb-10 text-[12vw] md:text-[5.5vw]">
          The full range
        </h2>
        <ShopGrid items={products} />
      </section>
    </>
  );
}
