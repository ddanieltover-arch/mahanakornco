import type { Metadata } from "next";

/** Open Graph / Twitter card image metadata for a page thumbnail */
export function pageImageMeta(imagePath: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      images: [{ url: imagePath }],
    },
    twitter: {
      card: "summary_large_image",
      images: [imagePath],
    },
  };
}
