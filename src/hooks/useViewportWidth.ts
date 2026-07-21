import { useEffect, useState } from "react";

const getViewportWidth = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  return window.innerWidth;
};

const useViewportWidth = () => {
  const [width, setWidth] = useState(getViewportWidth);

  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
    };

    onResize();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return width;
};

export default useViewportWidth;
