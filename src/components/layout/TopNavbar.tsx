import { Bell } from "lucide-react";

import { useAuth } from "../../auth/AuthContext";
import { Avatar } from "../common/Avatar";
import { Button } from "../common/Button";
import { profile } from "../../data/today";

export function TopNavbar() {
  const { user } = useAuth();
  const userName = user?.name || "Guest";
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "G";

  return (
    <header className="sticky top-0 z-30 border-b border-primary/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary">
            SEKA
          </p>
          <p className="mt-1 text-xs font-medium text-text-muted">{profile.role}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Notifications"
            className="h-10 w-10 rounded-full px-0"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar
            name={userName}
            initials={userInitials}
            alt="User profile"
            size="md"
          />
        </div>
      </div>
    </header>
  );
}
