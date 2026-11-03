import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Accordion from "@/components/ui/Accordion";

export const metadata: Metadata = pageMeta({
  title: "FAQ",
  description: "Delivery times, usuna rice, shelf life, bulk orders and returns at Aamahata.",
  path: "/faq",
});

const GROUPS = [
  {
    title: "Orders & delivery",
    items: [
      { q: "Where do you deliver?", a: "Everywhere in India with a valid pincode. International shipping for the diaspora is coming soon — join the newsletter to hear first." },
      { q: "How long does delivery take?", a: "Orders are dispatched within 24 hours from Bhubaneswar. Odisha: 1–2 days. Rest of India: 3–5 working days. Express is available at checkout." },
      { q: "Is delivery free?", a: "Free on orders above ₹799. Below that, a flat ₹79." },
      { q: "Do you offer cash on delivery?", a: "Yes, with a small ₹30 handling fee." },
    ],
  },
  {
    title: "The food",
    items: [
      { q: "Is it really chemical-free?", a: "Yes. No polish on the rice, no chemicals or preservatives on the dali, and the badi is homemade and sun-dried. Every pack carries a packed-on date and batch number." },
      { q: "What is usuna rice?", a: "Usuna is Odisha's parboiled rice — paddy that's soaked and steamed before milling. It cooks firm, keeps longer and is what most Odia homes eat every day. Our white Niti Usuna is double-boiled." },
      { q: "How long do rice and dali keep?", a: "Up to 12 months from the packed date on the label (our kolatha dali carries a 1-year expiry). Store in an airtight container, away from moisture. Badi keeps 6 months; store it dry." },
      { q: "Do you sell in bulk?", a: "Yes — harada dali comes in 30 kg lots and rice in larger bags. Call or WhatsApp the outlet for wholesale prices." },
    ],
  },
  {
    title: "Returns & help",
    items: [
      { q: "Something arrived broken. What now?", a: "Send a photo on WhatsApp within 48 hours of delivery. We'll replace it or refund you — your choice." },
      { q: "Can I return food I didn't like?", a: "For hygiene reasons we can't accept returns of opened food, but tell us — we'll make it right." },
      { q: "Can I sell my products on Aamahata?", a: "We'd love that. Odia makers can write to us from the contact page." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero kicker="Questions, answered" title="Good to know" odia="ପ୍ରଶ୍ନ" ingredients={["rice", "sparkle", "beans"]} />
      <div className="wrap grid gap-16 py-16 md:py-24">
        {GROUPS.map((g) => (
          <section key={g.title} data-reveal className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <h2 className="display text-4xl md:text-5xl">{g.title}</h2>
            <Accordion items={g.items} />
          </section>
        ))}
        <div data-reveal className="rounded-[32px] border-2 border-ink bg-sand p-8 text-center md:p-12">
          <p className="display text-4xl">Still hungry for answers?</p>
          <Link href="/contact" className="btn mt-6">Ask us anything</Link>
        </div>
      </div>
    </>
  );
}
