import { motion, useReducedMotion } from "framer-motion";

import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import type { TodayPlanContent } from "../../types/today";

export interface TodayPlanCardProps {
  content: TodayPlanContent;
}

export function TodayPlanCard({ content }: TodayPlanCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
    >
      <Card tone="subtle" className="bg-surface-strong/40 lg:min-h-[240px] lg:p-6">
        <div className="flex items-center gap-2 text-text-muted">
          <Typography as="p" variant="micro" className="text-text-muted">
            {content.eyebrow}
          </Typography>
        </div>

        <Typography as="p" variant="body" className="mt-4 max-w-2xl text-text sm:text-lg lg:text-xl">
          {content.title}
        </Typography>

        <ul className="mt-5 space-y-3">
          {content.steps.map((step) => (
            <li key={step.id} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-[0.72rem] font-bold text-secondary">
                {step.label}
              </div>
              <Typography variant="bodyMuted">{step.text}</Typography>
            </li>
          ))}
        </ul>

        <Button
          variant="secondary"
          className="mt-6 w-full justify-center border border-secondary/20 lg:w-auto"
        >
          {content.ctaLabel}
        </Button>
      </Card>
    </motion.article>
  );
}
