import { motion, useReducedMotion } from "framer-motion";

import { Card } from "../common/Card";
import { SectionTitle } from "../common/SectionTitle";
import type { CycleContextContent } from "../../types/today";

export interface CycleContextCardProps {
  content: CycleContextContent;
}

export function CycleContextCard({ content }: CycleContextCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
    >
      <Card tone="strong" className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <SectionTitle
            eyebrow={content.eyebrow}
            title={content.dayLabel}
            titleClassName="text-xl font-semibold text-text"
            className="space-y-1"
            eyebrowClassName="text-text-muted"
          />
          <span className="shrink-0 rounded-full bg-background px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-text-muted">
            In progress
          </span>
        </div>
        <div className="h-px w-full bg-primary/10" />
        <p className="text-sm leading-6 text-text-muted sm:text-base">
          {content.text}
        </p>
      </Card>
    </motion.article>
  );
}
