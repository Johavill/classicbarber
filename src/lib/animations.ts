/* ──────────────────────────────────────────────
   Shared Framer Motion variants — compatible with framer-motion v12
   
   Easing type is: EasingDefinition | EasingFunction
   BezierDefinition = [number, number, number, number] (tuple, not number[])
────────────────────────────────────────────── */
import type { Variants } from "framer-motion";

type BezierDefinition = [number, number, number, number];

/** Custom cubic-bezier — typed as BezierDefinition tuple (not number[]) */
const smoothEase: BezierDefinition = [0.22, 1, 0.36, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

/** viewport config for whileInView */
export const VIEWPORT = { once: true, margin: "-80px" } as const;
