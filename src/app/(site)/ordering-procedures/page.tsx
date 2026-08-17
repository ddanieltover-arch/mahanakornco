import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { RelatedInfoNav } from "@/components/info-page/RelatedInfoNav";
import { InfoIntro } from "@/components/info-page/InfoIntro";
import { ProcessTimeline } from "@/components/info-page/ProcessTimeline";
import { InfoCta } from "@/components/info-page/InfoCta";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { FadeIn } from "@/components/motion/FadeIn";
import { siteImages } from "@/config/site-images";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { ClipboardList, FileCheck, Ship, Headphones } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  title: "Bulk Commodity Ordering Procedures",
  description:
    "How to order agricultural commodities from MAHANAKORN — inquiry, quotation, proforma invoice, production, shipping, and delivery.",
  path: "/ordering-procedures",
  image: siteImages.pages["ordering-procedures"],
});

const steps = [
  {
    title: "Product Inquiry",
    description:
      "Contact us with your product requirements, specifications, quantity, and destination port.",
  },
  {
    title: "Quotation & Terms",
    description:
      "We'll send a formal quotation including product details, pricing, packaging, lead time, and Incoterms (FOB, CIF, etc.).",
  },
  {
    title: "Confirmation & Proforma Invoice",
    description:
      "Once you confirm, we issue a Proforma Invoice with payment terms and bank details.",
  },
  {
    title: "Production & Packaging",
    description:
      "After payment or deposit, we begin sourcing, quality control, and custom packaging as required.",
  },
  {
    title: "Logistics & Shipping",
    description:
      "We coordinate shipping, documentation, and customs clearance to ensure smooth delivery to your port.",
  },
  {
    title: "Delivery & After-Sales Support",
    description:
      "We follow up to ensure satisfaction and maintain long-term partnerships with our clients.",
  },
];

const highlights = [
  {
    icon: ClipboardList,
    title: "Clear Documentation",
    text: "Proforma invoices, certificates, and export paperwork handled for you.",
  },
  {
    icon: FileCheck,
    title: "Flexible Terms",
    text: "FOB, CIF, and other Incoterms available to suit your logistics needs.",
  },
  {
    icon: Ship,
    title: "Global Shipping",
    text: "Coordinated freight and customs clearance to ports worldwide.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "A single point of contact from inquiry through delivery.",
  },
];

export default function OrderingProceduresPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Ordering Procedures", href: "/ordering-procedures" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title="Ordering Procedures"
        tagline="How It Works"
        subtitle="We've made our order process simple, transparent, and efficient."
        image={siteImages.pages["ordering-procedures"]}
      />
      <RelatedInfoNav />

      <section className="py-8 bg-cream border-b">
        <div className="mx-auto max-w-7xl px-4">
          <LastUpdated />
          <AnswerCapsule>
            Ordering bulk commodities from MAHANAKORN follows six steps: product inquiry,
            quotation with Incoterms, proforma invoice, production and QC, shipping with full
            documentation, and after-sales support. Typical lead time is 2–6 weeks after payment.
          </AnswerCapsule>
        </div>
      </section>

      <InfoIntro
        tagline="Streamlined Process"
        title="From Inquiry to Delivery"
        description="We've made our order process simple, transparent, and efficient — so you can focus on your business while we handle the rest."
      />

      <section className="pb-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-5 items-start">
            <FadeIn direction="left" className="lg:col-span-2">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg sticky top-28">
                <Image
                  src={siteImages.home.experience}
                  alt="Export and logistics"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-accent font-semibold text-sm uppercase tracking-wider">
                    Trusted Since 2004
                  </p>
                  <p className="mt-2 text-white text-lg font-semibold leading-snug">
                    Wholesale agricultural commodities exported worldwide
                  </p>
                </div>
              </div>
            </FadeIn>

            <div className="lg:col-span-3">
              <FadeIn delay={0.1}>
                <h2 className="text-2xl font-bold text-primary-dark mb-8">
                  What are the six steps to place a bulk order?
                </h2>
              </FadeIn>
              <ProcessTimeline steps={steps} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-2xl font-bold text-primary-dark">Why Order With Us</h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <FadeIn key={item.title}>
                <div className="text-center p-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-bold text-primary-dark">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <InfoCta
        title="Ready to Place Your Order?"
        description="Contact our team today with your product requirements and destination port. We'll respond with a formal quotation promptly."
        buttonLabel="Start Your Order"
      />
    </>
  );
}
