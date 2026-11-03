"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Milestones from the brands' Instagram highlights; descriptions and dates to be confirmed by the client.
const MILESTONES = [
  { y: "2024", t: "Ratha Yatra", d: "The first Mati Odisha stall, during the chariot festival.", odia: "ରଥଯାତ୍ରା" },
  { y: "2025", t: "Raja", d: "A Raja stall — and the first time stock ran out.", odia: "ରଜ" },
  { y: "2025", t: "Bali Jatra", d: "A stall at Cuttack's riverside fair on the Mahanadi.", odia: "ବାଲିଯାତ୍ରା" },
  { y: "2026", t: "Factory outlet", d: "Our own outlet opens in Chandrasekharpur, Bhubaneswar.", odia: "ଆଉଟଲେଟ୍" },
  { y: "2026", t: "Aamahata online", d: "The whole hata, open to India. Hello!", odia: "ଆମ ହାଟ" },
];

/* A line that draws itself as you scroll, with milestone stickers popping on. */
export default function Timeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(q("[data-line]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: q("[data-list]")[0], start: "top 65%", end: "bottom 65%", scrub: true } });
      q("[data-ms]").forEach((el, i) => {
        gsap.from(el.querySelector("[data-dot]"), { scale: 0, duration: 0.6, ease: "back.out(3)", scrollTrigger: { trigger: el, start: "top 65%", once: true } });
        gsap.from(el.querySelector("[data-card]"), {
          x: i % 2 ? 80 : -80,
          rotation: i % 2 ? 6 : -6,
          autoAlpha: 0,
          duration: 1,
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="py-24 md:py-32">
      <div className="wrap">
        <h2 data-split className="display mb-16 text-center text-[12vw] md:text-[5.5vw]">
          The road so far
        </h2>
        <div data-list className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-5 top-0 w-1 rounded bg-ink/10 md:left-1/2 md:-ml-0.5" />
          <div data-line className="absolute bottom-0 left-5 top-0 w-1 origin-top rounded bg-chilli md:left-1/2 md:-ml-0.5" />
          <ol className="space-y-14">
            {MILESTONES.map((m, i) => (
              <li key={m.t} data-ms className={`relative grid pl-14 md:grid-cols-2 md:pl-0 ${i % 2 ? "" : ""}`}>
                <span data-dot className="absolute left-5 top-6 z-10 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-ink bg-sand md:left-1/2" />
                <div data-card className={`sticker rounded-3xl bg-paper p-6 ${i % 2 ? "md:col-start-2 md:ml-10" : "md:mr-10"}`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="display text-4xl text-chilli">{m.y}</span>
                    <span className="odia text-lg opacity-60">{m.odia}</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold">{m.t}</h3>
                  <p className="mt-1 opacity-80">{m.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
