import Container from "../common/Container";
import FadeIn from "../common/FadeIn";
import WaitlistForm from "./WaitlistForm";

const Waitlist = () => {
  return (
    <section
      id="waitlist"
      className="bg-[#FDF2F0] py-10 sm:py-16 lg:py-20"
    >
      <Container>

        <FadeIn>

          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-4 text-center shadow-xl sm:p-7 lg:p-10">

            <h2 className="text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Shape the Future of Women's Health
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:mt-5 sm:text-lg">
              Join our early access community
              and help us build the future
              of AI-powered PCOS care.
            </p>

            <WaitlistForm />

          </div>

        </FadeIn>

      </Container>
    </section>
  );
};

export default Waitlist;
