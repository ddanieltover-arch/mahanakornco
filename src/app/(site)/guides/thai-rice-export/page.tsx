import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { siteImages } from "@/config/site-images";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

const PUBLISHED = "2026-08-17";
const TITLE = "How to Import Rice from Thailand";
const DESCRIPTION =
  "Step-by-step guide for B2B buyers importing Thai jasmine rice, parboiled rice, and specialty varieties — documentation, quality standards, and ordering process.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/guides/thai-rice-export",
  image: siteImages.categories.rice,
  type: "article",
});

export default function ThaiRiceExportGuidePage() {
  const path = "/guides/thai-rice-export";
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/products" },
    { name: "Thai Rice Export", href: path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          articleSchema({
            title: TITLE,
            description: DESCRIPTION,
            path,
            datePublished: PUBLISHED,
            dateModified: PUBLISHED,
            image: siteImages.categories.rice,
          }),
        ]}
      />
      <PageHeader
        title="How to Import Rice from Thailand"
        tagline="Export Guide"
        subtitle="A practical guide for wholesale buyers sourcing Thai rice for global markets."
        image={siteImages.categories.rice}
      />

      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <LastUpdated date={PUBLISHED} />
          <AnswerCapsule>
            To import rice from Thailand, identify your required variety (e.g. Hom Mali jasmine),
            confirm import regulations in your country, request a proforma invoice with FOB or CIF
            terms, arrange payment, and coordinate phytosanitary certificates and shipping
            documentation with your supplier.
          </AnswerCapsule>

          <h2 className="text-2xl font-bold text-primary-dark mt-10">
            What rice varieties does Thailand export?
          </h2>
          <p className="text-muted leading-relaxed mt-4">
            Thailand exports fragrant Hom Mali (jasmine) rice, white rice, parboiled rice, sticky
            rice, and specialty grades. Hom Mali is prized for aroma and is among the most
            sought-after varieties in Middle Eastern, Asian, and Western markets. According to the{" "}
            <a
              href="https://www.fao.org/faostat/en/#data"
              className="text-primary hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              FAO
            </a>
            , Thailand consistently ranks among the world&apos;s top rice exporters.
          </p>

          <h2 className="text-2xl font-bold text-primary-dark mt-10">
            What documents are required for rice import?
          </h2>
          <ol className="mt-4 list-decimal pl-6 space-y-2 text-muted">
            <li>Commercial invoice and packing list</li>
            <li>Bill of lading</li>
            <li>Certificate of origin</li>
            <li>Phytosanitary certificate (plant health)</li>
            <li>Quality inspection certificate (upon request)</li>
            <li>Fumigation certificate (if required by destination)</li>
          </ol>

          <h2 className="text-2xl font-bold text-primary-dark mt-10">
            What are the steps to place a bulk rice order?
          </h2>
          <p className="text-muted leading-relaxed mt-4">
            Follow our standard{" "}
            <Link href="/ordering-procedures" className="text-primary hover:underline">
              ordering procedures
            </Link>
            : submit an inquiry with variety, quantity, and destination port; receive a quotation;
            confirm with proforma invoice; complete payment; production and QC; shipping and
            delivery. MAHANAKORN handles export coordination from Udon Thani and Lampang, Thailand.
          </p>

          <h2 className="text-2xl font-bold text-primary-dark mt-10">
            How does MAHANAKORN ensure rice quality?
          </h2>
          <p className="text-muted leading-relaxed mt-4">
            Every shipment undergoes{" "}
            <Link href="/quality-control" className="text-primary hover:underline">
              pre-shipment inspection
            </Link>{" "}
            including physical grading, moisture testing, and packaging verification. Third-party
            lab testing is available on request. Browse our{" "}
            <Link href="/rice" className="text-primary hover:underline">
              rice catalogue
            </Link>{" "}
            to view available varieties.
          </p>
        </div>
      </article>
    </>
  );
}
