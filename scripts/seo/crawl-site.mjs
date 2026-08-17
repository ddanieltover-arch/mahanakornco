#!/usr/bin/env node
/**
 * Crawl sitemap URLs and extract SEO metadata from HTML responses.
 * Usage: node scripts/seo/crawl-site.mjs [--base=https://mahanakornco.com]
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const BASE = process.argv.find((a) => a.startsWith("--base="))?.split("=")[1] ?? "https://mahanakornco.com";

const STATIC_PATHS = [
  "",
  "/about",
  "/products",
  "/contact",
  "/ordering-procedures",
  "/quality-control",
  "/sustainability",
  "/privacy-policy",
  "/sugar",
  "/fertilizers",
  "/rice",
  "/edible-cooking-oil",
  "/poultry-products",
  "/nuts",
];

function stripTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractMeta(html, name, attr = "name") {
  const re = new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]+content=["']([^"']*)["']`, "i");
  const alt = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${name}["']`, "i");
  return re.exec(html)?.[1] ?? alt.exec(html)?.[1] ?? "";
}

function extractTitle(html) {
  return html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
}

function extractH1(html) {
  const matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  return matches.map((m) => stripTags(m[1])).filter(Boolean).join(" | ");
}

function extractCanonical(html) {
  const re = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i;
  const alt = /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i;
  return re.exec(html)?.[1] ?? alt.exec(html)?.[1] ?? "";
}

function extractRobots(html) {
  return extractMeta(html, "robots");
}

async function fetchProductSlugs() {
  try {
    const res = await fetch(`${BASE}/sitemap.xml`);
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<loc>([^<]*\/products\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  } catch {
    return [];
  }
}

async function crawlUrl(url) {
  const path = url.replace(BASE, "") || "/";
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "MahanakornSEOAudit/1.0" },
      redirect: "follow",
    });
    const html = await res.text();
    const bodyText = stripTags(html);
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
    const title = extractTitle(html);
    const description = extractMeta(html, "description");
    const h1 = extractH1(html);
    const canonical = extractCanonical(html);
    const robots = extractRobots(html);
    const indexable = !/noindex/i.test(robots);

    let pageType = "Other";
    if (path === "/" || path === "") pageType = "Homepage";
    else if (path.startsWith("/products/")) pageType = "Product";
    else if (["/sugar", "/fertilizers", "/rice", "/edible-cooking-oil", "/poultry-products", "/nuts"].includes(path))
      pageType = "Category";
    else if (path === "/products") pageType = "Product Hub";
    else if (path === "/privacy-policy") pageType = "Legal";
    else pageType = "Info";

    return {
      url,
      path,
      status: res.status,
      title,
      metaDescription: description,
      h1,
      wordCount,
      canonical,
      robots: robots || "index, follow (default)",
      indexable,
      pageType,
      titleLength: title.length,
      descriptionLength: description.length,
      flags: [
        res.status >= 400 ? "http_error" : null,
        !title ? "missing_title" : null,
        title.length > 60 ? "title_too_long" : null,
        !description ? "missing_description" : null,
        description.length > 160 ? "description_too_long" : null,
        !h1 ? "missing_h1" : null,
        h1.includes("|") ? "multiple_h1" : null,
        !canonical ? "missing_canonical" : null,
        wordCount < 300 ? "thin_content" : null,
      ].filter(Boolean),
    };
  } catch (err) {
    return {
      url,
      path,
      status: 0,
      title: "",
      metaDescription: "",
      h1: "",
      wordCount: 0,
      canonical: "",
      robots: "",
      indexable: false,
      pageType: "Error",
      titleLength: 0,
      descriptionLength: 0,
      flags: ["fetch_error", String(err.message ?? err)],
    };
  }
}

async function main() {
  const productUrls = await fetchProductSlugs();
  const staticUrls = STATIC_PATHS.map((p) => `${BASE}${p}`);
  const allUrls = [...new Set([...staticUrls, ...productUrls])];

  console.log(`Crawling ${allUrls.length} URLs from ${BASE}...`);
  const results = [];
  for (const url of allUrls) {
    const row = await crawlUrl(url);
    results.push(row);
    process.stdout.write(".");
  }
  console.log("\nDone.");

  const auditDir = join(ROOT, "seo/audit");
  mkdirSync(auditDir, { recursive: true });

  const csvHeader = "url,status,title,meta_description,h1,word_count,canonical,robots,indexable,page_type,flags";
  const csvRows = results.map((r) =>
    [
      r.url,
      r.status,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.metaDescription.replace(/"/g, '""')}"`,
      `"${r.h1.replace(/"/g, '""')}"`,
      r.wordCount,
      r.canonical,
      r.robots,
      r.indexable,
      r.pageType,
      `"${r.flags.join("; ")}"`,
    ].join(",")
  );
  writeFileSync(join(auditDir, "crawl_inventory.csv"), [csvHeader, ...csvRows].join("\n"));

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE,
    totalUrls: results.length,
    summary: {
      ok: results.filter((r) => r.status >= 200 && r.status < 400).length,
      errors: results.filter((r) => r.status >= 400 || r.status === 0).length,
      missingTitle: results.filter((r) => !r.title).length,
      missingDescription: results.filter((r) => !r.metaDescription).length,
      missingH1: results.filter((r) => !r.h1).length,
      missingCanonical: results.filter((r) => !r.canonical).length,
      thinContent: results.filter((r) => r.wordCount < 300).length,
      multipleH1: results.filter((r) => r.flags.includes("multiple_h1")).length,
    },
    flaggedPages: results.filter((r) => r.flags.length > 0),
    pages: results,
  };
  writeFileSync(join(auditDir, "audit_report.json"), JSON.stringify(report, null, 2));
  console.log(`Wrote seo/audit/crawl_inventory.csv and audit_report.json`);
  console.log(JSON.stringify(report.summary, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
