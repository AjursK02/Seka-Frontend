import { buildApiUrl } from "../utils/apiBaseUrl";
import type { AuthResponse, AuthUser } from "./types";

const ACCESS_TOKEN_KEY = "seka_access_token";
const USER_KEY = "seka_user";

const requestJson = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(buildApiUrl(path), {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const payload = (await response.json()) as T;

  if (!response.ok) {
    throw payload;
  }

  return payload;
};

export const authStorage = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setSession(accessToken: string, user: AuthUser) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clearSession() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  getStoredUser() {
    const serialized = localStorage.getItem(USER_KEY);

    if (!serialized) {
      return null;
    }

    try {
      return JSON.parse(serialized) as AuthUser;
    } catch {
      return null;
    }
  },
};

export const signupRequest = (payload: {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
}) =>
  requestJson<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const loginRequest = (payload: {
  email: string;
  password: string;
}) =>
  requestJson<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const verifyEmailRequest = (payload: {
  email: string;
  code: string;
}) =>
  requestJson<AuthResponse>("/api/auth/verify-email", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const resendVerificationCodeRequest = (payload: {
  email: string;
}) =>
  requestJson<AuthResponse>("/api/auth/resend-verification-code", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const forgotPasswordRequest = (payload: {
  email: string;
}) =>
  requestJson<AuthResponse>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const verifyForgotPasswordCodeRequest = (payload: {
  email: string;
  code: string;
}) =>
  requestJson<AuthResponse>("/api/auth/forgot-password/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const resetPasswordRequest = (payload: {
  resetToken: string;
  password: string;
  confirmPassword: string;
}) =>
  requestJson<AuthResponse>("/api/auth/forgot-password/reset", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const refreshRequest = () =>
  requestJson<AuthResponse>("/api/auth/refresh", {
    method: "POST",
  });

export const logoutRequest = () =>
  requestJson<AuthResponse>("/api/auth/logout", {
    method: "POST",
  });

export const meRequest = (accessToken: string) =>
  requestJson<AuthResponse>("/api/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const updateOnboardingRequest = (
  accessToken: string,
  payload: {
    onboardingAnswers: {
      pcosConcern: string[];
      periodFrequency: string;
      symptomsNoticed: string[];
      symptomsNoticedCustom: string;
      symptomDuration: string;
      symptomDurationCustom: string;
      previousTests: string[];
    };
  }
) =>
  requestJson<AuthResponse>("/api/auth/onboarding", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });
