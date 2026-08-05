import { Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { navigationItems } from "../../data/today";
import { NavigationItem } from "../common/NavigationItem";
import { useCare } from "../../context/CareContext";

export function MobileBottomNav() {
  const { isMobileConversationsOpen, setIsMobileConversationsOpen } = useCare();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    if (location.pathname !== "/care") {
      navigate("/care");
      setIsMobileConversationsOpen(true);
    } else {
      setIsMobileConversationsOpen(!isMobileConversationsOpen);
    }
  };

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-[min(100%,480px)] -translate-x-1/2 border-t border-primary/10 bg-surface/90 px-4 pb-[env(safe-area-inset-bottom)] pt-3 shadow-[0_-12px_32px_rgba(91,37,26,0.08)] backdrop-blur-xl sm:w-[min(100%,640px)] sm:px-6 sm:pt-4 md:w-[min(100%,760px)] md:px-8 md:pt-4 md:pb-4 lg:hidden">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className="grid flex-1 grid-cols-5 items-center gap-1 sm:gap-2 md:gap-3">
          {navigationItems.map((item) => (
            <NavigationItem key={item.id} item={item} variant="bottom" />
          ))}

          <button
            type="button"
            onClick={handleToggle}
            className={`flex flex-col items-center justify-center gap-1 text-[0.72rem] font-semibold sm:gap-1.5 sm:text-[0.78rem] md:gap-2 md:text-sm transition-colors duration-200 ${
              isMobileConversationsOpen && location.pathname === "/care" ? "text-primary" : "text-text-muted"
            }`}
          >
            <Menu
              className={`shrink-0 h-5 w-5 sm:h-[1.15rem] sm:w-[1.15rem] md:h-6 md:w-6 ${
                isMobileConversationsOpen && location.pathname === "/care" ? "text-primary" : ""
              }`}
            />
            <span>Chat</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
