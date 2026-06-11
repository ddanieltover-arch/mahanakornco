import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/products/ProductCard";
import {
  categories,
  getCategoryBySlug,
  getProductsByCategory,
  type ProductCategory,
} from "@/data/products";
import { getCategoryImage } from "@/config/site-images";
import { pageImageMeta } from "@/lib/metadata";
import Link from "next/link";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    ...pageImageMeta(getCategoryImage(slug)),
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const categoryProducts = getProductsByCategory(cat.name as ProductCategory);

  return (
    <>
      <PageHeader
        title={cat.name}
        subtitle={cat.description}
        image={getCategoryImage(slug)}
        imageAlt={cat.name}
      />

      <section className="py-12 border-b">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary"
            >
              All Products
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  c.slug === slug
                    ? "bg-primary text-white"
                    : "border border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-muted mb-8">{categoryProducts.length} products in {cat.name}</p>
          {categoryProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((product, i) => (
                <ProductCard key={product.slug} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted">Products coming soon. Contact us for availability.</p>
              <Link
                href="/contact"
                className="mt-4 inline-flex rounded-full bg-primary px-6 py-3 text-white font-semibold"
              >
                Get a Quote
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
