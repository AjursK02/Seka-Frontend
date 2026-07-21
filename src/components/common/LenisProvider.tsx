import { useEffect, type PropsWithChildren } from "react";
import { createLenis, destroyLenis } from "../../utils/lenis";

const LenisProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const lenis = createLenis();
    if (!lenis) {
      return () => {
        destroyLenis();
      };
    }

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      destroyLenis();
    };
  }, []);

  return children;
};

export default LenisProvider;
