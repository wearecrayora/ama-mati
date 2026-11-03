import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import ProductRail from "@/components/home/ProductRail";
import CategoryStack from "@/components/home/CategoryStack";
import MatiSpotlight from "@/components/home/MatiSpotlight";
import Festivals from "@/components/home/Festivals";
import Testimonials from "@/components/home/Testimonials";
import InstaStrip from "@/components/home/InstaStrip";
import Marquee from "@/components/ui/Marquee";
import NewsletterForm from "@/components/ui/NewsletterForm";
import CircleText from "@/components/ui/CircleText";
import { products } from "@/lib/products";

export default function Home() {
  const railItems = products;

  return (
    <>
      <Hero />

      <div className="relative z-10 -my-1 -rotate-2 scale-105 border-y-2 border-ink bg-ink py-4 text-cream">
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

      <Manifesto />
      <ProductRail items={railItems} title="Fresh off the shelf" kicker="Pura fresh · limited lots" />
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
