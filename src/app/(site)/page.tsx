import Link from "next/link";
import Image from "next/image";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProductCard } from "@/components/products/ProductCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/site-images";
import { CheckCircle, Truck, Shield, Globe } from "lucide-react";

const featuredSlugs = [
  "icumsa-45-white-refined-sugar",
  "jasmine-rice-thai-hom-mali",
  "privi-000050-17-5-s-water-soluble-fertilizer",
  "rbd-soybean-oil",
] as const;

const featuredProducts = featuredSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is (typeof products)[number] => Boolean(p));

const services = [
  {
    icon: CheckCircle,
    title: "Diverse Product Range",
    description:
      "Premium sugar, high-grade rice, reliable fertilizers, and pure edible cooking oil for customers worldwide.",
  },
  {
    icon: Truck,
    title: "Reliable Supply Chain",
    description:
      "Strong distribution network and trusted partnerships guarantee consistency, reliability, and timely delivery.",
  },
  {
    icon: Shield,
    title: "High Quality",
    description:
      "Strict quality control ensures every product meets the highest standards of excellence.",
  },
  {
    icon: Globe,
    title: "Global Export Reach",
    description:
      "Extensive export network delivering Thai agricultural excellence to markets across the world.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <FadeIn direction="left">
              <p className="text-primary font-semibold uppercase tracking-wider text-sm">Welcome</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary-dark">
                {siteConfig.tagline}
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                <strong>{siteConfig.name}</strong> works in collaboration with leading brands and
                trusted vendors to import and supply premium-quality products from major global
                suppliers. Our strong partnerships and expertise give us a competitive edge in the
                market.
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/about"
                  className="btn-animate rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark transition-colors"
                >
                  More Information
                </Link>
                <Link
                  href="/contact"
                  className="btn-animate rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary hover:bg-cream transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={siteImages.home.welcome}
                  alt="Premium white sugar"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CategoryGrid />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm">
              Featured Products
            </p>
            <h2 className="mt-2 text-3xl font-bold text-primary-dark">More About Our Products</h2>
          </FadeIn>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
          <FadeIn className="mt-10 text-center" delay={0.2}>
            <Link
              href="/products"
              className="btn-animate inline-flex rounded-full bg-primary px-8 py-3 font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              View All Products
            </Link>
          </FadeIn>
        </div>
      </section>

      <StatsSection />

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm">
              Quality of Our Services
            </p>
            <h2 className="mt-2 text-3xl font-bold text-primary-dark">About Us</h2>
          </FadeIn>
          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <service.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg text-primary-dark">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{service.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <FadeIn direction="left">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={siteImages.home.experience}
                  alt="Sugar production facility"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <h2 className="text-3xl font-bold text-primary-dark">
                More Than 20 Years of Industry Experience
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                <strong>{siteConfig.name}</strong> is a trusted wholesale supplier of sugar, rice,
                fertilizer, and edible cooking oil from Thailand. Established in {siteConfig.established},
                our company has successfully built a reputation as a reliable and stable partner in
                international trade.
              </p>
              <Link
                href="/about"
                className="btn-animate mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark transition-colors"
              >
                Learn More
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-dark text-white overflow-hidden">
        <FadeIn className="mx-auto max-w-7xl px-4 text-center">
          <blockquote className="text-xl md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed">
            &ldquo;We understand that your business depends on reliable, high-quality commodities.
            That&apos;s why we focus on delivering only the finest sugar, rice, edible cooking oil
            and fertilizers.&rdquo;
          </blockquote>
          <p className="mt-6 font-semibold text-accent">{siteConfig.name}</p>
        </FadeIn>
      </section>
    </>
  );
}
