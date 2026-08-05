import { motion, useReducedMotion } from "framer-motion";

import { PageHeader } from "../common/PageHeader";

export interface CareHeaderProps {
  title: string;
}

export function CareHeader({ title }: CareHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-6"
    >
      <PageHeader
        eyebrow="Care"
        title={title}
        description="Ask SEKA what changed, compare symptoms, and get context that feels personal instead of generic."
      />
    </motion.section>
  );
}
