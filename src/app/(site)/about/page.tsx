import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/site-images";
import { pageImageMeta } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — a trusted wholesale supplier of agricultural commodities from Thailand since ${siteConfig.established}.`,
  ...pageImageMeta(siteImages.pages.about),
};

const values = [
  {
    title: "Community Development",
    description:
      "We believe that the development of the communities in which we operate will result in the empowerment of not just the people in these communities but the nation at large.",
  },
  {
    title: "Market Insights",
    description:
      "Our customers and suppliers benefit from the deep market insights our global footprint offers to help them make smart pricing, purchasing, and sales decisions.",
  },
  {
    title: "Honest Communication",
    description:
      "If we can't help you, we will tell you quickly and honestly. You can talk directly to a decision maker.",
  },
  {
    title: "Flexible Supply",
    description:
      "Multiple origin access, global presence, and deep logistics expertise allow flexibility in supply for urgent needs or changing plans.",
  },
  {
    title: "Timely Execution",
    description:
      "Deep commodity execution expertise combined with a strong focus on customer and supplier needs ensures timely and efficient execution.",
  },
  {
    title: "Quality Assurance",
    description:
      "Supply chain visibility and alignment with Quality & Food Safety Management programs allows for quality differentiation you can trust.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        tagline="Who We Are"
        subtitle={`Trusted wholesale supplier of agricultural commodities since ${siteConfig.established}`}
        image={siteImages.pages.about}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <FadeIn direction="left">
              <h2 className="text-3xl font-bold text-primary-dark">
                More Than {siteConfig.stats.years} Years of Industry Experience
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                <strong>{siteConfig.name}</strong> is a trusted wholesale supplier of sugar, rice,
                fertilizer, and edible cooking oil from Thailand. Established in {siteConfig.established},
                our company has successfully built a reputation as a reliable and stable partner in
                international trade.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                At {siteConfig.shortName}, we maintain our competitive edge by continuously investing
                in our business and building long-term relationships with our clients. The superior
                quality of our products combined with our commitment to exceptional service has earned
                us recognition both locally and internationally.
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.15} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={siteImages.about}
                alt="About MAHANAKORN"
                fill
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark">Our Values</h2>
          </FadeIn>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <h3 className="font-semibold text-lg text-primary">{value.title}</h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-20">
        <FadeIn className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-dark">Ready to Partner With Us?</h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            Contact us today for wholesale pricing, product specifications, and export inquiries.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Get a Quote
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
