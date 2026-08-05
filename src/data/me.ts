import {
  Bell,
  ChevronRight,
  ClipboardList,
  Dna,
  FlaskConical,
  HeartPulse,
  NotebookPen,
  LogOut,
  Activity,
  Pencil,
  Target,
  Shield,
  UserRoundCog,
} from "lucide-react";

import type {
  MePageContent,
  MeProfile,
  ProfileHighlightCard,
  ProfileSettingItem,
  ProfileTag,
} from "../types/me";

export const meProfile: MeProfile = {
  name: "Mira",
  role: "Your AI Care Manager",
  initials: "M",
};

export const mePageContent: MePageContent = {
  eyebrow: "Me",
  title: "Your Profile",
  description: "Manage your health data and preferences.",
  avatarLabel:
    "A refined, modern portrait of a calm individual in soft, natural lighting.",
};

export const profileTags: ProfileTag[] = [
  {
    id: "inflammatory",
    label: "Inflammatory Type",
  },
  {
    id: "fatigue",
    label: "Goal: Manage Fatigue",
  },
];

export const profileHighlights: ProfileHighlightCard[] = [
  {
    id: "health-profile",
    title: "PCOS",
    subtitle: "Health Profile",
    icon: Dna,
    tone: "subtle",
    meta: "Inflammatory Type",
    activityLabel: "Goal: Manage Fatigue",
  },
  {
    id: "lab-reports",
    title: "Lab Reports",
    subtitle: "3 Documents",
    icon: FlaskConical,
    tone: "default",
    meta: "Last uploaded Jul 12",
  },
  {
    id: "my-goals",
    title: "Manage Fatigue",
    subtitle: "My Goals",
    icon: Target,
    tone: "strong",
    meta: "Current focus",
    activityLabel: "Daily recovery + balanced meals",
  },
  {
    id: "health-data",
    title: "Health Data",
    subtitle: "Synced from HealthKit",
    icon: Activity,
    tone: "default",
    meta: "Sync Active",
  },
  {
    id: "visit-summary",
    title: "Visit Summary",
    subtitle: "Prepare for my Doctor",
    icon: ClipboardList,
    tone: "subtle",
    meta: "Last 30 days",
    activityLabel: "Open summary",
  },
];

export const profileSettings: ProfileSettingItem[] = [
  {
    id: "personal",
    label: "Personal Information",
    icon: UserRoundCog,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    icon: Shield,
  },
  {
    id: "health-context",
    label: "Health Context",
    icon: NotebookPen,
  },
  {
    id: "logout",
    label: "Log Out",
    icon: LogOut,
    tone: "warning",
  },
];

export const profileAccentIcons = {
  edit: Pencil,
  chevronRight: ChevronRight,
  pulse: HeartPulse,
} as const;
