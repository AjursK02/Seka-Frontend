import type { ReactNode } from "react";

import Container from "../common/LandingContainer";
import GlassCard from "../common/LandingGlassCard";
import { GradientBackground } from "../common/GradientBackground";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthShell({ eyebrow, title, description, children, footer }: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-text">
      <GradientBackground />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,87,87,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(182,33,42,0.08),transparent_30%)]" />

      <Container className="relative z-10 flex min-h-screen items-center py-10 sm:py-14">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-primary/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary shadow-sm backdrop-blur">
              {eyebrow}
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              {description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold text-gray-900">Secure sessions</p>
                <p className="mt-1 text-sm text-gray-600">Short-lived access tokens with refresh rotation.</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold text-gray-900">Fast access</p>
                <p className="mt-1 text-sm text-gray-600">Get into your Today dashboard after login.</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold text-gray-900">Friendly validation</p>
                <p className="mt-1 text-sm text-gray-600">Clear inline messages before you submit.</p>
              </div>
            </div>
          </div>

          <GlassCard className="border border-white/70 bg-white/90 p-5 shadow-[0_24px_70px_-30px_rgba(182,33,42,0.35)] sm:p-8">
            {children}
          </GlassCard>
        </div>

        <div className="absolute bottom-6 left-1/2 w-full max-w-7xl -translate-x-1/2 px-4 sm:px-6 lg:px-16">
          <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-sm text-gray-600 shadow-sm backdrop-blur">
            {footer}
          </div>
        </div>
      </Container>
    </div>
  );
}
