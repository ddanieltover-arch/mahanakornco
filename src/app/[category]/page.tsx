import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  categories,
  getCategoryBySlug,
  getProductsByCategory,
  type ProductCategory,
} from "@/data/products";
import { getCategorySeo } from "@/data/category-seo";
import { getCategoryImage } from "@/config/site-images";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/seo/schema";
import { RelatedResources } from "@/components/seo/RelatedResources";
import { HomepageKeywordLink } from "@/components/seo/HomepageKeywordLink";
import { getRelatedLinks, KEYWORD_ANCHORS } from "@/data/related-links";

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
  const seo = getCategorySeo(slug);
  return buildPageMetadata({
    title: seo?.title ?? cat.name,
    description: seo?.description ?? cat.description,
    path: `/${slug}`,
    image: getCategoryImage(slug),
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const seo = getCategorySeo(slug);
  const categoryProducts = getProductsByCategory(cat.name as ProductCategory);
  const related = getRelatedLinks({
    pageType: "category",
    currentPath: `/${slug}`,
    categorySlug: slug,
  });
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: cat.name, href: `/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          collectionPageSchema({
            name: cat.name,
            description: seo?.description ?? cat.description,
            slug,
            productUrls: categoryProducts.map((p) => p.slug),
          }),
        ]}
      />
      <PageHeader
        title={cat.name}
        subtitle={cat.description}
        image={getCategoryImage(slug)}
        imageAlt={cat.name}
      />

      <section className="py-8 border-b bg-cream">
        <div className="mx-auto max-w-7xl px-4">
          {seo && (
            <>
              <AnswerCapsule>
                {seo.answerCapsule} Sourced by an{" "}
                <HomepageKeywordLink />.
              </AnswerCapsule>
              <p className="text-muted leading-relaxed max-w-3xl">{seo.intro}</p>
              <p className="mt-4 text-sm">
                Learn more in our{" "}
                {slug === "sugar" && (
                  <Link href="/guides/icumsa-sugar-grades" className="text-primary hover:underline">
                    {KEYWORD_ANCHORS.icumsaGuide}
                  </Link>
                )}
                {slug === "rice" && (
                  <Link href="/guides/thai-rice-export" className="text-primary hover:underline">
                    {KEYWORD_ANCHORS.riceGuide}
                  </Link>
                )}
                {slug === "fertilizers" && (
                  <Link href="/glossary" className="text-primary hover:underline">
                    {KEYWORD_ANCHORS.waterSoluble}
                  </Link>
                )}
                {slug !== "sugar" && slug !== "rice" && slug !== "fertilizers" && (
                  <Link href="/ordering-procedures" className="text-primary hover:underline">
                    {KEYWORD_ANCHORS.ordering}
                  </Link>
                )}
                {" "}and{" "}
                <Link href="/glossary" className="text-primary hover:underline">
                  {KEYWORD_ANCHORS.glossary}
                </Link>
                .
              </p>
            </>
          )}
        </div>
      </section>

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
          <h2 className="text-2xl font-bold text-primary-dark mb-2">
            What {cat.name} products do we export?
          </h2>
          <p className="text-muted mb-8">{categoryProducts.length} products in {cat.name}</p>
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
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
          <div className="mt-12 flex flex-wrap gap-4 text-sm">
            <Link href="/ordering-procedures" className="text-primary hover:underline font-medium">
              How to order bulk commodities →
            </Link>
            <Link href="/quality-control" className="text-primary hover:underline font-medium">
              Our quality control process →
            </Link>
            <Link href="/contact" className="text-primary hover:underline font-medium">
              {KEYWORD_ANCHORS.contact} →
            </Link>
          </div>
        </div>
      </section>

      <RelatedResources internal={related.internal} outbound={related.outbound} />
    </>
  );
}
