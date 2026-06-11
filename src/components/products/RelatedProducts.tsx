import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { getRelatedProducts, type Product, type ProductCategory } from "@/data/products";

interface RelatedProductsProps {
  currentSlug: string;
  category: ProductCategory;
  categorySlug?: string;
}

export function RelatedProducts({
  currentSlug,
  category,
  categorySlug,
}: RelatedProductsProps) {
  const related = getRelatedProducts(currentSlug, category);

  if (related.length === 0) return null;

  return (
    <section className="py-16 md:py-20 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-primary font-semibold uppercase tracking-wider text-sm">
              More in {category}
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-primary-dark">
              Related Products
            </h2>
          </div>
          {categorySlug && (
            <Link
              href={`/${categorySlug}`}
              className="btn-animate inline-flex rounded-full border-2 border-primary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-cream transition-colors"
            >
              Browse {category}
            </Link>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((product: Product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
