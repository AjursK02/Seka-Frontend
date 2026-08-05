export interface AuthUser {
  id: string;
  name: string;
  email: string;
  mobileNumber?: string;
  isEmailVerified?: boolean;
  isOnboarded?: boolean;
  onboardingAnswers?: {
    pcosConcern: string[];
    periodFrequency: string;
    symptomsNoticed: string[];
    symptomsNoticedCustom: string;
    symptomDuration: string;
    symptomDurationCustom: string;
    previousTests: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  user?: AuthUser;
  resetToken?: string;
  verificationRequired?: boolean;
  errors?: Record<string, string>;
}

export interface AuthState {
  status: "loading" | "authenticated" | "unauthenticated";
  user: AuthUser | null;
  accessToken: string | null;
}
