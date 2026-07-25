import { ArrowUp } from "lucide-react";
import useScrollThreshold from "../../hooks/useScrollThreshold";
import { scrollToTop } from "../../utils/lenis";

const ScrollToTopButton = () => {
  const visible = useScrollThreshold(400);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_16px_35px_-12px_rgba(182,33,42,0.55)] transition hover:-translate-y-1 hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f5f4]"
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default ScrollToTopButton;
