import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ShopGrid from "@/components/shop/ShopGrid";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop the pantry" };

export default function ShopPage() {
  return (
    <>
      <PageHero
        kicker="The whole hata"
        title="The pantry"
        odia="ହାଟ"
        intro="Usuna rice, biryani rice, kolatha and harada dali, homemade biri badi and festival boxes — everything from Mati Odisha, in one aisle. Free delivery over ₹799."
        ingredients={["paddy", "sparkle", "badi"]}
      />
      <section className="wrap pb-28 pt-0">
        <ShopGrid items={products} />
      </section>
    </>
  );
}
