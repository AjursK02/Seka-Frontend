import { buildApiUrl } from "../utils/apiBaseUrl";
import { authStorage } from "../auth/authApi";
import type { ContextLogKind, ContextResponse } from "../types/context";
import { cachedRequest, invalidateRequestCache } from "../utils/requestCache";

const requestJson = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const token = authStorage.getAccessToken();
  const response = await fetch(buildApiUrl(path), {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const payload = (await response.json()) as T;

  if (!response.ok) {
    throw payload;
  }

  return payload;
};

export const getContextRequest = () =>
  cachedRequest("context:root", 15000, () =>
    requestJson<ContextResponse>("/api/v1/context", {
      method: "GET",
    }),
  );

export const createContextLogRequest = (payload: {
  kind: ContextLogKind;
  title?: string;
  value?: string;
  amount?: number;
  unit?: string;
  severity?: string;
  notes?: string;
  recordedAt?: string;
  metadata?: Record<string, unknown>;
}) =>
  requestJson<ContextResponse>("/api/v1/context/logs", {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((response) => {
    invalidateRequestCache("context:");
    return response;
  });

export const createCycleRequest = (payload: {
  startDate: string;
  endDate?: string;
  status?: string;
  cycleLength?: number;
  periodLength?: number;
  notes?: string;
}) =>
  requestJson<ContextResponse>("/api/v1/context/cycle", {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((response) => {
    invalidateRequestCache("context:");
    return response;
  });

export const createMedicationRequest = (payload: {
  name: string;
  dosage?: string;
  frequency?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  notes?: string;
}) =>
  requestJson<ContextResponse>("/api/v1/context/medications", {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((response) => {
    invalidateRequestCache("context:");
    return response;
  });

export const createReportRequest = (payload: {
  title: string;
  reportType?: string;
  fileUrl?: string;
  fileName?: string;
  notes?: string;
  uploadedAt?: string;
}) =>
  requestJson<ContextResponse>("/api/v1/context/reports", {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((response) => {
    invalidateRequestCache("context:");
    return response;
  });

export const uploadReportRequest = (payload: {
  file: File;
  title?: string;
  reportType?: string;
  notes?: string;
  reportDate?: string;
}) => {
  const token = authStorage.getAccessToken();
  const formData = new FormData();
  formData.append("file", payload.file);
  if (payload.title) formData.append("title", payload.title);
  if (payload.reportType) formData.append("reportType", payload.reportType);
  if (payload.notes) formData.append("notes", payload.notes);
  if (payload.reportDate) formData.append("reportDate", payload.reportDate);

  return fetch(buildApiUrl("/api/v1/reports/upload"), {
    method: "POST",
    credentials: "include",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  }).then(async (response) => {
    const payloadResult = (await response.json()) as {
      success: boolean;
      message?: string;
      report?: unknown;
    };

    if (!response.ok) {
      throw payloadResult;
    }

    invalidateRequestCache("context:");
    return payloadResult;
  });
};

export interface DailyCheckIn {
  _id?: string;
  date: string;
  day: string;
  energy: string;
  mood: string;
  sleep: string;
  cravings: string;
  symptoms: string[];
  notes: string;
}

export const getDailyCheckInsRequest = () =>
  cachedRequest("context:daily-check-ins", 15000, () =>
    requestJson<{ success: boolean; data: DailyCheckIn[] }>("/api/v1/context/daily-check-ins", {
      method: "GET",
    }),
  );

export const createOrUpdateDailyCheckInRequest = (payload: Omit<DailyCheckIn, "_id">) =>
  requestJson<{ success: boolean; data: DailyCheckIn }>("/api/v1/context/daily-check-in", {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((response) => {
    invalidateRequestCache("context:");
    return response;
  });

export const clearDailyCheckInsRequest = () =>
  requestJson<{ success: boolean }>("/api/v1/context/daily-check-ins/clear", {
    method: "POST",
  }).then((response) => {
    invalidateRequestCache("context:");
    return response;
  });
