import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface CarePrompt {
  id: string;
  label: string;
}

export interface CareMessage {
  id: string;
  sender: "user" | "seka";
  label?: string;
  time?: string;
  text: string;
}

export interface CareEvidence {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CarePageContent {
  title: string;
  prompts: CarePrompt[];
  messages: CareMessage[];
  evidence?: CareEvidence;
  composerPlaceholder: string;
}

export interface CarePageSectionProps {
  children: ReactNode;
  className?: string;
}
