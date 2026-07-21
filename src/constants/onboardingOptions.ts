import type { OnboardingQuestion } from "../types/onboarding";

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: "q1",
    title: "How regular is your cycle right now?",
    description:
      "Choose the option that feels closest to your current experience.",
    options: [
      { label: "Arrive regularly", value: "Arrive regularly" },
      { label: "Often late", value: "Often late" },
      { label: "Skip months", value: "Skip months" },
      { label: "Never know", value: "Never know" },
    ],
  },
  {
    id: "q2",
    title: "What is the biggest thing you want help with?",
    description:
      "Your main challenge helps us understand which support path fits best.",
    options: [
      { label: "Losing weight", value: "Losing weight" },
      { label: "Feeling tired / Low energy", value: "Feeling tired / Low energy" },
      { label: "Irregular periods", value: "Irregular periods" },
      { label: "Acne / Facial Hair", value: "Acne / Facial Hair" },
    ],
  },
  {
    id: "q3",
    title: "What do you want Seka to help you do?",
    description:
      "This helps us match you with the most useful daily support.",
    options: [
      { label: "Understand my symptoms", value: "Understand my symptoms" },
      {
        label: "Keep me consistent with healthy habits",
        value: "Keep me consistent with healthy habits",
      },
      { label: "Help regulate my cycle", value: "Help regulate my cycle" },
      { label: "Tell me what to eat today", value: "Tell me what to eat today" },
    ],
  },
];
