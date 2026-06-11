import Link from "next/link";
import { Package, Ship, FileCheck, Globe } from "lucide-react";
import { ProductBody } from "@/components/products/ProductBody";
import type { Product } from "@/data/products";

interface ProductDescriptionSectionProps {
  product: Product;
  categorySlug?: string;
}

const exportHighlights = [
  { icon: Package, label: "Custom packaging options available" },
  { icon: Ship, label: "FOB, CIF & other Incoterms" },
  { icon: FileCheck, label: "Quality certificates on request" },
  { icon: Globe, label: "Worldwide export from Thailand" },
];

export function ProductDescriptionSection({
  product,
  categorySlug,
}: ProductDescriptionSectionProps) {
  const hasBody = Boolean(product.content);
  const hasExcerpt = Boolean(product.excerpt);

  if (!hasBody && !hasExcerpt) return null;

  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-primary font-semibold uppercase tracking-wider text-sm">
              Specifications & Information
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-primary-dark">
              Product Description
            </h2>
          </div>
          {categorySlug && (
            <Link
              href={`/${categorySlug}`}
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              View all {product.category} →
            </Link>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2 space-y-6">
            {hasExcerpt && (
              <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-accent pl-5">
                {product.excerpt}
              </p>
            )}

            {hasBody && (
              <article className="rounded-2xl bg-white p-6 md:p-10 shadow-sm border border-gray-100">
                <ProductBody html={product.content!} />
              </article>
            )}

            {!hasBody && hasExcerpt && (
              <p className="text-muted text-sm leading-relaxed">
                Contact us for full specifications, packaging options, and wholesale pricing for
                this product.
              </p>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl bg-primary-dark text-white p-8 shadow-lg">
              <h3 className="text-lg font-bold text-accent">Wholesale & Export</h3>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                Request a formal quotation with pricing, lead time, and shipping terms tailored to
                your market.
              </p>
              <ul className="mt-6 space-y-4">
                {exportHighlights.map((item) => (
                  <li key={item.label} className="flex items-start gap-3 text-sm">
                    <item.icon className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                    <span className="text-white/90">{item.label}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="btn-animate mt-8 flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-primary-dark hover:brightness-110 transition-all"
              >
                Request a Quote
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
