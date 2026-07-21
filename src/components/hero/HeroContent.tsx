import GradientText from "../common/GradientText";
import FadeIn from "../common/FadeIn";
import HeroButtons from "./HeroButtons";

const HeroContent = () => {
  return (
    <FadeIn>
      <div className="mx-auto max-w-5xl px-3 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-red-200 bg-white/80 px-4 py-1.5 text-[0.64rem] font-semibold tracking-[0.16em] text-primary shadow-sm backdrop-blur sm:px-5 sm:py-2 sm:text-sm sm:tracking-[0.2em]">
          EMPATHETIC INTELLIGENCE FOR PCOS
        </span>

        <h1 className="mx-auto mt-5 max-w-4xl text-[clamp(2rem,8vw,3.25rem)] font-bold leading-[1.06] text-gray-900 sm:mt-8 sm:text-5xl lg:text-7xl">
          Your body isn't unpredictable.
          <br />
          <span className="mt-1.5 block sm:mt-3">
            <GradientText>
              It just hasn't been understood.
            </GradientText>
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-6 text-gray-600 sm:mt-8 sm:max-w-2xl sm:text-lg sm:leading-8">
          Seka is your AI Care Manager designed to understand hormonal health,
          surface meaningful patterns, and help you take calm, informed next steps.
        </p>

        <HeroButtons />
      </div>
    </FadeIn>
  );
};

export default HeroContent;
