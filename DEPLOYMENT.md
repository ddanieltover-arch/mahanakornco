# MAHANAKORN Website — Deployment Guide

## Quick Start (Local)

```bash
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push the `website/` folder to a Git repository
2. Import the project at [vercel.com](https://vercel.com)
3. Set root directory to `website`
4. Add environment variables from `.env.example`:
   - `NEXT_PUBLIC_URL=https://mahanakornco.com`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (Hostinger business mail)
   - `CONTACT_EMAIL=sales@mahanakornco.com`
5. Deploy

## DNS Cutover

1. Point `mahanakornco.com` A/CNAME records to Vercel
2. Add domain in Vercel project settings
3. Enable SSL (automatic)

## WordPress URL Redirects

Already configured in `next.config.ts`:
- `/what-we-offer` → `/`
- `/product/:slug` → `/products/:slug`
- `/shop` → `/products`
- `/about-us` → `/about`

## Local Images

WordPress media is copied to `public/uploads/` (~10,900 files from `wp-content/uploads`).

To refresh after backup updates:

```bash
npm run copy-uploads
```

Images are served at `/uploads/YYYY/MM/filename.jpg` — no external CDN dependency.

## Product Descriptions

Full HTML product copy is extracted from `mahanakornco.sql` into `src/data/product-content.json`.

To refresh after database updates:

```bash
npm run extract-content
```

## Admin dashboard

See `docs/ADMIN.md` for Supabase Auth + Postgres setup. After deploy:

- Sign in at `/sign-in`
- Manage leads at `/admin/dashboard`

## Post-Launch Checklist

- [ ] Verify all 70 product pages load
- [ ] Test contact form (configure SMTP in `.env.local`)
- [ ] Test product quote form appears in admin dashboard
- [ ] Test WhatsApp button
- [ ] Submit sitemap to Google Search Console
- [ ] Verify redirects from old WordPress URLs
