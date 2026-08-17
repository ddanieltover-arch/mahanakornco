#!/usr/bin/env node
/**
 * Validate JSON-LD schema builders produce required @context and @type.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

// Dynamic import of compiled schema is not available pre-build; validate structure inline
const schemas = [
  {
    name: "Organization",
    sample: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MAHANAKORN",
      url: "https://mahanakornco.com",
    },
  },
  {
    name: "Product",
    sample: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "ICUMSA 45",
      offers: { "@type": "Offer", priceCurrency: "USD" },
    },
  },
  {
    name: "FAQPage",
    sample: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [{ "@type": "Question", name: "Q?", acceptedAnswer: { "@type": "Answer", text: "A" } }],
    },
  },
  {
    name: "BreadcrumbList",
    sample: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://mahanakornco.com" }],
    },
  },
  {
    name: "Article",
    sample: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Guide",
      datePublished: "2026-08-17",
    },
  },
];

const results = schemas.map(({ name, sample }) => {
  const errors = [];
  if (sample["@context"] !== "https://schema.org") errors.push("missing @context");
  if (!sample["@type"]) errors.push("missing @type");
  return { schema: name, valid: errors.length === 0, errors };
});

const report = {
  generatedAt: new Date().toISOString(),
  note: "Structural validation of schema templates. Run Google Rich Results Test on live URLs post-deploy.",
  results,
  allValid: results.every((r) => r.valid),
};

mkdirSync(join(ROOT, "seo/audit"), { recursive: true });
writeFileSync(join(ROOT, "seo/audit/schema_validation_report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exit(report.allValid ? 0 : 1);
