import clsx from "clsx";

export interface GradientBackgroundProps {
  className?: string;
}

export function GradientBackground({ className }: GradientBackgroundProps) {
  return (
    <div className={clsx("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-soft/70 blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-4rem] h-80 w-80 rounded-full bg-surface-strong/70 blur-3xl" />
    </div>
  );
}
