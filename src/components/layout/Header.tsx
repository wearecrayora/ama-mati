"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { cartTotals, useCart, useUI } from "@/lib/store";
import { BagIcon, HeartIcon, SearchIcon, UserIcon } from "@/components/ui/Icons";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/brands/mati-odisha", label: "Mati Odisha" },
  { href: "/collections/boxes", label: "Festival boxes" },
  { href: "/about", label: "Our Story" },
];

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const lines = useCart((s) => s.lines);
  const wish = useCart((s) => s.wishlist.length);
  const { count } = cartTotals(lines);
  const { menuOpen, setMenu, setCart, setSearch, loaded } = useUI();
  const [solid, setSolid] = useState(false);

  useGSAP(
    () => {
      gsap.set(root.current, { yPercent: -110 });
      if (!loaded) return;
      gsap.to(root.current, { yPercent: 0, duration: 1, delay: 0.5 });

      // Hide on the way down, return on the way up.
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          setSolid(self.scroll() > 40);
          if (useUI.getState().menuOpen) return;
          const hide = self.direction === 1 && self.scroll() > 240;
          gsap.to(root.current, { yPercent: hide ? -110 : 0, duration: 0.6, overwrite: "auto" });
        },
      });
      return () => st.kill();
    },
    { dependencies: [loaded] },
  );

  // Bounce the bag count whenever it changes.
  useEffect(() => {
    if (!countRef.current || count === 0) return;
    gsap.fromTo(countRef.current, { scale: 1.8, rotation: -20 }, { scale: 1, rotation: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  }, [count]);

  const onDark = pathname === "/" && !solid && !menuOpen;

  return (
    <header
      ref={root}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid && !menuOpen ? "border-b-2 border-ink bg-cream/90 backdrop-blur-md" : "bg-transparent"
      } ${onDark || menuOpen ? "text-cream" : "text-ink"}`}
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-6">
          <button
            onClick={() => setMenu(!menuOpen)}
            className="group flex items-center gap-3 font-bold"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-3 w-7">
              <span className={`absolute left-0 block h-[3px] w-full rounded bg-current transition-all duration-500 ${menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 group-hover:w-5"}`} />
              <span className={`absolute left-0 block h-[3px] w-full rounded bg-current transition-all duration-500 ${menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
            </span>
            <span className="hidden text-sm uppercase tracking-[0.14em] sm:inline">{menuOpen ? "Close" : "Menu"}</span>
          </button>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={`link-draw text-sm font-semibold ${pathname.startsWith(n.href) ? "bg-[length:100%_2px]" : ""}`}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Aamahata home" onClick={() => setMenu(false)}>
          <Image src="/brand/amahata-mark.png" alt="" width={52} height={44} className="h-9 w-auto md:h-11" priority />
          <span className="text-[1.45rem] font-extrabold lowercase leading-none tracking-tight md:text-[1.7rem]">aamahata</span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          <button onClick={() => setSearch(true)} className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-current/10" aria-label="Search">
            <SearchIcon />
          </button>
          <Link href="/account" className="hidden h-10 w-10 place-items-center rounded-full transition hover:bg-current/10 sm:grid" aria-label="Account">
            <UserIcon />
          </Link>
          <Link href="/wishlist" className="relative hidden h-10 w-10 place-items-center rounded-full transition hover:bg-current/10 sm:grid" aria-label={`Wishlist, ${wish} items`}>
            <HeartIcon />
            {wish > 0 && <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-chilli ring-2 ring-cream" />}
          </Link>
          <button
            onClick={() => setCart(true)}
            className="ml-1 flex items-center gap-2 rounded-full border-2 border-ink bg-sand py-1.5 pl-3 pr-1.5 font-bold text-ink shadow-[3px_3px_0_var(--color-ink)] transition hover:-translate-y-0.5"
            aria-label={`Open bag, ${count} items`}
          >
            <BagIcon width={18} height={18} />
            <span className="hidden text-sm sm:inline">Bag</span>
            <span ref={countRef} className="grid h-7 min-w-7 place-items-center rounded-full bg-ink px-1.5 text-xs text-cream">
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
