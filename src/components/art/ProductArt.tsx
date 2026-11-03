import type { Contents, Product } from "@/lib/products";
import { GOLD, INK, POUCH } from "@/lib/products";

/*
  Illustrated packshots modelled on the real Mati Odisha packaging — matte
  black stand-up pouch, gold seal, white label, clear window onto the grain.
  Used where the site animates packs (preloader, hero, menu); product pages
  use the real photography.
*/

const S = 3;

// Tiny deterministic PRNG so SSR and client draw identical grains.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const GRAIN: Record<Contents, { fill: string[]; rx: number; ry: number; n: number }> = {
  "red-rice": { fill: ["#b0603a", "#9a4f2d", "#c4794d"], rx: 5, ry: 2.4, n: 70 },
  "white-rice": { fill: ["#f6f1dc", "#ece4c6", "#fffaf0"], rx: 5, ry: 2.3, n: 70 },
  "long-rice": { fill: ["#f4ecd2", "#e9dfc0", "#fff8e8"], rx: 8.5, ry: 1.9, n: 60 },
  horsegram: { fill: ["#8b5a3c", "#6e4630", "#a06a45"], rx: 4.2, ry: 3.3, n: 70 },
  toor: { fill: ["#eab23a", "#f0c255", "#d99e2b"], rx: 4, ry: 3.6, n: 70 },
  badi: { fill: ["#eadbbd", "#dcc9a3", "#f3e7cc"], rx: 9, ry: 7, n: 16 },
};

function Grains({ kind, x, y, w, h, seed }: { kind: Contents; x: number; y: number; w: number; h: number; seed: number }) {
  const g = GRAIN[kind];
  const r = rng(seed);
  return (
    <g>
      {Array.from({ length: g.n }, (_, i) => {
        const cx = x + g.rx + r() * (w - g.rx * 2);
        const cy = y + g.ry + r() * (h - g.ry * 2);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={g.rx}
            ry={g.ry}
            transform={`rotate(${Math.round(r() * 180)} ${cx.toFixed(1)} ${cy.toFixed(1)})`}
            fill={g.fill[i % g.fill.length]}
            stroke={kind === "badi" ? INK : "rgba(43,22,12,0.35)"}
            strokeWidth={kind === "badi" ? 1.5 : 0.8}
          />
        );
      })}
    </g>
  );
}

function fit(text: string, size: number, max: number) {
  const est = text.length * size * 0.58;
  return est > max ? { textLength: max, lengthAdjust: "spacingAndGlyphs" as const } : {};
}

function Pouch({ p, seed }: { p: Product; seed: number }) {
  const name = p.name.replace(/ \(.*\)/, "").toUpperCase();
  return (
    <>
      <path d="M50 46 H190 L198 266 Q199 284 182 284 H58 Q41 284 42 266 Z" fill={POUCH} stroke={INK} strokeWidth={S} strokeLinejoin="round" />
      <rect x={48} y={30} width={144} height={22} rx={3} fill="#2c231e" stroke={INK} strokeWidth={S} />
      {Array.from({ length: 17 }, (_, i) => (
        <path key={i} d={`M${55 + i * 8} 34 V48`} stroke="#fff" strokeOpacity={0.08} strokeWidth={2} />
      ))}
      <path d="M54 62 H186" stroke="#fff" strokeOpacity={0.12} strokeWidth={2} strokeDasharray="5 4" />
      {/* gold seal, printed */}
      <image href="/brand/mati-odisha-gold.png" x={74} y={66} width={92} height={92} />
      {/* clear window */}
      <rect x={60} y={186} width={120} height={58} rx={10} fill="#f5efe0" stroke={INK} strokeWidth={2} />
      <Grains kind={p.art.contents} x={62} y={188} w={116} h={54} seed={seed} />
      <rect x={66} y={190} width={8} height={48} rx={4} fill="#fff" opacity={0.35} />
      {/* white label sticker */}
      <rect x={70} y={160} width={100} height={30} rx={3} fill="#fbfbf6" stroke={INK} strokeWidth={1.5} />
      <text x={120} y={174} textAnchor="middle" fontSize={9.5} fontWeight={800} fill={INK} style={{ fontFamily: "var(--font-bricolage)" }} {...fit(name, 9.5, 90)}>
        {name}
      </text>
      <text x={120} y={186} textAnchor="middle" fontSize={9} fill={INK} style={{ fontFamily: "var(--font-noto-oriya)" }} {...fit(p.odia, 9, 90)}>
        {p.odia}
      </text>
      <text x={120} y={266} textAnchor="middle" fontSize={11} fontStyle="italic" fontWeight={700} fill={GOLD} style={{ fontFamily: "var(--font-bricolage)" }}>
        Purest from Odisha
      </text>
      <path d="M58 80 Q54 170 58 250" stroke="#fff" strokeOpacity={0.12} strokeWidth={8} strokeLinecap="round" fill="none" />
    </>
  );
}

function Tub({ p, seed }: { p: Product; seed: number }) {
  return (
    <>
      <path d="M44 118 L60 270 Q62 282 76 282 H164 Q178 282 180 270 L196 118 Z" fill="#f3ead6" fillOpacity={0.9} stroke={INK} strokeWidth={S} strokeLinejoin="round" />
      <Grains kind="badi" x={56} y={126} w={128} h={146} seed={seed} />
      <Grains kind="badi" x={64} y={150} w={112} h={118} seed={seed + 7} />
      <path d="M58 132 L70 262" stroke="#fff" strokeOpacity={0.55} strokeWidth={7} strokeLinecap="round" />
      <ellipse cx={120} cy={118} rx={80} ry={18} fill="#efe6d0" stroke={INK} strokeWidth={S} />
      <rect x={38} y={98} width={164} height={22} rx={8} fill="#f7f1e2" stroke={INK} strokeWidth={S} />
      <ellipse cx={120} cy={98} rx={82} ry={14} fill="#fbf8ee" stroke={INK} strokeWidth={S} />
      {/* brand sticker on the lid */}
      <circle cx={120} cy={96} r={30} fill={POUCH} stroke={INK} strokeWidth={2} />
      <image href="/brand/mati-odisha-gold.png" x={93} y={69} width={54} height={54} />
      <rect x={78} y={208} width={84} height={34} rx={4} fill="#fbfbf6" stroke={INK} strokeWidth={1.5} />
      <text x={120} y={223} textAnchor="middle" fontSize={10} fontWeight={800} fill={INK} style={{ fontFamily: "var(--font-bricolage)" }}>
        {p.name.toUpperCase()}
      </text>
      <text x={120} y={236} textAnchor="middle" fontSize={9.5} fill={INK} style={{ fontFamily: "var(--font-noto-oriya)" }}>
        {p.odia}
      </text>
    </>
  );
}

function Box({ p }: { p: Product }) {
  const ribbon = p.art.ribbon ?? GOLD;
  return (
    <>
      <rect x={36} y={128} width={168} height={150} rx={8} fill={POUCH} stroke={INK} strokeWidth={S} />
      <rect x={28} y={98} width={184} height={42} rx={8} fill="#2c231e" stroke={INK} strokeWidth={S} />
      <path d="M120 98 V278" stroke={ribbon} strokeWidth={10} />
      <path d="M28 119 H212" stroke={ribbon} strokeWidth={8} />
      <path d="M120 96 C92 66 78 92 104 98 Z M120 96 C148 66 162 92 136 98 Z" fill={ribbon} stroke={INK} strokeWidth={S} strokeLinejoin="round" />
      <circle cx={120} cy={96} r={7} fill={GOLD} stroke={INK} strokeWidth={S} />
      <circle cx={120} cy={200} r={50} fill={POUCH} stroke={GOLD} strokeWidth={3} />
      <image href="/brand/mati-odisha-gold.png" x={74} y={154} width={92} height={92} />
      <rect x={58} y={252} width={124} height={20} rx={3} fill="#fbfbf6" stroke={INK} strokeWidth={1.5} />
      <text x={120} y={266} textAnchor="middle" fontSize={10} fontWeight={800} fill={INK} style={{ fontFamily: "var(--font-bricolage)" }} {...fit(p.name.toUpperCase(), 10, 112)}>
        {p.name.toUpperCase()}
      </text>
    </>
  );
}

export default function ProductArt({ product, className, shadow = true }: { product: Product; className?: string; shadow?: boolean }) {
  const seed = [...product.slug].reduce((a, c) => a + c.charCodeAt(0), 7);
  return (
    <svg viewBox="0 0 240 300" className={className} role="img" aria-label={`${product.name} pack`}>
      {shadow && <ellipse cx={120} cy={287} rx={84} ry={8} fill={INK} opacity={0.2} />}
      {product.art.shape === "pouch" && <Pouch p={product} seed={seed} />}
      {product.art.shape === "tub" && <Tub p={product} seed={seed} />}
      {product.art.shape === "box" && <Box p={product} />}
    </svg>
  );
}
