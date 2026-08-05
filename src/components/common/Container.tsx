import type { ReactNode } from "react";
import clsx from "clsx";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={clsx("mx-auto w-full max-w-content px-6", className)}>{children}</div>;
}
