import Button from "../common/LandingButton";
import GlassCard from "../common/LandingGlassCard";
import type { GroupResult } from "../../types/onboarding";

interface Props {
  result: GroupResult;
  onRestart: () => void;
  onJoinWaitlist: () => void;
}

const ResultCard = ({
  result,
  onRestart,
  onJoinWaitlist,
}: Props) => {
  const onboardingButtonClass =
    "w-full min-w-0 !px-2.5 !py-2 !text-[0.5rem] !leading-none sm:w-auto sm:!px-8 sm:!py-4 sm:!text-sm";

  return (
    <GlassCard className="overflow-hidden border border-white/70 bg-white/90 p-4 shadow-[0_20px_60px_-30px_rgba(182,33,42,0.25)] sm:p-8 lg:p-10">


      <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:mt-6 sm:text-3xl">
        {result.title}
      </h3>

      <p className="mt-4 max-w-2xl text-[0.9rem] leading-6 text-gray-600 sm:mt-5 sm:text-base sm:leading-7">
        {result.message}
      </p>

      <div className="mt-6 grid grid-cols-2 items-stretch gap-2 sm:mt-8 sm:flex sm:flex-row sm:items-center sm:gap-3">
        <Button
          variant="outline"
          onClick={onRestart}
          className={onboardingButtonClass}
        >
          Start Over
        </Button>

        <Button
          onClick={onJoinWaitlist}
          className={onboardingButtonClass}
        >
          Join Early Access
        </Button>
      </div>
    </GlassCard>
  );
};

export default ResultCard;
