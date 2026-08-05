import type { LucideIcon } from "lucide-react";

export type ConfidenceLevel = "high" | "moderate" | "learning";

export interface PatternCategory {
  id?: string;
  label: string;
  icon: LucideIcon;
  description?: string;
  count?: number;
}

export interface PatternConfidence {
  level: ConfidenceLevel;
  label: string;
  tone?: "default" | "subtle" | "strong";
}

export interface Discovery {
  id: string;
  category: PatternCategory;
  title: string;
  summary: string;
  confidence: PatternConfidence;
  evidence: string;
  ctaLabel: string;
  icon: LucideIcon;
}

export type TimelineStatus = "positive" | "watching" | "learning";

export interface PatternTimelineEntry {
  id: string;
  label: string;
  title: string;
  detail: string;
  status: TimelineStatus;
  icon: LucideIcon;
}

export interface PatternsPageContent {
  eyebrow: string;
  title: string;
  description: string;
  avatarLabel: string;
  avatarInitials: string;
  avatarName: string;
  liveLabel: string;
}
