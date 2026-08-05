import { motion, useReducedMotion } from "framer-motion";

import { Card } from "../common/Card";
import type { InsightCardContent } from "../../types/today";

export interface InsightCardProps {
  content: InsightCardContent;
}

export function InsightCard({ content }: InsightCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = content.icon;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
    >
      <Card className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-2 text-text-muted">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-soft text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.24em]">
            {content.eyebrow}
          </span>
        </div>
        <div className="mt-auto flex items-start gap-3">
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-base leading-7 text-text">{content.text}</p>
        </div>
      </Card>
    </motion.article>
  );
}
