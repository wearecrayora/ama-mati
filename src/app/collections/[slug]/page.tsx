import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { byCategory, categories, getCategory, type CategorySlug } from "@/lib/products";
import PageHero from "@/components/ui/PageHero";
import ShopGrid from "@/components/shop/ShopGrid";

// Every slug is prerendered by generateStaticParams, so navigations here are already
// instant; opt out of the dev-time Suspense validation for the params read.
export const instant = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const c = getCategory((await params).slug);
  return c ? pageMeta({ title: c.name, description: c.blurb, path: `/collections/${c.slug}` }) : {};
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const items = byCategory(slug as CategorySlug);
  const others = categories.filter((c) => c.slug !== slug);

  return (
    <>
      <PageHero kicker={`Collection · ${items.length} items`} title={cat.name} odia={cat.odia} intro={cat.blurb} bg={cat.bg} fg={cat.fg} />
      <section className="wrap py-16 md:py-24">
        <ShopGrid items={items} showFilters={false} />
      </section>
      <section className="wrap pb-28">
        <p className="eyebrow mb-4">Keep browsing</p>
        <div className="flex flex-wrap gap-3">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="display rounded-full border-2 border-ink px-6 py-3 text-2xl shadow-[4px_4px_0_var(--color-ink)] transition hover:-translate-y-1 md:text-4xl"
              style={{ background: c.bg, color: c.fg }}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
