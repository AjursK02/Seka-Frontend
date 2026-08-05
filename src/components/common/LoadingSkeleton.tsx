import clsx from "clsx";

export interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return <div className={clsx("animate-pulse rounded-2xl bg-surface-strong", className)} />;
}
