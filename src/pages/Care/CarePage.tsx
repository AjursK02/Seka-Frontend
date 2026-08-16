import { MessageCircle, Plus, Trash2 } from "lucide-react";

import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Section } from "../../components/common/Section";
import { Typography } from "../../components/common/Typography";
import { carePageContent } from "../../data/care";
import { CareHeader } from "../../components/care/CareHeader";
import { CareConversation } from "../../components/care/CareConversation";
import { CareComposer } from "../../components/care/CareComposer";
import { useCare, formatConversationStamp } from "../../context/CareContext";

export function CarePage() {
  const {
    messages,
    conversations,
    activeConversationId,
    activeConversationTitle,
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
  } = useCare();

  const displayedConversationCount = conversations.length;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row">
      {/* Mobile/Tablet bottom drawer for conversations */}
      {isMobileConversationsOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileConversationsOpen(false)}
          />

          {/* Drawer sheet */}
          <div className="relative w-full max-h-[80vh] rounded-t-3xl border-t border-outline/50 bg-surface px-6 pb-10 pt-6 shadow-2xl z-10 overflow-y-auto transform translate-y-0 transition-transform duration-300 ease-out animate-in slide-in-from-bottom">
            {/* Grab handle bar */}
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-outline/60" />

            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <Typography as="p" variant="micro" className="uppercase tracking-[0.22em] text-text-muted">
                  Conversations
                </Typography>
                <Typography as="h2" variant="title" className="mt-1 text-lg">
                  Your saved threads
                </Typography>
              </div>

              <Button variant="secondary" size="sm" leadingIcon={<Plus className="h-4 w-4" />} onClick={handleStartNewConversation}>
                New
              </Button>
            </div>

            {conversationError ? (
              <Typography as="p" variant="micro" className="text-error mb-4">
                {conversationError}
              </Typography>
            ) : null}

            {isLoadingConversations ? (
              <Typography variant="bodyMuted" className="py-4">Loading conversations...</Typography>
            ) : displayedConversationCount ? (
              <div className="space-y-3 pb-6">
                {conversations.map((conversation) => {
                  const conversationId = conversation._id || conversation.id || "";
                  const isActive = conversationId === activeConversationId;

                  return (
                    <div
                      key={conversationId}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        isActive
                          ? "border-primary/30 bg-primary-soft shadow-soft"
                          : "border-outline/60 bg-background hover:border-primary/20 hover:bg-surface"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleConversationSelect(conversationId)}
                        className="flex w-full items-start gap-3 text-left"
                      >
                        <div className="min-w-0 flex-1">
                          <Typography as="p" variant="body" className="truncate font-semibold">
                            {conversation.title}
                          </Typography>
                          <Typography variant="micro" className="mt-1 text-text-muted">
                            Updated {formatConversationStamp(conversation.updatedAt)}
                          </Typography>
                        </div>
                      </button>

                      <div className="mt-3 flex justify-end">
                        <button
                          type="button"
                          aria-label={`Delete conversation ${conversation.title}`}
                          className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-semibold text-text-muted transition-colors hover:bg-error/10 hover:text-error"
                          onClick={() => void handleConversationDelete(conversationId)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2 rounded-2xl border border-dashed border-outline/70 p-6 text-center">
                <div className="flex items-center justify-center gap-2 text-text-muted">
                  <MessageCircle className="h-4 w-4" />
                  <Typography as="p" variant="micro">
                    No saved conversations yet
                  </Typography>
                </div>
                <Typography variant="bodyMuted" className="mt-2 block">
                  Start a new chat and SEKA will save the thread here for easy return later.
                </Typography>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat conversation area */}
      <div className="min-w-0 flex-1 space-y-10 lg:max-w-4xl lg:mx-auto">
        <CareHeader title={activeConversationTitle} />

        <Section className="space-y-6 pb-24">
          {pagination?.hasPreviousPage ? (
            <div className="flex justify-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => void loadOlderMessages()}
                disabled={isLoadingOlderMessages}
              >
                {isLoadingOlderMessages ? "Loading earlier messages..." : "Load earlier messages"}
              </Button>
            </div>
          ) : null}

          {isLoadingConversation ? (
            <Typography variant="bodyMuted">Loading conversation...</Typography>
          ) : null}

          <CareConversation
            messages={messages}
            evidence={carePageContent.evidence}
            isSending={isSending}
          />

          {errorMessage ? (
            <Typography as="p" variant="micro" className="text-error">
              {errorMessage}
            </Typography>
          ) : null}

          <Typography as="p" variant="bodyMuted" className="max-w-2xl">
            Ask SEKA about symptoms, compare recent trends, or prepare notes for a visit.
          </Typography>
        </Section>

        {isConversationMessageLimitReached ? (
          <Card className="space-y-4 border-outline/70 bg-surface-muted">
            <div className="space-y-2">
              <Typography as="h2" variant="title">
                Message limit reached
              </Typography>
              <Typography variant="bodyMuted">
                You’ve used all messages in this chat. Start a new chat to continue.
              </Typography>
            </div>

            <Button
              type="button"
              className="w-full justify-center sm:w-auto"
              onClick={handleStartNewConversation}
            >
              Start new chat
            </Button>
          </Card>
        ) : (
          <CareComposer
            placeholder={carePageContent.composerPlaceholder}
            isSending={isSending}
            onSend={sendMessage}
          />
        )}
      </div>
    </div>
  );
}
