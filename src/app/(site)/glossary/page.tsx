import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { glossaryTerms } from "@/data/glossary";
import { siteImages } from "@/config/site-images";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { RelatedResources } from "@/components/seo/RelatedResources";
import { HomepageKeywordLink } from "@/components/seo/HomepageKeywordLink";
import { getRelatedLinks, KEYWORD_ANCHORS } from "@/data/related-links";

export const metadata: Metadata = buildPageMetadata({
  title: "Commodity Trading Glossary",
  description:
    "Definitions of ICUMSA, VHP, RBD, NPK, Incoterms, and other terms used in agricultural commodity export and wholesale trade.",
  path: "/glossary",
  image: siteImages.pages.products,
});

export default function GlossaryPage() {
  const related = getRelatedLinks({ pageType: "glossary", currentPath: "/glossary" });
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Glossary", href: "/glossary" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title="Commodity Trading Glossary"
        tagline="Definitions"
        subtitle="Key terms used in agricultural commodity export, sugar grading, and international trade."
        image={siteImages.pages.products}
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <LastUpdated />
          <AnswerCapsule>
            This glossary defines essential terms for B2B buyers sourcing from an{" "}
            <HomepageKeywordLink /> — including ICUMSA grades, Incoterms, RBD oil standards, and
            export documentation requirements.
          </AnswerCapsule>

          <dl className="space-y-8">
            {glossaryTerms.map((entry) => (
              <div key={entry.term}>
                <dt className="text-lg font-bold text-primary-dark">{entry.term}</dt>
                <dd className="mt-2 text-muted leading-relaxed">{entry.definition}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-12 text-muted">
            Read our detailed guides:{" "}
            <Link href="/guides/icumsa-sugar-grades" className="text-primary hover:underline">
              {KEYWORD_ANCHORS.icumsaGuide}
            </Link>
            {" · "}
            <Link href="/guides/thai-rice-export" className="text-primary hover:underline">
              {KEYWORD_ANCHORS.riceGuide}
            </Link>
          </p>
        </div>
      </section>

      <RelatedResources internal={related.internal} outbound={related.outbound} />
    </>
  );
}
