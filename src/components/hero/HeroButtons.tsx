import Button from "../common/Button";
import scrollToWaitlist from "../../utils/scrollToWaitlist";
import { scrollToSelector } from "../../utils/lenis";

const HeroButtons = () => {
  return (
    <div className="mx-auto mt-7 grid max-w-sm grid-cols-2 gap-2 sm:mt-12 sm:max-w-none sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-5">
      <Button
        className="w-full min-w-0 !px-2.5 !py-2 !text-[0.5rem] !leading-none shadow-lg shadow-red-100/70 sm:w-auto sm:min-w-[240px] sm:!px-7 sm:!py-4 sm:!text-base"
        onClick={scrollToWaitlist}
      >
        Join Early Access
      </Button>

      <Button
        variant="outline"
        className="w-full min-w-0 !px-2.5 !py-2 !text-[0.5rem] !leading-none backdrop-blur-sm sm:w-auto sm:min-w-[240px] sm:!px-7 sm:!py-4 sm:!text-base"
        onClick={() => scrollToSelector("#meet")}
      >
        See How Seka Thinks
      </Button>
    </div>
  );
};

export default HeroButtons;
