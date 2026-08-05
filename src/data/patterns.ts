import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  ForkKnife,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import type {
  Discovery,
  PatternCategory,
  PatternTimelineEntry,
  PatternsPageContent,
} from "../types/patterns";

export const patternsPageContent: PatternsPageContent = {
  eyebrow: "Patterns",
  title: "Discoveries worth tracking",
  description:
    "SEKA is continuously analyzing your signals to uncover subtle patterns in your well-being.",
  avatarLabel: "SEKA Pattern Scan",
  avatarInitials: "S",
  avatarName: "SEKA",
  liveLabel: "Live scan",
};

export const patternCategories: PatternCategory[] = [
  {
    id: "sleep-energy",
    label: "Sleep & Energy",
    icon: BedDouble,
    description: "See how your recovery shifts after shorter sleep.",
    count: 4,
  },
  {
    id: "cycle",
    label: "Cycle",
    icon: RotateCcw,
    description: "Track cycle timing changes against your recent baseline.",
    count: 3,
  },
  {
    id: "nutrition",
    label: "Nutrition",
    icon: ForkKnife,
    description: "Watch cravings and meal timing as your routine evolves.",
    count: 2,
  },
];

export const discoveries: Discovery[] = [
  {
    id: "sleep-energy",
    category: {
      label: "Sleep & Energy",
      icon: BedDouble,
    },
    title: "Your energy has been lower on days following shorter sleep.",
    summary:
      "SEKA has noticed this relationship across your recent recovery window and is watching the trend for stronger confirmation.",
    confidence: {
      level: "high",
      label: "High Confidence",
      tone: "strong",
    },
    evidence: "SEKA has noticed this 4 times",
    ctaLabel: "Explore details",
    icon: Sparkles,
  },
  {
    id: "cycle-duration",
    category: {
      label: "Cycle",
      icon: RotateCcw,
    },
    title: "Your last three cycles have been longer than your recent average.",
    summary:
      "The current variance suggests a gentle shift rather than a one-off change, so SEKA is comparing it with your longer trendline.",
    confidence: {
      level: "moderate",
      label: "Moderate Confidence",
    },
    evidence: "This is a 15% change",
    ctaLabel: "View timeline",
    icon: CalendarDays,
  },
  {
    id: "cravings",
    category: {
      label: "Cravings",
      icon: ForkKnife,
    },
    title: "You've reported stronger cravings more frequently this week.",
    summary:
      "SEKA is monitoring this to find correlations with movement, sleep, and your recovery cadence.",
    confidence: {
      level: "learning",
      label: "Still Learning",
      tone: "subtle",
    },
    evidence: "Needs more data",
    ctaLabel: "Log a meal",
    icon: ArrowRight,
  },
];

export const patternTimeline: PatternTimelineEntry[] = [
  {
    id: "timeline-1",
    label: "Today",
    title: "Energy forecast is trending upward.",
    detail: "Your morning temperature and sleep window are aligned with a steadier day.",
    status: "positive",
    icon: TrendingUp,
  },
  {
    id: "timeline-2",
    label: "Yesterday",
    title: "Cravings peaked after a shorter rest period.",
    detail: "SEKA is comparing this with the previous two weeks to reduce noise.",
    status: "watching",
    icon: ForkKnife,
  },
  {
    id: "timeline-3",
    label: "This week",
    title: "Cycle timing is still shifting.",
    detail: "The pattern is visible, but SEKA wants a few more cycles before confirming it.",
    status: "learning",
    icon: CalendarDays,
  },
];
