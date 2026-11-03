"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowIcon } from "@/components/ui/Icons";

// Follower count is from the public profile; the rest are placeholders to confirm with the client.
const STATS = [
  { n: 100, suffix: "%", label: "natural" },
  { n: 0, suffix: "", label: "chemicals or preservatives" },
  { n: 4700, suffix: "+", label: "Instagram family" },
  { n: 1, suffix: "", label: "factory outlet" },
];

export default function MatiSpotlight() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q("[data-logo]"),
        { rotation: -120, scale: 0.6 },
        { rotation: 0, scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: 1 } },
      );
      gsap.fromTo(
        q("[data-outlet]"),
        { rotation: 14, yPercent: 30 },
        { rotation: -6, yPercent: -10, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
      q("[data-stat]").forEach((el) => {
        const target = Number((el as HTMLElement).dataset.stat);
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString("en-IN")),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-ink py-24 text-cream md:py-36">
      <div className="wrap grid items-center gap-14 md:grid-cols-2">
        <div className="relative mx-auto aspect-square w-[78%] max-w-[520px]">
          <div className="absolute inset-[-8%] rounded-full border-2 border-dashed border-sand/40" />
          <div data-logo className="relative h-full w-full">
            <Image src="/brand/mati-odisha-gold.png" alt="Mati Odisha — From Odisha to the World" fill sizes="(min-width: 768px) 40vw, 80vw" className="object-contain" />
          </div>
          {/* the real factory-outlet signboard, pinned on like a photo */}
          <figure data-outlet className="absolute -bottom-10 -right-6 w-[46%] rounded-lg border-2 border-ink bg-paper p-1.5 pb-6 text-ink shadow-[6px_6px_0_var(--color-chilli)] md:-right-12">
            <span className="relative block aspect-square overflow-hidden rounded">
              <Image src="/products/harada-dal/2.webp" alt="Mati Odisha factory outlet signboard" fill sizes="20vw" className="object-cover" />
            </span>
            <figcaption className="absolute inset-x-0 bottom-1 text-center text-[11px] font-bold">Our factory outlet</figcaption>
          </figure>
        </div>

        <div>
          <p className="eyebrow mb-4 text-sand">The brand on our shelves</p>
          <h2 data-split className="display text-[14vw] md:text-[6.2vw]">
            Mati Odisha
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed opacity-85 md:text-xl">
            An upcoming Odia pioneer with a simple promise — take the grain that never leaves the state and send it out, From Odisha to the World. Rice, dali and badi, pura fresh, sourced from Odia farms and packed at our own outlet.
          </p>
          <p data-reveal className="odia mt-4 text-2xl text-sand">ସ୍ୱଦେଶୀ ଖାଆନ୍ତୁ, ସୁସ୍ଥ ରୁହନ୍ତୁ</p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t-2 border-cream/15 pt-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} data-reveal>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="display text-5xl text-sand">
                    <span data-stat={s.n}>0</span>
                    {s.suffix}
                  </span>
                  <span className="mt-1 block text-sm opacity-70">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <Link data-reveal href="/brands/mati-odisha" className="btn btn-sand mt-10">
            Meet the makers <ArrowIcon width={18} height={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
