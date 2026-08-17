import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products, categories } from "@/data/products";

const GUIDE_PATHS = ["/guides/icumsa-sugar-grades", "/guides/thai-rice-export"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ordering-procedures", priority: 0.85, changeFrequency: "monthly" },
    { path: "/quality-control", priority: 0.85, changeFrequency: "monthly" },
    { path: "/sustainability", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.85, changeFrequency: "monthly" },
    { path: "/glossary", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    ...GUIDE_PATHS.map((p) => ({
      path: p,
      priority: 0.85,
      changeFrequency: "monthly" as const,
    })),
  ];

  return [
    ...staticPages.map(({ path, priority, changeFrequency }) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...categories.map((cat) => ({
      url: `${base}/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
