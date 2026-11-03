import { CHILLI, CREAM, INK, SAND, SIENNA, type IngredientKind } from "@/lib/products";

const S = 3;

const shapes: Record<IngredientKind, React.ReactNode> = {
  // a stalk of paddy — rice before it's rice
  paddy: (
    <>
      <path d="M30 94 C40 70 52 40 72 8" fill="none" stroke={SIENNA} strokeWidth={4} strokeLinecap="round" />
      {[[62, 22, -30], [54, 34, -25], [47, 46, -20], [41, 58, -15], [70, 30, 40], [63, 42, 45], [56, 54, 50]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={9} ry={4.5} transform={`rotate(${r} ${x} ${y})`} fill={SAND} stroke={INK} strokeWidth={2} />
      ))}
      <path d="M34 80 C20 70 14 56 16 44 C26 52 32 64 34 80 Z" fill={SIENNA} stroke={INK} strokeWidth={2} />
    </>
  ),
  rice: (
    <>
      {[[30, 30, 20], [56, 24, -30], [74, 46, 60], [40, 56, -10], [62, 70, 40], [26, 76, 80], [48, 40, 110]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={13} ry={5.5} transform={`rotate(${r} ${x} ${y})`} fill={CREAM} stroke={INK} strokeWidth={2} />
      ))}
    </>
  ),
  dal: (
    <>
      {[[32, 30], [56, 26], [74, 46], [40, 54], [62, 68], [28, 74], [50, 82], [80, 72]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={10} fill={i % 2 ? "#eab23a" : SAND} stroke={INK} strokeWidth={2} />
          <path d={`M${x - 6} ${y} H${x + 6}`} stroke={INK} strokeOpacity={0.3} strokeWidth={1.5} />
        </g>
      ))}
    </>
  ),
  beans: (
    <>
      {[[30, 32, 10], [54, 24, -20], [74, 44, 30], [40, 56, 60], [64, 70, -10], [28, 78, 20]].map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx={11} ry={8} fill={i % 2 ? "#8b5a3c" : SIENNA} stroke={INK} strokeWidth={2} />
          <circle cx={x - 3} cy={y - 2} r={1.5} fill={INK} opacity={0.5} />
          <circle cx={x + 3} cy={y + 2} r={1.2} fill={INK} opacity={0.5} />
        </g>
      ))}
    </>
  ),
  badi: (
    <>
      {/* a hand-dropped badi: wide base, twisted peak */}
      <path d="M52 8 C50 22 60 30 72 42 C86 56 88 74 76 84 C64 92 36 92 24 84 C12 74 14 56 28 42 C40 30 48 22 52 8 Z" fill="#eadbbd" stroke={INK} strokeWidth={S} strokeLinejoin="round" />
      <path d="M52 8 C46 20 50 30 44 40 M40 52 C36 62 38 72 44 80 M62 54 C68 62 68 72 62 80" fill="none" stroke={SIENNA} strokeOpacity={0.55} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M22 84 C38 92 62 92 78 84" fill="none" stroke={SIENNA} strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  leaf: (
    <>
      <path d="M12 82 C14 40 44 14 88 12 C86 54 58 84 12 82 Z" fill={SIENNA} stroke={INK} strokeWidth={S} strokeLinejoin="round" />
      <path d="M14 80 C40 58 60 38 84 16 M34 62 L32 44 M48 48 L46 30 M50 46 L68 48 M36 60 L54 62" fill="none" stroke={CREAM} strokeOpacity={0.6} strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  seeds: (
    <>
      {[[30, 34, 9], [52, 26, 8], [70, 42, 10], [40, 56, 10], [62, 66, 8], [28, 74, 7], [82, 70, 7]].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={i % 2 ? SIENNA : INK} stroke={INK} strokeWidth={2} />
          <circle cx={x - r / 3} cy={y - r / 3} r={r / 4} fill="#fff" opacity={0.4} />
        </g>
      ))}
    </>
  ),
  chilli: (
    <>
      <path d="M22 30 C40 26 70 40 84 76 C88 86 82 90 76 82 C60 58 40 46 24 44 C16 42 14 32 22 30 Z" fill={CHILLI} stroke={INK} strokeWidth={S} strokeLinejoin="round" />
      <path d="M22 30 C16 24 14 16 20 10" fill="none" stroke={SIENNA} strokeWidth={5} strokeLinecap="round" />
      <path d="M34 36 C48 38 60 48 68 60" fill="none" stroke="#fff" strokeOpacity={0.45} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  sparkle: (
    <path d="M50 6 C54 38 62 46 94 50 C62 54 54 62 50 94 C46 62 38 54 6 50 C38 46 46 38 50 6 Z" fill={SAND} stroke={INK} strokeWidth={S} strokeLinejoin="round" />
  ),
};

export default function Ingredient({ kind, className }: { kind: IngredientKind; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {shapes[kind]}
    </svg>
  );
}
