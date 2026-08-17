#!/usr/bin/env node
/**
 * Fetch PageSpeed Insights (mobile) for key URLs — no API key required (rate-limited).
 * Usage: node scripts/seo/lighthouse-baseline.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const BASE = "https://mahanakornco.com";

const PATHS = ["/", "/products", "/sugar", "/rice", "/about", "/contact"];

async function runPageSpeed(url) {
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance`;
  const res = await fetch(api);
  if (!res.ok) throw new Error(`PageSpeed API ${res.status} for ${url}`);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits ?? {};
  const categories = data.lighthouseResult?.categories ?? {};
  return {
    url,
    performanceScore: categories.performance?.score ?? null,
    lcp: audits["largest-contentful-paint"]?.displayValue ?? null,
    lcpMs: audits["largest-contentful-paint"]?.numericValue ?? null,
    inp: audits["interaction-to-next-paint"]?.displayValue ?? audits["max-potential-fid"]?.displayValue ?? null,
    cls: audits["cumulative-layout-shift"]?.displayValue ?? null,
    clsValue: audits["cumulative-layout-shift"]?.numericValue ?? null,
    ttfb: audits["server-response-time"]?.displayValue ?? null,
    fcp: audits["first-contentful-paint"]?.displayValue ?? null,
    tbt: audits["total-blocking-time"]?.displayValue ?? null,
    flags: [
      (audits["largest-contentful-paint"]?.numericValue ?? 0) > 2500 ? "lcp_slow" : null,
      (audits["cumulative-layout-shift"]?.numericValue ?? 0) > 0.1 ? "cls_high" : null,
    ].filter(Boolean),
  };
}

async function main() {
  const results = [];
  for (const path of PATHS) {
    const url = `${BASE}${path}`;
    process.stdout.write(`Testing ${url}...`);
    try {
      const row = await runPageSpeed(url);
      results.push(row);
      console.log(` score=${row.performanceScore} LCP=${row.lcp}`);
    } catch (err) {
      results.push({ url, error: String(err.message ?? err) });
      console.log(` error`);
    }
    await new Promise((r) => setTimeout(r, 2000));
  }

  const auditDir = join(ROOT, "seo/audit");
  mkdirSync(auditDir, { recursive: true });
  writeFileSync(
    join(auditDir, "core_web_vitals_baseline.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)
  );
  console.log("Wrote seo/audit/core_web_vitals_baseline.json");
}

main().catch(console.error);
