"use client";

import { motion } from "framer-motion";
import { defaultTransition, defaultViewport, fadeInUp, staggerContainer } from "@/lib/motion";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={fadeInUp} transition={defaultTransition}>
      {children}
    </motion.div>
  );
}
