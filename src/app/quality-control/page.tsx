import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { RelatedInfoNav } from "@/components/info-page/RelatedInfoNav";
import { InfoIntro } from "@/components/info-page/InfoIntro";
import { FeatureCard } from "@/components/info-page/FeatureCard";
import { InfoCta } from "@/components/info-page/InfoCta";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/site-images";
import { pageImageMeta } from "@/lib/metadata";
import {
  FlaskConical,
  Microscope,
  PackageCheck,
  ShieldCheck,
  Award,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quality Control",
  description: `Quality assurance standards at ${siteConfig.name}.`,
  ...pageImageMeta(siteImages.pages["quality-control"]),
};

const measures = [
  {
    icon: ShieldCheck,
    title: "Raw Material Selection",
    description:
      "Partnering only with trusted and certified producers and mills to ensure every batch meets our standards.",
  },
  {
    icon: PackageCheck,
    title: "Pre-Shipment Inspection",
    description:
      "Verifying physical, chemical, and packaging criteria before dispatch to guarantee export readiness.",
  },
  {
    icon: FlaskConical,
    title: "Third-Party Lab Testing",
    description:
      "Available upon request to meet import, export, or regulatory requirements in your destination market.",
  },
  {
    icon: Microscope,
    title: "Packaging Integrity Checks",
    description:
      "Ensuring all products are securely packed, correctly labeled, and export-ready for international transit.",
  },
];

const standards = [
  { icon: Award, label: "ICUMSA sugar grading standards" },
  { icon: Globe, label: "International export compliance" },
  { icon: ShieldCheck, label: "Batch traceability & documentation" },
  { icon: PackageCheck, label: "Pre-shipment quality certificates" },
];

export default function QualityControlPage() {
  return (
    <>
      <PageHeader
        title="Quality Control"
        tagline="Our Commitment"
        subtitle="Quality is more than a standard — it is our commitment."
        image={siteImages.pages["quality-control"]}
      />
      <RelatedInfoNav />

      <InfoIntro
        tagline="Excellence at Every Stage"
        title="Rigorous Quality Assurance"
        description={`At ${siteConfig.name}, every product we supply — from sugar and rice to fertilizer and edible cooking oil — undergoes strict inspection and verification at multiple stages to ensure safety, consistency, and compliance with international standards.`}
      />

      <section className="pb-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4">
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {measures.map((m) => (
              <StaggerItem key={m.title}>
                <FeatureCard
                  icon={m.icon}
                  title={m.title}
                  description={m.description}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <FadeIn direction="left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={siteImages.pages["quality-control"]}
                  alt="Quality sugar products"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <p className="text-primary font-semibold uppercase tracking-wider text-sm">
                Standards & Compliance
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-primary-dark">
                Built for Global Markets
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Our quality control processes are designed to meet the demands of international
                buyers, distributors, and regulatory bodies. We provide documentation and testing
                support tailored to your market requirements.
              </p>
              <ul className="mt-8 space-y-4">
                {standards.map((s) => (
                  <li key={s.label} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-primary-dark">{s.label}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <InfoCta
        title="Request Quality Documentation"
        description="Need certificates, lab reports, or specifications for your order? Our team can provide the documentation your market requires."
        buttonLabel="Contact Us"
      />
    </>
  );
}
