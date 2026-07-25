import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Droplets,
  Dumbbell,
  FileText,
  HeartPulse,
  MoonStar,
  Pill,
  Smile,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import Button from "../common/LandingButton";
import Container from "../common/LandingContainer";
import FadeIn from "../common/LandingFadeIn";
import GlassCard from "../common/LandingGlassCard";
import useViewportWidth from "../../hooks/useViewportWidth";

const features = [
  {
    title: "Menstrual Cycle Tracking",
    description:
      "Track periods, ovulation, and cycle predictions with AI-driven precision.",
    icon: CalendarDays,
  },
  {
    title: "PCOS Companion",
    description:
      "Monitor symptoms and hormonal trends with specialized analytical tools.",
    icon: HeartPulse,
  },
  {
    title: "Nutrition Planning",
    description:
      "Personalized meal recommendations tailored to your goals and profile.",
    icon: UtensilsCrossed,
  },
  {
    title: "Exercise Guidance",
    description:
      "Workouts designed to support your cycle instead of fighting it.",
    icon: Dumbbell,
  },
  {
    title: "Sleep Tracking",
    description:
      "Monitor sleep quality and recovery habits to optimize your routine.",
    icon: MoonStar,
  },
  {
    title: "Water Intake",
    description:
      "Smart hydration reminders that adapt to your activity and day.",
    icon: Droplets,
  },
  {
    title: "Mood Tracking",
    description:
      "Understand emotional patterns and mental clarity across the month.",
    icon: Smile,
  },
  {
    title: "Medication Reminders",
    description:
      "Stay on top of medications and supplements with discreet alerts.",
    icon: Pill,
  },
  {
    title: "Medical Report Analysis",
    description:
      "Upload lab results and receive clear AI-powered summaries.",
    icon: FileText,
  },
];

type Feature = (typeof features)[number];

type FeatureLayout = {
  mode: "swipe" | "desktop";
  pageSize: number;
  pageGridClassName: string;
  cardClassName: string;
  iconWrapperClassName: string;
  iconClassName: string;
  titleClassName: string;
  descriptionClassName: string;
  headerSpacingClassName: string;
};

const buildPages = (items: Feature[], pageSize: number) => {
  const pages = items.reduce<Feature[][]>((acc, feature, index) => {
    const pageIndex = Math.floor(index / pageSize);

    if (!acc[pageIndex]) {
      acc[pageIndex] = [];
    }

    acc[pageIndex].push(feature);
    return acc;
  }, []);

  return pages;
};

const getFeatureLayout = (width: number): FeatureLayout => {
  if (width >= 1280) {
    return {
      mode: "desktop",
      pageSize: 0,
      pageGridClassName: "grid-cols-4 gap-4",
      cardClassName:
        "group h-full p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_70px_-30px_rgba(182,33,42,0.25)] sm:p-8",
      iconWrapperClassName:
        "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6b6b] to-[#ff8a80] shadow-lg shadow-primary/15 transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16",
      iconClassName: "h-7 w-7 text-white sm:h-8 sm:w-8",
      titleClassName: "text-lg font-bold tracking-tight text-gray-900 sm:text-xl",
      descriptionClassName:
        "mt-3 text-sm leading-6 text-gray-600 sm:mt-4 sm:leading-7",
      headerSpacingClassName: "mb-6 sm:mb-8",
    };
  }

  if (width >= 1224) {
    return {
      mode: "swipe",
      pageSize: 8,
      pageGridClassName: "grid-cols-4 gap-4",
      cardClassName:
        "group flex h-[15rem] flex-col overflow-hidden p-6 transition-all duration-300",
      iconWrapperClassName:
        "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6b6b] to-[#ff8a80] shadow-lg shadow-primary/15",
      iconClassName: "h-7 w-7 text-white",
      titleClassName: "text-lg font-bold tracking-tight text-gray-900",
      descriptionClassName: "mt-3 text-sm leading-6 text-gray-600",
      headerSpacingClassName: "mb-6",
    };
  }

  if (width >= 768) {
    return {
      mode: "swipe",
      pageSize: 6,
      pageGridClassName: "grid-cols-3 gap-4",
      cardClassName: "group flex h-[12.5rem] flex-col overflow-hidden p-4",
      iconWrapperClassName:
        "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6b6b] to-[#ff8a80] shadow-lg shadow-primary/15",
      iconClassName: "h-5 w-5 text-white",
      titleClassName: "text-sm font-bold tracking-tight text-gray-900",
      descriptionClassName: "mt-2 text-[0.78rem] leading-5 text-gray-600",
      headerSpacingClassName: "mb-4",
    };
  }

  return {
    mode: "swipe",
    pageSize: 4,
    pageGridClassName: "grid-cols-2 gap-3",
    cardClassName:
      "group flex h-[11.75rem] flex-col overflow-hidden p-3.5 transition-all duration-300",
    iconWrapperClassName:
      "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6b6b] to-[#ff8a80] shadow-lg shadow-primary/15",
    iconClassName: "h-5 w-5 text-white",
    titleClassName: "text-[0.82rem] font-bold tracking-tight text-gray-900",
    descriptionClassName: "mt-1.5 text-[0.72rem] leading-4 text-gray-600",
    headerSpacingClassName: "mb-3.5",
  };
};

const PremiumFeatures = () => {
  const [showMore, setShowMore] = useState(false);
  const viewportWidth = useViewportWidth();
  const visibleFeatures = showMore ? features : features.slice(0, 8);
  const layout = getFeatureLayout(viewportWidth);
  const swipePages =
    layout.mode === "swipe" ? buildPages(features, layout.pageSize) : [];

  return (
    <section className="relative overflow-hidden bg-[#faf7f5] py-10 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-primary-soft blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      </div>

      <Container className="relative">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary shadow-sm backdrop-blur">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Everything You Need
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:mt-6 sm:text-5xl lg:text-6xl">
              Everything You Need in One Place
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
              Track every aspect of your wellness through one intelligent
              platform powered by AI. Sophisticated healthcare, designed with
              warmth and clarity.
            </p>
          </div>
        </FadeIn>

        {layout.mode === "swipe" && (
          <>
            <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {swipePages.map((page, pageIndex) => (
                <div
                  key={`feature-page-${pageIndex}`}
                  className={`grid min-w-full snap-start ${layout.pageGridClassName}`}
                >
                  {page.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                      <GlassCard
                        key={feature.title}
                        className={layout.cardClassName}
                      >
                        <div
                          className={`${layout.headerSpacingClassName} flex items-center justify-between`}
                        >
                          <div className={layout.iconWrapperClassName}>
                            <Icon className={layout.iconClassName} />
                          </div>

                          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-primary/50">
                            0{pageIndex * layout.pageSize + index + 1}
                          </span>
                        </div>

                        <h3 className={layout.titleClassName}>
                          {feature.title}
                        </h3>

                        <p className={layout.descriptionClassName}>
                          {feature.description}
                        </p>
                      </GlassCard>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-2 flex justify-end">
              <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-gray-400">
                Swipe to see more
                <ArrowRight size={10} />
              </span>
            </div>
          </>
        )}

        {layout.mode === "desktop" && (
          <>
            <div className={`mt-8 grid gap-4 ${layout.pageGridClassName}`}>
              {visibleFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <FadeIn key={feature.title}>
                    <GlassCard className={layout.cardClassName}>
                      <div
                        className={`${layout.headerSpacingClassName} flex items-center justify-between`}
                      >
                        <div className={layout.iconWrapperClassName}>
                          <Icon className={layout.iconClassName} />
                        </div>

                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/50">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className={layout.titleClassName}>
                        {feature.title}
                      </h3>

                      <p className={layout.descriptionClassName}>
                        {feature.description}
                      </p>
                    </GlassCard>
                  </FadeIn>
                );
              })}
            </div>

            <div className="mt-6 flex justify-center sm:mt-8">
              <Button
                variant="outline"
                onClick={() => setShowMore((previous) => !previous)}
                className="px-8 py-4 text-base sm:min-w-[220px]"
              >
                {showMore ? "Show Less" : "Show More"}
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default PremiumFeatures;
