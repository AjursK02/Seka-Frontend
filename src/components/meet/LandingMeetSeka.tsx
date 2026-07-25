import Container from "../common/LandingContainer";
import FadeIn from "../common/LandingFadeIn";
import FeatureItem from "./LandingFeatureItem";
import { featureData } from "./LandingFeatureData";
import MeetPostCarousel from "./LandingMeetPostCarousel";

const MeetSeka = () => {
  return (
    <section id="meet" className="bg-[#f8f5f4] py-12 sm:py-20">
      <Container>
        <div className="flex flex-col gap-8 md:grid md:items-center md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-8 lg:gap-10">
          <div>
            <FadeIn>
              <span className="font-semibold uppercase tracking-widest text-primary">
                Meet Seka
              </span>

              <h2 className="mt-3 text-3xl font-bold sm:mt-4 sm:text-5xl">
                Clarity from Complexity
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                Seka doesn't simply track your data.
                It understands the context behind it
                and helps you make small, meaningful
                improvements every day.
              </p>

              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                {featureData.map((item) => (
                  <FeatureItem
                    key={item.id}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </FadeIn>
          </div>

          <div>
            <FadeIn>
              <MeetPostCarousel />
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MeetSeka;
