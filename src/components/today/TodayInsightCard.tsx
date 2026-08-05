import { motion, useReducedMotion } from "framer-motion";

import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import type { TodayBentoContent } from "../../types/today";

export interface TodayInsightCardProps {
  content: TodayBentoContent;
}

export function TodayInsightCard({ content }: TodayInsightCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = content.icon;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
    >
      <Card className="flex h-full min-h-[220px] flex-col lg:min-h-[240px] lg:p-6">
        <div className="mb-4 flex items-center gap-2 text-text-muted">
          <span className="h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse" />
          <Typography as="p" variant="micro" className="text-text-muted">
            {content.eyebrow}
          </Typography>
        </div>

        <Typography as="p" variant="body" className="max-w-3xl text-text lg:text-lg">
          {content.title}
        </Typography>

        <Typography variant="bodyMuted" className="mt-3 max-w-2xl">
          {content.text}
        </Typography>

        <div className="mt-auto pt-4">
          <Button
            variant="ghost"
            size="sm"
            className="px-0 text-secondary hover:bg-transparent hover:text-primary"
            trailingIcon={<Icon className="h-4 w-4" />}
          >
            See what this could mean
          </Button>
        </div>
      </Card>
    </motion.article>
  );
}
