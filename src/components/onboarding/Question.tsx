import { Check } from "lucide-react";
import clsx from "clsx";
import type { OnboardingQuestion } from "../../types/onboarding";

interface Props {
  question: OnboardingQuestion;
  value: string;
  onSelect: (value: string) => void;
  stepLabel: string;
}

const Question = ({
  question,
  value,
  onSelect,
  stepLabel,
}: Props) => {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="space-y-2.5 sm:space-y-3">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm sm:tracking-[0.28em]">
          {stepLabel}
        </p>

        <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {question.title}
        </h3>

        <p className="max-w-2xl text-[0.9rem] leading-6 text-gray-600 sm:text-base sm:leading-7">
          {question.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3">
        {question.options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(option.value)}
              className={clsx(
                "group flex w-full items-start justify-between gap-2 rounded-2xl border px-3 py-3 text-left transition-all duration-200 sm:gap-4 sm:px-5 sm:py-5",
                selected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/15"
                  : "border-outline bg-white hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              )}
            >
              <span className="text-[0.72rem] font-medium leading-5 text-gray-800 sm:text-[15px] sm:leading-6">
                {option.label}
              </span>

              <span
                className={clsx(
                  "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition sm:h-6 sm:w-6",
                  selected
                    ? "border-primary bg-primary text-white"
                    : "border-outline bg-transparent text-transparent group-hover:border-primary/50"
                )}
              >
                <Check
                  size={12}
                  className={selected ? "opacity-100" : "opacity-0"}
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
