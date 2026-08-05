import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

import type { CardTone } from "../../types/today";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
  children: ReactNode;
}

const toneClasses: Record<CardTone, string> = {
  default: "bg-surface border-outline/70",
  subtle: "bg-background border-primary/10",
  strong: "bg-surface-strong border-transparent",
};

export function Card({
  className,
  tone = "default",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border p-5 shadow-soft",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
