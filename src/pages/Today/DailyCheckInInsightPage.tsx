import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  BedDouble,
  CircleHelp,
  Footprints,
  UtensilsCrossed,
  Trash2,
  Activity,
  Smile,
  Moon,
  Flame,
  ClipboardList,
} from "lucide-react";

import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { PageHeader } from "../../components/common/PageHeader";
import { Section } from "../../components/common/Section";
import { getDailyCheckInsRequest, createOrUpdateDailyCheckInRequest, clearDailyCheckInsRequest } from "../../api/contextApi";

const actionItems = [
  {
    icon: UtensilsCrossed,
    title: "Start with your next meal",
    text: "Include protein and fiber to help build a balanced meal.",
  },
  {
    icon: Footprints,
    title: "Move a little",
    text: "A short walk after eating is a simple habit to try.",
  },
  {
    icon: BedDouble,
    title: "Prioritize recovery",
    text: "Try to get back to your usual sleep routine tonight.",
  },
];

export function DailyCheckInInsightPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getDailyCheckInsRequest();
        if (res.success && res.data) {
          if (res.data.length === 0) {
            // Seed mock history logs to database
            const mockHistory = [
              {
                date: new Date(Date.now() - 86400000).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
                day: new Date(Date.now() - 86400000).toLocaleDateString("en-US", { weekday: "long" }),
                energy: "Low",
                mood: "Low",
                sleep: "Poor",
                cravings: "Strong",
                symptoms: ["Fatigue", "Cramps"],
                notes: "Felt very sluggish and bloated today. Cramps kept me up last night.",
              },
              {
                date: new Date(Date.now() - 86400000 * 2).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
                day: new Date(Date.now() - 86400000 * 2).toLocaleDateString("en-US", { weekday: "long" }),
                energy: "Low",
                mood: "Okay",
                sleep: "Poor",
                cravings: "Some",
                symptoms: ["Fatigue", "Bloating"],
                notes: "Energy was low. Had trouble staying focused. Slept poorly.",
              },
              {
                date: new Date(Date.now() - 86400000 * 3).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
                day: new Date(Date.now() - 86400000 * 3).toLocaleDateString("en-US", { weekday: "long" }),
                energy: "Okay",
                mood: "Good",
                sleep: "Okay",
                cravings: "None",
                symptoms: ["Bloating"],
                notes: "Felt a bit bloated but overall my energy was decent today.",
              },
              {
                date: new Date(Date.now() - 86400000 * 4).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
                day: new Date(Date.now() - 86400000 * 4).toLocaleDateString("en-US", { weekday: "long" }),
                energy: "Good",
                mood: "Good",
                sleep: "Good",
                cravings: "None",
                symptoms: [],
                notes: "Had a great workout and slept like a baby last night.",
              }
            ];

            // Save seeds one by one
            for (const item of mockHistory) {
              await createOrUpdateDailyCheckInRequest(item);
            }
            // Fetch updated logs list
            const finalRes = await getDailyCheckInsRequest();
            if (finalRes.success && finalRes.data) {
              setLogs(finalRes.data);
            }
          } else {
            setLogs(res.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch daily check-ins from database:", err);
      }
    };
    fetchLogs();
  }, []);

  const handleClearHistory = async () => {
    try {
      await clearDailyCheckInsRequest();
      setLogs([]);
    } catch (err) {
      console.error("Failed to clear daily check-in history:", err);
    }
  };

  const getStatusColor = (val: string) => {
    switch (val) {
      case "Good":
      case "None":
        return "bg-emerald-50 text-emerald-700 border-emerald-100/80";
      case "Okay":
      case "Some":
        return "bg-amber-50 text-amber-700 border-amber-100/80";
      case "Low":
      case "Poor":
      case "Strong":
      default:
        return "bg-rose-50 text-rose-700 border-rose-100/80";
    }
  };

  return (
    <Section className="pb-8">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto w-full max-w-content"
      >
        <div className="overflow-hidden rounded-[2rem] border border-primary/10 bg-surface shadow-soft">
          <header className="sticky top-0 z-10 flex items-center justify-between bg-background/95 px-5 py-4 backdrop-blur-xl sm:px-6">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Go back"
              className="h-10 w-10 rounded-full px-0"
              onClick={() => navigate("/today/daily-check-in")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <p className="font-display text-[1.35rem] leading-none tracking-[-0.02em] text-primary sm:text-[1.6rem]">
              SEKA
            </p>

            <div className="h-10 w-10" aria-hidden="true" />
          </header>

          <main className="relative px-5 pb-8 pt-2 sm:px-6 sm:pb-10">
            <div className="absolute right-3 top-2 h-24 w-24 rounded-full bg-primary-soft/50 blur-3xl" />

            <div className="relative space-y-8">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse" />
                  <span className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-primary">
                    New Insight
                  </span>
                </div>

                <PageHeader
                  title="I noticed something."
                  description="You've reported lower energy for four days and stronger cravings twice this week. You've also been sleeping less than usual."
                  titleClassName="text-[2.1rem] sm:text-[2.8rem]"
                  descriptionClassName="max-w-none text-base sm:text-lg"
                  className="space-y-4"
                />
              </div>

              <div className="h-px w-12 bg-primary/15" />

              <section className="space-y-4">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-secondary">
                  What this might mean
                </p>
                <Card className="relative overflow-hidden border-outline/50 bg-surface-muted">
                  <div className="absolute -top-3 -right-3 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
                  <p className="relative text-sm leading-7 text-text-muted sm:text-[1rem]">
                    These patterns can sometimes be connected. Poor sleep can affect energy and
                    appetite, but fatigue can have many causes, so we can&apos;t know the exact
                    reason from these signals alone.
                  </p>
                </Card>
              </section>

              <section className="space-y-4">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-secondary">
                  What you can try today
                </p>

                <div className="space-y-3">
                  {actionItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title}>
                        <Card className="border-transparent p-4 transition-all hover:border-outline/50 hover:bg-background">
                          <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-strong text-text-muted">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <h2 className="font-semibold text-text">{item.title}</h2>
                              <p className="mt-1 text-sm leading-6 text-text-muted">{item.text}</p>
                            </div>
                          </div>
                        </Card>

                        {index < actionItems.length - 1 ? (
                          <div className="mx-4 my-1 h-px bg-primary/10" />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-4">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-secondary">
                  Keep an eye on this
                </p>
                <Card className="border-l-4 border-l-primary bg-primary-soft/40">
                  <div className="flex gap-3">
                    <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm leading-7 text-text-muted sm:text-[1rem]">
                      If your fatigue continues or gets worse, consider discussing it with your
                      healthcare professional.
                    </p>
                  </div>
                </Card>
              </section>

              <div className="h-px w-full bg-primary/10" />

              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-primary animate-pulse" />
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-secondary">
                      Your Check-In History
                    </p>
                  </div>
                  {logs.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="text-xs font-semibold text-text-muted hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Clear History
                    </button>
                  )}
                </div>

                {logs.length === 0 ? (
                  <Card className="flex flex-col items-center justify-center py-10 text-center border-dashed border border-outline bg-surface-muted/30">
                    <p className="text-sm text-text-muted font-medium">No check-ins logged yet.</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 rounded-xl border border-outline/50 bg-surface"
                      onClick={() => navigate("/today/daily-check-in")}
                    >
                      Log Today's Check-In
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {logs.map((log: any) => (
                      <Card key={log.date} className="overflow-hidden border border-outline bg-surface hover:shadow-soft transition-all duration-300">
                        {/* Card Header: Date & Day */}
                        <div className="flex items-center justify-between border-b border-outline/50 bg-surface-muted/40 px-4 py-3 sm:px-5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-text">{log.date}</span>
                            <span className="text-[0.65rem] rounded-full bg-primary-soft px-2.5 py-0.5 font-semibold text-primary uppercase tracking-wider border border-primary/5">
                              {log.day}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 sm:p-5 space-y-4">
                          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                            {/* Energy */}
                            <div className="rounded-xl border border-outline/30 bg-surface-muted/20 p-2.5 flex flex-col justify-between">
                              <span className="text-[0.62rem] font-bold uppercase tracking-wider text-text-muted/80 block flex items-center gap-1">
                                <Activity className="h-3 w-3 text-primary/75" />
                                Energy
                              </span>
                              <div className={`mt-2 inline-flex items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(log.energy)}`}>
                                {log.energy}
                              </div>
                            </div>

                            {/* Mood */}
                            <div className="rounded-xl border border-outline/30 bg-surface-muted/20 p-2.5 flex flex-col justify-between">
                              <span className="text-[0.62rem] font-bold uppercase tracking-wider text-text-muted/80 block flex items-center gap-1">
                                <Smile className="h-3 w-3 text-primary/75" />
                                Mood
                              </span>
                              <div className={`mt-2 inline-flex items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(log.mood)}`}>
                                {log.mood}
                              </div>
                            </div>

                            {/* Sleep */}
                            <div className="rounded-xl border border-outline/30 bg-surface-muted/20 p-2.5 flex flex-col justify-between">
                              <span className="text-[0.62rem] font-bold uppercase tracking-wider text-text-muted/80 block flex items-center gap-1">
                                <Moon className="h-3 w-3 text-primary/75" />
                                Sleep
                              </span>
                              <div className={`mt-2 inline-flex items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(log.sleep)}`}>
                                {log.sleep}
                              </div>
                            </div>

                            {/* Cravings */}
                            <div className="rounded-xl border border-outline/30 bg-surface-muted/20 p-2.5 flex flex-col justify-between">
                              <span className="text-[0.62rem] font-bold uppercase tracking-wider text-text-muted/80 block flex items-center gap-1">
                                <Flame className="h-3 w-3 text-accent" />
                                Cravings
                              </span>
                              <div className={`mt-2 inline-flex items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(log.cravings)}`}>
                                {log.cravings}
                              </div>
                            </div>
                          </div>

                          {/* Symptoms */}
                          <div>
                            <span className="text-[0.62rem] font-bold uppercase tracking-wider text-text-muted/80 block mb-2">Symptoms</span>
                            {log.symptoms && log.symptoms.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {log.symptoms.map((symptom: string) => (
                                  <span key={symptom} className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-soft text-primary border border-primary/5">
                                    {symptom}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-xs italic text-text-muted/70">No symptoms reported</span>
                            )}
                          </div>

                          {/* Notes */}
                          {log.notes && (
                            <div className="rounded-xl border-l-2 border-l-primary/40 border border-outline/30 bg-surface-muted/30 p-3">
                              <span className="text-[0.62rem] font-bold uppercase tracking-wider text-text-muted/80 block mb-1">Notes</span>
                              <p className="text-xs leading-5 text-text-muted italic">"{log.notes}"</p>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </main>

          <div className="border-t border-primary/10 bg-gradient-to-t from-surface via-surface to-transparent px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-8 sm:px-6">
            <div className="space-y-4">
              <Button variant="primary" size="lg" className="w-full" onClick={() => navigate("/today")}>
                Got it
              </Button>

              <div className="flex flex-col items-center justify-between gap-3 px-1 sm:flex-row">
                <button
                  type="button"
                  className="border-b border-transparent text-sm font-semibold text-secondary transition-colors hover:border-secondary"
                  onClick={() => navigate("/care")}
                >
                  Ask SEKA more
                </button>
                <button
                  type="button"
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-text-muted/70 transition-colors hover:text-text-muted"
                >
                  That doesn&apos;t sound like me
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
