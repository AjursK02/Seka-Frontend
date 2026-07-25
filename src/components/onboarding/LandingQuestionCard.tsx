import Button from "../common/LandingButton";
import GlassCard from "../common/LandingGlassCard";
import ProgressBar from "./LandingProgressBar";
import Question from "./LandingQuestion";
import type { OnboardingQuestion } from "../../types/onboarding";

interface Props {
  currentStep: number;
  totalSteps: number;
  question: OnboardingQuestion;
  value: string;
  onSelect: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
}

const QuestionCard = ({
  currentStep,
  totalSteps,
  question,
  value,
  onSelect,
  onBack,
  onContinue,
  canContinue,
}: Props) => {
  return (
    <GlassCard className="overflow-hidden border border-white/70 bg-white/85 p-4 shadow-[0_20px_60px_-30px_rgba(182,33,42,0.25)] sm:p-8 lg:p-10">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="mt-6 sm:mt-8">
        <Question
          question={question}
          value={value}
          onSelect={onSelect}
          stepLabel={`Question ${currentStep + 1} of ${totalSteps}`}
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={currentStep === 0}
          className="w-full px-3 py-3 text-[0.68rem] sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
        >
          Back
        </Button>

        <Button
          onClick={onContinue}
          disabled={!canContinue}
          className="w-full px-3 py-3 text-[0.68rem] sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
        >
          {currentStep === totalSteps - 1 ? "See Results" : "Continue"}
        </Button>
      </div>
    </GlassCard>
  );
};

export default QuestionCard;
