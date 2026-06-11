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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeInUp}
      transition={{ ...defaultTransition, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -8 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-cream">
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white shadow-sm">
            {product.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
          {product.excerpt && (
            <p className="mt-2 text-sm text-muted line-clamp-2">{product.excerpt}</p>
          )}
          <span className="mt-auto pt-4 flex items-center gap-1 text-sm font-medium text-primary">
            Request Quote
            <motion.span
              className="inline-flex"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
