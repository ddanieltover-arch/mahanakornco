# SEO + GEO Strategy — Mahanakornco.com

**Generated:** August 2026  
**Target:** Global B2B agricultural commodities buyers  
**Primary domain:** https://mahanakornco.com

## Executive summary

MAHANAKORN is a Thailand-based wholesale exporter of sugar, rice, fertilizer, edible cooking oil, poultry, and nuts. The site has ~97 indexable URLs with solid foundational metadata but lacks canonical tags, structured data, GEO answer architecture, analytics, and AI crawler directives.

## Pre-audit findings

| Issue | Count / status |
|-------|----------------|
| Missing canonical tags | 97/97 pages |
| JSON-LD structured data | None |
| llms.txt | Missing |
| GA4 / GTM | Not installed |
| Thin content (<300 words) | 3 pages |
| Rotating homepage H1 | Yes (hero slider) |
| AI bot rules in robots.txt | Missing |

## Keyword strategy

### Tier 1 — Commercial (high priority)
- ICUMSA sugar wholesale supplier → `/sugar`, product pages
- Thai jasmine rice bulk supplier → `/rice`
- NPK fertilizer wholesale Thailand → `/fertilizers`
- RBD edible cooking oil bulk → `/edible-cooking-oil`
- Agricultural commodities exporter Thailand → `/`

### Tier 2 — Informational / GEO (content gaps)
- ICUMSA sugar grades explained → `/guides/icumsa-sugar-grades` (new)
- How to import rice from Thailand → `/guides/thai-rice-export` (new)
- Agricultural export FAQ → `/faq` (new)
- Commodity trading glossary → `/glossary` (new)

### Tier 3 — Trust / conversion
- Bulk commodity ordering process → `/ordering-procedures`
- Agricultural export quality control → `/quality-control`

## 90-day KPI targets

| KPI | Baseline | Target |
|-----|----------|--------|
| Organic sessions | TBD (post-GA4) | +30% |
| Priority keyword avg position | TBD (post-GSC) | < 15 |
| CTR | TBD | > 3% |
| LCP (mobile) | TBD | ≤ 2.5s |
| Schema errors | N/A | 0 |
| AI citation spot-checks | 0 | Monthly baseline |

## Implementation phases

1. **Technical SEO** — Canonical metadata, robots AI rules, sitemap priorities, llms.txt
2. **Structured data** — Organization, WebSite, Product, BreadcrumbList, FAQPage
3. **GEO content** — Answer capsules, FAQ hub, glossary, pillar guides
4. **On-page** — Expand thin product copy, internal linking pillar-cluster model
5. **Analytics** — GTM/GA4, GSC verification, conversion events
6. **Link building** — Competitor gap outreach (ongoing)
7. **CI** — Lighthouse + meta validation on PRs

## Quick wins (Week 1)

- Add canonical + OG metadata to all pages
- Deploy Organization + Product JSON-LD
- Publish `/llms.txt` and `/faq`
- Fix stable homepage H1
- Submit sitemap to GSC after deploy

## Competitor landscape

See [`strategy/competitor_report.csv`](strategy/competitor_report.csv). Key competitors: Thai ag exporters, global commodity traders (Sucden, Wilmar), regional rice specialists.

## Content pillar model

```
Homepage
├── /products (hub)
│   ├── /sugar → product clusters
│   ├── /rice → product clusters
│   ├── /fertilizers
│   ├── /edible-cooking-oil
│   ├── /poultry-products
│   └── /nuts
├── /ordering-procedures (trust)
├── /quality-control (trust)
├── /guides/* (informational pillars)
├── /faq (GEO hub)
└── /glossary (entity definitions)
```

## Deliverables index

- [`audit/audit_report.json`](audit/audit_report.json)
- [`audit/crawl_inventory.csv`](audit/crawl_inventory.csv)
- [`strategy/keyword_map.csv`](strategy/keyword_map.csv)
- [`strategy/content_calendar.csv`](strategy/content_calendar.csv)
- [`strategy/internal_linking_plan.csv`](strategy/internal_linking_plan.csv)
- [`geo_content_briefs.md`](geo_content_briefs.md)
- [`analytics_setup.md`](analytics_setup.md)
- [`kpis_dashboard.md`](kpis_dashboard.md)
