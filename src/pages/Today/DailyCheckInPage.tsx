import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  NotebookPen,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Section } from "../../components/common/Section";
import { getDailyCheckInsRequest, createOrUpdateDailyCheckInRequest } from "../../api/contextApi";

const energyOptions = ["Low", "Okay", "Good"] as const;
const moodOptions = ["Low", "Okay", "Good"] as const;
const sleepOptions = ["Poor", "Okay", "Good"] as const;
const cravingsOptions = ["None", "Some", "Strong"] as const;
const symptomOptions = ["Bloating", "Acne", "Cramps", "Headaches", "Fatigue"] as const;

type EnergyOption = (typeof energyOptions)[number];
type MoodOption = (typeof moodOptions)[number];
type SleepOption = (typeof sleepOptions)[number];
type CravingsOption = (typeof cravingsOptions)[number];

export function DailyCheckInPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const savedOnlyTimerRef = useRef<number | null>(null);

  const [energy, setEnergy] = useState<EnergyOption>("Okay");
  const [mood, setMood] = useState<MoodOption>("Good");
  const [sleep, setSleep] = useState<SleepOption>("Okay");
  const [cravings, setCravings] = useState<CravingsOption>("Some");
  const [notes, setNotes] = useState("I've been feeling exhausted since Monday.");
  const [symptoms, setSymptoms] = useState<string[]>(["Fatigue"]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTodayCheckIn = async () => {
      try {
        const today = new Date();
        const dateStr = today.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const res = await getDailyCheckInsRequest();
        if (controller.signal.aborted) {
          return;
        }

        if (res.success && res.data) {
          const todayLog = res.data.find((item: any) => item.date === dateStr);
          if (todayLog) {
            setEnergy(todayLog.energy as EnergyOption);
            setMood(todayLog.mood as MoodOption);
            setSleep(todayLog.sleep as SleepOption);
            setCravings(todayLog.cravings as CravingsOption);
            setNotes(todayLog.notes);
            setSymptoms(todayLog.symptoms);
          }
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Failed to load today's check-in from database:", err);
        }
      }
    };

    fetchTodayCheckIn();

    return () => {
      if (savedOnlyTimerRef.current) {
        window.clearTimeout(savedOnlyTimerRef.current);
      }
      controller.abort();
    };
  }, []);

  const toggleSymptom = (symptom: string) => {
    setSymptoms((current) =>
      current.includes(symptom)
        ? current.filter((item) => item !== symptom)
        : [...current, symptom],
    );
  };

  const [isSavingOnly, setIsSavingOnly] = useState(false);
  const [isSavedOnly, setIsSavedOnly] = useState(false);

  const handleSaveAndNavigate = async () => {
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    const dayStr = today.toLocaleDateString("en-US", { weekday: "long" });

    const newCheckIn = {
      date: dateStr,
      day: dayStr,
      energy,
      mood,
      sleep,
      cravings,
      symptoms,
      notes,
    };

    try {
      await createOrUpdateDailyCheckInRequest(newCheckIn);
      navigate("/today/daily-check-in/insight");
    } catch (err) {
      console.error("Failed to save check-in to database:", err);
      navigate("/today/daily-check-in/insight");
    }
  };

  const handleSaveOnly = async () => {
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const dayStr = today.toLocaleDateString("en-US", { weekday: "long" });

    const newCheckIn = {
      date: dateStr,
      day: dayStr,
      energy,
      mood,
      sleep,
      cravings,
      symptoms,
      notes,
    };

    setIsSavingOnly(true);
    setIsSavedOnly(false);
    try {
      await createOrUpdateDailyCheckInRequest(newCheckIn);
      setIsSavedOnly(true);
      if (savedOnlyTimerRef.current) {
        window.clearTimeout(savedOnlyTimerRef.current);
      }
      savedOnlyTimerRef.current = window.setTimeout(() => {
        setIsSavedOnly(false);
        savedOnlyTimerRef.current = null;
      }, 2500);
    } catch (err) {
      console.error("Failed to save check-in to database:", err);
    } finally {
      setIsSavingOnly(false);
    }
  };

  const pillButtonClasses =
    "flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";

  return (
    <Section className="space-y-6 pb-8">
      <motion.header
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            leadingIcon={<ArrowLeft className="h-4 w-4" />}
            className="rounded-full"
            onClick={() => navigate("/today")}
          >
            Back to Today
          </Button>

          <div className="hidden items-center gap-2 rounded-full border border-primary/10 bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted sm:flex">
            <CalendarDays className="h-4 w-4 text-primary" />
            Daily Check In
          </div>
        </div>

        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
            Daily Check In
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-text sm:text-5xl">
            How are you feeling today?
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
            Your daily signal helps SEKA adapt your care plan. Share the basics so we can
            match today’s support to how your body actually feels.
          </p>
        </div>
      </motion.header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
        >
          <Card className="space-y-6">
            <form className="space-y-6">
              <fieldset className="space-y-3">
                <legend className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
                  Energy
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {energyOptions.map((option) => (
                    <label
                      key={option}
                      className={`${pillButtonClasses} ${
                        energy === option
                          ? "border-primary bg-primary text-white shadow-soft"
                          : "border-outline bg-surface text-text-muted hover:bg-surface-muted"
                      }`}
                    >
                      <input
                        className="sr-only"
                        name="energy"
                        type="radio"
                        value={option.toLowerCase()}
                        checked={energy === option}
                        onChange={() => setEnergy(option)}
                      />
                      <span className="block text-center">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
                  Mood
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {moodOptions.map((option) => (
                    <label
                      key={option}
                      className={`${pillButtonClasses} ${
                        mood === option
                          ? "border-primary bg-primary text-white shadow-soft"
                          : "border-outline bg-surface text-text-muted hover:bg-surface-muted"
                      }`}
                    >
                      <input
                        className="sr-only"
                        name="mood"
                        type="radio"
                        value={option.toLowerCase()}
                        checked={mood === option}
                        onChange={() => setMood(option)}
                      />
                      <span className="block text-center">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
                  Sleep
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {sleepOptions.map((option) => (
                    <label
                      key={option}
                      className={`${pillButtonClasses} ${
                        sleep === option
                          ? "border-primary bg-primary text-white shadow-soft"
                          : "border-outline bg-surface text-text-muted hover:bg-surface-muted"
                      }`}
                    >
                      <input
                        className="sr-only"
                        name="sleep"
                        type="radio"
                        value={option.toLowerCase()}
                        checked={sleep === option}
                        onChange={() => setSleep(option)}
                      />
                      <span className="block text-center">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
                  Cravings
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {cravingsOptions.map((option) => (
                    <label
                      key={option}
                      className={`${pillButtonClasses} ${
                        cravings === option
                          ? "border-primary bg-primary text-white shadow-soft"
                          : "border-outline bg-surface text-text-muted hover:bg-surface-muted"
                      }`}
                    >
                      <input
                        className="sr-only"
                        name="cravings"
                        type="radio"
                        value={option.toLowerCase()}
                        checked={cravings === option}
                        onChange={() => setCravings(option)}
                      />
                      <span className="block text-center">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
                  <span>Symptoms</span>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-text-muted/80">
                    Optional
                  </span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {symptomOptions.map((symptom) => {
                    const active = symptoms.includes(symptom);

                    return (
                      <label
                        key={symptom}
                        className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                          active
                            ? "border-primary bg-primary-soft text-primary"
                            : "border-outline bg-surface text-text-muted hover:bg-surface-muted"
                        }`}
                      >
                        <input
                          className="sr-only"
                          type="checkbox"
                          checked={active}
                          onChange={() => toggleSymptom(symptom)}
                        />
                        {symptom}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
                  Anything else on your mind?
                </legend>
                <textarea
                  className="min-h-32 w-full rounded-2xl border border-outline bg-background px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="I've been feeling exhausted since Monday."
                  rows={4}
                />
              </fieldset>

              <div className="pt-2">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  className={`w-full sm:w-auto transition-colors duration-300 ${
                    isSavedOnly ? "!bg-emerald-600 hover:!bg-emerald-700" : ""
                  }`}
                  leadingIcon={
                    isSavedOnly ? (
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    ) : (
                      <NotebookPen className="h-5 w-5" />
                    )
                  }
                  onClick={handleSaveOnly}
                  disabled={isSavingOnly}
                >
                  {isSavingOnly ? "Saving..." : isSavedOnly ? "Saved!" : "Save"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          >
            <Card className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-text-muted">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                What happens next
              </div>
              <div className="space-y-3">
                {[
                  "Your check-in stays anchored to today’s cycle context.",
                  "SEKA compares your symptoms with the signals you have already shared.",
                  "You can return to Today, Care, or Patterns any time.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm leading-6 text-text-muted">{item}</p>
                  </div>
                ))}
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                leadingIcon={<NotebookPen className="h-5 w-5" />}
                onClick={handleSaveAndNavigate}
              >
                Let SEKA make sense of this
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
