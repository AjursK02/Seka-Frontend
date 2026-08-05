import type { ElementType, ReactNode } from "react";
import clsx from "clsx";

type TypographyVariant =
  | "display"
  | "headline"
  | "title"
  | "body"
  | "bodyMuted"
  | "label"
  | "micro";

export interface TypographyProps {
  as?: ElementType;
  variant?: TypographyVariant;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<TypographyVariant, string> = {
  display: "font-display text-[2.15rem] leading-[1.05] tracking-[-0.02em] sm:text-[2.7rem]",
  headline: "text-xl font-semibold leading-tight sm:text-2xl",
  title: "text-lg font-semibold leading-tight sm:text-xl",
  body: "text-sm leading-6 text-text sm:text-base",
  bodyMuted: "text-sm leading-6 text-text-muted sm:text-base",
  label: "text-[0.72rem] font-bold uppercase tracking-[0.24em]",
  micro: "text-[0.7rem] font-semibold uppercase tracking-[0.2em]",
};

export function Typography({
  as: Component = "p",
  variant = "body",
  className,
  children,
}: TypographyProps) {
  return <Component className={clsx(variantClasses[variant], className)}>{children}</Component>;
}
