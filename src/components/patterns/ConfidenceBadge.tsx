import { Badge } from "../common/Badge";
import type { PatternConfidence } from "../../types/patterns";

export interface ConfidenceBadgeProps {
  confidence: PatternConfidence;
}

const toneByLevel: Record<PatternConfidence["level"], "default" | "strong" | "subtle"> = {
  high: "strong",
  moderate: "default",
  learning: "subtle",
};

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  return <Badge tone={toneByLevel[confidence.level]}>{confidence.label}</Badge>;
}
