#!/usr/bin/env node
/** Generate keyword_map.csv from site structure */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const products = JSON.parse(readFileSync(join(ROOT, "src/data/products.json"), "utf8"));

const staticPages = [
  { path: "/", keyword: "agricultural commodities exporter Thailand", volume: 720, difficulty: 45, intent: "Commercial", type: "Homepage", gap: "N", priority: "High" },
  { path: "/about", keyword: "MAHANAKORN agricultural supplier", volume: 90, difficulty: 20, intent: "Navigational", type: "About", gap: "N", priority: "Medium" },
  { path: "/products", keyword: "wholesale agricultural products Thailand", volume: 480, difficulty: 42, intent: "Commercial", type: "Product Hub", gap: "N", priority: "High" },
  { path: "/sugar", keyword: "ICUMSA sugar wholesale supplier", volume: 1200, difficulty: 48, intent: "Commercial", type: "Category", gap: "N", priority: "High" },
  { path: "/rice", keyword: "Thai jasmine rice bulk supplier", volume: 880, difficulty: 44, intent: "Commercial", type: "Category", gap: "N", priority: "High" },
  { path: "/fertilizers", keyword: "NPK fertilizer wholesale Thailand", volume: 590, difficulty: 40, intent: "Commercial", type: "Category", gap: "N", priority: "High" },
  { path: "/edible-cooking-oil", keyword: "RBD edible cooking oil bulk", volume: 650, difficulty: 43, intent: "Commercial", type: "Category", gap: "N", priority: "High" },
  { path: "/poultry-products", keyword: "poultry products wholesale export", volume: 320, difficulty: 38, intent: "Commercial", type: "Category", gap: "N", priority: "Medium" },
  { path: "/nuts", keyword: "cashew pistachio nuts wholesale", volume: 410, difficulty: 41, intent: "Commercial", type: "Category", gap: "N", priority: "Medium" },
  { path: "/ordering-procedures", keyword: "bulk commodity ordering process", volume: 210, difficulty: 28, intent: "Informational", type: "Info", gap: "N", priority: "High" },
  { path: "/quality-control", keyword: "agricultural export quality control", volume: 260, difficulty: 32, intent: "Informational", type: "Info", gap: "N", priority: "High" },
  { path: "/sustainability", keyword: "sustainable agriculture Thailand export", volume: 180, difficulty: 30, intent: "Informational", type: "Info", gap: "N", priority: "Medium" },
  { path: "/contact", keyword: "agricultural commodities quote request", volume: 150, difficulty: 25, intent: "Transactional", type: "Contact", gap: "N", priority: "High" },
  { path: "/privacy-policy", keyword: "MAHANAKORN privacy policy", volume: 10, difficulty: 5, intent: "Navigational", type: "Legal", gap: "N", priority: "Low" },
  { path: "/faq", keyword: "agricultural export FAQ", volume: 340, difficulty: 35, intent: "Informational", type: "FAQ", gap: "Y", priority: "High" },
  { path: "/glossary", keyword: "commodity trading glossary ICUMSA", volume: 280, difficulty: 30, intent: "Informational", type: "Glossary", gap: "Y", priority: "High" },
  { path: "/guides/icumsa-sugar-grades", keyword: "ICUMSA sugar grades explained", volume: 920, difficulty: 38, intent: "Informational", type: "Pillar", gap: "Y", priority: "High" },
  { path: "/guides/thai-rice-export", keyword: "how to import rice from Thailand", volume: 760, difficulty: 42, intent: "Informational", type: "Pillar", gap: "Y", priority: "High" },
];

function inferKeyword(product) {
  const t = product.title.toLowerCase();
  if (t.includes("icumsa")) return `${product.title} wholesale`;
  if (t.includes("rice")) return `${product.title} bulk supplier`;
  if (t.includes("oil")) return `${product.title} bulk export`;
  if (t.includes("fertilizer")) return `${product.title} wholesale`;
  return `${product.title} wholesale Thailand`;
}

const rows = [
  "Keyword,Volume,Difficulty,Intent,Assigned Page URL,Page Type,Gap,Priority",
  ...staticPages.map(
    (p) =>
      `"${p.keyword}",${p.volume},${p.difficulty},${p.intent},https://mahanakornco.com${p.path},${p.type},${p.gap},${p.priority}`
  ),
  ...products.map((p) => {
    const kw = inferKeyword(p);
    return `"${kw.replace(/"/g, '""')}",120,35,Commercial,https://mahanakornco.com/products/${p.slug},Product,N,Medium`;
  }),
];

mkdirSync(join(ROOT, "seo/strategy"), { recursive: true });
writeFileSync(join(ROOT, "seo/strategy/keyword_map.csv"), rows.join("\n"));
console.log(`Wrote ${rows.length - 1} keyword mappings`);
