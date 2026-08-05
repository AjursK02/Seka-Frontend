import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import { ConfidenceBadge } from "./ConfidenceBadge";
import type { Discovery } from "../../types/patterns";

export interface DiscoveryCardProps {
  discovery: Discovery;
  index: number;
}

export function DiscoveryCard({ discovery, index }: DiscoveryCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = discovery.icon;
  const CategoryIcon = discovery.category.icon;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      <Card className="flex h-full min-h-[260px] flex-col gap-5 lg:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-text-muted">
                <CategoryIcon className="h-4 w-4" />
                <Typography as="p" variant="micro">
                  {discovery.category.label}
                </Typography>
              </div>
              <Typography as="h3" variant="title" className="mt-1 max-w-[28ch]">
                {discovery.title}
              </Typography>
            </div>
          </div>
          <ConfidenceBadge confidence={discovery.confidence} />
        </div>

        <Typography variant="bodyMuted" className="max-w-[52ch]">
          {discovery.summary}
        </Typography>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-outline/70 pt-4">
          <Typography as="p" variant="micro" className="text-text-muted">
            {discovery.evidence}
          </Typography>
          <Button
            variant="ghost"
            size="sm"
            trailingIcon={<ArrowUpRight className="h-4 w-4" />}
            className="px-0 text-primary hover:bg-transparent"
          >
            {discovery.ctaLabel}
          </Button>
        </div>
      </Card>
    </motion.article>
  );
}
