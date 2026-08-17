#!/usr/bin/env bash
BASE="${SITE_URL:-https://mahanakornco.com}"
SITEMAP="${BASE}/sitemap.xml"
echo "Pinging sitemaps for $SITEMAP"
curl -s "https://www.google.com/ping?sitemap=${SITEMAP}" && echo "Google: OK"
curl -s "https://www.bing.com/ping?sitemap=${SITEMAP}" && echo "Bing: OK"
