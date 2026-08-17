import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { exportFaqs } from "@/data/faq";
import { siteImages } from "@/config/site-images";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo/schema";
import { RelatedResources } from "@/components/seo/RelatedResources";
import { HomepageKeywordLink } from "@/components/seo/HomepageKeywordLink";
import { getRelatedLinks, KEYWORD_ANCHORS } from "@/data/related-links";

export const metadata: Metadata = buildPageMetadata({
  title: "Agricultural Export FAQ",
  description:
    "Frequently asked questions about ordering bulk sugar, rice, fertilizer, and edible oil exports from MAHANAKORN Thailand.",
  path: "/faq",
  image: siteImages.pages.contact,
});

export default function FaqPage() {
  const related = getRelatedLinks({ pageType: "faq", currentPath: "/faq" });
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqPageSchema(exportFaqs)]} />
      <PageHeader
        title="Frequently Asked Questions"
        tagline="Export & Wholesale"
        subtitle="Answers to common questions about ordering agricultural commodities from Thailand."
        image={siteImages.pages.contact}
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <LastUpdated />
          <AnswerCapsule>
            An <HomepageKeywordLink /> exports bulk sugar, rice, fertilizer, and edible cooking oil
            worldwide. Orders follow a six-step{" "}
            <Link href="/ordering-procedures" className="text-primary font-medium hover:underline">
              {KEYWORD_ANCHORS.ordering}
            </Link>
            , with FOB/CIF Incoterms, quality certificates, and formal proforma invoices for every
            shipment.
          </AnswerCapsule>

          <dl className="space-y-8">
            {exportFaqs.map((faq) => (
              <div key={faq.question} id={faq.question.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}>
                <dt className="text-lg font-bold text-primary-dark">{faq.question}</dt>
                <dd className="mt-2 text-muted leading-relaxed">
                  {faq.question.includes("products") ? (
                    <>
                      MAHANAKORN exports{" "}
                      <Link href="/sugar" className="text-primary hover:underline">
                        {KEYWORD_ANCHORS.sugar}
                      </Link>
                      ,{" "}
                      <Link href="/rice" className="text-primary hover:underline">
                        {KEYWORD_ANCHORS.rice}
                      </Link>
                      , fertilizers, edible cooking oil, poultry products, and nuts for wholesale
                      and B2B buyers worldwide.
                    </>
                  ) : faq.question.includes("ICUMSA") ? (
                    <>
                      We supply ICUMSA 45, 100/150, 600–1200, VHP, and beet sugar. Read{" "}
                      <Link href="/guides/icumsa-sugar-grades" className="text-primary hover:underline">
                        {KEYWORD_ANCHORS.icumsaGuide}
                      </Link>{" "}
                      or browse the{" "}
                      <Link href="/sugar" className="text-primary hover:underline">
                        {KEYWORD_ANCHORS.sugar}
                      </Link>{" "}
                      catalogue.
                    </>
                  ) : faq.question.includes("quote") ? (
                    <>
                      Use the contact form or email sales@mahanakornco.com.{" "}
                      <Link href="/contact" className="text-primary hover:underline">
                        {KEYWORD_ANCHORS.contact}
                      </Link>{" "}
                      with specifications, quantity, and destination port.
                    </>
                  ) : faq.question.includes("certificates") ? (
                    <>
                      Yes. See our{" "}
                      <Link href="/quality-control" className="text-primary hover:underline">
                        {KEYWORD_ANCHORS.quality}
                      </Link>{" "}
                      process for pre-shipment inspection, batch documentation, and third-party lab
                      testing.
                    </>
                  ) : (
                    faq.answer
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-12 text-muted">
            Still have questions?{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              {KEYWORD_ANCHORS.contact}
            </Link>{" "}
            or read our{" "}
            <Link href="/ordering-procedures" className="text-primary font-semibold hover:underline">
              {KEYWORD_ANCHORS.ordering}
            </Link>
            .
          </p>
        </div>
      </section>

      <RelatedResources internal={related.internal} outbound={related.outbound} />
    </>
  );
}
