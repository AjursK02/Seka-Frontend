import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/common/LandingContainer";
import FadeIn from "../components/common/LandingFadeIn";
import QuestionCard from "../components/onboarding/LandingQuestionCard";
import ResultCard from "../components/onboarding/LandingResultCard";
import { ONBOARDING_QUESTIONS } from "../constants/onboardingOptions";
import { getUserGroup } from "../utils/onboardingLogic";
import { useAuth } from "../auth/AuthContext";
import type {
  GroupResult,
  OnboardingAnswers,
} from "../types/onboarding";

const initialAnswers: OnboardingAnswers = {
  q1: "",
  q2: "",
  q3: "",
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  const [answers, setAnswers] =
    useState<OnboardingAnswers>(initialAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<GroupResult | null>(
    null
  );

  const currentQuestion = ONBOARDING_QUESTIONS[currentStep];
  const selectedValue = answers[currentQuestion.id];

  const handleSelect = (value: string) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));
  };

  const handleContinue = () => {
    if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
      setCurrentStep((step) => step + 1);
      return;
    }

    const matchedGroup = getUserGroup(answers);
    setResult(matchedGroup);
  };

  const handleBack = () => {
    if (currentStep === 0) {
      return;
    }

    setCurrentStep((step) => step - 1);
  };

  const handleRestart = () => {
    setAnswers(initialAnswers);
    setCurrentStep(0);
    setResult(null);
  };

  const handleTryNow = () => {
    if (accessToken && user) {
      navigate(user.isOnboarded ? "/care" : "/onboarding");
    } else {
      navigate("/login");
    }
  };

  return (
    <section
      id="onboarding"
      className="bg-[#f8f5f4] py-8 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="mx-auto grid max-w-3xl gap-5">
          <h1 className="mx-auto max-w-2xl text-center text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Let's Get to Know You
          </h1>
          <FadeIn>
            {result ? (
              <ResultCard
                result={result}
                onRestart={handleRestart}
                onTryNow={handleTryNow}
              />
            ) : (
              <QuestionCard
                currentStep={currentStep}
                totalSteps={ONBOARDING_QUESTIONS.length}
                question={currentQuestion}
                value={selectedValue}
                onSelect={handleSelect}
                onBack={handleBack}
                onContinue={handleContinue}
                canContinue={Boolean(selectedValue)}
              />
            )}
          </FadeIn>
        </div>
      </Container>
    </section>
  );
};

export default Onboarding;
