import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";

export function ProtectedRoute() {
  const { status, accessToken, user } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-text">
        <div className="rounded-full border border-primary/20 bg-white px-5 py-3 text-sm font-medium text-primary shadow-sm">
          Loading your session...
        </div>
      </div>
    );
  }

  if (!accessToken || !user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  if (!user.isOnboarded && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  if (user.isOnboarded && location.pathname === "/onboarding") {
    return <Navigate to="/care" replace />;
  }

  return <Outlet />;
}
