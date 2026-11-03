import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Brands" };

const SOON = ["Cold-pressed oils", "Ragi & millets", "Handloom & crafts"];

export default function BrandsPage() {
  return (
    <>
      <PageHero
        kicker="Ethi sabu miliba"
        title="Brands on the hata"
        odia="ବ୍ରାଣ୍ଡ"
        intro="Aamahata is Odisha's own market — a home for makers from every district. We're starting with food, and growing one stall at a time."
        bg="var(--color-chilli)"
        fg="var(--color-cream)"
        ingredients={["sparkle", "sparkle", "leaf"]}
      />
      <section className="wrap grid gap-6 py-20 md:grid-cols-2 md:py-28">
        <Link href="/brands/mati-odisha" data-reveal data-cursor="Visit" className="group relative overflow-hidden rounded-[36px] border-2 border-ink bg-ink p-8 text-cream transition hover:shadow-[10px_10px_0_var(--color-chilli)] md:row-span-3 md:p-12">
          <div className="relative mx-auto aspect-square w-3/4 transition-transform duration-700 ease-[var(--ease-squish)] group-hover:rotate-12">
            <Image src="/brand/mati-odisha-gold.png" alt="" fill sizes="40vw" className="object-contain" />
          </div>
          <p className="eyebrow mt-8 text-sand">Food · rice, dali & badi</p>
          <h2 className="display mt-2 text-6xl">Mati Odisha</h2>
          <p className="mt-3 max-w-md opacity-80">Desi usuna rice, biryani rice, kolatha and harada dali, homemade biri badi. From Odisha to the World.</p>
        </Link>
        {SOON.map((s) => (
          <div key={s} data-reveal className="flex items-center justify-between rounded-[28px] border-2 border-dashed border-ink p-8">
            <div>
              <p className="eyebrow opacity-60">Coming soon</p>
              <p className="display mt-2 text-3xl md:text-4xl">{s}</p>
            </div>
            <span className="-rotate-6 rounded-full border-2 border-ink bg-sand px-4 py-1 text-sm font-bold">Soon</span>
          </div>
        ))}
      </section>
    </>
  );
}
