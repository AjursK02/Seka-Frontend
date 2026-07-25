import Container from "../common/LandingContainer";
import HeroBackground from "./LandingHeroBackground";
import HeroContent from "./LandingHeroContent";

const Hero = () => {
  return (
    <section className="relative flex min-h-[82svh] items-center overflow-hidden pt-14 pb-6 sm:min-h-screen sm:py-16 md:min-h-[72svh] md:py-6 lg:pt-24 lg:pb-20">
      <HeroBackground />

      <Container className="relative z-10 flex justify-center">
        <HeroContent />
      </Container>
    </section>
  );
};

export default Hero;
