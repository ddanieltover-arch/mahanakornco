"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { siteImages } from "@/config/site-images";
import { defaultTransition, springTransition } from "@/lib/motion";

const slides = siteImages.hero;

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...defaultTransition, delay: 0.15 + i * 0.12 },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 6, ease: "linear" }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={current === 0}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-4 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial="hidden" animate="visible" exit="exit">
              <motion.p
                custom={0}
                variants={textVariants}
                className="text-accent font-semibold uppercase tracking-wider mb-2"
              >
                {slide.tagline}
              </motion.p>
              <motion.h1
                custom={1}
                variants={textVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                custom={2}
                variants={textVariants}
                className="mt-4 text-lg text-white/90 max-w-2xl"
              >
                {slide.subtitle}
              </motion.p>
              <motion.div
                custom={3}
                variants={textVariants}
                className="mt-8 flex flex-wrap gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/about"
                    className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-primary-dark hover:bg-cream transition-colors"
                  >
                    More Information
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    className="inline-block rounded-full border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Get a Quote
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 backdrop-blur-sm"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1, x: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>
      <motion.button
        onClick={() => setCurrent((c) => (c + 1) % slides.length)}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 backdrop-blur-sm"
        aria-label="Next slide"
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="h-6 w-6" />
      </motion.button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            animate={{ width: i === current ? 32 : 8 }}
            transition={springTransition}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </section>
  );
}
