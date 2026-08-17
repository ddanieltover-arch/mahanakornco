import type { Metadata } from "next";
import { SEO, DEFAULT_OG_IMAGE } from "./constants";
import { siteConfig } from "@/config/site";

export interface PageMetadataInput {
  /** Page title without brand suffix (template adds | MAHANAKORN) */
  title: string;
  description: string;
  /** Path including leading slash, e.g. `/about` or `/` */
  path: string;
  image?: string;
  noindex?: boolean;
  type?: "website" | "article";
}

function absoluteUrl(path: string): string {
  const base = SEO.url.replace(/\/$/, "");
  if (path === "/" || path === "") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function absoluteImage(imagePath: string): string {
  if (imagePath.startsWith("http")) return imagePath;
  return absoluteUrl(imagePath);
}

/** Build full Next.js Metadata with canonical, Open Graph, and Twitter cards */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    image = DEFAULT_OG_IMAGE,
    noindex = false,
    type = "website",
  } = input;

  const canonicalPath = path === "" ? "/" : path;
  const url = absoluteUrl(canonicalPath);
  const imageUrl = absoluteImage(image);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SEO.siteName,
      locale: SEO.locale,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

/** Homepage metadata with primary commercial keyword */
export function homeMetadata(): Metadata {
  return buildPageMetadata({
    title: "Wholesale Agricultural Commodities Exporter from Thailand",
    description: siteConfig.description,
    path: "/",
    type: "website",
  });
}
