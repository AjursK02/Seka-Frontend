import clsx from "clsx";

import type { SectionTitleProps } from "../../types/today";

export function SectionTitle({
  eyebrow,
  title,
  description,
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: SectionTitleProps) {
  return (
    <div className={clsx("space-y-2", className)}>
      <p
        className={clsx(
          "text-[0.7rem] font-bold uppercase tracking-[0.24em] text-text-muted",
          eyebrowClassName,
        )}
      >
        {eyebrow}
      </p>
      <div className="space-y-1">
        <h2
          className={clsx(
            "text-lg font-semibold leading-tight text-text sm:text-xl",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={clsx(
              "text-sm leading-6 text-text-muted",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
