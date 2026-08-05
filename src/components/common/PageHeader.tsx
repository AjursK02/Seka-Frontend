import clsx from "clsx";

import type { PageHeaderProps } from "../../types/today";

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: PageHeaderProps) {
  return (
    <header className={clsx("space-y-3", className)}>
      {eyebrow ? (
        <p
          className={clsx(
            "text-[0.72rem] font-bold uppercase tracking-[0.24em] text-primary",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-2">
        <h1
          className={clsx(
            "font-display text-[2.15rem] leading-[1.05] tracking-[-0.02em] text-text sm:text-[2.7rem]",
            titleClassName,
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={clsx("max-w-[28ch] text-sm leading-6 text-text-muted sm:text-base", descriptionClassName)}
          >
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
