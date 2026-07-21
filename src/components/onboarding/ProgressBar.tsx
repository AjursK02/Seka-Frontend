interface Props {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: Props) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-gray-500 sm:text-sm">
        <span>Step {currentStep + 1}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-primary-soft">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
