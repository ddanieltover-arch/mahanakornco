import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProductEnquiryForm } from "@/components/forms/ProductEnquiryForm";
import { ProductDescriptionSection } from "@/components/products/ProductDescriptionSection";
import { ProductGallery } from "@/components/products/ProductGallery";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { categories, getProductBySlug, products } from "@/data/products";
import { PLACEHOLDER_IMAGE } from "@/lib/images";
import { pageImageMeta } from "@/lib/metadata";

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
      : `Request a quote for ${product.title} from MAHANAKORN NAKO NAGARAJ CO., LTD.`);
  const image = product.image || PLACEHOLDER_IMAGE;
  return {
    title: product.title,
    description,
    ...pageImageMeta(image),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const imageSrc = product.image || PLACEHOLDER_IMAGE;
  const categorySlug = categories.find((c) => c.name === product.category)?.slug;

  return (
    <>
      <PageHeader
        title={product.title}
        tagline={product.category}
        image={imageSrc}
        imageAlt={product.title}
      />

      <section className="bg-cream py-4 border-b">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="text-sm text-muted">
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
              <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm h-fit">
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
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h2 className="text-lg font-semibold text-primary-dark mb-4">
                    Request a Quote
                  </h2>
                  <ProductEnquiryForm productName={product.title} />
                </div>
              </div>
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
