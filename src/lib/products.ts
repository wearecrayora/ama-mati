/*
  Catalogue for the approval build.

  The six Mati Odisha products and their photos come from the brand's
  Instagram posts (@aamahataindia). MRPs marked `fromLabel` were read off the
  printed pack label; every other price, rating and review count is a
  PLACEHOLDER. The three festival boxes are proposed bundles of real products,
  not existing SKUs — confirm with the client before launch.
*/

export const INK = "#2b160c";
export const CHILLI = "#e35336";
export const CREAM = "#f5f5dc";
export const PAPER = "#fbfbef";
export const SAND = "#f4a460";
export const SIENNA = "#a0522d";

export type CategorySlug = "rice" | "dali" | "badi" | "boxes";

export type Category = {
  slug: CategorySlug;
  name: string;
  odia: string;
  blurb: string;
  bg: string;
  fg: string;
};

export const categories: Category[] = [
  {
    slug: "rice",
    name: "Chaula",
    odia: "ଚାଉଳ",
    blurb: "Desi usuna and long-grain rice, sourced straight from Odisha's paddy belt and packed fresh.",
    bg: CHILLI,
    fg: CREAM,
  },
  {
    slug: "dali",
    name: "Dali",
    odia: "ଡାଲି",
    blurb: "Kolatha and harada dali the way Odia kitchens buy them — whole, honest, and from Jajpur.",
    bg: SAND,
    fg: INK,
  },
  {
    slug: "badi",
    name: "Badi",
    odia: "ବଡ଼ି",
    blurb: "Biri badi, beaten by hand and dried in the sun. 100% homemade, the way aai makes it.",
    bg: SIENNA,
    fg: CREAM,
  },
  {
    slug: "boxes",
    name: "Festival Boxes",
    odia: "ଉପହାର",
    blurb: "Bundles for Raja, Ratha Yatra and Bali Jatra. Gift a whole Odia kitchen.",
    bg: INK,
    fg: SAND,
  },
];

export type Size = { label: string; price: number; mrp: number };

export type IngredientKind = "paddy" | "rice" | "dal" | "beans" | "badi" | "leaf" | "sparkle" | "seeds" | "chilli";

export type Product = {
  slug: string;
  name: string;
  odia: string;
  category: CategorySlug;
  tagline: string;
  description: string;
  details: string[];
  howTo: string;
  origin: string;
  sizes: Size[];
  fromLabel?: boolean;
  rating: number;
  reviews: number;
  badge?: "Limited stock" | "New batch" | "In stock" | "Festival" | "Proposed";
  stage: string;
  images: string[];
  ingredientsArt: IngredientKind[];
  instagram?: string;
  includes?: string[];
};

const img = (slug: string, n: number) => Array.from({ length: n }, (_, i) => `/products/${slug}/${i + 1}.webp`);

export const products: Product[] = [
  {
    slug: "niti-usuna-rice",
    name: "Niti Usuna Rice 2.0",
    odia: "ନୀତି ଉଷୁନା ଚାଉଳ",
    category: "rice",
    tagline: "Pure taste. Healthy life. Odishan tradition.",
    description:
      "The new batch of our everyday usuna (parboiled) rice. 100% natural, rich in nutrition and good for health — the authentic Odishan rice that ends up in pakhala, in dalma-bhata, in every Sunday thali.",
    details: ["100% natural", "Rich in nutrition", "Desi parboiled (usuna) rice", "No polish, no chemicals"],
    howTo: "Rinse twice, soak 20 minutes, cook 1 : 2.5 with water. Leftovers become tomorrow's pakhala.",
    origin: "Odisha",
    sizes: [
      { label: "1 kg", price: 169, mrp: 189 },
      { label: "5 kg", price: 799, mrp: 925 },
    ],
    rating: 4.8,
    reviews: 64,
    badge: "New batch",
    stage: SAND,
    images: img("niti-usuna", 4),
    ingredientsArt: ["paddy", "rice", "sparkle"],
    instagram: "https://www.instagram.com/p/De04JplGKal/",
  },
  {
    slug: "niti-usuna-white",
    name: "Niti Usuna Rice (White)",
    odia: "ଧଳା ଉଷୁନା ଚାଉଳ",
    category: "rice",
    tagline: "Rare desi double-boiled usuna, straight from Jajpur.",
    description:
      "Rare desi double-boiled usuna rice, sourced directly from farmers in Jajpur. Double boiling keeps the grain firm and separate, and gives it that slightly nutty smell every Odia grandmother can recognise from the next room.",
    details: ["Double-boiled (usuna)", "Sourced from Jajpur", "1 kg pack", "Pura fresh — packed on order"],
    howTo: "Best for everyday bhata, kanji and pakhala. Cooks soft but never sticky.",
    origin: "Jajpur",
    sizes: [
      { label: "1 kg", price: 159, mrp: 159 },
      { label: "5 kg", price: 749, mrp: 795 },
    ],
    fromLabel: true,
    rating: 4.7,
    reviews: 88,
    badge: "In stock",
    stage: CREAM,
    images: img("niti-usuna-white", 5),
    ingredientsArt: ["rice", "paddy", "leaf"],
    instagram: "https://www.instagram.com/p/Dbj0CiFmPE0/",
  },
  {
    slug: "biryani-rice",
    name: "Biryani Rice",
    odia: "ବିରିୟାନି ଚାଉଳ",
    category: "rice",
    tagline: "XXXL 1121 long-grain basmati. Premium biryani grade.",
    description:
      "Extra-long, premium-grade 1121 basmati — the XXXL grain that doubles in length when it cooks. Pure, authentic and packed fresh, for biryani, pulao and every occasion that deserves a little show.",
    details: ["XXXL 1121 long-grain basmati", "Extra-long premium grade", "1 kg pack", "Limited stock"],
    howTo: "Soak 30 minutes, cook in plenty of salted water, drain. Each grain stays long and separate.",
    origin: "Odisha",
    sizes: [
      { label: "1 kg", price: 280, mrp: 280 },
      { label: "5 kg", price: 1349, mrp: 1400 },
    ],
    fromLabel: true,
    rating: 4.8,
    reviews: 52,
    badge: "Limited stock",
    stage: CHILLI,
    images: img("biryani-rice", 6),
    ingredientsArt: ["rice", "leaf", "sparkle"],
    instagram: "https://www.instagram.com/p/Db-yWnkGI2C/",
  },
  {
    slug: "kolatha-dali",
    name: "Kolatha Dali",
    odia: "କୋଳଥ ଡାଲି",
    category: "dali",
    tagline: "Horse-gram dal. Nature's goodness, pure & simple.",
    description:
      "Horse gram — kolatha — is the dal Odisha's villages have trusted for generations. Dry-cleaned and directly sourced from Jajpur, with no chemicals and no preservatives. Hearty, earthy and famously good for you.",
    details: ["Horse-gram (kolatha) dal", "Sourced from Jajpur", "No chemicals, no preservatives", "1 kg pack"],
    howTo: "Soak overnight. Pressure-cook with garlic, tomato and a pinch of pancha phutana for kolatha dali tadka.",
    origin: "Jajpur",
    sizes: [
      { label: "1 kg", price: 269, mrp: 269 },
      { label: "500 g", price: 145, mrp: 149 },
    ],
    fromLabel: true,
    rating: 4.9,
    reviews: 47,
    badge: "Limited stock",
    stage: SIENNA,
    images: img("kolatha-dali", 5),
    ingredientsArt: ["beans", "leaf", "sparkle"],
    instagram: "https://www.instagram.com/p/DbvZoRyGLGD/",
  },
  {
    slug: "harada-dali",
    name: "Harada Dali",
    odia: "ହରଡ଼ ଡାଲି",
    category: "dali",
    tagline: "Pigeon-pea dal. Purest from Odisha.",
    description:
      "Harada (arhar / toor) dali, pura fresh and traditionally processed. The backbone of dalma — the lentil-and-vegetable stew served at Jagannath's kitchen and in every Odia home. Small lots only; when it's gone, it's gone.",
    details: ["Pigeon-pea (harada) dal", "Traditionally processed", "No chemicals, no preservatives", "Only limited lots available"],
    howTo: "Rinse, cook with turmeric till soft, then add vegetables and finish with ghee and roasted jeera for dalma.",
    origin: "Odisha",
    sizes: [
      { label: "1 kg", price: 199, mrp: 219 },
      { label: "500 g", price: 105, mrp: 115 },
    ],
    rating: 4.8,
    reviews: 71,
    badge: "Limited stock",
    stage: SAND,
    images: img("harada-dal", 5),
    ingredientsArt: ["dal", "leaf", "seeds"],
    instagram: "https://www.instagram.com/p/Dbo9rxImC_A/",
  },
  {
    slug: "biri-badi",
    name: "Biri Badi",
    odia: "ବିରି ବଡ଼ି",
    category: "badi",
    tagline: "Pure taste, desi bite. 100% homemade.",
    description:
      "Black-gram (biri) batter, whipped by hand until it's light as air, dropped onto cloth and dried under the Odisha sun. 100% homemade and traditional. Fry a handful in mustard oil and they bloom golden in seconds.",
    details: ["100% homemade", "Black gram (biri)", "Sun-dried", "Limited stock"],
    howTo: "Fry in hot mustard oil until golden. Crush over dalma, add to saga bhaja, or eat straight with pakhala.",
    origin: "Odisha",
    sizes: [
      { label: "200 g", price: 149, mrp: 179 },
      { label: "500 g", price: 349, mrp: 399 },
    ],
    rating: 4.9,
    reviews: 93,
    badge: "Limited stock",
    stage: CHILLI,
    images: img("biri-badi", 5),
    ingredientsArt: ["badi", "seeds", "chilli"],
    instagram: "https://www.instagram.com/p/DcJLiP1mN_z/",
  },
  {
    slug: "raja-box",
    name: "Raja Box",
    odia: "ରଜ ଉପହାର",
    category: "boxes",
    tagline: "Niti Usuna 2.0, Biri Badi & Kolatha Dali.",
    description:
      "Everything the Raja kitchen needs for three days of rest and feasting: a pouch of Niti Usuna 2.0, a tub of biri badi and kolatha dali for the rainy-season tadka. Packed in a gift box with a hand-written card.",
    details: ["Niti Usuna Rice 2.0 · 1 kg", "Biri Badi · 200 g", "Kolatha Dali · 500 g", "Gift box + card"],
    howTo: "Order a week before Raja. Hide from family until day one.",
    origin: "Odisha",
    sizes: [
      { label: "Classic", price: 549, mrp: 609 },
      { label: "Family (2×)", price: 999, mrp: 1218 },
    ],
    rating: 5.0,
    reviews: 12,
    badge: "Proposed",
    stage: SIENNA,
    images: [],
    includes: ["niti-usuna-rice", "biri-badi", "kolatha-dali"],
    ingredientsArt: ["sparkle", "paddy", "badi"],
  },
  {
    slug: "ratha-yatra-box",
    name: "Ratha Yatra Dalma Box",
    odia: "ରଥଯାତ୍ରା ଭୋଗ",
    category: "boxes",
    tagline: "White usuna, harada dali & biri badi — dalma-bhata, sorted.",
    description:
      "The ingredients for the meal the whole state eats during Ratha Yatra: dalma and bhata. Double-boiled white usuna rice, harada dali and a tub of biri badi to crush over the top.",
    details: ["Niti Usuna (White) · 1 kg", "Harada Dali · 1 kg", "Biri Badi · 200 g", "Gift box + dalma recipe card"],
    howTo: "Open on the day the chariots roll. Cook dalma. Call everyone.",
    origin: "Odisha",
    sizes: [
      { label: "Classic", price: 489, mrp: 537 },
      { label: "Family (2×)", price: 899, mrp: 1074 },
    ],
    rating: 4.9,
    reviews: 9,
    badge: "Proposed",
    stage: SAND,
    images: [],
    includes: ["niti-usuna-white", "harada-dali", "biri-badi"],
    ingredientsArt: ["sparkle", "dal", "rice"],
  },
  {
    slug: "bali-jatra-box",
    name: "Bali Jatra Feast Box",
    odia: "ବାଲିଯାତ୍ରା ଭୋଜି",
    category: "boxes",
    tagline: "Biryani rice, harada dali & biri badi for the fair.",
    description:
      "For the sailing festival on the Mahanadi — a feast box with XXXL biryani rice, harada dali and biri badi. Enough for a family get-together after the fair.",
    details: ["Biryani Rice · 1 kg", "Harada Dali · 500 g", "Biri Badi · 200 g", "Gift box + card"],
    howTo: "Biryani for the guests, dalma for the family, badi for whoever gets to the kitchen first.",
    origin: "Odisha",
    sizes: [
      { label: "Classic", price: 499, mrp: 574 },
      { label: "Family (2×)", price: 949, mrp: 1148 },
    ],
    rating: 4.9,
    reviews: 7,
    badge: "Proposed",
    stage: CHILLI,
    images: [],
    includes: ["biryani-rice", "harada-dali", "biri-badi"],
    ingredientsArt: ["sparkle", "rice", "badi"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const byCategory = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const singles = products.filter((p) => p.category !== "boxes");

/* Photos for a product; boxes borrow the photos of what's inside. */
export function photosOf(p: Product): string[] {
  if (p.images.length) return p.images;
  return (p.includes ?? []).map((s) => getProduct(s)?.images[0]).filter((x): x is string => !!x);
}
export const coverOf = (p: Product) => photosOf(p)[0];

/*
  Cut-out studio packshots (transparent background) in public/products/packs,
  named by slug. Boxes return the packs of what's inside.
*/
export function packsOf(p: Product): string[] {
  if (p.category !== "boxes") return [`/products/packs/${p.slug}.webp`];
  return (p.includes ?? []).map((s) => `/products/packs/${s}.webp`);
}

export function related(p: Product, n = 4) {
  const same = products.filter((x) => x.category === p.category && x.slug !== p.slug);
  const rest = products.filter((x) => x.category !== p.category && x.slug !== p.slug);
  return [...same, ...rest].slice(0, n);
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const festivals = [
  {
    slug: "raja",
    name: "Raja",
    odia: "ରଜ",
    when: "June · 3 days",
    story: "Earth's three days of rest. Swings in the mango trees, new clothes, and a kitchen that never stops.",
    box: "raja-box",
    bg: CHILLI,
  },
  {
    slug: "ratha-yatra",
    name: "Ratha Yatra",
    odia: "ରଥଯାତ୍ରା",
    when: "June – July",
    story: "When the Lord comes out to meet everyone — and every Odia home cooks dalma and bhata.",
    box: "ratha-yatra-box",
    bg: SAND,
  },
  {
    slug: "bali-jatra",
    name: "Bali Jatra",
    odia: "ବାଲିଯାତ୍ରା",
    when: "Kartika Purnima",
    story: "The sailing festival on the Mahanadi, remembering the boitas that traded with Bali. A feast after the fair.",
    box: "bali-jatra-box",
    bg: SIENNA,
  },
];

// Placeholder testimonials for the approval build.
export const testimonials = [
  { quote: "Usuna rice that actually smells like home. My mother approved, which is the only review that matters.", name: "Sasmita P.", city: "Pune" },
  { quote: "Biri badi bloomed perfectly in the oil. Tastes exactly like the ones from my village.", name: "Ankit M.", city: "Bengaluru" },
  { quote: "Kolatha dali from Jajpur, delivered to Hyderabad. I made kolatha tadka for the first time in years.", name: "Lipsa R.", city: "Hyderabad" },
  { quote: "The 1121 biryani rice really is extra long. Guests asked where I bought it.", name: "Debasish S.", city: "Kolkata" },
  { quote: "Harada dali sold out the last time — set an alert and grabbed it this round. Dalma is back.", name: "Priyanka D.", city: "Delhi" },
];

// From the Google Maps listing and Instagram captions; email is a placeholder.
export const CONTACT = {
  phones: ["0674 313 7309", "+91 77880 32567"],
  whatsapp: "917788032567",
  email: "hello@aamahata.com",
  outlet: "MatiOdisha factory outlet",
  address: "Chandralok Market Complex, HIG Colony, Niladri Vihar, Chandrasekharpur, Bhubaneswar, Odisha 751021",
  hours: "Open daily · closes 8 pm",
  googleRating: 4.8,
  maps: "https://www.google.com/maps/place/MatiOdisha+factory+outlet/@20.327575,85.8117016,17z/data=!4m6!3m5!1s0x3a190900136dddc3:0x7c6633564c4ff718!8m2!3d20.327575!4d85.8117016!16s%2Fg%2F11wvmnqxt_",
  mapEmbed: "https://www.google.com/maps?q=MatiOdisha+factory+outlet&ll=20.327575,85.8117016&z=16&output=embed",
  instagram: { amahata: "https://www.instagram.com/aamahataindia/", mati: "https://www.instagram.com/matiodisha/" },
  facebook: "https://www.facebook.com/people/Mati-Odisha/61556922645738/",
};
