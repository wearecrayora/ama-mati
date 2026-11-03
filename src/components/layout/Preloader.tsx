"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";
import { products } from "@/lib/products";
import { useUI } from "@/lib/store";
import ProductArt from "@/components/art/ProductArt";

/*
  Stop-motion preloader: packs flick through one frame at a time while a big
  counter ticks to 100, then three coloured sheets peel away upward.
*/

const FRAMES = ["niti-usuna-rice", "biri-badi", "kolatha-dali", "biryani-rice", "harada-dali", "niti-usuna-white", "raja-box"]
  .map((s) => products.find((p) => p.slug === s)!)
  .filter(Boolean);

const WORDS = ["chaula", "dali", "badi", "swadeshi", "mati"];

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const setLoaded = useUI((s) => s.setLoaded);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (reduceMotion()) {
        setLoaded();
        setGone(true);
        return;
      }

      const frames = q("[data-frame]");
      const words = q("[data-word]");
      const counter = q("[data-count]")[0] as HTMLElement;
      const state = { v: 0, f: 0 };
      gsap.set(frames, { autoAlpha: 0 });
      gsap.set(frames[0], { autoAlpha: 1 });

      // Stop-motion: hard cuts, a little hand-placed wobble on every frame.
      let last = 0;
      const flick = gsap.to(state, {
        f: frames.length * 4,
        duration: 3.2,
        ease: `steps(${frames.length * 4})`,
        repeat: -1,
        onUpdate() {
          const i = Math.floor(state.f) % frames.length;
          if (i === last) return;
          gsap.set(frames[last], { autoAlpha: 0 });
          gsap.set(frames[i], {
            autoAlpha: 1,
            rotation: gsap.utils.random(-7, 7),
            scale: gsap.utils.random(0.94, 1.04),
            x: gsap.utils.random(-6, 6),
          });
          last = i;
        },
      });

      const render = () => {
        counter.textContent = String(Math.round(state.v)).padStart(3, "0");
        gsap.set(q("[data-bar]"), { scaleX: state.v / 100 });
      };

      const assets = Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise<void>((r) => (document.readyState === "complete" ? r() : window.addEventListener("load", () => r(), { once: true }))),
      ]);

      const tl = gsap.timeline();
      tl.from(q("[data-in]"), { yPercent: 110, duration: 1, stagger: 0.08 }, 0)
        .from(q("[data-stage]"), { scale: 0.6, autoAlpha: 0, duration: 0.9, ease: "back.out(2)" }, 0.1)
        .to(state, { v: 72, duration: 1.6, ease: "power2.inOut", onUpdate: render }, 0.2);

      words.forEach((w, i) => {
        tl.fromTo(w, { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: "power3.out" }, 0.25 + i * 0.36);
        if (i < words.length - 1) tl.to(w, { yPercent: -100, duration: 0.45, ease: "power3.in" }, 0.25 + i * 0.36 + 0.36);
      });

      tl.add(() => {
        tl.pause();
        assets.then(() => tl.resume());
      }, 1.8);

      tl.to(state, { v: 100, duration: 0.7, ease: "power3.out", onUpdate: render }, 1.81)
        .add(() => flick.pause())
        .to(q("[data-in]"), { yPercent: -110, duration: 0.6, stagger: 0.04, ease: "power3.in" }, "+=0.15")
        .to(q("[data-stage]"), { scale: 1.25, rotation: -8, duration: 0.5, ease: "back.in(2)" }, "<")
        .to(q("[data-stage]"), { yPercent: -160, autoAlpha: 0, duration: 0.5, ease: "power3.in" }, ">-0.1")
        .add(() => setLoaded(), ">-0.2")
        .to(q("[data-sheet]"), {
          yPercent: -100,
          borderBottomLeftRadius: "50% 18vh",
          borderBottomRightRadius: "50% 18vh",
          duration: 1.05,
          ease: "expo.inOut",
          stagger: 0.12,
        }, "<")
        .add(() => setGone(true));
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]" aria-busy="true" aria-label="Loading Aamahata">
      <div data-sheet className="absolute inset-0 bg-ink" style={{ zIndex: 1 }} />
      <div data-sheet className="absolute inset-0 bg-sand" style={{ zIndex: 2 }} />
      <div data-sheet className="absolute inset-0 flex flex-col overflow-hidden bg-chilli text-cream" style={{ zIndex: 3 }}>
        <div className="flex items-start justify-between p-[var(--gutter)] pt-6">
          <div className="overflow-hidden">
            <p data-in className="odia text-2xl leading-tight md:text-3xl">ଆମ ହାଟ</p>
          </div>
          <div className="overflow-hidden text-right">
            <p data-in className="eyebrow">Ethi sabu miliba</p>
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <div data-stage className="relative h-[42vh] max-h-[380px] w-[34vh] max-w-[300px]">
            {FRAMES.map((p) => (
              <div key={p.slug} data-frame className="absolute inset-0">
                <ProductArt product={p} className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 px-[var(--gutter)] pb-6 md:pb-8">
          <div className="overflow-hidden">
            <p data-in className="display pb-[0.06em] pr-[0.08em] text-[26vw] leading-[0.86] md:text-[15vw]">
              <span data-count>000</span>
            </p>
          </div>
          <div className="mb-3 overflow-hidden text-right md:mb-6">
            <p data-in className="eyebrow mb-1 opacity-70">Packing your</p>
            <div className="relative h-[1.15em] w-[5em] overflow-hidden text-3xl md:text-5xl">
              {WORDS.map((w) => (
                <span key={w} data-word className="display absolute right-0 top-0 block" style={{ transform: "translateY(100%)" }}>
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div data-bar className="h-2 origin-left scale-x-0 bg-cream" />
      </div>
    </div>
  );
}
