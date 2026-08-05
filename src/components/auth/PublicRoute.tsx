import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";

export function PublicRoute() {
  const { status, accessToken, user } = useAuth();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-text">
        <div className="rounded-full border border-primary/20 bg-white px-5 py-3 text-sm font-medium text-primary shadow-sm">
          Preparing your page...
        </div>
      </div>
    );
  }

  if (accessToken && user) {
    return <Navigate to={user.isOnboarded ? "/care" : "/onboarding"} replace />;
  }

  return <Outlet />;
}
