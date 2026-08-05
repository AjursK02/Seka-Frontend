import { motion, useReducedMotion } from "framer-motion";

import { Avatar } from "../common/Avatar";
import { Badge } from "../common/Badge";
import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import type { PatternsPageContent } from "../../types/patterns";

export interface PatternHeaderProps {
  content: PatternsPageContent;
}

export function PatternHeader({ content }: PatternHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Card tone="strong" className="overflow-hidden">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 lg:max-w-3xl">
            <Badge tone="strong">{content.eyebrow}</Badge>
            <div className="space-y-2">
              <Typography
                as="h1"
                variant="display"
                className="max-w-[12ch] text-text sm:max-w-[14ch] lg:max-w-[12ch]"
              >
                {content.title}
              </Typography>
              <Typography variant="bodyMuted" className="max-w-2xl sm:text-base">
                {content.description}
              </Typography>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 rounded-3xl border border-white/60 bg-white/70 px-4 py-3 shadow-soft backdrop-blur-xl lg:w-auto">
            <Avatar
              name={content.avatarName}
              initials={content.avatarInitials}
              alt={content.avatarLabel}
              size="lg"
            />
            <div>
              <Typography as="p" variant="micro" className="text-text-muted">
                {content.liveLabel}
              </Typography>
              <Typography as="p" variant="title" className="text-text">
                {content.avatarLabel}
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </motion.section>
  );
}
