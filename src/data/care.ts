import { HeartPulse, Mic, Sparkles, Thermometer } from "lucide-react";

import type { CarePageContent } from "../types/care";

export const carePageContent: CarePageContent = {
  title: "How can I help you understand your body today?",
  prompts: [
    { id: "bloating", label: "Why am I feeling bloated?" },
    { id: "gp", label: "Help me prepare for my GP visit" },
    { id: "energy", label: "Explain my recent energy dip" },
  ],
  messages: [],
  composerPlaceholder: "Type or speak...",
};

export const careQuickStats = [
  {
    id: "sleep",
    icon: Thermometer,
    label: "Sleep trend",
    value: "5.5 hrs",
  },
  {
    id: "energy",
    icon: Sparkles,
    label: "Energy state",
    value: "Low",
  },
  {
    id: "pulse",
    icon: HeartPulse,
    label: "Cycle phase",
    value: "Luteal",
  },
];

export const careComposerActions = [
  {
    id: "voice",
    icon: Mic,
    label: "Voice input",
  },
];
