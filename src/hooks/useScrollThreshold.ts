import { useEffect, useState } from "react";

const useScrollThreshold = (threshold: number) => {
  const [passedThreshold, setPassedThreshold] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const updateScrollState = () => {
      setPassedThreshold(window.scrollY > threshold);
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [threshold]);

  return passedThreshold;
};

export default useScrollThreshold;
