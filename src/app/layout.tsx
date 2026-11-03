import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Noto_Sans_Oriya, Shrikhand } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Preloader from "@/components/layout/Preloader";
import Header from "@/components/layout/Header";
import MenuOverlay from "@/components/layout/MenuOverlay";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import Toast from "@/components/layout/Toast";
import Cursor from "@/components/layout/Cursor";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/lib/seo";

const shrikhand = Shrikhand({ weight: "400", subsets: ["latin"], variable: "--font-shrikhand" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const odia = Noto_Sans_Oriya({ subsets: ["oriya"], weight: ["400", "700"], variable: "--font-noto-oriya" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  title: {
    default: "Aamahata — Ethi sabu miliba",
    template: "%s · Aamahata",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["Mati Odisha", "Aamahata", "usuna rice", "Odia rice", "kolatha dali", "harada dal", "biri badi", "Odisha food online", "Bhubaneswar"],
  formatDetection: { telephone: false },
  openGraph: {
    title: "Aamahata — Taste the soil of Odisha",
    description: SITE.description,
    url: "/",
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aamahata — Taste the soil of Odisha",
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#e35336",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${shrikhand.variable} ${bricolage.variable} ${odia.variable} antialiased`}>
      <body>
        <Preloader />
        <SmoothScroll />
        <Header />
        <MenuOverlay />
        <CartDrawer />
        <SearchOverlay />
        <main>{children}</main>
        <Footer />
        <Toast />
        <Cursor />
      </body>
    </html>
  );
}
