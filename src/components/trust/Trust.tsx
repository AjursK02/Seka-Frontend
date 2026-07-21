import { ShieldCheck } from "lucide-react";
import Container from "../common/Container";
import FadeIn from "../common/FadeIn";

const Trust = () => {
  return (
    <section className="bg-white py-12 sm:py-20">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 sm:h-20 sm:w-20">
              <ShieldCheck
                size={34}
                className="text-primary"
              />
            </div>

            <h2 className="mt-4 text-3xl font-bold sm:mt-6 sm:text-5xl">
              Your Data, Your Sanctuary
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
              We believe AI should support care,
              not replace it.
              Your data is encrypted, private,
              and never sold.
            </p>

          </div>
        </FadeIn>
      </Container>
    </section>
  );
};

export default Trust;
