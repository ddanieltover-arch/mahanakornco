import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import { productsHubAnswer } from "@/data/category-seo";
import { products, categories } from "@/data/products";
import { siteImages } from "@/config/site-images";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Wholesale Agricultural Products",
  description:
    "Browse our full range of sugar, rice, fertilizers, edible cooking oil, poultry, and nuts for wholesale export from Thailand.",
  path: "/products",
  image: siteImages.pages.products,
});

export default function ProductsPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title="Our Products"
        tagline="MAHANAKORN NAKO NAGARAJ CO., LTD"
        subtitle="Premium agricultural commodities for wholesale and export markets worldwide."
        image={siteImages.pages.products}
      />

      <section className="py-8 border-b bg-cream">
        <div className="mx-auto max-w-7xl px-4">
          <AnswerCapsule>{productsHubAnswer}</AnswerCapsule>
        </div>
      </section>

      <section className="py-12 border-b">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-xl font-bold text-primary-dark mb-4">Browse by category</h2>
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
          <p className="text-muted mb-8">{products.length} products available for wholesale export</p>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-6 text-sm">
            <Link href="/ordering-procedures" className="text-primary hover:underline font-medium">
              Ordering procedures
            </Link>
            <Link href="/faq" className="text-primary hover:underline font-medium">
              Export FAQ
            </Link>
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
