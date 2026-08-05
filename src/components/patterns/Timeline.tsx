import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import type { PatternTimelineEntry } from "../../types/patterns";

export interface TimelineProps {
  items: PatternTimelineEntry[];
}

const statusClasses: Record<PatternTimelineEntry["status"], string> = {
  positive: "bg-emerald-500",
  watching: "bg-primary",
  learning: "bg-surface-strong",
};

export function Timeline({ items }: TimelineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Card tone="subtle" className="space-y-5 lg:p-6">
        <div className="space-y-1">
          <Typography as="h2" variant="title">
            Timeline
          </Typography>
          <Typography variant="bodyMuted">
            A short history of the latest signals SEKA is watching.
          </Typography>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.id} className="flex gap-4 lg:flex-col">
                <div className="flex flex-col items-center lg:flex-row lg:items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
                    <Icon className="h-4 w-4" />
                  </span>
                  {index < items.length - 1 ? (
                    <span className="mt-2 h-full w-px flex-1 bg-outline lg:ml-4 lg:mt-0 lg:h-px lg:w-full" />
                  ) : null}
                </div>

                <div className="flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Typography as="p" variant="micro" className="text-text-muted">
                      {item.label}
                    </Typography>
                    <span
                      className={clsx(
                        "h-2 w-2 rounded-full",
                        statusClasses[item.status],
                      )}
                    />
                  </div>
                  <Typography as="h3" variant="title" className="mt-1">
                    {item.title}
                  </Typography>
                  <Typography variant="bodyMuted" className="mt-1">
                    {item.detail}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.section>
  );
}
