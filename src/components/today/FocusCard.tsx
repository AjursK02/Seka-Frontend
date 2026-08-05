import { Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Card } from "../common/Card";
import { SectionTitle } from "../common/SectionTitle";
import type { FocusCardContent } from "../../types/today";

export interface FocusCardProps {
  content: FocusCardContent;
}

export function FocusCard({ content }: FocusCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = content.icon ?? Sparkles;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
    >
      <Card className="relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary-soft/70 blur-2xl" />
        <div className="relative space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Icon className="h-4 w-4" />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.24em]">
              {content.eyebrow}
            </span>
          </div>
          <SectionTitle
            eyebrow=""
            title={content.title}
            titleClassName="text-[1.35rem] font-display leading-tight sm:text-[1.5rem]"
            className="space-y-0"
            eyebrowClassName="sr-only"
          />
        </div>
      </Card>
    </motion.article>
  );
}
