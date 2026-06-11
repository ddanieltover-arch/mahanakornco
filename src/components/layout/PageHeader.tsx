"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { defaultTransition, staggerContainer } from "@/lib/motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  image?: string;
  imageAlt?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: defaultTransition },
};

export function PageHeader({ title, subtitle, tagline, image, imageAlt }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-primary-dark py-16 md:py-24">
      {image && (
        <>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-primary-dark/70" />
        </>
      )}

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {tagline && (
          <motion.p
            variants={itemVariants}
            className="text-accent font-semibold uppercase tracking-wider text-sm mb-2"
          >
            {tagline}
          </motion.p>
        )}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold text-white"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-white/80 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
