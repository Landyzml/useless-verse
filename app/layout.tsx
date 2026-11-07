import type { Metadata, Viewport } from "next";
import "@fontsource/albert-sans/latin-400.css";
import "@fontsource/albert-sans/latin-500.css";
import "@fontsource/albert-sans/latin-600.css";
import "@fontsource/albert-sans/latin-700.css";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "Useless Verse — A Universe of Beautifully Useless Things", template: "%s — Useless Verse" },
  description: site.description,
  openGraph: { title: site.name, description: site.tagline, siteName: site.name, type: "website", locale: "en_US", ...(siteUrl ? { images: [{ url: `${siteUrl}/branding/social.png`, width: 1200, height: 630, alt: site.tagline }] } : {}) },
  twitter: { card: "summary_large_image", title: site.name, description: site.tagline, ...(siteUrl ? { images: [`${siteUrl}/branding/social.png`] } : {}) },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f7f2" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en"><body>{children}</body></html>;
}
