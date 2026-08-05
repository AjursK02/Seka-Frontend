import type { ReactNode } from "react";

import { Card } from "./Card";
import { Button } from "./Button";
import { Typography } from "./Typography";

export interface ErrorStateProps {
  title?: ReactNode;
  description?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  actionLabel = "Retry",
  onAction,
}: ErrorStateProps) {
  return (
    <Card className="text-center">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4">
        <Typography as="h2" variant="title">
          {title}
        </Typography>
        <Typography variant="bodyMuted">{description}</Typography>
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </Card>
  );
}
