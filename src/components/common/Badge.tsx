import type { ReactNode } from "react";
import clsx from "clsx";

export interface BadgeProps {
  children: ReactNode;
  tone?: "default" | "strong" | "subtle";
  className?: string;
}

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-primary-soft text-primary",
  strong: "bg-primary text-white",
  subtle: "bg-surface-muted text-text-muted",
};

export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
