import Link from "next/link";
import type { InternalLink, OutboundLink } from "@/data/related-links";

interface RelatedResourcesProps {
  internal: InternalLink[];
  outbound?: OutboundLink[];
}

export function RelatedResources({ internal, outbound = [] }: RelatedResourcesProps) {
  if (internal.length === 0 && outbound.length === 0) return null;

  return (
    <section className="py-16 border-t border-gray-100 bg-cream" aria-labelledby="related-resources-heading">
      <div className="mx-auto max-w-7xl px-4">
        {internal.length > 0 && (
          <div>
            <h2 id="related-resources-heading" className="text-2xl font-bold text-primary-dark">
              Related pages
            </h2>
            <p className="mt-2 text-sm text-muted">
              Explore related products, export guides, and ordering resources.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {internal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-primary hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    {link.anchor}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {outbound.length > 0 && (
          <div className={internal.length > 0 ? "mt-10" : ""}>
            <h3 className="text-lg font-bold text-primary-dark">Further reading</h3>
            <p className="mt-2 text-sm text-muted">
              Authoritative sources on agricultural commodities and international trade.
            </p>
            <ul className="mt-4 space-y-2">
              {outbound.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
