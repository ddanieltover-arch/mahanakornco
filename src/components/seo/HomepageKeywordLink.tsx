import Link from "next/link";
import { KEYWORD_ANCHORS } from "@/data/related-links";

interface HomepageKeywordLinkProps {
  variant?: "home" | "brand";
  className?: string;
}

/** In-body inbound link to the homepage using the primary commercial keyword */
export function HomepageKeywordLink({
  variant = "home",
  className = "text-primary font-medium hover:underline",
}: HomepageKeywordLinkProps) {
  return (
    <Link href="/" className={className}>
      {variant === "brand" ? KEYWORD_ANCHORS.homeBrand : KEYWORD_ANCHORS.home}
    </Link>
  );
}
