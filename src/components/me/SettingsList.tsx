import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import type { ProfileSettingItem } from "../../types/me";

export interface SettingsListProps {
  items: ProfileSettingItem[];
  onItemClick?: (id: string) => void;
}

export function SettingsList({ items, onItemClick }: SettingsListProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
      className="space-y-4"
    >
      <Typography as="h2" variant="micro" className="px-2 text-text-muted">
        Account & Settings
      </Typography>

      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isWarning = item.tone === "warning";

          return (
            <Card
              key={item.id}
              tone="subtle"
              className="px-4 py-4 transition-all hover:border-primary/20 hover:bg-surface lg:px-5"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => onItemClick?.(item.id)}
              >
                <span className="flex items-center gap-4">
                  <span
                    className={[
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      isWarning
                        ? "bg-primary-soft text-text-muted"
                        : "bg-surface-strong text-primary",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <Typography
                    as="span"
                    variant="body"
                    className={isWarning ? "text-text-muted" : "text-text"}
                  >
                    {item.label}
                  </Typography>
                </span>

                {isWarning ? null : <ChevronRight className="h-5 w-5 text-text-muted" />}
              </button>
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
}
