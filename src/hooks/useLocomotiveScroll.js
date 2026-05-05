import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

/**
 * Custom hook that initialises Locomotive Scroll on the given container ref.
 * Returns the locomotive-scroll instance so other hooks / components can
 * subscribe to its events (e.g. for GSAP ScrollTrigger proxy).
 */
export const useLocomotiveScroll = (containerRef, enabled = true) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!enabled || !containerRef?.current) return undefined;

    let resizeObserver;
    const update = () => scrollRef.current?.update();

    // Small delay to let React finish painting before loco measures heights
    const id = requestAnimationFrame(() => {
      const locoScroll = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        lerp: 0.1,
        multiplier: 1.0,
        smartphone: { smooth: false },
        tablet: { smooth: false },
        class: "is-inview", // class applied to in-view elements
      });

      scrollRef.current = locoScroll;

      // Automatically update locomotive scroll when container height changes
      resizeObserver = new ResizeObserver(() => {
        locoScroll.update();
      });
      resizeObserver.observe(containerRef.current);

      window.addEventListener("load", update);
      document.fonts?.ready?.then(update);
      setTimeout(update, 250);
      setTimeout(update, 900);
      setTimeout(update, 2000);

      // Expose the instance on the window so other scripts (GSAP proxy,
      // navbar, progress bar) can access it without prop-drilling.
      window.__locomotiveScroll = locoScroll;

      // Emit a custom event so listeners know loco is ready
      window.dispatchEvent(new CustomEvent("locomotiveReady"));
    });

    return () => {
      cancelAnimationFrame(id);
      if (scrollRef.current) {
        if (resizeObserver) resizeObserver.disconnect();
        window.removeEventListener("load", update);
        scrollRef.current.destroy();
        scrollRef.current = null;
        window.__locomotiveScroll = null;
      }
    };
  }, [containerRef, enabled]);

  return scrollRef;
};
