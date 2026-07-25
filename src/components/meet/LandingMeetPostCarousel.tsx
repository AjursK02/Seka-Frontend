import { useEffect, useState } from "react";
import { postImages } from "./LandingPostImages";

const INSTAGRAM_URL =
  "https://www.instagram.com/sekacares?igsh=bzk1Nzk4czVmc3F0";
const SLIDE_INTERVAL_MS = 5000;

const MeetPostCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % postImages.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  const activePost = postImages[activeIndex];

  const cardShell =
    "relative mx-auto aspect-[4/4.35] w-full max-w-[460px] overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.18)]";

  const renderActiveCard = (imageClassName: string) => (
    <div className={cardShell}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#f6d8cb] via-transparent to-[#d8e8ff]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.9),_transparent_38%)]" />

      <img
        key={activePost.alt}
        src={activePost.src}
        alt={activePost.alt}
        className={`${imageClassName} meet-post-fade-in`}
        draggable="false"
        loading={activeIndex === 0 ? "eager" : "lazy"}
      />

      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/40" />
      <span className="sr-only">{activePost.alt}</span>
    </div>
  );

  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Open the SEKA Instagram posts"
      className="group block"
    >
      <div className="md:hidden">
        <div className="mb-3 text-center text-[0.72rem] font-bold uppercase tracking-[0.24em] text-primary">
          Tap to visit Instagram page
        </div>
        {renderActiveCard("absolute inset-0 box-border h-full w-full object-contain p-2 transition-all duration-700 ease-out sm:p-3")}
      </div>

      <div className="hidden md:block lg:hidden">
        <div className="mb-3 text-center text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-primary/70">
          Tap to visit Instagram page
        </div>
        {renderActiveCard("absolute inset-0 box-border h-full w-full object-contain p-3")}
      </div>

      <div className="hidden lg:block">
        <div className="mb-3 text-center text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-primary/70">
          Tap to visit Instagram page
        </div>
        {renderActiveCard("absolute inset-0 box-border h-full w-full object-contain p-2 transition-all duration-700 ease-out sm:p-3")}
      </div>
    </a>
  );
};

export default MeetPostCarousel;
