"use client";

import Link from "next/link";
import { useCart } from "@/lib/store";
import { getProduct } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import Ingredient from "@/components/art/Ingredient";

export default function WishlistPage() {
  const wishlist = useCart((s) => s.wishlist);
  const items = wishlist.map(getProduct).filter((p) => !!p);

  return (
    <div className="wrap pb-28 pt-[calc(var(--header-h)+3rem)]">
      <p className="eyebrow mb-3 text-chilli">Saved for later</p>
      <h1 data-split className="display text-[16vw] md:text-[7vw]">
        Wishlist
      </h1>
      {items.length === 0 ? (
        <div className="py-20 text-center">
          <Ingredient kind="sparkle" className="mx-auto w-20" />
          <p className="display mt-6 text-4xl">Nothing saved yet.</p>
          <p className="mx-auto mt-3 max-w-sm opacity-70">Tap the heart on anything you like the look of. We&apos;ll keep it here for you.</p>
          <Link href="/shop" className="btn mt-8">Find something</Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
