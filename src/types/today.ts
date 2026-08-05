import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface Profile {
  name: string;
  role: string;
  initials: string;
  imageUrl?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface TodayHeroContent {
  eyebrow: string;
  title: string;
  highlight: string;
}

export interface FocusCardContent {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
}

export interface InsightCardContent {
  eyebrow: string;
  text: string;
  icon: LucideIcon;
}

export interface CycleContextContent {
  eyebrow: string;
  dayLabel: string;
  text: string;
}

export interface TodayPageContent {
  hero: TodayHeroContent;
  focus: FocusCardContent;
  insight: InsightCardContent;
  cycle: CycleContextContent;
  checkInLabel: string;
}

export interface TodayBentoContent {
  eyebrow: string;
  title: ReactNode;
  text: string;
  icon: LucideIcon;
}

export interface TodayPlanItem {
  id: string;
  label: string;
  text: string;
}

export interface TodayPlanContent {
  eyebrow: string;
  title: string;
  steps: TodayPlanItem[];
  ctaLabel: string;
}

export interface TodayCheckInContent {
  title: string;
  ctaLabel: string;
}

export interface TodayScreenContent {
  hero: TodayHeroContent;
  body: TodayBentoContent;
  insight: TodayBentoContent;
  plan: TodayPlanContent;
  checkIn: TodayCheckInContent;
}

export interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export interface SectionTitleProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export type CardTone = "default" | "subtle" | "strong";
