import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Download,
  SendHorizonal,
  ShieldAlert,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Section } from "../../components/common/Section";
import { Typography } from "../../components/common/Typography";
import { OnboardingContextModal } from "../../components/me/OnboardingContextModal";

const summaryCards = [
  {
    icon: CalendarDays,
    label: "Cycle",
    text: "Your cycle has been longer than your recent average (42 days vs 34 days).",
  },
  {
    icon: Activity,
    label: "Symptoms",
    text: "Increased fatigue and stronger cravings reported in the last 14 days.",
  },
  {
    icon: ShieldAlert,
    label: "Lifestyle",
    text: "Sleep has been inconsistent, averaging 6 hours.",
  },
];

const discussionPoints = [
  "Recent cycle changes and their impact on your energy.",
  "Persistent fatigue despite lifestyle adjustments.",
  "New patterns in cravings and metabolic signals.",
];

export function PrepareForVisitPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { user, completeOnboarding } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onboardingAnswers = user?.onboardingAnswers;

  const onboardingSummary = onboardingAnswers
    ? [
        {
          label: "Main concern",
          value:
            onboardingAnswers.pcosConcern?.length > 0
              ? onboardingAnswers.pcosConcern.join(", ")
              : "Not added yet",
        },
        {
          label: "Period pattern",
          value: onboardingAnswers.periodFrequency || "Not added yet",
        },
        {
          label: "Symptoms noticed",
          value:
            [
              ...(onboardingAnswers.symptomsNoticed || []),
              onboardingAnswers.symptomsNoticedCustom?.trim()
                ? [onboardingAnswers.symptomsNoticedCustom.trim()]
                : [],
            ]
              .flat()
              .filter(Boolean)
              .join(", ") || "Not added yet",
        },
        {
          label: "Symptom duration",
          value:
            onboardingAnswers.symptomDurationCustom?.trim() ||
            onboardingAnswers.symptomDuration ||
            "Not added yet",
        },
        {
          label: "Previous tests",
          value:
            onboardingAnswers.previousTests?.length > 0
              ? onboardingAnswers.previousTests.join(", ")
              : "Not added yet",
        },
      ]
    : [];

  const handleSaveOnboarding = async (answers: {
    pcosConcern: string[];
    periodFrequency: string;
    symptomsNoticed: string[];
    symptomsNoticedCustom: string;
    symptomDuration: string;
    symptomDurationCustom: string;
    previousTests: string[];
  }) => {
    await completeOnboarding(answers);
  };

  return (
    <Section className="pb-8">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto w-full max-w-content"
      >
        <div className="overflow-hidden rounded-[2rem] border border-outline/40 bg-surface shadow-soft">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-outline/30 bg-background/95 px-5 py-4 backdrop-blur-xl sm:px-6">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Close"
              className="h-10 w-10 rounded-full px-0"
              onClick={() => navigate("/me")}
            >
              <X className="h-4 w-4" />
            </Button>

            <Typography as="p" variant="headline" className="text-[1.35rem] text-primary sm:text-[1.6rem]">
              SEKA
            </Typography>

            <div className="h-10 w-10" aria-hidden="true" />
          </header>

          <main className="px-5 py-8 pb-32 sm:px-6">
            <div className="space-y-8">
              <section className="space-y-4 text-center">
                <Typography as="h1" variant="display" className="text-text sm:text-[2.8rem]">
                  Prepare for your visit
                </Typography>
                <Typography variant="bodyMuted" className="mx-auto max-w-[400px]">
                  A summary of your recent patterns to help you have a better conversation with your
                  healthcare provider.
                </Typography>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 border-b border-secondary/20 pb-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <Typography as="h2" variant="micro" className="text-secondary">
                    Your PCOS Care Summary (Last 30 Days)
                  </Typography>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {summaryCards.map((card) => {
                    const Icon = card.icon;

                    return (
                      <Card
                        key={card.label}
                        className="group relative overflow-hidden border-outline/30 bg-surface"
                      >
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-soft/30 blur-3xl" />
                        <div className="relative flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-text-muted">
                            <Icon className="h-4 w-4 text-tertiary" />
                            <Typography as="p" variant="micro" className="text-text-muted">
                              {card.label}
                            </Typography>
                          </div>
                          <Typography variant="body" className="text-text">
                            {card.text}
                          </Typography>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-secondary/20 pb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    <Typography as="h2" variant="micro" className="text-secondary">
                      Saved onboarding context
                    </Typography>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="shrink-0"
                    onClick={() => setIsModalOpen(true)}
                  >
                    View & Edit
                  </Button>
                </div>

                <Card className="relative overflow-hidden border-outline/30 bg-surface">
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary-soft/30 blur-3xl" />
                  <div className="relative grid gap-4 sm:grid-cols-2">
                    {onboardingSummary.length ? (
                      onboardingSummary.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-outline/40 bg-white/70 p-4">
                          <Typography as="p" variant="micro" className="text-text-muted">
                            {item.label}
                          </Typography>
                          <Typography as="p" variant="body" className="mt-1 text-text">
                            {item.value}
                          </Typography>
                        </div>
                      ))
                    ) : (
                      <div className="sm:col-span-2 rounded-2xl border border-dashed border-outline/50 bg-white/70 p-5">
                        <Typography as="p" variant="body" className="text-text">
                          No onboarding context has been saved yet.
                        </Typography>
                        <Typography as="p" variant="bodyMuted" className="mt-1">
                          Open the editor to add your health context and keep it synced to your profile.
                        </Typography>
                      </div>
                    )}
                  </div>
                </Card>
              </section>

              <section className="relative overflow-hidden rounded-2xl border border-outline/20 bg-surface-muted p-6">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-soft/40 blur-3xl" />
                <div className="relative space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse" />
                    <Typography as="h2" variant="micro" className="text-on-background">
                      Things you may want to discuss
                    </Typography>
                  </div>
                  <ul className="space-y-4">
                    {discussionPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <Typography variant="body" className="text-text">
                          {point}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </main>

          <div className="fixed bottom-[92px] left-1/2 z-40 w-full max-w-content -translate-x-1/2 bg-gradient-to-t from-background via-background to-transparent px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-12 sm:px-6 lg:bottom-0">
            <div className="flex flex-row gap-2 sm:gap-3 lg:w-full lg:justify-center lg:gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="flex-1 min-w-0 lg:flex-none lg:w-60 lg:h-15 lg:px-8 lg:text-base"
                leadingIcon={<Download className="h-5 w-5" />}
              >
                Download 
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="flex-1 min-w-0 lg:flex-none lg:w-60 lg:h-15 lg:px-8 lg:text-base"
                leadingIcon={<SendHorizonal className="h-5 w-5" />}
              >
                Share 
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <OnboardingContextModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onSave={handleSaveOnboarding}
      />
    </Section>
  );
}
