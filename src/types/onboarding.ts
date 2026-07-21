export interface OnboardingAnswers {
  q1: string;
  q2: string;
  q3: string;
}

export type UserGroup =
  | "GROUP_1"
  | "GROUP_2"
  | "GROUP_3"
  | "GROUP_4";

export interface GroupResult {
  group: UserGroup;
  title: string;
  message: string;
}

export interface OnboardingOption {
  label: string;
  value: string;
}

export interface OnboardingQuestion {
  id: keyof OnboardingAnswers;
  title: string;
  description: string;
  options: OnboardingOption[];
}
