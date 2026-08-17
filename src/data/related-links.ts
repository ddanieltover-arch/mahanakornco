export interface InternalLink {
  href: string;
  anchor: string;
}

export interface OutboundLink {
  href: string;
  label: string;
}

export type PageType =
  | "home"
  | "products"
  | "category"
  | "product"
  | "about"
  | "contact"
  | "ordering"
  | "quality"
  | "sustainability"
  | "faq"
  | "glossary"
  | "guide-sugar"
  | "guide-rice"
  | "privacy";

export type LinkTopic = "general" | "sugar" | "rice" | "fertilizers" | "oil" | "poultry" | "nuts";

export const KEYWORD_ANCHORS = {
  home: "agricultural commodities exporter Thailand",
  homeBrand: "MAHANAKORN agricultural supplier",
  products: "wholesale agricultural products Thailand",
  sugar: "ICUMSA sugar wholesale supplier",
  rice: "Thai jasmine rice bulk supplier",
  fertilizers: "NPK fertilizer wholesale Thailand",
  oil: "RBD edible cooking oil bulk",
  poultry: "poultry products wholesale export",
  nuts: "cashew pistachio nuts wholesale",
  ordering: "bulk commodity ordering process",
  quality: "agricultural export quality control",
  faq: "agricultural export FAQ",
  glossary: "commodity trading glossary",
  icumsaGuide: "ICUMSA sugar grades explained",
  riceGuide: "how to import rice from Thailand",
  contact: "request a wholesale quote",
  homMali: "Hom Mali jasmine rice export",
  waterSoluble: "water-soluble fertilizer wholesale",
  incoterms: "Incoterms FOB CIF",
  phytosanitary: "phytosanitary certificate",
  moq: "bulk commodity MOQ",
} as const;

const HOME: InternalLink = { href: "/", anchor: KEYWORD_ANCHORS.home };
const PRODUCTS: InternalLink = { href: "/products", anchor: KEYWORD_ANCHORS.products };
const SUGAR: InternalLink = { href: "/sugar", anchor: KEYWORD_ANCHORS.sugar };
const RICE: InternalLink = { href: "/rice", anchor: KEYWORD_ANCHORS.rice };
const FERT: InternalLink = { href: "/fertilizers", anchor: KEYWORD_ANCHORS.fertilizers };
const OIL: InternalLink = { href: "/edible-cooking-oil", anchor: KEYWORD_ANCHORS.oil };
const ORDERING: InternalLink = { href: "/ordering-procedures", anchor: KEYWORD_ANCHORS.ordering };
const QUALITY: InternalLink = { href: "/quality-control", anchor: KEYWORD_ANCHORS.quality };
const FAQ: InternalLink = { href: "/faq", anchor: KEYWORD_ANCHORS.faq };
const GLOSSARY: InternalLink = { href: "/glossary", anchor: KEYWORD_ANCHORS.glossary };
const ICUMSA_GUIDE: InternalLink = { href: "/guides/icumsa-sugar-grades", anchor: KEYWORD_ANCHORS.icumsaGuide };
const RICE_GUIDE: InternalLink = { href: "/guides/thai-rice-export", anchor: KEYWORD_ANCHORS.riceGuide };
const CONTACT: InternalLink = { href: "/contact", anchor: KEYWORD_ANCHORS.contact };
const ABOUT: InternalLink = { href: "/about", anchor: KEYWORD_ANCHORS.homeBrand };

export const outboundByTopic: Record<LinkTopic, OutboundLink[]> = {
  general: [
    { href: "https://www.fao.org/faostat/en/#data", label: "FAO agricultural trade statistics" },
    { href: "https://www.boi.go.th/", label: "Thailand Board of Investment" },
  ],
  sugar: [
    { href: "https://www.icumsa.org/", label: "ICUMSA sugar analysis standards" },
    { href: "https://www.fao.org/markets-and-trade/commodities/sugar/en", label: "FAO sugar market overview" },
  ],
  rice: [
    { href: "https://www.fao.org/markets-and-trade/commodities/rice/en", label: "FAO rice commodity profile" },
    { href: "https://www.thairiceexporters.or.th/", label: "Thai Rice Exporters Association" },
  ],
  fertilizers: [
    { href: "https://www.fao.org/soils-portal/soil-management/en/", label: "FAO soil and fertilizer guidance" },
    { href: "https://www.fertilizer.org/", label: "International Fertilizer Association" },
  ],
  oil: [
    { href: "https://www.fao.org/markets-and-trade/commodities/oilcrops/en", label: "FAO oilcrops market" },
    { href: "https://www.fas.usda.gov/", label: "USDA Foreign Agricultural Service" },
  ],
  poultry: [
    { href: "https://www.fao.org/animal-production/en", label: "FAO animal production" },
    { href: "https://www.fao.org/fao-who-codexalimentarius/en/", label: "Codex Alimentarius food standards" },
  ],
  nuts: [
    { href: "https://www.intracen.org/", label: "International Trade Centre" },
    { href: "https://www.fao.org/faostat/en/#data", label: "FAO crop statistics" },
  ],
};

const categorySlugToTopic: Record<string, LinkTopic> = {
  sugar: "sugar",
  rice: "rice",
  fertilizers: "fertilizers",
  "edible-cooking-oil": "oil",
  "poultry-products": "poultry",
  nuts: "nuts",
};

const categoryInternals: Record<string, InternalLink[]> = {
  sugar: [HOME, PRODUCTS, ICUMSA_GUIDE, GLOSSARY, ORDERING, QUALITY, CONTACT],
  rice: [HOME, PRODUCTS, RICE_GUIDE, GLOSSARY, ORDERING, QUALITY, CONTACT],
  fertilizers: [HOME, PRODUCTS, GLOSSARY, ORDERING, QUALITY, FAQ, CONTACT],
  "edible-cooking-oil": [HOME, PRODUCTS, GLOSSARY, ORDERING, QUALITY, FAQ, CONTACT],
  "poultry-products": [HOME, PRODUCTS, ORDERING, QUALITY, FAQ, GLOSSARY, CONTACT],
  nuts: [HOME, PRODUCTS, ORDERING, QUALITY, FAQ, GLOSSARY, CONTACT],
};

const internalsByPageType: Record<PageType, InternalLink[]> = {
  home: [SUGAR, RICE, FERT, ORDERING, QUALITY, FAQ, PRODUCTS],
  products: [HOME, SUGAR, RICE, FERT, ORDERING, FAQ, CONTACT],
  category: [HOME, PRODUCTS, ORDERING, QUALITY, FAQ, GLOSSARY, CONTACT],
  product: [HOME, PRODUCTS, ORDERING, QUALITY, FAQ, GLOSSARY, CONTACT],
  about: [
    { href: "/", anchor: KEYWORD_ANCHORS.homeBrand },
    PRODUCTS,
    SUGAR,
    RICE,
    QUALITY,
    FAQ,
    CONTACT,
  ],
  contact: [HOME, PRODUCTS, ORDERING, FAQ, SUGAR, RICE, QUALITY],
  ordering: [HOME, PRODUCTS, QUALITY, FAQ, CONTACT, GLOSSARY, SUGAR],
  quality: [HOME, PRODUCTS, ORDERING, FAQ, GLOSSARY, SUGAR, CONTACT],
  sustainability: [HOME, PRODUCTS, QUALITY, ABOUT, FAQ, ORDERING, CONTACT],
  faq: [HOME, PRODUCTS, ORDERING, QUALITY, GLOSSARY, SUGAR, CONTACT],
  glossary: [HOME, ICUMSA_GUIDE, RICE_GUIDE, SUGAR, RICE, ORDERING, FAQ],
  "guide-sugar": [HOME, SUGAR, GLOSSARY, ORDERING, QUALITY, PRODUCTS, CONTACT],
  "guide-rice": [HOME, RICE, GLOSSARY, ORDERING, QUALITY, PRODUCTS, CONTACT],
  privacy: [ABOUT, CONTACT],
};

function topicForPage(pageType: PageType, categorySlug?: string): LinkTopic {
  if (pageType === "guide-sugar") return "sugar";
  if (pageType === "guide-rice") return "rice";
  if (pageType === "glossary") return "sugar";
  if (categorySlug && categorySlugToTopic[categorySlug]) {
    return categorySlugToTopic[categorySlug];
  }
  return "general";
}

export function getRelatedLinks(options: {
  pageType: PageType;
  currentPath: string;
  categorySlug?: string;
}): { internal: InternalLink[]; outbound: OutboundLink[] } {
  const { pageType, currentPath, categorySlug } = options;

  let internals: InternalLink[] =
    pageType === "category" && categorySlug && categoryInternals[categorySlug]
      ? categoryInternals[categorySlug]
      : pageType === "product" && categorySlug && categoryInternals[categorySlug]
        ? [
            HOME,
            { href: `/${categorySlug}`, anchor: categoryHubAnchor(categorySlug) },
            ...categoryInternals[categorySlug].filter((l) => l.href !== HOME.href && l.href !== PRODUCTS.href).slice(0, 5),
          ]
        : internalsByPageType[pageType];

  internals = internals.filter((link) => normalizePath(link.href) !== normalizePath(currentPath));

  if (internals.length > 7) internals = internals.slice(0, 7);
  if (pageType !== "privacy" && internals.length < 5) {
    const extras = [HOME, PRODUCTS, ORDERING, QUALITY, FAQ, CONTACT, GLOSSARY].filter(
      (l) =>
        normalizePath(l.href) !== normalizePath(currentPath) &&
        !internals.some((i) => i.href === l.href)
    );
    internals = [...internals, ...extras].slice(0, 7);
  }

  const outbound =
    pageType === "privacy" ? [] : outboundByTopic[topicForPage(pageType, categorySlug)].slice(0, 2);

  return { internal: internals.slice(0, 7), outbound };
}

function categoryHubAnchor(slug: string): string {
  const map: Record<string, string> = {
    sugar: KEYWORD_ANCHORS.sugar,
    rice: KEYWORD_ANCHORS.rice,
    fertilizers: KEYWORD_ANCHORS.fertilizers,
    "edible-cooking-oil": KEYWORD_ANCHORS.oil,
    "poultry-products": KEYWORD_ANCHORS.poultry,
    nuts: KEYWORD_ANCHORS.nuts,
  };
  return map[slug] ?? KEYWORD_ANCHORS.products;
}

function normalizePath(path: string): string {
  if (path === "" || path === "/") return "/";
  return path.replace(/\/$/, "");
}

export function categorySlugFromName(category: string): string | undefined {
  const map: Record<string, string> = {
    Sugar: "sugar",
    Fertilizers: "fertilizers",
    Rice: "rice",
    "Edible Cooking Oil": "edible-cooking-oil",
    "Poultry Products": "poultry-products",
    Nuts: "nuts",
  };
  return map[category];
}
