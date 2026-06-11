import { siteImages } from "@/config/site-images";

/** Default image when a product or section has no featured image */
export const PLACEHOLDER_IMAGE = siteImages.placeholder;

/**
 * Resolve WordPress upload URLs to local public paths.
 * Images are served from /uploads/ (copied from wp-content/uploads).
 */
export function wpImage(src: string): string {
  if (!src) return PLACEHOLDER_IMAGE;

  if (src.startsWith("/uploads/")) return src;

  const match = src.match(/\/wp-content\/uploads\/(.+)$/);
  if (match) return `/uploads/${match[1]}`;

  if (!src.startsWith("http")) return `/uploads/${src.replace(/^\/+/, "")}`;

  return src;
}
