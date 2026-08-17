import { brandAssets } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/site-images";

/** Default Open Graph image — 1200×630 recommended */
export const DEFAULT_OG_IMAGE = siteImages.hero[0]?.image ?? brandAssets.logo;

export const SEO = {
  siteName: siteConfig.name,
  shortName: siteConfig.shortName,
  url: siteConfig.url,
  locale: "en_US",
  twitterHandle: undefined as string | undefined,
  sameAs: [] as string[],
} as const;

export const NOINDEX_PATHS = ["/admin", "/sign-in", "/api"];
