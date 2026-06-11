"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";
import { siteImages } from "@/config/site-images";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { springTransition } from "@/lib/motion";

const categoryImages: Record<string, string> = siteImages.categories;

export function CategoryGrid() {
  return (
    <section className="py-20 bg-cream">
      <div className="mx-auto max-w-7xl px-4">
        <FadeIn className="text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm">Our Products</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary-dark">
            {categories[0] && "MAHANAKORN NAKO NAGARAJ CO., LTD"}
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Premium agricultural commodities for wholesale and export markets worldwide.
          </p>
        </FadeIn>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <StaggerItem key={cat.slug}>
              <motion.div whileHover={{ y: -6 }} transition={springTransition}>
                <Link
                  href={`/${cat.slug}`}
                  className="group relative block overflow-hidden rounded-xl aspect-[4/3] shadow-md"
                >
                  <Image
                    src={categoryImages[cat.slug] || categoryImages.sugar}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                    <p className="mt-1 text-sm text-white/80 line-clamp-2">{cat.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
