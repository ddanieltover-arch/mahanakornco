import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProductEnquiryForm } from "@/components/forms/ProductEnquiryForm";
import { ProductDescriptionSection } from "@/components/products/ProductDescriptionSection";
import { ProductGallery } from "@/components/products/ProductGallery";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import { categories, getProductBySlug, products } from "@/data/products";
import { PLACEHOLDER_IMAGE } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const description =
    product.excerpt ||
    (product.content
      ? product.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160)
      : `Request a quote for ${product.title} wholesale from MAHANAKORN. Bulk export from Thailand.`);
  const image = product.image || PLACEHOLDER_IMAGE;
  return buildPageMetadata({
    title: `${product.title} Wholesale`,
    description,
    path: `/products/${slug}`,
    image,
  });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const imageSrc = product.image || PLACEHOLDER_IMAGE;
  const categorySlug = categories.find((c) => c.name === product.category)?.slug;
  const plainDescription =
    product.excerpt ||
    (product.content ? stripHtml(product.content).slice(0, 300) : `Wholesale ${product.title} from MAHANAKORN.`);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    ...(categorySlug
      ? [{ name: product.category, href: `/${categorySlug}` }]
      : [{ name: product.category, href: "/products" }]),
    { name: product.title, href: `/products/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          productSchema({
            name: product.title,
            description: plainDescription,
            slug: product.slug,
            image: imageSrc,
            category: product.category,
          }),
        ]}
      />
      <PageHeader
        title={product.title}
        tagline={product.category}
        image={imageSrc}
        imageAlt={`${product.title} — wholesale export from Thailand`}
      />

      <section className="bg-cream py-4 border-b">
        <div className="mx-auto max-w-7xl px-4">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span className="mx-2">/</span>
            {categorySlug ? (
              <Link href={`/${categorySlug}`} className="hover:text-primary">
                {product.category}
              </Link>
            ) : (
              <span>{product.category}</span>
            )}
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </section>

      <section className="py-8 border-b">
        <div className="mx-auto max-w-7xl px-4">
          <AnswerCapsule>
            {product.title} is available for wholesale and bulk export from MAHANAKORN NAKO NAGARAJ
            CO., LTD in Thailand. Request a formal quotation with specifications, packaging options,
            Incoterms, and destination port details.
          </AnswerCapsule>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <ProductGallery
                title={product.title}
                image={imageSrc}
                gallery={product.gallery}
              />
            </FadeIn>

            <FadeIn direction="right" delay={0.12}>
              <article className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm h-fit">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wide">
                  {product.category}
                </span>
                <h2 className="mt-4 text-2xl md:text-3xl font-bold text-primary-dark leading-tight">
                  {product.title}
                </h2>
                {product.excerpt && !product.content && (
                  <p className="mt-4 text-muted leading-relaxed text-sm line-clamp-4">
                    {product.excerpt}
                  </p>
                )}
                {!product.content && (
                  <p className="mt-4 text-muted leading-relaxed text-sm">
                    MAHANAKORN supplies {product.title} for global B2B buyers with export
                    documentation, quality verification, and flexible Incoterms. Contact our sales
                    team for MOQ, packaging, and lead time for your destination market.
                  </p>
                )}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-primary-dark mb-4">
                    Request a Quote
                  </h3>
                  <ProductEnquiryForm productName={product.title} />
                </div>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      <ProductDescriptionSection product={product} categorySlug={categorySlug} />

      <RelatedProducts
        currentSlug={product.slug}
        category={product.category}
        categorySlug={categorySlug}
      />
    </>
  );
}
