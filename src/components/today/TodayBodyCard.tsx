import { motion, useReducedMotion } from "framer-motion";

import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import type { TodayBentoContent } from "../../types/today";

export interface TodayBodyCardProps {
  content: TodayBentoContent;
}

export function TodayBodyCard({ content }: TodayBodyCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = content.icon;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
    >
      <Card className="relative min-h-[180px] overflow-hidden lg:min-h-[240px] lg:p-6">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-secondary-container/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between gap-4">
          <div className="flex items-center gap-2 text-secondary">
            <Icon className="h-5 w-5" />
            <Typography as="p" variant="micro" className="text-secondary">
              {content.eyebrow}
            </Typography>
          </div>
          <Typography as="p" variant="body" className="max-w-4xl text-text sm:text-lg lg:text-xl">
            {content.title}
          </Typography>
          <Typography variant="bodyMuted" className="max-w-2xl">
            {content.text}
          </Typography>
        </div>
      </Card>
    </motion.article>
  );
}
