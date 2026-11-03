import type { Metadata } from "next";
import Link from "next/link";
import { getProduct, inr } from "@/lib/products";
import ProductMedia from "@/components/product/ProductMedia";

export const metadata: Metadata = { title: "My account" };

// Sample account data for the approval build.
const ORDERS = [
  { id: "AMH482913", date: "28 Oct 2026", status: "Out for delivery", items: ["niti-usuna-rice", "biri-badi"], total: 318 },
  { id: "AMH337120", date: "12 Jun 2026", status: "Delivered", items: ["raja-box"], total: 549 },
  { id: "AMH201554", date: "02 Mar 2026", status: "Delivered", items: ["kolatha-dali", "harada-dali", "biryani-rice"], total: 748 },
];

const TABS = ["Orders", "Addresses", "Wishlist", "Profile"];

export default function OrdersPage() {
  return (
    <div className="wrap pb-28 pt-[calc(var(--header-h)+3rem)]">
      <p className="eyebrow mb-3 text-chilli">My account</p>
      <h1 data-split className="display text-[14vw] md:text-[6vw]">
        Namaskar, Sasmita
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Account">
          {TABS.map((t, i) => (
            <Link
              key={t}
              href={t === "Wishlist" ? "/wishlist" : "/account/orders"}
              className={`chip shrink-0 justify-start lg:rounded-2xl lg:px-5 lg:py-3 lg:text-base ${i === 0 ? "bg-ink text-cream" : "bg-paper hover:bg-sand"}`}
            >
              {t}
            </Link>
          ))}
          <Link href="/account" className="chip shrink-0 justify-start bg-paper lg:mt-6 lg:rounded-2xl lg:px-5 lg:py-3 lg:text-base">
            Sign out
          </Link>
        </nav>

        <div className="space-y-5">
          {ORDERS.map((o) => (
            <article key={o.id} data-reveal className="rounded-[28px] border-2 border-ink bg-paper p-5 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="display text-3xl">{o.id}</p>
                  <p className="text-sm opacity-60">Placed {o.date} · {inr(o.total)}</p>
                </div>
                <span className={`rounded-full border-2 border-ink px-4 py-1 text-sm font-bold ${o.status === "Delivered" ? "bg-sand" : "bg-chilli text-cream"}`}>{o.status}</span>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {o.items.map((s) => {
                  const p = getProduct(s)!;
                  return (
                    <Link key={s} href={`/shop/${s}`} className="relative h-20 w-16 overflow-hidden rounded-xl border-2 border-ink bg-ink" title={p.name}>
                      <ProductMedia product={p} sizes="64px" />
                    </Link>
                  );
                })}
                <div className="ml-auto flex gap-2">
                  <Link href="/track-order" className="btn btn-cream px-4 py-2 text-sm">Track</Link>
                  <Link href={`/shop/${o.items[0]}`} className="btn px-4 py-2 text-sm">Buy again</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
