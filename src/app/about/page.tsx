import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import Ingredient from "@/components/art/Ingredient";
import Timeline from "@/components/about/Timeline";

export const metadata: Metadata = pageMeta({
  title: "Our story",
  description: "Aama hata means our market. How Mati Odisha went from Ratha Yatra stalls to a Bhubaneswar outlet to Aamahata online.",
  path: "/about",
});

const VALUES = [
  { t: "Odisha first", d: "Every product on the hata is made in Odisha, by Odia makers, from Odia recipes. That's the whole rule.", bg: "bg-chilli text-cream", k: "chilli" as const },
  { t: "Fair to makers", d: "Makers set their own prices. We handle the website, packing and delivery so they can stay in the kitchen.", bg: "bg-sand", k: "sparkle" as const },
  { t: "Home, delivered", d: "For every Odia in Pune, Bengaluru, Dubai or Delhi who misses the taste of home. We ship it, carefully.", bg: "bg-sienna text-cream", k: "leaf" as const },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24">
        <div className="wrap">
          <p className="eyebrow mb-4 text-chilli">Our story</p>
          <h1 data-split className="display text-[18vw] leading-[0.85] md:text-[11vw]">
            Aama hata. Our market.
          </h1>
          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
            <p data-reveal className="odia text-5xl text-sienna md:text-7xl">
              ଆମ ହାଟ
            </p>
            <p data-reveal className="max-w-lg text-lg leading-relaxed md:text-xl">
              Every Odia village has a <b>hata</b> — the weekly market where you find everything, from fresh saga to brass lamps to gossip. Aamahata is that market, online. Our promise is in the name: <b>ethi sabu miliba</b>. Everything is here.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
        <div className="wrap grid items-center gap-14 md:grid-cols-2">
          <div data-pop className="relative mx-auto aspect-[802/812] w-[70%] max-w-[440px]">
            <Image src="/brand/amahata-logo-transparent.png" alt="Aamahata logo" fill sizes="(min-width: 768px) 35vw, 70vw" className="object-contain" />
          </div>
          <div>
            <h2 data-split className="display text-[12vw] md:text-[5vw]">
              Started at a festival stall.
            </h2>
            <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed opacity-85">
              Mati Odisha began at festival stalls — Ratha Yatra, Raja, Bali Jatra — with honest rice, dali and homemade badi. Then came the factory outlet in Chandrasekharpur, Bhubaneswar. People kept asking where they could buy from Hyderabad, from Pune, from Dubai. This website is the answer.
            </p>
            <Link data-reveal href="/brands/mati-odisha" className="btn btn-sand mt-8">
              Meet Mati Odisha
            </Link>
          </div>
        </div>
      </section>

      <Timeline />

      <section className="wrap pb-24 md:pb-32">
        <h2 data-split className="display mb-12 text-[12vw] md:text-[5.5vw]">
          What we stand for
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <div key={v.t} data-reveal className={`sticker relative min-h-[320px] rounded-[32px] p-8 ${v.bg}`} style={{ rotate: `${(i - 1) * 2}deg` }}>
              <Ingredient kind={v.k} className="absolute -right-5 -top-7 w-20" />
              <span className="display text-6xl opacity-40">0{i + 1}</span>
              <h3 className="display mt-6 text-4xl">{v.t}</h3>
              <p className="mt-4 text-lg leading-snug opacity-90">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
