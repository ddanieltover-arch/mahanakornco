"use client";

import { motion } from "framer-motion";
import {
  defaultTransition,
  defaultViewport,
  getFadeVariants,
  type FadeDirection,
} from "@/lib/motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: FadeDirection;
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={getFadeVariants(direction)}
      transition={{ ...defaultTransition, delay, ...(duration ? { duration } : {}) }}
    >
      {children}
    </motion.div>
  );
}
