import { lazy, Suspense } from "react";
import Navbar from "../components/layout/LandingNavbar";
import Hero from "../components/hero/LandingHero";
import ScrollToTopButton from "../components/common/LandingScrollToTopButton";

const Onboarding = lazy(() => import("./LandingOnboarding"));
const PremiumFeatures = lazy(
  () => import("../components/features/LandingPremiumFeatures")
);
const MeetSeka = lazy(() => import("../components/meet/LandingMeetSeka"));
const Trust = lazy(() => import("../components/trust/LandingTrust"));
const Waitlist = lazy(() => import("../components/waitlist/LandingWaitlist"));
const Footer = lazy(() => import("../components/layout/LandingFooter"));

const SectionFallback = ({
  className,
  innerClassName,
}: {
  className: string;
  innerClassName: string;
}) => {
  return (
    <section className={className} aria-hidden="true">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
        <div
          className={`animate-pulse rounded-[2rem] bg-white/60 shadow-sm ${innerClassName}`}
        />
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div id="top">
      <Navbar />

      <Hero />

      <Suspense
        fallback={
          <SectionFallback
            className="bg-[#f8f5f4] py-8 sm:py-16 lg:py-20"
            innerClassName="h-[28rem] sm:h-[34rem]"
          />
        }
      >
        <Onboarding />
      </Suspense>

      <Suspense
        fallback={
          <SectionFallback
            className="bg-[#faf7f5] py-10 sm:py-20"
            innerClassName="h-[34rem] sm:h-[38rem]"
          />
        }
      >
        <PremiumFeatures />
      </Suspense>

      <Suspense
        fallback={
          <SectionFallback
            className="bg-[#f8f5f4] py-12 sm:py-20"
            innerClassName="h-[32rem] sm:h-[36rem]"
          />
        }
      >
        <MeetSeka />
      </Suspense>

      <Suspense
        fallback={
          <SectionFallback
            className="bg-white py-12 sm:py-20"
            innerClassName="h-[20rem] sm:h-[24rem]"
          />
        }
      >
        <Trust />
      </Suspense>

      <Suspense
        fallback={
          <SectionFallback
            className="bg-[#FDF2F0] py-10 sm:py-16 lg:py-20"
            innerClassName="h-[24rem] sm:h-[28rem]"
          />
        }
      >
        <Waitlist />
      </Suspense>

      <Suspense
        fallback={
          <SectionFallback
            className="bg-black py-10 sm:py-14"
            innerClassName="h-[22rem] sm:h-[18rem] bg-white/10"
          />
        }
      >
        <Footer />
      </Suspense>

      <ScrollToTopButton />
    </div>
  );
};

export default Home;
