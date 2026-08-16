export type ContextLogKind = "symptom" | "sleep" | "water";

export interface ContextProfile {
  id: string;
  name: string;
  email: string;
  mobileNumber?: string;
  isEmailVerified?: boolean;
  isOnboarded?: boolean;
  onboardingAnswers?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContextLogEntry {
  id: string;
  kind: ContextLogKind;
  title?: string;
  value?: string;
  amount?: number | null;
  unit?: string;
  severity?: string;
  notes?: string;
  recordedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContextCycle {
  id: string;
  startDate: string;
  endDate?: string | null;
  status?: string;
  cycleLength?: number | null;
  periodLength?: number | null;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContextMedication {
  id: string;
  name: string;
  dosage?: string;
  frequency?: string;
  isActive?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContextReport {
  id: string;
  title: string;
  reportType?: string;
  fileUrl?: string;
  fileName?: string;
  notes?: string;
  uploadedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OnboardingContextSummaryItem {
  label: string;
  value: string;
}

export interface OnboardingContextData {
  answers: Record<string, unknown>;
  summary: OnboardingContextSummaryItem[];
}

export interface StructuredContext {
  profile: ContextProfile | null;
  onboardingContext: OnboardingContextData | null;
  cycle: ContextCycle | null;
  symptoms: ContextLogEntry[];
  sleep: ContextLogEntry[];
  water: ContextLogEntry[];
  medications: ContextMedication[];
  reports: ContextReport[];
}

export interface ContextResponse {
  success: boolean;
  message?: string;
  context?: StructuredContext;
  data?: unknown;
}
