import rawProducts from "./products.json";
import productContentRaw from "./product-content.json";
import productImagesRaw from "./product-images.json";
import { normalizeBrandText } from "@/lib/brand";
import { wpImage } from "@/lib/images";

type ImageEntry = {
  id: number;
  title: string;
  slug: string;
  image: string;
  gallery?: string[];
};
const productImages = productImagesRaw as Record<string, ImageEntry>;

type ContentEntry = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
};

const productContent = productContentRaw as Record<string, ContentEntry>;

/** Map site product slugs to WordPress slugs when they differ */
const SLUG_ALIASES: Record<string, string> = {
  "icumsa-600-1200-brown-cane-sugar": "raw-brown-cane-sugar-grade-e-icumsa-600-1200",
};

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const imagesByTitle = new Map(
  Object.values(productImages).map((entry) => [normalizeTitle(entry.title), entry])
);

function resolveImage(slug: string, title: string, fallback = ""): string {
  const key = SLUG_ALIASES[slug] ?? slug;
  const entry =
    productImages[key] ??
    productImages[slug] ??
    imagesByTitle.get(normalizeTitle(title));
  const image = entry?.image || fallback;
  return image ? wpImage(image) : "";
}

function resolveGallery(slug: string, title: string): string[] {
  const key = SLUG_ALIASES[slug] ?? slug;
  const entry =
    productImages[key] ??
    productImages[slug] ??
    imagesByTitle.get(normalizeTitle(title));
  return (entry?.gallery ?? []).map((src) => wpImage(src)).filter(Boolean);
}

const contentByTitle = new Map(
  Object.values(productContent).map((entry) => [normalizeTitle(entry.title), entry])
);

function resolveContent(slug: string, title: string): { excerpt?: string; content?: string } {
  const key = SLUG_ALIASES[slug] ?? slug;
  const entry = productContent[key] ?? contentByTitle.get(normalizeTitle(title));
  if (!entry) return {};
  return {
    excerpt: entry.excerpt ? normalizeBrandText(entry.excerpt) : undefined,
    content: entry.content ? normalizeBrandText(entry.content) : undefined,
  };
}

export type ProductCategory =
  | "Sugar"
  | "Fertilizers"
  | "Rice"
  | "Edible Cooking Oil"
  | "Poultry Products"
  | "Nuts";

export interface Product {
  id: number;
  title: string;
  slug: string;
  category: ProductCategory;
  image: string;
  gallery?: string[];
  excerpt?: string;
  content?: string;
}

/** Sugar products present in SQL but absent from products.json extract */
const EXTRA_PRODUCT_SLUGS = [
  "icumsa-100-cane-sugar",
  "icumsa-45-white-refined-sugar",
  "icumsa-600-1200-brown-cane-sugar",
  "icumsa-150-cane-sugar",
  "vhp-sugar",
  "beet-sugar",
];

function buildExtraProducts(): Product[] {
  return EXTRA_PRODUCT_SLUGS.map((slug) => {
    const imgEntry = productImages[SLUG_ALIASES[slug] ?? slug];
    const content = resolveContent(slug, imgEntry?.title ?? slug);
    return {
      id: imgEntry?.id ?? 0,
      title: imgEntry?.title ?? slug,
      slug,
      category: "Sugar" as const,
      image: resolveImage(slug, imgEntry?.title ?? ""),
      ...content,
    };
  });
}

function inferCategory(title: string, slug: string): ProductCategory {
  const t = `${title} ${slug}`.toLowerCase();
  if (
    t.includes("poultry") ||
    t.includes("chicken") ||
    t.includes("drumstick") ||
    t.includes("gizzard") ||
    /\bwing\b/.test(t) ||
    t.includes("paws") ||
    t.includes("feets") ||
    t.includes("griller")
  )
    return "Poultry Products";
  if (
    t.includes("cashew") ||
    t.includes("pistachio") ||
    /\bnuts?\b/.test(t)
  )
    return "Nuts";
  // Rice before oil — "parboiled" contains the substring "oil"
  if (t.includes("rice") || t.includes("basmati") || t.includes("jasmine"))
    return "Rice";
  if (/\boil\b/.test(t) || t.includes("olein")) return "Edible Cooking Oil";
  if (
    t.includes("sugar") ||
    t.includes("icumsa") ||
    t.includes("vhp") ||
    t.includes("beet")
  )
    return "Sugar";
  if (
    t.includes("fertilizer") ||
    t.includes("phosphate") ||
    t.includes("npk") ||
    t.includes("urea") ||
    t.includes("sulfate") ||
    t.includes("humus") ||
    t.includes("barenbrug") ||
    t.includes("barfertile") ||
    t.includes("agriventure") ||
    t.includes("ebs") ||
    t.includes("privi") ||
    t.includes("vanproz") ||
    t.includes("nitrogen")
  )
    return "Fertilizers";
  return "Fertilizers";
}

const imported = (rawProducts as Omit<Product, "category" | "content">[]).map((p) => ({
  ...p,
  ...resolveContent(p.slug, p.title),
  category: inferCategory(p.title, p.slug),
  image: resolveImage(p.slug, p.title, p.image),
  gallery: resolveGallery(p.slug, p.title),
  id: productImages[SLUG_ALIASES[p.slug] ?? p.slug]?.id ?? p.id,
}));

const slugSet = new Set(imported.map((p) => p.slug));
const merged = [
  ...imported,
  ...buildExtraProducts().filter((p) => !slugSet.has(p.slug)),
].sort((a, b) => a.title.localeCompare(b.title));

export const products: Product[] = merged.map((p) => {
  const contentExtra = p.content ? {} : resolveContent(p.slug, p.title);
  const image = p.image || resolveImage(p.slug, p.title);
  const gallery = p.gallery?.length ? p.gallery : resolveGallery(p.slug, p.title);
  return { ...p, ...contentExtra, image, gallery };
});

export const categories: {
  name: ProductCategory;
  slug: string;
  description: string;
}[] = [
  {
    name: "Sugar",
    slug: "sugar",
    description: "Premium ICUMSA cane sugar varieties sourced from Thailand.",
  },
  {
    name: "Fertilizers",
    slug: "fertilizers",
    description: "High-quality agricultural fertilizers and micronutrients.",
  },
  {
    name: "Rice",
    slug: "rice",
    description: "Premium Thai rice varieties for global wholesale markets.",
  },
  {
    name: "Edible Cooking Oil",
    slug: "edible-cooking-oil",
    description: "Refined edible oils for food industry and bulk supply.",
  },
  {
    name: "Poultry Products",
    slug: "poultry-products",
    description: "Quality poultry products for wholesale distribution.",
  },
  {
    name: "Nuts",
    slug: "nuts",
    description: "Premium natural nuts for wholesale and export markets.",
  },
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  currentSlug: string,
  category: ProductCategory,
  limit = 4
): Product[] {
  return products
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
