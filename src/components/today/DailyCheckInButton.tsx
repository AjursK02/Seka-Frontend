import { NotebookPen } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Button } from "../common/Button";

export interface DailyCheckInButtonProps {
  label: string;
  to?: string;
}

export function DailyCheckInButton({ label, to = "/patterns" }: DailyCheckInButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
      className="flex justify-center"
    >
      <Button
        variant="primary"
        size="lg"
        className="w-full justify-center rounded-2xl text-base shadow-soft sm:w-auto"
        leadingIcon={<NotebookPen className="h-5 w-5" />}
        onClick={() => navigate(to)}
      >
        {label}
      </Button>
    </motion.div>
  );
}
