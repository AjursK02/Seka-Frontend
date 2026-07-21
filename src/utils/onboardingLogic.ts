import { GROUP_RESPONSES } from "../constants/onboardingResponses";
import type {
  GroupResult,
  OnboardingAnswers,
} from "../types/onboarding";

export const getUserGroup = (
  answers: OnboardingAnswers
): GroupResult => {
  const { q1, q2, q3 } = answers;

  if (
    ["Arrive regularly", "Often late"].includes(q1) &&
    ["Losing weight", "Feeling tired / Low energy"].includes(q2) &&
    [
      "Understand my symptoms",
      "Keep me consistent with healthy habits",
    ].includes(q3)
  ) {
    return GROUP_RESPONSES.GROUP_1;
  }

  if (
    ["Often late", "Skip months", "Never know"].includes(q1) &&
    q2 === "Irregular periods" &&
    q3 === "Help regulate my cycle"
  ) {
    return GROUP_RESPONSES.GROUP_2;
  }

  if (
    [
      "Acne / Facial Hair",
      "Feeling tired / Low energy",
      "Losing weight",
    ].includes(q2) &&
    [
      "Understand my symptoms",
      "Tell me what to eat today",
    ].includes(q3)
  ) {
    return GROUP_RESPONSES.GROUP_3;
  }

  return GROUP_RESPONSES.GROUP_4;
};
