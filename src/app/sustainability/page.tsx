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
import { Leaf, Recycle, Zap, Sprout, Users, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability",
  description: `Environmental and social responsibility at ${siteConfig.name}.`,
  ...pageImageMeta(siteImages.pages.sustainability),
};

const environmental = [
  {
    icon: Recycle,
    title: "Reducing Waste",
    description:
      "Minimizing waste across our supply chain while promoting recycling and reuse at every stage.",
  },
  {
    icon: Zap,
    title: "Energy Efficiency",
    description:
      "Implementing sustainable practices to lower energy use in logistics, storage, and operations.",
  },
  {
    icon: Sprout,
    title: "Responsible Sourcing",
    description:
      "Working with suppliers who share our commitment to sustainable agricultural practices.",
  },
];

const social = [
  {
    icon: Users,
    title: "Community Development",
    description:
      "Supporting the communities where we operate, empowering local people and contributing to national growth.",
  },
  {
    icon: HeartHandshake,
    title: "Farmer Partnerships",
    description:
      "Equally at home meeting face-to-face with farmers as engaging with international trade partners.",
  },
  {
    icon: Leaf,
    title: "Long-Term Value",
    description:
      "Creating lasting value for clients, employees, partners, and communities through responsible business.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHeader
        title="Sustainability"
        tagline="Our Responsibility"
        subtitle="Creating long-term value through responsible practices."
        image={siteImages.pages.sustainability}
      />
      <RelatedInfoNav />

      <InfoIntro
        tagline="Core Values"
        title={`Sustainability at ${siteConfig.shortName}`}
        description={`At ${siteConfig.name}, sustainability is more than a responsibility — it is a core value that guides the way we operate. We integrate environmentally and socially responsible practices into every part of our business.`}
      />

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn className="mb-12">
            <div className="relative rounded-2xl overflow-hidden aspect-[21/9] min-h-[200px] shadow-lg">
              <Image
                src={siteImages.pages.sustainability}
                alt="Sustainable agriculture"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary-dark/50 flex items-center justify-center">
                <p className="text-white text-xl md:text-2xl font-semibold text-center px-6 max-w-2xl">
                  Responsible sourcing for a better tomorrow
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="text-center mb-10">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm">
              Environmental
            </p>
            <h2 className="mt-2 text-2xl font-bold text-primary-dark">Our Environmental Commitment</h2>
          </FadeIn>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {environmental.map((item) => (
              <StaggerItem key={item.title}>
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn className="text-center mb-10">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm">Social</p>
            <h2 className="mt-2 text-2xl font-bold text-primary-dark">Social Responsibility</h2>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              We believe community development empowers not just local people but the nation at
              large.
            </p>
          </FadeIn>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {social.map((item) => (
              <StaggerItem key={item.title}>
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <InfoCta
        title="Partner With a Responsible Supplier"
        description="Learn how our sustainability practices support your business goals and market requirements."
        buttonLabel="Get in Touch"
      />
    </>
  );
}
