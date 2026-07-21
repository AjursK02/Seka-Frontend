import { Sparkles } from "lucide-react";

const AIIllustration = () => {
  return (
    <div className="flex aspect-square items-center justify-center rounded-[40px] bg-[#FDF2F0] shadow-xl">

      <div className="flex h-72 w-72 items-center justify-center rounded-full bg-white shadow-lg">

        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-red-100">

          <Sparkles
            className="text-primary"
            size={60}
          />

        </div>

      </div>

    </div>
  );
};

export default AIIllustration;