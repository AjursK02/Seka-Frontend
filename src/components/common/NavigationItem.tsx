import { NavLink } from "react-router-dom";
import clsx from "clsx";

import type { NavigationItem as NavigationItemType } from "../../types/today";
import { useCare } from "../../context/CareContext";

export interface NavigationItemProps {
  item: NavigationItemType;
  variant?: "sidebar" | "bottom";
  className?: string;
}

export function NavigationItem({
  item,
  variant = "sidebar",
  className,
}: NavigationItemProps) {
  const Icon = item.icon;
  const { handleStartNewConversation } = useCare();

  const handleClick = () => {
    if (item.id === "care") {
      handleStartNewConversation();
    }
  };

  return (
    <NavLink
      to={item.href}
      end={item.href === "/"}
      onClick={handleClick}
      className={({ isActive }) =>
        clsx(
          "transition-colors duration-200",
          variant === "sidebar" &&
            clsx(
              "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold",
              isActive
                ? "border-r-2 border-primary bg-primary-soft text-primary"
                : "text-text-muted hover:bg-surface-muted hover:text-text",
            ),
          variant === "bottom" &&
            clsx(
              "flex flex-col items-center justify-center gap-1 text-[0.72rem] font-semibold sm:gap-1.5 sm:text-[0.78rem] md:gap-2 md:text-sm",
              isActive ? "text-primary" : "text-text-muted",
            ),
          className,
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={clsx(
              "shrink-0",
              variant === "sidebar" ? "h-5 w-5" : "h-5 w-5 sm:h-[1.15rem] sm:w-[1.15rem] md:h-6 md:w-6",
              isActive && variant === "bottom" ? "fill-current" : undefined,
            )}
          />
          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
}
