$Base = if ($env:SITE_URL) { $env:SITE_URL } else { "https://mahanakornco.com" }
$Sitemap = "$Base/sitemap.xml"
Write-Host "Pinging sitemaps for $Sitemap"
Invoke-WebRequest -Uri "https://www.google.com/ping?sitemap=$Sitemap" -UseBasicParsing | Out-Null
Write-Host "Google: OK"
Invoke-WebRequest -Uri "https://www.bing.com/ping?sitemap=$Sitemap" -UseBasicParsing | Out-Null
Write-Host "Bing: OK"
