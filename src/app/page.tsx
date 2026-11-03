import Link from "next/link";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import CategoryStack from "@/components/home/CategoryStack";
import MatiSpotlight from "@/components/home/MatiSpotlight";
import Festivals from "@/components/home/Festivals";
import Testimonials from "@/components/home/Testimonials";
import InstaStrip from "@/components/home/InstaStrip";
import Marquee from "@/components/ui/Marquee";
import NewsletterForm from "@/components/ui/NewsletterForm";
import CircleText from "@/components/ui/CircleText";
import ShopGrid from "@/components/shop/ShopGrid";
import { ArrowIcon } from "@/components/ui/Icons";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />

      {/* The tilted band is scaled past both edges; clip it here so the page never scrolls sideways. */}
      <div className="relative z-10 overflow-x-clip">
        <div className="relative -my-1 -rotate-2 scale-105 border-y-2 border-ink bg-ink py-4 text-cream">
          <Marquee
            items={products.slice(0, 10).map((p) => (
              <span key={p.slug} className="display text-3xl md:text-5xl">
                {p.name} <span className="odia ml-2 text-xl text-sand md:text-3xl">{p.odia}</span>
              </span>
            ))}
            separator={<span className="text-chilli">✦</span>}
            itemClassName="text-3xl md:text-5xl"
          />
        </div>
      </div>

      <Manifesto />
      <section className="pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="wrap">
          <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
            <div>
              <p className="eyebrow mb-3 text-chilli">Pura fresh · limited lots</p>
              <h2 data-split className="display text-[13vw] md:text-[7vw]">
                Fresh off the shelf
              </h2>
            </div>
            <Link href="/shop" className="btn btn-sand hidden shrink-0 md:inline-flex">
              Shop all <ArrowIcon width={18} height={18} />
            </Link>
          </div>
          <ShopGrid items={products} />
        </div>
      </section>
      <CategoryStack />
      <MatiSpotlight />
      <Festivals />
      <Testimonials />
      <InstaStrip />

      <section className="px-[var(--gutter)] pb-24">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[40px] border-2 border-ink bg-sand px-6 py-16 md:px-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <p className="eyebrow mb-4">The Aamahata letter</p>
              <h2 data-split className="display text-[12vw] md:text-[5.5vw]">
                Limited lots sell out. Get first dibs.
              </h2>
              <p data-reveal className="mt-4 max-w-md text-lg">
                Harada dali comes in 30 kg lots. Badi, when it&apos;s sunny. One email when fresh stock lands — no spam, Aai wouldn&apos;t allow it.
              </p>
            </div>
            <div data-reveal>
              <NewsletterForm />
            </div>
          </div>
          <div data-pop className="absolute -right-6 -top-6 hidden md:block">
            <CircleText
              text="FIRST DIBS ✦ FESTIVAL DROPS ✦ "
              className="h-40 w-40 rounded-full bg-chilli text-cream"
              center={<span className="display text-3xl text-cream">10%</span>}
            />
          </div>
        </div>
      </section>
    </>
  );
}
