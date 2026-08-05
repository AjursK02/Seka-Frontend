import type { ReactNode } from "react";
import { GradientBackground } from "../common/GradientBackground";
import { AuthHeader } from "./AuthHeader";

interface AuthMinimalLayoutProps {
  children: ReactNode;
  footer: ReactNode;
}

export function AuthMinimalLayout({ children, footer }: AuthMinimalLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-text">
      <GradientBackground />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,87,87,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(182,33,42,0.08),transparent_30%)]" />

      <div className="relative z-10 flex min-h-screen flex-col px-4 py-8 sm:px-6 lg:px-8">
        {/* Header with Logo */}
        <div className="mb-6 sm:mb-8">
          <AuthHeader />
        </div>

        {/* Center Content */}
        <div className="flex flex-1 items-center justify-center">
          {/* Main Form Container */}
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_-30px_rgba(182,33,42,0.35)] sm:p-8 md:p-10">
              {children}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-center sm:mt-8">
          <div className="w-full max-w-md rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-center text-sm text-gray-600 shadow-sm backdrop-blur">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
