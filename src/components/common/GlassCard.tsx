import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/60 bg-white/70 shadow-soft backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
