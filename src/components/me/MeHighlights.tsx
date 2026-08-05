import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "../common/Badge";
import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import type { ProfileHighlightCard, ProfileTag } from "../../types/me";

export interface MeHighlightsProps {
  highlights: ProfileHighlightCard[];
  tags: ProfileTag[];
}

export function MeHighlights({ highlights, tags }: MeHighlightsProps) {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"
    >
      {highlights.map((highlight, index) => {
        const Icon = highlight.icon;
        const isLarge = index === 0;
        const isVisitSummary = highlight.id === "visit-summary";

        const cardContent = (
          <div
            className={
              isLarge
                ? "relative flex flex-col gap-5 overflow-hidden lg:min-h-[230px]"
                : "flex flex-col gap-4"
            }
          >
            {index === 0 ? (
              <div className="absolute -right-6 -top-8 h-32 w-32 rounded-full bg-primary-soft/70 blur-3xl" />
            ) : null}

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <Typography as="p" variant="micro" className="text-text-muted">
                  {highlight.subtitle}
                </Typography>
                <Typography as="h2" variant={isLarge ? "headline" : "title"} className="mt-1">
                  {highlight.title}
                </Typography>
              </div>

              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-primary shadow-soft">
                <Icon className="h-5 w-5" />
              </span>
            </div>

            {index === 0 ? (
              <div className="relative flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag.id} tone="subtle" className="normal-case tracking-normal">
                    {tag.label}
                  </Badge>
                ))}
              </div>
            ) : null}

            {highlight.meta ? (
              <div className="relative mt-auto border-t border-outline/60 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <Typography as="p" variant="micro" className="text-text-muted">
                    {highlight.meta}
                  </Typography>
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            ) : null}

            {highlight.activityLabel ? (
              <div className="relative flex flex-wrap gap-2">
                <Badge tone="default" className="normal-case tracking-normal">
                  {highlight.activityLabel}
                </Badge>
              </div>
            ) : null}
          </div>
        );

        if (isVisitSummary) {
          return (
            <motion.button
              key={highlight.id}
              type="button"
              initial={false}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              onClick={() => navigate("/me/prepare-for-visit")}
              className="group w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Card
                tone={highlight.tone ?? "default"}
                className="h-full border-outline/60 transition-all duration-200 group-hover:border-primary/20 group-hover:shadow-[0_14px_30px_rgba(91,37,26,0.12)]"
              >
                {cardContent}
              </Card>
            </motion.button>
          );
        }

        return (
          <Card
            key={highlight.id}
            tone={highlight.tone ?? "default"}
            className={index === 0 ? "md:col-span-2 lg:col-span-2" : undefined}
          >
            {cardContent}
          </Card>
        );
      })}
    </motion.section>
  );
}
