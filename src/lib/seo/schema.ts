import { brandAssets } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { SEO } from "./constants";

function orgId() {
  return `${SEO.url}/#organization`;
}

function websiteId() {
  return `${SEO.url}/#website`;
}

export function organizationSchema() {
  const headOffice = siteConfig.addresses[0];
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(),
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: SEO.url,
    logo: {
      "@type": "ImageObject",
      url: `${SEO.url}${brandAssets.logo}`,
      width: 300,
      height: 60,
    },
    description: siteConfig.description,
    foundingDate: String(siteConfig.established),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: headOffice.address,
      addressCountry: "TH",
    },
    ...(SEO.sameAs.length > 0 ? { sameAs: SEO.sameAs } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "sales",
      availableLanguage: ["English", "Thai"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(),
    url: SEO.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": orgId() },
  };
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${SEO.url}${item.href}`,
    })),
  };
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  slug: string;
  image?: string;
  category?: string;
}

export function productSchema(input: ProductSchemaInput) {
  const url = `${SEO.url}/products/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: input.image
      ? input.image.startsWith("http")
        ? input.image
        : `${SEO.url}${input.image}`
      : undefined,
    brand: {
      "@type": "Brand",
      name: siteConfig.shortName,
    },
    category: input.category,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@id": orgId() },
    },
  };
}

export interface CollectionSchemaInput {
  name: string;
  description: string;
  slug: string;
  productUrls: string[];
}

export function collectionPageSchema(input: CollectionSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: `${SEO.url}/${input.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.productUrls.map((slug, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SEO.url}/products/${slug}`,
      })),
    },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}

export function articleSchema(input: ArticleSchemaInput) {
  const url = `${SEO.url}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    image: input.image
      ? input.image.startsWith("http")
        ? input.image
        : `${SEO.url}${input.image}`
      : undefined,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: SEO.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${SEO.url}${brandAssets.logo}`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
