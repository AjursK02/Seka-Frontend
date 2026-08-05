import { motion, useReducedMotion } from "framer-motion";

import { PageHeader } from "../common/PageHeader";
import type { TodayHeroContent } from "../../types/today";

export interface TodayHeroProps {
  content: TodayHeroContent;
}

export function TodayHero({ content }: TodayHeroProps) {
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
            <span className="text-secondary">{content.highlight}</span>
          </>
        }
        titleClassName="max-w-[14ch] lg:max-w-[16ch]"
      />
    </motion.section>
  );
}
