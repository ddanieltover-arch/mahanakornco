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
const TITLE = "ICUMSA Sugar Grades Explained";
const DESCRIPTION =
  "Complete guide to ICUMSA sugar grades — ICUMSA 45, 100, 150, and 600–1200 — for wholesale buyers sourcing bulk cane sugar from Thailand.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/guides/icumsa-sugar-grades",
  image: siteImages.categories.sugar,
  type: "article",
});

export default function IcumsaSugarGuidePage() {
  const path = "/guides/icumsa-sugar-grades";
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/products" },
    { name: "ICUMSA Sugar Grades", href: path },
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
            image: siteImages.categories.sugar,
          }),
        ]}
      />
      <PageHeader
        title="ICUMSA Sugar Grades Explained"
        tagline="Buyer Guide"
        subtitle="Understanding ICUMSA color ratings for wholesale cane sugar procurement."
        image={siteImages.categories.sugar}
      />

      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <LastUpdated date={PUBLISHED} />
          <AnswerCapsule>
            ICUMSA is the international standard for measuring sugar color and purity. Lower ICUMSA
            numbers mean whiter, more refined sugar. ICUMSA 45 is highly refined white sugar;
            ICUMSA 600–1200 indicates raw or brown cane sugar for industrial refining.
          </AnswerCapsule>

          <h2 className="text-2xl font-bold text-primary-dark mt-10">What is ICUMSA?</h2>
          <p className="text-muted leading-relaxed mt-4">
            ICUMSA (International Commission for Uniform Methods of Sugar Analysis) defines
            standardized methods for measuring sugar color, ash content, and polarization. Buyers
            use ICUMSA ratings to specify exactly which grade they require for food manufacturing,
            beverage production, or further refining.
          </p>

          <h2 className="text-2xl font-bold text-primary-dark mt-10">What are the main ICUMSA grades?</h2>
          <table className="mt-4 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-cream">
                <th className="p-3 text-left font-semibold">Grade</th>
                <th className="p-3 text-left font-semibold">Description</th>
                <th className="p-3 text-left font-semibold">Typical use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">ICUMSA 45</td>
                <td className="p-3 text-muted">Highly refined white sugar</td>
                <td className="p-3 text-muted">Food, beverage, retail repack</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">ICUMSA 100–150</td>
                <td className="p-3 text-muted">White cane sugar, less refined than 45</td>
                <td className="p-3 text-muted">Industrial food processing</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">ICUMSA 600–1200</td>
                <td className="p-3 text-muted">Raw / brown cane sugar</td>
                <td className="p-3 text-muted">Refining feedstock, specialty markets</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">VHP</td>
                <td className="p-3 text-muted">Very High Pol raw sugar</td>
                <td className="p-3 text-muted">Refinery input</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-2xl font-bold text-primary-dark mt-10">
            How do I choose the right grade for my business?
          </h2>
          <p className="text-muted leading-relaxed mt-4">
            Choose ICUMSA 45 for direct consumption or repackaging where maximum whiteness is
            required. Select ICUMSA 100–150 for cost-sensitive food manufacturing. Use ICUMSA
            600–1200 or VHP when supplying refineries or specialty brown-sugar markets. MAHANAKORN
            supplies all grades with batch documentation and pre-shipment inspection.
          </p>

          <h2 className="text-2xl font-bold text-primary-dark mt-10">
            Where can I source ICUMSA sugar from Thailand?
          </h2>
          <p className="text-muted leading-relaxed mt-4">
            Browse our{" "}
            <Link href="/sugar" className="text-primary hover:underline">
              sugar product catalogue
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-primary hover:underline">
              request a wholesale quote
            </Link>{" "}
            with your required ICUMSA grade, quantity, and destination port.
          </p>
        </div>
      </article>
    </>
  );
}
