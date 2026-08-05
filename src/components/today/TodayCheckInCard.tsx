import { motion, useReducedMotion } from "framer-motion";
import { NotebookPen } from "lucide-react";

import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import type { TodayCheckInContent } from "../../types/today";

export interface TodayCheckInCardProps {
  content: TodayCheckInContent;
  onCheckIn?: () => void;
}

export function TodayCheckInCard({ content, onCheckIn }: TodayCheckInCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
    >
      <Card className="relative overflow-hidden text-center lg:min-h-[220px] lg:p-8">
        <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-primary-soft/70 blur-3xl" />
        <div className="relative flex flex-col items-center gap-5">
          <Typography as="p" variant="headline" className="max-w-2xl text-text sm:text-2xl lg:text-[2rem]">
            {content.title}
          </Typography>
          <Button
            variant="primary"
            size="lg"
            className="w-full justify-center rounded-xl px-8 sm:w-auto"
            leadingIcon={<NotebookPen className="h-5 w-5" />}
            onClick={onCheckIn}
          >
            {content.ctaLabel}
          </Button>
        </div>
      </Card>
    </motion.article>
  );
}
