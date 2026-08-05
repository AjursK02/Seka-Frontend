import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export function OnboardingContext() {
  const navigate = useNavigate();
  const { completeOnboarding, logout } = useAuth();

  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [pcosConcern, setPcosConcern] = useState<string[]>([]);
  const [periodFrequency, setPeriodFrequency] = useState<string>("");
  const [symptomsNoticed, setSymptomsNoticed] = useState<string[]>([]);
  const [symptomsNoticedCustom, setSymptomsNoticedCustom] = useState<string>("");
  const [symptomDuration, setSymptomDuration] = useState<string>("");
  const [symptomDurationCustom, setSymptomDurationCustom] = useState<string>("");
  const [previousTests, setPreviousTests] = useState<string[]>([]);

  // Questions Configuration
  const questions = [
    {
      id: 1,
      title: "What is the main PCOS-related concern today?",
      description: "Select all that apply. This helps me tailor insights to what matters most to you.",
      isMultiSelect: true,
      options: [
        "Periods are irregular or missing",
        "Acne or oily skin",
        "Facial or body hair growth",
        "Hair fall or thinning",
        "Weight gain or cravings",
        "Fertility concern",
        "Bleeding or spotting",
        "I want to understand my PCOS better",
      ],
    },
    {
      id: 2,
      title: "How often do you usually get a period?",
      description: "Choose the option that feels closest to your current experience.",
      isMultiSelect: false,
      options: [
        "Every 21–35 days",
        "Every 36–60 days",
        "More than 60 days apart",
        "Less than 4 periods a year",
        "I do not track",
        "It changes often",
      ],
    },
    {
      id: 3,
      title: "Which of these are you noticing most?",
      description: "Select all physical signs that are most prominent.",
      isMultiSelect: true,
      options: [
        "Acne",
        "Chin or facial hair",
        "Hair thinning on scalp",
        "Oily skin",
        "Darkening of skin folds",
      ],
      hasCustomInput: true,
      customInputPlaceholder: "Mention (If any other)...",
    },
    {
      id: 4,
      title: "How long has each symptom been happening?",
      description: "This helps us understand the duration and pattern of your symptoms.",
      isMultiSelect: false,
      options: [
        "Less than 1 month",
        "1–3 months",
        "3–6 months",
        "6–12 months",
        "More than 1 year",
      ],
      hasCustomInput: true,
      customInputPlaceholder: "Mention (If any other)...",
    },
    {
      id: 5,
      title: "What tests and treatments have you had before?",
      description: "Select all that apply. This helps build a picture of your clinical history.",
      isMultiSelect: true,
      options: [
        "Hormone tests",
        "Pelvic ultrasound",
        "Blood sugar test",
        "Thyroid test",
        "Prolactin test",
        "I have not had any tests yet",
      ],
    },
  ];

  const currentQuestion = questions[step - 1];

  const handleToggleOption = (option: string) => {
    setErrorMsg("");
    if (step === 1) {
      setPcosConcern((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      );
    } else if (step === 2) {
      setPeriodFrequency(option);
    } else if (step === 3) {
      setSymptomsNoticed((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      );
    } else if (step === 4) {
      // If choosing a standard option, clear custom text so they don't clash, or keep both. Let's select it
      setSymptomDuration(option);
    } else if (step === 5) {
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
    }
  };

  const isOptionSelected = (option: string) => {
    if (step === 1) return pcosConcern.includes(option);
    if (step === 2) return periodFrequency === option;
    if (step === 3) return symptomsNoticed.includes(option);
    if (step === 4) return symptomDuration === option;
    if (step === 5) return previousTests.includes(option);
    return false;
  };

  const validateStep = () => {
    if (step === 1) return pcosConcern.length > 0;
    if (step === 2) return periodFrequency !== "";
    if (step === 3) return symptomsNoticed.length > 0 || symptomsNoticedCustom.trim() !== "";
    if (step === 4) return symptomDuration !== "" || symptomDurationCustom.trim() !== "";
    if (step === 5) return previousTests.length > 0;
    return false;
  };

  const handleBack = async () => {
    setErrorMsg("");
    if (step > 1) {
      setStep((s) => s - 1);
    } else {
      // If at step 1, clicking back triggers logout and sends back to Landing Page
      try {
        await logout();
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Logout failed during onboarding exit:", err);
        navigate("/", { replace: true });
      }
    }
  };

  const handleContinue = async () => {
    setErrorMsg("");
    if (!validateStep()) {
      setErrorMsg("Please select an option or fill in the detail before continuing.");
      return;
    }

    if (step < 5) {
      setStep((s) => s + 1);
      return;
    }

    // Submit Answers
    setIsSubmitting(true);
    try {
      await completeOnboarding({
        pcosConcern,
        periodFrequency,
        symptomsNoticed,
        symptomsNoticedCustom,
        symptomDuration,
        symptomDurationCustom,
        previousTests,
      });
      navigate("/care", { replace: true });
    } catch (err) {
      const response = err as { message?: string };
      setErrorMsg(response.message || "Failed to save your answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress calculations
  const progressPercent = ((step - 1) / 4) * 100;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#fff8f5] text-[#1e1b18] font-sans antialiased">
      {/* Inline styles for pulse dot & premium fadeInUp animations */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c8c6c3;
          border-radius: 4px;
        }
        
        .pulse-dot {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
          transform: translateY(12px);
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Top Navigation */}
      <header className="relative z-10 flex w-full max-w-[480px] mx-auto items-center justify-between px-6 pt-6 flex-shrink-0 bg-[#fff8f5]">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#5a403f] hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="text-[13px] font-semibold tracking-wider uppercase">Back</span>
        </button>
        <div className="font-serif text-[32px] font-normal text-[#b6212a]">SEKA</div>
        <div className="w-[50px]"></div>
      </header>

      {/* Progress Indicator Timeline */}
      <div className="w-full max-w-[480px] mx-auto px-6 pt-8 flex-shrink-0">
        <div className="relative flex justify-between items-center">
          {/* Timeline Track */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[#a23d2d]/15 z-0"></div>
          {/* Active Track */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#b6212a] z-0 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
          {/* Nodes */}
          {[1, 2, 3, 4, 5].map((idx) => {
            const isActive = idx <= step;
            return (
              <div
                key={idx}
                className={`relative z-10 w-2.5 h-2.5 rounded-full transition-colors duration-500 ring-4 ring-[#fff8f5] ${
                  isActive ? "bg-[#b6212a]" : "bg-[#a23d2d]/20"
                }`}
              />
            );
          })}
        </div>
        <div className="text-center mt-3 text-[11px] font-semibold text-[#5a403f] uppercase tracking-widest">
          Step {step} of 5
        </div>
      </div>

      {/* Main Content (Scrollable) */}
      <main className="flex-grow overflow-y-auto custom-scrollbar relative px-6 mt-4">
        {/* Background Blur/Atmosphere (Visible on MD screens and above for premium aesthetics) */}
        <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-white/40 backdrop-blur-3xl rounded-r-[100px]"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/40 backdrop-blur-3xl rounded-l-[100px]"></div>
        </div>

        <div className="max-w-[480px] mx-auto w-full pt-6 pb-32 relative z-10 flex flex-col gap-8">
          {/* Error Message */}
          {errorMsg && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-[14px] font-medium text-red-700 fade-in-up">
              {errorMsg}
            </div>
          )}

          {/* Question Text */}
          <section className="flex flex-col gap-4 fade-in-up">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#efe6e2] flex items-center justify-center flex-shrink-0 mt-1 border border-[#e3bebb]/30">
                <div className="w-2 h-2 rounded-full bg-[#b6212a] pulse-dot"></div>
              </div>
              <div>
                <h1 className="font-serif text-[24px] text-[#1e1b18] leading-tight font-normal">
                  {currentQuestion.title}
                </h1>
                <p className="text-[16px] text-[#5a403f] mt-2 leading-relaxed">
                  {currentQuestion.description}
                </p>
              </div>
            </div>
          </section>

          {/* Options Grid (Chips) */}
          <section className="fade-in-up pl-12 flex flex-col gap-6">
            <div className="flex flex-wrap gap-3">
              {currentQuestion.options.map((option) => {
                const selected = isOptionSelected(option);
                return (
                  <button
                    key={option}
                    onClick={() => handleToggleOption(option)}
                    className={`px-5 py-3 rounded-xl border text-left text-[15px] font-medium transition-all duration-200 shadow-sm hover:shadow focus:outline-none ${
                      selected
                        ? "bg-[#b6212a] border-[#b6212a] text-white"
                        : "bg-white border-[#e3bebb]/50 text-[#1e1b18] hover:border-[#b6212a]/50"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Custom Write-In Input (If applicable for Q3 or Q4) */}
            {currentQuestion.hasCustomInput && (
              <div className="mt-2 transition-all duration-200">
                <label className="sr-only" htmlFor="custom-onboarding-input">
                  Other struggles
                </label>
                <input
                  type="text"
                  id="custom-onboarding-input"
                  placeholder={currentQuestion.customInputPlaceholder}
                  value={step === 3 ? symptomsNoticedCustom : symptomDurationCustom}
                  onChange={(e) => {
                    setErrorMsg("");
                    if (step === 3) {
                      setSymptomsNoticedCustom(e.target.value);
                    } else if (step === 4) {
                      setSymptomDurationCustom(e.target.value);
                    }
                  }}
                  className="w-full bg-transparent border-0 border-b border-[#a23d2d]/30 pb-2 px-1 focus:ring-0 focus:border-[#b6212a] text-[16px] text-[#1e1b18] placeholder-[#5a403f]/50 transition-colors"
                />
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Bottom Floating Action Area */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#fff8f5] via-[#fff8f5]/90 to-transparent pt-12 pb-8 px-6 z-20">
        <div className="max-w-[480px] mx-auto flex justify-end">
          <button
            onClick={handleContinue}
            disabled={isSubmitting || !validateStep()}
            className={`px-8 py-4 rounded-xl font-semibold text-[13px] uppercase tracking-widest transition-all duration-200 shadow-sm flex items-center gap-2 group focus:outline-none ${
              validateStep() && !isSubmitting
                ? "bg-[#a23d2d] text-white hover:bg-[#832618] cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
            }`}
          >
            {isSubmitting
              ? "Saving..."
              : step === 5
              ? "Finish"
              : "Continue"}
            {!isSubmitting && (
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
