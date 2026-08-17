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

export const metadata: Metadata = buildPageMetadata({
  title: "Agricultural Export FAQ",
  description:
    "Frequently asked questions about ordering bulk sugar, rice, fertilizer, and edible oil exports from MAHANAKORN Thailand.",
  path: "/faq",
  image: siteImages.pages.contact,
});

export default function FaqPage() {
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
            MAHANAKORN exports bulk sugar, rice, fertilizer, and edible cooking oil worldwide.
            Orders follow a six-step process from inquiry to delivery, with FOB/CIF Incoterms,
            quality certificates, and formal proforma invoices for every shipment.
          </AnswerCapsule>

          <dl className="space-y-8">
            {exportFaqs.map((faq) => (
              <div key={faq.question} id={faq.question.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}>
                <dt className="text-lg font-bold text-primary-dark">{faq.question}</dt>
                <dd className="mt-2 text-muted leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-12 text-muted">
            Still have questions?{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              Contact our sales team
            </Link>{" "}
            or read our{" "}
            <Link href="/ordering-procedures" className="text-primary font-semibold hover:underline">
              ordering procedures
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
