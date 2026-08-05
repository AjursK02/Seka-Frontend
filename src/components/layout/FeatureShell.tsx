import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import { Button } from "../common/Button";

export interface FeatureShellProps {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
}

export function FeatureShell({ eyebrow, title, description, actionLabel }: FeatureShellProps) {
  return (
    <Card className="space-y-4">
      <Typography as="p" variant="micro" className="text-primary">
        {eyebrow}
      </Typography>
      <div className="space-y-2">
        <Typography as="h1" variant="display">
          {title}
        </Typography>
        <Typography variant="bodyMuted" className="max-w-2xl">
          {description}
        </Typography>
      </div>
      <Button variant="secondary" className="w-full sm:w-auto">
        {actionLabel}
      </Button>
    </Card>
  );
}
