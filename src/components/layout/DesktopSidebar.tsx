import { Plus, Trash2 } from "lucide-react";
import { NavigationItem } from "../common/NavigationItem";
import { navigationItems, profile } from "../../data/today";
import { useCare, formatConversationStamp } from "../../context/CareContext";

export function DesktopSidebar() {
  const {
    conversations,
    activeConversationId,
    conversationError,
    isLoadingConversations,
    handleStartNewConversation,
    handleConversationSelect,
    handleConversationDelete,
  } = useCare();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-primary/10 bg-surface/90 px-6 py-6 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-soft">
          {profile.initials}
        </div>
        <div>
          <p className="text-2xl font-display leading-none text-primary">SEKA</p>
          <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-text-muted">
            {profile.role}
          </p>
        </div>
      </div>

      <nav className="mt-10 flex flex-col gap-2">
        {navigationItems.map((item) => (
          <NavigationItem key={item.id} item={item} variant="sidebar" />
        ))}
      </nav>

      <div className="mt-8 flex flex-1 flex-col min-h-0 border-t border-primary/5 pt-6">
        <div className="flex items-center justify-between px-2">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-text-muted">
            Conversations
          </p>
          <button
            onClick={handleStartNewConversation}
            className="rounded-lg p-1 text-text-muted hover:bg-primary-soft hover:text-primary transition-all"
            title="New conversation"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {conversationError ? (
          <p className="mt-2 text-xs text-error px-2">{conversationError}</p>
        ) : null}

        {isLoadingConversations ? (
          <p className="mt-4 text-xs text-text-muted px-2">Loading...</p>
        ) : conversations.length ? (
          <div className="mt-3 flex-1 overflow-y-auto space-y-1 pr-1 -mr-2 scrollbar-thin">
            {conversations.map((conversation) => {
              const conversationId = conversation._id || conversation.id || "";
              const isActive = conversationId === activeConversationId;

              return (
                <div
                  key={conversationId}
                  className={`group relative flex items-center justify-between rounded-xl p-2 text-left transition-all ${
                    isActive
                      ? "border border-primary/20 bg-primary-soft/60"
                      : "border border-transparent hover:bg-surface-muted"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleConversationSelect(conversationId)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className={`truncate text-xs font-semibold ${isActive ? "text-primary" : "text-text"}`}>
                      {conversation.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-muted">
                      {formatConversationStamp(conversation.updatedAt)}
                    </p>
                  </button>

                  <button
                    type="button"
                    aria-label={`Delete conversation ${conversation.title}`}
                    className="opacity-0 group-hover:opacity-100 p-1 text-text-muted hover:text-error rounded-md hover:bg-error-soft/10 transition-colors shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      void handleConversationDelete(conversationId);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-outline/50 p-3 text-center">
            <p className="text-[11px] text-text-muted">No saved threads yet</p>
          </div>
        )}
      </div>
    </aside>
  );
}
