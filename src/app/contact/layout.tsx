import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Call, WhatsApp or visit the MatiOdisha factory outlet in Chandrasekharpur, Bhubaneswar.",
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
