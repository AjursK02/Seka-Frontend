import type { LucideIcon } from "lucide-react";

export interface MeProfile {
  name: string;
  role: string;
  initials: string;
  imageUrl?: string;
  email?: string;
  mobileNumber?: string;
}

export interface ProfileTag {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export interface ProfileHighlightCard {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tone?: "default" | "subtle" | "strong";
  meta?: string;
  activityLabel?: string;
}

export interface ProfileSettingItem {
  id: string;
  label: string;
  icon: LucideIcon;
  tone?: "default" | "warning";
}

export interface MePageContent {
  eyebrow: string;
  title: string;
  description: string;
  avatarLabel: string;
}
