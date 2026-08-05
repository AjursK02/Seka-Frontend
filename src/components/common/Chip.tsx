import type { ReactNode } from "react";
import clsx from "clsx";

export interface ChipProps {
  children: ReactNode;
  className?: string;
}

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-outline bg-surface px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
