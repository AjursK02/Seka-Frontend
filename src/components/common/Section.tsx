import type { ReactNode } from "react";
import clsx from "clsx";

export interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return <section className={clsx("space-y-4", className)}>{children}</section>;
}
