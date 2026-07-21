"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { PLACEHOLDER_IMAGE } from "@/lib/images";
import { defaultTransition, fadeInUp, springTransition } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const imageSrc = product.image || PLACEHOLDER_IMAGE;

  return (
    <motion.div
      className="h-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeInUp}
      transition={{ ...defaultTransition, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -8 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-cream">
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 25vw"
          />
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full bg-primary px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-white shadow-sm">
            {product.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-3 sm:p-5">
          <h3 className="min-h-[2.5rem] sm:min-h-[3rem] text-sm sm:text-base font-semibold leading-snug text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
          {product.excerpt ? (
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted hidden sm:line-clamp-3">
              {product.excerpt}
            </p>
          ) : null}
          <span className="mt-auto pt-3 sm:pt-4 flex items-center gap-1 text-xs sm:text-sm font-medium text-primary">
            Request Quote
            <motion.span
              className="inline-flex"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </motion.span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
