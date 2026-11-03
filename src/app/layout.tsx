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

const shrikhand = Shrikhand({ weight: "400", subsets: ["latin"], variable: "--font-shrikhand" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const odia = Noto_Sans_Oriya({ subsets: ["oriya"], weight: ["400", "700"], variable: "--font-noto-oriya" });

export const metadata: Metadata = {
  title: {
    default: "Aamahata — Ethi sabu miliba",
    template: "%s · Aamahata",
  },
  description:
    "Aamahata is Odisha's home-grown market. Shop Mati Odisha usuna rice, biryani rice, kolatha and harada dali and homemade biri badi — delivered across India.",
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
