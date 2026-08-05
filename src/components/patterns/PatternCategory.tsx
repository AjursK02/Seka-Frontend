import { motion, useReducedMotion } from "framer-motion";

import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import type { PatternCategory as PatternCategoryType } from "../../types/patterns";

export interface PatternCategoryProps {
  category: PatternCategoryType;
}

export function PatternCategory({ category }: PatternCategoryProps) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = category.icon;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Card tone="subtle" className="flex h-full flex-col gap-4 lg:min-h-[180px] lg:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <Typography as="h3" variant="title" className="truncate">
                {category.label}
              </Typography>
              {category.description ? (
                <Typography variant="bodyMuted" className="mt-1 text-sm">
                  {category.description}
                </Typography>
              ) : null}
            </div>
          </div>
          {typeof category.count === "number" ? (
            <span className="shrink-0 rounded-full bg-surface px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-text-muted">
              {category.count}
            </span>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}
