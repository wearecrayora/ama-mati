"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Ingredient from "@/components/art/Ingredient";

const TEXT =
  "Mati means soil. Everything in this pantry starts there — usuna rice from Jajpur's paddy fields, kolatha and harada dali grown the old way, badi beaten by hand and dried in the sun. Swadeshi khaantu, sustha ruhantu.";

const HIGHLIGHT = new Set(["Mati", "soil.", "Jajpur's", "sun.", "Swadeshi", "khaantu,", "sustha", "ruhantu."]);

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q("[data-w]"),
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: q("[data-para]")[0], start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.to(q("[data-seal]"), {
        rotation: 200,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden py-28 md:py-44">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div data-speed="0.6" className="absolute left-[4%] top-[12%] w-16 md:w-24">
          <Ingredient kind="paddy" className="w-full rotate-12" />
        </div>
        <div data-speed="1.1" className="absolute right-[6%] top-[22%] w-12 md:w-20">
          <Ingredient kind="badi" className="w-full -rotate-12" />
        </div>
        <div data-speed="0.4" className="absolute bottom-[10%] left-[12%] w-10 md:w-16">
          <Ingredient kind="dal" className="w-full" />
        </div>
        <div data-speed="0.9" className="absolute bottom-[14%] right-[16%] w-14 md:w-20">
          <Ingredient kind="rice" className="w-full rotate-45" />
        </div>
      </div>

      <div className="wrap relative">
        <div className="mb-10 flex items-center gap-4">
          <div data-seal className="relative h-20 w-20 md:h-24 md:w-24">
            <Image src="/brand/mati-odisha-sienna.png" alt="" fill sizes="96px" className="object-contain" />
          </div>
          <p className="eyebrow text-sienna">
            ମାଟି · <span className="normal-case tracking-normal">noun, Odia</span> — soil, earth, home
          </p>
        </div>
        <p data-para className="max-w-[22ch] text-[9.5vw] font-extrabold leading-[1.02] tracking-[-0.03em] md:max-w-[26ch] md:text-[4.6vw]">
          {TEXT.split(" ").map((w, i) => (
            <span key={i} data-w className={HIGHLIGHT.has(w) ? "display text-chilli" : ""}>
              {w}{" "}
            </span>
          ))}
        </p>
        <p className="odia mt-8 text-2xl text-sienna md:text-3xl">ସ୍ୱଦେଶୀ ଖାଆନ୍ତୁ, ସୁସ୍ଥ ରୁହନ୍ତୁ — eat swadeshi, stay healthy.</p>
      </div>
    </section>
  );
}
