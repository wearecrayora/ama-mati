"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import { ArrowIcon } from "@/components/ui/Icons";

/* Pinned section: vertical scroll drives the shelf sideways (desktop and mobile). */
export default function ProductRail({ items, title, kicker }: { items: Product[]; title: string; kicker: string }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduceMotion()) return;
      const q = gsap.utils.selector(root);
      const distance = () => track.current!.scrollWidth - window.innerWidth;

      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.to(q("[data-progress]"), {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
      });

      // Cards tilt a touch as they slide into frame.
      q("[data-rail-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { rotation: 6, y: 60 },
          {
            rotation: 0,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 100%", end: "left 55%", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-cream py-[calc(var(--header-h)+1rem)]">
      <div className="wrap mb-8 flex items-end justify-between gap-6 md:mb-12">
        <div>
          <p className="eyebrow mb-3 text-chilli">{kicker}</p>
          <h2 data-split className="display text-[13vw] md:text-[7vw]">
            {title}
          </h2>
        </div>
        <Link href="/shop" className="btn btn-sand hidden shrink-0 md:inline-flex">
          Shop all <ArrowIcon width={18} height={18} />
        </Link>
      </div>

      <div ref={track} className="flex w-max gap-5 pl-[var(--gutter)] pr-[var(--gutter)] md:gap-8">
        {items.map((p) => (
          <div key={p.slug} data-rail-card className="w-[72vw] shrink-0 sm:w-[44vw] md:w-[28vw] lg:w-[22vw]">
            <ProductCard product={p} />
          </div>
        ))}
        <Link
          href="/shop"
          data-rail-card
          className="grid aspect-[4/5] w-[72vw] shrink-0 place-items-center rounded-[28px] border-2 border-dashed border-ink text-center transition hover:bg-sand sm:w-[44vw] md:w-[28vw] lg:w-[22vw]"
        >
          <span>
            <span className="display block text-5xl">See all</span>
            <span className="mt-2 block font-semibold">Every pouch, every tub →</span>
          </span>
        </Link>
      </div>

      <div className="wrap mt-10">
        <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
          <div data-progress className="h-full origin-left scale-x-0 bg-chilli" />
        </div>
      </div>
    </section>
  );
}
