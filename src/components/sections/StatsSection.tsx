"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const stats = [
  { value: siteConfig.stats.clients, label: "Trusted Clients" },
  { value: siteConfig.stats.delivered, label: "Goods Delivered" },
  { value: siteConfig.stats.satisfaction, label: "Client Satisfaction" },
  { value: siteConfig.stats.years, label: "Years of Experience" },
];

export function StatsSection() {
  return (
    <section className="bg-primary py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <Stagger className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <p className="text-4xl md:text-5xl font-bold text-white">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="mt-2 text-sm text-white/80 uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
