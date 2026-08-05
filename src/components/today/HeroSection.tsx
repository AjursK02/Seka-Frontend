import { motion, useReducedMotion } from "framer-motion";

import { PageHeader } from "../common/PageHeader";
import type { TodayHeroContent } from "../../types/today";

export interface HeroSectionProps {
  content: TodayHeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <PageHeader
        eyebrow={content.eyebrow}
        title={
          <>
            {content.title}
            <br />
            <span className="text-primary">{content.highlight}</span>
          </>
        }
      />
    </motion.section>
  );
}
