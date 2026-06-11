import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { products, categories } from "@/data/products";
import { siteImages } from "@/config/site-images";
import { pageImageMeta } from "@/lib/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our full range of sugar, rice, fertilizers, edible cooking oil, and poultry products for wholesale export.",
  ...pageImageMeta(siteImages.pages.products),
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Our Products"
        tagline="MAHANAKORN NAKO NAGARAJ CO., LTD"
        subtitle="Premium agricultural commodities for wholesale and export markets worldwide."
        image={siteImages.pages.products}
      />

      <section className="py-12 border-b">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white"
            >
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-muted mb-8">{products.length} products available</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
