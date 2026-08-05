import { useState, useEffect, useMemo } from "react";
import { X, Sparkles } from "lucide-react";
import type { AuthUser } from "../../auth/types";

const PCOS_CONCERN_OPTIONS = [
  "Periods are irregular or missing",
  "Acne or oily skin",
  "Facial or body hair growth",
  "Hair fall or thinning",
  "Weight gain or cravings",
  "Fertility concern",
  "Bleeding or spotting",
  "I want to understand my PCOS better",
];

const PERIOD_FREQUENCY_OPTIONS = [
  "Every 21–35 days",
  "Every 36–60 days",
  "More than 60 days apart",
  "Less than 4 periods a year",
  "I do not track",
  "It changes often",
];

const SYMPTOMS_NOTICED_OPTIONS = [
  "Acne",
  "Chin or facial hair",
  "Hair thinning on scalp",
  "Oily skin",
  "Darkening of skin folds",
];

const SYMPTOM_DURATION_OPTIONS = [
  "Less than 1 month",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "More than 1 year",
];

const PREVIOUS_TESTS_OPTIONS = [
  "Hormone tests",
  "Pelvic ultrasound",
  "Blood sugar test",
  "Thyroid test",
  "Prolactin test",
  "I have not had any tests yet",
];

interface OnboardingContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser | null;
  onSave: (answers: {
    pcosConcern: string[];
    periodFrequency: string;
    symptomsNoticed: string[];
    symptomsNoticedCustom: string;
    symptomDuration: string;
    symptomDurationCustom: string;
    previousTests: string[];
  }) => Promise<void>;
}

export function OnboardingContextModal({ isOpen, onClose, user, onSave }: OnboardingContextModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Local Form States initialized from User
  const [pcosConcern, setPcosConcern] = useState<string[]>([]);
  const [periodFrequency, setPeriodFrequency] = useState<string>("");
  const [symptomsNoticed, setSymptomsNoticed] = useState<string[]>([]);
  const [symptomsNoticedCustom, setSymptomsNoticedCustom] = useState<string>("");
  const [symptomDuration, setSymptomDuration] = useState<string>("");
  const [symptomDurationCustom, setSymptomDurationCustom] = useState<string>("");
  const [previousTests, setPreviousTests] = useState<string[]>([]);
  const onboardingOverview = useMemo(() => {
    if (!user?.onboardingAnswers || !isOpen) {
      return [];
    }

    return [
      {
        label: "Main concern",
        value:
          user.onboardingAnswers.pcosConcern?.length > 0
            ? user.onboardingAnswers.pcosConcern.join(", ")
            : "Not added yet",
      },
      {
        label: "Period pattern",
        value: user.onboardingAnswers.periodFrequency || "Not added yet",
      },
      {
        label: "Symptoms noticed",
        value:
          [
            ...(user.onboardingAnswers.symptomsNoticed || []),
            user.onboardingAnswers.symptomsNoticedCustom?.trim()
              ? [user.onboardingAnswers.symptomsNoticedCustom.trim()]
              : [],
          ]
            .flat()
            .filter(Boolean)
            .join(", ") || "Not added yet",
      },
      {
        label: "Symptom duration",
        value:
          user.onboardingAnswers.symptomDurationCustom?.trim() ||
          user.onboardingAnswers.symptomDuration ||
          "Not added yet",
      },
      {
        label: "Previous tests",
        value:
          user.onboardingAnswers.previousTests?.length > 0
            ? user.onboardingAnswers.previousTests.join(", ")
            : "Not added yet",
      },
    ];
  }, [isOpen, user]);

  // Synchronize state when modal opens or user profile updates
  useEffect(() => {
    if (isOpen && user) {
      const answers = user.onboardingAnswers || {
        pcosConcern: [],
        periodFrequency: "",
        symptomsNoticed: [],
        symptomsNoticedCustom: "",
        symptomDuration: "",
        symptomDurationCustom: "",
        previousTests: [],
      };
      setPcosConcern(answers.pcosConcern || []);
      setPeriodFrequency(answers.periodFrequency || "");
      setSymptomsNoticed(answers.symptomsNoticed || []);
      setSymptomsNoticedCustom(answers.symptomsNoticedCustom || "");
      setSymptomDuration(answers.symptomDuration || "");
      setSymptomDurationCustom(answers.symptomDurationCustom || "");
      setPreviousTests(answers.previousTests || []);
      setErrorMsg("");
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleTogglePcosConcern = (option: string) => {
    setPcosConcern((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleToggleSymptomsNoticed = (option: string) => {
    setSymptomsNoticed((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleTogglePreviousTests = (option: string) => {
    if (option === "I have not had any tests yet") {
      setPreviousTests(["I have not had any tests yet"]);
    } else {
      setPreviousTests((prev) => {
        const filtered = prev.filter((o) => o !== "I have not had any tests yet");
        return filtered.includes(option)
          ? filtered.filter((o) => o !== option)
          : [...filtered, option];
      });
    }
  };

  const validate = () => {
    if (pcosConcern.length === 0) return "Please choose at least one PCOS-related concern.";
    if (!periodFrequency) return "Please select a period frequency.";
    if (symptomsNoticed.length === 0 && !symptomsNoticedCustom.trim()) return "Please select or type a symptom noticed.";
    if (!symptomDuration && !symptomDurationCustom.trim()) return "Please select or type a symptom duration.";
    if (previousTests.length === 0) return "Please choose at least one test selection.";
    return null;
  };

  const handleSubmit = async () => {
    setErrorMsg("");
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        pcosConcern,
        periodFrequency,
        symptomsNoticed,
        symptomsNoticedCustom,
        symptomDuration,
        symptomDurationCustom,
        previousTests,
      });
      onClose();
    } catch (err) {
      const response = err as { message?: string };
      setErrorMsg(response.message || "Failed to save updates. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1b18]/40 backdrop-blur-sm overflow-hidden animate-fade-in">
      <div className="bg-[#fff8f5] rounded-3xl border border-[#e3bebb]/60 w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e3bebb]/30 bg-white/50">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-serif text-[20px] text-[#1e1b18] font-normal leading-tight">
                PCOS Health Context
              </h2>
              <p className="text-[12px] text-[#5a403f] mt-0.5">
                Review and update your onboarding health profiles.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center text-[#5a403f] hover:bg-[#efe6e2] hover:text-[#1e1b18] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-grow overflow-y-auto px-6 py-6 space-y-8 custom-scrollbar">
          {errorMsg && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-[14px] font-medium text-red-700">
              {errorMsg}
            </div>
          )}

          {onboardingOverview.length ? (
            <section className="rounded-2xl border border-[#e3bebb]/40 bg-white/80 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a23d2d]">
                    Saved overview
                  </p>
                  <p className="mt-1 text-[13px] text-[#5a403f]">
                    These are the answers currently stored in your profile.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {onboardingOverview.map((item) => (
                  <div key={item.label} className="rounded-xl border border-[#e3bebb]/35 bg-[#fff8f5] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a23d2d]/80">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[#1e1b18]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Q1: Main Concern */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-semibold text-[#1e1b18]">
              1. What is the main PCOS-related concern today?
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PCOS_CONCERN_OPTIONS.map((opt) => {
                const selected = pcosConcern.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => handleTogglePcosConcern(opt)}
                    className={`px-4 py-2.5 rounded-xl border text-left text-[14px] transition-all duration-150 ${
                      selected
                        ? "bg-[#b6212a] border-[#b6212a] text-white font-medium shadow-sm"
                        : "bg-white border-[#e3bebb]/40 text-[#1e1b18] hover:border-[#b6212a]/30"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Q2: Period Frequency */}
          <div className="space-y-3 border-t border-[#e3bebb]/20 pt-6">
            <h3 className="text-[15px] font-semibold text-[#1e1b18]">
              2. How often do you usually get a period?
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PERIOD_FREQUENCY_OPTIONS.map((opt) => {
                const selected = periodFrequency === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setPeriodFrequency(opt)}
                    className={`px-4 py-2.5 rounded-xl border text-left text-[14px] transition-all duration-150 ${
                      selected
                        ? "bg-[#b6212a] border-[#b6212a] text-white font-medium shadow-sm"
                        : "bg-white border-[#e3bebb]/40 text-[#1e1b18] hover:border-[#b6212a]/30"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Q3: Prominent Symptoms */}
          <div className="space-y-3 border-t border-[#e3bebb]/20 pt-6">
            <h3 className="text-[15px] font-semibold text-[#1e1b18]">
              3. Which of these are you noticing most?
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SYMPTOMS_NOTICED_OPTIONS.map((opt) => {
                const selected = symptomsNoticed.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => handleToggleSymptomsNoticed(opt)}
                    className={`px-4 py-2.5 rounded-xl border text-left text-[14px] transition-all duration-150 ${
                      selected
                        ? "bg-[#b6212a] border-[#b6212a] text-white font-medium shadow-sm"
                        : "bg-white border-[#e3bebb]/40 text-[#1e1b18] hover:border-[#b6212a]/30"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <div className="pt-2">
              <label className="text-[13px] text-[#5a403f] font-medium" htmlFor="modal-symptoms-custom">
                Custom/Other Symptoms:
              </label>
              <input
                type="text"
                id="modal-symptoms-custom"
                placeholder="Mention if any other..."
                value={symptomsNoticedCustom}
                onChange={(e) => setSymptomsNoticedCustom(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 rounded-xl bg-white border border-[#e3bebb]/60 focus:outline-none focus:border-[#b6212a] text-[14px] text-[#1e1b18]"
              />
            </div>
          </div>

          {/* Q4: Symptom Duration */}
          <div className="space-y-3 border-t border-[#e3bebb]/20 pt-6">
            <h3 className="text-[15px] font-semibold text-[#1e1b18]">
              4. How long has each symptom been happening?
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SYMPTOM_DURATION_OPTIONS.map((opt) => {
                const selected = symptomDuration === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setSymptomDuration(opt)}
                    className={`px-4 py-2.5 rounded-xl border text-left text-[14px] transition-all duration-150 ${
                      selected
                        ? "bg-[#b6212a] border-[#b6212a] text-white font-medium shadow-sm"
                        : "bg-white border-[#e3bebb]/40 text-[#1e1b18] hover:border-[#b6212a]/30"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <div className="pt-2">
              <label className="text-[13px] text-[#5a403f] font-medium" htmlFor="modal-duration-custom">
                Custom Duration Note:
              </label>
              <input
                type="text"
                id="modal-duration-custom"
                placeholder="Mention custom timeline..."
                value={symptomDurationCustom}
                onChange={(e) => setSymptomDurationCustom(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 rounded-xl bg-white border border-[#e3bebb]/60 focus:outline-none focus:border-[#b6212a] text-[14px] text-[#1e1b18]"
              />
            </div>
          </div>

          {/* Q5: Diagnostic Tests */}
          <div className="space-y-3 border-t border-[#e3bebb]/20 pt-6">
            <h3 className="text-[15px] font-semibold text-[#1e1b18]">
              5. What tests and treatments have you had before?
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PREVIOUS_TESTS_OPTIONS.map((opt) => {
                const selected = previousTests.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => handleTogglePreviousTests(opt)}
                    className={`px-4 py-2.5 rounded-xl border text-left text-[14px] transition-all duration-150 ${
                      selected
                        ? "bg-[#b6212a] border-[#b6212a] text-white font-medium shadow-sm"
                        : "bg-white border-[#e3bebb]/40 text-[#1e1b18] hover:border-[#b6212a]/30"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#e3bebb]/30 bg-white/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#e3bebb] text-[14px] text-[#5a403f] hover:bg-[#efe6e2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2.5 rounded-xl text-[14px] font-semibold text-white shadow transition-colors ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#a23d2d] hover:bg-[#832618] cursor-pointer"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
