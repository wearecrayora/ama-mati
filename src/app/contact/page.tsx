"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import { FacebookIcon, InstagramIcon, PhoneIcon, WhatsappIcon } from "@/components/ui/Icons";
import { CONTACT } from "@/lib/products";

const CHANNELS = [
  { t: "Call the outlet", d: CONTACT.phones[0], href: `tel:${CONTACT.phones[0].replace(/\s/g, "")}`, icon: <PhoneIcon />, bg: "bg-sand" },
  { t: "WhatsApp", d: CONTACT.phones[1], href: `https://wa.me/${CONTACT.whatsapp}`, icon: <WhatsappIcon />, bg: "bg-paper" },
  { t: "Instagram", d: "@aamahataindia", href: CONTACT.instagram.amahata, icon: <InstagramIcon />, bg: "bg-chilli text-cream" },
  { t: "Facebook", d: "Mati Odisha", href: CONTACT.facebook, icon: <FacebookIcon />, bg: "bg-paper" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        kicker="Say namaskar"
        title="Talk to the hata"
        odia="କଥା"
        intro="Bulk orders, wedding gifting, corporate Raja boxes, or just a question about usuna rice — call, WhatsApp, or walk into the outlet."
        bg="var(--color-chilli)"
        fg="var(--color-cream)"
        ingredients={["paddy", "sparkle", "badi"]}
      />
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1fr_1.2fr] md:py-24">
        <div className="space-y-4">
          {CHANNELS.map((c, i) => (
            <a key={c.t} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-reveal className={`sticker flex items-center gap-5 rounded-3xl p-5 transition hover:-translate-y-1 ${c.bg}`} style={{ rotate: `${(i % 2 ? 1 : -1) * 0.8}deg` }}>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream text-ink">{c.icon}</span>
              <span>
                <span className="block text-sm font-bold uppercase tracking-wider opacity-70">{c.t}</span>
                <span className="display text-2xl md:text-3xl">{c.d}</span>
              </span>
            </a>
          ))}
        </div>

        {sent ? (
          <div className="grid place-items-center rounded-[32px] border-2 border-ink bg-sand p-10 text-center">
            <div>
              <p className="odia text-4xl">ଧନ୍ୟବାଦ</p>
              <p className="display mt-2 text-5xl">Message sent!</p>
              <p className="mt-3 opacity-80">We&apos;ll get back to you soon.</p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="sticker space-y-5 rounded-[32px] bg-paper p-6 md:p-10"
          >
            <h2 className="display text-4xl">Send a note</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold">Name</span>
                <input required className="field" autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold">Phone or email</span>
                <input required className="field" />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">What&apos;s it about?</span>
              <select className="field">
                <option>An order</option>
                <option>Bulk / wholesale (we stock 30 kg lots)</option>
                <option>Festival box gifting</option>
                <option>Selling on Aamahata</option>
                <option>Something else</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Message</span>
              <textarea required rows={5} className="field resize-none" />
            </label>
            <button className="btn py-4">Send message</button>
          </form>
        )}
      </div>

      {/* the real outlet */}
      <section className="wrap pb-28">
        <div className="grid overflow-hidden rounded-[36px] border-2 border-ink md:grid-cols-[1fr_1.4fr]">
          <div className="bg-ink p-8 text-cream md:p-12">
            <p className="eyebrow text-sand">Visit the outlet</p>
            <h2 data-split className="display mt-3 text-5xl md:text-6xl">
              {CONTACT.outlet}
            </h2>
            <p data-reveal className="mt-6 text-lg leading-relaxed opacity-85">{CONTACT.address}</p>
            <p data-reveal className="mt-3 font-semibold text-sand">{CONTACT.hours}</p>
            <p data-reveal className="mt-1 text-sm opacity-70">★ {CONTACT.googleRating} on Google</p>
            <a data-reveal href={CONTACT.maps} target="_blank" rel="noreferrer" className="btn btn-sand mt-8">
              Get directions
            </a>
          </div>
          <div className="relative min-h-[360px] bg-sand">
            <iframe
              title="Map to the MatiOdisha factory outlet"
              src={CONTACT.mapEmbed}
              className="absolute inset-0 h-full w-full grayscale-[30%] sepia-[25%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
