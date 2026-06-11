import type { Transition, Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const defaultTransition: Transition = {
  duration: 0.65,
  ease: easeOut,
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
};

export const defaultViewport = { once: true, margin: "-60px" as const };

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -36 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export type FadeDirection = "up" | "down" | "left" | "right" | "none" | "scale";

export function getFadeVariants(direction: FadeDirection): Variants {
  switch (direction) {
    case "down":
      return fadeInDown;
    case "left":
      return fadeInLeft;
    case "right":
      return fadeInRight;
    case "none":
      return fadeIn;
    case "scale":
      return scaleIn;
    default:
      return fadeInUp;
  }
}
