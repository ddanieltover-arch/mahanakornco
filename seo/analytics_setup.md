# Analytics Setup — Mahanakornco.com

## Google Tag Manager

1. Create a GTM container at [tagmanager.google.com](https://tagmanager.google.com)
2. Set `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` in production environment (Vercel/hosting)
3. GTM snippet is injected via `src/components/analytics/GoogleTagManager.tsx` with `lazyOnload` strategy

## GA4 (via GTM)

1. In GTM, add a **Google Analytics: GA4 Configuration** tag
2. Trigger: All Pages
3. Measurement ID: `G-XXXXXXXXXX`

### Recommended conversion events

| Event | Trigger | Implementation |
|-------|---------|----------------|
| `generate_lead` | Contact form success | `ContactForm.tsx` → `trackEvent()` |
| `generate_lead` | Product enquiry success | `ProductEnquiryForm.tsx` → `trackEvent()` |
| `click` | Phone/email links | Add GTM click triggers on `[data-analytics]` attributes |

### GTM click triggers (configure in GTM UI)

- Click URL contains `tel:` → event `click`, label `phone`
- Click URL contains `mailto:` → event `click`, label `email`
- Click element `[data-analytics="click_phone"]`

## Google Search Console

1. Add property: `https://mahanakornco.com` (Domain or URL prefix)
2. Verify via DNS TXT record (recommended for domain property)
3. Submit sitemap: `https://mahanakornco.com/sitemap.xml`
4. Link GA4 property in GSC → Settings → Associations

## Post-deploy checklist

- [ ] GTM container published with GA4 tag
- [ ] Real-time GA4 shows pageviews
- [ ] GSC sitemap status: Success
- [ ] Test form submission fires `generate_lead` in GA4 DebugView

## Sitemap ping (after deploy)

```bash
node scripts/seo/ping-sitemaps.sh
# or on Windows:
powershell -File scripts/seo/ping-sitemaps.ps1
```
