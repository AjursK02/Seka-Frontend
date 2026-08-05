import {
  CalendarDays,
  ArrowRight,
  Activity,
  HeartPulse,
  UserRound,
  ChartSpline,
  Sparkles,
  Thermometer,
} from "lucide-react";

import type {
  NavigationItem,
  Profile,
  TodayPageContent,
  TodayScreenContent,
} from "../types/today";

export const profile: Profile = {
  name: "Mira",
  role: "Your AI Care Manager",
  initials: "M",
};

export const navigationItems: NavigationItem[] = [
  {
    id: "today",
    label: "Today",
    href: "/today",
    icon: CalendarDays,
  },
  {
    id: "care",
    label: "Care",
    href: "/care",
    icon: HeartPulse,
  },
  {
    id: "patterns",
    label: "Patterns",
    href: "/patterns",
    icon: ChartSpline,
  },
  {
    id: "me",
    label: "Me",
    href: "/me",
    icon: UserRound,
  },
];

export const todayPageContent: TodayPageContent = {
  hero: {
    eyebrow: "Today",
    title: "Good morning.",
    highlight: "Your body is moving into a new phase.",
  },
  focus: {
    eyebrow: "Today's Focus",
    title: "Focus on gentle movement today.",
    icon: Sparkles,
  },
  insight: {
    eyebrow: "What SEKA noticed",
    text: "Your temperature has stabilized overnight.",
    icon: Thermometer,
  },
  cycle: {
    eyebrow: "Cycle Context",
    dayLabel: "Day 14",
    text: "Follicular phase transition detected. Energy levels may fluctuate.",
  },
  checkInLabel: "Daily Check-in",
};

export const todayScreenContent: TodayScreenContent = {
  hero: {
    eyebrow: "Today",
    title: "Good morning, Sarah.",
    highlight: "Here's what I'm noticing today.",
  },
  body: {
    eyebrow: "Your Body",
    title:
      "You're on day 42 of your cycle. You've mentioned feeling more tired than usual this week.",
    text: "Your current signal pattern suggests this change is worth tracking alongside rest and recovery.",
    icon: Activity,
  },
  insight: {
    eyebrow: "I Noticed Something",
    title:
      "Your energy has been lower on nights when you've slept less. We've seen this a few times now.",
    text: "We can keep watching this pattern and compare it with your cycle phase and recovery window.",
    icon: ArrowRight,
  },
  plan: {
    eyebrow: "Today",
    title: "Let's keep things simple.",
    steps: [
      {
        id: "step-1",
        label: "1",
        text: "Eat something balanced",
      },
      {
        id: "step-2",
        label: "2",
        text: "Get some movement",
      },
      {
        id: "step-3",
        label: "3",
        text: "Give yourself time to recover",
      },
    ],
    ctaLabel: "See today's plan",
  },
  checkIn: {
    title: "How are you feeling today?",
    ctaLabel: "Check in with SEKA",
  },
};
