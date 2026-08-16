import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  deleteCareConversationRequest,
  invalidateCareRequestCache,
  getCareConversationRequest,
  getCareConversationsRequest,
  sendCareMessageRequest,
  type AIConversationPagination,
  type AIConversationSummary,
} from "../api/aiApi";
import { carePageContent } from "../data/care";
import type { CareMessage } from "../types/care";
import { normalizeCareAssistantText } from "../utils/normalizeCareAssistantText";

const ACTIVE_CONVERSATION_STORAGE_KEY = "seka-care-active-conversation-id";
const MAX_USER_MESSAGES_PER_CONVERSATION = 15;

const createMessageId = () => `care-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const formatTimestamp = (date = new Date()) =>
  date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

export const formatConversationStamp = (value?: string) => {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
};

const conversationIdFromSummary = (conversation: AIConversationSummary) =>
  conversation._id || conversation.id || "";

const mapStoredMessage = (message: {
  _id?: string;
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
}): CareMessage => ({
  id: message._id || message.id || createMessageId(),
  sender: message.role === "assistant" ? "seka" : "user",
  label: message.role === "assistant" ? "SEKA Insights" : undefined,
  text:
    message.role === "assistant"
      ? normalizeCareAssistantText(message.content || "")
      : message.content,
  time: formatTimestamp(new Date(message.createdAt)),
});

const mapStoredMessages = (
  messages: {
    _id?: string;
    id?: string;
    role: "user" | "assistant" | "system";
    content: string;
    createdAt: string;
  }[] = [],
) => messages.map(mapStoredMessage);

interface CareContextValue {
  messages: CareMessage[];
  conversations: AIConversationSummary[];
  activeConversationId: string | null;
  activeConversationTitle: string;
  messageLimit: number;
  userMessageCount: number;
  isConversationMessageLimitReached: boolean;
  pagination: AIConversationPagination | null;
  isSending: boolean;
  isLoadingConversations: boolean;
  isLoadingConversation: boolean;
  isLoadingOlderMessages: boolean;
  errorMessage: string;
  conversationError: string;
  isMobileConversationsOpen: boolean;
  setIsMobileConversationsOpen: (open: boolean) => void;
  handleStartNewConversation: () => void;
  handleConversationSelect: (conversationId: string) => void;
  handleConversationDelete: (conversationId: string) => Promise<void>;
  loadOlderMessages: () => Promise<void>;
  sendMessage: (message: string) => Promise<boolean>;
  refreshConversations: (preferredConversationId?: string | null) => Promise<void>;
}

const CareContext = createContext<CareContextValue | null>(null);

export function CareProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [messages, setMessages] = useState<CareMessage[]>(carePageContent.messages);
  const [conversations, setConversations] = useState<AIConversationSummary[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [activeConversationTitle, setActiveConversationTitle] = useState(carePageContent.title);
  const [pagination, setPagination] = useState<AIConversationPagination | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [isLoadingOlderMessages, setIsLoadingOlderMessages] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [conversationError, setConversationError] = useState("");
  const [isMobileConversationsOpen, setIsMobileConversationsOpen] = useState(false);

  const userMessageCount = useMemo(
    () => messages.filter((message) => message.sender === "user").length,
    [messages],
  );
  const isConversationMessageLimitReached = userMessageCount >= MAX_USER_MESSAGES_PER_CONVERSATION;

  const resolveErrorMessage = (error: unknown) => {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    const payload = error as {
      message?: unknown;
      data?: {
        message?: unknown;
      };
    };

    if (typeof payload?.message === "string" && payload.message) {
      return payload.message;
    }

    if (typeof payload?.data?.message === "string" && payload.data.message) {
      return payload.data.message;
    }

    return "We couldn't reach SEKA right now. Please try again.";
  };

  const applyActiveConversation = useCallback((conversationId: string | null) => {
    setActiveConversationId(conversationId);

    if (conversationId) {
      localStorage.setItem(ACTIVE_CONVERSATION_STORAGE_KEY, conversationId);
    } else {
      localStorage.removeItem(ACTIVE_CONVERSATION_STORAGE_KEY);
    }
  }, []);

  const refreshConversations = useCallback(
    async (preferredConversationId?: string | null) => {
      setIsLoadingConversations(true);
      setConversationError("");

      try {
        const response = await getCareConversationsRequest();
        const conversationList = response.data?.conversations || [];
        setConversations(conversationList);

        const storedConversationId =
          preferredConversationId || localStorage.getItem(ACTIVE_CONVERSATION_STORAGE_KEY);
        const selectedConversation =
          conversationList.find(
            (conversation) => conversationIdFromSummary(conversation) === storedConversationId,
          ) || conversationList[0];

        if (selectedConversation) {
          applyActiveConversation(conversationIdFromSummary(selectedConversation));
        } else {
          applyActiveConversation(null);
          setActiveConversationTitle(carePageContent.title);
          setMessages(carePageContent.messages);
          setPagination(null);
        }
      } catch (error) {
        setConversationError(resolveErrorMessage(error));
        setConversations([]);
        if (!activeConversationId) {
          setMessages(carePageContent.messages);
        }
      } finally {
        setIsLoadingConversations(false);
      }
    },
    [activeConversationId, applyActiveConversation],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refreshConversations();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!activeConversationId) {
      setActiveConversationTitle(carePageContent.title);
      setPagination(null);
      setIsLoadingConversation(false);
      return;
    }

    let cancelled = false;

    const loadConversation = async () => {
      setIsLoadingConversation(true);
      setErrorMessage("");

      try {
        const response = await getCareConversationRequest(activeConversationId);
        if (cancelled) {
          return;
        }

        const conversation = response.data?.conversation;
        setActiveConversationTitle(conversation?.title || carePageContent.title);
        setMessages(mapStoredMessages(response.data?.messages || []));
        setPagination(response.data?.pagination || null);
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(resolveErrorMessage(error));
        }
      } finally {
        if (!cancelled) {
          setIsLoadingConversation(false);
        }
      }
    };

    void loadConversation();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConversationId]);

  const appendMessage = useCallback((message: CareMessage) => {
    setMessages((currentMessages) => [...currentMessages, message]);
  }, []);

  const handleStartNewConversation = useCallback(() => {
    applyActiveConversation(null);
    setActiveConversationTitle(carePageContent.title);
    setMessages(carePageContent.messages);
    setPagination(null);
    setErrorMessage("");
    setIsMobileConversationsOpen(false);
    if (location.pathname !== "/care") {
      navigate("/care");
    }
  }, [applyActiveConversation, location.pathname, navigate]);

  const handleConversationSelect = useCallback(
    (conversationId: string) => {
      setIsMobileConversationsOpen(false);
      if (!conversationId || conversationId === activeConversationId) {
        return;
      }

      applyActiveConversation(conversationId);
      if (location.pathname !== "/care") {
        navigate("/care");
      }
    },
    [activeConversationId, applyActiveConversation, location.pathname, navigate],
  );

  const handleConversationDelete = useCallback(
    async (conversationId: string) => {
      try {
        await deleteCareConversationRequest(conversationId);
        await refreshConversations(
          activeConversationId === conversationId ? null : activeConversationId,
        );
      } catch (error) {
        setConversationError(resolveErrorMessage(error));
      }
    },
    [activeConversationId, refreshConversations],
  );

  const loadOlderMessages = useCallback(async () => {
    if (!activeConversationId || !pagination?.hasPreviousPage || isLoadingOlderMessages) {
      return;
    }

    const previousPage = Math.max(pagination.page - 1, 1);
    setIsLoadingOlderMessages(true);
    setErrorMessage("");

    try {
      const response = await getCareConversationRequest(
        activeConversationId,
        previousPage,
        pagination.limit,
      );
      setMessages((currentMessages) => [
        ...mapStoredMessages(response.data?.messages || []),
        ...currentMessages,
      ]);
      setPagination(response.data?.pagination || null);
    } catch (error) {
      setErrorMessage(resolveErrorMessage(error));
    } finally {
      setIsLoadingOlderMessages(false);
    }
  }, [activeConversationId, pagination, isLoadingOlderMessages]);

  const sendMessage = useCallback(
    async (message: string) => {
      const trimmedMessage = message.trim();

      if (!trimmedMessage || isSending) {
        return false;
      }

      if (isConversationMessageLimitReached) {
        setErrorMessage(
          `You’ve reached the ${MAX_USER_MESSAGES_PER_CONVERSATION}-message limit for this chat. Start a new chat to continue.`,
        );
        return false;
      }

      setErrorMessage("");
      setIsSending(true);

      const conversationHistory = messages.map((entry) => ({
        sender: entry.sender,
        text: entry.text,
        label: entry.label,
        time: entry.time,
      }));

      appendMessage({
        id: createMessageId(),
        sender: "user",
        text: trimmedMessage,
        time: formatTimestamp(),
      });

      try {
        const response = await sendCareMessageRequest(
          trimmedMessage,
          activeConversationId || undefined,
          conversationHistory,
          conversationHistory.slice(-6),
        );

        const persistedConversationId =
          response.data?.conversationId || activeConversationId || null;
        const answer = response.data?.answer?.trim();
        const formattedAnswer = normalizeCareAssistantText(answer || "");

        if (!formattedAnswer) {
          throw new Error("The AI response was empty.");
        }

        appendMessage({
          id: response.data?.messageId || createMessageId(),
          sender: "seka",
          label: "SEKA Insights",
          text: formattedAnswer,
          time: formatTimestamp(),
        });

        if (persistedConversationId) {
          applyActiveConversation(persistedConversationId);
        }

        invalidateCareRequestCache();
        void refreshConversations(persistedConversationId);

        return true;
      } catch (error) {
        setErrorMessage(resolveErrorMessage(error));
        return false;
      } finally {
        setIsSending(false);
      }
    },
    [
      activeConversationId,
      messages,
      isSending,
      isConversationMessageLimitReached,
      appendMessage,
      applyActiveConversation,
      refreshConversations,
    ],
  );

  const contextValue = useMemo(
    () => ({
      messages,
      conversations,
      activeConversationId,
      activeConversationTitle,
      messageLimit: MAX_USER_MESSAGES_PER_CONVERSATION,
      userMessageCount,
      isConversationMessageLimitReached,
      pagination,
      isSending,
      isLoadingConversations,
      isLoadingConversation,
      isLoadingOlderMessages,
      errorMessage,
      conversationError,
      isMobileConversationsOpen,
      setIsMobileConversationsOpen,
      handleStartNewConversation,
      handleConversationSelect,
      handleConversationDelete,
      loadOlderMessages,
      sendMessage,
      refreshConversations,
    }),
    [
      messages,
      conversations,
      activeConversationId,
      activeConversationTitle,
      userMessageCount,
      isConversationMessageLimitReached,
      pagination,
      isSending,
      isLoadingConversations,
      isLoadingConversation,
      isLoadingOlderMessages,
      errorMessage,
      conversationError,
      isMobileConversationsOpen,
      setIsMobileConversationsOpen,
      handleStartNewConversation,
      handleConversationSelect,
      handleConversationDelete,
      loadOlderMessages,
      sendMessage,
      refreshConversations,
    ],
  );

  return <CareContext.Provider value={contextValue}>{children}</CareContext.Provider>;
}

export function useCare() {
  const context = useContext(CareContext);
  if (!context) {
    throw new Error("useCare must be used within a CareProvider");
  }
  return context;
}
