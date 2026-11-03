import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products, related } from "@/lib/products";
import ProductDetail from "@/components/product/ProductDetail";
import ProductCard from "@/components/product/ProductCard";
import Reviews from "@/components/product/Reviews";
import Marquee from "@/components/ui/Marquee";

// Every slug is prerendered by generateStaticParams, so navigations here are already
// instant; opt out of the dev-time Suspense validation for the params read.
export const instant = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <ProductDetail product={product} />

      <div className="border-y-2 border-ink bg-sand py-4">
        <Marquee
          items={product.details.map((i) => (
            <span key={i} className="display text-3xl md:text-4xl">
              {i}
            </span>
          ))}
          separator={<span className="text-chilli">✦</span>}
          speed={24}
        />
      </div>

      <Reviews product={product} />

      <section className="wrap pb-28">
        <h2 data-split className="display mb-10 text-[12vw] md:text-6xl">
          Pairs well with
        </h2>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {related(product).map((p) => (
            <div key={p.slug} data-reveal>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
