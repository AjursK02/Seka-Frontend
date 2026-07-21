import Lenis from "lenis";

let lenis: Lenis | null = null;

const prefersReducedMotion = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const createLenis = () => {
  if (prefersReducedMotion()) {
    return null;
  }

  if (lenis) {
    return lenis;
  }

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  return lenis;
};

export const destroyLenis = () => {
  lenis?.destroy();
  lenis = null;
};

export const scrollToTop = () => {
  if (prefersReducedMotion() || !lenis) {
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  if (lenis) {
    lenis.scrollTo(0);
  }
};

export const scrollToSelector = (selector: string) => {
  if (prefersReducedMotion() || !lenis) {
    document.querySelector(selector)?.scrollIntoView({ behavior: "auto" });
    return;
  }

  if (lenis) {
    lenis.scrollTo(selector);
  }
};
