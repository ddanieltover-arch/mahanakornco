import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { brandAssets } from "@/config/brand";
import { siteConfig } from "@/config/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: brandAssets.favicon32, sizes: "32x32", type: "image/png" },
      { url: brandAssets.icon, sizes: "512x512", type: "image/png" },
    ],
    apple: brandAssets.appleTouchIcon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
