import { authStorage } from "../auth/authApi";
import { buildApiUrl } from "../utils/apiBaseUrl";

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

export interface AIChatUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AIChatData {
  success: true;
  answer: string;
  model: string;
  usage: AIChatUsage;
  finishReason: string | null;
  latency: number;
  conversationId?: string;
  messageId?: string;
  userMessageId?: string;
}

export interface AIChatResponse {
  success: boolean;
  message: string;
  data: AIChatData;
}

export interface AIChatConversationMessage {
  sender: "user" | "seka";
  text: string;
  label?: string;
  time?: string;
}

export interface AIConversationSummary {
  _id?: string;
  id?: string;
  userId?: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIConversationMessage {
  _id?: string;
  id?: string;
  conversationId: string;
  role: "user" | "assistant" | "system";
  content: string;
  model?: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  latency?: number;
  createdAt: string;
}

export interface AIConversationPagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AIConversationListData {
  conversations: AIConversationSummary[];
  pagination: AIConversationPagination;
}

export interface AIConversationDetailData {
  conversation: AIConversationSummary;
  messages: AIConversationMessage[];
  pagination: AIConversationPagination;
}

export interface AIConversationListResponse {
  success: boolean;
  message: string;
  data: AIConversationListData;
}

export interface AIConversationDetailResponse {
  success: boolean;
  message: string;
  data: AIConversationDetailData;
}

export interface AIConversationDeleteResponse {
  success: boolean;
  message: string;
}

export const sendCareMessageRequest = (
  message: string,
  conversationId?: string,
  conversationHistory: AIChatConversationMessage[] = [],
  currentConversation: AIChatConversationMessage[] = [],
) =>
  requestJson<AIChatResponse>("/api/v1/ai/chat", {
    method: "POST",
    body: JSON.stringify({ message, conversationId, conversationHistory, currentConversation }),
  });

export const getCareConversationsRequest = (page = 1, limit = 20) =>
  requestJson<AIConversationListResponse>(`/api/v1/chat/conversations?page=${page}&limit=${limit}`);

export const getCareConversationRequest = (conversationId: string, page?: number, limit = 50) => {
  const searchParams = new URLSearchParams();

  if (page !== undefined) {
    searchParams.set("page", String(page));
  }

  if (limit) {
    searchParams.set("limit", String(limit));
  }

  const query = searchParams.toString();

  return requestJson<AIConversationDetailResponse>(
    `/api/v1/chat/conversations/${conversationId}${query ? `?${query}` : ""}`,
  );
};

export const deleteCareConversationRequest = (conversationId: string) =>
  requestJson<AIConversationDeleteResponse>(`/api/v1/chat/conversations/${conversationId}`, {
    method: "DELETE",
  });
