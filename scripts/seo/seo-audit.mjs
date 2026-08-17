#!/usr/bin/env node
/**
 * Validate SEO metadata requirements against built page list.
 * Usage: node scripts/seo/seo-audit.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

const REQUIRED_FILES = [
  "public/llms.txt",
  "src/lib/seo/metadata.ts",
  "src/lib/seo/schema.ts",
  "src/components/seo/JsonLd.tsx",
  "src/app/(site)/faq/page.tsx",
  "src/app/(site)/glossary/page.tsx",
  "src/app/(site)/guides/icumsa-sugar-grades/page.tsx",
  "src/app/(site)/guides/thai-rice-export/page.tsx",
];

const errors = [];
const warnings = [];

for (const file of REQUIRED_FILES) {
  if (!existsSync(join(ROOT, file))) {
    errors.push(`Missing required file: ${file}`);
  }
}

const auditPath = join(ROOT, "seo/audit/audit_report.json");
if (existsSync(auditPath)) {
  const audit = JSON.parse(readFileSync(auditPath, "utf8"));
  if (audit.summary?.missingCanonical > 0) {
    warnings.push(
      `Pre-deploy audit showed ${audit.summary.missingCanonical} pages missing canonical — re-crawl after deploy`
    );
  }
} else {
  warnings.push("No audit_report.json — run: node scripts/seo/crawl-site.mjs");
}

console.log("SEO Audit Results");
console.log("=================");
if (errors.length === 0) {
  console.log("✓ All required SEO files present");
} else {
  errors.forEach((e) => console.error("✗", e));
}
warnings.forEach((w) => console.warn("⚠", w));

process.exit(errors.length > 0 ? 1 : 0);
