import type { ReactNode } from "react";

import { Card } from "./Card";
import { Button } from "./Button";
import { Typography } from "./Typography";

export interface EmptyStateProps {
  title: ReactNode;
  description: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Card className="text-center">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4">
        <Typography as="h2" variant="title">
          {title}
        </Typography>
        <Typography variant="bodyMuted" className="max-w-md">
          {description}
        </Typography>
        {actionLabel ? (
          <Button variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
